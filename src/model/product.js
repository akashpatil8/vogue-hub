const mongoose = require("mongoose");

const productModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      default: "N/A",
    },
    discountPrice: {
      type: Number,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    descrption: {
      type: String,
      default: "This is the default description of the product",
    },
    rating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productModel);

module.exports = Product;
