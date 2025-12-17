import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function Footer() {
  const socialLinks = [
    {
      href: "https://github.com/Leazter",
      icon: "simple-icons:github",
      label: "GitHub",
    },
    {
      href: "mailto:lorenzolester674@gmail.com",
      icon: "simple-icons:gmail",
      label: "Email",
    },
    {
      href: "https://www.facebook.com/lester.mendoza.7902564",
      icon: "simple-icons:facebook",
      label: "Facebook",
    },
  ];

  return (
    <footer className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-12 sm:py-16 bg-bg-base items-center justify-center gap-6 sm:gap-7">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-row gap-6 sm:gap-7"
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
          >
            <Icon icon={link.icon} fontSize={24} />
          </motion.a>
        ))}
      </motion.div>
      <motion.pre
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-sm sm:text-base text-center"
      >
        @2025 All rights reserved.
      </motion.pre>
    </footer>
  );
}
