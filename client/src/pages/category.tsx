import { Link, useParams } from 'wouter';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import ProductCard from '../components/product-card';
import InsertGlyph from '../components/insert-glyph';
import NotFound from './not-found';
import { categoryBySlug, productsIn, familiesIn } from '../../../shared/catalog';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = categoryBySlug(slug ?? '');

  usePageMeta(
    category ? category.name : 'Category not found',
    category ? `${category.description} Request a quotation from Sree Raj Tools.` : '',
  );

  if (!category) return <NotFound />;

  const items = productsIn(category.id);
  const families = familiesIn(category.id);

  return (
    <>
      <section className="bg-graphite py-14 text-graphite-ink md:py-16">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[13px] text-graphite-muted">
            <Link href="/products" className="hover:text-accent">Products</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-graphite-ink">{category.name}</span>
          </nav>

          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <span className="accent-rule mb-5" />
              <h1 className="text-[36px] sm:text-[46px]">{category.name}</h1>
              <p className="mt-4 text-[17px] leading-relaxed text-graphite-muted">{category.description}</p>

              {families.length > 0 && (
                <div className="mt-7">
                  <h2 className="label mb-3 text-graphite-muted">Families in this category</h2>
                  <ul className="flex flex-wrap gap-2">
                    {families.map((f) => (
                      <li key={f} className="border border-graphite-line px-3 py-1.5 font-mono text-[13px] text-accent">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="hidden shrink-0 items-center justify-center border border-graphite-line bg-graphite-light p-8 md:flex">
              <InsertGlyph category={category.id} onDark className="h-28 w-28" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="shell">
          {items.length > 0 ? (
            <>
              <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-[26px]">
                  {items.length} product code{items.length === 1 ? '' : 's'}
                </h2>
                <p className="text-[14px] text-ink-muted">Pricing on enquiry — we do not publish prices.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((p) => (
                  <ProductCard key={p.code} product={p} />
                ))}
              </div>
            </>
          ) : (
            <div className="border border-rule bg-surface-subtle px-6 py-14 text-center">
              <InsertGlyph category={category.id} className="mx-auto mb-5 h-16 w-16" />
              <h2 className="text-[26px]">Sourced to your requirement</h2>
              <p className="mx-auto mt-3 max-w-lg text-[16px] leading-relaxed text-ink-soft">
                {category.needsConfirmation
                  ? 'This range is being finalised. Tell us what you need and we will confirm what we can supply and when.'
                  : 'We do not hold a fixed list for this category. Send a drawing, a sample, or the part number you currently buy and we will source against it.'}
              </p>
              <Link href={`/quote?category=${category.id}`} className="btn-primary mt-7">
                Share your requirement <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-rule bg-surface-subtle py-14">
        <div className="shell flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[26px]">Need a size or grade not listed here?</h2>
            <p className="mt-2 max-w-xl text-[16px] text-ink-soft">
              The list above is what we currently handle, not the limit of what we can source.
            </p>
          </div>
          <Link href={`/quote?category=${category.id}`} className="btn-primary shrink-0">
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
