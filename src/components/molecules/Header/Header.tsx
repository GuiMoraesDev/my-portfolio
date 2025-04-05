"use client";

import * as Switch from "@radix-ui/react-switch";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Hamburger } from "./icons/hamburger";

import { Icon } from "@/components/atoms/Icon";
import { useHandleClickOutside } from "@/hooks/useDetectClickOutside";
import { printInConsole } from "@/services/console";

export const Wrapper = ({
  className,
  children,
  ...props
}: ComponentProps<"header">) => (
  <header
    className={twMerge(
      "fixed z-20 flex h-20 w-full max-w-7xl items-center justify-center max-[2000px]:px-[10vw]",
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
      {children}
    </nav>
  </header>
);

type LanguageSelectorProps = {
  disabled?: boolean;
  locale?: string;
  handleLanguageChange?: (lng?: string) => void;
};

export const LanguageSelectorElement = ({
  locale,
  handleLanguageChange,
  disabled,
}: LanguageSelectorProps) => (
  <div className="relative inline-flex h-8 w-fit items-center gap-2">
    <button
      disabled={disabled}
      type="button"
      className="disabled:cursor-not-allowed"
      onClick={() => handleLanguageChange?.("pt")}
    >
      <Icon
        icon="FlagBr"
        className="block h-6 w-6 rounded-full"
        title="Brazilian portuguese"
      />
    </button>

    <Switch.Root
      className="relative h-6 w-11 cursor-pointer rounded-full border border-plum-600 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black disabled:cursor-not-allowed data-[state=checked]:bg-plum-900"
      id="Language-selector"
      checked={locale === "en"}
      disabled={disabled}
      onCheckedChange={() => handleLanguageChange?.()}
    >
      <Switch.Thumb
        title="language-selector"
        className="block h-5 w-5 translate-x-0.5 rounded-full bg-plum-100 transition-transform will-change-transform data-[state=checked]:translate-x-[19px]"
      />
    </Switch.Root>

    <button
      disabled={disabled}
      type="button"
      className="disabled:cursor-not-allowed"
      onClick={() => handleLanguageChange?.("en")}
    >
      <Icon
        icon="FlagUs"
        className="block h-6 w-6 rounded-full"
        title="American english"
      />
    </button>
  </div>
);

export const HeaderComponent = (props: ComponentProps<"header">) => {
  useEffect(() => {
    printInConsole();
  }, []);

  const locale = useLocale();
  const router = useRouter();

  const wrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("links");

  useHandleClickOutside({
    ref: wrapperRef,
    callback: () => setIsOpen(false),
  });

  const links = [
    { href: "#presentation", label: t("presentation") },
    { href: "#about-me", label: t("about-me") },
    { href: "#articles", label: t("articles") },
    { href: "#references", label: t("references") },
    { href: "#projects", label: t("projects") },
    { href: "#contact", label: t("contact") },
  ];

  const handleToggleMenu = () => {
    setIsOpen((state) => !state);
  };

  const handleLanguageChange = (lng?: string) => {
    const finalLocale = locale === "en" ? "pt" : "en";
    router.replace(`/${lng ?? finalLocale}${window?.location.hash || ""}`);
  };

  return (
    <Wrapper {...props}>
      <div
        className={twMerge("relative flex items-center justify-between")}
        ref={wrapperRef}
      >
        <button onClick={handleToggleMenu} className="z-20" title="menu">
          <Hamburger isOpen={isOpen} />
        </button>

        <section
          data-is-open={isOpen}
          className={twMerge(
            "absolute bottom-1/2 left-0 flex h-0 min-w-52 flex-col gap-6 transition-[height,pb,pt]",
            "data-[is-open=true]:bottom-auto data-[is-open=true]:top-0 data-[is-open=true]:z-10 data-[is-open=true]:h-auto data-[is-open=true]:pb-3 data-[is-open=true]:pt-16",
            "before:absolute before:left-0 before:top-0 before:h-[calc(100%+2.5rem)] before:w-[calc(100%+2.5rem)] before:origin-top-left before:translate-x-1 before:translate-y-1 before:scale-0 before:rounded-xl before:bg-white/[.98] before:p-5 before:transition before:content-[''] lg:before:h-[calc(100%+1.5rem)]",
            "data-[is-open=true]:before:-translate-x-5 data-[is-open=true]:before:-translate-y-5 data-[is-open=true]:before:scale-100 data-[is-open=true]:before:rounded-md",
          )}
        >
          <ul
            className={twMerge(
              "relative z-20 flex flex-col gap-4 font-medium text-plum-800",
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
          </ul>
        </section>
      </div>

      <LanguageSelectorElement
        locale={locale}
        handleLanguageChange={handleLanguageChange}
      />
    </Wrapper>
  );
};
