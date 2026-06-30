"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, MailCheck } from "lucide-react";
import { site } from "@/data/site";
import { shippingCost } from "@/lib/cart";
import { formatMoney } from "@/lib/format";
import { PromoCodePanel } from "./promo-code-panel";
import { ShippingRateNotice } from "./shipping-rate-notice";
import { useCart } from "./cart-provider";
import { usePromoCode } from "./use-promo-code";

export function CheckoutStepOne() {
  const router = useRouter();
  const { subtotal, details } = useCart();
  const { discount } = usePromoCode(subtotal);
  const shipping = shippingCost(subtotal);
  const itemCount = details.reduce((sum, line) => sum + line.quantity, 0);
  const estimatedTotal = Math.max(0, subtotal - discount) + shipping;

  return (
    <main className="page-shell checkout-layout">
      <section className="checkout-panel">
        <p className="eyebrow">Step 1 of 2</p>
        <h1>Contact and delivery.</h1>
        <form
          className="checkout-form"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            window.localStorage.setItem(
              "evo-checkout-contact",
              JSON.stringify(Object.fromEntries(formData.entries())),
            );
            router.push("/checkout/payment");
          }}
        >
          <div className="form-grid two">
            <label>
              Email
              <input required type="email" name="email" autoComplete="email" placeholder="buyer@example.com" />
            </label>
            <label>
              Phone
              <input required type="tel" name="phone" autoComplete="tel" placeholder="555-010-0123" />
            </label>
          </div>
          <div className="form-grid two">
            <label>
              First name
              <input required name="firstName" autoComplete="given-name" />
            </label>
            <label>
              Last name
              <input required name="lastName" autoComplete="family-name" />
            </label>
          </div>
          <label>
            Address
            <input required name="address" autoComplete="street-address" />
          </label>
          <div className="form-grid three">
            <label>
              City
              <input required name="city" autoComplete="address-level2" />
            </label>
            <label>
              State
              <input required name="state" autoComplete="address-level1" />
            </label>
            <label>
              ZIP
              <input required name="postalCode" autoComplete="postal-code" />
            </label>
          </div>
          <label>
            Country
            <select required name="country" defaultValue="US" autoComplete="country">
              <option value="US">United States</option>
            </select>
          </label>
          <div className="checkout-form-note" aria-label="Delivery note">
            <MailCheck size={18} aria-hidden="true" />
            <span>We will send order updates to the email entered here.</span>
          </div>
          <button className="button button-dark full-width" type="submit">
            <Lock size={18} aria-hidden="true" />
            Continue to review
          </button>
        </form>
        <div className="checkout-policy-links" aria-label="Checkout policy links">
          <Link href="/policies/shipping-policy">Shipping</Link>
          <Link href="/policies/refund-policy">Returns</Link>
          <Link href="/policies/privacy-policy">Privacy</Link>
          <Link href="/support/contact">Help</Link>
        </div>
      </section>

      <aside className="checkout-summary">
        <ShippingRateNotice subtotal={subtotal} />
        <div className="summary-block" aria-label="Order summary">
          <h2>Order summary</h2>
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
                <dt>Discount (EVO20)</dt>
                <dd>-{formatMoney(discount)}</dd>
              </div>
            ) : null}
            <div className="summary-total">
              <dt>Estimated total</dt>
              <dd>{formatMoney(estimatedTotal)}</dd>
            </div>
          </dl>
          <PromoCodePanel subtotal={subtotal} />
          <p className="summary-secure">
            <Lock size={14} aria-hidden="true" />
            Secure checkout · {site.returnWindowDays}-day returns
          </p>
        </div>
      </aside>
    </main>
  );
}
