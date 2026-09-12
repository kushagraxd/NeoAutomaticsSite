import type { MouseEvent } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Search, Layers, Globe, BadgeIndianRupee } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import { useScrollY } from '../lib/useReveal';
import HeroBackdrop from '../components/hero-backdrop';
import RollingNumber from '../components/rolling-number';
import Reveal from '../components/reveal';
import CategoryBento from '../components/home/category-bento';
import InsertExplorer from '../components/home/insert-explorer';
import SourcingSection from '../components/home/sourcing-section';
import ProcessTimeline from '../components/home/process-timeline';
import { categories, totalFamilyCount, totalProductCount } from '../../../shared/catalog';
import { company } from '../../../shared/company';

const METRICS = [
  { value: totalProductCount, label: 'Product codes', note: 'listed and searchable' },
  { value: totalFamilyCount, label: 'ISO families', note: 'turning to threading' },
  { value: categories.length, label: 'Categories', note: 'plus custom sourcing' },
];

const REASONS = [
  { icon: Search, tone: '227,181,95', title: 'The code you already use', body: 'Search by the ISO designation on your current insert box. No proprietary numbering, no cross-reference tables.' },
  { icon: Layers, tone: '79,199,182', title: 'Standard and special', body: 'Common geometries across five operations, plus special-design inserts sourced against a drawing or sample.' },
  { icon: Globe, tone: '110,155,255', title: 'Two sourcing regions, one contact', body: `We buy directly from producers in ${company.sourcingRegions.join(' and ')}, so you never coordinate overseas suppliers yourself.` },
  { icon: BadgeIndianRupee, tone: '240,126,154', title: 'Quoted, not listed', body: 'Price depends on grade, quantity and lead time. We quote the job, so the specification matches the work.' },
];

function trackPointer(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

export default function HomePage() {
  usePageMeta(
    'Carbide Inserts & Cutting Tools',
    'ShreeRaj Tools supplies carbide inserts and cutting tools sourced from established producers in China and Taiwan. Search by ISO code and request a quotation.',
  );

  const parallax = Math.min(useScrollY(), 900);

  return (
    <>
      {/* ================================================================ Hero */}
      <section className="relative isolate flex min-h-[600px] flex-col justify-between overflow-hidden bg-night text-night-ink md:min-h-[92vh]">
        <div className="absolute inset-0 -z-10" style={{ transform: `translate3d(0, ${parallax * 0.22}px, 0) scale(1.06)` }}>
          <HeroBackdrop />
        </div>

        <div className="shell flex flex-1 flex-col justify-center pb-14 pt-20 md:pb-16 md:pt-24" style={{ opacity: Math.max(0, 1 - parallax / 780) }}>
          <div className="max-w-4xl">
            <Reveal>
              <p className="eyebrow-dark mb-7">Carbide inserts &amp; cutting tools</p>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="font-semibold text-night-ink" style={{ fontSize: 'clamp(3rem, 8.4vw, 6.75rem)', lineHeight: 0.94, letterSpacing: '-0.045em' }}>
                Where the
                <br />
                <span className="accent-word text-accent" style={{ letterSpacing: '-0.02em' }}>cut</span> begins
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-8 max-w-xl text-[18px] leading-relaxed text-night-muted md:text-[19.5px]">
                The insert is the edge that does the work. We source them from established producers in{' '}
                {company.sourcingRegions.join(' and ')} and supply manufacturers in {company.basedIn} and internationally —
                standard geometries from the catalogue, special designs to your drawing.
              </p>
            </Reveal>
            <Reveal delay={270}>
              <div className="mt-11 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
                <Link href="/products" className="btn-onDark btn-lg group">
                  Explore Products
                  <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link href="/quote" className="btn-ghostDark btn-lg">Request a Quote</Link>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="relative border-t border-white/[.09] bg-[rgba(9,9,11,0.55)] backdrop-blur-sm">
          <div className="shell grid grid-cols-1 divide-y divide-white/[.09] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {METRICS.map((m, i) => (
              <Reveal key={m.label} delay={i * 110} className="py-6 sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <div className="flex items-baseline gap-3">
                  <RollingNumber value={m.value} className="text-[44px] font-semibold tracking-[-0.04em] text-night-ink md:text-[52px]" />
                  <span className="label text-accent">{m.label}</span>
                </div>
                <p className="mt-1.5 text-[14px] text-night-muted">{m.note}</p>
              </Reveal>
            ))}
          </div>
          <div className="pointer-events-none absolute -top-12 left-1/2 hidden -translate-x-1/2 md:block">
            <span className="scroll-cue relative block h-10 w-px overflow-hidden bg-white/10" aria-hidden="true" />
          </div>
        </div>
      </section>

      <CategoryBento />
      <InsertExplorer />
      <SourcingSection />
      <ProcessTimeline />

      {/* ============================================================= Why us */}
      <section className="bg-surface py-24 md:py-32">
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-6">Why {company.displayName}</p>
            <h2 className="max-w-3xl text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              A supplier that works <span className="accent-word text-accent-ink">the way a buyer does</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((r, i) => (
              <Reveal key={r.title} delay={i * 80}>
                <div
                  onMouseMove={trackPointer}
                  className="spotlight group h-full rounded-2xl border border-rule bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                  style={{ ['--tone' as string]: r.tone }}
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `rgba(${r.tone},.14)`, color: `rgb(${r.tone})` }}
                  >
                    <r.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-[20px] font-semibold leading-tight tracking-[-0.02em]">{r.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================== Final CTA */}
      <section className="bg-surface pb-24 md:pb-32">
        <div className="shell">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-night px-8 py-20 text-center md:px-16 md:py-28">
              <div className="absolute inset-0 night-glow" aria-hidden="true" />
              <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
              <div className="relative">
                <h2 className="mx-auto max-w-3xl text-[clamp(2.5rem,5.4vw,4.5rem)] font-semibold leading-[1] tracking-[-0.045em] text-night-ink">
                  Tell us the code. <span className="accent-word text-accent">We’ll find the edge.</span>
                </h2>
                <p className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-night-muted">
                  Send an ISO code, a drawing or a description of the job. We reply with pricing, available grades and lead time.
                </p>
                <div className="mt-10 flex flex-col justify-center gap-3.5 sm:flex-row sm:flex-wrap">
                  <Link href="/quote" className="btn-onDark btn-lg group">
                    Request a Quote
                    <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                  <Link href="/products" className="btn-ghostDark btn-lg">Browse the catalogue</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
