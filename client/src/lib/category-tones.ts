import type { CategoryId } from '../../../shared/catalog';

/**
 * Presentation-only colour per category. Kept out of shared/ because it is a
 * design decision, not catalogue data. Each tone is legible on near-black.
 */
export const TONES: Record<CategoryId, { hex: string; rgb: string; name: string }> = {
  turning:        { hex: '#E3B55F', rgb: '227,181,95',  name: 'Brass' },
  milling:        { hex: '#4FC7B6', rgb: '79,199,182',  name: 'Teal' },
  drilling:       { hex: '#6E9BFF', rgb: '110,155,255', name: 'Blue' },
  grooving:       { hex: '#A98BF5', rgb: '169,139,245', name: 'Violet' },
  threading:      { hex: '#F07E9A', rgb: '240,126,154', name: 'Rose' },
  mining:         { hex: '#A1A1AA', rgb: '161,161,170', name: 'Steel' },
  'tube-scraper': { hex: '#A1A1AA', rgb: '161,161,170', name: 'Steel' },
  special:        { hex: '#A1A1AA', rgb: '161,161,170', name: 'Steel' },
  tooling:        { hex: '#A1A1AA', rgb: '161,161,170', name: 'Steel' },
};

export const toneFor = (id: CategoryId) => TONES[id];
