"use client";

import { motion } from "motion/react";

import { CarretShape } from "./src/components/shapes/Carret";
import {
  DEFAULT_SIZE,
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
} from "./src/config/constants";
import { ROOT_VARIANTS } from "./src/config/variants";

export function MascotBuddy() {
  return (
    <motion.svg
      width={DEFAULT_SIZE}
      height={DEFAULT_SIZE}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      className="fixed right-10 bottom-10 z-50"
      role="img"
      aria-label="Caret buddy"
      initial={false}
      animate="caret"
      variants={ROOT_VARIANTS}
      whileHover="tickle"
    >
      <CarretShape />
    </motion.svg>
  );
}
