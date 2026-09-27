import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowRight, ChevronRight, Info } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import InsertRender from '../components/insert-render';
import { productImage } from '../lib/product-images';
import ProductCard, { EnquireButton } from '../components/product-card';
import RfqForm from '../components/rfq-form';
import { CtaLink } from '../components/cta';
import NotFound from './not-found';
import { decodeInsert, type SegmentKey } from '../lib/iso-decoder';
import { toneFor } from '../lib/category-tones';
import { categoryBySlug, productByCode, productsIn } from '../../../shared/catalog';

export default function ProductPage() {
  const { slug, code } = useParams<{ slug: string; code: string }>();
  const category = categoryBySlug(slug ?? '');
  const product = productByCode(decodeURIComponent(code ?? ''));
  const [active, setActive] = useState<SegmentKey | null>(null);

  usePageMeta(
    product ? `${product.code} — ${category?.name ?? 'Carbide Insert'}` : 'Product not found',
    product
      ? `${product.code} carbide insert${product.shape ? `, ${product.shape.toLowerCase()} shape` : ''}. Request pricing and availability from Sreeraj Tools.`
      : '',
  );

  if (!product || !category) return <NotFound />;

  const tone = toneFor(product.category);
  const photo = productImage(product.code);
  const decoded = decodeInsert(product.code);
  const related = productsIn(product.category)
    .filter((p) => p.family === product.family && p.code !== product.code)
    .slice(0, 4);

  const specs: Array<[string, string, boolean]> = [
    ['Product code', product.code, true],
    ['ISO family', product.family, true],
    ['Category', category.name, false],
  ];
  if (product.shape) specs.push(['Insert shape', product.shape, false]);
  if (product.geometry) specs.push(['Geometry / chipbreaker', product.geometry, true]);

  return (
    <>
      <div className="border-b border-rule bg-surface-subtle">
        <nav aria-label="Breadcrumb" className="shell flex flex-wrap items-center gap-1.5 py-3.5 text-[13.5px] text-ink-muted">
          <Link href="/products" className="rounded-sm font-semibold hover:text-ink">Products</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link href={`/products/${category.slug}`} className="rounded-sm font-semibold hover:text-ink">{category.name}</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-mono text-ink" aria-current="page">{product.code}</span>
        </nav>
      </div>

      <section className="section-tight bg-surface" aria-labelledby="product-title">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14">
          <figure className="panel overflow-hidden shadow-paper">
            <div className="product-stage flex aspect-[5/4] items-center justify-center p-8 md:p-12">
              {photo ? (
                <img src={photo} alt={`${product.code} carbide insert`} className="h-full w-full object-contain" />
              ) : (
                <InsertRender code={product.code} family={product.family} category={product.category} className="h-auto w-full max-w-[440px]" />
              )}
            </div>
            {!photo && (
              <figcaption className="flex items-center gap-2 border-t border-rule px-5 py-3 text-[13px] text-ink-muted">
                <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Illustration generated from the ISO designation — not a product photograph.
              </figcaption>
            )}
          </figure>

          <div>
            <p className="inline-flex items-center gap-2 text-[14px] font-semibold text-ink-soft">
              <span className="h-2 w-2 rounded-full" style={{ background: tone.hex }} aria-hidden="true" />
              {category.name}
            </p>
            <h1 id="product-title" className="mt-4 break-all font-mono text-[clamp(2.125rem,1.4rem+2.8vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
              {product.code}
            </h1>
            <p className="t-lead mt-3">
              <span className="font-mono">{product.family}</span> family{product.shape ? ` · ${product.shape}` : ''}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaLink href="#enquire" native arrow="tile">
                Request a Quote
              </CtaLink>
              <EnquireButton product={product} size="lg" />
            </div>

            <dl className="panel mt-9 divide-y divide-rule-soft overflow-hidden">
              {specs.map(([k, v, mono]) => (
                <div key={k} className="flex items-center justify-between gap-6 px-5 py-3.5">
                  <dt className="text-[14.5px] text-ink-muted">{k}</dt>
                  <dd className={`text-right text-[14.5px] font-semibold text-ink ${mono ? 'font-mono' : ''}`}>{v}</dd>
                </div>
              ))}
              <div className="flex items-center justify-between gap-6 px-5 py-3.5">
                <dt className="text-[14.5px] text-ink-muted">Grade &amp; coating</dt>
                <dd className="text-right text-[14.5px] text-ink-soft">Confirmed at quotation</dd>
              </div>
              <div className="flex items-center justify-between gap-6 bg-surface px-5 py-3.5">
                <dt className="text-[14.5px] text-ink-muted">Price</dt>
                <dd className="text-right text-[14.5px] font-bold text-bronze-text">On enquiry</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {decoded && (
        <section className="section-tight border-y border-rule bg-surface-subtle" aria-labelledby="breakdown-title">
          <div className="shell">
            <p className="t-eyebrow">Code breakdown</p>
            <h2 id="breakdown-title" className="t-h2 mt-3 text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)]">
              What <span className="font-mono">{product.code}</span> means
            </h2>
            <p className="t-body mt-3 max-w-2xl">
              Read according to ISO 1832. Grade and coating are not part of the code and are confirmed when we quote.
            </p>

            <p className="mt-9 flex flex-wrap gap-x-1.5 gap-y-3" aria-hidden="true">
              {decoded.map((s, i) => (
                <span key={s.key} className="flex flex-col items-center gap-2">
                  <span
                    className={`rounded-md px-1 font-mono text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] font-semibold leading-tight text-ink transition-all duration-200 ${
                      active === s.key ? 'bg-accent-soft' : ''
                    } ${active && active !== s.key ? 'opacity-30' : ''}`}
                  >
                    {s.chars}
                  </span>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[11px] font-semibold ${
                      active === s.key ? 'border-accent bg-accent text-ivory' : 'border-rule-strong bg-surface-card text-ink-muted'
                    }`}
                  >
                    {i + 1}
                  </span>
                </span>
              ))}
            </p>

            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {decoded.map((s, i) => (
                <li
                  key={s.key}
                  tabIndex={0}
                  onMouseEnter={() => setActive(s.key)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(s.key)}
                  onBlur={() => setActive(null)}
                  className="rounded-xl border border-rule bg-surface-card p-5 transition-colors hover:border-accent-line focus-visible:border-accent-line"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-rule-strong font-mono text-[11px] font-semibold text-ink-muted">
                      {i + 1}
                    </span>
                    <span className="rounded-md border border-rule bg-surface px-2 py-0.5 font-mono text-[15px] font-semibold text-ink">{s.chars}</span>
                  </div>
                  <p className="t-label mt-4">{s.label}</p>
                  <p className="mt-1 text-[15px] leading-snug text-ink">{s.meaning}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section-tight bg-surface" aria-labelledby="related-title">
          <div className="shell">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-title" className="t-h3 text-[24px]">
                Other <span className="font-mono">{product.family}</span> codes
              </h2>
              <Link href={`/products?family=${product.family}`} className="link-arrow text-[14.5px]">
                See all <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.code} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="enquire" className="section-tight border-t border-rule bg-surface-subtle" aria-labelledby="enquire-title">
        <div className="shell max-w-3xl">
          <p className="t-eyebrow">Enquire</p>
          <h2 id="enquire-title" className="t-h2 mt-3 text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)]">
            Price <span className="font-mono">{product.code}</span>
          </h2>
          <p className="t-body mb-8 mt-3">
            The code and category are already filled in. Add your quantity and material and we will reply with pricing and availability.
          </p>
          <RfqForm defaultCategory={product.category} defaultCode={product.code} />
        </div>
      </section>
    </>
  );
}
