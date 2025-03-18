import { motion } from "framer-motion";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const varients = {
  initial: { translateY: -30, opacity: 0 },
  final: {
    translateY: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export default function NavigationBar({
  to,
  name,
  itemCount,
  item = "products",
}) {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={varients}
      initial="initial"
      animate="final"
      className="mb-4 flex justify-between rounded-sm border-[1.3px] border-slate-300 p-2 lg:mb-8 lg:rounded-md lg:p-4"
    >
      <button
        onClick={() => navigate(to)}
        className="flex items-center gap-1 rounded-sm capitalize text-slate-800 focus:outline-none focus:ring-1 focus:ring-gray-800 lg:gap-2"
      >
        <GoArrowLeft className="lg:text-2xl" />
        <span className="text-xs lg:text-lg">{name}</span>
      </button>
      <h3 className="text-xs text-slate-800 lg:text-lg">
        Showing:{" "}
        <span className="font-semibold">{!itemCount ? "0" : itemCount}</span>{" "}
        {item}
      </h3>
    </motion.div>
  );
}
