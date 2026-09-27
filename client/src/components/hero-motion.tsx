import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import InsertRender from './insert-render';
import { productByCode, type Product } from '../../../shared/catalog';
import { useReducedMotion } from '../lib/useReducedMotion';

/*
 * Original hero animation, built only from owned material: illustrations of
 * listed inserts drawn from their ISO designations, a faint machined-surface
 * texture, and a stepped turning profile traced like a toolpath. Loops of
 * 15–18 s, transform and opacity only.
 *
 * Pauses off screen and on request; reduced-motion visitors get the still
 * composition. Decorative — the hero copy carries the message.
 */

const CODES = ['WNMG080408-MA', 'DNMG150608-MA', 'SPMG090408-DG', '3PKT150508-M', 'MGMN300-M'];
const items = CODES.map((c) => productByCode(c)).filter((p): p is Product => Boolean(p));

const PLACEMENT = [
  'hm-drift-a left-[-14%] top-[16%] w-[46%] sm:left-[-12%] sm:w-[31%] lg:w-[27%]',
  'hm-drift-b right-[-13%] top-[34%] w-[44%] sm:right-[-10%] sm:w-[29%] lg:w-[25%]',
  'hm-drift-b hidden left-[21%] top-[5%] w-[8%] opacity-60 lg:block',
  'hm-drift-a hidden right-[19%] top-[9%] w-[7%] opacity-60 lg:block',
  'hm-drift-a hm-delay hidden bottom-[13%] left-[13%] w-[9%] opacity-50 md:block',
];

export default function HeroMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  // Stop the loops while the hero is off screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.02 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = visible && !paused && !reduced;

  return (
    <>
      <div ref={ref} className="hm" data-running={running} aria-hidden="true">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 860" preserveAspectRatio="xMidYMid slice" fill="none">
          {/* Machined-surface texture: face-milling marks, drifting a few degrees. */}
          <g className="hm-swirl" strokeWidth="1">
            {Array.from({ length: 16 }, (_, i) => (
              <circle key={i} cx="220" cy="980" r={180 + i * 34} className="stroke-rule-strong" opacity={0.55 - i * 0.025} />
            ))}
          </g>
          <g className="hm-swirl hm-swirl-rev" strokeWidth="1">
            {Array.from({ length: 12 }, (_, i) => (
              <circle key={i} cx="1300" cy="-120" r={160 + i * 36} className="stroke-rule-strong" opacity={0.5 - i * 0.03} />
            ))}
          </g>
          {/* A stepped shaft profile, traced like a turning toolpath. */}
          <path
            className="hm-path stroke-accent-ink"
            pathLength={1}
            strokeWidth="1.6"
            strokeLinejoin="round"
            d="M-20 640 H250 V604 H470 Q492 604 492 582 V560 H930 Q952 560 952 582 V598 H1180 V626 H1460"
          />
          <path className="stroke-rule" strokeWidth="1" strokeDasharray="14 6 3 6" d="M-20 700 H1460" />
        </svg>

        {items.map((p, i) => (
          <InsertRender key={p.code} code={p.code} family={p.family} category={p.category} className={`absolute ${PLACEMENT[i]}`} />
        ))}
      </div>

      {!reduced && (
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="shell flex justify-end pb-5">
            <button
              type="button"
              onClick={() => setPaused((v) => !v)}
              className="hero-control"
              aria-label={paused ? 'Play background animation' : 'Pause background animation'}
            >
              {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
              <span aria-hidden="true">{paused ? 'Play' : 'Pause'}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
