import { CheckoutStepTwo } from "@/components/checkout-step-two";

export const metadata = {
  title: "Review",
  description: "Review your order details before placing your request.",
};

export default function PaymentPage() {
  return <CheckoutStepTwo />;
}
