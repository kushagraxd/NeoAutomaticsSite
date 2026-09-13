import type { ReactNode } from 'react';
import { Link } from 'wouter';
import {
  ArrowRight, ArrowUpRight, Camera, Check, FileSearch, Hash, MessageSquareText, Package, PenTool,
  Ship, Receipt, X, type LucideIcon,
} from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import Reveal from '../components/reveal';
import { categories } from '../../../shared/catalog';
import type { SourcingBasis } from '../../../shared/rfq';

const enquiryHref = (basis?: SourcingBasis) =>
  `/contact?${basis ? `basis=${basis}&` : ''}category=special#enquiry`;

const INPUTS: Array<{ basis: SourcingBasis; icon: LucideIcon; title: string; body: string; example: ReactNode; cta: string }> = [
  {
    basis: 'code',
    icon: Hash,
    title: 'Product code',
    body: 'The ISO designation printed on the box you already buy. It tells us shape, size, tolerance and corner radius in one line.',
    example: (
      <span className="font-mono text-[13.5px] text-ink">
        CNMG120408<span className="text-brand-bright">-MA</span>
        <span className="ml-2 font-sans text-[12.5px] text-ink-muted">any brand’s code</span>
      </span>
    ),
    cta: 'Share a product code',
  },
  {
    basis: 'drawing',
    icon: PenTool,
    title: 'Technical drawing',
    body: 'A dimensioned drawing for special geometries, form tools or anything that doesn’t follow a standard designation.',
    example: (
      <span className="flex flex-wrap gap-1.5">
        {['PDF', 'DXF', 'DWG', 'STEP'].map((f) => (
          <span key={f} className="rounded border border-rule-strong px-1.5 py-0.5 font-mono text-[11.5px] text-ink-soft">{f}</span>
        ))}
      </span>
    ),
    cta: 'Upload a drawing',
  },
  {
    basis: 'photo',
    icon: Camera,
    title: 'Photograph',
    body: 'A clear close-up of the insert or the worn cutting edge. Useful when the code has worn off or the box is gone.',
    example: <span className="text-[13.5px] text-ink-soft">Close-up, with a ruler or coin for scale</span>,
    cta: 'Send a photograph',
  },
  {
    basis: 'sample',
    icon: Package,
    title: 'Physical sample',
    body: 'The insert you use today. We measure and match against it, then confirm the specification with you before quoting.',
    example: <span className="text-[13.5px] text-ink-soft">One piece is usually enough to start</span>,
    cta: 'Arrange a sample',
  },
];

const STEPS: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: MessageSquareText,
    title: 'Share the requirement',
    body: 'Send a code, drawing, photograph or sample, with the quantity, workpiece material and where it needs to be delivered.',
  },
  {
    icon: FileSearch,
    title: 'Technical matching & supplier review',
    body: 'We read the geometry and grade requirement and review it with producers in China and Taiwan. If we can’t find a suitable match, we tell you.',
  },
  {
    icon: Receipt,
    title: 'Quote & lead-time confirmation',
    body: 'You receive a quotation for the specification we can source, with pricing and a lead time confirmed with the supplier — before you commit.',
  },
  {
    icon: Ship,
    title: 'Order coordination & delivery support',
    body: 'Once you confirm, we coordinate the order, import and dispatch, and keep you informed as it progresses.',
  },
];

/** Technical drawing of a triangular insert: inscribed circle, 60° corner, corner radius and thickness. */
function BlueprintInsert() {
  const line = { stroke: 'var(--blueprint-line)' };
  const faint = { stroke: 'var(--blueprint-faint)' };
  const text = { fill: 'var(--blueprint-text)', fontFamily: "'Geist Mono', ui-monospace, monospace", fontSize: 13 };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[rgba(var(--brand-rgb),0.28)] bg-[rgba(var(--night-rgb),0.72)] shadow-glow">
      <div className="absolute inset-0 blueprint-fine" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />
      <svg
        viewBox="0 0 520 440"
        className="relative w-full"
        role="img"
        aria-label="Technical drawing of a triangular insert showing its inscribed circle, 60 degree corner, corner radius and thickness"
      >
        <defs>
          <marker id="bp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" style={{ fill: 'var(--blueprint-line)' }} />
          </marker>
        </defs>

        {/* centre lines */}
        <g fill="none" strokeWidth="1" strokeDasharray="10 5 2 5" style={faint}>
          <path d="M260 34 V350" />
          <path d="M150 233 H370" />
        </g>

        {/* insert outline, inscribed circle, hole */}
        <path d="M260 60 L410 319.8 L110 319.8 Z" fill="rgba(var(--brand-rgb),0.06)" strokeWidth="2" strokeLinejoin="round" style={line} />
        <circle cx="260" cy="233.2" r="86.6" fill="none" strokeWidth="1.2" strokeDasharray="5 5" style={line} />
        <circle cx="260" cy="233.2" r="21" fill="none" strokeWidth="1.6" style={line} />

        {/* 60° corner */}
        <path d="M281 96.4 A42 42 0 0 1 239 96.4" fill="none" strokeWidth="1.2" style={{ stroke: 'var(--gold)' }} />
        <text x="260" y="128" textAnchor="middle" style={text}>60°</text>

        {/* corner radius callout */}
        <path d="M402 312 L462 262 H500" fill="none" strokeWidth="1" style={line} />
        <circle cx="402" cy="312" r="3" style={{ fill: 'var(--gold)' }} />
        <text x="468" y="254" style={text}>R0.8</text>

        {/* inscribed circle dimension */}
        <g fill="none" strokeWidth="1" style={faint}>
          <path d="M173.4 233 V366" />
          <path d="M346.6 233 V366" />
        </g>
        <path d="M177 360 H343" fill="none" strokeWidth="1.2" markerStart="url(#bp-arrow)" markerEnd="url(#bp-arrow)" style={line} />
        <text x="260" y="352" textAnchor="middle" style={text}>IC 9.525</text>

        {/* side view with thickness */}
        <rect x="110" y="386" width="300" height="22" rx="2" fill="rgba(var(--brand-rgb),0.06)" strokeWidth="1.6" style={line} />
        <path d="M424 386 H440 M424 408 H440" fill="none" strokeWidth="1" style={faint} />
        <path d="M434 389 V405" fill="none" strokeWidth="1.2" markerStart="url(#bp-arrow)" markerEnd="url(#bp-arrow)" style={line} />
        <text x="446" y="402" style={text}>S 4.76</text>
      </svg>
      <div className="relative flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(var(--brand-rgb),0.18)] px-5 py-3">
        <span className="font-mono text-[12px] text-ink-muted">Top &amp; side view · TNMG1604 geometry</span>
        <span className="font-mono text-[12px] text-ink-muted">ISO 1832</span>
      </div>
    </div>
  );
}

export default function CustomSourcingPage() {
  usePageMeta(
    'Custom Sourcing',
    'Send a product code, drawing, photograph or sample and ShreeRaj Tools will match standard, uncommon and special-design carbide inserts from producers in China and Taiwan.',
  );

  const enquiryOnly = categories.filter((c) => c.enquiryOnly);

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-night">
        <div className="pointer-events-none absolute inset-0 blueprint" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 glow-brand" aria-hidden="true" />
        <div className="shell relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">Custom sourcing</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-[clamp(2.6rem,5.6vw,4.6rem)] font-semibold leading-[1] tracking-[-0.045em] text-ink">
                The insert you need, <span className="accent-word text-brand-bright">even when it isn’t listed</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-[18px] leading-relaxed text-ink-soft">
                Standard geometries, uncommon sizes and special designs. Send us what you have — a code, a drawing, a photo or the
                insert itself — and we work back to a specification, check it with producers in China and Taiwan, and tell you
                plainly what we can source.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
                <Link href={enquiryHref()} className="btn-primary btn-lg group">
                  Start a sourcing request
                  <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link href="/products" className="btn-outline btn-lg">Browse the catalogue</Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <BlueprintInsert />
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- What we need from you */}
      <section className="relative bg-surface py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">What we need from you</p>
            <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-2xl text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
                Any one of these <span className="accent-word text-brand-bright">is enough to start</span>
              </h2>
              <p className="max-w-sm text-[16px] leading-relaxed text-ink-muted">
                Choose the one you have. The more you can share, the more precisely we can match and quote.
              </p>
            </div>
          </Reveal>

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {INPUTS.map((input, i) => (
              <Reveal key={input.basis} as="li" delay={i * 80} className="h-full">
                <Link href={enquiryHref(input.basis)} className="card-interactive group flex h-full flex-col p-6 md:p-7">
                  <span className="icon-badge transition-colors duration-300 group-hover:bg-brand group-hover:text-white group-focus-visible:bg-brand group-focus-visible:text-white">
                    <input.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-[21px] font-semibold tracking-[-0.02em] text-ink">{input.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-muted">{input.body}</p>
                  <div className="mt-5 rounded-xl border border-rule bg-surface-subtle px-3.5 py-3">
                    <p className="label text-ink-muted">Example</p>
                    <div className="mt-1.5">{input.example}</div>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14.5px] font-semibold text-brand-bright">
                    {input.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------- How custom sourcing works */}
      <section className="relative overflow-hidden border-y border-rule bg-surface-subtle py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 blueprint opacity-40" aria-hidden="true" />
        <div className="shell relative">
          <Reveal>
            <p className="eyebrow">How custom sourcing works</p>
            <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
              Four steps, <span className="accent-word text-brand-bright">one point of contact</span>
            </h2>
          </Reveal>

          <ol className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <span
              className="pointer-events-none absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-transparent via-[rgba(var(--brand-rgb),0.5)] to-transparent lg:block"
              aria-hidden="true"
            />
            {STEPS.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 90} className="relative">
                <div className="flex items-center gap-3">
                  <span className="step-node">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[12px] font-medium tracking-[0.12em] text-gold">STEP {i + 1}</span>
                </div>
                <div className="card mt-5 h-[calc(100%-4.25rem)] p-6">
                  <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.02em] text-ink">{s.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------------- Expectations */}
      <section className="bg-surface py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">Straight answers</p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
              What we can and <span className="accent-word text-brand-bright">cannot promise</span>
            </h2>
            <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-ink-muted">
              Sourcing flexibility is not the same as guaranteed availability, and we would rather be clear about that from the start.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal delay={80}>
              <div className="card h-full p-6 md:p-7">
                <p className="flex items-center gap-2 text-[16px] font-semibold text-ink">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(var(--success-rgb),0.14)]">
                    <Check className="h-4 w-4 text-success" aria-hidden="true" />
                  </span>
                  We will
                </p>
                <ul className="mt-5 space-y-3.5 text-[15px] leading-relaxed text-ink-soft">
                  <li>Check your requirement against the producers we work with.</li>
                  <li>Tell you the specification, quantity and lead time we can actually get.</li>
                  <li>Say so plainly when something isn’t available to us.</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="card h-full p-6 md:p-7">
                <p className="flex items-center gap-2 text-[16px] font-semibold text-ink">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-panel">
                    <X className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                  </span>
                  We won’t
                </p>
                <ul className="mt-5 space-y-3.5 text-[15px] leading-relaxed text-ink-soft">
                  <li>Quote a specification we haven’t confirmed with a supplier.</li>
                  <li>Promise a lead time before the source is confirmed.</li>
                  <li>Substitute a different grade or geometry without telling you.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- Categories sourced on enquiry */}
      <section className="border-t border-rule bg-surface py-14">
        <div className="shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-[16px] text-ink-soft">
            <span className="font-semibold text-ink">Also sourced on enquiry</span> — categories we don’t hold a fixed list for.
          </p>
          <ul className="flex flex-wrap gap-2">
            {enquiryOnly.map((c) => (
              <li key={c.id}>
                <Link href={`/products/${c.slug}`} className="chip chip-link">
                  {c.name} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------------------------------------------- CTA */}
      <section className="bg-surface pb-24 md:pb-28">
        <div className="shell">
          <Reveal>
            <div className="cta-band">
              <div className="pointer-events-none absolute inset-0 blueprint opacity-60" aria-hidden="true" />
              <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
                    Start with what you have
                  </h2>
                  <p className="mt-3 max-w-xl text-[16.5px] leading-relaxed text-ink-soft">
                    Attach a drawing or photograph directly to the enquiry form — up to 10 MB.
                  </p>
                </div>
                <Link href={enquiryHref()} className="btn-primary btn-lg group shrink-0">
                  Start a sourcing request
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
