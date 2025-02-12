const wishlistRouter = require("express").Router();
const User = require("../model/user");
const { userAuth } = require("../middleware/userAuth");

wishlistRouter.get("/wishlist", userAuth, async (req, res) => {
  try {
    const { user } = req;

    if (!user) return res.status(404).json({ message: "User not found" });

    const wishlistItems = await User.findById(user._id).populate("wishlist");
    if (!wishlistItems)
      return res.status(404).json({ message: "Wishlist not found" });

    res.json({ wishlist: wishlistItems.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

wishlistRouter.post("/wishlist/:productId", userAuth, async (req, res) => {
  try {
    const { user } = req;
    const { productId } = req.params;

    if (!user) return res.status(404).json({ message: "User not found" });

    const productExists = user.wishlist.find(
      (id) => id.toString() === productId
    );

    if (productExists)
      return res
        .status(400)
        .json({ message: "Product already exists in wishlist" });

    user.wishlist.push(productId);
    await user.save();

    res.json({ message: "Product added to wishlist successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

wishlistRouter.delete("/wishlist/:productId", userAuth, async (req, res) => {
  try {
    const { user } = req;
    const { productId } = req.params;

    if (!user) return res.status(404).json({ message: "User not found" });

    const productExists = user.wishlist.find(
      (id) => id.toString() === productId
    );

    if (!productExists)
      return res.status(404).json({ message: "Product not found in wishlist" });

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    res.json({ message: "Product removed from wishlist successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = wishlistRouter;
