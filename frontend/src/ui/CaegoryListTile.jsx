import { motion } from "framer-motion";

export default function CatogoryListTile({ item, variants, index }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="final"
      custom={0.2 * index}
      viewport={{ once: true }}
      className="inline-flex items-center"
    >
      <label
        className="relative flex cursor-pointer items-center rounded-full p-3"
        htmlFor={item}
      >
        <input
          defaultChecked={index === 0}
          name="type"
          type="radio"
          className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 text-slate-900 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-slate-900 checked:before:bg-slate-900 hover:before:opacity-10"
          id={item}
        />
        <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-slate-900 opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
          </svg>
        </span>
      </label>
      <label
        className="mt-px cursor-pointer select-none font-light capitalize text-slate-700"
        htmlFor={item}
      >
        {item}
      </label>
    </motion.div>
  );
}
