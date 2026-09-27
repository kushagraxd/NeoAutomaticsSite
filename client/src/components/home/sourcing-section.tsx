import { useState } from 'react';
import { Check } from 'lucide-react';
import { CtaLink } from '../cta';
import InsertRender from '../insert-render';
import Reveal from '../reveal';

const INPUTS = [
  { id: 'code', title: 'An ISO code', body: 'The designation printed on the box you already buy — any brand.' },
  { id: 'drawing', title: 'A drawing', body: 'Dimensioned PDF, DXF or STEP for special geometries and form tools.' },
  { id: 'photo', title: 'A photograph', body: 'A clear shot of the insert or the worn edge, with something for scale.' },
  { id: 'sample', title: 'A sample', body: 'The physical insert you use today, which we match against.' },
] as const;

type InputId = (typeof INPUTS)[number]['id'];

/** What each kind of request looks like when it reaches us. */
function Preview({ id }: { id: InputId }) {
  if (id === 'code') {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-xl border border-rule bg-surface-card px-6 py-4 font-mono text-[clamp(1.375rem,1rem+1.4vw,1.75rem)] font-semibold tracking-tight text-ink shadow-paper">
          DNMG<span className="text-bronze-text">150608</span>-MA
        </div>
        <p className="t-meta">From the label on your current box</p>
      </div>
    );
  }
  if (id === 'drawing') {
    return (
      <svg viewBox="0 0 260 180" className="w-full max-w-[280px]" role="img" aria-label="Sketch of a triangular insert with its dimensions" fill="none">
        <path d="M130 30 L200 140 H60 Z" className="fill-surface-card stroke-ink" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="130" cy="104" r="12" className="stroke-ink" strokeWidth="1.5" />
        <g className="stroke-ink-muted" strokeWidth="1">
          <path d="M60 158 H200 M60 152 V164 M200 152 V164" />
          <path d="M222 30 V140 M216 30 H228 M216 140 H228" />
          <path d="M130 30 L130 16" strokeDasharray="3 3" />
        </g>
        <text x="130" y="176" textAnchor="middle" className="fill-ink-muted font-mono" fontSize="11">16.5 mm</text>
        <text x="232" y="89" className="fill-bronze-text font-mono" fontSize="11">R0.8</text>
      </svg>
    );
  }
  if (id === 'photo') {
    return (
      <div className="relative flex h-44 w-56 items-center justify-center">
        {['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'left-0 bottom-0 border-l-2 border-b-2', 'right-0 bottom-0 border-r-2 border-b-2'].map((c) => (
          <span key={c} className={`absolute h-6 w-6 border-bronze ${c}`} aria-hidden="true" />
        ))}
        <InsertRender code="CNMG120408-MA" category="turning" className="w-40" title="Photograph of a worn insert, framed for scale" />
      </div>
    );
  }
  return (
    <div className="w-64 rounded-xl border border-rule bg-surface-card p-5 shadow-paper">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-semibold text-ink">Sample received</span>
        <span className="t-meta">1 pc</span>
      </div>
      <div className="mt-5 space-y-2" aria-hidden="true">
        <div className="h-2 w-4/5 rounded bg-surface-subtle" />
        <div className="h-2 w-3/5 rounded bg-surface-subtle" />
      </div>
      <p className="mt-5 flex items-center gap-2 text-[13.5px] text-ink-soft">
        <Check className="h-4 w-4 text-bronze-text" aria-hidden="true" /> Matched against specification
      </p>
    </div>
  );
}

export default function SourcingSection() {
  const [active, setActive] = useState<InputId>('code');

  return (
    <section className="section bg-surface-card" aria-labelledby="sourcing-title">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <p className="t-eyebrow">Custom sourcing</p>
          <h2 id="sourcing-title" className="t-h2 mt-4">
            Not in the list? Send us what you have.
          </h2>
          <p className="t-lead mt-6 max-w-lg">
            A size that’s hard to find, a geometry for a difficult material, a replacement for something discontinued.
            We work back from what you send to a specification — then tell you plainly what we can source.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink href="/quote?category=special" arrow="tile">
              Start a custom request
            </CtaLink>
            <CtaLink href="/custom-sourcing" variant="secondary">
              How custom sourcing works
            </CtaLink>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-2xl border border-rule bg-surface-card shadow-paper">
            <div id="sourcing-preview" className="product-stage flex min-h-[260px] items-center justify-center border-b border-rule p-8">
              <Preview id={active} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2" role="group" aria-label="What you can send us">
              {INPUTS.map((input, i) => {
                const on = active === input.id;
                return (
                  <button
                    key={input.id}
                    type="button"
                    aria-pressed={on}
                    aria-controls="sourcing-preview"
                    onClick={() => setActive(input.id)}
                    className={`relative p-5 text-left transition-colors md:p-6 ${i % 2 === 0 ? 'sm:border-r sm:border-rule' : ''} ${
                      i < INPUTS.length - 1 ? 'border-b border-rule' : ''
                    } ${i === 2 ? 'sm:border-b-0' : ''} ${on ? 'bg-surface' : 'hover:bg-surface-panel'}`}
                  >
                    <span
                      className={`absolute inset-x-0 top-0 h-[2px] origin-left bg-accent transition-transform duration-300 ${on ? 'scale-x-100' : 'scale-x-0'}`}
                      aria-hidden="true"
                    />
                    <span className={`block text-[16px] font-bold ${on ? 'text-ink' : 'text-ink-soft'}`}>{input.title}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-ink-muted">{input.body}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
