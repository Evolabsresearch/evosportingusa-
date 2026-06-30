import type { Product } from "@/data/catalog";

export function productLabel(product: Product) {
  return product.name.replace(/^EVO\s+/, "");
}

function lowerFirst(value: string) {
  return value ? value.charAt(0).toLowerCase() + value.slice(1) : value;
}

function upperFirst(value: string) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}

export function displaySpecValue(value: string) {
  return displayChipLabel(value);
}

export function displayChipLabel(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (/^(and|or|the|for|with|in|on|by|to|of)$/i.test(word)) return word.toLowerCase();
      return word
        .split("-")
        .map((part) => {
          if (/^[A-Z0-9]+$/.test(part)) return part;
          if (/^\d/.test(part)) return upperFirst(part.toLowerCase());
          return upperFirst(part.toLowerCase());
        })
        .join("-");
    })
    .join(" ");
}

function trimWords(value: string, maxWords: number) {
  const words = value.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return value;
  return `${words.slice(0, maxWords).join(" ")}...`;
}

function firstSentence(value: string) {
  return value.split(/(?<=\.)\s+/)[0]?.trim() ?? value;
}

function removeLeadingLabel(value: string, product: Product) {
  const label = productLabel(product).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return value.replace(new RegExp(`^${label}\\s+`, "i"), "").trim();
}

export function trainingRole(product: Product) {
  return product.specs["Training role"] ?? product.category.toLowerCase();
}

export function includedSummary(product: Product) {
  const contents = product.specs["What ships"] ?? productLabel(product);
  const normalized = contents.replace(/^One\s+/i, "").replace(/^Matched\s+/i, "").trim();
  const genericPair = /^(compression sleeve pair|wrist wrap pair|lifting strap pair|hand grip pair|rubber hex dumbbell pair|bumper plate pair|olympic bar collar pair)$/i;
  if (genericPair.test(normalized)) return trimWords(productLabel(product), 8);
  return trimWords(normalized, 10);
}

export function materialSummary(product: Product) {
  if (product.categorySlug === "bundles") return trimWords(product.material, 12);
  if (/bundle components/i.test(product.material)) {
    return includedSummary(product);
  }
  return trimWords(product.material, 9);
}

export function equipmentType(product: Product) {
  const name = product.name.toLowerCase();
  if (product.categorySlug === "bundles" || name.includes("bundle")) return "Training Bundle";
  if (name.includes("dumbbell") || name.includes("plate")) return "Load Builder";
  if (name.includes("bar collar") || name.includes("collar")) return "Bar Lockup";
  if (name.includes("bar") || name.includes("bench") || name.includes("rack")) return "Room Anchor";
  if (name.includes("belt") || name.includes("sleeve") || name.includes("wrap")) return "Support Gear";
  if (name.includes("strap") || name.includes("grip") || name.includes("chalk")) return "Grip Gear";
  if (name.includes("brush") || name.includes("spray") || name.includes("tag") || name.includes("pack")) return "Care Tool";
  if (name.includes("set")) return "Training Set";
  if (name.includes("kit") || name.includes("system")) return "Ready Kit";
  if (name.includes("pair")) return "Matched Pair";
  return "Single Item";
}

export const setupType = equipmentType;

export function productCardDescription(product: Product) {
  const specificSentence = removeLeadingLabel(firstSentence(product.description), product);
  if (specificSentence.length > 24) {
    const trimmed = trimWords(specificSentence, 22);
    if (/^is\b/i.test(trimmed)) return upperFirst(trimmed.replace(/^is\b/i, "This is"));
    if (/^are\b/i.test(trimmed)) return upperFirst(trimmed.replace(/^are\b/i, "These are"));
    return upperFirst(trimmed);
  }

  const role = lowerFirst(trainingRole(product));
  const material = materialSummary(product);
  const contents = lowerFirst(includedSummary(product));

  if (product.categorySlug === "bundles") {
    return `Gear for ${role}. Includes ${contents}.`;
  }

  if (/dumbbell|plate|bar|bench|rack/i.test(product.name)) {
    return `Built for ${role} with ${lowerFirst(material)}.`;
  }

  if (/chalk|brush|spray|tag/i.test(product.name)) {
    return `Keeps ${role} simple with ${lowerFirst(material)}.`;
  }

  return `For ${role}, using ${lowerFirst(material)}.`;
}

function storageCue(product: Product) {
  const name = product.name.toLowerCase();

  if (name.includes("grip starter")) return "Keep the small grip pieces in one pull-day drawer.";
  if (name.includes("pull-up builder")) return "Keep the bar, band, and grips near the doorway or rack.";
  if (name.includes("deadlift support")) return "Return the belt, straps, wraps, and collars to the pull shelf.";
  if (name.includes("home strength")) return "Keep the bands and straps with the compact loading station.";
  if (name.includes("bench starter")) return "Plan one landing spot for the bench, stand, plates, and collars.";
  if (name.includes("bundle")) return "Keep the set near the station it serves.";
  if (name.includes("bench") || name.includes("rack")) return "Measure floor and wall clearance.";
  if (name.includes("bar") || name.includes("plate")) return "Keep sleeve space and storage in mind.";
  if (name.includes("dumbbell")) return "Match the next useful weight jump.";
  if (name.includes("chalk")) return "Keep it closed and dry between sets.";
  if (name.includes("brush") || name.includes("spray") || name.includes("tag")) return "Keep it near the rack or shelf.";
  if (name.includes("sleeve") || name.includes("wrap")) return "Air it out before it goes back in the drawer.";
  if (name.includes("strap") || name.includes("grip")) return "Keep it close to the pull-day shelf.";
  if (name.includes("band") || name.includes("roller") || name.includes("mobility")) return "Keep it where warmups happen.";
  return "Store it near the station it serves.";
}

export function productValueHighlights(product: Product) {
  return [
    {
      label: "Best For",
      value: displaySpecValue(trainingRole(product)),
    },
    {
      label: "Includes",
      value: displaySpecValue(includedSummary(product)),
    },
    {
      label: "Materials",
      value: displaySpecValue(materialSummary(product)),
    },
    {
      label: "Storage",
      value: storageCue(product),
    },
  ];
}

export function productValueBullets(product: Product) {
  const role = trainingRole(product);
  const contents = includedSummary(product);
  const material = materialSummary(product);
  const isBundle = product.categorySlug === "bundles";

  if (isBundle) {
    return [
      `Built around ${role}.`,
      `Covers ${contents}.`,
      "Keeps the main pieces on one shelf.",
      storageCue(product),
    ];
  }

  return [
    `For ${role}.`,
    `Ships with ${contents}.`,
    `Uses ${lowerFirst(material)}.`,
    storageCue(product),
  ];
}

export function productPageStory(product: Product) {
  const label = productLabel(product);
  const role = trainingRole(product);
  const contents = lowerFirst(includedSummary(product));
  const material = lowerFirst(materialSummary(product));

  if (product.categorySlug === "bundles") {
    return `${label} puts ${contents} on the same shelf for ${role}. The set is easier to use when the pieces live by the station they serve.`;
  }

  if (/dumbbell|plate|bar|bench|rack/i.test(product.name)) {
    return `${label} is for ${role}, built with ${material}. Check load, footprint, and handling before it joins the room.`;
  }

  if (/chalk|brush|spray|tag|pack|roller|recovery/i.test(product.name)) {
    return `${label} is for ${role}, built with ${material}. It belongs where cleanup, warmups, or reset work actually happen.`;
  }

  return `${label} is for ${role}, built with ${material}. Match the size, feel, and storage spot before it earns shelf space.`;
}
