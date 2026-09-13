import { Link, useParams } from 'wouter';
import { ArrowRight, ChevronRight, Info } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import InsertRender from '../components/insert-render';
import { productImage } from '../components/insert-glyph';
import ProductCard, { EnquireButton } from '../components/product-card';
import RfqForm from '../components/rfq-form';
import NotFound from './not-found';
import { decodeInsert, SEGMENT_COLOURS } from '../lib/iso-decoder';
import { toneFor } from '../lib/category-tones';
import { categoryBySlug, productByCode, productsIn } from '../../../shared/catalog';

export default function ProductPage() {
  const { slug, code } = useParams<{ slug: string; code: string }>();
  const category = categoryBySlug(slug ?? '');
  const product = productByCode(decodeURIComponent(code ?? ''));

  usePageMeta(
    product ? `${product.code} — ${category?.name ?? 'Carbide Insert'}` : 'Product not found',
    product
      ? `${product.code} carbide insert${product.shape ? `, ${product.shape.toLowerCase()} shape` : ''}. Request pricing and availability from ShreeRaj Tools.`
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
        <nav aria-label="Breadcrumb" className="shell flex flex-wrap items-center gap-1.5 py-3.5 text-[13px] text-ink-muted">
          <Link href="/products" className="hover:text-ink">Products</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link href={`/products/${category.slug}`} className="hover:text-ink">{category.name}</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-mono text-ink">{product.code}</span>
        </nav>
      </div>

      <section className="bg-surface py-10 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="relative overflow-hidden rounded-3xl bg-night">
            <div className="absolute inset-0 night-glow" aria-hidden="true" />
            <div className="absolute inset-0 grid-lines opacity-60" aria-hidden="true" />
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(55% 45% at 50% 72%, rgba(${tone.rgb},.26), transparent 70%)` }}
              aria-hidden="true"
            />
            <div className="relative flex aspect-[5/4] items-center justify-center p-8 md:p-12">
              {photo ? (
                <img src={photo} alt={`${product.code} carbide insert`} className="h-full w-full object-contain" />
              ) : (
                <InsertRender code={product.code} family={product.family} category={product.category} className="float h-auto w-full max-w-[460px]" />
              )}
            </div>
            {!photo && (
              <p className="relative flex items-center gap-2 border-t border-white/[.08] px-6 py-3 text-[12.5px] text-night-muted">
                <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Illustration generated from the ISO designation — not a product photograph.
              </p>
            )}
          </div>

          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] font-medium text-ink-soft"
              style={{ background: `rgba(${tone.rgb},.16)` }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: tone.hex }} aria-hidden="true" />
              {category.name}
            </span>
            <h1 className="mt-5 break-all font-mono text-[clamp(2.25rem,4.6vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
              {product.code}
            </h1>
            <p className="mt-4 text-[17px] text-ink-soft">
              {product.family} family{product.shape ? ` · ${product.shape}` : ''}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#enquire" className="btn-primary btn-lg group">
                Request a Quote
                <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <EnquireButton product={product} size="lg" />
            </div>

            <dl className="mt-10 divide-y divide-rule overflow-hidden rounded-2xl border border-rule bg-white">
              {specs.map(([k, v, mono]) => (
                <div key={k} className="flex items-center justify-between gap-6 px-5 py-3.5">
                  <dt className="text-[14.5px] text-ink-muted">{k}</dt>
                  <dd className={`text-right text-[14.5px] font-medium text-ink ${mono ? 'font-mono' : ''}`}>{v}</dd>
                </div>
              ))}
              <div className="flex items-center justify-between gap-6 px-5 py-3.5">
                <dt className="text-[14.5px] text-ink-muted">Grade &amp; coating</dt>
                <dd className="text-right text-[14.5px] text-ink-soft">Confirmed at quotation</dd>
              </div>
              <div className="flex items-center justify-between gap-6 bg-surface-subtle px-5 py-3.5">
                <dt className="text-[14.5px] text-ink-muted">Price</dt>
                <dd className="text-right text-[14.5px] font-semibold text-accent-ink">On enquiry</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {decoded && (
        <section className="border-y border-rule bg-surface-subtle py-16 md:py-20">
          <div className="shell">
            <p className="eyebrow mb-4">Code breakdown</p>
            <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-tight tracking-[-0.035em]">
              What <span className="font-mono">{product.code}</span> means
            </h2>
            <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-muted">
              Read according to ISO 1832. Grade and coating are not part of the code and are confirmed when we quote.
            </p>
            <ol className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {decoded.map((s) => (
                <li key={s.key} className="rounded-2xl border border-rule bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-lift">
                  <span
                    className="inline-block rounded-md px-2 py-1 font-mono text-[18px] font-semibold text-ink"
                    style={{ background: `${SEGMENT_COLOURS[s.key]}33`, boxShadow: `inset 0 -2px 0 ${SEGMENT_COLOURS[s.key]}` }}
                  >
                    {s.chars}
                  </span>
                  <p className="mt-3 text-[11.5px] font-medium uppercase tracking-[0.08em] text-ink-muted">{s.label}</p>
                  <p className="mt-1 text-[15px] leading-snug text-ink">{s.meaning}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-surface py-14 md:py-16">
          <div className="shell">
            <div className="mb-7 flex items-end justify-between gap-4">
              <h2 className="text-[24px] font-semibold tracking-[-0.03em]">Other {product.family} codes</h2>
              <Link href={`/products?family=${product.family}`} className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink transition-all hover:gap-2.5">
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

      <section id="enquire" className="scroll-mt-20 border-t border-rule bg-surface-subtle py-14 md:py-20">
        <div className="shell max-w-3xl">
          <p className="eyebrow mb-4">Enquire</p>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-[-0.035em]">
            Price <span className="font-mono">{product.code}</span>
          </h2>
          <p className="mb-8 mt-3 text-[16px] text-ink-muted">
            The code and category are already filled in. Add your quantity and material and we will reply with pricing and availability.
          </p>
          <RfqForm defaultCategory={product.category} defaultCode={product.code} />
        </div>
      </section>
    </>
  );
}
