export const promoCode = "EVO20";
export const promoRate = 0.2;
export const promoStorageKey = "evo-sporting-usa-promo-code";
export const promoChangeEvent = "evo-sporting-usa-promo-change";

export function normalizePromoCode(code: string | null | undefined) {
  return String(code ?? "")
    .trim()
    .replace(/\s+/g, "")
    .toUpperCase();
}

export function isEVOPromoCode(code: string | null | undefined) {
  return normalizePromoCode(code) === promoCode;
}

export function promoDiscount(subtotal: number, code: string | null | undefined) {
  if (!isEVOPromoCode(code) || subtotal <= 0) return 0;
  return Math.round(subtotal * promoRate * 100) / 100;
}
