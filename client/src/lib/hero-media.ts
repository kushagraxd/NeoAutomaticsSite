/**
 * Homepage hero media.
 *
 * The hero renders an illustration we own (see HeroShowcase in hero-video.tsx).
 * Video is opt-in and off by default.
 *
 * The only clip currently on disk is third-party footage (Tungaloy Corporation)
 * kept as a TEMPORARY development asset — the files are gitignored and the flag
 * below is deliberately unset in production, so unlicensed footage cannot be
 * published by accident. To preview it locally, put VITE_HERO_VIDEO=on in .env.
 *
 * When licensed or original footage is available: drop it in client/public/media/,
 * update the entry below (including `credit`), remove the gitignore lines for the
 * files and set VITE_HERO_VIDEO=on in the host's environment.
 */
export interface HeroClip {
  src: string;
  poster: string;
  /** Seconds to start from, so autoplay opens mid-cut rather than on the clip's opening frames. The clip still loops in full. */
  startAt: number;
  description: string;
  /** Shown over the video. Required for third-party footage; empty for our own. */
  credit: string;
}

const developmentClip: HeroClip = {
  src: '/media/hero-machining.mp4',
  poster: '/media/hero-machining-poster.jpg',
  startAt: 2.8,
  description: 'Machining footage of indexable carbide inserts cutting metal',
  credit: 'Footage: Tungaloy Corporation',
};

export const heroVideo: HeroClip | null =
  import.meta.env.VITE_HERO_VIDEO === 'on' ? developmentClip : null;
