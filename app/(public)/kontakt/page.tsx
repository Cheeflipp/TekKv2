"use client";

import React from 'react';

export default function KontaktPage() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">Kontakt</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-12">Klar til at tage fat?</h3>
          
          <div className="bg-slate-800 p-8 md:p-12 rounded-sm shadow-xl border border-slate-700">
            <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Dit Navn / Firma</label>
                  <input type="text" className="w-full bg-slate-900 border border-slate-700 text-white p-4 rounded-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors" placeholder="Indtast navn" />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Telefonnummer</label>
                  <input type="tel" className="w-full bg-slate-900 border border-slate-700 text-white p-4 rounded-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors" placeholder="+45 00 00 00 00" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Hvad drejer det sig om?</label>
                <textarea rows={4} className="w-full bg-slate-900 border border-slate-700 text-white p-4 rounded-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors" placeholder="Beskriv opgaven kort..."></textarea>
              </div>
              <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-widest py-4 rounded-sm transition-colors">
                Send Forespørgsel
              </button>
            </form>
            <div className="mt-8 pt-8 border-t border-slate-700 text-slate-500 text-sm">
              Eller ring direkte på <span className="text-white font-bold hover:text-orange-500 cursor-pointer transition-colors">+45 12 34 56 78</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
