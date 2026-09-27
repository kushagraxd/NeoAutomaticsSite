import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight, Camera, Check, FileText, Hash, Image as ImageIcon, Package, PenTool, type LucideIcon } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import Reveal from '../components/reveal';
import PageHero from '../components/page-hero';
import SectionHeader from '../components/home/section-header';
import { DrawingBackdrop } from '../components/hero-backdrops';
import { CtaLink } from '../components/cta';
import { categories } from '../../../shared/catalog';
import { MAX_UPLOAD_BYTES, type SourcingBasis } from '../../../shared/rfq';
import { company } from '../../../shared/company';
import { listSentence } from '../lib/number-words';

const enquiryHref = (basis?: SourcingBasis) => `/contact?${basis ? `basis=${basis}&` : ''}category=special#enquiry`;

const MAX_MB = Math.round(MAX_UPLOAD_BYTES / (1024 * 1024));
const regions = listSentence(company.sourcingRegions);

/*
 * Each card takes its own jewel tone on hover and focus — restrained, and only
 * on interaction, so the page stays one system at rest. `tone` is the fill,
 * `light` the lighter shade used for text on dark surfaces.
 */
const TONES = {
  plum: { tone: '90, 45, 130', light: '205, 182, 240' },
  violet: { tone: '107, 63, 160', light: '196, 170, 238' },
  emerald: { tone: '47, 125, 98', light: '140, 214, 184' },
  sapphire: { tone: '45, 92, 138', light: '150, 190, 232' },
} as const;

const INPUTS: Array<{ basis: SourcingBasis; icon: LucideIcon; title: string; body: string; example: ReactNode; cta: string; tone: keyof typeof TONES }> = [
  {
    basis: 'code',
    tone: 'plum',
    icon: Hash,
    title: 'Product code',
    body: 'The ISO designation printed on the box you already buy. It gives shape, size, tolerance and corner radius in one line.',
    example: (
      <span className="font-mono text-[14px] font-semibold text-ink">
        CNMG120408<span className="text-bronze-text">-MA</span>
      </span>
    ),
    cta: 'Share a product code',
  },
  {
    basis: 'drawing',
    tone: 'violet',
    icon: PenTool,
    title: 'Technical drawing',
    body: 'A dimensioned drawing for special geometries, form tools or anything that doesn’t follow a standard designation.',
    example: (
      <span className="flex flex-wrap gap-1.5">
        {['PDF', 'DWG', 'DXF', 'STEP'].map((f) => (
          <span key={f} className="code-chip bg-surface-card">
            {f}
          </span>
        ))}
      </span>
    ),
    cta: 'Upload a drawing',
  },
  {
    basis: 'photo',
    tone: 'emerald',
    icon: Camera,
    title: 'Photograph',
    body: 'A clear close-up of the insert or the worn cutting edge — useful when the code has worn off or the box is gone.',
    example: <span className="text-[14px] text-ink-soft">Close-up, with a ruler or coin for scale</span>,
    cta: 'Send a photograph',
  },
  {
    basis: 'sample',
    tone: 'sapphire',
    icon: Package,
    title: 'Physical sample',
    body: 'The insert you use today. We measure and match against it, then confirm the specification with you before quoting.',
    example: <span className="text-[14px] text-ink-soft">One piece is usually enough to start</span>,
    cta: 'Arrange a sample',
  },
];

const STEPS = [
  {
    title: 'Share the requirement',
    body: 'Send a code, drawing, photograph or sample, with the quantity, workpiece material and delivery location.',
  },
  {
    title: 'Technical matching and supplier review',
    body: `We read the geometry and grade requirement and review it with producers in ${regions}.`,
  },
  {
    title: 'Quote and lead-time confirmation',
    body: 'You receive a quotation for the specification we can source, with pricing and a lead time confirmed with the supplier.',
  },
  {
    title: 'Order coordination and delivery support',
    body: 'Once you confirm, we coordinate the order, import and dispatch, and keep you informed as it progresses.',
  },
];

const PRACTICES = [
  {
    title: 'Requirements are checked before quotation',
    body: 'Your code, drawing or sample is reviewed against the geometry and grade you need before any price is given.',
  },
  {
    title: 'Specification and availability are confirmed',
    body: `We confirm what producers in ${regions} can supply, and tell you plainly when a match isn’t available.`,
  },
  {
    title: 'Lead times follow confirmation',
    body: 'A lead time is given once the source is confirmed, so the date you plan around is one the supplier has agreed.',
  },
  {
    title: 'No substitution without your approval',
    body: 'If a different grade or geometry is proposed, you see it and approve it before anything is ordered.',
  },
];

const ATTACHMENTS: Array<{ basis: SourcingBasis; icon: LucideIcon; title: string; detail: string }> = [
  { basis: 'code', icon: Hash, title: 'Product code', detail: 'Typed into the form' },
  { basis: 'drawing', icon: FileText, title: 'Technical drawing', detail: 'PDF · DWG · DXF · STEP/STP' },
  { basis: 'photo', icon: ImageIcon, title: 'Photograph', detail: 'JPG · PNG' },
  { basis: 'sample', icon: Package, title: 'Physical sample', detail: 'Arranged after your enquiry' },
];

export default function CustomSourcingPage() {
  usePageMeta(
    'Custom Sourcing',
    `Send a product code, drawing, photograph or sample and Sreeraj Tools will match standard, uncommon and special-design carbide inserts from producers in ${regions}.`,
  );

  const enquiryOnly = categories.filter((c) => c.enquiryOnly);

  return (
    <>
      <PageHero
        id="sourcing-title"
        eyebrow="Custom sourcing"
        title="Source the insert your application requires"
        lead="Send an ISO code, technical drawing, photograph or sample. We will review the specification and confirm what can be sourced before quoting."
        media={<DrawingBackdrop />}
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CtaLink href={enquiryHref()} arrow="tile">
            Start a Sourcing Request
          </CtaLink>
          <CtaLink href="/products" variant="secondary">
            Browse Products
          </CtaLink>
        </div>
      </PageHero>

      {/* -------------------------------------------------- What we need from you */}
      <section className="section bg-surface" aria-labelledby="inputs-title">
        <div className="shell">
          <SectionHeader
            id="inputs-title"
            title="What we need from you"
            lead="Any one of these is enough to start the review. The more you can share, the more precisely we can match and quote."
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {INPUTS.map((input, i) => (
              <Reveal key={input.basis} as="li" delay={i * 70} className="h-full">
                <Link
                  href={enquiryHref(input.basis)}
                  className="need-card group flex h-full flex-col p-6 md:p-7"
                  style={{ '--tone': TONES[input.tone].tone, '--tone-light': TONES[input.tone].light } as CSSProperties}
                >
                  <span className="need-icon">
                    <input.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="t-h3 mt-6 text-[20px]">{input.title}</h3>
                  <p className="t-body mt-2.5 text-[15px]">{input.body}</p>
                  <div className="need-example mt-5 rounded-lg border px-3.5 py-3">
                    <p className="t-label">Example</p>
                    <div className="mt-1.5">{input.example}</div>
                  </div>
                  <span className="need-action mt-auto pt-6 text-[14.5px]">
                    {input.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------ How custom sourcing works */}
      <section className="section border-y border-rule bg-surface-subtle" aria-labelledby="process-title">
        <div className="shell">
          <SectionHeader
            id="process-title"
            title="How custom sourcing works"
            lead="Four steps, with the specification confirmed before anything is quoted."
          />

          <Reveal delay={80}>
            <ol className="panel mt-12 grid overflow-hidden shadow-paper lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className="relative border-b border-rule-soft p-6 last:border-b-0 md:p-8 lg:border-b-0 lg:border-r lg:last:border-r-0"
                >
                  <p className="text-[42px] font-bold leading-none tracking-[-0.04em] text-bronze-text">
                    <span className="sr-only">Step </span>
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="t-h3 mt-6 text-[19px]">{s.title}</h3>
                  <p className="t-body mt-2.5 text-[15px]">{s.body}</p>
                  {i < STEPS.length - 1 && (
                    <span
                      className="absolute -right-3.5 top-10 z-10 hidden h-7 w-7 items-center justify-center rounded-full border border-rule bg-surface-card text-ink-muted lg:flex"
                      aria-hidden="true"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>

          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-[15.5px] text-ink-soft">
              <span className="font-bold text-ink">Also sourced on enquiry</span> — categories without a fixed list.
            </p>
            <ul className="flex flex-wrap gap-2">
              {enquiryOnly.map((c) => (
                <li key={c.id}>
                  <Link href={`/products/${c.slug}`} className="chip h-9 px-3.5 transition-colors hover:border-accent-line hover:text-accent-ink">
                    {c.name} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Sourcing practice */}
      <section className="on-charcoal section" aria-labelledby="practice-title">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <p className="text-[15px] font-semibold text-bronze-bright">Sourcing practice</p>
            <h2 id="practice-title" className="t-h2 mt-4 text-graphite-ink">
              Transparent from the first message
            </h2>
            <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-graphite-muted">
              Sourcing works best when everyone knows what has been confirmed. This is how every request is handled.
            </p>
          </Reveal>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {PRACTICES.map((p, i) => (
              <Reveal key={p.title} as="li" delay={(i % 2) * 80} className="border-t border-graphite-line py-7">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amethyst text-ivory" aria-hidden="true">
                  <Check className="h-4 w-4" />
                </span>
                <h3 className="mt-4 text-[17.5px] font-bold leading-snug tracking-[-0.015em] text-graphite-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-graphite-muted">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------- Attachment-led CTA */}
      <section className="section bg-surface-subtle" aria-labelledby="start-title">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <p className="t-eyebrow">Start a sourcing request</p>
            <h2 id="start-title" className="t-h2 mt-4">
              Start with the information already available
            </h2>
            <p className="t-lead mt-5 max-w-lg">
              A product code, drawing, photograph or sample is enough to begin the sourcing review.
            </p>
            <div className="mt-9 flex flex-col items-start gap-3">
              <CtaLink href={enquiryHref()} arrow="tile">
                Start a Sourcing Request
              </CtaLink>
              <p className="flex items-center gap-1.5 text-[13.5px] text-ink-muted">
                Opens the enquiry form with custom sourcing selected
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="panel overflow-hidden shadow-raised">
              <div className="flex items-center justify-between gap-4 border-b border-rule-soft px-6 py-4">
                <p className="text-[15px] font-bold text-ink">What you can send</p>
                <span className="t-meta">Up to {MAX_MB} MB per file</span>
              </div>
              <ul>
                {ATTACHMENTS.map((a) => (
                  <li key={a.basis} className="border-b border-rule-soft last:border-b-0">
                    <Link
                      href={enquiryHref(a.basis)}
                      className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-accent-soft focus-visible:bg-accent-soft"
                    >
                      <span className="icon-tile h-10 w-10 group-hover:border-accent group-hover:bg-accent group-hover:text-ivory">
                        <a.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-bold text-ink">{a.title}</span>
                        <span className={`block text-[13.5px] text-ink-muted ${a.basis === 'drawing' || a.basis === 'photo' ? 'font-mono' : ''}`}>{a.detail}</span>
                      </span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-ink-muted transition-transform duration-200 group-hover:translate-x-[3px] group-hover:text-accent-ink"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="border-t border-rule-soft bg-surface px-6 py-3.5 text-[13px] text-ink-muted">
                Accepted files: <span className="font-mono">PDF, XLS/XLSX, JPG/PNG, DWG, DXF, STEP/STP</span> — attach one to the enquiry form.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
