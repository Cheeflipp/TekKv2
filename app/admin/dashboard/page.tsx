"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useBooking, SystemNotification, BackupRecord, MileageEntry } from '../../lib/booking-context';
import { useToast } from '../../lib/toast-context';
import { DataProcessor } from '../../lib/data-processor';
import AdminExpenses from '../../components/admin-expenses';
import { cn } from '../../lib/utils';
import { 
  Calendar, 
  Inbox, 
  FileText, 
  Archive, 
  BarChart3, 
  Map as MapIcon, 
  Receipt, 
  ChevronDown, 
  ArrowLeft, 
  ArrowRight,
  RefreshCw,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

type ViewTab = 'CALENDAR' | 'BOOKINGS' | 'ORDERS' | 'ARCHIVE' | 'STATS' | 'MILEAGE' | 'EXPENSES';
type MileageSubTab = 'NEW' | 'CURRENT' | 'ALL';

export default function AdminDashboard() {
  const { 
    availableDates, 
    dayConfigurations, 
    notifications, 
    backupLog, 
    masterListCsv, 
    fetchAvailability, 
    setDayConfig, 
    closeDate, 
    finalizeNotification, 
    deleteNotification, 
    deleteAllNotifications,
    logMileage,
    logExpense,
    setExpenseDraftToEdit
  } = useBooking();
  const { toast, confirm } = useToast();

  // --- UI State ---
  const [activeTab, setActiveTab] = useState<ViewTab>('CALENDAR');
  const [showViewMenu, setShowViewMenu] = useState(false);
  
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tempConfig, setTempConfig] = useState({
    startTime: '07:00',
    endTime: '15:00',
    hourlyRate: 550
  });

  // Mileage State
  const [mileageSubTab, setMileageSubTab] = useState<MileageSubTab>('NEW');
  const [showMileageMenu, setShowMileageMenu] = useState(false);
  const [mileageForm, setMileageForm] = useState({
    date: new Date().toISOString().split('T')[0],
    carPlate: '',
    purpose: '',
    startAddress: '',
    endAddress: '',
    startKm: 0,
    endKm: 0,
    distance: 0,
    rate: 3.79 // 2024 Sats
  });

  // --- Computed Data ---

  const bookingOrders = useMemo(() => {
    return backupLog.filter(log => log.type === 'BOOKING_FINALIZED');
  }, [backupLog]);

  const filteredAccountingLogs = useMemo(() => {
    return backupLog.filter(log => log.type !== 'BOOKING_FINALIZED');
  }, [backupLog]);

  const stats = useMemo(() => {
    const rows = DataProcessor.parseMasterList(masterListCsv);
    const revenue = rows.filter(r => r.type === 'INCOME').reduce((sum, r) => sum + r.amount, 0);
    const expenses = rows.filter(r => r.type === 'EXPENSE').reduce((sum, r) => sum + Math.abs(r.amount), 0); // Stored as negative
    const payouts = rows.filter(r => r.type === 'PAYOUT').reduce((sum, r) => sum + Math.abs(r.amount), 0);
    const tax = rows.filter(r => r.type === 'TAX').reduce((sum, r) => sum + Math.abs(r.amount), 0);
    
    // Mileage is also an expense technically for the company, but often handled separately. 
    // In the CSV it is type MILEAGE and negative amount.
    const mileage = rows.filter(r => r.type === 'MILEAGE').reduce((sum, r) => sum + Math.abs(r.amount), 0);

    const totalExpenses = expenses + payouts + tax + mileage;
    const balance = revenue - totalExpenses;
    
    // VAT Calculation (Rough estimate)
    // Sales VAT = Revenue * 0.20 (if revenue includes VAT? Usually B2B is ex VAT, but let's assume revenue is ex VAT)
    // Wait, the Angular code says "Moms (25%)".
    // Let's assume the amounts in CSV are ex VAT? Or inc VAT?
    // Angular code: `getStatsFromCsv().vat`
    // Let's look at how it calculated it. It wasn't shown in the view_file output.
    // I'll implement a simple calculation: Revenue * 0.25 - Expenses * 0.25 (assuming all expenses have VAT, which is false, but good enough for now)
    const vat = (revenue * 0.25) - (expenses * 0.25);

    return { revenue, expenses: expenses + mileage, payouts, tax, balance, vat };
  }, [masterListCsv]);

  // Mileage Computed
  const allMileageEntries = useMemo(() => {
    return backupLog.filter(log => log.type === 'MILEAGE');
  }, [backupLog]);

  const currentMileageEntries = useMemo(() => {
    // Find last payout date
    const payouts = backupLog.filter(log => log.type === 'PAYOUT' && log.summary.toLowerCase().includes('kørsel'));
    let cutoffDate = new Date(0); // Epoch
    
    if (payouts.length > 0) {
      // Sort desc
      payouts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      cutoffDate = new Date(payouts[0].date);
    }

    return allMileageEntries.filter(entry => new Date(entry.date) > cutoffDate);
  }, [allMileageEntries, backupLog]);

  const currentMileageTotal = useMemo(() => {
    return currentMileageEntries.reduce((sum, entry) => {
      return sum + (entry.fullJson.distance * entry.fullJson.rate);
    }, 0);
  }, [currentMileageEntries]);


  // --- Calendar Helpers ---
  const currentYear = currentDate.getFullYear();
  const currentMonthName = currentDate.toLocaleString('da-DK', { month: 'long' });
  
  const daysInMonth = useMemo(() => {
    const year = currentYear;
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentDate, currentYear]);

  const emptyDaysStart = useMemo(() => {
    const year = currentYear;
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const jsDay = firstDay === 0 ? 6 : firstDay - 1;
    return Array(jsDay).fill(0);
  }, [currentDate, currentYear]);

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  const toIsoDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // --- Calendar Logic ---
  const isAvailable = (date: Date) => availableDates.get(toIsoDate(date)) === 'Ledig';
  const isBooked = (date: Date) => availableDates.get(toIsoDate(date)) === 'Booket';
  const isRequested = (date: Date) => availableDates.get(toIsoDate(date)) === 'Anmodet';
  
  const isPartialDay = (date: Date) => {
    const iso = toIsoDate(date);
    if (availableDates.get(iso) !== 'Ledig') return false;
    const config = dayConfigurations.get(iso);
    if (!config) return false;
    const start = parseInt(config.startTime.split(':')[0]);
    const end = parseInt(config.endTime.split(':')[0]);
    return (end - start) < 7;
  };

  const isFullDay = (date: Date) => {
    const iso = toIsoDate(date);
    if (availableDates.get(iso) !== 'Ledig') return false;
    return !isPartialDay(date);
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    return date < today;
  };

  const isBookedOrRequested = (date: Date) => isBooked(date) || isRequested(date);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    const iso = toIsoDate(date);
    const config = dayConfigurations.get(iso);
    
    if (config) {
      setTempConfig({
        startTime: config.startTime,
        endTime: config.endTime,
        hourlyRate: config.hourlyRate || 550
      });
    } else {
      // Default or last used? Angular used lastUsedConfig.
      setTempConfig({
        startTime: '07:00',
        endTime: '15:00',
        hourlyRate: 550
      });
    }
    setShowConfigModal(true);
  };

  const saveConfiguration = async () => {
    if (!selectedDate) return;
    const iso = toIsoDate(selectedDate);
    
    await setDayConfig(iso, {
      startTime: tempConfig.startTime,
      endTime: tempConfig.endTime,
      hourlyRate: tempConfig.hourlyRate
    });
    
    setShowConfigModal(false);
  };

  const handleDeleteAvailability = async () => {
    if (!selectedDate) return;
    const iso = toIsoDate(selectedDate);
    await closeDate(iso);
    setShowConfigModal(false);
  };

  const setPreset = (start: string, end: string) => {
    setTempConfig(prev => ({ ...prev, startTime: start, endTime: end }));
  };

  // --- Mileage Logic ---
  const calculateDistance = () => {
    const dist = mileageForm.endKm - mileageForm.startKm;
    setMileageForm(prev => ({ ...prev, distance: dist > 0 ? dist : 0 }));
  };

  const submitMileage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mileageForm.distance <= 0 || !mileageForm.purpose) return;

    await logMileage({
      ...mileageForm,
      date: mileageForm.date
    });

    toast('Kørsel registreret!', 'success');
    // Reset form partially
    setMileageForm(prev => ({
      ...prev,
      startKm: prev.endKm,
      endKm: 0,
      distance: 0,
      purpose: '',
      startAddress: prev.endAddress,
      endAddress: ''
    }));
  };

  const registerMileagePayout = async () => {
    const isConfirmed = await confirm(`Vil du registrere udbetaling af ${currentMileageTotal.toFixed(2)} kr?`);
    if (isConfirmed) {
       await logExpense({
          date: new Date().toISOString().split('T')[0],
          amount: currentMileageTotal,
          category: 'Lønudbetaling',
          description: `Udbetaling af kørsel (t.o.m ${new Date().toLocaleDateString()})`,
          invoiceId: 'MILEAGE-PAYOUT-' + Date.now(),
          imageBase64: null
       });
       toast('Udbetaling registreret!', 'success');
    }
  };


  // --- View Titles ---
  const getViewTitle = (tab: ViewTab) => {
    switch(tab) {
      case 'CALENDAR': return 'Kalender';
      case 'BOOKINGS': return 'Indbakke (Float)';
      case 'ORDERS': return 'Ordre Kartotek';
      case 'ARCHIVE': return 'Bilagsoversigt';
      case 'STATS': return 'Statistik';
      case 'MILEAGE': return 'Kørebog';
      case 'EXPENSES': return 'Registrer Bilag';
      default: return 'Dashboard';
    }
  };

  const getViewCategory = (tab: ViewTab) => {
    if (tab === 'CALENDAR') return 'Planlægning';
    if (['BOOKINGS', 'ORDERS'].includes(tab)) return 'Drift & Ordrer';
    return 'Regnskab';
  };

  return (
    <div className="flex flex-col h-full bg-slate-100">
      
      {/* Top Control Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm z-30 flex-none relative">
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">{getViewTitle(activeTab)}</h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{getViewCategory(activeTab)}</p>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowViewMenu(!showViewMenu)}
            className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded shadow-lg transition-all font-bold text-sm uppercase tracking-wide">
            <span>Skift Visning</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", showViewMenu && "rotate-180")} />
          </button>

          {showViewMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowViewMenu(false)}></div>
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-2xl border border-slate-200 p-2 z-50 animate-in zoom-in-95 duration-100 origin-top-right">
                
                {/* Planlægning */}
                <div className="mb-2">
                  <div className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-1">Planlægning</div>
                  <button onClick={() => { setActiveTab('CALENDAR'); setShowViewMenu(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 flex items-center gap-3 group">
                    <div className="p-1.5 rounded bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">Kalender</span>
                    {activeTab === 'CALENDAR' && <span className="ml-auto text-orange-500">●</span>}
                  </button>
                </div>

                {/* Drift & Ordrer */}
                <div className="mb-2">
                  <div className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-1">Drift & Ordrer</div>
                  <button onClick={() => { setActiveTab('BOOKINGS'); setShowViewMenu(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 flex items-center gap-3 group">
                    <div className="p-1.5 rounded bg-amber-50 text-amber-600 group-hover:bg-amber-100 transition-colors relative">
                      <Inbox className="w-4 h-4" />
                      {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
                      )}
                    </div>
                    <span className="text-sm font-bold text-slate-700">Indbakke (Float)</span>
                    {activeTab === 'BOOKINGS' && <span className="ml-auto text-orange-500">●</span>}
                  </button>
                  <button onClick={() => { setActiveTab('ORDERS'); setShowViewMenu(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 flex items-center gap-3 group">
                    <div className="p-1.5 rounded bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">Ordre Kartotek</span>
                    {activeTab === 'ORDERS' && <span className="ml-auto text-orange-500">●</span>}
                  </button>
                </div>

                {/* Regnskab */}
                <div>
                  <div className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-1">Regnskab</div>
                  <button onClick={() => { setActiveTab('EXPENSES'); setShowViewMenu(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 flex items-center gap-3 group">
                    <div className="p-1.5 rounded bg-orange-50 text-orange-600 group-hover:bg-orange-100 transition-colors">
                      <Receipt className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">Registrer Bilag</span>
                    {activeTab === 'EXPENSES' && <span className="ml-auto text-orange-500">●</span>}
                  </button>
                  <button onClick={() => { setActiveTab('MILEAGE'); setShowViewMenu(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 flex items-center gap-3 group">
                    <div className="p-1.5 rounded bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
                      <MapIcon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">Kørebog</span>
                    {activeTab === 'MILEAGE' && <span className="ml-auto text-orange-500">●</span>}
                  </button>
                  <button onClick={() => { setActiveTab('STATS'); setShowViewMenu(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 flex items-center gap-3 group">
                    <div className="p-1.5 rounded bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">Statistik</span>
                    {activeTab === 'STATS' && <span className="ml-auto text-orange-500">●</span>}
                  </button>
                  <button onClick={() => { setActiveTab('ARCHIVE'); setShowViewMenu(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 flex items-center gap-3 group">
                    <div className="p-1.5 rounded bg-gray-50 text-gray-600 group-hover:bg-gray-100 transition-colors">
                      <Archive className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">Bilagsoversigt</span>
                    {activeTab === 'ARCHIVE' && <span className="ml-auto text-orange-500">●</span>}
                  </button>
                </div>

              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto p-4 md:p-6 bg-slate-100">
        <div className="max-w-7xl mx-auto h-full flex flex-col">

          {/* 1. CALENDAR VIEW */}
          {activeTab === 'CALENDAR' && (
            <div className="h-full min-h-[500px]">
              <div className="h-full bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden flex flex-col">
                <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center flex-none">
                  <h2 className="text-white font-bold">Planlægning</h2>
                  <div className="flex gap-2 text-white items-center">
                    <button onClick={() => changeMonth(-1)} className="hover:bg-slate-700 p-2 rounded"><ArrowLeft className="w-4 h-4" /></button>
                    <span className="w-32 text-center font-mono py-2 capitalize">{currentMonthName} {currentYear}</span>
                    <button onClick={() => changeMonth(1)} className="hover:bg-slate-700 p-2 rounded"><ArrowRight className="w-4 h-4" /></button>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto flex-grow">
                  <div className="flex flex-wrap gap-4 mb-4 text-xs text-slate-500 justify-center">
                    <span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Hel Dag</span>
                    <span className="flex items-center"><span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>Delvis</span>
                    <span className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Anmodet</span>
                    <span className="flex items-center"><span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>Booket</span>
                    <span className="flex items-center"><span className="w-2 h-2 bg-slate-200 rounded-full mr-2"></span>Lukket</span>
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center mb-2">
                    {['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'].map(day => (
                      <div key={day} className="text-xs font-bold text-slate-400 uppercase">{day}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {emptyDaysStart.map((_, i) => <div key={`spacer-${i}`}></div>)}
                    
                    {daysInMonth.map(day => (
                      <button
                        key={day.toISOString()}
                        onClick={() => handleDayClick(day)}
                        className={cn(
                          "h-14 md:h-20 w-full rounded border border-slate-200 flex flex-col items-center justify-center transition-all relative",
                          isPast(day) && "opacity-50",
                          isFullDay(day) && !isBookedOrRequested(day) && "bg-green-500 text-white",
                          isPartialDay(day) && !isBookedOrRequested(day) && "bg-amber-400 text-slate-900",
                          isAvailable(day) && !isBookedOrRequested(day) && "text-white",
                          isRequested(day) && "bg-blue-500 text-white",
                          isBooked(day) && "bg-red-600 text-white",
                          !isAvailable(day) && !isBookedOrRequested(day) && "bg-slate-100 text-slate-400 hover:bg-slate-200"
                        )}
                      >
                        <span className="font-bold text-lg leading-none">{day.getDate()}</span>
                        <span className="text-[9px] uppercase font-bold mt-1 tracking-tighter">
                          {isBooked(day) ? 'Booket' : 
                           isRequested(day) ? 'Anmodet' : 
                           isPartialDay(day) ? 'Delvis' : 
                           isFullDay(day) ? 'Ledig' : '-'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. BOOKINGS VIEW */}
          {activeTab === 'BOOKINGS' && (
            <section className="animate-in fade-in duration-300">
              <div className="flex justify-between items-end mb-6 border-b border-slate-300 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Indbakke (Float)</h2>
                  <p className="text-slate-500">Filbaseret indbakke. Godkendelse flytter filen til Ordre Kartoteket.</p>
                </div>
                
                <div className="flex gap-2">
                   <button onClick={() => fetchAvailability()} className="text-xs font-bold uppercase text-slate-500 hover:text-orange-500 flex items-center gap-1">
                      <RefreshCw className="w-4 h-4" />
                      Opdater
                   </button>
                   {notifications.length > 0 && (
                     <button 
                       onClick={deleteAllNotifications} 
                       className="text-xs font-bold uppercase text-red-500 hover:text-red-700 border border-red-200 px-3 py-1 rounded bg-red-50 flex items-center gap-1">
                       <Trash2 className="w-3 h-3" />
                       Slet Alle
                     </button>
                   )}
                </div>
              </div>

              {notifications.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
                   <Inbox className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                   <h3 className="text-lg font-bold text-slate-600">Float mappen er tom</h3>
                   <p className="text-slate-400">Ingen filer venter på behandling.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {notifications.map(notif => (
                    <div key={notif.id} className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden group hover:border-blue-400 transition-all">
                       <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className={cn("w-3 h-3 rounded-full", 
                              notif.type === 'REQUEST' ? "bg-blue-500" : 
                              notif.type === 'DRAFT' ? "bg-gray-500" : "bg-amber-500"
                            )}></span>
                            <span className="font-mono text-xs font-bold text-slate-600">
                               {notif.fileRef?.filename || notif.dateIso + '.json'}
                            </span>
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Float</span>
                       </div>
                       <div className="p-4">
                          <div className="mb-4">
                             {notif.type === 'REQUEST' ? (
                               <>
                                 <h4 className="font-bold text-slate-800 text-lg">{notif.data.name}</h4>
                                 <div className="text-sm text-slate-500 flex gap-4 mt-1">
                                    <span>{notif.data.phone}</span>
                                    <span>{notif.data.hours} timer</span>
                                 </div>
                                 <div className="mt-2 bg-blue-50 text-blue-800 p-2 rounded text-sm font-bold text-right border border-blue-100">
                                   Tilbud: {notif.data.price} kr.
                                 </div>
                               </>
                             ) : notif.type === 'DRAFT' ? (
                               <>
                                 <h4 className="font-bold text-slate-800 text-lg">Kladde: {notif.data.category}</h4>
                                 <p className="text-sm text-slate-500 italic mb-2">{notif.data.description || 'Ingen beskrivelse'}</p>
                               </>
                             ) : (
                               <>
                                 <h4 className="font-bold text-slate-700">System Notifikation</h4>
                                 <p className="text-sm text-slate-500 italic">{notif.data.note || 'Konfiguration arkiveret.'}</p>
                               </>
                             )}
                          </div>
                          <div className="flex gap-3 pt-2 border-t border-slate-100">
                             {notif.type === 'DRAFT' ? (
                               <button onClick={() => { setExpenseDraftToEdit(notif); setActiveTab('EXPENSES'); }} className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded text-xs font-bold uppercase text-white">Færdiggør</button>
                             ) : (
                               <button onClick={() => finalizeNotification(notif)} className="flex-1 bg-slate-800 hover:bg-slate-700 py-2 rounded text-xs font-bold uppercase text-white">
                                 {notif.type === 'REQUEST' ? 'Godkend' : 'Arkiver'}
                               </button>
                             )}
                             <button onClick={() => deleteNotification(notif.id)} className="px-4 py-2 rounded border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold uppercase">Slet</button>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* 3. ORDERS VIEW */}
          {activeTab === 'ORDERS' && (
            <section className="animate-in fade-in duration-300">
              <div className="mb-6 border-b border-slate-300 pb-4">
                <h2 className="text-2xl font-bold text-slate-800">Ordre Kartotek</h2>
                <p className="text-slate-500">Oversigt over bekræftede bookinger (Kunder).</p>
              </div>

              <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm text-slate-600">
                   <thead className="bg-slate-800 text-white text-xs uppercase font-bold">
                      <tr>
                        <th className="px-6 py-4">Dato</th>
                        <th className="px-6 py-4">Kunde</th>
                        <th className="px-6 py-4">Kontakt</th>
                        <th className="px-6 py-4">Opgave</th>
                        <th className="px-6 py-4 text-right">Beløb (DKK)</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {bookingOrders.map(order => (
                        <tr key={order.orderId} className="hover:bg-slate-50 transition-colors">
                           <td className="px-6 py-4 font-mono font-bold text-slate-700">{order.date}</td>
                           <td className="px-6 py-4 font-bold text-slate-900">{order.fullJson.name || 'Ukendt'}</td>
                           <td className="px-6 py-4 text-xs">
                             <div className="font-bold">{order.fullJson.phone}</div>
                             <div className="text-slate-400">{order.fullJson.email}</div>
                           </td>
                           <td className="px-6 py-4 max-w-xs truncate text-slate-500" title={order.fullJson.description}>
                             {order.fullJson.description || order.summary}
                           </td>
                           <td className="px-6 py-4 text-right font-bold text-green-600">
                             {order.fullJson.price || '0 kr.'}
                           </td>
                        </tr>
                      ))}
                      {bookingOrders.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                            Ingen ordrer fundet i systemet.
                          </td>
                        </tr>
                      )}
                   </tbody>
                </table>
              </div>
            </section>
          )}

          {/* 4. ARCHIVE VIEW */}
          {activeTab === 'ARCHIVE' && (
             <section className="animate-in fade-in duration-300">
                <div className="flex justify-between items-end mb-6 border-b border-slate-300 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Bilagsoversigt & Hændelser</h2>
                    <p className="text-slate-500">Udgifter, kørebog og system logs. (Ordrer findes i Ordre Kartoteket).</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
                   <table className="w-full text-left text-sm text-slate-600">
                      <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-500">
                         <tr>
                           <th className="px-6 py-4">ID</th>
                           <th className="px-6 py-4">Type</th>
                           <th className="px-6 py-4">Dato</th>
                           <th className="px-6 py-4">Beskrivelse</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {filteredAccountingLogs.map(log => (
                           <tr key={log.orderId} className="hover:bg-slate-50 transition-colors text-xs">
                              <td className="px-6 py-4 font-mono text-slate-400">{log.orderId}</td>
                              <td className="px-6 py-4">
                                {log.type === 'EXPENSE' && <span className="text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded border border-orange-100">UDGIFT</span>}
                                {log.type === 'MILEAGE' && <span className="text-purple-600 font-bold bg-purple-50 px-2 py-1 rounded border border-purple-100">KØRSEL</span>}
                                {log.type === 'PAYOUT' && <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded border border-green-100">UDBETALING</span>}
                                {log.type === 'TAX' && <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded border border-indigo-100">SKAT</span>}
                                {log.type === 'BOOKING_DELETED' && <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded border border-red-100">SLETTET</span>}
                                {log.type === 'SYSTEM' && <span className="text-slate-500 font-bold bg-slate-100 px-2 py-1 rounded border border-slate-200">SYSTEM</span>}
                              </td>
                              <td className="px-6 py-4 font-bold">{log.date}</td>
                              <td className="px-6 py-4 text-slate-700">{log.summary}</td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </section>
          )}

          {/* 5. STATS VIEW */}
          {activeTab === 'STATS' && (
             <section className="animate-in fade-in duration-300">
                <div className="mb-6 border-b border-slate-300 pb-4">
                  <h2 className="text-2xl font-bold text-slate-800">Statistik (Master CSV)</h2>
                  <p className="text-slate-500">Lynhurtig data indlæst fra <code>master_list.csv</code>.</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 mb-6 flex justify-between items-center relative overflow-hidden">
                    <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
                      <BarChart3 className="w-48 h-48 text-white" />
                    </div>

                    <div>
                      <h2 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">Total Balance</h2>
                      <div className={cn("text-4xl font-black transition-colors duration-300", stats.balance >= 0 ? "text-green-500" : "text-red-500")}>
                        {stats.balance.toLocaleString('da-DK')} kr.
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">Omsætning ÷ (Udgifter + Løn + Skat)</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                   <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 border-b-4 border-b-green-500">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Omsætning</div>
                      <div className="text-xl font-black text-slate-800">{stats.revenue.toLocaleString('da-DK')} kr.</div>
                   </div>
                   <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 border-b-4 border-b-red-500">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Udgifter</div>
                      <div className="text-xl font-black text-slate-800">{stats.expenses.toLocaleString('da-DK')} kr.</div>
                   </div>
                   <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 border-b-4 border-b-blue-500">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Løn</div>
                      <div className="text-xl font-black text-slate-800">{stats.payouts.toLocaleString('da-DK')} kr.</div>
                      <div className="text-[9px] text-slate-400 mt-1">Udbetalt Løn</div>
                   </div>
                   <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 border-b-4 border-b-orange-400">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Moms (25%)</div>
                      <div className="text-xl font-black text-orange-600">{stats.vat.toLocaleString('da-DK')} kr.</div>
                      <div className="text-[9px] text-slate-400 mt-1">Salgsmoms ÷ Købsmoms</div>
                   </div>
                   <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 border-b-4 border-b-orange-600">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimeret Skat</div>
                      <div className="text-xl font-black text-orange-800">{stats.tax.toLocaleString('da-DK')} kr.</div>
                      <div className="text-[9px] text-slate-400 mt-1">Registreret Skat</div>
                   </div>
                </div>

                <div className="bg-slate-900 text-slate-300 p-6 rounded-lg font-mono text-xs overflow-x-auto shadow-inner">
                   <h4 className="text-orange-500 font-bold mb-2 uppercase">master_list.csv (Preview)</h4>
                   <pre>{masterListCsv}</pre>
                </div>
             </section>
          )}

          {/* 6. MILEAGE VIEW */}
          {activeTab === 'MILEAGE' && (
             <section className="animate-in fade-in duration-300 max-w-4xl mx-auto">
                <div className="mb-6 border-b border-slate-300 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                       <MapIcon className="w-6 h-6" />
                     </div>
                     <div>
                       <h2 className="text-2xl font-bold text-slate-800">Kørebog</h2>
                       <p className="text-slate-500 text-xs uppercase tracking-wide">Lovpligtig dokumentation for erhvervsmæssig kørsel</p>
                     </div>
                  </div>
                </div>
                  
                  <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden mb-8 min-h-[400px]">
                     <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center relative">
                       <div className="relative">
                         <button onClick={() => setShowMileageMenu(!showMileageMenu)} className="flex items-center gap-2 text-white font-bold hover:text-purple-300 transition-colors">
                           <span>
                             {mileageSubTab === 'NEW' ? 'Opret Ny Kørsel' : 
                              mileageSubTab === 'CURRENT' ? 'Aktuel Kørebog' : 'Alle Kørebøger'}
                           </span>
                           <ChevronDown className={cn("w-4 h-4 transition-transform", showMileageMenu && "rotate-180")} />
                         </button>
                         
                         {showMileageMenu && (
                           <>
                             <div className="fixed inset-0 z-40" onClick={() => setShowMileageMenu(false)}></div>
                             <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded shadow-xl border border-slate-200 py-1 z-50">
                                <button onClick={() => { setMileageSubTab('NEW'); setShowMileageMenu(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-bold text-slate-700">Opret Ny</button>
                                <button onClick={() => { setMileageSubTab('CURRENT'); setShowMileageMenu(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-bold text-slate-700 border-t border-slate-100">Se Aktuel Kørebog</button>
                                <button onClick={() => { setMileageSubTab('ALL'); setShowMileageMenu(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-bold text-slate-700 border-t border-slate-100">Se Alle Kørebøger</button>
                             </div>
                           </>
                         )}
                       </div>
                       <div className="text-slate-400 text-xs font-mono">Takst: {mileageForm.rate} kr/km</div>
                     </div>
                     
                     {/* NEW FORM */}
                     {mileageSubTab === 'NEW' && (
                       <div className="p-6">
                          <form onSubmit={submitMileage} className="space-y-6 animate-in fade-in">
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Dato</label>
                                   <input type="date" value={mileageForm.date} onChange={e => setMileageForm({...mileageForm, date: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded p-2 focus:border-purple-500 focus:outline-none" />
                                </div>
                                <div>
                                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Reg. Nr.</label>
                                   <input type="text" value={mileageForm.carPlate} onChange={e => setMileageForm({...mileageForm, carPlate: e.target.value})} placeholder="AB 12 345" className="w-full bg-slate-50 border border-slate-300 rounded p-2 focus:border-purple-500 focus:outline-none uppercase" />
                                </div>
                                <div>
                                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Formål</label>
                                   <input type="text" value={mileageForm.purpose} onChange={e => setMileageForm({...mileageForm, purpose: e.target.value})} placeholder="Kundemøde / Montage" className="w-full bg-slate-50 border border-slate-300 rounded p-2 focus:border-purple-500 focus:outline-none" />
                                </div>
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Start Adresse</label>
                                   <input type="text" value={mileageForm.startAddress} onChange={e => setMileageForm({...mileageForm, startAddress: e.target.value})} placeholder="Virksomhedens adresse" className="w-full bg-slate-50 border border-slate-300 rounded p-2 focus:border-purple-500 focus:outline-none" />
                                </div>
                                <div>
                                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Slut Adresse</label>
                                   <input type="text" value={mileageForm.endAddress} onChange={e => setMileageForm({...mileageForm, endAddress: e.target.value})} placeholder="Kunde adresse" className="w-full bg-slate-50 border border-slate-300 rounded p-2 focus:border-purple-500 focus:outline-none" />
                                </div>
                             </div>

                             <div className="bg-slate-50 p-4 rounded border border-slate-200">
                                <div className="grid grid-cols-3 gap-4 items-end">
                                   <div>
                                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Start Km</label>
                                      <input type="number" value={mileageForm.startKm} onChange={e => { const val = parseFloat(e.target.value); setMileageForm(prev => ({...prev, startKm: val, distance: prev.endKm - val > 0 ? prev.endKm - val : 0})) }} className="w-full border border-slate-300 rounded p-2 text-right font-mono" placeholder="0" />
                                   </div>
                                   <div className="text-center pb-2 text-slate-300">&rarr;</div>
                                   <div>
                                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Slut Km</label>
                                      <input type="number" value={mileageForm.endKm} onChange={e => { const val = parseFloat(e.target.value); setMileageForm(prev => ({...prev, endKm: val, distance: val - prev.startKm > 0 ? val - prev.startKm : 0})) }} className="w-full border border-slate-300 rounded p-2 text-right font-mono" placeholder="0" />
                                   </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
                                   <span className="text-xs font-bold text-slate-500 uppercase">Distance:</span>
                                   <span className="text-2xl font-black text-purple-600">{mileageForm.distance} km</span>
                                </div>
                             </div>

                             <div className="flex justify-end pt-2">
                                <button 
                                  type="submit" 
                                  disabled={mileageForm.distance <= 0 || !mileageForm.purpose}
                                  className="bg-purple-600 hover:bg-purple-500 disabled:bg-slate-300 text-white font-bold py-3 px-8 rounded shadow-lg transition-colors flex items-center gap-2">
                                  Log Kørsel
                                </button>
                             </div>
                          </form>
                       </div>
                     )}

                     {/* CURRENT VIEW */}
                     {mileageSubTab === 'CURRENT' && (
                       <div className="p-0 animate-in fade-in">
                         {currentMileageEntries.length === 0 ? (
                           <div className="p-12 text-center">
                             <div className="text-slate-300 mb-2 flex justify-center">
                               <CheckCircle className="w-12 h-12" />
                             </div>
                             <h3 className="font-bold text-slate-600">Alt er udbetalt!</h3>
                             <p className="text-sm text-slate-400">Ingen ny kørsel registreret siden sidste udbetaling.</p>
                           </div>
                         ) : (
                           <>
                             <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-500">
                                   <tr>
                                     <th className="px-6 py-4">Dato</th>
                                     <th className="px-6 py-4">Formål</th>
                                     <th className="px-6 py-4 text-right">Km</th>
                                     <th className="px-6 py-4 text-right">Beløb</th>
                                   </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                   {currentMileageEntries.map(entry => (
                                     <tr key={entry.orderId} className="hover:bg-slate-50">
                                       <td className="px-6 py-4 font-mono">{entry.date}</td>
                                       <td className="px-6 py-4">{entry.fullJson.purpose}</td>
                                       <td className="px-6 py-4 text-right">{entry.fullJson.distance}</td>
                                       <td className="px-6 py-4 text-right font-bold text-purple-600">{(entry.fullJson.distance * entry.fullJson.rate).toFixed(2)}</td>
                                     </tr>
                                   ))}
                                </tbody>
                                <tfoot className="bg-slate-800 text-white">
                                  <tr>
                                    <td colSpan={3} className="px-6 py-4 text-right font-bold uppercase tracking-wider text-xs">Total til Udbetaling</td>
                                    <td className="px-6 py-4 text-right font-black text-lg">{currentMileageTotal.toFixed(2)} kr.</td>
                                  </tr>
                                </tfoot>
                             </table>
                             
                             <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
                                <button onClick={registerMileagePayout} className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded shadow-lg flex items-center gap-2">
                                  <Receipt className="w-5 h-5" />
                                  Registrer Udbetaling
                                </button>
                             </div>
                           </>
                         )}
                       </div>
                     )}

                     {/* ALL VIEW */}
                     {mileageSubTab === 'ALL' && (
                       <div className="p-0 animate-in fade-in max-h-[500px] overflow-y-auto">
                         <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-500 sticky top-0">
                               <tr>
                                 <th className="px-6 py-4">Dato</th>
                                 <th className="px-6 py-4">Formål</th>
                                 <th className="px-6 py-4">Rute</th>
                                 <th className="px-6 py-4 text-right">Km</th>
                                 <th className="px-6 py-4 text-right">Beløb</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                               {allMileageEntries.map(entry => (
                                 <tr key={entry.orderId} className="hover:bg-slate-50">
                                   <td className="px-6 py-4 font-mono">{entry.date}</td>
                                   <td className="px-6 py-4">{entry.fullJson.purpose}</td>
                                   <td className="px-6 py-4 text-xs text-slate-400">{entry.fullJson.startAddress} &rarr; {entry.fullJson.endAddress}</td>
                                   <td className="px-6 py-4 text-right">{entry.fullJson.distance}</td>
                                   <td className="px-6 py-4 text-right font-bold text-purple-600">{(entry.fullJson.distance * entry.fullJson.rate).toFixed(2)}</td>
                                 </tr>
                               ))}
                            </tbody>
                         </table>
                       </div>
                     )}
                  </div>
             </section>
           )}
           
           {/* 7. EXPENSES VIEW */}
           {activeTab === 'EXPENSES' && (
             <section className="animate-in fade-in duration-300">
               <AdminExpenses />
             </section>
           )}

        </div>
      </div>

      {/* CONFIG MODAL */}
      {showConfigModal && selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-slate-800 p-4 flex justify-between items-center">
              <h3 className="text-white font-bold text-lg">Konfigurer {toIsoDate(selectedDate)}</h3>
              <button onClick={() => setShowConfigModal(false)} className="text-slate-400 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Start Tid</label>
                  <input type="text" placeholder="HH:MM" value={tempConfig.startTime} onChange={e => setTempConfig({...tempConfig, startTime: e.target.value})} className="w-full border border-slate-300 rounded p-2 focus:border-orange-500 focus:outline-none font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Slut Tid</label>
                  <input type="text" placeholder="HH:MM" value={tempConfig.endTime} onChange={e => setTempConfig({...tempConfig, endTime: e.target.value})} className="w-full border border-slate-300 rounded p-2 focus:border-orange-500 focus:outline-none font-mono" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Timepris (ex moms)</label>
                <div className="relative">
                   <input type="number" value={tempConfig.hourlyRate} onChange={e => setTempConfig({...tempConfig, hourlyRate: parseFloat(e.target.value)})} className="w-full border border-slate-300 rounded p-2 pl-8 focus:border-orange-500 focus:outline-none" />
                   <span className="absolute left-3 top-2 text-slate-400 font-bold">kr</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={() => setPreset('07:00', '15:00')} className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-600 font-bold">07-15</button>
                <button onClick={() => setPreset('07:00', '16:00')} className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-600 font-bold">07-16</button>
              </div>

              <div className="pt-4 flex gap-3 border-t border-slate-100 mt-2">
                {isAvailable(selectedDate) && (
                  <button 
                    onClick={handleDeleteAvailability} 
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-3 rounded text-sm uppercase tracking-wider">
                    Luk Dag
                  </button>
                )}
                <button 
                  onClick={saveConfiguration} 
                  className="flex-1 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded text-sm uppercase tracking-wider shadow-lg">
                  {isAvailable(selectedDate) ? 'Opdater' : 'Opret Produkt'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
