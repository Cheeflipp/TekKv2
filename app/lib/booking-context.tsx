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
import { db } from '../../firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot, getDocs, writeBatch, getDoc } from 'firebase/firestore';
import { useAuth } from './auth-context';

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

  const { user } = useAuth();
  const isAdmin = user?.email === 'Christianwkchristensen@gmail.com';

  // Load from Firestore on mount
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

      // Note: Ideally this should write to Firestore, but for now we keep local state update
      // to avoid infinite loops in onSnapshot. A cloud function or admin-only trigger is better.
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

  useEffect(() => {
    let unsubDates: () => void;
    let unsubFloat: () => void;
    let unsubLager: () => void;
    let unsubBackup: () => void;
    let unsubSystem: () => void;

    const setupListeners = async () => {
      // 1. Listen to Dates (Everyone can read)
      unsubDates = onSnapshot(collection(db, 'dates'), (snapshot) => {
        const newAvailable = new Map<string, string>();
        const newConfigs = new Map<string, DayConfiguration>();
        snapshot.forEach(doc => {
          const data = doc.data();
          newAvailable.set(doc.id, data.status);
          if (data.config) {
            newConfigs.set(doc.id, JSON.parse(data.config));
          }
        });
        setAvailableDates(newAvailable);
        setDayConfigurations(newConfigs);
        checkAndProcessExpiry(newAvailable, newConfigs);
      }, (error) => console.error("Firestore error (dates):", error));

      // 2. Listen to Float Files (Admin only)
      if (isAdmin) {
        unsubFloat = onSnapshot(collection(db, 'floatFiles'), (snapshot) => {
          const files: VirtualFile[] = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            files.push({
              filename: data.filename,
              content: JSON.parse(data.content),
              createdAt: data.createdAt,
              path: data.path || 'pending/',
              status: data.status || 'FLOAT'
            });
          });
          // Sort by createdAt descending
          files.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setFloatFiles(files);

          // Rehydrate Notifications
          const notifs = files.map(f => ({
            id: (f.content as any).id || 'unknown',
            type: (f.content as any).type || ((f.content as any).note?.startsWith('Kladde') ? 'DRAFT' : 'REQUEST'),
            dateIso: (f.content as any).date || '',
            timestamp: f.createdAt,
            data: f.content,
            fileRef: f
          } as SystemNotification));
          setNotifications(notifs);
        }, (error) => console.error("Firestore error (floatFiles):", error));

        // 3. Listen to Lager Files (Admin only)
        unsubLager = onSnapshot(collection(db, 'lagerFiles'), (snapshot) => {
          const files: VirtualFile[] = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            files.push({
              filename: data.filename,
              content: JSON.parse(data.content),
              createdAt: data.createdAt,
              path: data.path || 'active/',
              status: data.status || 'ACTIVE'
            });
          });
          files.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setLagerFiles(files);
        }, (error) => console.error("Firestore error (lagerFiles):", error));

        // 4. Listen to Backup Log (Admin only)
        unsubBackup = onSnapshot(collection(db, 'backupLog'), (snapshot) => {
          const logs: BackupRecord[] = [];
          snapshot.forEach(doc => {
            logs.push(doc.data() as BackupRecord);
          });
          logs.sort((a, b) => new Date(b.archivedAt).getTime() - new Date(a.archivedAt).getTime());
          setBackupLog(logs);
        }, (error) => console.error("Firestore error (backupLog):", error));

        // 5. Listen to System State (Master CSV) (Admin only)
        unsubSystem = onSnapshot(doc(db, 'system', 'masterCsv'), (docSnap) => {
          if (docSnap.exists()) {
            setMasterListCsv(docSnap.data().masterCsv);
          }
        }, (error) => console.error("Firestore error (system):", error));
      }
    };

    setupListeners();

    return () => {
      if (unsubDates) unsubDates();
      if (unsubFloat) unsubFloat();
      if (unsubLager) unsubLager();
      if (unsubBackup) unsubBackup();
      if (unsubSystem) unsubSystem();
    };
  }, [checkAndProcessExpiry, isAdmin]);

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
    try {
      await setDoc(doc(db, 'dates', dateIso), { 
        status: 'Ledig', 
        config: JSON.stringify(config) 
      });
      return { status: 'success' as const };
    } catch (e) {
      console.error("Error setting day config", e);
      return { status: 'error' as const };
    }
  }, []);

  const closeDate = useCallback(async (dateIso: string) => {
    try {
      const previousStatus = availableDates.get(dateIso);
      const previousConfig = dayConfigurations.get(dateIso);

      const batch = writeBatch(db);
      batch.delete(doc(db, 'dates', dateIso));

      if (previousConfig || previousStatus === 'Anmodet') {
         const { file } = DataProcessor.createSystemFloat('MANUAL_CLOSE', dateIso, { closedConfig: previousConfig, wasStatus: previousStatus });
         batch.set(doc(db, 'floatFiles', file.filename), {
           filename: file.filename,
           content: JSON.stringify(file.content),
           createdAt: file.createdAt,
           path: file.path,
           status: file.status
         });
      }

      await batch.commit();
      return { status: 'success' as const };
    } catch (e) {
      console.error("Error closing date", e);
      return { status: 'error' as const };
    }
  }, [availableDates, dayConfigurations]);

  const requestBooking = useCallback(async (data: BookingRequest) => {
    try {
      const batch = writeBatch(db);
      
      // Update date status
      const currentConfig = dayConfigurations.get(data.date);
      batch.set(doc(db, 'dates', data.date), {
        status: 'Anmodet',
        config: currentConfig ? JSON.stringify(currentConfig) : null
      }, { merge: true });

      // Generate File
      const { file } = DataProcessor.createFloatFile(data);
      batch.set(doc(db, 'floatFiles', file.filename), {
        filename: file.filename,
        content: JSON.stringify(file.content),
        createdAt: file.createdAt,
        path: file.path,
        status: file.status
      });
      
      await batch.commit();

      // Send emails
      try {
        await sendBookingEmails(data);
      } catch (e) {
        console.error("Failed to send booking emails:", e);
      }

      return { status: 'success' as const };
    } catch (e) {
      console.error("Error requesting booking", e);
      return { status: 'error' as const };
    }
  }, [dayConfigurations]);

  const saveExpenseDraft = useCallback(async (data: ExpenseRequest) => {
    try {
      const { file } = DataProcessor.createDraftExpense(data);
      await setDoc(doc(db, 'floatFiles', file.filename), {
        filename: file.filename,
        content: JSON.stringify(file.content),
        createdAt: file.createdAt,
        path: file.path,
        status: file.status
      });
      return { status: 'success' as const };
    } catch (e) {
      console.error("Error saving expense draft", e);
      return { status: 'error' as const };
    }
  }, []);

  const finalizeNotification = useCallback(async (notif: SystemNotification) => {
    if (!notif.fileRef) return { status: 'error' as const, message: 'Legacy notification cannot be filed.' };

    try {
      const batch = writeBatch(db);

      // Logic: Float -> Lager
      const { activeFile, csvRow, logEntry } = DataProcessor.approveToLager(notif.fileRef);

      // Delete from floatFiles
      batch.delete(doc(db, 'floatFiles', notif.fileRef.filename));
      
      // Add to lagerFiles
      batch.set(doc(db, 'lagerFiles', activeFile.filename), {
        filename: activeFile.filename,
        content: JSON.stringify(activeFile.content),
        createdAt: activeFile.createdAt,
        path: activeFile.path,
        status: activeFile.status
      });

      // Add to backupLog
      batch.set(doc(db, 'backupLog', logEntry.orderId), logEntry);

      // Update masterCsv
      const newCsv = masterListCsv + '\n' + csvRow;
      batch.set(doc(db, 'system', 'masterCsv'), { masterCsv: newCsv });

      // Update Calendar if booking
      if (notif.type === 'REQUEST') {
         const currentConfig = dayConfigurations.get(notif.dateIso);
         batch.set(doc(db, 'dates', notif.dateIso), {
           status: 'Booket',
           config: currentConfig ? JSON.stringify(currentConfig) : null
         }, { merge: true });
      }

      await batch.commit();
      return { status: 'success' as const, orderId: logEntry.orderId };
    } catch (e) {
      console.error("Error finalizing notification", e);
      return { status: 'error' as const };
    }
  }, [masterListCsv, dayConfigurations]);

  const deleteNotification = useCallback(async (id: string) => {
    const notif = notifications.find(n => n.id === id);
    if (!notif || !notif.fileRef) return;

    try {
      const batch = writeBatch(db);
      const { logEntry } = DataProcessor.rejectToArchive(notif.fileRef);

      batch.delete(doc(db, 'floatFiles', notif.fileRef.filename));
      batch.set(doc(db, 'backupLog', logEntry.orderId), logEntry);

      if (notif.type === 'REQUEST') {
         const currentConfig = dayConfigurations.get(notif.dateIso);
         batch.set(doc(db, 'dates', notif.dateIso), {
           status: 'Ledig',
           config: currentConfig ? JSON.stringify(currentConfig) : null
         }, { merge: true });
      }

      await batch.commit();
    } catch (e) {
      console.error("Error deleting notification", e);
    }
  }, [notifications, dayConfigurations]);

  const deleteAllNotifications = useCallback(async () => {
    try {
      const batch = writeBatch(db);
      floatFiles.forEach(f => {
        batch.delete(doc(db, 'floatFiles', f.filename));
      });
      await batch.commit();
    } catch (e) {
      console.error("Error deleting all notifications", e);
    }
  }, [floatFiles]);

  const logExpense = useCallback(async (data: ExpenseRequest) => {
    try {
      const batch = writeBatch(db);
      const { activeFile, csvRow, logEntry } = DataProcessor.createDirectExpense(data);
      
      batch.set(doc(db, 'lagerFiles', activeFile.filename), {
        filename: activeFile.filename,
        content: JSON.stringify(activeFile.content),
        createdAt: activeFile.createdAt,
        path: activeFile.path,
        status: activeFile.status
      });
      batch.set(doc(db, 'backupLog', logEntry.orderId), logEntry);
      
      const newCsv = masterListCsv + '\n' + csvRow;
      batch.set(doc(db, 'system', 'masterCsv'), { masterCsv: newCsv });

      await batch.commit();
      return { status: 'success' as const };
    } catch (e) {
      console.error("Error logging expense", e);
      return { status: 'error' as const };
    }
  }, [masterListCsv]);

  const logMileage = useCallback(async (data: MileageEntry) => {
    try {
      const batch = writeBatch(db);
      const { activeFile, csvRow, logEntry } = DataProcessor.createDirectMileage(data);
      
      batch.set(doc(db, 'lagerFiles', activeFile.filename), {
        filename: activeFile.filename,
        content: JSON.stringify(activeFile.content),
        createdAt: activeFile.createdAt,
        path: activeFile.path,
        status: activeFile.status
      });
      batch.set(doc(db, 'backupLog', logEntry.orderId), logEntry);
      
      const newCsv = masterListCsv + '\n' + csvRow;
      batch.set(doc(db, 'system', 'masterCsv'), { masterCsv: newCsv });

      await batch.commit();
      return { status: 'success' as const };
    } catch (e) {
      console.error("Error logging mileage", e);
      return { status: 'error' as const };
    }
  }, [masterListCsv]);

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
