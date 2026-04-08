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
      theme === 'classic' ? "bg-slate-50" : "bg-slate-900"
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

      {/* Classic Theme Backgrounds */}
      {theme === 'classic' && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {bgVersion === 1 && (
            /* Version 1: Soft flowing waves (like img 1) */
            <div className="absolute inset-0 opacity-30">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,30 C30,60 70,10 100,40 L100,100 L0,100 Z" fill="url(#grad1)" />
                <path d="M0,60 C40,30 60,80 100,50 L100,100 L0,100 Z" fill="url(#grad2)" opacity="0.6" />
                <path d="M0,80 C30,50 80,90 100,70 L100,100 L0,100 Z" fill="url(#grad3)" opacity="0.4" />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c29b62" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a07d4b" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad3" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#e5d5b5" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {bgVersion === 2 && (
            /* Version 2: Top and bottom framing waves (slightly darker) */
            <div className="absolute inset-0 opacity-40">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,0 L100,0 L100,25 C70,45 30,5 0,30 Z" fill="url(#grad1_v2)" />
                <path d="M0,100 L100,100 L100,75 C60,55 40,95 0,70 Z" fill="url(#grad2_v2)" />
                <defs>
                  <linearGradient id="grad1_v2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c29b62" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad2_v2" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#a07d4b" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {bgVersion === 3 && (
            /* Version 3: Diagonal sweeping waves */
            <div className="absolute inset-0 opacity-35">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,0 L40,0 C60,40 30,70 100,90 L100,100 L0,100 Z" fill="url(#grad1_v3)" />
                <path d="M0,30 C40,60 50,40 100,100 L0,100 Z" fill="url(#grad2_v3)" opacity="0.7" />
                <path d="M0,60 C30,80 60,70 80,100 L0,100 Z" fill="url(#grad3_v3)" opacity="0.5" />
                <defs>
                  <linearGradient id="grad1_v3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c29b62" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad2_v3" x1="0%" y1="50%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a07d4b" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad3_v3" x1="0%" y1="100%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#e5d5b5" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {bgVersion === 4 && (
            /* Version 4: Multiple layered bottom waves (darker, more waves) */
            <div className="absolute inset-0 opacity-45">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,40 C30,70 50,30 100,50 L100,100 L0,100 Z" fill="url(#grad1_v4)" />
                <path d="M0,55 C25,45 60,80 100,65 L100,100 L0,100 Z" fill="url(#grad2_v4)" opacity="0.8" />
                <path d="M0,70 C40,60 70,90 100,75 L100,100 L0,100 Z" fill="url(#grad3_v4)" opacity="0.6" />
                <path d="M0,85 C50,75 80,95 100,85 L100,100 L0,100 Z" fill="url(#grad1_v4)" opacity="0.4" />
                <defs>
                  <linearGradient id="grad1_v4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c29b62" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad2_v4" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a07d4b" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad3_v4" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#8b6b40" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {bgVersion === 5 && (
            /* Version 5: Massive, wide, dramatic waves */
            <div className="absolute inset-0 opacity-35">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,10 C50,90 80,-10 100,50 L100,100 L0,100 Z" fill="url(#grad1_v5)" />
                <path d="M0,40 C40,100 90,10 100,70 L100,100 L0,100 Z" fill="url(#grad2_v5)" opacity="0.7" />
                <defs>
                  <linearGradient id="grad1_v5" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a07d4b" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad2_v5" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#c29b62" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
        </div>
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
