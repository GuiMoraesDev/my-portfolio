"use client";

import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Hamburger } from "./hamburger";

export const Header = ({ className, ...props }: ComponentProps<"header">) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={twMerge(
        "flex items-center justify-center",
        "relative z-10 h-16 w-full py-4",
        className,
      )}
      {...props}
    >
      <nav className="flex w-full items-center justify-start">
        <button onClick={() => setIsOpen((state) => !state)}>
          <Hamburger isOpen={isOpen} />
        </button>
      </nav>
    </header>
  );
};
