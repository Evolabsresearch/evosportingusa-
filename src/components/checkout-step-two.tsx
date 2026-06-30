"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Mail, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { site } from "@/data/site";
import { shippingCost } from "@/lib/cart";
import { formatMoney } from "@/lib/format";
import { PromoCodePanel } from "./promo-code-panel";
import { ShippingRateNotice } from "./shipping-rate-notice";
import { useCart } from "./cart-provider";
import { usePromoCode } from "./use-promo-code";

type CheckoutContact = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

let cachedCheckoutContactRaw: string | null = null;
let cachedCheckoutContact: CheckoutContact | null = null;

function subscribeCheckoutContact() {
  return () => {};
}

function getStoredCheckoutContact() {
  const stored = window.localStorage.getItem("evo-checkout-contact");
  if (!stored) {
    cachedCheckoutContactRaw = null;
    cachedCheckoutContact = null;
    return null;
  }

  if (stored === cachedCheckoutContactRaw) return cachedCheckoutContact;

  try {
    cachedCheckoutContactRaw = stored;
    cachedCheckoutContact = JSON.parse(stored) as CheckoutContact;
    return cachedCheckoutContact;
  } catch {
    window.localStorage.removeItem("evo-checkout-contact");
    cachedCheckoutContactRaw = null;
    cachedCheckoutContact = null;
    return null;
  }
}

function getServerCheckoutContact() {
  return null;
}

export function CheckoutStepTwo() {
  const { subtotal, details } = useCart();
  const { code, discount } = usePromoCode(subtotal);
  const contact = useSyncExternalStore(
    subscribeCheckoutContact,
    getStoredCheckoutContact,
    getServerCheckoutContact,
  );
  const shipping = shippingCost(subtotal);
  const total = Math.max(0, subtotal - discount) + shipping;
  const itemCount = details.reduce((sum, line) => sum + line.quantity, 0);
  const fullName = [contact?.firstName, contact?.lastName].filter(Boolean).join(" ");
  const cityLine = [contact?.city, contact?.state, contact?.postalCode].filter(Boolean).join(", ");
  const countryLabel = contact?.country === "US" ? "United States" : contact?.country;
  const cartEmpty = details.length === 0;

  // Online card checkout is not wired yet (no payment gateway). Until it is,
  // the order goes out by email — we pre-fill a message with the cart contents
  // and the shipping details the shopper just entered. Nothing is charged here.
  const orderLines = details
    .map((line) => `- ${line.quantity} x ${line.product.name} (${formatMoney(line.lineTotal)})`)
    .join("\n");
  const shipToBlock = [
    fullName,
    contact?.address,
    cityLine,
    countryLabel,
    contact?.phone ? `Phone: ${contact.phone}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const mailBody = [
    `New order request from ${site.name}`,
    "",
    "Items:",
    orderLines || "(cart contents)",
    "",
    `Subtotal: ${formatMoney(subtotal)}`,
    `Shipping: ${formatMoney(shipping)}`,
    discount > 0 ? `Discount: -${formatMoney(discount)}` : "",
    `Total: ${formatMoney(total)}`,
    "",
    "Ship to:",
    shipToBlock || "(shipping details)",
    "",
    contact?.email ? `Contact email: ${contact.email}` : "",
  ]
    .filter((row) => row !== "")
    .join("\n");
  const mailto = `mailto:${site.supportEmail}?subject=${encodeURIComponent(
    `Order request - ${site.name}`,
  )}&body=${encodeURIComponent(mailBody)}`;

  return (
    <main className="page-shell checkout-layout">
      <section className="checkout-panel">
        <p className="eyebrow">Step 2 of 2</p>
        <h1>Review your order.</h1>

        <div className="checkout-review-grid" aria-label="Checkout review">
          <div>
            <span>Contact</span>
            <strong>{contact?.email || "Add contact details"}</strong>
            {contact?.phone ? <small>{contact.phone}</small> : null}
          </div>
          <div>
            <span>Ship to</span>
            <strong>{fullName || "Shipping name"}</strong>
            {contact?.address ? <small>{contact.address}</small> : null}
            {cityLine ? <small>{cityLine}</small> : null}
            {countryLabel ? <small>{countryLabel}</small> : null}
          </div>
          <Link className="checkout-review-edit" href="/checkout">
            Edit
          </Link>
        </div>

        <div className="payment-module">
          <Mail size={28} aria-hidden="true" />
          <div>
            <strong>Online checkout is launching soon</strong>
            <p>
              Card payment isn&apos;t enabled on the site yet. Send us your order
              and our team will reply to confirm availability and complete it.
              Nothing is charged now.
            </p>
          </div>
        </div>

        <div className="payment-card-host">
          {cartEmpty ? (
            <div className="payment-status-panel" role="status">
              <span>
                Your cart is empty.{" "}
                <Link href="/collections">Browse the catalog</Link> to add gear.
              </span>
            </div>
          ) : (
            <a className="button button-dark full-width" href={mailto}>
              <Mail size={18} aria-hidden="true" />
              Email my order to {site.name}
            </a>
          )}
        </div>

        <div className="compliance-strip">
          <span>
            <ShieldCheck size={15} aria-hidden="true" />
            No card charged on site
          </span>
          <span>
            <Truck size={15} aria-hidden="true" />
            US fulfillment network
          </span>
          <span>
            <RotateCcw size={15} aria-hidden="true" />
            {site.returnWindowDays}-day returns
          </span>
        </div>

        <Link className="checkout-continue" href="/checkout">
          ← Back to shipping
        </Link>
      </section>

      <aside className="checkout-summary">
        <ShippingRateNotice subtotal={subtotal} />
        <div className="summary-block" aria-label="Order total">
          <h2>Order total</h2>
          {details.length ? (
            <div className="summary-items">
              {details.map((line) => (
                <div key={line.slug}>
                  <span>
                    {line.quantity} × {line.product.name.replace(/^EVO\s+/, "")}
                  </span>
                  <strong>{formatMoney(line.lineTotal)}</strong>
                </div>
              ))}
            </div>
          ) : null}
          <dl>
            <div>
              <dt>Items</dt>
              <dd>{itemCount}</dd>
            </div>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatMoney(subtotal)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>{formatMoney(shipping)}</dd>
            </div>
            {discount > 0 ? (
              <div className="is-discount">
                <dt>Discount ({code || "EVO20"})</dt>
                <dd>-{formatMoney(discount)}</dd>
              </div>
            ) : null}
            <div className="summary-total">
              <dt>Total</dt>
              <dd>{formatMoney(total)}</dd>
            </div>
          </dl>
          <PromoCodePanel subtotal={subtotal} />
        </div>
      </aside>
    </main>
  );
}
