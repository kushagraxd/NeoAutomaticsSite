import { useEffect } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { Check, Mail, MapPin, MessageCircle, Phone, Plus, X, type LucideIcon } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import RfqForm from '../components/rfq-form';
import InsertRender from '../components/insert-render';
import PageHero from '../components/page-hero';
import { useEnquiry } from '../lib/enquiry-list';
import { focusEnquiryForm } from '../lib/focus-enquiry';
import { company, confirmed, telHref } from '../../../shared/company';
import { categories, categoryById, type CategoryId } from '../../../shared/catalog';
import { sourcingBases, type RfqInput, type SourcingBasis } from '../../../shared/rfq';

const NEXT_STEPS = [
  { title: 'We read your requirement', body: 'Codes, drawings and photos are checked against the geometry and grade you need.' },
  { title: 'We check with our suppliers', body: `Specification and availability are confirmed with producers in ${company.sourcingRegions.join(' and ')}.` },
  { title: 'You receive a quotation', body: 'Pricing and lead time for what we can source — or a clear answer if we can’t.' },
];

const HELPFUL = ['ISO product code', 'Workpiece material', 'Quantity', 'Drawing or photo', 'Delivery location'];

export default function ContactPage() {
  const [location] = useLocation();
  const search = useSearch();
  const isQuote = location === '/quote';

  usePageMeta(
    isQuote ? 'Request a Quote' : 'Contact',
    'Send your carbide insert or cutting tool requirement to Sreeraj Tools. Share a product code, drawing, photograph or application requirement for a confirmed quotation.',
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
    <>
      <PageHero
        id="contact-title"
        eyebrow={isQuote ? 'Request a quote' : 'Contact'}
        title="Send your tooling requirement"
        lead="Share a product code, drawing, photograph or application requirement. We will review the details and respond with confirmed sourcing information."
        size="sm"
      />

      <section className="bg-surface pb-20 pt-10 md:pb-28 md:pt-12">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12">
          {/* The form comes first on small screens so it is visible straight away. */}
          <div id="enquiry" className="min-w-0 scroll-mt-24 space-y-5 lg:order-2">
            {items.length > 0 && (
              <div className="panel overflow-hidden shadow-paper">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule-soft px-5 py-4">
                  <div>
                    <p className="text-[15.5px] font-bold text-ink">Inserts in this enquiry</p>
                    <p className="text-[13.5px] text-ink-muted">
                      {items.length} code{items.length === 1 ? '' : 's'} will be sent with your message.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link href="/products" className="inline-flex items-center gap-1.5 rounded-sm text-[13.5px] font-semibold text-ink underline-offset-4 hover:underline">
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add more
                    </Link>
                    <button type="button" onClick={clear} className="rounded-sm text-[13.5px] font-semibold text-ink-muted transition-colors hover:text-ink">
                      Clear
                    </button>
                  </div>
                </div>
                <ul className="max-h-[280px] divide-y divide-rule-soft overflow-y-auto">
                  {items.map((i) => (
                    <li key={i.code} className="flex items-center gap-4 px-5 py-3">
                      <span className="product-stage flex h-12 w-14 shrink-0 items-center justify-center rounded-lg">
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
                        className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
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

          <aside className="space-y-5 lg:sticky lg:top-24 lg:order-1 lg:self-start" aria-label="What to expect">
            <div className="panel p-6">
              <h2 className="text-[17px] font-bold tracking-[-0.015em] text-ink">What happens after you send it</h2>
              <ol className="mt-5 space-y-5">
                {NEXT_STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="form-step" aria-hidden="true">{i + 1}</span>
                    <div>
                      <p className="text-[15px] font-bold text-ink">{s.title}</p>
                      <p className="mt-0.5 text-[14.5px] leading-relaxed text-ink-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="panel p-6">
              <h2 className="text-[17px] font-bold tracking-[-0.015em] text-ink">Helpful to include</h2>
              <ul className="mt-4 space-y-2.5">
                {HELPFUL.map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-[14.5px] text-ink-soft">
                    <Check className="h-4 w-4 shrink-0 text-bronze-text" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <dl className="panel grid grid-cols-2 divide-x divide-rule-soft">
              <div className="px-5 py-4">
                <dt className="t-label">Based in</dt>
                <dd className="mt-1 text-[15px] font-bold text-ink">{company.basedIn}</dd>
              </div>
              <div className="px-5 py-4">
                <dt className="t-label">Sourcing from</dt>
                <dd className="mt-1 text-[15px] font-bold text-ink">{company.sourcingRegions.join(' & ')}</dd>
              </div>
            </dl>

            {direct.length > 0 && (
              <ul className="panel divide-y divide-rule-soft overflow-hidden">
                {direct.map((d) => (
                  <li key={d.key} className="flex items-center gap-4 px-5 py-4">
                    <span className="icon-tile h-10 w-10"><d.icon className="h-[18px] w-[18px]" aria-hidden="true" /></span>
                    <div className="min-w-0">
                      <p className="t-label">{d.label}</p>
                      {d.href ? (
                        <a href={d.href(d.value)} className="mt-0.5 block truncate text-[15.5px] font-semibold text-ink underline-offset-4 hover:underline">{d.value}</a>
                      ) : (
                        <p className="mt-0.5 text-[15px] text-ink-soft">{d.value}</p>
                      )}
                    </div>
                  </li>
                ))}
                {hours && <li className="px-5 py-3 text-[14px] text-ink-muted">{hours}</li>}
              </ul>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
