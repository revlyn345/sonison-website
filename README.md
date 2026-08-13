# Sonison Packaging — Next.js website

This is your Lovable site (`Sonison_BOPP_Excellence.zip`) rebuilt from scratch as a
**Next.js 16 App Router** project. It keeps the exact same design, copy, product
data, pricing logic and pages — but every page now renders to static HTML at build
time, which is what makes it good for SEO (fast load, fully crawlable, proper
metadata/canonical/Open Graph/JSON-LD on every route).

## What changed vs. the Lovable export

- **Framework:** TanStack Start (Vite/React Router) → Next.js App Router.
- **Removed:** ~40 unused shadcn/ui component files and their dependencies
  (radix-ui, react-hook-form, recharts, embla-carousel, cmdk, etc.) — none of
  them were actually used by any page, so they only added weight.
- **Fonts:** Google Fonts are now loaded via `next/font/google`, which
  self-hosts them at build time (faster, no render-blocking request, no
  layout shift) instead of a `<link>` to fonts.googleapis.com.
- **SEO:** every page's `head()` metadata became a Next.js `metadata` /
  `generateMetadata()` export. The static `sitemap.xml` / `robots.txt` became
  `src/app/sitemap.ts` / `src/app/robots.ts`, generated from your actual
  product/industry data so they can never drift out of sync.
- **Logo:** the Lovable export only contained a *reference* to your logo on
  Lovable's internal CDN, not the actual PNG file, so it couldn't be carried
  over automatically. `src/components/site/Logo.tsx` is a text-wordmark
  standing in for it — see the instructions in that file for swapping in your
  real logo once you export it from Lovable.

Everything else — copy, product specs, pricing/quote logic, industries,
FAQs, glossary, the whole design system (colours, type, the "hazard band",
"ink panel", tape-roll SVG preview, etc.) — is carried over as-is.

## Getting started

You said you already made an empty `sonison` folder — copy everything from
this project into it (or just unzip this project directly into it), then:

```bash
cd sonison
npm install
npm run dev
```

Open http://localhost:3000 — you should see the exact same site.

## Project structure

```
sonison/
├─ public/
│  └─ favicon.png
├─ src/
│  ├─ app/                      # one folder per route (Next.js App Router)
│  │  ├─ layout.tsx             # <html>/<body>, fonts, global <Header>/<Footer>
│  │  ├─ globals.css            # your full design system (Tailwind v4)
│  │  ├─ page.tsx               # home page                      → /
│  │  ├─ about/page.tsx         #                                 → /about
│  │  ├─ products/page.tsx      #                                 → /products
│  │  ├─ products/[slug]/page.tsx  # 5 product pages, statically generated
│  │  ├─ industries/page.tsx    #                                 → /industries
│  │  ├─ industries/[slug]/page.tsx # 6 industry pages, statically generated
│  │  ├─ quality/page.tsx       #                                 → /quality
│  │  ├─ configurator/page.tsx  #                                 → /configurator
│  │  ├─ resources/page.tsx     #                                 → /resources
│  │  ├─ faq/page.tsx           #                                 → /faq
│  │  ├─ contact/page.tsx       #                                 → /contact
│  │  ├─ sitemap.ts             # generates /sitemap.xml
│  │  ├─ robots.ts              # generates /robots.txt
│  │  ├─ not-found.tsx          # 404 page
│  │  └─ error.tsx              # error boundary
│  ├─ components/site/          # Header, Footer, TapeConfigurator, etc.
│  ├─ lib/
│  │  ├─ site-data.ts           # company info, products, stats, timeline…
│  │  └─ catalog.ts             # micron grades, quote engine, industries, FAQs, glossary
│  └─ assets/                   # hero/factory/product photos
├─ package.json
├─ next.config.mjs
├─ postcss.config.mjs
└─ tsconfig.json
```

## Before you deploy — 3 things to do

1. **Swap in your real logo.** See the comment at the top of
   `src/components/site/Logo.tsx`. Export `sonison-logo.png` from your
   Lovable project, drop it in `/public/logo.png`, and follow the two-line
   change described there (in both `Header.tsx` and `Footer.tsx`).

2. **Set your real domain.** Two files currently use a placeholder
   `https://www.sonisonpackaging.in`:
   - `src/app/layout.tsx` (`siteUrl` — used for `metadataBase`)
   - `src/app/sitemap.ts` and `src/app/robots.ts` (`siteUrl`)

   Update all three to your actual domain once you have one, so canonical
   URLs, Open Graph tags and the sitemap are correct.

3. **Double check the WhatsApp number / address / email** in
   `src/lib/site-data.ts` (`company` object) — carried over exactly from your
   Lovable project, but worth a glance before going live.

## Deploying

This builds to plain static HTML for every page (no database, no API routes),
so it deploys anywhere that runs Next.js:

- **Vercel** (built by the makers of Next.js): push to GitHub, import the repo
  at vercel.com/new, no config needed.
- **Netlify**, **Cloudflare Pages**, or your own Node server: `npm run build`
  then `npm start`, or use their Next.js adapter.

## Scripts

- `npm run dev` — local development at http://localhost:3000
- `npm run build` — production build (this is what generates static HTML for
  every route — verified working before this was handed to you)
- `npm start` — run the production build locally
- `npm run lint` — lint the project
