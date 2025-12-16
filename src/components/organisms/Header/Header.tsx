"use client";

import { useTranslations } from "next-intl";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { ThemeSwitcher } from "@/components/molecules/ThemeSwitcher";

export const HeaderComponent = (props: ComponentProps<"header">) => {
  const t = useTranslations("links");

  const links = [
    { href: "#home", label: t("home") },
    { href: "#about-me", label: t("about-me") },
    { href: "#articles", label: t("articles") },
    { href: "#references", label: t("references") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className="fixed z-20 flex min-h-16 w-full max-w-6xl items-center justify-center gap-10"
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
