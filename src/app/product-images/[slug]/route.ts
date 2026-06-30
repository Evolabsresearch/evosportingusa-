import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { getProduct } from "@/data/catalog";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return new NextResponse("Not found", { status: 404 });

  const publicDir = join(process.cwd(), "public", "products");
  const webpPath = join(publicDir, `${slug}.webp`);
  const pngPath = join(publicDir, `${slug}.png`);
  const svgPath = join(publicDir, `${slug}.svg`);

  // Optimized WebP is the primary asset (universally supported, including by
  // social and link-preview crawlers). PNG and SVG remain as fallbacks.
  try {
    const webp = await readFile(webpPath);
    return new NextResponse(webp, {
      headers: {
        "content-type": "image/webp",
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    // Fall through to PNG, then SVG.
  }

  try {
    const png = await readFile(pngPath);
    return new NextResponse(png, {
      headers: {
        "content-type": "image/png",
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    const svg = await readFile(svgPath);
    return new NextResponse(svg, {
      headers: {
        "content-type": "image/svg+xml",
        "cache-control": "public, max-age=3600",
      },
    });
  }
}
