import { motion } from "framer-motion";

import H2 from "./H2";
import P from "./P";

export default function ServiceCard({ item, variants, i }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="final"
      viewport={{ once: true }}
      custom={i * 0.2}
      className="lg:w-[22%]"
    >
      <div className="mx-auto mb-2 grid h-10 w-10 place-content-center rounded-sm bg-slate-100 transition-transform duration-150 hover:scale-125 lg:mx-0 lg:mb-4 lg:h-14 lg:w-14 lg:rounded-md ">
        <img src={item.icon} className="h-5 lg:h-7" alt="product-img" />
      </div>
      <H2 className="mb-1">{item.title}</H2>
      <P>{item.subtitle}</P>
    </motion.div>
  );
}
