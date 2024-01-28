"use client";

import { useRef } from "react";
import "./styles.css";

export const LinkedIn = () => {
  const biggestPathRef = useRef<SVGPathElement | null>(null);
  const iconLength = biggestPathRef.current?.getTotalLength() || 240;

  return (
    <svg
      id="linkedin"
      width="33"
      height="34"
      viewBox="0 0 33 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="black"
        stroke="black"
        strokeWidth="1"
        strokeDasharray={iconLength}
        strokeDashoffset={iconLength}
        d="M0.5 2.88235C0.5 1.84276 1.34276 1 2.38235 1H30.6176C31.6572 1 32.5 1.84276 32.5 2.88235V31.1176C32.5 32.1572 31.6572 33 30.6176 33H2.38235C1.34276 33 0.5 32.1572 0.5 31.1176V2.88235ZM30.6176 2.88235H2.38235V31.1176H30.6176V2.88235Z"
        ref={biggestPathRef}
      />
      <path
        fill="black"
        stroke="black"
        strokeWidth="1"
        strokeDasharray={iconLength}
        strokeDashoffset={iconLength}
        d="M9 11.5C9.82843 11.5 10.5 12.1716 10.5 13L10.5 27C10.5 27.8284 9.82843 28.5 9 28.5C8.17157 28.5 7.5 27.8284 7.5 27L7.5 13C7.5 12.1716 8.17157 11.5 9 11.5Z"
        strokeLinecap="round"
      />
      <path
        fill="black"
        stroke="black"
        strokeWidth="1"
        strokeDasharray={iconLength}
        strokeDashoffset={iconLength}
        d="M9 8C9.55228 8 10 7.55228 10 7C10 6.44772 9.55228 6 9 6C8.44772 6 8 6.44772 8 7C8 7.55228 8.44772 8 9 8ZM9 9C10.1046 9 11 8.10457 11 7C11 5.89543 10.1046 5 9 5C7.89543 5 7 5.89543 7 7C7 8.10457 7.89543 9 9 9Z"
      />
      <path
        fill="black"
        stroke="black"
        strokeWidth="1"
        strokeDasharray={iconLength}
        strokeDashoffset={iconLength}
        d="M20.3678 16.8105C19.7235 16.6303 18.6373 16.6571 16.8465 17.2881C16.7351 17.3274 16.6193 17.3624 16.5 17.3921V27C16.5 27.8284 15.8284 28.5 15 28.5C14.1716 28.5 13.5 27.8284 13.5 27L13.5 13C13.5 12.1716 14.1716 11.5 15 11.5C15.8284 11.5 16.5 12.1716 16.5 13V14.2432C18.2667 13.697 19.8308 13.5452 21.1758 13.9214C22.7792 14.3698 23.7981 15.4863 24.4122 16.856C24.9996 18.1662 25.2533 19.775 25.3764 21.4468C25.5 23.1252 25.5 25.0201 25.5 26.9622V27C25.5 27.8284 24.8284 28.5 24 28.5C23.1716 28.5 22.5 27.8284 22.5 27C22.5 25.0141 22.4992 23.2243 22.3845 21.6671C22.2685 20.0923 22.0439 18.9066 21.6748 18.0834C21.3324 17.3197 20.9165 16.964 20.3678 16.8105Z"
        strokeLinecap="round"
      />
    </svg>
  );
};
