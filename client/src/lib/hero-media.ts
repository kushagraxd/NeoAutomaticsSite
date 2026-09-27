/**
 * Homepage hero footage.
 *
 * Clip: "3 Styles of Inserts for 1 Tool with Tungaloy's DoTripleMill!" by
 * Tungaloy Corporation, re-encoded from the supplied 1080 × 1920 original
 * (H.264 Main, faststart, audio removed; footage uncut, embedded branding
 * intact).
 *
 * Rights: the site owner confirmed on 2026-09-27 that Sreeraj Tools has the
 * rights to use this footage on the website. The discreet source credit is
 * kept; remove it only if the licence says attribution is not required.
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
