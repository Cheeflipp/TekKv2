"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { verifyPassword } from '../actions/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check session storage on mount
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('tekk_auth_session');
        if (stored === 'true') {
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.warn('SessionStorage access denied', e);
      }
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    const isValid = await verifyPassword(password);
    if (isValid) {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('tekk_auth_session', 'true');
        } catch (e) {
          console.warn('SessionStorage write failed', e);
        }
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem('tekk_auth_session');
      } catch (e) {
        console.warn('SessionStorage remove failed', e);
      }
    }
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
