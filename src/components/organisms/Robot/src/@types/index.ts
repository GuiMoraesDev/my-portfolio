export type RobotMood =
  | "idle"
  | "thinking"
  | "success"
  | "warning"
  | "sad"
  | "sleepy"
  | "greet"
  | "celebrate";

export type RobotState = {
  mood: RobotMood;
  message: string | null;
  acting: boolean;
  autopilot: boolean;
};

export type RobotAct =
  | { kind: "mood"; mood: RobotMood; forMs?: number }
  | { kind: "say"; text: string; forMs?: number }
  | { kind: "think"; text?: string; forMs?: number }
  | { kind: "pause"; forMs: number };

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
