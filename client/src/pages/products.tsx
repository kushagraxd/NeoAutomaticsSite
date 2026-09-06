import { useMemo, useState, useEffect } from 'react';
import { Link, useSearch } from 'wouter';
import { Search, X, ArrowRight } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import ProductCard from '../components/product-card';
import InsertGlyph from '../components/insert-glyph';
import {
  categories, countsByCategory, products, searchProducts,
  totalProductCount, totalFamilyCount, type CategoryId,
} from '../../../shared/catalog';

export default function ProductsPage() {
  usePageMeta(
    'Products — Carbide Insert Catalogue',
    'Browse carbide inserts by category or search directly by ISO product code. Turning, milling, drilling, grooving and threading inserts supplied across India.',
  );

  const search = useSearch();
  const initialQuery = new URLSearchParams(search).get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');

  useEffect(() => setQuery(initialQuery), [initialQuery]);

  const counts = countsByCategory();

  const results = useMemo(() => {
    const base = query.trim() ? searchProducts(query, 500) : products;
    return activeCategory === 'all' ? base : base.filter((p) => p.category === activeCategory);
  }, [query, activeCategory]);

  const searching = query.trim().length > 0;

  return (
    <>
      <section className="bg-graphite py-14 text-graphite-ink md:py-16">
        <div className="shell">
          <span className="accent-rule mb-5" />
          <h1 className="text-[38px] sm:text-[48px]">Product catalogue</h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-graphite-muted">
            {totalProductCount} product codes across {totalFamilyCount} ISO families. Search by the code
            printed on your insert box, or browse by machining operation. Pricing is provided on
            enquiry.
          </p>

          <div className="relative mt-8 max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-graphite-muted" aria-hidden="true" />
            <label htmlFor="catalogue-search" className="sr-only">Search by product code</label>
            <input
              id="catalogue-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a code, e.g. TNMG160404 or APMT"
              className="w-full border border-graphite-line bg-graphite-light py-3.5 pl-12 pr-11 font-mono text-[15px] text-graphite-ink placeholder:text-graphite-muted/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-graphite-muted hover:text-graphite-ink"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="sticky top-16 z-30 border-b border-rule bg-white/95 backdrop-blur">
        <div className="shell flex gap-2 overflow-x-auto py-3">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`whitespace-nowrap border px-3.5 py-2 text-[14px] font-medium transition-colors ${
              activeCategory === 'all'
                ? 'border-ink bg-ink text-white'
                : 'border-rule bg-white text-ink-soft hover:border-ink'
            }`}
          >
            All ({totalProductCount})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategory(c.id)}
              className={`whitespace-nowrap border px-3.5 py-2 text-[14px] font-medium transition-colors ${
                activeCategory === c.id
                  ? 'border-ink bg-ink text-white'
                  : 'border-rule bg-white text-ink-soft hover:border-ink'
              }`}
            >
              {c.short} {counts[c.id] > 0 && <span className="font-mono text-[12px]">({counts[c.id]})</span>}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="shell">
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-[15px] text-ink-muted">
              {searching ? (
                <>
                  <strong className="font-semibold text-ink">{results.length}</strong> result
                  {results.length === 1 ? '' : 's'} for{' '}
                  <span className="font-mono text-ink">{query}</span>
                </>
              ) : (
                <>
                  Showing <strong className="font-semibold text-ink">{results.length}</strong> product codes
                </>
              )}
            </p>
            {activeCategory !== 'all' && (
              <Link
                href={`/products/${categories.find((c) => c.id === activeCategory)?.slug}`}
                className="text-[14px] font-semibold text-accent-ink hover:underline"
              >
                About this category →
              </Link>
            )}
          </div>

          {results.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.code} product={p} />
              ))}
            </div>
          ) : (
            <div className="border border-rule bg-surface-subtle px-6 py-14 text-center">
              <InsertGlyph category="special" className="mx-auto mb-5 h-16 w-16" />
              <h2 className="text-[24px]">No listed code matches that search</h2>
              <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-ink-soft">
                That does not mean we cannot supply it. Much of what we source is requested
                specifically. Send us the code, a drawing or a photograph and we will check
                availability.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/quote" className="btn-primary">
                  Ask for availability <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <button type="button" className="btn-outline" onClick={() => { setQuery(''); setActiveCategory('all'); }}>
                  Clear search
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
