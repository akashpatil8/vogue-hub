const express = require("express");
const { userAuth } = require("../middleware/userAuth");
const orderRouter = express.Router();
const Order = require("../model/order");

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
    const {
      name,
      mobile,
      shippingAddress,
      paymentStatus,
      totalPrice,
      orderItems,
    } = req.body;

    if (!user) return res.status(404).json({ message: "User not found" });

    const order = new Order({
      userId: user._id,
      name,
      mobile,
      shippingAddress,
      paymentStatus,
      totalPrice,
      orderItems,
    });

    await order.save();

    res.json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = orderRouter;
