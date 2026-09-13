import type { MouseEvent } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import InsertGlyph from '../insert-glyph';
import Reveal from '../reveal';
import { categories, countsByCategory, familiesIn, type Category } from '../../../../shared/catalog';
import { toneFor } from '../../lib/category-tones';

/** Tracks the cursor so the card's spotlight follows it. */
function trackPointer(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}

// Layout slot per listed category on a 6-column grid.
const SLOTS: Record<string, string> = {
  turning: 'lg:col-span-3 lg:row-span-2',
  milling: 'lg:col-span-3',
  drilling: 'lg:col-span-3',
  grooving: 'lg:col-span-3',
  threading: 'lg:col-span-3',
};

function ListedCard({ c, count, featured }: { c: Category; count: number; featured: boolean }) {
  const tone = toneFor(c.id);
  const families = familiesIn(c.id);

  return (
    <article
      onMouseMove={trackPointer}
      className={`spotlight group flex h-full flex-col rounded-2xl border border-night-line bg-night-soft p-7 transition-colors duration-300 hover:border-transparent md:p-8 ${featured ? 'min-h-[420px]' : ''}`}
      style={{ ['--tone' as string]: tone.rgb }}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex items-center justify-center rounded-xl border border-white/[.07] bg-white/[.02] transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105"
          style={{ width: featured ? 92 : 64, height: featured ? 92 : 64 }}
        >
          <InsertGlyph category={c.id} color={tone.hex} className={featured ? 'h-14 w-14' : 'h-10 w-10'} />
        </div>
        <div className="text-right">
          <p className="tabnum font-semibold leading-none tracking-[-0.04em]" style={{ color: tone.hex, fontSize: featured ? 64 : 40 }}>
            {count}
          </p>
          <p className="label mt-2 text-night-muted">codes listed</p>
        </div>
      </div>

      <div className={featured ? 'mt-auto pt-10' : 'mt-7'}>
        <h3 className={`font-semibold tracking-[-0.03em] text-night-ink ${featured ? 'text-[34px] leading-[1.05]' : 'text-[23px] leading-tight'}`}>
          {c.name}
        </h3>
        <p className={`mt-3 leading-relaxed text-night-muted ${featured ? 'max-w-md text-[16px]' : 'text-[14.5px]'}`}>
          {c.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${c.short} families`}>
          {families.slice(0, featured ? 8 : 4).map((f) => (
            <li key={f} className="rounded-md border border-white/[.08] bg-white/[.03] px-2 py-1 font-mono text-[11.5px] text-night-muted">
              {f}
            </li>
          ))}
          {families.length > (featured ? 8 : 4) && (
            <li className="px-1 py-1 font-mono text-[11.5px] text-night-muted">+{families.length - (featured ? 8 : 4)}</li>
          )}
        </ul>

        <Link
          href={`/products/${c.slug}`}
          className="mt-7 inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[14.5px] font-semibold transition-all duration-300 after:absolute after:inset-0 after:content-[''] hover:gap-3"
          style={{ borderColor: `rgba(${tone.rgb},.35)`, color: tone.hex, background: `rgba(${tone.rgb},.06)` }}
          onMouseEnter={(e) => { e.currentTarget.style.background = tone.hex; e.currentTarget.style.color = '#09090b'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = `rgba(${tone.rgb},.06)`; e.currentTarget.style.color = tone.hex; }}
        >
          Browse {count} inserts <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function CategoryBento() {
  const counts = countsByCategory();
  const listed = categories.filter((c) => !c.enquiryOnly);
  const enquiry = categories.filter((c) => c.enquiryOnly);

  return (
    <section className="relative overflow-hidden bg-night py-24 text-night-ink md:py-32">
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden="true" />
      <div className="shell relative">
        <Reveal>
          <p className="eyebrow-dark mb-6">The catalogue</p>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Five operations. <span className="accent-word text-accent">One</span> place to source them.
            </h2>
            <p className="max-w-sm text-[16px] leading-relaxed text-night-muted">
              Every listed code is searchable by its ISO designation. Colour marks the operation, so you can find your way at a glance.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-6">
          {listed.map((c, i) => (
            <Reveal key={c.id} delay={i * 80} className={SLOTS[c.id] ?? 'lg:col-span-3'}>
              <ListedCard c={c} count={counts[c.id]} featured={c.id === 'turning'} />
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {enquiry.map((c, i) => (
            <Reveal key={c.id} delay={i * 70}>
              <Link
                href={`/products/${c.slug}`}
                onMouseMove={trackPointer}
                className="spotlight group flex h-full flex-col rounded-2xl border border-night-line bg-night-soft p-6 transition-colors hover:border-transparent"
                style={{ ['--tone' as string]: '210,168,87' }}
              >
                <span className="label text-night-muted">{c.needsConfirmation ? 'Range being finalised' : 'Sourced on enquiry'}</span>
                <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.02em] text-night-ink">{c.name}</h3>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-night-muted transition-colors group-hover:text-accent">
                  Share a requirement
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
