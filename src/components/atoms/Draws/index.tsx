"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const ReactDraw = () => {
  const [stroke, setStroke] = useState({
    dashArray: 0,
    dashOffset: 0,
  });

  useEffect(() => {
    if (!window || !document) return;

    const reactDrawWrapper = document.querySelector(
      "#react-draw-wrapper",
    ) as SVGGeometryElement;
    const reactDrawPath = document.querySelector(
      "#react-draw-element path",
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

      if (scrollpercent !== 0) {
        reactDrawWrapper.classList.remove("hidden");
      }

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
    <div
      id="react-draw-wrapper"
      className="fixed top-0 hidden h-[100dvh] overflow-hidden"
    >
      <svg
        id="react-draw-element"
        width="452"
        height="1080"
        viewBox="0 0 452 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M389.279 -6C389.279 -6 448.675 90.3634 373.969 154.99C252.961 259.67 283.867 398.774 283.867 398.774C274.631 398.774 262.464 406.232 263.074 418.653C263.65 430.394 271.659 440.711 283.414 440.843C295.291 440.976 303.665 430.518 304.216 418.653C304.796 406.155 292.65 398.818 283.867 398.818C283.867 398.818 316.794 401.447 313.802 388.278C309.773 370.539 261.896 324.932 234.875 318.798C188.237 308.211 245.045 440.843 245.045 440.843C245.045 440.843 289.029 532.989 330.565 516.658C375.255 499.088 308.376 375.66 308.376 375.66L287.574 375.197C287.574 375.197 176.589 366.162 172.006 412.181C167.244 459.999 283.414 464.42 283.414 464.42C283.414 464.42 390.636 468.267 393.434 422.351C396.299 375.343 312.999 376.963 285.263 375.038C285.263 375.038 282.044 375.332 280 375.66C248.196 380.753 229.836 430.534 226 438C222.164 445.466 194.781 491.303 228.866 513.422C265.125 536.953 316.235 445.466 316.235 445.466C316.235 445.466 379.394 355.249 341.66 326.195C301.047 294.924 248.039 365.766 234.875 419.577C229.673 440.843 272.884 528.847 324.093 568.435C460 673.5 473 738 415 794C258.252 945.344 -29 919 8.00034 1110.5"
          stroke="#376E84"
          strokeWidth="8"
          strokeDasharray={stroke?.dashArray}
          strokeDashoffset={stroke?.dashOffset}
        />
      </svg>
    </div>
  );
};

export const DrawContainer = () => {
  return (
    <>
      <ReactDraw />
    </>
  );
};
