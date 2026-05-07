import { useRef, useState } from "react";

import { useControlCommandLine } from "./useControlCommandLine";

export const useTerminalInput = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    lines,
    history,
    currentHistoryIndex,
    onSubmitCommand,
    onUpdateCurrentHistoryIndex,
  } = useControlCommandLine();

  const scrollToBottom = () =>
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleEnter = () => {
    onSubmitCommand(input);
    scrollToBottom();
    setInput("");
  };

  const handleArrowUp = () => {
    const next = Math.min(currentHistoryIndex + 1, history.length - 1);
    onUpdateCurrentHistoryIndex(next);
    setInput(history[next] ?? "");
  };

  const handleArrowDown = () => {
    const next = currentHistoryIndex - 1;
    if (next < 0) {
      onUpdateCurrentHistoryIndex(-1);
      setInput("");
      return;
    }
    onUpdateCurrentHistoryIndex(next);
    setInput(history[next] ?? "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        return handleEnter();
      case "ArrowUp":
        return handleArrowUp();
      case "ArrowDown":
        return handleArrowDown();
    }
  };

  return {
    input,
    inputRef,
    bottomRef,
    lines,
    onKeyDown: handleKeyDown,
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setInput(e.target.value),
  };
};
