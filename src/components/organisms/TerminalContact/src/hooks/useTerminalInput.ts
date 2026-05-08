import { useMemo, useRef, useState } from "react";

import type { SlashCommand } from "./useControlCommandLine";

type UseTerminalInputArgs = {
  slashCommands: SlashCommand[];
  history: string[];
  currentHistoryIndex: number;
  onSubmitCommand: (cmd: string) => void;
  onUpdateCurrentHistoryIndex: (index: number) => void;
  scrollToBottom: () => void;
};

export const useTerminalInput = ({
  slashCommands,
  history,
  currentHistoryIndex,
  onSubmitCommand,
  onUpdateCurrentHistoryIndex,
  scrollToBottom,
}: UseTerminalInputArgs) => {
  const [input, setInput] = useState("");
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = useMemo(() => {
    if (!input.startsWith("/")) return [];
    return slashCommands.filter((cmd) =>
      cmd.name.startsWith(input.toLowerCase()),
    );
  }, [input, slashCommands]);

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

  return {
    input,
    inputRef,
    filteredSuggestions,
    suggestionIndex,
    onSelectSuggestion: selectSuggestion,
    onKeyDown: handleKeyDown,
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      setSuggestionIndex(-1);
    },
  };
};
