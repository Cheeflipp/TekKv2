"use client";

import React, { useEffect } from 'react';
import { useAuth } from '../lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <div className="h-screen bg-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 flex-none z-30">
        <div className="px-6 py-4 flex justify-between items-center">
          
          {/* Logo Section */}
          <Link href="/admin/dashboard" className="flex items-center gap-0 group cursor-pointer" aria-label="TekK Admin Dashboard">
            {/* Logo Mark Wrapper */}
            <div className="relative flex items-center justify-center w-[48px] h-[48px]">
              {/* Gear Icon (Orange) */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                   className="absolute w-[48px] h-[48px] text-orange-500 animate-[spin_60s_linear_infinite] z-0 opacity-100">
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
              <div className="relative z-30 h-6 w-6 bg-orange-500 rounded-sm flex items-center justify-center font-black text-white text-lg leading-none shadow-md">T</div>
            </div>

            {/* Text ekK Box */}
            <div className="relative z-20 h-5 px-1 bg-white border border-slate-200 rounded-sm flex items-center justify-center -ml-[18px] shadow-sm translate-y-1">
              <span className="text-sm font-bold text-slate-800 tracking-tight leading-none">ek<span className="text-orange-500">K</span></span>
            </div>
            
            <div className="ml-3 border-l border-slate-200 pl-3 flex flex-col justify-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Admin</span>
            </div>
          </Link>
          
          <button 
            onClick={logout}
            className="group bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-sm border border-slate-200 transition-all duration-200 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <span>Log ud</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex-grow overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
