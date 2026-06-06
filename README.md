# GolfBooth

Marketing website for **GolfBooth** — a premium mobile golf simulator rental service for events in Ottawa and Gatineau. Dark, mobile-first, fully bilingual (EN/FR), and built for local SEO and quote-request conversion.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and next-intl.

## Important: where this project lives

Keep this project in `~/Developer/golfbooth` (or any folder that is **not** inside `Desktop` or `Documents`). macOS syncs Desktop and Documents to iCloud by default, and syncing `node_modules` (tens of thousands of files) will slow your Mac to a crawl. `node_modules` is git-ignored and should never be synced.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/en`. French is at `/fr`.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Project structure

- `app/[locale]/` — all pages (locale-prefixed `en` / `fr`)
- `i18n/` — next-intl routing (with localized French slugs), navigation, request config
- `messages/en.json`, `messages/fr.json` — all site copy (single source of truth)
- `components/` — UI components
- `lib/` — site constants (`site.ts`), SEO + JSON-LD helpers (`seo.ts`, `schema.ts`), fonts, nav
- `proxy.ts` — next-intl middleware (locale detection + routing)
- `public/` — `brand/` (logo), `images/` (booth render), `videos/` (3D render), `fonts/` (self-hosted Oswald + Inter)
- `app/icon.png` — favicon / app icon (256x256)
- `app/[locale]/opengraph-image.tsx` — dynamic 1200x630 social share image

## Internationalization

- English is the default locale. Root `/` redirects to `/en`.
- French URLs use localized slugs (e.g. `/fr/location-simulateur-de-golf-ottawa`).
- Every page emits `hreflang` alternates (`en-CA`, `fr-CA`, `x-default`) and a self-referencing canonical.
- To edit copy, change `messages/en.json` and `messages/fr.json` — no code changes needed.

## Contact form / email

The quote form posts to `app/api/quote/route.ts`, which emails the lead to `info@golfbooth.ca` and sends the customer an auto-reply via [Resend](https://resend.com).

1. Copy `.env.example` to `.env.local`.
2. Create a Resend API key and verify the `golfbooth.ca` domain (SPF/DKIM).
3. Set `RESEND_API_KEY` (and optionally `QUOTE_FROM_EMAIL`).

Without a key, submissions are accepted and logged to the server console (so nothing breaks in dev), and the user is still redirected to the thank-you page.

Spam protection: hidden honeypot field + a submission time-trap, validated server-side.

## SEO

- Per-locale metadata via `generateMetadata` (titles/descriptions in `messages/*.json`).
- JSON-LD: `ProfessionalService` (real NAP), `Service`, `FAQPage`, `BreadcrumbList`.
- `app/sitemap.ts` (bilingual, with hreflang alternates) and `app/robots.ts`.

## Deployment (Vercel)

This deploys cleanly to Vercel (no extra config needed). Two options:

1. **GitHub import:** push this repo to GitHub, then "Import Project" in Vercel.
2. **CLI:** `npx vercel` then `npx vercel --prod`.

Then point the `golfbooth.ca` DNS to Vercel and add the Resend DNS records.

## Post-launch checklist

- [ ] Add `RESEND_API_KEY` in Vercel env vars and verify the domain.
- [ ] Submit the sitemap to Google Search Console (EN + FR).
- [ ] Connect the Google Business Profile once verified (add link in `lib/site.ts` `social.googleBusiness` to enable `sameAs`).
- [ ] Replace the 3D render video with real event footage when available (`public/videos/booth-render.mp4`).
- [ ] Add real testimonials when available (`components/Testimonials.tsx`).
- [ ] Review/refine the French copy in `messages/fr.json`.
