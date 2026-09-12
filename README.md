# ShreeRaj Tools — website

Catalogue and enquiry website for **ShreeRaj Tools**, an India-based importer and
supplier of carbide inserts and cutting tools sourced from producers in China and
Taiwan.

This is a catalogue-and-enquiry site, not an e-commerce site. **No prices are
published anywhere.** Every product route ends in a request for a quotation.

## Stack

- **Vite 5** + **React 18** + **TypeScript**
- **wouter** for routing (this is a single-page app — it is *not* Next.js)
- **Tailwind CSS 3** with a small set of Radix UI primitives
- **Express 4** API, which also hosts the Vite dev server in middleware mode

One command serves both the site and the API on one port.

## Running locally

```bash
npm install
npm run dev
```

The site runs at <http://localhost:5000>.

Verified on Node.js v26. The `reusePort` socket option is deliberately not used —
it is unsupported on macOS and causes `ENOTSUP` on startup.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run check` | TypeScript check across client, server and shared code |
| `npm run build` | Production build (client bundle + server bundle into `dist/`) |
| `npm start` | Run the production build |
| `npm run sitemap` | Generate `sitemap.xml` — needs `SITE_URL` |

## Configuration

Copy `.env.example` to `.env` and fill it in. Nothing secret is committed.

Enquiry email needs `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` and
`RFQ_TO_EMAIL`. If any of those is missing the enquiry is still saved to
`uploads/enquiries/`, but the customer is told plainly that it could not be sent —
the form never reports a false success.

## Where things live

```
client/src/pages/         Routed pages
client/src/components/    Layout, product card, enquiry form, insert glyphs
client/public/            favicon, robots.txt, sitemap.xml
server/                   Express entry, routes, Vite bridge
shared/company.ts         Company identity — single source of truth
shared/catalog.ts         Product categories, search, helpers
shared/rfq.ts             Enquiry schema, shared by browser and server
data/company.json         Company details (unconfirmed fields are not rendered)
data/products.json        Sanitised product catalogue — codes only
```

## Content rules

Two rules are enforced by the data model, not just by convention:

1. **No unverified claims.** No certifications, years of experience, customer
   counts, delivery statistics, factories, machines or partnerships appear
   anywhere. `data/company.json` keeps `claims` deliberately empty.
2. **No placeholder contact details.** Contact fields carry a `confirmed` flag.
   Until a value is confirmed, the UI falls back to the enquiry form rather than
   printing a fake phone number or address.

`data/products.json` holds product codes and ISO shape designations only. It
contains no prices, quantities, grades, supplier names or commercial terms, and
supplier documents must never be committed to this repository.
