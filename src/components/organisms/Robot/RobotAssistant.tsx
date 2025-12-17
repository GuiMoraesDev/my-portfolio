"use client";

import { motion } from "motion/react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import {
  type RobotState,
  type RobotAct,
  type RobotEvent,
  type RobotMood,
} from "./src/@types";
import { Antenna } from "./src/components/Antenna";
import { Arms } from "./src/components/Arms";
import { Backdrop } from "./src/components/Backdrop";
import { Body } from "./src/components/Body";
import { BubbleMessage } from "./src/components/BubbleMessage";
import { Chest } from "./src/components/Chest";
import { Eyes } from "./src/components/Eyes";
import { Feet } from "./src/components/Feet";
import { HeadPanel } from "./src/components/HeadPanel";
import { rootVariants } from "./src/config/variants";
import { useMessageWithTtl } from "./src/hooks/useMessageWithTtl";
import { useRobotState } from "./src/hooks/useRobotState";
import { sleep } from "./src/utils/sleep";

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

  /** Optional: default proactive script to run on mount (uncontrolled mode) */
  introScript?: RobotAct[];

  /** Callbacks */
  onStateChange?: (state: RobotState) => void;

  /** Click handler */
  onClick?: () => void;

  initialMood?: RobotMood;
  initialMessage?: string | null;
  autopilot?: boolean;
};

export const RobotAssistant = forwardRef<
  RobotAssistantHandle,
  RobotAssistantProps
>(function Robot(
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
  const { state, dispatch } = useRobotState({
    initialMood,
    initialMessage,
    autopilot,
  });

  const viewMood = useMemo(
    () => (mode === "controlled" ? (controlledMood ?? "idle") : state.mood),
    [mode, controlledMood, state.mood],
  );
  const viewMessage = useMemo(
    () => (mode === "controlled" ? (controlledMessage ?? null) : state.message),
    [mode, controlledMessage, state.message],
  );
  const actAbort = useRef({ aborted: false });
  const stateRef = useRef(state);

  const { setMessageWithTTL } = useMessageWithTtl({ dispatch });

  const runScript = useCallback(
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
    [dispatch, setMessageWithTTL],
  );

  // Acting script runner (uncontrolled)
  useEffect(() => {
    stateRef.current = state;
    onStateChange?.(state);
  }, [state, onStateChange]);

  // Intro script (uncontrolled)
  useEffect(() => {
    if (mode === "controlled") return;
    if (!introScript?.length) return;
    runScript(introScript);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Autopilot (uncontrolled): occasional proactive actions
  useEffect(() => {
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
  useImperativeHandle(
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
    [dispatch, mode, runScript, setMessageWithTTL],
  );

  return (
    <div
      className="relative"
      style={{ width: size, userSelect: "none", touchAction: "none" }}
    >
      <BubbleMessage message={viewMessage} size={size} />

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
          animate={viewMood}
        >
          <Backdrop />

          <Arms viewMood={viewMood} />

          <Body />

          <Feet />

          <Antenna viewMood={viewMood} />

          <HeadPanel />

          <Eyes viewMood={viewMood} />

          <Chest viewMood={viewMood} />
        </motion.svg>
      </motion.button>
    </div>
  );
});
