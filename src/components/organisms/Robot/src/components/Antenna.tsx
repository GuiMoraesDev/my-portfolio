import { motion } from "motion/react";

import { type RobotMood } from "../@types";
import { antennaVariants } from "../config/variants";

type AntennaProps = {
  viewMood: RobotMood;
};

export const Antenna = ({ viewMood }: AntennaProps) => (
  <motion.g
    variants={antennaVariants}
    animate={viewMood}
    style={{ transformOrigin: "60px 30px" }}
  >
    <rect x="58" y="18" width="4" height="10" rx="2" fill="#1B3137" />
    <circle cx="60" cy="16" r="6" fill="#00B4D8" />
  </motion.g>
);
