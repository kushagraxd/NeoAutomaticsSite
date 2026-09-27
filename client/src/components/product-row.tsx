import { Link } from 'wouter';
import InsertRender from './insert-render';
import { EnquireButton, productHref } from './product-card';
import { toneFor } from '../lib/category-tones';
import { categoryById, type Product } from '../../../shared/catalog';

const COLUMNS = 'md:grid-cols-[72px_1.4fr_.7fr_1fr_.9fr_auto]';

export function ProductRowHeader() {
  return (
    <div className={`hidden gap-4 border-b border-rule bg-surface px-5 py-2.5 md:grid ${COLUMNS}`} aria-hidden="true">
      {['', 'Code', 'Family', 'Shape', 'Category', ''].map((h, i) => (
        <span key={i} className="t-label">
          {h}
        </span>
      ))}
    </div>
  );
}

export default function ProductRow({ product }: { product: Product }) {
  const category = categoryById(product.category);
  const tone = toneFor(product.category);

  return (
    <li className={`group relative grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-rule-soft px-4 py-3 transition-colors last:border-b-0 hover:bg-surface-panel md:px-5 ${COLUMNS}`}>
      <div className="product-stage flex h-14 items-center justify-center rounded-lg">
        <InsertRender code={product.code} family={product.family} category={product.category} className="h-12 w-auto" />
      </div>
      <div className="min-w-0">
        <Link
          href={productHref(product)}
          className="rounded-sm font-mono text-[14.5px] font-semibold text-ink underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:underline"
        >
          {product.code}
        </Link>
        <p className="mt-0.5 truncate text-[12.5px] text-ink-muted md:hidden">
          {product.family}
          {product.shape ? ` · ${product.shape}` : ''}
        </p>
      </div>
      <span className="hidden font-mono text-[13px] text-ink-soft md:block">{product.family}</span>
      <span className="hidden text-[13.5px] text-ink-soft md:block">{product.shape ?? '—'}</span>
      <span className="hidden items-center gap-1.5 text-[13px] font-medium text-ink-soft md:inline-flex">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone.hex }} aria-hidden="true" />
        {category?.short}
      </span>
      <EnquireButton product={product} />
    </li>
  );
}
