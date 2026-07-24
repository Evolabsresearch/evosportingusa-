"use client";

import { FormEvent, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { CreditCard, Lock } from "lucide-react";
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

/** Shared panel chrome so the live and preview states look identical. */
function PanelBody({
  cardField,
  action,
  note,
  error,
}: {
  cardField: ReactNode;
  action: ReactNode;
  note?: ReactNode;
  error?: string | null;
}) {
  const [sameBilling, setSameBilling] = useState(true);
  return (
    <>
      <span className="pay-panel-tag">INSTANT · SECURE</span>

      <div className="pay-panel-head">
        <CreditCard size={20} aria-hidden="true" />
        <strong>Credit / Debit Card</strong>
        <span className="pay-brands">VISA · MC · AMEX · DISC</span>
      </div>

      <label className="pay-billing-toggle">
        <input
          type="checkbox"
          name="sameBilling"
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

      <div className="pay-card-field">{cardField}</div>
      <p className="pay-accepted">Visa, Mastercard, American Express &amp; Discover accepted.</p>

      {error ? (
        <p className="pay-error" role="alert">
          {error}
        </p>
      ) : null}

      {action}
      {note}
    </>
  );
}

function CardForm({ lines, promo, contact, total }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stripe || !elements || busy) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    const sameBilling =
      (event.currentTarget.elements.namedItem("sameBilling") as HTMLInputElement | null)?.checked ??
      true;

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
      <PanelBody
        error={error}
        cardField={<CardElement options={CARD_STYLE} />}
        action={
          <button
            className="button button-dark full-width pay-button"
            type="submit"
            disabled={!stripe || busy}
          >
            <Lock size={18} aria-hidden="true" />
            {busy ? "Processing…" : `Pay ${formatMoney(total)}`}
          </button>
        }
      />
    </form>
  );
}

function formatCardNumber(value: string) {
  return value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
}

/**
 * Typeable card row used before Stripe keys exist. Purely local UI state —
 * these values are never submitted, stored, or sent anywhere. Once the keys
 * are set, Stripe's real CardElement replaces this entirely.
 */
function PreviewCardInputs() {
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  return (
    <div className="pay-card-inputs">
      <input
        className="pay-card-number"
        inputMode="numeric"
        autoComplete="off"
        aria-label="Card number"
        placeholder="1234 1234 1234 1234"
        value={number}
        onChange={(event) => setNumber(formatCardNumber(event.target.value))}
      />
      <input
        className="pay-card-exp"
        inputMode="numeric"
        autoComplete="off"
        aria-label="Expiry"
        placeholder="MM / YY"
        value={expiry}
        onChange={(event) => setExpiry(formatExpiry(event.target.value))}
      />
      <input
        className="pay-card-cvc"
        inputMode="numeric"
        autoComplete="off"
        aria-label="CVC"
        placeholder="CVC"
        value={cvc}
        onChange={(event) => setCvc(event.target.value.replace(/\D/g, "").slice(0, 4))}
      />
    </div>
  );
}

/** Shown until Stripe keys are configured: same panel, typeable card field. */
function CardPanelPreview({ lines, contact, total }: Props) {
  const details = hydrateCart(lines);
  const mailBody = [
    `New order request from ${site.name}`,
    "",
    "Items:",
    details.map((d) => `- ${d.quantity} x ${d.product.name} (${formatMoney(d.lineTotal)})`).join("\n") ||
      "(cart contents)",
    "",
    `Total: ${formatMoney(total)}`,
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
      <PanelBody
        cardField={<PreviewCardInputs />}
        action={
          <button className="button button-dark full-width pay-button" type="button" disabled>
            <Lock size={18} aria-hidden="true" />
            Pay {formatMoney(total)}
          </button>
        }
        note={
          <p className="pay-note">
            Card payment is being switched on. In the meantime you can{" "}
            <a href={mailto}>email your order</a> and our team will complete it.
          </p>
        }
      />
    </div>
  );
}

export function StripeCardPanel(props: Props) {
  const stripe = getStripe();
  if (!stripe) return <CardPanelPreview {...props} />;

  return (
    <Elements stripe={stripe}>
      <CardForm {...props} />
    </Elements>
  );
}
