import { type Variants } from "motion/react";

export const MOTION_DURATION_MS = 240;
export const MOTION_DURATION_S = MOTION_DURATION_MS / 1000;
export const MOTION_STAGGER_S = 0.06;

type RevealDirection = "x" | "y";

type CreateRevealVariantsParams = {
  index?: number;
  direction?: RevealDirection;
  distance?: number;
  reducedMotion?: boolean;
};

export const createRevealVariants = ({
  index = 0,
  direction = "y",
  distance = 16,
  reducedMotion = false,
}: CreateRevealVariantsParams): Variants => {
  const hidden =
    reducedMotion || direction === "y"
      ? { y: reducedMotion ? 0 : distance, opacity: 0 }
      : { x: distance, opacity: 0 };

  return {
    offscreen: hidden,
    onscreen: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: MOTION_DURATION_S,
        ease: "easeOut",
        delay: Math.max(0, index) * MOTION_STAGGER_S,
      },
    },
  };
};
