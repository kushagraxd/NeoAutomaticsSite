import { useEffect, useRef, useState } from 'react';
import SectionHeader from './section-header';
import { company } from '../../../../shared/company';
import { capitalise, listSentence, numberWord } from '../../lib/number-words';
import { useReducedMotion } from '../../lib/useReducedMotion';

const STEPS = [
  {
    title: 'Send the requirement',
    body: 'An ISO code, a drawing, a photograph of a worn insert, or the part you currently buy. Tell us the quantity and where it needs to go.',
  },
  {
    title: 'We confirm the source',
    body: `We check specification, grade and availability with producers in ${listSentence(company.sourcingRegions)} — and say so if something can’t be sourced.`,
  },
  {
    title: 'You receive a quotation',
    body: 'Pricing, lead time and packing against your actual requirement, rather than a list price that may not fit the job.',
  },
  {
    title: 'We import and supply',
    body: 'Documentation and delivery against your confirmed order.',
  },
];

const WIDE = '(min-width: 1024px)';

/**
 * Four steps on a progress line that fills as the section scrolls through the
 * viewport — horizontal on desktop, vertical below 1024 px. Scroll is only
 * observed while the section is near the viewport and is never captured.
 * Reduced motion shows every step at once.
 */
export default function ProcessTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(-1);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (reduced) {
      setProgress(1);
      setCurrent(STEPS.length - 1);
      setReached(STEPS.length);
      return;
    }

    const wide = window.matchMedia(WIDE);
    let frame = 0;

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      let at: number;
      if (wide.matches) {
        // The row fills as it rises from 85 % to 40 % of the viewport.
        p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.45)));
        // A step lights as the fill reaches its dot.
        at = r.top < vh * 0.85 ? Math.floor(p * (STEPS.length - 1) + 0.04) : -1;
      } else {
        // The fill follows a reading line at 70 % of the viewport.
        const line = vh * 0.7;
        p = Math.min(1, Math.max(0, (line - r.top) / r.height));
        at = -1;
        el.querySelectorAll<HTMLElement>(':scope > li').forEach((step, i) => {
          if (step.getBoundingClientRect().top < line) at = i;
        });
      }
      setProgress(p);
      setCurrent(at);
      setReached((n) => Math.max(n, at + 1));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    let listening = false;
    const listen = (on: boolean) => {
      if (on === listening) return;
      listening = on;
      if (on) {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        update();
      } else {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    };

    // Only follow scroll while the list is near the viewport.
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => listen(entry.isIntersecting), { rootMargin: '25% 0px 25% 0px' })
        : null;
    if (io) io.observe(el);
    else listen(true);
    update();

    return () => {
      io?.disconnect();
      listen(false);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <section className="section bg-surface" aria-labelledby="process-title">
      <div className="shell">
        <SectionHeader
          id="process-title"
          title="How sourcing works"
          lead={`${capitalise(numberWord(STEPS.length))} steps, one point of contact. You never coordinate with an overseas supplier yourself.`}
        />

        <div className="proc relative mt-14" data-static={reduced}>
          {/* Horizontal track — first dot to last dot */}
          <span className="proc-track absolute left-0 top-0 hidden h-[2px] w-3/4 lg:block" aria-hidden="true">
            <span className="proc-fill proc-fill-x" style={{ transform: `scaleX(${progress})` }} />
          </span>
          {/* Vertical track */}
          <span className="proc-track absolute bottom-6 left-[5px] top-3 w-[2px] lg:hidden" aria-hidden="true">
            <span className="proc-fill proc-fill-y" style={{ transform: `scaleY(${progress})` }} />
          </span>

        <ol ref={listRef} className="grid gap-2 pl-9 lg:grid-cols-4 lg:gap-0 lg:pl-0">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="proc-step relative pb-8 lg:pb-0 lg:pr-6 lg:pt-8"
              data-reached={i < reached}
              data-current={i === current}
              data-lit={i <= current}
            >
              <span className="proc-dot absolute -left-9 top-[5px] lg:-top-[7px] lg:left-0" aria-hidden="true" />
              <div className="proc-card">
                <p className="font-mono text-[13px] font-semibold text-accent-ink">
                  <span className="sr-only">Step </span>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="t-h3 mt-3">{s.title}</h3>
                <p className="t-body mt-3 max-w-[34ch]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
