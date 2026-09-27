# Sreeraj Tools — launch checklist

The site is a **Node/Express app**, not a static site: `/api/rfq` receives enquiries,
accepts file uploads and sends email. It must run on a host that runs Node
(Render, Railway, Fly.io, a VPS, etc.). Static-only hosting (GitHub Pages,
plain S3, Netlify without functions) will serve the pages but silently break
every enquiry.

Build: `npm ci && npm run build`   Start: `npm start`   Port: `$PORT` (default 5000)

## Must be done before the site is public

- [x] **Hero footage rights** — confirmed by the owner (2026-09-27). The
      Tungaloy Corporation clip is committed in `client/public/media/` with a
      discreet "Source: Tungaloy Corporation" credit. Keep a copy of the
      permission on file; remove the credit only if it says attribution isn't
      required.
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

## Hosting: Vercel (current)

The live site deploys from `main` on Vercel (`vercel.json`): the front end is
served from `dist/public`, and `/api/*` runs `api/index.ts`, a serverless
function wrapping the same Express routes. Notes:

- Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `RFQ_TO_EMAIL` in
  Vercel → Project → Settings → Environment Variables, or enquiries return the
  honest "could not send" message.
- Serverless storage is temporary (`/tmp`), so the saved copy of each enquiry
  does not persist — email delivery is the record.
- Vercel caps a function request body at 4.5 MB, so attachments above that
  are rejected on Vercel even though the form allows 10 MB.
