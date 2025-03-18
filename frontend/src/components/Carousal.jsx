import { motion } from "framer-motion";
import { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

import CarousalCard from "./CarousalCard";

import { carousalData as data } from "../../public/data/carousalData";

export default function Carousal() {
  const variants = {
    initial: { translateY: 30, opacity: 0 },
    final: {
      translateY: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  function prevSlide() {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }
  function nextSlide() {
    const isLastSlide = currentIndex === data.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  return (
    <main className="relative">
      <div className="h-60 overflow-hidden lg:h-[calc(100vh-5rem)]">
        {data.map((item) => (
          <CarousalCard
            key={item.id}
            item={item}
            currentIndex={currentIndex}
            variants={variants}
          />
        ))}
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1 sm:bottom-6 sm:gap-2 md:bottom-8 md:gap-4 lg:bottom-10">
        {data.map((_, i) => (
          <motion.div
            variants={variants}
            initial="initial"
            whileInView="final"
            key={i}
            className={`rounded-full ${currentIndex === i ? "h-1.5 w-1.5 bg-slate-200 lg:h-3 lg:w-3" : "h-1 w-1 bg-slate-400 lg:h-2.5 lg:w-2.5"}`}
          ></motion.div>
        ))}
      </div>

      <motion.button
        variants={variants}
        initial="initial"
        whileInView="final"
        onClick={prevSlide}
        className="absolute bottom-0 top-0 my-auto ml-4 grid h-8 w-8 place-items-center rounded-full bg-slate-300 opacity-70 duration-300 hover:bg-slate-50 lg:ml-8 lg:h-16 lg:w-16"
      >
        <GrPrevious className="lg:text-4xl" />
      </motion.button>
      <motion.button
        variants={variants}
        initial="initial"
        whileInView="final"
        onClick={nextSlide}
        className="absolute bottom-0 right-0 top-0 my-auto mr-4 grid h-8 w-8 place-items-center rounded-full bg-slate-300 opacity-70 hover:bg-slate-50 lg:mr-8 lg:h-16 lg:w-16"
      >
        <GrNext className="lg:text-4xl" />
      </motion.button>
    </main>
  );
}
