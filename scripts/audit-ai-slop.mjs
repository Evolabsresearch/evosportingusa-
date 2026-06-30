import * as cheerio from "cheerio";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const catalogSource = readFileSync(join(process.cwd(), "src", "data", "catalog.ts"), "utf8");
const productMatch = catalogSource.match(/export const products = ([\s\S]*?)\] satisfies Product\[\];/);

if (!productMatch) {
  throw new Error("Could not parse products from src/data/catalog.ts");
}

const productsForAudit = JSON.parse(`${productMatch[1]}]`);
const productRoutes = productsForAudit.map((product) => ({
  path: `/products/${product.slug}`,
  kind: "product",
}));

const routes = [
  { path: "/", kind: "home" },
  { path: "/about", kind: "brand" },
  { path: "/collections", kind: "shopping" },
  { path: "/collections/lifting-supports", kind: "shopping" },
  { path: "/collections/straps-grips", kind: "shopping" },
  { path: "/collections/dumbbells-weights", kind: "shopping" },
  { path: "/collections/plates-bars", kind: "shopping" },
  { path: "/collections/benches-racks", kind: "shopping" },
  { path: "/collections/pullup-mobility", kind: "shopping" },
  { path: "/collections/conditioning", kind: "shopping" },
  { path: "/collections/storage-recovery", kind: "shopping" },
  { path: "/collections/bundles", kind: "shopping" },
  { path: "/search", kind: "shopping" },
  { path: "/cart", kind: "transactional" },
  { path: "/checkout", kind: "transactional" },
  { path: "/checkout/payment", kind: "transactional" },
  { path: "/support", kind: "support" },
  { path: "/support/contact", kind: "support" },
  { path: "/support/faq", kind: "support" },
  { path: "/support/merchant-details", kind: "support" },
  { path: "/track-order", kind: "support" },
  { path: "/policies/shipping-policy", kind: "policy" },
  { path: "/policies/refund-policy", kind: "policy" },
  { path: "/policies/warranty", kind: "policy" },
  { path: "/policies/payment-and-billing", kind: "policy" },
  { path: "/policies/privacy-policy", kind: "policy" },
  { path: "/policies/terms-of-service", kind: "policy" },
  { path: "/policies/accessibility", kind: "policy" },
  { path: "/policies/contact-information", kind: "policy" },
  ...productRoutes,
];

const bannedPhrases = [
  "Built like a store that has to answer customer questions",
  "Stocked products",
  "Return days",
  "support terms stay close",
  "cart built around real sessions",
  "visible before payment",
  "visible before card entry",
  "before payment details are entered",
  "checkout terms before",
  "support links stay visible",
  "policy links stay visible",
  "operating standard",
  "customer terms",
  "storefront terms",
  "what appears before payment",
  "review first. payment second",
  "total before payment",
  "build by station, not by impulse",
  "support links remain available before payment",
  "support links before payment",
  "shipping still visible",
  "terms visible while card data",
  "without changing the shipping math",
  "clear steps before support has to guess",
  "order facts",
  "results keep the buying details close",
  "payment terms before checkout",
  "30-day returns posted before checkout",
  "shown before checkout",
  "listed before checkout",
  "published before checkout",
  "clean answer",
  "route cleanly",
  "route the first message",
  "support can move faster",
  "move faster when",
  "without a second email",
  "in one place",
  "policy center",
  "business identity",
  "support has a path back",
  "before cart",
  "cart review keeps",
  "warranty coverage published",
  "each item shows what ships",
  "check warranty, carton notes",
  "buyer verification",
  "check the paperwork before you decide",
  "made for buyers who check",
  "what buyers can check",
  "fulfillment clarity",
  "support ready",
  "payment handoff",
  "payment-provider handoff",
  "secure payment handoff",
  "checkout route",
  "a clean order record",
  "ready for order review",
  "make the cart easy to ship",
  "order builder",
  "review the gear before moving on",
  "card fields later",
  "help details",
  "details support can match to the order",
  "use this page with your order email",
  "after handoff",
  "check fit, package contents, and delivery handling",
  "use the order email for support",
  "business records and service details",
  "checkout review fields",
  "listed for review",
  "payment data handling",
  "policy pages.",
  "order record",
  "before adding it",
  "support lookup",
  "keep the bundle tied",
  "keep delivery scans tied",
  "keep the pair tied",
  "the practical checks stay easy to find",
  "know the seller, terms, and order lookup",
  "support line and seller information",
  "match shipment records",
  "order lookup checklist",
  "support follow-up both rely",
  "faster first reply",
  "first reply can be useful",
  "without another message",
  "fastest tickets",
  "help the first reply",
  "needs for the first reply",
  "how this policy is used",
  "policy question needs support review",
  "receipt path",
  "receipt notes",
  "receipt email",
  "receipt trail",
  "receipt by email",
  "keep the bundle receipt",
  "keep the receipt with",
  "statement name",
  "card statement",
  "card statements",
  "warranty contact",
  "support review",
  "warranty review",
  "resolution path",
  "before warranty request",
  "before return request",
  "before contacting support",
  "billing descriptor",
  "card descriptor",
  "card statements should",
  "card statements should identify",
  "card card",
  "payment details are ready",
  "support can review",
  "support can help match",
  "policy timing",
  "why lifters buy it",
  "receives the order confirmation and tracking updates",
  "include the order number and clear photos",
  "care notes on page",
  "warranty listed below",
  "flat delivery rate is added in cart",
  "fulfillment note",
  "support follow-up",
  "support history",
  "open support request",
  "support request",
  "request prepared",
  "open email draft",
  "contact support",
  "email support",
  "support form",
  "support routing details",
  "support routes",
  "support workflow",
  "support handling details",
  "support request guidance",
  "support hours",
  "support email",
  "contact and delivery checked",
  "totals and items checked",
  "policy links checked",
  "i have reviewed the",
  "shipping record",
  "business details for axis sporting",
  "links stay in the footer",
  "how we check it",
  "when to use this",
  "where this lives",
  "checked in the verifier",
  "core standard",
  "linked below",
  "the same legal name appears",
  "appears with item lines",
  "delivery line",
  "quantity and delivery rate show",
  "what to send when gear fails early",
  "what should i send",
  "send the order number",
  "send us the order",
  "can send separate carrier emails",
  "stays ready",
  "stays small",
  "stays easy",
  "coverage details stay",
  "warranty coverage stays",
  "instead of sending the athlete",
  "what ships before it reaches",
  "what needs to ship together",
  "delivery handling",
  "product specs.",
  "product specs",
  "seller, delivery, returns, and tracking without the runaround",
  "box contents",
  "warranty by item",
  "fast ship",
  "add-on favorite",
  "cone set agility kit lays out",
];

const routeBudgets = {
  home: [
    { label: "shipping", pattern: /\bshipping\b/gi, max: 0 },
    { label: "returns", pattern: /\breturns?\b/gi, max: 0 },
    { label: "payment", pattern: /\bpayment\b/gi, max: 0 },
    { label: "checkout", pattern: /\bcheckout\b/gi, max: 0 },
    { label: "policy", pattern: /\bpolic(?:y|ies)\b/gi, max: 0 },
  ],
  brand: [
    { label: "before payment", pattern: /\bbefore payment\b/gi, max: 1 },
    { label: "shipping", pattern: /\bshipping\b/gi, max: 2 },
  ],
  shopping: [
    { label: "before payment", pattern: /\bbefore payment\b/gi, max: 0 },
    { label: "checkout", pattern: /\bcheckout\b/gi, max: 1 },
    { label: "shipping", pattern: /\bshipping\b/gi, max: 1 },
  ],
  product: [
    { label: "before payment", pattern: /\bbefore payment\b/gi, max: 1 },
    { label: "shipping", pattern: /\bshipping\b/gi, max: 2 },
    { label: "checkout", pattern: /\bcheckout\b/gi, max: 2 },
  ],
};

const sourceArtifacts = [
  { label: "AI asset name", pattern: /evo-gpt|gpt-logo/i },
  { label: "mojibake", pattern: /[\u00c2\ufffd]/u },
  { label: "lorem ipsum", pattern: /\blorem\s+ipsum\b/i },
  { label: "unfinished marker", pattern: /\b(?:TODO|TBD)\b/ },
];

function cleanText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function spacedScopeText($, selector) {
  const scope = $(selector).clone();
  scope.find("*").append(" ");
  return cleanText(scope.text());
}

function pageText(html) {
  const $ = cheerio.load(html);
  $("script, style, noscript, svg").remove();
  return {
    body: spacedScopeText($, "body"),
    main: spacedScopeText($, "main"),
  };
}

async function fetchRoute(route) {
  const response = await fetch(`${baseUrl}${route}`);
  if (!response.ok) throw new Error(`${route} returned ${response.status}`);
  return response.text();
}

function countMatches(text, pattern) {
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
}

function countTextOccurrences(text, term) {
  return text.split(term).length - 1;
}

function sourceFiles(root) {
  const files = [];
  for (const entry of readdirSync(root)) {
    const fullPath = join(root, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...sourceFiles(fullPath));
    } else if (/\.(?:ts|tsx|css|json)$/.test(entry)) {
      files.push(fullPath);
    }
  }
  return files;
}

const failures = [];

for (const product of productsForAudit) {
  const productCopy = [product.description, ...(product.features ?? [])].join(" ");
  const nameRepeats = countTextOccurrences(productCopy, product.name);
  if (nameRepeats >= 4) {
    failures.push(
      `src/data/catalog.ts: ${product.slug} repeats the full product name ${nameRepeats} times in description/features`,
    );
  }
}

for (const file of sourceFiles(join(process.cwd(), "src"))) {
  const source = readFileSync(file, "utf8");
  const sourceLower = source.toLowerCase();

  for (const phrase of bannedPhrases) {
    if (sourceLower.includes(phrase.toLowerCase())) {
      failures.push(`${file}: banned source phrase "${phrase}"`);
    }
  }

  for (const artifact of sourceArtifacts) {
    if (artifact.pattern.test(source)) {
      failures.push(`${file}: source artifact "${artifact.label}"`);
    }
  }
}

for (const route of routes) {
  const { body, main } = pageText(await fetchRoute(route.path));
  const bodyLower = body.toLowerCase();

  for (const phrase of bannedPhrases) {
    if (bodyLower.includes(phrase.toLowerCase())) {
      failures.push(`${route.path}: banned phrase "${phrase}"`);
    }
  }

  for (const budget of routeBudgets[route.kind] ?? []) {
    const count = countMatches(main, budget.pattern);
    if (count > budget.max) {
      failures.push(
        `${route.path}: "${budget.label}" appears ${count} times in main content; max is ${budget.max}`,
      );
    }
  }
}

if (failures.length) {
  throw new Error(`AI slop audit failed:\n${failures.join("\n")}`);
}

console.log(`AI slop audit passed: ${routes.length} routes checked.`);
