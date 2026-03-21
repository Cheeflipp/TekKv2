"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/auth-context';
import Link from 'next/link';
import { cn } from '../lib/utils';
import { useTheme } from '../lib/theme-context';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();

  const attemptLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = await login();
    if (result.success) {
      router.push('/admin/dashboard');
    } else {
      setError(result.error || "Login fejlede. Du har muligvis ikke adgang.");
    }
  };

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-6 transition-colors duration-300",
      theme === 'classic' ? "bg-slate-50" : "bg-slate-900"
    )}>
      <div className={cn(
        "p-8 rounded-sm shadow-2xl border w-full max-w-md",
        theme === 'classic' ? "bg-white border-slate-200" : "bg-slate-800 border-slate-700"
      )}>
        
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
             <div className="relative flex items-center justify-center w-[72px] h-[72px]">
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
               <div className={cn(
                 "relative z-30 h-8 w-8 rounded-sm flex items-center justify-center font-black text-2xl leading-none shadow-lg",
                 theme === 'classic' ? "bg-[#c29b62] text-white" : "bg-orange-500 text-slate-900"
               )}>T</div>
             </div>
          </div>
          <h2 className={cn("text-2xl font-bold", theme === 'classic' ? "text-slate-900" : "text-white")}>Admin Login</h2>
          <p className={cn("text-sm", theme === 'classic' ? "text-slate-600" : "text-slate-400")}>Log ind med din Google konto</p>
        </div>

        <form onSubmit={attemptLogin} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded text-sm text-center font-bold animate-in fade-in">
              {error}
            </div>
          )}

          <button 
            type="submit"
            className={cn(
              "w-full font-bold uppercase tracking-widest py-4 rounded-sm transition-colors shadow-lg",
              theme === 'classic' ? "bg-[#c29b62] hover:bg-[#a88655] text-white shadow-[#c29b62]/30" : "bg-orange-600 hover:bg-orange-500 text-white shadow-orange-900/50"
            )}>
            Log Ind Med Google
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className={cn(
            "text-xs font-bold uppercase tracking-widest transition-colors",
            theme === 'classic' ? "text-slate-500 hover:text-slate-900" : "text-slate-500 hover:text-white"
          )}>
            &larr; Tilbage til forsiden
          </Link>
        </div>
      </div>
    </div>
  );
}
