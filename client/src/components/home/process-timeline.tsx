import { useEffect, useRef, useState } from 'react';
import { MessageSquareText, SearchCheck, FileText, Truck } from 'lucide-react';

const STEPS = [
  { icon: MessageSquareText, title: 'Send the requirement', body: 'An ISO code, a drawing, a photograph of a worn insert, or the part you currently buy. Tell us the quantity and where it needs to go.' },
  { icon: SearchCheck, title: 'We confirm the source', body: 'We check specification, grade and availability with producers in China and Taiwan — and say so if something can’t be sourced.' },
  { icon: FileText, title: 'You receive a quotation', body: 'Pricing, lead time and packing against your actual requirement, rather than a list price that may not fit the job.' },
  { icon: Truck, title: 'We import and supply', body: 'Documentation and delivery against your confirmed order, for customers in India and buyers abroad.' },
];

/**
 * Timeline whose rail fills as the visitor scrolls through it; each step lights
 * up as the fill reaches it. Shows fully lit when motion is reduced.
 */
export default function ProcessTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = listRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      setProgress(Math.min(1, Math.max(0, (anchor - r.top) / r.height)));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="bg-surface-subtle py-24 md:py-32">
      <div className="shell grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow mb-6">How it works</p>
          <h2 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            From first message to <span className="accent-word text-accent-ink">delivered</span>
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-muted">
            Four steps, one point of contact. You never coordinate with an overseas supplier yourself.
          </p>
          <p className="mt-8 font-mono text-[13px] text-ink-muted" aria-hidden="true">
            <span className="text-[34px] font-semibold tracking-[-0.04em] text-ink">
              {String(Math.min(STEPS.length, Math.max(1, Math.ceil(progress * STEPS.length + 0.001)))).padStart(2, '0')}
            </span>{' '}
            / {String(STEPS.length).padStart(2, '0')}
          </p>
        </div>

        <ol ref={listRef} className="relative">
          {/* Rail */}
          <span className="absolute bottom-6 left-[23px] top-6 w-[2px] rounded-full bg-rule" aria-hidden="true" />
          <span
            className="absolute left-[23px] top-6 w-[2px] rounded-full bg-gradient-to-b from-accent-ink to-accent"
            style={{ height: `calc((100% - 3rem) * ${progress})` }}
            aria-hidden="true"
          />

          {STEPS.map((s, i) => {
            const lit = progress >= i / STEPS.length + 0.04 || progress === 1;
            return (
              <li key={s.title} className="relative flex gap-7 pb-12 last:pb-0">
                <span
                  className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                    lit ? 'border-brand-bright bg-brand text-white shadow-lift' : 'border-rule-strong bg-surface-card text-ink-muted'
                  }`}
                >
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div
                  className={`flex-1 rounded-2xl border bg-surface-card p-6 transition-all duration-500 md:p-7 ${
                    lit ? 'translate-x-0 border-rule-strong opacity-100 shadow-card' : 'translate-x-2 border-rule opacity-45'
                  }`}
                >
                  <p className="font-mono text-[12px] font-medium text-accent-ink">STEP {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.025em] text-ink">{s.title}</h3>
                  <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-muted">{s.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
