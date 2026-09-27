import { useEffect, useRef, useState } from 'react';
import InsertRender from './insert-render';
import { productByCode, type Product } from '../../../shared/catalog';
import { useReducedMotion } from '../lib/useReducedMotion';

/*
 * Background compositions for inner-page heroes. Each is built only from
 * validated material: illustrations drawn from listed codes' ISO designations,
 * or a dimensioned drawing whose values follow ISO 1832. The insert
 * compositions are still; the drawing animates slowly and stops off screen
 * and for reduced motion. All are decorative, inside PageHero's aria-hidden
 * container.
 */

const pick = (codes: string[]) => codes.map((c) => productByCode(c)).filter((p): p is Product => Boolean(p));

/** Large macro crops of listed inserts at the hero's edges, like samples on a bench. */
export function InsertMacroBackdrop({ codes }: { codes: string[] }) {
  const [a, b, c, d] = pick(codes);
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,var(--surface-stage)_0%,var(--surface-subtle)_100%)]">
      {a && (
        <InsertRender code={a.code} family={a.family} category={a.category} className="absolute -left-[12%] top-1/2 w-[62%] max-w-[620px] -translate-y-1/2 sm:-left-[8%] sm:w-[44%] lg:w-[38%]" />
      )}
      {b && (
        <InsertRender code={b.code} family={b.family} category={b.category} className="absolute -right-[12%] top-[58%] w-[58%] max-w-[580px] -translate-y-1/2 sm:-right-[7%] sm:w-[40%] lg:w-[34%]" />
      )}
      {c && (
        <InsertRender code={c.code} family={c.family} category={c.category} className="absolute left-[24%] top-[-6%] hidden w-[13%] max-w-[190px] opacity-80 lg:block" />
      )}
      {d && (
        <InsertRender code={d.code} family={d.family} category={d.category} className="absolute bottom-[-8%] right-[25%] hidden w-[12%] max-w-[170px] opacity-80 lg:block" />
      )}
    </div>
  );
}

/** Five listed inserts, one per operation, resting along the bottom edge. */
export function SampleRowBackdrop({ codes }: { codes: string[] }) {
  const items = pick(codes);
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,var(--surface)_0%,var(--surface-subtle)_100%)]">
      <div className="absolute inset-x-0 bottom-0 flex translate-y-[34%] items-end justify-between gap-2 px-[2%]">
        {items.map((p, i) => (
          <InsertRender
            key={p.code}
            code={p.code}
            family={p.family}
            category={p.category}
            className={`w-[19%] max-w-[280px] ${i === 1 || i === 3 ? 'hidden sm:block' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

const DIM = 'stroke-ink-muted';
const LINE = 'stroke-ink';
const ACCENT = 'stroke-accent-ink';

/*
 * CNMG120408, drawn to scale at 14 px/mm: 80° rhombus, inscribed circle
 * 12.70 mm (edge 12.9 mm × sin 80°), thickness 4.76 mm, corner radius 0.8 mm.
 * Top view anchored left, side view anchored right; the centre stays clear.
 *
 * Motion: the outline traces in, dimensions extend and labels settle once;
 * then slow loops (14–18 s) — the inscribed-circle guide crawls, the side view
 * drifts a few pixels, the scale markers slide into alignment and the guide
 * lines shift. Paused off screen; static for reduced motion.
 */
export function DrawingBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.02 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Half-diagonals of an 80° rhombus with 180.6 px edges.
  const hx = 138.3;
  const hy = 116.1;
  const cx = 250;
  const cy = 290;
  return (
    <div
      ref={ref}
      className="dwg absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,var(--surface)_0%,var(--surface-subtle)_100%)]"
      data-running={visible && !reduced}
      data-static={reduced}
    >
      {/* Guide lines across the sheet, shifting by a few pixels */}
      <svg className="dwg-guides absolute inset-[-8px] h-[calc(100%+16px)] w-[calc(100%+16px)]" viewBox="0 0 1440 600" preserveAspectRatio="none" fill="none">
        {[150, 300, 450].map((y) => (
          <path key={y} d={`M0 ${y}H1440`} className="stroke-rule" strokeWidth="1" strokeDasharray="2 10" />
        ))}
        {[360, 1080].map((x) => (
          <path key={x} d={`M${x} 0V600`} className="stroke-rule" strokeWidth="1" strokeDasharray="2 10" />
        ))}
      </svg>

      <svg viewBox="0 0 520 580" className="dwg-float absolute -left-[22%] top-1/2 h-[118%] -translate-y-1/2 sm:-left-[10%] lg:-left-[2%]" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={`M${cx - 190} ${cy}H${cx + 190}M${cx} ${cy - 160}V${cy + 160}`} className={DIM} strokeWidth="1" strokeDasharray="14 5 2 5" />
        <path d={`M${cx - hx} ${cy}L${cx} ${cy - hy}L${cx + hx} ${cy}L${cx} ${cy + hy}Z`} className="dwg-face fill-surface-card" />
        <path d={`M${cx - hx} ${cy}L${cx} ${cy - hy}L${cx + hx} ${cy}L${cx} ${cy + hy}Z`} pathLength={1} className={`dwg-trace ${LINE}`} strokeWidth="2" />
        <circle cx={cx} cy={cy} r="88.9" className={`dwg-crawl ${DIM}`} strokeWidth="1.2" strokeDasharray="6 5" />
        <circle cx={cx} cy={cy} r="36" pathLength={1} className={`dwg-trace dwg-d1 ${LINE}`} strokeWidth="1.6" />
        <path d={`M${cx - hx + 46} ${cy - 38.6}A60 60 0 0 1 ${cx - hx + 46} ${cy + 38.6}`} pathLength={1} className={`dwg-trace dwg-d2 ${ACCENT}`} strokeWidth="1.5" />
        <text x={cx - hx + 70} y={cy + 5} className="dwg-label dwg-d2 fill-accent-ink font-mono" fontSize="15">80°</text>
        <path d={`M${cx - 88.9} ${cy + 20}V${cy + 186}M${cx + 88.9} ${cy + 20}V${cy + 186}`} className={`dwg-label ${DIM}`} strokeWidth="1" />
        <path d={`M${cx - 88.9} ${cy + 176}H${cx + 88.9}M${cx - 88.9} ${cy + 170}V${cy + 182}M${cx + 88.9} ${cy + 170}V${cy + 182}`} className={`dwg-extend ${DIM}`} strokeWidth="1.2" />
        <text x={cx} y={cy + 206} textAnchor="middle" className="dwg-label dwg-d3 fill-ink-muted font-mono" fontSize="15">IC 12.70</text>
        <path d={`M${cx + hx - 4} ${cy}L${cx + hx + 36} ${cy - 60}H${cx + hx + 90}`} pathLength={1} className={`dwg-trace dwg-d3 ${ACCENT}`} strokeWidth="1.3" />
        <text x={cx + hx + 40} y={cy - 68} className="dwg-label dwg-d3 fill-accent-ink font-mono" fontSize="15">R 0.8</text>
      </svg>

      <svg viewBox="0 0 520 580" className="absolute -right-[4%] top-1/2 hidden h-[118%] -translate-y-1/2 md:block lg:right-[0%]" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g className="dwg-drift">
          {/* side view: 276.7 px long, 4.76 mm = 66.6 px thick */}
          <path d="M100 256H376.7V322.6H100Z" className="dwg-face fill-surface-card" />
          <path d="M100 256H376.7V322.6H100Z" pathLength={1} className={`dwg-trace dwg-d1 ${LINE}`} strokeWidth="2" />
          <path d="M100 289.3H376.7" className={DIM} strokeWidth="1" strokeDasharray="14 5 2 5" />
          <path d="M202 256V322.6M274.7 256V322.6" className={`dwg-label ${DIM}`} strokeWidth="1" strokeDasharray="4 4" />
          <path d="M388 256H430M388 322.6H430" className={`dwg-label ${DIM}`} strokeWidth="1" />
          <path d="M420 256V322.6M414 256H426M414 322.6H426" className={`dwg-extend-y ${DIM}`} strokeWidth="1.2" />
          <text x="436" y="294" className="dwg-label dwg-d2 fill-ink-muted font-mono" fontSize="15">S 4.76</text>
        </g>
        {/* measurement scale: markers slide into alignment with the part */}
        <path d="M100 360H376.7" className={DIM} strokeWidth="1" />
        <g className="dwg-markers">
          {Array.from({ length: 11 }, (_, i) => (
            <path key={i} d={`M${100 + i * 27.67} 360V${i % 5 === 0 ? 372 : 367}`} className={DIM} strokeWidth="1" />
          ))}
          <path d="M376.7 350l-5 -8h10z" className="fill-accent-ink" />
        </g>
        <path d="M100 420H440M100 470H440M100 420V470M300 420V470M440 420V470" className={`dwg-label ${DIM}`} strokeWidth="1" />
        <text x="114" y="450" className="dwg-label dwg-d3 fill-ink font-mono" fontSize="15">CNMG 120408</text>
        <text x="314" y="450" className="dwg-label dwg-d3 fill-ink-muted font-mono" fontSize="13">ISO 1832 · mm</text>
      </svg>
    </div>
  );
}
