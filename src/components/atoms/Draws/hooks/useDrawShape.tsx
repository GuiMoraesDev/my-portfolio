"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

type Stroke = { dashArray: number; dashOffset: number };

export function useDrawShape() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGGeometryElement | null>(null);

  const pathLengthRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [stroke, setStroke] = useState<Stroke>({ dashArray: 0, dashOffset: 0 });

  const compute = useCallback(() => {
    const wrapper = wrapperRef.current;
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    pathLengthRef.current = length;

    // Show wrapper if needed
    const maxScroll =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const scrollPercent =
      maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;

    if (wrapper && scrollPercent > 0.01) wrapper.classList.remove("hidden");

    const next: Stroke = {
      dashArray: length,
      dashOffset: length - length * scrollPercent,
    };

    setStroke((prev) =>
      prev.dashArray === next.dashArray && prev.dashOffset === next.dashOffset
        ? prev
        : next,
    );
  }, []);

  useLayoutEffect(() => {
    // Initial measure + paint
    compute();

    const onScroll = () => {
      if (rafRef.current != null) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        compute();
      });
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", compute);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [compute]);

  return { wrapperRef, pathRef, stroke };
}
