"use client";

import { useEffect, useRef, useState } from "react";

import { GITHUB_URL, LINKEDIN_URL } from "@/constants/socialMedia";

type LineType = "input" | "output" | "error" | "link";

type TerminalLine = {
  id: number;
  type: LineType;
  text: string;
  href?: string;
};

let lineId = 0;
const mkLine = (type: LineType, text: string, href?: string): TerminalLine => ({
  id: lineId++,
  type,
  text,
  href,
});

const WELCOME: TerminalLine[] = [
  mkLine("output", "Welcome. Type 'help' for available commands."),
];

function runCommand(raw: string): { lines: TerminalLine[]; clear?: boolean } {
  const trimmed = raw.trim();
  if (!trimmed) return { lines: [] };

  const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);
  const rawArgs = trimmed.slice(cmd.length).trim();

  switch (cmd) {
    case "help":
      return {
        lines: [
          mkLine("output", "  whoami          ->   who is this person"),
          mkLine("output", "  contact         ->   show contact links"),
          mkLine("output", "  echo [text]     ->   print text"),
          mkLine("output", "  open github     ->   open GitHub profile"),
          mkLine("output", "  open linkedin   ->   open LinkedIn profile"),
          mkLine("output", "  clear           ->   clear the terminal"),
          mkLine("output", "  help            ->   show this message"),
        ],
      };

    case "whoami":
      return {
        lines: [
          mkLine("output", "Guilherme Moraes — Senior Software Engineer"),
          mkLine("output", "Building frontend systems that hold up over time."),
        ],
      };

    case "contact":
      return {
        lines: [
          mkLine("link", "GitHub", GITHUB_URL),
          mkLine("link", "LinkedIn", LINKEDIN_URL),
          mkLine("output", "email: guimoraes.dev@gmail.com"),
        ],
      };

    case "echo":
      return { lines: rawArgs ? [mkLine("output", rawArgs)] : [] };

    case "open":
      if (args[0] === "github") {
        window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
        return { lines: [mkLine("output", "Opening GitHub...")] };
      }
      if (args[0] === "linkedin") {
        window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer");
        return { lines: [mkLine("output", "Opening LinkedIn...")] };
      }
      return {
        lines: [mkLine("error", `unknown target: ${args[0] ?? ""}`)],
      };

    case "clear":
      return { clear: true, lines: [] };

    default:
      return {
        lines: [
          mkLine("error", `command not found: ${cmd}`),
          mkLine("output", "type 'help' for available commands"),
        ],
      };
  }
}

export const TerminalContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const dialogRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<
        HTMLButtonElement | HTMLAnchorElement | HTMLInputElement
      >("button, a[href], input");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const submit = () => {
    const trimmed = input.trim();
    const inputLine = mkLine("input", trimmed);
    const result = runCommand(trimmed);

    if (trimmed) {
      setHistory((prev) => [trimmed, ...prev]);
      setHistoryIdx(-1);
    }

    if (result.clear) {
      setLines([...WELCOME]);
    } else {
      setLines((prev) => [...prev, inputLine, ...result.lines]);
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setInput(history[next] ?? "");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIdx - 1;
      if (next < 0) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(history[next] ?? "");
      }
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open terminal"
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-border-strong bg-bg-elevated shadow-lg transition-all hover:border-accent-400 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 active:scale-95"
      >
        <span
          aria-hidden
          className="font-mono text-sm leading-none font-bold text-accent-400"
        >
          &gt;_
        </span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 py-8"
          role="presentation"
          onClick={() => setIsOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Terminal"
            ref={dialogRef}
            className="flex h-120 w-full max-w-2xl flex-col overflow-hidden rounded border border-border-strong bg-[#0d0d0d] shadow-[0_16px_48px_rgba(0,0,0,0.7)]"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex shrink-0 items-center gap-2 border-b border-border-subtle bg-[#111] px-4 py-2.5">
              <button
                type="button"
                aria-label="Close terminal"
                onClick={() => setIsOpen(false)}
                className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] focus-visible:outline-2 focus-visible:outline-offset-1"
              />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-auto font-mono text-xs text-text-muted">
                ~ portfolio
              </span>
            </header>

            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed">
              {lines.map((line) => {
                if (line.type === "input") {
                  return (
                    <div key={line.id} className="flex gap-2">
                      <span className="text-accent-400 select-none">$</span>
                      <span className="text-text-primary">{line.text}</span>
                    </div>
                  );
                }
                if (line.type === "link") {
                  return (
                    <div key={line.id} className="pl-4">
                      <a
                        href={line.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-400 underline hover:opacity-80"
                      >
                        {line.text}
                      </a>
                    </div>
                  );
                }
                if (line.type === "error") {
                  return (
                    <div key={line.id} className="pl-4 text-red-400">
                      {line.text}
                    </div>
                  );
                }
                return (
                  <div key={line.id} className="pl-4 text-text-secondary">
                    {line.text}
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            <div className="flex shrink-0 items-center gap-2 border-t border-border-subtle px-4 py-3 font-mono text-sm">
              <span aria-hidden className="text-accent-400 select-none">
                $
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-text-primary caret-accent-400 outline-none placeholder:text-text-muted"
                placeholder="type a command..."
                aria-label="Terminal input"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
};
