import Reveal from '../reveal';
import { categories, totalFamilyCount, totalProductCount } from '../../../../shared/catalog';
import { representativeInsert } from '../../lib/category-media';

const listed = categories.filter((c) => !c.enquiryOnly);
const enquiryOnly = categories.filter((c) => c.enquiryOnly);
const samples = Object.values(representativeInsert);

/** Real codes from the catalogue — the evidence behind the number. */
function CodesCue() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {samples.slice(0, 2).map((s) => (
        <span key={s.code} className="code-chip">
          {s.code}
        </span>
      ))}
      <span className="code-chip border-dashed text-ink-muted">…</span>
    </div>
  );
}

/** One family per operation, turning through threading. */
function FamiliesCue() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {samples.map((s) => (
        <span key={s.family} className="code-chip">
          {s.family}
        </span>
      ))}
    </div>
  );
}

/** Listed categories filled, enquiry-only categories outlined. */
function CategoriesCue() {
  return (
    <div>
      <div className="flex gap-1">
        {listed.map((c) => (
          <span key={c.id} className="h-2 flex-1 rounded-full bg-accent" />
        ))}
        {enquiryOnly.map((c) => (
          <span key={c.id} className="h-2 flex-1 rounded-full border border-dashed border-ink-muted" />
        ))}
      </div>
      <p className="t-meta mt-2.5">
        {listed.length} listed · {enquiryOnly.length} on enquiry
      </p>
    </div>
  );
}

const first = listed[0]?.short.toLowerCase();
const last = listed[listed.length - 1]?.short.toLowerCase();

const METRICS = [
  { value: totalProductCount, label: 'Product codes', note: 'Searchable by ISO designation', Cue: CodesCue },
  { value: totalFamilyCount, label: 'ISO families', note: `Covering ${first} through ${last}`, Cue: FamiliesCue },
  { value: categories.length, label: 'Product categories', note: 'Catalogue range plus custom sourcing', Cue: CategoriesCue },
];

export default function RangeProof() {
  return (
    <section aria-label="Catalogue range" className="bg-surface pt-8 md:pt-12">
      <div className="shell">
        <Reveal>
          <ul className="grid divide-y divide-rule overflow-hidden rounded-2xl border border-rule bg-surface-card shadow-paper md:grid-cols-3 md:divide-x md:divide-y-0">
            {METRICS.map(({ value, label, note, Cue }) => (
              <li key={label} className="flex flex-col p-7 lg:p-9">
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="tabnum text-[clamp(3rem,2.3rem+1.9vw,4rem)] font-extrabold leading-none tracking-[-0.045em] text-ink">
                    {value}
                  </span>
                  <span className="text-[17px] font-bold tracking-[-0.01em] text-ink">{label}</span>
                </p>
                <p className="t-body mt-3">{note}</p>
                <div className="mt-auto pt-6" aria-hidden="true">
                  <div className="border-t border-rule pt-5">
                    <Cue />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
