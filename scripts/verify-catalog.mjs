import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { inflateSync } from "node:zlib";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const root = process.cwd();
const catalogSource = readFileSync(join(root, "src", "data", "catalog.ts"), "utf8");
const match = catalogSource.match(/export const products = ([\s\S]*?)\] satisfies Product\[\];/);

if (!match) {
  throw new Error("Could not parse products from src/data/catalog.ts");
}

const products = JSON.parse(`${match[1]}]`);
const bannedCopyTerms = [
  "AOV",
  "AOB",
  "underwriter",
  "underwriting",
  "AI-generated",
  "AI generated",
  "hallucination",
  "placeholder",
  "before launch",
  "coming soon",
  "prototype",
  "larger purchase",
  "inflating",
  "merchandising",
  "upsell",
  "cross-sell",
  "conversion",
  "lorem",
  "TBD",
  "filler",
  "mystery add-ons",
  "throwaway",
  "right training feel",
  "clear role in the setup",
  "clearly defined training item",
  "product can stay in regular rotation",
  "training use obvious",
  "extra bulk second",
  "no bundled surprises",
  "customer can actually use",
  "Use case for",
  "Material focus for",
  "In the box for",
  "Coverage:",
  "SKU record",
  "to the SKU",
  "product record",
  "store records",
  "merchant record",
  "SKU, material",
  "key pieces together",
  "set set",
  "reorder review",
  "stated plainly on the product page",
  "easy to review",
  "simple to review",
  "straightforward choice",
  "keeps the setup focused",
  "stays practical and easy to compare",
  "instead of extra decoration",
  "normal training sessions",
  "entry-level alternatives",
  "digging through fine print",
  "without making storage harder",
  "shape, finish, and contact points",
  "decorative shelf appeal",
  "do not serve the training goal",
  "random pile",
  "shopper can see",
  "product role stated clearly",
  "concrete contents",
  "fulfillment review",
  "novelty workouts",
  "generic accessory language",
  "hand feel, support, or loading role",
  "expected from this category",
  "what ships is listed",
  "contents specific",
  "home-gym cart",
  "clear unboxing",
  "setup that is easy to identify",
  "right training setup",
  "cart one clear",
  "clear training role",
  "Build or kit logic",
  "complete setup",
  "coordinated training setup",
  "main job",
  "setup guesswork",
  "starter setup",
  "fast conditioning setup",
  "quick drill setup",
  "listed components",
  "listed bundle components",
  "Best used for:",
  "Included in the shipment:",
  "Construction:",
  "keeps the included pieces",
  "tied to the same lift",
  "clean gear shelf",
  "published return terms",
  "under one SKU",
  "repeat weekly training",
  "weekly garage-gym",
  "is built for",
  "better hand contact",
  "loadable strength work",
  "more warmup and recovery options",
  "practical training value",
  "care guidance",
  "coverage notes",
  "item record",
  "item details",
  "item-level warranty details",
  "bundle details",
  "wrap details",
  "mobility-tool details",
  "product page",
  "customers can verify",
  "before checkout",
  "before payment",
  "stay visible",
  "shown before",
  "listed before",
  "shipping terms",
  "shipping details",
  "shipping notes",
  "coverage terms",
  "return timing",
  "30-day returns",
  "30-day return policy",
  "United States fulfillment details",
];

function productCopy(product) {
  return [
    product.name,
    product.shortDescription,
    product.description,
    product.category,
    product.sku,
    ...(product.badges ?? []),
    ...(product.features ?? []),
    ...Object.entries(product.specs ?? {}).flat(),
  ].join(" ");
}

function unfilterPngRow(filter, row, previous, bytesPerPixel) {
  const output = Buffer.alloc(row.length);

  for (let index = 0; index < row.length; index += 1) {
    const left = index >= bytesPerPixel ? output[index - bytesPerPixel] : 0;
    const up = previous ? previous[index] : 0;
    const upLeft = previous && index >= bytesPerPixel ? previous[index - bytesPerPixel] : 0;
    let predictor = 0;

    if (filter === 1) {
      predictor = left;
    } else if (filter === 2) {
      predictor = up;
    } else if (filter === 3) {
      predictor = Math.floor((left + up) / 2);
    } else if (filter === 4) {
      const estimate = left + up - upLeft;
      const leftDistance = Math.abs(estimate - left);
      const upDistance = Math.abs(estimate - up);
      const upLeftDistance = Math.abs(estimate - upLeft);
      predictor = leftDistance <= upDistance && leftDistance <= upLeftDistance ? left : upDistance <= upLeftDistance ? up : upLeft;
    } else if (filter !== 0) {
      throw new Error(`Unsupported PNG row filter ${filter}`);
    }

    output[index] = (row[index] + predictor) & 255;
  }

  return output;
}

function pngStats(filePath) {
  const file = readFileSync(filePath);
  const header = file.subarray(0, 29);
  const pngSignature = "89504e470d0a1a0a";
  if (header.subarray(0, 8).toString("hex") !== pngSignature) {
    throw new Error(`${filePath} is not a PNG file`);
  }

  const width = header.readUInt32BE(16);
  const height = header.readUInt32BE(20);
  const bitDepth = header[24];
  const colorType = header[25];
  const interlace = header[28];
  const bytesPerPixel = colorType === 6 ? 4 : colorType === 2 ? 3 : 0;

  if (bitDepth !== 8 || !bytesPerPixel || interlace !== 0) {
    throw new Error(`${filePath} uses unsupported PNG encoding: bitDepth=${bitDepth}, colorType=${colorType}, interlace=${interlace}`);
  }

  const idatChunks = [];
  let offset = 8;
  while (offset < file.length) {
    const length = file.readUInt32BE(offset);
    const type = file.toString("ascii", offset + 4, offset + 8);
    if (type === "IDAT") idatChunks.push(file.subarray(offset + 8, offset + 8 + length));
    offset += length + 12;
  }

  const raw = inflateSync(Buffer.concat(idatChunks));
  const stride = width * bytesPerPixel;
  let rawOffset = 0;
  let previous = null;
  let luminanceSum = 0;
  let luminanceSquareSum = 0;
  let sampled = 0;
  let whitePixels = 0;
  let nearWhitePixels = 0;
  let darkPixels = 0;
  const colorBuckets = new Set();

  for (let y = 0; y < height; y += 1) {
    const filter = raw[rawOffset];
    rawOffset += 1;
    const row = unfilterPngRow(filter, raw.subarray(rawOffset, rawOffset + stride), previous, bytesPerPixel);
    rawOffset += stride;
    previous = row;

    for (let x = 0; x < width; x += 7) {
      const pixel = x * bytesPerPixel;
      const red = row[pixel];
      const green = row[pixel + 1];
      const blue = row[pixel + 2];
      const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
      luminanceSum += luminance;
      luminanceSquareSum += luminance * luminance;
      sampled += 1;
      if (red > 245 && green > 245 && blue > 245) whitePixels += 1;
      if (red > 230 && green > 230 && blue > 230) nearWhitePixels += 1;
      if (luminance < 55) darkPixels += 1;
      colorBuckets.add(((red >> 4) << 8) | ((green >> 4) << 4) | (blue >> 4));
    }
  }

  const luminanceMean = luminanceSum / sampled;
  const luminanceStdDev = Math.sqrt(luminanceSquareSum / sampled - luminanceMean * luminanceMean);

  return {
    width,
    height,
    fileSize: file.length,
    hash: createHash("sha256").update(file).digest("hex"),
    luminanceMean,
    luminanceStdDev,
    whiteRatio: whitePixels / sampled,
    nearWhiteRatio: nearWhitePixels / sampled,
    darkRatio: darkPixels / sampled,
    colorBucketCount: colorBuckets.size,
  };
}

async function fetchOk(url, label) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${label} returned ${response.status}: ${url}`);
  }
  return response;
}

const averagePrice = products.reduce((sum, product) => sum + product.price, 0) / products.length;
const missingPngs = products.filter(
  (product) => !existsSync(join(root, "public", "products", `${product.slug}.png`)),
);
const missingWebps = products.filter(
  (product) => !existsSync(join(root, "public", "products", `${product.slug}.webp`)),
);
const duplicateShortDescriptions = [...products.reduce((counts, product) => {
  counts.set(product.shortDescription, (counts.get(product.shortDescription) ?? 0) + 1);
  return counts;
}, new Map())]
  .filter(([, count]) => count > 1)
  .map(([description, count]) => `${count}x ${description}`);
const repeatedFeatures = [...products.reduce((counts, product) => {
  for (const feature of product.features ?? []) {
    if (/^(covered by|ships as|ships with)\b/i.test(feature)) continue;
    counts.set(feature, (counts.get(feature) ?? 0) + 1);
  }
  return counts;
}, new Map())]
  .filter(([, count]) => count > 3)
  .map(([feature, count]) => `${count}x ${feature}`);
const repeatedDescriptionSentences = [
  ...products.reduce((counts, product) => {
    for (const sentence of product.description.split(/(?<=\.)\s+/).map((item) => item.trim())) {
      if (sentence.length < 24) continue;
      if (/^(uses|ships with|should be|keeps|covers|adds|gives)\b/i.test(sentence)) continue;
      counts.set(sentence, (counts.get(sentence) ?? 0) + 1);
    }
    return counts;
  }, new Map()),
]
  .filter(([, count]) => count > 2)
  .map(([sentence, count]) => `${count}x ${sentence}`);
const repeatedDescriptionOpeners = products.flatMap((product) => {
  const sentences = product.description.split(/(?<=\.)\s+/).map((item) => item.trim()).filter(Boolean);
  const issues = [];

  for (let index = 1; index < sentences.length; index += 1) {
    const previousOpener = sentences[index - 1].match(/^For ([^,]+),/i)?.[1]?.toLowerCase();
    const currentOpener = sentences[index].match(/^For ([^,]+),/i)?.[1]?.toLowerCase();
    if (previousOpener && currentOpener && previousOpener === currentOpener) {
      issues.push(`${product.sku} ${product.slug}: repeated opener "${previousOpener}"`);
    }
  }

  return issues;
});
const imageStats = products
  .filter((product) => existsSync(join(root, "public", "products", `${product.slug}.png`)))
  .map((product) => ({
    product,
    stats: pngStats(join(root, "public", "products", `${product.slug}.png`)),
  }));
const inconsistentPngs = imageStats.flatMap(({ product, stats }) => {
  if (stats.width !== stats.height || stats.width < 900) {
    return [`${product.slug}: ${stats.width}x${stats.height}`];
  }
  return [];
});
const duplicateImageHashes = [
  ...imageStats.reduce((counts, { product, stats }) => {
    const matches = counts.get(stats.hash) ?? [];
    matches.push(product.slug);
    counts.set(stats.hash, matches);
    return counts;
  }, new Map()),
]
  .filter(([, slugs]) => slugs.length > 1)
  .map(([, slugs]) => slugs.join(", "));
const weakImageQuality = imageStats.flatMap(({ product, stats }) => {
  const issues = [];
  if (stats.fileSize < 250_000) issues.push(`too small file (${stats.fileSize} bytes)`);
  if (stats.luminanceMean > 175) issues.push(`too bright (${stats.luminanceMean.toFixed(1)} mean luminance)`);
  if (stats.luminanceStdDev < 18) issues.push(`low contrast (${stats.luminanceStdDev.toFixed(1)} luminance stddev)`);
  if (stats.nearWhiteRatio > 0.08) issues.push(`white/near-white background (${(stats.nearWhiteRatio * 100).toFixed(1)}%)`);
  if (stats.darkRatio < 0.35) issues.push(`not enough gym-floor darkness (${(stats.darkRatio * 100).toFixed(1)}%)`);
  if (stats.colorBucketCount < 70) issues.push(`low color/detail variety (${stats.colorBucketCount} color buckets)`);
  return issues.length ? [`${product.sku} ${product.slug}: ${issues.join("; ")}`] : [];
});
const flaggedCopy = products.flatMap((product) => {
  const copy = productCopy(product);
  return bannedCopyTerms
    .filter((term) => copy.toLowerCase().includes(term.toLowerCase()))
    .map((term) => `${product.sku} ${product.slug}: ${term}`);
});
const grammarPatterns = [
  {
    label: "double built-with phrase",
    pattern: /built with [^.,;]+ with /i,
  },
  {
    label: "double with phrase",
    pattern: /\b(?:with|uses) [^.,;]+ with /i,
  },
  {
    label: "plural material phrase with singular verb",
    pattern: /\b(?:balls|bristles|collars|discs|handles|heads|plates|straps|tubes|formats|accessories|bands|rungs|cones|tags|rings)\b[^.]{0,70}\bgives this\b/i,
  },
];
const grammarCopyIssues = products.flatMap((product) => {
  const fields = [
    ["shortDescription", product.shortDescription],
    ["description", product.description],
    ...(product.features ?? []).map((feature, index) => [`feature ${index + 1}`, feature]),
  ];

  return fields.flatMap(([field, value]) =>
    grammarPatterns
      .filter(({ pattern }) => pattern.test(value))
      .map(({ label }) => `${product.sku} ${product.slug} ${field}: ${label} -> ${value}`),
  );
});
const careCopyIssues = products.flatMap((product) => {
  if (!/(brush|spray|tag)/i.test(product.name)) return [];
  const copy = productCopy(product);
  const issues = [];
  if (/barbell piece/i.test(copy)) issues.push("care item described as barbell piece");
  if (/adds support to equipment upkeep/i.test(copy)) issues.push("care item described as support gear");
  return issues.map((issue) => `${product.sku} ${product.slug}: ${issue}`);
});
const syntheticReviewFields = products.flatMap((product) =>
  "rating" in product || "reviewCount" in product ? [`${product.sku} ${product.slug}`] : [],
);
const materialMismatchRules = [
  {
    name: /sleeve care spray/i,
    banned: [/bristle/i, /microfiber/i],
    required: [/bottle/i, /formula/i],
  },
  {
    name: /barbell brush/i,
    banned: [/spray/i, /formula/i],
    required: [/bristle/i, /handle/i],
  },
  {
    name: /equipment tag/i,
    banned: [/spray/i, /bristle/i],
    required: [/tag/i, /ring/i],
  },
  {
    name: /ab wheel/i,
    banned: [/ring/i, /cam buckle/i],
    required: [/wheel/i, /handle/i],
  },
  {
    name: /core slider/i,
    banned: [/ring/i, /cam buckle/i],
    required: [/disc/i, /edge/i],
  },
  {
    name: /finger trainer/i,
    banned: [/spring steel/i],
    required: [/silicone/i, /loop/i],
  },
];
const materialMismatches = products.flatMap((product) => {
  const rule = materialMismatchRules.find((item) => item.name.test(product.name));
  if (!rule) return [];

  const material = product.material.toLowerCase();
  const banned = rule.banned.filter((pattern) => pattern.test(material));
  const missing = rule.required.filter((pattern) => !pattern.test(material));
  if (!banned.length && !missing.length) return [];

  return [
    `${product.sku} ${product.slug}: material="${product.material}" banned=${banned.map(String).join(",")} missing=${missing.map(String).join(",")}`,
  ];
});
const missingContents = products.flatMap((product) => {
  const contents = product.specs?.["What ships"];
  if (!contents || contents.length < 12) return [`${product.sku} ${product.slug}: missing What ships spec`];
  return [];
});
const genericContents = products.flatMap((product) => {
  const contents = product.specs?.["What ships"] ?? "";
  const generic = /(coordinated|matched accessories|key pieces|single training item|clear product|\bset set\b)/i.test(contents);
  return generic ? [`${product.sku} ${product.slug}: generic What ships spec -> ${contents}`] : [];
});

if (products.length !== 102) {
  throw new Error(`Expected 102 products, found ${products.length}`);
}

if (averagePrice > 60) {
  throw new Error(`Average item price is above $60: $${averagePrice.toFixed(2)}`);
}

if (missingPngs.length) {
  throw new Error(`Missing PNGs:\n${missingPngs.map((product) => product.slug).join("\n")}`);
}

if (missingWebps.length) {
  throw new Error(`Missing WebP product images:\n${missingWebps.map((product) => product.slug).join("\n")}`);
}

if (duplicateShortDescriptions.length) {
  throw new Error(`Duplicate product-card descriptions:\n${duplicateShortDescriptions.join("\n")}`);
}

if (repeatedFeatures.length) {
  throw new Error(`Feature bullets are too repetitive:\n${repeatedFeatures.join("\n")}`);
}

if (repeatedDescriptionSentences.length) {
  throw new Error(`Product descriptions are too repetitive:\n${repeatedDescriptionSentences.join("\n")}`);
}
if (repeatedDescriptionOpeners.length) {
  throw new Error(`Product descriptions repeat the same opener within one item:\n${repeatedDescriptionOpeners.join("\n")}`);
}

if (inconsistentPngs.length) {
  throw new Error(`Product PNGs must be square and at least 900px:\n${inconsistentPngs.join("\n")}`);
}

if (duplicateImageHashes.length) {
  throw new Error(`Product PNGs must not reuse the exact same asset:\n${duplicateImageHashes.join("\n")}`);
}

if (weakImageQuality.length) {
  throw new Error(`Product PNGs need realistic dark-background product-photo characteristics:\n${weakImageQuality.join("\n")}`);
}

if (flaggedCopy.length) {
  throw new Error(`Flagged product copy:\n${flaggedCopy.join("\n")}`);
}

if (grammarCopyIssues.length) {
  throw new Error(`Product copy grammar issues:\n${grammarCopyIssues.join("\n")}`);
}

if (careCopyIssues.length) {
  throw new Error(`Care product copy issues:\n${careCopyIssues.join("\n")}`);
}

if (syntheticReviewFields.length) {
  throw new Error(`Synthetic review fields should not ship in catalog data:\n${syntheticReviewFields.join("\n")}`);
}

if (materialMismatches.length) {
  throw new Error(`Product materials do not match SKU identity:\n${materialMismatches.join("\n")}`);
}

if (missingContents.length) {
  throw new Error(`Products missing concrete contents:\n${missingContents.join("\n")}`);
}

if (genericContents.length) {
  throw new Error(`Product contents are too generic:\n${genericContents.join("\n")}`);
}

for (const product of products) {
  const pageResponse = await fetchOk(`${baseUrl}/products/${product.slug}`, product.slug);
  const html = await pageResponse.text();
  const encodedName = product.name.replaceAll("&", "&amp;");
  if ((!html.includes(product.name) && !html.includes(encodedName)) || !html.includes(product.sku)) {
    throw new Error(`Product page missing expected content for ${product.slug}`);
  }

  const imageResponse = await fetchOk(`${baseUrl}${product.image}`, `${product.slug} image`);
  const contentType = imageResponse.headers.get("content-type") ?? "";
  if (!contentType.includes("image/png")) {
    throw new Error(`${product.slug} image route did not return PNG. Got: ${contentType}`);
  }

  const webpResponse = await fetch(`${baseUrl}${product.image}`, {
    headers: { Accept: "image/webp,image/*,*/*" },
  });
  if (!webpResponse.ok) {
    throw new Error(`${product.slug} WebP image returned ${webpResponse.status}`);
  }
  const webpContentType = webpResponse.headers.get("content-type") ?? "";
  if (!webpContentType.includes("image/webp")) {
    throw new Error(`${product.slug} image route did not return WebP when accepted. Got: ${webpContentType}`);
  }
}

console.log(
  `Catalog verification passed: ${products.length} SKUs, $${averagePrice.toFixed(
    2,
  )} average item price, ${products.length} PNG/WebP product images, ${products.length} product pages checked.`,
);
