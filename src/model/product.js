const mongoose = require("mongoose");

const productModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    brand: { trim: true, type: String, required: true },
    price: { trim: true, type: Number, required: true },
    size: { trim: true, type: String, default: "N/A" },
    discountedPrice: { trim: true, type: Number, default: 0 },
    availability: { trim: true, type: Boolean, default: true },
    descrption: {
      trim: true,
      type: String,
      default: "This is the default description of the product",
    },
    rating: { trim: true, type: Number, default: 0 },
    category: { trim: true, type: String, required: true },
    imageUrl: { trim: true, type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productModel);

module.exports = Product;
