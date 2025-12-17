import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import HeroTitle from "@/components/HeroTitle";
import Techstack from "@/components/Techstack";
import AboutMe from "@/components/AboutMe";
import Services from "@/components/Services";
import Projects from "@/components/Projects";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-10 sm:py-16 md:py-20"
    >
      <HeroTitle />
      <Techstack />
      <AboutMe />
      <Services />
      <Projects />
    </motion.div>
  );
}
