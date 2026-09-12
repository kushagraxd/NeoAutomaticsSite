import { Link } from 'wouter';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import { company, confirmed, telHref } from '../../../shared/company';

export default function ContactPage() {
  usePageMeta(
    'Contact',
    'Get in touch with ShreeRaj Tools about carbide inserts and cutting tools. Send your requirement and we will respond with pricing and availability.',
  );

  const email = confirmed(company.contact.email);
  const phone = confirmed(company.contact.phone);
  const whatsapp = confirmed(company.contact.whatsapp);
  const address = confirmed(company.contact.address);
  const hours = confirmed(company.contact.hours);
  const hasAny = Boolean(email || phone || whatsapp || address);

  return (
    <>
      <section className="bg-night py-14 text-night-ink md:py-16">
        <div className="shell max-w-3xl">
          <span className="accent-rule-dark mb-5" />
          <h1 className="text-h1">Contact</h1>
          <p className="mt-4 text-[17px] leading-relaxed text-night-muted">
            The quickest way to reach us about a product is the enquiry form — it puts your
            requirement straight in front of us with everything we need to quote.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-h2">Send an enquiry</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
              Share a product code, a drawing or a description of the job. You can attach a file up to
              10 MB. We reply with pricing, available grades and lead time.
            </p>
            <Link href="/quote" className="btn-primary mt-6">
              Request a Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div>
            <h2 className="text-h2">Direct contact</h2>
            {hasAny ? (
              <ul className="mt-5 space-y-4">
                {email && (
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />
                    <a href={`mailto:${email}`} className="text-[16px] text-ink hover:text-accent-ink">{email}</a>
                  </li>
                )}
                {phone && (
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />
                    <a href={telHref(phone)} className="text-[16px] text-ink hover:text-accent-ink">{phone}</a>
                  </li>
                )}
                {whatsapp && (
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />
                    <span className="text-[16px] text-ink">{whatsapp} <span className="text-ink-muted">(WhatsApp)</span></span>
                  </li>
                )}
                {address && (
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />
                    <span className="text-[16px] text-ink-soft">{address}</span>
                  </li>
                )}
                {hours && <li className="text-[15px] text-ink-muted">{hours}</li>}
              </ul>
            ) : (
              <div className="mt-5 rounded-lg border border-rule bg-surface-subtle p-6">
                <p className="text-[16px] leading-relaxed text-ink-soft">
                  Our published contact details are being finalised. Until then, please use the enquiry
                  form — it reaches us directly and lets you attach a drawing or photograph.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
