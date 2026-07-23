import { site } from "./site";

export type Policy = {
  slug: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
};

const contactInformationSections: Policy["sections"] = [
  {
    heading: "Reach us",
    body: `${site.supportEmail}. Hours: ${site.hours}.`,
  },
  ...(site.supportPhone
    ? [
        {
          heading: "Phone",
          body: site.supportPhone,
        },
      ]
    : []),
  ...(site.businessAddress
    ? [
        {
          heading: "Business Address",
          body: site.businessAddress,
        },
      ]
    : []),
  {
    heading: "Business Details",
    body: `${site.legalName} (Company Registration No. ${site.registrationNumber}) is the seller for orders placed through ${site.siteUrl}. Registered address: ${site.businessAddress}. Write to ${site.supportEmail} or call ${site.supportPhone} for order, return, warranty, privacy, and checkout questions.`,
  },
];

export const policies: Policy[] = [
  {
    slug: "shipping-policy",
    title: "Shipping Policy",
    summary: "Domestic shipping expectations for strength equipment, accessories, and multi-carton orders.",
    sections: [
      {
        heading: "Processing",
        body: "Most in-stock accessories leave the fulfillment network within 1-2 business days. Larger equipment and bundled orders may require 2-4 business days for packing and carrier pickup.",
      },
      {
        heading: "Delivery",
        body: `Standard ground delivery is offered in the United States at a flat ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(site.standardShippingPrice)} shipping rate. No minimum order is required. Oversized freight surcharges are added to the order total when they apply.`,
      },
      {
        heading: "Large Equipment",
        body: "Benches, racks, bars, and plate sets may ship in multiple cartons. Tracking details can arrive separately as each carton is scanned by the carrier.",
      },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    summary: `${site.returnWindowDays}-day return window, condition standards, return shipping, and refund timing.`,
    sections: [
      {
        heading: "Return Window",
        body: `Customers may request a return within ${site.returnWindowDays} days of delivery. Returns requested after the window cannot be accepted.`,
      },
      {
        heading: "Condition",
        body: "Accessories: returnable if unused, with original packaging. Equipment over 20 lb (bars, plates, benches, racks, bumper plates): returnable if uninstalled, with no impact damage, modification, or missing hardware, and in original packaging.",
      },
      {
        heading: "Pre-existing Damage",
        body: `Items that arrive damaged or incorrect must be reported within 48 hours of delivery, with photos of the damaged item and packaging, to ${site.supportEmail}. Damage reported after 48 hours may be handled under the warranty section instead of as a refund.`,
      },
      {
        heading: "Return Shipping",
        body: "Customers pay return shipping for change-of-mind returns. EVO Sporting USA pays return shipping when the item arrived damaged, defective, or did not match the order.",
      },
      {
        heading: "Refund Timing",
        body: "Inspection is completed within 3 business days of carrier delivery of the returned item. Approved refunds are issued to the original payment method within 5 to 10 business days after inspection. Bank processing times can vary by card issuer.",
      },
      {
        heading: "Non-returnable Items",
        body: "Chalk, grip enhancers, opened nutrition or hygiene-adjacent accessories, and clearance items marked final sale are non-returnable.",
      },
    ],
  },
  {
    slug: "warranty",
    title: "Warranty",
    summary: "Warranty coverage by product type and claim basics for early failures.",
    sections: [
      {
        heading: "Coverage",
        body: site.warranty,
      },
      {
        heading: "What Is Covered",
        body: "Coverage applies to defects in materials or workmanship under normal home-gym use. Examples include failed stitching, faulty buckles, broken collars, or structural defects that appear during normal training.",
      },
      {
        heading: "What Is Not Covered",
        body: "Coverage excludes cosmetic wear, rust from improper storage, commercial facility abuse, overloaded products, unauthorized modifications, and damage caused by dropping products outside their intended use.",
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: "What we collect to ship orders and answer support questions.",
    sections: [
      {
        heading: "Information We Collect",
        body: "Checkout and support flows may collect contact details, shipping information, order contents, and support messages. No card payment is taken on the site yet.",
      },
      {
        heading: "How We Use Information",
        body: "Information is used to process orders, provide support, prevent fraud, send required order messages, and improve the shopping experience.",
      },
      {
        heading: "Customer Rights",
        body: `Write to ${site.supportEmail} to request help accessing, correcting, or deleting personal information where applicable law allows.`,
      },
    ],
  },
  {
    slug: "payment-and-billing",
    title: "Payment and Billing",
    summary: "Payment handling, charge labels, order messages, and billing help.",
    sections: [
      {
        heading: "Payment Handling",
        body: "Online card checkout is not enabled on the site yet. To place an order, add items to the cart, enter your shipping details, and email your order; our team replies to confirm availability and arrange payment. No card data is collected or charged on the storefront.",
      },
      {
        heading: "Completing an Order",
        body: `Once your order is confirmed by email, order and shipping updates go to the address you provided. Include the order details and checkout email with any question to ${site.supportEmail}.`,
      },
      {
        heading: "Order Updates",
        body: "Order messages go to the address entered during checkout. Multi-carton orders can receive more than one carrier email.",
      },
      {
        heading: "Order Checks",
        body: "Orders may be held, canceled, or refunded if payment authorization fails, fraud checks require a closer look, inventory is unavailable, or shipping details cannot be confirmed.",
      },
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    summary: "Ordering terms, product accuracy, billing questions, safe equipment use, and governing law.",
    sections: [
      {
        heading: "Product Information",
        body: "Product descriptions, prices, and availability may change as inventory updates. Customers should review product specifications, measurements, and intended uses before purchase.",
      },
      {
        heading: "Orders",
        body: "An order is accepted only after payment authorization and confirmation. EVO Sporting USA may cancel orders affected by inventory errors, address issues, suspected fraud, or payment failures.",
      },
      {
        heading: "Billing Questions",
        body: `Write to ${site.supportEmail} with order and billing questions. Include the charge date, checkout email, and order number if you have them.`,
      },
      {
        heading: "Training Responsibility and Assumption of Risk",
        body: "Fitness equipment must be used with proper technique, appropriate loads, and safe surroundings. Free weights, resistance equipment, and accessories carry inherent risks of injury when used incorrectly, with excessive load, in unsafe surroundings, or by individuals who have not been cleared for strenuous activity. Customers should consult a qualified medical or training professional before beginning a new training program. By purchasing and using EVO Sporting USA equipment, the customer voluntarily assumes all risks associated with its use.",
      },
      {
        heading: "Limitation of Liability",
        body: "EVO Sporting USA's total aggregate liability arising out of or related to the sale or use of any product shall not exceed the amount paid by the customer for the product giving rise to the claim. EVO Sporting USA shall not be liable for any indirect, incidental, consequential, special, punitive, or exemplary damages, including without limitation damages for lost profits, lost data, personal injury, or property damage arising from product use, even if advised of the possibility of such damages. Some jurisdictions do not allow the exclusion or limitation of certain damages; in those jurisdictions liability is limited to the maximum extent permitted by applicable law.",
      },
      {
        heading: "Governing Law",
        body: "These terms are governed by the laws of the State of Delaware, without regard to its conflict-of-laws principles. Any dispute arising out of or related to these terms or the products sold under them shall be brought exclusively in the state or federal courts located in New Castle County, Delaware, and the parties consent to the exclusive jurisdiction of those courts.",
      },
      {
        heading: "Changes to These Terms",
        body: "EVO Sporting USA may update these terms from time to time. Continued use of the site after an update constitutes acceptance of the updated terms.",
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    summary: "Usable navigation, forms, labels, and contrast.",
    sections: [
      {
        heading: "Our Approach",
        body: "EVO Sporting USA aims to keep navigation, forms, product information, and checkout steps usable with keyboard controls, clear labels, and readable contrast.",
      },
      {
        heading: "Feedback",
        body: `If you have trouble using the site, write to ${site.supportEmail} with the page URL and a brief description of the issue.`,
      },
    ],
  },
  {
    slug: "contact-information",
    title: "Contact Information",
    summary: "EVO Sporting USA seller name, hours, and contact details.",
    sections: contactInformationSections,
  },
];

export function getPolicy(slug: string) {
  return policies.find((policy) => policy.slug === slug);
}
