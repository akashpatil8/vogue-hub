import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
// import { LuUser2 } from "react-icons/lu";

import Button from "../ui/Button";

export default function CarousalCard({ item, currentIndex, variants }) {
  const navigate = useNavigate();

  const { url, title } = item;

  return (
    <div
      className="h-full transition-opacity duration-300"
      style={{
        transform: `translateY(${-100 * currentIndex}%)`,
      }}
    >
      <img
        src={url}
        alt="carousal-img"
        className="absolute h-full w-full object-cover"
      />
      <div className="absolute h-full w-full bg-stone-800 opacity-60"></div>
      <div className="absolute flex h-full w-full flex-col items-center justify-center gap-2 align-middle opacity-100 lg:gap-14">
        <motion.span
          variants={variants}
          initial="initial"
          whileInView="final"
          className="mx-auto w-[70%] text-center text-xl font-semibold tracking-wide text-white sm:text-4xl md:text-6xl lg:w-[80%] lg:text-7xl lg:tracking-wider"
        >
          {title}
        </motion.span>
        <div>
          <Button
            variants={variants}
            initial="initial"
            whileInView="final"
            onClick={() => {
              // isAuthenticated ? navigate("/shop") : popup(<LuUser2 />);
              navigate("/shop");
            }}
            type="light"
          >
            Explore Now
            <GoArrowRight className="text-lg lg:text-2xl" />
          </Button>
        </div>
      </div>
    </div>
  );
}
