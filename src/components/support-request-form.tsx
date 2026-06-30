"use client";

import { FormEvent, useState } from "react";
import { MailCheck, MessageCircle, Send } from "lucide-react";
import { site } from "@/data/site";

type PreparedRequest = {
  customerEmail: string;
  mailtoHref: string;
  topicLabel: string;
};

const topicLabels: Record<string, string> = {
  "order-help": "Order help",
  returns: "Returns",
  warranty: "Warranty",
  product: "Product question",
  business: "Business details",
};

const topicGuidance: Record<string, string> = {
  "order-help": "Include the order number, checkout email, and the item or tracking question.",
  returns: "Include item condition, packaging status, and whether the item was used.",
  warranty: "Include the SKU, photos, storage notes, and how the issue appeared.",
  product: "Include the product name, SKU, measurements, and how the item will be used.",
  business: "Include the policy, billing, or seller detail you want to check.",
};

function fieldValue(formData: FormData, field: string) {
  return String(formData.get(field) ?? "").trim();
}

export function SupportRequestForm() {
  const [preparedRequest, setPreparedRequest] = useState<PreparedRequest | null>(null);
  const [selectedTopic, setSelectedTopic] = useState("order-help");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = fieldValue(formData, "name");
    const email = fieldValue(formData, "email");
    const orderNumber = fieldValue(formData, "orderNumber");
    const topic = fieldValue(formData, "topic");
    const message = fieldValue(formData, "message");
    const topicLabel = topicLabels[topic] ?? "Store question";
    const subject = `EVO Sporting USA ${topicLabel}${orderNumber ? ` - ${orderNumber}` : ""}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      orderNumber ? `Order number: ${orderNumber}` : "Order number: Not provided",
      `Topic: ${topicLabel}`,
      `Helpful details: ${topicGuidance[topic] ?? topicGuidance["order-help"]}`,
      "",
      "Message:",
      message,
    ].join("\n");

    setPreparedRequest({
      customerEmail: email,
      mailtoHref: `mailto:${site.supportEmail}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`,
      topicLabel,
    });
  }

  return (
    <>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-grid two">
          <label>
            Name
            <input required name="name" autoComplete="name" />
          </label>
          <label>
            Reply address
            <input required type="email" name="email" autoComplete="email" />
          </label>
        </div>
        <label>
          Order number
          <input name="orderNumber" placeholder="Optional" />
        </label>
        <label>
          Topic
          <select name="topic" value={selectedTopic} onChange={(event) => setSelectedTopic(event.target.value)}>
            <option value="order-help">Order help</option>
            <option value="returns">Returns</option>
            <option value="warranty">Warranty</option>
            <option value="product">Product question</option>
            <option value="business">Business details</option>
          </select>
        </label>
        <div className="support-form-helper" aria-label="Topic guidance">
          <strong>{topicLabels[selectedTopic]}</strong>
          <span>{topicGuidance[selectedTopic]}</span>
        </div>
        <label>
          Message
          <textarea required name="message" rows={7} />
        </label>
        <button className="button button-dark" type="submit">
          <MessageCircle size={18} aria-hidden="true" />
          Create draft
        </button>
      </form>
      {preparedRequest ? (
        <div className="form-status-panel" role="status">
          <MailCheck size={22} aria-hidden="true" />
          <div>
            <strong>{preparedRequest.topicLabel} draft ready.</strong>
            <p>
              It opens addressed to {site.supportEmail}. Send it from{" "}
              {preparedRequest.customerEmail}.
            </p>
            <a className="button button-soft button-compact" href={preparedRequest.mailtoHref}>
              <Send size={16} aria-hidden="true" />
              Open draft
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
