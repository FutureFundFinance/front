import { useState } from "react";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
import stripePromise from "../utils/stripe";

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    //@ts-ignore
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    const { id } = paymentMethod!;

    try {
      console.log(id);
      
      const response = await axios.post("/api/checkout", { id });
      console.log(response.data);
      router.push("/success");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mt-4 mb-4">
        <label>
        Amount
      </label>
      <input type="number" className="w-full px-4 py-2 border rounded-md dark:bg-darker dark:border-gray-700 focus:outline-none focus:ring focus:ring-primary-100 dark:focus:ring-primary-darker" />
      </div>
      <label>
        Card details
        <CardElement options={{}} />
      </label>
      <button type="submit" disabled={!stripe || loading} className="w-full px-4 py-2 font-medium text-center text-white transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 dark:focus:ring-offset-darker">
        {loading ? "Loading..." : "Add Money"}
      </button>
    </form>
  );
};

const AddMoneyComponent = () => {
  return (
    <div
        className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4 antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light"
      >
    <div className="w-full max-w-sm px-4 py-6 space-y-6 bg-white rounded-md dark:bg-darker">
            <h1 className="text-xl font-semibold text-center">Add Funds</h1>
 
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
    </div></div>
  );
};

export default AddMoneyComponent;
