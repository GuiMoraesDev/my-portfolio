import { motion } from "motion/react";
import { useMemo } from "react";

import { type RobotMood } from "../@types";
import { eyesVariants } from "../config/variants";

type EyesProps = {
  viewMood: RobotMood;
};

const LeftEye = () => (
  <>
    <rect x="32" y="46" width="14" height="14" rx="4" fill="#FFBF36" />
    <motion.circle
      cx="36.4"
      cy="50.5"
      r="1.2"
      fill="white"
      animate={{ opacity: [0.15, 0.55, 0.15] }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </>
);

const MiddleEye = () => (
  <>
    <rect x="53" y="46" width="14" height="14" rx="4" fill="#C6966D" />
    <motion.circle
      cx="57.4"
      cy="50.5"
      r="1.2"
      fill="white"
      animate={{ opacity: [0.15, 0.55, 0.15] }}
      transition={{
        duration: 2.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2,
      }}
    />
  </>
);

const RightEye = () => (
  <>
    <rect x="74" y="46" width="14" height="14" rx="4" fill="#91513C" />
    <motion.circle
      cx="78.4"
      cy="50.5"
      r="1.2"
      fill="white"
      animate={{ opacity: [0.15, 0.55, 0.15] }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.35,
      }}
    />
  </>
);

export const Eyes = ({ viewMood }: EyesProps) => {
  const blinkDelay = useMemo(
    () => (viewMood === "thinking" ? 2.1 : viewMood === "sleepy" ? 1.6 : 3.2),
    [viewMood],
  );

  return (
    <motion.g
      variants={eyesVariants}
      animate={viewMood}
      style={{ filter: "saturate(1)" }}
    >
      <motion.g
        animate={{ scaleY: [1, 1, 0.12, 1] }}
        transition={{
          duration: 0.16,
          repeat: Infinity,
          repeatDelay: blinkDelay,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "60px 53px" }}
      >
        <LeftEye />
        <MiddleEye />
        <RightEye />
      </motion.g>
    </motion.g>
  );
};
