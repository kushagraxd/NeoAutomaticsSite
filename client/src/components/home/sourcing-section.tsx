import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Hash, PenTool, Camera, Package, Check } from 'lucide-react';
import InsertGlyph from '../insert-glyph';
import Reveal from '../reveal';

const INPUTS = [
  { id: 'code', icon: Hash, title: 'An ISO code', body: 'The designation printed on the box you already buy — any brand.' },
  { id: 'drawing', icon: PenTool, title: 'A drawing', body: 'Dimensioned PDF, DXF or STEP for special geometries and form tools.' },
  { id: 'photo', icon: Camera, title: 'A photograph', body: 'A clear shot of the insert or the worn edge, with something for scale.' },
  { id: 'sample', icon: Package, title: 'A sample', body: 'The physical insert you use today, which we match against.' },
] as const;

type InputId = (typeof INPUTS)[number]['id'];

/** Small illustration of what each kind of request looks like when it reaches us. */
function Preview({ id }: { id: InputId }) {
  const brass = '#E3B55F';
  if (id === 'code') {
    return (
      <div className="flex flex-col items-center gap-5">
        <div className="rounded-xl border border-white/10 bg-white/[.04] px-6 py-4 font-mono text-[28px] font-semibold tracking-tight text-night-ink">
          DNMG<span style={{ color: brass }}>150608</span>-MA
        </div>
        <p className="font-mono text-[12px] text-night-muted">From the label on your current box</p>
      </div>
    );
  }
  if (id === 'drawing') {
    return (
      <svg viewBox="0 0 260 180" className="w-full max-w-[300px]" aria-hidden="true">
        <path d="M130 30 L200 140 H60 Z" fill="none" stroke={brass} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="130" cy="104" r="12" fill="none" stroke={brass} strokeWidth="2" />
        <g stroke="rgba(255,255,255,.35)" strokeWidth="1" fill="none">
          <path d="M60 158 H200 M60 152 V164 M200 152 V164" />
          <path d="M222 30 V140 M216 30 H228 M216 140 H228" />
          <path d="M130 30 L130 16" strokeDasharray="3 3" />
        </g>
        <text x="130" y="176" textAnchor="middle" fill="rgba(255,255,255,.55)" fontSize="11" fontFamily="Geist Mono, monospace">16.5 mm</text>
        <text x="240" y="89" fill="rgba(255,255,255,.55)" fontSize="11" fontFamily="Geist Mono, monospace">R0.8</text>
      </svg>
    );
  }
  if (id === 'photo') {
    return (
      <div className="relative flex h-44 w-56 items-center justify-center rounded-xl bg-white/[.03]">
        {['left-2 top-2 border-l-2 border-t-2', 'right-2 top-2 border-r-2 border-t-2', 'left-2 bottom-2 border-l-2 border-b-2', 'right-2 bottom-2 border-r-2 border-b-2'].map((c) => (
          <span key={c} className={`absolute h-6 w-6 rounded-sm ${c}`} style={{ borderColor: brass }} />
        ))}
        <InsertGlyph shape="Rhombic 80°" color={brass} className="h-24 w-24" />
        <span className="absolute inset-x-6 top-1/2 h-px animate-pulse" style={{ background: `linear-gradient(90deg,transparent,${brass},transparent)` }} />
      </div>
    );
  }
  return (
    <div className="w-60 rounded-xl border border-white/10 bg-white/[.04] p-5">
      <div className="flex items-center justify-between">
        <Package className="h-6 w-6" style={{ color: brass }} aria-hidden="true" />
        <span className="font-mono text-[11px] text-night-muted">SAMPLE · 1 PC</span>
      </div>
      <div className="mt-5 space-y-2">
        <div className="h-2 w-4/5 rounded bg-white/15" />
        <div className="h-2 w-3/5 rounded bg-white/10" />
      </div>
      <div className="mt-5 flex items-center gap-2 text-[13px] text-night-muted">
        <Check className="h-4 w-4" style={{ color: brass }} aria-hidden="true" /> Matched against specification
      </div>
    </div>
  );
}

export default function SourcingSection() {
  const [active, setActive] = useState<InputId>('code');
  const [paused, setPaused] = useState(false);

  // Cycle through the request types until the visitor takes over.
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => {
      setActive((cur) => INPUTS[(INPUTS.findIndex((i) => i.id === cur) + 1) % INPUTS.length].id);
    }, 3800);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <section className="relative overflow-hidden bg-night py-24 text-night-ink md:py-32">
      <div className="absolute inset-0 night-glow" aria-hidden="true" />
      <div className="shell relative grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <Reveal>
          <p className="eyebrow-dark mb-6">Custom sourcing</p>
          <h2 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Not in the list? <span className="accent-word text-accent">That’s most of the job.</span>
          </h2>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-night-muted">
            A size that’s hard to find, a geometry for a difficult material, a replacement for something discontinued. Send us whatever you have and we work back to a specification — then tell you plainly what we can source.
          </p>

          <div className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
            <Link href="/quote?category=special" className="btn-onDark btn-lg group">
              Start a custom request
              <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link href="/custom-sourcing" className="btn-ghostDark btn-lg">How custom sourcing works</Link>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div
            className="overflow-hidden rounded-2xl border border-night-line bg-night-soft"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="flex min-h-[260px] items-center justify-center border-b border-night-line p-8">
              <Preview id={active} />
            </div>
            <div role="tablist" aria-label="What you can send us" className="grid grid-cols-2">
              {INPUTS.map((input, i) => {
                const on = active === input.id;
                return (
                  <button
                    key={input.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => { setActive(input.id); setPaused(true); }}
                    onFocus={() => setActive(input.id)}
                    className={`relative p-5 text-left transition-colors md:p-6 ${i % 2 === 0 ? 'border-r border-night-line' : ''} ${i < 2 ? 'border-b border-night-line' : ''} ${on ? 'bg-white/[.04]' : 'hover:bg-white/[.02]'}`}
                  >
                    <span className={`absolute inset-x-0 top-0 h-[2px] origin-left bg-accent transition-transform duration-500 ${on ? 'scale-x-100' : 'scale-x-0'}`} />
                    <input.icon className={`h-5 w-5 transition-colors ${on ? 'text-accent' : 'text-night-muted'}`} aria-hidden="true" />
                    <span className={`mt-3 block text-[16px] font-semibold ${on ? 'text-night-ink' : 'text-night-muted'}`}>{input.title}</span>
                    <span className="mt-1 block text-[13.5px] leading-relaxed text-night-muted">{input.body}</span>
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
