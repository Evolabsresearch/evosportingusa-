"use client";

import { useEffect } from "react";
import { promoChangeEvent, promoStorageKey } from "@/lib/promo";
import { useCart } from "./cart-provider";

/**
 * Clears the cart (and the applied promo + stored checkout contact) once the
 * order is confirmed. Uses the cart context's clearCart so the in-memory state
 * and localStorage stay consistent (clearing localStorage directly would race
 * the provider's hydrate-then-persist effect and the cart could reappear).
 */
export function ClearCartOnConfirmation() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    try {
      window.localStorage.removeItem(promoStorageKey);
      window.localStorage.removeItem("evo-checkout-contact");
      window.dispatchEvent(new Event(promoChangeEvent));
    } catch {
      /* localStorage unavailable — non-fatal */
    }
  }, [clearCart]);

  return null;
}
