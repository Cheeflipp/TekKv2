"use client";

import React from 'react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../lib/theme-context';

export default function KontaktPage() {
  const { theme } = useTheme();

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      theme === 'classic' ? "bg-white" : "bg-slate-900"
    )}>
      <section className={cn(
        "py-24",
        theme === 'classic' ? "bg-slate-50" : "bg-slate-900"
      )}>
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className={cn(
            "text-sm font-bold uppercase tracking-widest mb-4",
            theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
          )}>Kontakt</h2>
          <h3 className={cn(
            "text-4xl md:text-5xl font-bold mb-6",
            theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
          )}>Bare spørg</h3>
          <div className={cn(
            "max-w-2xl mx-auto mb-12 text-lg leading-relaxed",
            theme === 'classic' ? "text-slate-600" : "text-slate-400"
          )}>
            <p className="mb-4">
              Fik du ikke svar på alt her på siden? Måske har du en større opgave og vil forhøre dig om mængderabat, eller også har du brug for hjælp på en dag, der ellers står som lukket i kalenderen.
            </p>
            <p>
              Uanset hvad det drejer sig om, er du altid velkommen til at tage fat i mig. Send en besked via formularen herunder, eller ring direkte på <strong className={theme === 'classic' ? "text-slate-800" : "text-slate-200"}>tlf. 12 34 56 78</strong>.
            </p>
          </div>
          
          <div className={cn(
            "p-8 md:p-12 rounded-sm shadow-xl border",
            theme === 'classic' ? "bg-white border-slate-200" : "bg-slate-800 border-slate-700"
          )}>
            <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={cn(
                    "block text-xs uppercase font-bold mb-2",
                    theme === 'classic' ? "text-slate-600" : "text-slate-500"
                  )}>Dit Navn / Firma</label>
                  <input type="text" className={cn(
                    "w-full p-4 rounded-sm focus:outline-none focus:ring-1 transition-colors",
                    theme === 'classic' 
                      ? "bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#c29b62] focus:ring-[#c29b62]" 
                      : "bg-slate-900 border border-slate-700 text-white focus:border-orange-500 focus:ring-orange-500"
                  )} placeholder="Indtast navn" />
                </div>
                <div>
                  <label className={cn(
                    "block text-xs uppercase font-bold mb-2",
                    theme === 'classic' ? "text-slate-600" : "text-slate-500"
                  )}>Telefonnummer</label>
                  <input type="tel" className={cn(
                    "w-full p-4 rounded-sm focus:outline-none focus:ring-1 transition-colors",
                    theme === 'classic' 
                      ? "bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#c29b62] focus:ring-[#c29b62]" 
                      : "bg-slate-900 border border-slate-700 text-white focus:border-orange-500 focus:ring-orange-500"
                  )} placeholder="+45 00 00 00 00" />
                </div>
              </div>
              <div>
                <label className={cn(
                  "block text-xs uppercase font-bold mb-2",
                  theme === 'classic' ? "text-slate-600" : "text-slate-500"
                )}>Hvad drejer det sig om?</label>
                <textarea rows={4} className={cn(
                  "w-full p-4 rounded-sm focus:outline-none focus:ring-1 transition-colors",
                  theme === 'classic' 
                    ? "bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#c29b62] focus:ring-[#c29b62]" 
                    : "bg-slate-900 border border-slate-700 text-white focus:border-orange-500 focus:ring-orange-500"
                )} placeholder="Beskriv opgaven kort..."></textarea>
              </div>
              <button className={cn(
                "w-full font-bold uppercase tracking-widest py-4 rounded-sm transition-colors",
                theme === 'classic' ? "bg-[#c29b62] hover:bg-[#a88655] text-white" : "bg-orange-600 hover:bg-orange-500 text-white"
              )}>
                Send Forespørgsel
              </button>
            </form>
            <div className={cn(
              "mt-8 pt-8 border-t text-sm",
              theme === 'classic' ? "border-slate-200 text-slate-500" : "border-slate-700 text-slate-500"
            )}>
              Eller ring direkte på <span className={cn(
                "font-bold cursor-pointer transition-colors",
                theme === 'classic' ? "text-slate-900 hover:text-[#c29b62]" : "text-white hover:text-orange-500"
              )}>+45 12 34 56 78</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
