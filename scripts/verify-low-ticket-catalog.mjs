import { readFile } from "node:fs/promises";
import { join } from "node:path";

const catalogPath = join(process.cwd(), "src", "data", "catalog.ts");
const catalogSource = await readFile(catalogPath, "utf8");
const categoryMatch = catalogSource.match(/export const categories = ([\s\S]*?)\] satisfies Category\[\];/);
const productMatch = catalogSource.match(/export const products = ([\s\S]*?)\] satisfies Product\[\];/);

if (!categoryMatch || !productMatch) {
  throw new Error("Could not parse catalog data from src/data/catalog.ts");
}

const categories = JSON.parse(`${categoryMatch[1]}]`);
const products = JSON.parse(`${productMatch[1]}]`);
const requiredCategorySlugs = ["chalk-grip-basics", "gym-bag-essentials", "setup-mobility-minis"];
const newProducts = products.filter((product) => Number(product.sku.replace("AXS-", "")) >= 73);
const newAverage = newProducts.reduce((sum, product) => sum + product.price, 0) / newProducts.length;
const failures = [];

if (newProducts.length !== 30) {
  failures.push(`Expected 30 new low-ticket SKUs at AXS-0073 and above, found ${newProducts.length}.`);
}

for (const slug of requiredCategorySlugs) {
  const category = categories.find((item) => item.slug === slug);
  if (!category) {
    failures.push(`Missing low-ticket category ${slug}.`);
    continue;
  }

  const count = products.filter((product) => product.categorySlug === slug).length;
  if (count !== 10 || category.productCount !== 10) {
    failures.push(`${slug} should have 10 products and productCount 10, found products=${count}, productCount=${category.productCount}.`);
  }
}

for (const product of newProducts) {
  if (product.price < 1 || product.price > 30) {
    failures.push(`${product.sku} ${product.slug} price ${product.price} is outside $1-$30.`);
  }

  const copy = [
    product.name,
    product.shortDescription,
    product.description,
    ...(product.features ?? []),
    ...Object.values(product.specs ?? {}),
  ].join(" ");

  if (/(supplement|CBD|cannabis|hemp|tobacco|nicotine|medical|pain relief|treats|cures|diagnose|weapon|knife|pepper spray|brand-name|designer)/i.test(copy)) {
    failures.push(`${product.sku} ${product.slug} includes restricted-risk copy.`);
  }

  if (!product.specs?.["What ships"] || product.specs["What ships"].length < 12) {
    failures.push(`${product.sku} ${product.slug} needs concrete contents.`);
  }
}

if (newAverage < 13 || newAverage > 14) {
  failures.push(`New low-ticket SKU average should be $13-$14, found $${Number.isFinite(newAverage) ? newAverage.toFixed(2) : "NaN"}.`);
}

if (failures.length) {
  throw new Error(`Low-ticket catalog verification failed:\n${failures.join("\n")}`);
}

console.log(`Low-ticket catalog verification passed: ${newProducts.length} SKUs, $${newAverage.toFixed(2)} average, ${requiredCategorySlugs.length} categories.`);
