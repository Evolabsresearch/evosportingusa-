import Link from "next/link";
import {
  ClipboardCheck,
  CreditCard,
  Mail,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { site } from "@/data/site";
import { formatMoney } from "@/lib/format";

const faqGroups = [
  {
    icon: <Truck size={22} aria-hidden="true" />,
    label: "Shipping",
    body: `${formatMoney(site.standardShippingPrice)} flat standard delivery rate, no order minimum, and separate tracking for multi-carton gear.`,
  },
  {
    icon: <RotateCcw size={22} aria-hidden="true" />,
    label: "Returns",
    body: `${site.returnWindowDays}-day return requests for clean, complete gear in the condition described by policy.`,
  },
  {
    icon: <ShieldCheck size={22} aria-hidden="true" />,
    label: "Warranty",
    body: `${site.warranty}. Photos, product name, and order details help with early failures.`,
  },
  {
    icon: <Mail size={22} aria-hidden="true" />,
    label: "Checkout",
    body: "Online card checkout is launching soon. For now, email your order and we'll confirm availability and arrange payment.",
  },
] as const;

const faqs: { question: string; answer: string }[] = [
  {
    question: "Where do orders ship from?",
    answer:
      `${site.fulfillmentNote} handle accessories, bundles, and larger gym equipment. Some mixed orders ship in more than one carton.`,
  },
  {
    question: "What is the return window?",
    answer:
      `Return requests are accepted within ${site.returnWindowDays} days of delivery. Gear should be clean, complete, and in the condition described in the refund policy.`,
  },
  {
    question: "Do large items ship separately?",
    answer:
      "Yes. Bars, benches, racks, plate sets, and mixed bundles can ship in separate cartons with separate tracking scans.",
  },
  {
    question: "Why did I receive more than one tracking message?",
    answer:
      "Mixed orders can be split by carton size and item type. Accessories may scan first, while bars, benches, racks, or plates can receive a separate carrier event.",
  },
  {
    question: "Can I update a shipping address after ordering?",
    answer:
      "Share the order number, checkout email, and corrected address as soon as possible. Address changes are only possible before the order is packed or handed to the carrier.",
  },
  {
    question: "What if an item arrives damaged?",
    answer:
      "Keep the packaging and send photos of the carton, label, item, and damage area. Include the order number and product code with the first message.",
  },
  {
    question: "How does checkout work?",
    answer:
      `Checkout uses a two-step flow: contact and delivery first, then an order review with the order details and a ${formatMoney(site.standardShippingPrice)} delivery estimate next to the total. Online card checkout is launching soon — for now you can email your order to place it.`,
  },
  {
    question: "Do I need an account to get support?",
    answer:
      "No account is required. The order number and checkout email are enough to look up the shipment.",
  },
  {
    question: "How should I choose sizing or fit?",
    answer:
      "Use the item measurements, material notes, and intended training use listed with the gear. For belts, sleeves, straps, and wraps, include the item name and how it will be used if you need a fit check.",
  },
  {
    question: "How do bundles work?",
    answer:
      "Bundles group common training setups such as grip work, deadlift support, pull-up training, and bench starts. Each bundle page lists the pieces in the set.",
  },
  {
    question: "What helps with warranty?",
    answer:
      "Have the order number, checkout email, product SKU, photos of the issue, and a short note about how the item was used and stored.",
  },
];

const deskRows = [
  ["Order status", "Order number, checkout email, and any carrier message already received."],
  ["Return request", "Item condition, packaging status, delivery date, and reason for the return."],
  ["Warranty", "SKU, photos, storage notes, and a short description of how the issue appeared."],
  ["Checkout", "Online card checkout is launching soon; email your order with item names and shipping details to place it."],
] as const;

const faqRouteCards = [
  {
    icon: <PackageCheck size={20} aria-hidden="true" />,
    title: "Track an order",
    body: "Use the order number and checkout email. Large-item tracking can arrive in separate carrier messages.",
    href: "/track-order",
  },
  {
    icon: <CreditCard size={20} aria-hidden="true" />,
    title: "Placing an order",
    body: "Online card checkout is launching soon — email your order to confirm availability and place it.",
    href: "/policies/payment-and-billing",
  },
  {
    icon: <ShieldCheck size={20} aria-hidden="true" />,
    title: "Contact us",
    body: "Include the order number, product code, photos, and issue details with the first message.",
    href: "/support/contact",
  },
] as const;

export const metadata = {
  title: "FAQ",
  description: "Answers about shipping, returns, warranty, billing, sizing, and bundles.",
};

export default function FaqPage() {
  return (
    <main className="page-shell">
      <section className="page-hero compact">
        <p className="eyebrow">FAQ</p>
        <h1>Common questions.</h1>
        <p>
          Practical answers for delivery, multi-carton orders, checkout, warranties,
          and product bundles.
        </p>
      </section>
      <section className="faq-proof-grid" aria-label="Frequently used support facts">
        {faqGroups.map((item) => (
          <article key={item.label}>
            {item.icon}
            <strong>{item.label}</strong>
            <p>{item.body}</p>
          </article>
        ))}
      </section>
      <section className="faq-desk-board" aria-label="Support message details">
        <div>
          <ClipboardCheck size={22} aria-hidden="true" />
          <p className="eyebrow">What to include</p>
          <h2>Give us the details that answer the first question.</h2>
          <p>
            Include identifiers, dates, photos, and the product name so we can start in the right
            place.
          </p>
        </div>
        <dl>
          {deskRows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="faq-list">
        {faqs.map(({ question, answer }, index) => (
          <details key={question} open={index < 2}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
      <section className="faq-route-grid" aria-label="Next support actions">
        {faqRouteCards.map((card) => (
          <Link href={card.href} key={card.title}>
            {card.icon}
            <strong>{card.title}</strong>
            <span>{card.body}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
