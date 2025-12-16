"use client";

import { useTranslations } from "next-intl";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { ThemeSwitcher } from "@/components/molecules/ThemeSwitcher";

export const HeaderComponent = (props: ComponentProps<"header">) => {
  const t = useTranslations("links");

  const links = [
    { href: "#home", label: t("home") },
    { href: "#notes", label: t("notes") },
    { href: "#working-with-me", label: t("working-with-me") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className="sticky top-0 z-20 mb-16 flex min-h-16 w-full max-w-6xl items-center justify-center gap-10 border-b border-background-accent/3 bg-background transition-colors"
      {...props}
    >
      <nav
        className={twMerge("relative flex h-full w-full items-center gap-10")}
      >
        {links.map(({ href, label }) => (
          <a key={label} href={href} className="leading-snug tracking-wide">
            {label}
          </a>
        ))}
      </nav>

      <ThemeSwitcher />
    </header>
  );
};
