import { useEffect, useRef } from 'react';

const token = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

/**
 * Animated hero background: slow concentric arcs turning about a common centre,
 * like a workpiece on a lathe. Colours are read from the theme tokens.
 */
export default function HeroBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const brand = token('--brand-bright-rgb', '96, 140, 255');
    const gold = token('--gold-rgb', '201, 168, 92');
    const line = token('--line-rgb', '148, 170, 210');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let frame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width * 0.74;
      const cy = height * 0.46;
      const maxR = Math.hypot(Math.max(cx, width - cx), Math.max(cy, height - cy));

      for (let i = 0; i < 26; i++) {
        const p = i / 26;
        const radius = maxR * (0.1 + p * 0.95);
        const dir = i % 2 === 0 ? 1 : -1;
        const angle = t * 0.00012 * dir * (1 + p * 0.7) + i * 0.35;
        const arc = 0.5 + Math.sin(i * 1.7) * 0.35;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, angle, angle + arc);
        ctx.strokeStyle = i === 13 ? `rgba(${gold}, 0.22)` : i % 5 === 0 ? `rgba(${brand}, 0.32)` : `rgba(${line}, 0.09)`;
        ctx.lineWidth = i % 5 === 0 ? 1.3 : 1;
        ctx.stroke();
      }

      const sweep = (t * 0.00009) % (Math.PI * 2);
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * 0.52, sweep, sweep + 0.5);
      ctx.strokeStyle = `rgba(${brand}, 0.55)`;
      ctx.lineWidth = 1.8;
      ctx.stroke();
    };

    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) draw(4000);
    else frame = requestAnimationFrame(loop);

    const onResize = () => {
      resize();
      if (reduced) draw(4000);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="hero-scrim absolute inset-0" />
      <div className="blueprint absolute inset-0 opacity-40" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night" />
    </div>
  );
}
