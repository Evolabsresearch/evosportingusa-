import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "@/components/cart-provider";
import { EmailCapturePopup } from "@/components/email-capture-popup";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/data/site";
import { absoluteUrl, jsonLd, organizationJsonLd, siteUrl } from "@/lib/seo";
import "./globals.css";

const fontBody = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fontDisplay = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: site.name,
  title: {
    default: `${site.name} | Rack-Ready Strength Equipment`,
    template: `%s | ${site.name}`,
  },
  description:
    "EVO Sporting USA sells rack-ready gym equipment, lifting supports, dumbbells, bars, benches, plates, pull-up gear, and practical training bundles.",
  icons: {
    icon: "/icon.svg",
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: site.name,
    title: `${site.name} | Rack-Ready Strength Equipment`,
    description:
      "Rack-ready gym equipment, lifting supports, dumbbells, bars, benches, plates, pull-up gear, and practical training bundles.",
    images: [
      {
        url: absoluteUrl("/brand/evo-hero-deadlift-support.png"),
        width: 1024,
        height: 1024,
        alt: "EVO Sporting USA deadlift support training bundle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Rack-Ready Strength Equipment`,
    description: "Practical strength equipment and bundles for home training rooms.",
    images: [absoluteUrl("/brand/evo-hero-deadlift-support.png")],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontBody.variable} ${fontDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <SiteHeader />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLd(organizationJsonLd())}
          />
          <div id="main-content">{children}</div>
          <EmailCapturePopup />
          <SiteFooter />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
