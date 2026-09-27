import type { CategoryId } from '../../../shared/catalog';

/**
 * Product media for the five core operation cards on the homepage.
 *
 * No real product photography or 360° media exists in the project yet, so
 * `categoryMedia` is empty and every card shows an illustration drawn from a
 * listed code's ISO designation (see `representativeInsert`). Add an entry here
 * when an asset arrives and the card uses it automatically — no component
 * changes needed.
 *
 * Assets needed, one per operation (see the report / LAUNCH.md):
 *   turning, milling, drilling, grooving, threading
 * Each: a poster (transparent WebP/PNG or a sample shot on a plain light
 * ground, ≥ 1200 px wide) and optionally a 360° turntable as either a short
 * silent MP4/WebM loop or an ordered frame sequence (24–72 frames).
 */

export type OperationId = Extract<CategoryId, 'turning' | 'milling' | 'drilling' | 'grooving' | 'threading'>;

export type SpinSource =
  /** A short, silent, seamlessly looping turntable clip. */
  | { kind: 'video'; src: string; type?: string }
  /** An ordered image sequence covering one full revolution. */
  | { kind: 'frames'; frames: string[]; fps?: number };

export interface CategoryMediaAsset {
  /** Shown first, whenever motion is reduced, and when the pointer or focus leaves. */
  poster: string;
  /** Intrinsic poster size, so the browser can reserve space. */
  width: number;
  height: number;
  alt: string;
  spin?: SpinSource;
}

export const categoryMedia: Partial<Record<OperationId, CategoryMediaAsset>> = {
  // Example — uncomment and fill in when the files exist in client/public/media/categories/:
  // turning: {
  //   poster: '/media/categories/turning.webp',
  //   width: 1600,
  //   height: 1000,
  //   alt: 'CNMG negative turning insert',
  //   spin: { kind: 'video', src: '/media/categories/turning-360.mp4', type: 'video/mp4' },
  // },
};

/**
 * Fallback while no asset exists: a listed code whose ISO shape letter defines
 * the outline, drawn by InsertRender. Every code here is in data/products.json.
 */
export const representativeInsert: Record<OperationId, { code: string; family: string }> = {
  turning: { code: 'CNMG120408-MA', family: 'CNMG' },
  milling: { code: 'APMT1604PDER-M2', family: 'APMT' },
  drilling: { code: 'WCMX030208-A', family: 'WCMX' },
  grooving: { code: 'MGMN300-M', family: 'MGMN' },
  threading: { code: '16ER1.50ISO-UM3', family: '16ER' },
};
