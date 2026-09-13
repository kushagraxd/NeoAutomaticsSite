import { Link, useSearch } from 'wouter';
import { Plus, X } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import RfqForm from '../components/rfq-form';
import InsertRender from '../components/insert-render';
import { useEnquiry } from '../lib/enquiry-list';
import { categories, categoryById, type CategoryId } from '../../../shared/catalog';
import type { RfqInput } from '../../../shared/rfq';

export default function QuotePage() {
  usePageMeta(
    'Request a Quote',
    'Send your carbide insert or cutting tool requirement to ShreeRaj Tools. Share an ISO code, drawing or sample and receive pricing, availability and lead time.',
  );

  const search = useSearch();
  const params = new URLSearchParams(search);
  const requested = params.get('category');
  const code = params.get('code') ?? undefined;
  const { items, remove, clear } = useEnquiry();

  const fromUrl = categories.find((c) => c.id === requested)?.id as CategoryId | undefined;
  const defaultCategory = (items[0]?.category ?? fromUrl) as RfqInput['productCategory'] | undefined;

  return (
    <>
      <section className="relative overflow-hidden bg-night py-14 text-night-ink md:py-16">
        <div className="absolute inset-0 night-glow" aria-hidden="true" />
        <div className="shell relative max-w-3xl">
          <p className="eyebrow-dark mb-5">Request a quote</p>
          <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
            Tell us what you need. <span className="accent-word text-accent">We’ll price it.</span>
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-night-muted">
            We come back with pricing, available grades and lead time. If you don’t know the exact code, a drawing, a
            photograph or a description of the job is enough to start.
          </p>
        </div>
      </section>

      <section className="bg-surface-subtle py-12 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="space-y-6">
            {items.length > 0 && (
              <div className="overflow-hidden rounded-2xl border border-rule bg-white shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-6 py-4">
                  <div>
                    <p className="text-[16px] font-semibold text-ink">Inserts in this enquiry</p>
                    <p className="text-[13.5px] text-ink-muted">
                      {items.length} code{items.length === 1 ? '' : 's'} will be sent with your message.
                    </p>
                  </div>
                  <Link href="/products" className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-accent-ink hover:underline">
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add more
                  </Link>
                </div>
                <ul className="divide-y divide-rule">
                  {items.map((i) => (
                    <li key={i.code} className="flex items-center gap-4 px-6 py-3">
                      <InsertRender code={i.code} family={i.family} category={i.category} className="h-11 w-auto shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-mono text-[14.5px] font-semibold text-ink">{i.code}</p>
                        <p className="text-[12.5px] text-ink-muted">{categoryById(i.category)?.name}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(i.code)}
                        aria-label={`Remove ${i.code}`}
                        className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-surface-panel hover:text-ink"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <RfqForm
              defaultCategory={defaultCategory}
              defaultCode={code}
              enquiryCodes={items.map((i) => i.code)}
              defaultRequirement={items.length ? 'Please quote the inserts listed in this enquiry. Quantity and workpiece material: ' : undefined}
              onSent={clear}
            />
          </div>

          <aside className="rounded-2xl border border-rule bg-white p-6 lg:sticky lg:top-24">
            <h2 className="label mb-4 text-ink-muted">What helps us quote faster</h2>
            <ul className="space-y-3 text-[15px] leading-relaxed text-ink-soft">
              <li>The ISO code from your current insert box, if you have it.</li>
              <li>The material you are cutting and the operation.</li>
              <li>Roughly how many you need, and how often.</li>
              <li>A drawing or photograph for anything non-standard.</li>
            </ul>
            <hr className="my-6 border-rule" />
            <p className="text-[14px] leading-relaxed text-ink-muted">
              We don’t publish prices online. Pricing depends on grade, quantity and lead time, so we quote against your actual requirement.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
