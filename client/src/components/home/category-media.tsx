import { useEffect, useRef, useState } from 'react';
import Insert3D from '../insert-3d';
import { categoryMedia, representativeInsert, type CategoryMediaAsset, type OperationId, type SpinSource } from '../../lib/category-media';
import { useReducedMotion } from '../../lib/useReducedMotion';

export interface CategoryMediaProps {
  operation: OperationId;
  /** Short operation name, e.g. "Turning", for accessible text. */
  label: string;
  /** True while the parent card is hovered or holds keyboard focus. */
  active: boolean;
  className?: string;
  /** Called when the media is tapped or clicked without dragging (opens the card's destination). */
  onSelect?: () => void;
}

/**
 * Representative product media for an operation card.
 *
 * With a supplied asset: shows its poster, and plays the 360° turntable only
 * while the card is active (hover or keyboard focus). The spin media is not
 * requested until the first activation, stops and resets when interaction ends,
 * and never plays for reduced-motion visitors.
 *
 * Without one: a representative 3D model of a listed code, generated from its
 * ISO designation and turning slowly (insert-3d.tsx) — a representative
 * category visual, not an exact SKU model.
 */
export default function CategoryMedia({ operation, label, active, className = '', onSelect }: CategoryMediaProps) {
  const asset = categoryMedia[operation];
  return (
    <div className={`product-stage relative flex items-center justify-center overflow-hidden ${className}`}>
      {asset ? <AssetView asset={asset} active={active} /> : <Illustration operation={operation} label={label} onSelect={onSelect} />}
    </div>
  );
}

function Illustration({ operation, label, onSelect }: { operation: OperationId; label: string; onSelect?: () => void }) {
  const { code, family } = representativeInsert[operation];
  return (
    <>
      <Insert3D code={code} family={family} category={operation} operation={label.toLowerCase()} onSelect={onSelect} />
      <span className="t-meta pointer-events-none absolute bottom-3 left-4 text-[11.5px]" aria-hidden="true">
        {code}
      </span>
    </>
  );
}

function AssetView({ asset, active }: { asset: CategoryMediaAsset; active: boolean }) {
  const reduced = useReducedMotion();
  const spin = reduced ? undefined : asset.spin;
  // Spin media is only requested once someone actually interacts with the card.
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (active && spin) setArmed(true);
  }, [active, spin]);

  return (
    <>
      <img
        src={asset.poster}
        width={asset.width}
        height={asset.height}
        alt={asset.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain"
      />
      {spin && armed && <Spin source={spin} active={active} />}
    </>
  );
}

function Spin({ source, active }: { source: SpinSource; active: boolean }) {
  return source.kind === 'video' ? (
    <SpinVideo src={source.src} type={source.type} active={active} />
  ) : (
    <SpinFrames frames={source.frames} fps={source.fps ?? 24} active={active} />
  );
}

function SpinVideo({ src, type, active }: { src: string; type?: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) {
      v.muted = true;
      v.play().catch(() => undefined);
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [active]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${active && playing ? 'opacity-100' : 'opacity-0'}`}
    >
      <source src={src} type={type} />
    </video>
  );
}

function SpinFrames({ frames, fps, active }: { frames: string[]; fps: number; active: boolean }) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const cache = useRef<HTMLImageElement[]>([]);

  // Preload the whole revolution once, so playback never stutters on a missing frame.
  useEffect(() => {
    let cancelled = false;
    let settled = 0;
    cache.current = frames.map((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = img.onerror = () => {
        settled += 1;
        if (!cancelled && settled === frames.length) setLoaded(true);
      };
      img.src = src;
      return img;
    });
    return () => {
      cancelled = true;
    };
  }, [frames]);

  useEffect(() => {
    if (!active || !loaded) {
      setIndex(0);
      return;
    }
    const id = window.setInterval(() => setIndex((i) => (i + 1) % frames.length), 1000 / fps);
    return () => window.clearInterval(id);
  }, [active, loaded, frames.length, fps]);

  if (!active || !loaded) return null;
  return <img src={frames[index]} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-contain" />;
}
