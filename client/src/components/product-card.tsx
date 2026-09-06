import { Link } from 'wouter';
import InsertGlyph, { productImage } from './insert-glyph';
import { categoryById, type Product } from '../../../shared/catalog';

export default function ProductCard({ product }: { product: Product }) {
  const category = categoryById(product.category);
  const photo = productImage(product.code);

  return (
    <Link
      href={`/products/${category?.slug}/${encodeURIComponent(product.code)}`}
      className="tile group flex flex-col p-4"
    >
      <div className="mb-3 flex h-24 items-center justify-center bg-surface-subtle">
        {photo ? (
          <img src={photo} alt={`${product.code} carbide insert`} className="h-full w-full object-contain" loading="lazy" />
        ) : (
          <InsertGlyph shape={product.shape} category={product.category} className="h-16 w-16" />
        )}
      </div>

      <p className="code font-medium group-hover:text-accent-ink">{product.code}</p>

      <dl className="mt-2 space-y-0.5 text-[13px] text-ink-muted">
        <div className="flex gap-1.5">
          <dt className="sr-only">Family</dt>
          <dd className="font-mono">{product.family}</dd>
          {product.shape && (
            <>
              <span aria-hidden="true">·</span>
              <dt className="sr-only">Shape</dt>
              <dd>{product.shape}</dd>
            </>
          )}
        </div>
        {product.geometry && (
          <div className="flex gap-1.5">
            <dt>Geometry</dt>
            <dd className="font-mono text-ink-soft">{product.geometry}</dd>
          </div>
        )}
      </dl>

      <span className="mt-3 text-[13px] font-semibold text-accent-ink">Request a quote →</span>
    </Link>
  );
}
