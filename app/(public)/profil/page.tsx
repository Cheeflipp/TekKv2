import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-slate-950 min-h-screen pb-24">
      {/* Hero / Intro Section */}
      <section className="relative py-20 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-orange-500/5 radial-gradient opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            
            {/* Profile Image Placeholder */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="relative aspect-[3/4] w-full bg-slate-800 rounded-sm overflow-hidden border border-slate-700 shadow-2xl group">
                 {/* Using a seed that looks somewhat professional/male based on context */}
                 <Image 
                   src="https://picsum.photos/seed/christian_wessel/600/800" 
                   alt="Christian Wessel K. Christensen" 
                   fill
                   className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                 <div className="absolute bottom-6 left-6">
                   <h1 className="text-3xl font-black text-white uppercase leading-none mb-1">Christian<br/>Christensen</h1>
                 </div>
              </div>
              
              {/* Stats removed as requested */}
            </div>

            {/* Bio Text */}
            <div className="flex-grow space-y-8">
              <div>
                <h2 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-3">Om Mig</h2>
                <h3 className="text-4xl font-bold text-white mb-6">Glad, Karismatisk & <span className="text-slate-400">Ansvarlig</span></h3>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed">
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
              <div className="border-t border-slate-800 pt-8">
                <h4 className="text-white font-bold uppercase tracking-wider mb-4">Styrker</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-3 text-slate-400">
                    <li className="flex items-center gap-3"><span className="text-orange-500 font-bold">✓</span> Ansvarsbevidst & Mødestabil</li>
                    <li className="flex items-center gap-3"><span className="text-orange-500 font-bold">✓</span> Lærenem</li>
                  </ul>
                  <ul className="space-y-3 text-slate-400">
                    <li className="flex items-center gap-3"><span className="text-orange-500 font-bold">✓</span> Stærk til IT-systemer</li>
                    <li className="flex items-center gap-3"><span className="text-orange-500 font-bold">✓</span> Certificeret AMR</li>
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
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-orange-500"></span> Erfaring
            </h3>
            
            <div className="space-y-8 relative border-l border-slate-800 ml-3 pl-8">
              
               {/* Job 1 (Aquagain Smed - Current/Future End) */}
              <div className="relative">
                <div className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2 border-orange-500 bg-slate-900"></div>
                <div className="text-sm text-orange-500 font-mono mb-1">Jul. 2024 — Jan. 2026</div>
                <h4 className="text-xl font-bold text-slate-200">Smed</h4>
                <p className="text-slate-400 text-sm">Aquagain A/S</p>
                <div className="text-slate-500 text-sm mt-2">
                  <p className="mb-2"><span className="text-slate-300 font-semibold">Arbejdsområder:</span> Rustfri TIG svejsning, pladearbejde og montage.</p>
                  <p className="bg-slate-900 border border-slate-700 p-2 rounded text-xs text-slate-400">
                    <span className="font-bold text-orange-500 block mb-1">Certificeringer & Standarder:</span>
                    Arbejdet udført jf. <strong>DS/EN ISO 3834-2</strong> (Kvalitetskrav til svejsning) og <strong>DS/EN 1090-3</strong> (Udførelse af aluminium- og stålkonstruktioner).
                  </p>
                </div>
              </div>

              {/* Job 2 (Delpro) */}
              <div className="relative">
                <div className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2 border-slate-700 bg-slate-900"></div>
                <div className="text-sm text-slate-500 font-mono mb-1">Mar. 2023 — Jul. 2024</div>
                <h4 className="text-xl font-bold text-slate-200">Ekstern Konsulent & Arbejdsmiljø Koordinator</h4>
                <p className="text-slate-400 text-sm">DELPRO A/S</p>
                <p className="text-slate-500 text-sm mt-2">
                  Gennemførte AMR-uddannelsen (Arbejdsmiljørepræsentant) ved ansættelsens start.
                  Arbejder med sikkerhedsinstruktioner, tilsyn og udarbejdelse af rapporter.
                </p>
              </div>

              {/* Job 3 (Aquagain Praktik) */}
              <div className="relative">
                <div className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2 border-slate-700 bg-slate-900"></div>
                <div className="text-sm text-slate-500 font-mono mb-1">Apr. 2023 — Dec. 2023</div>
                <h4 className="text-xl font-bold text-slate-200">Studerende Praktikant</h4>
                <p className="text-slate-400 text-sm">Aquagain A/S</p>
                <p className="text-slate-500 text-sm mt-2">
                  9 måneders praktikforløb som en del af maskinmesteruddannelsen. Fokus på værkstedsteknik og drift.
                </p>
              </div>

               {/* Job 4 */}
               <div className="relative">
                <div className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2 border-slate-700 bg-slate-900"></div>
                <div className="text-sm text-slate-500 font-mono mb-1">Aug. 2020 — Jun. 2022</div>
                <h4 className="text-xl font-bold text-slate-200">IT-Guide</h4>
                <p className="text-slate-400 text-sm">VUC Roskilde-Køge</p>
                <p className="text-slate-500 text-sm mt-2">
                  Vejledning af kursister i IT-programmer og generel lektiehjælp.
                </p>
              </div>
              
              {/* Job 5 (Thansen - Detailed Breakdown) */}
              <div className="relative mt-8 pt-4 border-t border-slate-800/50">
                <div className="absolute -left-[37px] top-6 h-4 w-4 rounded-full border-2 border-orange-500 bg-slate-900"></div>
                <div className="text-sm text-orange-500 font-bold font-mono mb-1">2015 — 2022</div>
                <h4 className="text-xl font-bold text-white">Thansen</h4>
                <p className="text-slate-400 text-sm">Glostrup, Rødovre, Valby</p>
                
                <div className="mt-3 bg-slate-900/50 p-4 rounded border border-slate-800 text-sm text-slate-400 leading-relaxed">
                  <p className="mb-4">
                    En længerevarende ansættelse med flere roller, fra gulvmedarbejder til leder og tilbage som specialist under uddannelse.
                  </p>
                  <ul className="space-y-4">
                     {/* Souschef */}
                     <li className="flex gap-3">
                        <span className="text-orange-500 font-bold mt-0.5">•</span>
                        <div>
                          <strong className="text-slate-200 block">Souschef (2016 — 2018)</strong>
                          <span className="text-slate-500">Ansvarlig for reklamationsafdelingen for dæk og fælge på Sjælland. Ansvarlig for butiksombygning og oplæring af nye medarbejdere.</span>
                        </div>
                     </li>
                     
                     {/* Butiksassistent (Full Time) */}
                     <li className="flex gap-3">
                        <span className="text-orange-500 font-bold mt-0.5">•</span>
                        <div>
                          <strong className="text-slate-200 block">Butiksassistent (2015 — 2016 & 2019 — 2020)</strong>
                          <span className="text-slate-500">Montage af dæk og reparation af cykler. Salg, lagerstyring og lukkeansvarlig.</span>
                        </div>
                     </li>

                     {/* Deltid */}
                     <li className="flex gap-3">
                        <span className="text-orange-500 font-bold mt-0.5">•</span>
                        <div>
                          <strong className="text-slate-200 block">Deltid / Studiejob (2020 — 2022)</strong>
                          <span className="text-slate-500">Fastholdt tilknytning under studie med fokus på salg og kundeservice.</span>
                        </div>
                     </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* Education Column */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-orange-500"></span> Uddannelse & Kurser
            </h3>
            
            <div className="space-y-6">
              {/* Education 1 */}
              <div className="bg-slate-900 p-6 rounded-sm border border-slate-800 hover:border-orange-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-slate-200">Professionsbachelor (Maskinmester)</h4>
                  <span className="text-orange-500 text-xs font-bold uppercase bg-orange-500/10 px-2 py-1 rounded">I Gang</span>
                </div>
                <p className="text-slate-400 text-sm">Fredericia Maskinmesterskole</p>
                <p className="text-slate-500 text-xs mt-1">
                   Startet 2024 (Fortsat fra Maskinmesterskolen København, start 2022)
                </p>
              </div>

              {/* Education 2 */}
              <div className="bg-slate-900 p-6 rounded-sm border border-slate-800 hover:border-orange-500/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-slate-200">Højere Forberedelse (HF)</h4>
                  <span className="text-slate-600 text-xs font-bold uppercase bg-slate-800 px-2 py-1 rounded">Afsluttet</span>
                </div>
                <p className="text-slate-400 text-sm">VUC Roskilde</p>
                <p className="text-slate-500 text-xs mt-1">2019 — 2022</p>
              </div>

              {/* Courses */}
              <div className="pt-4">
                <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Relevante Kurser</h4>
                <div className="flex flex-wrap gap-2">
                   <span className="px-3 py-1 bg-orange-600 text-white text-xs rounded-full border border-orange-500 font-bold">AMR (Arbejdsmiljørepræsentant)</span>
                   <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700">EU-Stem: 3D Print & Konstruktion</span>
                   <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700">Dækmontage & Reklamation</span>
                   <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700">Salg & Service</span>
                   <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700">Kørekort B</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
