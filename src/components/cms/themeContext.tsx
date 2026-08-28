import React, { createContext, useContext, useState, useEffect } from 'react';

export type CmsThemeKey = 
  | 'directus-obsidian'
  | 'gfc-royal'
  | 'emerald-sanctuary'
  | 'velvet-night'
  | 'carbon-midnight'
  | 'studio-snow'
  | 'amber-dawn';

export type CmsAccentColor = 
  | 'purple'
  | 'gold'
  | 'emerald'
  | 'indigo'
  | 'rose'
  | 'sky'
  | 'amber';

export interface ThemeConfig {
  id: CmsThemeKey;
  name: string;
  category: 'dark' | 'light';
  bgPrimary: string;
  bgSecondary: string;
  bgDock: string;
  bgCard: string;
  borderPrimary: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentHover: string;
  accentGlow: string;
  previewGradient: string;
}

export const CMS_THEMES: Record<CmsThemeKey, ThemeConfig> = {
  'directus-obsidian': {
    id: 'directus-obsidian',
    name: 'Directus Obsidian (Signature)',
    category: 'dark',
    bgPrimary: '#0a0a0f',
    bgSecondary: '#0e0e16',
    bgDock: '#07070b',
    bgCard: '#13131e',
    borderPrimary: '#1f1f2e',
    textPrimary: '#f8fafc',
    textSecondary: '#94a3b8',
    accent: '#7c3aed',
    accentHover: '#6d28d9',
    accentGlow: 'rgba(124, 58, 237, 0.35)',
    previewGradient: 'from-[#07070b] via-[#13131e] to-[#7c3aed]'
  },
  'gfc-royal': {
    id: 'gfc-royal',
    name: 'GFC Royal Navy & Gold',
    category: 'dark',
    bgPrimary: '#080d1a',
    bgSecondary: '#0d1527',
    bgDock: '#050811',
    bgCard: '#111c33',
    borderPrimary: '#1c2b4d',
    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    accent: '#D4AF37',
    accentHover: '#b89628',
    accentGlow: 'rgba(212, 175, 55, 0.35)',
    previewGradient: 'from-[#050811] via-[#111c33] to-[#D4AF37]'
  },
  'emerald-sanctuary': {
    id: 'emerald-sanctuary',
    name: 'Emerald Sanctuary',
    category: 'dark',
    bgPrimary: '#04130d',
    bgSecondary: '#081c14',
    bgDock: '#020b07',
    bgCard: '#0d281d',
    borderPrimary: '#143d2c',
    textPrimary: '#ecfdf5',
    textSecondary: '#a7f3d0',
    accent: '#10b981',
    accentHover: '#059669',
    accentGlow: 'rgba(16, 185, 129, 0.35)',
    previewGradient: 'from-[#020b07] via-[#0d281d] to-[#10b981]'
  },
  'velvet-night': {
    id: 'velvet-night',
    name: 'Velvet Midnight',
    category: 'dark',
    bgPrimary: '#12081c',
    bgSecondary: '#190d26',
    bgDock: '#0c0513',
    bgCard: '#241336',
    borderPrimary: '#371c52',
    textPrimary: '#faf5ff',
    textSecondary: '#d8b4fe',
    accent: '#a855f7',
    accentHover: '#9333ea',
    accentGlow: 'rgba(168, 85, 247, 0.35)',
    previewGradient: 'from-[#0c0513] via-[#241336] to-[#a855f7]'
  },
  'carbon-midnight': {
    id: 'carbon-midnight',
    name: 'OLED Carbon Black',
    category: 'dark',
    bgPrimary: '#000000',
    bgSecondary: '#0a0a0a',
    bgDock: '#030303',
    bgCard: '#121212',
    borderPrimary: '#222222',
    textPrimary: '#ffffff',
    textSecondary: '#888888',
    accent: '#38bdf8',
    accentHover: '#0284c7',
    accentGlow: 'rgba(56, 189, 248, 0.35)',
    previewGradient: 'from-[#000000] via-[#121212] to-[#38bdf8]'
  },
  'studio-snow': {
    id: 'studio-snow',
    name: 'Directus Snow Light',
    category: 'light',
    bgPrimary: '#f8fafc',
    bgSecondary: '#f1f5f9',
    bgDock: '#e2e8f0',
    bgCard: '#ffffff',
    borderPrimary: '#cbd5e1',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    accent: '#6d28d9',
    accentHover: '#5b21b6',
    accentGlow: 'rgba(109, 40, 217, 0.25)',
    previewGradient: 'from-[#e2e8f0] via-[#ffffff] to-[#6d28d9]'
  },
  'amber-dawn': {
    id: 'amber-dawn',
    name: 'Amber Dawn Church',
    category: 'dark',
    bgPrimary: '#1a1005',
    bgSecondary: '#241708',
    bgDock: '#120a02',
    bgCard: '#33200b',
    borderPrimary: '#4d3011',
    textPrimary: '#fffbeb',
    textSecondary: '#fde68a',
    accent: '#f59e0b',
    accentHover: '#d97706',
    accentGlow: 'rgba(245, 158, 11, 0.35)',
    previewGradient: 'from-[#120a02] via-[#33200b] to-[#f59e0b]'
  }
};

interface CmsThemeContextType {
  theme: CmsThemeKey;
  setTheme: (t: CmsThemeKey) => void;
  accent: CmsAccentColor;
  setAccent: (a: CmsAccentColor) => void;
  currentThemeConfig: ThemeConfig;
  borderRadius: 'rounded-lg' | 'rounded-xl' | 'rounded-2xl';
  setBorderRadius: (r: 'rounded-lg' | 'rounded-xl' | 'rounded-2xl') => void;
}

const CmsThemeContext = createContext<CmsThemeContextType | undefined>(undefined);

export const CmsThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<CmsThemeKey>(() => {
    const saved = localStorage.getItem('gospelfc_cms_theme');
    return (saved as CmsThemeKey) || 'directus-obsidian';
  });

  const [accent, setAccentState] = useState<CmsAccentColor>(() => {
    const saved = localStorage.getItem('gospelfc_cms_accent');
    return (saved as CmsAccentColor) || 'purple';
  });

  const [borderRadius, setBorderRadiusState] = useState<'rounded-lg' | 'rounded-xl' | 'rounded-2xl'>(() => {
    const saved = localStorage.getItem('gospelfc_cms_radius');
    return (saved as any) || 'rounded-2xl';
  });

  const setTheme = (t: CmsThemeKey) => {
    setThemeState(t);
    localStorage.setItem('gospelfc_cms_theme', t);
  };

  const setAccent = (a: CmsAccentColor) => {
    setAccentState(a);
    localStorage.setItem('gospelfc_cms_accent', a);
  };

  const setBorderRadius = (r: 'rounded-lg' | 'rounded-xl' | 'rounded-2xl') => {
    setBorderRadiusState(r);
    localStorage.setItem('gospelfc_cms_radius', r);
  };

  const currentThemeConfig = CMS_THEMES[theme] || CMS_THEMES['directus-obsidian'];

  return (
    <CmsThemeContext.Provider
      value={{
        theme,
        setTheme,
        accent,
        setAccent,
        currentThemeConfig,
        borderRadius,
        setBorderRadius
      }}
    >
      {children}
    </CmsThemeContext.Provider>
  );
};

export const useCmsTheme = () => {
  const context = useContext(CmsThemeContext);
  if (!context) {
    throw new Error('useCmsTheme must be used within a CmsThemeProvider');
  }
  return context;
};