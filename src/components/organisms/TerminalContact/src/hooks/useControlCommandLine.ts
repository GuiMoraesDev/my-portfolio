import { useState } from "react";

import { GITHUB_URL, LINKEDIN_URL } from "@/constants/socialMedia";

export type TerminalLine = {
  type: "input" | "output" | "error" | "link";
  text: string;
  href?: string;
};

export type SlashCommand = {
  name: string;
  description: string;
};

export const SLASH_COMMANDS: SlashCommand[] = [
  { name: "/help", description: "show available commands" },
  { name: "/contact", description: "show contact links" },
  { name: "/open github", description: "open GitHub profile" },
  { name: "/open linkedin", description: "open LinkedIn profile" },
];

const INITIAL_STATE: TerminalLine[] = [
  {
    type: "output",
    text: "Welcome. Type '/help' for available commands.",
  },
];

const HELP_LINES: TerminalLine[] = [
  { type: "output", text: "  whoami          ->   who is this person" },
  { type: "output", text: "  echo [text]     ->   print text" },
  { type: "output", text: "  clear           ->   clear the terminal" },
  { type: "output", text: "  /help           ->   show this message" },
  { type: "output", text: "  /contact        ->   show contact links" },
  {
    type: "output",
    text: "  /open github    ->   open GitHub profile",
  },
  {
    type: "output",
    text: "  /open linkedin  ->   open LinkedIn profile",
  },
];

const WHOAMI_LINES: TerminalLine[] = [
  {
    type: "output",
    text: "Guilherme Moraes — Senior Software Engineer",
  },
  {
    type: "output",
    text: "Building frontend systems that hold up over time.",
  },
];

const CONTACT_LINES: TerminalLine[] = [
  { type: "link", text: "GitHub", href: GITHUB_URL },
  { type: "link", text: "LinkedIn", href: LINKEDIN_URL },
  { type: "output", text: "email: guimoraes.dev@gmail.com" },
];

type RunCommandArgs = { lines: TerminalLine[]; clear?: boolean };

const runCommand = (raw: string): RunCommandArgs => {
  const trimmed = raw.trim();

  if (!trimmed) return { lines: [] };

  if (trimmed.startsWith("/")) {
    const withoutSlash = trimmed.slice(1);
    const [cmd, ...args] = withoutSlash.toLowerCase().split(/\s+/);

    switch (cmd) {
      case "help":
        return { lines: HELP_LINES };

      case "contact":
        return { lines: CONTACT_LINES };

      case "open":
        switch (args[0]) {
          case "github": {
            window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
            return { lines: [{ type: "output", text: "Opening GitHub..." }] };
          }
          case "linkedin": {
            window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer");
            return { lines: [{ type: "output", text: "Opening LinkedIn..." }] };
          }
          default: {
            return {
              lines: [
                { type: "error", text: `unknown target: ${args[0] ?? ""}` },
              ],
            };
          }
        }

      default:
        return {
          lines: [
            { type: "error", text: `command not found: /${cmd}` },
            { type: "output", text: "type '/help' for available commands" },
          ],
        };
    }
  }

  const [cmd] = trimmed.toLowerCase().split(/\s+/);
  const rawArgs = trimmed.slice(cmd.length).trim();

  switch (cmd) {
    case "whoami":
      return { lines: WHOAMI_LINES };

    case "echo":
      return { lines: rawArgs ? [{ type: "output", text: rawArgs }] : [] };

    case "clear":
      return { clear: true, lines: [] };

    default:
      return {
        lines: [
          { type: "error", text: `command not found: ${cmd}` },
          { type: "output", text: "type '/help' for available commands" },
        ],
      };
  }
};

export const useControlCommandLine = () => {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_STATE);
  const [history, setHistory] = useState<string[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  const onSubmitCommand = (input: string) => {
    const trimmed = input.trim();

    const result = runCommand(trimmed);

    if (trimmed) {
      setHistory((prev) => [trimmed, ...prev]);
    }

    if (result.clear) {
      return setLines(INITIAL_STATE);
    }

    setLines((prev) => [
      ...prev,
      {
        type: "input",
        text: trimmed,
      },
      ...result.lines,
    ]);
  };

  const onUpdateCurrentHistoryIndex = (index: number) => {
    setCurrentHistoryIndex(index);
  };

  return {
    lines,
    history,
    currentHistoryIndex,
    onSubmitCommand,
    onUpdateCurrentHistoryIndex,
  };
};
