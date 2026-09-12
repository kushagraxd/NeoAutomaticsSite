import { Link } from 'wouter';
import { Mail, Phone, MapPin } from 'lucide-react';
import { categories } from '../../../../shared/catalog';
import { company, confirmed, telHref } from '../../../../shared/company';

export default function SiteFooter() {
  const email = confirmed(company.contact.email);
  const phone = confirmed(company.contact.phone);
  const address = confirmed(company.contact.address);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-night-line bg-night text-night-ink">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="mb-5 flex items-center gap-2.5">
            <svg viewBox="0 0 64 64" className="h-[30px] w-[30px]" aria-hidden="true">
              <rect width="64" height="64" rx="14" fill="#161618" />
              <path d="M32 15 L51 47 H13 Z" fill="none" stroke="var(--accent)" strokeWidth="4.5" strokeLinejoin="round" />
              <circle cx="32" cy="36" r="5" fill="var(--accent)" />
            </svg>
            <span className="text-[18px] font-semibold tracking-[-0.025em]">
              {company.wordmark.first}
              <span className="text-night-muted"> {company.wordmark.second}</span>
            </span>
          </div>
          <p className="max-w-xs text-[14.5px] leading-relaxed text-night-muted">
            {company.shortSummary}
          </p>
        </div>

        <div>
          <h3 className="label mb-4 text-night-muted">Products</h3>
          <ul className="space-y-2.5">
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link href={`/products/${c.slug}`} className="text-[14.5px] text-night-ink transition-colors hover:text-accent">
                  {c.short}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="text-[14.5px] font-medium text-accent hover:underline">
                All categories
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="label mb-4 text-night-muted">Company</h3>
          <ul className="space-y-2.5">
            {[
              { href: '/about', label: 'About' },
              { href: '/custom-sourcing', label: 'Custom Sourcing' },
              { href: '/quote', label: 'Request a Quote' },
              { href: '/contact', label: 'Contact' },
              { href: '/privacy', label: 'Privacy' },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[14.5px] text-night-ink transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="label mb-4 text-night-muted">Get in touch</h3>
          {email || phone || address ? (
            <ul className="space-y-3 text-[14.5px]">
              {email && (
                <li className="flex gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <a href={`mailto:${email}`} className="hover:text-accent">{email}</a>
                </li>
              )}
              {phone && (
                <li className="flex gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <a href={telHref(phone)} className="hover:text-accent">{phone}</a>
                </li>
              )}
              {address && (
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-night-muted">{address}</span>
                </li>
              )}
            </ul>
          ) : (
            <p className="text-[14.5px] leading-relaxed text-night-muted">
              Send your requirement through the{' '}
              <Link href="/quote" className="text-accent hover:underline">enquiry form</Link>{' '}
              and we will reply with pricing and availability.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-night-line">
        <div className="shell flex flex-col gap-2 py-5 text-[13px] text-night-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {company.displayName}. All rights reserved.</p>
          <p>Pricing is provided on enquiry. We do not publish prices online.</p>
        </div>
      </div>
    </footer>
  );
}
