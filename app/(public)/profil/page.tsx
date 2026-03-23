"use client";

import React from 'react';
import Image from 'next/image';
import { cn } from '../../lib/utils';
import { useTheme } from '../../lib/theme-context';

export default function AboutPage() {
  const { theme } = useTheme();

  return (
    <div className={cn(
      "min-h-screen pb-24 transition-colors duration-300",
      theme === 'classic' ? "bg-white" : "bg-slate-950"
    )}>
      {/* Hero / Intro Section */}
      <section className={cn(
        "relative py-20 overflow-hidden border-b",
        theme === 'classic' ? "border-slate-200" : "border-slate-800"
      )}>
        {theme === 'modern' && <div className="absolute inset-0 bg-orange-500/5 radial-gradient opacity-20"></div>}
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            
            {/* Profile Image Placeholder */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className={cn(
                "relative aspect-[3/4] w-full rounded-sm overflow-hidden border shadow-2xl group",
                theme === 'classic' ? "bg-slate-100 border-slate-200" : "bg-slate-800 border-slate-700"
              )}>
                 {/* Using a seed that looks somewhat professional/male based on context */}
                 <Image 
                   src="/profilbillede.jpg"
                   alt="Christian Wessel K. Christensen" 
                   fill
                   className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                 />
                 <div className={cn(
                   "absolute inset-0 bg-gradient-to-t opacity-80",
                   theme === 'classic' ? "from-black via-transparent to-transparent" : "from-slate-900 via-transparent to-transparent"
                 )}></div>
                 <div className="absolute bottom-6 left-6">
                   <h1 className="text-3xl font-black text-white uppercase leading-none mb-1">Christian<br/>Christensen</h1>
                 </div>
              </div>
              
              {/* Stats removed as requested */}
            </div>

            {/* Bio Text */}
            <div className="flex-grow space-y-8">
              <div>
                <h2 className={cn(
                  "font-bold tracking-widest uppercase text-sm mb-3",
                  theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
                )}>Om Mig</h2>
                <h3 className={cn(
                  "text-4xl font-bold mb-6",
                  theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
                )}>Glad, Karismatisk og <span className={theme === 'classic' ? "text-slate-500" : "text-slate-400"}>Ansvarlig</span></h3>
                <div className={cn(
                  "prose prose-lg leading-relaxed",
                  theme === 'classic' ? "prose-slate text-slate-600" : "prose-invert text-slate-400"
                )}>
                  <p>
                    Jeg har arbejdet siden jeg var 12 år, hvor jeg startede som akkordlønnet purløgsplukker. Siden da har jeg haft mange forskellige jobs – blandt andet som vicevært, med bundmaling af både samt inden for service og detailhandel.
                  </p>
                  <p>
                    Jeg bor i <strong>Bække</strong> og har to børn. Til daglig læser jeg til <strong>maskinmester</strong> i Fredericia, hvilket giver mig en solid teknisk forståelse for mekanik, el og tekniske systemer.
                  </p>
                  <p>
                    Jeg går op i at levere ordentligt arbejde og tage ansvar for de opgaver, jeg påtager mig. For mig handler det om at være pålidelig – både fagligt og i samarbejdet med andre.
                  </p>
                </div>
              </div>

              {/* Personal Details (Styrker Only now) */}
              <div className={cn(
                "border-t pt-8",
                theme === 'classic' ? "border-slate-200" : "border-slate-800"
              )}>
                <h4 className={cn(
                  "font-bold uppercase tracking-wider mb-4",
                  theme === 'classic' ? "text-slate-900" : "text-white"
                )}>Styrker</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className={cn("space-y-3", theme === 'classic' ? "text-slate-600" : "text-slate-400")}>
                    <li className="flex items-center gap-3"><span className={cn("font-bold", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")}>✓</span> Ansvarsbevidst og Mødestabil</li>
                    <li className="flex items-center gap-3"><span className={cn("font-bold", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")}>✓</span> Lærenem</li>
                  </ul>
                  <ul className={cn("space-y-3", theme === 'classic' ? "text-slate-600" : "text-slate-400")}>
                    <li className="flex items-center gap-3"><span className={cn("font-bold", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")}>✓</span> Stærk til IT-systemer</li>
                    <li className="flex items-center gap-3"><span className={cn("font-bold", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")}>✓</span> Certificeret AMR</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CV / Timeline Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Experience Column */}
          <div>
            <h3 className={cn(
              "text-2xl font-bold mb-8 flex items-center gap-3",
              theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
            )}>
              <span className={cn("w-8 h-1", theme === 'classic' ? "bg-[#c29b62]" : "bg-orange-500")}></span> Erfaring
            </h3>
            
            <div className={cn(
              "space-y-8 relative border-l ml-3 pl-8",
              theme === 'classic' ? "border-slate-200" : "border-slate-800"
            )}>
              
               {/* Job 1 (Aquagain Smed - Current/Future End) */}
              <div className="relative">
                <div className={cn(
                  "absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2",
                  theme === 'classic' ? "border-[#c29b62] bg-white" : "border-orange-500 bg-slate-900"
                )}></div>
                <div className={cn(
                  "text-sm font-mono mb-1",
                  theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
                )}>Jul. 2024 — Jan. 2026</div>
                <h4 className={cn("text-xl font-bold", theme === 'classic' ? "text-slate-900" : "text-slate-200")}>Smed</h4>
                <p className={cn("text-sm", theme === 'classic' ? "text-slate-600" : "text-slate-400")}>Aquagain A/S</p>
                <div className={cn("text-sm mt-2", theme === 'classic' ? "text-slate-600" : "text-slate-500")}>
                  <p className="mb-2"><span className={cn("font-semibold", theme === 'classic' ? "text-slate-800" : "text-slate-300")}>Arbejdsområder:</span> Rustfri TIG svejsning, pladearbejde og montage.</p>
                  <p className={cn(
                    "border p-2 rounded text-xs",
                    theme === 'classic' ? "bg-slate-50 border-slate-200 text-slate-600" : "bg-slate-900 border-slate-700 text-slate-400"
                  )}>
                    <span className={cn("font-bold block mb-1", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")}>Certificeringer og Standarder:</span>
                    Arbejdet udført jf. <strong>DS/EN ISO 3834-2</strong> (Kvalitetskrav til svejsning) og <strong>DS/EN 1090-3</strong> (Udførelse af aluminium- og stålkonstruktioner).
                  </p>
                </div>
              </div>

              {/* Job 2 (Delpro) */}
              <div className="relative">
                <div className={cn(
                  "absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2",
                  theme === 'classic' ? "border-slate-300 bg-white" : "border-slate-700 bg-slate-900"
                )}></div>
                <div className="text-sm text-slate-500 font-mono mb-1">Mar. 2023 — Jul. 2024</div>
                <h4 className={cn("text-xl font-bold", theme === 'classic' ? "text-slate-900" : "text-slate-200")}>Ekstern Konsulent og Arbejdsmiljø Koordinator</h4>
                <p className={cn("text-sm", theme === 'classic' ? "text-slate-600" : "text-slate-400")}>DELPRO A/S</p>
                <p className={cn("text-sm mt-2", theme === 'classic' ? "text-slate-600" : "text-slate-500")}>
                  Gennemførte AMR-uddannelsen (Arbejdsmiljørepræsentant) ved ansættelsens start.
                  Arbejder med sikkerhedsinstruktioner, tilsyn og udarbejdelse af rapporter.
                </p>
              </div>

              {/* Job 3 (Aquagain Praktik) */}
              <div className="relative">
                <div className={cn(
                  "absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2",
                  theme === 'classic' ? "border-slate-300 bg-white" : "border-slate-700 bg-slate-900"
                )}></div>
                <div className="text-sm text-slate-500 font-mono mb-1">Apr. 2023 — Dec. 2023</div>
                <h4 className={cn("text-xl font-bold", theme === 'classic' ? "text-slate-900" : "text-slate-200")}>Studerende Praktikant</h4>
                <p className={cn("text-sm", theme === 'classic' ? "text-slate-600" : "text-slate-400")}>Aquagain A/S</p>
                <p className={cn("text-sm mt-2", theme === 'classic' ? "text-slate-600" : "text-slate-500")}>
                  9 måneders praktikforløb som en del af maskinmesteruddannelsen. Fokus på værkstedsteknik og drift.
                </p>
              </div>

               {/* Job 4 */}
               <div className="relative">
                <div className={cn(
                  "absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2",
                  theme === 'classic' ? "border-slate-300 bg-white" : "border-slate-700 bg-slate-900"
                )}></div>
                <div className="text-sm text-slate-500 font-mono mb-1">Aug. 2020 — Jun. 2022</div>
                <h4 className={cn("text-xl font-bold", theme === 'classic' ? "text-slate-900" : "text-slate-200")}>IT-Guide</h4>
                <p className={cn("text-sm", theme === 'classic' ? "text-slate-600" : "text-slate-400")}>VUC Roskilde-Køge</p>
                <p className={cn("text-sm mt-2", theme === 'classic' ? "text-slate-600" : "text-slate-500")}>
                  Vejledning af kursister i IT-programmer og generel lektiehjælp.
                </p>
              </div>
              
              {/* Job 5 (Thansen - Detailed Breakdown) */}
              <div className={cn(
                "relative mt-8 pt-4 border-t",
                theme === 'classic' ? "border-slate-200" : "border-slate-800/50"
              )}>
                <div className={cn(
                  "absolute -left-[37px] top-6 h-4 w-4 rounded-full border-2",
                  theme === 'classic' ? "border-[#c29b62] bg-white" : "border-orange-500 bg-slate-900"
                )}></div>
                <div className={cn(
                  "text-sm font-bold font-mono mb-1",
                  theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
                )}>2015 — 2022</div>
                <h4 className={cn("text-xl font-bold", theme === 'classic' ? "text-slate-900" : "text-white")}>Thansen</h4>
                <p className={cn("text-sm", theme === 'classic' ? "text-slate-600" : "text-slate-400")}>Glostrup, Rødovre, Valby</p>
                
                <div className={cn(
                  "mt-3 p-4 rounded border text-sm leading-relaxed",
                  theme === 'classic' ? "bg-slate-50 border-slate-200 text-slate-600" : "bg-slate-900/50 border-slate-800 text-slate-400"
                )}>
                  <p className="mb-4">
                    En længerevarende ansættelse med flere roller, fra gulvmedarbejder til leder og tilbage som specialist under uddannelse.
                  </p>
                  <ul className="space-y-4">
                     {/* Souschef */}
                     <li className="flex gap-3">
                        <span className={cn("font-bold mt-0.5", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")}>•</span>
                        <div>
                          <strong className={cn("block", theme === 'classic' ? "text-slate-800" : "text-slate-200")}>Souschef (2016 — 2018)</strong>
                          <span className={theme === 'classic' ? "text-slate-600" : "text-slate-500"}>Ansvarlig for reklamationsafdelingen for dæk og fælge på Sjælland. Ansvarlig for butiksombygning og oplæring af nye medarbejdere.</span>
                        </div>
                     </li>
                     
                     {/* Butiksassistent (Full Time) */}
                     <li className="flex gap-3">
                        <span className={cn("font-bold mt-0.5", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")}>•</span>
                        <div>
                          <strong className={cn("block", theme === 'classic' ? "text-slate-800" : "text-slate-200")}>Butiksassistent (2015 — 2016 og 2019 — 2020)</strong>
                          <span className={theme === 'classic' ? "text-slate-600" : "text-slate-500"}>Montage af dæk og reparation af cykler. Salg, lagerstyring og lukkeansvarlig.</span>
                        </div>
                     </li>

                     {/* Deltid */}
                     <li className="flex gap-3">
                        <span className={cn("font-bold mt-0.5", theme === 'classic' ? "text-[#c29b62]" : "text-orange-500")}>•</span>
                        <div>
                          <strong className={cn("block", theme === 'classic' ? "text-slate-800" : "text-slate-200")}>Deltid / Studiejob (2020 — 2022)</strong>
                          <span className={theme === 'classic' ? "text-slate-600" : "text-slate-500"}>Fastholdt tilknytning under studie med fokus på salg og kundeservice.</span>
                        </div>
                     </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* Education Column */}
          <div>
            <h3 className={cn(
              "text-2xl font-bold mb-8 flex items-center gap-3",
              theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
            )}>
              <span className={cn("w-8 h-1", theme === 'classic' ? "bg-[#c29b62]" : "bg-orange-500")}></span> Uddannelse og Kurser
            </h3>
            
            <div className="space-y-6">
              {/* Education 1 */}
              <div className={cn(
                "p-6 rounded-sm border transition-colors",
                theme === 'classic' ? "bg-white border-slate-200 hover:border-[#c29b62]/30" : "bg-slate-900 border-slate-800 hover:border-orange-500/30"
              )}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className={cn("text-lg font-bold", theme === 'classic' ? "text-slate-900" : "text-slate-200")}>Professionsbachelor (Maskinmester)</h4>
                  <span className={cn(
                    "text-xs font-bold uppercase px-2 py-1 rounded",
                    theme === 'classic' ? "text-[#c29b62] bg-[#c29b62]/10" : "text-orange-500 bg-orange-500/10"
                  )}>I Gang</span>
                </div>
                <p className={cn("text-sm", theme === 'classic' ? "text-slate-600" : "text-slate-400")}>Fredericia Maskinmesterskole</p>
                <p className={cn("text-xs mt-1", theme === 'classic' ? "text-slate-500" : "text-slate-500")}>
                   Startet 2024 (Fortsat fra Maskinmesterskolen København, start 2022)
                </p>
              </div>

              {/* Education 2 */}
              <div className={cn(
                "p-6 rounded-sm border transition-colors",
                theme === 'classic' ? "bg-white border-slate-200 hover:border-[#c29b62]/30" : "bg-slate-900 border-slate-800 hover:border-orange-500/30"
              )}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className={cn("text-lg font-bold", theme === 'classic' ? "text-slate-900" : "text-slate-200")}>Højere Forberedelse (HF)</h4>
                  <span className={cn(
                    "text-xs font-bold uppercase px-2 py-1 rounded",
                    theme === 'classic' ? "text-slate-600 bg-slate-100" : "text-slate-600 bg-slate-800"
                  )}>Afsluttet</span>
                </div>
                <p className={cn("text-sm", theme === 'classic' ? "text-slate-600" : "text-slate-400")}>VUC Roskilde</p>
                <p className={cn("text-xs mt-1", theme === 'classic' ? "text-slate-500" : "text-slate-500")}>2019 — 2022</p>
              </div>

              {/* Courses */}
              <div className="pt-4">
                <h4 className={cn(
                  "text-sm font-bold uppercase tracking-wider mb-4",
                  theme === 'classic' ? "text-slate-900" : "text-white"
                )}>Relevante Kurser</h4>
                <div className="flex flex-wrap gap-2">
                   <span className={cn(
                     "px-3 py-1 text-xs rounded-full border font-bold",
                     theme === 'classic' ? "bg-[#c29b62] text-white border-[#c29b62]" : "bg-orange-600 text-white border-orange-500"
                   )}>AMR (Arbejdsmiljørepræsentant)</span>
                   <span className={cn(
                     "px-3 py-1 text-xs rounded-full border",
                     theme === 'classic' ? "bg-slate-100 text-slate-600 border-slate-200" : "bg-slate-800 text-slate-300 border-slate-700"
                   )}>EU-Stem: 3D Print og Konstruktion</span>
                   <span className={cn(
                     "px-3 py-1 text-xs rounded-full border",
                     theme === 'classic' ? "bg-slate-100 text-slate-600 border-slate-200" : "bg-slate-800 text-slate-300 border-slate-700"
                   )}>Dækmontage og Reklamation</span>
                   <span className={cn(
                     "px-3 py-1 text-xs rounded-full border",
                     theme === 'classic' ? "bg-slate-100 text-slate-600 border-slate-200" : "bg-slate-800 text-slate-300 border-slate-700"
                   )}>Salg og Service</span>
                   <span className={cn(
                     "px-3 py-1 text-xs rounded-full border",
                     theme === 'classic' ? "bg-slate-100 text-slate-600 border-slate-200" : "bg-slate-800 text-slate-300 border-slate-700"
                   )}>Kørekort B</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
