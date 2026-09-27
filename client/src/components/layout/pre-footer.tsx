import { CtaLink } from '../cta';

const INPUTS = ['ISO code', 'Drawing', 'Photograph', 'Sample'];

/**
 * Conversion band shown directly above the footer on every page except those
 * that already end with the enquiry form or their own sourcing CTA.
 */
export default function PreFooter() {
  return (
    <section className="border-t border-rule bg-surface-subtle" aria-labelledby="prefooter-title">
      <div className="shell grid gap-8 py-14 md:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
        <div>
          <span className="block h-[3px] w-10 rounded-full bg-bronze" aria-hidden="true" />
          <h2
            id="prefooter-title"
            className="mt-6 max-w-[26ch] text-[clamp(1.625rem,1.2rem+1.4vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.025em] text-ink"
          >
            Have an insert code, drawing or sourcing requirement?
          </h2>
          <p className="t-lead mt-3 max-w-xl">Send the specification and receive a requirement-based quotation.</p>
          <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] font-medium text-ink-soft" aria-label="What you can send">
            {INPUTS.map((t, i) => (
              <li key={t} className="flex items-center gap-4">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-bronze" aria-hidden="true" />}
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <CtaLink href="/contact#enquiry" arrow="tile">
            Request a Quote
          </CtaLink>
          <CtaLink href="/products" variant="secondary">
            Browse Products
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
