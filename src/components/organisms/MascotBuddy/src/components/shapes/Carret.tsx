import { motion } from "motion/react";
import { useRef } from "react";

import {
  DEFAULT_SIZE,
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
} from "../../config/constants";
import { CARET_VARIANTS } from "../../config/variants";
import { Eyes } from "../parts/Eyes";
import { Mouth } from "../parts/Mouth/Mouth";

const CARET_WIDTH = DEFAULT_SIZE / 5;
const CARET_HEIGHT = DEFAULT_SIZE * 0.8;

const CARET_X = (VIEWBOX_WIDTH - CARET_WIDTH) / 2;
const CARET_Y = (VIEWBOX_HEIGHT - CARET_HEIGHT) / 2;

export const CarretShape = () => {
  const wrapperRef = useRef(null);

  return (
    <motion.g
      initial={false}
      animate="caret"
      variants={CARET_VARIANTS}
      ref={wrapperRef}
      className="relative"
    >
      <Eyes elementY={CARET_Y} wrapperRef={wrapperRef} />

      <CaretBody
        caretX={CARET_X}
        caretY={CARET_Y}
        caretWidth={CARET_WIDTH}
        caretHeight={CARET_HEIGHT}
      />
      <Mouth elementY={CARET_Y} />
    </motion.g>
  );
};

type CaretBodyProps = {
  caretX: number;
  caretY: number;
  caretWidth: number;
  caretHeight: number;
};

const CaretBody = ({
  caretX,
  caretY,
  caretWidth,
  caretHeight,
}: CaretBodyProps) => (
  <motion.rect
    x={caretX}
    y={caretY}
    width={caretWidth}
    height={caretHeight}
    rx={3.5}
    className="fill-white stroke-black dark:fill-white"
  />
);
