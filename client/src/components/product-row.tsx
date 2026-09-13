import { Link } from 'wouter';
import InsertRender from './insert-render';
import { EnquireButton, productHref } from './product-card';
import { toneFor } from '../lib/category-tones';
import { categoryById, type Product } from '../../../shared/catalog';

export function ProductRowHeader() {
  return (
    <div className="hidden grid-cols-[72px_1.4fr_.7fr_1fr_.9fr_auto] gap-4 border-b border-rule bg-surface-subtle px-5 py-2.5 md:grid">
      {['', 'Code', 'Family', 'Shape', 'Category', ''].map((h, i) => (
        <span key={i} className="label text-ink-muted">{h}</span>
      ))}
    </div>
  );
}

export default function ProductRow({ product }: { product: Product }) {
  const category = categoryById(product.category);
  const tone = toneFor(product.category);

  return (
    <li className="group relative grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-rule px-4 py-3 transition-colors last:border-b-0 hover:bg-surface-subtle md:grid-cols-[72px_1.4fr_.7fr_1fr_.9fr_auto] md:px-5">
      <div
        className="flex h-14 items-center justify-center rounded-lg"
        style={{ background: `radial-gradient(90% 80% at 50% 105%, rgba(${tone.rgb},.26), transparent 70%), var(--surface-stage)` }}
      >
        <InsertRender code={product.code} family={product.family} category={product.category} className="h-12 w-auto transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="min-w-0">
        <Link
          href={productHref(product)}
          className="font-mono text-[14.5px] font-semibold text-ink transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent-ink"
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
      <span className="hidden md:block">
        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium text-ink-soft" style={{ background: `rgba(${tone.rgb},.16)` }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone.hex }} aria-hidden="true" />
          {category?.short}
        </span>
      </span>
      <EnquireButton product={product} />
    </li>
  );
}
