"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Calendar, 
  ShieldCheck, 
  Wrench, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  FileText, 
  Phone, 
  Mail 
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../lib/theme-context';

export default function IndlejningInfoPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen py-16 md:py-24 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-5xl">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-xs font-mono tracking-widest uppercase">
          <Link 
            href="/ydelser" 
            className={cn(
              "hover:underline transition-colors",
              theme === 'classic' ? "text-slate-500 hover:text-[#c29b62]" : "text-slate-400 hover:text-orange-500"
            )}
          >
            Ydelser
          </Link>
          <span className="text-slate-400">/</span>
          <span className={theme === 'classic' ? "text-[#c29b62] font-bold" : "text-orange-500 font-bold"}>
            Indlejning
          </span>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mb-12">
          <h2 className={cn(
            "text-sm font-bold uppercase tracking-widest mb-3 inline-flex items-center gap-2",
            theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
          )}>
            <Users className="w-4 h-4" />
            Fleksibel Arbejdskraft & Konsulentbistand
          </h2>

          <h1 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight",
            theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
          )}>
            Indlejning af <br />
            <span className={cn(
              "text-transparent bg-clip-text",
              theme === 'classic' ? "bg-gradient-to-r from-[#c29b62] to-[#a07d4b]" : "bg-gradient-to-r from-orange-400 to-orange-600"
            )}>
              Teknisk Arbejdskraft
            </span>
          </h1>

          <p className={cn(
            "text-lg md:text-xl font-light leading-relaxed mb-8",
            theme === 'classic' ? "text-slate-600" : "text-slate-300"
          )}>
            Har du akutte spidsbelastninger, sygemeldinger eller store projekter i produktionen eller på montagen? Lej mig ind som uddannet elinstallatør, montør eller teknisk konsulent. Gennemskuelige timepriser og direkte booking i online kalenderen.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/booking"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4 rounded-sm font-bold text-xs uppercase tracking-widest transition-all shadow-lg",
                theme === 'classic'
                  ? "bg-[#c29b62] hover:bg-[#a07d4b] text-white shadow-[#c29b62]/30"
                  : "bg-orange-600 hover:bg-orange-500 text-white shadow-orange-950/40"
              )}
            >
              <Calendar className="w-4 h-4" />
              <span>Gå direkte til Bookingkalender</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/kompetencer"
              className={cn(
                "inline-flex items-center gap-2 px-6 py-4 rounded-sm font-bold text-xs uppercase tracking-widest transition-all border",
                theme === 'classic'
                  ? "bg-transparent border-slate-300 hover:border-[#c29b62] text-slate-700 hover:text-[#c29b62]"
                  : "bg-transparent border-slate-600 hover:border-orange-500 text-slate-300 hover:text-orange-400"
              )}
            >
              <span>Se alle kompetencer</span>
            </Link>
          </div>
        </div>

        {/* Key Areas Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          <div className={cn(
            "group relative overflow-hidden rounded-sm rounded-tr-2xl border-2 p-8 transition-all duration-300",
            theme === 'classic' ? "bg-white border-slate-200 shadow-md" : "bg-slate-800 border-slate-700 shadow-lg"
          )}>
            {/* Signature quarter circle */}
            <div className={cn(
              "absolute top-0 right-0 w-28 h-28 rounded-bl-full -mr-4 -mt-4 transition-all duration-500 pointer-events-none",
              theme === 'classic' ? "bg-slate-100 group-hover:bg-[#c29b62]/10" : "bg-slate-700/30 group-hover:bg-orange-500/10"
            )}></div>

            <div className="relative z-10">
              <h3 className={cn("text-2xl font-bold mb-4", theme === 'classic' ? "text-slate-900" : "text-white")}>
                Hvad kan du leje mig ind til?
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  'Uddannet elinstallatør (fejlfinding, styring og el-arbejde)',
                  'Rustfri TIG svejsning og montage',
                  'Pladearbejde, klip, buk og mekanisk tildannelse',
                  'Montage og rørføring på anlæg og byggepladser',
                  'Fejlfinding, vedligehold og teknisk service',
                  'AMR-funktion (Arbejdsmiljørepræsentant), sikkerhed og tilsyn'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
                    <span className={theme === 'classic' ? "text-slate-700" : "text-slate-300"}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={cn(
            "group relative overflow-hidden rounded-sm rounded-tr-2xl border-2 p-8 transition-all duration-300",
            theme === 'classic' ? "bg-white border-slate-200 shadow-md" : "bg-slate-800 border-slate-700 shadow-lg"
          )}>
            {/* Signature quarter circle */}
            <div className={cn(
              "absolute top-0 right-0 w-28 h-28 rounded-bl-full -mr-4 -mt-4 transition-all duration-500 pointer-events-none",
              theme === 'classic' ? "bg-slate-100 group-hover:bg-[#c29b62]/10" : "bg-slate-700/30 group-hover:bg-orange-500/10"
            )}></div>

            <div className="relative z-10">
              <h3 className={cn("text-2xl font-bold mb-4", theme === 'classic' ? "text-slate-900" : "text-white")}>
                Fordele ved TekK Indlejning
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  'Ingen faste lønomkostninger eller opsigelsesvarsler',
                  'Mød op med professionelt værktøj og stor faglig stolthed',
                  'Direkte digital booking – se ledige dage med det samme',
                  'Kombinerer praktisk el- og maskinteknisk håndværk med maskinmesterteori',
                  'Gennemskuelige takster specificeret direkte i kalenderen'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
                    <span className={theme === 'classic' ? "text-slate-700" : "text-slate-300"}>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Link
                  href="/booking"
                  className={cn(
                    "inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider transition-colors",
                    theme === 'classic' ? "text-[#c29b62] hover:text-[#a07d4b]" : "text-orange-400 hover:text-orange-300"
                  )}
                >
                  <span>Tjek ledighed og book her</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
