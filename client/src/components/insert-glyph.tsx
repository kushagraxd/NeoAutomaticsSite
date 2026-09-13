import type { CategoryId } from '../../../shared/catalog';

/**
 * Technical line drawings of insert shapes, derived from the ISO shape letter
 * in the product code (ISO 1832). These are original schematic illustrations,
 * not photographs and not supplier imagery.
 *
 * When real product photography becomes available, map codes to image files in
 * `productImage()` below and this glyph becomes the fallback.
 */

type GlyphKind =
  | 'triangle' | 'square' | 'rhombic80' | 'rhombic55' | 'rhombic35'
  | 'trigon' | 'round' | 'rectangular' | 'groove' | 'thread' | 'generic';

const SHAPE_TO_GLYPH: Record<string, GlyphKind> = {
  'Triangular': 'triangle',
  'Square': 'square',
  'Rhombic 80°': 'rhombic80',
  'Rhombic 86°': 'rhombic80',
  'Rhombic 75°': 'rhombic80',
  'Rhombic 55°': 'rhombic55',
  'Rhombic 35°': 'rhombic35',
  'Trigon 80°': 'trigon',
  'Round': 'round',
  'Rectangular': 'rectangular',
  'Parallelogram 85°': 'rectangular',
  'Parallelogram 82°': 'rectangular',
  'Parallelogram 55°': 'rectangular',
  'Pentagonal': 'generic',
  'Octagonal': 'generic',
  'Hexagonal': 'generic',
};

const CATEGORY_FALLBACK: Record<CategoryId, GlyphKind> = {
  turning: 'rhombic80',
  milling: 'square',
  drilling: 'square',
  grooving: 'groove',
  threading: 'thread',
  mining: 'generic',
  'tube-scraper': 'rectangular',
  special: 'generic',
  tooling: 'rectangular',
};

/** Outline path for each glyph, drawn inside a 100×100 box. */
const PATHS: Record<GlyphKind, string> = {
  triangle: 'M50 14 L88 78 H12 Z',
  square: 'M18 18 H82 V82 H18 Z',
  rhombic80: 'M50 16 L84 50 L50 84 L16 50 Z',
  rhombic55: 'M50 12 L78 50 L50 88 L22 50 Z',
  rhombic35: 'M50 8 L72 50 L50 92 L28 50 Z',
  trigon: 'M50 14 L74 30 L86 66 L50 86 L14 66 L26 30 Z',
  round: 'M50 16 A34 34 0 1 1 49.9 16 Z',
  rectangular: 'M12 30 H88 V70 H12 Z',
  groove: 'M14 38 H74 L86 50 L74 62 H14 Z',
  thread: 'M18 22 H82 L64 50 L82 78 H18 L36 50 Z',
  generic: 'M24 20 H76 L86 50 L76 80 H24 L14 50 Z',
};

/** Central chip-breaker hole, drawn on the shapes that actually have one. */
const HOLED: GlyphKind[] = ['triangle', 'square', 'rhombic80', 'rhombic55', 'rhombic35', 'trigon', 'round'];

export function glyphFor(shape?: string, category?: CategoryId): GlyphKind {
  if (shape && SHAPE_TO_GLYPH[shape]) return SHAPE_TO_GLYPH[shape];
  if (category) return CATEGORY_FALLBACK[category];
  return 'generic';
}

export interface InsertGlyphProps {
  shape?: string;
  category?: CategoryId;
  className?: string;
  /** Renders light-on-dark for the near-black sections. */
  onDark?: boolean;
  /** Explicit stroke colour, e.g. a category tone. Overrides onDark. */
  color?: string;
}

export default function InsertGlyph({ shape, category, className, onDark, color }: InsertGlyphProps) {
  const kind = glyphFor(shape, category);
  const stroke = color ?? (onDark ? 'var(--accent)' : 'var(--ink-soft)');
  const fill = color ? 'rgba(255,255,255,0.03)' : onDark ? 'rgba(210,168,87,0.08)' : 'var(--surface-panel)';

  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={shape ? `${shape} insert` : 'Carbide insert'}>
      <path d={PATHS[kind]} fill={fill} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      {HOLED.includes(kind) && (
        <circle cx="50" cy={kind === 'triangle' ? 57 : 50} r="8" fill="none" stroke={stroke} strokeWidth="2" />
      )}
      {kind === 'groove' && <path d="M74 38 V62" fill="none" stroke={stroke} strokeWidth="2" />}
    </svg>
  );
}

/**
 * Central image mapping. Returns a real photograph path when one exists for a
 * product code, otherwise null so the caller falls back to the schematic glyph.
 *
 * To add photography: drop files into `client/public/products/` and register
 * them here as `TNMG160404: '/products/tnmg160404.jpg'`.
 */
const PRODUCT_IMAGES: Record<string, string> = {};

export function productImage(code: string): string | null {
  return PRODUCT_IMAGES[code.toUpperCase()] ?? null;
}
