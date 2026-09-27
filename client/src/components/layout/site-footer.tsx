import { Link } from 'wouter';
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import BrandLogo from '../brand-logo';
import { CtaLink } from '../cta';
import { categoryById, type CategoryId } from '../../../../shared/catalog';
import { company, confirmed, telHref } from '../../../../shared/company';

const PRODUCT_LINKS: Array<{ id: CategoryId; label: string }> = [
  { id: 'turning', label: 'Turning Inserts' },
  { id: 'milling', label: 'Milling Inserts' },
  { id: 'drilling', label: 'Drilling & Hole-Machining' },
  { id: 'grooving', label: 'Parting & Grooving' },
  { id: 'threading', label: 'Threading' },
];

const COMPANY_LINKS = [
  { href: '/custom-sourcing', label: 'Custom Sourcing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/contact#enquiry', label: 'Request a Quote' },
  { href: '/privacy', label: 'Privacy' },
];

const SUMMARY =
  'Carbide inserts and cutting tools sourced against catalogue codes, drawings and application requirements for customers across India.';

function backToTop() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  // Keyboard users continue from the top of the page, not from the footer.
  document.querySelector<HTMLElement>('header a')?.focus({ preventScroll: true });
}

/** Shared footer: charcoal, on every page. */
export default function SiteFooter() {
  const email = confirmed(company.contact.email);
  const phone = confirmed(company.contact.phone);
  const address = confirmed(company.contact.address);
  const year = new Date().getFullYear();

  return (
    <footer className="on-charcoal">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.3fr] lg:gap-12 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex rounded-lg" aria-label={`${company.displayName} — home`}>
            <BrandLogo variant="full" size={40} surface="graphite" />
          </Link>
          <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-graphite-muted">{SUMMARY}</p>
        </div>

        <nav aria-labelledby="footer-products">
          <h2 id="footer-products" className="mb-4 text-[13.5px] font-bold text-graphite-ink">
            Products
          </h2>
          <ul className="space-y-2.5">
            {PRODUCT_LINKS.map((l) => (
              <li key={l.id}>
                <Link href={`/products/${categoryById(l.id)?.slug}`} className="footer-link">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="footer-link font-semibold text-bronze-bright hover:text-graphite-ink">
                All Products
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-company">
          <h2 id="footer-company" className="mb-4 text-[13.5px] font-bold text-graphite-ink">
            Sourcing &amp; company
          </h2>
          <ul className="space-y-2.5">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="footer-link">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="rounded-xl border border-graphite-line bg-graphite-soft p-6 sm:col-span-2 lg:col-span-1">
          <h2 className="text-[16px] font-bold text-graphite-ink">Send a requirement</h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-graphite-muted">
            Share a code, drawing, photograph or sample. We review it and reply with confirmed sourcing information.
          </p>
          <CtaLink href="/contact#enquiry" variant="primary-inverse" size="md" arrow="tile" className="mt-5 w-full sm:w-auto">
            Start an enquiry
          </CtaLink>
          {(email || phone || address) && (
            <ul className="mt-5 space-y-2.5 border-t border-graphite-line pt-5 text-[14.5px]">
              {email && (
                <li className="flex gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-bronze-bright" aria-hidden="true" />
                  <a href={`mailto:${email}`} className="footer-link">
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li className="flex gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-bronze-bright" aria-hidden="true" />
                  <a href={telHref(phone)} className="footer-link">
                    {phone}
                  </a>
                </li>
              )}
              {address && (
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bronze-bright" aria-hidden="true" />
                  <span className="text-graphite-muted">{address}</span>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-graphite-line">
        <div className="shell flex flex-col gap-3 py-5 text-[13px] text-graphite-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.displayName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>Pricing is provided on enquiry</li>
            <li>
              <Link href="/privacy" className="footer-link text-[13px]">
                Privacy
              </Link>
            </li>
            <li>
              <button type="button" onClick={backToTop} className="footer-link inline-flex items-center gap-1.5 text-[13px] font-semibold">
                Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
