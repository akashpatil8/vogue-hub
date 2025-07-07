import { GoPerson } from "react-icons/go";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import DropDownMenu from "./DropDownMenu";
import { cartThunk } from "../redux/slices/cartSlice";

const varients = {
  initial: { translateY: -50, opacity: 0 },
  final: (time) => ({
    translateY: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.2 + time },
  }),
};

export default function Header() {
  const [showDialog, setShowDialog] = useState(false);
  const { cart } = useSelector((store) => store.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(cartThunk());
  }, [dispatch]);

  return (
    <header className="grid h-10 bg-white px-6 shadow-lg lg:h-16 lg:px-[8%]">
      <nav className="flex items-center justify-between">
        <motion.button
          variants={varients}
          initial="initial"
          animate="final"
          viewport={{ once: true }}
          onClick={() => navigate("/home")}
          className="cursor-pointer"
        >
          <img
            src="https://ik.imagekit.io/akashpatil8/Voguehub/logo-dark.png?updatedAt=1751910271703"
            alt="logo-img"
            className="h-7 transition-transform duration-200 lg:h-11 lg:hover:scale-105"
          />
        </motion.button>
        <div className="flex items-center justify-end gap-2 text-end sm:gap-3 md:gap-5">
          <div
            className="relative text-center"
            onMouseEnter={() => setShowDialog(true)}
            onMouseLeave={() => setShowDialog(false)}
          >
            <motion.div
              variants={varients}
              initial="initial"
              animate="final"
              viewport={{ once: true }}
              custom={0.2}
            >
              <GoPerson className="cursor-pointer duration-150 lg:text-2xl lg:hover:scale-110" />
            </motion.div>
            <AnimatePresence>
              {showDialog && <DropDownMenu setShowDialog={setShowDialog} />}
            </AnimatePresence>
          </div>

          <div className="h-3 w-[1.2px] bg-slate-300 lg:h-5 lg:w-[1.5px]"></div>

          <motion.div
            variants={varients}
            initial="initial"
            animate="final"
            viewport={{ once: true }}
            custom={0.3}
            className="bg-transparent"
          >
            <IoMdHeartEmpty
              onClick={() => {
                navigate("/wishlist");
              }}
              className="cursor-pointer text-slate-800 duration-150 lg:text-2xl lg:hover:scale-110"
            />
          </motion.div>

          <div className="h-3 w-[1.2px] bg-slate-300 lg:h-5 lg:w-[1.5px]"></div>

          <motion.div
            variants={varients}
            initial="initial"
            animate="final"
            viewport={{ once: true }}
            custom={0.4}
            className="relative"
          >
            <HiOutlineShoppingBag
              onClick={() => {
                navigate("/checkout/cart");
              }}
              className="cursor-pointer text-slate-800 duration-150 lg:text-2xl lg:hover:scale-110"
            />

            {cart?.length > 0 && (
              <div className="absolute right-[-6px] top-[-6px] grid h-3 w-3 place-items-center rounded-full bg-slate-800 text-[0.5rem] text-slate-100 lg:h-4 lg:w-4 lg:text-xs">
                {cart?.length}
              </div>
            )}
          </motion.div>
        </div>
      </nav>
    </header>
  );
}
