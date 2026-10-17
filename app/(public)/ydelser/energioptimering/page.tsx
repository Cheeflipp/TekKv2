"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  TrendingDown, 
  Building2, 
  Factory, 
  CheckCircle2, 
  ArrowRight, 
  Gauge, 
  ShieldCheck, 
  Flame, 
  Clock, 
  Phone, 
  Mail, 
  FileText 
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../lib/theme-context';
import { sendEnergyInquiryEmail } from '../../../actions/email';

export default function EnergioptimeringPage() {
  const { theme } = useTheme();

  // Inquiry form state
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    facilityType: 'Mindre virksomhed / Værksted',
    focusAreas: 'Pumper, ventilation & procesoptimering',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.phone || !formData.email) return;

    setFormStatus('loading');
    const res = await sendEnergyInquiryEmail(formData);
    if (res.success) {
      setFormStatus('success');
    } else {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen py-16 md:py-24 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Breadcrumb / Top label */}
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
            Energioptimering
          </span>
        </div>

        {/* Hero Banner */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <h2 className={cn(
            "text-sm font-bold uppercase tracking-widest mb-3 inline-flex items-center gap-2",
            theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
          )}>
            <Zap className="w-4 h-4" />
            Teknisk Rådgivning & Beregning
          </h2>

          <h1 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight",
            theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
          )}>
            Energioptimering & <br />
            <span className={cn(
              "text-transparent bg-clip-text",
              theme === 'classic' ? "bg-gradient-to-r from-[#c29b62] to-[#a07d4b]" : "bg-gradient-to-r from-orange-400 to-orange-600"
            )}>
              Energitekniske Beregninger
            </span>
          </h1>

          <p className={cn(
            "text-lg md:text-xl font-light leading-relaxed mb-6",
            theme === 'classic' ? "text-slate-600" : "text-slate-300"
          )}>
            Høje energipriser og krav til grøn omstilling gør det mere rentabelt end nogensinde at minimere energispild. Med en solid maskinmesterfaglig ballast udarbejder jeg præcise beregninger af energipotentialer, investeringsomkostninger og tilbagebetalingstid for både mindre virksomheder og større industrifaciliteter.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#kontakt-form"
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-all",
                theme === 'classic'
                  ? "bg-[#c29b62] hover:bg-[#a07d4b] text-white shadow-md hover:shadow-lg hover:shadow-[#c29b62]/20"
                  : "bg-orange-600 hover:bg-orange-500 text-white shadow-md hover:shadow-lg hover:shadow-orange-950/40"
              )}
            >
              <span>Få et uforpligtende energitjek</span>
            </a>

            <Link
              href="/kontakt"
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-all border",
                theme === 'classic'
                  ? "bg-transparent border-slate-300 hover:border-[#c29b62] text-slate-700 hover:text-[#c29b62]"
                  : "bg-transparent border-slate-600 hover:border-orange-500 text-slate-300 hover:text-orange-400"
              )}
            >
              <span>Kontakt mig direkte</span>
            </Link>
          </div>
        </div>

        {/* Target Audience: Smaller vs Larger Companies */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className={cn(
              "text-3xl font-bold mb-3",
              theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
            )}>
              Løsninger tilpasset din virksomhedsstørrelse
            </h3>
            <p className={theme === 'classic' ? "text-slate-600" : "text-slate-400"}>
              Uanset om I er et mindre håndværks- eller produktionsværksted eller en større procesvirksomhed, findes der konkrete gevinster ved at optimere de tekniske anlæg.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Mindre Virksomheder Card */}
            <div className={cn(
              "group relative overflow-hidden rounded-sm rounded-tr-2xl border-2 p-8 transition-all duration-300 hover:-translate-y-1",
              theme === 'classic'
                ? "bg-white border-slate-200 hover:border-[#c29b62] shadow-md hover:shadow-xl hover:shadow-[#c29b62]/10"
                : "bg-slate-800 border-slate-700 hover:border-orange-500 hover:bg-slate-750 shadow-md shadow-black/20 hover:shadow-xl hover:shadow-black/40"
            )}>
              {/* Quarter-circle decorative element */}
              <div className={cn(
                "absolute top-0 right-0 w-28 h-28 rounded-bl-full -mr-4 -mt-4 transition-all duration-500 pointer-events-none",
                theme === 'classic' ? "bg-slate-100 group-hover:bg-[#c29b62]/10" : "bg-slate-700/30 group-hover:bg-orange-500/10"
              )}></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn(
                    "p-3 rounded-sm",
                    theme === 'classic' ? "bg-slate-100 text-[#c29b62]" : "bg-slate-700 text-orange-500"
                  )}>
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className={cn(
                      "text-xs font-mono uppercase tracking-wider font-bold block",
                      theme === 'classic' ? "text-[#a07d4b]" : "text-orange-400"
                    )}>
                      SMV, Værksteder & Håndværk
                    </span>
                    <h4 className={cn("text-2xl font-bold", theme === 'classic' ? "text-slate-900" : "text-white")}>
                      Mindre Virksomheder
                    </h4>
                  </div>
                </div>

                <p className={cn("text-base leading-relaxed mb-6", theme === 'classic' ? "text-slate-600" : "text-slate-300")}>
                  Fokus på hurtige gevinster og lavthængende frugter, hvor investeringen typisk er tjent hjem på under et år uden tunge konsulentomkostninger.
                </p>

                <ul className="space-y-3">
                  {[
                    'Pumpe- & kredsløbsoptimering: Trykreduktion, frekvensstyring og korrekt indregulering',
                    'Ventilation & udsugning: Behovsstyring og tidsstyring frem for kontinuerlig fuldlast',
                    'Varmestyring i haller & værksteder: Natsænkning og minimering af varmetab ved porte',
                    'Belysning & tomgangsforbrug: Identificering af anlæg der kører unødigt uden for driftstid',
                    'Overskuelig handlingsplan uden tungt og uforståeligt fagsprog'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className={cn(
                        "w-4 h-4 shrink-0 mt-0.5",
                        theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
                      )} />
                      <span className={theme === 'classic' ? "text-slate-700" : "text-slate-300"}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Større Virksomheder Card */}
            <div className={cn(
              "group relative overflow-hidden rounded-sm rounded-tr-2xl border-2 p-8 transition-all duration-300 hover:-translate-y-1",
              theme === 'classic'
                ? "bg-white border-slate-200 hover:border-[#c29b62] shadow-md hover:shadow-xl hover:shadow-[#c29b62]/10"
                : "bg-slate-800 border-slate-700 hover:border-orange-500 hover:bg-slate-750 shadow-md shadow-black/20 hover:shadow-xl hover:shadow-black/40"
            )}>
              {/* Quarter-circle decorative element */}
              <div className={cn(
                "absolute top-0 right-0 w-28 h-28 rounded-bl-full -mr-4 -mt-4 transition-all duration-500 pointer-events-none",
                theme === 'classic' ? "bg-slate-100 group-hover:bg-[#c29b62]/10" : "bg-slate-700/30 group-hover:bg-orange-500/10"
              )}></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn(
                    "p-3 rounded-sm",
                    theme === 'classic' ? "bg-slate-100 text-[#c29b62]" : "bg-slate-700 text-orange-500"
                  )}>
                    <Factory className="w-6 h-6" />
                  </div>
                  <div>
                    <span className={cn(
                      "text-xs font-mono uppercase tracking-wider font-bold block",
                      theme === 'classic' ? "text-[#a07d4b]" : "text-orange-400"
                    )}>
                      Industri, Produktion & Proces
                    </span>
                    <h4 className={cn("text-2xl font-bold", theme === 'classic' ? "text-slate-900" : "text-white")}>
                      Større Virksomheder
                    </h4>
                  </div>
                </div>

                <p className={cn("text-base leading-relaxed mb-6", theme === 'classic' ? "text-slate-600" : "text-slate-300")}>
                  Dybdegående teknisk kortlægning af komplekse forsynings- og procesanlæg, hvor selv få procents effektivisering frigør markante beløb.
                </p>

                <ul className="space-y-3">
                  {[
                    'Varmegenvinding: Udnyttelse af overskudsvarme fra proces, køleanlæg og røggas',
                    'Frekvensstyring (VFD) på pumper og blæsere: Energibesparelser efter affinitetslovene',
                    'Damp- og kondensatsystemer: Isolering af ventiler, flanger og test af vandudskillere',
                    'Køleanlæg & varmevekslere: Optimering af COP-værdier og driftstryk',
                    'Grundige energitekniske beregninger med Simple Payback, NPV og LCC'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className={cn(
                        "w-4 h-4 shrink-0 mt-0.5",
                        theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
                      )} />
                      <span className={theme === 'classic' ? "text-slate-700" : "text-slate-300"}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact / Inquiry Form Section */}
        <div id="kontakt-form" className="scroll-mt-24">
          <div className={cn(
            "p-8 md:p-12 rounded-sm rounded-tr-3xl border-2 relative overflow-hidden shadow-xl",
            theme === 'classic' ? "bg-white border-slate-200" : "bg-slate-800 border-slate-700"
          )}>
            {/* Signature quarter circle */}
            <div className={cn(
              "absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-4 -mt-4 pointer-events-none",
              theme === 'classic' ? "bg-slate-100" : "bg-slate-700/20"
            )}></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className={cn(
                  "text-xs font-mono uppercase tracking-widest font-bold block mb-2",
                  theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
                )}>
                  Kom i gang
                </span>
                <h3 className={cn(
                  "text-3xl md:text-4xl font-bold tracking-tight mb-3",
                  theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
                )}>
                  Book et uforpligtende energitjek
                </h3>
                <p className={cn("text-base", theme === 'classic' ? "text-slate-600" : "text-slate-400")}>
                  Udfyld formularen herunder, eller ring direkte på <strong className={theme === 'classic' ? "text-slate-900" : "text-white"}>31 69 44 02</strong> for en indledende snak om potentialet i jeres virksomhed.
                </p>
              </div>

              {formStatus === 'success' ? (
                <div className="py-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className={cn("text-2xl font-bold mb-2", theme === 'classic' ? "text-slate-900" : "text-white")}>
                    Tak for din henvendelse!
                  </h4>
                  <p className={cn("mb-6", theme === 'classic' ? "text-slate-600" : "text-slate-400")}>
                    Jeg har modtaget dine oplysninger og kontakter dig snarest muligt for at aftale det videre forløb.
                  </p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className={cn(
                      "px-6 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-colors",
                      theme === 'classic' ? "bg-slate-100 hover:bg-slate-200 text-slate-800" : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                    )}
                  >
                    Send en ny besked
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={cn(
                        "block text-xs uppercase font-bold mb-2",
                        theme === 'classic' ? "text-slate-600" : "text-slate-400"
                      )}>
                        Virksomhedens Navn *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="F.eks. Jensen Maskinværksted ApS"
                        className={cn(
                          "w-full p-3.5 rounded-sm border focus:outline-none focus:ring-1 transition-colors text-sm",
                          theme === 'classic'
                            ? "bg-slate-50 border-slate-300 focus:border-[#c29b62] text-slate-900"
                            : "bg-slate-900 border-slate-700 focus:border-orange-500 text-white"
                        )}
                      />
                    </div>

                    <div>
                      <label className={cn(
                        "block text-xs uppercase font-bold mb-2",
                        theme === 'classic' ? "text-slate-600" : "text-slate-400"
                      )}>
                        Kontaktperson *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="Dit fulde navn"
                        className={cn(
                          "w-full p-3.5 rounded-sm border focus:outline-none focus:ring-1 transition-colors text-sm",
                          theme === 'classic'
                            ? "bg-slate-50 border-slate-300 focus:border-[#c29b62] text-slate-900"
                            : "bg-slate-900 border-slate-700 focus:border-orange-500 text-white"
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={cn(
                        "block text-xs uppercase font-bold mb-2",
                        theme === 'classic' ? "text-slate-600" : "text-slate-400"
                      )}>
                        Telefonnummer *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="F.eks. 12 34 56 78"
                        className={cn(
                          "w-full p-3.5 rounded-sm border focus:outline-none focus:ring-1 transition-colors text-sm",
                          theme === 'classic'
                            ? "bg-slate-50 border-slate-300 focus:border-[#c29b62] text-slate-900"
                            : "bg-slate-900 border-slate-700 focus:border-orange-500 text-white"
                        )}
                      />
                    </div>

                    <div>
                      <label className={cn(
                        "block text-xs uppercase font-bold mb-2",
                        theme === 'classic' ? "text-slate-600" : "text-slate-400"
                      )}>
                        E-mailadresse *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="navn@virksomhed.dk"
                        className={cn(
                          "w-full p-3.5 rounded-sm border focus:outline-none focus:ring-1 transition-colors text-sm",
                          theme === 'classic'
                            ? "bg-slate-50 border-slate-300 focus:border-[#c29b62] text-slate-900"
                            : "bg-slate-900 border-slate-700 focus:border-orange-500 text-white"
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={cn(
                        "block text-xs uppercase font-bold mb-2",
                        theme === 'classic' ? "text-slate-600" : "text-slate-400"
                      )}>
                        Type af facilitet
                      </label>
                      <select
                        value={formData.facilityType}
                        onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                        className={cn(
                          "w-full p-3.5 rounded-sm border focus:outline-none focus:ring-1 transition-colors text-sm",
                          theme === 'classic'
                            ? "bg-slate-50 border-slate-300 focus:border-[#c29b62] text-slate-900"
                            : "bg-slate-900 border-slate-700 focus:border-orange-500 text-white"
                        )}
                      >
                        <option value="Mindre virksomhed / Værksted">Mindre virksomhed / Værksted</option>
                        <option value="Produktion / Fabrik">Produktion / Fabrik</option>
                        <option value="Lager & Logistik">Lager & Logistik</option>
                        <option value="Landbrug / Fødevarer">Landbrug / Fødevarer</option>
                        <option value="Andet">Andet</option>
                      </select>
                    </div>

                    <div>
                      <label className={cn(
                        "block text-xs uppercase font-bold mb-2",
                        theme === 'classic' ? "text-slate-600" : "text-slate-400"
                      )}>
                        Primære fokusområder
                      </label>
                      <input
                        type="text"
                        value={formData.focusAreas}
                        onChange={(e) => setFormData({ ...formData, focusAreas: e.target.value })}
                        placeholder="Fx pumper, ventilation, varmespild, styringer"
                        className={cn(
                          "w-full p-3.5 rounded-sm border focus:outline-none focus:ring-1 transition-colors text-sm",
                          theme === 'classic'
                            ? "bg-slate-50 border-slate-300 focus:border-[#c29b62] text-slate-900"
                            : "bg-slate-900 border-slate-700 focus:border-orange-500 text-white"
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={cn(
                      "block text-xs uppercase font-bold mb-2",
                      theme === 'classic' ? "text-slate-600" : "text-slate-400"
                    )}>
                      Besked eller uddybning (valgfrit)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Beskriv gerne jeres nuværende udfordringer, anlægstyper eller specifikke ønsker..."
                      className={cn(
                        "w-full p-3.5 rounded-sm border focus:outline-none focus:ring-1 transition-colors text-sm",
                        theme === 'classic'
                          ? "bg-slate-50 border-slate-300 focus:border-[#c29b62] text-slate-900"
                          : "bg-slate-900 border-slate-700 focus:border-orange-500 text-white"
                      )}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className={cn(
                        "w-full py-4 rounded-sm font-bold text-xs uppercase tracking-widest transition-all",
                        theme === 'classic'
                          ? "bg-[#c29b62] hover:bg-[#a07d4b] text-white shadow-lg shadow-[#c29b62]/20"
                          : "bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-950/40"
                      )}
                    >
                      {formStatus === 'loading' ? 'Sender forespørgsel...' : 'Send forespørgsel'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
