import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import Reveal from '../reveal';
import SectionHeader from './section-header';
import { ENQUIRY_ILLUSTRATIONS } from './enquiry-illustrations';
import { categories, type Category } from '../../../../shared/catalog';

const enquiryOnly = categories.filter((c) => c.enquiryOnly);

/** One category: animated drawing plus actions. Hover or focus anywhere in the row runs the drawing's 3D interaction. */
function EnquiryRow({ c }: { c: Category }) {
  const [active, setActive] = useState(false);
  const Illustration = ENQUIRY_ILLUSTRATIONS[c.id];
  return (
    <article
      className="group grid h-full gap-6 border-t border-rule py-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center lg:grid-cols-1 lg:content-start lg:gap-7"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <div className="aspect-[8/5] rounded-xl border border-rule bg-surface-stage p-4 transition-colors duration-200 group-focus-within:border-accent-line group-hover:border-accent-line md:p-6">
        {Illustration && <Illustration active={active} />}
      </div>

      <div>
        <p className="t-meta flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-bronze" aria-hidden="true" />
          {c.needsConfirmation ? 'Range being finalised' : 'Sourced on enquiry'}
        </p>
        <h3 className="t-h3 mt-2.5">{c.name}</h3>
        <p className="t-body mt-2.5">{c.description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href={`/quote?category=${c.id}`} className="link-arrow text-[15px]">
            Share a requirement
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`/products/${c.slug}`}
            className="text-[14.5px] font-semibold text-ink-muted underline-offset-[5px] transition-colors hover:text-accent-ink hover:underline"
            aria-label={`View the ${c.name} category`}
          >
            View category
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * Categories sourced on enquiry. Deliberately not cards: open rows on white,
 * with a drawing where the catalogue grid has a product, and no counts —
 * nothing here is listed or held in stock.
 */
export default function EnquiryCategories() {
  return (
    <section className="section bg-surface-card" aria-labelledby="beyond-title">
      <div className="shell">
        <SectionHeader
          id="beyond-title"
          title="Beyond the listed catalogue"
          lead="Share the application, drawing, sample or existing code and we will assess the sourcing requirement."
        />

        <div className="mt-12 grid gap-x-12 gap-y-2 lg:grid-cols-2">
          {enquiryOnly.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 80}>
              <EnquiryRow c={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
