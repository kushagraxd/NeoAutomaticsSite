import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, ScanLine } from 'lucide-react';
import InsertRender from '../insert-render';
import Reveal from '../reveal';
import FamilyMarquee, { familyCount } from './family-marquee';
import { decodeInsert, SEGMENT_COLOURS, type SegmentKey } from '../../lib/iso-decoder';
import { productByCode, searchProducts, categoryById } from '../../../../shared/catalog';

const SAMPLES = [
  'TNMG160408-MA', 'CNMG120408-MA', 'WNMG080408-MA', 'VNMG160404-MA',
  'DNMG150608-MA', 'CCMT09T304-MK', 'SPMG090408-DG', 'RDMW1604M0',
];

const SHAPE_FROM_LETTER: Record<string, string> = {
  T: 'Triangular', C: 'Rhombic 80°', D: 'Rhombic 55°', V: 'Rhombic 35°', W: 'Trigon 80°',
  S: 'Square', R: 'Round', L: 'Rectangular', K: 'Parallelogram 55°',
};

export default function InsertExplorer() {
  const [code, setCode] = useState('TNMG160408-MA');
  const [active, setActive] = useState<SegmentKey | null>(null);

  const segments = useMemo(() => decodeInsert(code), [code]);
  const clean = code.trim().toUpperCase();
  const match = productByCode(clean) ?? (clean.length >= 6 ? searchProducts(clean, 1)[0] : undefined);
  const href = match
    ? `/products/${categoryById(match.category)?.slug}/${encodeURIComponent(match.code)}`
    : `/products?q=${encodeURIComponent(clean)}`;

  return (
    <section className="relative overflow-hidden bg-surface py-24 md:py-32">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-6">Insert explorer</p>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Read any insert code <span className="accent-word text-accent-ink">like a spec sheet</span>
            </h2>
            <p className="max-w-sm text-[16px] leading-relaxed text-ink-muted">
              Every character in an ISO 1832 designation means something. Type a code, or pick one we handle, and see it decoded.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 grid overflow-hidden rounded-2xl border border-rule bg-white shadow-glow lg:grid-cols-[.9fr_1.1fr]">
            {/* Input side */}
            <div className="border-b border-rule p-7 md:p-10 lg:border-b-0 lg:border-r">
              <label htmlFor="iso-code" className="label text-ink-muted">Insert code</label>
              <div className="relative mt-3">
                <ScanLine className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
                <input
                  id="iso-code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                  className="w-full rounded-xl border border-rule-strong bg-surface-subtle py-4 pl-12 pr-4 font-mono text-[20px] font-medium uppercase tracking-tight text-ink transition-colors focus:border-ink focus:bg-white focus:outline-none focus:ring-4 focus:ring-[rgba(9,9,11,0.06)]"
                />
              </div>

              <p className="label mt-7 text-ink-muted">Try a code we handle</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {SAMPLES.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => setCode(s)}
                      className={`rounded-lg border px-3 py-1.5 font-mono text-[13px] transition-all ${
                        clean === s ? 'border-ink bg-ink text-white' : 'border-rule bg-white text-ink-soft hover:border-ink hover:text-ink'
                      }`}
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex items-center gap-5 rounded-xl bg-surface-subtle p-5">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs">
                  <InsertRender code={clean || 'CNMG120408'} category={match?.category ?? 'turning'} className="h-20 w-auto" />
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] text-ink-muted">{match ? 'In our catalogue' : 'Not a listed code'}</p>
                  <p className="truncate font-mono text-[16px] font-semibold text-ink">{match?.code ?? (clean || '—')}</p>
                  <Link href={href} className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent-ink hover:gap-2.5 transition-all">
                    {match ? 'View this insert' : 'Ask about availability'} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Decoded side */}
            <div className="bg-night p-7 text-night-ink md:p-10" aria-live="polite">
              {segments ? (
                <>
                  <p className="flex flex-wrap font-mono text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold tracking-tight" aria-label={clean}>
                    {segments.map((s) => (
                      <span
                        key={s.key}
                        className="rounded-md px-0.5 transition-all duration-200"
                        style={{
                          color: SEGMENT_COLOURS[s.key],
                          background: active === s.key ? `${SEGMENT_COLOURS[s.key]}26` : 'transparent',
                          opacity: active && active !== s.key ? 0.35 : 1,
                        }}
                      >
                        {s.chars}
                      </span>
                    ))}
                  </p>

                  <ol className="mt-8 divide-y divide-white/[.07]">
                    {segments.map((s, i) => (
                      <li
                        key={s.key}
                        onMouseEnter={() => setActive(s.key)}
                        onMouseLeave={() => setActive(null)}
                        className="grid cursor-default grid-cols-[3.75rem_1fr] items-center gap-3 py-3 transition-colors hover:bg-white/[.03] sm:grid-cols-[2.25rem_4.5rem_1fr]"
                      >
                        <span className="hidden font-mono text-[11px] text-night-muted sm:block">{String(i + 1).padStart(2, '0')}</span>
                        <span
                          className="justify-self-start rounded-md px-2 py-1 font-mono text-[14px] font-semibold"
                          style={{ color: SEGMENT_COLOURS[s.key], background: `${SEGMENT_COLOURS[s.key]}1a` }}
                        >
                          {s.chars}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[12px] uppercase tracking-[0.08em] text-night-muted">{s.label}</span>
                          <span className="block text-[14.5px] text-night-ink">{s.meaning}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </>
              ) : (
                <div className="flex h-full flex-col justify-center py-10">
                  <p className="font-mono text-[28px] font-semibold text-night-muted">{clean || 'Type a code'}</p>
                  <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-night-muted">
                    {clean
                      ? 'This isn’t a standard ISO 1832 turning designation. Milling, threading and grooving codes such as APMT, 16ER or MGMN follow manufacturer schemes — search the catalogue for those instead.'
                      : 'Start with the shape letter — T, C, D, V, W, S or R.'}
                  </p>
                  {clean && (
                    <Link href={`/products?q=${encodeURIComponent(clean)}`} className="btn-onDark mt-7 self-start">
                      Search the catalogue <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Families */}
      <div className="mt-20">
        <Reveal>
          <div className="shell mb-6 flex items-end justify-between gap-4">
            <p className="text-[17px] text-ink-soft">
              <span className="font-semibold text-ink">{familyCount} ISO families</span> we handle today — hover to pause, click to browse.
            </p>
            <Link href="/products" className="hidden shrink-0 items-center gap-1.5 text-[14.5px] font-semibold text-ink hover:gap-2.5 transition-all sm:inline-flex">
              Full catalogue <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <FamilyMarquee />
      </div>
    </section>
  );
}
