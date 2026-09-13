import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import InsertRender from './insert-render';
import { heroVideo } from '../lib/hero-media';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Portrait hero footage in a framed panel.
 *
 * - Always muted. Autoplays and loops unless the visitor prefers reduced motion,
 *   in which case the poster frame shows until they press play.
 * - Only the visitor's own choice turns playback off. If the browser refuses
 *   autoplay (e.g. a background tab or low-power mode), it retries when the tab
 *   becomes visible or the panel scrolls back into view.
 * - Pauses while out of view, and falls back to an insert illustration if the
 *   file can't load.
 */
export default function HeroVideo({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(prefersReducedMotion);
  const [userChoice, setUserChoice] = useState<'play' | 'pause' | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const shouldPlay = userChoice ? userChoice === 'play' : !reduced;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

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
        {failed ? (
          <div className="stage flex h-full w-full items-center justify-center">
            <InsertRender code="TNMG160408-MA" family="TNMG" category="turning" className="float w-3/4" title="Carbide insert illustration" />
          </div>
        ) : (
          <video
            ref={ref}
            className="h-full w-full object-cover"
            src={heroVideo.src}
            poster={heroVideo.poster}
            muted
            loop
            playsInline
            autoPlay={shouldPlay}
            preload="metadata"
            disablePictureInPicture
            onLoadedMetadata={(e) => {
              // When autoplaying, skip the clip's opening studio frames. Reduced-motion
              // visitors keep the poster until they choose to play.
              const v = e.currentTarget;
              if (shouldPlay && !userChoice && heroVideo.startAt > 0 && v.currentTime < heroVideo.startAt && v.duration > heroVideo.startAt) {
                v.currentTime = heroVideo.startAt;
              }
            }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setFailed(true)}
            aria-label={heroVideo.description}
          />
        )}

        <span className="hero-media-highlight" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[rgba(var(--night-rgb),0.9)] to-transparent" aria-hidden="true" />

        {heroVideo.credit && !failed && (
          <figcaption className="absolute bottom-[1.1rem] left-4 right-16 truncate text-[11px] text-ink-muted">{heroVideo.credit}</figcaption>
        )}

        {!failed && (
          <button type="button" onClick={toggle} className="video-toggle absolute bottom-3 right-3" aria-label={playing ? 'Pause video' : 'Play video'}>
            {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4 translate-x-px" aria-hidden="true" />}
          </button>
        )}
      </div>
    </figure>
  );
}
