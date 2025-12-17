import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutMe() {
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
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="text-3xl sm:text-4xl lg:text-5xl bg-linear-to-r from-primary-500 to-secondary-300 bg-clip-text">
          <strong className="text-transparent">About Me</strong>
        </span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-base sm:text-lg md:text-xl leading-relaxed"
      >
        Hi! I'm Lester Mendoza, I'm a BSIT student and Basketball Athlete from
        La Consolacion University Philippines. I can balance my athleticism and
        upgrading my IT skills. I'm currently interested in developing Front-End
        Web applications using React.
      </motion.p>
    </motion.div>
  );
}
