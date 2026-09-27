import { Link } from 'wouter';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import Reveal from '../components/reveal';
import PageHero from '../components/page-hero';
import SectionHeader from '../components/home/section-header';
import { SampleRowBackdrop } from '../components/hero-backdrops';
import { CtaLink } from '../components/cta';
import { representativeInsert } from '../lib/category-media';
import { toneFor } from '../lib/category-tones';
import { listSentence, numberWord, capitalise } from '../lib/number-words';
import { categories, countsByCategory, totalFamilyCount, totalProductCount } from '../../../shared/catalog';
import { company } from '../../../shared/company';

const regions = listSentence(company.sourcingRegions);
const listed = categories.filter((c) => !c.enquiryOnly);
const onEnquiry = categories.filter((c) => c.enquiryOnly);

const WHAT_WE_DO = [
  {
    title: 'Carbide inserts and cutting tools',
    body: `${capitalise(listSentence(listed.map((c) => c.short.toLowerCase())))} inserts, with further categories sourced on enquiry.`,
  },
  {
    title: 'Catalogue-based sourcing',
    body: `${totalProductCount} listed codes, searchable by the ISO designation printed on the box you already buy.`,
  },
  {
    title: 'Requirement-led sourcing',
    body: 'Uncommon sizes, special geometries and discontinued parts, matched to a confirmed specification.',
  },
  {
    title: 'Codes, drawings, photographs and samples',
    body: 'Start from whatever you have — we work back from it to a specification before quoting.',
  },
  {
    title: 'Support for customers across India',
    body: 'Quotation, import and supply handled through one point of contact.',
  },
];

const WHO = [
  {
    title: 'Machining workshops & job shops',
    body: 'Turning, milling and drilling work where the right insert keeps a machine productive.',
    typical: 'Standard turning and milling codes',
  },
  {
    title: 'Component manufacturers',
    body: 'Production that relies on a steady supply of the geometries already running on the line.',
    typical: 'Repeat supply of running geometries',
  },
  {
    title: 'Tool rooms & maintenance teams',
    body: 'Replacements for worn, uncommon or discontinued inserts, matched from a code or a sample.',
    typical: 'Replacements matched from a sample',
  },
  {
    title: 'Purchase & procurement teams',
    body: 'One point of contact for quotation, sourcing and import, instead of several overseas suppliers.',
    typical: 'One quotation across several codes',
  },
];

/** Producers → Sreeraj Tools → your requirement. Horizontal on desktop, stacked on phones. */
function SourcingFlow() {
  const node = 'panel flex flex-col justify-center px-5 py-5 shadow-paper';
  const arrow = (
    <span className="flex items-center justify-center text-ink-muted" aria-hidden="true">
      <ArrowRight className="hidden h-5 w-5 lg:block" />
      <ArrowDown className="h-5 w-5 lg:hidden" />
    </span>
  );
  return (
    <ol className="grid items-center gap-4 lg:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1.15fr)_2.5rem_minmax(0,1fr)]" aria-label="How sourcing connects">
      <li className="grid gap-3">
        {company.sourcingRegions.map((r) => (
          <div key={r} className={node}>
            <p className="text-[17px] font-bold text-ink">{r}</p>
            <p className="mt-0.5 text-[14px] text-ink-muted">Established producers</p>
          </div>
        ))}
      </li>
      <li aria-hidden="true">{arrow}</li>
      <li className="on-charcoal flex flex-col justify-center rounded-2xl px-6 py-7">
        <p className="text-[13px] font-semibold text-bronze-bright">{company.basedIn}</p>
        <p className="mt-1 text-[21px] font-bold tracking-[-0.02em]">{company.displayName}</p>
        <p className="mt-2 text-[14.5px] leading-relaxed text-graphite-muted">Specification, quotation and import</p>
      </li>
      <li aria-hidden="true">{arrow}</li>
      <li className={node}>
        <p className="text-[13px] font-semibold text-bronze-text">{company.basedIn}</p>
        <p className="mt-1 text-[17px] font-bold text-ink">Your requirement</p>
        <p className="mt-0.5 text-[14px] text-ink-muted">Workshop, production line or tool room</p>
      </li>
    </ol>
  );
}

export default function AboutPage() {
  usePageMeta(
    'About',
    `Sreeraj Tools is an India-based importer and supplier of carbide inserts and cutting tools, sourced from established producers in ${regions}.`,
  );

  const counts = countsByCategory();

  return (
    <>
      <PageHero
        id="about-title"
        eyebrow={`About ${company.displayName}`}
        title="Tooling sourced around the specification"
        lead={`${company.displayName} supplies carbide inserts and cutting tools sourced from producers in ${regions} for customers across ${company.basedIn}.`}
        media={<SampleRowBackdrop codes={Object.values(representativeInsert).map((r) => r.code)} />}
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CtaLink href="/products" arrow="tile">
            Explore Products
          </CtaLink>
          <CtaLink href="/contact#enquiry" variant="secondary">
            Request a Quote
          </CtaLink>
        </div>
      </PageHero>

      {/* ---------------------------------------------------- 1. What we do */}
      <section className="section bg-surface" aria-labelledby="what-title">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <Reveal>
            <p className="t-eyebrow">What we do</p>
            <h2 id="what-title" className="t-h2 mt-4">
              A supplier that starts from your specification
            </h2>
            <p className="t-lead mt-5 max-w-md">
              We don’t manufacture inserts. We identify the right one — from the catalogue or against your requirement — confirm the
              specification with the producer, and supply it.
            </p>
          </Reveal>
          <dl className="border-b border-rule">
            {WHAT_WE_DO.map((w, i) => (
              <Reveal key={w.title} delay={i * 50} className="grid gap-1 border-t border-rule py-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-8">
                <dt className="text-[16.5px] font-bold tracking-[-0.01em] text-ink">{w.title}</dt>
                <dd className="t-body">{w.body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------------------------------------------- 2. Product coverage */}
      <section className="section border-y border-rule bg-surface-subtle" aria-labelledby="coverage-title">
        <div className="shell">
          <SectionHeader
            id="coverage-title"
            title="Product coverage"
            lead="What the listed catalogue covers today — and the categories we source on enquiry."
          />

          <Reveal delay={80}>
            <div className="panel mt-12 overflow-hidden shadow-paper">
              <dl className="grid grid-cols-2 divide-rule-soft border-b border-rule-soft md:grid-cols-4 md:divide-x">
                {[
                  { value: totalProductCount, label: 'Listed codes' },
                  { value: totalFamilyCount, label: 'ISO families' },
                  { value: listed.length, label: 'Core operations' },
                  { value: onEnquiry.length, label: 'Categories on enquiry' },
                ].map((m, i) => (
                  <div key={m.label} className={`flex flex-col-reverse p-6 md:p-8 ${i < 2 ? 'border-b border-rule-soft md:border-b-0' : ''} ${i % 2 === 0 ? 'border-r border-rule-soft md:border-r-0' : ''}`}>
                    <dt className="mt-2 text-[14px] font-semibold text-ink-muted">{m.label}</dt>
                    <dd className="tabnum text-[clamp(2.25rem,1.8rem+1.6vw,3.25rem)] font-extrabold leading-none tracking-[-0.045em] text-ink">{m.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="p-6 md:p-8">
                <p className="text-[15px] font-bold text-ink">Listed codes by operation</p>
                <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-surface-subtle" aria-hidden="true">
                  {listed.map((c) => (
                    <span key={c.id} className="h-full border-r-2 border-surface-card last:border-r-0" style={{ width: `${(counts[c.id] / totalProductCount) * 100}%`, background: toneFor(c.id).hex }} />
                  ))}
                </div>
                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-5">
                  {listed.map((c) => (
                    <li key={c.id}>
                      <Link href={`/products/${c.slug}`} className="group flex items-baseline gap-2.5 rounded-sm">
                        <span className="h-2.5 w-2.5 shrink-0 translate-y-[1px] rounded-full" style={{ background: toneFor(c.id).hex }} aria-hidden="true" />
                        <span className="text-[14.5px] font-semibold text-ink underline-offset-4 group-hover:underline">{c.short}</span>
                        <span className="t-meta">{counts[c.id]}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-rule-soft pt-5 text-[14.5px] text-ink-soft">
                  <span className="font-bold text-ink">Sourced on enquiry:</span> {listSentence(onEnquiry.map((c) => c.name))}.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- 3. How sourcing connects */}
      <section className="section bg-surface" aria-labelledby="connects-title">
        <div className="shell">
          <SectionHeader
            id="connects-title"
            title="How sourcing connects"
            lead={`Established producers in ${regions}, and one point of contact in ${company.basedIn} for the specification, the quotation and the import.`}
          />
          <Reveal delay={80} className="mt-12">
            <SourcingFlow />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- 4. Who we supply */}
      <section className="section border-t border-rule bg-surface-card" aria-labelledby="who-title">
        <div className="shell">
          <SectionHeader
            id="who-title"
            title="Who we supply"
            lead={`${capitalise(numberWord(WHO.length))} kinds of buyers, each starting from a different kind of requirement.`}
          />
          <div className="mt-12 border-b border-rule">
            <div className="hidden grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.8fr)] gap-8 pb-3 md:grid" aria-hidden="true">
              <span className="t-label">Who</span>
              <span className="t-label">What matters</span>
              <span className="t-label">Typical request</span>
            </div>
            <ul>
              {WHO.map((w, i) => (
                <Reveal key={w.title} as="li" delay={i * 50} className="grid gap-2 border-t border-rule py-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-8">
                  <h3 className="text-[18px] font-bold leading-snug tracking-[-0.015em] text-ink">{w.title}</h3>
                  <p className="t-body">{w.body}</p>
                  <p className="text-[14.5px] font-semibold text-bronze-text">
                    <span className="sr-only">Typical request: </span>
                    {w.typical}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- 5. Custom sourcing */}
      <section className="on-charcoal section" aria-labelledby="custom-title">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
          <Reveal>
            <p className="text-[15px] font-semibold text-bronze-bright">Custom sourcing</p>
            <h2 id="custom-title" className="t-h2 mt-4 text-graphite-ink">
              When the product isn’t listed
            </h2>
            <p className="mt-5 max-w-lg text-[16.5px] leading-relaxed text-graphite-muted">
              Uncommon sizes, special geometries and discontinued part numbers. Send what you have and we work back to a specification —
              then confirm what can be sourced before we quote.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="/custom-sourcing" variant="primary-inverse" arrow="tile">
                How custom sourcing works
              </CtaLink>
              <CtaLink href="/contact?category=special#enquiry" variant="secondary-inverse">
                Start a request
              </CtaLink>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ul className="grid grid-cols-2 gap-3">
              {['Product code', 'Technical drawing', 'Photograph', 'Physical sample'].map((t, i) => (
                <li key={t} className="rounded-xl border border-graphite-line bg-graphite-soft px-5 py-5">
                  <span className="font-mono text-[12px] font-medium text-bronze-bright">{String(i + 1).padStart(2, '0')}</span>
                  <p className="mt-2 text-[15.5px] font-bold text-graphite-ink">{t}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- 6. Background */}
      <section className="section bg-surface" aria-labelledby="background-title">
        <div className="shell">
          <Reveal>
            <div className="grid gap-8 border-y border-rule py-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16 md:py-12">
              <div>
                <p className="t-eyebrow">Background</p>
                <h2 id="background-title" className="t-h2 mt-4 text-[clamp(1.75rem,1.3rem+1.5vw,2.375rem)]">
                  A family business with a background in industry
                </h2>
              </div>
              <div className="t-lead space-y-4 self-end">
                <p>{company.parentFirm.relationship}</p>
                <p>{company.parentFirm.note}</p>
                <p>That background shapes how we work: practical, specification-first and straightforward with the people we supply.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
