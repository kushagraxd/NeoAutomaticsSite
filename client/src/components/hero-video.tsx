import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import HeroMotion from './hero-motion';
import { heroVideo, type HeroClip } from '../lib/hero-media';
import { useReducedMotion } from '../lib/useReducedMotion';

/**
 * Homepage hero background. Plays licensed footage when one is configured in
 * lib/hero-media.ts; otherwise the original animation in hero-motion.tsx.
 * Place it as the first child of `.hero-cinema`.
 */
export default function HeroVideo() {
  return heroVideo ? <BackgroundVideo clip={heroVideo} /> : <HeroMotion />;
}

/**
 * - Muted, looping, inline, no native controls. The video is decorative
 *   (aria-hidden); the hero copy carries the message.
 * - Autoplays unless the visitor prefers reduced motion — then the poster shows
 *   until they press play. Only the visitor's own choice turns playback off; if
 *   the browser refuses autoplay it retries when the tab becomes visible or the
 *   hero scrolls back into view.
 * - Pauses while off screen. If the file cannot load, the poster stays as a
 *   still; if the poster is missing too, the owned animation takes over.
 */
function BackgroundVideo({ clip }: { clip: HeroClip }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [userChoice, setUserChoice] = useState<'play' | 'pause' | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

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
        { threshold: 0.05 },
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
    <>
      {failed ? (
        // The video could not load: keep the poster as a still. If that is missing too, use the owned animation.
        posterFailed ? (
          <HeroMotion />
        ) : (
          <img src={clip.poster} alt="" className="hero-cinema-media" decoding="async" aria-hidden="true" onError={() => setPosterFailed(true)} />
        )
      ) : (
        <video
          ref={ref}
          className="hero-cinema-media"
          src={clip.src}
          poster={clip.poster}
          muted
          loop
          playsInline
          autoPlay={shouldPlay}
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex={-1}
          onLoadedMetadata={(e) => {
            // When autoplaying, skip the clip's opening studio frames. Reduced-motion
            // visitors keep the poster until they choose to play.
            const v = e.currentTarget;
            if (shouldPlay && !userChoice && clip.startAt > 0 && v.currentTime < clip.startAt && v.duration > clip.startAt) {
              v.currentTime = clip.startAt;
            }
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
        />
      )}

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="shell flex items-center justify-between gap-4 pb-5">
          {clip.credit && !(failed && posterFailed) ? <p className="text-[11px] font-medium text-ink-soft">{clip.credit}</p> : <span />}
          {!failed && (
            <button type="button" onClick={toggle} className="hero-control" aria-label={playing ? 'Pause background video' : 'Play background video'}>
              {playing ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
              <span aria-hidden="true">{playing ? 'Pause' : 'Play'}</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
