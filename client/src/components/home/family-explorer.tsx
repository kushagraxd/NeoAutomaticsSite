import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import Reveal from '../reveal';
import { categories, countsByCategory, familiesIn, totalFamilyCount, totalProductCount, type CategoryId } from '../../../../shared/catalog';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { capitalise, numberWord } from '../../lib/number-words';

const counts = countsByCategory();
const OPS = categories
  .filter((c) => !c.enquiryOnly)
  .map((c) => ({ c, families: familiesIn(c.id), codes: counts[c.id] }));
const MAX = Math.max(...OPS.map((o) => o.families.length));

function FamilyChips({ id, families }: { id: CategoryId; families: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {families.map((f, i) => (
        <li key={f} className="fam-chip-item" style={{ '--i': Math.min(i, 30) } as CSSProperties}>
          <Link href={`/products?category=${id}&family=${encodeURIComponent(f)}`} className="fam-chip" aria-label={`Show ${f} inserts`}>
            {f}
            <ArrowUpRight className="fam-chip-arrow h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Relative catalogue breadth for one operation. */
function Breadth({ count, index, active }: { count: number; index: number; active: boolean }) {
  return (
    <span className="fam-bar" aria-hidden="true">
      <span
        className={`fam-bar-fill ${active ? 'is-active' : ''}`}
        style={{ width: `${(count / MAX) * 100}%`, '--d': `${120 + index * 90}ms` } as CSSProperties}
      />
    </span>
  );
}

/**
 * Every ISO family in the catalogue, explored by operation. Tabs on wider
 * screens (arrow keys move between operations), an accordion on phones.
 */
export default function FamilyExplorer() {
  const ref = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [selected, setSelected] = useState<CategoryId>(OPS[0].c.id);
  const [shown, setShown] = useState<CategoryId>(OPS[0].c.id);
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const [openMobile, setOpenMobile] = useState<CategoryId | null>(OPS[0].c.id);
  const swap = useRef<number>();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => () => window.clearTimeout(swap.current), []);

  const select = (id: CategoryId) => {
    if (id === selected) return;
    setSelected(id);
    window.clearTimeout(swap.current);
    if (reduced) {
      setShown(id);
      return;
    }
    // Current chips leave quickly, then the new set enters with a short stagger.
    setPhase('out');
    swap.current = window.setTimeout(() => {
      setShown(id);
      setPhase('in');
    }, 130);
  };

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = OPS.findIndex((o) => o.c.id === selected);
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (i + 1) % OPS.length
      : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (i - 1 + OPS.length) % OPS.length
      : e.key === 'Home' ? 0
      : e.key === 'End' ? OPS.length - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    select(OPS[next].c.id);
    tabRefs.current[next]?.focus();
  };

  const current = OPS.find((o) => o.c.id === shown) ?? OPS[0];

  return (
    <div ref={ref} className="fam mt-16 md:mt-20" data-in={inView}>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-4">
          <div>
            <h3 className="text-[21px] font-bold tracking-[-0.015em] text-ink">{totalFamilyCount} ISO families, by operation</h3>
            <p className="t-meta mt-1">
              {capitalise(numberWord(OPS.length))} operations · {totalProductCount} listed codes
            </p>
          </div>
          <Link href="/products" className="link-arrow text-[14.5px]">
            Full catalogue <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>

      {/* Tabs — tablets and up */}
      <div className="panel mt-6 hidden overflow-hidden shadow-paper md:grid md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
        <div role="tablist" aria-orientation="vertical" aria-label="Operations" className="border-r border-rule-soft p-2" onKeyDown={onTabKey}>
          {OPS.map((o, i) => {
            const on = o.c.id === selected;
            return (
              <button
                key={o.c.id}
                ref={(el) => (tabRefs.current[i] = el)}
                type="button"
                role="tab"
                id={`fam-tab-${o.c.id}`}
                aria-selected={on}
                aria-controls="fam-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => select(o.c.id)}
                className="fam-tab"
                data-active={on}
              >
                <span className="flex w-full items-baseline justify-between gap-3">
                  <span className="text-[16px] font-bold">{o.c.short}</span>
                  <span className="fam-count t-meta" style={{ '--d': `${80 + i * 90}ms` } as CSSProperties}>
                    {o.families.length} families
                  </span>
                </span>
                <Breadth count={o.families.length} index={i} active={on} />
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id="fam-panel" aria-labelledby={`fam-tab-${selected}`} tabIndex={0} className="min-w-0 p-6 lg:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="text-[17px] font-bold text-ink">{current.c.name}</p>
            <p className="t-meta">
              {current.families.length} families · {current.codes} listed codes
            </p>
          </div>
          <div className="fam-chips mt-5" data-phase={phase} key={shown}>
            <FamilyChips id={current.c.id} families={current.families} />
          </div>
          <Link href={`/products/${current.c.slug}`} className="link-arrow mt-7 text-[14.5px]">
            Browse {current.c.short.toLowerCase()} inserts <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Accordion — phones */}
      <ul className="mt-5 space-y-2 md:hidden">
        {OPS.map((o, i) => {
          const open = openMobile === o.c.id;
          return (
            <li key={o.c.id} className="panel overflow-hidden">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`fam-acc-${o.c.id}`}
                onClick={() => setOpenMobile(open ? null : o.c.id)}
                className="fam-tab rounded-none"
                data-active={open}
              >
                <span className="flex w-full items-center justify-between gap-3">
                  <span className="text-[16px] font-bold">{o.c.short}</span>
                  <span className="flex items-center gap-2">
                    <span className="fam-count t-meta" style={{ '--d': `${80 + i * 90}ms` } as CSSProperties}>
                      {o.families.length} families
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </span>
                </span>
                <Breadth count={o.families.length} index={i} active={open} />
              </button>
              <div id={`fam-acc-${o.c.id}`} hidden={!open} className="fam-chips border-t border-rule-soft p-4" data-phase="in">
                {open && <FamilyChips id={o.c.id} families={o.families} />}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
