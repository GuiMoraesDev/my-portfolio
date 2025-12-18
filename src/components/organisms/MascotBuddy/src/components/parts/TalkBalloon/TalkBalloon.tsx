import { motion, AnimatePresence } from "motion/react";

import {
  TEXT_ANIMATION_DELAY,
  TEXT_ANIMATION_DURATION,
} from "../../../config/constants";
import { useMascotState } from "../../../provider/MascotStateProvider";

export const TalkBalloon = () => {
  const { activeAction } = useMascotState();

  if (activeAction?.type !== "talk") return null;

  const letters = activeAction.payload.text.split("");

  return (
    <AnimatePresence>
      {activeAction.payload.text ? (
        <motion.span
          key={activeAction.payload.text}
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 520,
            damping: 36,
          }}
          className="pointer-events-none absolute top-0 right-4 z-50 min-w-3xs -translate-y-full rounded-lg border border-white/30 bg-black/95 p-4 text-center text-sm text-white dark:bg-black/70 dark:backdrop-blur-md"
        >
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: TEXT_ANIMATION_DURATION,
                delay: i * TEXT_ANIMATION_DELAY,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ) : null}
    </AnimatePresence>
  );
};
