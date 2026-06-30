import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ClipboardCheck, Mail, ShieldCheck } from "lucide-react";
import { getPolicy, policies } from "@/data/policies";
import { site } from "@/data/site";
import { formatMoney } from "@/lib/format";

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return {};
  return {
    title: policy.title,
    description: policy.summary,
  };
}

function policyFacts(slug: string) {
  const generic = [
    ["Inbox", site.supportEmail],
    ["Hours", site.hours],
    ["Store", site.legalName],
  ] as const;

  const facts: Record<string, readonly (readonly [string, string])[]> = {
    "shipping-policy": [
      ["Packing window", "1-4 business days depending on item size"],
      ["Rate", `${formatMoney(site.standardShippingPrice)} flat standard rate in checkout`],
      ["Tracking", "Mixed orders can receive carton-level scans"],
    ],
    "refund-policy": [
      ["Window", `${site.returnWindowDays} days from delivery`],
      ["Condition", "Unused, with original packaging; no impact damage"],
      ["Inspection", "Within 3 business days of carrier delivery"],
      ["Refund timing", "5-10 business days after inspection"],
      ["Return shipping", "Customer pays change-of-mind; EVO pays damaged or wrong item"],
    ],
    warranty: [
      ["Coverage", site.warranty],
      ["What helps", "Order number, SKU, photos, and issue timing"],
      ["Storage", "Normal home-gym use and proper care"],
    ],
    "payment-and-billing": [
      ["Online payment", "Card checkout is launching soon"],
      ["Placing an order", "Email your order to confirm availability and arrange payment"],
      ["Order email", "Order and shipping emails go to the checkout email"],
    ],
    "privacy-policy": [
      ["Order data", "Contact, shipping, order contents, and support messages"],
      ["Payment data", "No card payment is taken on the site yet"],
      ["Requests", `Write to ${site.supportEmail}`],
    ],
    "terms-of-service": [
      ["Order acceptance", "After authorization and confirmation"],
      ["Product details", "Specs, prices, and availability may update"],
      ["Training use", "Use equipment with proper technique and surroundings"],
      ["Liability", "Capped at the amount paid for the product"],
      ["Governing law", "Delaware; courts in New Castle County, DE"],
    ],
    accessibility: [
      ["Navigation", "Keyboard controls and readable labels"],
      ["Forms", "Clear field names for checkout and support"],
      ["Feedback", `Send page details to ${site.supportEmail}`],
    ],
    "contact-information": [
      ["Business", site.legalName],
      ["Inbox", site.supportEmail],
      ["Hours", site.hours],
    ],
  };

  return facts[slug] ?? generic;
}

function policyWorkflow(slug: string) {
  const generic = [
    ["Start with", "Order number, checkout email, and the page or item you are asking about."],
    ["What we compare", "Your note, order details, and the policy on this page."],
    ["Where to find it", "Footer, Help, cart, and checkout."],
  ] as const;

  const workflows: Record<string, readonly (readonly [string, string])[]> = {
    "shipping-policy": [
      ["Rate", "Cart and checkout include the flat standard rate with the order total."],
      ["Carton updates", "Large or mixed orders may receive separate carrier scans."],
      ["If tracking stalls", "Start with the order number and any carrier message you received."],
    ],
    "refund-policy": [
      ["Before starting", "Keep the item clean, complete, and photographed with included accessories when practical."],
      ["Condition check", "Delivery date, item condition, packaging status, and order details determine the next step."],
      ["Refund timing", "Approved refunds return to the original payment method after the item is received and inspected."],
    ],
    warranty: [
      ["Claim basics", "SKU, order number, issue timing, and clear photos of the affected area."],
      ["Coverage check", "Coverage depends on normal home-gym use, product care, and the exclusions listed here."],
      ["Next step", "The answer may be repair guidance, replacement handling, or another product-specific reply."],
    ],
    "payment-and-billing": [
      ["Placing an order", "Add items, enter shipping, then email your order to confirm availability."],
      ["What we compare", "We match your request to order details and current stock."],
      ["No card on site", "Card checkout is launching soon; nothing is charged on the storefront yet."],
    ],
    "privacy-policy": [
      ["Privacy requests", "Start with the checkout email tied to the order or message."],
      ["Record handling", "Some order, support, and legal records have required retention periods."],
      ["Payment data", "No card numbers are collected on the site; checkout is launching soon."],
    ],
    "terms-of-service": [
      ["Before ordering", "Review item specs, intended use, pricing, delivery, and store policies before ordering."],
      ["Order review", "Payment, inventory, address, or fraud issues can pause or cancel fulfillment."],
      ["Training responsibility", "Equipment must be used with appropriate loads, technique, and surroundings."],
    ],
    accessibility: [
      ["Report basics", "Page URL, device or browser, and the step that created trouble."],
      ["What happens next", "We use the report to help with the immediate task and improve the page."],
      ["Page basics", "Navigation, forms, labels, contrast, and checkout steps are reviewed for usability."],
    ],
    "contact-information": [
      ["Order or item", "Include the order number or product page when the message is about gear."],
      ["Inbox", "Messages reach the listed email during published hours."],
      ["Seller", "EVO Sporting USA LLC handles store policy and order questions."],
    ],
  };

  return workflows[slug] ?? generic;
}

function policyWorkflowIntro(slug: string) {
  const intros: Record<string, { title: string; body: string }> = {
    "shipping-policy": {
      title: "Packing, tracking, and carton checks.",
      body: "Start with the order number, checkout email, and any carrier scans if a delivery question comes up.",
    },
    "refund-policy": {
      title: "Condition, packaging, and refund timing.",
      body: "Start with the delivery date, item condition, packaging status, and order number.",
    },
    warranty: {
      title: "Photos, SKU, and issue timing.",
      body: "Use clear photos, the SKU, the order number, and storage notes when asking about warranty coverage.",
    },
    "payment-and-billing": {
      title: "Placing an order.",
      body: "Add items, enter shipping, and email your order — card checkout is launching soon and nothing is charged on the site yet.",
    },
    "privacy-policy": {
      title: "Checkout, order, and support records.",
      body: "Start with the checkout email when asking about order, support, or privacy records.",
    },
    "terms-of-service": {
      title: "Product use, order checks, and store terms.",
      body: "Review item specs, order acceptance, and training responsibility before ordering.",
    },
    accessibility: {
      title: "Page URL, device, and trouble spot.",
      body: "Share the page, browser or device, and the step that was difficult to use.",
    },
    "contact-information": {
      title: "Seller name, inbox, and hours.",
      body: "Include the order number when the message relates to an order.",
    },
  };

  return (
    intros[slug] ?? {
      title: "Order details that help.",
      body: "Include the checkout email, order number, item code, and where things stand.",
    }
  );
}

function policyAssistTitle(slug: string) {
  const titles: Record<string, string> = {
    "shipping-policy": "Need help with a delivery?",
    "refund-policy": "Starting a return?",
    warranty: "Need a warranty check?",
    "payment-and-billing": "Placing an order?",
    "privacy-policy": "Privacy request?",
    "terms-of-service": "Question about an order?",
    accessibility: "Share the page URL with accessibility feedback.",
    "contact-information": "Use the listed contact details.",
  };

  return titles[slug] ?? "Share the details you have.";
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();
  const facts = policyFacts(policy.slug);
  const workflow = policyWorkflow(policy.slug);
  const workflowIntro = policyWorkflowIntro(policy.slug);
  const assistTitle = policyAssistTitle(policy.slug);
  const supportRows = [
    ["Store", site.legalName],
    ["Inbox", site.supportEmail],
    ["Hours", site.hours],
  ] as const;

  return (
    <main className="page-shell legal-page">
      <section className="page-hero compact">
        <p className="eyebrow">Policy</p>
        <h1>{policy.title}</h1>
        <p>{policy.summary}</p>
        <div className="policy-meta-row" aria-label="Policy merchant details">
          <span>{site.legalName}</span>
          <span>{site.supportEmail}</span>
          <span>{site.hours}</span>
        </div>
      </section>
      <section className="policy-fact-strip" aria-label={`${policy.title} key details`}>
        {facts.map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>
      <section className="policy-workflow-panel" aria-label={`${policy.title} details`}>
        <div>
          <ClipboardCheck size={24} aria-hidden="true" />
          <p className="eyebrow">Policy notes</p>
          <h2>{workflowIntro.title}</h2>
          <p>{workflowIntro.body}</p>
        </div>
        <div className="policy-workflow-list">
          {workflow.map(([label, body]) => (
            <article key={label}>
              <CheckCircle2 size={17} aria-hidden="true" />
              <strong>{label}</strong>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <div className="policy-content-grid">
        <article>
          {policy.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </article>
        <aside className="policy-assist-panel" aria-label="Policy support details">
          <Mail size={24} aria-hidden="true" />
          <p className="eyebrow">Need help?</p>
          <h2>{assistTitle}</h2>
          <p>
            Include the order number, checkout email, and any photos or carrier messages that
            explain the question.
          </p>
          <dl>
            {supportRows.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="policy-assist-actions">
            <Link className="button button-dark" href="/support/contact">
              <Mail size={18} aria-hidden="true" />
              Contact Us
            </Link>
            <Link className="button button-soft" href="/support/merchant-details">
              <ShieldCheck size={18} aria-hidden="true" />
              Merchant Details
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
