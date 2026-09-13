import { Link } from 'wouter';
import { products, categoryById, type CategoryId } from '../../../../shared/catalog';
import { toneFor } from '../../lib/category-tones';

const familyCategory = new Map<string, CategoryId>();
for (const p of products) if (!familyCategory.has(p.family)) familyCategory.set(p.family, p.category);
const FAMILIES = Array.from(familyCategory.keys()).sort();

function Row({ items, reverse, duration }: { items: string[]; reverse?: boolean; duration: number }) {
  // The list is rendered twice so the -50% translate loops without a seam.
  const doubled = [...items, ...items];
  return (
    <div className="marquee overflow-hidden py-1.5">
      <ul
        className="marquee-track gap-2.5"
        data-direction={reverse ? 'reverse' : undefined}
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        {doubled.map((f, i) => {
          const cat = familyCategory.get(f)!;
          const tone = toneFor(cat);
          const hidden = i >= items.length;
          return (
            <li key={`${f}-${i}`} aria-hidden={hidden || undefined}>
              <Link
                href={`/products?q=${f}`}
                tabIndex={hidden ? -1 : undefined}
                className="group flex items-center gap-2.5 whitespace-nowrap rounded-full border border-rule bg-surface-card px-4 py-2.5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = tone.hex)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: tone.hex }} aria-hidden="true" />
                <span className="font-mono text-[14px] font-medium text-ink">{f}</span>
                <span className="text-[12.5px] text-ink-muted">{categoryById(cat)?.short}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function FamilyMarquee() {
  const half = Math.ceil(FAMILIES.length / 2);
  return (
    <div aria-label={`${FAMILIES.length} insert families`}>
      <Row items={FAMILIES.slice(0, half)} duration={70} />
      <Row items={FAMILIES.slice(half)} duration={80} reverse />
    </div>
  );
}

export const familyCount = FAMILIES.length;
