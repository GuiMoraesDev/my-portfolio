import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";

import { useTerminalInput } from "./useTerminalInput";

beforeEach(() => {
  Element.prototype.scrollIntoView = jest.fn<() => void>();
});

describe("useTerminalInput", () => {
  describe("initial state", () => {
    it("starts with an empty input", () => {
      const { result } = renderHook(() => useTerminalInput());
      expect(result.current.input).toBe("");
    });

    it("exposes the welcome line from useControlCommandLine", () => {
      const { result } = renderHook(() => useTerminalInput());
      expect(
        result.current.lines.some((l) =>
          l.text.includes("Welcome. Type 'help' for available commands."),
        ),
      ).toBe(true);
    });
  });

  describe("onInputChange", () => {
    it("updates the input value", () => {
      const { result } = renderHook(() => useTerminalInput());

      act(() => {
        result.current.onInputChange({
          target: { value: "help" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.input).toBe("help");
    });
  });

  describe("onKeyDown — Enter", () => {
    it("clears the input after submitting", () => {
      const { result } = renderHook(() => useTerminalInput());

      act(() => {
        result.current.onInputChange({
          target: { value: "whoami" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.onKeyDown({
          key: "Enter",
        } as React.KeyboardEvent<HTMLInputElement>);
      });

      expect(result.current.input).toBe("");
    });

    it("appends the command as an input line", () => {
      const { result } = renderHook(() => useTerminalInput());

      act(() => {
        result.current.onInputChange({
          target: { value: "whoami" },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      act(() => {
        result.current.onKeyDown({
          key: "Enter",
        } as React.KeyboardEvent<HTMLInputElement>);
      });

      expect(
        result.current.lines.some(
          (l) => l.type === "input" && l.text === "whoami",
        ),
      ).toBe(true);
    });
  });

  describe("onKeyDown — ArrowUp / ArrowDown", () => {
    it("ArrowUp restores the most recent command", () => {
      const { result } = renderHook(() => useTerminalInput());

      act(() => {
        result.current.onInputChange({
          target: { value: "help" },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      act(() => {
        result.current.onKeyDown({
          key: "Enter",
        } as React.KeyboardEvent<HTMLInputElement>);
      });
      act(() => {
        result.current.onKeyDown({
          key: "ArrowUp",
        } as React.KeyboardEvent<HTMLInputElement>);
      });

      expect(result.current.input).toBe("help");
    });

    it("ArrowDown past the start clears the input", () => {
      const { result } = renderHook(() => useTerminalInput());

      act(() => {
        result.current.onInputChange({
          target: { value: "help" },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      act(() => {
        result.current.onKeyDown({
          key: "Enter",
        } as React.KeyboardEvent<HTMLInputElement>);
      });
      act(() => {
        result.current.onKeyDown({
          key: "ArrowUp",
        } as React.KeyboardEvent<HTMLInputElement>);
      });
      act(() => {
        result.current.onKeyDown({
          key: "ArrowDown",
        } as React.KeyboardEvent<HTMLInputElement>);
      });

      expect(result.current.input).toBe("");
    });

    it("ArrowUp navigates through multiple history entries", () => {
      const { result } = renderHook(() => useTerminalInput());

      act(() => {
        result.current.onInputChange({
          target: { value: "help" },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      act(() => {
        result.current.onKeyDown({
          key: "Enter",
        } as React.KeyboardEvent<HTMLInputElement>);
      });
      act(() => {
        result.current.onInputChange({
          target: { value: "whoami" },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      act(() => {
        result.current.onKeyDown({
          key: "Enter",
        } as React.KeyboardEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.onKeyDown({
          key: "ArrowUp",
        } as React.KeyboardEvent<HTMLInputElement>);
      });
      expect(result.current.input).toBe("whoami");

      act(() => {
        result.current.onKeyDown({
          key: "ArrowUp",
        } as React.KeyboardEvent<HTMLInputElement>);
      });
      expect(result.current.input).toBe("help");
    });
  });

  describe("unhandled keys", () => {
    it("does not change input for unhandled keys", () => {
      const { result } = renderHook(() => useTerminalInput());

      act(() => {
        result.current.onInputChange({
          target: { value: "he" },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.onKeyDown({
          key: "Tab",
        } as React.KeyboardEvent<HTMLInputElement>);
      });

      expect(result.current.input).toBe("he");
    });
  });
});
