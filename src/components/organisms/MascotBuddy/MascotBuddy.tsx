"use client";

import { motion, type Variants } from "motion/react";
import * as React from "react";
import { twMerge } from "tailwind-merge";

export type MascotBuddyShape = "caret" | "keyboard" | "hidden";

type MascotBuddyProps = {
  shape?: MascotBuddyShape;

  /** overall size in px (square) */
  size?: number;

  /** main fill (caret/keyboard body) */
  color?: string;

  /** eye styling (filled) */
  eyeWhite?: string;
  pupil?: string;

  /** 0..1 */
  energy?: number;

  /**
   * bump this number on each keypress:
   * setKeyTick((n) => n + 1)
   */
  keyTick?: number;

  /** last pressed key label (optional). Example: "A", "⌫", "⏎" */
  keyLabel?: string;

  /** if true, minimize motion */
  reduceMotion?: boolean;

  className?: string;
};

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

export function MascotBuddy({
  shape = "caret",
  size = 50,
  color = "currentColor",
  eyeWhite = "rgba(255,255,255,0.95)",
  pupil = "rgba(0,0,0,0.65)",
  energy = 0.45,
  keyTick,
  keyLabel = "",
  reduceMotion = false,
  className,
}: MascotBuddyProps) {
  const e = clamp01(energy);

  // stable viewBox for clean scaling
  const vbW = 64;
  const vbH = 64;

  // caret body
  const caretW = 10;
  const caretH = 40;
  const caretX = (vbW - caretW) / 2;
  const caretY = (vbH - caretH) / 2;

  // keyboard body
  const kbW = 46;
  const kbH = 28;
  const kbX = (vbW - kbW) / 2;
  const kbY = (vbH - kbH) / 2 + 6;

  // eyes positions (on caret)
  const eyeY = caretY + 10;
  const leftEyeX = vbW / 2 - 10;
  const rightEyeX = vbW / 2 + 10;

  // SVG transform reliability helpers (critical for blinking on circles/groups)
  const eyeStyle = {
    transformBox: "fill-box" as const,
    transformOrigin: "center" as const,
  };

  // Hover "tickle" animation (applied via whileHover="tickle")
  const tickleVariants: Variants = reduceMotion
    ? { tickle: {} }
    : {
        tickle: {
          rotate: [0, -3 * e, 3 * e, -2 * e, 2 * e, 0],
          y: [0, -2 * e, 0],
          transition: { duration: 0.35, ease: "easeInOut" },
        },
      };

  const rootVariants: Variants = {
    caret: { opacity: 1, scale: 1, rotate: 0, y: 0 },
    keyboard: { opacity: 1, scale: 1, rotate: 0, y: 0 },
    hidden: { opacity: 0, scale: 0.98, transition: { duration: 0.15 } },

    // NEW
    ...tickleVariants,
  };

  // Crossfade/transform between “caret group” and “keyboard group”.
  const caretGroupVariants: Variants = {
    caret: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
    keyboard: { opacity: 0, scale: 0.85, y: 6, transition: { duration: 0.16 } },
    hidden: { opacity: 0 },
  };

  const keyboardGroupVariants: Variants = {
    caret: { opacity: 0, scale: 0.9, y: 8 },
    keyboard: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.18 } },
    hidden: { opacity: 0 },
  };

  // Eyes blink loop (caret only)
  const eyeBlink: Variants = reduceMotion
    ? { open: { scaleY: 1 } }
    : {
        open: { scaleY: 1 },
        blink: {
          scaleY: [1, 1, 0.08, 1, 1],
          transition: {
            duration: 2.4 - 0.8 * e,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.46, 0.5, 0.54, 1],
          },
        },
      };

  const pupilLook: Variants = reduceMotion
    ? { still: { x: 0, y: 0 } }
    : {
        still: { x: 0, y: 0 },
        look: {
          x: [0, 1.2 * e, -1.2 * e, 0],
          transition: {
            duration: 3.0 - 0.9 * e,
            repeat: Infinity,
            ease: "easeInOut",
          },
        },
      };

  // “Pressed key” punch on keyTick changes
  const [pressPulse, setPressPulse] = React.useState(0);
  const tickRef = React.useRef<number | undefined>(keyTick);

  React.useEffect(() => {
    if (keyTick === undefined) return;
    if (tickRef.current === undefined) tickRef.current = keyTick;

    if (keyTick !== tickRef.current) {
      tickRef.current = keyTick;
      setPressPulse((n) => n + 1);
    }
  }, [keyTick]);

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${vbW} ${vbH}`}
      className={twMerge("fixed right-10 bottom-10 z-50", className)}
      role="img"
      aria-label="Caret buddy"
      initial={false}
      animate={shape}
      variants={rootVariants}
      whileHover="tickle"
    >
      {/* CARET GROUP */}
      <motion.g initial={false} animate={shape} variants={caretGroupVariants}>
        {/* Filled caret body */}
        <motion.rect
          x={caretX}
          y={caretY}
          width={caretW}
          height={caretH}
          rx={3.5}
          fill={color}
        />

        {/* Subtle inner highlight (filled) */}
        {!reduceMotion && (
          <motion.rect
            x={caretX + 1}
            y={caretY + 2}
            width={caretW - 2}
            height={caretH - 4}
            rx={2.8}
            fill={"rgba(255,255,255,0.22)"}
            opacity={0.9}
          />
        )}

        {/* Big eyes (on top of caret) */}
        <motion.g
          style={{ transformOrigin: "50% 50%" }}
          animate={
            shape === "keyboard" || shape === "hidden"
              ? { opacity: 0 }
              : { opacity: 1 }
          }
          transition={{ duration: 0.12 }}
        >
          {/* left eye */}
          <motion.g
            style={eyeStyle}
            variants={eyeBlink}
            initial="open"
            animate={shape === "caret" ? "blink" : "open"}
          >
            <circle cx={leftEyeX} cy={eyeY} r={7.2} fill={eyeWhite} />
            <motion.circle
              style={eyeStyle}
              cx={leftEyeX}
              cy={eyeY}
              r={3.2}
              fill={pupil}
              variants={pupilLook}
              initial="still"
              animate={shape === "caret" ? "look" : "still"}
            />
          </motion.g>

          {/* right eye */}
          <motion.g
            style={eyeStyle}
            variants={eyeBlink}
            initial="open"
            animate={shape === "caret" ? "blink" : "open"}
          >
            <circle cx={rightEyeX} cy={eyeY} r={7.2} fill={eyeWhite} />
            <motion.circle
              style={eyeStyle}
              cx={rightEyeX}
              cy={eyeY}
              r={3.2}
              fill={pupil}
              variants={pupilLook}
              initial="still"
              animate={shape === "caret" ? "look" : "still"}
            />
          </motion.g>
        </motion.g>
      </motion.g>

      {/* KEYBOARD GROUP */}
      <motion.g
        initial={false}
        animate={shape}
        variants={keyboardGroupVariants}
      >
        {/* Filled keyboard base */}
        <motion.rect
          x={kbX}
          y={kbY}
          width={kbW}
          height={kbH}
          rx={8}
          fill={color}
        />

        {/* Inner highlight */}
        {!reduceMotion && (
          <rect
            x={kbX + 2}
            y={kbY + 3}
            width={kbW - 4}
            height={kbH - 6}
            rx={7}
            fill={"rgba(255,255,255,0.18)"}
          />
        )}

        {/* Single “listening” key */}
        <motion.g
          key={pressPulse} // re-mount on each press for a crisp punch
          initial={false}
          animate={
            reduceMotion
              ? {}
              : {
                  y: [0, 1.6, 0],
                  scale: [1, 0.94, 1],
                  transition: { duration: 0.12, ease: "easeOut" },
                }
          }
          style={{ transformOrigin: "50% 50%" }}
        >
          <rect
            x={vbW / 2 - 10}
            y={kbY + 8}
            width={20}
            height={14}
            rx={4}
            fill={"rgba(255,255,255,0.85)"}
            opacity={0.95}
          />
          {keyLabel ? (
            <text
              x={vbW / 2}
              y={kbY + 18.5}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="9"
              fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial"
              fill={"rgba(0,0,0,0.72)"}
              style={{ userSelect: "none" }}
            >
              {keyLabel}
            </text>
          ) : null}
        </motion.g>

        {/* Small “eyes” on keyboard (optional personality even in keyboard form) */}
        <motion.g
          animate={
            reduceMotion ? { opacity: 0.35 } : { opacity: [0.25, 0.45, 0.25] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 2.2 - 0.8 * e, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <circle cx={vbW / 2 - 14} cy={kbY + 6} r={2.2} fill={eyeWhite} />
          <circle cx={vbW / 2 + 14} cy={kbY + 6} r={2.2} fill={eyeWhite} />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}
