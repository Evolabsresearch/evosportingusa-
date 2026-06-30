"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { promoCode } from "@/lib/promo";
import { site } from "@/data/site";
import { storePromoCode } from "./use-promo-code";

// No email backend yet — on submit we store the promo code client-side (so it
// auto-applies at checkout) and offer a mailto to actually join the list.
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [claimed, setClaimed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    storePromoCode(promoCode);
    setClaimed(true);
  }

  if (claimed) {
    const mailto = `mailto:${site.supportEmail}?subject=${encodeURIComponent(
      "Newsletter signup",
    )}&body=${encodeURIComponent(`Please add ${email} to the ${site.name} list.`)}`;
    return (
      <div className="home-newsletter-form" role="status">
        <p>
          <CheckCircle2 size={16} aria-hidden="true" /> Your code <strong>{promoCode}</strong> is
          saved and applies at checkout.
        </p>
        <small>
          Want restock alerts too? <a href={mailto}>Confirm your subscription by email</a>.
        </small>
      </div>
    );
  }

  return (
    <form className="home-newsletter-form" onSubmit={handleSubmit}>
      <label>
        Email address
        <div>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit" className="button button-dark">
            Get 20% Off
          </button>
        </div>
      </label>
      <small>
        By subscribing you agree to receive marketing emails. Read our{" "}
        <Link href="/policies/privacy-policy">privacy notice</Link>.
      </small>
    </form>
  );
}
