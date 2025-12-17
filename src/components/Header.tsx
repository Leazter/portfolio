import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToggleTheme from "./ToggleTheme";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import { supabase } from "@/lib/supabase";

const SECTIONS = ["home", "about", "services", "projects"];

export default function Header() {
  const user = supabase.auth.getUser();
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
      },
    );

    SECTIONS.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-screen px-4 sm:px-8 lg:px-20 xl:px-40 pt-6 sm:pt-12 z-50"
    >
      <div className="bg-linear-to-r from-primary-500 to-secondary-200 p-1 rounded-[50px]">
        <div className="bg-background rounded-[50px] py-3 px-4 sm:px-7 flex justify-between items-center">
          <span className="flex items-center gap-2 sm:gap-0">
            <ToggleTheme />

            {/* Desktop Navigation */}
            <nav className="hidden lg:block pl-5">
              <ul className="flex gap-5">
                {SECTIONS.map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => navigateToSection(section)}
                      className={`capitalize transition-colors ${activeSection === section
                        ? "text-primary-500 font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {section}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden ml-2 p-2"
              aria-label="Toggle menu"
            >
              <Icon
                icon={isMenuOpen ? "lucide:x" : "lucide:menu"}
                fontSize={24}
              />
            </button>
          </span>

          <span className="flex flex-row gap-2">
            <a href="/login">
              <Button className="hidden sm:flex text-sm sm:text-base">
                {user ? "Logout" : "Login"}
              </Button>
            </a>
            <Button className="hidden sm:flex bg-linear-to-r from-primary-500 to-primary-400 text-sm sm:text-base">
              Download CV <Icon icon="lucide:arrow-down-to-line" />
            </Button>
          </span>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-4 bg-background border border-primary-500/20 rounded-3xl overflow-hidden"
          >
            <nav className="py-4">
              <ul className="flex flex-col">
                {SECTIONS.map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => navigateToSection(section)}
                      className={`w-full text-left px-6 py-3 capitalize transition-colors ${activeSection === section
                        ? "text-primary-500 font-semibold bg-primary-500/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                    >
                      {section}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="px-6 pt-3">
                <Button className="w-full bg-linear-to-r from-primary-500 to-primary-400">
                  Download CV <Icon icon="lucide:arrow-down-to-line" />
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
