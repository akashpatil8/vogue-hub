const express = require("express");
const Product = require("../model/product");
const { userAuth } = require("../middleware/userAuth");
const productsRouter = express.Router();

productsRouter.get("/products", userAuth, async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productsRouter.post("/add-product", userAuth, async (req, res) => {
  try {
    const {
      name,
      brand,
      price,
      size,
      discountPrice,
      availability,
      description,
      rating,
      category,
      imageUrl,
    } = req.body;

    const product = new Product({
      name,
      brand,
      price,
      size,
      discountPrice,
      availability,
      description,
      rating,
      category,
      imageUrl,
    });

    if (!product) throw new Error("Product not created");

    await product.save();
    res.json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = productsRouter;
