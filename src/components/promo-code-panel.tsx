"use client";

import { FormEvent, useId, useState } from "react";
import { CheckCircle2, Percent, X } from "lucide-react";
import { formatMoney } from "@/lib/format";
import { promoCode } from "@/lib/promo";
import { usePromoCode } from "./use-promo-code";

type PromoCodePanelProps = {
  subtotal: number;
  className?: string;
};

export function PromoCodePanel({ subtotal, className = "" }: PromoCodePanelProps) {
  const inputId = useId();
  const [entry, setEntry] = useState("");
  const [hasEditedEntry, setHasEditedEntry] = useState(false);
  const [message, setMessage] = useState<"idle" | "applied" | "invalid">("idle");
  const { code, isApplied, discount, applyPromoCode, clearPromoCode } = usePromoCode(subtotal);
  const displayedEntry = hasEditedEntry ? entry : code;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const didApply = applyPromoCode(displayedEntry);
    setMessage(didApply ? "applied" : "invalid");
    if (didApply) setHasEditedEntry(false);
  }

  return (
    <div className={`promo-code-panel ${className}`.trim()} aria-label="Discount code">
      <div className="promo-code-head">
        <span>
          <Percent size={16} aria-hidden="true" />
          Discount code
        </span>
        {isApplied ? (
          <button
            className="promo-code-clear"
            type="button"
            onClick={() => {
              clearPromoCode();
              setEntry("");
              setHasEditedEntry(false);
              setMessage("idle");
            }}
            aria-label={`Remove ${promoCode} discount code`}
          >
            <X size={15} aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <form className="promo-code-form" onSubmit={handleSubmit}>
        <label htmlFor={inputId}>Code</label>
        <input
          id={inputId}
          name="discountCode"
          value={displayedEntry}
          onChange={(event) => {
            setHasEditedEntry(true);
            setEntry(event.target.value);
          }}
          placeholder="EVO20"
          autoComplete="off"
        />
        <button className="button button-dark button-compact" type="submit">
          Apply
        </button>
      </form>
      {isApplied ? (
        <p className="promo-code-status is-applied" role="status">
          <CheckCircle2 size={16} aria-hidden="true" />
          {code} active: {formatMoney(discount)} off gear.
        </p>
      ) : message === "invalid" ? (
        <p className="promo-code-status" role="status">
          Enter {promoCode} for 20% off gear.
        </p>
      ) : (
        <p className="promo-code-status">Use {promoCode} for 20% off gear.</p>
      )}
    </div>
  );
}
