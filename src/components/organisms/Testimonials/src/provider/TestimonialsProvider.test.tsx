import { describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen, within } from "@testing-library/react";

import { TestimonialsProvider, useTestimonials } from "./TestimonialsProvider";

const Consumer = () => {
  const { showMore, handleToggleShowMore } = useTestimonials();
  return (
    <div>
      <span data-testid="show-more">{String(showMore)}</span>
      <button onClick={handleToggleShowMore}>toggle</button>
    </div>
  );
};

describe("TestimonialsProvider", () => {
  it("provides showMore as false by default", () => {
    render(
      <TestimonialsProvider>
        <Consumer />
      </TestimonialsProvider>,
    );
    expect(screen.getByTestId("show-more").textContent).toBe("false");
  });

  it("toggles showMore to true on first click", () => {
    render(
      <TestimonialsProvider>
        <Consumer />
      </TestimonialsProvider>,
    );
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("show-more").textContent).toBe("true");
  });

  it("toggles showMore back to false on second click", () => {
    render(
      <TestimonialsProvider>
        <Consumer />
      </TestimonialsProvider>,
    );
    const button = screen.getByText("toggle");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(screen.getByTestId("show-more").textContent).toBe("false");
  });

  it("each provider instance has independent state", () => {
    const { container: containerA } = render(
      <TestimonialsProvider>
        <Consumer />
      </TestimonialsProvider>,
    );
    const { container: containerB } = render(
      <TestimonialsProvider>
        <Consumer />
      </TestimonialsProvider>,
    );

    fireEvent.click(within(containerA).getByText("toggle"));

    expect(within(containerA).getByTestId("show-more").textContent).toBe(
      "true",
    );
    expect(within(containerB).getByTestId("show-more").textContent).toBe(
      "false",
    );
  });
});
