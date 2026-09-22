# ShreeRaj Tools — launch checklist

The site is a **Node/Express app**, not a static site: `/api/rfq` receives enquiries,
accepts file uploads and sends email. It must run on a host that runs Node
(Render, Railway, Fly.io, a VPS, etc.). Static-only hosting (GitHub Pages,
plain S3, Netlify without functions) will serve the pages but silently break
every enquiry.

Build: `npm ci && npm run build`   Start: `npm start`   Port: `$PORT` (default 5000)

## Must be done before the site is public

- [ ] **Hero video** — `client/public/media/hero-machining.mp4` is third-party
      footage (Tungaloy) kept out of Git as a temporary development asset.
      Publishing it is distribution. Replace with licensed or own footage, or
      launch with the poster image only.
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
      Supply a vector/transparent original and settle the spelling
      (artwork reads "SREERAJ", site text reads "ShreeRaj").
- [ ] **Old customer PDFs** — still reachable in this public repo's history
      (commits `3eaac0e`, `90764c5`). Either make the repo private or approve a
      history rewrite before more people see the repo.

## Host notes

- `uploads/` is written at runtime. On Render/Railway/Fly the container
  filesystem is wiped on every deploy, so attach a persistent disk/volume
  mounted at `uploads/` or the saved enquiry copies are lost.
- Health check path: `/` (200).
- HTTPS is terminated by the host; no certificate work needed in the app.
