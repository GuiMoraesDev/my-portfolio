import { describe, expect, it, jest } from "@jest/globals";
import { act, fireEvent, render, screen } from "@testing-library/react";

import { ContactModal } from "./ContactModal";

import { EMAIL } from "@/constants/socialMedia";

const openModal = () =>
  fireEvent.click(screen.getByTestId("contact-open-button"));

describe("ContactModal", () => {
  it("renders the trigger with the given label", () => {
    render(<ContactModal label="Contact" />);
    expect(screen.getByTestId("contact-open-button").textContent).toBe(
      "Contact",
    );
  });

  it("opens the dialog and calls onOpen when the trigger is clicked", () => {
    const onOpen = jest.fn();
    render(<ContactModal label="Contact" onOpen={onOpen} />);
    openModal();
    expect(screen.getByTestId("contact-dialog")).not.toBeNull();
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("closes the dialog when the close button is clicked", () => {
    render(<ContactModal label="Contact" />);
    openModal();
    fireEvent.click(screen.getByTestId("contact-close-button"));
    expect(screen.queryByTestId("contact-dialog")).toBeNull();
  });

  it("copies the email to the clipboard", async () => {
    const writeText = jest.fn<(text: string) => Promise<void>>(() =>
      Promise.resolve(),
    );
    Object.assign(navigator, { clipboard: { writeText } });

    render(<ContactModal label="Contact" />);
    openModal();

    await act(async () => {
      fireEvent.click(screen.getByText("Copy email"));
    });

    expect(writeText).toHaveBeenCalledWith(EMAIL);
    expect(screen.getByText("Copied")).not.toBeNull();
  });
});
