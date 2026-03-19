
export interface DayConfiguration {
  startTime: string; 
  endTime: string;
  hourlyRate: number;
}

export interface BookingRequest {
  date: string;
  name: string;
  email: string;
  phone: string;
  hours: number;
  price: string;
  description: string;
}

export interface ExpenseRequest {
  date: string;
  category: string;
  amount: number;
  description: string;
  invoiceId: string;
  imageBase64: string | null;
}

export interface MileageEntry {
  date: string;
  purpose: string;
  startAddress: string;
  endAddress: string;
  carPlate: string;
  startKm: number;
  endKm: number;
  distance: number;
  rate: number;
}

// --- FILE SYSTEM ARCHITECTURE TYPES ---

export type FileStatus = 'FLOAT' | 'ACTIVE' | 'ARCHIVED';

export interface VirtualFile {
  filename: string; // e.g. "2024-10-24_req_123.json"
  path: string;     // e.g. "pending/" or "active/"
  status: FileStatus;
  content: any;     // The JSON content
  createdAt: string;
}

// Optimized Index Row for master_list.csv
export interface MasterIndexRow {
  id: string;
  date: string;
  type: 'INCOME' | 'EXPENSE' | 'MILEAGE' | 'PAYOUT' | 'TAX';
  amount: number;
  status: string;
}

// Legacy types mapped for UI compatibility (SystemNotification -> VirtualFile wrapper)
export interface SystemNotification {
  id: string;
  type: 'REQUEST' | 'EXPIRED_AVAILABILITY' | 'MANUAL_CLOSE' | 'DRAFT';
  dateIso: string;
  data: any;
  timestamp: string;
  // New field to link to file architecture
  fileRef?: VirtualFile;
}

export interface BackupRecord {
  orderId: string;
  type: 'BOOKING_FINALIZED' | 'BOOKING_DELETED' | 'EXPENSE' | 'SYSTEM' | 'MILEAGE' | 'PAYOUT' | 'TAX';
  date: string;
  summary: string;
  fullJson: any;
  archivedAt: string;
  // New field to link to file architecture
  csvRow?: string; 
}
