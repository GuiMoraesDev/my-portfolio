import { describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

import { TestimonialsProvider } from "../provider/TestimonialsProvider";

import { ShowMoreButton } from "./ShowMoreButton";

const renderWithProvider = () =>
  render(
    <TestimonialsProvider>
      <ShowMoreButton />
    </TestimonialsProvider>,
  );

describe("ShowMoreButton", () => {
  it("renders a button", () => {
    renderWithProvider();
    expect(screen.getByRole("button")).not.toBeNull();
  });

  it('displays the "show-more" translation key initially', () => {
    renderWithProvider();
    expect(screen.getByRole("button").textContent).toBe("show-more");
  });

  it('displays the "show-less" translation key after clicking', () => {
    renderWithProvider();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button").textContent).toBe("show-less");
  });

  it("toggles back to show-more on second click", () => {
    renderWithProvider();
    const button = screen.getByRole("button");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(button.textContent).toBe("show-more");
  });
});
