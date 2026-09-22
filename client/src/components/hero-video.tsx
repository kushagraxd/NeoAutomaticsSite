import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import InsertRender from './insert-render';
import { heroVideo, type HeroClip } from '../lib/hero-media';
import type { CategoryId } from '../../../shared/catalog';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/**
 * Hero panel.
 *
 * Renders our own rotating insert illustrations unless a licensed clip is
 * configured (see lib/hero-media.ts).
 */
export default function HeroVideo({ className = '' }: { className?: string }) {
  return heroVideo ? <VideoPanel clip={heroVideo} className={className} /> : <HeroShowcase className={className} />;
}

/* -------------------------------------------------------------------------- */
/* Default: illustrations generated from the catalogue, so nothing third-party */
/* -------------------------------------------------------------------------- */

const SHOWCASE: { code: string; family: string; category: CategoryId; label: string }[] = [
  { code: 'TNMG160408-MA', family: 'TNMG', category: 'turning', label: 'Negative turning' },
  { code: '3PKT150508-M', family: '3PKT', category: 'milling', label: 'Shoulder milling' },
  { code: 'MGMN150-G', family: 'MGMN', category: 'grooving', label: 'Parting & grooving' },
  { code: '16ER1.50ISO-UM3', family: '16ER', category: 'threading', label: 'ISO threading' },
];

const ROTATE_MS = 4200;

function HeroShowcase({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SHOWCASE.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  const current = SHOWCASE[index];

  return (
    <figure className={`hero-media ${className}`}>
      <div className="hero-media-glow" aria-hidden="true" />
      <div className="hero-media-frame stage blueprint-fine">
        {/* Drawing-sheet corner ticks */}
        <span className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-[rgba(var(--brand-bright-rgb),0.35)]" aria-hidden="true" />
        <span className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r border-t border-[rgba(var(--brand-bright-rgb),0.35)]" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 border-b border-l border-[rgba(var(--brand-bright-rgb),0.35)]" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-[rgba(var(--brand-bright-rgb),0.35)]" aria-hidden="true" />

        <div className="absolute inset-0 flex items-center justify-center p-8">
          {SHOWCASE.map((item, i) => (
            <InsertRender
              key={item.code}
              code={item.code}
              family={item.family}
              category={item.category}
              title={`${item.label} insert — ${item.code}`}
              className={`absolute w-[72%] transition-opacity duration-700 ease-out ${reduced ? '' : 'float'} ${i === index ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>

        <span className="hero-media-highlight" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[rgba(var(--night-rgb),0.9)] to-transparent" aria-hidden="true" />

        <figcaption className="absolute inset-x-5 bottom-5" aria-live="polite">
          <span className="block font-mono text-[13px] tracking-tight text-ink">{current.code}</span>
          <span className="block text-[11px] text-ink-muted">{current.label}</span>
        </figcaption>

        {!reduced && (
          <div className="absolute bottom-6 right-5 flex gap-1.5" aria-hidden="true">
            {SHOWCASE.map((item, i) => (
              <span
                key={item.code}
                className="h-1 w-4 rounded-full transition-colors duration-500"
                style={{ backgroundColor: i === index ? 'rgba(var(--gold-rgb),0.85)' : 'rgba(var(--line-rgb),0.25)' }}
              />
            ))}
          </div>
        )}
      </div>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/* Opt-in: video panel, used only when a clip is configured                    */
/* -------------------------------------------------------------------------- */

/**
 * Portrait hero footage in a framed panel.
 *
 * - Always muted. Autoplays and loops unless the visitor prefers reduced motion,
 *   in which case the poster frame shows until they press play.
 * - Only the visitor's own choice turns playback off. If the browser refuses
 *   autoplay (e.g. a background tab or low-power mode), it retries when the tab
 *   becomes visible or the panel scrolls back into view.
 * - Pauses while out of view, and falls back to the illustration panel if the
 *   file can't load.
 */
function VideoPanel({ clip, className = '' }: { clip: HeroClip; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [userChoice, setUserChoice] = useState<'play' | 'pause' | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const shouldPlay = userChoice ? userChoice === 'play' : !reduced;

  useEffect(() => {
    const v = ref.current;
    if (!v || failed) return;
    // React doesn't reliably reflect `muted` as an attribute, and browsers only
    // allow autoplay for muted media — set it on the element directly.
    v.muted = true;
    v.defaultMuted = true;
    if (shouldPlay) v.play().catch(() => undefined); // a refusal just leaves the play control showing
    else v.pause();
  }, [shouldPlay, failed]);

  useEffect(() => {
    const v = ref.current;
    if (!v || failed) return;
    const resume = () => {
      if (shouldPlay && v.paused) v.play().catch(() => undefined);
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') resume();
    };
    document.addEventListener('visibilitychange', onVisible);

    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) v.pause();
          else resume();
        },
        { threshold: 0.15 },
      );
      io.observe(v);
    }
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      io?.disconnect();
    };
  }, [shouldPlay, failed]);

  // If the file is missing or unplayable, show the panel we own rather than a broken frame.
  if (failed) return <HeroShowcase className={className} />;

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (playing) {
      setUserChoice('pause');
      v.pause();
    } else {
      // A click is a user gesture, so this plays even where autoplay was refused.
      setUserChoice('play');
      v.muted = true;
      v.play().catch(() => undefined);
    }
  };

  return (
    <figure className={`hero-media ${className}`}>
      <div className="hero-media-glow" aria-hidden="true" />
      <div className="hero-media-frame">
        <video
          ref={ref}
          className="h-full w-full object-cover"
          src={clip.src}
          poster={clip.poster}
          muted
          loop
          playsInline
          autoPlay={shouldPlay}
          preload="metadata"
          disablePictureInPicture
          onLoadedMetadata={(e) => {
            // When autoplaying, skip the clip's opening frames. Reduced-motion
            // visitors keep the poster until they choose to play.
            const v = e.currentTarget;
            if (shouldPlay && !userChoice && clip.startAt > 0 && v.currentTime < clip.startAt && v.duration > clip.startAt) {
              v.currentTime = clip.startAt;
            }
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
          aria-label={clip.description}
        />

        <span className="hero-media-highlight" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[rgba(var(--night-rgb),0.9)] to-transparent" aria-hidden="true" />

        {clip.credit && (
          <figcaption className="absolute bottom-[1.1rem] left-4 right-16 truncate text-[11px] text-ink-muted">{clip.credit}</figcaption>
        )}

        <button type="button" onClick={toggle} className="video-toggle absolute bottom-3 right-3" aria-label={playing ? 'Pause video' : 'Play video'}>
          {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4 translate-x-px" aria-hidden="true" />}
        </button>
      </div>
    </figure>
  );
}
