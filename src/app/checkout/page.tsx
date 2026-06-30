import { CheckoutStepOne } from "@/components/checkout-step-one";

export const metadata = {
  title: "Checkout",
  description: "Add contact and delivery details for an EVO Sporting USA order.",
};

export default function CheckoutPage() {
  return <CheckoutStepOne />;
}
