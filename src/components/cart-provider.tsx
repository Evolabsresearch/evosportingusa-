"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/catalog";
import { cartSubtotal, hydrateCart, type CartLine } from "@/lib/cart";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  details: ReturnType<typeof hydrateCart>;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "evo-sporting-usa-cart";

function readStoredCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((line) => ({
        slug: String(line.slug ?? ""),
        quantity: Number(line.quantity ?? 0),
      }))
      .filter((line) => line.slug && line.quantity > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setLines(readStoredCart());
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify(lines));
  }, [hydrated, lines]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setLines((current) => {
      const existing = current.find((line) => line.slug === product.slug);
      if (existing) {
        return current.map((line) =>
          line.slug === product.slug
            ? { ...line, quantity: Math.min(99, line.quantity + quantity) }
            : line,
        );
      }
      return [...current, { slug: product.slug, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    setLines((current) =>
      current
        .map((line) =>
          line.slug === slug ? { ...line, quantity: Math.min(99, quantity) } : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    setLines((current) => current.filter((line) => line.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const value = useMemo(() => {
    const details = hydrateCart(lines);
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: cartSubtotal(lines),
      details,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [addItem, clearCart, lines, removeItem, updateQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
