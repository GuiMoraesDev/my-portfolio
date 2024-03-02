"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { type ComponentProps, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Hamburger } from "./hamburger";
import { useHandleClickOutside } from "./hooks/useDetectClickOutside";

import { Icon } from "@/components/atoms/Icon";
import { Select } from "@/components/atoms/Select";
import { printInConsole } from "@/services/console";

export const Header = ({ className, ...props }: ComponentProps<"header">) => {
  printInConsole();

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

  const handleToggleMenu = () => {
    setIsOpen((state) => !state);
  };

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
          "relative flex h-full w-full items-center justify-between",
        )}
      >
        <div
          className={twMerge("relative flex items-center justify-between")}
          ref={wrapperRef}
        >
          <button onClick={handleToggleMenu} className="z-10">
            <Hamburger isOpen={isOpen} />
          </button>

          <section
            className={twMerge(
              "absolute left-0 top-0 flex min-w-52 flex-col gap-6 pt-16",
              "before:absolute before:left-0 before:top-0 before:h-[calc(100%+2.5rem)] before:w-full before:origin-top-left before:rounded-xl before:bg-white/[.98] before:p-5 before:transition before:content-[''] lg:before:h-[calc(100%+1.5rem)]",
              isOpen
                ? "before:-translate-x-5 before:-translate-y-5 before:scale-100 before:rounded-md"
                : "before:translate-x-1 before:translate-y-1 before:scale-0",
            )}
          >
            <ul
              className={twMerge(
                "relative z-10 flex flex-col gap-4 font-medium text-plum-800",
                isOpen ? "visible delay-200" : "invisible",
              )}
            >
              {links.map(({ href, label }) => (
                <li
                  key={label}
                  className="origin-left uppercase transition hover:scale-105 hover:font-semibold"
                >
                  <a
                    href={href}
                    className="inline-flex h-full leading-snug tracking-wide"
                  >
                    {label}
                  </a>
                </li>
              ))}

              <li className="origin-left uppercase transition hover:scale-105 hover:font-semibold">
                <LanguageSelector className={twMerge("flex  lg:hidden")} />
              </li>
            </ul>
          </section>
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
      className={twMerge(
        "relative z-10 inline-flex w-fit items-center",
        className,
      )}
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
