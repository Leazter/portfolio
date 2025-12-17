import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

type TechItem = {
  icon: string;
  color: string;
};

export default function MarqueeItem({
  items,
  from,
  to,
}: {
  items: TechItem[];
  from: number | string;
  to: number | string;
}) {
  return (
    <div className="relative w-full overflow-hidden min-w-0">
      <div className="flex w-max">
        {[0, 1].map((_, loopIndex) => (
          <motion.div
            key={loopIndex}
            initial={{ x: `${from}` }}
            animate={{ x: `${to}` }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="flex shrink-0"
          >
            {items.map((item, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.2, y: -4 }}
                transition={{ duration: 0.2 }}
                className="min-w-32 sm:min-w-40 md:min-w-52 text-center pr-12 sm:pr-16 md:pr-20 flex items-center justify-center text-base-content/30 hover:text-primary cursor-pointer"
              >
                <Icon
                  icon={item.icon}
                  color={item.color}
                  className="text-3xl sm:text-4xl"
                />
              </motion.span>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
