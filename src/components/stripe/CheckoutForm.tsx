import React, { useState } from "react";import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { api } from "../../api/api-client";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError?.message) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return null;
    }

    const price = 1450;

    const res = await api.post("/payments/create-payment-intent", {
      price: price,
      email: emailInput,
      amount: price * 100,
      paymentMethodType: "card",
    });

    const { client_secret: clientSecret } = await res.data;

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });
    if (error) {
      console.log(error, "error");
      setErrorMessage("Hello I am aerr");
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-md ">
      <div className="mb-3">
        <label htmlFor="email-input">Email</label>
        <div>
          <input
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            type="email"
            id="email-input"
            placeholder="johndoe@gmail.com"
          />
        </div>
      </div>
      <PaymentElement options={{ layout: "tabs" }} />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
