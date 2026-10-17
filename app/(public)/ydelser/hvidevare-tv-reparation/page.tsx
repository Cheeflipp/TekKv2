"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  Tv, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../lib/theme-context';
import { sendRepairEmail } from '../../../actions/email';

export default function HvidevareTvReparationPage() {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    deviceType: 'Vaskemaskine',
    brand: '',
    modelNumber: '',
    issueDescription: '',
    serviceType: 'Indlevering i Bække (efter aftale)',
    name: '',
    phone: '',
    email: '',
    city: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.issueDescription) return;

    setStatus('loading');
    const res = await sendRepairEmail(formData);
    if (res.success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  // Generate mailto link for direct client opening
  const generateMailto = () => {
    const subject = encodeURIComponent(`Reparation af ${formData.deviceType} (${formData.brand || 'Apparat'}) - ${formData.name || 'Henvendelse'}`);
    const body = encodeURIComponent(
`Hej Christian,

Jeg henvender mig vedrørende reparation af følgende apparat:

Apparattype: ${formData.deviceType}
Mærke / Brand: ${formData.brand || 'Ikke angivet'}
Modelnummer: ${formData.modelNumber || 'Ikke angivet'}
Foretrukken service: ${formData.serviceType}

Fejlbeskrivelse:
${formData.issueDescription || 'Beskriv fejlen her...'}

Mine kontaktoplysninger:
Navn: ${formData.name || ''}
Telefon: ${formData.phone || ''}
Email: ${formData.email || ''}
By: ${formData.city || ''}

Med venlig hilsen,
${formData.name || ''}`
    );
    return `mailto:cwk@tekk.dk?subject=${subject}&body=${body}`;
  };

  const deviceTypes = [
    { label: 'Vaskemaskine', icon: '🧺' },
    { label: 'Opvaskemaskine', icon: '🍽️' },
    { label: 'Ovn / Komfur', icon: '🍳' },
    { label: 'Tørretumbler', icon: '🌀' },
    { label: 'TV / Fladskærm', icon: '📺' },
    { label: 'Køleskab / Fryser', icon: '❄️' },
    { label: 'Andet apparat', icon: '⚡' }
  ];

  return (
    <div className="min-h-screen py-16 md:py-24 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-6xl">

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
            Hvidevare & TV Reparation
          </span>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <h2 className={cn(
            "text-sm font-bold uppercase tracking-widest mb-3 inline-flex items-center gap-2",
            theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
          )}>
            <Wrench className="w-4 h-4" />
            Lokal Fejlfinding & Reparation
          </h2>

          <h1 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight",
            theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
          )}>
            Hvidevare & <br />
            <span className={cn(
              "text-transparent bg-clip-text",
              theme === 'classic' ? "bg-gradient-to-r from-[#c29b62] to-[#a07d4b]" : "bg-gradient-to-r from-orange-400 to-orange-600"
            )}>
              TV Reparation
            </span>
          </h1>

          <p className={cn(
            "text-lg md:text-xl font-light leading-relaxed mb-6",
            theme === 'classic' ? "text-slate-600" : "text-slate-300"
          )}>
            Giv dine apparater en chance mere. Ofte er det blot en defekt pumpe, et slidt varmelegeme, en løsnet pakning eller et defekt printkort, der forårsager fejlen. Skriv dine oplysninger direkte til mig på mail herunder, så vender jeg hurtigt tilbage med en vurdering af muligheder og reservedelspris.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#skriv-mail"
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-all",
                theme === 'classic'
                  ? "bg-[#c29b62] hover:bg-[#a07d4b] text-white shadow-md hover:shadow-lg hover:shadow-[#c29b62]/20"
                  : "bg-orange-600 hover:bg-orange-500 text-white shadow-md hover:shadow-lg hover:shadow-orange-950/40"
              )}
            >
              <Mail className="w-4 h-4" />
              <span>Skriv til mig nu</span>
            </a>

            <a
              href="tel:+4531694402"
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-all border",
                theme === 'classic'
                  ? "bg-transparent border-slate-300 hover:border-[#c29b62] text-slate-700 hover:text-[#c29b62]"
                  : "bg-transparent border-slate-600 hover:border-orange-500 text-slate-300 hover:text-orange-400"
              )}
            >
              <Phone className="w-4 h-4" />
              <span>Ring: 31 69 44 02</span>
            </a>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Hårde Hvidevarer */}
          <div className={cn(
            "group relative overflow-hidden rounded-sm rounded-tr-2xl border-2 p-8 transition-all duration-300 hover:-translate-y-1",
            theme === 'classic'
              ? "bg-white border-slate-200 hover:border-[#c29b62] shadow-md hover:shadow-xl hover:shadow-[#c29b62]/10"
              : "bg-slate-800 border-slate-700 hover:border-orange-500 hover:bg-slate-750 shadow-md shadow-black/20 hover:shadow-xl hover:shadow-black/40"
          )}>
            {/* Corner decoration */}
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
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <span className={cn(
                    "text-xs font-mono uppercase tracking-wider font-bold block",
                    theme === 'classic' ? "text-[#a07d4b]" : "text-orange-400"
                  )}>
                    Husholdningsapparater
                  </span>
                  <h3 className={cn("text-2xl font-bold", theme === 'classic' ? "text-slate-900" : "text-white")}>
                    Hårde Hvidevarer
                  </h3>
                </div>
              </div>

              <p className={cn("text-base leading-relaxed mb-6", theme === 'classic' ? "text-slate-600" : "text-slate-300")}>
                Fejlfinding og udskiftning af sliddele på kendte mærker som Miele, Bosch, Siemens, AEG, Electrolux, Whirlpool, Beko m.fl.
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
                  <span className={theme === 'classic' ? "text-slate-700" : "text-slate-300"}>
                    <strong>Vaskemaskiner:</strong> Pumper, remme, kul, varmelegemer, afløb og fejlkoder.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
                  <span className={theme === 'classic' ? "text-slate-700" : "text-slate-300"}>
                    <strong>Opvaskemaskiner:</strong> Spulearme, cirkulationspumpe, aquastop, tæthed og varme.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
                  <span className={theme === 'classic' ? "text-slate-700" : "text-slate-300"}>
                    <strong>Ovne & Kogeplader:</strong> Undervarme, overvarme, blæsermotorer og induktionsprint.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
                  <span className={theme === 'classic' ? "text-slate-700" : "text-slate-300"}>
                    <strong>Tørretumblere:</strong> Drivremme, termostater, sensorer og kondenspumper.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: TV & Elektronik */}
          <div className={cn(
            "group relative overflow-hidden rounded-sm rounded-tr-2xl border-2 p-8 transition-all duration-300 hover:-translate-y-1",
            theme === 'classic'
              ? "bg-white border-slate-200 hover:border-[#c29b62] shadow-md hover:shadow-xl hover:shadow-[#c29b62]/10"
              : "bg-slate-800 border-slate-700 hover:border-orange-500 hover:bg-slate-750 shadow-md shadow-black/20 hover:shadow-xl hover:shadow-black/40"
          )}>
            {/* Corner decoration */}
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
                  <Tv className="w-6 h-6" />
                </div>
                <div>
                  <span className={cn(
                    "text-xs font-mono uppercase tracking-wider font-bold block",
                    theme === 'classic' ? "text-[#a07d4b]" : "text-orange-400"
                  )}>
                    Fladskærme & Forbrugerelektronik
                  </span>
                  <h3 className={cn("text-2xl font-bold", theme === 'classic' ? "text-slate-900" : "text-white")}>
                    TV & Elektronik
                  </h3>
                </div>
              </div>

              <p className={cn("text-base leading-relaxed mb-6", theme === 'classic' ? "text-slate-600" : "text-slate-300")}>
                Diagnose af strømforsyninger, backlight og komponentfejl på LED/OLED TV (Samsung, LG, Philips, Sony m.fl.).
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
                  <span className={theme === 'classic' ? "text-slate-700" : "text-slate-300"}>
                    <strong>Backlight-fejl:</strong> Lyden virker, men skærmen er mørk (udskiftning af LED-strips).
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
                  <span className={theme === 'classic' ? "text-slate-700" : "text-slate-300"}>
                    <strong>Strømforsyninger:</strong> TV vil ikke tænde, standbylampe blinker, eller klikker relæer.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
                  <span className={theme === 'classic' ? "text-slate-700" : "text-slate-300"}>
                    <strong>Printkort-reparation:</strong> Udskiftning af defekte kondensatorer og transistorer.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-0.5", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
                  <span className={theme === 'classic' ? "text-slate-700" : "text-slate-300"}>
                    <strong>Ærlig vurdering:</strong> Hvis panelet er smadret, kan det sjældent svare sig økonomisk – jeg melder altid ærligt ud!
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Helpful Model Number Guide Box */}
        <div className={cn(
          "p-6 md:p-8 rounded-sm border mb-16 relative overflow-hidden",
          theme === 'classic' ? "bg-amber-50/60 border-amber-200/80" : "bg-slate-800/60 border-slate-700"
        )}>
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className={cn(
              "p-2.5 rounded-sm shrink-0",
              theme === 'classic' ? "bg-[#c29b62]/10 text-[#c29b62]" : "bg-orange-500/10 text-orange-400"
            )}>
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className={cn("text-lg font-bold mb-1", theme === 'classic' ? "text-slate-900" : "text-white")}>
                Tip: Hvor finder du modelnummeret (typeskiltet)?
              </h4>
              <p className={cn("text-sm leading-relaxed", theme === 'classic' ? "text-slate-700" : "text-slate-300")}>
                For at jeg hurtigst muligt kan tjekke reservedelspriser og diagrammer, er det en stor hjælp hvis du finder modelnummeret (E-nr., Model eller Prod-nr.):
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-xs">
                <div className="p-2 rounded bg-white/70 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                  <strong>Vaskemaskine:</strong> På indersiden af lågen eller bag ved fnugfilterklappen.
                </div>
                <div className="p-2 rounded bg-white/70 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                  <strong>Opvaskemaskine:</strong> Præget i stål-kanten i toppen eller på siden af lågen.
                </div>
                <div className="p-2 rounded bg-white/70 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                  <strong>Ovn:</strong> I kanten af ovnrammen, når ovnlågen åbnes.
                </div>
                <div className="p-2 rounded bg-white/70 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
                  <strong>TV:</strong> På den store hvide/sorte label bag på skærmen.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section: Skriv til Christian */}
        <div id="skriv-mail" className="scroll-mt-24">
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
              
              <div className="text-center mb-10">
                <span className={cn(
                  "text-xs font-mono uppercase tracking-widest font-bold block mb-2",
                  theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
                )}>
                  Direkte kontakt
                </span>
                <h3 className={cn(
                  "text-3xl md:text-4xl font-bold tracking-tight mb-3",
                  theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
                )}>
                  Skriv til mig om dit apparat
                </h3>
                <p className={cn("text-base max-w-xl mx-auto", theme === 'classic' ? "text-slate-600" : "text-slate-400")}>
                  Udfyld formularen, så sendes din henvendelse direkte til min e-mail (<strong>cwk@tekk.dk</strong>). Jeg vender hurtigt tilbage med et uforpligtende svar.
                </p>
              </div>

              {status === 'success' ? (
                <div className="py-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className={cn("text-2xl font-bold mb-2", theme === 'classic' ? "text-slate-900" : "text-white")}>
                    Mange tak for din besked!
                  </h4>
                  <p className={cn("mb-6 max-w-md mx-auto", theme === 'classic' ? "text-slate-600" : "text-slate-400")}>
                    Din henvendelse er modtaget. Jeg kigger på fejlbeskrivelsen og undersøger reservedele, hvorefter jeg kontakter dig på telefon eller mail snarest.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className={cn(
                      "px-6 py-2.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-colors",
                      theme === 'classic' ? "bg-slate-100 hover:bg-slate-200 text-slate-800" : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                    )}
                  >
                    Send en ny henvendelse
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Device Type Chips */}
                  <div>
                    <label className={cn(
                      "block text-xs uppercase font-bold mb-2",
                      theme === 'classic' ? "text-slate-600" : "text-slate-400"
                    )}>
                      Vælg apparat *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {deviceTypes.map((type) => (
                        <button
                          key={type.label}
                          type="button"
                          onClick={() => setFormData({ ...formData, deviceType: type.label })}
                          className={cn(
                            "py-2.5 px-3 rounded-sm border text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                            formData.deviceType === type.label
                              ? (theme === 'classic' ? "bg-[#c29b62] border-[#c29b62] text-white shadow-sm" : "bg-orange-600 border-orange-600 text-white shadow-sm")
                              : (theme === 'classic' ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100" : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-850")
                          )}
                        >
                          <span>{type.icon}</span>
                          <span>{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brand & Model Number */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={cn(
                        "block text-xs uppercase font-bold mb-2",
                        theme === 'classic' ? "text-slate-600" : "text-slate-400"
                      )}>
                        Mærke / Fabrikat *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        placeholder="F.eks. Miele, Bosch, Samsung, LG, AEG..."
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
                        Modelnummer / Typenummer (valgfrit)
                      </label>
                      <input
                        type="text"
                        value={formData.modelNumber}
                        onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
                        placeholder="F.eks. WMB120, SMV46KX01E, QE55Q70..."
                        className={cn(
                          "w-full p-3.5 rounded-sm border focus:outline-none focus:ring-1 transition-colors text-sm",
                          theme === 'classic'
                            ? "bg-slate-50 border-slate-300 focus:border-[#c29b62] text-slate-900"
                            : "bg-slate-900 border-slate-700 focus:border-orange-500 text-white"
                        )}
                      />
                    </div>
                  </div>

                  {/* Fejlbeskrivelse */}
                  <div>
                    <label className={cn(
                      "block text-xs uppercase font-bold mb-2",
                      theme === 'classic' ? "text-slate-600" : "text-slate-400"
                    )}>
                      Hvad er fejlen? Beskriv symptomerne *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.issueDescription}
                      onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                      placeholder="Beskriv hvad der sker: Pumper den ikke vand ud? Viser den en fejlkode som E15? Er der lyd på TV'et men sort skærm? Slår HFI-relæet fra?"
                      className={cn(
                        "w-full p-3.5 rounded-sm border focus:outline-none focus:ring-1 transition-colors text-sm",
                        theme === 'classic'
                          ? "bg-slate-50 border-slate-300 focus:border-[#c29b62] text-slate-900"
                          : "bg-slate-900 border-slate-700 focus:border-orange-500 text-white"
                      )}
                    />
                  </div>

                  {/* Preferred Service Type */}
                  <div>
                    <label className={cn(
                      "block text-xs uppercase font-bold mb-2",
                      theme === 'classic' ? "text-slate-600" : "text-slate-400"
                    )}>
                      Foretrukken løsning
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className={cn(
                        "w-full p-3.5 rounded-sm border focus:outline-none focus:ring-1 transition-colors text-sm",
                        theme === 'classic'
                          ? "bg-slate-50 border-slate-300 focus:border-[#c29b62] text-slate-900"
                          : "bg-slate-900 border-slate-700 focus:border-orange-500 text-white"
                      )}
                    >
                      <option value="Indlevering i Bække (efter aftale)">Indlevering i Bække (efter aftale)</option>
                      <option value="Besigtigelse på adressen (Bække og omegn)">Besigtigelse på adressen (Bække og omegn)</option>
                      <option value="Først vurdering pr. mail/telefon om det kan svare sig">Først vurdering pr. mail/telefon om det kan svare sig</option>
                    </select>
                  </div>

                  {/* Contact Information */}
                  <div className="grid md:grid-cols-2 gap-6 pt-2">
                    <div>
                      <label className={cn(
                        "block text-xs uppercase font-bold mb-2",
                        theme === 'classic' ? "text-slate-600" : "text-slate-400"
                      )}>
                        Dit Navn *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Fulde navn"
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
                        Telefonnummer *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="F.eks. 31 69 44 02"
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
                        Din E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="din@email.dk"
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
                        By / Postnummer (valgfrit)
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="F.eks. 6622 Bække, Vejen, Kolding..."
                        className={cn(
                          "w-full p-3.5 rounded-sm border focus:outline-none focus:ring-1 transition-colors text-sm",
                          theme === 'classic'
                            ? "bg-slate-50 border-slate-300 focus:border-[#c29b62] text-slate-900"
                            : "bg-slate-900 border-slate-700 focus:border-orange-500 text-white"
                        )}
                      />
                    </div>
                  </div>

                  {/* Submit button & Mailto fallback */}
                  <div className="space-y-3 pt-4">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className={cn(
                        "w-full py-4 rounded-sm font-bold text-xs uppercase tracking-widest transition-all",
                        theme === 'classic'
                          ? "bg-[#c29b62] hover:bg-[#a07d4b] text-white shadow-lg shadow-[#c29b62]/20"
                          : "bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-950/40"
                      )}
                    >
                      {status === 'loading' ? 'Sender til Christian...' : 'Send henvendelse til Christian'}
                    </button>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pt-2">
                      <span>
                        Eller foretrækker du dit eget mailprogram?
                      </span>
                      <a
                        href={generateMailto()}
                        className={cn(
                          "inline-flex items-center gap-1.5 font-bold transition-colors underline",
                          theme === 'classic' ? "text-[#c29b62] hover:text-[#a07d4b]" : "text-orange-400 hover:text-orange-300"
                        )}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Åbn i mailprogram (cwk@tekk.dk)</span>
                      </a>
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>
        </div>

        {/* Location & Quick Info */}
        <div className="mt-16 text-center">
          <div className={cn(
            "inline-flex flex-wrap items-center justify-center gap-6 p-4 px-8 rounded-sm border text-sm",
            theme === 'classic' ? "bg-white border-slate-200 text-slate-600" : "bg-slate-800/60 border-slate-700 text-slate-300"
          )}>
            <div className="flex items-center gap-2">
              <MapPin className={cn("w-4 h-4", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
              <span>Base i <strong>6622 Bække</strong></span>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-600">|</span>
            <div className="flex items-center gap-2">
              <Phone className={cn("w-4 h-4", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
              <a href="tel:+4531694402" className="hover:underline font-bold">31 69 44 02</a>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-600">|</span>
            <div className="flex items-center gap-2">
              <Mail className={cn("w-4 h-4", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
              <a href="mailto:cwk@tekk.dk" className="hover:underline">cwk@tekk.dk</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
