import { AnimatePresence, motion } from "motion/react";

import { type RobotAssistantProps } from "../../RobotAssistant";

type BubbleMessageProps = Pick<RobotAssistantProps, "size"> & {
  message: string | null;
};

export const BubbleMessage = ({ message, size = 220 }: BubbleMessageProps) => (
  <AnimatePresence>
    {message && (
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.96 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="absolute -top-2 left-1/2 -translate-x-1/2"
        style={{ width: Math.min(320, size * 1.3) }}
      >
        <div className="relative rounded-2xl border border-black/10 bg-white/95 px-3 py-2 shadow-sm">
          <div className="text-[12px] leading-snug text-black/80">
            {message}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2">
            <div className="h-0 w-0 border-10 border-b-0 border-t-white/95 border-r-transparent border-l-transparent" />
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
