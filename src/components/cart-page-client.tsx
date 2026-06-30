"use client";

import Image from "next/image";
import Link from "next/link";
import { Lock, Minus, PackageCheck, Plus, ShieldCheck, Trash2, Truck } from "lucide-react";
import { shippingCost, suggestedAddOns } from "@/lib/cart";
import { formatMoney } from "@/lib/format";
import { displaySpecValue } from "@/lib/product-merchandising";
import { site } from "@/data/site";
import { AddToCartButton } from "./add-to-cart-button";
import { Breadcrumbs } from "./breadcrumbs";
import { PromoCodePanel } from "./promo-code-panel";
import { ShippingRateNotice } from "./shipping-rate-notice";
import { useCart } from "./cart-provider";
import { usePromoCode } from "./use-promo-code";

export function CartPageClient() {
  const { details, lines, subtotal, updateQuantity, removeItem } = useCart();
  const { discount } = usePromoCode(subtotal);
  const addOns = suggestedAddOns(lines, 4);
  const shipping = shippingCost(subtotal);
  const estimatedTotal = Math.max(0, subtotal - discount) + shipping;
  const itemCount = details.reduce((sum, line) => sum + line.quantity, 0);
  const emptyCartStarts = [
    ["/collections/lifting-supports", "Pull-Day Support", "Belts, wraps, sleeves, and bracing pieces for heavy sessions."],
    ["/collections/bundles", "Training Bundles", "Grouped gear when you want the main pieces listed on one product page."],
    ["/collections/benches-racks", "Bench and Rack Station", "Larger pieces where footprint, cartons, and delivery notes matter."],
  ] as const;

  if (!details.length) {
    return (
      <main className="page-shell">
        <section className="empty-state">
          <p className="eyebrow">Cart</p>
          <h1>Your training bag is empty.</h1>
          <p>Start with a bundle, a support item, or the next piece for the rack.</p>
          <div className="empty-cart-actions">
            <Link className="button button-dark" href="/collections">
              Shop Gear
            </Link>
            <Link className="button button-soft" href="/collections/bundles">
              Shop Bundles
            </Link>
          </div>
          <div className="empty-cart-facts" aria-label="Cart store facts">
            <span>
              <Truck size={16} aria-hidden="true" />
              {formatMoney(site.standardShippingPrice)} Standard Shipping
            </span>
            <span>
              <ShieldCheck size={16} aria-hidden="true" />
              {site.returnWindowDays}-Day Returns
            </span>
            <span>
              <PackageCheck size={16} aria-hidden="true" />
              No Order Minimum
            </span>
          </div>
          <div className="empty-cart-starters" aria-label="Good places to start">
            <strong>Good Places to Start</strong>
            {emptyCartStarts.map(([href, label, body]) => (
              <Link href={href} key={href}>
                <span>{label}</span>
                <small>{body}</small>
              </Link>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell cart-layout">
      <section>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
        <p className="eyebrow">Cart</p>
        <h1>Review your gear.</h1>
        <div className="cart-lines">
          {details.map((line) => (
            <article className="cart-line" key={line.slug}>
              <Image src={line.product.image} alt={line.product.name} width={132} height={132} unoptimized />
              <div>
                <Link href={`/products/${line.product.slug}`}>{line.product.name}</Link>
                <span>{line.product.sku}</span>
                <strong>{formatMoney(line.product.price)}</strong>
                <small className="cart-line-detail">
                  Includes: {displaySpecValue(line.product.specs["What ships"])}.
                </small>
              </div>
              <div className="quantity-control" aria-label={`Quantity for ${line.product.name}`}>
                <button
                  type="button"
                  onClick={() => updateQuantity(line.slug, line.quantity - 1)}
                  aria-label={`Decrease quantity for ${line.product.name}`}
                >
                  <Minus size={16} aria-hidden="true" />
                </button>
                <span aria-live="polite">{line.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(line.slug, line.quantity + 1)}
                  aria-label={`Increase quantity for ${line.product.name}`}
                >
                  <Plus size={16} aria-hidden="true" />
                </button>
              </div>
              <button
                className="icon-button"
                type="button"
                onClick={() => removeItem(line.slug)}
                aria-label={`Remove ${line.product.name}`}
              >
                <Trash2 size={18} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
        <Link className="cart-continue" href="/collections">
          ← Continue shopping
        </Link>
      </section>

      <aside className="checkout-summary">
        <ShippingRateNotice subtotal={subtotal} />
        <div className="summary-block" aria-label="Order summary">
          <h2>Order summary</h2>
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
          <Link className="button button-dark full-width" href="/checkout">
            Checkout
          </Link>
          <p className="summary-secure">
            <Lock size={14} aria-hidden="true" />
            Secure checkout · {site.returnWindowDays}-day returns
          </p>
        </div>
      </aside>

      <section className="cart-add-on-market" aria-label="Recommended gear for this cart">
        <div className="cart-add-on-copy">
          <span>
            <Truck size={15} aria-hidden="true" />
            Recommended Gear
          </span>
          <h2>Round out the setup with small pieces that fit the cart.</h2>
          <p>
            These are the smaller pieces lifters often add around this cart: wraps, chalk,
            collars, straps, bands, and care tools.
          </p>
        </div>
        <div className="cart-add-on-grid">
          {addOns.map((product) => (
            <article className="cart-add-on-card" key={product.slug}>
              <Image src={product.image} alt={product.name} width={210} height={210} unoptimized />
              <div>
                <small>{product.category}</small>
                <Link href={`/products/${product.slug}`}>{product.name}</Link>
                <span>{formatMoney(product.price)}</span>
              </div>
              <AddToCartButton product={product} compact />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
