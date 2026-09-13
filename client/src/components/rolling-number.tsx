import { useEffect, useRef, useState } from 'react';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Odometer-style counter. Each digit is a vertical strip that slides to its
 * final value, with the rightmost digit settling last — so the number reads as
 * mechanically counting into place rather than fading in.
 */
export default function RollingNumber({
  value,
  className = '',
  duration = 1100,
}: {
  value: number;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [rolled, setRolled] = useState(false);
  const digits = String(value).split('');

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setRolled(true);
      return;
    }

    // A short timeout (rather than an animation frame) lets the strips paint at 0
    // first, and still fires in tabs where animation frames are paused.
    const start = () => window.setTimeout(() => setRolled(true), 40);

    // Visible on load (the hero rail) — roll straight away rather than
    // sitting on zeros until the visitor scrolls.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      window.setTimeout(start, 260);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`inline-flex tabnum leading-none ${className}`}
      role="text"
      aria-label={String(value)}
    >
      {digits.map((d, i) => {
        const target = Number(d);
        // Rightmost digit finishes last.
        const delay = i * 90;
        return (
          <span
            key={i}
            aria-hidden="true"
            className="relative inline-block overflow-hidden"
            style={{ height: '1em', width: '0.62em' }}
          >
            <span
              className="absolute inset-x-0 top-0 flex flex-col"
              style={{
                // Each slot is exactly 1em tall, so the offset is in em —
                // a percentage here would resolve against the whole 10-digit strip.
                transform: `translateY(-${rolled ? target : 0}em)`,
                transition: `transform ${duration}ms cubic-bezier(.16,1,.3,1)`,
                transitionDelay: `${delay}ms`,
              }}
            >
              {DIGITS.map((n) => (
                <span key={n} className="flex items-center justify-center" style={{ height: '1em' }}>
                  {n}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
