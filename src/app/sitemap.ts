import type { MetadataRoute } from "next";
import { categories, products } from "@/data/catalog";
import { policies } from "@/data/policies";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-05-30T00:00:00-04:00");
  const staticRoutes = [
    "/",
    "/about",
    "/collections",
    "/search",
    "/support",
    "/support/contact",
    "/support/faq",
    "/support/merchant-details",
    "/track-order",
  ];
  const collectionRoutes = categories
    .filter((category) => category.productCount > 0)
    .map((category) => `/collections/${category.slug}`);
  const productRoutes = products.map((product) => `/products/${product.slug}`);
  const policyRoutes = policies.map((policy) => `/policies/${policy.slug}`);

  return [...staticRoutes, ...collectionRoutes, ...productRoutes, ...policyRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: updated,
    changeFrequency: route.startsWith("/products") ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/products") ? 0.8 : 0.6,
  }));
}
