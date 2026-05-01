import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";

import { Icon } from "./index";

describe("Icon", () => {
  it("renders a span wrapping the icon", () => {
    const { container } = render(<Icon name="Github" />);
    expect(container.querySelector("span")).not.toBeNull();
  });

  it("applies the md size class by default", () => {
    const { container } = render(<Icon name="Github" />);
    expect(container.querySelector("span")!.className).toContain("size-5");
  });

  it("applies the sm size class when size='sm'", () => {
    const { container } = render(<Icon name="Github" size="sm" />);
    expect(container.querySelector("span")!.className).toContain("size-3");
  });

  it("applies the lg size class when size='lg'", () => {
    const { container } = render(<Icon name="Github" size="lg" />);
    expect(container.querySelector("span")!.className).toContain("size-7");
  });

  it("applies rounded-full when rounded='full'", () => {
    const { container } = render(<Icon name="Github" rounded="full" />);
    expect(container.querySelector("span")!.className).toContain(
      "rounded-full",
    );
  });

  it("passes additional className to the span", () => {
    const { container } = render(
      <Icon name="Github" className="custom-class" />,
    );
    expect(container.querySelector("span")!.className).toContain(
      "custom-class",
    );
  });

  it.each(["Github", "LinkedIn"] as const)(
    "renders the %s icon without error",
    (icon) => {
      const { container } = render(<Icon name={icon} />);
      expect(container.querySelector("span")).not.toBeNull();
    },
  );

  it("renders SVG content inside the span", () => {
    const { container } = render(<Icon name="Github" />);
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
