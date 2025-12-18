"use client";

import { motion } from "motion/react";

import { TalkBalloon } from "./src/components/parts/TalkBalloon";
import { CarretShape } from "./src/components/shapes/Carret";
import {
  DEFAULT_SIZE,
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
} from "./src/config/constants";
import { ROOT_VARIANTS } from "./src/config/variants";
import { MascotStateProvider } from "./src/provider/MascotStateProvider";

export function MascotBuddy() {
  return (
    <MascotStateProvider>
      <div className="fixed right-10 bottom-10 z-50">
        <motion.svg
          width={DEFAULT_SIZE}
          height={DEFAULT_SIZE}
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          role="img"
          aria-label="Caret buddy"
          initial={false}
          animate="caret"
          variants={ROOT_VARIANTS}
          whileHover="tickle"
        >
          <CarretShape />
        </motion.svg>

        <TalkBalloon />
      </div>
    </MascotStateProvider>
  );
}
