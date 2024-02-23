"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { type ComponentProps, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Hamburger } from "./hamburger";
import { useHandleClickOutside } from "./hooks/useDetectClickOutside";

import { Icon } from "@/components/atoms/Icon";
import { Select } from "@/components/atoms/Select";

export const Header = ({ className, ...props }: ComponentProps<"header">) => {
  const wrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("links");

  useHandleClickOutside({
    ref: wrapperRef,
    callback: () => setIsOpen(false),
  });

  const links = [
    { href: "#home", label: t("home") },
    { href: "#overview", label: t("overview") },
    { href: "#know-how", label: t("know-how") },
    { href: "#about-me", label: t("about-me") },
    { href: "#code", label: t("code") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className={twMerge(
        "fixed z-20 flex h-20 w-full items-center justify-center",
        "before:absolute before:bottom-0 before:left-1/2 before:h-full before:w-[100vw] before:-translate-x-1/2 before:bg-plum-900 before:opacity-95 before:content-['']",
        className,
      )}
      {...props}
    >
      <nav
        className={twMerge(
          "relative flex h-full w-full items-center justify-end",
        )}
      >
        <div
          className={twMerge(
            "absolute left-0 top-0 flex flex-col items-start justify-start p-5",
            isOpen
              ? "min-h-96 min-w-52 rounded-lg bg-white/[.98] shadow-[0_1px_6px_rgba(255,255,255,0.66)] transition-all duration-200 lg:min-h-80"
              : "h-full w-auto",
          )}
          ref={wrapperRef}
        >
          <button
            onClick={() => setIsOpen((state) => !state)}
            className="rounded-full"
          >
            <Hamburger isOpen={isOpen} />
          </button>

          <ul
            className={twMerge(
              "flex w-full min-w-24 flex-col items-start gap-4 self-end overflow-hidden font-medium text-plum-800 transition",
              isOpen
                ? "mt-8 h-full translate-x-0 scale-x-100 delay-200"
                : "h-0 -translate-x-full scale-x-0",
            )}
          >
            {links.map(({ href, label }) => (
              <li
                key={label}
                className="h-full origin-left uppercase transition hover:scale-105 hover:font-semibold"
              >
                <a
                  href={href}
                  className="inline-flex h-full leading-snug tracking-wide"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <LanguageSelector
            className={twMerge(
              "px-2 lg:hidden",
              isOpen
                ? "translate-x-0 scale-x-100 delay-200"
                : "-translate-x-full scale-x-0",
            )}
          />
        </div>

        <LanguageSelector className="hidden lg:flex" />
      </nav>
    </header>
  );
};

const LanguageSelector = ({ className }: ComponentProps<"div">) => {
  const locale = useLocale();
  const router = useRouter();

  const handleLanguageChange = (locale: string) => {
    router.replace(`/${locale}${window?.location.hash || ""}`);
  };

  return (
    <div
      className={twMerge("relative z-10 inline-flex items-center", className)}
    >
      <Select.Root onValueChange={handleLanguageChange} defaultValue={locale}>
        <Select.Trigger className="bg-plum-900 text-white/[.98]">
          <Select.Value />
        </Select.Trigger>

        <Select.Content className="bg-plum-900 text-white/[.98]">
          <Select.Item value="pt" className="cursor-pointer">
            <Icon size="sm" rounded="full" icon="FlagBr" /> PT
          </Select.Item>
          <Select.Item value="en" className="cursor-pointer">
            <Icon size="sm" rounded="full" icon="FlagUs" /> EN
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  );
};
