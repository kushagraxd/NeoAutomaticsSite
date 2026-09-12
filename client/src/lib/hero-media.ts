/**
 * Background media for the hero.
 *
 * The hero renders a looping video when one is configured, and an original
 * animated backdrop when it is not — so the section is never broken while
 * footage is being sourced.
 *
 * To switch the video on:
 *   1. Put the files in `client/public/media/`
 *        hero.mp4      H.264, 1920x1080 or 2560x1440, 8-15s seamless loop
 *        hero.webm     optional, VP9 — smaller, served first where supported
 *        hero-poster.jpg   first frame, shown while the video loads
 *   2. Set `enabled: true` below.
 *
 * Keep it under ~6 MB. The footage sits behind text, so prefer slow, dark,
 * low-contrast material — a turning operation, chip formation, an insert in
 * cut. Avoid anything with on-screen branding or text.
 *
 * Only use footage you have the right to use. Do not hot-link video from
 * another site.
 */
export const heroVideo = {
  enabled: false,
  webm: '/media/hero.webm',
  mp4: '/media/hero.mp4',
  poster: '/media/hero-poster.jpg',
  /** 0-1. Raise if the footage is bright and the headline is hard to read. */
  scrimOpacity: 0.62,
} as const;
