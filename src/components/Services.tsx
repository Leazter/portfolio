import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      title: "Front-end",
      icon: "simple-icons:react",
      color: "#61DAFB",
      description:
        "Building front-end pages using React, Tailwindcss, and Shadcn. Prioritizing UI/UX.",
    },
    {
      title: "Back-end",
      icon: "simple-icons:supabase",
      color: "#3FCF8E",
      description:
        "Integrating Backend-as-a-Service such as Supabase and Firebase. Providing blazingly fast solutions.",
    },
    {
      title: "Database",
      icon: "simple-icons:mysql",
      color: "#4479A1",
      description:
        "Providing solutions for Databases using MySQL and other services that uses Relational Database and Non-Relational Database.",
    },
  ];

  return (
    <motion.div
      ref={ref}
      id="services"
      className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 flex flex-col gap-6 sm:gap-9"
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
          <strong className="text-transparent">Services</strong>
        </span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <Card className="h-full hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl">
                  {service.title}
                </CardTitle>
                <CardAction>
                  <Icon
                    icon={service.icon}
                    fontSize={service.title === "Database" ? 44 : 30}
                    color={service.color}
                  />
                </CardAction>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base">{service.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
