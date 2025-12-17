import { motion } from "motion/react";

import { type RobotMood } from "../@types";

type ArmsProps = {
  viewMood: RobotMood;
};

export const Arms = ({ viewMood }: ArmsProps) => (
  <motion.g
    animate={viewMood === "greet" ? { rotate: [0, 0, 10, 0] } : { rotate: 0 }}
    transition={
      viewMood === "greet" ? { duration: 0.8, ease: "easeInOut" } : undefined
    }
    style={{ transformOrigin: "60px 74px" }}
  >
    <rect x="18" y="66" width="18" height="10" rx="5" fill="#00B7BC" />
    <circle cx="18" cy="71" r="6" fill="#04363D" />

    <rect x="84" y="66" width="18" height="10" rx="5" fill="#00B7BC" />
    <circle cx="102" cy="71" r="6" fill="#04363D" />
  </motion.g>
);
