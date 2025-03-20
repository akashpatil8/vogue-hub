import { motion } from "framer-motion";
import { BiSolidStar } from "react-icons/bi";
import { LiaShoppingBagSolid } from "react-icons/lia";

import P from "../ui/P";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWislist,
} from "../redux/slices/wishlistSlice";
import toast from "react-hot-toast";
import { addToCart } from "../redux/slices/cartSlice";
import Spinner from "../ui/Spinner";
import { getDiscount } from "../utils/helper";

export default function ProductCard({ item, varients, i }) {
  const { _id, name, brand, price, discountedPrice, rating, imageUrl } = item;
  const dispatch = useDispatch();

  const { wishlist } = useSelector((store) => store.wishlist);
  const { cart } = useSelector((store) => store.cart);
  const isAddingProductToWishlist = useSelector(
    (store) => store.wishlist.loadingWishlistProducts[_id],
  );
  const isAddingProductToCart = useSelector(
    (store) => store.cart.loadingCartProducts[_id],
  );

  const isProdustInWishlist = wishlist?.some((item) => item._id === _id);
  const isProductInCart = cart?.some((item) => item._id === _id);

  const handleAddToWishlist = async () => {
    try {
      const addToWhistlistAction = await dispatch(
        addToWishlist({ productId: _id }),
      );

      if (!addToWishlist.fulfilled.match(addToWhistlistAction))
        throw new Error("Failed to add to wishlist");

      toast.success("Item added to wishlist");
    } catch (error) {
      console.error(error?.message);
      toast.error(error?.message);
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      const removeFromWishlistAction = await dispatch(
        removeFromWislist({ productId: _id }),
      );

      if (!removeFromWislist.fulfilled.match(removeFromWishlistAction))
        throw new Error("Failed to add to wishlist");

      toast.success("Item removed from wishlist");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const handleAddOrRemoveFromWishlist = () => {
    if (isProdustInWishlist) {
      handleRemoveFromWishlist();
    } else {
      handleAddToWishlist();
    }
  };

  const handleAddToCart = async () => {
    try {
      const addToCartAction = await dispatch(addToCart({ productId: _id }));

      if (!addToCart.fulfilled.match(addToCartAction))
        throw new Error("Failed to add to cart");

      toast.success("Added to cart");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      variants={varients}
      initial="initial"
      animate="final"
      custom={0.2 * i}
      className="relative w-40 text-left lg:w-56"
    >
      <img
        src={imageUrl}
        alt="product-img"
        className="mb-2 h-52 w-full rounded-sm bg-stone-400 object-cover lg:h-80 lg:rounded-md"
      />
      <div className="absolute bottom-[7.7rem] left-2 h-4 w-8 rounded-sm bg-slate-800 opacity-60 lg:bottom-36 lg:left-3 lg:h-6 lg:w-12"></div>
      <div className="absolute bottom-[7.7rem] left-2 flex h-4 w-8 items-center justify-center gap-0.5 rounded-sm text-[0.6rem] font-bold text-slate-100 lg:bottom-36 lg:left-3 lg:h-6 lg:w-12 lg:gap-1 lg:text-xs">
        <BiSolidStar />
        {rating}
      </div>

      <h2 className="overflow-hidden text-ellipsis text-xs font-medium tracking-wider lg:text-sm">
        {name}
      </h2>
      <P size="sm" className="text-left">
        {brand}
      </P>

      <div className="mt-2 flex items-center gap-2">
        <p className="text-xs font-bold lg:text-sm">
          ${discountedPrice > 0 ? discountedPrice : price}
        </p>
        {discountedPrice > 0 && (
          <>
            <p className="text-left text-xs text-stone-400 line-through">
              ${price}
            </p>
            <p className="text-xs font-light text-red-600 lg:text-sm">
              ({getDiscount(price, discountedPrice)}%)
            </p>
          </>
        )}
      </div>
      <div className="mt-5 flex justify-between gap-1 lg:gap-2">
        <button
          onClick={handleAddToCart}
          disabled={isProductInCart || isAddingProductToCart}
          className="flex h-8 w-[80%] items-center justify-center gap-1 rounded-sm bg-slate-800 text-xs font-medium text-slate-100 duration-200 hover:bg-slate-600 focus:outline-none focus:ring-[1px] focus:ring-slate-800 disabled:cursor-not-allowed lg:h-10 lg:rounded-md lg:text-sm"
        >
          {isAddingProductToCart && <Spinner type="dark" />}
          {!isAddingProductToCart && !isProductInCart && (
            <>
              <span>Add to bag</span>
              <LiaShoppingBagSolid className="text-base lg:text-xl" />
            </>
          )}
          {!isAddingProductToCart && isProductInCart && (
            <>
              <span>Added</span>
              <LiaShoppingBagSolid className="text-base lg:text-xl" />
            </>
          )}
        </button>
        <button
          onClick={handleAddOrRemoveFromWishlist}
          className="flex w-[20%] items-center justify-center gap-1 rounded-sm bg-slate-200 text-sm font-medium text-slate-800 duration-200 hover:bg-slate-300 focus:outline-none focus:ring-[1px] focus:ring-slate-400 disabled:cursor-not-allowed lg:h-10 lg:rounded-md"
        >
          {isAddingProductToWishlist ? (
            <Spinner type="dark" />
          ) : (
            <>
              {isProdustInWishlist ? (
                <IoHeart className="text-base lg:text-xl" />
              ) : (
                <IoHeartOutline className="text-base lg:text-xl" />
              )}
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
