import { useMemo, useRef, useState } from "react";

import { SLASH_COMMANDS } from "./useControlCommandLine";
import { useControlCommandLine } from "./useControlCommandLine";

export const useTerminalInput = () => {
  const [input, setInput] = useState("");
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
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

  const filteredSuggestions = useMemo(() => {
    if (!input.startsWith("/")) return [];
    return SLASH_COMMANDS.filter((cmd) =>
      cmd.name.startsWith(input.toLowerCase()),
    );
  }, [input]);

  const selectSuggestion = (name: string) => {
    setInput(name);
    setSuggestionIndex(-1);
    inputRef.current?.focus();
  };

  const handleEnter = () => {
    if (suggestionIndex >= 0 && filteredSuggestions[suggestionIndex]) {
      selectSuggestion(filteredSuggestions[suggestionIndex].name);
      return;
    }
    onSubmitCommand(input);
    scrollToBottom();
    setInput("");
    setSuggestionIndex(-1);
  };

  const handleArrowUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredSuggestions.length > 0) {
      e.preventDefault();
      setSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
      return;
    }
    const next = Math.min(currentHistoryIndex + 1, history.length - 1);
    onUpdateCurrentHistoryIndex(next);
    setInput(history[next] ?? "");
  };

  const handleArrowDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredSuggestions.length > 0) {
      e.preventDefault();
      setSuggestionIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev,
      );
      return;
    }
    const next = currentHistoryIndex - 1;
    if (next < 0) {
      onUpdateCurrentHistoryIndex(-1);
      setInput("");
      return;
    }
    onUpdateCurrentHistoryIndex(next);
    setInput(history[next] ?? "");
  };

  const handleTab = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredSuggestions.length === 0) return;
    e.preventDefault();
    const target =
      filteredSuggestions[suggestionIndex >= 0 ? suggestionIndex : 0];
    if (target) selectSuggestion(target.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        return handleEnter();
      case "ArrowUp":
        return handleArrowUp(e);
      case "ArrowDown":
        return handleArrowDown(e);
      case "Tab":
        return handleTab(e);
    }
  };

  const onSelectSuggestion = (name: string) => selectSuggestion(name);

  return {
    input,
    inputRef,
    bottomRef,
    lines,
    filteredSuggestions,
    suggestionIndex,
    onSelectSuggestion,
    onKeyDown: handleKeyDown,
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      setSuggestionIndex(-1);
    },
  };
};
