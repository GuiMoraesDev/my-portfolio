import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { useRef } from "react";

import { useHandleClickOutside } from "./useDetectClickOutside";

describe("useHandleClickOutside", () => {
  let div: HTMLDivElement;

  beforeEach(() => {
    div = document.createElement("div");
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  it("calls callback when clicking outside the ref element", () => {
    const callback = jest.fn();

    renderHook(() => {
      const ref = useRef<HTMLElement>(div);
      useHandleClickOutside({ ref, callback });
    });

    act(() => {
      document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not call callback when clicking inside the ref element", () => {
    const callback = jest.fn();

    renderHook(() => {
      const ref = useRef<HTMLElement>(div);
      useHandleClickOutside({ ref, callback });
    });

    act(() => {
      div.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("removes the mousedown listener on unmount", () => {
    const removeSpy = jest.spyOn(document, "removeEventListener");
    const callback = jest.fn();

    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLElement>(div);
      useHandleClickOutside({ ref, callback });
    });

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
  });
});
