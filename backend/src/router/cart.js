const cartRouter = require("express").Router();
const { userAuth } = require("../middleware/userAuth");
const Cart = require("../model/cart");
const User = require("../model/user");
const authRouter = require("./auth");

cartRouter.get("/cart", userAuth, async (req, res) => {
  try {
    const { user } = req;
    if (!user) return res.status(404).json({ message: "User not found" });

    let cart = await Cart.findOne({ userId: user._id });
    if (!cart) {
      cart = new Cart({ userId: user._id, cartItems: [] });
    }

    const populatedCart = await cart.populate("cartItems");

    res.json({ cart: populatedCart.cartItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.post("/cart/:productId", userAuth, async (req, res) => {
  try {
    const { user } = req;
    const { productId } = req.params;

    if (!user) return res.status(404).json({ message: "User not found" });

    let cart = await Cart.findOne({ userId: user._id });

    if (!cart) {
      cart = new Cart({ userId: user._id, cartItems: [] });
    }

    const productExists = cart.cartItems.find(
      (id) => id.toString() === productId
    );
    if (productExists)
      return res
        .status(400)
        .json({ message: "Product already exists in cart" });

    cart.cartItems.push(productId);
    await cart.save();

    const populatedCart = await cart.populate("cartItems");

    const product = populatedCart.cartItems.find(
      (item) => item._id.toString() === productId
    );

    res.json({ message: "Product added to cart successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.delete("/cart/:productId", userAuth, async (req, res) => {
  try {
    const { user } = req;
    const { productId } = req.params;

    if (!user) return res.status(404).json({ message: "User not found" });

    let cart = await Cart.findOne({ userId: user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productExists = cart.cartItems.find(
      (id) => id.toString() === productId
    );
    if (!productExists)
      return res.status(404).json({ message: "Product not found in cart" });

    const cartItems = cart.cartItems.filter(
      (id) => id.toString() !== productId
    );
    cart.cartItems = cartItems;

    await cart.save();

    res.json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = cartRouter;
