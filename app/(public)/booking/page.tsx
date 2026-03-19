"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useBooking } from '../../lib/booking-context';
import { DayConfiguration } from '../../lib/types';
import { cn } from '../../lib/utils';
import { useToast } from '../../lib/toast-context';

export default function BookingPage() {
  const { fetchAvailability, isDateAvailable, getConfig, getHourlyRate, requestBooking } = useBooking();
  const { toast } = useToast();

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateIso, setSelectedDateIso] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [selectedHours, setSelectedHours] = useState<number | 'more'>(6);
  const [selectedExtraHours, setSelectedExtraHours] = useState<number>(9);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: ''
  });

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  // Computed for Calendar Rendering
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
    setSelectedDateIso(null);
  };

  const toIsoDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isAvailable = (date: Date): boolean => {
    return isDateAvailable(toIsoDate(date));
  };

  const isPartialDay = (date: Date): boolean => {
    if (!isAvailable(date)) return false;
    const config = getConfig(toIsoDate(date));
    if (!config) return false;
    const start = parseInt(config.startTime.split(':')[0]);
    const end = parseInt(config.endTime.split(':')[0]);
    return (end - start) < 7;
  };

  const isFullDay = (date: Date): boolean => {
    if (!isAvailable(date)) return false;
    return !isPartialDay(date);
  };

  const isSelected = (date: Date): boolean => {
    return selectedDateIso === toIsoDate(date);
  };

  const selectDate = (date: Date) => {
    if (isAvailable(date)) {
      setSelectedDateIso(toIsoDate(date));
    }
  };

  const formatDateDisplay = (isoDate: string): string => {
    const [y, m, d] = isoDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('da-DK', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  // --- Specific Logic for Selected Date ---

  const getDayHours = (isoDate: string): string => {
    const config = getConfig(isoDate);
    if (config) return `${config.startTime} - ${config.endTime}`;
    return '07:00 - 15:00'; // Default fallback
  };

  const getCurrentHourlyRate = (): number => {
    return getHourlyRate(selectedDateIso || undefined);
  };

  const isPartial = (isoDate: string): boolean => {
    const config = getConfig(isoDate);
    if (!config) return false;
    const start = parseInt(config.startTime.split(':')[0]);
    const end = parseInt(config.endTime.split(':')[0]);
    return (end - start) < 7;
  };

  const getMaxHours = (isoDate: string): number => {
    const config = getConfig(isoDate);
    if (!config) return 8;
    const start = parseInt(config.startTime.split(':')[0]);
    const end = parseInt(config.endTime.split(':')[0]);
    return end - start;
  };

  const calculateTotalHours = (): number => {
    if (!selectedDateIso) return 0;

    // If partial day, force the calculation to the specific duration
    if (isPartial(selectedDateIso)) {
      return getMaxHours(selectedDateIso);
    }

    return selectedHours === 'more' ? selectedExtraHours : (selectedHours as number);
  };

  const calculatePrice = (): string => {
    const total = calculateTotalHours() * getCurrentHourlyRate();
    return new Intl.NumberFormat('da-DK').format(total);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast('Udfyld venligst navn og telefonnummer.', 'error');
      return;
    }

    setIsSubmitting(true);

    const res = await requestBooking({
      date: selectedDateIso!,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      hours: calculateTotalHours(),
      price: calculatePrice(),
      description: formData.description
    });

    setIsSubmitting(false);
    if (res.status === 'success') {
      toast('Tak! Din forespørgsel er sendt. Vi bekræfter snarest.', 'success');
      setSelectedDateIso(null);
      fetchAvailability(); // Refresh grid
    } else {
      toast('Fejl: ' + res.message, 'error');
      fetchAvailability(); // Refresh in case taken
    }
  };

  return (
    <section className="py-12 md:py-24 bg-slate-900 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2">Book Arbejdskraft</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">Vælg en dato</h3>
          <p className="text-slate-400 max-w-xl">
            Vælg en ledig dato i kalenderen herunder. Prisen afhænger af den valgte dag.
            <br/>
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span> Ledig (Hel)
            <span className="inline-block w-2 h-2 bg-amber-400 rounded-full ml-3 mr-1"></span> Delvis
            <span className="inline-block w-2 h-2 bg-slate-900 border border-slate-700 rounded-full ml-3 mr-1"></span> <span className="line-through decoration-slate-600 text-slate-500">Optaget</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Calendar Section */}
          <div className="bg-slate-800 p-6 rounded-sm border border-slate-700 shadow-xl">
             <div className="flex justify-between items-center mb-6">
               <button onClick={() => changeMonth(-1)} className="text-slate-400 hover:text-white p-2">
                 &larr; Forrige
               </button>
               <h4 className="text-xl font-bold text-white uppercase tracking-wider">
                 {currentMonthName} {currentYear}
               </h4>
               <button onClick={() => changeMonth(1)} className="text-slate-400 hover:text-white p-2">
                 Næste &rarr;
               </button>
             </div>

             <div className="grid grid-cols-7 gap-2 text-center mb-2">
               {['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'].map(day => (
                 <div key={day} className="text-xs font-bold text-slate-500 uppercase">{day}</div>
               ))}
             </div>

             <div className="grid grid-cols-7 gap-2">
               {/* Empty spacers */}
               {emptyDaysStart.map((_, index) => (
                 <div key={`spacer-${index}`}></div>
               ))}

               {/* Days */}
               {daysInMonth.map((day) => {
                 const available = isAvailable(day);
                 const partial = isPartialDay(day);
                 const full = isFullDay(day);
                 const selected = isSelected(day);

                 return (
                   <button 
                     key={day.toISOString()}
                     onClick={() => selectDate(day)}
                     disabled={!available}
                     className={cn(
                       "h-12 w-full rounded-sm font-bold transition-all flex flex-col items-center justify-center relative",
                       !available && "bg-slate-900 text-slate-600 border-slate-800 border line-through decoration-slate-600 cursor-not-allowed",
                       available && !selected && full && "bg-green-600 text-white hover:bg-green-500",
                       available && !selected && partial && "bg-amber-500 text-slate-900 font-bold hover:bg-amber-400",
                       selected && "bg-orange-500 text-white ring-2 ring-orange-300"
                     )}
                   >
                     <span>{day.getDate()}</span>
                     
                     {partial && !selected && (
                       <span className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-slate-900 rounded-full"></span>
                     )}
                   </button>
                 );
               })}
             </div>
          </div>

          {/* Booking Options Section */}
          <div className="space-y-6">
            {selectedDateIso ? (
              <div className="bg-slate-800 p-8 rounded-sm border border-orange-500/30 shadow-2xl animate-in slide-in-from-right duration-300">
                <div className="border-b border-slate-700 pb-4 mb-6">
                  <div className="flex justify-between items-start">
                     <div>
                        <div className="text-xs text-orange-500 uppercase font-bold tracking-widest mb-1">Valgt Dato</div>
                        <h3 className="text-3xl font-bold text-white">{formatDateDisplay(selectedDateIso)}</h3>
                     </div>
                     <div className="text-right">
                       <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Tidsrum</div>
                       <div className="text-white font-mono bg-slate-700 px-2 py-1 rounded">{getDayHours(selectedDateIso)}</div>
                     </div>
                  </div>
                  
                  {isPartial(selectedDateIso) && (
                     <div className="mt-4 bg-amber-500/10 border border-amber-500/20 p-3 rounded text-amber-500 text-sm flex items-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                       <span>Denne dag er markeret med begrænset tid.</span>
                     </div>
                  )}
                </div>

                <form onSubmit={submitBooking} className="space-y-6">
                  {/* Contact Info */}
                  <div className="grid grid-cols-1 gap-4">
                     <div>
                       <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Navn / Firma</label>
                       <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full bg-slate-900 border border-slate-600 rounded-sm p-3 text-white focus:border-orange-500 focus:outline-none" 
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Telefon</label>
                       <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full bg-slate-900 border border-slate-600 rounded-sm p-3 text-white focus:border-orange-500 focus:outline-none" 
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</label>
                       <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full bg-slate-900 border border-slate-600 rounded-sm p-3 text-white focus:border-orange-500 focus:outline-none" 
                       />
                     </div>
                  </div>

                  {/* Hours Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Antal Timer</label>
                    
                    {isPartial(selectedDateIso) ? (
                       <div className="p-3 bg-slate-900 border border-slate-600 rounded-sm text-slate-300 text-sm">
                         Fastsat tid: <strong>{getMaxHours(selectedDateIso)} timer</strong> ({getDayHours(selectedDateIso)})
                       </div>
                    ) : (
                       <select 
                         value={selectedHours} 
                         onChange={(e) => setSelectedHours(e.target.value === 'more' ? 'more' : Number(e.target.value))}
                         name="hours"
                         className="w-full bg-slate-900 text-white border border-slate-600 rounded-sm p-3 focus:border-orange-500 focus:outline-none">
                         <option value={6}>6 Timer</option>
                         <option value={7}>7 Timer</option>
                         <option value={8}>8 Timer</option>
                         <option value="more">Flere (9-12)</option>
                       </select>
                    )}
                  </div>

                  {!isPartial(selectedDateIso) && selectedHours === 'more' && (
                    <div className="animate-in fade-in slide-in-from-top-2">
                      <label className="block text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">Vælg Lang Dag</label>
                      <select 
                        value={selectedExtraHours} 
                        onChange={(e) => setSelectedExtraHours(Number(e.target.value))}
                        name="extraHours"
                        className="w-full bg-slate-900 text-white border border-orange-500 rounded-sm p-3 focus:outline-none">
                        <option value={9}>9 Timer</option>
                        <option value={10}>10 Timer</option>
                        <option value={11}>11 Timer</option>
                        <option value={12}>12 Timer</option>
                      </select>
                    </div>
                  )}
                  
                  <div>
                     <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Kort Beskrivelse</label>
                     <textarea 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      rows={2} 
                      className="w-full bg-slate-900 border border-slate-600 rounded-sm p-3 text-white focus:border-orange-500 focus:outline-none"
                     ></textarea>
                  </div>

                  {/* Price Display */}
                  <div className="bg-slate-900 p-4 rounded-sm border border-slate-700">
                    <div className="flex justify-between items-end">
                      <div>
                         <div className="text-slate-400 text-xs">Timepris</div>
                         <div className="text-slate-300 text-sm">{getCurrentHourlyRate()} kr.</div>
                      </div>
                      <div className="text-right">
                         <div className="text-slate-400 text-xs">Total (ekskl. moms)</div>
                         <div className="text-2xl font-bold text-white">{calculatePrice()} kr.</div>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-slate-600 text-white font-bold uppercase tracking-widest py-4 rounded-sm shadow-lg shadow-orange-900/50 transition-all">
                    {isSubmitting ? 'Sender...' : 'Bekræft Booking'}
                  </button>
                </form>
              </div>
            ) : (
              /* Empty State */
              <div className="h-full flex flex-col items-center justify-center p-12 text-slate-600 border-2 border-dashed border-slate-700 rounded-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0h18M5.25 12h13.5" />
                </svg>
                <p className="text-lg font-medium">Vælg venligst en ledig dato.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
