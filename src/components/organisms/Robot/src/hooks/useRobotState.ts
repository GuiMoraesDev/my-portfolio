import { useReducer } from "react";

import { type RobotAssistantProps } from "../../RobotAssistant";
import { type RobotState, type RobotEvent } from "../@types";

const initialMachineState = (p?: Partial<RobotState>): RobotState => ({
  mood: "idle",
  message: null,
  acting: false,
  autopilot: false,
  ...p,
});

const reducer = (state: RobotState, event: RobotEvent): RobotState => {
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
};

type UseRobotStateParams = Pick<
  RobotAssistantProps,
  "initialMood" | "initialMessage" | "autopilot"
>;

export const useRobotState = ({
  initialMood,
  initialMessage,
  autopilot,
}: UseRobotStateParams) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialMachineState({
      mood: initialMood,
      message: initialMessage,
      autopilot,
    }),
  );

  return { state, dispatch };
};
