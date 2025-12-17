"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import * as React from "react";

/* ---------------------------------------------
 * Types
 * -------------------------------------------*/

export type RobotMood =
  | "idle"
  | "thinking"
  | "success"
  | "warning"
  | "sad"
  | "sleepy"
  | "greet"
  | "celebrate";

export type RobotEvent =
  | { type: "SET_MOOD"; mood: RobotMood }
  | { type: "SPEAK"; message: string; ttlMs?: number }
  | { type: "CLEAR_MESSAGE" }
  | { type: "THINK_START"; message?: string }
  | { type: "THINK_DONE"; message?: string; ttlMs?: number }
  | { type: "ACT"; script: RobotAct[] }
  | { type: "STOP_ACT" }
  | { type: "AUTOPILOT_START" }
  | { type: "AUTOPILOT_STOP" };

export type RobotAct =
  | { kind: "mood"; mood: RobotMood; forMs?: number }
  | { kind: "say"; text: string; forMs?: number }
  | { kind: "think"; text?: string; forMs?: number }
  | { kind: "pause"; forMs: number };

export type RobotState = {
  mood: RobotMood;
  message: string | null;
  acting: boolean;
  autopilot: boolean;
};

export type RobotAssistantHandle = {
  /** Event-based control */
  send: (event: RobotEvent) => void;

  /** Convenience methods */
  setMood: (mood: RobotMood) => void;
  speak: (message: string, ttlMs?: number) => void;
  clearMessage: () => void;
  think: (message?: string) => void;
  doneThinking: (message?: string, ttlMs?: number) => void;

  /** Acting (proactive) */
  act: (script: RobotAct[]) => void;
  stopAct: () => void;

  /** Autopilot */
  startAutopilot: () => void;
  stopAutopilot: () => void;

  /** Read current machine state */
  getState: () => RobotState;
};

type ControlMode = "controlled" | "uncontrolled";

export type RobotAssistantProps = {
  size?: number;

  /** Controlled mode = you provide mood/message; Uncontrolled = machine owns it. */
  mode?: ControlMode;

  /** Controlled inputs (used when mode === "controlled") */
  mood?: RobotMood;
  message?: string | null;

  /** Uncontrolled initial values */
  initialMood?: RobotMood;
  initialMessage?: string | null;

  /** When true in uncontrolled mode, robot will occasionally “act” on its own. */
  autopilot?: boolean;

  /** Optional: default proactive script to run on mount (uncontrolled mode) */
  introScript?: RobotAct[];

  /** Callbacks */
  onStateChange?: (state: RobotState) => void;

  /** Click handler */
  onClick?: () => void;
};

/* ---------------------------------------------
 * State Machine (Reducer)
 * -------------------------------------------*/

const initialMachineState = (p?: Partial<RobotState>): RobotState => ({
  mood: p?.mood ?? "idle",
  message: p?.message ?? null,
  acting: p?.acting ?? false,
  autopilot: p?.autopilot ?? false,
});

function reducer(state: RobotState, event: RobotEvent): RobotState {
  switch (event.type) {
    case "SET_MOOD":
      return { ...state, mood: event.mood };

    case "SPEAK":
      return { ...state, message: event.message };

    case "CLEAR_MESSAGE":
      return { ...state, message: null };

    case "THINK_START":
      return {
        ...state,
        mood: "thinking",
        message: event.message ?? state.message ?? "Thinking…",
      };

    case "THINK_DONE":
      return {
        ...state,
        mood: "success",
        message: event.message ?? state.message,
      };

    case "ACT":
      return { ...state, acting: true };

    case "STOP_ACT":
      return { ...state, acting: false };

    case "AUTOPILOT_START":
      return { ...state, autopilot: true };

    case "AUTOPILOT_STOP":
      return { ...state, autopilot: false };

    default:
      return state;
  }
}

/* ---------------------------------------------
 * Helpers
 * -------------------------------------------*/

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Mood -> animation “personality” mapping (variants keys) */
const moodToVariant = (mood: RobotMood) => {
  switch (mood) {
    case "thinking":
      return "thinking";
    case "success":
      return "success";
    case "warning":
      return "warning";
    case "sad":
      return "sad";
    case "sleepy":
      return "sleepy";
    case "greet":
      return "greet";
    case "celebrate":
      return "celebrate";
    case "idle":
    default:
      return "idle";
  }
};

/* ---------------------------------------------
 * Component
 * -------------------------------------------*/

export const RobotAssistant = React.forwardRef<
  RobotAssistantHandle,
  RobotAssistantProps
>(function RobotAssistant(
  {
    size = 220,
    mode = "uncontrolled",
    mood: controlledMood,
    message: controlledMessage,
    initialMood = "idle",
    initialMessage = "Hi! Need a hand?",
    autopilot = false,
    introScript,
    onStateChange,
    onClick,
  },
  ref,
) {
  const [state, dispatch] = React.useReducer(
    reducer,
    initialMachineState({
      mood: initialMood,
      message: initialMessage,
      autopilot,
    }),
  );

  // Keep latest state in a ref for imperative getState()
  const stateRef = React.useRef(state);
  React.useEffect(() => {
    stateRef.current = state;
    onStateChange?.(state);
  }, [state, onStateChange]);

  // Controlled view values
  const viewMood =
    mode === "controlled" ? (controlledMood ?? "idle") : state.mood;
  const viewMessage =
    mode === "controlled" ? (controlledMessage ?? null) : state.message;

  // TTL for messages (uncontrolled)
  const ttlTimer = React.useRef<number | null>(null);
  const setMessageWithTTL = React.useCallback((msg: string, ttlMs?: number) => {
    dispatch({ type: "SPEAK", message: msg, ttlMs });
    if (ttlTimer.current) window.clearTimeout(ttlTimer.current);
    if (ttlMs && ttlMs > 0) {
      ttlTimer.current = window.setTimeout(
        () => dispatch({ type: "CLEAR_MESSAGE" }),
        ttlMs,
      );
    }
  }, []);

  // Acting script runner (uncontrolled)
  const actAbort = React.useRef({ aborted: false });

  const runScript = React.useCallback(
    async (script: RobotAct[]) => {
      actAbort.current.aborted = false;
      dispatch({ type: "ACT", script });

      for (const step of script) {
        if (actAbort.current.aborted) break;

        if (step.kind === "mood") {
          dispatch({ type: "SET_MOOD", mood: step.mood });
          if (step.forMs) await sleep(step.forMs);
        }

        if (step.kind === "say") {
          setMessageWithTTL(step.text, step.forMs ?? 1400);
          if (step.forMs) await sleep(step.forMs);
        }

        if (step.kind === "think") {
          dispatch({ type: "THINK_START", message: step.text });
          await sleep(step.forMs ?? 1200);
        }

        if (step.kind === "pause") {
          await sleep(step.forMs);
        }
      }

      // End act: if we were thinking, land softly back to idle
      if (!actAbort.current.aborted) {
        dispatch({ type: "STOP_ACT" });
        if (stateRef.current.mood !== "idle") {
          dispatch({ type: "SET_MOOD", mood: "idle" });
        }
      }
    },
    [setMessageWithTTL],
  );

  // Intro script (uncontrolled)
  React.useEffect(() => {
    if (mode === "controlled") return;
    if (!introScript?.length) return;
    runScript(introScript);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Autopilot (uncontrolled): occasional proactive actions
  React.useEffect(() => {
    if (mode === "controlled") return;
    if (!state.autopilot) return;

    let alive = true;

    const loop = async () => {
      while (alive) {
        // If currently acting, wait a bit
        if (stateRef.current.acting) {
          await sleep(800);
          continue;
        }

        // Random pause
        await sleep(2200 + Math.random() * 2200);
        if (!alive) break;

        // Small proactive behaviors (cute but not intrusive)
        const roll = Math.random();

        if (roll < 0.22) {
          // tiny greet/wave vibe
          await runScript([
            { kind: "mood", mood: "greet", forMs: 850 },
            { kind: "mood", mood: "idle", forMs: 0 },
          ]);
        } else if (roll < 0.4) {
          // quick “thinking” glance
          await runScript([
            { kind: "think", text: "…", forMs: 750 },
            { kind: "mood", mood: "idle", forMs: 0 },
          ]);
        } else if (roll < 0.52) {
          // sleepy micro-moment
          await runScript([
            { kind: "mood", mood: "sleepy", forMs: 900 },
            { kind: "mood", mood: "idle", forMs: 0 },
          ]);
        } else {
          // do nothing sometimes (important)
        }
      }
    };

    loop();
    return () => {
      alive = false;
    };
  }, [mode, state.autopilot, runScript]);

  // Imperative API
  React.useImperativeHandle(
    ref,
    (): RobotAssistantHandle => ({
      send: (event) => {
        if (mode === "controlled") return; // in controlled mode, parent drives view state
        dispatch(event);

        // event side effects
        if (event.type === "SPEAK")
          setMessageWithTTL(event.message, event.ttlMs);
        if (event.type === "THINK_DONE")
          setMessageWithTTL(event.message ?? "Done!", event.ttlMs ?? 1200);
        if (event.type === "ACT") runScript(event.script);
        if (event.type === "STOP_ACT") actAbort.current.aborted = true;
      },

      setMood: (m) =>
        mode !== "controlled" && dispatch({ type: "SET_MOOD", mood: m }),
      speak: (m, ttlMs) => mode !== "controlled" && setMessageWithTTL(m, ttlMs),
      clearMessage: () =>
        mode !== "controlled" && dispatch({ type: "CLEAR_MESSAGE" }),
      think: (m) =>
        mode !== "controlled" && dispatch({ type: "THINK_START", message: m }),
      doneThinking: (m, ttlMs) =>
        mode !== "controlled" &&
        dispatch({ type: "THINK_DONE", message: m, ttlMs }),

      act: (script) => mode !== "controlled" && runScript(script),
      stopAct: () => {
        if (mode === "controlled") return;
        actAbort.current.aborted = true;
        dispatch({ type: "STOP_ACT" });
        dispatch({ type: "SET_MOOD", mood: "idle" });
      },

      startAutopilot: () =>
        mode !== "controlled" && dispatch({ type: "AUTOPILOT_START" }),
      stopAutopilot: () =>
        mode !== "controlled" && dispatch({ type: "AUTOPILOT_STOP" }),

      getState: () => stateRef.current,
    }),
    [mode, runScript, setMessageWithTTL],
  );

  /* ---------------------------------------------
   * Animation variants (Mood -> Motion)
   * -------------------------------------------*/

  const rootVariants: Variants = {
    idle: {
      y: [0, -2, 0],
      scaleX: [1, 1.01, 1],
      scaleY: [1, 0.99, 1],
      transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
    },
    thinking: {
      y: [0, -2.5, 0],
      scaleX: [1, 1.015, 1],
      scaleY: [1, 0.985, 1],
      transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
    },
    success: {
      y: [0, -4, 0],
      transition: { duration: 0.55, repeat: 2, ease: "easeOut" },
    },
    warning: {
      rotate: [0, -1.4, 1.4, 0],
      transition: { duration: 0.45, repeat: 2, ease: "easeInOut" },
    },
    sad: {
      y: [0, 2, 0],
      transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
    },
    sleepy: {
      y: [0, 1.2, 0],
      scaleY: [1, 0.992, 1],
      transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
    },
    greet: {
      y: [0, -3, 0],
      transition: { duration: 0.7, repeat: 1, ease: "easeOut" },
    },
    celebrate: {
      y: [0, -6, 0],
      transition: { duration: 0.45, repeat: 3, ease: "easeOut" },
    },
  } as const;

  const antennaVariants: Variants = {
    idle: { rotate: 0 },
    thinking: {
      rotate: [0, 8, -8, 0],
      transition: { duration: 1.3, repeat: Infinity, ease: "easeInOut" },
    },
    success: {
      rotate: [0, 10, 0],
      transition: { duration: 0.5, ease: "easeOut" },
    },
    warning: {
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    sad: { rotate: -6 },
    sleepy: { rotate: -10 },
    greet: {
      rotate: [0, 8, 0],
      transition: { duration: 0.6, ease: "easeOut" },
    },
    celebrate: {
      rotate: [0, 14, -14, 0],
      transition: { duration: 0.7, repeat: 2, ease: "easeInOut" },
    },
  } as const;

  const eyesVariants: Variants = {
    idle: {
      filter: ["saturate(1.05)", "saturate(0.85)", "saturate(1.05)"],
      transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
    },
    thinking: {
      filter: ["saturate(1.2)", "saturate(0.55)", "saturate(1.2)"],
      transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" },
    },
    success: {
      filter: ["saturate(1.4)", "saturate(1.1)", "saturate(1.4)"],
      transition: { duration: 0.9, repeat: 2, ease: "easeOut" },
    },
    warning: {
      filter: ["saturate(0.9)", "saturate(1.3)", "saturate(0.9)"],
      transition: { duration: 0.7, repeat: 2, ease: "easeInOut" },
    },
    sad: {
      filter: ["saturate(0.7)", "saturate(0.85)", "saturate(0.7)"],
      transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
    },
    sleepy: {
      filter: ["saturate(0.7)", "saturate(0.6)", "saturate(0.7)"],
      transition: { duration: 4.0, repeat: Infinity, ease: "easeInOut" },
    },
    greet: {
      filter: ["saturate(1.2)", "saturate(1.05)", "saturate(1.2)"],
      transition: { duration: 1.2, repeat: 1, ease: "easeOut" },
    },
    celebrate: {
      filter: ["saturate(1.6)", "saturate(1.1)", "saturate(1.6)"],
      transition: { duration: 0.55, repeat: 3, ease: "easeOut" },
    },
  } as const;

  // blink timing (always on, mood-adjusted)
  const blink =
    viewMood === "thinking" ? 2.1 : viewMood === "sleepy" ? 1.6 : 3.2;

  const variantKey = moodToVariant(viewMood);

  return (
    <div
      className="relative"
      style={{ width: size, userSelect: "none", touchAction: "none" }}
    >
      {/* Bubble */}
      <AnimatePresence>
        {viewMessage && (
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
                {viewMessage}
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2">
                <div className="h-0 w-0 border-t-[10px] border-r-[10px] border-l-[10px] border-t-white/95 border-r-transparent border-l-transparent" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot */}
      <motion.button
        type="button"
        onClick={onClick}
        className="relative w-full"
        style={{
          aspectRatio: "1 / 1",
          background: "transparent",
          border: "none",
          padding: 0,
        }}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 220, damping: 14 }}
        aria-label="Robot assistant"
      >
        <motion.svg
          viewBox="0 0 120 120"
          className="block h-full w-full"
          variants={rootVariants}
          animate={variantKey}
        >
          {/* Backdrop */}
          <circle cx="60" cy="60" r="56" fill="#E1C8B5" />

          {/* Arms */}
          <motion.g
            animate={
              variantKey === "greet" ? { rotate: [0, 0, 10, 0] } : { rotate: 0 }
            }
            transition={
              variantKey === "greet"
                ? { duration: 0.8, ease: "easeInOut" }
                : undefined
            }
            style={{ transformOrigin: "60px 74px" }}
          >
            <rect x="18" y="66" width="18" height="10" rx="5" fill="#00B7BC" />
            <circle cx="18" cy="71" r="6" fill="#04363D" />

            <rect x="84" y="66" width="18" height="10" rx="5" fill="#00B7BC" />
            <circle cx="102" cy="71" r="6" fill="#04363D" />
          </motion.g>

          {/* Body */}
          <rect x="28" y="34" width="64" height="74" rx="12" fill="#00B7BC" />
          <rect
            x="74"
            y="34"
            width="18"
            height="74"
            rx="12"
            fill="#1C6E77"
            opacity="0.9"
          />

          {/* Feet */}
          <rect x="32" y="104" width="22" height="10" rx="5" fill="#04363D" />
          <rect x="66" y="104" width="22" height="10" rx="5" fill="#04363D" />

          {/* Antenna */}
          <motion.g
            variants={antennaVariants}
            animate={variantKey}
            style={{ transformOrigin: "60px 30px" }}
          >
            <rect x="58" y="18" width="4" height="10" rx="2" fill="#1B3137" />
            <circle cx="60" cy="16" r="6" fill="#00B4D8" />
          </motion.g>

          {/* Head panel */}
          <rect x="26" y="40" width="68" height="26" rx="8" fill="white" />
          <rect
            x="26"
            y="40"
            width="68"
            height="26"
            rx="8"
            fill="none"
            stroke="#1B3137"
            strokeWidth="2"
          />

          {/* Eyes: blink + mood saturation + sparkles */}
          <motion.g
            variants={eyesVariants}
            animate={variantKey}
            style={{ filter: "saturate(1)" }}
          >
            {/* Blink: squish the whole eyes group occasionally */}
            <motion.g
              animate={{ scaleY: [1, 1, 0.12, 1] }}
              transition={{
                duration: 0.16,
                repeat: Infinity,
                repeatDelay: blink,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "60px 53px" }}
            >
              {/* Left eye */}
              <rect
                x="32"
                y="46"
                width="14"
                height="14"
                rx="4"
                fill="#FFBF36"
              />
              <motion.circle
                cx="36.4"
                cy="50.5"
                r="1.2"
                fill="white"
                animate={{ opacity: [0.15, 0.55, 0.15] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Middle eye */}
              <rect
                x="53"
                y="46"
                width="14"
                height="14"
                rx="4"
                fill="#C6966D"
              />
              <motion.circle
                cx="57.4"
                cy="50.5"
                r="1.2"
                fill="white"
                animate={{ opacity: [0.15, 0.55, 0.15] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />

              {/* Right eye */}
              <rect
                x="74"
                y="46"
                width="14"
                height="14"
                rx="4"
                fill="#91513C"
              />
              <motion.circle
                cx="78.4"
                cy="50.5"
                r="1.2"
                fill="white"
                animate={{ opacity: [0.15, 0.55, 0.15] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.35,
                }}
              />
            </motion.g>
          </motion.g>

          {/* Chest board */}
          <motion.rect
            x="34"
            y="74"
            width="52"
            height="22"
            rx="8"
            fill="white"
            animate={
              variantKey === "thinking"
                ? { opacity: [0.92, 1, 0.92] }
                : variantKey === "success"
                  ? { opacity: [1, 0.92, 1] }
                  : { opacity: 1 }
            }
            transition={
              variantKey === "thinking"
                ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                : variantKey === "success"
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

          {/* Chest text */}
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
            {variantKey === "thinking"
              ? "…"
              : variantKey === "success"
                ? "OK"
                : variantKey === "warning"
                  ? "!"
                  : variantKey === "sad"
                    ? ":("
                    : variantKey === "sleepy"
                      ? "zZ"
                      : "Hi"}
          </motion.text>
        </motion.svg>
      </motion.button>
    </div>
  );
});
