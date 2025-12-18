import { motion, type Variants } from "motion/react";
import { useMemo } from "react";

import { ENERGY, VIEWBOX_WIDTH } from "../../../config/constants";
import { useMascotState } from "../../../provider/MascotStateProvider";

type MouthProps = {
  elementY: number;
};

const MOUTH_X = VIEWBOX_WIDTH / 2;

export function Mouth({ elementY }: MouthProps) {
  const { activeAction } = useMascotState();
  const mood = activeAction?.mood || "idle";

  const mouthY = useMemo(() => elementY + 26, [elementY]);

  const mouthVariants: Variants = useMemo(
    () => ({
      idle: {
        d: rectPath(MOUTH_X, mouthY, 8, 2, 2),
        scaleY: 1,
        transform: "rotate(0deg)",
      },
      happy: {
        d: rectPath(MOUTH_X, mouthY * 0.95, 12, 3, 8),
        scaleY: 1.02,
        transform: "rotate(0deg)",
      },
      sad: {
        d: rectPath(MOUTH_X, mouthY, 8, 3, -3),
        scaleY: 1,
        transform: "rotate(0deg)",
      },
      surprised: {
        d: circlePath(MOUTH_X, mouthY * 1.05, 8, 5, 5),
        scaleY: 1,
        transform: "rotate(0deg)",
      },
      thinking: {
        d: rectPath(MOUTH_X * 1.05, mouthY, 7, 2, 0),
        scaleY: 1,
        transform: "rotate(-10deg)",
      },
      talking: {
        d: [
          circlePath(MOUTH_X, mouthY, 10, 4, 4),
          circlePath(MOUTH_X, mouthY, 10, 2, 1),
        ],
        transition: {
          duration: ENERGY * 0.6,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "easeInOut",
          rotate: 0,
        },
      },
    }),
    [mouthY],
  );

  return (
    <motion.g
      aria-label="mouth"
      style={{ transformOrigin: "50% 50%" }}
      className="absolute top-1/2 left-1/2 z-50 opacity-100"
    >
      <motion.path
        className="fill-white stroke-black dark:fill-black dark:stroke-white"
        stroke="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={mouthVariants}
        initial="idle"
        animate={mood}
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 34,
          mass: 0.2,
        }}
      />
    </motion.g>
  );
}

const rectPath = (
  canvasX: number,
  canvasY: number,
  width: number,
  height: number,
  curve: number,
) => {
  const x1 = canvasX - width;
  const x2 = canvasX + width;
  const y1 = canvasY - height;
  const y2 = canvasY + height;

  return `
    M ${x1} ${y1}
    Q ${canvasX} ${y1 + curve} ${x2} ${y1}
    L ${x2} ${y2}
    Q ${canvasX} ${y2 + curve} ${x1} ${y2}
    Z
  `;
};

const circlePath = (
  canvasX: number,
  canvasY: number,
  width: number,
  height: number,
  curve: number,
) => {
  const x1 = canvasX - width;
  const x2 = canvasX + width;
  const y1 = canvasY - height;
  const y2 = canvasY + height;

  return `
    M ${x1} ${y1}
    Q ${canvasX} ${y1 - curve} ${x2} ${y1}
    L ${x2} ${y2}
    Q ${canvasX} ${y2 + curve} ${x1} ${y2}
    Z
  `;
};
