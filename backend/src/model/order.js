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
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      default: 0,
    },
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderModel);

module.exports = Order;
