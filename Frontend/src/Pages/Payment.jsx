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
  keySecret,
  currency,
  amount,
  onClose,
}) => {
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);

  // Load razorpay checkout modal.
  const displayRazorpay = async (options) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      return;
    }
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.submit", (response) => {
      paymentMethod.current = response.method;
    });
    rzp1.on("payment.failed", (response) => {
      paymentId.current = response.error.metadata.payment_id;
    });
    rzp1.open();
  };

  // Handling payment status
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
    name: "Preethu",
    order_id: orderId,
    handler: (response) => {
      paymentId.current = response.razorpay_payment_id;
      const succeeded =
        crypto
          .HmacSHA256(`${orderId}|${response.razorpay_payment_id}`, keySecret)
          .toString() === response.razorpay_signature;
      if (succeeded) {
        handlePayment("succeeded", {
          orderId,
          paymentId,
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
        const {
          reason: paymentReason,
          field,
          step,
          code,
        } = reason && reason.error ? reason.error : {};
        if (reason === undefined) {
          console.log("cancelled");
          handlePayment("Cancelled");
        } else if (reason === "timeout") {
          console.log("timedout");
          handlePayment("timedout");
        } else {
          console.log("failed");
          handlePayment("failed", {
            paymentReason,
            field,
            step,
            code,
          });
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
