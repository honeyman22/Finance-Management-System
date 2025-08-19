import { loadStripe } from "@stripe/stripe-js";import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    theme: "flat",
    variables: {
      colorPrimaryText: "#10a158",
      colorText: "#10a158",
    },
    
  },
  layout: {
    type: "tabs",
    defaultCollapsed: false,
  },
} as const;

const Checkout = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

  return (
    <div className="flex container mt-8">
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;
