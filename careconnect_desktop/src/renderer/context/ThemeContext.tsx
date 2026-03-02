import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'careconnect-theme';
const HIGH_CONTRAST_KEY = 'careconnect-high-contrast';

export type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    /* ignore */
  }
  return 'light';
}

function readStoredHighContrast(): boolean {
  try {
    const stored = localStorage.getItem(HIGH_CONTRAST_KEY);
    if (stored === 'true') return true;
    if (stored === 'false') return false;
  } catch {
    /* ignore */
  }
  return false;
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('aria-label', `Color theme: ${theme}`);
}

function applyHighContrast(highContrast: boolean) {
  document.documentElement.setAttribute('data-high-contrast', highContrast ? 'true' : 'false');
}

// Apply stored theme and high contrast on load to avoid flash (browser only)
if (typeof document !== 'undefined') {
  applyTheme(readStoredTheme());
  applyHighContrast(readStoredHighContrast());
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);
  const [highContrast, setHighContrastState] = useState<boolean>(readStoredHighContrast);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyHighContrast(highContrast);
  }, [highContrast]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const setHighContrast = (value: boolean) => {
    setHighContrastState(value);
    try {
      localStorage.setItem(HIGH_CONTRAST_KEY, String(value));
    } catch {
      /* ignore */
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        isDark: theme === 'dark',
        highContrast,
        setHighContrast,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
