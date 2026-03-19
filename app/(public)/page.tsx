"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBooking } from '../lib/booking-context';
import { cn } from '../lib/utils';

export default function HomePage() {
  const { fetchAvailability, isDateAvailable } = useBooking();

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  const isTodayAvailable = (): boolean => {
    const today = new Date().toISOString().split('T')[0];
    return isDateAvailable(today);
  };

  const available = isTodayAvailable();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Dark Overlay & Background */}
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
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center space-y-8">
        
        {/* Dynamic Status Badge */}
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md transition-colors duration-500",
          available ? "bg-green-500/10 border-green-500/50 text-green-400" : "bg-slate-800/50 border-slate-600/50 text-slate-400"
        )}>
          
          <span className="relative flex h-3 w-3">
            {available ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-500"></span>
            )}
          </span>
          
          <span className="font-mono text-sm font-bold tracking-widest uppercase">
            {available ? 'LEDIG I DAG' : 'I ARBEJDE I DAG'}
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight uppercase">
          Brug for en <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Hånd?</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Tjek kalenderen for en ledig tid, <br/>
          <span className="text-white font-medium">lad os komme i mål sammen.</span>
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
          <Link href="/booking" className="bg-orange-600 hover:bg-orange-500 text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest shadow-lg shadow-orange-900/50 transition-all hover:-translate-y-1">
            Se Kalender
          </Link>
          <Link href="/kompetencer" className="bg-transparent border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest transition-all">
            Hvad kan jeg?
          </Link>
        </div>
      </div>
    </section>
  );
}
