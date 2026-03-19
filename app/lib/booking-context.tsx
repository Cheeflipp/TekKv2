"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { 
  DayConfiguration, 
  BookingRequest, 
  ExpenseRequest, 
  MileageEntry, 
  SystemNotification, 
  BackupRecord,
  VirtualFile,
  MasterIndexRow
} from './types';
import { DataProcessor } from './data-processor';
import { sendBookingEmails } from '../actions/email';

export * from './types';

interface BookingContextType {
  // State
  availableDates: Map<string, string>;
  dayConfigurations: Map<string, DayConfiguration>;
  floatFiles: VirtualFile[];
  lagerFiles: VirtualFile[];
  masterListCsv: string;
  notifications: SystemNotification[];
  backupLog: BackupRecord[];
  expenseDraftToEdit: SystemNotification | null;
  setExpenseDraftToEdit: (draft: SystemNotification | null) => void;

  // Methods
  fetchAvailability: () => void;
  isDateAvailable: (isoDate: string) => boolean;
  getConfig: (isoDate: string) => DayConfiguration | undefined;
  getHourlyRate: (isoDate?: string) => number;
  
  // Actions
  setDayConfig: (dateIso: string, config: DayConfiguration) => Promise<{ status: 'success' | 'error' }>;
  closeDate: (dateIso: string) => Promise<{ status: 'success' | 'error' }>;
  requestBooking: (request: BookingRequest) => Promise<{ status: 'success' | 'error', message?: string }>;
  
  // Admin Actions
  saveExpenseDraft: (data: ExpenseRequest) => Promise<{ status: 'success' | 'error' }>;
  finalizeNotification: (notif: SystemNotification) => Promise<{ status: 'success' | 'error', orderId?: string, message?: string }>;
  deleteNotification: (id: string) => void;
  deleteAllNotifications: () => void;
  logExpense: (data: ExpenseRequest) => Promise<{ status: 'success' | 'error' }>;
  logMileage: (data: MileageEntry) => Promise<{ status: 'success' | 'error' }>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  // 1. Calendar State
  const [availableDates, setAvailableDates] = useState<Map<string, string>>(new Map());
  const [dayConfigurations, setDayConfigurations] = useState<Map<string, DayConfiguration>>(new Map());
  
  // 2. File System State
  const [floatFiles, setFloatFiles] = useState<VirtualFile[]>([]);
  const [lagerFiles, setLagerFiles] = useState<VirtualFile[]>([]);
  const [masterListCsv, setMasterListCsv] = useState<string>('ID;DATE;TYPE;AMOUNT;STATUS');

  // 3. UI Mappings
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);
  const [backupLog, setBackupLog] = useState<BackupRecord[]>([]);

  // 4. Temporary State
  const [expenseDraftToEdit, setExpenseDraftToEdit] = useState<SystemNotification | null>(null);

  const STORAGE_KEYS = {
    STATUS: 'tekk_v2_status',
    CONFIG: 'tekk_v2_config',
    FILES_FLOAT: 'tekk_v2_float',
    FILES_LAGER: 'tekk_v2_lager',
    MASTER_CSV: 'tekk_v2_master_csv',
    LOG_LEGACY: 'tekk_v2_log'
  };

  // Load from localStorage on mount
  useEffect(() => {
    loadLocal();
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveLocal();
  }, [availableDates, dayConfigurations, floatFiles, lagerFiles, masterListCsv, backupLog]);

  const saveLocal = () => {
    if (typeof window === 'undefined') return;
    try {
      const storage = window.localStorage;
      storage.setItem(STORAGE_KEYS.STATUS, JSON.stringify(Array.from(availableDates.entries())));
      storage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(Array.from(dayConfigurations.entries())));
      
      storage.setItem(STORAGE_KEYS.FILES_FLOAT, JSON.stringify(floatFiles));
      storage.setItem(STORAGE_KEYS.FILES_LAGER, JSON.stringify(lagerFiles));
      storage.setItem(STORAGE_KEYS.MASTER_CSV, masterListCsv);
      storage.setItem(STORAGE_KEYS.LOG_LEGACY, JSON.stringify(backupLog));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  };

  const loadLocal = () => {
    if (typeof window === 'undefined') return;
    try {
      const storage = window.localStorage;
      const statusRaw = storage.getItem(STORAGE_KEYS.STATUS);
      const configRaw = storage.getItem(STORAGE_KEYS.CONFIG);
      const floatRaw = storage.getItem(STORAGE_KEYS.FILES_FLOAT);
      const lagerRaw = storage.getItem(STORAGE_KEYS.FILES_LAGER);
      const csvRaw = storage.getItem(STORAGE_KEYS.MASTER_CSV);
      const logRaw = storage.getItem(STORAGE_KEYS.LOG_LEGACY);

      if (statusRaw) setAvailableDates(new Map(JSON.parse(statusRaw)));
      if (configRaw) setDayConfigurations(new Map(JSON.parse(configRaw)));
      
      if (floatRaw) setFloatFiles(JSON.parse(floatRaw));
      if (lagerRaw) setLagerFiles(JSON.parse(lagerRaw));
      if (csvRaw) setMasterListCsv(csvRaw);
      
      // Rehydrate Notifications from Files
      if (floatRaw) {
         const files: VirtualFile[] = JSON.parse(floatRaw);
         const notifs = files.map(f => ({
            id: (f.content as any).id || 'unknown',
            type: (f.content as any).type || ((f.content as any).note?.startsWith('Kladde') ? 'DRAFT' : 'REQUEST'),
            dateIso: (f.content as any).date || '',
            timestamp: f.createdAt,
            data: f.content,
            fileRef: f
         } as SystemNotification));
         setNotifications(notifs);
      }

      if (logRaw) setBackupLog(JSON.parse(logRaw));

      // Check expiry after load
      checkAndProcessExpiry(
        statusRaw ? new Map(JSON.parse(statusRaw)) : new Map(),
        configRaw ? new Map(JSON.parse(configRaw)) : new Map()
      );

    } catch (e) {
      console.warn('LocalStorage load failed', e);
    }
  };

  const checkAndProcessExpiry = useCallback((currentAvailableDates: Map<string, string>, currentDayConfigurations: Map<string, DayConfiguration>) => {
    const today = new Date().toISOString().split('T')[0];
    const result = DataProcessor.checkExpiry(today, currentAvailableDates, currentDayConfigurations);

    if (result.notifications.length > 0) {
      const newFiles: VirtualFile[] = [];
      const newNotifications: SystemNotification[] = [];
      
      result.notifications.forEach(item => {
         const { file, notification } = DataProcessor.createSystemFloat('EXPIRED_AVAILABILITY', item.dateIso, item.data);
         newFiles.push(file);
         newNotifications.push(notification);
      });

      setFloatFiles(prev => [...prev, ...newFiles]);
      setNotifications(prev => [...prev, ...newNotifications]);
      
      setAvailableDates(prev => {
        const newMap = new Map(prev);
        result.expiredIds.forEach(id => newMap.delete(id));
        return newMap;
      });
      setDayConfigurations(prev => {
        const newMap = new Map(prev);
        result.expiredIds.forEach(id => newMap.delete(id));
        return newMap;
      });
    }
  }, []);

  // --- Public Methods ---

  const getHourlyRate = useCallback((dateIso?: string): number => {
    if (dateIso && dayConfigurations.has(dateIso)) {
      return dayConfigurations.get(dateIso)!.hourlyRate;
    }
    return 550;
  }, [dayConfigurations]);

  const getConfig = useCallback((dateIso: string): DayConfiguration | undefined => {
    return dayConfigurations.get(dateIso);
  }, [dayConfigurations]);

  const isDateAvailable = useCallback((dateIso: string): boolean => {
    return availableDates.get(dateIso) === 'Ledig';
  }, [availableDates]);

  const fetchAvailability = useCallback(() => {
    // In a real app, this would fetch from server. 
    // Here we just re-run expiry check on current data
    checkAndProcessExpiry(availableDates, dayConfigurations);
  }, [availableDates, dayConfigurations, checkAndProcessExpiry]);

  const setDayConfig = useCallback(async (dateIso: string, config: DayConfiguration) => {
    setAvailableDates(prev => new Map(prev).set(dateIso, 'Ledig'));
    setDayConfigurations(prev => new Map(prev).set(dateIso, config));
    return { status: 'success' as const };
  }, []);

  const closeDate = useCallback(async (dateIso: string) => {
    const previousStatus = availableDates.get(dateIso);
    const previousConfig = dayConfigurations.get(dateIso);

    if (previousConfig || previousStatus === 'Anmodet') {
       const { file, notification } = DataProcessor.createSystemFloat('MANUAL_CLOSE', dateIso, { closedConfig: previousConfig, wasStatus: previousStatus });
       setFloatFiles(prev => [...prev, file]);
       setNotifications(prev => [...prev, notification]);
    }

    setAvailableDates(prev => {
      const newMap = new Map(prev);
      newMap.delete(dateIso);
      return newMap;
    });
    setDayConfigurations(prev => {
      const newMap = new Map(prev);
      newMap.delete(dateIso);
      return newMap;
    });

    return { status: 'success' as const };
  }, [availableDates, dayConfigurations]);

  const requestBooking = useCallback(async (data: BookingRequest) => {
    // Optimistic UI update
    setAvailableDates(prev => new Map(prev).set(data.date, 'Anmodet'));

    // Generate File
    const { file, notification } = DataProcessor.createFloatFile(data);
    setFloatFiles(prev => [file, ...prev]);
    setNotifications(prev => [notification, ...prev]);
    
    // Send emails
    try {
      await sendBookingEmails(data);
    } catch (e) {
      console.error("Failed to send booking emails:", e);
    }

    return { status: 'success' as const };
  }, []);

  const saveExpenseDraft = useCallback(async (data: ExpenseRequest) => {
    const { file, notification } = DataProcessor.createDraftExpense(data);
    setFloatFiles(prev => [file, ...prev]);
    setNotifications(prev => [notification, ...prev]);
    return { status: 'success' as const };
  }, []);

  const finalizeNotification = useCallback(async (notif: SystemNotification) => {
    if (!notif.fileRef) return { status: 'error' as const, message: 'Legacy notification cannot be filed.' };

    // Logic: Float -> Lager
    const { activeFile, csvRow, logEntry } = DataProcessor.approveToLager(notif.fileRef);

    // Update State
    setFloatFiles(prev => prev.filter(f => f.filename !== notif.fileRef!.filename));
    setLagerFiles(prev => [activeFile, ...prev]);
    setMasterListCsv(prev => prev + '\n' + csvRow);
    setBackupLog(prev => [logEntry, ...prev]);
    setNotifications(prev => prev.filter(n => n.id !== notif.id));

    // Update Calendar if booking
    if (notif.type === 'REQUEST') {
       setAvailableDates(prev => {
         const newMap = new Map(prev);
         if (newMap.get(notif.dateIso) === 'Anmodet') newMap.set(notif.dateIso, 'Booket');
         return newMap;
       });
    }

    return { status: 'success' as const, orderId: logEntry.orderId };
  }, []);

  const deleteNotification = useCallback((id: string) => {
    const notif = notifications.find(n => n.id === id);
    if (!notif || !notif.fileRef) {
       setNotifications(prev => prev.filter(n => n.id !== id));
       return;
    }

    const { archivedFile, logEntry } = DataProcessor.rejectToArchive(notif.fileRef);

    setFloatFiles(prev => prev.filter(f => f.filename !== notif.fileRef!.filename));
    setBackupLog(prev => [logEntry, ...prev]);
    setNotifications(prev => prev.filter(n => n.id !== id));

    if (notif.type === 'REQUEST') {
       setAvailableDates(prev => {
         const newMap = new Map(prev);
         if (newMap.get(notif.dateIso) === 'Anmodet') newMap.set(notif.dateIso, 'Ledig'); 
         return newMap;
       });
    }
  }, [notifications]);

  const deleteAllNotifications = useCallback(() => {
    setFloatFiles([]);
    setNotifications([]);
  }, []);

  const logExpense = useCallback(async (data: ExpenseRequest) => {
    const { activeFile, csvRow, logEntry } = DataProcessor.createDirectExpense(data);
    setLagerFiles(prev => [activeFile, ...prev]);
    setMasterListCsv(prev => prev + '\n' + csvRow);
    setBackupLog(prev => [logEntry, ...prev]);
    return { status: 'success' as const };
  }, []);

  const logMileage = useCallback(async (data: MileageEntry) => {
    const { activeFile, csvRow, logEntry } = DataProcessor.createDirectMileage(data);
    setLagerFiles(prev => [activeFile, ...prev]);
    setMasterListCsv(prev => prev + '\n' + csvRow);
    setBackupLog(prev => [logEntry, ...prev]);
    return { status: 'success' as const };
  }, []);

  const value = useMemo(() => ({
      availableDates,
      dayConfigurations,
      floatFiles,
      lagerFiles,
      masterListCsv,
      notifications,
      backupLog,
      expenseDraftToEdit,
      setExpenseDraftToEdit,
      fetchAvailability,
      isDateAvailable,
      getConfig,
      getHourlyRate,
      setDayConfig,
      closeDate,
      requestBooking,
      saveExpenseDraft,
      finalizeNotification,
      deleteNotification,
      deleteAllNotifications,
      logExpense,
      logMileage
  }), [
      availableDates,
      dayConfigurations,
      floatFiles,
      lagerFiles,
      masterListCsv,
      notifications,
      backupLog,
      expenseDraftToEdit,
      fetchAvailability,
      isDateAvailable,
      getConfig,
      getHourlyRate,
      setDayConfig,
      closeDate,
      requestBooking,
      saveExpenseDraft,
      finalizeNotification,
      deleteNotification,
      deleteAllNotifications,
      logExpense,
      logMileage
  ]);

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
