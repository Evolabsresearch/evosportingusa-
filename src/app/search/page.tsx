import Link from "next/link";
import { Dumbbell, PackageCheck, Search, ShieldCheck, Tag } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { categories, products } from "@/data/catalog";

export const metadata = {
  title: "Search",
  description: "Search EVO Sporting USA gym equipment, bundles, supports, bars, plates, and accessories.",
};

function searchText(product: (typeof products)[number]) {
  return [
    product.name,
    product.sku,
    product.category,
    product.shortDescription,
    product.description,
    product.material,
    ...product.badges,
    ...product.features,
    ...Object.values(product.specs),
  ]
    .join(" ")
    .toLowerCase();
}

function searchProducts(query: string) {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .map((term) => term.trim())
    .filter(Boolean);

  if (!terms.length) return products.slice(0, 12);

  return products.filter((product) => {
    const haystack = searchText(product);
    return terms.every((term) => haystack.includes(term));
  });
}

const commonSearches = [
  ["Deadlift Bundle", "deadlift bundle"],
  ["Wrist Wraps", "wrist wrap"],
  ["Hex Dumbbells", "hex dumbbell"],
  ["Olympic Collars", "collar"],
  ["Bench Station", "bench"],
] as const;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = searchProducts(query);

  return (
    <main className="page-shell">
      <section className="page-hero compact">
        <p className="eyebrow">Search</p>
        <h1>Find the right training gear.</h1>
        <p>
          Search by item, training use, material, category, or what belongs in the same setup.
        </p>
      </section>
      <form className="search-panel" action="/search">
        <label>
          Gear search
          <div className="search-input-row">
            <input
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Try deadlift straps, dumbbells, bench, chalk..."
            />
            <button className="button button-dark" type="submit">
              <Search size={18} aria-hidden="true" />
              Search
            </button>
          </div>
        </label>
      </form>
      <section className="search-assist-grid" aria-label="Catalog search help">
        <article>
          <Tag size={22} aria-hidden="true" />
          <p className="eyebrow">Common searches</p>
          <h2>Start with the lift, item, or room zone.</h2>
          <div className="search-chip-row">
            {commonSearches.map(([label, searchQuery]) => (
              <Link href={`/search?q=${encodeURIComponent(searchQuery)}`} key={searchQuery}>
                {label}
              </Link>
            ))}
          </div>
        </article>
        <article>
          <PackageCheck size={22} aria-hidden="true" />
          <p className="eyebrow">Search tips</p>
          <h2>Use the words a lifter would use in the room.</h2>
          <dl>
            <div>
              <dt>For heavy pulls</dt>
              <dd>Strap, Belt, Chalk, Collar, Deadlift</dd>
            </div>
            <div>
              <dt>For pressing</dt>
              <dd>Bench, Wrap, Bar, Plate, Rack</dd>
            </div>
            <div>
              <dt>For small spaces</dt>
              <dd>Dumbbell, Band, Roller, Pull-Up</dd>
            </div>
          </dl>
        </article>
        <article>
          <Dumbbell size={22} aria-hidden="true" />
          <p className="eyebrow">Browse aisles</p>
          <h2>Jump to a section when the search term is broad.</h2>
          <div className="search-category-row">
            {categories.slice(0, 6).map((category) => (
              <Link href={`/collections/${category.slug}`} key={category.slug}>
                {category.name}
              </Link>
            ))}
          </div>
        </article>
      </section>
      <section className="section-heading in-page">
        <p className="eyebrow">{query ? "Results" : "Starter picks"}</p>
        <h2>{query ? `${results.length} matches for "${query}"` : "Popular catalog matches"}</h2>
      </section>
      {results.length ? (
        <ProductGrid products={results} eagerImages />
      ) : (
        <section className="empty-state">
          <ShieldCheck size={24} aria-hidden="true" />
          <h2>No matching gear found.</h2>
          <p>
            Try a broader equipment type such as straps, dumbbell, bench, plate, bar, or bundle.
            For product questions, tell us the item name or the lift you are shopping for.
          </p>
          <div className="empty-state-actions">
            <Link className="button button-dark" href="/collections">
              Browse sections
            </Link>
            <Link className="button button-soft" href="/support/contact">
              Ask us
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
