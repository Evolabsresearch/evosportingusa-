import { shippingRateSummary } from "@/lib/cart";
import { formatMoney } from "@/lib/format";

export function ShippingRateNotice({ subtotal }: { subtotal: number }) {
  const rate = shippingRateSummary(subtotal);
  const hasItems = subtotal > 0;

  return (
    <div className="shipping-progress-box">
      <div className="shipping-progress-heading">
        <span>Standard shipping</span>
        <strong>{hasItems ? formatMoney(rate.shipping) : "Not applied"}</strong>
      </div>
      <p>{rate.message}</p>
    </div>
  );
}
