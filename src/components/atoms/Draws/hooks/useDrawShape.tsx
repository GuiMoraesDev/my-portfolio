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

    const handleScroll = () => {
      const scrollpercent =
        (document.body.scrollTop + document.documentElement.scrollTop) /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight);

      if (scrollpercent > 0.01) {
        drawWrapper?.classList.remove("hidden");
      }

      const drawLength = pathLength * scrollpercent;

      setStroke((state) => ({
        ...state,
        dashOffset: pathLength - drawLength,
      }));
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathId, wrapperId]);

  return {
    pathId,
    wrapperId,
    stroke,
  };
};
