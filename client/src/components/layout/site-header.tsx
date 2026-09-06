import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown } from 'lucide-react';
import { categories } from '../../../../shared/catalog';
import { company } from '../../../../shared/company';

const NAV = [
  { href: '/products', label: 'Products' },
  { href: '/custom-sourcing', label: 'Custom Sourcing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

function Wordmark() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label={`${company.displayName} — home`}>
      <svg viewBox="0 0 64 64" className="h-8 w-8 shrink-0" aria-hidden="true">
        <rect width="64" height="64" rx="8" className="fill-graphite" />
        <path d="M32 13 L52 47 H12 Z" fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinejoin="round" />
        <circle cx="32" cy="36" r="5.5" fill="var(--accent)" />
      </svg>
      <span className="font-display text-[19px] font-bold uppercase leading-none tracking-[0.02em]">
        <span className="text-ink">{company.wordmark.first}</span>{' '}
        <span className="text-accent-ink">{company.wordmark.second}</span>
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [location]);

  const isActive = (href: string) =>
    href === '/products' ? location.startsWith('/products') : location === href;

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-white/95 backdrop-blur">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Wordmark />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <Link
              href="/products"
              className={`flex items-center gap-1 px-3 py-2 text-[15px] font-medium transition-colors ${
                isActive('/products') ? 'text-accent-ink' : 'text-ink-soft hover:text-ink'
              }`}
            >
              Products
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            {productsOpen && (
              <div className="absolute left-0 top-full w-[300px] border border-rule bg-white shadow-lift">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/products/${c.slug}`}
                    className="block border-b border-rule px-4 py-2.5 text-[14px] text-ink-soft last:border-b-0 hover:bg-surface-subtle hover:text-accent-ink"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NAV.filter((n) => n.href !== '/products').map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`px-3 py-2 text-[15px] font-medium transition-colors ${
                isActive(n.href) ? 'text-accent-ink' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {n.label}
            </Link>
          ))}

          <Link href="/quote" className="btn-primary ml-3 py-2.5 text-sm">
            Request a Quote
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-rule bg-white lg:hidden">
          <nav className="shell flex flex-col py-3" aria-label="Mobile">
            <Link href="/products" className="py-3 text-[15px] font-semibold text-ink">
              All Products
            </Link>
            <div className="mb-1 flex flex-col border-l-2 border-rule pl-4">
              {categories.map((c) => (
                <Link key={c.id} href={`/products/${c.slug}`} className="py-2 text-[14px] text-ink-muted">
                  {c.name}
                </Link>
              ))}
            </div>
            {NAV.filter((n) => n.href !== '/products').map((n) => (
              <Link key={n.href} href={n.href} className="border-t border-rule py-3 text-[15px] font-medium text-ink">
                {n.label}
              </Link>
            ))}
            <Link href="/quote" className="btn-primary mt-3 w-full">
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
