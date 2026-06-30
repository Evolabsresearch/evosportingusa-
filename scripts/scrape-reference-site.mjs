import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import process from "node:process";
import * as cheerio from "cheerio";
import { XMLParser } from "fast-xml-parser";
import { chromium } from "playwright";

const ROOT = "https://preparedhero.com";
const OUT = join(process.cwd(), "reference", "preparedhero-structure.json");
const MARKDOWN_OUT = join(process.cwd(), "reference", "preparedhero-layout-audit.md");
const ATTEMPT_OUT = join(process.cwd(), "reference", "preparedhero-structure-last-attempt.json");
const ATTEMPT_MARKDOWN_OUT = join(process.cwd(), "reference", "preparedhero-layout-audit-last-attempt.md");
const MAX_CONCURRENCY = Number(process.env.SCRAPE_CONCURRENCY ?? 4);
const MAX_BROWSER_FALLBACKS = Number(process.env.SCRAPE_BROWSER_FALLBACKS ?? 120);
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const disallowedPathParts = [
  "/admin",
  "/cart/",
  "/checkout",
  "/checkouts/",
  "/orders",
  "/account",
  "/services",
  "/sf_",
  "/cart.js",
  "/recommendations/products",
];

function isEnglishPublicUrl(rawUrl) {
  const url = new URL(rawUrl);
  if (url.origin !== ROOT) return false;
  if (/^\/[a-z]{2}-[a-z]{2}\b/i.test(url.pathname)) return false;
  if (disallowedPathParts.some((part) => url.pathname.includes(part))) return false;
  return true;
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "text/html,application/xml" },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }

  return response.text();
}

async function fetchPageHtml(url) {
  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "text/html,application/xhtml+xml" },
  });

  if (!response.ok) {
    return {
      status: response.status,
      error: `${response.status} ${response.statusText} for ${url}`,
    };
  }

  return {
    status: response.status,
    html: await response.text(),
  };
}

function xmlLocs(xml) {
  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(xml);
  const sitemaps = parsed.sitemapindex?.sitemap;
  const urls = parsed.urlset?.url;
  const items = sitemaps ?? urls ?? [];
  return (Array.isArray(items) ? items : [items])
    .map((item) => item?.loc)
    .filter(Boolean)
    .map(String);
}

async function getSitemapUrls() {
  let indexXml;
  try {
    indexXml = await fetchText(`${ROOT}/sitemap.xml`);
  } catch (error) {
    try {
      const cached = JSON.parse(await readFile(OUT, "utf8"));
      const urls = cached.pages?.map((page) => page.url).filter(Boolean) ?? [];
      if (urls.length) {
        console.warn(`Sitemap fetch failed; reusing ${urls.length} cached URLs from ${OUT}. ${error}`);
        return [...new Set(urls)].filter(isEnglishPublicUrl);
      }
    } catch {
      // Fall through to the original sitemap error when no cache is available.
    }
    throw error;
  }
  const childSitemaps = xmlLocs(indexXml).filter((url) => {
    const parsed = new URL(url);
    return (
      parsed.origin === ROOT &&
      !/^\/[a-z]{2}-[a-z]{2}\b/i.test(parsed.pathname) &&
      !parsed.pathname.includes("sitemap_agentic_discovery")
    );
  });

  const pageGroups = await Promise.all(
    childSitemaps.map(async (sitemapUrl) => {
      try {
        const xml = await fetchText(sitemapUrl);
        return xmlLocs(xml).filter(isEnglishPublicUrl);
      } catch (error) {
        return [{ error: String(error), sitemapUrl }];
      }
    }),
  );

  return [...new Set(pageGroups.flat().filter((item) => typeof item === "string"))];
}

function cleanText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function compactLabel(text, maxLength = 90) {
  const cleaned = cleanText(text);
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength - 1).trim()}…`;
}

function classifyUrl(rawUrl) {
  const { pathname } = new URL(rawUrl);
  if (pathname.startsWith("/products/")) return "product";
  if (pathname.startsWith("/collections/")) return "collection";
  if (pathname.startsWith("/pages/")) return "page";
  if (pathname.startsWith("/blogs/")) return "blog";
  if (pathname === "/") return "home";
  return "other";
}

function extractPage(rawUrl, html) {
  const $ = cheerio.load(html);
  const headings = $("h1,h2,h3")
    .toArray()
    .map((node) => ({
      level: node.tagName.toLowerCase(),
      text: compactLabel($(node).text(), 120),
    }))
    .filter((item) => item.text)
    .slice(0, 80);

  const navigation = $("header a, nav a")
    .toArray()
    .map((node) => compactLabel($(node).text(), 80))
    .filter(Boolean)
    .slice(0, 60);

  const ctas = $("a,button,input[type=submit]")
    .toArray()
    .map((node) => compactLabel($(node).text() || $(node).attr("value") || "", 90))
    .filter((text) => /shop|buy|add|cart|checkout|save|learn|view|get/i.test(text))
    .slice(0, 80);

  const forms = $("form")
    .toArray()
    .map((node) => ({
      action: $(node).attr("action") ?? "",
      method: $(node).attr("method") ?? "get",
      fields: $(node)
        .find("input,select,textarea")
        .toArray()
        .map((field) => ({
          name: $(field).attr("name") ?? "",
          type: $(field).attr("type") ?? field.tagName.toLowerCase(),
        }))
        .filter((field) => field.name || field.type)
        .slice(0, 20),
    }))
    .slice(0, 20);

  const images = $("img")
    .toArray()
    .map((node) => ({
      alt: compactLabel($(node).attr("alt") ?? "", 100),
      srcHint: ($(node).attr("src") ?? $(node).attr("data-src") ?? "")
        .replace(/^https?:/, "")
        .slice(0, 140),
    }))
    .filter((image) => image.alt || image.srcHint)
    .slice(0, 50);

  const productCards = $(
    "[class*='product-card'], [class*='ProductCard'], .product, [data-product-id], [data-product-handle]",
  ).length;
  const sections = $("section, [class*='section'], [class*='Section']").length;
  const announcementText = cleanText(
    $("[class*='announcement'], [class*='Announcement'], [class*='top-bar'], [class*='TopBar']")
      .first()
      .text(),
  ).slice(0, 180);
  const pricePatterns = [...new Set((html.match(/\$\s?\d+(?:\.\d{2})?/g) ?? []).slice(0, 30))];

  return {
    url: rawUrl,
    type: classifyUrl(rawUrl),
    title: cleanText($("title").first().text()),
    description: cleanText($('meta[name="description"]').attr("content") ?? ""),
    headings,
    navigation: [...new Set(navigation)],
    ctas: [...new Set(ctas)],
    forms,
    images,
    layoutSignals: {
      sectionCount: sections,
      productCardCandidates: productCards,
      formCount: forms.length,
      imageCount: images.length,
      pricePatterns,
      announcementText,
    },
    sectionClassHints: $("section, [class*='section'], [class*='sec'], [class*='pdp']")
      .toArray()
      .map((node) => ($(node).attr("class") ?? "").slice(0, 120))
      .filter(Boolean)
      .slice(0, 80),
  };
}

async function browserExtractPages(pages) {
  if (!pages.length) return [];

  const browser = await chromium.launch();
  const context = await browser.newContext({ userAgent: USER_AGENT, viewport: { width: 1440, height: 1100 } });
  const page = await context.newPage();
  await page.route("**/*", (route) => {
    const type = route.request().resourceType();
    if (["image", "media", "font"].includes(type)) return route.abort();
    return route.continue();
  });

  const results = [];
  for (const item of pages) {
    try {
      const response = await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(750);
      const status = response?.status() ?? 0;
      if (status >= 400) {
        results.push({ ...item, browserStatus: status, error: `${status} browser status for ${item.url}` });
        continue;
      }
      const html = await page.content();
      results.push({ ...extractPage(item.url, html), fetchMode: "browser-fallback", browserStatus: status });
    } catch (error) {
      results.push({ ...item, browserStatus: 0, error: String(error) });
    }
  }

  await browser.close();
  return results;
}

function summarizeLayout(pages) {
  const successful = pages.filter((page) => !page.error);
  const navLabels = new Map();
  const ctaLabels = new Map();
  const headingStarts = new Map();

  for (const page of successful) {
    for (const label of page.navigation ?? []) navLabels.set(label, (navLabels.get(label) ?? 0) + 1);
    for (const label of page.ctas ?? []) ctaLabels.set(label, (ctaLabels.get(label) ?? 0) + 1);
    for (const heading of page.headings ?? []) {
      const firstWords = heading.text.split(/\s+/).slice(0, 5).join(" ");
      if (firstWords) headingStarts.set(firstWords, (headingStarts.get(firstWords) ?? 0) + 1);
    }
  }

  const top = (map, limit = 12) =>
    [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([label, count]) => ({ label, count }));

  const averageSections =
    successful.reduce((sum, page) => sum + (page.layoutSignals?.sectionCount ?? 0), 0) / Math.max(1, successful.length);
  const averageImages =
    successful.reduce((sum, page) => sum + (page.layoutSignals?.imageCount ?? 0), 0) / Math.max(1, successful.length);

  return {
    successfulCount: successful.length,
    errorCount: pages.length - successful.length,
    averageSections: Number(averageSections.toFixed(1)),
    averageImages: Number(averageImages.toFixed(1)),
    topNavigationLabels: top(navLabels),
    topCtaLabels: top(ctaLabels),
    commonHeadingStarts: top(headingStarts),
  };
}

function markdownReport(summary) {
  const counts = summary.counts;
  const layout = summary.layout;
  const errors = summary.pages.filter((page) => page.error).slice(0, 30);
  const sourceTypes = Object.entries(counts)
    .filter(([key]) => key !== "total")
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n");
  const list = (items) =>
    items.length
      ? items.map((item) => `- ${item.label}: ${item.count}`).join("\n")
      : "- None captured";

  return [
    "# Prepared Hero Reference Layout Audit",
    "",
    `Source: ${summary.source}`,
    `Scraped at: ${summary.scrapedAt}`,
    "",
    "This artifact captures public page structure only. It is used to study ecommerce patterns and avoid accidental similarity; it is not a content clone.",
    "",
    "## Page Counts",
    "",
    `- total sitemap URLs: ${counts.total}`,
    sourceTypes,
    `- successful structure captures: ${layout.successfulCount}`,
    `- blocked or failed captures: ${layout.errorCount}`,
    "",
    "## Layout Signals",
    "",
    `- average captured sections per successful page: ${layout.averageSections}`,
    `- average captured image hints per successful page: ${layout.averageImages}`,
    "",
    "### Common Navigation Labels",
    "",
    list(layout.topNavigationLabels),
    "",
    "### Common CTA Labels",
    "",
    list(layout.topCtaLabels),
    "",
    "### Common Heading Starts",
    "",
    list(layout.commonHeadingStarts),
    "",
    "## Blocked Sample",
    "",
    errors.length ? errors.map((page) => `- ${page.url}: ${page.error}`).join("\n") : "- None",
    "",
    "## EVO Sporting USA Use",
    "",
    "- Keep only the structural lessons: announcement bar, clear product categories, policy visibility, product-grid density, and support/policy access.",
    "- Do not reuse Prepared Hero product copy, emergency-preparedness claims, imagery, brand language, reviews, or checkout/account flows.",
    "- EVO Sporting USA should stay in its own gym-equipment visual system: rounded cards, black rubber gym-floor photography, orange accents, and sport-equipment copy.",
    "",
  ].join("\n");
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await mapper(items[current], current);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  );
  return results;
}

async function main() {
  const urls = await getSitemapUrls();
  const fetchPages = await mapWithConcurrency(urls, MAX_CONCURRENCY, async (url) => {
    const result = await fetchPageHtml(url);
    if (result.html) {
      return { ...extractPage(url, result.html), fetchMode: "fetch", status: result.status };
    }
    return { url, type: classifyUrl(url), status: result.status, error: result.error };
  });
  const fallbackCandidates = fetchPages.filter((page) => page.error).slice(0, MAX_BROWSER_FALLBACKS);
  const fallbackPages = await browserExtractPages(fallbackCandidates);
  const fallbackByUrl = new Map(fallbackPages.map((page) => [page.url, page]));
  const pages = fetchPages.map((page) => fallbackByUrl.get(page.url) ?? page);

  const summary = {
    source: ROOT,
    scrapedAt: new Date().toISOString(),
    policy:
      "Public sitemap pages only. Transactional/account/cart/checkout paths are intentionally skipped.",
    counts: pages.reduce(
      (acc, page) => {
        acc.total += 1;
        acc[page.type] = (acc[page.type] ?? 0) + 1;
        return acc;
      },
      { total: 0 },
    ),
    layout: summarizeLayout(pages),
    pages,
  };

  await mkdir(dirname(OUT), { recursive: true });
  let outputPath = OUT;
  let markdownPath = MARKDOWN_OUT;
  try {
    const previous = JSON.parse(await readFile(OUT, "utf8"));
    const previousSuccess = previous.layout?.successfulCount ?? previous.pages?.filter((page) => !page.error).length ?? 0;
    const currentSuccess = summary.layout.successfulCount;
    if (previousSuccess > currentSuccess && process.env.SCRAPE_ALLOW_DOWNGRADE !== "true") {
      outputPath = ATTEMPT_OUT;
      markdownPath = ATTEMPT_MARKDOWN_OUT;
      console.warn(
        `Current crawl captured ${currentSuccess} successful pages, below previous ${previousSuccess}. Saving as last-attempt instead of replacing main reference.`,
      );
    }
  } catch {
    // No previous reference to protect.
  }

  await writeFile(outputPath, `${JSON.stringify(summary, null, 2)}\n`);
  await writeFile(markdownPath, markdownReport(summary));
  console.log(`Saved ${pages.length} page summaries to ${outputPath}`);
  console.log(`Saved layout audit to ${markdownPath}`);
  console.log(summary.counts);
  console.log(summary.layout);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
