const LOW_STOCK_THRESHOLD = 10;

// Inventory-driven availability flag. Honest by construction: it reflects
// the real inventory count on each product, so "Low stock" / "Out of stock"
// only appear when the count actually drops.
export function StockFlag({ inventory }: { inventory: number }) {
  const state = inventory <= 0 ? "out" : inventory <= LOW_STOCK_THRESHOLD ? "low" : "in";
  const label = state === "out" ? "Out of stock" : state === "low" ? "Low stock" : "In stock";

  return (
    <span className={`stock-flag stock-flag-${state}`}>
      <span className="stock-flag-dot" aria-hidden="true" />
      {label}
    </span>
  );
}
