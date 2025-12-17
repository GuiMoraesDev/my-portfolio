import { motion } from "motion/react";

import { type RobotMood } from "../@types";

const ChestBoard = ({ viewMood }: ChestProps) => (
  <>
    <motion.rect
      x="34"
      y="74"
      width="52"
      height="22"
      rx="8"
      fill="white"
      animate={
        viewMood === "thinking"
          ? { opacity: [0.92, 1, 0.92] }
          : viewMood === "success"
            ? { opacity: [1, 0.92, 1] }
            : { opacity: 1 }
      }
      transition={
        viewMood === "thinking"
          ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
          : viewMood === "success"
            ? { duration: 0.5, repeat: 2, ease: "easeOut" }
            : undefined
      }
    />
    <rect
      x="34"
      y="74"
      width="52"
      height="22"
      rx="8"
      fill="none"
      stroke="#1B3137"
      strokeWidth="2"
    />
  </>
);

const ChestText = ({ viewMood }: ChestProps) => (
  <motion.text
    x="60"
    y="87"
    textAnchor="middle"
    dominantBaseline="middle"
    fontFamily='ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial'
    fontSize="7"
    fontWeight="700"
    fill="#1B3137"
    animate={{ opacity: [0.9, 1, 0.9] }}
    transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
  >
    {viewMood === "thinking"
      ? "…"
      : viewMood === "success"
        ? "OK"
        : viewMood === "warning"
          ? "!"
          : viewMood === "sad"
            ? ":("
            : viewMood === "sleepy"
              ? "zZ"
              : "Hi"}
  </motion.text>
);

type ChestProps = {
  viewMood: RobotMood;
};
export const Chest = ({ viewMood }: ChestProps) => (
  <>
    <ChestBoard viewMood={viewMood} />
    <ChestText viewMood={viewMood} />
  </>
);
