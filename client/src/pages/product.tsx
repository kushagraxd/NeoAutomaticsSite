import { Link, useParams } from 'wouter';
import { ChevronRight, ArrowRight, Info } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import InsertGlyph, { productImage } from '../components/insert-glyph';
import ProductCard from '../components/product-card';
import RfqForm from '../components/rfq-form';
import NotFound from './not-found';
import { categoryBySlug, productByCode, productsIn } from '../../../shared/catalog';

export default function ProductPage() {
  const { slug, code } = useParams<{ slug: string; code: string }>();
  const category = categoryBySlug(slug ?? '');
  const product = productByCode(decodeURIComponent(code ?? ''));

  usePageMeta(
    product ? `${product.code} — ${category?.name ?? 'Carbide Insert'}` : 'Product not found',
    product
      ? `${product.code} carbide insert${product.shape ? `, ${product.shape.toLowerCase()} shape` : ''}. Request pricing and availability from Sree Raj Tools.`
      : '',
  );

  if (!product || !category) return <NotFound />;

  const photo = productImage(product.code);
  const related = productsIn(product.category)
    .filter((p) => p.family === product.family && p.code !== product.code)
    .slice(0, 4);

  // Only fields we can state from the ISO code itself are shown.
  const specs: Array<[string, string]> = [
    ['Product code', product.code],
    ['ISO family', product.family],
    ['Category', category.name],
  ];
  if (product.shape) specs.push(['Insert shape', product.shape]);
  if (product.geometry) specs.push(['Geometry / chipbreaker', product.geometry]);

  return (
    <>
      <section className="border-b border-rule bg-surface-subtle py-4">
        <nav aria-label="Breadcrumb" className="shell flex flex-wrap items-center gap-1.5 text-[13px] text-ink-muted">
          <Link href="/products" className="hover:text-accent-ink">Products</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link href={`/products/${category.slug}`} className="hover:text-accent-ink">{category.name}</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-mono text-ink">{product.code}</span>
        </nav>
      </section>

      <section className="py-12 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[420px_1fr]">
          <div>
            <div className="flex aspect-square items-center justify-center border border-rule bg-surface-subtle">
              {photo ? (
                <img src={photo} alt={`${product.code} carbide insert`} className="h-full w-full object-contain p-8" />
              ) : (
                <InsertGlyph shape={product.shape} category={product.category} className="h-48 w-48" />
              )}
            </div>
            {!photo && (
              <p className="mt-3 flex gap-2 text-[13px] leading-relaxed text-ink-muted">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Schematic drawing of the insert shape. Product photography is being added.
              </p>
            )}
          </div>

          <div>
            <span className="accent-rule mb-5" />
            <h1 className="font-mono text-[34px] font-semibold tracking-tight text-ink sm:text-[42px]">
              {product.code}
            </h1>
            <p className="mt-3 text-[17px] text-ink-soft">
              {category.name.replace(/s$/, '')} — {product.family} family
              {product.shape ? `, ${product.shape.toLowerCase()}` : ''}.
            </p>

            <dl className="mt-8 border-t border-rule">
              {specs.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-rule py-3">
                  <dt className="text-[15px] text-ink-muted">{k}</dt>
                  <dd className={`text-[15px] font-medium text-ink ${k.includes('code') || k.includes('family') || k.includes('Geometry') ? 'font-mono' : ''}`}>
                    {v}
                  </dd>
                </div>
              ))}
              <div className="flex justify-between gap-6 border-b border-rule py-3">
                <dt className="text-[15px] text-ink-muted">Grade &amp; coating</dt>
                <dd className="text-[15px] text-ink-soft">Confirmed at quotation</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-rule py-3">
                <dt className="text-[15px] text-ink-muted">Price</dt>
                <dd className="text-[15px] font-medium text-accent-ink">On enquiry</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#enquire" className="btn-primary">
                Request a Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link href={`/products/${category.slug}`} className="btn-outline">
                Browse {category.short}
              </Link>
            </div>

            <p className="mt-6 max-w-lg text-[14px] leading-relaxed text-ink-muted">
              Available grades, coatings and lead times vary by quantity and source. Tell us your
              workpiece material and quantity and we will quote the right specification.
            </p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-rule bg-surface-subtle py-12">
          <div className="shell">
            <h2 className="mb-6 text-[24px]">Other {product.family} codes</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.code} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="enquire" className="scroll-mt-20 py-14 md:py-20">
        <div className="shell max-w-3xl">
          <span className="accent-rule mb-5" />
          <h2 className="text-[30px]">Enquire about {product.code}</h2>
          <p className="mb-8 mt-3 text-[16px] text-ink-soft">
            The code and category are already filled in. Add your quantity and material and we will
            come back with pricing and availability.
          </p>
          <RfqForm defaultCategory={product.category} defaultCode={product.code} />
        </div>
      </section>
    </>
  );
}
