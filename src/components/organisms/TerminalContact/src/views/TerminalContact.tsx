"use client";

import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useControlCommandLine } from "../hooks/useControlCommandLine";

import { Icon } from "@/components/atoms/Icon";

export const TerminalContact = () => {
  const [input, setInput] = useState("");

  const {
    lines,
    history,
    currentHistoryIndex,
    onSubmitCommand,
    onUpdateCurrentHistoryIndex,
  } = useControlCommandLine();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleScrollToBottom = () =>
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleClearInput = () => {
    setInput("");
  };

  const handleEnterKeyPress = () => {
    onSubmitCommand(input);
    handleScrollToBottom();
    handleClearInput();
  };

  const handleArrowUpKeypress = () => {
    const next = Math.min(currentHistoryIndex + 1, history.length - 1);

    onUpdateCurrentHistoryIndex(next);
    setInput(history[next] ?? "");
  };

  const handleArrowDownKeypress = () => {
    const next = currentHistoryIndex - 1;

    if (next < 0) {
      onUpdateCurrentHistoryIndex(-1);
      handleClearInput();

      return;
    }

    onUpdateCurrentHistoryIndex(next);
    setInput(history[next] ?? "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter": {
        return handleEnterKeyPress();
      }
      case "ArrowUp": {
        return handleArrowUpKeypress();
      }
      case "ArrowDown": {
        return handleArrowDownKeypress();
      }
    }
  };

  const handleOpenModal = () => dialogRef.current?.showModal();

  const handleCloseModal = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        aria-label="Open terminal"
        onClick={handleOpenModal}
        className="fixed right-6 bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-border-strong bg-bg-elevated shadow-lg transition-all hover:border-plum-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum-300 active:scale-95"
      >
        <span
          aria-hidden
          className="font-mono text-sm leading-none font-bold text-plum-300"
        >
          &gt;_
        </span>
      </button>

      <dialog
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        ref={dialogRef}
        className={twMerge(
          "invisible top-full left-full h-0 w-0 border-0",
          "open:visible open:top-1/2 open:left-1/2 open:h-120 open:w-[90%] open:border",
          "fixed z-50 flex max-w-2xl -translate-1/2 flex-col overflow-hidden rounded border-border-strong bg-[#0d0d0d] shadow-[0_16px_48px_rgba(0,0,0,0.7)] transition-all",
        )}
      >
        <header className="flex shrink-0 items-center gap-2 border-b border-border-subtle bg-[#111] px-4 py-2.5">
          <button
            type="button"
            aria-label="Close terminal"
            onClick={handleCloseModal}
            className="group relative h-3.5 w-3.5 rounded-full bg-[#ff5f56] focus-visible:outline-2 focus-visible:outline-offset-1"
          >
            <Icon
              name="Cross"
              className="absolute top-1/2 left-1/2 flex size-3.5! -translate-1/2 items-center justify-center stroke-2 font-medium opacity-0 transition-opacity group-hover:opacity-100"
            />
          </button>
          <span className="h-3.5 w-3.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-3.5 w-3.5 rounded-full bg-[#27c93f]" />
          <span className="ml-auto font-mono text-xs text-text-muted">
            ~/.guimoraes.dev
          </span>
        </header>

        <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed">
          {lines.map((line, lineIndex) => (
            <li key={lineIndex} className="flex flex-col">
              {line.type === "input" && (
                <div className="flex gap-2">
                  <span className="text-plum-300 select-none">$</span>
                  <span className="text-text-primary">{line.text}</span>
                </div>
              )}
              {line.type === "link" && (
                <div key={lineIndex + "_link"} className="pl-4">
                  <a
                    href={line.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-plum-300 underline hover:opacity-80"
                  >
                    {line.text}
                  </a>
                </div>
              )}
              {line.type === "error" && (
                <div key={lineIndex + "_error"} className="pl-4 text-red-400">
                  {line.text}
                </div>
              )}
              {line.type === "output" && (
                <div
                  key={lineIndex + "_text"}
                  className="pl-4 text-text-secondary"
                >
                  {line.text}
                </div>
              )}
            </li>
          ))}
          <div ref={bottomRef} />
        </ul>

        <footer className="flex shrink-0 items-center gap-2 border-t border-border-subtle px-4 py-3 font-mono text-sm">
          <span aria-hidden className="text-plum-300 select-none">
            $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-text-primary caret-plum-300 outline-none placeholder:text-text-muted"
            placeholder="type a command..."
            aria-label="Terminal input"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </footer>
      </dialog>
    </>
  );
};
