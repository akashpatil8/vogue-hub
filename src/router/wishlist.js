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

    user.wishlist.push(productId);
    await user.save();

    res.json({ message: "Product added to wishlist successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = wishlistRouter;
