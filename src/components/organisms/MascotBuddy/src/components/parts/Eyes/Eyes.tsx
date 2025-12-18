import { motion, type Variants } from "motion/react";
import { type RefObject } from "react";

import { ENERGY, VIEWBOX_WIDTH } from "../../../config/constants";

import { usePupilFollow } from "./src/hooks/usePupilFollow";

type EyesProps = Pick<EyeProps, "elementY"> & {
  wrapperRef: RefObject<HTMLElement | null>;
};

const LEFT_EYE_X = VIEWBOX_WIDTH / 2 - 10;
const RIGHT_EYE_X = VIEWBOX_WIDTH / 2 + 10;

export const Eyes = ({ elementY, wrapperRef }: EyesProps) => {
  const follow = usePupilFollow(wrapperRef, {
    maxOffset: 2.4,
    engageRadius: 160,
  });

  return (
    <motion.g
      style={{ transformOrigin: "50% 50%" }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.12 }}
    >
      <Eye eyeX={LEFT_EYE_X} elementY={elementY} follow={follow} />

      <Eye eyeX={RIGHT_EYE_X} elementY={elementY} follow={follow} />
    </motion.g>
  );
};

const EYE_BLINK_VARIANTS: Variants = {
  open: { scaleY: 1 },
  blink: {
    scaleY: [1, 1, 0.08, 1, 1],
    transition: {
      duration: 2.4 - 0.8 * ENERGY,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.46, 0.5, 0.54, 1],
    },
  },
};

const PUPIL_LOOK_VARIANTS: Variants = {
  still: { x: 0, y: 0 },
  look: {
    x: [0, 1.2 * ENERGY, -1.2 * ENERGY, 0],
    transition: {
      duration: 3.0 - 0.9 * ENERGY,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

type EyeProps = {
  elementY: number;
  eyeX: number;
  follow: { x: number; y: number };
};

const Eye = ({ elementY, eyeX, follow }: EyeProps) => {
  const isFollowing = follow.x !== 0 || follow.y !== 0;

  const eyeY = elementY + 10;

  const eyeStyle = {
    transformBox: "fill-box" as const,
    transformOrigin: "center" as const,
  };

  return (
    <motion.g
      style={eyeStyle}
      variants={EYE_BLINK_VARIANTS}
      initial="open"
      animate={isFollowing ? "open" : "blink"}
    >
      <circle cx={eyeX} cy={eyeY} r={7.2} fill="rgba(255,255,255,0.95)" />
      <motion.circle
        style={eyeStyle}
        cx={eyeX}
        cy={eyeY}
        r={3.2}
        fill="rgba(0,0,0,0.65)"
        variants={PUPIL_LOOK_VARIANTS}
        initial="still"
        animate={{
          cx: eyeX + follow.x,
          cy: eyeY + follow.y,
        }}
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 30,
          mass: 0.25,
        }}
      />
    </motion.g>
  );
};
