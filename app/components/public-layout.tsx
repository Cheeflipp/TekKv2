"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";
import { useTheme } from "../lib/theme-context";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLogo, setActiveLogo] = useState<'default' | 'new'>('default');
  const [logoMenuOpen, setLogoMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { label: 'Hjem', path: '/' },
    { label: 'Booking', path: '/booking' },
    { label: 'Kompetencer', path: '/kompetencer' },
    { label: 'Om mig', path: '/profil' },
    { label: 'Kontakt', path: '/kontakt' }
  ];

  return (
    <div className={cn(
      "min-h-screen flex flex-col font-sans transition-colors duration-300",
      theme === 'classic' 
        ? "theme-classic bg-white text-slate-900 selection:bg-[#c29b62] selection:text-white" 
        : "theme-modern bg-slate-900 text-slate-200 selection:bg-orange-500 selection:text-white"
    )}>
      {/* Header / Navigation */}
      <header className={cn(
        "backdrop-blur-md border-b sticky top-0 z-50 transition-colors duration-300",
        theme === 'classic' ? "bg-white/95 border-slate-200 text-slate-900" : "bg-slate-950/80 text-white border-slate-800"
      )}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Link href="/" className="group relative flex items-center gap-0 cursor-pointer hover:scale-105 transition-transform duration-200" aria-label="TekK Hjem">
              
              {activeLogo === 'default' ? (
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
              ) : (
                <div className="h-[72px] flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="50 800 280 230" className="h-full w-auto max-w-[150px]">
                    <defs>
                      <linearGradient id="gradEast" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={theme === 'classic' ? "#c29b62" : "#f97316"}/>
                        <stop offset="100%" stopColor={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                      </linearGradient>
                      <linearGradient id="gradEastStrokes" x1="165.36" y1="0" x2="290.36" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor={theme === 'classic' ? "#c29b62" : "#f97316"}/>
                        <stop offset="100%" stopColor={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                      </linearGradient>
                    </defs>

                    <rect x="81.36" y="835" width="240" height="160" rx="12" fill="none" stroke={theme === 'classic' ? "#c29b62" : "#f97316"} strokeWidth="7"/>

                    <rect x="165.36" y="884.5" width="125" height="80" fill="url(#gradEast)"/>

                    <polygon points="202.92,884.5 217.92,884.5 182.92,934 167.92,934" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                    <polygon points="167.92,934 182.92,934 217.92,964.5 202.92,964.5" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>

                    <rect x="165.36" y="884.5" width="30" height="10" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                    <rect x="165.36" y="894.5" width="25" height="10" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                    <rect x="165.36" y="904.5" width="15" height="10" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                    <rect x="165.36" y="914.5" width="5" height="10" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                    <rect x="165.36" y="924.5" width="10" height="20" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                    <rect x="165.36" y="944.5" width="25" height="20" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                    <rect x="165.36" y="934.5" width="15" height="20" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                    <rect x="180.36" y="954.5" width="15" height="10" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>

                    <rect x="271.57" y="884.5" width="18.79" height="80" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                    <rect x="261.34" y="914.5" width="18.79" height="40" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                    <rect x="269.57" y="899.5" width="18.79" height="40" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                    <rect x="266.13" y="893.38" width="18.79" height="40" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                    <rect x="258.78" y="904.5" width="12.79" height="40" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                    <rect x="250.36" y="917.5" width="12.79" height="20" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>

                    <polygon points="235.39,884.5 250.39,884.5 215.39,934 200.39,934" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                    <polygon points="200.39,934 215.39,934 250.39,964.5 235.39,964.5" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                    <polygon points="267.92,884.5 282.92,884.5 247.92,934 232.92,934" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                    <polygon points="232.92,934 247.92,934 282.92,964.5 267.92,964.5" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>

                    <rect x="155.92" y="892.81" width="57.5" height="24.69" fill={theme === 'classic' ? "#ffffff" : "#0f172a"} transform="rotate(-60 184.67 905.155)"/>
                    <rect x="156.92" y="942.16" width="57.5" height="24.69" fill={theme === 'classic' ? "#ffffff" : "#0f172a"} transform="rotate(39 185.67 954.505)"/>

                    <rect x="156.36" y="874.5" width="15" height="90" fill={theme === 'classic' ? "#c29b62" : "#f97316"}/>
                    <rect x="126.57" y="869.5" width="156.43" height="15" fill="url(#gradEast)"/>

                    <rect x="247.36" y="927.12" width="18.79" height="17.38" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>

                    {/* Animated vertical strokes for 'k' and 'K' */}
                    <rect 
                      x="176" y="855" width="11" height="109.5" 
                      fill="url(#gradEastStrokes)" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                    />
                    <rect 
                      x="208" y="884.5" width="11" height="80" 
                      fill="url(#gradEastStrokes)" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out delay-150"
                    />

                    <rect x="92.67" y="841.25" width="145.26" height="147.5" rx="12" fill="none" stroke={theme === 'classic' ? "#c29b62" : "#f97316"} strokeWidth="7" transform="rotate(45 165.3 915)"/>
                    <rect x="100.83" y="850" width="200.53" height="130" rx="12" fill="none" stroke={theme === 'classic' ? "#c29b62" : "#f97316"} strokeWidth="7"/>
                  </svg>
                </div>
              )}
            </Link>

            {/* Logo Switcher Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setLogoMenuOpen(!logoMenuOpen)}
                className={cn(
                  "p-1 rounded-md transition-colors",
                  theme === 'classic' ? "hover:bg-slate-100 text-slate-400" : "hover:bg-slate-800 text-slate-500"
                )}
                aria-label="Skift logo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {logoMenuOpen && (
                <div className={cn(
                  "absolute left-0 top-full mt-2 w-48 rounded-md shadow-lg border z-50 overflow-hidden",
                  theme === 'classic' ? "bg-white border-slate-200" : "bg-slate-900 border-slate-800"
                )}>
                  <button
                    onClick={() => { setActiveLogo('default'); setLogoMenuOpen(false); }}
                    className={cn(
                      "w-full text-left px-4 py-3 text-sm font-medium transition-colors",
                      activeLogo === 'default' 
                        ? (theme === 'classic' ? "bg-slate-50 text-[#c29b62]" : "bg-slate-800 text-orange-500")
                        : (theme === 'classic' ? "text-slate-700 hover:bg-slate-50" : "text-slate-300 hover:bg-slate-800")
                    )}
                  >
                    Logo 1 (Standard)
                  </button>
                  <button
                    onClick={() => { setActiveLogo('new'); setLogoMenuOpen(false); }}
                    className={cn(
                      "w-full text-left px-4 py-3 text-sm font-medium transition-colors border-t",
                      theme === 'classic' ? "border-slate-100" : "border-slate-800",
                      activeLogo === 'new' 
                        ? (theme === 'classic' ? "bg-slate-50 text-[#c29b62]" : "bg-slate-800 text-orange-500")
                        : (theme === 'classic' ? "text-slate-700 hover:bg-slate-50" : "text-slate-300 hover:bg-slate-800")
                    )}
                  >
                    Logo 2 (Nyt)
                  </button>
                </div>
              )}
            </div>
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
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className={cn(
        "py-8 border-t text-center relative",
        theme === 'classic' ? "bg-white border-slate-200" : "bg-slate-950 border-slate-900"
      )}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center">
            {/* Footer Content (Center) */}
            <div className="flex flex-col items-center">
              {/* Footer Logo: Consistent with Header */}
              <div className="inline-flex items-center justify-center gap-0 mb-4 opacity-50 hover:opacity-100 transition-opacity group">
                 {activeLogo === 'default' ? (
                   <>
                     {/* Logo Mark Wrapper */}
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
                          theme === 'classic' ? "bg-[#c29b62] text-white" : "bg-orange-500 text-slate-900"
                        )}>T</div>
                     </div>
                     
                     {/* Text ekK Box */}
                     <div className={cn(
                       "relative z-20 h-6 px-1 border rounded-sm flex items-center justify-center -ml-[25px] shadow-lg translate-y-1",
                       theme === 'classic' ? "bg-white border-slate-200" : "bg-slate-900 border-slate-800"
                     )}>
                        <span className={cn(
                          "text-lg font-bold tracking-tight leading-none",
                          theme === 'classic' ? "text-slate-500" : "text-slate-400"
                        )}>ek<span className={theme === 'classic' ? "text-[#c29b62]" : "text-slate-600"}>K</span></span>
                     </div>
                   </>
                 ) : (
                   <div className="h-[72px] flex items-center">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="50 800 280 230" className="h-full w-auto max-w-[150px]">
                       <defs>
                         <linearGradient id="gradEastFooter" x1="0%" y1="0%" x2="100%" y2="0%">
                           <stop offset="0%" stopColor={theme === 'classic' ? "#c29b62" : "#f97316"}/>
                           <stop offset="100%" stopColor={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                         </linearGradient>
                         <linearGradient id="gradEastStrokesFooter" x1="165.36" y1="0" x2="290.36" y2="0" gradientUnits="userSpaceOnUse">
                           <stop offset="0%" stopColor={theme === 'classic' ? "#c29b62" : "#f97316"}/>
                           <stop offset="100%" stopColor={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                         </linearGradient>
                       </defs>

                       <rect x="81.36" y="835" width="240" height="160" rx="12" fill="none" stroke={theme === 'classic' ? "#c29b62" : "#f97316"} strokeWidth="7"/>

                       <rect x="165.36" y="884.5" width="125" height="80" fill="url(#gradEastFooter)"/>

                       <polygon points="202.92,884.5 217.92,884.5 182.92,934 167.92,934" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                       <polygon points="167.92,934 182.92,934 217.92,964.5 202.92,964.5" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>

                       <rect x="165.36" y="884.5" width="30" height="10" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                       <rect x="165.36" y="894.5" width="25" height="10" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                       <rect x="165.36" y="904.5" width="15" height="10" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                       <rect x="165.36" y="914.5" width="5" height="10" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                       <rect x="165.36" y="924.5" width="10" height="20" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                       <rect x="165.36" y="944.5" width="25" height="20" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                       <rect x="165.36" y="934.5" width="15" height="20" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                       <rect x="180.36" y="954.5" width="15" height="10" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>

                       <rect x="271.57" y="884.5" width="18.79" height="80" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                       <rect x="261.34" y="914.5" width="18.79" height="40" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                       <rect x="269.57" y="899.5" width="18.79" height="40" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                       <rect x="266.13" y="893.38" width="18.79" height="40" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                       <rect x="258.78" y="904.5" width="12.79" height="40" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                       <rect x="250.36" y="917.5" width="12.79" height="20" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>

                       <polygon points="235.39,884.5 250.39,884.5 215.39,934 200.39,934" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                       <polygon points="200.39,934 215.39,934 250.39,964.5 235.39,964.5" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                       <polygon points="267.92,884.5 282.92,884.5 247.92,934 232.92,934" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>
                       <polygon points="232.92,934 247.92,934 282.92,964.5 267.92,964.5" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>

                       <rect x="155.92" y="892.81" width="57.5" height="24.69" fill={theme === 'classic' ? "#ffffff" : "#0f172a"} transform="rotate(-60 184.67 905.155)"/>
                       <rect x="156.92" y="942.16" width="57.5" height="24.69" fill={theme === 'classic' ? "#ffffff" : "#0f172a"} transform="rotate(39 185.67 954.505)"/>

                       <rect x="156.36" y="874.5" width="15" height="90" fill={theme === 'classic' ? "#c29b62" : "#f97316"}/>
                       <rect x="126.57" y="869.5" width="156.43" height="15" fill="url(#gradEastFooter)"/>

                       <rect x="247.36" y="927.12" width="18.79" height="17.38" fill={theme === 'classic' ? "#ffffff" : "#0f172a"}/>

                       {/* Animated vertical strokes for 'k' and 'K' */}
                       <rect 
                         x="176" y="855" width="11" height="109.5" 
                         fill="url(#gradEastStrokesFooter)" 
                         className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                       />
                       <rect 
                         x="208" y="884.5" width="11" height="80" 
                         fill="url(#gradEastStrokesFooter)" 
                         className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out delay-150"
                       />

                       <rect x="92.67" y="841.25" width="145.26" height="147.5" rx="12" fill="none" stroke={theme === 'classic' ? "#c29b62" : "#f97316"} strokeWidth="7" transform="rotate(45 165.3 915)"/>
                       <rect x="100.83" y="850" width="200.53" height="130" rx="12" fill="none" stroke={theme === 'classic' ? "#c29b62" : "#f97316"} strokeWidth="7"/>
                     </svg>
                   </div>
                 )}
              </div>
              <div className={cn(
                "flex flex-col gap-1 text-xs uppercase tracking-wider",
                theme === 'classic' ? "text-slate-500" : "text-slate-600"
              )}>
                <p>&copy; 2026 TekK</p>
                <p className={theme === 'classic' ? "font-bold text-slate-700" : "font-bold text-slate-700"}>CVR: 46022432</p>
              </div>
            </div>
          </div>
          
          {/* Mobile Login Link (Visible only on mobile) */}
          <div className={cn(
            "md:hidden mt-8 pt-6 border-t",
            theme === 'classic' ? "border-slate-200" : "border-slate-900"
          )}>
             <Link 
               href="/login" 
               className={cn(
                 "text-[10px] font-bold uppercase tracking-widest transition-colors",
                 theme === 'classic' ? "text-slate-500 hover:text-[#c29b62]" : "text-slate-700 hover:text-orange-500"
               )}>
               Admin Log ind
             </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
