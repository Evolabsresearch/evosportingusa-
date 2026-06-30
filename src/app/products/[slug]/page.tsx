import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  ClipboardCheck,
  MailCheck,
  PackageCheck,
  RotateCcw,
  Ruler,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { getProduct, products, relatedProducts, type Product } from "@/data/catalog";
import { site } from "@/data/site";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductGrid } from "@/components/product-grid";
import { StockFlag } from "@/components/stock-flag";
import { formatMoney } from "@/lib/format";
import {
  equipmentType,
  displayChipLabel,
  displaySpecValue,
  productLabel,
  productPageStory,
  productValueBullets,
  productValueHighlights,
  trainingRole,
} from "@/lib/product-merchandising";
import { absoluteUrl, jsonLd, productJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const story = productPageStory(product);
  return {
    title: product.name,
    description: story,
    alternates: {
      canonical: absoluteUrl(`/products/${product.slug}`),
    },
    openGraph: {
      type: "website",
      title: product.name,
      description: story,
      url: absoluteUrl(`/products/${product.slug}`),
      images: [
        {
          url: absoluteUrl(product.image),
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
    },
  };
}

function packageNote(product: Product) {
  const contents = product.specs["What ships"];
  if (contents) return contents;

  const label = productLabel(product);
  const name = product.name.toLowerCase();

  if (name.includes("bundle")) return `${label} is packed as a multi-piece kit with the included items shown on this page.`;
  if (name.includes("pair")) return `${label} ships as a matched pair.`;
  if (name.includes("set")) return `${label} is grouped as a set for one training station, with the contents listed on the item page.`;
  if (name.includes("kit") || name.includes("system")) {
    return `${label} keeps the kit pieces together for storage and replacement planning.`;
  }
  return `${label} ships as a single training item with specs and care notes shown here.`;
}

function fitNote(product: Product) {
  const name = product.name.toLowerCase();

  if (name.includes("knee sleeve")) return "Choose based on knee circumference and the compression feel you prefer for squat and lunge days.";
  if (name.includes("elbow sleeve")) return "Choose the sleeve strength around your pressing volume, elbow warmth needs, and preferred compression.";
  if (name.includes("wrist wrap")) return "Longer wrap lengths add more wrist support; shorter lengths are faster for mixed accessory work.";
  if (name.includes("belt")) return "Use the closure range to set firm bracing without pinching during hinges, rows, or loaded carries.";
  if (name.includes("dumbbell")) return "Match the weight to the next useful jump in your home-gym progression before adding a new pair.";
  if (name.includes("plate") || name.includes("bar")) return "Check sleeve, storage, and training-space needs before adding barbell gear to the cart.";
  if (name.includes("bench") || name.includes("rack")) return "Confirm the footprint works with your rack, wall clearance, and planned pressing station.";
  if (name.includes("pull-up") || name.includes("band")) return "Pick the assistance or grip option that matches your current pull-up volume and doorway or rack layout.";
  if (name.includes("jump rope") || name.includes("agility")) return "Use it where you have clear floor space and enough overhead or lane room for conditioning work.";
  if (name.includes("bundle")) return "Buy the bundle when most included pieces fit the training you already do.";
  return "Match the specs, training use, and storage notes to the way the piece will live in your room.";
}

function careNote(product: Product) {
  const material = product.material.toLowerCase();
  const name = product.name.toLowerCase();

  if (name.includes("chalk")) return "Keep chalk closed between sessions and store it away from damp flooring or open bottles.";
  if (material.includes("neoprene")) return "Air out after training and wipe the surface before storing it with clean wraps or sleeves.";
  if (material.includes("rubber")) return "Wipe rubber contact surfaces after dusty sessions and store away from sharp rack edges.";
  if (material.includes("steel") || material.includes("iron")) return "Keep metal surfaces dry, brush chalk buildup when needed, and store off wet flooring.";
  if (material.includes("latex")) return "Keep bands away from sharp edges, direct heat, and rough concrete when not in use.";
  if (name.includes("spray") || name.includes("brush") || name.includes("tag")) {
    return "Keep care items near the rack or shelf so cleanup happens before gear gets put away.";
  }
  return "Wipe down after use and store it with the rest of your training gear.";
}

function roomFitNote(product: Product) {
  const name = product.name.toLowerCase();

  if (name.includes("bundle")) return "Lay out the included pieces by station: belt near the bar, wraps by the bench, and collars on the rack.";
  if (name.includes("bench") || name.includes("rack")) return "Measure the floor footprint, wall clearance, and walking room around the press or rack station.";
  if (name.includes("bar") || name.includes("plate")) return "Confirm sleeve space, plate storage, flooring, and the route from delivery drop-off to the rack.";
  if (name.includes("dumbbell")) return "Check the load jump, handle style, and storage lane before adding another matched pair.";
  if (name.includes("jump rope") || name.includes("agility")) return "Confirm overhead room or lane space so conditioning work does not crowd the lifting area.";
  if (name.includes("band") || name.includes("pull-up")) return "Match the resistance, anchor point, doorway, or rack position to the movement you train most.";
  return "Check sizing, storage, and the training station where this item will be used most often.";
}

function deliveryNote(product: Product) {
  const name = product.name.toLowerCase();

  if (name.includes("bundle")) return "Multi-piece bundles may arrive in separate cartons with separate carrier scans.";
  if (name.includes("bench") || name.includes("rack") || name.includes("bar") || name.includes("plate")) {
    return "Larger equipment can move in more than one carton and may receive separate tracking updates.";
  }
  if (name.includes("dumbbell")) return "Matched pairs are packed together and can receive their own tracking update.";
  return "Accessories usually arrive as smaller cartons with a single tracking flow.";
}

function readinessIntro(product: Product) {
  const name = product.name.toLowerCase();

  if (name.includes("bundle")) {
    return {
      title: "Lay out the bundle by station.",
      body: "Match each included piece to the lift, shelf, and gear you already own.",
    };
  }

  if (name.includes("bench") || name.includes("rack") || name.includes("bar") || name.includes("plate")) {
    return {
      title: "Measure the station before delivery.",
      body: "Check footprint, sleeve space, carton handling, and the path into the room before ordering.",
    };
  }

  if (name.includes("dumbbell")) {
    return {
      title: "Match the next load jump.",
      body: "Check the handle, pair weight, storage lane, and movements this dumbbell will cover.",
    };
  }

  if (/spray|brush|tag|pack|roller|recovery/.test(name)) {
    return {
      title: "Keep care gear near the rack.",
      body: "Check storage, cleanup use, and where the item should live between sessions.",
    };
  }

  if (/belt|sleeve|wrap|strap|grip|chalk/.test(name)) {
    return {
      title: "Match support to the lift.",
      body: "Check sizing, closure, grip surface, and where the piece will live between sessions.",
    };
  }

  return {
    title: "Check fit, storage, and care.",
    body: "Use the product page to match the piece to your room, storage, and training week.",
  };
}

function productHelpTitle(product: Product) {
  const name = product.name.toLowerCase();

  if (name.includes("bundle")) return "Want a quick bundle check?";
  if (name.includes("bench") || name.includes("rack") || name.includes("bar") || name.includes("plate")) {
    return "Make sure it fits before it lands.";
  }
  if (name.includes("dumbbell")) return "Match the pair to your next jump.";
  return "Ask before it takes shelf space.";
}

function productHelpBody(product: Product) {
  const name = product.name.toLowerCase();

  if (name.includes("bundle")) {
    return "Tell us which pieces you already own and the lift you are building around. We can help you decide whether the full bundle makes sense or if one smaller piece is enough.";
  }

  if (name.includes("bench") || name.includes("rack")) {
    return "Share the room width, rack position, and how you plan to press. We can help you check the footprint before a larger piece shows up.";
  }

  if (name.includes("bar") || name.includes("plate")) {
    return "Share the rack, sleeve, and storage setup you use now. We can help you avoid buying load that has nowhere clean to live.";
  }

  if (name.includes("dumbbell")) {
    return "Share the weights you already own and the movements you train most. We can help you choose the next useful pair.";
  }

  if (/belt|sleeve|wrap|strap|grip|chalk/.test(name)) {
    return "Tell us the lift, fit question, or gear you are pairing it with. We can help you choose the right support piece for that station.";
  }

  return "Include the item name and how it will be used. We can help with fit, contents, care, or the right shelf for it.";
}

function buyingNotesTitle(product: Product) {
  const name = product.name.toLowerCase();

  if (/spray|brush|tag|pack|roller|recovery|mat/.test(name)) return "Why it earns shelf space.";
  if (/bench|rack|bar|plate|dumbbell/.test(name)) return "Why it belongs in the room.";
  if (name.includes("bundle")) return "Why the bundle works.";
  return "Why it fits the station.";
}

function specLabel(label: string) {
  const labels: Record<string, string> = {
    "What ships": "Included",
    "Ships from": "Ships From",
    "Training role": "Best For",
  };

  return labels[label] ?? label;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = relatedProducts(product, 4);
  const gallerySpecKeys =
    product.categorySlug === "bundles"
      ? (["Training role", "Material", "Warranty"] as const)
      : (["Material", "Training role", "Warranty"] as const);
  const gallerySpecs = gallerySpecKeys.flatMap((key) =>
    product.specs[key] ? [[key, product.specs[key]] as [string, string]] : [],
  );
  const valueHighlights = productValueHighlights(product);
  const valueBullets = productValueBullets(product);
  const productStory = productPageStory(product);
  const readinessIntroCopy = readinessIntro(product);
  const productHelpHeading = productHelpTitle(product);
  const productHelpCopy = productHelpBody(product);
  const buyingHeading = buyingNotesTitle(product);
  const visibleBadges = product.badges.filter((badge) => !/^ships?\b/i.test(badge));
  const buyingNotes = [
    ["Fit Check", fitNote(product)],
    ["In the Box", packageNote(product)],
    ["Care Notes", careNote(product)],
  ];
  const roomNotes = [
    ["Carton", deliveryNote(product)],
    ["Room Fit", roomFitNote(product)],
    ["Care", careNote(product)],
  ] as const;
  const purchaseRecord = [
    ["Item Code", product.sku],
    ["Ships From", product.specs["Ships from"] ?? site.fulfillmentNote],
    ["Type", equipmentType(product)],
    ["Best For", displaySpecValue(trainingRole(product))],
  ] as const;
  const readinessChecks = [
    {
      icon: Ruler,
      title: "Room Fit",
      body: roomFitNote(product),
    },
    {
      icon: PackageCheck,
      title: "Contents",
      body: packageNote(product),
    },
    {
      icon: Truck,
      title: "Arrival",
      body: deliveryNote(product),
    },
  ] as const;
  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productJsonLd(product, productStory))} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: product.category, href: `/collections/${product.categorySlug}` },
          { label: product.name },
        ]}
      />
      <section className="product-detail">
        <div className="product-gallery">
          <div className="product-gallery-frame">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 58vw"
              className="product-detail-image"
              unoptimized
            />
          </div>
          <div className="product-gallery-meta" aria-label="Product details">
            {gallerySpecs.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{displaySpecValue(value)}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="product-info">
          <Link className="eyebrow" href={`/collections/${product.categorySlug}`}>
            {product.category}
          </Link>
          <h1>{product.name}</h1>
          <div className="product-proof-row">
            <span>
              <PackageCheck size={18} aria-hidden="true" /> {product.sku}
            </span>
            <span>{equipmentType(product)}</span>
            <StockFlag inventory={product.inventory} />
          </div>
          <p>{productStory}</p>
          <div className="product-value-panel" aria-label="Product value details">
            {valueHighlights.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
          <div className="price-row large">
            <strong>{formatMoney(product.price)}</strong>
            {product.compareAt > product.price ? <span>{formatMoney(product.compareAt)}</span> : null}
          </div>
          {visibleBadges.length > 0 ? (
            <div className="badge-row">
              {visibleBadges.map((badge) => (
                <span className="pill" key={badge}>
                  {displayChipLabel(badge)}
                </span>
              ))}
            </div>
          ) : null}
          <div className="product-commerce-record" aria-label="At a glance">
            <span>
              <PackageCheck size={16} aria-hidden="true" />
              At a Glance
            </span>
            <dl>
              {purchaseRecord.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <AddToCartButton product={product} />
          <div className="product-assurance">
            <span>
              <PackageCheck size={18} aria-hidden="true" />
              Ships from US network
            </span>
            <span>
              <RotateCcw size={18} aria-hidden="true" />
              Care Notes Below
            </span>
            <span>
              <ShieldCheck size={18} aria-hidden="true" />
              Coverage in Specs
            </span>
          </div>
          <div className="product-merchant-note" aria-label="Product buying details">
            <strong>Before You Buy</strong>
            <p>
              Check the carton, fit, and care needs before it earns space in the room.
            </p>
            <dl>
              {roomNotes.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="product-readiness-panel" aria-label="Product buying checks">
        <article className="product-readiness-intro">
          <ClipboardCheck size={24} aria-hidden="true" />
          <p className="eyebrow">Room Check</p>
          <h2>{readinessIntroCopy.title}</h2>
          <p>{readinessIntroCopy.body}</p>
        </article>
        <div className="product-readiness-cards">
          {readinessChecks.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title}>
                <Icon size={20} aria-hidden="true" />
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
        <article className="product-order-record">
          <MailCheck size={22} aria-hidden="true" />
          <p className="eyebrow">Gear Help</p>
          <h2>{productHelpHeading}</h2>
          <p>{productHelpCopy}</p>
          <Link className="button button-soft" href="/support/contact">
            <MailCheck size={18} aria-hidden="true" />
              Ask About This Item
          </Link>
        </article>
      </section>

      <section className="product-content-grid">
        <div>
          <p className="eyebrow">Buying Notes</p>
          <h2>{buyingHeading}</h2>
          <ul className="feature-list">
            {valueBullets.map((feature) => (
              <li key={feature}>
                <CheckCircle2 size={18} aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="product-note-list" aria-label="Fit, package, and care notes">
            {buyingNotes.map(([title, body]) => (
              <article key={title}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Specifications</p>
          <h2>Specs.</h2>
          <dl className="spec-list">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key}>
                <dt>{specLabel(key)}</dt>
                <dd>{displaySpecValue(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">More for This Lift</p>
          <h2>Pairs well with {product.category}.</h2>
        </div>
        <ProductGrid products={related} />
      </section>
    </main>
  );
}
