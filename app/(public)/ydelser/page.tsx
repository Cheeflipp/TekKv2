"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Zap, 
  Wrench, 
  ArrowRight, 
  Calendar, 
  TrendingDown, 
  Tv, 
  CheckCircle2, 
  ShieldCheck, 
  Mail, 
  Phone 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../lib/theme-context';

export default function YdelserPage() {
  const { theme } = useTheme();

  const services = [
    {
      id: 'indlejning',
      badge: 'Booking & Mandskab',
      title: 'Indlejning af Teknisk Arbejdskraft',
      subtitle: 'Smed, maskintekniker eller teknisk konsulent',
      description: 'Har du spidsbelastninger i produktionen, montageopgaver eller brug for ekstra faglært mandskab i en kortere eller længere periode? Lej mig ind på fleksible time- eller dagsbasis med gennemskuelige priser.',
      icon: Users,
      highlights: [
        'Rustfri TIG-svejsning & rørmontage',
        'DS/EN ISO 3834-2 & DS/EN 1090 standarder',
        'AMR-uddannet (Arbejdsmiljørepræsentant)',
        'Direkte online booking med realtidskalender'
      ],
      primaryAction: {
        label: 'Gå til Booking & Kalender',
        href: '/booking'
      },
      tag: 'Populær'
    },
    {
      id: 'energioptimering',
      badge: 'Beregning & Rådgivning',
      title: 'Energioptimering for Virksomheder',
      subtitle: 'Energitekniske beregninger til SMV & industri',
      description: 'Reducer virksomhedens faste omkostninger og CO2-aftryk gennem professionel energikortlægning. Få beregnet konkrete besparelsespotentialer, investeringsbehov og præcis tilbagebetalingstid (ROI) på proces- og forsyningsanlæg.',
      icon: Zap,
      highlights: [
        'Kortlægning af ventilation, varme & procesenergi',
        'Beregningsgrundlag jf. maskinmesterfaglige standarder',
        'Tilpasset både mindre værksteder og større industri',
        'Beregning af tilbagebetalingstid (Simple & LCC)'
      ],
      primaryAction: {
        label: 'Læs om Energioptimering',
        href: '/ydelser/energioptimering'
      },
      tag: 'Bæredygtighed'
    },
    {
      id: 'hvidevare-tv',
      badge: 'Service & Fejlfinding',
      title: 'Hvidevare & TV Reparation',
      subtitle: 'Reparation frem for udskiftning',
      description: 'Driller vaskemaskinen, ovnen, opvaskemaskinen eller er fladskærmen gået i sort? Mange apparater kan repareres for en brøkdel af nyprisen. Send dine fejloplysninger direkte til mig på mail, så vender jeg hurtigt tilbage med en vurdering.',
      icon: Wrench,
      highlights: [
        'Hårde hvidevarer (vask, opvask, ovn, køl m.fl.)',
        'TV-fejlfinding (strømforsyning, printkort, display)',
        'Hurtig forhåndsvurdering: Kan det betale sig?',
        'Direkte henvendelse pr. mail eller telefon'
      ],
      primaryAction: {
        label: 'Send reparationsforespørgsel',
        href: '/ydelser/hvidevare-tv-reparation'
      },
      tag: 'Lokal service'
    }
  ];

  return (
    <div className="min-h-screen py-16 md:py-24 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className={cn(
            "text-sm font-bold uppercase tracking-widest mb-2",
            theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
          )}>Ydelser</h2>
          
          <h1 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight",
            theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
          )}>
            Tekniske Løsninger & <br className="hidden sm:inline" />
            <span className={cn(
              "text-transparent bg-clip-text",
              theme === 'classic' ? "bg-gradient-to-r from-[#c29b62] to-[#a07d4b]" : "bg-gradient-to-r from-orange-400 to-orange-600"
            )}>Kompromisløst Håndværk</span>
          </h1>

          <p className={cn(
            "text-lg md:text-xl leading-relaxed font-light",
            theme === 'classic' ? "text-slate-600" : "text-slate-300"
          )}>
            TekK leverer praktisk erfaring kombineret med stærk teknisk viden. Uanset om du skal bruge akut arbejdskraft på værkstedet, vil skære toppen af energiregningen i virksomheden, eller har et husholdningsapparat der skal fikses.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={cn(
                  "group relative overflow-hidden rounded-sm rounded-tr-2xl border-2 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5",
                  theme === 'classic' 
                    ? "bg-white border-slate-200 hover:border-[#c29b62] shadow-md hover:shadow-xl hover:shadow-[#c29b62]/10" 
                    : "bg-slate-800 border-slate-700 hover:border-orange-500 hover:bg-slate-750 shadow-md shadow-black/20 hover:shadow-xl hover:shadow-black/40"
                )}
              >
                {/* Signature decorative corner quarter-circle */}
                <div className={cn(
                  "absolute top-0 right-0 w-28 h-28 rounded-bl-full -mr-4 -mt-4 transition-all duration-500 pointer-events-none",
                  theme === 'classic' ? "bg-slate-100 group-hover:bg-[#c29b62]/10" : "bg-slate-700/30 group-hover:bg-orange-500/10"
                )}></div>

                <div className="relative z-10">
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={cn(
                      "w-12 h-12 rounded-sm flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-sm",
                      theme === 'classic' ? "bg-slate-100 text-[#c29b62]" : "bg-slate-700 text-orange-500"
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className={cn(
                      "text-xs font-mono uppercase tracking-wider font-bold px-2.5 py-1 rounded",
                      theme === 'classic' ? "bg-slate-100 text-slate-700" : "bg-slate-700/60 text-slate-300"
                    )}>
                      {service.badge}
                    </span>
                  </div>

                  <h3 className={cn(
                    "text-2xl font-bold mb-2 tracking-tight",
                    theme === 'classic' ? "text-slate-900 group-hover:text-[#c29b62] transition-colors" : "text-white group-hover:text-orange-400 transition-colors"
                  )}>
                    {service.title}
                  </h3>

                  <p className={cn(
                    "text-sm font-medium mb-4",
                    theme === 'classic' ? "text-[#a07d4b]" : "text-orange-400"
                  )}>
                    {service.subtitle}
                  </p>

                  <p className={cn(
                    "text-sm md:text-base leading-relaxed mb-6",
                    theme === 'classic' ? "text-slate-600" : "text-slate-300"
                  )}>
                    {service.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs md:text-sm">
                        <CheckCircle2 className={cn(
                          "w-4 h-4 shrink-0 mt-0.5",
                          theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
                        )} />
                        <span className={theme === 'classic' ? "text-slate-700" : "text-slate-300"}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Button */}
                <div className="relative z-10 pt-2">
                  <Link
                    href={service.primaryAction.href}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-all duration-200",
                      theme === 'classic'
                        ? "bg-[#c29b62] hover:bg-[#a07d4b] text-white shadow-md hover:shadow-lg hover:shadow-[#c29b62]/20"
                        : "bg-orange-600 hover:bg-orange-500 text-white shadow-md hover:shadow-lg hover:shadow-orange-950/40"
                    )}
                  >
                    <span>{service.primaryAction.label}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner / Trust note */}
        <div className={cn(
          "rounded-sm border-2 p-8 md:p-10 relative overflow-hidden",
          theme === 'classic' ? "bg-white border-slate-200 shadow-lg" : "bg-slate-800/80 border-slate-700 shadow-xl"
        )}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h4 className={cn(
                "text-2xl font-bold tracking-tight",
                theme === 'classic' ? "text-slate-900" : "text-white"
              )}>
                I tvivl om den rette løsning for dig?
              </h4>
              <p className={cn(
                "text-base max-w-xl",
                theme === 'classic' ? "text-slate-600" : "text-slate-300"
              )}>
                Uforpligtende rådgivning koster ikke noget. Ring direkte eller send en mail, så tager jeg en uforpligtende snak om din opgave.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="tel:+4531694402"
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest transition-all border",
                  theme === 'classic'
                    ? "bg-slate-900 hover:bg-slate-800 text-white border-slate-900"
                    : "bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                )}
              >
                <Phone className="w-4 h-4" />
                <span>31 69 44 02</span>
              </a>

              <Link
                href="/kontakt"
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest transition-all border",
                  theme === 'classic'
                    ? "bg-transparent border-slate-300 hover:border-[#c29b62] text-slate-700 hover:text-[#c29b62]"
                    : "bg-transparent border-slate-600 hover:border-orange-500 text-slate-300 hover:text-orange-400"
                )}
              >
                <Mail className="w-4 h-4" />
                <span>Skriv besked</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
