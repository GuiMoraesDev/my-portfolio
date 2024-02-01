"use client";

import { useDrawShape } from "../hooks/useDrawShape";

export const ReactLogo = () => {
  const { wrapperId, pathId, stroke } = useDrawShape();

  return (
    <div
      id={wrapperId}
      className="fixed top-0 hidden h-[100dvh] overflow-hidden"
    >
      <svg
        width={492}
        height={1080}
        viewBox="0 0 492 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_974_39)">
          <path
            d="M409.279-6s59.396 96.363-15.31 160.99c-121.008 104.68-90.102 243.784-90.102 243.784-9.236 0-21.403 7.458-20.793 19.879.576 11.741 8.585 22.058 20.34 22.19 11.877.133 20.251-10.325 20.802-22.19.58-12.498-11.566-19.835-20.349-19.835 0 0 32.927 2.629 29.935-10.54-4.029-17.739-51.906-63.346-78.927-69.48-46.638-10.587 10.17 122.045 10.17 122.045s43.984 92.146 85.52 75.815c44.69-17.57-22.189-140.998-22.189-140.998l-20.802-.463s-110.985-9.035-115.568 36.984c-4.762 47.818 111.408 52.239 111.408 52.239s107.222 3.847 110.02-42.069c2.865-47.008-80.435-45.388-108.171-47.313 0 0-3.219.294-5.263.622-31.804 5.093-50.164 54.874-54 62.34-3.836 7.466-31.219 53.303 2.866 75.422 36.259 23.531 87.369-67.956 87.369-67.956s63.159-90.217 25.425-119.271c-40.613-31.271-93.621 39.571-106.785 93.382-5.202 21.266 38.009 109.27 89.218 148.858C480 673.5 493 738 435 794 278.252 945.344-9 919 28 1110.5"
            stroke="#33C5FF"
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={stroke?.dashArray}
            strokeDashoffset={stroke?.dashOffset}
            id={pathId}
          />
        </g>
        <defs>
          <filter
            id="filter0_d_974_39"
            x={0.745117}
            y={-30.0005}
            width={490.869}
            height={1164.5}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation={10} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_974_39"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_974_39"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
