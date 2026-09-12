import { Link } from 'wouter';
import { ArrowRight, Search, Globe, Layers, ShieldCheck, Workflow } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import InsertGlyph from '../components/insert-glyph';
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

export default function HomePage() {
  usePageMeta(
    'Carbide Inserts & Cutting Tools',
    'ShreeRaj Tools supplies carbide inserts and cutting tools sourced from established producers in China and Taiwan. Search by ISO code and request a quotation.',
  );

  const counts = countsByCategory();
  const listed = categories.filter((c) => !c.enquiryOnly);
  const bySource = categories.filter((c) => c.enquiryOnly);
  const featured = allFamilies().filter((f) =>
    ['TNMG', 'CNMG', 'WNMG', 'VNMG', 'DNMG', 'SNMG', 'CCMT', 'DCMT', 'TCMT', 'APMT', 'SPMG', 'WCMX', 'MGMN', 'RPMT', '16ER'].includes(f),
  );

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b border-night-line bg-night text-night-ink">
        <div className="absolute inset-0 night-glow" aria-hidden="true" />
        <div className="absolute inset-0 grid-lines opacity-60" aria-hidden="true" />

        <div className="shell relative grid gap-14 py-20 md:py-28 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="animate-rise">
            <p className="eyebrow-dark mb-6">Carbide inserts &amp; cutting tools</p>

            <h1 className="text-display text-night-ink">
              Precision tooling,
              <br />
              sourced without borders
            </h1>

            <p className="mt-7 max-w-xl text-lead text-night-muted">{company.summary}</p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="btn-onDark">
                Explore Products <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/quote" className="btn-ghostDark">Request a Quote</Link>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-8 border-t border-night-line pt-8">
              {[
                { label: 'Product codes', value: totalProductCount },
                { label: 'ISO families', value: totalFamilyCount },
                { label: 'Categories', value: categories.length },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dd className="tabnum text-[34px] font-semibold leading-none tracking-[-0.03em] text-night-ink">
                    {s.value}
                  </dd>
                  <dt className="label mt-2.5 text-night-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Schematic shape wall — original technical illustration */}
          <div className="hidden lg:block" aria-hidden="true">
            <div className="grid grid-cols-3 gap-2.5">
              {['Triangular', 'Rhombic 80°', 'Square', 'Rhombic 35°', 'Round', 'Trigon 80°', 'Rhombic 55°', 'Rectangular', 'Triangular'].map(
                (s, i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center rounded-lg border border-night-line bg-night-soft"
                  >
                    <InsertGlyph shape={s} onDark className="h-14 w-14" />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Search strip */}
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

      {/* ------------------------------------------------------------ Categories */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <p className="eyebrow mb-5">Catalogue</p>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="text-h2 max-w-xl">Organised by the operation you are running</h2>
            <p className="max-w-md text-[16px] leading-relaxed text-ink-muted">
              Each category lists the ISO codes we currently handle. Anything outside that list can be
              sourced on enquiry.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {listed.map((c) => (
              <Link key={c.id} href={`/products/${c.slug}`} className="tile group flex flex-col p-6">
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
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {bySource.map((c) => (
              <Link key={c.id} href={`/products/${c.slug}`} className="tile group p-5">
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
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- Families */}
      <section className="border-y border-rule bg-surface-subtle py-20">
        <div className="shell">
          <p className="eyebrow mb-5">Coverage</p>
          <h2 className="text-h2 max-w-2xl">Insert families we handle today</h2>
          <p className="mt-4 max-w-2xl text-[16.5px] leading-relaxed text-ink-soft">
            Sizes, geometries and grades within each family are confirmed at the point of quotation.
          </p>

          <ul className="mt-9 flex flex-wrap gap-2">
            {featured.map((f) => (
              <li key={f}>
                <Link
                  href={`/products?q=${f}`}
                  className="inline-block rounded-md border border-rule bg-white px-3.5 py-2 font-mono text-[13.5px] text-ink transition-all hover:border-ink hover:shadow-xs"
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
        </div>
      </section>

      {/* -------------------------------------------------------- Custom sourcing */}
      <section className="py-20 md:py-28">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
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
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['Rhombic 35°', 'Trigon 80°', 'Round', 'Square'].map((s) => (
              <div key={s} className="panel flex flex-col items-center justify-center p-9">
                <InsertGlyph shape={s} className="h-20 w-20" />
                <span className="mt-4 font-mono text-[12px] text-ink-muted">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Why us */}
      <section className="border-y border-rule bg-surface-subtle py-20 md:py-28">
        <div className="shell">
          <p className="eyebrow mb-5">Why {company.displayName}</p>
          <h2 className="text-h2 max-w-2xl">A supplier that works the way a buyer does</h2>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {REASONS.map((r) => (
              <div key={r.title} className="panel p-7">
                <r.icon className="h-5 w-5 text-accent-ink" aria-hidden="true" />
                <h3 className="mt-4 text-h3">{r.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-muted">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- Process */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <p className="eyebrow mb-5">Process</p>
          <h2 className="text-h2 max-w-xl">From enquiry to supply</h2>

          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.n}>
                <div className="mb-5 flex items-center gap-3">
                  <span className="code font-medium text-accent-ink">{s.n}</span>
                  <span className="hairline flex-1" aria-hidden="true" />
                </div>
                <h3 className="text-h3">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------ Final CTA */}
      <section className="border-t border-rule pb-24">
        <div className="shell">
          <div className="relative overflow-hidden rounded-lg bg-night px-8 py-16 text-center md:px-16 md:py-20">
            <div className="absolute inset-0 night-glow" aria-hidden="true" />
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
                <Link href="/quote" className="btn-onDark">
                  Request a Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/products" className="btn-ghostDark">Browse the catalogue</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
