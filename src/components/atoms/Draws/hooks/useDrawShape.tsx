"use client";

import { useEffect, useId, useState } from "react";

export const useDrawShape = () => {
  const pathId = useId();
  const wrapperId = useId();

  const [stroke, setStroke] = useState({
    dashArray: 0,
    dashOffset: 0,
  });

  useEffect(() => {
    if (!window || !document) return;

    const drawWrapper = document.getElementById(wrapperId);

    const drawPath = document.getElementById(
      pathId,
    ) as unknown as SVGGeometryElement;

    const pathLength = drawPath?.getTotalLength() || 0;

    setStroke((state) => ({
      ...state,
      dashArray: pathLength,
    }));

    const paintShape = () => {
      const scrollpercent = Math.min(
        (document.body.scrollTop + document.documentElement.scrollTop) /
          (document.documentElement.scrollHeight -
            document.documentElement.clientHeight),
        1,
      );

      if (scrollpercent > 0.01) {
        drawWrapper?.classList.remove("hidden");
      }

      const drawLength = pathLength * scrollpercent;

      setStroke((state) => ({
        ...state,
        dashOffset: pathLength - drawLength,
      }));
    };

    window.addEventListener("scroll", paintShape);
    paintShape();

    return () => window.removeEventListener("scroll", paintShape);
  }, [pathId, wrapperId]);

  return {
    pathId,
    wrapperId,
    stroke,
  };
};
