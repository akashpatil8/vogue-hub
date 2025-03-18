import { useDispatch, useSelector } from "react-redux";
import { wishlistThunk } from "../redux/slices/wishlistSlice";
import toast from "react-hot-toast";
import { useCallback, useEffect } from "react";
import Loader from "../ui/Loader";
import NavigationBar from "../components/NavigationBar";
import H1 from "../ui/H1";
import P from "../ui/P";
import WishwishlistContainer from "../components/ProductContainer";

const variants = {
  initial: { translateY: -30, opacity: 0 },
  final: (time) => ({
    translateY: 0,
    opacity: 1,
    transition: { duration: 0.3, delay: time },
  }),
};

export default function Wishlist() {
  const dispatch = useDispatch();
  const { wishlist, isWishlistLoading } = useSelector(
    (store) => store.wishlist,
  );

  const fetchWishlistItems = useCallback(async () => {
    try {
      const resultAction = await dispatch(wishlistThunk());

      if (!wishlistThunk.fulfilled.match(resultAction)) {
        console.error(resultAction.payload || "Error while fetching wishlist");
        toast.error(resultAction.payload || "Error while fetching wishlist");
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchWishlistItems();
  }, [fetchWishlistItems]);

  return (
    <main className="flex-1 rounded-md px-[5%] py-4 lg:rounded-lg lg:px-[8%]">
      {isWishlistLoading && <Loader />}
      {!isWishlistLoading && wishlist?.length === 0 && (
        <>
          <NavigationBar to="/home" name="Home" itemCount={wishlist?.length} />
          <H1 variants={variants} custom={0.2} className="uppercase lg:mb-8">
            Your Wishlist
          </H1>
          <P variants={variants} custom={0.4}>
            Your wishlist is empty
          </P>
        </>
      )}
      {!isWishlistLoading && wishlist?.length !== 0 && (
        <>
          <NavigationBar to="/shop" name="Shop" itemCount={wishlist?.length} />
          <H1 variants={variants} custom={0.2} className="uppercase lg:mb-8">
            Your Wishlist
          </H1>
          <WishwishlistContainer items={wishlist} />
        </>
      )}
    </main>
  );
}
