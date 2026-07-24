import Link from "next/link";
import {
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Mail,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { policies } from "@/data/policies";
import { site } from "@/data/site";
import { formatMoney } from "@/lib/format";

export const metadata = {
  title: "Merchant Details",
  description: "Seller name, policy pages, and store details for EVO Sporting USA.",
};

export default function MerchantDetailsPage() {
  const identityRows = [
    ["Legal name", site.legalName],
    ["Registration No.", site.registrationNumber],
    ["Store name", site.name],
    ["Domain", site.domain],
    ["Write to", site.supportEmail],
    ["Hours", site.hours],
    ...(site.supportPhone ? [["Phone", site.supportPhone]] : []),
    ...(site.businessAddress ? [["Business address", site.businessAddress]] : []),
  ];
  const readinessCards = [
    {
      icon: <Truck size={24} aria-hidden="true" />,
      title: "Delivery",
      body: `${formatMoney(site.standardShippingPrice)} flat standard rate with no order minimum. Larger gear can ship in more than one carton.`,
    },
    {
      icon: <ShieldCheck size={24} aria-hidden="true" />,
      title: "Policies",
      body: "Find shipping, returns, warranty, payment, privacy, terms, accessibility, and contact details here.",
    },
    {
      icon: <CreditCard size={24} aria-hidden="true" />,
      title: "Checkout",
      body: "Checkout collects contact and shipping details, then takes secure card payment through Stripe. Full card data never touches our servers.",
    },
    {
      icon: <PackageCheck size={24} aria-hidden="true" />,
      title: "Item pages",
      body: "Each product page covers item code, materials, care, warranty, included pieces, and related gear.",
    },
  ];
  const operatingRows = [
    ["Gear range", `${site.catalogSize} active SKUs across equipment, support gear, recovery, and bundles.`],
    ["Delivery", `${site.fulfillmentNote}; larger items can move in separate cartons.`],
    ["Return window", `${site.returnWindowDays} days for eligible unused gear.`],
    ["Warranty", `${site.warranty}; order number and photos help with a claim.`],
  ] as const;
  const checkoutRows = [
    ["Online payment", "Secure card payment via Stripe (Visa, Mastercard, Amex, Discover)."],
    ["Delivery", `${formatMoney(site.standardShippingPrice)} flat standard rate, no order minimum.`],
    ["Order updates", "Order and shipping updates use the checkout email."],
  ] as const;
  const verificationCards = [
    {
      label: "Seller",
      value: site.legalName,
      body: "Legal seller for orders placed on evosportingusa.com.",
    },
    {
      label: "Inbox",
      value: site.supportEmail,
      body: `Use it for order, return, warranty, and billing questions during ${site.hours}.`,
    },
    {
      label: "Policies",
      value: "Store policies",
      body: "Delivery, returns, warranty, payment, privacy, terms, accessibility, and contact details together.",
    },
    {
      label: "Delivery",
      value: `${formatMoney(site.standardShippingPrice)} standard rate`,
      body: "Flat rate in cart and checkout.",
    },
  ] as const;
  const serviceSteps = [
    {
      title: "Delivery questions",
      body: "Have the order number, checkout email, item type, and any carrier message ready.",
    },
    {
      title: "Returns",
      body: `Include item condition, packaging status, and where you are within the ${site.returnWindowDays}-day window.`,
    },
    {
      title: "Warranty",
      body: "Photos, SKU, storage notes, and issue timing help us understand what failed.",
    },
  ] as const;

  return (
    <main className="page-shell">
      <section className="support-hero">
        <div>
          <p className="eyebrow">Merchant details</p>
          <h1>Who sells and supports the gear.</h1>
          <p>
            EVO Sporting USA LLC is the seller for orders placed through evosportingusa.com.
            Use this page to match an order, charge, or policy to the store.
          </p>
          <div className="support-action-row">
            <Link className="button button-dark" href="/support/contact">
              <Mail size={18} aria-hidden="true" />
              Contact Us
            </Link>
            <Link className="button button-soft" href="/policies/contact-information">
              <MapPin size={18} aria-hidden="true" />
              Contact details
            </Link>
          </div>
        </div>
        <aside className="support-console" aria-label="Merchant identity">
          <span className="console-status">
            <CheckCircle2 size={16} aria-hidden="true" />
            Seller
          </span>
          <strong>{site.legalName}</strong>
          <p>{site.tagline}</p>
          <small>{site.supportEmail}</small>
          {site.supportPhone ? <small>{site.supportPhone}</small> : null}
          {site.businessAddress ? <small>{site.businessAddress}</small> : null}
        </aside>
      </section>

      <section className="merchant-verification-strip" aria-label="Seller details summary">
        {verificationCards.map((card) => (
          <article key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <p>{card.body}</p>
          </article>
        ))}
      </section>

      <section className="merchant-operations-grid" aria-label="Store operating details">
        <article>
          <Truck size={24} aria-hidden="true" />
          <p className="eyebrow">Store basics</p>
          <h2>Catalog, delivery, returns, and warranty.</h2>
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
          <CreditCard size={24} aria-hidden="true" />
          <p className="eyebrow">At checkout</p>
          <h2>Checkout and order email.</h2>
          <dl>
            {checkoutRows.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </article>
      </section>

      <section className="product-content-grid merchant-record-grid">
        <div>
          <p className="eyebrow">Identity</p>
          <h2>Seller details.</h2>
          <dl className="spec-list">
            {identityRows.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <p className="eyebrow">Policies</p>
          <h2>Store policies.</h2>
          <div className="merchant-policy-links">
            {policies.map((policy) => (
              <Link href={`/policies/${policy.slug}`} key={policy.slug}>
                <strong>{policy.title}</strong>
                <span>{policy.summary}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="merchant-service-board" aria-label="Order question notes">
        <div>
          <ClipboardCheck size={24} aria-hidden="true" />
          <p className="eyebrow">Order help</p>
          <h2>What helps with an order question.</h2>
          <p>
            Start with the order number and checkout email. Add item condition, carton notes,
            charge date, or photos when they explain the problem.
          </p>
        </div>
        <div className="merchant-service-steps">
          {serviceSteps.map((step) => (
            <article key={step.title}>
              <strong>{step.title}</strong>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="support-grid support-grid-orbit" aria-label="Store detail cards">
        {readinessCards.map((card) => (
          <div className="support-card" key={card.title}>
            {card.icon}
            <h2>{card.title}</h2>
            <p>{card.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
