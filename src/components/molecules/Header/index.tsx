"use client";

import { ComponentProps, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Hamburger } from "./hamburger";
import { useHandleClickOutside } from "./hooks/useDetectClickOutside";

export const Header = ({ className, ...props }: ComponentProps<"header">) => {
  const wrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useHandleClickOutside({
    ref: wrapperRef,
    callback: () => setIsOpen(false),
  });

  const links = [
    { href: "#home", label: "Home" },
    { href: "#overview", label: "Overview" },
    { href: "#know-how", label: "Know-how" },
    { href: "#about-me", label: "About me" },
    { href: "#code", label: "Code" },
  ];

  return (
    <header
      className={twMerge(
        "fixed flex items-center justify-center ",
        "z-20 h-14 w-full pb-px",
        "animate-pulse bg-gradient-to-r from-transparent from-5% via-plum-500 via-50% to-transparent",
        className,
      )}
      {...props}
    >
      <nav
        className={twMerge(
          "relative flex h-full w-full items-center justify-start",
          "before:absolute before:bottom-0 before:left-1/2 before:top-0 before:w-[100vw] before:-translate-x-1/2 before:bg-plum-900 before:content-['']",
        )}
      >
        <div
          className={twMerge(
            "absolute left-0 top-1",
            isOpen
              ? "min-h-80 min-w-52 rounded-lg bg-white/[.98] shadow-[0_1px_6px_rgba(255,255,255,0.66)] transition-all duration-200"
              : "h-full w-12",
          )}
          ref={wrapperRef}
        >
          <button
            onClick={() => setIsOpen((state) => !state)}
            className="relative rounded-full p-2 transition-colors hover:bg-white hover:bg-opacity-30"
          >
            <Hamburger isOpen={isOpen} />
          </button>

          <ul
            className={twMerge(
              "flex min-w-24 flex-col items-start gap-4 overflow-hidden px-2 py-5 font-medium text-plum-800 transition delay-200",
              isOpen
                ? "translate-x-0 scale-x-100"
                : "-translate-x-full scale-x-0",
            )}
          >
            {links.map(({ href, label }) => (
              <li
                key={label}
                className="transition hover:scale-105 hover:font-semibold"
              >
                <a href={href} className="inline-flex h-full">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
