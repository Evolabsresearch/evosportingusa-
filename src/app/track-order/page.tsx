import Link from "next/link";
import { ClipboardCheck, MailCheck, PackageCheck, PackageSearch, Truck } from "lucide-react";
import { TrackOrderForm } from "@/components/track-order-form";
import { site } from "@/data/site";
import { formatMoney } from "@/lib/format";

export const metadata = {
  title: "Track Order",
  description: "Check order status and multi-carton tracking for EVO Sporting USA gear.",
};

export default function TrackOrderPage() {
  const trackingNotes = [
    "Accessories often scan before benches, bars, or plate cartons.",
    "Bars, benches, racks, and plates can receive separate tracking numbers.",
    `We answer order questions ${site.hours}.`,
  ];
  const timeline = [
    ["Order confirmed", "Confirmation goes to the checkout email after payment authorization."],
    ["Packed by item type", "Accessories and heavy equipment may be packed on separate lines."],
    ["Carrier scans", "Tracking can appear in more than one message when cartons move separately."],
  ] as const;
  const lookupPrep = [
    ["Checkout email", "Use the same email entered at checkout so tracking is easier to match."],
    ["Carrier messages", "Separate cartons may create separate carrier emails, especially for mixed equipment orders."],
    ["Keep carton notes", "If you need help, include the product name, carton note, or carrier message you already have."],
  ] as const;

  return (
    <main className="page-shell checkout-layout">
      <section className="checkout-panel">
        <p className="eyebrow">Tracking</p>
        <h1>Track your order.</h1>
        <p>
          Enter the order number and email used at checkout. Tracking updates may arrive in
          separate messages when bars, benches, racks, or plate sets ship in multiple cartons.
        </p>
        <TrackOrderForm />
        <div className="tracking-lookup-board" aria-label="Order lookup notes">
          <span>
            <ClipboardCheck size={18} aria-hidden="true" />
            Before you look it up
          </span>
          {lookupPrep.map(([label, body]) => (
            <article key={label}>
              <strong>{label}</strong>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <aside className="checkout-summary">
        <div className="tracking-summary-card">
          <PackageSearch size={22} aria-hidden="true" />
          <strong>Tracking matches the checkout email.</strong>
          <p>
            Keep the order number and email together if you ask about a shipment.
          </p>
        </div>
        <h2>Need help?</h2>
        <p>
          For order status, address updates, returns, or warranty questions, include the order
          number and the item involved.
        </p>
        <div className="tracking-timeline" aria-label="Tracking timeline">
          {timeline.map(([label, body], index) => {
            const Icon = index === 0 ? MailCheck : index === 1 ? PackageCheck : Truck;
            return (
              <span key={label}>
                <Icon size={16} aria-hidden="true" />
                <small>
                  <strong>{label}</strong>
                  {body}
                </small>
              </span>
            );
          })}
        </div>
        <div className="tracking-note-list" aria-label="Tracking notes">
          {trackingNotes.map((note) => (
            <span key={note}>{note}</span>
          ))}
        </div>
        <p className="microcopy">
          The standard delivery estimate is {formatMoney(site.standardShippingPrice)}. Some
          heavy-item orders show multiple carrier events before the full order is delivered.
        </p>
        <Link className="button button-soft full-width" href="/support/contact">
          Contact Us
        </Link>
      </aside>
    </main>
  );
}
