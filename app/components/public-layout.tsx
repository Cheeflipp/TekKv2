"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";
import { useTheme } from "../lib/theme-context";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, bgVersion, setBgVersion, bgIntensity, setBgIntensity } = useTheme();

  // Helper to calculate opacity based on intensity (1-5)
  const getOpacity = (base: number) => Math.min(1, base * (1 + (bgIntensity - 1) * 0.5));

  const navItems = [
    { label: 'Hjem', path: '/' },
    { label: 'Booking', path: '/booking' },
    { label: 'Kompetencer', path: '/kompetencer' },
    { label: 'Om mig', path: '/profil' },
    { label: 'Kontakt', path: '/kontakt' }
  ];

  return (
    <div className={cn(
      "min-h-screen flex flex-col font-sans transition-colors duration-300 relative",
      theme === 'classic' 
        ? "theme-classic bg-slate-50 text-slate-900 selection:bg-[#c29b62] selection:text-white" 
        : "theme-modern bg-slate-900 text-slate-200 selection:bg-orange-500 selection:text-white"
    )}>
      {/* Global Backgrounds */}
      {theme === 'modern' && (
        <>
          <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
            <Image 
              src="https://picsum.photos/seed/industrial_dark/1600/900" 
              alt="Industrial Background" 
              fill
              priority
              className="object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="fixed inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60 z-0 pointer-events-none"></div>
        </>
      )}

      {theme === 'classic' && (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          {bgVersion === 1 && (
            /* Version 1: Soft flowing waves (like img 1) */
            <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: getOpacity(0.3) }}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,30 C30,60 70,10 100,40 L100,100 L0,100 Z" fill="url(#grad1)" />
                <path d="M0,60 C40,30 60,80 100,50 L100,100 L0,100 Z" fill="url(#grad2)" opacity="0.6" />
                <path d="M0,80 C30,50 80,90 100,70 L100,100 L0,100 Z" fill="url(#grad3)" opacity="0.4" />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c29b62" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a07d4b" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad3" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#e5d5b5" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {bgVersion === 2 && (
            /* Version 2: Top and bottom framing waves (slightly darker) */
            <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: getOpacity(0.4) }}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,0 L100,0 L100,25 C70,45 30,5 0,30 Z" fill="url(#grad1_v2)" />
                <path d="M0,100 L100,100 L100,75 C60,55 40,95 0,70 Z" fill="url(#grad2_v2)" />
                <defs>
                  <linearGradient id="grad1_v2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c29b62" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad2_v2" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#a07d4b" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {bgVersion === 3 && (
            /* Version 3: Diagonal sweeping waves */
            <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: getOpacity(0.35) }}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,0 L40,0 C60,40 30,70 100,90 L100,100 L0,100 Z" fill="url(#grad1_v3)" />
                <path d="M0,30 C40,60 50,40 100,100 L0,100 Z" fill="url(#grad2_v3)" opacity="0.7" />
                <path d="M0,60 C30,80 60,70 80,100 L0,100 Z" fill="url(#grad3_v3)" opacity="0.5" />
                <defs>
                  <linearGradient id="grad1_v3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c29b62" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad2_v3" x1="0%" y1="50%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a07d4b" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad3_v3" x1="0%" y1="100%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#e5d5b5" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {bgVersion === 4 && (
            /* Version 4: Multiple layered bottom waves (darker, more waves) */
            <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: getOpacity(0.45) }}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,40 C30,70 50,30 100,50 L100,100 L0,100 Z" fill="url(#grad1_v4)" />
                <path d="M0,55 C25,45 60,80 100,65 L100,100 L0,100 Z" fill="url(#grad2_v4)" opacity="0.8" />
                <path d="M0,70 C40,60 70,90 100,75 L100,100 L0,100 Z" fill="url(#grad3_v4)" opacity="0.6" />
                <path d="M0,85 C50,75 80,95 100,85 L100,100 L0,100 Z" fill="url(#grad1_v4)" opacity="0.4" />
                <defs>
                  <linearGradient id="grad1_v4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c29b62" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad2_v4" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a07d4b" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad3_v4" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#8b6b40" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {bgVersion === 5 && (
            /* Version 5: Massive, wide, dramatic waves */
            <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: getOpacity(0.35) }}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,10 C50,90 80,-10 100,50 L100,100 L0,100 Z" fill="url(#grad1_v5)" />
                <path d="M0,40 C40,100 90,10 100,70 L100,100 L0,100 Z" fill="url(#grad2_v5)" opacity="0.7" />
                <defs>
                  <linearGradient id="grad1_v5" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a07d4b" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad2_v5" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#c29b62" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Header / Navigation */}
      <header className={cn(
        "backdrop-blur-md border-b sticky top-0 z-50 transition-colors duration-300",
        theme === 'classic' ? "bg-white/95 border-slate-200 text-slate-900" : "bg-slate-950/80 text-white border-slate-800"
      )}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Link href="/" className="group relative flex items-center gap-0 cursor-pointer hover:scale-105 transition-transform duration-200" aria-label="TekK Hjem">
              
              <>
                {/* Logo Mark Wrapper (Holds Gear + Square T) */}
                <div className="relative flex items-center justify-center w-[72px] h-[72px]">
                  {/* Gear Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                       className={cn(
                         "absolute w-[72px] h-[72px] animate-[spin_20s_linear_infinite] z-0",
                         theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"
                       )}>
                    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1" />
                    <g fill="currentColor">
                      <rect x="10.5" y="1" width="3" height="2" />
                      <rect x="10.5" y="1" width="3" height="2" transform="rotate(40 12 12)" />
                      <rect x="10.5" y="1" width="3" height="2" transform="rotate(80 12 12)" />
                      <rect x="10.5" y="1" width="3" height="2" transform="rotate(120 12 12)" />
                      <rect x="10.5" y="1" width="3" height="2" transform="rotate(160 12 12)" />
                      <rect x="10.5" y="1" width="3" height="2" transform="rotate(200 12 12)" />
                      <rect x="10.5" y="1" width="3" height="2" transform="rotate(240 12 12)" />
                      <rect x="10.5" y="1" width="3" height="2" transform="rotate(280 12 12)" />
                      <rect x="10.5" y="1" width="3" height="2" transform="rotate(320 12 12)" />
                    </g>
                  </svg>

                  {/* Square [T] */}
                  <div className={cn(
                    "relative z-30 h-8 w-8 rounded-sm flex items-center justify-center font-black text-2xl leading-none shadow-lg",
                    theme === 'classic' ? "bg-[#c29b62] text-white shadow-[#c29b62]/30" : "bg-orange-500 text-slate-900 shadow-orange-900/50"
                  )}>T</div>
                </div>

                {/* Text ekK Box */}
                <div className={cn(
                  "relative z-20 h-6 px-1 border rounded-sm flex items-center justify-center -ml-[25px] shadow-lg translate-y-1",
                  theme === 'classic' ? "bg-white border-slate-200" : "bg-slate-950 border-slate-800"
                )}>
                  <span className={cn(
                    "text-lg font-bold tracking-tight leading-none",
                    theme === 'classic' ? "text-slate-900" : "text-white"
                  )}>ek<span className={theme === 'classic' ? "text-[#c29b62]" : "text-orange-500"}>K</span></span>
                </div>
              </>
            </Link>

          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className={cn(
                  "transition-all duration-200 text-sm font-bold uppercase tracking-widest transform",
                  theme === 'classic' 
                    ? "text-slate-600 hover:text-[#c29b62]" 
                    : "text-slate-400 hover:text-orange-500",
                  pathname === item.path && (theme === 'classic' ? "text-[#c29b62] scale-105" : "text-orange-500 scale-105")
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section: Theme Toggle + Login + Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Theme Toggle Slider */}
            <div className="flex items-center gap-1.5 md:gap-2 mr-1 md:mr-0">
              <Sun className={cn("w-4 h-4 transition-colors", theme === 'classic' ? "text-amber-500" : "text-slate-500")} />
              <button
                onClick={() => setTheme(theme === 'classic' ? 'modern' : 'classic')}
                className={cn(
                  "relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 focus:outline-none",
                  theme === 'classic' ? "bg-slate-300" : "bg-slate-600"
                )}
                aria-label="Skift tema"
                title={theme === 'classic' ? "Skift til mørkt tema" : "Skift til lyst tema"}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm",
                    theme === 'classic' ? "translate-x-0.5" : "translate-x-[22px]"
                  )}
                />
              </button>
              <Moon className={cn("w-4 h-4 transition-colors", theme === 'classic' ? "text-slate-400" : "text-blue-400")} />
            </div>

            {/* Desktop Login Button */}
            <Link 
              href="/login"
              className={cn(
                "hidden md:block px-6 py-2 rounded-sm border transition-all duration-300 font-bold text-xs uppercase tracking-widest",
                theme === 'classic'
                  ? "bg-slate-900 text-white border-slate-900 hover:bg-[#c29b62] hover:border-[#c29b62]"
                  : "bg-slate-800 hover:bg-orange-600 hover:text-white text-slate-300 border-slate-700 hover:border-orange-500"
              )}>
              Log ind
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "md:hidden focus:outline-none p-2",
                theme === 'classic' ? "text-slate-900 hover:text-[#c29b62]" : "text-slate-300 hover:text-white"
              )}
              aria-label="Toggle Menu">
              {!mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className={cn(
            "md:hidden absolute top-full left-0 w-full border-b shadow-2xl animate-in slide-in-from-top-2 duration-200",
            theme === 'classic' ? "bg-white border-slate-200" : "bg-slate-900 border-slate-800"
          )}>
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-left w-full py-3 px-4 rounded-sm font-bold uppercase tracking-widest transition-colors",
                    theme === 'classic'
                      ? "text-slate-600 hover:text-[#c29b62] hover:bg-slate-50"
                      : "text-slate-300 hover:text-orange-500 hover:bg-slate-800",
                    pathname === item.path && (theme === 'classic' ? "text-[#c29b62] bg-slate-50" : "text-orange-500 bg-slate-800")
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Outlet */}
      <main className="flex-grow flex flex-col relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className={cn(
        "py-4 border-t text-center relative z-10",
        theme === 'classic' ? "bg-white border-slate-200" : "bg-slate-950 border-slate-900"
      )}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center">
            <div className={cn(
              "flex flex-wrap items-center justify-center gap-2 md:gap-4 text-[10px] sm:text-xs uppercase tracking-wider",
              theme === 'classic' ? "text-slate-500" : "text-slate-600"
            )}>
              <p>&copy; 2025 TekK</p>
              <span className="hidden sm:inline text-slate-300">|</span>
              <p className={theme === 'classic' ? "font-bold text-slate-700" : "font-bold text-slate-400"}>CVR: 46022432</p>
              
              {/* Mobile Login Link - Now inline on mobile vs desktop */}
              <span className="hidden sm:inline text-slate-300">|</span>
              <Link 
                href="/login" 
                className={cn(
                  "font-bold transition-colors md:hidden",
                  theme === 'classic' ? "hover:text-[#c29b62]" : "hover:text-orange-500"
                )}>
                Admin Log ind
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
