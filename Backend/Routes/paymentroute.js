const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

const razorpayInstance = new Razorpay({
  key_id: 'rzp_test_MWAJneIEOdvo1h',
  key_secret: 'fYI3blnDVnJFWMqWBBZwRvrP'
});

router.post('/order', async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const options = {
      amount: amount,
      currency: currency,
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Failed to create payment order' });
  }
});

module.exports = router;
