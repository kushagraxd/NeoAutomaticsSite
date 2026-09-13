import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { ArrowRight, ArrowUpRight, ChevronDown, LayoutGrid, List, Search, SlidersHorizontal, X } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import ProductCard from '../components/product-card';
import ProductRow, { ProductRowHeader } from '../components/product-row';
import InsertRender from '../components/insert-render';
import { toneFor } from '../lib/category-tones';
import {
  categories, categoryById, productByCode, products, searchProducts,
  totalFamilyCount, totalProductCount, type CategoryId, type Product,
} from '../../../shared/catalog';

const PAGE = 36;
const QUICK = ['TNMG', 'CNMG', 'WNMG', 'DNMG', 'APMT', 'SPMG', 'WCMX', 'MGMN', '16ER'];
const SHOWCASE = ['TNMG160408-MA', 'APMT1135PDER-H2', 'WNMG080408-MA']
  .map((c) => productByCode(c))
  .filter((p): p is Product => Boolean(p));
const SHOWCASE_POS = ['left-0 top-2', 'right-2 top-[5.5rem]', 'left-20 bottom-0'];

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

const toneVars = (rgb: string, activeInk?: string) =>
  ({ '--tone': rgb, ...(activeInk ? { '--pill-active-ink': activeInk } : {}) }) as CSSProperties;

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
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`cursor-pointer appearance-none rounded-full border py-2 pl-4 pr-9 text-[13.5px] font-medium transition-all focus:outline-none focus:ring-4 focus:ring-[rgba(9,9,11,0.07)] ${
          active ? 'border-ink bg-ink text-white' : 'border-rule bg-white text-ink hover:border-ink'
        }`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className={`pointer-events-none absolute right-3 h-4 w-4 ${active ? 'text-white' : 'text-ink-muted'}`} aria-hidden="true" />
    </label>
  );
}

export default function ProductsPage() {
  usePageMeta(
    'Products — Carbide Insert Catalogue',
    'Search carbide inserts by ISO code, or filter by operation, shape and family. Turning, milling, drilling, grooving and threading inserts — supplied in India and internationally.',
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
      {/* ------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-night text-night-ink">
        <div className="absolute inset-0 night-glow" aria-hidden="true" />
        <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />

        <div className="shell relative grid gap-12 py-14 md:py-20 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <p className="eyebrow-dark mb-6">
              Catalogue · {totalProductCount} codes · {totalFamilyCount} ISO families
            </p>
            <h1 className="text-[clamp(2.5rem,5.6vw,4.5rem)] font-semibold leading-[1] tracking-[-0.045em]">
              Find the insert <span className="accent-word text-accent">by its code</span>
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-night-muted">
              Search the designation printed on your insert box, or filter by operation, shape and family. Add inserts to an
              enquiry and request one quotation for all of them.
            </p>

            <div className="group relative mt-9 max-w-2xl">
              <Search
                className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-night-muted transition-colors group-focus-within:text-accent"
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
                placeholder="Search a code — TNMG160408, APMT, 16ER…"
                autoComplete="off"
                spellCheck={false}
                className="w-full rounded-2xl border border-white/10 bg-white/[.06] py-[1.1rem] pl-14 pr-16 font-mono text-[16px] text-night-ink backdrop-blur transition-all placeholder:text-[#71717a] focus:border-accent focus:bg-white/[.09] focus:outline-none focus:ring-4 focus:ring-[rgba(210,168,87,0.18)] [&::-webkit-search-cancel-button]:hidden"
              />
              <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center">
                {filters.q ? (
                  <button
                    type="button"
                    onClick={() => { update({ q: '' }); inputRef.current?.focus(); }}
                    className="rounded-lg p-2 text-night-muted transition-colors hover:bg-white/10 hover:text-night-ink"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <kbd className="kbd" aria-hidden="true">/</kbd>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[13px] text-night-muted">Popular</span>
              {QUICK.map((f) => {
                const on = filters.q.trim().toUpperCase() === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => update({ q: on ? '' : f })}
                    aria-pressed={on}
                    className={`rounded-full border px-3 py-1 font-mono text-[12.5px] transition-all ${
                      on
                        ? 'border-accent bg-accent text-night'
                        : 'border-white/10 bg-white/[.03] text-night-muted hover:-translate-y-px hover:border-accent hover:text-accent'
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative hidden h-[330px] lg:block" aria-hidden="true">
            {SHOWCASE.map((p, i) => (
              <div key={p.code} className={`float absolute flex flex-col items-center ${SHOWCASE_POS[i]}`} style={{ animationDelay: `${i * -2.1}s` }}>
                <div className="rounded-3xl border border-white/[.08] bg-white/[.03] p-4 shadow-glow backdrop-blur-sm">
                  <InsertRender code={p.code} family={p.family} category={p.category} className="h-28 w-auto" />
                </div>
                <span className="mt-2 font-mono text-[11.5px] text-night-muted">{p.code}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Toolbar */}
      <div className="sticky top-[60px] z-30 border-b border-rule bg-[rgba(255,255,255,0.88)] backdrop-blur-xl">
        <div className="shell">
          <div className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 py-3 sm:-mx-8 sm:px-8" role="group" aria-label="Category">
            <button
              type="button"
              className="pill"
              data-active={filters.category === 'all'}
              data-dark="true"
              style={toneVars('9,9,11', '#ffffff')}
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
                  disabled={n === 0 && filters.category !== c.id}
                  style={toneVars(toneFor(c.id).rgb)}
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
              <Link key={c.id} href={`/products/${c.slug}`} className="pill" style={toneVars('161,161,170')}>
                {c.short}
                <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-rule py-2.5">
            <SlidersHorizontal className="mr-1 hidden h-4 w-4 text-ink-muted sm:block" aria-hidden="true" />
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
                <span className="font-semibold text-ink tabnum">{results.length}</span> of {totalProductCount}
              </p>
              <div role="group" aria-label="Layout" className="inline-flex rounded-full border border-rule bg-white p-1">
                {(['grid', 'list'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={filters.view === v}
                    onClick={() => update({ view: v })}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium transition-all ${
                      filters.view === v ? 'bg-ink text-white shadow-xs' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {v === 'grid' ? <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" /> : <List className="h-3.5 w-3.5" aria-hidden="true" />}
                    <span className="hidden sm:inline">{v === 'grid' ? 'Grid' : 'List'}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------- Results */}
      <section className="min-h-[60vh] bg-surface-subtle pb-28 pt-8">
        <div className="shell">
          {chips.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-[13px] text-ink-muted">Filtered by</span>
              {chips.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={c.clear}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-rule bg-white py-1 pl-3 pr-2 text-[13px] font-medium text-ink shadow-xs transition-colors hover:border-ink"
                  aria-label={`Remove filter ${c.label}`}
                >
                  {c.label}
                  <X className="h-3.5 w-3.5 text-ink-muted group-hover:text-ink" aria-hidden="true" />
                </button>
              ))}
              <button type="button" onClick={clearAll} className="ml-1 text-[13px] font-medium text-accent-ink hover:underline">
                Clear all
              </button>
            </div>
          )}

          {results.length === 0 ? (
            <div className="relative overflow-hidden rounded-3xl bg-night px-6 py-16 text-center text-night-ink md:py-20">
              <div className="absolute inset-0 night-glow" aria-hidden="true" />
              <div className="relative">
                <InsertRender code="XNEX080608" category="special" className="float mx-auto h-36 w-auto" />
                <h2 className="mt-6 text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.03em]">
                  No listed code matches
                  {filters.q.trim() ? <> “<span className="font-mono text-accent">{filters.q.trim()}</span>”</> : ' these filters'}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-night-muted">
                  That doesn’t mean we can’t supply it — much of what we source starts as a specific request.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link href={`/quote${filters.q.trim() ? `?code=${encodeURIComponent(filters.q.trim())}` : ''}`} className="btn-onDark btn-lg">
                    Ask for availability <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <button type="button" onClick={clearAll} className="btn-ghostDark btn-lg">Clear filters</button>
                </div>
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
            <div className="overflow-hidden rounded-2xl border border-rule bg-white shadow-card">
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
              <button type="button" onClick={() => setLimit((l) => l + PAGE)} className="btn-outline">
                Show more <span className="text-ink-muted">({results.length - visible.length} remaining)</span>
              </button>
            </div>
          )}

          {results.length > 0 && visible.length >= results.length && (
            <p className="mt-12 text-center text-[14.5px] text-ink-muted">
              That’s all {results.length}. Can’t see the code you need?{' '}
              <Link href="/quote" className="font-medium text-accent-ink hover:underline">Ask us to source it</Link>.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
