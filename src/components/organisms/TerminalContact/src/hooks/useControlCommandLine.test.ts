import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";

import { useControlCommandLine } from "./useControlCommandLine";

import { GITHUB_URL, LINKEDIN_URL } from "@/constants/socialMedia";

describe("useControlCommandLine", () => {
  beforeEach(() => {
    Object.defineProperty(window, "open", {
      value: jest.fn(),
      writable: true,
    });
  });

  it("initializes with the welcome message and empty history", () => {
    const { result } = renderHook(() => useControlCommandLine());

    expect(result.current.lines).toEqual([
      { type: "output", text: "Welcome. Type 'help' for available commands." },
    ]);
    expect(result.current.history).toEqual([]);
    expect(result.current.currentHistoryIndex).toBe(-1);
  });

  it("does not add to history when submitting whitespace-only input", () => {
    const { result } = renderHook(() => useControlCommandLine());

    act(() => {
      result.current.onSubmitCommand("   ");
    });

    expect(result.current.history).toHaveLength(0);
  });

  it("appends the typed command to history", () => {
    const { result } = renderHook(() => useControlCommandLine());

    act(() => {
      result.current.onSubmitCommand("help");
    });

    expect(result.current.history).toEqual(["help"]);
  });

  it("prepends newer commands so history[0] is the most recent", () => {
    const { result } = renderHook(() => useControlCommandLine());

    act(() => {
      result.current.onSubmitCommand("whoami");
      result.current.onSubmitCommand("help");
    });

    expect(result.current.history[0]).toBe("help");
    expect(result.current.history[1]).toBe("whoami");
  });

  it("onUpdateCurrentHistoryIndex updates the index", () => {
    const { result } = renderHook(() => useControlCommandLine());

    act(() => {
      result.current.onUpdateCurrentHistoryIndex(2);
    });

    expect(result.current.currentHistoryIndex).toBe(2);
  });

  describe("commands", () => {
    it("'help' appends all help output lines", () => {
      const { result } = renderHook(() => useControlCommandLine());

      act(() => {
        result.current.onSubmitCommand("help");
      });

      const outputLines = result.current.lines.filter(
        (l) => l.type === "output",
      );
      expect(outputLines.some((l) => l.text.includes("whoami"))).toBe(true);
      expect(outputLines.some((l) => l.text.includes("contact"))).toBe(true);
      expect(outputLines.some((l) => l.text.includes("clear"))).toBe(true);
    });

    it("'whoami' appends the developer bio", () => {
      const { result } = renderHook(() => useControlCommandLine());

      act(() => {
        result.current.onSubmitCommand("whoami");
      });

      const texts = result.current.lines.map((l) => l.text);
      expect(texts.some((t) => t.includes("Guilherme Moraes"))).toBe(true);
    });

    it("'contact' appends GitHub and LinkedIn links and the email", () => {
      const { result } = renderHook(() => useControlCommandLine());

      act(() => {
        result.current.onSubmitCommand("contact");
      });

      const linkLines = result.current.lines.filter((l) => l.type === "link");
      expect(linkLines.some((l) => l.href === GITHUB_URL)).toBe(true);
      expect(linkLines.some((l) => l.href === LINKEDIN_URL)).toBe(true);

      const texts = result.current.lines.map((l) => l.text);
      expect(texts.some((t) => t.includes("guimoraes.dev@gmail.com"))).toBe(
        true,
      );
    });

    it("'echo <text>' appends the echoed text as output", () => {
      const { result } = renderHook(() => useControlCommandLine());

      act(() => {
        result.current.onSubmitCommand("echo hello world");
      });

      const outputLines = result.current.lines.filter(
        (l) => l.type === "output",
      );
      expect(outputLines.some((l) => l.text === "hello world")).toBe(true);
    });

    it("'echo' without arguments appends no extra output", () => {
      const { result } = renderHook(() => useControlCommandLine());
      const initialLength = result.current.lines.length;

      act(() => {
        result.current.onSubmitCommand("echo");
      });

      // only the input echo line is added, no output line
      const newLines = result.current.lines.slice(initialLength);
      expect(newLines.filter((l) => l.type === "output")).toHaveLength(0);
    });

    it("'clear' resets lines back to the initial welcome message", () => {
      const { result } = renderHook(() => useControlCommandLine());

      act(() => {
        result.current.onSubmitCommand("help");
        result.current.onSubmitCommand("clear");
      });

      expect(result.current.lines).toHaveLength(1);
      expect(result.current.lines[0].text).toContain("Welcome");
    });

    it("'open github' calls window.open with the GitHub URL", () => {
      const { result } = renderHook(() => useControlCommandLine());

      act(() => {
        result.current.onSubmitCommand("open github");
      });

      expect(window.open).toHaveBeenCalledWith(
        GITHUB_URL,
        "_blank",
        "noopener,noreferrer",
      );
    });

    it("'open linkedin' calls window.open with the LinkedIn URL", () => {
      const { result } = renderHook(() => useControlCommandLine());

      act(() => {
        result.current.onSubmitCommand("open linkedin");
      });

      expect(window.open).toHaveBeenCalledWith(
        LINKEDIN_URL,
        "_blank",
        "noopener,noreferrer",
      );
    });

    it("'open <unknown>' appends an error line", () => {
      const { result } = renderHook(() => useControlCommandLine());

      act(() => {
        result.current.onSubmitCommand("open foobar");
      });

      const errorLines = result.current.lines.filter((l) => l.type === "error");
      expect(errorLines.some((l) => l.text.includes("foobar"))).toBe(true);
    });

    it("unknown command appends a 'command not found' error", () => {
      const { result } = renderHook(() => useControlCommandLine());

      act(() => {
        result.current.onSubmitCommand("foobar");
      });

      const errorLines = result.current.lines.filter((l) => l.type === "error");
      expect(errorLines.some((l) => l.text.includes("foobar"))).toBe(true);
    });

    it("unknown command also appends the 'type help' hint", () => {
      const { result } = renderHook(() => useControlCommandLine());

      act(() => {
        result.current.onSubmitCommand("foobar");
      });

      const outputLines = result.current.lines.filter(
        (l) => l.type === "output",
      );
      expect(outputLines.some((l) => l.text.includes("help"))).toBe(true);
    });

    it("commands are case-insensitive", () => {
      const { result } = renderHook(() => useControlCommandLine());

      act(() => {
        result.current.onSubmitCommand("WHOAMI");
      });

      const texts = result.current.lines.map((l) => l.text);
      expect(texts.some((t) => t.includes("Guilherme Moraes"))).toBe(true);
    });
  });
});
