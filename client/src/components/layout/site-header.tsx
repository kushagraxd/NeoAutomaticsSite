import { useEffect, useRef, useState, type FocusEvent, type MouseEvent } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import BrandLogo from '../brand-logo';
import { CtaLink } from '../cta';
import ThemeToggle from '../theme-toggle';
import { categories, countsByCategory } from '../../../../shared/catalog';
import { company } from '../../../../shared/company';
import { focusEnquiryForm } from '../../lib/focus-enquiry';

const NAV = [
  { href: '/custom-sourcing', label: 'Custom Sourcing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const listed = categories.filter((c) => !c.enquiryOnly);
const onEnquiry = categories.filter((c) => c.enquiryOnly);

/**
 * Shared site header: sticky, translucent ivory, with the quote request as the
 * strongest navigation action.
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [location] = useLocation();
  const counts = countsByCategory();
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [location]);

  useEffect(() => {
    if (!open && !productsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setProductsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, productsOpen]);

  // Keep the page from scrolling behind the open mobile menu.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/products'
      ? location.startsWith('/products')
      : location === href || (href === '/contact' && location === '/quote');

  // Already on the contact page: scroll to the form instead of re-navigating.
  const onQuote = (e: MouseEvent<HTMLAnchorElement>) => {
    if (location === '/contact' || location === '/quote') {
      e.preventDefault();
      setOpen(false);
      focusEnquiryForm();
    }
  };

  // Close the products menu when keyboard focus moves somewhere else.
  const onProductsBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!productsRef.current?.contains(e.relatedTarget as Node | null)) setProductsOpen(false);
  };

  return (
    <header className="site-header sticky top-0 z-50 text-ink">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="-ml-1 flex items-center rounded-lg p-1" aria-label={`${company.displayName} — home`}>
          <BrandLogo variant="full" size={40} surface="light" />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          <div
            ref={productsRef}
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
            onBlur={onProductsBlur}
          >
            <div className="flex items-center">
              <Link href="/products" aria-current={isActive('/products') ? 'page' : undefined} className={`nav-link ${isActive('/products') ? 'is-active' : ''}`}>
                Products
              </Link>
              <button
                type="button"
                className="nav-caret"
                aria-label="Show product categories"
                aria-expanded={productsOpen}
                aria-controls="products-menu"
                onClick={() => setProductsOpen((v) => !v)}
              >
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
            </div>

            {productsOpen && (
              <div id="products-menu" className="absolute left-0 top-full w-[420px] pt-2">
                <div className="menu-panel animate-rise p-2">
                  <p className="px-3 pb-1 pt-2 text-[12px] font-semibold text-ink-muted">Listed catalogue</p>
                  {listed.map((c) => (
                    <Link key={c.id} href={`/products/${c.slug}`} className="menu-item">
                      <span className="text-[14px] font-semibold text-ink">{c.name}</span>
                      <span className="t-meta shrink-0">{counts[c.id]} codes</span>
                    </Link>
                  ))}
                  <p className="mt-1 border-t border-rule px-3 pb-1 pt-3 text-[12px] font-semibold text-ink-muted">Sourced on enquiry</p>
                  {onEnquiry.map((c) => (
                    <Link key={c.id} href={`/products/${c.slug}`} className="menu-item">
                      <span className="text-[14px] font-medium text-ink-soft">{c.name}</span>
                    </Link>
                  ))}
                  <Link href="/products" className="menu-footer">
                    Browse the full catalogue <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? 'page' : undefined} className={`nav-link ${isActive(n.href) ? 'is-active' : ''}`}>
              {n.label}
            </Link>
          ))}

          <ThemeToggle className="ml-3" />
          <CtaLink href="/contact#enquiry" onClick={onQuote} size="sm" className="ml-2">
            Request a Quote
          </CtaLink>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
        <button
          type="button"
          className="-mr-2 inline-flex h-11 items-center gap-2 rounded-lg px-2.5 text-[14px] font-semibold text-ink transition-colors hover:bg-accent-soft hover:text-accent-ink"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          <span aria-hidden="true">{open ? 'Close' : 'Menu'}</span>
        </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="mobile-nav lg:hidden">
          <nav className="shell flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto pb-6 pt-2" aria-label="Mobile">
            <Link
              href="/products"
              aria-current={isActive('/products') ? 'page' : undefined}
              className={`flex items-center justify-between border-b border-rule py-4 text-[17px] font-bold ${isActive('/products') ? 'text-accent-ink' : 'text-ink'}`}
            >
              All products <ArrowRight className="h-4 w-4 text-ink-muted" aria-hidden="true" />
            </Link>

            <p className="pb-1 pt-4 text-[12.5px] font-semibold text-ink-muted">Listed catalogue</p>
            {listed.map((c) => (
              <Link key={c.id} href={`/products/${c.slug}`} className="flex items-center justify-between gap-3 py-2.5 text-[15px] font-medium text-ink">
                {c.name}
                <span className="t-meta">{counts[c.id]}</span>
              </Link>
            ))}

            <p className="pb-1 pt-4 text-[12.5px] font-semibold text-ink-muted">Sourced on enquiry</p>
            {onEnquiry.map((c) => (
              <Link key={c.id} href={`/products/${c.slug}`} className="py-2.5 text-[15px] font-medium text-ink-soft">
                {c.name}
              </Link>
            ))}

            <div className="mt-4 border-t border-rule">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={isActive(n.href) ? 'page' : undefined}
                  className={`flex items-center justify-between border-b border-rule py-4 text-[17px] font-bold ${
                    isActive(n.href) ? 'text-accent-ink' : 'text-ink'
                  }`}
                >
                  {n.label}
                  <ArrowRight className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                </Link>
              ))}
            </div>

            <CtaLink href="/contact#enquiry" onClick={onQuote} arrow="tile" className="mt-6 w-full">
              Request a Quote
            </CtaLink>
          </nav>
        </div>
      )}
    </header>
  );
}
