import { useSearch } from 'wouter';
import { usePageMeta } from '../lib/usePageMeta';
import RfqForm from '../components/rfq-form';
import { categories, type CategoryId } from '../../../shared/catalog';
import type { RfqInput } from '../../../shared/rfq';

export default function QuotePage() {
  usePageMeta(
    'Request a Quote',
    'Send your carbide insert or cutting tool requirement to ShreeRaj Tools. Share an ISO code, drawing or sample and receive pricing, availability and lead time.',
  );

  const search = useSearch();
  const requested = new URLSearchParams(search).get('category');
  const valid = categories.find((c) => c.id === requested)?.id as CategoryId | undefined;

  return (
    <>
      <section className="bg-night py-14 text-night-ink md:py-16">
        <div className="shell max-w-3xl">
          <span className="accent-rule-dark mb-5" />
          <h1 className="text-h1">Request a quote</h1>
          <p className="mt-4 text-[17px] leading-relaxed text-night-muted">
            Tell us what you need and we will come back with pricing, available grades and lead time.
            If you do not know the exact code, a drawing, a photograph or a description of the job is
            enough to start.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_300px] lg:items-start">
          <RfqForm defaultCategory={valid as RfqInput['productCategory'] | undefined} />

          <aside className="rounded-lg border border-rule bg-surface-subtle p-6">
            <h2 className="label mb-4 text-ink-muted">What helps us quote faster</h2>
            <ul className="space-y-3 text-[15px] leading-relaxed text-ink-soft">
              <li>The ISO code from your current insert box, if you have it.</li>
              <li>The material you are cutting and the operation.</li>
              <li>Roughly how many you need, and how often.</li>
              <li>A drawing or photograph for anything non-standard.</li>
            </ul>
            <hr className="my-6 border-rule" />
            <p className="text-[14px] leading-relaxed text-ink-muted">
              We do not publish prices online. Pricing depends on grade, quantity and lead time, so we
              quote against your actual requirement.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
