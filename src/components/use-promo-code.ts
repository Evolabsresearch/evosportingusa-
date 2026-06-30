"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  isEVOPromoCode,
  normalizePromoCode,
  promoChangeEvent,
  promoDiscount,
  promoStorageKey,
} from "@/lib/promo";

function readPromoCode() {
  return window.localStorage.getItem(promoStorageKey) ?? "";
}

function readServerPromoCode() {
  return "";
}

function emitPromoChange() {
  window.dispatchEvent(new Event(promoChangeEvent));
}

function subscribePromoCode(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(promoChangeEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(promoChangeEvent, callback);
  };
}

export function storePromoCode(code: string) {
  const normalized = normalizePromoCode(code);
  if (normalized) {
    window.localStorage.setItem(promoStorageKey, normalized);
  } else {
    window.localStorage.removeItem(promoStorageKey);
  }
  emitPromoChange();
}

export function usePromoCode(subtotal: number) {
  const storedCode = useSyncExternalStore(
    subscribePromoCode,
    readPromoCode,
    readServerPromoCode,
  );
  const code = normalizePromoCode(storedCode);
  const isApplied = isEVOPromoCode(code);
  const discount = promoDiscount(subtotal, code);

  const applyPromoCode = useCallback((nextCode: string) => {
    const normalized = normalizePromoCode(nextCode);
    if (!isEVOPromoCode(normalized)) return false;
    storePromoCode(normalized);
    return true;
  }, []);

  const clearPromoCode = useCallback(() => {
    storePromoCode("");
  }, []);

  return {
    code,
    isApplied,
    discount,
    applyPromoCode,
    clearPromoCode,
  };
}
