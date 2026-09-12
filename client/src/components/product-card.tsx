import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import InsertGlyph, { productImage } from './insert-glyph';
import { categoryById, type Product } from '../../../shared/catalog';

export default function ProductCard({ product }: { product: Product }) {
  const category = categoryById(product.category);
  const photo = productImage(product.code);

  return (
    <Link
      href={`/products/${category?.slug}/${encodeURIComponent(product.code)}`}
      className="tile group flex flex-col p-3"
    >
      <div className="mb-3.5 flex h-28 items-center justify-center rounded-md bg-surface-subtle">
        {photo ? (
          <img src={photo} alt={`${product.code} carbide insert`} className="h-full w-full object-contain p-3" loading="lazy" />
        ) : (
          <InsertGlyph
            shape={product.shape}
            category={product.category}
            className="h-16 w-16 transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-1.5">
        <div className="flex items-start justify-between gap-2">
          <p className="code font-medium text-ink">{product.code}</p>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>

        <dl className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12.5px] text-ink-muted">
          <dt className="sr-only">Family</dt>
          <dd className="font-mono">{product.family}</dd>
          {product.shape && (
            <>
              <span aria-hidden="true" className="text-rule-strong">/</span>
              <dt className="sr-only">Shape</dt>
              <dd>{product.shape}</dd>
            </>
          )}
        </dl>

        <span className="mt-auto pt-3 text-[12.5px] font-medium text-ink-muted transition-colors group-hover:text-ink">
          Request a quote
        </span>
      </div>
    </Link>
  );
}
