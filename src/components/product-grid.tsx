import type { Product } from "@/data/catalog";
import { ProductCard } from "./product-card";

export function ProductGrid({
  products,
  eagerImages = false,
}: {
  products: Product[];
  eagerImages?: boolean;
}) {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard
          product={product}
          eagerImage={eagerImages || index < 12}
          key={product.slug}
        />
      ))}
    </div>
  );
}
