import * as cheerio from "cheerio";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://evosportingusa.com";
const catalogPath = join(process.cwd(), "src", "data", "catalog.ts");
const configuredPhone = process.env.NEXT_PUBLIC_EVO_SUPPORT_PHONE?.trim() ?? "";
const configuredAddress = process.env.NEXT_PUBLIC_EVO_BUSINESS_ADDRESS?.trim() ?? "";

function parseCatalogProducts(source) {
  const match = source.match(/export const products = ([\s\S]*?)\] satisfies Product\[\];/);
  if (!match) throw new Error("Could not locate products array in catalog.ts");
  return JSON.parse(`${match[1]}]`);
}

const products = parseCatalogProducts(await readFile(catalogPath, "utf8"));

async function fetchText(route) {
  const response = await fetch(`${baseUrl}${route}`);
  if (!response.ok) throw new Error(`${route} returned ${response.status}`);
  return response.text();
}

function jsonLdBlocks(html) {
  const $ = cheerio.load(html);
  return $('script[type="application/ld+json"]')
    .toArray()
    .map((element) => {
      const text = $(element).text();
      try {
        return JSON.parse(text);
      } catch (error) {
        throw new Error(`Invalid JSON-LD: ${String(error)}`);
      }
    });
}

function hasType(block, type) {
  return block?.["@type"] === type || (Array.isArray(block?.["@type"]) && block["@type"].includes(type));
}

function expectedAbsolute(path) {
  return new URL(path, siteUrl).toString();
}

function fail(message) {
  failures.push(message);
}

const failures = [];
const homeBlocks = jsonLdBlocks(await fetchText("/"));
const organizationBlock = homeBlocks.find((block) => hasType(block, "Organization"));
if (!organizationBlock) {
  throw new Error("Home page is missing Organization JSON-LD.");
}

if (organizationBlock["@id"] !== expectedAbsolute("/#organization")) {
  fail(`Organization JSON-LD has unexpected @id: ${organizationBlock["@id"]}`);
}
if (organizationBlock.name !== "EVO Sporting USA" || organizationBlock.legalName !== "EVO Sporting USA LLC") {
  fail("Organization JSON-LD has incorrect store identity.");
}
if (organizationBlock.url !== expectedAbsolute("/")) {
  fail(`Organization JSON-LD has unexpected url: ${organizationBlock.url}`);
}
if (organizationBlock.logo !== expectedAbsolute("/brand/evo-mark.svg")) {
  fail(`Organization JSON-LD has unexpected logo: ${organizationBlock.logo}`);
}
if (organizationBlock.email !== "support@evosportingusa.com") {
  fail(`Organization JSON-LD has unexpected support email: ${organizationBlock.email}`);
}
if (!configuredPhone && "telephone" in organizationBlock) {
  fail("Organization JSON-LD exposes telephone even though phone is not configured.");
}
if (configuredPhone && organizationBlock.telephone !== configuredPhone) {
  fail("Organization JSON-LD does not expose the configured phone.");
}
if (!configuredAddress && "address" in organizationBlock) {
  fail("Organization JSON-LD exposes address even though address is not configured.");
}
if (configuredAddress && organizationBlock.address?.streetAddress !== configuredAddress) {
  fail("Organization JSON-LD does not expose the configured business address.");
}
if (!Array.isArray(organizationBlock.contactPoint) || organizationBlock.contactPoint[0]?.email !== "support@evosportingusa.com") {
  fail("Organization JSON-LD contactPoint is missing support email.");
}

for (const product of products) {
  const route = `/products/${product.slug}`;
  const blocks = jsonLdBlocks(await fetchText(route));
  const productBlock = blocks.find((block) => hasType(block, "Product"));
  if (!productBlock) {
    fail(`${route} is missing Product JSON-LD.`);
    continue;
  }

  if (productBlock["@id"] !== expectedAbsolute(`${route}#product`)) {
    fail(`${route} Product JSON-LD has unexpected @id: ${productBlock["@id"]}`);
  }
  if (productBlock.url !== expectedAbsolute(route)) {
    fail(`${route} Product JSON-LD has unexpected url: ${productBlock.url}`);
  }
  if (productBlock.name !== product.name) {
    fail(`${route} Product JSON-LD name mismatch.`);
  }
  if (productBlock.sku !== product.sku) {
    fail(`${route} Product JSON-LD sku mismatch.`);
  }
  if (typeof productBlock.description !== "string" || productBlock.description.length < 60) {
    fail(`${route} Product JSON-LD description is too thin.`);
  }
  if (
    ["when durability and easy storage matter", "regular weekly use", "garage-gym training"].some((phrase) =>
      productBlock.description.toLowerCase().includes(phrase),
    )
  ) {
    fail(`${route} Product JSON-LD description uses generated catalog filler.`);
  }
  if (productBlock.category !== product.category) {
    fail(`${route} Product JSON-LD category mismatch.`);
  }
  if (productBlock.material !== product.material) {
    fail(`${route} Product JSON-LD material mismatch.`);
  }
  if (productBlock.brand?.name !== "EVO Sporting USA") {
    fail(`${route} Product JSON-LD brand mismatch.`);
  }
  if (!productBlock.offers || productBlock.offers["@type"] !== "Offer") {
    fail(`${route} Product JSON-LD is missing an Offer.`);
  } else {
    if (productBlock.offers.url !== expectedAbsolute(route)) {
      fail(`${route} Product JSON-LD offer URL mismatch.`);
    }
    if (productBlock.offers.priceCurrency !== "USD") {
      fail(`${route} Product JSON-LD offer currency mismatch.`);
    }
    if (productBlock.offers.price !== product.price.toFixed(2)) {
      fail(`${route} Product JSON-LD offer price mismatch.`);
    }
    if (productBlock.offers.seller?.["@id"] !== expectedAbsolute("/#organization")) {
      fail(`${route} Product JSON-LD offer seller is not linked to Organization.`);
    }
  }
  if ("aggregateRating" in productBlock || "review" in productBlock || "reviews" in productBlock) {
    fail(`${route} Product JSON-LD includes review claims.`);
  }
  if (productBlock.image?.[0] !== expectedAbsolute(product.image)) {
    fail(`${route} Product JSON-LD image mismatch.`);
  }
  const properties = productBlock.additionalProperty ?? [];
  const propertyNames = new Set(properties.map((property) => property.name));
  for (const required of ["Material", "Training role", "What ships", "Warranty", "Ships from"]) {
    if (!propertyNames.has(required)) {
      fail(`${route} Product JSON-LD missing ${required} additionalProperty.`);
    }
  }
}

const robots = await fetchText("/robots.txt");
if (!robots.includes("Sitemap:") || !robots.includes("/sitemap.xml")) {
  throw new Error("robots.txt is missing the sitemap URL.");
}

const sitemap = await fetchText("/sitemap.xml");
for (const route of [
  "/",
  "/collections",
  "/search",
  "/support/merchant-details",
  "/policies/payment-and-billing",
  ...products.map((product) => `/products/${product.slug}`),
]) {
  if (!sitemap.includes(expectedAbsolute(route))) {
    fail(`sitemap.xml is missing ${route}.`);
  }
}

if (failures.length) {
  throw new Error(`Structured data verification failed:\n${failures.join("\n")}`);
}

console.log(`Structured data verification passed: ${products.length} product pages, Organization JSON-LD, robots.txt, and sitemap.xml checked.`);
