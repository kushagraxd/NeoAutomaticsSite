import { useEffect, useRef } from 'react';
import { heroVideo } from '../lib/hero-media';

/**
 * Hero background.
 *
 * Renders the configured looping video when one is available. Until then it
 * draws an original animated backdrop — slow concentric arcs turning about a
 * common centre, the motion of a workpiece on a lathe — so the section stands
 * on its own without stock footage or borrowed imagery.
 */
export default function HeroBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (heroVideo.enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let t = 0;
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

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Centre sits off to the right so the arcs sweep behind the headline
      // without crowding it.
      const cx = width * 0.72;
      const cy = height * 0.5;
      const maxR = Math.hypot(Math.max(cx, width - cx), Math.max(cy, height - cy));

      for (let i = 0; i < 26; i++) {
        const p = i / 26;
        const radius = maxR * (0.1 + p * 0.95);
        // Alternate direction and speed per ring for a slow machined drift.
        const dir = i % 2 === 0 ? 1 : -1;
        const angle = t * 0.00013 * dir * (1 + p * 0.7) + i * 0.35;
        const arc = 0.5 + Math.sin(i * 1.7) * 0.35;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, angle, angle + arc);
        ctx.strokeStyle = i % 5 === 0 ? 'rgba(210,168,87,0.42)' : 'rgba(255,255,255,0.15)';
        ctx.lineWidth = i % 5 === 0 ? 1.4 : 1;
        ctx.stroke();
      }

      // A single brighter sweep, like light catching a turning edge.
      const sweep = (t * 0.00009) % (Math.PI * 2);
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * 0.52, sweep, sweep + 0.5);
      ctx.strokeStyle = 'rgba(210,168,87,0.75)';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const loop = (now: number) => {
      t = now;
      draw();
      frame = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) {
      t = 4000;
      draw();
    } else {
      frame = requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {heroVideo.enabled ? (
        <video
          className="h-full w-full object-cover"
          poster={heroVideo.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={heroVideo.webm} type="video/webm" />
          <source src={heroVideo.mp4} type="video/mp4" />
        </video>
      ) : (
        <canvas ref={canvasRef} className="h-full w-full" />
      )}

      {/* Scrim keeps the headline readable over whatever is behind it. */}
      <div
        className="absolute inset-0"
        style={{
          background: heroVideo.enabled
            ? `linear-gradient(100deg, rgba(9,9,11,${heroVideo.scrimOpacity + 0.24}) 0%, rgba(9,9,11,${heroVideo.scrimOpacity}) 45%, rgba(9,9,11,${heroVideo.scrimOpacity - 0.14}) 100%)`
            : 'linear-gradient(100deg, rgba(9,9,11,.93) 0%, rgba(9,9,11,.78) 38%, rgba(9,9,11,.34) 100%)',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night" />
    </div>
  );
}
