import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LuUserRound } from "react-icons/lu";

import H1 from "../ui/H1";
import P from "../ui/P";
import Button from "../ui/Button";

const variants = {
  initial: { translateY: 80, opacity: 0 },
  final: (time) => ({
    translateY: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: time },
  }),
};

export default function CTA() {
  const navigate = useNavigate();

  return (
    <main className="mx-[5%] my-12 text-center lg:mx-[8%] lg:my-24">
      <div className="mx-auto w-[80%]">
        <H1 variants={variants} className="mb-2">
          Subscribe to our newsletter to get updates to our latest collections
        </H1>
        <P
          variants={variants}
          custom={0.2}
          className="mb-4 font-light text-stone-500"
        >
          Get 20% on your first order just by subscribing to our newsletter
        </P>
      </div>
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        custom={0.4}
        className="mx-auto flex h-10 w-[70%] items-center justify-center gap-1 lg:h-12 lg:gap-2"
      >
        <div className="flex h-full items-center gap-2 rounded-sm bg-slate-100 px-2 lg:rounded-md lg:px-4">
          <LuUserRound className="text-slate-500 lg:text-xl" />
          <input
            id="email"
            type="email"
            placeholder="Name"
            className="h-6 bg-slate-100 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none lg:h-8 lg:text-base lg:placeholder:text-base"
          />
        </div>
        <div>
          <Button
            className="mt-0"
            onClick={() => {
              // isAuthenticated ? navigate("/shop") : popup(<LuUserRound  />);
              navigate("/shop");
            }}
          >
            Subscribe
          </Button>
        </div>
      </motion.div>
      <P variants={variants} custom={0.4} size="sm" className="mt-2 lg:mt-4">
        You will be able to unsubscribe at anytime.
        <br />
        Read our privecy policy,
        <span className="font-medium text-stone-500 underline hover:cursor-pointer">
          here
        </span>
      </P>
    </main>
  );
}
