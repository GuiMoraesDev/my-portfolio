"use client";

import { useEffect, useState } from "react";

export const DrawContainer = () => {
  const [stroke, setStroke] = useState({
    dashOffset: Number.MAX_SAFE_INTEGER,
    dashArray: Number.MAX_SAFE_INTEGER,
  });

  useEffect(() => {
    if (!window || !document) return;

    const reactDrawPath = document.querySelector(
      "#react-draw path",
    ) as SVGGeometryElement;
    const pathLength = reactDrawPath.getTotalLength();

    setStroke((state) => ({
      ...state,
      dashArray: pathLength,
    }));

    const handleScroll = () => {
      const scrollpercent =
        (document.body.scrollTop + document.documentElement.scrollTop) /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight);

      const drawLength = pathLength * scrollpercent;

      setStroke((state) => ({
        ...state,
        dashOffset: pathLength - drawLength,
      }));
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute bottom-0 top-0 h-full overflow-hidden">
      <svg
        id="react-draw"
        width="471"
        height="3483"
        viewBox="0 0 471 3483"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M467.5 -4C467.5 -4 371.5 89 371.5 173C371.5 266.961 528.5 315 383.5 506C278.846 643.854 267.49 817.5 267.49 817.5C257.5 817.5 244.34 825.566 245 839C245.624 851.699 254.286 862.858 267 863C279.846 863.144 288.904 851.834 289.5 839C290.128 825.483 277 818 267.5 818L267 791.713H293.5C293.5 791.713 243.726 737.634 214.5 731C164.055 719.55 225.5 863 225.5 863C225.5 863 273.073 962.663 318 945C366.338 925.996 294 792.5 294 792.5L271.5 792C271.5 792 151.457 782.227 146.5 832C141.349 883.718 267 888.5 267 888.5C267 888.5 382.973 892.661 386 843C389.098 792.158 299 793.91 269 791.828L240 791.314L219 829.5C219 829.5 171.133 917.576 208 941.5C247.219 966.95 302.5 868 302.5 868C302.5 868 370.814 770.424 330 739C286.072 705.178 214.5 840 214.5 840C214.5 840 269 945 311 1001C367.171 1075.9 368.928 1137.02 383.5 1229.5C437.725 1573.62 21.1851 1689.49 5.5 2037.5C-10.7921 2398.98 368.464 2543.2 335 2903.5C312.541 3145.31 90 3486 90 3486"
          stroke="#376E84"
          strokeWidth="8"
          strokeDasharray={stroke.dashArray}
          strokeDashoffset={stroke.dashOffset}
        />
      </svg>
    </div>
  );
};
