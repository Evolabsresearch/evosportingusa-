function publicValue(value: string | undefined) {
  const normalized = value?.trim() ?? "";
  return /^(tbd|todo|placeholder|pending|coming soon)$/i.test(normalized) ? "" : normalized;
}

export const site = {
  name: "EVO Sporting USA",
  legalName: publicValue(process.env.NEXT_PUBLIC_EVO_LEGAL_NAME) || "EVO INNOVATIONS LIMITED",
  registrationNumber:
    publicValue(process.env.NEXT_PUBLIC_EVO_REGISTRATION_NO) || "80896126",
  tagline: "Rack-ready equipment for practical strength rooms.",
  domain: publicValue(process.env.NEXT_PUBLIC_EVO_DOMAIN) || "evosportingusa.com",
  siteUrl: "https://www.evosportingusa.com/",
  supportEmail:
    publicValue(process.env.NEXT_PUBLIC_EVO_SUPPORT_EMAIL) || "evosportingusa@gmail.com",
  supportPhone:
    publicValue(process.env.NEXT_PUBLIC_EVO_SUPPORT_PHONE) || "+1 (914) 860-3624",
  businessAddress:
    publicValue(process.env.NEXT_PUBLIC_EVO_BUSINESS_ADDRESS) ||
    "FLAT 2304, 23/F HO KING COMM CENTRE, 2-16 FA YUEN STREET, MONG KOK, HONG KONG",
  hours: publicValue(process.env.NEXT_PUBLIC_EVO_SUPPORT_HOURS) || "Monday-Friday, 9:00 AM-5:00 PM ET",
  catalogSize: 102,
  fulfillmentNote: "Regional US fulfillment partners",
  standardShippingPrice: 25,
  returnWindowDays: 30,
  warranty: "90-day accessories warranty and 1-year limited equipment warranty",
} as const;

export const navGroups = [
  { href: "/collections/lifting-supports", label: "Lifting Gear" },
  { href: "/collections/chalk-grip-basics", label: "Accessories" },
  { href: "/collections/dumbbells-weights", label: "Weights" },
  { href: "/collections/plates-bars", label: "Bars & Plates" },
  { href: "/collections/bundles", label: "Bundles" },
  { href: "/support", label: "Help" },
] as const;

export const trustSignals = [
  "Gear organized by training station",
  "US fulfillment partners",
  "Product pages list contents and care",
  "Warranty coverage by item",
] as const;
