import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/theme';

/**
 * Header control for dark mode. A toggle button: the label stays "Dark mode"
 * and aria-pressed carries the state. The icon shows the current theme.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  return (
    <button type="button" onClick={toggle} aria-pressed={dark} aria-label="Dark mode" className={`icon-btn ${className}`}>
      {dark ? <Moon className="h-[18px] w-[18px]" aria-hidden="true" /> : <Sun className="h-[18px] w-[18px]" aria-hidden="true" />}
      <span className="tip-label" aria-hidden="true">
        {dark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
}
