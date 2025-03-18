import { motion } from "framer-motion";

export default function BillingCardListTile({
  title,
  value,
  type,
  varients,
  custom = null,
}) {
  if (type === "total")
    return (
      <motion.div
        variants={varients}
        initial="initial"
        whileInView="final"
        custom={custom}
        className="mb-4 mt-3 flex justify-between lg:mb-8 lg:mt-6"
      >
        <h4 className="font-semibold capitalize text-slate-800 lg:text-lg">
          {title}
        </h4>
        <h4 className="font-bold lg:text-xl">${value}</h4>
      </motion.div>
    );

  return (
    <motion.div
      variants={varients}
      initial="initial"
      whileInView="final"
      custom={custom}
      className="mb-3 flex justify-between lg:mb-4"
    >
      <h4 className="text-xs font-light capitalize text-slate-500 lg:text-sm">
        {title}
      </h4>
      <h4 className="text-xs font-semibold lg:text-base">${value}</h4>
    </motion.div>
  );
}
