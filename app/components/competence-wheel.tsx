"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '../lib/theme-context';
import { cn } from '../lib/utils';
import { competences as cards } from '../lib/competences';

export default function CompetenceWheel() {
  const { theme } = useTheme();
  const [rotation, setRotation] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [radius, setRadius] = useState(480);
  
  const angle = 360 / cards.length; // 45 degrees for 8 cards

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(380);
      } else if (window.innerWidth < 768) {
        setRadius(420);
      } else {
        setRadius(480);
      }
    };
    
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

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
      className="relative w-full h-[480px] sm:h-[520px] md:h-[620px] flex flex-col items-center justify-start pt-[40px] sm:pt-[80px] md:pt-[120px] touch-pan-y select-none"
      style={{ perspective: '1600px' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      
      {/* 3D Scene Container */}
      <div 
        className={`relative w-[280px] sm:w-[300px] md:w-[320px] h-[380px] sm:h-[400px] md:h-[420px] ease-out origin-top scale-[0.85] sm:scale-[0.9] md:scale-100 ${touchStart !== null ? 'transition-none' : 'transition-transform duration-1000'}`}
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
              {/* Shadow for classic theme */}
              {theme === 'classic' && (
                <div 
                  className={cn(
                    "absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/20 blur-xl rounded-[100%] transition-opacity duration-500",
                    isFront ? "opacity-100" : "opacity-30"
                  )}
                  style={{ transform: 'translateZ(-20px)' }}
                />
              )}

              {/* Front Face */}
              <div 
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8 transition-colors duration-500 border-2",
                  theme === 'classic' 
                    ? (isFront ? 'bg-white border-[#c29b62] shadow-xl shadow-[#c29b62]/10' : 'bg-slate-50 border-slate-200 hover:border-slate-300')
                    : (isFront ? 'bg-slate-800 border-orange-500' : 'bg-slate-800 border-slate-600 hover:border-slate-500')
                )}
                style={{ transform: 'translateZ(10px)', backfaceVisibility: 'hidden' }}
              >
                <h3 className={cn(
                  "text-2xl md:text-3xl font-bold mb-2 md:mb-4",
                  theme === 'classic' ? "text-slate-900 font-serif" : "text-white"
                )}>{card.title}</h3>
                <p className={cn(
                  "text-sm md:text-base mb-4 md:mb-6 leading-relaxed",
                  theme === 'classic' ? "text-slate-600" : "text-slate-300"
                )}>{card.desc}</p>
                
                {card.bullets && card.bullets.length > 0 && (
                  <ul className={cn(
                    "text-sm md:text-base space-y-1 md:space-y-2 mb-4 md:mb-6 text-left w-full",
                    theme === 'classic' ? "text-slate-600" : "text-slate-300"
                  )}>
                    {card.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          theme === 'classic' 
                            ? (isFront ? 'bg-[#c29b62]' : 'bg-slate-300')
                            : (isFront ? 'bg-orange-500' : 'bg-slate-500')
                        )}></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Back Face */}
              <div 
                className={cn(
                  "absolute inset-0 border-2",
                  theme === 'classic' ? "bg-slate-100 border-slate-200" : "bg-slate-900 border-slate-700"
                )}
                style={{ transform: 'translateZ(-10px) rotateY(180deg)', backfaceVisibility: 'hidden' }}
              ></div>

              {/* Left Face (Thickness) */}
              <div 
                className={cn(
                  "absolute top-0 bottom-0 left-0 w-[20px] transition-colors duration-500",
                  theme === 'classic'
                    ? (isFront ? 'bg-[#c29b62]/20' : 'bg-slate-200')
                    : (isFront ? 'bg-orange-900/80' : 'bg-slate-600')
                )}
                style={{ transform: 'translateX(-10px) rotateY(-90deg)' }}
              ></div>

              {/* Right Face (Thickness) */}
              <div 
                className={cn(
                  "absolute top-0 bottom-0 right-0 w-[20px] transition-colors duration-500",
                  theme === 'classic'
                    ? (isFront ? 'bg-[#c29b62]/30' : 'bg-slate-300')
                    : (isFront ? 'bg-orange-950/80' : 'bg-slate-700')
                )}
                style={{ transform: 'translateX(10px) rotateY(90deg)' }}
              ></div>

              {/* Top Face (Thickness) */}
              <div 
                className={cn(
                  "absolute top-0 left-0 right-0 h-[20px] transition-colors duration-500",
                  theme === 'classic'
                    ? (isFront ? 'bg-[#c29b62]/10' : 'bg-slate-200')
                    : (isFront ? 'bg-orange-800/80' : 'bg-slate-700')
                )}
                style={{ transform: 'translateY(-10px) rotateX(90deg)' }}
              ></div>

              {/* Bottom Face (Thickness) */}
              <div 
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-[20px] transition-colors duration-500",
                  theme === 'classic'
                    ? (isFront ? 'bg-[#c29b62]/40' : 'bg-slate-300')
                    : (isFront ? 'bg-orange-950/80' : 'bg-slate-900')
                )}
                style={{ transform: 'translateY(10px) rotateX(-90deg)' }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
