import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

import { TEXT_ANIMATION_DELAY } from "@/config/constants";

const DEFAULT_ACTION_AWAIT_MS = 1.5 * 1000;
const IDLE_ACTION_AWAIT_MS = 0.3 * 1000;

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

interface MascotStateContextType {
  activeAction: MascotAction | null;
  handleAddActionsToQueue: (actions: MascotAction[]) => void;
  handleUpdateActiveActionStatus: (status: "pending" | "complete") => void;
}

const MascotStateContext = createContext<MascotStateContextType | undefined>(
  undefined,
);

type MascotStateProviderProps = PropsWithChildren;

export const MascotStateProvider = ({ children }: MascotStateProviderProps) => {
  const [activeAction, setActiveAction] = useState<MascotAction | null>(null);
  const [_, setActionsQueue] = useState<MascotAction[]>([]);

  const processActions = useCallback((actions: MascotAction[]) => {
    if (actions.length === 0) {
      setActiveAction(null);
      return;
    }

    const nextAction = actions[0];

    setActiveAction(nextAction);

    const isActionIdle =
      nextAction.type === "await" && nextAction.mood === "idle";

    if (isActionIdle) {
      setTimeout(() => {
        setActionsQueue(actions.slice(1));
        // eslint-disable-next-line react-hooks/immutability
        processActions(actions.slice(1));
      }, IDLE_ACTION_AWAIT_MS);

      return;
    }

    const isActionTalking = nextAction.type === "talk";
    if (isActionTalking) {
      const timeToTalkInSec =
        nextAction.payload.text.length * TEXT_ANIMATION_DELAY + 0.5;

      setTimeout(() => {
        setActionsQueue(actions.slice(1));
        processActions(actions.slice(1));
      }, timeToTalkInSec * 1000);

      return;
    }

    const isActionBlocking = nextAction.isBlocking;

    if (!isActionBlocking) {
      setTimeout(() => {
        setActionsQueue(actions.slice(1));
        processActions(actions.slice(1));
      }, DEFAULT_ACTION_AWAIT_MS);

      return;
    }

    if (nextAction.status === "complete") {
      setActionsQueue(actions.slice(1));
      processActions(actions.slice(1));
    }
  }, []);

  const handleAddActionsToQueue = (actions: MascotAction[]) => {
    setActionsQueue((prev) => {
      processActions([...prev, ...actions]);

      return [...prev, ...actions];
    });
  };
  const handleUpdateActiveActionStatus = (status: "pending" | "complete") => {
    setActionsQueue((prev) => {
      const updatedAction = prev[0];
      if (!updatedAction) return prev;

      const newAction = { ...updatedAction, status };
      processActions([newAction, ...prev.slice(1)]);
      return [newAction, ...prev.slice(1)];
    });
  };

  return (
    <MascotStateContext.Provider
      value={{
        activeAction,
        handleAddActionsToQueue,
        handleUpdateActiveActionStatus,
      }}
    >
      {children}

      <button
        type="button"
        className="fixed bottom-0 left-0"
        onClick={() =>
          handleAddActionsToQueue([
            {
              mood: "happy",
              type: "await",
              isBlocking: false,
            },
          ])
        }
      >
        happy
      </button>
    </MascotStateContext.Provider>
  );
};

export const useMascotState = () => {
  const context = useContext(MascotStateContext);

  if (context === undefined) {
    throw new Error("useMascotState must be used within a MascotStateProvider");
  }

  return context;
};
