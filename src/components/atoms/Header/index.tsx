"use client";

import { Hamburger } from "@/assets/icons";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";

export const Header = ({ className, ...props }: ComponentProps<"header">) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={twMerge(
        "flex items-center justify-center",
        "relative z-10 h-16 py-4 w-full",
        className
      )}
      {...props}
    >
      <nav className="w-full flex items-center justify-start">
        <button onClick={() => setIsOpen((state) => !state)}>
          <Hamburger isOpen={isOpen} />
        </button>
      </nav>
    </header>
  );
};
