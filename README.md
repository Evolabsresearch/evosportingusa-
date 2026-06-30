# EVO Sporting USA

EVO Sporting USA is a Next.js storefront for gym and strength equipment. It uses the public structure of `preparedhero.com` as reference research, but the brand, copy, catalog, product data, and artwork are original to EVO Sporting USA.

## What is included

- 102 focused SKUs across lifting supports, straps, chalk and grip basics, gym bag essentials, setup and mobility minis, dumbbells, bars, plates, benches, pull-up gear, conditioning, recovery, storage, and bundles.
- Product descriptions, value bullets, specs, pricing, care notes, and image prompts for every SKU.
- Realistic PNG product images for every listed product.
- Cart pairings designed around `$125-$175` customer orders while keeping the average listed item under `$60`; standard shipping is a flat `$25` with no order minimum.
- Two-step checkout flow: shipping/contact first, payment handoff point second.
- Merchant-readiness pages: support, contact, FAQ, tracking, shipping, refunds, warranty, privacy, terms, accessibility, and contact information.
- A public-page reference scraper that saves compact page structure summaries under `reference/`.

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run scrape:reference
npm run generate:catalog
npm run generate:images
npm run verify:low-ticket
npm run verify:pricing
npm run verify:catalog
```

## Product images

AI product image prompts live in `data/image-prompts.json`. The app serves `/product-images/[slug]`, which automatically uses `public/products/[slug].png` when it exists and falls back to `public/products/[slug].svg` until the final PNG is approved.

To generate PNG product images into `public/products/*.png`, set `OPENAI_API_KEY` locally and run in batches:

```powershell
$env:OPENAI_API_KEY="..."
$env:IMAGE_LIMIT="25"
npm run generate:images
```

Continue the next batch with:

```powershell
$env:IMAGE_START="25"
$env:IMAGE_LIMIT="25"
npm run generate:images
```

The image script defaults to `OPENAI_IMAGE_MODEL=gpt-image-2`. Set `OPENAI_IMAGE_MODEL` if you want to use a different available image model. Generated PNGs are picked up by the storefront without changing product data.

## Merchant Details

Business identity is configured from public environment variables so final merchant details can be added without code edits:

```bash
NEXT_PUBLIC_EVO_BILLING_DESCRIPTOR=EVO SPORTING USA
NEXT_PUBLIC_EVO_SUPPORT_PHONE=
NEXT_PUBLIC_EVO_BUSINESS_ADDRESS=
```

Those values flow into support pages, policy content, about page, footer copy, checkout billing copy, and structured data when provided. See `.env.example` for all public storefront identity fields.

Run `npm run verify:merchant` with the site running to confirm the visible support, policy, checkout, and merchant-detail surfaces are aligned.

The Vercel CLI is not installed in this environment. Installing it with `npm i -g vercel` will unlock agentic deployment features such as `vercel env pull`, `vercel deploy`, and `vercel logs`.
