"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Linkedin, 
  ExternalLink, 
  CheckCircle2, 
  Mail, 
  Calendar, 
  ArrowRight,
  GraduationCap,
  Award,
  Zap
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../lib/theme-context';

export default function AboutPage() {
  const { theme } = useTheme();

  const linkedinUrl = "https://www.linkedin.com/in/christian-wessel-knaack-christensen-91ba37297?utm_source=share_via&utm_content=profile&utm_medium=member_ios";
  const [imageSrc, setImageSrc] = React.useState('/christian-christensen.jpg?v=2');

  return (
    <div className={cn(
      "min-h-screen pb-24 transition-colors duration-300",
      "bg-transparent"
    )}>
      {/* Hero / Intro Section */}
      <section className={cn(
        "relative py-16 md:py-20 overflow-hidden border-b",
        theme === 'classic' ? "border-slate-200" : "border-slate-800"
      )}>
        {theme === 'modern' && <div className="absolute inset-0 bg-orange-500/5 radial-gradient opacity-20 pointer-events-none"></div>}
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            
            {/* Profile Image & Quick Facts */}
            <div className="w-full max-w-sm mx-auto md:max-w-none md:w-1/3 flex-shrink-0 space-y-5">
              <div className={cn(
                "relative aspect-[3/4] w-full rounded-sm overflow-hidden border shadow-lg",
                theme === 'classic' ? "bg-slate-100 border-slate-200" : "bg-slate-800 border-slate-700"
              )}>
                 <Image 
                   src={imageSrc}
                   alt="Christian Wessel K. Christensen" 
                   fill
                   unoptimized
                   referrerPolicy="no-referrer"
                   sizes="(max-width: 768px) 100vw, 33vw"
                   priority
                   className="object-cover object-[50%_25%]"
                   onError={() => setImageSrc('https://picsum.photos/seed/christian_wessel/600/800')}
                 />
              </div>

              <div>
                <h1 className={cn(
                  "text-2xl font-bold uppercase tracking-wide",
                  theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
                )}>
                  Christian Christensen
                </h1>
                <p className={cn(
                  "text-xs font-semibold uppercase tracking-wider mt-0.5",
                  theme === 'classic' ? "text-[#c29b62]" : "text-orange-400"
                )}>
                  Uddannet Elinstallatør &amp; Stud. Maskinmester
                </p>
              </div>

              {/* Quick badges under photo */}
              <div className="space-y-2.5">
                <div className={cn(
                  "flex items-center gap-3 p-3 rounded-sm border",
                  theme === 'classic' ? "bg-white border-slate-200" : "bg-slate-800/60 border-slate-700"
                )}>
                  <Zap className={cn("w-5 h-5 shrink-0", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
                  <div>
                    <div className={cn("text-xs font-bold uppercase tracking-wider", theme === 'classic' ? "text-slate-900" : "text-white")}>Uddannet Elinstallatør</div>
                    <div className={cn("text-xs", theme === 'classic' ? "text-slate-500" : "text-slate-400")}>Faglig el-teknisk baggrund</div>
                  </div>
                </div>

                <div className={cn(
                  "flex items-center gap-3 p-3 rounded-sm border",
                  theme === 'classic' ? "bg-white border-slate-200" : "bg-slate-800/60 border-slate-700"
                )}>
                  <GraduationCap className={cn("w-5 h-5 shrink-0", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
                  <div>
                    <div className={cn("text-xs font-bold uppercase tracking-wider", theme === 'classic' ? "text-slate-900" : "text-white")}>Stud. Maskinmester</div>
                    <div className={cn("text-xs", theme === 'classic' ? "text-slate-500" : "text-slate-400")}>Fredericia Maskinmesterskole</div>
                  </div>
                </div>

                <div className={cn(
                  "flex items-center gap-3 p-3 rounded-sm border",
                  theme === 'classic' ? "bg-white border-slate-200" : "bg-slate-800/60 border-slate-700"
                )}>
                  <Award className={cn("w-5 h-5 shrink-0", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
                  <div>
                    <div className={cn("text-xs font-bold uppercase tracking-wider", theme === 'classic' ? "text-slate-900" : "text-white")}>Certificeret AMR</div>
                    <div className={cn("text-xs", theme === 'classic' ? "text-slate-500" : "text-slate-400")}>Arbejdsmiljørepræsentant</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bio Text & LinkedIn Link */}
            <div className="flex-grow space-y-8">
              <div>
                <h2 className={cn(
                  "font-bold tracking-widest uppercase text-xs md:text-sm mb-2",
                  theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
                )}>Om Mig</h2>
                <h3 className={cn(
                  "text-3xl md:text-4xl font-bold mb-6",
                  theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
                )}>
                  Teknisk faglighed, praktisk erfaring & <span className={theme === 'classic' ? "text-slate-500" : "text-slate-400"}>ansvarlighed</span>
                </h3>

                <div className={cn(
                  "prose prose-lg leading-relaxed space-y-4",
                  theme === 'classic' ? "prose-slate text-slate-600" : "prose-invert text-slate-300"
                )}>
                  <p>
                    Jeg er uddannet elinstallatør og læser i dag til maskinmester ved Fredericia Maskinmesterskole. Her bygger jeg videre på min faglige el-baggrund med bred indsigt i maskinteknik, energisystemer, automatisering og drift af komplekse anlæg.
                  </p>
                  <p>
                    Gennem mit arbejde har jeg opbygget en stærk, praktisk erfaring på værksteder, i produktion og ved montageopgaver. Jeg kombinerer teoretisk problemløsning med godt håndværk og kan træde direkte ind i driften eller på byggepladsen.
                  </p>
                  <p>
                    Jeg motiveres af at tage ansvar for opgaven fra start til slut, levere et solidt stykke arbejde og være en selvkørende, pålidelig samarbejdspartner.
                  </p>
                </div>

                {/* Elegant Clickable LinkedIn Logo Link */}
                <div className="pt-4 flex items-center gap-3">
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Besøg Christian Christensen på LinkedIn"
                    title="Besøg min profil på LinkedIn"
                    className={cn(
                      "group inline-flex items-center gap-3 transition-all duration-200"
                    )}
                  >
                    <div className="w-9 h-9 rounded bg-[#0a66c2] hover:bg-[#004182] text-white flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105">
                      <Linkedin className="w-5 h-5 fill-current" />
                    </div>
                    <span className={cn(
                      "text-sm font-semibold tracking-wide flex items-center gap-1.5 transition-colors group-hover:text-[#0a66c2]",
                      theme === 'classic' ? "text-slate-700" : "text-slate-300"
                    )}>
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </a>
                </div>
              </div>

              {/* Styrker & Fokusområder */}
              <div className={cn(
                "border-t pt-8 space-y-6",
                theme === 'classic' ? "border-slate-200" : "border-slate-800"
              )}>
                <div>
                  <h4 className={cn(
                    "font-bold uppercase tracking-wider text-xs md:text-sm mb-4",
                    theme === 'classic' ? "text-slate-900" : "text-white"
                  )}>Nøglekompetencer & Styrker</h4>
                  <div className="grid sm:grid-cols-2 gap-3.5 text-sm">
                    {[
                      'Uddannet elinstallatør (fejlfinding & el-teknik)',
                      'Stud. maskinmester (proces, energi & mekanik)',
                      'Certificeret AMR (Arbejdsmiljørepræsentant)',
                      'Rustfri TIG-svejsning og mekanisk montage',
                      'Stærk til IT-systemer, beregninger & dokumentation',
                      'Mødestabil, ansvarsbevidst og selvkørende'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <CheckCircle2 className={cn("w-4 h-4 shrink-0", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")} />
                        <span className={theme === 'classic' ? "text-slate-700" : "text-slate-300"}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    href="/booking"
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest transition-all shadow-md",
                      theme === 'classic'
                        ? "bg-[#c29b62] hover:bg-[#a07d4b] text-white shadow-[#c29b62]/20"
                        : "bg-orange-600 hover:bg-orange-500 text-white shadow-orange-950/40"
                    )}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book mig i kalenderen</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="mailto:cwk@tekk.dk"
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest transition-all border",
                      theme === 'classic'
                        ? "bg-transparent border-slate-300 hover:border-[#c29b62] text-slate-700 hover:text-[#c29b62]"
                        : "bg-transparent border-slate-600 hover:border-orange-500 text-slate-300 hover:text-orange-400"
                    )}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Kontakt mig på cwk@tekk.dk</span>
                  </a>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
