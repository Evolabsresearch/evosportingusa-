import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { PackageCheck, Ruler, Wrench } from "lucide-react";
import { categories, getCategory, getProductsByCategory } from "@/data/catalog";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductGrid } from "@/components/product-grid";
import { formatMoney } from "@/lib/format";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.deck,
  };
}

const collectionAdvice: Record<string, { title: string; points: string[] }> = {
  "lifting-supports": {
    title: "Choose support by lift, fit, and training volume.",
    points: [
      "Match belt width and closure style to squats, pulls, or mixed accessory work.",
      "Sleeves and wraps should match the joint, warmth level, and pace of the session.",
      "Small support gear belongs near chalk, collars, and straps when the platform is busy.",
    ],
  },
  "straps-grips": {
    title: "Match grip help to the pull.",
    points: [
      "Long straps suit rows and Romanian deadlifts; figure-8 straps suit heavier pulls.",
      "Grip pads and hand grips should match the bar, handle, or pull-up surface.",
      "Chalk formats should fit where the item will live: bag, shelf, or platform.",
    ],
  },
  "chalk-grip-basics": {
    title: "Build the small grip drawer around dry, replaceable pieces.",
    points: [
      "Chalk blocks, chalk balls, tape, and pouches should stay close to the pull platform.",
      "Brushes and mats belong near the bar so chalk cleanup happens before the room gets packed away.",
      "Small grip pieces work best when the drawer has one pouch, one tape spot, and one chalk spot.",
    ],
  },
  "gym-bag-essentials": {
    title: "Keep the bag ready without mixing clean and chalky gear.",
    points: [
      "Towels, wash bags, and shoe sacks keep soft goods from picking up chalk and floor grit.",
      "Small pouches make tape, clips, notebooks, and measurement tools easier to find mid-session.",
      "Bag pieces should wash, dry, and repack without needing a separate storage system.",
    ],
  },
  "setup-mobility-minis": {
    title: "Choose warmup tools by the corner where they will live.",
    points: [
      "Loop bands and stretch straps should match the hip, shoulder, or row prep you repeat most.",
      "Markers, wedges, and sliders need enough floor space to work without crowding the rack path.",
      "Small mobility tools should store together so warmups do not turn into a search through the room.",
    ],
  },
  "dumbbells-weights": {
    title: "Pick load by movement and storage space.",
    points: [
      "Pairs keep presses, rows, carries, and single-leg work balanced.",
      "Adjustable load saves floor space when the room cannot hold a full rack.",
      "Check handle style and weight jumps before choosing the next lane.",
    ],
  },
  "plates-bars": {
    title: "Check bar, sleeve, and plate handling before ordering.",
    points: [
      "Bumper plates reduce floor noise; iron plates keep smaller jumps available.",
      "Collars matter when plate changes are frequent or the bar moves fast.",
      "Storage pieces should match the sleeve length, lane width, and floor surface.",
    ],
  },
  "benches-racks": {
    title: "Confirm footprint before adding the station.",
    points: [
      "Measure rack depth, bench angle, wall room, and walking space around the lift.",
      "Hooks, stands, and platforms should match the bar path and flooring.",
      "Heavy pieces may arrive in separate cartons with separate tracking scans.",
    ],
  },
  "pullup-mobility": {
    title: "Choose pieces that stay close to warmups and cooldowns.",
    points: [
      "Bands should match assistance, glute work, or shoulder prep needs.",
      "Mobility tools work best when they live near the mat or rack.",
      "Pull-up pieces should match the doorway, bar, or grip style in use.",
    ],
  },
  conditioning: {
    title: "Match speed work to the available floor.",
    points: [
      "Ropes need overhead room; ladders and cones need an open lane.",
      "Weighted tools should fit warmups, finishers, and storage between sessions.",
      "Compact gear is easier to keep near the training area after the finisher.",
    ],
  },
  "storage-recovery": {
    title: "Keep upkeep pieces close to the gear they serve.",
    points: [
      "Brushes, spray, tags, and recovery tools should stay near the rack or shelf.",
      "Care items protect collars, straps, sleeves, and handles between sessions.",
      "Recovery pieces should be easy to reach before the room gets packed away.",
    ],
  },
  bundles: {
    title: "Check the included pieces against the training day.",
    points: [
      "Bundles work best when every included item serves the same lift or room zone.",
      "Check the included pieces before choosing between a focused bundle and single items.",
      "Mixed bundles can ship in more than one carton depending on item size.",
    ],
  },
};

const collectionHeadings: Record<string, string> = {
  "lifting-supports": "Support gear for the lift you are actually doing.",
  "straps-grips": "Grip pieces that stay close to the bar.",
  "chalk-grip-basics": "Dry chalk, tape, and shelf pieces for the pull-day drawer.",
  "gym-bag-essentials": "Bag pieces that keep towels, wraps, shoes, and small tools sorted.",
  "setup-mobility-minis": "Small warmup and mobility pieces for the mat, rack, and open lane.",
  "dumbbells-weights": "Matched load for presses, rows, carries, and short sessions.",
  "plates-bars": "Barbell pieces for the loading side of the rack.",
  "benches-racks": "Bench and rack pieces for the station footprint.",
  "pullup-mobility": "Pull-up, band, and mobility gear for daily use.",
  conditioning: "Conditioning gear for the open lane.",
  "storage-recovery": "Care and recovery pieces that live near the rack.",
  bundles: "Bundles built around a training day or room zone.",
};

const collectionDetailPanels: Record<
  string,
  {
    detailTitle: string;
    detailBody: string;
    careTitle: string;
    careBody: string;
  }
> = {
  "lifting-supports": {
    detailTitle: "Check width, compression, and closure.",
    detailBody: "Belts, sleeves, and wraps change the feel of a lift. Match the support level to the session.",
    careTitle: "Keep support gear dry between days.",
    careBody: "Air out sleeves and wraps, keep belt hardware clean, and store bracing gear away from damp flooring.",
  },
  "straps-grips": {
    detailTitle: "Choose the grip style for the bar.",
    detailBody: "Cotton straps, figure-8 straps, grips, and chalk all solve different pull-day problems.",
    careTitle: "Keep chalk and straps with the platform.",
    careBody: "Dry straps after training, close chalk between sets, and keep small grip pieces in one drawer.",
  },
  "chalk-grip-basics": {
    detailTitle: "Keep chalk, tape, and brushes grouped.",
    detailBody: "Blocks, chalk balls, pouches, tape, and brushes are small pieces, but they change how quickly a pull day resets.",
    careTitle: "Close the chalk and clean the shelf.",
    careBody: "Keep dry chalk covered, brush the bar after heavy dust, and shake out mats or liners when buildup starts.",
  },
  "gym-bag-essentials": {
    detailTitle: "Separate clean gear from chalky gear.",
    detailBody: "Towels, wash bags, shoe sacks, pouches, clips, and notebooks should make the bag easier to repack after training.",
    careTitle: "Wash soft goods before they sit.",
    careBody: "Hang towels, open mesh bags, and keep pouches empty enough that tape and small tools are easy to find.",
  },
  "setup-mobility-minis": {
    detailTitle: "Match the tool to the warmup lane.",
    detailBody: "Bands, sliders, straps, wedges, markers, and mobility balls should fit the mat, floor, or doorway anchor in use.",
    careTitle: "Store bands away from sharp edges.",
    careBody: "Keep latex loops flat, stack floor pieces, and return small mobility tools to the same tray after warmups.",
  },
  "dumbbells-weights": {
    detailTitle: "Match the next useful weight jump.",
    detailBody: "Fixed pairs, adjustable load, and plate options should fit the movements already in rotation.",
    careTitle: "Plan the storage lane before adding load.",
    careBody: "Check handle style, floor space, and the path from delivery drop-off to the training room.",
  },
  "plates-bars": {
    detailTitle: "Check sleeve fit and plate handling.",
    detailBody: "Bars, plates, collars, and storage pieces should work together before the station gets heavier.",
    careTitle: "Keep metal dry and collars nearby.",
    careBody: "Brush chalk from knurling, store plates off wet flooring, and keep collars with the bar.",
  },
  "benches-racks": {
    detailTitle: "Measure the press station first.",
    detailBody: "Bench angle, rack depth, hook height, and walking room decide whether the station works.",
    careTitle: "Give large pieces room to arrive.",
    careBody: "Benches, stands, and rack hardware can need extra floor space while cartons are unpacked.",
  },
  "pullup-mobility": {
    detailTitle: "Fit the piece to the anchor point.",
    detailBody: "Bands, pull-up tools, and rollers should match the doorway, rack, mat, or warmup area.",
    careTitle: "Keep warmup tools easy to reach.",
    careBody: "Store bands away from sharp edges and keep rollers close enough to use before training.",
  },
  conditioning: {
    detailTitle: "Check the lane before the finisher.",
    detailBody: "Ropes, ladders, cones, and compact tools need overhead room, floor length, or open corners.",
    careTitle: "Pack quick gear where it will be used.",
    careBody: "Coil ropes, stack cones, and keep ladder work from spreading into the lifting path.",
  },
  "storage-recovery": {
    detailTitle: "Put upkeep gear beside the rack.",
    detailBody: "Brushes, packs, tags, and recovery tools work best when cleanup is part of the session.",
    careTitle: "Make recovery and care visible.",
    careBody: "Store packs, brushes, and rollers where they are easy to grab before the room gets packed away.",
  },
  bundles: {
    detailTitle: "Read the included pieces as a set.",
    detailBody: "A bundle should match one training day, one room zone, or one repeat setup.",
    careTitle: "Plan where every piece lands.",
    careBody: "Mixed bundles can include small accessories and larger items that need different storage spots.",
  },
};

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category || category.productCount === 0) notFound();
  const collectionProducts = getProductsByCategory(slug);
  const heroProducts = collectionProducts.slice(0, 3);
  const fromPrice = Math.min(...collectionProducts.map((product) => product.price));
  const accentStyle = { "--category-accent": category.accent } as CSSProperties;
  const advice = collectionAdvice[slug] ?? {
    title: "Check fit, storage, and training use before ordering.",
    points: [
      "Compare product contents, materials, and measurements before choosing.",
      "Use the product page to confirm what is included and how the piece should be stored.",
      "Use care and storage details to decide whether the piece fits the room.",
    ],
  };
  const detailPanel = collectionDetailPanels[slug] ?? {
    detailTitle: "Match the item to the training station.",
    detailBody: "Compare materials, measurements, contents, and training use before choosing.",
    careTitle: "Plan storage before it arrives.",
    careBody: "Keep the piece near the lift, shelf, mat, rack, or recovery area where it will be used.",
  };

  return (
    <main className="page-shell collection-detail-page">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: category.name },
        ]}
      />
      <section className="collection-detail-hero" style={accentStyle}>
        <div className="collection-detail-copy">
          <p className="eyebrow">Collection</p>
          <h1>{category.name}</h1>
          <p>{category.deck}</p>
          <div className="collection-detail-facts">
            <span>From {formatMoney(fromPrice)}</span>
            <span>{category.productCount} Pieces</span>
            <span>Sized for rooms</span>
            <span>Specs by item</span>
          </div>
        </div>
        <div className="collection-detail-media" aria-label={`${category.name} product examples`}>
          {heroProducts.map((product, index) => (
            <Link
              className={`collection-detail-shot shot-${index + 1}`}
              href={`/products/${product.slug}`}
              key={product.slug}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={640}
                height={640}
                priority={index === 0}
                unoptimized
              />
              <span>{product.name.replace(/^EVO\s+/, "")}</span>
              <strong>{formatMoney(product.price)}</strong>
            </Link>
          ))}
        </div>
      </section>
      <section className="collection-order-panel" aria-label={`${category.name} buying checks`}>
        <article>
          <Ruler size={22} aria-hidden="true" />
          <p className="eyebrow">Fit check</p>
          <h2>{advice.title}</h2>
          <ul>
            {advice.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
        <article>
          <PackageCheck size={22} aria-hidden="true" />
          <p className="eyebrow">Construction</p>
          <h2>{detailPanel.detailTitle}</h2>
          <p>{detailPanel.detailBody}</p>
        </article>
        <article>
          <Wrench size={22} aria-hidden="true" />
          <p className="eyebrow">Storage & care</p>
          <h2>{detailPanel.careTitle}</h2>
          <p>{detailPanel.careBody}</p>
        </article>
      </section>
      <section className="section-heading in-page">
        <p className="eyebrow">Shop the section</p>
        <h2>{collectionHeadings[slug] ?? `${category.name} for the room you are building.`}</h2>
      </section>
      <ProductGrid products={collectionProducts} eagerImages />
    </main>
  );
}
