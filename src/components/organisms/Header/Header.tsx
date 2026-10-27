"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState, useTransition } from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "@/components/atoms/Icon";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const t = useTranslations("links");

  const NAV_LINKS = useMemo(
    () => [
      { href: "/", label: t("home") },
      { href: "#contact", label: t("contact") },
    ],
    [t],
  );

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      data-testid="header"
      className="sticky top-0 z-20 w-full border-b border-border-subtle bg-bg-canvas/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 md:h-16 md:px-8">
        <Link
          href="/"
          onClick={closeMenu}
          className={twMerge(
            "rounded-sm font-mono text-sm font-medium tracking-tight text-text-primary",
            focusRing,
          )}
        >
          guimoraes<span className="text-accent-500">.dev</span>
        </Link>

        <button
          onClick={() => setIsOpen((state) => !state)}
          type="button"
          data-testid="menu-toggle"
          className={twMerge(
            "rounded-sm text-text-secondary transition hover:text-text-primary md:hidden",
            focusRing,
          )}
          title="menu"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="nav-links"
        >
          <Icon name={isOpen ? "Cross" : "HamburgerMenu"} size="sm" />
        </button>

        <nav
          id="nav-links"
          data-is-open={isOpen}
          className={twMerge(
            "max-md:absolute max-md:top-full max-md:left-0 max-md:hidden max-md:w-full max-md:border-b max-md:border-border-subtle max-md:bg-bg-canvas max-md:px-4 max-md:py-6",
            "max-md:data-[is-open=true]:block",
          )}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
            <ul className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname === href;

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={closeMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={twMerge(
                        "rounded-sm text-sm transition",
                        focusRing,
                        isActive
                          ? "text-text-primary"
                          : "text-text-secondary hover:text-text-primary",
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
};

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = () => {
    const finalLocale = locale === "en" ? "pt" : "en";

    startTransition(() => {
      router.replace(pathname, { locale: finalLocale });
    });
  };

  return (
    <button
      disabled={isPending}
      type="button"
      data-testid="language-switcher"
      aria-label={
        locale === "en"
          ? "Switch language to Portuguese"
          : "Switch language to English"
      }
      onClick={handleLanguageChange}
      className={twMerge(
        "inline-flex h-7 w-fit cursor-pointer items-center rounded-md border border-border-subtle p-0.5 font-mono text-[11px] tracking-wide uppercase transition disabled:cursor-wait disabled:opacity-60",
        focusRing,
      )}
    >
      {(["pt", "en"] as const).map((option) => (
        <span
          key={option}
          className={twMerge(
            "rounded-sm px-2 py-0.5 transition",
            locale === option
              ? "bg-text-primary text-bg-canvas"
              : "text-text-muted hover:text-text-primary",
          )}
        >
          {option === "pt" ? "PT-BR" : "EN"}
        </span>
      ))}
    </button>
  );
};
