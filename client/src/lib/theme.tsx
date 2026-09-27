import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

/**
 * Site-wide light/dark theme.
 *
 * Light is the default. A visitor's choice is saved in localStorage and
 * restored on every route and visit. The inline script in index.html applies
 * the saved theme to <html data-theme> before the stylesheet paints, so there
 * is no flash; this provider takes over from there. All colour comes from the
 * semantic tokens in index.css — nothing is inverted.
 */

export type Theme = 'light' | 'dark';

/** Keep in step with the inline script in client/index.html. */
export const THEME_STORAGE_KEY = 'sreeraj.theme';
const THEME_COLOR: Record<Theme, string> = { light: '#f7f4ed', dark: '#1a1620' };

function readTheme(): Theme {
  if (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark') return 'dark';
  return 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.head.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
}

interface ThemeApi {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
}

const Ctx = createContext<ThemeApi | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readTheme);

  const setTheme = useCallback((next: Theme) => {
    const root = document.documentElement;
    // A short colour transition for a deliberate switch; skipped for reduced motion.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('theme-switching');
      window.setTimeout(() => root.classList.remove('theme-switching'), 260);
    }
    applyTheme(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — the theme still applies for this visit */
    }
    setThemeState(next);
  }, []);

  // Another tab changed the theme.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_STORAGE_KEY) return;
      const next: Theme = e.newValue === 'dark' ? 'dark' : 'light';
      applyTheme(next);
      setThemeState(next);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme]);
  const value = useMemo(() => ({ theme, setTheme, toggle }), [theme, setTheme, toggle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme(): ThemeApi {
  const value = useContext(Ctx);
  if (!value) throw new Error('useTheme must be used inside <ThemeProvider>');
  return value;
}
