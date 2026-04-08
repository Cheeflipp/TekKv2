"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'modern' | 'classic';
type BgVersion = 1 | 2 | 3 | 4 | 5;
type BgIntensity = 1 | 2 | 3 | 4 | 5;

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  bgVersion: BgVersion;
  setBgVersion: (version: BgVersion) => void;
  bgIntensity: BgIntensity;
  setBgIntensity: (intensity: BgIntensity) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('classic');
  const [bgVersion, setBgVersionState] = useState<BgVersion>(1);
  const [bgIntensity, setBgIntensityState] = useState<BgIntensity>(1);

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('tekk-theme') as Theme;
    if (savedTheme && (savedTheme === 'modern' || savedTheme === 'classic')) {
      setThemeState(savedTheme);
    }
    const savedBg = localStorage.getItem('tekk-bg-version');
    if (savedBg) {
      const parsed = parseInt(savedBg, 10);
      if (parsed >= 1 && parsed <= 5) {
        setBgVersionState(parsed as BgVersion);
      }
    }
    const savedIntensity = localStorage.getItem('tekk-bg-intensity');
    if (savedIntensity) {
      const parsed = parseInt(savedIntensity, 10);
      if (parsed >= 1 && parsed <= 5) {
        setBgIntensityState(parsed as BgIntensity);
      }
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('tekk-theme', newTheme);
  };

  const setBgVersion = (version: BgVersion) => {
    setBgVersionState(version);
    localStorage.setItem('tekk-bg-version', version.toString());
  };

  const setBgIntensity = (intensity: BgIntensity) => {
    setBgIntensityState(intensity);
    localStorage.setItem('tekk-bg-intensity', intensity.toString());
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, bgVersion, setBgVersion, bgIntensity, setBgIntensity }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
