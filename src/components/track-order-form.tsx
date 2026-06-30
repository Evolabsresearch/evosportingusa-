"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Mail, PackageSearch, Search } from "lucide-react";
import { site } from "@/data/site";

type LookupRequest = {
  email: string;
  orderNumber: string;
  mailtoHref: string;
};

function fieldValue(formData: FormData, field: string) {
  return String(formData.get(field) ?? "").trim();
}

export function TrackOrderForm() {
  const [lookupRequest, setLookupRequest] = useState<LookupRequest | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const orderNumber = fieldValue(formData, "orderNumber");
    const email = fieldValue(formData, "email");
    const subject = `EVO Sporting USA tracking request - ${orderNumber}`;
    const body = [
      `Order number: ${orderNumber}`,
      `Email: ${email}`,
      `Hours: ${site.hours}`,
      "",
      "Please help me check the latest tracking status and whether this order has more than one carton.",
    ].join("\n");

    setLookupRequest({
      email,
      orderNumber,
      mailtoHref: `mailto:${site.supportEmail}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`,
    });
  }

  return (
    <>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Order number
          <input required name="orderNumber" placeholder="EVO-10001" />
        </label>
        <label>
          Email
          <input required type="email" name="email" autoComplete="email" />
        </label>
        <button className="button button-dark" type="submit">
          <Search size={18} aria-hidden="true" />
          Look Up Order
        </button>
      </form>
      {lookupRequest ? (
        <div className="form-status-panel" role="status">
          <PackageSearch size={22} aria-hidden="true" />
          <div>
            <strong>Email draft ready for {lookupRequest.orderNumber}.</strong>
            <p>
              Check the inbox for {lookupRequest.email} for carrier emails. If the order shipped in
              multiple cartons, tracking can arrive in separate messages.
            </p>
            <div className="status-action-row">
              <a className="button button-soft button-compact" href={lookupRequest.mailtoHref}>
                <Mail size={16} aria-hidden="true" />
                Email Us
              </a>
              <Link className="button button-soft button-compact" href="/support/contact">
                Contact Form
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
