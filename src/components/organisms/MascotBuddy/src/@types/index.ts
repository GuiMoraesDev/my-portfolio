export type MascotMood =
  | "idle"
  | "happy"
  | "sad"
  | "surprised"
  | "thinking"
  | "talking";

export type MascotActionType = "perform" | "talk" | "await";
type MascotActionAwaiting = {
  type: "await";
  mood: "idle";
  isBlocking: false;
};

type MascotActionPerforming = {
  type: "await";
  mood: "happy" | "sad" | "surprised" | "thinking";
  isBlocking: false;
};

type MascotActionPending = {
  type: "await";
  mood: "thinking";
  isBlocking: true;
  status: "pending" | "complete";
};

type MascotActionTalking = {
  type: "talk";
  mood: "talking";
  isBlocking: boolean;
  payload: {
    text: string;
  };
};

export type MascotAction =
  | MascotActionAwaiting
  | MascotActionPerforming
  | MascotActionPending
  | MascotActionTalking;
