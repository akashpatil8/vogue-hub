import { motion } from "framer-motion";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
// import { LuUser2 } from "react-icons/lu";

import H1 from "../ui/H1";
import Button from "../ui/Button";

const variants = {
  initial: { translateY: 80, opacity: 0 },
  final: (time) => ({
    translateY: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: time },
  }),
};

export default function AddBanner() {
  const navigate = useNavigate();

  return (
    <motion.main
      variants={variants}
      initial="initial"
      whileInView="final"
      viewport={{ once: true }}
      className="mx-[5%] my-16 flex lg:mx-[15%] lg:my-24"
    >
      <aside className="hidden w-[45%] rounded-l-xl bg-slate-300 lg:block">
        <img
          src="https://i.pinimg.com/736x/0a/6f/0f/0a6f0f60727318bea29f19ce96040b53.jpg"
          alt="banner-img"
          className="w-full rounded-bl-xl rounded-tl-xl object-cover"
        />
      </aside>
      <aside className="rounded-l-md rounded-r-md bg-slate-900 p-4 lg:w-[55%] lg:rounded-l-none lg:rounded-r-xl lg:p-8">
        <h3 className="text-[0.7rem] font-medium capitalize text-slate-400 lg:mb-2 lg:text-xs">
          LIMITED OFFER
        </h3>
        <H1 theme="light" className="lg:mb-12">
          35% off only on this friday and get special gift
        </H1>
        <Button
          onClick={() => {
            // isAuthenticated ? navigate("/shop") : popup(<LuUser2 />);
            navigate("/shop");
          }}
          type="light"
        >
          <span>Grab it Now</span>
          <GoArrowRight className="text-lg lg:text-3xl" />
        </Button>
      </aside>
    </motion.main>
  );
}
