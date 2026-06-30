import { readFile } from "node:fs/promises";
import { join } from "node:path";

const expectedObservedAt = process.env.PRICING_OBSERVED_AT ?? "2026-05-31";
const pricingPath = join(process.cwd(), "data", "pricing-analysis.json");
const catalogPath = join(process.cwd(), "src", "data", "catalog.ts");

function parseCatalogProducts(source) {
  const match = source.match(/export const products = ([\s\S]*?)\] satisfies Product\[\];/);
  if (!match) throw new Error("Could not locate products array in catalog.ts");
  return JSON.parse(`${match[1]}]`);
}

const report = JSON.parse(await readFile(pricingPath, "utf8"));
const products = parseCatalogProducts(await readFile(catalogPath, "utf8"));
const failures = [];
const sources = report.sources ?? {};
const analyses = report.products ?? [];
const sourceEntries = Object.entries(sources);

if (report.summary?.observedAt !== expectedObservedAt) {
  failures.push(`Pricing observedAt is ${report.summary?.observedAt}; expected ${expectedObservedAt}.`);
}

if (report.summary?.skuCount !== products.length || analyses.length !== products.length) {
  failures.push(`Pricing analysis product count does not match catalog: summary=${report.summary?.skuCount}, analyses=${analyses.length}, catalog=${products.length}.`);
}

if (report.summary?.averagePrice > 60) {
  failures.push(`Average item price exceeds under-$60 target: ${report.summary.averagePrice}.`);
}

if (report.summary?.reviewCount !== 0) {
  failures.push(`Pricing analysis still has ${report.summary?.reviewCount} review flags.`);
}

if (sourceEntries.length < 15) {
  failures.push(`Expected at least 15 competitor pricing sources, found ${sourceEntries.length}.`);
}

const brands = new Set(sourceEntries.map(([, source]) => source.brand));
if (brands.size < 3) {
  failures.push(`Expected at least 3 competitor brands, found ${brands.size}.`);
}

for (const [id, source] of sourceEntries) {
  for (const field of ["brand", "product", "url", "observed", "notes", "sourceType", "checkMethod", "verifiedAt"]) {
    if (!source[field] || String(source[field]).trim().length < 6) {
      failures.push(`${id} source is missing a useful ${field}.`);
    }
  }

  if (!/^https:\/\//.test(source.url ?? "")) {
    failures.push(`${id} source URL must be HTTPS: ${source.url}`);
  }

  if (source.verifiedAt !== report.summary?.observedAt) {
    failures.push(`${id} source verifiedAt ${source.verifiedAt} does not match observedAt ${report.summary?.observedAt}.`);
  }
}

const catalogSkus = new Set(products.map((product) => product.sku));
const analysisSkus = new Set();
const sourceIds = new Set(Object.keys(sources));

for (const analysis of analyses) {
  analysisSkus.add(analysis.sku);

  if (!catalogSkus.has(analysis.sku)) {
    failures.push(`${analysis.sku} is in pricing analysis but not catalog.`);
  }

  if (!analysis.sourceIds?.length) {
    failures.push(`${analysis.sku} has no pricing source IDs.`);
  }

  for (const sourceId of analysis.sourceIds ?? []) {
    if (!sourceIds.has(sourceId)) {
      failures.push(`${analysis.sku} references missing source ${sourceId}.`);
    }
  }

  if (!analysis.rationale || analysis.rationale.length < 40) {
    failures.push(`${analysis.sku} pricing rationale is too thin.`);
  }

  if (analysis.evoPrice < analysis.marketBand?.low * 0.9 || analysis.evoPrice > analysis.marketBand?.high * 1.1) {
    failures.push(`${analysis.sku} EVO price ${analysis.evoPrice} sits outside the allowed review tolerance for its market band ${analysis.marketBand?.low}-${analysis.marketBand?.high}.`);
  }
}

for (const product of products) {
  if (!analysisSkus.has(product.sku)) {
    failures.push(`${product.sku} ${product.slug} is missing pricing analysis.`);
  }
}

if (failures.length) {
  throw new Error(`Pricing analysis verification failed:\n${failures.join("\n")}`);
}

console.log(
  `Pricing analysis verification passed: ${analyses.length} SKUs, ${sourceEntries.length} sources, ${brands.size} brands, observed ${report.summary.observedAt}.`,
);
