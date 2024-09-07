const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
app.use(bodyParser.json());

const crypto = require("crypto");
const secret_key = "1234567890";

router.post("/order", async (req, res) => {
  const razorpay = new Razorpay({
    key_id: req.body.keyId,
    key_secret: req.body.keySecret,
  });
  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: "any unique id for every order",
    payment_capture: 1,
  };
  console.log(req.body.keyId);
  console.log(req.body.keySecret);
  try {
    const response = await razorpay.orders.create(options);
    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Not able to create order. Please try again!");
  }
});

router.post("/paymentCapture", (req, res) => {
  const data = crypto.createHmac("sha256", secret_key);
  data.update(JSON.stringify(req.body));
  const digest = data.digest("hex");
  if (digest === req.headers["x-razorpay-signature"]) {
    res.json({
      status: "ok",
    });
  } else {
    res.status(400).send("Invalid signature");
  }
});

router.post("/refund", async (req, res) => {
  try {
    const options = {
      payment_id: req.body.paymentId,
      amount: req.body.amount,
    };
    const razorpayResponse = await razorpay.refund(options);
    res.send("Successfully refunded");
  } catch (error) {
    res.status(400).send("unable to issue a refund");
  }
});

module.exports = router;