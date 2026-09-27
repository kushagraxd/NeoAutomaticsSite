import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import InsertRender from '../insert-render';
import Reveal from '../reveal';
import FamilyExplorer from './family-explorer';
import SectionHeader from './section-header';
import { decodeInsert, type SegmentKey } from '../../lib/iso-decoder';
import { productByCode, searchProducts, categoryById } from '../../../../shared/catalog';

const SAMPLES = [
  'TNMG160408-MA', 'CNMG120408-MA', 'WNMG080408-MA', 'VNMG160404-MA',
  'DNMG150608-MA', 'CCMT09T304-MK', 'SPMG090408-DG', 'RDMW1604M0',
];

/** Numbered callout, as on an engineering drawing. Links a character group to its meaning. */
function Balloon({ n, on }: { n: number; on: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] font-semibold transition-colors ${
        on ? 'border-accent bg-accent text-ivory' : 'border-rule-strong bg-surface-card text-ink-muted'
      }`}
      aria-hidden="true"
    >
      {n}
    </span>
  );
}

export default function InsertExplorer() {
  const [code, setCode] = useState('TNMG160408-MA');
  const [active, setActive] = useState<SegmentKey | null>(null);

  const segments = useMemo(() => decodeInsert(code), [code]);
  const clean = code.trim().toUpperCase();
  const match = productByCode(clean) ?? (clean.length >= 6 ? searchProducts(clean, 1)[0] : undefined);
  const href = match
    ? `/products/${categoryById(match.category)?.slug}/${encodeURIComponent(match.code)}`
    : `/products?q=${encodeURIComponent(clean)}`;

  const status = segments
    ? `${clean} decoded into ${segments.length} parts.`
    : clean
      ? `${clean} is not a standard ISO 1832 turning designation.`
      : '';

  return (
    <section className="section bg-surface" aria-labelledby="explorer-title">
      <div className="shell">
        <SectionHeader
          id="explorer-title"
          title="Read an insert code, character by character"
          lead="Every character in an ISO 1832 designation carries part of the specification. Type a code, or pick one we handle, to see it decoded."
        />

        <Reveal delay={120}>
          <div className="mt-12 grid overflow-hidden rounded-2xl border border-rule bg-surface-card shadow-paper lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            {/* Input */}
            <div className="flex flex-col border-b border-rule p-6 md:p-10 lg:border-b-0 lg:border-r">
              <label htmlFor="iso-code" className="text-[14px] font-semibold text-ink">
                Insert code
              </label>
              <input
                id="iso-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                autoComplete="off"
                className="mt-2.5 h-14 w-full rounded-[10px] border border-rule-strong bg-surface-card px-4 font-mono text-[20px] font-medium uppercase tracking-tight text-ink transition-colors hover:border-accent-line-muted focus:border-accent focus:outline-none focus:ring-4 focus:ring-[rgba(var(--accent-rgb),0.16)]"
              />

              <p className="mt-7 text-[14px] font-semibold text-ink">Codes we handle</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {SAMPLES.map((s) => {
                  const on = clean === s;
                  return (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => setCode(s)}
                        aria-pressed={on}
                        className={`rounded-md border px-2.5 py-1.5 font-mono text-[12.5px] font-medium transition-colors ${
                          on ? 'border-accent bg-accent text-ivory' : 'border-rule bg-surface text-ink-soft hover:border-accent-line hover:text-accent-ink'
                        }`}
                      >
                        {s}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 flex flex-1 flex-col overflow-hidden rounded-xl border border-rule">
                <div className="product-stage flex min-h-[170px] flex-1 items-center justify-center p-6">
                  <InsertRender
                    code={clean || 'CNMG120408'}
                    category={match?.category ?? 'turning'}
                   
                    title={`Illustration of ${clean || 'an insert'}, drawn from its designation`}
                    className="h-auto w-full max-w-[220px]"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-rule bg-surface-card px-5 py-4">
                  <div className="min-w-0">
                    <p className="text-[13px] text-ink-muted">{match ? 'In our catalogue' : 'Not a listed code'}</p>
                    <p className="truncate font-mono text-[15px] font-semibold text-ink">{match?.code ?? (clean || '—')}</p>
                  </div>
                  <Link href={href} className="link-arrow text-[14px]">
                    {match ? 'View this insert' : 'Ask about availability'}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Decoded */}
            <div className="bg-surface-panel p-6 md:p-10">
              <p className="sr-only" aria-live="polite">
                {status}
              </p>
              {segments ? (
                <>
                  <p className="flex flex-wrap gap-x-1.5 gap-y-3" aria-label={clean}>
                    {segments.map((s, i) => (
                      <span key={s.key} className="flex flex-col items-center gap-2" aria-hidden="true">
                        <span
                          className={`rounded-md px-1 font-mono text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] font-semibold leading-tight tracking-tight text-ink transition-all duration-200 ${
                            active === s.key ? 'bg-accent-soft' : ''
                          } ${active && active !== s.key ? 'opacity-30' : ''}`}
                        >
                          {s.chars}
                        </span>
                        <Balloon n={i + 1} on={active === s.key} />
                      </span>
                    ))}
                  </p>

                  <ol className="mt-8 divide-y divide-rule border-t border-rule">
                    {segments.map((s, i) => (
                      <li
                        key={s.key}
                        tabIndex={0}
                        onMouseEnter={() => setActive(s.key)}
                        onMouseLeave={() => setActive(null)}
                        onFocus={() => setActive(s.key)}
                        onBlur={() => setActive(null)}
                        className="grid cursor-default grid-cols-[1.5rem_4.25rem_minmax(0,1fr)] items-center gap-3 px-1 py-3 transition-colors hover:bg-surface focus-visible:bg-surface"
                      >
                        <Balloon n={i + 1} on={active === s.key} />
                        <span className="justify-self-start rounded-md border border-rule bg-surface-card px-2 py-0.5 font-mono text-[14px] font-semibold text-ink">
                          {s.chars}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[12.5px] font-semibold text-ink-muted">{s.label}</span>
                          <span className="block text-[15px] text-ink">{s.meaning}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </>
              ) : (
                <div className="flex h-full flex-col justify-center py-6">
                  <p className="font-mono text-[26px] font-semibold text-ink-muted">{clean || 'Type a code'}</p>
                  <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-ink-muted">
                    {clean
                      ? 'This isn’t a standard ISO 1832 turning designation. Milling, threading and grooving codes such as APMT, 16ER or MGMN follow manufacturer schemes — search the catalogue for those instead.'
                      : 'Start with the shape letter — T, C, D, V, W, S or R.'}
                  </p>
                  {clean && (
                    <Link href={`/products?q=${encodeURIComponent(clean)}`} className="link-arrow mt-6 self-start text-[15px]">
                      Search the catalogue <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <FamilyExplorer />
      </div>
    </section>
  );
}
