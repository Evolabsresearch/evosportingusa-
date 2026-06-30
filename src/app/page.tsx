import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Dumbbell, PackageCheck, ShieldCheck } from "lucide-react";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { ProductCard } from "@/components/product-card";
import { categories, getProduct, products, type Product } from "@/data/catalog";
import { promoCode } from "@/lib/promo";

function pick(slugs: string[]): Product[] {
  const out: Product[] = [];
  for (const slug of slugs) {
    const product = getProduct(slug);
    if (product) out.push(product);
  }
  return out;
}

const bestsellers = pick([
  "evo-deadlift-support-training-bundle",
  "evo-adjustable-training-bench",
  "evo-45-lb-rubber-hex-dumbbell-pair",
  "evo-everyday-core-back-support-belt",
  "evo-18-in-stabilizing-wrist-wrap-pair",
  "evo-quick-lock-olympic-bar-collar-pair",
  "evo-chalk-ball-grip-chalk-system",
  "evo-bench-starter-training-bundle",
]);

const bundles = pick([
  "evo-grip-starter-training-bundle",
  "evo-pull-up-builder-training-bundle",
  "evo-deadlift-support-training-bundle",
  "evo-bench-starter-training-bundle",
]);

// Fresh-in row: catalog items not already shown above.
const featuredSlugs = new Set([...bestsellers, ...bundles].map((p) => p.slug));
const newArrivals = products.filter((p) => !featuredSlugs.has(p.slug)).slice(0, 8);

const categoryTiles = categories.slice(0, 12);

export default function Home() {
  return (
    <main className="home-retail">
      {/* Promo hero banner */}
      <section className="bb-hero">
        <Image
          src="/brand/evo-athlete-hero-v1.png"
          alt="Lifter chalking up beside a loaded barbell, bench, and dumbbells in a garage gym"
          fill
          priority
          sizes="100vw"
          className="bb-hero-bg"
        />
        <div className="bb-hero-shade" />
        <div className="bb-hero-content">
          <p className="bb-hero-kicker">New customers · code {promoCode}</p>
          <h1>Train heavy. Demand more from your gear.</h1>
          <p className="bb-hero-sub">
            Belts, bars, benches, plates, and dumbbells - built to take a beating
            and priced for real racks. Take 20% off your first order with code {promoCode}.
          </p>
          <div className="bb-hero-actions">
            <Link className="button button-dark" href="/collections">
              Shop all gear <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="button button-soft" href="/collections/bundles">
              Shop bundles
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="bb-section" aria-label="Shop by category">
        <div className="bb-section-head">
          <h2>Shop by category</h2>
          <Link className="bb-see-all" href="/collections">
            All gear <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="bb-category-grid">
          {categoryTiles.map((cat) => (
            <Link className="bb-category-tile" href={`/collections/${cat.slug}`} key={cat.slug}>
              <span className="bb-category-accent" style={{ background: cat.accent }} aria-hidden="true" />
              <strong>{cat.name}</strong>
              <span className="bb-category-deck">{cat.deck}</span>
              <small>{cat.productCount} items</small>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers carousel */}
      <section className="bb-section" aria-label="Bestsellers">
        <div className="bb-section-head">
          <h2>Bestsellers</h2>
          <Link className="bb-see-all" href="/collections">
            Shop all <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="bb-rail">
          {bestsellers.map((product, i) => (
            <div className="bb-rail-item" key={product.slug}>
              <ProductCard product={product} eagerImage={i < 4} />
            </div>
          ))}
        </div>
      </section>

      {/* Bundle promo band */}
      <section className="bb-promo-band" aria-label="Training bundles">
        <div className="bb-promo-copy">
          <p className="eyebrow">Pre-built kits</p>
          <h2>Build your setup in one cart.</h2>
          <p>
            Four training bundles from $69.95 to $289.95 — the pieces that get
            used together, packed together, so you skip the guesswork on sizes.
          </p>
          <Link className="button button-dark" href="/collections/bundles">
            Shop bundles <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="bb-promo-rail">
          {bundles.map((product) => (
            <Link className="bb-promo-card" href={`/products/${product.slug}`} key={product.slug}>
              <Image src={product.image} alt={product.name} width={300} height={300} unoptimized />
              <strong>{product.name.replace(/^EVO\s+/, "")}</strong>
            </Link>
          ))}
        </div>
      </section>

      {/* New in the rack carousel */}
      <section className="bb-section" aria-label="New in the rack">
        <div className="bb-section-head">
          <h2>New in the rack</h2>
          <Link className="bb-see-all" href="/collections">
            Shop all <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="bb-rail">
          {newArrivals.map((product) => (
            <div className="bb-rail-item" key={product.slug}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Honest value band */}
      <section className="bb-value-band" aria-label="How EVO Sporting USA works">
        <div>
          <Dumbbell size={22} aria-hidden="true" />
          <strong>Sorted by station</strong>
          <span>Gear grouped by how it gets used</span>
        </div>
        <div>
          <PackageCheck size={22} aria-hidden="true" />
          <strong>US fulfillment partners</strong>
          <span>Carton notes where handling matters</span>
        </div>
        <div>
          <Award size={22} aria-hidden="true" />
          <strong>Backed by warranty</strong>
          <span>Coverage on belts, straps, and equipment</span>
        </div>
        <div>
          <ShieldCheck size={22} aria-hidden="true" />
          <strong>Detailed on every page</strong>
          <span>Dimensions, materials, and care</span>
        </div>
      </section>

      {/* Newsletter */}
      <section className="home-newsletter" aria-label="Newsletter signup">
        <div className="home-newsletter-copy">
          <Award size={26} aria-hidden="true" />
          <p className="eyebrow">The EVO List</p>
          <h2>20% off your first order with code {promoCode}. Restock alerts when bars and plates run low.</h2>
          <p>
            Monthly notes on training, restock reminders, and member-only
            bundle pricing. No spam. Unsubscribe in one click.
          </p>
        </div>
        <NewsletterSignup />
      </section>
    </main>
  );
}
