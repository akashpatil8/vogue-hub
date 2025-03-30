const wishlistRouter = require("express").Router();
const User = require("../model/user");
const { userAuth } = require("../middleware/userAuth");
const Wishlist = require("../model/wishlist");

wishlistRouter.get("/wishlist", userAuth, async (req, res) => {
  try {
    const { user } = req;

    if (!user) return res.status(404).json({ message: "User not found" });

    let wishlist = await Wishlist.findOne({ userId: user._id });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: user._id, wishlistItems: [] });
    }

    if (!wishlist)
      return res.status(404).json({ message: "Wishlist not found" });

    const populatedWishlist = await wishlist.populate("wishlistItems");

    res.json({ wishlist: populatedWishlist.wishlistItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

wishlistRouter.post("/wishlist/:productId", userAuth, async (req, res) => {
  try {
    const { user } = req;
    const { productId } = req.params;

    if (!user) return res.status(404).json({ message: "User not found" });

    let wishlist = await Wishlist.findOne({ userId: user._id });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: user._id, wishlistItems: [] });
    }

    const productExists = wishlist.wishlistItems.find(
      (id) => id.toString() === productId
    );

    if (productExists)
      return res
        .status(400)
        .json({ message: "Product already exists in wishlist" });

    wishlist.wishlistItems.push(productId);
    await wishlist.save();

    const populatedWishlist = await wishlist.populate("wishlistItems");

    const product = populatedWishlist.wishlistItems.find(
      (item) => item._id.toString() === productId
    );

    res.json({ message: "Product added to wishlist successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

wishlistRouter.delete("/wishlist/:productId", userAuth, async (req, res) => {
  try {
    const { user } = req;
    const { productId } = req.params;

    if (!user) return res.status(404).json({ message: "User not found" });

    const wishlist = await Wishlist.findOne({ userId: user._id });
    if (!wishlist)
      return res.status(404).json({ message: "Wishlist not found" });

    const productExists = wishlist.wishlistItems.find(
      (id) => id.toString() === productId
    );

    if (!productExists)
      return res.status(404).json({ message: "Product not found in wishlist" });

    wishlist.wishlistItems = wishlist.wishlistItems.filter(
      (id) => id.toString() !== productId
    );
    await wishlist.save();

    res.json({ message: "Product removed from wishlist successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = wishlistRouter;
