import catalogData from '../data/products.json';

/**
 * Sanitised product catalogue.
 *
 * Records hold an ISO product code, its family, its category and — where the
 * ISO designation itself defines it — the insert shape. Nothing else is
 * asserted. No prices, quantities, grades, coatings, suppliers or performance
 * claims are stored here or rendered anywhere on the site.
 */
export interface Product {
  code: string;
  family: string;
  category: CategoryId;
  /** Chipbreaker / geometry suffix from the ISO code, when present. */
  geometry?: string;
  /** Derived from the ISO shape letter (ISO 1832). Not an inferred claim. */
  shape?: string;
}

export type CategoryId =
  | 'turning' | 'milling' | 'drilling' | 'grooving' | 'threading'
  | 'mining' | 'tube-scraper' | 'special' | 'tooling';

export interface Category {
  id: CategoryId;
  slug: string;
  name: string;
  short: string;
  description: string;
  /** Categories we support by enquiry but hold no listed codes for yet. */
  enquiryOnly?: boolean;
  /** Awaiting the owner's confirmation of actual products. */
  needsConfirmation?: boolean;
}

export const categories: Category[] = [
  {
    id: 'turning', slug: 'turning-inserts', name: 'Turning Inserts', short: 'Turning',
    description:
      'Indexable inserts for external and internal turning, facing and boring on CNC lathes and conventional machines. Covers the common negative and positive ISO families.',
  },
  {
    id: 'milling', slug: 'milling-inserts', name: 'Milling Inserts', short: 'Milling',
    description:
      'Inserts for face milling, shoulder milling, slotting and profiling, including round and high-feed geometries for indexable cutter bodies.',
  },
  {
    id: 'drilling', slug: 'drilling-inserts', name: 'Drilling & Hole-Machining Inserts', short: 'Drilling',
    description:
      'Inserts for indexable drilling and hole-making, including the SPMG, WCMX and QCMT families used in U-drills and similar tooling.',
  },
  {
    id: 'grooving', slug: 'grooving-inserts', name: 'Parting & Grooving Inserts', short: 'Grooving',
    description:
      'Inserts for parting off, external and internal grooving and recessing, including the MGMN and TDC families.',
  },
  {
    id: 'threading', slug: 'threading-inserts', name: 'Threading Inserts', short: 'Threading',
    description:
      'Inserts for external and internal thread turning, including 16ER and 16IR external and internal profiles.',
  },
  {
    id: 'mining', slug: 'mining-inserts', name: 'Mining Inserts', short: 'Mining',
    description:
      'Carbide tips and inserts for mining, drilling and heavy wear applications. Sourced to your specification — share the drawing or the part you are replacing.',
    enquiryOnly: true,
  },
  {
    id: 'tube-scraper', slug: 'tube-scraper-inserts', name: 'Tube Scraper Inserts', short: 'Tube Scraper',
    description:
      'Scraper inserts for tube and pipe cleaning applications. Sourced against your sample, drawing or existing part number.',
    enquiryOnly: true,
  },
  {
    id: 'special', slug: 'special-design-inserts', name: 'Special-Design & Custom Inserts', short: 'Special & Custom',
    description:
      'Non-standard geometries, form tools and inserts made to a drawing. Send a drawing, a sample or the part number you currently buy and we will source against it.',
    enquiryOnly: true,
  },
  {
    id: 'tooling', slug: 'cutting-tools-and-holders', name: 'Cutting Tools & Tool Holders', short: 'Tools & Holders',
    description:
      'Tool holders, boring bars, cutter bodies and associated cutting tools. This range is being finalised — tell us what you need and we will confirm availability.',
    enquiryOnly: true,
    needsConfirmation: true,
  },
];

export const products: Product[] = (catalogData.products as Product[]);

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const categoryById = (id: CategoryId) =>
  categories.find((c) => c.id === id);

export const productsIn = (id: CategoryId) =>
  products.filter((p) => p.category === id);

export const productByCode = (code: string) =>
  products.find((p) => p.code.toLowerCase() === code.toLowerCase());

export function countsByCategory(): Record<CategoryId, number> {
  const out = {} as Record<CategoryId, number>;
  for (const c of categories) out[c.id] = 0;
  for (const p of products) out[p.category] = (out[p.category] ?? 0) + 1;
  return out;
}

/** Distinct ISO families within a category, in code order. */
export function familiesIn(id: CategoryId): string[] {
  return Array.from(new Set(productsIn(id).map((p) => p.family))).sort();
}

export function allFamilies(): string[] {
  return Array.from(new Set(products.map((p) => p.family))).sort();
}

/**
 * Product-code search. Runs entirely in the browser against the local
 * catalogue — no external API, no key, no network call.
 */
export function searchProducts(query: string, limit = 60): Product[] {
  const q = query.trim().toUpperCase().replace(/\s+/g, '');
  if (!q) return [];
  const scored: Array<{ p: Product; score: number }> = [];
  for (const p of products) {
    const code = p.code.toUpperCase();
    const compact = code.replace(/-/g, '');
    let score = 0;
    if (code === q) score = 100;
    else if (compact === q) score = 95;
    else if (code.startsWith(q) || compact.startsWith(q)) score = 80;
    else if (compact.includes(q)) score = 60;
    else if (p.family.toUpperCase().startsWith(q)) score = 50;
    else if (p.shape?.toUpperCase().includes(q)) score = 20;
    if (score > 0) scored.push({ p, score });
  }
  scored.sort((a, b) => b.score - a.score || a.p.code.localeCompare(b.p.code));
  return scored.slice(0, limit).map((s) => s.p);
}

export const totalProductCount = products.length;
export const totalFamilyCount = allFamilies().length;
