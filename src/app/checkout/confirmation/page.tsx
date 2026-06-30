import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { ClearCartOnConfirmation } from "@/components/clear-cart-on-confirmation";
import { site } from "@/data/site";

export const metadata = {
  title: "Order confirmed",
  description: "Your EVO Sporting USA order has been received.",
};

const ORDER_REF = /^[A-Za-z0-9_-]{8,100}$/;

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;
  const order = typeof params.order === "string" && ORDER_REF.test(params.order)
    ? params.order
    : null;

  return (
    <main className="page-shell">
      <ClearCartOnConfirmation />
      <section className="confirmation-panel" aria-label="Order confirmed">
        <CheckCircle2 size={44} aria-hidden="true" />
        <p className="eyebrow">Order confirmed</p>
        <h1>Thanks — we have your request.</h1>
        <p className="confirmation-lead">
          We&apos;ve received your order request. No payment has been taken yet —
          our team will email you to confirm availability and arrange payment{order ? " with your order details" : ""}.
        </p>
        {order ? (
          <p className="confirmation-ref">
            Order reference: <strong>{order}</strong>
          </p>
        ) : null}
        <p className="confirmation-support">
          Questions about your order? Email{" "}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
        </p>
        <div className="confirmation-actions">
          <Link className="button button-dark" href="/collections">
            Continue shopping
          </Link>
          <Link className="button button-ghost" href="/track-order">
            Track an order
          </Link>
        </div>
      </section>
    </main>
  );
}
