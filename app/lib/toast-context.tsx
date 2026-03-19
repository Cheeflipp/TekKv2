"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { cn } from './utils';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
  confirm: (message: string) => Promise<boolean>;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<{ message: string, resolve: (val: boolean) => void } | null>(null);

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const confirm = useCallback((message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmDialog({ message, resolve });
    });
  }, []);

  const handleConfirm = (result: boolean) => {
    if (confirmDialog) {
      confirmDialog.resolve(result);
      setConfirmDialog(null);
    }
  };

  return (
    <ToastContext.Provider value={{ toast, confirm }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(t => (
          <div 
            key={t.id} 
            className={cn(
              "px-4 py-3 rounded shadow-lg text-white font-medium text-sm animate-in slide-in-from-bottom-2",
              t.type === 'success' ? "bg-green-600" : 
              t.type === 'error' ? "bg-red-600" : "bg-slate-800"
            )}
          >
            {t.message}
          </div>
        ))}
      </div>

      {/* Confirm Dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-sm shadow-2xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-white mb-4">Bekræft handling</h3>
            <p className="text-slate-300 mb-6">{confirmDialog.message}</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => handleConfirm(false)}
                className="px-4 py-2 rounded-sm bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold transition-colors"
              >
                Annuller
              </button>
              <button 
                onClick={() => handleConfirm(true)}
                className="px-4 py-2 rounded-sm bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold transition-colors"
              >
                Bekræft
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
