/**
 * Homepage hero footage.
 *
 * TEMPORARY DEVELOPMENT ASSET — the current clip is third-party footage
 * (Tungaloy Corporation) and its publishing rights have not been confirmed.
 * The files are gitignored so they are never pushed to the public repository.
 * Replace with licensed or original footage before launch, then update the
 * credit below (or remove it if the footage is your own).
 *
 * Files live in client/public/media/ and are served from /media/ in both
 * development and production builds.
 */
export const heroVideo = {
  src: '/media/hero-machining.mp4',
  poster: '/media/hero-machining-poster.jpg',
  /** Seconds to start from, so autoplay opens on machining rather than the clip's white studio frames. The full clip still loops. */
  startAt: 2.8,
  description: 'Machining footage of indexable carbide inserts cutting metal',
  credit: 'Footage: Tungaloy Corporation',
} as const;
