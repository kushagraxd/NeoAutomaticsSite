#!/usr/bin/env node
/**
 * Generates client/public/sitemap.xml and adds the Sitemap line to robots.txt.
 * Run once the final domain is confirmed:
 *
 *   SITE_URL=https://sreerajtools.com node scripts/generate-sitemap.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const siteUrl = process.env.SITE_URL?.replace(/\/+$/, '');
if (!siteUrl) {
  console.error('SITE_URL is not set. Example:\n  SITE_URL=https://example.com node scripts/generate-sitemap.mjs');
  process.exit(1);
}

const categories = JSON.parse(
  fs.readFileSync(path.join('data', 'products.json'), 'utf8'),
);
const slugs = [
  'turning-inserts', 'milling-inserts', 'drilling-inserts', 'grooving-inserts',
  'threading-inserts', 'mining-inserts', 'tube-scraper-inserts',
  'special-design-inserts', 'cutting-tools-and-holders',
];

const routes = [
  { loc: '/', priority: '1.0', freq: 'weekly' },
  { loc: '/products', priority: '0.9', freq: 'weekly' },
  ...slugs.map((s) => ({ loc: `/products/${s}`, priority: '0.8', freq: 'monthly' })),
  { loc: '/custom-sourcing', priority: '0.8', freq: 'monthly' },
  { loc: '/quote', priority: '0.9', freq: 'monthly' },
  { loc: '/about', priority: '0.6', freq: 'monthly' },
  { loc: '/contact', priority: '0.8', freq: 'monthly' },
  { loc: '/privacy', priority: '0.2', freq: 'yearly' },
];

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url>\n    <loc>${siteUrl}${r.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.freq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join('client', 'public', 'sitemap.xml'), xml);
fs.writeFileSync(
  path.join('client', 'public', 'robots.txt'),
  `User-agent: *\nAllow: /\n\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
);
console.log(`Wrote sitemap with ${routes.length} URLs and ${categories.products.length} catalogue codes indexed via /products.`);
