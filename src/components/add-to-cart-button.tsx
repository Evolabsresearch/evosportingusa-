"use client";

import { useState } from "react";
import { Check, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/catalog";
import { useCart } from "./cart-provider";

export function AddToCartButton({
  product,
  quantity = 1,
  compact = false,
}: {
  product: Product;
  quantity?: number;
  compact?: boolean;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      className={compact ? "button button-dark button-compact" : "button button-dark"}
      type="button"
      onClick={() => {
        addItem(product, quantity);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1300);
      }}
    >
      {added ? <Check size={18} aria-hidden="true" /> : compact ? <Plus size={18} aria-hidden="true" /> : <ShoppingBag size={18} aria-hidden="true" />}
      <span>{added ? "Added" : compact ? "Add" : "Add to Cart"}</span>
    </button>
  );
}
