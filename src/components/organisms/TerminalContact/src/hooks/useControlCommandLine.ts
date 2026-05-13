import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { findSuggestion } from "../utils/suggestion";

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

const PLAIN_COMMAND_NAMES = ["whoami", "echo", "clear"];

type RunCommandResult = { lines: TerminalLine[]; clear?: boolean };

export const useControlCommandLine = () => {
  const t = useTranslations("terminal");

  const slashCommands = useMemo<SlashCommand[]>(
    () => [
      { name: "/help", description: t("commands.help.description") },
      { name: "/contact", description: t("commands.contact.description") },
      { name: "/games", description: t("commands.games.description") },
      {
        name: "/open github",
        description: t("commands.open.github-description"),
      },
      {
        name: "/open linkedin",
        description: t("commands.open.linkedin-description"),
      },
    ],
    [t],
  );

  const slashCommandNames = [
    ...new Set(slashCommands.map((c) => c.name.slice(1).split(" ")[0])),
  ];

  const initialLines: TerminalLine[] = [{ type: "output", text: t("welcome") }];

  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [history, setHistory] = useState<string[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  const notFoundLines = (
    cmd: string,
    prefix: string,
    candidates: string[],
  ): TerminalLine[] => {
    const suggestion = findSuggestion(cmd, candidates);
    return [
      {
        type: "error",
        text: suggestion
          ? t("errors.not-found-suggestion", { prefix, cmd, suggestion })
          : t("errors.not-found", { prefix, cmd }),
      },
      ...(suggestion
        ? []
        : [
            {
              type: "output" as const,
              text: t("errors.try-help"),
            },
          ]),
    ];
  };

  const runCommand = (raw: string): RunCommandResult => {
    const trimmed = raw.trim();

    if (!trimmed) return { lines: [] };

    if (trimmed.startsWith("/")) {
      const [cmd, ...args] = trimmed.slice(1).toLowerCase().split(/\s+/);

      switch (cmd) {
        case "help":
          return {
            lines: [
              { type: "output", text: t("commands.help.lines.whoami") },
              { type: "output", text: t("commands.help.lines.echo") },
              { type: "output", text: t("commands.help.lines.clear") },
              { type: "output", text: t("commands.help.lines.help") },
              { type: "output", text: t("commands.help.lines.contact") },
              { type: "output", text: t("commands.help.lines.games") },
              { type: "output", text: t("commands.help.lines.open-github") },
              {
                type: "output",
                text: t("commands.help.lines.open-linkedin"),
              },
            ],
          };

        case "contact":
          return {
            lines: [
              { type: "link", text: "GitHub", href: GITHUB_URL },
              { type: "link", text: "LinkedIn", href: LINKEDIN_URL },
              { type: "output", text: t("commands.contact.email") },
            ],
          };

        case "games":
          return {
            lines: [
              {
                type: "link",
                text: t("commands.games.rps-title"),
                href: "https://rock-paper-scissor.guimoraes.dev/",
              },
              { type: "output", text: t("commands.games.rps-description") },
            ],
          };

        case "open":
          switch (args[0]) {
            case "github":
              window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
              return {
                lines: [
                  { type: "output", text: t("commands.open.opening-github") },
                ],
              };
            case "linkedin":
              window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer");
              return {
                lines: [
                  {
                    type: "output",
                    text: t("commands.open.opening-linkedin"),
                  },
                ],
              };
            default:
              return {
                lines: [
                  {
                    type: "error",
                    text: t("errors.unknown-target", {
                      target: args[0] ?? "",
                    }),
                  },
                ],
              };
          }

        default:
          return {
            lines: notFoundLines(cmd, "/", slashCommandNames),
          };
      }
    }

    const [cmd] = trimmed.toLowerCase().split(/\s+/);
    const rawArgs = trimmed.slice(cmd.length).trim();

    switch (cmd) {
      case "whoami": {
        const start = new Date(2019, 5, 11);
        const now = new Date();
        const years =
          now.getFullYear() -
          start.getFullYear() -
          (now < new Date(now.getFullYear(), 5, 11) ? 1 : 0);
        return {
          lines: [
            { type: "output", text: t("commands.whoami.line1") },
            { type: "output", text: t("commands.whoami.line2", { years }) },
            { type: "output", text: t("commands.whoami.line3") },
            { type: "output", text: t("commands.whoami.line4") },
            { type: "link", text: "Github", href: GITHUB_URL },
            { type: "link", text: "LinkedIn", href: LINKEDIN_URL },
          ],
        };
      }

      case "echo":
        return { lines: rawArgs ? [{ type: "output", text: rawArgs }] : [] };

      case "clear":
        return { clear: true, lines: [] };

      default:
        return {
          lines: notFoundLines(cmd, "", PLAIN_COMMAND_NAMES),
        };
    }
  };

  const onSubmitCommand = (input: string) => {
    const trimmed = input.trim();
    const result = runCommand(trimmed);

    if (trimmed) {
      setHistory((prev) => [trimmed, ...prev]);
    }

    if (result.clear) {
      return setLines(initialLines);
    }

    setLines((prev) => [
      ...prev,
      { type: "input", text: trimmed },
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
    slashCommands,
    onSubmitCommand,
    onUpdateCurrentHistoryIndex,
  };
};
