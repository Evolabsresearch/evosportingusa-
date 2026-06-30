import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const observedAt = process.env.PRICING_OBSERVED_AT ?? "2026-05-31";
const catalogPath = join(process.cwd(), "src", "data", "catalog.ts");
const jsonOutPath = join(process.cwd(), "data", "pricing-analysis.json");
const markdownOutPath = join(process.cwd(), "docs", "pricing-analysis.md");

function pricingSource(source) {
  return {
    sourceType: "official brand product/category page",
    verifiedAt: observedAt,
    checkMethod: "Manual public-source spot check against official pages and visible search snippets.",
    ...source,
  };
}

const sources = {
  "rogue-ohio-straps": pricingSource({
    brand: "Rogue Fitness",
    product: "Rogue Ohio Lifting Straps",
    url: "https://www.roguefitness.com/rogue-ohio-lifting-straps",
    observed: "$14.00-$19.00 official Rogue strap anchors; Ohio cotton straps visible at $19.00 and Rogue nylon straps visible at $14.00.",
    notes: "Basic straight-strap anchor used for cotton straps and bundle component value; EVO figure-8 straps still price above this because they use more webbing and reinforcement.",
  }),
  "rogue-wrist-wraps": pricingSource({
    brand: "Rogue Fitness",
    product: "Rogue Wrist Wraps",
    url: "https://www.roguefitness.com/rogue-wrist-wraps",
    observed: "$15.00",
    notes: "Entry wrist wrap anchor.",
  }),
  "rogue-knee-support": pricingSource({
    brand: "Rogue Fitness",
    product: "Knee sleeves and support category",
    url: "https://www.roguefitness.com/lifting-straps-wraps/protection-supports/knee-sleeves",
    observed: "$14.00-$97.00 visible category range; Rogue sleeve pairs shown at $45.00-$80.00",
    notes: "Broad support category anchor; EVO sleeve pairs are positioned against the midrange pair prices, not the cheapest single/item listings.",
  }),
  "rogue-gym-chalk": pricingSource({
    brand: "Rogue Fitness",
    product: "Rogue Gym Chalk",
    url: "https://www.roguefitness.com/rogue-gym-chalk",
    observed: "$16.00",
    notes: "Magnesium carbonate chalk anchor.",
  }),
  "rogue-liquid-chalk": pricingSource({
    brand: "Rogue Fitness",
    product: "Spider Chalk Liquid Chalk",
    url: "https://www.roguefitness.com/spider-chalk-liquid-chalk",
    observed: "$12.95-$22.95",
    notes: "Liquid chalk anchor range.",
  }),
  "rep-hex-dumbbells": pricingSource({
    brand: "REP Fitness",
    product: "Rubber Hex Dumbbell Pairs",
    url: "https://repfitness.com/products/rubber-hex-dumbbell-pairs",
    observed: "10 lb $54.99, 15 lb $74.99, 20 lb $94.99, 25 lb $129.99, 30 lb $149.99, 35 lb $164.99, 40 lb $179.99, 45 lb $194.99",
    notes: "Primary rubber hex pair benchmark from official pair option pricing.",
  }),
  "rogue-echo-bumpers": pricingSource({
    brand: "Rogue Fitness",
    product: "Rogue Echo Bumper Plates",
    url: "https://www.roguefitness.com/rogue-echo-bumper-plates.php",
    observed: "10 lb pair $48.00, 15 lb pair $69.00, 25 lb pair $100.00, 35 lb pair $132.00, 45 lb pair $174.00",
    notes: "Olympic bumper plate pair benchmark.",
  }),
  "rogue-ohio-bar": pricingSource({
    brand: "Rogue Fitness",
    product: "The Ohio Bar - Cerakote",
    url: "https://www.roguefitness.com/the-ohio-bar-cerakote",
    observed: "$365.00",
    notes: "Premium 20 kg barbell anchor.",
  }),
  "rogue-aluminum-collars": pricingSource({
    brand: "Rogue Fitness",
    product: "Rogue USA Aluminum Collars",
    url: "https://www.roguefitness.com/rogue-usa-aluminum-collars",
    observed: "$45.00",
    notes: "Aluminum collar pair anchor.",
  }),
  "rep-ab-3100": pricingSource({
    brand: "REP Fitness",
    product: "AB-3100 Adjustable Weight Bench",
    url: "https://repfitness.com/products/ab-3100-adjustable-weight-bench?variant=41067587698846",
    observed: "$269.99",
    notes: "Adjustable bench anchor.",
  }),
  "rogue-monster-bands": pricingSource({
    brand: "Rogue Fitness",
    product: "Rogue Monster Bands",
    url: "https://www.roguefitness.com/rogue-monster-bands",
    observed: "single bands $17.00-$65.00, #0 pair $18.00, pull-up packages $71.00-$75.00",
    notes: "Latex mobility and pull-up band anchor range from visible official options.",
  }),
  "rogue-ab-wheel": pricingSource({
    brand: "Rogue Fitness",
    product: "Rogue Ab Wheel",
    url: "https://www.roguefitness.com/rogue-ab-wheel",
    observed: "$90.00",
    notes: "Premium ab wheel anchor.",
  }),
  "titan-pullup-bar": pricingSource({
    brand: "Titan Fitness",
    product: "Ceiling & Wall-Mounted Pull-Up Bar",
    url: "https://titan.fitness/products/wall-mounted-pull-up-bar",
    observed: "$84.97 sale price, $104.99 compare-at",
    notes: "Steel wall/ceiling pull-up bar anchor with visible sale and compare-at price.",
  }),
  "rogue-speed-rope": pricingSource({
    brand: "Rogue Fitness",
    product: "Rogue SR-2 Speed Rope 3.0",
    url: "https://www.roguefitness.com/rogue-sr-2-speed-rope-3-0",
    observed: "$49.00",
    notes: "Premium bearing speed rope anchor.",
  }),
  "rogue-licorice-rope": pricingSource({
    brand: "Rogue Fitness",
    product: "Rogue Licorice Jump Ropes",
    url: "https://www.roguefitness.com/rogue-licorice-jump-ropes",
    observed: "$9.00 single rope; $79.00 10-pack",
    notes: "Entry jump rope anchor from official single-size options.",
  }),
  "rogue-lacrosse-balls": pricingSource({
    brand: "Rogue Fitness",
    product: "Rogue Lacrosse Balls",
    url: "https://www.roguefitness.com/rogue-lacrosse-balls",
    observed: "$7.00 single, $27.50 5-pack, $50.00 10-pack",
    notes: "Small mobility tool anchor from official single and pack options.",
  }),
  "rogue-cannonball-grips": pricingSource({
    brand: "Rogue Fitness",
    product: "Rogue Cannonball Grips",
    url: "https://www.roguefitness.com/cannonball-grips",
    observed: "$37.00 strap/carabiner accessory set, $58.00 grip pair, $80.00 grip system",
    notes: "Grip training accessory anchor range from official Cannonball options.",
  }),
};

const repHexPairPrices = new Map([
  [10, 54.99],
  [15, 74.99],
  [20, 94.99],
  [25, 129.99],
  [30, 149.99],
  [35, 164.99],
  [40, 179.99],
  [45, 194.99],
]);

const rogueBumperPairPrices = new Map([
  [10, 48],
  [15, 69],
  [25, 100],
  [35, 132],
  [45, 174],
]);

function money(value) {
  return `$${Number(value).toFixed(2)}`;
}

function percent(value) {
  return `${Number(value).toFixed(1)}%`;
}

function parseCatalogProducts(source) {
  const match = source.match(/export const products = ([\s\S]*?)\] satisfies Product\[\];/);
  if (!match) throw new Error("Could not locate products array in catalog.ts");
  return JSON.parse(`${match[1]}]`);
}

function firstWeight(name) {
  const match = name.match(/(\d+(?:\.\d+)?) lb/i);
  return match ? Number(match[1]) : null;
}

function makeProfile(product) {
  const name = product.name.toLowerCase();

  if (name.includes("training bundle")) return bundleProfile(product);

  if (name.includes("rubber hex dumbbell")) {
    const weight = firstWeight(product.name);
    const anchor = repHexPairPrices.get(weight) ?? 99.99;
    return profile({
      family: "rubber hex dumbbell pair",
      low: anchor * 0.75,
      high: anchor,
      anchor,
      sourceIds: ["rep-hex-dumbbells"],
      logic: `${weight} lb pair benchmarked against REP's same-weight pair; EVO should sit 15-25% under a national specialty brand.`,
    });
  }

  if (name.includes("olympic bumper plate")) {
    const weight = firstWeight(product.name);
    const anchor = rogueBumperPairPrices.get(weight) ?? 100;
    return profile({
      family: "olympic bumper plate pair",
      low: anchor * 0.9,
      high: anchor * 1.03,
      anchor,
      sourceIds: ["rogue-echo-bumpers"],
      logic: `${weight} lb bumper pair benchmarked against Rogue Echo pair pricing; private-label EVO should be at or slightly under Rogue.`,
    });
  }

  if (name.includes("training bar")) {
    return profile({
      family: "barbell",
      low: 199,
      high: 365,
      anchor: 365,
      sourceIds: ["rogue-ohio-bar"],
      logic: "45 lb training bar positioned below Rogue's premium Ohio Bar while still high enough for freight and steel margin.",
    });
  }

  if (name.includes("olympic bar collar")) {
    if (name.includes("spring")) {
      return profile({
        family: "spring collar pair",
        low: 15,
        high: 25,
        anchor: 24.95,
        sourceIds: ["rogue-aluminum-collars"],
        logic: "Spring collars should price well below aluminum lock collars but still above disposable commodity sets.",
      });
    }
    if (name.includes("aluminum")) {
      return profile({
        family: "aluminum collar pair",
        low: 39,
        high: 49,
        anchor: 45,
        sourceIds: ["rogue-aluminum-collars"],
        logic: "Aluminum collar pair tracks Rogue's $45 anchor closely.",
      });
    }
    return profile({
      family: "quick-lock collar pair",
      low: 29,
      high: 39,
      anchor: 34.95,
      sourceIds: ["rogue-aluminum-collars"],
      logic: "Polymer quick-lock collars should sit between spring collars and machined aluminum collars.",
    });
  }

  if (name.includes("adjustable training bench")) {
    return profile({
      family: "adjustable bench",
      low: 219,
      high: 269.99,
      anchor: 269.99,
      sourceIds: ["rep-ab-3100"],
      logic: "Adjustable bench positioned under REP AB-3100 while staying above low-end marketplace benches.",
    });
  }

  if (name.includes("wrist wrap")) {
    return profile({
      family: "wrist wrap pair",
      low: 15,
      high: 40,
      anchor: 15,
      sourceIds: ["rogue-wrist-wraps"],
      logic: "Short wraps can sit near entry brand pricing; longer/pro wraps earn higher price through length and stiffness.",
    });
  }

  if (name.includes("back support belt") || name.includes("lifting belt")) {
    return profile({
      family: "lifting support belt",
      low: 34,
      high: 75,
      anchor: 50,
      sourceIds: ["rogue-knee-support"],
      logic: "Support belt pricing is set inside the broader brace/sleeve support accessory band.",
    });
  }

  if (name.includes("knee sleeve") || name.includes("elbow sleeve")) {
    return profile({
      family: "compression sleeve pair",
      low: 34,
      high: 97,
      anchor: 60,
      sourceIds: ["rogue-knee-support"],
      logic: "Sleeve pairs should range from light support to premium compression without exceeding specialty-brand upper tiers.",
    });
  }

  if (name.includes("cotton lifting strap")) {
    return profile({
      family: "cotton lifting strap pair",
      low: 14,
      high: 35,
      anchor: 19,
      sourceIds: ["rogue-ohio-straps"],
      logic: "Basic straight straps are anchored by Rogue's current $14-$19 official range; longer and padded EVO variants can carry a modest premium.",
    });
  }

  if (name.includes("figure-8")) {
    return profile({
      family: "figure-8 deadlift strap pair",
      low: 24,
      high: 40,
      anchor: 30,
      sourceIds: ["rogue-ohio-straps"],
      logic: "Figure-8 straps use more webbing and reinforcement than straight cotton straps, so they sit above the $15 basic strap anchor.",
    });
  }

  if (name.includes("lifting hook")) {
    return profile({
      family: "lifting hook pair",
      low: 35,
      high: 60,
      anchor: 45,
      sourceIds: ["rogue-cannonball-grips"],
      logic: "Steel hook accessories should sit in the mid accessory band because hardware and padding raise cost.",
    });
  }

  if (name.includes("palm grip") || name.includes("pull-up hand grip")) {
    return profile({
      family: "grip pad or pull-up grip pair",
      low: 20,
      high: 45,
      anchor: 30,
      sourceIds: ["rogue-cannonball-grips"],
      logic: "Grip aids stay below premium grip tools while pricing above basic chalk.",
    });
  }

  if (name.includes("chalk")) {
    const liquid = name.includes("liquid");
    return profile({
      family: liquid ? "liquid chalk" : "dry chalk system",
      low: liquid ? 12.95 : 16,
      high: liquid ? 22.95 : 25,
      anchor: liquid ? 22.95 : 16,
      sourceIds: liquid ? ["rogue-liquid-chalk"] : ["rogue-gym-chalk"],
      logic: "Chalk SKUs are kept in the impulse/accessory band and benchmarked against Rogue's chalk anchors.",
    });
  }

  if (name.includes("resistance band") || name.includes("hip circle")) {
    return profile({
      family: "resistance band system",
      low: 17,
      high: 75,
      anchor: 34,
      sourceIds: ["rogue-monster-bands"],
      logic: "Band systems map to Rogue's mobility band range, with kits priced by band count and included anchors.",
    });
  }

  if (name.includes("foam roller")) {
    return profile({
      family: "foam roller",
      low: 25,
      high: 45,
      anchor: 34,
      sourceIds: ["rogue-lacrosse-balls"],
      logic: "Foam roller pricing is set above small ball tools and inside the common compact recovery accessory range.",
    });
  }

  if (name.includes("lacrosse ball")) {
    return profile({
      family: "lacrosse ball set",
      low: 7,
      high: 20,
      anchor: 7,
      sourceIds: ["rogue-lacrosse-balls"],
      logic: "Ball set can price above a single Rogue ball because it is packaged as a pair or small kit.",
    });
  }

  if (name.includes("stretch strap") || name.includes("core slider")) {
    return profile({
      family: "small mobility tool",
      low: 15,
      high: 30,
      anchor: 20,
      sourceIds: ["rogue-lacrosse-balls"],
      logic: "Small mobility tools stay in the low-friction add-on band.",
    });
  }

  if (name.includes("ab wheel")) {
    return profile({
      family: "ab wheel",
      low: 25,
      high: 90,
      anchor: 90,
      sourceIds: ["rogue-ab-wheel"],
      logic: "EVO prices below Rogue's premium steel ab wheel while staying above entry plastic wheels.",
    });
  }

  if (name.includes("jump rope")) {
    return profile({
      family: "jump rope",
      low: 9,
      high: 49,
      anchor: name.includes("speed") ? 49 : 24,
      sourceIds: ["rogue-speed-rope", "rogue-licorice-rope"],
      logic: "Jump rope prices span entry PVC to bearing speed rope anchors.",
    });
  }

  if (name.includes("agility kit")) {
    return profile({
      family: "agility kit",
      low: 19,
      high: 40,
      anchor: 29,
      sourceIds: ["rogue-licorice-rope"],
      logic: "Light conditioning kits should stay in the same add-on band as entry conditioning tools.",
    });
  }

  if (name.includes("hand strength")) {
    return profile({
      family: "hand strength tool",
      low: 20,
      high: 45,
      anchor: 30,
      sourceIds: ["rogue-cannonball-grips"],
      logic: "Grip strength tools sit below heavy grip attachments but above basic mobility add-ons.",
    });
  }

  if (name.includes("equipment care") || name.includes("hot-cold")) {
    return profile({
      family: "care and recovery add-on",
      low: 15,
      high: 35,
      anchor: 20,
      sourceIds: ["rogue-gym-chalk", "rogue-lacrosse-balls"],
      logic: "Care and recovery items are priced as useful low-friction add-ons without relying on a shipping minimum.",
    });
  }

  if (name.includes("j-hook") || name.includes("flooring") || name.includes("platform") || name.includes("calf block")) {
    return profile({
      family: "steel or platform accessory",
      low: 59,
      high: 100,
      anchor: 84.97,
      sourceIds: ["titan-pullup-bar"],
      logic: "Steel/platform accessories are benchmarked against nearby Titan steel accessory pricing.",
    });
  }

  return profile({
    family: "general accessory",
    low: 19,
    high: 75,
    anchor: 39,
    sourceIds: ["rogue-ohio-straps", "rogue-monster-bands"],
    logic: "Fallback accessory band used only for SKUs without a closer specialty benchmark.",
  });
}

function bundleProfile(product) {
  const name = product.name.toLowerCase();
  if (name.includes("grip starter")) {
    return profile({
      family: "grip starter bundle",
      low: 65,
      high: 105,
      anchor: 90,
      sourceIds: ["rogue-ohio-straps", "rogue-wrist-wraps", "rogue-gym-chalk"],
      logic: "Bundle stacks straps, wraps, chalk, and grip pads while discounting below separate-piece value.",
    });
  }
  if (name.includes("pull-up builder")) {
    return profile({
      family: "pull-up builder bundle",
      low: 119,
      high: 165,
      anchor: 154.87,
      sourceIds: ["titan-pullup-bar", "rogue-monster-bands", "rogue-cannonball-grips"],
      logic: "Bundle anchors to a pull-up bar plus bands and hand grips, with a visible discount against separate-piece value.",
    });
  }
  if (name.includes("deadlift support")) {
    return profile({
      family: "deadlift support bundle",
      low: 135,
      high: 170,
      anchor: 154.8,
      sourceIds: ["rogue-ohio-straps", "rogue-wrist-wraps", "rogue-aluminum-collars"],
      logic: "Bundle value is belt, figure-8 straps, wrist wraps, and collars, with price near component value.",
    });
  }
  if (name.includes("home strength")) {
    return profile({
      family: "home strength bundle",
      low: 219,
      high: 279,
      anchor: 249,
      sourceIds: ["rep-hex-dumbbells", "rogue-monster-bands", "rogue-ohio-straps"],
      logic: "Bundle combines weights, bands, and strap accessories with a visible discount against separate pieces.",
    });
  }
  return profile({
    family: "bench starter bundle",
    low: 269,
    high: 329,
    anchor: 299,
    sourceIds: ["rep-ab-3100", "rogue-aluminum-collars", "rogue-wrist-wraps"],
    logic: "Bundle should sit just above a standalone adjustable bench because it adds starter accessories.",
  });
}

function profile({ family, low, high, anchor, sourceIds, logic }) {
  return {
    family,
    competitorLow: Number(low.toFixed(2)),
    competitorHigh: Number(high.toFixed(2)),
    anchorPrice: Number(anchor.toFixed(2)),
    sourceIds,
    logic,
  };
}

function assess(product, productProfile) {
  const price = product.price;
  const { competitorLow, competitorHigh, anchorPrice } = productProfile;
  const deltaToAnchor = ((price - anchorPrice) / anchorPrice) * 100;
  const status =
    price < competitorLow * 0.9
      ? "below-band-review-margin"
      : price > competitorHigh * 1.1
        ? "above-band-review-price"
        : "keep";
  const recommendation =
    status === "keep"
      ? "Keep price"
      : status === "below-band-review-margin"
        ? "Keep only if landed cost and freight margin are confirmed"
        : "Review price or add visible value";

  return {
    sku: product.sku,
    slug: product.slug,
    name: product.name,
    category: product.category,
    evoPrice: product.price,
    marketBand: {
      low: competitorLow,
      high: competitorHigh,
      anchor: anchorPrice,
    },
    deltaToAnchorPercent: Number(deltaToAnchor.toFixed(1)),
    status,
    recommendation,
    benchmarkFamily: productProfile.family,
    sourceIds: productProfile.sourceIds,
    rationale: productProfile.logic,
  };
}

function summarize(products, analyses) {
  const averagePrice = products.reduce((sum, product) => sum + product.price, 0) / products.length;
  const reviewCount = analyses.filter((item) => item.status !== "keep").length;
  const categoryCounts = products.reduce((counts, product) => {
    counts[product.category] = (counts[product.category] ?? 0) + 1;
    return counts;
  }, {});

  return {
    observedAt,
    skuCount: products.length,
    averagePrice: Number(averagePrice.toFixed(2)),
    underSixtyAverage: averagePrice <= 60,
    reviewCount,
    categoryCounts,
  };
}

function markdownTable(rows) {
  const header = "| SKU | Product | EVO | Market band | Delta | Decision |\n| --- | --- | ---: | ---: | ---: | --- |";
  const body = rows
    .map(
      (item) =>
        `| ${item.sku} | ${item.name} | ${money(item.evoPrice)} | ${money(item.marketBand.low)}-${money(item.marketBand.high)} | ${percent(item.deltaToAnchorPercent)} | ${item.recommendation} |`,
    )
    .join("\n");
  return `${header}\n${body}`;
}

function sourceMarkdown() {
  return Object.entries(sources)
    .map(
      ([id, source]) => {
        const observed = source.observed.replace(/[.。]\s*$/, "");
        return `- ${id}: ${source.brand}, ${source.product}, observed ${observed}; verified ${source.verifiedAt}. ${source.url} Notes: ${source.notes}`;
      },
    )
    .join("\n");
}

async function main() {
  const catalogSource = await readFile(catalogPath, "utf8");
  const products = parseCatalogProducts(catalogSource);
  const analyses = products.map((product) => assess(product, makeProfile(product)));
  const summary = summarize(products, analyses);

  const report = {
    summary,
    sources,
    products: analyses,
  };

  await mkdir(dirname(jsonOutPath), { recursive: true });
  await mkdir(dirname(markdownOutPath), { recursive: true });
  await writeFile(jsonOutPath, `${JSON.stringify(report, null, 2)}\n`);
  await writeFile(
    markdownOutPath,
    [
      "# EVO Sporting USA Pricing Analysis",
      "",
      `Observed competitor pricing date: ${observedAt}`,
      "",
      `Catalog: ${summary.skuCount} SKUs, average single-SKU price ${money(summary.averagePrice)}. Under-$60 item-average target: ${summary.underSixtyAverage ? "pass" : "review"}.`,
      "",
      `Pricing review flags: ${summary.reviewCount}.`,
      "",
      "## Source Controls",
      "",
      `Competitor sources: ${Object.keys(sources).length} official brand sources across ${new Set(Object.values(sources).map((source) => source.brand)).size} brands.`,
      "",
      "Each source in the JSON artifact includes `sourceType`, `verifiedAt`, `checkMethod`, observed price text, notes, and URL.",
      "",
      "## SKU Matrix",
      "",
      markdownTable(analyses),
      "",
      "## Sources",
      "",
      sourceMarkdown(),
      "",
      "## Notes",
      "",
      "- This is an internal pricing control artifact, not customer copy.",
      "- Source observations are current-source spot checks, not a promise that competitor prices will remain unchanged after the observed date.",
      "- Public product pages should express value through materials, use case, warranty, and shipping clarity instead of explaining internal price logic.",
      "- Bundle pricing is benchmarked against visible component value so carts can reach the $125-$175 range without making single-SKU prices feel inflated.",
      "",
    ].join("\n"),
  );

  console.log(`Pricing analysis written to ${jsonOutPath}`);
  console.log(`Markdown report written to ${markdownOutPath}`);
  console.log(`${summary.skuCount} SKUs, average ${money(summary.averagePrice)}, ${summary.reviewCount} review flags.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
