const cartRouter = require("express").Router();
const { userAuth } = require("../middleware/userAuth");
const User = require("../model/user");
const authRouter = require("./auth");

cartRouter.get("/cart", userAuth, async (req, res) => {
  try {
    const { user } = req;
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItems = await User.findById(user._id).populate("cart");
    if (!cartItems) return res.status(404).json({ message: "Cart not found" });

    res.json({ cart: cartItems.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.post("/cart/:productId", userAuth, async (req, res) => {
  try {
    const { user } = req;
    const { productId } = req.params;

    if (!user) return res.status(404).json({ message: "User not found" });

    const productExists = user.cart.find((id) => id.toString() === productId);
    if (productExists)
      return res
        .status(400)
        .json({ message: "Product already exists in cart" });

    user.cart.push(productId);
    await user.save();

    res.json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.delete("/cart/:productId", userAuth, async (req, res) => {
  try {
    const { user } = req;
    const { productId } = req.params;

    if (!user) return res.status(404).json({ message: "User not found" });

    const productExists = user.cart.find((id) => id.toString() === productId);
    if (!productExists)
      return res.status(404).json({ message: "Product not found in cart" });

    user.cart = user.cart.filter((id) => id.toString() !== productId);
    await user.save();

    res.json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = cartRouter;
