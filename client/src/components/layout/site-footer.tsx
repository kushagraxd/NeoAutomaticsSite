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
    <footer className="bg-graphite text-graphite-ink">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
              <rect width="64" height="64" rx="8" fill="var(--graphite-light)" />
              <path d="M32 13 L52 47 H12 Z" fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinejoin="round" />
              <circle cx="32" cy="36" r="5.5" fill="var(--accent)" />
            </svg>
            <span className="font-display text-[18px] font-bold uppercase tracking-[0.02em]">
              {company.wordmark.first} <span className="text-accent">{company.wordmark.second}</span>
            </span>
          </div>
          <p className="max-w-xs text-[14px] leading-relaxed text-graphite-muted">
            {company.descriptor} in India, sourced from established producers in{' '}
            {company.sourcingRegions.join(' and ')}.
          </p>
        </div>

        <div>
          <h3 className="label mb-4 text-graphite-muted">Products</h3>
          <ul className="space-y-2.5">
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link href={`/products/${c.slug}`} className="text-[14px] text-graphite-ink hover:text-accent">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="text-[14px] font-medium text-accent hover:underline">
                View all categories
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="label mb-4 text-graphite-muted">Company</h3>
          <ul className="space-y-2.5">
            {[
              { href: '/about', label: 'About Sree Raj Tools' },
              { href: '/custom-sourcing', label: 'Custom Sourcing' },
              { href: '/quote', label: 'Request a Quote' },
              { href: '/contact', label: 'Contact' },
              { href: '/privacy', label: 'Privacy Policy' },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[14px] text-graphite-ink hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="label mb-4 text-graphite-muted">Get in touch</h3>
          {email || phone || address ? (
            <ul className="space-y-3 text-[14px]">
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
                  <span className="text-graphite-muted">{address}</span>
                </li>
              )}
            </ul>
          ) : (
            <p className="text-[14px] leading-relaxed text-graphite-muted">
              Send us your requirement through the{' '}
              <Link href="/quote" className="text-accent hover:underline">
                enquiry form
              </Link>{' '}
              and we will reply with pricing and availability.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-graphite-line">
        <div className="shell flex flex-col gap-2 py-5 text-[13px] text-graphite-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {company.displayName}. All rights reserved.</p>
          <p>Prices are provided on enquiry. We do not publish pricing online.</p>
        </div>
      </div>
    </footer>
  );
}
