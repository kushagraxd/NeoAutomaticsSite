import { useEffect } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { Info, Mail, MapPin, MessageCircle, Phone, Plus, X, type LucideIcon } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import RfqForm from '../components/rfq-form';
import InsertRender from '../components/insert-render';
import { useEnquiry } from '../lib/enquiry-list';
import { focusEnquiryForm } from '../lib/focus-enquiry';
import { company, confirmed, telHref } from '../../../shared/company';
import { categories, categoryById, type CategoryId } from '../../../shared/catalog';
import { sourcingBases, type RfqInput, type SourcingBasis } from '../../../shared/rfq';

const NEXT_STEPS = [
  { title: 'We read your requirement', body: 'Codes, drawings and photos are checked against the geometry and grade you need.' },
  { title: 'We check with our suppliers', body: 'Specification and availability are confirmed with producers in China and Taiwan.' },
  { title: 'You receive a quotation', body: 'Pricing and lead time for what we can source — or a clear answer if we can’t.' },
];

const HELPFUL = ['ISO product code', 'Workpiece material', 'Quantity', 'Drawing or photo', 'Delivery location'];

export default function ContactPage() {
  const [location] = useLocation();
  const search = useSearch();
  const isQuote = location === '/quote';

  usePageMeta(
    isQuote ? 'Request a Quote' : 'Contact',
    'Send your carbide insert or cutting tool requirement to ShreeRaj Tools. Share a product code, drawing or photo and receive pricing, available grades and lead time.',
  );

  const params = new URLSearchParams(search);
  const { items, remove, clear } = useEnquiry();

  const categoryParam = categories.find((c) => c.id === params.get('category'))?.id as CategoryId | undefined;
  const basisParam = sourcingBases.find((b) => b === params.get('basis')) as SourcingBasis | undefined;
  const codeParam = params.get('code') ?? undefined;
  const defaultCategory = (items[0]?.category ?? categoryParam ?? (basisParam ? 'special' : undefined)) as
    | RfqInput['productCategory']
    | undefined;

  // Arriving via "Request a Quote", /quote or a sourcing card lands on the form.
  useEffect(() => {
    if (!isQuote && window.location.hash !== '#enquiry' && !basisParam && !codeParam) return;
    const t = window.setTimeout(focusEnquiryForm, 90);
    return () => window.clearTimeout(t);
  }, [isQuote, basisParam, codeParam, search]);

  const direct = [
    { key: 'email', icon: Mail, label: 'Email', value: confirmed(company.contact.email), href: (v: string) => `mailto:${v}` },
    { key: 'phone', icon: Phone, label: 'Phone', value: confirmed(company.contact.phone), href: (v: string) => telHref(v) },
    { key: 'whatsapp', icon: MessageCircle, label: 'WhatsApp', value: confirmed(company.contact.whatsapp), href: (v: string) => `https://wa.me/${v.replace(/\D/g, '')}` },
    { key: 'address', icon: MapPin, label: 'Address', value: confirmed(company.contact.address), href: null },
  ].filter((d): d is { key: string; icon: LucideIcon; label: string; value: string; href: ((v: string) => string) | null } => Boolean(d.value));

  const hours = confirmed(company.contact.hours);

  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0 blueprint opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] glow-brand" aria-hidden="true" />

      <div className="shell relative grid gap-10 pb-20 pt-12 md:pb-28 md:pt-16 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow">{isQuote ? 'Request a quote' : 'Contact'}</p>
          <h1 className="mt-5 text-[clamp(2.25rem,4.4vw,3.5rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-ink">
            Tell us what you need. <span className="accent-word text-brand-bright">We’ll price it.</span>
          </h1>
          <p className="mt-5 max-w-lg text-[16.5px] leading-relaxed text-ink-soft">
            The form is the quickest way to reach us. Share a product code, a drawing or a photo and we’ll come back with
            pricing, available grades and lead time.
          </p>

          <div className="card mt-8 overflow-hidden">
            {direct.length > 0 ? (
              <ul className="divide-y divide-rule">
                {direct.map((d) => (
                  <li key={d.key} className="flex items-center gap-4 px-5 py-4">
                    <span className="icon-badge h-10 w-10"><d.icon className="h-[18px] w-[18px]" aria-hidden="true" /></span>
                    <div className="min-w-0">
                      <p className="label text-ink-muted">{d.label}</p>
                      {d.href ? (
                        <a href={d.href(d.value)} className="mt-0.5 block truncate text-[15.5px] font-medium text-ink hover:text-brand-bright">{d.value}</a>
                      ) : (
                        <p className="mt-0.5 text-[15px] text-ink-soft">{d.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex gap-3.5 px-5 py-5">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-bright" aria-hidden="true" />
                <p className="text-[14.5px] leading-relaxed text-ink-soft">
                  Direct phone and email details are being finalised. Enquiries sent through this form reach our team directly.
                </p>
              </div>
            )}
            <div className="grid grid-cols-2 divide-x divide-rule border-t border-rule">
              <div className="px-5 py-4">
                <p className="label text-ink-muted">Based in</p>
                <p className="mt-1 text-[15px] font-medium text-ink">{company.basedIn}</p>
              </div>
              <div className="px-5 py-4">
                <p className="label text-ink-muted">Sourcing from</p>
                <p className="mt-1 text-[15px] font-medium text-ink">{company.sourcingRegions.join(' & ')}</p>
              </div>
            </div>
            {hours && <p className="border-t border-rule px-5 py-3 text-[14px] text-ink-muted">{hours}</p>}
          </div>

          <h2 className="mt-10 text-[16px] font-semibold text-ink">What happens after you send it</h2>
          <ol className="mt-5 space-y-5">
            {NEXT_STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="step-dot" aria-hidden="true">{i + 1}</span>
                <div>
                  <p className="text-[15px] font-medium text-ink">{s.title}</p>
                  <p className="mt-0.5 text-[14.5px] leading-relaxed text-ink-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-2xl border border-rule bg-surface-subtle p-5">
            <p className="text-[14.5px] font-medium text-ink">Helpful to include</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {HELPFUL.map((t) => (
                <li key={t} className="chip">{t}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div id="enquiry" className="min-w-0 scroll-mt-24 space-y-5">
          {items.length > 0 && (
            <div className="card overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-4">
                <div>
                  <p className="text-[15.5px] font-semibold text-ink">Inserts in this enquiry</p>
                  <p className="text-[13.5px] text-ink-muted">
                    {items.length} code{items.length === 1 ? '' : 's'} will be sent with your message.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Link href="/products" className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-brand-bright hover:underline">
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add more
                  </Link>
                  <button type="button" onClick={clear} className="text-[13.5px] text-ink-muted transition-colors hover:text-ink">
                    Clear
                  </button>
                </div>
              </div>
              <ul className="max-h-[280px] divide-y divide-rule overflow-y-auto">
                {items.map((i) => (
                  <li key={i.code} className="flex items-center gap-4 px-5 py-3">
                    <span className="stage flex h-12 w-14 shrink-0 items-center justify-center rounded-lg">
                      <InsertRender code={i.code} family={i.family} category={i.category} className="h-10 w-auto" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-mono text-[14.5px] font-semibold text-ink">{i.code}</p>
                      <p className="text-[12.5px] text-ink-muted">{categoryById(i.category)?.name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(i.code)}
                      aria-label={`Remove ${i.code} from this enquiry`}
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
            key={search}
            defaultCategory={defaultCategory}
            defaultCode={codeParam}
            defaultSourcingBasis={basisParam}
            enquiryCodes={items.map((i) => i.code)}
            defaultRequirement={items.length ? 'Please quote the inserts listed in this enquiry. Quantity and workpiece material: ' : undefined}
            onSent={clear}
          />
        </div>
      </div>
    </section>
  );
}
