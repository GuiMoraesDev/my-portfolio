"use client";

import * as Switch from "@radix-ui/react-switch";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { type ComponentProps, useRef, useState, useTransition } from "react";
import { twMerge } from "tailwind-merge";

import { Hamburger } from "./icons/hamburger";

import { Icon } from "@/components/atoms/Icon";
import { useHandleClickOutside } from "@/hooks/useDetectClickOutside";

export const Wrapper = ({
  className,
  children,
  ...props
}: ComponentProps<"header">) => (
  <header
    className={twMerge(
      "fixed z-20 flex h-20 w-full max-w-7xl items-center justify-center max-[2000px]:px-[10vw]",
      "before:absolute before:bottom-0 before:left-1/2 before:h-full before:w-screen before:-translate-x-1/2 before:bg-plum-900 before:opacity-95 before:content-['']",
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
  isLoading?: boolean;
  locale?: string;
  handleLanguageChange?: (lng?: string) => void;
};

export const LanguageSelectorElement = ({
  locale,
  handleLanguageChange,
  disabled,
  isLoading,
}: LanguageSelectorProps) => (
  <>
    {isLoading && (
      <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-gray-600/40 text-2xl">
        {locale === "pt"
          ? "Loading english version..."
          : "Carregando versão português..."}
      </div>
    )}

    <div className="relative inline-flex h-8 w-fit items-center gap-2">
      <button
        disabled={disabled}
        type="button"
        className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 disabled:cursor-not-allowed"
        aria-label="Switch language to Portuguese"
        onClick={() => handleLanguageChange?.("pt")}
      >
        <Icon
          icon="FlagBr"
          className="block h-6 w-6 rounded-full"
          title="Brazilian portuguese"
        />
      </button>

      <Switch.Root
        className="border-plum-600 relative h-6 w-11 cursor-pointer rounded-full border outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-accent-400 disabled:cursor-not-allowed data-[state=checked]:bg-plum-900"
        id="Language-selector"
        aria-label="Toggle language"
        checked={locale === "en"}
        disabled={disabled || isLoading}
        onCheckedChange={() => handleLanguageChange?.()}
      >
        <Switch.Thumb
          title="language-selector"
          className="block h-5 w-5 translate-x-0.5 rounded-full bg-plum-100 transition-transform will-change-transform data-[state=checked]:translate-x-4.75"
        />
      </Switch.Root>

      <button
        disabled={disabled}
        type="button"
        className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 disabled:cursor-not-allowed"
        aria-label="Switch language to English"
        onClick={() => handleLanguageChange?.("en")}
      >
        <Icon
          icon="FlagUs"
          className="block h-6 w-6 rounded-full"
          title="American english"
        />
      </button>
    </div>
  </>
);

export const HeaderComponent = (props: ComponentProps<"header">) => {
  const locale = useLocale();

  const router = useRouter();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("links");

  useHandleClickOutside({
    ref: wrapperRef,
    callback: () => setIsOpen(false),
  });

  const navLinks = [
    { href: "#presentation", label: t("home") },
    { href: "#references", label: t("testimonials") },
    { href: "#articles", label: t("blog") },
  ];

  const handleToggleMenu = () => {
    setIsOpen((state) => !state);
  };

  const handleLanguageChange = (lng?: string) => {
    const finalLocale = locale === "en" ? "pt" : "en";
    startTransition(() => {
      router.replace(`/${lng ?? finalLocale}${window?.location.hash || ""}`);
    });
  };

  return (
    <Wrapper {...props}>
      {/* Mobile hamburger + dropdown */}
      <div
        className={twMerge("relative flex items-center lg:hidden")}
        ref={wrapperRef}
      >
        <button
          onClick={handleToggleMenu}
          type="button"
          className="z-20 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
          title="menu"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-links"
        >
          <Hamburger isOpen={isOpen} />
        </button>

        <section
          data-is-open={isOpen}
          className={twMerge(
            "absolute bottom-1/2 left-0 flex h-0 min-w-52 flex-col gap-6 transition-[height,pb,pt]",
            "data-[is-open=true]:top-0 data-[is-open=true]:bottom-auto data-[is-open=true]:z-10 data-[is-open=true]:h-auto data-[is-open=true]:pt-16 data-[is-open=true]:pb-3",
            "before:absolute before:top-0 before:left-0 before:h-[calc(100%+2.5rem)] before:w-[calc(100%+2.5rem)] before:origin-top-left before:translate-x-1 before:translate-y-1 before:scale-0 before:rounded-xl before:bg-white/98 before:p-5 before:transition before:content-[''] lg:before:h-[calc(100%+1.5rem)]",
            "data-[is-open=true]:before:-translate-x-5 data-[is-open=true]:before:-translate-y-5 data-[is-open=true]:before:scale-100 data-[is-open=true]:before:rounded-md",
          )}
        >
          <ul
            id="mobile-nav-links"
            className={twMerge(
              "text-plum-800 relative z-20 flex flex-col gap-4 font-medium",
              isOpen ? "visible delay-200" : "invisible",
            )}
          >
            {navLinks.map(({ href, label }) => (
              <li
                key={label}
                className="origin-left uppercase transition hover:scale-105 hover:font-semibold"
              >
                <a
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-full rounded-sm leading-snug tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
                >
                  {label}
                </a>
              </li>
            ))}

            <li className="mt-2">
              <a
                href="#footer"
                onClick={() => setIsOpen(false)}
                className="inline-flex rounded-sm border border-accent-400 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-accent-400 transition hover:bg-accent-400 hover:text-plum-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
              >
                {t("get-in-touch")}
              </a>
            </li>
          </ul>
        </section>
      </div>

      {/* Desktop inline nav */}
      <ul className="hidden items-center gap-8 lg:flex">
        {navLinks.map(({ href, label }) => (
          <li key={label}>
            <a
              href={href}
              className="text-sm font-medium uppercase tracking-widest text-text-secondary transition hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right side: GET IN TOUCH (desktop) + language selector */}
      <div className="flex items-center gap-4">
        <a
          href="#footer"
          className="hidden rounded-sm border border-accent-400 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-accent-400 transition hover:bg-accent-400 hover:text-plum-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 lg:inline-flex"
        >
          {t("get-in-touch")}
        </a>

        <LanguageSelectorElement
          locale={locale}
          handleLanguageChange={handleLanguageChange}
          disabled={isPending}
          isLoading={isPending}
        />
      </div>
    </Wrapper>
  );
};
