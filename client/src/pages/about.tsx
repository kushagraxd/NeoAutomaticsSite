import type { CSSProperties } from 'react';
import { Link } from 'wouter';
import {
  ArrowRight, ArrowUpRight, ClipboardList, Factory, PackageCheck, Receipt, Search, Users, Wrench, type LucideIcon,
} from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import Reveal from '../components/reveal';
import RollingNumber from '../components/rolling-number';
import BrandLogo from '../components/brand-logo';
import { toneFor } from '../lib/category-tones';
import { categories, countsByCategory, familiesIn, totalFamilyCount, totalProductCount } from '../../../shared/catalog';
import { company } from '../../../shared/company';

const regions = company.sourcingRegions.join(' and ');

const WHAT_WE_DO: Array<{ icon: LucideIcon; title: string; body: string }> = [
  { icon: Search, title: 'Source', body: `We work with established producers in ${regions} to find carbide inserts and cutting tools that match the job.` },
  { icon: PackageCheck, title: 'Import & supply', body: 'We handle import and supply against confirmed orders for manufacturers and workshops across India.' },
  { icon: Receipt, title: 'Quote to requirement', body: 'We price against your actual grade, quantity and lead time rather than a published list.' },
];

const WHO: Array<{ icon: LucideIcon; title: string; body: string }> = [
  { icon: Wrench, title: 'Machining workshops & job shops', body: 'Turning, milling and drilling work where the right insert keeps a machine productive.' },
  { icon: Factory, title: 'Component manufacturers', body: 'Production that relies on a steady supply of the geometries already running on the line.' },
  { icon: ClipboardList, title: 'Tool rooms & maintenance', body: 'Replacements for worn, uncommon or discontinued inserts, matched from a code or a sample.' },
  { icon: Users, title: 'Purchase & procurement teams', body: 'One point of contact for quotation, sourcing and import, instead of several overseas suppliers.' },
];

/** China and Taiwan feed into ShreeRaj Tools in India, which supplies the shop floor. */
function SourcingRoute() {
  const text = { fill: 'var(--ink)', fontFamily: 'Geist, system-ui, sans-serif', fontSize: 15, fontWeight: 600 } as const;
  const sub = { fill: 'var(--ink-muted)', fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 11.5 } as const;
  const route = { stroke: 'rgba(var(--brand-bright-rgb),0.7)' } as const;

  return (
    <svg viewBox="0 0 680 240" className="w-full" role="img" aria-label="Sourcing route: China and Taiwan, to ShreeRaj Tools in India, to your workshop">
      <g fill="none" strokeWidth="1.5" className="route-dash" style={route}>
        <path d="M130 70 C 230 70, 250 120, 338 120" />
        <path d="M130 170 C 230 170, 250 120, 338 120" />
        <path d="M402 120 H 540" />
      </g>
      {[{ y: 70, label: 'China' }, { y: 170, label: 'Taiwan' }].map((n) => (
        <g key={n.label}>
          <circle cx="112" cy={n.y} r="18" style={{ fill: 'var(--surface-panel)', stroke: 'rgba(var(--brand-bright-rgb),0.55)' }} strokeWidth="1.5" />
          <circle cx="112" cy={n.y} r="5" style={{ fill: 'rgb(var(--brand-bright-rgb))' }} />
          <text x="112" y={n.y + 40} textAnchor="middle" style={text}>{n.label}</text>
        </g>
      ))}
      <g>
        <circle cx="370" cy="120" r="34" style={{ fill: 'var(--surface-panel)', stroke: 'rgba(var(--gold-rgb),0.6)' }} strokeWidth="1.5" />
        <circle cx="370" cy="120" r="24" style={{ fill: 'rgba(var(--brand-rgb),0.35)', stroke: 'rgba(var(--brand-bright-rgb),0.6)' }} strokeWidth="1" />
        <text x="370" y="182" textAnchor="middle" style={text}>ShreeRaj Tools</text>
        <text x="370" y="200" textAnchor="middle" style={sub}>INDIA</text>
      </g>
      <g>
        <rect x="540" y="98" width="44" height="44" rx="10" style={{ fill: 'var(--surface-panel)', stroke: 'rgba(var(--brand-bright-rgb),0.55)' }} strokeWidth="1.5" />
        <path d="M552 128 L562 112 L572 128 Z" fill="none" style={{ stroke: 'rgb(var(--brand-bright-rgb))' }} strokeWidth="1.5" strokeLinejoin="round" />
        <text x="562" y="170" textAnchor="middle" style={text}>Your workshop</text>
      </g>
    </svg>
  );
}

export default function AboutPage() {
  usePageMeta(
    'About ShreeRaj Tools',
    'ShreeRaj Tools is an India-based importer and supplier of carbide inserts and cutting tools, sourced from established producers in China and Taiwan.',
  );

  const counts = countsByCategory();
  const listed = categories.filter((c) => !c.enquiryOnly);

  return (
    <>
      {/* ------------------------------------------------------- 1. Introduction */}
      <section className="relative overflow-hidden bg-night">
        <div className="pointer-events-none absolute inset-0 blueprint" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 glow-brand" aria-hidden="true" />
        <div className="shell relative grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <p className="eyebrow">About ShreeRaj Tools</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-[clamp(2.6rem,5.6vw,4.6rem)] font-semibold leading-[1] tracking-[-0.045em] text-ink">
                Carbide tooling, <span className="accent-word text-brand-bright">sourced to specification</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-[18px] leading-relaxed text-ink-soft">{company.summary}</p>
            </Reveal>
            <Reveal delay={240}>
              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-rule pt-7">
                {[
                  { value: totalProductCount, label: 'Codes listed' },
                  { value: totalFamilyCount, label: 'ISO families' },
                  { value: listed.length, label: 'Operations' },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <dd>
                      <RollingNumber value={s.value} className="text-[34px] font-semibold tracking-[-0.04em] text-ink" />
                    </dd>
                    <dt className="label mt-2 text-ink-muted">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="relative mx-auto aspect-square w-full max-w-[440px]" aria-hidden="true">
              <div className="absolute inset-[10%] rounded-full glow-brand" />
              <svg viewBox="0 0 400 400" className="orbit absolute inset-0 h-full w-full">
                <circle cx="200" cy="200" r="190" fill="none" strokeWidth="1" strokeDasharray="2 9" style={{ stroke: 'rgba(var(--brand-bright-rgb),0.5)' }} />
                <circle cx="200" cy="200" r="160" fill="none" strokeWidth="1" style={{ stroke: 'rgba(var(--line-rgb),0.16)' }} />
                <circle cx="200" cy="200" r="130" fill="none" strokeWidth="1" strokeDasharray="44 14" style={{ stroke: 'rgba(var(--gold-rgb),0.38)' }} />
                {Array.from({ length: 36 }, (_, i) => {
                  const a = (i * 10 * Math.PI) / 180;
                  const r1 = i % 3 === 0 ? 170 : 176;
                  return (
                    <line
                      key={i}
                      x1={200 + Math.cos(a) * r1}
                      y1={200 + Math.sin(a) * r1}
                      x2={200 + Math.cos(a) * 182}
                      y2={200 + Math.sin(a) * 182}
                      strokeWidth="1"
                      style={{ stroke: 'rgba(var(--line-rgb),0.3)' }}
                    />
                  );
                })}
              </svg>
              <div className="emblem-plate absolute inset-[24%]">
                <BrandLogo variant="emblem" size={150} className="drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- 2. What we do */}
      <section className="bg-surface py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
              A supplier, <span className="accent-word text-brand-bright">not a manufacturer</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-ink-muted">
              We don’t make inserts. We find the right ones, confirm the specification, and bring them to you.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {WHAT_WE_DO.map((item, i) => (
              <Reveal key={item.title} as="li" delay={i * 80}>
                <div className="card h-full p-7">
                  <span className="icon-badge"><item.icon className="h-5 w-5" aria-hidden="true" /></span>
                  <h3 className="mt-6 text-[21px] font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
                  <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------ 3. Product and sourcing focus */}
      <section className="relative overflow-hidden border-y border-rule bg-surface-subtle py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 blueprint opacity-40" aria-hidden="true" />
        <div className="shell relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">Product focus</p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
              Five operations, <span className="accent-word text-brand-bright">searchable by code</span>
            </h2>
            <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-ink-muted">
              Our catalogue covers the geometries that come up most often, listed by their ISO designation. Mining, tube-scraper and
              special-design inserts are sourced on enquiry.
            </p>
            <Link href="/products" className="btn-outline mt-8">
              Browse the catalogue <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <ul className="grid gap-3 sm:grid-cols-2">
            {listed.map((c, i) => {
              const tone = toneFor(c.id);
              return (
                <Reveal key={c.id} as="li" delay={i * 60}>
                  <Link
                    href={`/products/${c.slug}`}
                    className="card-interactive group flex h-full items-center gap-4 p-5"
                    style={{ '--tone': tone.rgb } as CSSProperties}
                  >
                    <span className="h-11 w-1.5 shrink-0 rounded-full" style={{ background: tone.hex }} aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[16px] font-semibold text-ink">{c.name}</span>
                      <span className="mt-0.5 block text-[13.5px] text-ink-muted">
                        {familiesIn(c.id).length} families · {counts[c.id]} codes listed
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-muted transition-colors group-hover:text-brand-bright" aria-hidden="true" />
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------- 4. Sourcing network */}
      <section className="bg-surface py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Sourcing network</p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
              China and Taiwan, <span className="accent-word text-brand-bright">one point of contact</span>
            </h2>
            <p className="mt-5 max-w-lg text-[16.5px] leading-relaxed text-ink-muted">
              We source from established producers in {regions}. You deal with us for the specification, the quotation and the import —
              rather than coordinating with overseas suppliers yourself.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="card relative overflow-hidden p-6 md:p-8">
              <div className="pointer-events-none absolute inset-0 blueprint-fine opacity-70" aria-hidden="true" />
              <div className="relative hidden sm:block">
                <SourcingRoute />
              </div>
              <ol className="relative space-y-3 sm:hidden">
                {['China & Taiwan — established producers', 'ShreeRaj Tools, India — specification, quote & import', 'Your workshop — supplied against your order'].map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="step-dot">{i + 1}</span>
                    <span className="text-[15px] text-ink-soft">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ 5. Who we supply */}
      <section className="relative overflow-hidden border-y border-rule bg-surface-subtle py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Who we supply in India</p>
            <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
              Built for the people <span className="accent-word text-brand-bright">who run the machines</span>
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHO.map((w, i) => (
              <Reveal key={w.title} as="li" delay={i * 70}>
                <div className="card h-full p-6">
                  <span className="icon-badge"><w.icon className="h-5 w-5" aria-hidden="true" /></span>
                  <h3 className="mt-5 text-[17.5px] font-semibold leading-snug tracking-[-0.015em] text-ink">{w.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------ 6. Custom sourcing */}
      <section className="bg-surface py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <div className="card relative overflow-hidden p-8 md:p-12">
              <div className="pointer-events-none absolute inset-0 blueprint opacity-50" aria-hidden="true" />
              <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full glow-brand" aria-hidden="true" />
              <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="eyebrow">Custom sourcing</p>
                  <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
                    When it isn’t in the catalogue, <span className="accent-word text-brand-bright">we look for it</span>
                  </h2>
                  <p className="mt-5 max-w-lg text-[16.5px] leading-relaxed text-ink-muted">
                    Uncommon sizes, special geometries and discontinued part numbers. Send a code, drawing, photograph or sample and we
                    work back to a specification — and tell you plainly if we can’t source it.
                  </p>
                  <Link href="/custom-sourcing" className="btn-primary mt-8">
                    How custom sourcing works <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <ul className="grid grid-cols-2 gap-3">
                  {['Product code', 'Technical drawing', 'Photograph', 'Physical sample'].map((t) => (
                    <li key={t} className="rounded-xl border border-rule bg-surface-subtle px-4 py-5 text-center text-[14.5px] font-medium text-ink-soft">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------- 7. Family background */}
      <section className="bg-surface pb-20 md:pb-28">
        <div className="shell">
          <Reveal>
            <div className="grid items-center gap-8 rounded-3xl border border-rule bg-surface-subtle p-8 md:grid-cols-[auto_1fr] md:p-12">
              <div className="emblem-plate mx-auto h-36 w-36 md:mx-0">
                <BrandLogo variant="emblem" size={84} />
              </div>
              <div>
                <p className="eyebrow">Our background</p>
                <h2 className="mt-4 text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-ink">
                  A family business with <span className="accent-word text-gold">roots in industry</span>
                </h2>
                <p className="mt-4 max-w-2xl text-[16.5px] leading-relaxed text-ink-soft">
                  {company.parentFirm.relationship} That background shapes how we work: practical, specification-first and
                  straightforward with the people we supply.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ 8. CTA */}
      <section className="bg-surface pb-24 md:pb-28">
        <div className="shell">
          <Reveal>
            <div className="cta-band">
              <div className="pointer-events-none absolute inset-0 blueprint opacity-60" aria-hidden="true" />
              <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
                    Start with a requirement
                  </h2>
                  <p className="mt-3 max-w-xl text-[16.5px] leading-relaxed text-ink-soft">
                    Send a code or a drawing and see how we respond.
                  </p>
                </div>
                <Link href="/contact#enquiry" className="btn-primary btn-lg group shrink-0">
                  Request a Quote
                  <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
