"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBooking } from '../lib/booking-context';
import { cn } from '../lib/utils';
import { useTheme } from '../lib/theme-context';

export default function HomePage() {
  const { fetchAvailability, isDateAvailable } = useBooking();
  const { theme } = useTheme();

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
      theme === 'classic' ? "bg-white" : "bg-slate-900"
    )}>
      {/* Dark Overlay & Background */}
      {theme === 'modern' && (
        <>
          <div className="absolute inset-0 z-0 opacity-40">
            <Image 
              src="https://picsum.photos/seed/industrial_dark/1600/900" 
              alt="Industrial Background" 
              fill
              priority
              className="object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60 z-10"></div>
        </>
      )}
      
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
          Lej mig ind som maskinmester, konsulent eller ekstra arbejdskraft. <br/>
          <span className={cn(
            "font-medium",
            theme === 'classic' ? "text-slate-900" : "text-white"
          )}>Tjek min ledighed og book tid direkte i kalenderen.</span>
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
          <Link href="/booking" className={cn(
            "px-10 py-4 rounded-sm font-bold uppercase tracking-widest transition-all hover:-translate-y-1",
            theme === 'classic' 
              ? "bg-[#c29b62] hover:bg-[#a07d4b] text-white shadow-lg shadow-[#c29b62]/30" 
              : "bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-900/50"
          )}>
            Se Kalender
          </Link>
          <Link href="/kompetencer" className={cn(
            "px-10 py-4 rounded-sm font-bold uppercase tracking-widest transition-all border",
            theme === 'classic'
              ? "bg-transparent border-slate-300 hover:border-[#c29b62] text-slate-600 hover:text-[#c29b62]"
              : "bg-transparent border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white"
          )}>
            Hvad kan jeg?
          </Link>
        </div>
      </div>
    </section>
  );
}
