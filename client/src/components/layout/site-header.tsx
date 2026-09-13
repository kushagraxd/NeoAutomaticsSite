import { useEffect, useState, type MouseEvent } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import BrandLogo from '../brand-logo';
import { categories, countsByCategory } from '../../../../shared/catalog';
import { toneFor } from '../../lib/category-tones';
import { focusEnquiryForm } from '../../lib/focus-enquiry';

const NAV = [
  { href: '/custom-sourcing', label: 'Custom Sourcing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [location] = useLocation();
  const counts = countsByCategory();

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

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="-ml-1 flex items-center rounded-lg p-1" aria-label="ShreeRaj Tools — home">
          <BrandLogo variant="full" size={40} className="hidden sm:flex" />
          <BrandLogo variant="emblem" size={40} className="sm:hidden" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
            <div className="flex items-center">
              <Link href="/products" className={`nav-link ${isActive('/products') ? 'is-active' : ''}`}>
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
              <div id="products-menu" className="absolute left-0 top-full w-[400px] pt-2">
                <div className="menu-panel animate-rise p-1.5">
                  {categories.map((c) => (
                    <Link key={c.id} href={`/products/${c.slug}`} className="menu-item">
                      <span className="flex items-center gap-2.5">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: toneFor(c.id).hex }} aria-hidden="true" />
                        <span className="text-[14px] font-medium text-ink">{c.name}</span>
                      </span>
                      <span className="code shrink-0 text-ink-muted">{counts[c.id] > 0 ? counts[c.id] : 'Enquiry'}</span>
                    </Link>
                  ))}
                  <Link href="/products" className="menu-footer">
                    Browse the full catalogue <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={`nav-link ${isActive(n.href) ? 'is-active' : ''}`}>
              {n.label}
            </Link>
          ))}

          <Link href="/contact#enquiry" onClick={onQuote} className="btn-primary ml-3 px-4 py-2.5 text-[14px]">
            Request a Quote
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 rounded-lg p-2 text-ink transition-colors hover:bg-surface-panel lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="mobile-nav lg:hidden">
          <nav className="shell flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto py-4" aria-label="Mobile">
            <Link href="/products" className="flex items-center gap-1.5 py-2.5 text-[15.5px] font-semibold text-ink">
              All products <ArrowUpRight className="h-4 w-4 text-ink-muted" aria-hidden="true" />
            </Link>
            <div className="mb-2 mt-1 flex flex-col border-l border-rule pl-4">
              {categories.map((c) => (
                <Link key={c.id} href={`/products/${c.slug}`} className="flex items-center justify-between gap-3 py-2.5 text-[14.5px] text-ink-soft">
                  <span className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: toneFor(c.id).hex }} aria-hidden="true" />
                    {c.name}
                  </span>
                  <span className="code text-ink-muted">{counts[c.id] > 0 ? counts[c.id] : '—'}</span>
                </Link>
              ))}
            </div>
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`border-t border-rule py-3.5 text-[15.5px] font-medium ${isActive(n.href) ? 'text-brand-bright' : 'text-ink'}`}
              >
                {n.label}
              </Link>
            ))}
            <Link href="/contact#enquiry" onClick={onQuote} className="btn-primary btn-lg mt-4 w-full">
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
