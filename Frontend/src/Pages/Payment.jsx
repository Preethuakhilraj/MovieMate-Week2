/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import crypto from "crypto-js";

// Function to load script and append in DOM tree.
const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      console.log("razorpay loaded successfully");
      resolve(true);
    };
    script.onerror = () => {
      console.log("error in loading razorpay");
      resolve(false);
    };
    document.body.appendChild(script);
  });

const RenderRazorpay = ({
  orderId,
  keyId,
  // You can hardcode keySecret or pass it as props
  keySecret = 'fYI3blnDVnJFWMqWBBZwRvrP', // Hardcoded here for now
  currency,
  amount,
  onClose,
}) => {
  const paymentId = useRef(null);

  const displayRazorpay = async (options) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) return;

    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.submit", (response) => {
      paymentId.current = response.method;
    });
    rzp1.on("payment.failed", (response) => {
      paymentId.current = response.error.metadata.payment_id;
    });
    rzp1.open();
  };

  const handlePayment = async (status, orderDetails = {}) => {
    console.log(orderDetails);
    if (status === "succeeded") {
      onClose();
    }
  };

  const options = {
    key: keyId,
    amount,
    currency,
    name: "",
    order_id: orderId,
    handler: (response) => {
      console.log("Order ID:", orderId);
      console.log("Payment ID:", response.razorpay_payment_id);
      console.log("Key Secret:", keySecret);

      if (!keySecret) {
        console.error("Key Secret is missing");
        return;
      }

      const signatureToVerify = crypto
        .HmacSHA256(`${orderId}|${response.razorpay_payment_id}`, keySecret)
        .toString();

      console.log("Calculated Signature:", signatureToVerify);
      console.log("Response Signature:", response.razorpay_signature);

      const succeeded = signatureToVerify === response.razorpay_signature;
      if (succeeded) {
        handlePayment("succeeded", {
          orderId,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });
      } else {
        handlePayment("failed", {
          orderId,
          paymentId: response.razorpay_payment_id,
        });
      }
    },
    modal: {
      confirm_close: false,
      ondismiss: async (reason) => {
        if (reason === undefined) {
          console.log("Payment cancelled");
          handlePayment("Cancelled");
        } else if (reason === "timeout") {
          console.log("Payment timed out");
          handlePayment("timedout");
        } else {
          console.log("Payment failed");
          handlePayment("failed", reason);
        }
      },
    },
    retry: {
      enabled: false,
    },
    timeout: 900,
    theme: {
      color: "",
    },
  };

  useEffect(() => {
    displayRazorpay(options);
  }, []);

  return null;
};

export default RenderRazorpay;
