"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/auth-context';
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="bg-slate-800 p-8 rounded-sm shadow-2xl border border-slate-700 w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
             <div className="relative flex items-center justify-center w-[72px] h-[72px]">
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
               <div className="relative z-30 h-8 w-8 bg-orange-500 rounded-sm flex items-center justify-center font-black text-slate-900 text-2xl leading-none shadow-lg">T</div>
             </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Login</h2>
          <p className="text-slate-400 text-sm">Log ind med din Google konto</p>
        </div>

        <form onSubmit={attemptLogin} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded text-sm text-center font-bold animate-in fade-in">
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-widest py-4 rounded-sm transition-colors shadow-lg shadow-orange-900/50">
            Log Ind Med Google
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
            &larr; Tilbage til forsiden
          </Link>
        </div>
      </div>
    </div>
  );
}
