import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { cartThunk } from "../../redux/slices/cartSlice";
import { useCallback, useEffect } from "react";
import { usePriceCalculation } from "../../hooks/usePriceCalculation";
import NavigationBar from "../NavigationBar";
import { motion } from "framer-motion";

import H1 from "../../ui/H1";
import Loader from "../../ui/Loader";
import BillingCard from "../../ui/BillingCard";
import emptyBag from "../../../public/assets/empty-bag.webp";
import CouponComponent from "../CouponComponent";
import CartItemListTile from "../CartItemListTile";

const variants = {
  initial: { translateY: -30, opacity: 0 },
  final: (time) => ({
    translateY: 0,
    opacity: 1,
    transition: { duration: 0.3, delay: time },
  }),
};

export default function Cart() {
  const dispatch = useDispatch();
  const { cart: cartItems, isCartLoading } = useSelector((store) => store.cart);

  const fetchCartItems = useCallback(async () => {
    try {
      const cartResultAction = await dispatch(cartThunk());

      if (!cartThunk.fulfilled.match(cartResultAction)) {
        console.error(cartResultAction.payload || "Error while fetching cart");
        toast.error(cartResultAction.payload || "Error while fetching cart");
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  }, [dispatch]);

  const { total, tax, shipping, subtotal } = usePriceCalculation(cartItems);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <section>
      {/* <main className="flex flex-1 flex-col px-[5%] pt-4 lg:px-[8%]"> */}
      {isCartLoading && <Loader />}
      {!isCartLoading && cartItems?.length === 0 && (
        <>
          {/* <NavigationBar itemCount={bagLength} to="/shop" name="shop" /> */}

          <H1 variants={variants} custom={0.2} className="uppercase lg:mb-4">
            Your Bag
          </H1>
          <motion.img
            variants={variants}
            initial="initial"
            animate="final"
            custom={0.4}
            src={emptyBag}
            alt="empty-bag-img"
            className="object-cover lg:h-[40%] lg:w-[40%]"
          />
        </>
      )}
      {!isCartLoading && cartItems?.length > 0 && (
        <>
          {/* <NavigationBar itemCount={bagLength} to="/shop" name="shop" /> */}

          <H1 variants={variants} custom={0.2} className="uppercase lg:mb-4">
            Your Bag
          </H1>
          <div className="lg:flex">
            <aside className="mb-4 lg:mr-auto lg:w-[60%]">
              <motion.ul
                variants={variants}
                initial="initial"
                animate="final"
                custom={0.4}
                className="my-4 h-[280px] overflow-y-auto lg:my-0 lg:pr-4"
              >
                {cartItems?.map((item) => (
                  <CartItemListTile
                    variants={variants}
                    key={item.id}
                    item={item}
                  />
                ))}
              </motion.ul>

              <CouponComponent variants={variants} />
            </aside>
            <div className="mr-8 hidden w-[1px] bg-slate-300 lg:block"></div>

            <BillingCard
              shipping={shipping}
              tax={tax}
              subtotal={subtotal}
              total={total}
              cartItems={cartItems}
            />
          </div>
        </>
      )}
    </section>
  );
}
