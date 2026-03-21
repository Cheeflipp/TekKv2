"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useBooking } from '../../lib/booking-context';
import { DayConfiguration } from '../../lib/types';
import { cn } from '../../lib/utils';
import { useToast } from '../../lib/toast-context';
import { useTheme } from '../../lib/theme-context';

export default function BookingPage() {
  const { fetchAvailability, isDateAvailable, getConfig, getHourlyRate, requestBooking } = useBooking();
  const { toast } = useToast();
  const { theme } = useTheme();

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateIso, setSelectedDateIso] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [startTime, setStartTime] = useState('07:00');
  const [endTime, setEndTime] = useState('15:00');
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
      const iso = toIsoDate(date);
      setSelectedDateIso(iso);
      
      const config = getConfig(iso);
      if (config) {
        setStartTime(config.startTime);
        setEndTime(config.endTime);
      } else {
        setStartTime('07:00');
        setEndTime('15:00');
      }
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

    if (!startTime || !endTime) return 0;

    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    
    if (isNaN(startH) || isNaN(endH)) return 0;

    let hours = (endH + endM / 60) - (startH + startM / 60);
    return hours > 0 ? Number(hours.toFixed(2)) : 0;
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
      startTime: isPartial(selectedDateIso!) ? getConfig(selectedDateIso!)?.startTime : startTime,
      endTime: isPartial(selectedDateIso!) ? getConfig(selectedDateIso!)?.endTime : endTime,
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
    <section className={cn(
      "py-12 md:py-24 min-h-screen transition-colors duration-300",
      theme === 'classic' ? "bg-white" : "bg-slate-900"
    )}>
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className={cn(
            "font-bold tracking-widest uppercase text-sm mb-2",
            theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
          )}>Book Arbejdskraft</h2>
          <h3 className={cn(
            "text-4xl md:text-5xl font-bold mb-4",
            theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
          )}>Vælg en dato</h3>
          <p className={cn(
            "max-w-xl",
            theme === 'classic' ? "text-slate-600" : "text-slate-400"
          )}>
            Vælg en ledig dato i kalenderen herunder. Prisen afhænger af den valgte dag.
            <br/>
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span> Ledig (Hel)
            <span className="inline-block w-2 h-2 bg-amber-400 rounded-full ml-3 mr-1"></span> Delvis
            <span className={cn(
              "inline-block w-2 h-2 border rounded-full ml-3 mr-1",
              theme === 'classic' ? "bg-white border-slate-300" : "bg-slate-900 border-slate-700"
            )}></span> <span className={cn(
              "line-through",
              theme === 'classic' ? "decoration-slate-400 text-slate-400" : "decoration-slate-600 text-slate-500"
            )}>Optaget</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Calendar Section */}
          <div className={cn(
            "p-6 rounded-sm border shadow-xl transition-colors duration-300",
            theme === 'classic' ? "bg-slate-50 border-slate-200" : "bg-slate-800 border-slate-700"
          )}>
             <div className="flex justify-between items-center mb-6">
               <button onClick={() => changeMonth(-1)} className={cn(
                 "p-2 transition-colors",
                 theme === 'classic' ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"
               )}>
                 &larr; Forrige
               </button>
               <h4 className={cn(
                 "text-xl font-bold uppercase tracking-wider",
                 theme === 'classic' ? "text-slate-900" : "text-white"
               )}>
                 {currentMonthName} {currentYear}
               </h4>
               <button onClick={() => changeMonth(1)} className={cn(
                 "p-2 transition-colors",
                 theme === 'classic' ? "text-slate-500 hover:text-slate-900" : "text-slate-400 hover:text-white"
               )}>
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
                       !available && (theme === 'classic' ? "bg-white text-slate-400 border-slate-200 border line-through decoration-slate-300 cursor-not-allowed" : "bg-slate-900 text-slate-600 border-slate-800 border line-through decoration-slate-600 cursor-not-allowed"),
                       available && !selected && full && "bg-green-600 text-white hover:bg-green-500",
                       available && !selected && partial && "bg-amber-500 text-slate-900 font-bold hover:bg-amber-400",
                       selected && (theme === 'classic' ? "bg-[#c29b62] text-white ring-2 ring-[#c29b62]/50" : "bg-orange-500 text-white ring-2 ring-orange-300"),
                       available && !selected && theme === 'classic' && "text-slate-700 hover:text-white"
                     )}
                   >
                     <span>{day.getDate()}</span>
                     
                     {partial && !selected && (
                       <span className={cn(
                         "absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full",
                         theme === 'classic' ? "bg-white" : "bg-slate-900"
                       )}></span>
                     )}
                   </button>
                 );
               })}
             </div>
          </div>

          {/* Booking Options Section */}
          <div className="space-y-6">
            {selectedDateIso ? (
              <div className={cn(
                "p-8 rounded-sm border shadow-2xl animate-in slide-in-from-right duration-300",
                theme === 'classic' ? "bg-slate-50 border-[#c29b62]/30" : "bg-slate-800 border-orange-500/30"
              )}>
                <div className={cn(
                  "border-b pb-4 mb-6",
                  theme === 'classic' ? "border-slate-200" : "border-slate-700"
                )}>
                  <div className="flex justify-between items-start">
                     <div>
                        <div className={cn(
                          "text-xs uppercase font-bold tracking-widest mb-1",
                          theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
                        )}>Valgt Dato</div>
                        <h3 className={cn(
                          "text-3xl font-bold",
                          theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
                        )}>{formatDateDisplay(selectedDateIso)}</h3>
                     </div>
                     <div className="text-right">
                       <div className={cn(
                         "text-xs uppercase font-bold tracking-widest mb-1",
                         theme === 'classic' ? "text-slate-500" : "text-slate-500"
                       )}>Tidsrum</div>
                       <div className={cn(
                         "font-mono px-2 py-1 rounded",
                         theme === 'classic' ? "bg-slate-200 text-slate-800" : "bg-slate-700 text-white"
                       )}>{getDayHours(selectedDateIso)}</div>
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
                       <label className={cn("block text-xs font-bold uppercase tracking-wider mb-1", theme === 'classic' ? "text-slate-500" : "text-slate-400")}>Navn / Firma</label>
                       <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        required 
                        className={cn(
                          "w-full border rounded-sm p-3 focus:outline-none",
                          theme === 'classic' ? "bg-white border-slate-300 text-slate-900 focus:border-[#c29b62]" : "bg-slate-900 border-slate-600 text-white focus:border-orange-500"
                        )} 
                       />
                     </div>
                     <div>
                       <label className={cn("block text-xs font-bold uppercase tracking-wider mb-1", theme === 'classic' ? "text-slate-500" : "text-slate-400")}>Telefon</label>
                       <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        required 
                        className={cn(
                          "w-full border rounded-sm p-3 focus:outline-none",
                          theme === 'classic' ? "bg-white border-slate-300 text-slate-900 focus:border-[#c29b62]" : "bg-slate-900 border-slate-600 text-white focus:border-orange-500"
                        )} 
                       />
                     </div>
                     <div>
                       <label className={cn("block text-xs font-bold uppercase tracking-wider mb-1", theme === 'classic' ? "text-slate-500" : "text-slate-400")}>Email</label>
                       <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                        className={cn(
                          "w-full border rounded-sm p-3 focus:outline-none",
                          theme === 'classic' ? "bg-white border-slate-300 text-slate-900 focus:border-[#c29b62]" : "bg-slate-900 border-slate-600 text-white focus:border-orange-500"
                        )} 
                       />
                     </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className={cn("block text-xs font-bold uppercase tracking-wider mb-1", theme === 'classic' ? "text-slate-500" : "text-slate-400")}>Tidsrum</label>
                    
                    {isPartial(selectedDateIso) ? (
                       <div className={cn(
                         "p-3 border rounded-sm text-sm",
                         theme === 'classic' ? "bg-white border-slate-300 text-slate-600" : "bg-slate-900 border-slate-600 text-slate-300"
                       )}>
                         Fastsat tid: <strong>{getMaxHours(selectedDateIso)} timer</strong> ({getDayHours(selectedDateIso)})
                       </div>
                    ) : (
                       <div className="grid grid-cols-2 gap-4">
                         <div>
                           <label className={cn("block text-[10px] uppercase tracking-wider mb-1", theme === 'classic' ? "text-slate-400" : "text-slate-500")}>Starttidspunkt</label>
                           <input 
                             type="time" 
                             value={startTime}
                             onChange={(e) => setStartTime(e.target.value)}
                             className={cn(
                               "w-full border rounded-sm p-3 focus:outline-none",
                               theme === 'classic' ? "bg-white border-slate-300 text-slate-900 focus:border-[#c29b62]" : "bg-slate-900 text-white border-slate-600 focus:border-orange-500"
                             )}
                           />
                         </div>
                         <div>
                           <label className={cn("block text-[10px] uppercase tracking-wider mb-1", theme === 'classic' ? "text-slate-400" : "text-slate-500")}>Sluttidspunkt</label>
                           <input 
                             type="time" 
                             value={endTime}
                             onChange={(e) => setEndTime(e.target.value)}
                             className={cn(
                               "w-full border rounded-sm p-3 focus:outline-none",
                               theme === 'classic' ? "bg-white border-slate-300 text-slate-900 focus:border-[#c29b62]" : "bg-slate-900 text-white border-slate-600 focus:border-orange-500"
                             )}
                           />
                         </div>
                       </div>
                    )}
                  </div>
                  
                  <div>
                     <label className={cn("block text-xs font-bold uppercase tracking-wider mb-1", theme === 'classic' ? "text-slate-500" : "text-slate-400")}>Kort Beskrivelse</label>
                     <textarea 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      rows={2} 
                      className={cn(
                        "w-full border rounded-sm p-3 focus:outline-none",
                        theme === 'classic' ? "bg-white border-slate-300 text-slate-900 focus:border-[#c29b62]" : "bg-slate-900 border-slate-600 text-white focus:border-orange-500"
                      )}
                     ></textarea>
                  </div>

                  {/* Price Display */}
                  <div className={cn(
                    "p-4 rounded-sm border",
                    theme === 'classic' ? "bg-white border-slate-200" : "bg-slate-900 border-slate-700"
                  )}>
                    <div className="flex justify-between items-end">
                      <div>
                         <div className={cn("text-xs", theme === 'classic' ? "text-slate-500" : "text-slate-400")}>Timepris</div>
                         <div className={cn("text-sm", theme === 'classic' ? "text-slate-700" : "text-slate-300")}>{getCurrentHourlyRate()} kr.</div>
                      </div>
                      <div className="text-center">
                         <div className={cn("text-xs", theme === 'classic' ? "text-slate-500" : "text-slate-400")}>Antal Timer</div>
                         <div className={cn("text-sm font-bold", theme === 'classic' ? "text-slate-700" : "text-slate-300")}>{calculateTotalHours()} timer</div>
                      </div>
                      <div className="text-right">
                         <div className={cn("text-xs", theme === 'classic' ? "text-slate-500" : "text-slate-400")}>Total (ekskl. moms)</div>
                         <div className={cn("text-2xl font-bold", theme === 'classic' ? "text-slate-900" : "text-white")}>{calculatePrice()} kr.</div>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting || calculateTotalHours() <= 0}
                    className={cn(
                      "w-full text-white font-bold uppercase tracking-widest py-4 rounded-sm shadow-lg transition-all",
                      theme === 'classic' 
                        ? "bg-[#c29b62] hover:bg-[#a07d4b] disabled:bg-slate-400 shadow-[#c29b62]/30" 
                        : "bg-orange-600 hover:bg-orange-500 disabled:bg-slate-600 shadow-orange-900/50"
                    )}>
                    {isSubmitting ? 'Sender...' : 'Bekræft Booking'}
                  </button>
                </form>
              </div>
            ) : (
              /* Empty State */
              <div className={cn(
                "h-full flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-sm",
                theme === 'classic' ? "border-slate-300 text-slate-500" : "border-slate-700 text-slate-600"
              )}>
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
