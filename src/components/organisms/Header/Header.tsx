"use client";

import { useTranslations } from "next-intl";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { ThemeSwitcher } from "@/components/molecules/ThemeSwitcher";

export const HeaderComponent = (props: ComponentProps<"header">) => {
  const t = useTranslations("links");

  const links = [
    { href: "/home", label: t("home") },
    { href: "#notes", label: t("notes") },
    { href: "#working-with-me", label: t("working-with-me") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className={twMerge(
        "sticky top-0 z-20 mb-6 flex min-h-16 w-full max-w-80 items-center justify-between md:mb-16 md:max-w-6xl md:gap-10",
        "before:absolute before:inset-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:border-b before:border-background-accent/3 before:bg-background before:backdrop-blur-md before:transition-colors before:content-['']",
      )}
      {...props}
    >
      <nav className="flex h-full w-full items-center gap-4 md:gap-10">
        {links.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            className="text-xs leading-snug tracking-wide whitespace-nowrap md:text-base"
          >
            {label}
          </a>
        ))}
      </nav>

      <ThemeSwitcher />
    </header>
  );
};
