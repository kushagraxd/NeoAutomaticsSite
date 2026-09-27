import { Link } from 'wouter';
import { ArrowRight, Check, Plus } from 'lucide-react';
import InsertRender from './insert-render';
import { productImage } from '../lib/product-images';
import { ctaClass } from './cta';
import { useEnquiry } from '../lib/enquiry-list';
import { toneFor } from '../lib/category-tones';
import { categoryById, type Product } from '../../../shared/catalog';

export const productHref = (p: Product) =>
  `/products/${categoryById(p.category)?.slug}/${encodeURIComponent(p.code)}`;

/** Toggles a product in the enquiry list. Sits above stretched card links. */
export function EnquireButton({ product, size = 'sm' }: { product: Product; size?: 'sm' | 'lg' }) {
  const { has, toggle } = useEnquiry();
  const added = has(product.code);
  const icon = size === 'lg' ? 'h-[18px] w-[18px]' : 'h-3.5 w-3.5';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(product);
      }}
      aria-pressed={added}
      aria-label={added ? `Remove ${product.code} from enquiry` : `Add ${product.code} to enquiry`}
      className={ctaClass({ variant: 'secondary', size: size === 'lg' ? 'lg' : 'xs', className: 'relative z-10' })}
    >
      {added ? <Check className={icon} aria-hidden="true" /> : <Plus className={icon} aria-hidden="true" />}
      {added ? 'Added' : size === 'lg' ? 'Add to enquiry' : 'Enquire'}
    </button>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const category = categoryById(product.category);
  const tone = toneFor(product.category);
  const photo = productImage(product.code);

  return (
    <article className="lift-card group flex h-full flex-col">
      <div className="product-stage relative flex h-44 items-center justify-center border-b border-rule-soft">
        <span className="absolute left-3 top-3 z-[1] inline-flex items-center gap-1.5 rounded-full border border-rule bg-surface-card px-2.5 py-1 text-[12px] font-semibold text-ink-soft">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone.hex }} aria-hidden="true" />
          {category?.short}
        </span>
        {photo ? (
          <img src={photo} alt={`${product.code} carbide insert`} className="h-full w-full object-contain p-5" loading="lazy" />
        ) : (
          <InsertRender code={product.code} family={product.family} category={product.category} className="h-[9.25rem] w-auto" />
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
        <h3 className="font-mono text-[15px] font-semibold tracking-tight text-ink">{product.code}</h3>
        <p className="mt-1 text-[13.5px] text-ink-muted">
          <span className="font-mono text-ink-soft">{product.family}</span>
          {product.shape ? ` · ${product.shape}` : ''}
        </p>
        <div className="mt-3 min-h-[1.625rem]">
          {product.geometry && <span className="code-chip">Geometry {product.geometry}</span>}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-rule-soft pt-3.5">
          {/* The link's ::after covers the card, so the whole card opens the product; Enquire sits above it. */}
          <Link
            href={productHref(product)}
            className="link-arrow text-[13.5px] no-underline after:absolute after:inset-0 after:rounded-2xl after:content-['']"
            aria-label={`View ${product.code}`}
          >
            View insert <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <EnquireButton product={product} />
        </div>
      </div>
    </article>
  );
}
