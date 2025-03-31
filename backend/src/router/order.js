const express = require("express");
const { userAuth } = require("../middleware/userAuth");
const orderRouter = express.Router();
const Order = require("../model/order");
const crypto = require("crypto");
const Cart = require("../model/cart");

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.TEST_KEY_ID,
  key_secret: process.env.TEST_SECRET_KEY,
});

orderRouter.get("/orders", userAuth, async (req, res) => {
  try {
    const { user } = req;
    if (!user) return res.status(404).json({ message: "User not found" });

    const orders = await Order.find({ userId: user._id }).populate(
      "orderItems"
    );
    if (!orders) return res.status(404).json({ message: "Orders not found" });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

orderRouter.post("/orders", userAuth, async (req, res) => {
  try {
    const { user } = req;
    const { name, mobile, shippingAddress, totalPrice, orderItems } = req.body;

    if (!user) return res.status(404).json({ message: "User not found" });

    const options = {
      amount: totalPrice * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
      notes: {
        name,
        mobile,
        shippingAddress,
        orderItems,
        totalPrice,
      },
    };

    const order = await razorpay.orders.create(options);
    if (!order)
      return res.status(500).json({ message: "Order creation failed" });

    res.json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

orderRouter.post("/orders/save", userAuth, async (req, res) => {
  try {
    const { user } = req;
    const { orderId, paymentId, signature, notes } = req.body;

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!orderId || !paymentId || !signature || !notes)
      return res.status(400).json({ message: "Invalid data" });

    const order = new Order({
      userId: user._id,
      name: notes.name,
      mobile: notes.mobile,
      shippingAddress: notes.shippingAddress,
      totalPrice: notes.amount / 100,
      orderItems: notes.orderItems,
      paymentId,
      orderId,
      signature,
    });

    await order.save();

    await Cart.findOneAndUpdate(
      { userId: user._id },
      { $set: { cartItems: [] } }
    );

    res.json({ message: "Order saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = orderRouter;
