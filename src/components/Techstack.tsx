import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import MarqueeItem from "./Marquee";

export default function Techstack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const techStack = [
    {
      icon: "simple-icons:html5",
      color: "#E34F26",
    },
    {
      icon: "simple-icons:css3",
      color: "#663399",
    },
    {
      icon: "simple-icons:javascript",
      color: "#F7DF1E",
    },
    {
      icon: "simple-icons:python",
      color: "#3776AB",
    },
    {
      icon: "simple-icons:flutter",
      color: "#02569B",
    },
    {
      icon: "simple-icons:react",
      color: "#61DAFB",
    },
    {
      icon: "simple-icons:supabase",
      color: "#3FCF8E",
    },
    {
      icon: "simple-icons:firebase",
      color: "#DD2C00",
    },
    {
      icon: "simple-icons:mysql",
      color: "#4479A1",
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full overflow-hidden border-y px-4 sm:px-6 py-6 sm:py-8 mt-5"
    >
      <MarqueeItem items={techStack} from={0} to="-100%" />
    </motion.div>
  );
}
