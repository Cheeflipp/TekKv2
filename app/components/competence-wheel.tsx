"use client";

import React, { useState } from 'react';

const cards = [
  { 
    id: 1, 
    title: 'Automation', 
    desc: 'Gennem min maskinmesteruddannelse har jeg opbygget en stærk forståelse for styring og regulering. Jeg kan hjælpe med at optimere, fejlfinde og fremtidssikre tekniske anlæg.', 
    bullets: ['Procesoptimering', 'Systemforståelse', 'Fejlfinding & drift'] 
  },
  { 
    id: 2, 
    title: 'Salg & Service', 
    desc: 'Med over 7 års erfaring fra detailbranchen, blandt andet som souschef, har jeg stor erfaring med kundekontakt, behovsafdækning og driften af en salgsafdeling.', 
    bullets: ['Kundebetjening & Rådgivning', 'Reklamationshåndtering', 'Behovsafdækning'] 
  },
  { 
    id: 3, 
    title: 'Vedligeholdelse', 
    desc: 'Jeg kombinerer min praktiske baggrund som smed med en teoretisk maskinmestertilgang. Jeg tilbyder systematisk vedligehold og reparation for at sikre optimal drift og høj oppetid.', 
    bullets: ['Forebyggende vedligehold', 'Fejlfinding & Reparation', 'Driftsikkerhed'] 
  },
  { 
    id: 4, 
    title: 'Energiberegninger', 
    desc: 'Med fokus på energioptimering og den grønne omstilling kan jeg udføre præcise beregninger, der afdækker forbedringspotentialer og reducerer både forbrug og omkostninger.', 
    bullets: ['Energioptimering', 'Forbrugsanalyse', 'Ressourcebesparelser'] 
  },
  { 
    id: 5, 
    title: 'Smedearbejde', 
    desc: 'Erfaring med TIG svejsning, pladebearbejdning og montage. Jeg sikrer solide løsninger der holder.',
    bullets: ['TIG Svejsning', 'Pladebearbejdning', 'Montage']
  },
  { 
    id: 6, 
    title: 'Konstruktion & Dimensionering', 
    desc: 'Solid teknisk forståelse for mekanisk design. Jeg sikrer, at komponenter og anlæg er korrekt dimensioneret og overholder alle nødvendige tolerancer og kvalitetskrav.', 
    bullets: ['Toleranceberegninger', 'Dimensionering af anlæg', 'Materialeforståelse'] 
  },
  { 
    id: 7, 
    title: 'Lager & Logistik', 
    desc: 'Effektiv håndtering af varer, modtagelse og system i tingene. Jeg holder overblikket i travle perioder.',
    bullets: ['Pak & Pluk', 'Varemodtagelse', 'Orden & Struktur']
  },
  { 
    id: 8, 
    title: 'Diverse', 
    desc: 'Har du brug for en ekstra hånd til nedrivning, oprydning eller andet forefaldende arbejde? Jeg er fleksibel.',
    bullets: ['Nedrivning', 'Oprydning', 'Forefaldende arbejde']
  },
];

export default function CompetenceWheel() {
  const [rotation, setRotation] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  
  const angle = 360 / cards.length; // 45 degrees for 8 cards
  const radius = 480; // Increased radius to space out the 8 cards and show more

  const next = () => setRotation(r => r - angle);
  const prev = () => setRotation(r => r + angle);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setDragOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentX = e.targetTouches[0].clientX;
    setTouchEnd(currentX);
    const diff = currentX - touchStart;
    setDragOffset(diff * 0.2); // Visual feedback during drag
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) {
      setDragOffset(0);
      setTouchStart(null);
      setTouchEnd(null);
      return;
    }
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
    
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleCardClick = (index: number) => {
    const targetRotation = -index * angle;
    const currentMod = rotation % 360;
    const targetMod = targetRotation % 360;
    
    let diff = targetMod - currentMod;
    
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    setRotation(r => r + diff);
  };

  return (
    <div 
      className="relative w-full h-[420px] md:h-[800px] flex flex-col items-center justify-end pb-4 md:pb-0 md:justify-start md:pt-[260px] touch-pan-y select-none"
      style={{ perspective: '1600px' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      
      {/* 3D Scene Container */}
      <div 
        className={`relative w-[260px] md:w-[320px] h-[360px] md:h-[420px] ease-out origin-center md:origin-top scale-[0.75] sm:scale-[0.85] md:scale-100 ${touchStart !== null ? 'transition-none' : 'transition-transform duration-1000'}`}
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `translateZ(-${radius}px) rotateY(${rotation + dragOffset}deg)` 
        }}
      >
        {cards.map((card, i) => {
          const cardAngle = angle * i;
          const currentRotation = rotation + dragOffset;
          let effectiveRotation = (currentRotation + cardAngle) % 360;
          if (effectiveRotation < 0) effectiveRotation += 360;
          
          // Calculate steps from front (0 to 4)
          const distDegrees = Math.min(effectiveRotation, 360 - effectiveRotation);
          const step = Math.round(distDegrees / angle);
          const isFront = step === 0;
          
          // Elevate cards in the back (50px higher per step)
          const yOffset = step * -50;

          return (
            <div 
              key={card.id}
              onClick={() => handleCardClick(i)}
              className="absolute top-0 left-0 w-full h-full cursor-pointer transition-all duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${cardAngle}deg) translateZ(${radius}px) translateY(${yOffset}px) ${isFront ? 'scale(1.05)' : 'scale(1)'}`,
              }}
            >
              {/* Front Face */}
              <div 
                className={`absolute inset-0 bg-slate-800 flex flex-col items-center justify-center text-center p-4 md:p-8 transition-colors duration-500 border-2
                  ${isFront ? 'border-orange-500' : 'border-slate-600 hover:border-slate-500'}
                `}
                style={{ transform: 'translateZ(10px)', backfaceVisibility: 'hidden' }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">{card.title}</h3>
                <p className="text-slate-300 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">{card.desc}</p>
                
                {card.bullets && card.bullets.length > 0 && (
                  <ul className="text-sm md:text-base text-slate-300 space-y-1 md:space-y-2 mb-4 md:mb-6 text-left w-full">
                    {card.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${isFront ? 'bg-orange-500' : 'bg-slate-500'}`}></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Back Face */}
              <div 
                className="absolute inset-0 bg-slate-900 border-2 border-slate-700"
                style={{ transform: 'translateZ(-10px) rotateY(180deg)', backfaceVisibility: 'hidden' }}
              ></div>

              {/* Left Face (Thickness) */}
              <div 
                className={`absolute top-0 bottom-0 left-0 w-[20px] transition-colors duration-500
                  ${isFront ? 'bg-orange-900/80' : 'bg-slate-600'}
                `}
                style={{ transform: 'translateX(-10px) rotateY(-90deg)' }}
              ></div>

              {/* Right Face (Thickness) */}
              <div 
                className={`absolute top-0 bottom-0 right-0 w-[20px] transition-colors duration-500
                  ${isFront ? 'bg-orange-950/80' : 'bg-slate-700'}
                `}
                style={{ transform: 'translateX(10px) rotateY(90deg)' }}
              ></div>

              {/* Top Face (Thickness) */}
              <div 
                className={`absolute top-0 left-0 right-0 h-[20px] transition-colors duration-500
                  ${isFront ? 'bg-orange-800/80' : 'bg-slate-700'}
                `}
                style={{ transform: 'translateY(-10px) rotateX(90deg)' }}
              ></div>

              {/* Bottom Face (Thickness) */}
              <div 
                className={`absolute bottom-0 left-0 right-0 h-[20px] transition-colors duration-500
                  ${isFront ? 'bg-orange-950/80' : 'bg-slate-900'}
                `}
                style={{ transform: 'translateY(10px) rotateX(-90deg)' }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
