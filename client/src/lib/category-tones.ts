import type { CategoryId } from '../../../shared/catalog';

/**
 * Presentation-only marker colour per category, shown as a small dot beside
 * the category name — never as a surface or glow. Muted, related tones that sit
 * with the ivory and bronze palette. Kept out of shared/ because it is a
 * design decision, not catalogue data.
 */
export const TONES: Record<CategoryId, { hex: string; rgb: string; name: string }> = {
  turning:        { hex: '#B8893B', rgb: '184,137,59',  name: 'Bronze' },
  milling:        { hex: '#5E7C73', rgb: '94,124,115',  name: 'Sage' },
  drilling:       { hex: '#4E6A8E', rgb: '78,106,142',  name: 'Steel blue' },
  grooving:       { hex: '#8C6B55', rgb: '140,107,85',  name: 'Clay' },
  threading:      { hex: '#7B8288', rgb: '123,130,136', name: 'Steel' },
  mining:         { hex: '#A39E94', rgb: '163,158,148', name: 'Stone' },
  'tube-scraper': { hex: '#A39E94', rgb: '163,158,148', name: 'Stone' },
  special:        { hex: '#A39E94', rgb: '163,158,148', name: 'Stone' },
  tooling:        { hex: '#A39E94', rgb: '163,158,148', name: 'Stone' },
};

export const toneFor = (id: CategoryId) => TONES[id];
