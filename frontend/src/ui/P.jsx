import { motion } from "framer-motion";

export default function P({
  children,
  size = "md",
  className = "",
  fontColor = "dark",
  variants,
  custom = null,
}) {
  return (
    <motion.p
      variants={variants}
      initial="initial"
      whileInView="final"
      viewport={{ once: true }}
      custom={custom}
      className={`font-light ${size === "sm" ? "lg:text-sm lg:font-normal" : "lg:text-base"} text-xs tracking-wide ${fontColor === "light" ? "text-slate-200" : "text-stone-400"} ${className}`}
    >
      {children}
    </motion.p>
  );
}
