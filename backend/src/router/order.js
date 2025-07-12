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

    const orders = await Order.find({ userId: user._id })
      .populate("orderItems")
      .select("-paymentId -signature")
      .sort({ createdAt: -1 });
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

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const options = {
      amount: totalPrice * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
      notes: {
        userId: user._id.toString(),
        name,
        mobile,
        shippingAddress,
        orderItems,
        totalPrice,
      },
    };

    const order = await razorpay.orders.create(options);

    if (!order)
      return res
        .status(500)
        .json({ success: false, message: "Order creation failed" });

    return res.json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

orderRouter.get("/orders/payment-status/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(202).json({ message: "Pending" }); // 202 = Accepted, not yet processed
    }

    res.status(200).json({ message: "Payment successful", order });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = orderRouter;
