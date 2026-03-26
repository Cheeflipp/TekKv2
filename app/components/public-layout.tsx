"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";
import { useTheme } from "../lib/theme-context";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { label: 'Hjem', path: '/' },
    { label: 'Booking', path: '/booking' },
    { label: 'Kompetencer', path: '/kompetencer' },
    { label: 'Om Profilen', path: '/profil' },
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
          <Link href="/" className="group relative flex items-center gap-0 cursor-pointer hover:scale-105 transition-transform duration-200" aria-label="TekK Hjem">
            
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
          </Link>

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
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'classic' ? 'modern' : 'classic')}
              className={cn(
                "p-2 rounded-full transition-colors duration-200 flex items-center justify-center",
                theme === 'classic' 
                  ? "text-slate-500 hover:bg-slate-100 hover:text-slate-900" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
              aria-label="Skift tema"
              title={theme === 'classic' ? "Skift til mørkt tema" : "Skift til lyst tema"}
            >
              {theme === 'classic' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

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
