"use client";

import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

import type { SlashCommand } from "../hooks/useControlCommandLine";
import { useTerminalInput } from "../hooks/useTerminalInput";

type TerminalInputProps = {
  slashCommands: SlashCommand[];
  history: string[];
  currentHistoryIndex: number;
  onSubmitCommand: (cmd: string) => void;
  onUpdateCurrentHistoryIndex: (index: number) => void;
  scrollToBottom: () => void;
};

export const TerminalInput = (props: TerminalInputProps) => {
  const t = useTranslations("terminal");
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
        <div className="shrink-0 border-t border-border-subtle bg-terminal-surface font-mono">
          {filteredSuggestions.map((cmd, i) => (
            <button
              key={cmd.name}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onSelectSuggestion(cmd.name);
              }}
              className={twMerge(
                "flex w-full gap-4 px-4 py-1.5 text-left hover:bg-terminal-hover",
                i === suggestionIndex && "bg-terminal-hover",
              )}
            >
              <span className="text-plum-300">{cmd.name}</span>
              <span className="text-text-muted">{cmd.description}</span>
            </button>
          ))}
        </div>
      )}

      <footer className="flex shrink-0 items-center gap-2 border-t border-border-subtle px-4 py-3 font-mono">
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
          placeholder={t("input-placeholder")}
          aria-label={t("input-label")}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </footer>
    </>
  );
};
