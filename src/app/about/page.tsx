import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Dumbbell, ListChecks, Mail, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { site } from "@/data/site";
import { categories } from "@/data/catalog";

export const metadata = {
  title: "About",
  description: "EVO Sporting USA strength equipment for garage gyms, basement racks, and practical training rooms.",
};

export default function AboutPage() {
  const operatingRows = [
    ["Gear range", `${site.catalogSize} active items across strength, conditioning, recovery, and room setup.`],
    ["Training focus", "Belts, straps, bars, plates, benches, dumbbells, pull-up gear, and warmup tools."],
    ["Room fit", "Pieces are grouped around pull days, bench work, dumbbell lanes, recovery shelves, and rack hardware."],
    ["Ships from", site.fulfillmentNote],
  ] as const;
  const buyingStandards = [
    "Open a product for contents, material, intended training use, and care.",
    "Use the cart to check quantities, add-ons, delivery estimate, and discount code.",
    "Compare sections by station, shelf space, and the lifts already in the room.",
  ] as const;
  const verificationLinks = [
    [
      "Merchant details",
      "/support/merchant-details",
      "Seller name, billing label, and contact details.",
    ],
    [
      "Delivery policy",
      "/policies/shipping-policy",
      "Flat rate, no minimum, and handling notes for multi-carton orders.",
    ],
    [
      "Returns and warranty",
      "/policies/refund-policy",
      `${site.returnWindowDays}-day return window with warranty claim steps.`,
    ],
    ["Track an order", "/track-order", "Use the order number and checkout email for order status."],
  ] as const;
  const contactDetails = [
    ["Inbox", site.supportEmail],
    ["Hours", site.hours],
    ["Business", site.legalName],
  ];

  if (site.supportPhone) {
    contactDetails.splice(1, 0, ["Phone", site.supportPhone]);
  }

  if (site.businessAddress) {
    contactDetails.splice(2, 0, ["Address", site.businessAddress]);
  }

  return (
    <main className="page-shell">
      <section className="about-hero">
        <div>
          <p className="eyebrow">About EVO Sporting USA</p>
          <h1>Rack-ready equipment for rooms that actually get used.</h1>
          <p>
            EVO Sporting USA sells strength equipment for garage gyms, spare rooms, and basement
            racks: lifting supports, bars, plates, benches, dumbbells, pull-up gear, conditioning
            tools, and recovery basics.
          </p>
          <div className="about-hero-actions">
            <Link className="button button-dark" href="/collections">
              Shop EVO Sporting USA
            </Link>
            <Link className="button button-soft" href="/support/merchant-details">
              Store details
            </Link>
          </div>
        </div>
        <Image
          src="/brand/evo-hero-equipment.png"
          alt="EVO Sporting USA strength equipment arranged near a rack"
          width={900}
          height={720}
          priority
        />
      </section>
      <section className="benefit-band in-page">
        <div>
          <Dumbbell size={28} aria-hidden="true" />
          <strong>Strength first</strong>
          <span>Core gear for weightlifting, home gyms, and accessory work.</span>
        </div>
        <div>
          <Truck size={28} aria-hidden="true" />
          <strong>Carton aware</strong>
          <span>Small accessories and larger pieces are described where handling matters.</span>
        </div>
        <div>
          <ShieldCheck size={28} aria-hidden="true" />
          <strong>Care by item</strong>
          <span>Care notes cover sleeves, wraps, bars, brushes, and recovery tools.</span>
        </div>
      </section>
      <section className="about-operations-grid" aria-label="EVO Sporting USA operating details">
        <article>
          <PackageCheck size={24} aria-hidden="true" />
          <p className="eyebrow">How the store runs</p>
          <h2>Built around repeat-use gear, not novelty items.</h2>
          <dl>
            {operatingRows.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </article>
        <article>
          <ListChecks size={24} aria-hidden="true" />
          <p className="eyebrow">Buying Notes</p>
          <h2>Every item has a job in the room.</h2>
          <ul>
            {buyingStandards.map((standard) => (
              <li key={standard}>
                <CheckCircle2 size={16} aria-hidden="true" />
                <span>{standard}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
      <section className="about-verification-panel" aria-label="Store detail links">
        <div>
          <Mail size={24} aria-hidden="true" />
          <p className="eyebrow">Store details</p>
          <h2>Find the seller details without digging.</h2>
          <p>
            Find delivery, returns, tracking, and contact details from the cart, checkout,
            footer, and Help page.
          </p>
        </div>
        <div className="about-verification-links">
          {verificationLinks.map(([label, href, body]) => (
            <Link href={href} key={label}>
              <span>
                <CheckCircle2 size={16} aria-hidden="true" />
                {label}
              </span>
              <small>{body}</small>
            </Link>
          ))}
        </div>
      </section>
      <section className="about-category-band" aria-label="EVO Sporting USA category coverage">
        <div>
          <p className="eyebrow">Training coverage</p>
          <h2>Organized by the room and the lift.</h2>
        </div>
        <div className="about-category-list">
          {categories.map((category) => (
            <Link href={`/collections/${category.slug}`} key={category.slug}>
              <span style={{ backgroundColor: category.accent }} aria-hidden="true" />
              <strong>{category.name}</strong>
              <small>{category.productCount} items</small>
            </Link>
          ))}
        </div>
      </section>
      <section className="comparison-band">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Contact EVO Sporting USA.</h2>
        </div>
        {contactDetails.map(([label, value]) => (
          <div className="comparison-item" key={label}>
            <strong>{label}</strong>
            <p>{value}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
