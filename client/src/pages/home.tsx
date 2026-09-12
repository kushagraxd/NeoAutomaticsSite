import { Link } from 'wouter';
import { ArrowRight, Search, Globe, Layers, ShieldCheck, Workflow } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import { useScrollY } from '../lib/useReveal';
import InsertGlyph from '../components/insert-glyph';
import HeroBackdrop from '../components/hero-backdrop';
import RollingNumber from '../components/rolling-number';
import Reveal from '../components/reveal';
import {
  categories, countsByCategory, totalFamilyCount, totalProductCount, allFamilies,
} from '../../../shared/catalog';
import { company } from '../../../shared/company';

const STEPS = [
  { n: '01', title: 'Send the requirement', body: 'An ISO code, a drawing, a photograph of a worn insert, or simply the part you currently buy.' },
  { n: '02', title: 'We confirm the source', body: 'We check specification, grade and availability with producers in China and Taiwan.' },
  { n: '03', title: 'You get a quotation', body: 'Pricing, lead time and packing — against your actual requirement, not a list price.' },
  { n: '04', title: 'We supply', body: 'Import, documentation and delivery against your confirmed order, domestic or export.' },
];

const REASONS = [
  { icon: Search, title: 'Search the code you already use', body: 'Look up the ISO designation printed on your current insert box. No proprietary numbering, no cross-reference tables.' },
  { icon: Layers, title: 'Standard and non-standard', body: 'Common geometries across five machining operations, plus special-design inserts sourced against a drawing or sample.' },
  { icon: Globe, title: 'One contact for two sourcing regions', body: `We buy directly from producers in ${company.sourcingRegions.join(' and ')}, so you are not coordinating with overseas suppliers yourself.` },
  { icon: ShieldCheck, title: 'Quoted, not listed', body: 'Price depends on grade, quantity and lead time. We quote against the job so the specification matches the work.' },
];

const METRICS = [
  { value: totalProductCount, label: 'Product codes', note: 'listed and searchable' },
  { value: totalFamilyCount, label: 'ISO families', note: 'turning to threading' },
  { value: categories.length, label: 'Categories', note: 'plus custom sourcing' },
];

export default function HomePage() {
  usePageMeta(
    'Carbide Inserts & Cutting Tools',
    'ShreeRaj Tools supplies carbide inserts and cutting tools sourced from established producers in China and Taiwan. Search by ISO code and request a quotation.',
  );

  const scrollY = useScrollY();
  const counts = countsByCategory();
  const listed = categories.filter((c) => !c.enquiryOnly);
  const bySource = categories.filter((c) => c.enquiryOnly);
  const featured = allFamilies().filter((f) =>
    ['TNMG', 'CNMG', 'WNMG', 'VNMG', 'DNMG', 'SNMG', 'CCMT', 'DCMT', 'TCMT', 'APMT', 'SPMG', 'WCMX', 'MGMN', 'RPMT', '16ER'].includes(f),
  );

  // Gentle parallax — the backdrop drifts slower than the page.
  const parallax = Math.min(scrollY, 900);

  return (
    <>
      {/* ================================================================ Hero */}
      <section className="relative isolate flex min-h-[600px] flex-col justify-between overflow-hidden bg-night text-night-ink md:min-h-[92vh]">
        <div
          className="absolute inset-0 -z-10"
          style={{ transform: `translate3d(0, ${parallax * 0.22}px, 0) scale(1.06)` }}
        >
          <HeroBackdrop />
        </div>

        <div
          className="shell flex flex-1 flex-col justify-center pb-14 pt-20 md:pb-16 md:pt-24"
          style={{ opacity: Math.max(0, 1 - parallax / 780) }}
        >
          <div className="max-w-4xl">
            <Reveal>
              <p className="eyebrow-dark mb-7">Carbide inserts &amp; cutting tools</p>
            </Reveal>

            <Reveal delay={90}>
              <h1
                className="font-semibold text-night-ink"
                style={{
                  fontSize: 'clamp(3rem, 8.4vw, 6.75rem)',
                  lineHeight: 0.94,
                  letterSpacing: '-0.045em',
                }}
              >
                Where the
                <br />
                cut begins
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-8 max-w-xl text-[18px] leading-relaxed text-night-muted md:text-[19.5px]">
                The insert is the edge that does the work. We source them from established producers
                in {company.sourcingRegions.join(' and ')} and supply manufacturers in{' '}
                {company.basedIn} and internationally — standard geometries from the catalogue,
                special designs to your drawing.
              </p>
            </Reveal>

            <Reveal delay={270}>
              <div className="mt-11 flex flex-col gap-3.5 sm:flex-row">
                <Link href="/products" className="btn-onDark btn-lg group">
                  Explore Products
                  <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link href="/quote" className="btn-ghostDark btn-lg">Request a Quote</Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Metrics rail */}
        <div className="relative border-t border-white/[.09] bg-[rgba(9,9,11,0.55)] backdrop-blur-sm">
          <div className="shell grid grid-cols-1 divide-y divide-white/[.09] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {METRICS.map((m, i) => (
              <Reveal key={m.label} delay={i * 110} className="py-6 sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <div className="flex items-baseline gap-3">
                  <RollingNumber
                    value={m.value}
                    className="text-[44px] font-semibold tracking-[-0.04em] text-night-ink md:text-[52px]"
                  />
                  <span className="label text-accent">{m.label}</span>
                </div>
                <p className="mt-1.5 text-[14px] text-night-muted">{m.note}</p>
              </Reveal>
            ))}
          </div>

          {/* Scroll cue */}
          <div className="pointer-events-none absolute -top-12 left-1/2 hidden -translate-x-1/2 md:block">
            <span className="scroll-cue relative block h-10 w-px overflow-hidden bg-white/10" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ====================================================== Search strip */}
      <section className="border-b border-rule bg-surface-subtle">
        <div className="shell flex flex-col items-start gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15.5px] text-ink-soft">
            Know the code on your insert box? Search{' '}
            <span className="font-medium text-ink">{totalProductCount} codes</span> directly.
          </p>
          <Link href="/products" className="btn-outline whitespace-nowrap py-2.5 text-[14px]">
            <Search className="h-4 w-4" aria-hidden="true" /> Search the catalogue
          </Link>
        </div>
      </section>

      {/* ========================================================= Categories */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-5">Catalogue</p>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="text-h2 max-w-xl">Organised by the operation you are running</h2>
              <p className="max-w-md text-[16px] leading-relaxed text-ink-muted">
                Each category lists the ISO codes we currently handle. Anything outside that list can
                be sourced on enquiry.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {listed.map((c, i) => (
              <Reveal key={c.id} delay={i * 70}>
                <Link href={`/products/${c.slug}`} className="tile group flex h-full flex-col p-6">
                  <div className="mb-5 flex items-start justify-between">
                    <InsertGlyph category={c.id} className="h-11 w-11" />
                    <span className="code rounded-full bg-surface-panel px-2.5 py-1 text-ink-muted">
                      {counts[c.id]}
                    </span>
                  </div>
                  <h3 className="text-h3 text-ink">{c.name}</h3>
                  <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-muted">{c.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink">
                    Browse
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {bySource.map((c, i) => (
              <Reveal key={c.id} delay={i * 70}>
                <Link href={`/products/${c.slug}`} className="tile group block h-full p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15.5px] font-semibold text-ink">{c.name}</h3>
                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                    {c.needsConfirmation ? 'Range being finalised — tell us what you need.' : 'Sourced to your specification.'}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================== Families */}
      <section className="border-y border-rule bg-surface-subtle py-20">
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-5">Coverage</p>
            <h2 className="text-h2 max-w-2xl">Insert families we handle today</h2>
            <p className="mt-4 max-w-2xl text-[16.5px] leading-relaxed text-ink-soft">
              Sizes, geometries and grades within each family are confirmed at the point of quotation.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-9 flex flex-wrap gap-2">
              {featured.map((f) => (
                <li key={f}>
                  <Link
                    href={`/products?q=${f}`}
                    className="inline-block rounded-md border border-rule bg-white px-3.5 py-2 font-mono text-[13.5px] text-ink transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-xs"
                  >
                    {f}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="inline-flex items-center gap-1 px-3.5 py-2 font-mono text-[13.5px] font-medium text-accent-ink hover:underline">
                  +{totalFamilyCount - featured.length} more
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== Custom sourcing */}
      <section className="py-20 md:py-28">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow mb-5">Custom sourcing</p>
            <h2 className="text-h2">Not in the list? That is most of the job.</h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-ink-soft">
              Much of what we supply starts as a specific request — a size that is hard to find, a
              geometry for a particular material, or a replacement for something discontinued. Send
              the code, the drawing or a photograph of the worn part and we will work back to a
              specification.
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                'Non-standard sizes and geometries',
                'Special-design inserts made to a drawing',
                'Mining inserts and tube scraper inserts',
                'Replacements for discontinued part numbers',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15.5px] text-ink-soft">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent-ink" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/custom-sourcing" className="btn-outline mt-9">
              How custom sourcing works <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>

          <div className="grid grid-cols-2 gap-3">
            {['Rhombic 35°', 'Trigon 80°', 'Round', 'Square'].map((s, i) => (
              <Reveal key={s} delay={i * 90}>
                <div className="panel flex flex-col items-center justify-center p-9">
                  <InsertGlyph shape={s} className="h-20 w-20" />
                  <span className="mt-4 font-mono text-[12px] text-ink-muted">{s}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= Why us */}
      <section className="border-y border-rule bg-surface-subtle py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-5">Why {company.displayName}</p>
            <h2 className="text-h2 max-w-2xl">A supplier that works the way a buyer does</h2>
          </Reveal>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {REASONS.map((r, i) => (
              <Reveal key={r.title} delay={i * 80}>
                <div className="panel h-full p-7">
                  <r.icon className="h-5 w-5 text-accent-ink" aria-hidden="true" />
                  <h3 className="mt-4 text-h3">{r.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-muted">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ Process */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-5">Process</p>
            <h2 className="text-h2 max-w-xl">From enquiry to supply</h2>
          </Reveal>

          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 90} as="li">
                <div className="mb-5 flex items-center gap-3">
                  <span className="code font-medium text-accent-ink">{s.n}</span>
                  <span className="hairline flex-1" aria-hidden="true" />
                </div>
                <h3 className="text-h3">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ========================================================== Final CTA */}
      <section className="border-t border-rule pb-24">
        <div className="shell">
          <Reveal>
            <div className="relative overflow-hidden rounded-lg bg-night px-8 py-16 text-center md:px-16 md:py-20">
              <div className="absolute inset-0 night-glow" aria-hidden="true" />
              <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
              <div className="relative">
                <Workflow className="mx-auto h-6 w-6 text-accent" aria-hidden="true" />
                <h2 className="mx-auto mt-6 max-w-2xl text-h2 text-night-ink">
                  Tell us what you need and we will price it
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[16.5px] leading-relaxed text-night-muted">
                  Send an ISO code, a drawing or a description of the job. We reply with pricing,
                  available grades and lead time.
                </p>
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link href="/quote" className="btn-onDark btn-lg">
                    Request a Quote <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
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
