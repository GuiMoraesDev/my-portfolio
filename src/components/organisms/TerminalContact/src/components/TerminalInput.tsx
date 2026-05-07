"use client";

import { twMerge } from "tailwind-merge";

import { useTerminalInput } from "../hooks/useTerminalInput";

type TerminalInputProps = {
  history: string[];
  currentHistoryIndex: number;
  onSubmitCommand: (cmd: string) => void;
  onUpdateCurrentHistoryIndex: (index: number) => void;
  scrollToBottom: () => void;
};

export const TerminalInput = (props: TerminalInputProps) => {
  const {
    input,
    inputRef,
    filteredSuggestions,
    suggestionIndex,
    onSelectSuggestion,
    onKeyDown,
    onInputChange,
  } = useTerminalInput(props);

  return (
    <>
      {filteredSuggestions.length > 0 && (
        <div className="shrink-0 border-t border-border-subtle bg-[#0d0d0d] font-mono text-sm">
          {filteredSuggestions.map((cmd, i) => (
            <button
              key={cmd.name}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onSelectSuggestion(cmd.name);
              }}
              className={twMerge(
                "flex w-full gap-4 px-4 py-1.5 text-left hover:bg-[#1a1a1a]",
                i === suggestionIndex && "bg-[#1a1a1a]",
              )}
            >
              <span className="text-plum-300">{cmd.name}</span>
              <span className="text-text-muted">{cmd.description}</span>
            </button>
          ))}
        </div>
      )}

      <footer className="flex shrink-0 items-center gap-2 border-t border-border-subtle px-4 py-3 font-mono text-sm">
        <span aria-hidden className="text-plum-300 select-none">
          $
        </span>
        <input
          data-testid="terminal-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent text-text-primary caret-plum-300 outline-none placeholder:text-text-muted"
          placeholder="type a command..."
          aria-label="Terminal input"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </footer>
    </>
  );
};
