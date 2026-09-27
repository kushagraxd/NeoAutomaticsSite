/**
 * Homepage hero footage.
 *
 * Clip: "3 Styles of Inserts for 1 Tool with Tungaloy's DoTripleMill!" by
 * Tungaloy Corporation, re-encoded from the supplied 1080 × 1920 original
 * (H.264 Main, faststart, audio removed; footage uncut, embedded branding
 * intact).
 *
 * PRE-LAUNCH RIGHTS ITEM: reuse permission has not been confirmed in writing.
 * The discreet credit stays until it is, and a credit is not a substitute for
 * permission. The files are git-ignored, so they are never pushed to the public
 * repository or included in a GitHub-based deploy; without them the hero
 * falls back to the owned animation in hero-motion.tsx.
 */
export interface HeroClip {
  src: string;
  poster: string;
  /** Seconds to start from when autoplaying, skipping the clip's opening studio frames. The clip still loops in full. */
  startAt: number;
  description: string;
  /** Shown over the video while attribution is required. */
  credit: string;
}

export const heroVideo: HeroClip | null = {
  src: '/media/hero-machining.mp4',
  poster: '/media/hero-machining-poster.jpg',
  startAt: 2.8,
  description: 'Face-milling cutter with indexable inserts machining a steel block',
  credit: 'Source: Tungaloy Corporation',
};
