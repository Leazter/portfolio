import { useAuthUser } from "@/hooks/useAuthState";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";

type Props = {
  description: string;
};

export default function AboutMe(props: Props) {
  const user = useAuthUser();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      id="about"
      className="pt-16 sm:pt-20 md:pt-24 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 flex flex-col gap-6 sm:gap-9"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <motion.span
        className="flex flex-row items-center justify-between"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2>
          <span className="text-3xl sm:text-4xl lg:text-5xl bg-linear-to-r from-primary-500 to-secondary-300 bg-clip-text">
            <strong className="text-transparent">About Me</strong>
          </span>
        </h2>
        {user && (
          <Button className="top-4 right-4 text-sm font-bold bg-linear-to-r from-primary-500 to-secondary-300">
            <Icon icon="lucide:pen-line" />
          </Button>
        )}
      </motion.span>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-base sm:text-lg md:text-xl leading-relaxed"
      >
        {props.description}
      </motion.p>
    </motion.div>
  );
}
