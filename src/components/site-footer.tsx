import Link from "next/link";
import { RotateCcw, Truck } from "lucide-react";
import { categories } from "@/data/catalog";
import { policies } from "@/data/policies";
import { site } from "@/data/site";
import { BrandLogo } from "./brand-logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="brand footer-brand">
            <BrandLogo idPrefix="footer" tone="light" />
          </div>
          <p>{site.tagline}</p>
          <p className="muted">
            {site.legalName} - {site.supportEmail}
            {site.supportPhone ? `. ${site.supportPhone}.` : "."}
          </p>
        </div>
        <div>
          <h2>Shop</h2>
          {categories
            .filter((category) => category.productCount > 0)
            .slice(0, 7)
            .map((category) => (
              <Link href={`/collections/${category.slug}`} key={category.slug}>
                {category.name}
              </Link>
            ))}
        </div>
        <div>
          <h2>Help</h2>
          <Link href="/support">Help Center</Link>
          <Link href="/support/contact">Contact Us</Link>
          <Link href="/support/faq">FAQ</Link>
          <Link href="/support/merchant-details">Merchant Details</Link>
          <Link href="/track-order">Track Order</Link>
        </div>
        <div>
          <h2>Policies</h2>
          {policies.slice(0, 6).map((policy) => (
            <Link href={`/policies/${policy.slug}`} key={policy.slug}>
              {policy.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="footer-trust">
        <span className="footer-trust-item">
          <Truck size={16} aria-hidden="true" />
          US fulfillment network
        </span>
        <span className="footer-trust-item">
          <RotateCcw size={16} aria-hidden="true" />
          {site.returnWindowDays}-day returns
        </span>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} {site.name}</span>
        <span>Strength equipment for rooms that get used.</span>
      </div>
    </footer>
  );
}
