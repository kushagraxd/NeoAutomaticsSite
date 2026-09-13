import type { CSSProperties } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowRight, ChevronRight, Search } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import ProductCard from '../components/product-card';
import InsertRender from '../components/insert-render';
import InsertGlyph from '../components/insert-glyph';
import NotFound from './not-found';
import { toneFor } from '../lib/category-tones';
import { categoryBySlug, familiesIn, productsIn, type Product } from '../../../shared/catalog';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = categoryBySlug(slug ?? '');

  usePageMeta(
    category ? category.name : 'Category not found',
    category ? `${category.description} Request a quotation from ShreeRaj Tools.` : '',
  );

  if (!category) return <NotFound />;

  const items = productsIn(category.id);
  const families = familiesIn(category.id);
  const tone = toneFor(category.id);
  const showcase = families
    .slice(0, 3)
    .map((f) => items.find((p) => p.family === f))
    .filter((p): p is Product => Boolean(p));

  return (
    <>
      <section className="relative overflow-hidden bg-night text-night-ink">
        <div className="absolute inset-0 night-glow" aria-hidden="true" />
        <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(45% 60% at 80% 55%, rgba(${tone.rgb},.18), transparent 70%)` }}
          aria-hidden="true"
        />

        <div className="shell relative grid gap-12 py-12 md:py-20 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-night-muted">
              <Link href="/products" className="hover:text-accent">Products</Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="text-night-ink">{category.name}</span>
            </nav>

            <p className="label mt-8 inline-flex items-center gap-2" style={{ color: tone.hex }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone.hex }} aria-hidden="true" />
              {items.length ? `${items.length} codes · ${families.length} families` : category.needsConfirmation ? 'Range being finalised' : 'Sourced on enquiry'}
            </p>
            <h1 className="mt-4 text-[clamp(2.5rem,5.4vw,4.25rem)] font-semibold leading-[1] tracking-[-0.045em]">{category.name}</h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-night-muted">{category.description}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              {items.length > 0 && (
                <Link href={`/products?category=${category.id}`} className="btn-onDark btn-lg">
                  <Search className="h-[18px] w-[18px]" aria-hidden="true" /> Search &amp; filter
                </Link>
              )}
              <Link href={`/quote?category=${category.id}`} className="btn-ghostDark btn-lg">Request a Quote</Link>
            </div>

            {families.length > 0 && (
              <ul className="mt-9 flex flex-wrap gap-2" style={{ '--tone': tone.rgb } as CSSProperties}>
                {families.map((f) => (
                  <li key={f}>
                    <Link
                      href={`/products?category=${category.id}&family=${f}`}
                      className="inline-block rounded-full border border-[rgba(var(--tone),0.35)] px-3 py-1.5 font-mono text-[12.5px] text-[rgb(var(--tone))] transition-all hover:-translate-y-px hover:bg-[rgb(var(--tone))] hover:text-night"
                    >
                      {f}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="hidden lg:block" aria-hidden="true">
            {showcase.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {showcase.map((p, i) => (
                  <div
                    key={p.code}
                    className={`flex flex-col items-center justify-center rounded-3xl border border-white/[.08] bg-white/[.03] p-6 backdrop-blur-sm ${i === 0 ? 'col-span-2' : ''}`}
                  >
                    <InsertRender code={p.code} family={p.family} category={p.category} className={`float w-auto ${i === 0 ? 'h-40' : 'h-24'}`} />
                    <span className="mt-3 font-mono text-[11.5px] text-night-muted">{p.code}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-3xl border border-white/[.08] bg-white/[.03]">
                <InsertGlyph category={category.id} color={tone.hex} className="h-40 w-40" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-surface-subtle py-12 md:py-16">
        <div className="shell">
          {items.length > 0 ? (
            <>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
                <h2 className="text-[26px] font-semibold tracking-[-0.03em]">
                  {items.length} product code{items.length === 1 ? '' : 's'}
                </h2>
                <Link href={`/products?category=${category.id}`} className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink transition-all hover:gap-2.5">
                  Filter by shape and family <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((p, i) => (
                  <li key={p.code} className="animate-rise" style={{ animationDelay: `${Math.min(i, 24) * 16}ms` }}>
                    <ProductCard product={p} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="relative overflow-hidden rounded-3xl bg-night px-6 py-16 text-center text-night-ink md:py-20">
              <div className="absolute inset-0 night-glow" aria-hidden="true" />
              <div className="relative">
                <InsertGlyph category={category.id} color={tone.hex} className="mx-auto h-20 w-20" />
                <h2 className="mt-6 text-[clamp(1.5rem,3vw,2.1rem)] font-semibold tracking-[-0.03em]">Sourced to your requirement</h2>
                <p className="mx-auto mt-3 max-w-lg text-[16px] leading-relaxed text-night-muted">
                  {category.needsConfirmation
                    ? 'This range is being finalised. Tell us what you need and we will confirm what we can supply and when.'
                    : 'We don’t hold a fixed list for this category. Send a drawing, a sample, or the part number you currently buy and we will source against it.'}
                </p>
                <Link href={`/quote?category=${category.id}`} className="btn-onDark btn-lg mt-8">
                  Share your requirement <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
