"use client";

import { useEffect } from "react";

export const ThemeSwitcher = () => {
  useEffect(() => {
    const htmlElement = document.documentElement;

    htmlElement?.classList.toggle(
      "dark",
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
  }, []);

  const handleChangeTheme = () => {
    const htmlElement = document.documentElement;

    const isDarkTheme =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    htmlElement?.classList.toggle("dark", isDarkTheme);

    localStorage.theme = isDarkTheme ? "light" : "dark";
  };

  return (
    <button
      type="button"
      onClick={handleChangeTheme}
      aria-label="Switch theme"
      className="cursor-pointer"
    >
      <BulbIcon />
    </button>
  );
};

const BulbIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.75 17.5C19 16.25 19.625 15.375 20.625 14.375C21.875 13.25 22.5 11.625 22.5 10C22.5 8.01088 21.7098 6.10322 20.3033 4.6967C18.8968 3.29018 16.9891 2.5 15 2.5C13.0109 2.5 11.1032 3.29018 9.6967 4.6967C8.29018 6.10322 7.5 8.01088 7.5 10C7.5 11.25 7.75 12.75 9.375 14.375C10.25 15.25 11 16.25 11.25 17.5"
      className="stroke-black transition-colors duration-300 dark:stroke-gold-light"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <circle
      cx="15"
      cy="10"
      r="3"
      className="fill-black transition-colors duration-300 dark:fill-gold-lighter"
    />

    <path
      d="M11.25 22.5H18.75"
      className="stroke-black dark:stroke-white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M12.5 27.5H17.5"
      className="stroke-black dark:stroke-white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
