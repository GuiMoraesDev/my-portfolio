import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";

import { type MascotMood } from "../@types";
import { TEXT_ANIMATION_DELAY } from "../config/constants";

interface MascotStateContextType {
  currentMood: MascotMood;
  text: string;
  handleSetMascotText: (text: string) => void;
}

const MascotStateContext = createContext<MascotStateContextType | undefined>(
  undefined,
);

type MascotStateProviderProps = PropsWithChildren<{
  mood?: MascotMood;
}>;

export const MascotStateProvider = ({
  children,
  mood = "idle",
}: MascotStateProviderProps) => {
  const [currentMood, setCurrentMood] = useState<MascotMood>(mood);
  const [text, setText] = useState("");

  const handleSetMascotText = (textToTalk: string) => {
    setCurrentMood("talking");
    setText(textToTalk);

    const timeToTalk = textToTalk.length * TEXT_ANIMATION_DELAY;

    setTimeout(() => {
      setCurrentMood("idle");
    }, timeToTalk * 1000);

    setTimeout(
      () => {
        setText("");
      },
      timeToTalk * 1.5 * 1000,
    );
  };

  return (
    <MascotStateContext.Provider
      value={{ currentMood, text, handleSetMascotText }}
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
