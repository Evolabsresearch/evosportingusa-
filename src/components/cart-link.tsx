"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./cart-provider";

export function CartLink() {
  const { count } = useCart();

  return (
    <Link className="icon-button cart-link" href="/cart" aria-label={`Cart with ${count} items`}>
      <ShoppingCart size={20} aria-hidden="true" />
      <span>{count}</span>
    </Link>
  );
}
