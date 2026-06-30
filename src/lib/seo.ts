import type { Product } from "@/data/catalog";
import { site } from "@/data/site";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${site.domain}`;

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function jsonLd(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/evo-mark.svg"),
    email: site.supportEmail,
    ...(site.supportPhone ? { telephone: site.supportPhone } : {}),
    ...(site.businessAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: site.businessAddress,
            addressCountry: "US",
          },
        }
      : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: site.supportEmail,
        areaServed: "US",
        availableLanguage: "en",
        ...(site.supportPhone ? { telephone: site.supportPhone } : {}),
      },
    ],
  };
}

export function productJsonLd(product: Product, description = product.description) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absoluteUrl(`/products/${product.slug}#product`),
    name: product.name,
    sku: product.sku,
    url: absoluteUrl(`/products/${product.slug}`),
    brand: {
      "@type": "Brand",
      name: site.name,
    },
    category: product.category,
    material: product.material,
    description,
    image: [absoluteUrl(`${product.image}`)],
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.slug}`),
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: product.inventory > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: site.name,
      },
    },
    additionalProperty: Object.entries(product.specs).map(([name, value]) => ({
      "@type": "PropertyValue",
      name,
      value,
    })),
  };
}
