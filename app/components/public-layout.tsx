"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Hjem', path: '/' },
    { label: 'Booking', path: '/booking' },
    { label: 'Kompetencer', path: '/kompetencer' },
    { label: 'Om Profilen', path: '/profil' },
    { label: 'Kontakt', path: '/kontakt' }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header / Navigation */}
      <header className="bg-slate-950/80 backdrop-blur-md text-white border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
          
          {/* Logo Section */}
          <Link href="/" className="group relative flex items-center gap-0 cursor-pointer hover:scale-105 transition-transform duration-200" aria-label="TekK Hjem">
            
            {/* Logo Mark Wrapper (Holds Gear + Square T) */}
            <div className="relative flex items-center justify-center w-[72px] h-[72px]">
              {/* Gear Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                   className="absolute w-[72px] h-[72px] text-orange-500 animate-[spin_20s_linear_infinite] z-0">
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
              <div className="relative z-30 h-8 w-8 bg-orange-500 rounded-sm flex items-center justify-center font-black text-slate-900 text-2xl leading-none shadow-lg shadow-orange-900/50">T</div>
            </div>

            {/* Text ekK Box */}
            <div className="relative z-20 h-6 px-1 bg-slate-950 border border-slate-800 rounded-sm flex items-center justify-center -ml-[25px] shadow-lg translate-y-1">
              <span className="text-lg font-bold text-white tracking-tight leading-none">ek<span className="text-orange-500">K</span></span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className={cn(
                  "hover:text-orange-500 transition-all duration-200 text-sm font-bold uppercase tracking-widest text-slate-400 transform",
                  pathname === item.path && "text-orange-500 scale-105"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Login Button */}
          <Link 
            href="/login"
            className="hidden md:block bg-slate-800 hover:bg-orange-600 hover:text-white text-slate-300 px-6 py-2 rounded-sm border border-slate-700 hover:border-orange-500 transition-all duration-300 font-bold text-xs uppercase tracking-widest">
            Log ind
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white focus:outline-none p-2"
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

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-left w-full py-3 px-4 text-slate-300 hover:text-orange-500 hover:bg-slate-800 rounded-sm font-bold uppercase tracking-widest transition-colors",
                    pathname === item.path && "text-orange-500 bg-slate-800"
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
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 py-8 border-t border-slate-900 text-center">
        <div className="container mx-auto px-6">
          {/* Footer Logo: Consistent with Header */}
          <div className="inline-flex items-center justify-center gap-0 mb-4 opacity-50 hover:opacity-100 transition-opacity group">
             {/* Logo Mark Wrapper */}
             <div className="relative flex items-center justify-center w-[72px] h-[72px]">
                {/* Gear Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                     className="absolute w-[72px] h-[72px] text-orange-500 animate-[spin_20s_linear_infinite] z-0">
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
                <div className="relative z-30 h-8 w-8 bg-orange-500 rounded-sm flex items-center justify-center font-black text-slate-900 text-2xl leading-none shadow-lg">T</div>
             </div>
             
             {/* Text ekK Box */}
             <div className="relative z-20 h-6 px-1 bg-slate-900 border border-slate-800 rounded-sm flex items-center justify-center -ml-[25px] shadow-lg translate-y-1">
                <span className="text-lg font-bold text-slate-400 tracking-tight leading-none">ek<span className="text-slate-600">K</span></span>
             </div>
          </div>
          <div className="flex flex-col gap-1 text-slate-600 text-xs uppercase tracking-wider">
            <p>&copy; 2026 TekK</p>
            <p className="font-bold text-slate-700">CVR: 46022432</p>
          </div>
          
          {/* Mobile Login Link (Visible only on mobile) */}
          <div className="md:hidden mt-8 pt-6 border-t border-slate-900">
             <Link 
               href="/login" 
               className="text-slate-700 hover:text-orange-500 text-[10px] font-bold uppercase tracking-widest transition-colors">
               Admin Log ind
             </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
