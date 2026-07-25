// Accepted discount codes -> discount rate (fraction off the eligible subtotal).
// Add or remove codes here; everything (client display, applied discount, and
// the server-side Stripe charge amount) reads from this one map.
export const promoCodes: Record<string, number> = {
  EVO20: 0.2,
  JOSH40: 0.4,
};

// The publicly advertised code (shown in hero/newsletter/panel copy).
export const promoCode = "EVO20";
export const promoRate = promoCodes[promoCode];

export const promoStorageKey = "evo-sporting-usa-promo-code";
export const promoChangeEvent = "evo-sporting-usa-promo-change";

export function normalizePromoCode(code: string | null | undefined) {
  return String(code ?? "")
    .trim()
    .replace(/\s+/g, "")
    .toUpperCase();
}

/** Discount rate for a code (0 if the code is not valid). */
export function promoRateFor(code: string | null | undefined) {
  return promoCodes[normalizePromoCode(code)] ?? 0;
}

/** True if the code is one we accept. */
export function isValidPromoCode(code: string | null | undefined) {
  return promoRateFor(code) > 0;
}

// Back-compat alias — existing call sites use this name to mean "is a valid code".
export function isEVOPromoCode(code: string | null | undefined) {
  return isValidPromoCode(code);
}

export function promoDiscount(subtotal: number, code: string | null | undefined) {
  const rate = promoRateFor(code);
  if (rate <= 0 || subtotal <= 0) return 0;
  return Math.round(subtotal * rate * 100) / 100;
}
