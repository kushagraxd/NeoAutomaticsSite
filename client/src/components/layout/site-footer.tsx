import { Link } from 'wouter';
import { Mail, MapPin, Phone } from 'lucide-react';
import BrandLogo from '../brand-logo';
import { categories } from '../../../../shared/catalog';
import { company, confirmed, telHref } from '../../../../shared/company';

const COMPANY_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/custom-sourcing', label: 'Custom Sourcing' },
  { href: '/contact#enquiry', label: 'Request a Quote' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
];

export default function SiteFooter() {
  const email = confirmed(company.contact.email);
  const phone = confirmed(company.contact.phone);
  const address = confirmed(company.contact.address);
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-rule bg-night">
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--gold-rgb),0.45)] to-transparent"
        aria-hidden="true"
      />
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="inline-flex rounded-lg" aria-label="ShreeRaj Tools — home">
            <BrandLogo variant="full" size={48} />
          </Link>
          <p className="mt-5 max-w-xs text-[14.5px] leading-relaxed text-ink-muted">{company.shortSummary}</p>
        </div>

        <div>
          <h3 className="label mb-4 text-ink-muted">Products</h3>
          <ul className="space-y-2.5">
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link href={`/products/${c.slug}`} className="footer-link">{c.short}</Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="text-[14.5px] font-medium text-brand-bright hover:underline">All categories</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="label mb-4 text-ink-muted">Company</h3>
          <ul className="space-y-2.5">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="footer-link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="label mb-4 text-ink-muted">Get in touch</h3>
          {email || phone || address ? (
            <ul className="space-y-3 text-[14.5px]">
              {email && (
                <li className="flex gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" aria-hidden="true" />
                  <a href={`mailto:${email}`} className="footer-link">{email}</a>
                </li>
              )}
              {phone && (
                <li className="flex gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" aria-hidden="true" />
                  <a href={telHref(phone)} className="footer-link">{phone}</a>
                </li>
              )}
              {address && (
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" aria-hidden="true" />
                  <span className="text-ink-muted">{address}</span>
                </li>
              )}
            </ul>
          ) : (
            <p className="text-[14.5px] leading-relaxed text-ink-muted">
              Send your requirement through the{' '}
              <Link href="/contact#enquiry" className="text-brand-bright hover:underline">enquiry form</Link>{' '}
              and we’ll reply with pricing and availability.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="shell flex flex-col gap-2 py-5 text-[13px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {company.displayName}. All rights reserved.</p>
          <p>Pricing is provided on enquiry. We do not publish prices online.</p>
        </div>
      </div>
    </footer>
  );
}
