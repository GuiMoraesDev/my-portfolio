import { type Variants } from "motion/react";

import { ENERGY } from "./constants";

export const CARET_VARIANTS: Variants = {
  caret: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
  hidden: { opacity: 0 },
};

const TICKLE_VARIANTS: Variants = {
  tickle: {
    rotate: [0, -3 * ENERGY, 3 * ENERGY, -2 * ENERGY, 2 * ENERGY, 0],
    y: [0, -2 * ENERGY, 0],
    transition: { duration: 0.35, ease: "easeInOut" },
  },
};

export const ROOT_VARIANTS: Variants = {
  caret: { opacity: 1, scale: 1, rotate: 0, y: 0 },
  hidden: { opacity: 0, scale: 0.98, transition: { duration: 0.15 } },
  ...TICKLE_VARIANTS,
};
