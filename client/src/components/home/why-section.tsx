import Reveal from '../reveal';
import { company } from '../../../../shared/company';
import { listSentence } from '../../lib/number-words';

const REASONS = [
  {
    title: 'The code you already use',
    body: 'Search by the ISO designation on your current insert box. No proprietary numbering, no cross-reference tables.',
  },
  {
    title: 'Standard and special',
    body: 'Common geometries across five operations, plus special-design inserts sourced against a drawing or sample.',
  },
  {
    title: 'Two sourcing regions, one contact',
    body: `We buy directly from producers in ${listSentence(company.sourcingRegions)}, so you never coordinate overseas suppliers yourself.`,
  },
  {
    title: 'Quoted, not listed',
    body: 'Price depends on grade, quantity and lead time. We quote the job, so the specification matches the work.',
  },
];

/** Text-led: a heading column and four reasons on hairlines — no cards, no icons. */
export default function WhySection() {
  return (
    <section className="section bg-surface-card" aria-labelledby="why-title">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal>
          <p className="t-eyebrow">Why {company.displayName}</p>
          <h2 id="why-title" className="t-h2 mt-4 max-w-[14ch]">
            A supplier that works the way a buyer does.
          </h2>
        </Reveal>

        <dl className="grid gap-x-10 sm:grid-cols-2">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={(i % 2) * 80} className="border-t border-rule py-7">
              <dt className="text-[18px] font-bold tracking-[-0.015em] text-ink">{r.title}</dt>
              <dd className="t-body mt-2.5">{r.body}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
