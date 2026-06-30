<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## EVO Sporting USA Copy Standard

Keep the storefront concrete and retail-first. Do not reintroduce repeated trust/proof badges such as "Box contents", "Warranty by item", "Fast ship", or "Add-on favorite" in product grids. Shipping, returns, warranty, support, payment, and checkout copy belongs where the customer needs it: product detail, cart, checkout, support, and policy pages.

Before finishing EVO storefront work, run the production build with a local server and verify:

- `npm run lint`
- `npm run build`
- `BASE_URL=http://localhost:3065 npm run verify:public-copy`
- `BASE_URL=http://localhost:3065 npm run audit:slop`
- `BASE_URL=http://localhost:3065 npm run verify:store`
