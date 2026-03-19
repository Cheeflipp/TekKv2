import React from 'react';
import CompetenceWheel from '../../components/competence-wheel';

export default function KompetencerPage() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <section className="py-12 md:py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-4 md:mb-16 gap-4 relative z-10">
            <div>
              <h2 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2">Mine Kompetencer</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white">Hvad jeg kan tilbyde</h3>
            </div>
            <p className="text-slate-400 max-w-md text-right hidden md:block">
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
