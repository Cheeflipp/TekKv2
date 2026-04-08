"use client";

import React, { useState } from 'react';
import CompetenceWheel from '../../components/competence-wheel';
import CompetenceGrid from '../../components/competence-grid';
import { cn } from '../../lib/utils';
import { useTheme } from '../../lib/theme-context';

export default function KompetencerPage() {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<'wheel' | 'grid'>('grid');

  return (
    <div className={cn(
      "flex-grow flex flex-col justify-start overflow-x-hidden transition-colors duration-300",
      theme === 'classic' ? "bg-white" : "bg-slate-900"
    )}>
      <section className="pt-12 pb-8 md:pt-16 md:pb-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4 relative z-10">
            <div>
              <h2 className={cn(
                "font-bold tracking-widest uppercase text-sm mb-2",
                theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
              )}>Mine Kompetencer</h2>
              <h3 className={cn(
                "text-4xl md:text-5xl font-bold",
                theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
              )}>Hvad kan jeg</h3>
            </div>
            
            <div className="flex flex-col items-end gap-4">
              <p className={cn(
                "max-w-md text-right hidden md:block",
                theme === 'classic' ? "text-slate-600" : "text-slate-400"
              )}>
                Mange års erfaring med praktisk arbejde. <br/>Ingen opgave er for lille.
              </p>
              
              {/* View Toggle */}
              <div className={cn(
                "hidden p-1 rounded-sm border",
                theme === 'classic' ? "bg-slate-100 border-slate-200" : "bg-slate-800 border-slate-700"
              )}>
                <button
                  onClick={() => setViewMode('wheel')}
                  className={cn(
                    "px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-sm transition-all",
                    viewMode === 'wheel' 
                      ? (theme === 'classic' ? "bg-white text-slate-900 shadow-sm" : "bg-slate-700 text-white")
                      : (theme === 'classic' ? "text-slate-500 hover:text-slate-700" : "text-slate-400 hover:text-white")
                  )}
                >
                  Karrusel
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-sm transition-all",
                    viewMode === 'grid' 
                      ? (theme === 'classic' ? "bg-white text-slate-900 shadow-sm" : "bg-slate-700 text-white")
                      : (theme === 'classic' ? "text-slate-500 hover:text-slate-700" : "text-slate-400 hover:text-white")
                  )}
                >
                  Oversigt
                </button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="mb-12 min-h-[600px] flex items-center justify-center">
            {viewMode === 'wheel' ? (
              <CompetenceWheel />
            ) : (
              <CompetenceGrid />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
