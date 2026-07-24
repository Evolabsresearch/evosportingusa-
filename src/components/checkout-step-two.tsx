"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { site } from "@/data/site";
import { shippingCost } from "@/lib/cart";
import { formatMoney } from "@/lib/format";
import { PromoCodePanel } from "./promo-code-panel";
import { ShippingRateNotice } from "./shipping-rate-notice";
import { StripeCardPanel } from "./stripe-card-panel";
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
  const { subtotal, details, lines } = useCart();
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

        <div className="payment-card-host">
          {cartEmpty ? (
            <div className="payment-status-panel" role="status">
              <span>
                Your cart is empty.{" "}
                <Link href="/collections">Browse the catalog</Link> to add gear.
              </span>
            </div>
          ) : (
            <StripeCardPanel
              lines={lines}
              promo={code ?? null}
              contact={contact}
              total={total}
            />
          )}
        </div>

        <p className="checkout-consent-note">
          By paying you agree to our <Link href="/policies/shipping-policy">shipping</Link>,{" "}
          <Link href="/policies/refund-policy">refund</Link>, and{" "}
          <Link href="/policies/payment-and-billing">payment</Link> terms.
        </p>

        <div className="compliance-strip">
          <span>
            <ShieldCheck size={15} aria-hidden="true" />
            SSL encrypted checkout
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
