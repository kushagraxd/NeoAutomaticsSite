import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { ArrowUpRight, ChevronDown, LayoutGrid, List, Search, SearchX, X } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import ProductCard from '../components/product-card';
import ProductRow, { ProductRowHeader } from '../components/product-row';
import PageHero from '../components/page-hero';
import { InsertMacroBackdrop } from '../components/hero-backdrops';
import { CtaButton, CtaLink } from '../components/cta';
import { toneFor } from '../lib/category-tones';
import {
  categories, categoryById, products, searchProducts,
  totalFamilyCount, totalProductCount, type CategoryId,
} from '../../../shared/catalog';

const PAGE = 36;
const QUICK = ['TNMG', 'CNMG', 'WNMG', 'DNMG', 'APMT', 'SPMG', 'WCMX', 'MGMN', '16ER'];
/** Listed codes composed behind the hero — different from the homepage footage. */
const BACKDROP = ['TNMG160408-MA', 'RDMW1604M0', 'SPMG090408-DG', 'VNMG160404-MA'];

const CAT_ORDER = new Map(categories.map((c, i) => [c.id, i]));
const ORDERED = [...products].sort(
  (a, b) =>
    (CAT_ORDER.get(a.category) ?? 0) - (CAT_ORDER.get(b.category) ?? 0) ||
    a.family.localeCompare(b.family) ||
    a.code.localeCompare(b.code),
);

type View = 'grid' | 'list';
type Sort = 'relevance' | 'code' | 'family';

interface Filters {
  q: string;
  category: CategoryId | 'all';
  shape: string;
  family: string;
  view: View;
  sort: Sort;
}

function parse(search: string): Filters {
  const p = new URLSearchParams(search);
  const cat = p.get('category');
  const sort = p.get('sort');
  return {
    q: p.get('q') ?? '',
    category: categories.some((c) => c.id === cat) ? (cat as CategoryId) : 'all',
    shape: p.get('shape') ?? 'all',
    family: p.get('family') ?? 'all',
    view: p.get('view') === 'list' ? 'list' : 'grid',
    sort: sort === 'code' || sort === 'family' ? sort : 'relevance',
  };
}

function serialise(f: Filters): string {
  const p = new URLSearchParams();
  if (f.q.trim()) p.set('q', f.q.trim());
  if (f.category !== 'all') p.set('category', f.category);
  if (f.shape !== 'all') p.set('shape', f.shape);
  if (f.family !== 'all') p.set('family', f.family);
  if (f.view !== 'grid') p.set('view', f.view);
  if (f.sort !== 'relevance') p.set('sort', f.sort);
  return p.toString();
}

const toneVar = (rgb: string) => ({ '--tone': rgb }) as CSSProperties;

function FilterSelect({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  const active = value !== 'all' && value !== 'relevance';
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="select-pill" data-active={active}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-ink-muted" aria-hidden="true" />
    </label>
  );
}

export default function ProductsPage() {
  usePageMeta(
    'Products — Carbide Insert Catalogue',
    'Search carbide inserts by ISO code, or filter by operation, shape and family. Turning, milling, drilling, grooving and threading inserts, supplied across India.',
  );

  const search = useSearch();
  const [, navigate] = useLocation();
  const [filters, setFilters] = useState<Filters>(() => parse(search));
  const [limit, setLimit] = useState(PAGE);
  const inputRef = useRef<HTMLInputElement>(null);
  const sentinel = useRef<HTMLDivElement>(null);

  const update = (patch: Partial<Filters>) => setFilters((f) => ({ ...f, ...patch }));
  const setCategory = (category: Filters['category']) => update({ category, shape: 'all', family: 'all' });
  const clearAll = () => setFilters((f) => ({ ...f, q: '', category: 'all', shape: 'all', family: 'all' }));

  // Links elsewhere on the site (e.g. /products?q=TNMG) update the page in place.
  useEffect(() => {
    if (search !== serialise(filters)) setFilters(parse(search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Filters are reflected in the URL, so a filtered view can be shared or bookmarked.
  useEffect(() => {
    const next = serialise(filters);
    if (next === search) return;
    const t = window.setTimeout(() => navigate(next ? `/products?${next}` : '/products', { replace: true }), 250);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // "/" jumps to search from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const searched = useMemo(() => (filters.q.trim() ? searchProducts(filters.q, 1000) : ORDERED), [filters.q]);

  const countFor = useMemo(() => {
    const c: Partial<Record<CategoryId, number>> = {};
    for (const p of searched) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [searched]);

  const inCategory = useMemo(
    () => (filters.category === 'all' ? searched : searched.filter((p) => p.category === filters.category)),
    [searched, filters.category],
  );

  const shapeOptions = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of inCategory) m.set(p.shape ?? 'Other', (m.get(p.shape ?? 'Other') ?? 0) + 1);
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
  }, [inCategory]);

  const familyOptions = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of inCategory) {
      if (filters.shape !== 'all' && (p.shape ?? 'Other') !== filters.shape) continue;
      m.set(p.family, (m.get(p.family) ?? 0) + 1);
    }
    return Array.from(m.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [inCategory, filters.shape]);

  const results = useMemo(() => {
    let r = inCategory;
    if (filters.shape !== 'all') r = r.filter((p) => (p.shape ?? 'Other') === filters.shape);
    if (filters.family !== 'all') r = r.filter((p) => p.family === filters.family);
    if (filters.sort === 'code') r = [...r].sort((a, b) => a.code.localeCompare(b.code));
    if (filters.sort === 'family') r = [...r].sort((a, b) => a.family.localeCompare(b.family) || a.code.localeCompare(b.code));
    return r;
  }, [inCategory, filters.shape, filters.family, filters.sort]);

  useEffect(() => setLimit(PAGE), [filters.q, filters.category, filters.shape, filters.family, filters.sort]);

  // Load the next batch as the visitor nears the end of the grid.
  useEffect(() => {
    const el = sentinel.current;
    if (!el || limit >= results.length) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setLimit((l) => l + PAGE), { rootMargin: '700px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [limit, results.length]);

  const visible = results.slice(0, limit);
  const listed = categories.filter((c) => !c.enquiryOnly);
  const enquiryOnly = categories.filter((c) => c.enquiryOnly);

  const chips = [
    filters.q.trim() && { key: 'q', label: `“${filters.q.trim()}”`, clear: () => update({ q: '' }) },
    filters.category !== 'all' && { key: 'c', label: categoryById(filters.category)?.short ?? '', clear: () => setCategory('all') },
    filters.shape !== 'all' && { key: 's', label: filters.shape, clear: () => update({ shape: 'all', family: 'all' }) },
    filters.family !== 'all' && { key: 'f', label: filters.family, clear: () => update({ family: 'all' }) },
  ].filter(Boolean) as Array<{ key: string; label: string; clear: () => void }>;

  return (
    <>
      <PageHero
        id="products-title"
        eyebrow={`Product catalogue · ${totalProductCount} codes · ${totalFamilyCount} ISO families`}
        title="Find the insert by its ISO code"
        lead="Search the designation printed on the insert box, or filter the catalogue by operation, shape and family."
        media={<InsertMacroBackdrop codes={BACKDROP} />}
        size="md"
      >
        <div className="group relative mx-auto max-w-2xl">
          <Search
            className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted transition-colors group-focus-within:text-accent-ink"
            aria-hidden="true"
          />
          <label htmlFor="catalogue-search" className="sr-only">Search by product code</label>
          <input
            ref={inputRef}
            id="catalogue-search"
            type="search"
            value={filters.q}
            onChange={(e) => update({ q: e.target.value })}
            onKeyDown={(e) => e.key === 'Escape' && update({ q: '' })}
            placeholder="TNMG160408, APMT, 16ER…"
            autoComplete="off"
            spellCheck={false}
            className="field h-16 rounded-2xl pl-14 pr-16 font-mono text-[16px] shadow-paper [&::-webkit-search-cancel-button]:hidden"
          />
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center">
            {filters.q ? (
              <button
                type="button"
                onClick={() => { update({ q: '' }); inputRef.current?.focus(); }}
                className="rounded-lg p-2 text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <kbd className="kbd" aria-hidden="true">/</kbd>
            )}
          </div>
        </div>

        <div className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-[13.5px] font-semibold text-ink-muted">Popular families</span>
          {QUICK.map((f) => {
            const on = filters.q.trim().toUpperCase() === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => update({ q: on ? '' : f })}
                aria-pressed={on}
                className={`h-8 rounded-md border px-2.5 font-mono text-[12.5px] font-medium transition-colors ${
                  on ? 'border-accent bg-accent text-ivory' : 'border-rule bg-surface-card text-ink-soft hover:border-accent-line hover:text-accent-ink'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </PageHero>

      {/* ---------------------------------------------------------- Toolbar */}
      <div className="sticky top-16 z-30 border-b border-rule bg-[rgba(var(--surface-rgb),0.94)] backdrop-blur-xl">
        <div className="shell">
          <div className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 py-3 sm:-mx-8 sm:px-8" role="group" aria-label="Category">
            <button
              type="button"
              className="pill"
              data-active={filters.category === 'all'}
              aria-pressed={filters.category === 'all'}
              onClick={() => setCategory('all')}
            >
              All <span className="pill-count">{searched.length}</span>
            </button>
            {listed.map((c) => {
              const n = countFor[c.id] ?? 0;
              return (
                <button
                  key={c.id}
                  type="button"
                  className="pill"
                  data-active={filters.category === c.id}
                  aria-pressed={filters.category === c.id}
                  disabled={n === 0 && filters.category !== c.id}
                  style={toneVar(toneFor(c.id).rgb)}
                  onClick={() => setCategory(filters.category === c.id ? 'all' : c.id)}
                >
                  <span className="pill-dot" aria-hidden="true" />
                  {c.short}
                  <span className="pill-count">{n}</span>
                </button>
              );
            })}
            <span className="mx-1 h-6 w-px shrink-0 bg-rule" aria-hidden="true" />
            {enquiryOnly.map((c) => (
              <Link key={c.id} href={`/products/${c.slug}`} className="pill font-medium">
                {c.short}
                <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-rule-soft py-2.5">
            <FilterSelect
              label="Shape"
              value={filters.shape}
              onChange={(v) => update({ shape: v, family: 'all' })}
              options={[{ value: 'all', label: 'All shapes' }, ...shapeOptions.map(([s, n]) => ({ value: s, label: `${s} (${n})` }))]}
            />
            <FilterSelect
              label="Family"
              value={filters.family}
              onChange={(v) => update({ family: v })}
              options={[{ value: 'all', label: 'All families' }, ...familyOptions.map(([f, n]) => ({ value: f, label: `${f} (${n})` }))]}
            />
            <FilterSelect
              label="Sort"
              value={filters.sort}
              onChange={(v) => update({ sort: v as Sort })}
              options={[
                { value: 'relevance', label: filters.q.trim() ? 'Best match' : 'By category' },
                { value: 'code', label: 'Code A–Z' },
                { value: 'family', label: 'Family A–Z' },
              ]}
            />

            <div className="ml-auto flex items-center gap-3">
              <p className="hidden text-[13.5px] text-ink-muted md:block" aria-live="polite">
                <span className="tabnum font-bold text-ink">{results.length}</span> of {totalProductCount} codes
              </p>
              <div role="group" aria-label="Layout" className="segmented">
                {(['grid', 'list'] as const).map((v) => (
                  <button key={v} type="button" aria-pressed={filters.view === v} onClick={() => update({ view: v })}>
                    {v === 'grid' ? <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" /> : <List className="h-3.5 w-3.5" aria-hidden="true" />}
                    <span className="hidden sm:inline">{v === 'grid' ? 'Grid' : 'List'}</span>
                    <span className="sr-only sm:hidden">{v === 'grid' ? 'Grid view' : 'List view'}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------- Results */}
      <section className="min-h-[60vh] bg-surface pb-24 pt-8" aria-label="Results">
        <div className="shell">
          {chips.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-[13.5px] font-semibold text-ink-muted">Filtered by</span>
              {chips.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={c.clear}
                  className="group inline-flex h-8 items-center gap-1.5 rounded-full border border-rule bg-surface-card pl-3 pr-2 text-[13px] font-semibold text-ink transition-colors hover:border-accent-line"
                  aria-label={`Remove filter ${c.label}`}
                >
                  {c.label}
                  <X className="h-3.5 w-3.5 text-ink-muted group-hover:text-ink" aria-hidden="true" />
                </button>
              ))}
              <button type="button" onClick={clearAll} className="ml-1 rounded-sm text-[13.5px] font-semibold text-accent-ink underline-offset-4 hover:underline">
                Clear all
              </button>
            </div>
          )}

          {results.length === 0 ? (
            <div className="panel px-6 py-14 text-center md:py-16">
              <span className="icon-tile mx-auto h-14 w-14">
                <SearchX className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="t-h3 mt-6 text-[clamp(1.375rem,1.1rem+1vw,1.75rem)]">
                No listed code matches
                {filters.q.trim() ? <> “<span className="font-mono">{filters.q.trim()}</span>”</> : ' these filters'}
              </h2>
              <p className="t-body mx-auto mt-3 max-w-md">
                That doesn’t mean we can’t supply it — much of what we source starts as a specific request.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CtaLink href={`/quote${filters.q.trim() ? `?code=${encodeURIComponent(filters.q.trim())}` : ''}`} arrow="tile">
                  Ask for availability
                </CtaLink>
                <CtaButton variant="secondary" onClick={clearAll}>
                  Clear filters
                </CtaButton>
              </div>
            </div>
          ) : filters.view === 'grid' ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((p, i) => (
                <li key={p.code} className="animate-rise" style={{ animationDelay: `${(i % PAGE) * 16}ms` }}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-rule bg-surface-card shadow-paper">
              <ProductRowHeader />
              <ul>
                {visible.map((p) => (
                  <ProductRow key={p.code} product={p} />
                ))}
              </ul>
            </div>
          )}

          {visible.length < results.length && (
            <div ref={sentinel} className="mt-10 flex justify-center">
              <CtaButton variant="secondary" size="md" onClick={() => setLimit((l) => l + PAGE)}>
                Show more <span className="font-medium opacity-70">({results.length - visible.length} remaining)</span>
              </CtaButton>
            </div>
          )}

          {results.length > 0 && visible.length >= results.length && (
            <p className="mt-12 text-center text-[14.5px] text-ink-muted">
              That’s all {results.length}. Can’t see the code you need?{' '}
              <Link href="/quote" className="font-semibold text-ink underline decoration-accent-line underline-offset-4">Ask us to source it</Link>.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
