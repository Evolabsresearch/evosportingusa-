"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { CreditCard, Lock, Mail } from "lucide-react";
import { site } from "@/data/site";
import { formatMoney } from "@/lib/format";
import { hydrateCart, type CartLine } from "@/lib/cart";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
let stripePromise: Promise<Stripe | null> | null = null;
function getStripe() {
  if (!publishableKey) return null;
  if (!stripePromise) stripePromise = loadStripe(publishableKey);
  return stripePromise;
}

type Contact = Record<string, string | undefined>;

type Props = {
  lines: CartLine[];
  promo: string | null;
  contact: Contact | null;
  total: number;
};

const CARD_STYLE = {
  style: {
    base: {
      fontSize: "17px",
      color: "#111111",
      fontFamily: "inherit",
      "::placeholder": { color: "#9aa0a6" },
    },
    invalid: { color: "#e11d48", iconColor: "#e11d48" },
  },
};

function CardForm({ lines, promo, contact, total }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [sameBilling, setSameBilling] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!stripe || !elements || busy) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    setBusy(true);
    setError(null);

    try {
      // Server recomputes the amount from the catalog; we never send a price.
      const res = await fetch("/api/checkout/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines, promo, contact }),
      });
      const data = (await res.json().catch(() => ({}))) as { clientSecret?: string; error?: string };
      if (!res.ok || !data.clientSecret) {
        setError(data.error ?? "We could not start the payment. Please try again.");
        setBusy(false);
        return;
      }

      const name = [contact?.firstName, contact?.lastName].filter(Boolean).join(" ");
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card,
          billing_details: {
            ...(name ? { name } : {}),
            ...(contact?.email ? { email: contact.email } : {}),
            ...(contact?.phone ? { phone: contact.phone } : {}),
            ...(sameBilling && contact?.address
              ? {
                  address: {
                    line1: contact.address,
                    city: contact.city ?? undefined,
                    state: contact.state ?? undefined,
                    postal_code: contact.postalCode ?? undefined,
                    country: contact.country || "US",
                  },
                }
              : {}),
          },
        },
      });

      if (result.error) {
        setError(result.error.message ?? "Your card could not be charged.");
        setBusy(false);
        return;
      }

      const intent = result.paymentIntent;
      if (intent && (intent.status === "succeeded" || intent.status === "processing")) {
        router.push(`/checkout/confirmation?order=${intent.id}`);
        return;
      }
      setError("Payment did not complete. Please try again.");
      setBusy(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  return (
    <form className="pay-panel" onSubmit={handleSubmit}>
      <span className="pay-panel-tag">INSTANT · SECURE</span>

      <div className="pay-panel-head">
        <CreditCard size={20} aria-hidden="true" />
        <strong>Credit / Debit Card</strong>
        <span className="pay-brands">VISA · MC · AMEX · DISC</span>
      </div>

      <label className="pay-billing-toggle">
        <input
          type="checkbox"
          checked={sameBilling}
          onChange={(event) => setSameBilling(event.target.checked)}
        />
        <span>
          <strong>Billing address same as shipping</strong>
          <small>
            Uncheck this if the billing address on your card is different from where you&apos;re
            shipping — matching it helps your card go through.
          </small>
        </span>
      </label>

      <div className="pay-card-field">
        <CardElement options={CARD_STYLE} />
      </div>
      <p className="pay-accepted">Visa, Mastercard, American Express &amp; Discover accepted.</p>

      {error ? (
        <p className="pay-error" role="alert">
          {error}
        </p>
      ) : null}

      <button className="button button-dark full-width pay-button" type="submit" disabled={!stripe || busy}>
        <Lock size={18} aria-hidden="true" />
        {busy ? "Processing…" : `Pay ${formatMoney(total)}`}
      </button>
    </form>
  );
}

export function StripeCardPanel(props: Props) {
  const stripe = getStripe();

  // No Stripe keys configured yet -> keep a working order path by email so the
  // checkout is never a dead end. Adding the keys switches the card panel on.
  if (!stripe) {
    const details = hydrateCart(props.lines);
    const contact = props.contact;
    const mailBody = [
      `New order request from ${site.name}`,
      "",
      "Items:",
      details.map((d) => `- ${d.quantity} x ${d.product.name} (${formatMoney(d.lineTotal)})`).join("\n") ||
        "(cart contents)",
      "",
      `Total: ${formatMoney(props.total)}`,
      "",
      "Ship to:",
      [
        [contact?.firstName, contact?.lastName].filter(Boolean).join(" "),
        contact?.address,
        [contact?.city, contact?.state, contact?.postalCode].filter(Boolean).join(", "),
        contact?.country,
        contact?.phone ? `Phone: ${contact.phone}` : "",
      ]
        .filter(Boolean)
        .join("\n") || "(shipping details)",
      "",
      contact?.email ? `Contact email: ${contact.email}` : "",
    ]
      .filter((row) => row !== "")
      .join("\n");
    const mailto = `mailto:${site.supportEmail}?subject=${encodeURIComponent(
      `Order request - ${site.name}`,
    )}&body=${encodeURIComponent(mailBody)}`;

    return (
      <div className="pay-panel">
        <div className="pay-panel-head">
          <Mail size={20} aria-hidden="true" />
          <strong>Order by email</strong>
        </div>
        <p className="pay-accepted">
          Card payment is being switched on. Send us your order and our team will reply to confirm
          availability and complete it. Nothing is charged now.
        </p>
        <a className="button button-dark full-width pay-button" href={mailto}>
          <Mail size={18} aria-hidden="true" />
          Email my order to {site.name}
        </a>
      </div>
    );
  }

  return (
    <Elements stripe={stripe}>
      <CardForm {...props} />
    </Elements>
  );
}
