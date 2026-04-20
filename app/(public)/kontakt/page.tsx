"use client";

import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../lib/theme-context';
import { sendContactEmail } from '../../actions/email';

export default function KontaktPage() {
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;
    
    setStatus('loading');
    const res = await sendContactEmail(formData);
    
    if (res.success) {
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      "bg-transparent"
    )}>
      <section className={cn(
        "py-24",
        "bg-transparent"
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
              Uanset hvad det drejer sig om, er du altid velkommen til at tage fat i mig. Send en besked via formularen herunder, eller ring direkte på <strong className={theme === 'classic' ? "text-slate-800" : "text-slate-200"}>tlf. 31 69 44 02</strong>.
            </p>
          </div>
          
          <div className={cn(
            "p-8 md:p-12 rounded-sm shadow-xl border",
            theme === 'classic' ? "bg-white border-slate-200" : "bg-slate-800 border-slate-700"
          )}>
            {status === 'success' ? (
              <div className="py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h4 className={cn("text-2xl font-bold mb-2", theme === 'classic' ? "text-slate-900" : "text-white")}>
                  Tak for din besked!
                </h4>
                <p className={theme === 'classic' ? "text-slate-600" : "text-slate-400"}>
                  Jeg vender tilbage til dig hurtigst muligt.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className={cn(
                    "mt-8 px-6 py-2 rounded-sm font-bold uppercase tracking-widest transition-colors",
                    theme === 'classic' ? "hover:bg-slate-100 text-slate-600" : "hover:bg-slate-700 text-slate-300"
                  )}
                >
                  Send en ny besked
                </button>
              </div>
            ) : (
              <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={cn(
                      "block text-xs uppercase font-bold mb-2",
                      theme === 'classic' ? "text-slate-600" : "text-slate-500"
                    )}>Dit Navn / Firma *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className={cn(
                        "w-full p-4 rounded-sm focus:outline-none focus:ring-1 transition-colors",
                        theme === 'classic' 
                          ? "bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#c29b62] focus:ring-[#c29b62]" 
                          : "bg-slate-900 border border-slate-700 text-white focus:border-orange-500 focus:ring-orange-500"
                      )} placeholder="Indtast navn" 
                    />
                  </div>
                  <div>
                    <label className={cn(
                      "block text-xs uppercase font-bold mb-2",
                      theme === 'classic' ? "text-slate-600" : "text-slate-500"
                    )}>Telefonnummer *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className={cn(
                        "w-full p-4 rounded-sm focus:outline-none focus:ring-1 transition-colors",
                        theme === 'classic' 
                          ? "bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#c29b62] focus:ring-[#c29b62]" 
                          : "bg-slate-900 border border-slate-700 text-white focus:border-orange-500 focus:ring-orange-500"
                      )} placeholder="+45 00 00 00 00" 
                    />
                  </div>
                </div>
                <div>
                  <label className={cn(
                    "block text-xs uppercase font-bold mb-2",
                    theme === 'classic' ? "text-slate-600" : "text-slate-500"
                  )}>Email (Valgfri)</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className={cn(
                      "w-full p-4 rounded-sm focus:outline-none focus:ring-1 transition-colors",
                      theme === 'classic' 
                        ? "bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#c29b62] focus:ring-[#c29b62]" 
                        : "bg-slate-900 border border-slate-700 text-white focus:border-orange-500 focus:ring-orange-500"
                    )} placeholder="din@email.dk" 
                  />
                </div>
                <div>
                  <label className={cn(
                    "block text-xs uppercase font-bold mb-2",
                    theme === 'classic' ? "text-slate-600" : "text-slate-500"
                  )}>Hvad drejer det sig om? *</label>
                  <textarea 
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className={cn(
                      "w-full p-4 rounded-sm focus:outline-none focus:ring-1 transition-colors",
                      theme === 'classic' 
                        ? "bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#c29b62] focus:ring-[#c29b62]" 
                        : "bg-slate-900 border border-slate-700 text-white focus:border-orange-500 focus:ring-orange-500"
                    )} placeholder="Beskriv opgaven kort..."
                  ></textarea>
                </div>
                
                {status === 'error' && (
                  <div className="text-red-500 text-sm font-bold">
                    Der skete en fejl. Prøv venligst igen senere eller ring i stedet.
                  </div>
                )}
                
                <button 
                  disabled={status === 'loading'}
                  className={cn(
                    "w-full font-bold uppercase tracking-widest py-4 rounded-sm transition-colors disabled:opacity-50",
                    theme === 'classic' ? "bg-[#c29b62] hover:bg-[#a88655] text-white" : "bg-orange-600 hover:bg-orange-500 text-white"
                  )}>
                  {status === 'loading' ? 'Sender...' : 'Send Forespørgsel'}
                </button>
              </form>
            )}
            
            <div className={cn(
              "mt-8 pt-8 border-t text-sm",
              theme === 'classic' ? "border-slate-200 text-slate-500" : "border-slate-700 text-slate-500"
            )}>
              Eller ring direkte på <span className={cn(
                "font-bold cursor-pointer transition-colors",
                theme === 'classic' ? "text-slate-900 hover:text-[#c29b62]" : "text-white hover:text-orange-500"
              )}>+45 31 69 44 02</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
