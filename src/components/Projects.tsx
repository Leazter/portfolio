import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Project = {
  image: string;
  title: string;
  description: string;
};

type Props = {
  projects: Project[];
};

export default function Projects({ projects }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      id="projects"
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
          <strong className="text-transparent">Projects</strong>
        </span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        <ul>
          {projects?.map((project) => (
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>
                  <span className="text-2xl sm:text-3xl lg:text-3xl bg-linear-to-r from-primary-500 to-secondary-300 bg-clip-text">
                    <strong className="text-transparent">
                      {project.title}
                    </strong>
                  </span>
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.img
                  src={project.image}
                  alt="SkillSprout project"
                  className="rounded-lg w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </CardContent>
            </Card>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
