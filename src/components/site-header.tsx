import Link from "next/link";
import { ChevronDown, LifeBuoy, MapPin, Package, Search } from "lucide-react";
import { categories } from "@/data/catalog";
import { BrandLogo } from "./brand-logo";
import { CartLink } from "./cart-link";
import { MobileNav } from "./mobile-nav";

type MegaGroup = {
  label: string;
  href: string;
  columns: string[];
};

function category(slug: string) {
  return categories.find((c) => c.slug === slug);
}

// Top-level mega-nav groups built from the real catalog categories.
const megaNav: MegaGroup[] = [
  { label: "Lifting", href: "/collections/lifting-supports", columns: ["lifting-supports", "straps-grips"] },
  {
    label: "Grip & Accessories",
    href: "/collections/chalk-grip-basics",
    columns: ["chalk-grip-basics", "gym-bag-essentials", "setup-mobility-minis"],
  },
  { label: "Weights", href: "/collections/dumbbells-weights", columns: ["dumbbells-weights", "plates-bars"] },
  { label: "Benches & Racks", href: "/collections/benches-racks", columns: ["benches-racks"] },
  {
    label: "Pull-Up & Conditioning",
    href: "/collections/pullup-mobility",
    columns: ["pullup-mobility", "conditioning", "storage-recovery"],
  },
];

const mobileGroups = megaNav.map((group) => ({
  label: group.label,
  href: group.href,
  items: group.columns.flatMap((slug) => {
    const cat = category(slug);
    return cat ? [{ name: cat.name, slug: cat.slug }] : [];
  }),
}));

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="utility-bar">
        <span className="utility-lead">
          <MapPin size={14} aria-hidden="true" />
          Shipped by US fulfillment partners
        </span>
        <nav className="utility-links" aria-label="Utility">
          <Link href="/track-order">
            <Package size={14} aria-hidden="true" />
            Track order
          </Link>
          <Link href="/support">
            <LifeBuoy size={14} aria-hidden="true" />
            Help
          </Link>
          <Link href="/collections/bundles">Bundles</Link>
        </nav>
      </div>

      <div className="header-main">
        <MobileNav groups={mobileGroups} />
        <Link className="brand" href="/" aria-label="EVO Sporting USA home">
          <BrandLogo idPrefix="header" />
        </Link>

        <form className="header-search" action="/search" role="search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            name="q"
            placeholder="Search belts, bars, benches, dumbbells…"
            aria-label="Search catalog"
            autoComplete="off"
          />
          <button type="submit">Search</button>
        </form>

        <div className="header-actions">
          <Link className="header-shop-button" href="/collections/bundles">
            Build a Setup
          </Link>
          <Link className="icon-button mobile-only" href="/search" aria-label="Open search">
            <Search size={20} aria-hidden="true" />
          </Link>
          <CartLink />
        </div>
      </div>

      <nav className="mega-nav" aria-label="Shop by category">
        <ul className="mega-nav-row">
          <li className="mega-item">
            <Link className="mega-trigger mega-trigger-all" href="/collections">
              All Gear
            </Link>
          </li>
          {megaNav.map((group) => (
            <li className="mega-item" key={group.label}>
              <Link className="mega-trigger" href={group.href}>
                {group.label}
                <ChevronDown size={14} aria-hidden="true" />
              </Link>
              <div className="mega-panel" role="group" aria-label={group.label}>
                <div className="mega-panel-cols">
                  {group.columns.map((slug) => {
                    const cat = category(slug);
                    if (!cat) return null;
                    return (
                      <Link className="mega-col" href={`/collections/${cat.slug}`} key={cat.slug}>
                        <strong>{cat.name}</strong>
                        <span>{cat.deck}</span>
                        <small>{cat.productCount} items</small>
                      </Link>
                    );
                  })}
                </div>
                <Link className="mega-panel-all" href={group.href}>
                  Shop all {group.label}
                </Link>
              </div>
            </li>
          ))}
          <li className="mega-item">
            <Link className="mega-trigger mega-trigger-sale" href="/collections/bundles">
              Bundles
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
