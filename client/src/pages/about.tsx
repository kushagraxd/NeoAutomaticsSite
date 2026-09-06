import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import { company } from '../../../shared/company';

export default function AboutPage() {
  usePageMeta(
    'About Sree Raj Tools',
    'Sree Raj Tools is an India-based importer and supplier of carbide inserts and cutting tools, sourced from established producers in China and Taiwan.',
  );

  return (
    <>
      <section className="bg-graphite py-14 text-graphite-ink md:py-20">
        <div className="shell max-w-3xl">
          <span className="accent-rule mb-5" />
          <h1 className="text-[38px] sm:text-[50px]">About {company.displayName}</h1>
          <p className="mt-5 text-[18px] leading-relaxed text-graphite-muted">{company.summary}</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="shell max-w-3xl">
          <h2 className="text-[30px]">What we do</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            We supply carbide inserts and cutting tools to workshops, job shops and manufacturers in
            India. We are a supplier, not a manufacturer: we source from established producers in{' '}
            {company.sourcingRegions.join(' and ')}, import into India, and supply against your
            requirement.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            Our catalogue covers the geometries that come up most often — turning, milling, drilling,
            grooving and threading inserts in recognised ISO designations. Beyond that list, we source
            to order: send a code, a drawing or a sample and we will find out what can be supplied.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            We quote rather than publish prices, because the right price depends on grade, quantity and
            lead time. It also means you get a specification that matches the job rather than the
            nearest thing on a list.
          </p>

          <h2 className="mt-14 text-[30px]">How we work</h2>
          <ul className="mt-5 space-y-4">
            {[
              ['One point of contact', 'You deal with us for sourcing, import and supply, rather than coordinating with overseas suppliers yourself.'],
              ['Codes you already use', 'We work from the ISO designation on your current insert, so there is no cross-referencing to a proprietary system.'],
              ['Standard and special', 'Common geometries alongside non-standard sizes and inserts made to a drawing.'],
              ['Straight answers', 'If we cannot source something, or cannot confirm a lead time, we say so.'],
            ].map(([title, body]) => (
              <li key={title} className="border-l-2 border-accent-strong pl-5">
                <h3 className="text-[19px]">{title}</h3>
                <p className="mt-1.5 text-[16px] leading-relaxed text-ink-soft">{body}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-14 text-[30px]">Our background</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            {company.displayName} is a new business, started by the family behind{' '}
            <strong className="font-semibold text-ink">{company.parentFirm.name}</strong>.
          </p>
          <div className="mt-5 border border-rule bg-surface-subtle p-6">
            <p className="text-[16px] leading-relaxed text-ink-soft">
              {company.parentFirm.name} is a separate business and a separate legal entity.
              Its work, capabilities and credentials are its own — they are not
              {' '}{company.displayName}&rsquo;s, and nothing on this site should be read as a claim
              about {company.parentFirm.name}.
            </p>
          </div>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
            As a newer business we would rather earn confidence through how we quote and supply than
            through claims we cannot yet stand behind. You will not find certifications, customer
            counts or performance statistics on this site, because we are not in a position to state
            any.
          </p>
        </div>
      </section>

      <section className="border-t border-rule bg-surface-subtle py-14">
        <div className="shell flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[28px]">Start with a requirement</h2>
            <p className="mt-2 max-w-xl text-[16px] text-ink-soft">
              Send us a code or a drawing and see how we respond.
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
