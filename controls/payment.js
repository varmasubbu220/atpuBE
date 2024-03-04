
const Razorpay =require("razorpay")
const { handleAsyncError } = require('../utils/crudutil');
require('dotenv').config();
const razorpay = new Razorpay({
  key_id: process.env.razorpaykeyid,
  key_secret:process.env.razorkey,
});

const MakeOrder = handleAsyncError(async (req, res) => {
  const { amount, currency ,receiptId} = req.body;

  try {
    const orderOptions = {
      amount: amount, 
      currency: currency,
      receipt:receiptId, 
      payment_capture: 1 // auto capture
    };

    const order = await razorpay.orders.create(orderOptions);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports={MakeOrder};
