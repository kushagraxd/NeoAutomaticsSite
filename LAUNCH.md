# Sreeraj Tools — launch checklist

The site is a **Node/Express app**, not a static site: `/api/rfq` receives enquiries,
accepts file uploads and sends email. It must run on a host that runs Node
(Render, Railway, Fly.io, a VPS, etc.). Static-only hosting (GitHub Pages,
plain S3, Netlify without functions) will serve the pages but silently break
every enquiry.

Build: `npm ci && npm run build`   Start: `npm start`   Port: `$PORT` (default 5000)

## Must be done before the site is public

- [ ] **Hero footage rights** — the homepage hero uses the Tungaloy Corporation
      "DoTripleMill" clip (git-ignored, in `client/public/media/`), with a
      discreet "Source: Tungaloy Corporation" credit. Get written permission
      for commercial reuse before launch; a credit is not permission. Remove the
      credit only if that permission says attribution isn't required. The files
      are git-ignored, so a GitHub-based deploy won't include them until then
      (the hero falls back to an owned animation).
- [ ] **Contact details** — every field in `data/company.json` is
      `confirmed: false`, so nothing renders. Fill in and flip to `true`:
      email, phone, whatsapp, address, city, hours (gstin/iec optional).
- [ ] **Email delivery** — set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
      `SMTP_PASS`, `RFQ_TO_EMAIL` in the host's environment variables (never in
      Git). Until then enquiries are only written to `uploads/enquiries/` and
      the customer is told honestly that sending failed.
- [ ] **Send a live test enquiry** after deploy and confirm the email arrives.
- [ ] **Domain** — buy/point it, set `SITE_URL`, run `npm run sitemap`, commit
      the generated `client/public/sitemap.xml`, set an absolute `og:image`.
- [ ] **Logo** — current emblem is a raster extraction from `logo 2.pdf`.
      Supply a vector/transparent original. The name is settled as
      "Sreeraj Tools", which matches the artwork's lettering.
- [ ] **Old customer PDFs** — still reachable in this public repo's history
      (commits `3eaac0e`, `90764c5`). Either make the repo private or approve a
      history rewrite before more people see the repo.

## Homepage media still needed

The five operation cards are built to take real product media
(`client/src/lib/category-media.ts`) and currently show illustrations drawn
from each listed code's ISO designation. One asset set per operation:

| Card | Suggested subject | Poster | 360° (optional) |
| --- | --- | --- | --- |
| Turning | CNMG / TNMG negative insert | WebP/PNG ≥ 1200 px, plain light ground or transparent | MP4/WebM loop or 24–72 frame sequence |
| Milling | APMT positive insert | same | same |
| Drilling | WCMX or SPMG U-drill insert | same | same |
| Grooving | MGMN double-ended grooving insert | same | same |
| Threading | 16ER laydown threading insert | same | same |

Photograph your own stock — no manufacturer catalogue or competitor imagery.
The hero clip is portrait (1080 × 1920); a landscape master would look sharper
on wide screens if one is ever licensed.

## Host notes

- `uploads/` is written at runtime. On Render/Railway/Fly the container
  filesystem is wiped on every deploy, so attach a persistent disk/volume
  mounted at `uploads/` or the saved enquiry copies are lost.
- Health check path: `/` (200).
- HTTPS is terminated by the host; no certificate work needed in the app.
