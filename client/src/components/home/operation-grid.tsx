import { useState, type FormEvent } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, Search } from 'lucide-react';
import Reveal from '../reveal';
import CategoryMedia from './category-media';
import { CtaButton } from '../cta';
import { categories, countsByCategory, productsIn, type Category, type CategoryId } from '../../../../shared/catalog';
import type { OperationId } from '../../lib/category-media';
import { capitalise, listSentence, numberWord } from '../../lib/number-words';

/** One practical line per operation, condensed from the category descriptions in shared/catalog.ts. */
const SUMMARY: Record<OperationId, string> = {
  turning: 'External and internal turning, facing and boring on CNC and conventional lathes.',
  milling: 'Face, shoulder and slot milling and profiling, including round and high-feed geometries.',
  drilling: 'Indexable drilling and hole-making inserts for U-drills and similar tooling.',
  grooving: 'Parting off, external and internal grooving, and recessing.',
  threading: 'External and internal thread turning with laydown thread profiles.',
};

const isOperation = (id: CategoryId): id is OperationId => id in SUMMARY;

type Operation = Category & { id: OperationId };

const operations: Operation[] = categories.flatMap((c) => (!c.enquiryOnly && isOperation(c.id) ? [{ ...c, id: c.id }] : []));

/** Families in a category, most-listed first. */
function familiesByCount(id: OperationId): string[] {
  const tally = new Map<string, number>();
  for (const p of productsIn(id)) tally.set(p.family, (tally.get(p.family) ?? 0) + 1);
  return Array.from(tally.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([family]) => family);
}

const FAMILY_PREVIEW = 4;

function OperationCard({ op, count, wide }: { op: Operation; count: number; wide: boolean }) {
  // Hover or keyboard focus anywhere in the card drives the media (360° playback, when supplied).
  const [active, setActive] = useState(false);
  const [, navigate] = useLocation();
  const families = familiesByCount(op.id);
  const shown = families.slice(0, FAMILY_PREVIEW);
  const more = families.length - shown.length;

  return (
    <article
      className={`lift-card flex h-full flex-col md:flex-row lg:flex-col ${wide ? 'xl:flex-row' : ''}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <CategoryMedia
        operation={op.id}
        label={op.short}
        active={active}
        onSelect={() => navigate(`/products/${op.slug}`)}
        className={`aspect-[16/10] shrink-0 border-b border-rule md:aspect-auto md:min-h-[260px] md:w-[42%] md:border-b-0 md:border-r lg:aspect-[16/10] lg:min-h-0 lg:w-auto lg:border-b lg:border-r-0 ${
          wide ? 'xl:aspect-auto xl:min-h-[300px] xl:w-[46%] xl:border-b-0 xl:border-r' : ''
        }`}
      />

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="t-meta">{count} listed codes</p>
        <h3 className="t-h3 mt-2">{op.name}</h3>
        <p className="t-body mt-2.5">{SUMMARY[op.id]}</p>

        <ul className="mt-5 flex flex-wrap items-center gap-1.5" aria-label={`Most-listed ${op.short.toLowerCase()} families`}>
          {shown.map((f) => (
            <li key={f} className="code-chip">
              {f}
            </li>
          ))}
          {more > 0 && <li className="t-meta pl-1">+{more} more</li>}
        </ul>

        <div className="mt-auto pt-6">
          {/* The link's ::after covers the card, so the whole card is one target with one tab stop. */}
          <Link href={`/products/${op.slug}`} className="link-arrow text-[15px] after:absolute after:inset-0 after:content-['']">
            Browse {op.short.toLowerCase()} inserts
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function CodeSearch() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
  };

  return (
    <form role="search" onSubmit={submit} className="mt-5 flex w-full max-w-md gap-2 lg:mt-0">
      <label htmlFor="home-code-search" className="sr-only">
        Search the catalogue by ISO code
      </label>
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
        <input
          id="home-code-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ISO code, e.g. CNMG120408"
          autoComplete="off"
          spellCheck={false}
          className="h-12 w-full rounded-[10px] border border-rule-strong bg-surface-card pl-10 pr-3 font-mono text-[15px] uppercase text-ink transition-colors placeholder:font-sans placeholder:normal-case placeholder:text-ink-muted hover:border-accent-line-muted focus:border-accent focus:outline-none focus:ring-4 focus:ring-[rgba(var(--accent-rgb),0.16)]"
        />
      </div>
      <CtaButton type="submit" size="md">
        Search
      </CtaButton>
    </form>
  );
}

export default function OperationGrid() {
  const counts = countsByCategory();
  const opNames = listSentence(operations.map((o) => o.short.toLowerCase()));

  return (
    <section className="section bg-surface" aria-labelledby="operations-title">
      <div className="shell">
        <Reveal>
          <h2 id="operations-title" className="t-h2">
            <span className="block">One catalogue.</span>
            <span className="block">{capitalise(numberWord(operations.length))} core machining operations.</span>
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-6 grid gap-2 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-end lg:gap-16">
            <p className="t-lead max-w-2xl">
              Explore listed insert families for {opNames} — or search directly using the ISO code already on your box.
            </p>
            <CodeSearch />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:gap-5 lg:grid-cols-6">
          {operations.map((op, i) => {
            const wide = i < 2;
            return (
              <Reveal key={op.id} delay={(i % 3) * 70} className={wide ? 'lg:col-span-3' : 'lg:col-span-2'}>
                <OperationCard op={op} count={counts[op.id]} wide={wide} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
