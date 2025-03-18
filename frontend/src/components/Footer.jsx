import { motion } from "framer-motion";

const varients = {
  initial: { translateY: -20, opacity: 0 },
  final: (time) => ({
    translateY: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: time },
  }),
};

export default function Footer() {
  return (
    <motion.footer
      variants={varients}
      initial="initial"
      whileInView="final"
      viewport={{ once: true }}
      className="flex h-10 items-center bg-slate-200 text-slate-800 lg:h-16"
    >
      <p className="mx-auto text-[0.6rem] tracking-wide text-stone-500 lg:text-sm">
        Copyright©2025 VogueHub. All rights reserved.
      </p>
    </motion.footer>
  );
}
