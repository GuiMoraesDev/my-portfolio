import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";

import { Icon } from "./index";

describe("Icon", () => {
  it("renders an svg icon", () => {
    const { getByTestId } = render(<Icon name="Github" data-testid="icon" />);
    expect(getByTestId("icon")).not.toBeNull();
  });

  it("applies the md size class by default", () => {
    const { getByTestId } = render(<Icon name="Cross" data-testid="icon" />);
    expect(getByTestId("icon").getAttribute("class")).toContain("size-5");
  });

  it("applies the sm size class when size='sm'", () => {
    const { getByTestId } = render(
      <Icon name="Cross" size="sm" data-testid="icon" />,
    );
    expect(getByTestId("icon").getAttribute("class")).toContain("size-3");
  });

  it("applies the lg size class when size='lg'", () => {
    const { getByTestId } = render(
      <Icon name="Cross" size="lg" data-testid="icon" />,
    );
    expect(getByTestId("icon").getAttribute("class")).toContain("size-7");
  });

  it("applies rounded-full when rounded='full'", () => {
    const { getByTestId } = render(
      <Icon name="Cross" rounded="full" data-testid="icon" />,
    );
    expect(getByTestId("icon").getAttribute("class")).toContain("rounded-full");
  });

  it("passes additional className to the icon", () => {
    const { getByTestId } = render(
      <Icon name="Cross" className="custom-class" data-testid="icon" />,
    );
    expect(getByTestId("icon").getAttribute("class")).toContain("custom-class");
  });

  it.each(["Github", "LinkedIn"] as const)(
    "renders the %s icon without error",
    (icon) => {
      const { getByTestId } = render(<Icon name={icon} data-testid="icon" />);
      expect(getByTestId("icon")).not.toBeNull();
    },
  );

  it("renders SVG content", () => {
    const { getByTestId } = render(<Icon name="Github" data-testid="icon" />);
    expect(getByTestId("icon").querySelector("path")).not.toBeNull();
  });
});
