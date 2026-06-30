// Converts public/products/*.png to optimized .webp for web delivery.
// Original 1200x1200 PNGs (~2.5MB each) -> ~900px WebP (~50-90KB each).
// The /product-images/[slug] route already prefers .webp, so no catalog
// changes are needed.
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const dir = join(process.cwd(), "public", "products");
const MAX = 900;
const QUALITY = 78;
const CONCURRENCY = 8;

const files = (await readdir(dir)).filter((f) => f.endsWith(".png"));
console.log(`Found ${files.length} PNG files to convert.`);

let done = 0;
let totalIn = 0;
let totalOut = 0;
let idx = 0;

async function worker() {
  while (idx < files.length) {
    const file = files[idx++];
    const inPath = join(dir, file);
    const outPath = join(dir, file.replace(/\.png$/, ".webp"));
    const inStat = await stat(inPath);
    totalIn += inStat.size;
    await sharp(inPath)
      .resize(MAX, MAX, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);
    const outStat = await stat(outPath);
    totalOut += outStat.size;
    done += 1;
    if (done % 50 === 0) console.log(`  ${done}/${files.length}`);
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const mb = (n) => (n / 1e6).toFixed(1);
console.log(`\nConverted ${done} files.`);
console.log(`PNG total:  ${mb(totalIn)} MB`);
console.log(`WebP total: ${mb(totalOut)} MB`);
console.log(`Reduction:  ${(100 - (totalOut / totalIn) * 100).toFixed(1)}%`);
