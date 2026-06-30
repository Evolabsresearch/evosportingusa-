import { CartPageClient } from "@/components/cart-page-client";

export const metadata = {
  title: "Cart",
  description: "Check quantities, add-ons, delivery, and discounts before checkout.",
};

export default function CartPage() {
  return <CartPageClient />;
}
