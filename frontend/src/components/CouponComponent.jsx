import { RiCoupon3Line } from "react-icons/ri";
import P from "../ui/P";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function CouponComponent({ variants }) {
  return (
    <div className="lg:mt-12">
      <P variants={variants} custom={0.6} className="mb-2">
        Have a coupon? Enter your code here,
      </P>

      <motion.div
        variants={variants}
        initial="initial"
        animate="final"
        custom={0.8}
        className="mb-8 flex gap-1 lg:mb-0 lg:gap-2"
      >
        <div className="flex items-center gap-2 rounded-sm border-[1px] bg-white px-2 lg:w-80 lg:rounded-md lg:px-4 lg:py-2">
          <RiCoupon3Line className="text-sm text-slate-400 lg:text-xl" />
          <input
            id="coupon"
            type="text"
            placeholder="Enter coupon code"
            className="text-sm text-slate-600 placeholder:text-xs placeholder:text-slate-400 focus:outline-none lg:text-base lg:placeholder:text-base"
          />
        </div>
        <div>
          <Button onClick={() => toast.error("Coupon code invalid")}>
            Apply
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
