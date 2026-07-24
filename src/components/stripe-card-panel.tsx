"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { CreditCard, Lock } from "lucide-react";
import { formatMoney } from "@/lib/format";
import type { CartLine } from "@/lib/cart";

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

  if (!stripe) {
    return (
      <div className="payment-status-panel" role="status">
        <span>
          Card payment is being switched on. Please contact us and we&apos;ll complete your order.
        </span>
      </div>
    );
  }

  return (
    <Elements stripe={stripe}>
      <CardForm {...props} />
    </Elements>
  );
}
