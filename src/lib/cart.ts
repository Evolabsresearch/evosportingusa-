import { products, type Product } from "@/data/catalog";
import { site } from "@/data/site";

export type CartLine = {
  slug: string;
  quantity: number;
};

export type CartLineDetail = CartLine & {
  product: Product;
  lineTotal: number;
};

export function hydrateCart(lines: CartLine[]): CartLineDetail[] {
  return lines
    .map((line) => {
      const product = products.find((item) => item.slug === line.slug);
      if (!product || line.quantity < 1) return null;
      return {
        ...line,
        product,
        lineTotal: product.price * line.quantity,
      };
    })
    .filter(Boolean) as CartLineDetail[];
}

export function cartSubtotal(lines: CartLine[]) {
  return hydrateCart(lines).reduce((sum, line) => sum + line.lineTotal, 0);
}

export function shippingCost(subtotal: number) {
  return subtotal > 0 ? site.standardShippingPrice : 0;
}

export function shippingRateSummary(subtotal: number) {
  return {
    shipping: shippingCost(subtotal),
    message:
      subtotal > 0
        ? "Flat Standard Shipping. No Order Minimum."
        : "Add gear to see delivery in the total.",
  };
}

export function suggestedAddOns(lines: CartLine[], limit = 4) {
  const current = new Set(lines.map((line) => line.slug));
  const subtotal = cartSubtotal(lines);
  const targetPrice = subtotal < 75 ? 65 : subtotal < 125 ? 45 : 35;

  return products
    .filter((product) => !current.has(product.slug))
    .filter((product) => {
      if (subtotal < 75) return product.price >= 20 && product.price <= 120;
      if (subtotal < 125) return product.price >= 15 && product.price <= 90;
      return product.price >= 20 && product.price <= 70;
    })
    .sort((a, b) => Math.abs(a.price - targetPrice) - Math.abs(b.price - targetPrice))
    .slice(0, limit);
}
