"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

import { TalkBalloon } from "./src/components/parts/TalkBalloon";
import { CarretShape } from "./src/components/shapes/Carret";
import {
  DEFAULT_SIZE,
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
} from "./src/config/constants";
import { ROOT_VARIANTS } from "./src/config/variants";
import {
  MascotStateProvider,
  useMascotState,
} from "./src/provider/MascotStateProvider";

export function MascotBuddy() {
  return (
    <MascotStateProvider>
      <MascotWrapper />
    </MascotStateProvider>
  );
}

const MascotWrapper = () => {
  const { handleAddActionsToQueue } = useMascotState();

  useEffect(() => {
    const showPresentationText = () => {
      handleAddActionsToQueue([
        {
          type: "talk",
          mood: "talking",
          isBlocking: false,
          payload: {
            text: "Hello, my name is Ticky, and I'm here to help!",
          },
        },
        {
          type: "await",
          mood: "idle",
          isBlocking: false,
        },
        {
          type: "talk",
          mood: "talking",
          isBlocking: false,
          payload: {
            text: "Click me anytime you need assistance navigating the site.",
          },
        },
        {
          type: "await",
          mood: "happy",
          isBlocking: false,
        },
      ]);
    };

    const timer = setTimeout(showPresentationText, 1 * 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
};
