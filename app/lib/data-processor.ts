import { BookingRequest, SystemNotification, BackupRecord, ExpenseRequest, MileageEntry, DayConfiguration, VirtualFile, MasterIndexRow } from './types';

/**
 * DataProcessor (Bridge Script)
 * Håndterer "Human-in-the-loop" fil-flowet.
 * 1. FLOAT: Opretter filer i 'pending' mappen.
 * 2. LAGER: Flytter godkendte filer til 'Regnskab/ÅR/MÅNED' mappestruktur.
 * 3. INDEX: Opdaterer master_list.csv for performance.
 */
export class DataProcessor {

  private static generateId(prefix: string = 'id'): string {
    return prefix + '-' + (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID().slice(0,8) : Date.now().toString().slice(-6));
  }

  // --- HELPER: FOLDER STRUCTURE GENERATOR ---
  private static getAccountingPath(dateIso: string): string {
    try {
      const date = new Date(dateIso);
      if (isNaN(date.getTime())) throw new Error('Invalid date');

      const year = date.getFullYear();
      const monthIndex = date.getMonth(); // 0-11
      
      const monthNames = [
        '01-Januar', '02-Februar', '03-Marts', '04-April', '05-Maj', '06-Juni', 
        '07-Juli', '08-August', '09-September', '10-Oktober', '11-November', '12-December'
      ];

      const monthFolder = monthNames[monthIndex];
      
      // Structure: Regnskab -> 2026 -> 02-Februar
      return `Regnskab/${year}/${monthFolder}/`;
    } catch (e) {
      // Fallback if date is invalid
      return 'Regnskab/Usorteret/';
    }
  }

  // --- 1. FLOAT (INDBAKKE) ---
  
  static createFloatFile(data: BookingRequest): { file: VirtualFile, notification: SystemNotification } {
    const id = this.generateId('req');
    const timestamp = new Date().toISOString();
    
    // Filnavn format: YYYY-MM-DD_TIME_ID.json
    const filename = `${data.date}_${id}.json`;

    const file: VirtualFile = {
      filename: filename,
      path: 'pending/',
      status: 'FLOAT',
      content: { ...data, id }, // Indlejrer ID i JSON
      createdAt: timestamp
    };

    const notification: SystemNotification = {
      id: id,
      type: 'REQUEST',
      dateIso: data.date,
      timestamp: timestamp,
      data: data,
      fileRef: file
    };

    return { file, notification };
  }

  static createSystemFloat(type: 'EXPIRED_AVAILABILITY' | 'MANUAL_CLOSE', dateIso: string, data: any): { file: VirtualFile, notification: SystemNotification } {
    const id = this.generateId('sys');
    const timestamp = new Date().toISOString();
    const filename = `${dateIso}_sys_${id}.json`;

    const file: VirtualFile = {
      filename: filename,
      path: 'pending/', // Selv system-ting kan kræve "godkendelse" (arkivering)
      status: 'FLOAT',
      content: { ...data, id, type },
      createdAt: timestamp
    };

    const notification: SystemNotification = {
      id: id,
      type: type,
      dateIso: dateIso,
      timestamp: timestamp,
      data: data,
      fileRef: file
    };

    return { file, notification };
  }

  static createDraftExpense(data: ExpenseRequest): { file: VirtualFile, notification: SystemNotification } {
    const id = this.generateId('draft');
    const timestamp = new Date().toISOString();
    
    // EXPLICIT NAMING for drafts: UNDER_CONSTRUCTION
    const filename = `UNDER_CONSTRUCTION_${data.date}_${id}.json`;

    const file: VirtualFile = {
      filename: filename,
      path: 'pending/',
      status: 'FLOAT',
      content: { ...data, id, type: 'EXPENSE_DRAFT' },
      createdAt: timestamp
    };

    const notification: SystemNotification = {
      id: id,
      type: 'DRAFT', // Specific type for UI handling
      dateIso: data.date,
      timestamp: timestamp,
      data: {
        note: `Kladde: ${data.category}`,
        ...data
      },
      fileRef: file
    };

    return { file, notification };
  }

  // --- 2. LAGER & MASTER LIST (GODKENDELSE) ---

  static approveToLager(file: VirtualFile): { activeFile: VirtualFile, csvRow: string, logEntry: BackupRecord } {
    const content = file.content;
    
    // Determine the correct folder path based on the content date
    const dateStr = content.date || new Date().toISOString().split('T')[0];
    const newPath = this.getAccountingPath(dateStr);

    // 1. Move File to structured folder
    const activeFile: VirtualFile = {
      ...file,
      path: newPath,
      status: 'ACTIVE'
    };

    // 2. Generate CSV Row (Data Extraction)
    // CSV Format: ID, DATE, TYPE, AMOUNT, STATUS
    let type = 'SYSTEM';
    let amount = 0;
    let summary = 'System event';
    let logType: BackupRecord['type'] = 'SYSTEM';

    // Detect Type based on content structure
    if (content.email && content.price) {
      // Booking Request
      type = 'INCOME';
      // Clean price string "3.300 kr" -> 3300
      amount = parseFloat(content.price.toString().replace(/[^0-9,.-]/g, ''));
      summary = `Booking: ${content.name}`;
      logType = 'BOOKING_FINALIZED';
    } else if (content.category && content.amount !== undefined) {
      // Expense, Payout or Tax
      // We check category to determine the CSV Type
      amount = -Math.abs(content.amount); // Always negative flow for these categories
      
      if (content.category === 'Lønudbetaling') {
         type = 'PAYOUT';
         summary = `Udbetaling: ${content.description || 'Løn'}`;
         logType = 'PAYOUT';
      } else if (content.category === 'Skat') {
         type = 'TAX';
         summary = `Skat: ${content.description || 'Betaling'}`;
         logType = 'TAX';
      } else {
         type = 'EXPENSE';
         summary = `Udgift: ${content.category}`;
         logType = 'EXPENSE';
      }

    } else if (content.distance && content.rate) {
       // Mileage
       type = 'MILEAGE';
       amount = -Math.abs(content.distance * content.rate);
       summary = `Kørsel: ${content.distance} km`;
       logType = 'MILEAGE';
    }

    // CSV String: id,date,type,amount,status
    // Vi bruger semikolon som separator for dansk Excel kompatibilitet
    const csvRow = `${content.id || 'N/A'};${content.date || new Date().toISOString().split('T')[0]};${type};${amount};APPROVED`;

    // 3. Create Log Record (Legacy/Visual UI)
    const logEntry: BackupRecord = {
      orderId: content.id || 'SYS',
      type: logType,
      date: content.date || new Date().toISOString(),
      summary: summary,
      fullJson: content,
      archivedAt: new Date().toISOString(),
      csvRow: csvRow
    };

    return { activeFile, csvRow, logEntry };
  }

  static rejectToArchive(file: VirtualFile): { archivedFile: VirtualFile, logEntry: BackupRecord } {
    const archivedFile: VirtualFile = {
      ...file,
      path: 'archive/rejected/', // Rejected files go to a flat archive
      status: 'ARCHIVED'
    };

    const logEntry: BackupRecord = {
      orderId: 'DEL-' + Date.now().toString().slice(-4),
      type: 'BOOKING_DELETED',
      date: file.content.date || new Date().toISOString(),
      summary: 'Slettet/Afvist fil: ' + file.filename,
      fullJson: file.content,
      archivedAt: new Date().toISOString(),
      csvRow: '' // No CSV row for deleted items usually
    };

    return { archivedFile, logEntry };
  }

  // --- 3. DIRECT EXPENSE/MILEAGE LOGGING ---
  // Disse springer "Float" over i denne version, men følger samme "Lager" logik via approveToLager

  static createDirectExpense(data: ExpenseRequest): { activeFile: VirtualFile, csvRow: string, logEntry: BackupRecord } {
    const id = this.generateId('exp');
    const filename = `${data.date}_exp_${id}.json`;
    
    // Create a temporary file object, path will be overwritten by approveToLager
    const file: VirtualFile = {
      filename: filename,
      path: 'temp/', 
      status: 'FLOAT',
      content: { ...data, id },
      createdAt: new Date().toISOString()
    };

    return this.approveToLager(file);
  }

  static createDirectMileage(data: MileageEntry): { activeFile: VirtualFile, csvRow: string, logEntry: BackupRecord } {
     const id = this.generateId('drv');
     const filename = `${data.date}_drv_${id}.json`;

     const file: VirtualFile = {
       filename: filename,
       path: 'temp/',
       status: 'FLOAT',
       content: { ...data, id },
       createdAt: new Date().toISOString()
     };

     return this.approveToLager(file);
  }

  // --- 4. CSV HELPERS ---

  static parseMasterList(csvContent: string): MasterIndexRow[] {
    if (!csvContent) return [];
    
    const lines = csvContent.split('\n');
    const rows: MasterIndexRow[] = [];

    // Skip header row if exists
    const startIdx = lines[0].startsWith('ID;') ? 1 : 0;

    for (let i = startIdx; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const [id, date, type, amountStr, status] = line.split(';');
      rows.push({
        id,
        date,
        type: type as any,
        amount: parseFloat(amountStr),
        status
      });
    }
    return rows;
  }

  // --- 5. CHECK EXPIRY ---

  static checkExpiry(today: string, availableDates: Map<string, string>, dayConfigurations: Map<string, DayConfiguration>): { notifications: { dateIso: string, data: any }[], expiredIds: string[] } {
    const notifications: { dateIso: string, data: any }[] = [];
    const expiredIds: string[] = [];

    availableDates.forEach((status, dateIso) => {
      if (dateIso < today) {
        expiredIds.push(dateIso);
        
        // If it was just available (Ledig) and unused, we notify
        if (status === 'Ledig') {
           const config = dayConfigurations.get(dateIso);
           notifications.push({
             dateIso: dateIso,
             data: {
               status: status,
               config: config,
               note: `Dato ${dateIso} udløb uden booking.`
             }
           });
        }
        // If it was 'Anmodet' (Requested) but past date
        else if (status === 'Anmodet') {
            const config = dayConfigurations.get(dateIso);
             notifications.push({
               dateIso: dateIso,
               data: {
                 status: status,
                 config: config,
                 note: `Anmodning for ${dateIso} udløb (dato overskredet).`
               }
             });
        }
      }
    });

    return { notifications, expiredIds };
  }
}
