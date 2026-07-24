import { NextResponse } from "next/server";
import Stripe from "stripe";
import { site } from "@/data/site";
import { cartSubtotal, hydrateCart, shippingCost, type CartLine } from "@/lib/cart";
import { promoDiscount } from "@/lib/promo";

export const runtime = "nodejs";

// SECURITY: the charge amount is recomputed here from the static catalog.
// We only accept {slug, quantity} from the browser — never a price or total —
// so a tampered request cannot change what the customer is charged.
export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Card payment is not configured yet. Please contact us to place your order." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const payload = (body ?? {}) as {
    lines?: { slug?: unknown; quantity?: unknown }[];
    promo?: unknown;
    contact?: Record<string, unknown>;
  };

  const lines: CartLine[] = (Array.isArray(payload.lines) ? payload.lines : [])
    .map((line) => ({
      slug: String(line?.slug ?? ""),
      quantity: Math.min(99, Math.max(0, Math.floor(Number(line?.quantity) || 0))),
    }))
    .filter((line) => line.slug !== "" && line.quantity > 0);

  const details = hydrateCart(lines); // unknown slugs are dropped
  if (details.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const subtotal = cartSubtotal(lines);
  const discount = promoDiscount(subtotal, typeof payload.promo === "string" ? payload.promo : null);
  const shipping = shippingCost(subtotal);
  const total = Math.max(0, subtotal - discount) + shipping;
  const amount = Math.round(total * 100);

  if (amount < 50) {
    return NextResponse.json({ error: "Order total is below the minimum charge." }, { status: 400 });
  }

  const contact = (payload.contact ?? {}) as Record<string, string | undefined>;
  const str = (v: unknown, max = 200) => String(v ?? "").trim().slice(0, max);
  const email = str(contact.email, 200);
  const shipTo = [
    [contact.firstName, contact.lastName].filter(Boolean).join(" "),
    contact.address,
    [contact.city, contact.state, contact.postalCode].filter(Boolean).join(", "),
    contact.country,
  ]
    .filter(Boolean)
    .join(" | ")
    .slice(0, 480);

  try {
    const stripe = new Stripe(secret);
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      description: `${site.name} order`,
      ...(email.includes("@") ? { receipt_email: email } : {}),
      metadata: {
        items: details.map((d) => `${d.quantity}x ${d.product.sku}`).join(", ").slice(0, 480),
        ship_to: shipTo,
        email,
        phone: str(contact.phone, 40),
        subtotal: subtotal.toFixed(2),
        discount: discount.toFixed(2),
        shipping: shipping.toFixed(2),
        total: total.toFixed(2),
      },
    });

    return NextResponse.json({ clientSecret: intent.client_secret, amount, total });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment could not be started.";
    console.error("create-payment-intent failed:", message);
    return NextResponse.json({ error: "We could not start the payment. Please try again." }, { status: 502 });
  }
}
