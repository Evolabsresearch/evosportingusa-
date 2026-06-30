import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductGrid } from "@/components/product-grid";
import { categories, products, type Product } from "@/data/catalog";
import { formatMoney } from "@/lib/format";

export const metadata = {
  title: "Collections",
  description: "Shop EVO Sporting USA gear by room station, lift, and training use.",
};

function productBySlug(slug: string) {
  return products.find((product) => product.slug === slug) ?? products[0]!;
}

const deadliftBundle = productBySlug("evo-deadlift-support-training-bundle");
const homeBundle = productBySlug("evo-home-strength-training-bundle");
const gripBundle = productBySlug("evo-grip-starter-training-bundle");
const pullUpBundle = productBySlug("evo-pull-up-builder-training-bundle");
const belt = productBySlug("evo-4-in-nylon-quick-lock-lifting-belt");
const wristWrap = productBySlug("evo-18-in-stabilizing-wrist-wrap-pair");
const cottonStraps = productBySlug("evo-cotton-lifting-strap-pair");
const chalkBall = productBySlug("evo-chalk-ball-grip-chalk-system");
const chalkPouch = productBySlug("evo-drawcord-chalk-pouch");
const chalkMat = productBySlug("evo-chalk-station-mat");
const gearPouch = productBySlug("evo-zipper-gear-pouch");
const benchCoverTowel = productBySlug("evo-bench-cover-towel");
const miniBandMedium = productBySlug("evo-mini-loop-band-medium");
const floorMarkers = productBySlug("evo-floor-marker-disc-6-pack");
const dumbbellPair = productBySlug("evo-45-lb-rubber-hex-dumbbell-pair");
const midDumbbellPair = productBySlug("evo-25-lb-rubber-hex-dumbbell-pair");
const barbell = productBySlug("evo-45-lb-olympic-training-bar");
const platePair = productBySlug("evo-45-lb-olympic-bumper-plate-pair");
const bench = productBySlug("evo-adjustable-training-bench");
const rackAttachment = productBySlug("evo-j-hook-pair-rack-attachment");
const foamRoller = productBySlug("evo-foam-roller-mobility-tool");
const speedRope = productBySlug("evo-speed-jump-rope");
const agilityLadder = productBySlug("evo-ladder-agility-kit");
const hotColdPack = productBySlug("evo-hot-cold-pack-recovery-tool");
const barbellBrush = productBySlug("evo-barbell-brush-equipment-care-kit");

const collectionShelfProducts: Record<string, Product[]> = {
  "lifting-supports": [belt, wristWrap],
  "straps-grips": [cottonStraps, chalkBall],
  "chalk-grip-basics": [chalkPouch, chalkMat],
  "gym-bag-essentials": [gearPouch, benchCoverTowel],
  "setup-mobility-minis": [miniBandMedium, floorMarkers],
  "dumbbells-weights": [dumbbellPair, midDumbbellPair],
  "plates-bars": [barbell, platePair],
  "benches-racks": [bench, rackAttachment],
  "pullup-mobility": [pullUpBundle, foamRoller],
  conditioning: [speedRope, agilityLadder],
  "storage-recovery": [hotColdPack, barbellBrush],
  bundles: [deadliftBundle, homeBundle],
};

const collectionMerchCopy: Record<string, { title: string; kicker: string }> = {
  "lifting-supports": { title: "Belts & Sleeves", kicker: "Bracing Drawer" },
  "straps-grips": { title: "Straps & Chalk", kicker: "Pull-Day Shelf" },
  "chalk-grip-basics": { title: "Chalk & Tape", kicker: "Small Grip Kit" },
  "gym-bag-essentials": { title: "Bag Essentials", kicker: "Soft Goods" },
  "setup-mobility-minis": { title: "Mobility Minis", kicker: "Warmup Corner" },
  "dumbbells-weights": { title: "Hex Dumbbells", kicker: "Matched Pairs" },
  "plates-bars": { title: "Bars & Plates", kicker: "Barbell Station" },
  "benches-racks": { title: "Benches & Stands", kicker: "Press Station" },
  "pullup-mobility": { title: "Pull-Up & Mobility", kicker: "Doorway Volume" },
  conditioning: { title: "Ropes & Agility", kicker: "Finishers" },
  "storage-recovery": { title: "Care & Recovery", kicker: "After Training" },
  bundles: { title: "Training Bundles", kicker: "Ready Stack" },
};

const setupLinks = [
  {
    title: "Deadlift shelf",
    href: "/collections/bundles",
    image: deadliftBundle.image,
    note: "Belt / Straps / Collars",
  },
  {
    title: "Bench station",
    href: "/collections/benches-racks",
    image: "/brand/evo-athlete-bench-v1.png",
    note: "Bench / Stand / Plates",
  },
  {
    title: "Grip drawer",
    href: "/collections/straps-grips",
    image: gripBundle.image,
    note: "Wraps / Chalk / Grips",
  },
  {
    title: "Pull-up lane",
    href: "/collections/pullup-mobility",
    image: pullUpBundle.image,
    note: "Bar / Band / Hands",
  },
];

const featuredCatalogProducts = [
  deadliftBundle,
  homeBundle,
  gripBundle,
  pullUpBundle,
  belt,
  wristWrap,
  cottonStraps,
  chalkBall,
  chalkPouch,
  gearPouch,
  miniBandMedium,
  floorMarkers,
  dumbbellPair,
  midDumbbellPair,
  barbell,
  platePair,
  bench,
  rackAttachment,
  foamRoller,
  speedRope,
  agilityLadder,
  hotColdPack,
  barbellBrush,
];

const buyingStandards = [
  {
    step: "01",
    title: "Pick the station",
    body: "Start with the area you are building: pulls, pressing, dumbbells, pull-ups, conditioning, or recovery.",
  },
  {
    step: "02",
    title: "Open the item page",
    body: "Check included pieces, training role, material, and care notes.",
  },
  {
    step: "03",
    title: "Build the shelf",
    body: "Add the pieces that live together: belt with straps, bench with wraps, bars with collars, recovery tools near the mat.",
  },
] as const;

export default function CollectionsPage() {
  const activeCategories = categories.filter((category) => category.productCount > 0);

  return (
    <main className="page-shell collections-retail">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collections" }]} />
      <section className="collections-hero">
        <div className="collections-hero-copy">
          <p className="eyebrow">Equipment</p>
          <h1>Gear for the stations in your room.</h1>
          <p>
            Start with the place it will live: pull platform, bench station, dumbbell
            lane, doorway bar, conditioning space, recovery shelf, or support drawer.
          </p>
          <div className="collections-hero-actions">
            <Link className="button button-dark" href="/collections/bundles">
              Shop Room Bundles
            </Link>
            <Link className="button button-soft" href="/search">
              Search Gear
            </Link>
          </div>
          <div className="collections-hero-facts" aria-label="Shopping notes">
            <span>Pull Platform</span>
            <span>Bench Station</span>
            <span>Recovery Shelf</span>
          </div>
        </div>
        <div className="collections-hero-media">
          <Image
            src="/brand/evo-athlete-bench-v1.png"
            alt="Lean athlete seated on an adjustable bench with dumbbells, plates, resistance band, and rack in a dark garage gym"
            width={1600}
            height={900}
            priority
          />
          <div className="collections-hero-ticket">
            <span>Home strength bundle</span>
            <strong>{formatMoney(homeBundle.price)}</strong>
            <small>Bench support, adjustable load, bands, and straps.</small>
          </div>
        </div>
      </section>

      <section className="collections-setup-strip" aria-label="Shop by training focus">
        {setupLinks.map((setup) => (
          <Link href={setup.href} className="collections-setup-link" key={setup.title}>
            <Image
              src={setup.image}
              alt={`${setup.title} equipment`}
              width={360}
              height={260}
              loading="eager"
              unoptimized
            />
            <span>{setup.note}</span>
            <strong>{setup.title}</strong>
          </Link>
        ))}
      </section>

      <section className="collections-buying-standard" aria-label="Shopping sequence">
        {buyingStandards.map((item) => (
          <div key={item.step}>
            <span>{item.step}</span>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </div>
        ))}
      </section>

      <section className="collections-aisles" aria-label="Equipment aisles">
        <div className="collections-aisles-heading">
          <p className="eyebrow">Rack sections</p>
          <h2>Shop the rack by section.</h2>
        </div>
        <div className="collections-aisle-grid">
          {activeCategories.map((category) => {
            const shelfProducts = collectionShelfProducts[category.slug] ?? [];
            const categoryProducts = products.filter((product) => product.categorySlug === category.slug);
            const fromPrice = Math.min(...categoryProducts.map((product) => product.price));
            const merchCopy = collectionMerchCopy[category.slug] ?? {
              title: category.name,
              kicker: "Shop the Gear",
            };

            return (
              <Link
                className="collections-aisle-card"
                href={`/collections/${category.slug}`}
                aria-label={`Shop ${category.name}`}
                key={category.slug}
              >
                <div className="collections-aisle-media" aria-hidden="true">
                  {shelfProducts.map((product) => (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={220}
                      height={220}
                      loading="eager"
                      unoptimized
                      aria-hidden="true"
                      key={product.slug}
                    />
                  ))}
                </div>
                <div>
                  <span style={{ backgroundColor: category.accent }} />
                  <small>{merchCopy.kicker}</small>
                  <h3>{merchCopy.title}</h3>
                  <em>From {formatMoney(fromPrice)}</em>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section-heading in-page" id="all-equipment">
        <p className="eyebrow">Popular gear</p>
        <h2>The pieces most rooms reach for first.</h2>
        <Link className="button button-soft" href="/search">
          Search all gear
        </Link>
      </section>
      <ProductGrid products={featuredCatalogProducts} eagerImages />
    </main>
  );
}
