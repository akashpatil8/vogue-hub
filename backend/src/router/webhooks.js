const express = require("express");
const webhookRouter = express.Router();
const crypto = require("crypto");
const Order = require("../model/order");
const Cart = require("../model/cart");

webhookRouter.post(
  "/webhook/razorpay",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }),
  async (req, res) => {
    try {
      const signature = req.headers["x-razorpay-signature"];
      if (!signature) {
        return res
          .status(404)
          .json({ message: "Signature not found", success: false });
      }

      const genertedSignature = crypto
        .createHmac("sha256", process.env.TEST_SECRET_KEY)
        .update(req.rawBody)
        .digest("hex");

      if (signature !== genertedSignature) {
        console.log("Webhook signature mismatch");
        return res
          .status(400)
          .json({ success: false, message: "Invalid signature" });
      }

      // We only handle payment.captured event
      const event = req.body;
      if (event.event !== "payment.captured") {
        return res
          .status(200)
          .json({ success: true, message: "Event ignored" });
      }

      const payment = event.payload.payment.entity;
      const { order_id, id: paymentId, notes = {} } = payment;

      // UserId sent through the note while creating the order
      const userId = notes;
      if (!userId) {
        return res
          .status(400)
          .json({ message: "Missing userId in notes", success: false });
      }

      // Save to DB or trigger logic
      console.log("Payment Captured:", payment);
      const order = new Order({
        userId,
        name: notes.name,
        mobile: notes.mobile,
        shippingAddress: notes.shippingAddress,
        totalPrice: notes.amount / 100,
        orderItems: notes.orderItems,
        paymentId,
        orderId: order_id,
        signature,
      });

      await order.save();

      // Empty the user's cart
      await Cart.findOneAndUpdate({ userId }, { $set: { cartItems: [] } });
      console.log("✅ Order saved successfully via webhook");

      return res
        .status(200)
        .json({ success: true, message: "Order saved via webhook" });
    } catch (error) {
      console.error("Webhook error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

module.exports = webhookRouter;
