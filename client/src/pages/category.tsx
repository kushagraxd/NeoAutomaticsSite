import { Link, useParams } from 'wouter';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import ProductCard from '../components/product-card';
import PageHero from '../components/page-hero';
import { InsertMacroBackdrop } from '../components/hero-backdrops';
import { CtaLink } from '../components/cta';
import { ENQUIRY_ILLUSTRATIONS } from '../components/home/enquiry-illustrations';
import NotFound from './not-found';
import { toneFor } from '../lib/category-tones';
import { categoryBySlug, familiesIn, productsIn, type Product } from '../../../shared/catalog';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = categoryBySlug(slug ?? '');

  usePageMeta(
    category ? category.name : 'Category not found',
    category ? `${category.description} Request a quotation from Sreeraj Tools.` : '',
  );

  if (!category) return <NotFound />;

  const items = productsIn(category.id);
  const families = familiesIn(category.id);
  const tone = toneFor(category.id);
  // One listed code from each of the first families, for the hero composition.
  const backdrop = families
    .slice(0, 4)
    .map((f) => items.find((p) => p.family === f))
    .filter((p): p is Product => Boolean(p))
    .map((p) => p.code);
  const Illustration = ENQUIRY_ILLUSTRATIONS[category.id];

  const breadcrumb = (
    <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-[13.5px] text-ink-muted">
      <Link href="/products" className="rounded-sm font-semibold hover:text-ink">
        Products
      </Link>
      <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="text-ink" aria-current="page">
        {category.name}
      </span>
    </nav>
  );

  return (
    <>
      <PageHero
        id="category-title"
        above={breadcrumb}
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: tone.hex }} aria-hidden="true" />
            {items.length
              ? `${items.length} listed codes · ${families.length} ISO families`
              : category.needsConfirmation
                ? 'Range being finalised'
                : 'Sourced on enquiry'}
          </span>
        }
        title={category.name}
        lead={category.description}
        media={backdrop.length > 1 ? <InsertMacroBackdrop codes={backdrop} /> : undefined}
        size="md"
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          {items.length > 0 && (
            <CtaLink href={`/products?category=${category.id}`} arrow="tile">
              Search &amp; filter
            </CtaLink>
          )}
          <CtaLink href={`/quote?category=${category.id}`} variant={items.length > 0 ? 'secondary' : 'primary'} arrow={items.length > 0 ? undefined : 'tile'}>
            {items.length > 0 ? 'Request a Quote' : 'Share a requirement'}
          </CtaLink>
        </div>

        {families.length > 0 && (
          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-1.5" aria-label={`${category.short} families`}>
            {families.map((f) => (
              <li key={f}>
                <Link
                  href={`/products?category=${category.id}&family=${f}`}
                  className="code-chip h-8 bg-surface-card px-2.5 transition-colors hover:border-accent-line hover:text-accent-ink"
                  aria-label={`Show ${f} inserts`}
                >
                  {f}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </PageHero>

      <section className="section-tight bg-surface">
        <div className="shell">
          {items.length > 0 ? (
            <>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
                <h2 className="t-h3 text-[24px]">
                  {items.length} product code{items.length === 1 ? '' : 's'}
                </h2>
                <Link href={`/products?category=${category.id}`} className="link-arrow text-[14.5px]">
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
            <div className="panel grid overflow-hidden md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
              {Illustration && (
                <div className="border-b border-rule bg-surface-stage p-8 md:border-b-0 md:border-r">
                  <div className="aspect-[8/5]">
                    <Illustration active={false} />
                  </div>
                </div>
              )}
              <div className="flex flex-col justify-center p-8 md:p-10">
                <h2 className="t-h3 text-[clamp(1.375rem,1.1rem+1vw,1.75rem)]">Sourced to your requirement</h2>
                <p className="t-body mt-3 max-w-lg">
                  {category.needsConfirmation
                    ? 'This range is being finalised. Tell us what you need and we will confirm what we can supply and when.'
                    : 'We don’t hold a fixed list for this category. Send a drawing, a sample, or the part number you currently buy and we will source against it.'}
                </p>
                <CtaLink href={`/quote?category=${category.id}`} arrow="tile" className="mt-8 self-start">
                  Share your requirement
                </CtaLink>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
