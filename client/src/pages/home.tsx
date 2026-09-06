import { Link } from 'wouter';
import { ArrowRight, Search, PackageSearch, Ship, MessagesSquare, ClipboardList, Boxes } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import InsertGlyph from '../components/insert-glyph';
import {
  categories, countsByCategory, totalFamilyCount, totalProductCount, allFamilies,
} from '../../../shared/catalog';
import { company } from '../../../shared/company';

const STEPS = [
  { icon: ClipboardList, title: 'Send your requirement', body: 'Share an ISO code, a drawing, a sample or simply the part you currently buy.' },
  { icon: PackageSearch, title: 'We check the source', body: 'We confirm availability and specification with our suppliers in China and Taiwan.' },
  { icon: MessagesSquare, title: 'You receive a quotation', body: 'Pricing, lead time and packing details, sent back to you directly.' },
  { icon: Ship, title: 'Supply', body: 'We import and deliver against your confirmed order.' },
];

const REASONS = [
  { title: 'Codes you already use', body: 'Search the catalogue by the ISO designation on your current insert box. No cross-referencing required.' },
  { title: 'Standard and non-standard', body: 'Common geometries from stock enquiry, plus special-design inserts sourced against a drawing or sample.' },
  { title: 'Direct sourcing', body: `We buy directly from producers in ${company.sourcingRegions.join(' and ')}, so you deal with one point of contact for both.` },
  { title: 'Quotation-led, not a shopfront', body: 'Pricing depends on grade, quantity and lead time, so we quote against your actual requirement rather than publishing a list price.' },
];

export default function HomePage() {
  usePageMeta(
    'Carbide Inserts & Cutting Tools',
    'Sree Raj Tools supplies carbide inserts and cutting tools across India, sourced from established producers in China and Taiwan. Search by ISO code and request a quotation.',
  );

  const counts = countsByCategory();
  const listed = categories.filter((c) => !c.enquiryOnly);
  const bySource = categories.filter((c) => c.enquiryOnly);
  const featuredFamilies = allFamilies().filter((f) =>
    ['TNMG', 'CNMG', 'WNMG', 'VNMG', 'DNMG', 'CCMT', 'DCMT', 'TCMT', 'APMT', 'SPMG', 'WCMX', 'MGMN', 'RPMT', 'SEHT', '16ER'].includes(f),
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-graphite text-graphite-ink">
        <div className="shell grid gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <span className="accent-rule mb-6" />
            <p className="label mb-4 text-accent">Importer &amp; Supplier · India</p>
            <h1 className="text-[40px] leading-[1.05] sm:text-[54px] lg:text-[62px]">
              Carbide inserts and cutting tools, sourced for Indian workshops
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-graphite-muted">
              {company.summary}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="btn-primary">
                Explore Products <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/quote" className="btn-onDark">
                Request a Quote
              </Link>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-graphite-line pt-7">
              {[
                { label: 'Codes listed', value: totalProductCount },
                { label: 'ISO families', value: totalFamilyCount },
                { label: 'Categories', value: categories.length },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dd className="font-display text-3xl font-bold leading-none text-accent">{stat.value}</dd>
                  <dt className="label mt-2 text-graphite-muted">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Schematic shape wall — original technical illustration, not photography */}
          <div className="hidden grid-cols-3 gap-3 lg:grid" aria-hidden="true">
            {['Triangular', 'Rhombic 80°', 'Square', 'Rhombic 35°', 'Round', 'Trigon 80°', 'Rhombic 55°', 'Rectangular', 'Triangular'].map(
              (s, i) => (
                <div key={i} className="flex aspect-square items-center justify-center border border-graphite-line bg-graphite-light">
                  <InsertGlyph shape={s} onDark className="h-16 w-16" />
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Search prompt */}
      <section className="border-b border-rule bg-surface-subtle">
        <div className="shell flex flex-col items-start gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[16px] text-ink-soft">
            Know the code on your insert box? Search the catalogue directly.
          </p>
          <Link href="/products" className="btn-outline whitespace-nowrap">
            <Search className="h-4 w-4" aria-hidden="true" /> Search by product code
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="shell">
          <span className="accent-rule mb-5" />
          <h2 className="text-[32px] sm:text-[40px]">Product categories</h2>
          <p className="mt-3 max-w-2xl text-[17px] text-ink-soft">
            The catalogue is organised by machining operation. Each category lists the ISO codes we
            currently handle; anything not listed can be sourced on enquiry.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listed.map((c) => (
              <Link key={c.id} href={`/products/${c.slug}`} className="tile group flex gap-4 p-5">
                <InsertGlyph category={c.id} className="h-12 w-12 shrink-0" />
                <div>
                  <h3 className="text-[19px] text-ink group-hover:text-accent-ink">{c.name}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-muted">{c.description}</p>
                  <p className="mt-2.5 font-mono text-[12px] text-accent-ink">{counts[c.id]} codes listed</p>
                </div>
              </Link>
            ))}
          </div>

          <h3 className="label mt-12 mb-4 text-ink-muted">Also sourced on enquiry</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bySource.map((c) => (
              <Link key={c.id} href={`/products/${c.slug}`} className="tile group p-5">
                <h4 className="text-[17px] text-ink group-hover:text-accent-ink">{c.name}</h4>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-muted">{c.description}</p>
                {c.needsConfirmation && (
                  <p className="mt-2.5 font-mono text-[12px] text-ink-muted">Range being finalised</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Families currently handled */}
      <section className="border-y border-rule bg-surface-subtle py-16 md:py-20">
        <div className="shell">
          <span className="accent-rule mb-5" />
          <h2 className="text-[32px] sm:text-[40px]">Insert families we handle</h2>
          <p className="mt-3 max-w-2xl text-[17px] text-ink-soft">
            These are the ISO families currently represented in our catalogue. Sizes, geometries and
            grades within each family are confirmed at the time of quotation.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {featuredFamilies.map((f) => (
              <li key={f}>
                <Link
                  href={`/products?q=${f}`}
                  className="inline-block border border-rule bg-white px-3.5 py-2 font-mono text-[14px] text-ink hover:border-ink hover:text-accent-ink"
                >
                  {f}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="inline-block px-3.5 py-2 font-mono text-[14px] font-semibold text-accent-ink hover:underline">
                +{totalFamilyCount - featuredFamilies.length} more →
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Custom sourcing */}
      <section className="py-16 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="accent-rule mb-5" />
            <h2 className="text-[32px] sm:text-[40px]">Not in the list? We source it.</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
              Much of what we supply starts as a specific request — a size that is hard to find, a
              geometry for a particular material, or a replacement for an insert that has been
              discontinued. Send the code, the drawing or a photograph of the worn part and we will
              work back to a specification.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Non-standard sizes and geometries',
                'Special-design inserts made to a drawing',
                'Mining inserts and tube scraper inserts',
                'Replacements for discontinued part numbers',
              ].map((t) => (
                <li key={t} className="flex gap-3 text-[16px] text-ink-soft">
                  <Boxes className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/custom-sourcing" className="btn-outline mt-8">
              How custom sourcing works <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['Rhombic 35°', 'Trigon 80°', 'Round', 'Square'].map((s) => (
              <div key={s} className="flex flex-col items-center justify-center border border-rule bg-surface-subtle p-7">
                <InsertGlyph shape={s} className="h-20 w-20" />
                <span className="mt-3 font-mono text-[12px] text-ink-muted">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why work with us */}
      <section className="bg-graphite py-16 text-graphite-ink md:py-24">
        <div className="shell">
          <span className="accent-rule mb-5" />
          <h2 className="text-[32px] text-graphite-ink sm:text-[40px]">Why work with {company.displayName}</h2>
          <div className="mt-10 grid gap-px border border-graphite-line bg-graphite-line sm:grid-cols-2">
            {REASONS.map((r) => (
              <div key={r.title} className="bg-graphite p-7">
                <h3 className="text-[20px] text-graphite-ink">{r.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-graphite-muted">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24">
        <div className="shell">
          <span className="accent-rule mb-5" />
          <h2 className="text-[32px] sm:text-[40px]">How an enquiry works</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[13px] font-semibold text-accent-ink">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-rule" aria-hidden="true" />
                </div>
                <s.icon className="mt-5 h-6 w-6 text-ink" aria-hidden="true" />
                <h3 className="mt-3 text-[19px]">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-rule bg-surface-subtle py-16 md:py-20">
        <div className="shell flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[30px] sm:text-[36px]">Tell us what you need</h2>
            <p className="mt-2.5 max-w-xl text-[17px] text-ink-soft">
              Send an ISO code, a drawing or a description of the job. We will come back with pricing,
              lead time and available grades.
            </p>
          </div>
          <Link href="/quote" className="btn-primary shrink-0">
            Request a Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
