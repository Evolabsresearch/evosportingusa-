import Link from "next/link";
import {
  Clock3,
  ClipboardCheck,
  Headphones,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  ShieldCheck,
  Undo2,
} from "lucide-react";
import { policies } from "@/data/policies";
import { site } from "@/data/site";

export const metadata = {
  title: "Help",
  description: "EVO Sporting USA help for orders, delivery, returns, warranty, billing, and product fit.",
};

export default function SupportPage() {
  const supportWorkflow = [
    ["Order status", "Have the order number and checkout email ready."],
    ["Fit or product help", "Include the product name, SKU, and how the item will be used in your setup."],
    ["Return or warranty", "Attach photos of the item, packaging, and the issue you are seeing."],
  ] as const;
  const supportRoutes = [
    ["Delivery question", "Order number, checkout email, and the item or carton in question."],
    ["Return request", "Order number, item condition, packaging status, and reason for the return."],
    ["Warranty", "Order number, SKU, photos, storage notes, and how the issue appeared."],
    ["Placing an order", "Online card checkout is launching soon; email your order with item names and shipping details to place it."],
  ] as const;
  const supportCards = [
    {
      icon: <Mail size={24} aria-hidden="true" />,
      title: "Inbox",
      body: site.supportEmail,
      detail: <Link href="/support/contact">Send a message</Link>,
    },
    site.supportPhone
      ? {
          icon: <Phone size={24} aria-hidden="true" />,
          title: "Phone",
          body: site.supportPhone,
          detail: <span>{site.hours}</span>,
        }
      : {
          icon: <Phone size={24} aria-hidden="true" />,
          title: "Hours",
          body: site.hours,
          detail: <span>Email is best for order, return, and warranty questions.</span>,
        },
    site.businessAddress
      ? {
          icon: <MapPin size={24} aria-hidden="true" />,
          title: "Business address",
          body: site.businessAddress,
          detail: <span>Use this address for listed business contact details.</span>,
        }
      : {
          icon: <MapPin size={24} aria-hidden="true" />,
          title: "Merchant name",
          body: site.legalName,
          detail: <span>Listed as the seller for EVO Sporting USA orders.</span>,
        },
    {
      icon: <ShieldCheck size={24} aria-hidden="true" />,
      title: "Store policies",
      body: "Shipping, returns, payment, privacy, terms, accessibility, and warranty.",
      detail: <Link href="/policies/shipping-policy">View policies</Link>,
    },
    {
      icon: <PackageCheck size={24} aria-hidden="true" />,
      title: "Merchant details",
      body: site.legalName,
      detail: <Link href="/support/merchant-details">View store details</Link>,
    },
  ];

  return (
    <main className="page-shell">
      <section className="support-hero">
        <div>
          <p className="eyebrow">Support</p>
          <h1>Order help, returns, and warranty.</h1>
          <p>
            Contact EVO Sporting USA for order status, fit help, delivery, returns, warranty,
            and billing. A useful first note includes the order email, product code, and a photo
            when something arrived wrong.
          </p>
          <div className="support-action-row">
            <Link className="button button-dark" href="/support/contact">
              <Headphones size={18} aria-hidden="true" />
              Send a Message
            </Link>
            <Link className="button button-soft" href="/track-order">
              <PackageCheck size={18} aria-hidden="true" />
              Track Order
            </Link>
          </div>
        </div>
        <aside className="support-console" aria-label="Support availability">
          <span className="console-status">
            <Clock3 size={16} aria-hidden="true" />
            {site.hours}
          </span>
          <strong>{site.supportEmail}</strong>
          <p>Orders, returns, warranty, and product questions.</p>
          {site.supportPhone ? <small>{site.supportPhone}</small> : null}
          {site.businessAddress ? <small>{site.businessAddress}</small> : null}
        </aside>
      </section>
      <section className="support-lanes" aria-label="Help topics">
        <div>
          <PackageCheck size={22} aria-hidden="true" />
          <strong>Delivery & tracking</strong>
          <span>Tracking updates go to the order email. Larger items can scan separately.</span>
        </div>
        <div>
          <Undo2 size={22} aria-hidden="true" />
          <strong>Returns & exchanges</strong>
          <span>Keep unused gear clean, complete, and ready for inspection.</span>
        </div>
        <div>
          <ShieldCheck size={22} aria-hidden="true" />
          <strong>Warranty</strong>
          <span>Photos, product code, order email, and storage notes help us understand the issue.</span>
        </div>
      </section>
      <section className="support-workflow" aria-label="Message details">
        <div>
          <p className="eyebrow">Start here</p>
          <h2>Start with the order, the item, and what changed.</h2>
        </div>
        {supportWorkflow.map(([title, body]) => (
          <article key={title}>
            <strong>{title}</strong>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="support-route-board" aria-label="Question details">
        <div>
          <ClipboardCheck size={24} aria-hidden="true" />
          <p className="eyebrow">Request type</p>
          <h2>Tell us what happened.</h2>
          <p>
            Include the order number, product name or SKU, and a short note about the issue.
          </p>
        </div>
        <dl>
          {supportRoutes.map(([label, body]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{body}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="support-grid support-grid-orbit">
        {supportCards.map((card) => (
          <div className="support-card" key={card.title}>
            {card.icon}
            <h2>{card.title}</h2>
            <p>{card.body}</p>
            {card.detail}
          </div>
        ))}
      </section>
      <section className="policy-list policy-list-rounded">
        {policies.map((policy) => (
          <Link href={`/policies/${policy.slug}`} key={policy.slug}>
            <strong>{policy.title}</strong>
            <span>{policy.summary}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
