const mongoose = require("mongoose");

const orderModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
    },
    shippingAddress: {
      type: String,
      required: [true, "Shipping address is required"],
    },
    totalPrice: {
      type: String,
      required: [true, "Total price is required"],
      default: 0,
    },
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    paymentId: {
      type: String,
      required: [true, "Payment ID is required"],
    },
    orderId: {
      type: String,
      required: [true, "Order ID is required"],
    },
    signature: {
      type: String,
      required: [true, "Signature is required"],
    },
    deliveryDate: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //Add 7 days
    },
    isOrderDeliverd: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderModel);

module.exports = Order;
