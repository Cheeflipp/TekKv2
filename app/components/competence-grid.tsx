"use client";

import React from 'react';
import { useTheme } from '../lib/theme-context';
import { cn } from '../lib/utils';
import { competences } from '../lib/competences';

export default function CompetenceGrid() {
  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl mx-auto">
      {competences.map((card) => (
        <div 
          key={card.id}
          className={cn(
            "group relative overflow-hidden rounded-sm border-2 p-6 md:p-8 transition-all duration-300",
            theme === 'classic' 
              ? "bg-white border-slate-200 hover:border-[#c29b62] shadow-sm hover:shadow-xl" 
              : "bg-slate-800 border-slate-700 hover:border-orange-500 hover:bg-slate-700"
          )}
        >
          {/* Decorative background element */}
          <div className={cn(
            "absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-all duration-500",
            theme === 'classic'
              ? "bg-slate-100 group-hover:bg-[#c29b62]/10"
              : "bg-slate-600/10 group-hover:bg-orange-500/10"
          )}></div>

          <h4 className={cn(
            "text-xl md:text-2xl font-bold mb-4 relative z-10 transition-colors",
            theme === 'classic' 
              ? "text-slate-900 font-serif group-hover:text-[#c29b62]" 
              : "text-white group-hover:text-orange-400"
          )}>
            {card.title}
          </h4>
          
          <p className={cn(
            "text-sm md:text-base mb-6 leading-relaxed relative z-10",
            theme === 'classic' ? "text-slate-600" : "text-slate-400"
          )}>
            {card.desc}
          </p>
          
          {card.bullets && card.bullets.length > 0 && (
            <ul className={cn(
              "text-sm space-y-2 relative z-10",
              theme === 'classic' ? "text-slate-600" : "text-slate-400 group-hover:text-slate-300"
            )}>
              {card.bullets.map((b, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full flex-shrink-0",
                    theme === 'classic' ? "bg-[#c29b62]" : "bg-orange-500"
                  )}></span>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
