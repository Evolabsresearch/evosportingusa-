import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/catalog";
import { formatMoney } from "@/lib/format";
import { displaySpecValue, equipmentType } from "@/lib/product-merchandising";
import { AddToCartButton } from "./add-to-cart-button";
import { StockFlag } from "./stock-flag";

export function ProductCard({
  product,
  eagerImage = false,
}: {
  product: Product;
  eagerImage?: boolean;
}) {
  const displayName = product.name.replace(/^EVO\s+/, "");
  const materialLabel = displaySpecValue(product.material.split(",")[0] ?? product.category);

  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`} className="product-image-link">
        <span className="card-sale-badge">{product.category}</span>
        <span className="card-setup-badge">{equipmentType(product)}</span>
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
          className="product-image"
          loading={eagerImage ? "eager" : "lazy"}
          unoptimized
        />
      </Link>
      <div className="product-card-body">
        <div className="product-meta">
          <span className="category-kicker">{product.category}</span>
          <StockFlag inventory={product.inventory} />
        </div>
        <h2>
          <Link href={`/products/${product.slug}`}>{displayName}</Link>
        </h2>
        <p className="card-merch-note">{materialLabel}</p>
        <div className="price-row">
          <strong>{formatMoney(product.price)}</strong>
          {product.compareAt > product.price ? <span>{formatMoney(product.compareAt)}</span> : null}
        </div>
        <div className="product-actions">
          <AddToCartButton product={product} compact />
          <Link className="button button-soft button-compact" href={`/products/${product.slug}`}>
            View Item
          </Link>
        </div>
      </div>
    </article>
  );
}
