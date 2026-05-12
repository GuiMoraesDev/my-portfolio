import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

import { TerminalContact } from "./TerminalContact";

beforeEach(() => {
  Element.prototype.scrollIntoView = jest.fn<() => void>();
});

const openTerminal = () =>
  fireEvent.click(screen.getByTestId("terminal-open-button"));

const getInput = () => screen.getByTestId("terminal-input") as HTMLInputElement;

describe("TerminalContact", () => {
  describe("trigger button", () => {
    it("renders the open button", () => {
      render(<TerminalContact />);
      expect(screen.getByTestId("terminal-open-button")).not.toBeNull();
    });

    it("opens the dialog when clicked", () => {
      render(<TerminalContact />);
      openTerminal();
      expect(screen.getByTestId("terminal-dialog")).not.toBeNull();
    });
  });

  describe("dialog", () => {
    it("renders the dialog after opening", () => {
      render(<TerminalContact />);
      openTerminal();
      expect(screen.getByTestId("terminal-dialog")).not.toBeNull();
    });

    it("closes the dialog when the close button is clicked", () => {
      render(<TerminalContact />);
      openTerminal();
      fireEvent.click(screen.getByTestId("terminal-close-button"));
      expect(screen.queryByTestId("terminal-dialog")).toBeNull();
    });

    it("shows the terminal path in the header", () => {
      render(<TerminalContact />);
      openTerminal();
      expect(screen.getByTestId("terminal-path").textContent).toBe(
        "~/.guimoraes.dev",
      );
    });

    it("shows the welcome message on mount", () => {
      render(<TerminalContact />);
      openTerminal();
      const outputLines = screen.getAllByTestId("terminal-line-output");
      expect(
        outputLines.some((el) =>
          el.textContent?.includes(
            "Welcome. Type '/help' for available commands.",
          ),
        ),
      ).toBe(true);
    });
  });

  describe("input", () => {
    it("renders the terminal input", () => {
      render(<TerminalContact />);
      openTerminal();
      expect(getInput()).not.toBeNull();
    });

    it("updates the input value as the user types", () => {
      render(<TerminalContact />);
      openTerminal();
      const input = getInput();

      fireEvent.change(input, { target: { value: "help" } });
      expect(input.value).toBe("help");
    });

    it("clears the input after pressing Enter", () => {
      render(<TerminalContact />);
      openTerminal();
      const input = getInput();

      fireEvent.change(input, { target: { value: "whoami" } });
      fireEvent.keyDown(input, { key: "Enter" });
      expect(input.value).toBe("");
    });

    it("renders the submitted command as an input line", () => {
      render(<TerminalContact />);
      openTerminal();
      const input = getInput();

      fireEvent.change(input, { target: { value: "whoami" } });
      fireEvent.keyDown(input, { key: "Enter" });

      const inputLines = screen.getAllByTestId("terminal-line-input");
      expect(inputLines.some((el) => el.textContent?.includes("whoami"))).toBe(
        true,
      );
    });

    it("navigates history with ArrowUp and restores value in input", () => {
      render(<TerminalContact />);
      openTerminal();
      const input = getInput();

      fireEvent.change(input, { target: { value: "help" } });
      fireEvent.keyDown(input, { key: "Enter" });
      fireEvent.change(input, { target: { value: "whoami" } });
      fireEvent.keyDown(input, { key: "Enter" });

      fireEvent.keyDown(input, { key: "ArrowUp" });
      expect(input.value).toBe("whoami");

      fireEvent.keyDown(input, { key: "ArrowUp" });
      expect(input.value).toBe("help");
    });

    it("navigates forward with ArrowDown and clears when past the start", () => {
      render(<TerminalContact />);
      openTerminal();
      const input = getInput();

      fireEvent.change(input, { target: { value: "help" } });
      fireEvent.keyDown(input, { key: "Enter" });

      fireEvent.keyDown(input, { key: "ArrowUp" });
      expect(input.value).toBe("help");

      fireEvent.keyDown(input, { key: "ArrowDown" });
      expect(input.value).toBe("");
    });
  });

  describe("drag", () => {
    it("renders the drag handle in the header", () => {
      render(<TerminalContact />);
      openTerminal();
      expect(screen.getByTestId("terminal-drag-handle")).not.toBeNull();
    });
  });

  describe("line rendering", () => {
    it("renders error lines for unknown commands", () => {
      render(<TerminalContact />);
      openTerminal();
      const input = getInput();

      fireEvent.change(input, { target: { value: "badcmd" } });
      fireEvent.keyDown(input, { key: "Enter" });

      const errorLines = screen.getAllByTestId("terminal-line-error");
      expect(
        errorLines.some((el) =>
          el.textContent?.includes("command not found: badcmd"),
        ),
      ).toBe(true);
    });

    it("renders link lines with correct hrefs for the contact command", () => {
      render(<TerminalContact />);
      openTerminal();
      const input = getInput();

      fireEvent.change(input, { target: { value: "/contact" } });
      fireEvent.keyDown(input, { key: "Enter" });

      const links = screen
        .getAllByTestId("terminal-line-link")
        .map((el) => el.getAttribute("href"));

      expect(links).toContain("https://github.com/GuiMoraesDev");
      expect(links).toContain("https://www.linkedin.com/in/guimoraesdev");
    });
  });
});
