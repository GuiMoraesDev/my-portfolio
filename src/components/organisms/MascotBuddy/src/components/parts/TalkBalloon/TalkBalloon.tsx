import { motion, AnimatePresence } from "motion/react";
import { useMemo } from "react";

import {
  TEXT_ANIMATION_DELAY,
  TEXT_ANIMATION_DURATION,
} from "../../../config/constants";
import { useMascotState } from "../../../provider/MascotStateProvider";

export const TalkBalloon = () => {
  const { text } = useMascotState();

  const letters = useMemo(() => text.split(""), [text]);

  return (
    <AnimatePresence>
      {text ? (
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 520,
            damping: 36,
          }}
          className="pointer-events-none absolute top-0 left-1/2 z-50 max-w-xs -translate-x-1/2 -translate-y-full rounded-lg border border-white/30 bg-black/60 px-3 py-2 text-center text-sm text-white shadow-lg backdrop-blur-md"
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
