import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import { Icon } from "@iconify/react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import img1 from "@/assets/img/img1.jpg";
import img2 from "@/assets/img/img2.jpg";
import img3 from "@/assets/img/img3.jpg";
import { Button } from "./ui/button";

export default function HeroTitle() {
  return (
    <div
      id="home"
      className="flex flex-col lg:flex-row items-center justify-around w-full max-w-screen px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 pb-10 gap-8 lg:gap-4"
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center lg:text-left"
      >
        <h1>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl block"
          >
            <strong>Hello! I'm Lester 👋</strong>
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-linear-to-r from-primary-500 to-secondary-300 bg-clip-text block"
          >
            <strong className="text-transparent">Software Developer</strong>
          </motion.span>
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a href="mailto:lorenzolester674@gmail.com" target="_blank">
            <Button className="mt-7 bg-primary-500 hover:bg-secondary-500 hover:scale-105 transition-transform">
              <Icon icon="simple-icons:gmail" />
              Let's Connect
              <Icon icon="lucide:arrow-right" />
            </Button>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="w-full max-w-md lg:max-w-lg xl:max-w-xl"
      >
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="flex w-full"
        >
          <CarouselContent>
            <CarouselItem>
              <img
                className="hero-img rounded-2xl shadow-2xl"
                src={img1}
                alt="Portfolio image 1"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                className="hero-img rounded-2xl shadow-2xl"
                src={img2}
                alt="Portfolio image 2"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                className="hero-img rounded-2xl shadow-2xl"
                src={img3}
                alt="Portfolio image 3"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </motion.div>
    </div>
  );
}
