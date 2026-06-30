import { ClipboardCheck, Mail, PackageCheck, Phone, RotateCcw, ShieldCheck } from "lucide-react";
import { SupportRequestForm } from "@/components/support-request-form";
import { site } from "@/data/site";

export const metadata = {
  title: "Contact Us",
  description: "EVO Sporting USA contact page for order, return, warranty, billing, and product questions.",
};

export default function ContactPage() {
  const checklist = [
    "Order number and checkout email for order questions.",
    "Product name or SKU for fit, material, or warranty questions.",
    "Photos of the item, packaging, or issue for return and warranty questions.",
  ];
  const supportDetails = [
    {
      icon: <Mail size={22} aria-hidden="true" />,
      title: site.supportEmail,
      label: "Inbox",
    },
    {
      icon: <Phone size={22} aria-hidden="true" />,
      title: site.supportPhone || site.hours,
      label: site.supportPhone ? site.hours : "Hours",
    },
  ];
  const topicCards = [
    {
      icon: <PackageCheck size={18} aria-hidden="true" />,
      title: "Orders",
      body: "Use the order number, checkout email, and the item in question.",
    },
    {
      icon: <RotateCcw size={18} aria-hidden="true" />,
      title: "Returns",
      body: "Include item condition, packaging status, and whether the item was used.",
    },
    {
      icon: <ShieldCheck size={18} aria-hidden="true" />,
      title: "Warranty",
      body: "Include the SKU, photos, storage notes, and a short issue timeline.",
    },
  ] as const;

  return (
    <main className="page-shell checkout-layout">
      <section className="checkout-panel">
        <p className="eyebrow">Contact</p>
        <h1>How can we help?</h1>
        <SupportRequestForm />
      </section>
      <aside className="checkout-summary">
        <div className="support-stack">
          {supportDetails.map((detail) => (
            <div key={detail.label}>
              {detail.icon}
              <strong>{detail.title}</strong>
              <span>{detail.label}</span>
            </div>
          ))}
        </div>
        <div className="contact-checklist">
          <strong>Before you send</strong>
          <ul>
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="microcopy">
            A useful first message includes the order, item, and what you need help deciding.
          </p>
        </div>
        <div className="contact-topic-board" aria-label="Detail guide">
          <span>
            <ClipboardCheck size={18} aria-hidden="true" />
            Start with useful details
          </span>
          {topicCards.map((card) => (
            <article key={card.title}>
              {card.icon}
              <strong>{card.title}</strong>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </aside>
    </main>
  );
}
