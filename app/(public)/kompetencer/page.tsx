"use client";

import React from 'react';
import CompetenceWheel from '../../components/competence-wheel';
import { cn } from '../../lib/utils';
import { useTheme } from '../../lib/theme-context';

export default function KompetencerPage() {
  const { theme } = useTheme();

  return (
    <div className={cn(
      "min-h-screen overflow-x-hidden transition-colors duration-300",
      theme === 'classic' ? "bg-white" : "bg-slate-900"
    )}>
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-4 md:mb-16 gap-4 relative z-10">
            <div>
              <h2 className={cn(
                "font-bold tracking-widest uppercase text-sm mb-2",
                theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
              )}>Mine Kompetencer</h2>
              <h3 className={cn(
                "text-4xl md:text-5xl font-bold",
                theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
              )}>Hvad jeg kan tilbyde</h3>
            </div>
            <p className={cn(
              "max-w-md text-right hidden md:block",
              theme === 'classic' ? "text-slate-600" : "text-slate-400"
            )}>
              Mange års erfaring med praktisk arbejde. <br/>Ingen opgave er for lille.
            </p>
          </div>

          {/* 3D Wheel Section */}
          <div className="mb-24">
            <CompetenceWheel />
          </div>
        </div>
      </section>
    </div>
  );
}
