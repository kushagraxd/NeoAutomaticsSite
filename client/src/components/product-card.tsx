import { Link } from 'wouter';
import { ArrowUpRight, Check, Plus } from 'lucide-react';
import InsertRender from './insert-render';
import { productImage } from './insert-glyph';
import { useEnquiry } from '../lib/enquiry-list';
import { toneFor } from '../lib/category-tones';
import { categoryById, type Product } from '../../../shared/catalog';

export const productHref = (p: Product) =>
  `/products/${categoryById(p.category)?.slug}/${encodeURIComponent(p.code)}`;

/** Toggles a product in the enquiry list. Sits above stretched card links. */
export function EnquireButton({ product, size = 'sm' }: { product: Product; size?: 'sm' | 'lg' }) {
  const { has, toggle } = useEnquiry();
  const added = has(product.code);
  const tone = toneFor(product.category);
  const sizing = size === 'lg' ? 'px-5 py-[0.95rem] text-[15px]' : 'px-3 py-1.5 text-[12.5px]';
  const icon = size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5';

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
      className={`relative z-10 inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border font-semibold transition-all duration-200 active:scale-95 ${sizing} ${
        added ? '' : 'border-rule-strong bg-surface-panel text-ink hover:border-brand hover:bg-brand hover:text-white'
      }`}
      style={added ? { background: tone.hex, borderColor: tone.hex, color: '#09090b' } : undefined}
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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-surface-card transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(var(--brand-bright-rgb),0.4)] hover:shadow-lift motion-reduce:hover:translate-y-0">
      <div
        className="relative flex h-44 items-center justify-center overflow-hidden"
        style={{ background: `radial-gradient(120% 90% at 50% 105%, rgba(${tone.rgb},.26), transparent 62%), radial-gradient(60% 55% at 50% 38%, rgba(255,255,255,.05), transparent 70%), var(--surface-stage)` }}
      >
        <span className="absolute left-3 top-3 z-[1] inline-flex items-center gap-1.5 rounded-full border border-rule bg-[rgba(var(--night-rgb),0.72)] px-2.5 py-1 text-[11.5px] font-medium text-ink-soft backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone.hex }} aria-hidden="true" />
          {category?.short}
        </span>
        {photo ? (
          <img src={photo} alt={`${product.code} carbide insert`} className="h-full w-full object-contain p-5" loading="lazy" />
        ) : (
          <InsertRender
            code={product.code}
            family={product.family}
            category={product.category}
            className="h-[9.5rem] w-auto transition-transform duration-500 ease-out group-hover:-rotate-[4deg] group-hover:scale-[1.08]"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <h3 className="font-mono text-[15px] font-semibold tracking-tight text-ink">
          <Link
            href={productHref(product)}
            className="rounded-2xl after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-[var(--brand-bright)]"
          >
            {product.code}
          </Link>
        </h3>
        <p className="mt-1 text-[13px] text-ink-muted">
          <span className="font-mono">{product.family}</span>
          {product.shape ? ` · ${product.shape}` : ''}
        </p>
        {product.geometry && (
          <span className="mt-2.5 self-start rounded-md bg-surface-panel px-2 py-0.5 font-mono text-[11.5px] text-ink-soft">
            Geometry {product.geometry}
          </span>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="inline-flex items-center gap-1 text-[13.5px] font-medium text-ink-muted transition-colors group-hover:text-ink">
            View insert
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
          <EnquireButton product={product} />
        </div>
      </div>
    </article>
  );
}
