"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBooking } from '../lib/booking-context';
import { cn } from '../lib/utils';
import { useTheme } from '../lib/theme-context';

export default function HomePage() {
  const { fetchAvailability, isDateAvailable } = useBooking();
  const { theme, bgVersion } = useTheme();

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  const isTodayAvailable = (): boolean => {
    const today = new Date().toISOString().split('T')[0];
    return isDateAvailable(today);
  };

  const available = isTodayAvailable();

  return (
    <section className={cn(
      "relative flex-grow min-h-[85vh] flex items-center justify-center overflow-hidden transition-colors duration-300",
      "bg-transparent"
    )}>
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center space-y-8">
        
        {/* Dynamic Status Badge */}
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md transition-colors duration-500",
          available 
            ? (theme === 'classic' ? "bg-green-50 border-green-200 text-green-700" : "bg-green-500/10 border-green-500/50 text-green-400")
            : (theme === 'classic' ? "bg-slate-100 border-slate-200 text-slate-600" : "bg-slate-800/50 border-slate-600/50 text-slate-400")
        )}>
          
          <span className="relative flex h-3 w-3">
            {available ? (
              <>
                <span className={cn(
                  "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                  theme === 'classic' ? "bg-green-500" : "bg-green-400"
                )}></span>
                <span className={cn(
                  "relative inline-flex rounded-full h-3 w-3",
                  theme === 'classic' ? "bg-green-600" : "bg-green-500"
                )}></span>
              </>
            ) : (
              <span className={cn(
                "relative inline-flex rounded-full h-3 w-3",
                theme === 'classic' ? "bg-slate-400" : "bg-slate-500"
              )}></span>
            )}
          </span>
          
          <span className="font-mono text-sm font-bold tracking-widest uppercase">
            {available ? 'LEDIG I DAG' : 'I ARBEJDE I DAG'}
          </span>
        </div>

        <h1 className={cn(
          "text-5xl md:text-7xl font-black leading-none tracking-tight uppercase",
          theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
        )}>
          Brug for en <br/>
          <span className={cn(
            "text-transparent bg-clip-text",
            theme === 'classic' ? "bg-gradient-to-r from-[#c29b62] to-[#a07d4b]" : "bg-gradient-to-r from-orange-400 to-orange-600"
          )}>Hånd?</span>
        </h1>
        
        <p className={cn(
          "text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed",
          theme === 'classic' ? "text-slate-600" : "text-slate-300"
        )}>
          Har du forefaldende arbejde, manglende mandskab eller akutte spidsbelastninger? <br />
          Så lej mig ind som tekniker, konsulent eller ekstra arbejdskraft. <br/>
          <span className={cn(
            "font-medium mt-2 inline-block",
            theme === 'classic' ? "text-slate-900" : "text-white"
          )}>Kontroller ledighed og book direkte i kalenderen.</span>
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
          <Link href="/ydelser" className={cn(
            "px-8 py-4 rounded-sm font-bold uppercase tracking-widest transition-all hover:-translate-y-1",
            theme === 'classic' 
              ? "bg-[#c29b62] hover:bg-[#a07d4b] text-white shadow-lg shadow-[#c29b62]/30" 
              : "bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-900/50"
          )}>
            Udforsk Ydelser
          </Link>
          <Link href="/booking" className={cn(
            "px-8 py-4 rounded-sm font-bold uppercase tracking-widest transition-all border",
            theme === 'classic'
              ? "bg-white/80 border-slate-300 hover:border-[#c29b62] text-slate-800 hover:text-[#c29b62] shadow-sm"
              : "bg-slate-800/80 border-slate-700 hover:border-orange-500 text-white hover:text-orange-400 shadow-sm"
          )}>
            Se Bookingkalender
          </Link>
          <Link href="/kompetencer" className={cn(
            "px-8 py-4 rounded-sm font-bold uppercase tracking-widest transition-all border",
            theme === 'classic'
              ? "bg-transparent border-slate-300 hover:border-[#c29b62] text-slate-600 hover:text-[#c29b62]"
              : "bg-transparent border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white"
          )}>
            Hvad kan jeg?
          </Link>
        </div>

        {/* 3 Quick Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-5xl mx-auto text-left">
          
          {/* Service 1: Indlejning */}
          <Link
            href="/booking"
            className={cn(
              "group relative overflow-hidden rounded-sm rounded-tr-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 block",
              theme === 'classic'
                ? "bg-white/90 border-slate-200 hover:border-[#c29b62] shadow-md hover:shadow-xl hover:shadow-[#c29b62]/10"
                : "bg-slate-800/90 border-slate-700 hover:border-orange-500 shadow-md shadow-black/20 hover:shadow-xl hover:shadow-black/40"
            )}
          >
            {/* Signature corner */}
            <div className={cn(
              "absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-all duration-500 pointer-events-none",
              theme === 'classic' ? "bg-slate-100 group-hover:bg-[#c29b62]/10" : "bg-slate-700/30 group-hover:bg-orange-500/10"
            )}></div>

            <div className="relative z-10">
              <span className={cn(
                "text-[10px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 rounded inline-block mb-3",
                theme === 'classic' ? "bg-slate-100 text-[#c29b62]" : "bg-slate-700 text-orange-400"
              )}>
                Ydelse 01
              </span>
              <h3 className={cn(
                "text-xl font-bold mb-2 group-hover:underline",
                theme === 'classic' ? "text-slate-900" : "text-white"
              )}>
                Indlejning
              </h3>
              <p className={cn(
                "text-sm leading-relaxed mb-4",
                theme === 'classic' ? "text-slate-600" : "text-slate-300"
              )}>
                Lej mig ind som smed, montør eller teknisk konsulent ved spidsbelastninger. Direkte online booking i kalenderen.
              </p>
              <span className={cn(
                "text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1",
                theme === 'classic' ? "text-[#c29b62]" : "text-orange-400"
              )}>
                <span>Gå til kalender</span> &rarr;
              </span>
            </div>
          </Link>

          {/* Service 2: Energioptimering */}
          <Link
            href="/ydelser/energioptimering"
            className={cn(
              "group relative overflow-hidden rounded-sm rounded-tr-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 block",
              theme === 'classic'
                ? "bg-white/90 border-slate-200 hover:border-[#c29b62] shadow-md hover:shadow-xl hover:shadow-[#c29b62]/10"
                : "bg-slate-800/90 border-slate-700 hover:border-orange-500 shadow-md shadow-black/20 hover:shadow-xl hover:shadow-black/40"
            )}
          >
            {/* Signature corner */}
            <div className={cn(
              "absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-all duration-500 pointer-events-none",
              theme === 'classic' ? "bg-slate-100 group-hover:bg-[#c29b62]/10" : "bg-slate-700/30 group-hover:bg-orange-500/10"
            )}></div>

            <div className="relative z-10">
              <span className={cn(
                "text-[10px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 rounded inline-block mb-3",
                theme === 'classic' ? "bg-slate-100 text-[#c29b62]" : "bg-slate-700 text-orange-400"
              )}>
                Ydelse 02
              </span>
              <h3 className={cn(
                "text-xl font-bold mb-2 group-hover:underline",
                theme === 'classic' ? "text-slate-900" : "text-white"
              )}>
                Energioptimering
              </h3>
              <p className={cn(
                "text-sm leading-relaxed mb-4",
                theme === 'classic' ? "text-slate-600" : "text-slate-300"
              )}>
                Energitekniske beregninger af sparepotentialer, trykluft, pumper og tilbagebetalingstid for SMV og industri.
              </p>
              <span className={cn(
                "text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1",
                theme === 'classic' ? "text-[#c29b62]" : "text-orange-400"
              )}>
                <span>Læs & prøv beregner</span> &rarr;
              </span>
            </div>
          </Link>

          {/* Service 3: Hvidevare & TV */}
          <Link
            href="/ydelser/hvidevare-tv-reparation"
            className={cn(
              "group relative overflow-hidden rounded-sm rounded-tr-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 block",
              theme === 'classic'
                ? "bg-white/90 border-slate-200 hover:border-[#c29b62] shadow-md hover:shadow-xl hover:shadow-[#c29b62]/10"
                : "bg-slate-800/90 border-slate-700 hover:border-orange-500 shadow-md shadow-black/20 hover:shadow-xl hover:shadow-black/40"
            )}
          >
            {/* Signature corner */}
            <div className={cn(
              "absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-all duration-500 pointer-events-none",
              theme === 'classic' ? "bg-slate-100 group-hover:bg-[#c29b62]/10" : "bg-slate-700/30 group-hover:bg-orange-500/10"
            )}></div>

            <div className="relative z-10">
              <span className={cn(
                "text-[10px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 rounded inline-block mb-3",
                theme === 'classic' ? "bg-slate-100 text-[#c29b62]" : "bg-slate-700 text-orange-400"
              )}>
                Ydelse 03
              </span>
              <h3 className={cn(
                "text-xl font-bold mb-2 group-hover:underline",
                theme === 'classic' ? "text-slate-900" : "text-white"
              )}>
                Hvidevare & TV
              </h3>
              <p className={cn(
                "text-sm leading-relaxed mb-4",
                theme === 'classic' ? "text-slate-600" : "text-slate-300"
              )}>
                Lokal fejlfinding og reparation af hårde hvidevarer og fladskærme. Send apparat og fejlbeskrivelse direkte til min mail.
              </p>
              <span className={cn(
                "text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1",
                theme === 'classic' ? "text-[#c29b62]" : "text-orange-400"
              )}>
                <span>Skriv til Christian</span> &rarr;
              </span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
