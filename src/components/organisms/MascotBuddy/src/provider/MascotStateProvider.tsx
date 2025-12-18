import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

import { type MascotAction } from "../@types";
import {
  DEFAULT_ACTION_AWAIT_MS,
  IDLE_ACTION_AWAIT_MS,
  TEXT_ANIMATION_DELAY,
} from "../config/constants";

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
