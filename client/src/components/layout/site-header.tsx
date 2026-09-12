import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { categories, countsByCategory } from '../../../../shared/catalog';
import { company } from '../../../../shared/company';

const NAV = [
  { href: '/custom-sourcing', label: 'Custom Sourcing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${company.displayName} — home`}>
      <svg viewBox="0 0 64 64" className="h-[30px] w-[30px] shrink-0" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill={onDark ? '#161618' : '#09090B'} />
        <path d="M32 15 L51 47 H13 Z" fill="none" stroke="var(--accent)" strokeWidth="4.5" strokeLinejoin="round" />
        <circle cx="32" cy="36" r="5" fill="var(--accent)" />
      </svg>
      <span
        className={`text-[18px] font-semibold tracking-[-0.025em] ${onDark ? 'text-night-ink' : 'text-ink'}`}
      >
        {company.wordmark.first}
        <span className={onDark ? 'text-night-muted' : 'text-ink-muted'}> {company.wordmark.second}</span>
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [location] = useLocation();
  const counts = countsByCategory();

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [location]);

  const isActive = (href: string) =>
    href === '/products' ? location.startsWith('/products') : location === href;

  const linkCls = (active: boolean) =>
    `rounded-md px-3 py-2 text-[14.5px] font-medium transition-colors ${
      active ? 'text-ink' : 'text-ink-muted hover:text-ink'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-white/80 backdrop-blur-xl">
      <div className="shell flex h-[60px] items-center justify-between gap-6">
        <Wordmark />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <Link href="/products" className={`${linkCls(isActive('/products'))} flex items-center gap-1`}>
              Products
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </Link>

            {productsOpen && (
              <div className="absolute left-0 top-full w-[380px] pt-2">
                <div className="animate-rise overflow-hidden rounded-lg border border-rule bg-white p-1.5 shadow-glow">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/products/${c.slug}`}
                      className="flex items-center justify-between gap-4 rounded-md px-3 py-2.5 transition-colors hover:bg-surface-subtle"
                    >
                      <span className="text-[14px] font-medium text-ink">{c.name}</span>
                      <span className="code shrink-0 text-ink-muted">
                        {counts[c.id] > 0 ? counts[c.id] : 'Enquiry'}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={linkCls(isActive(n.href))}>
              {n.label}
            </Link>
          ))}

          <Link href="/quote" className="btn-primary ml-3 px-4 py-2.5 text-[14px]">
            Request a Quote
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 rounded-md p-2 text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-rule bg-white lg:hidden">
          <nav className="shell flex flex-col py-4" aria-label="Mobile">
            <Link href="/products" className="flex items-center gap-1.5 py-2 text-[15px] font-semibold text-ink">
              All Products <ArrowUpRight className="h-4 w-4 text-ink-muted" aria-hidden="true" />
            </Link>
            <div className="mb-2 mt-1 flex flex-col gap-0.5 border-l border-rule pl-4">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/products/${c.slug}`}
                  className="flex items-center justify-between py-2 text-[14px] text-ink-muted"
                >
                  {c.name}
                  <span className="code">{counts[c.id] > 0 ? counts[c.id] : '—'}</span>
                </Link>
              ))}
            </div>
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="border-t border-rule py-3 text-[15px] font-medium text-ink">
                {n.label}
              </Link>
            ))}
            <Link href="/quote" className="btn-primary mt-4 w-full">
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
