"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  type ReactNode,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "@/components/atoms/Icon";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => setIsOpen((state) => !state);

  const pathname = usePathname();
  const t = useTranslations("links");

  const NAV_LINKS = useMemo(
    () => [
      { href: "/", label: t("home") },
      { href: "/philosophy", label: t("philosophy") },
    ],
    [t],
  );

  return (
    <header
      className={twMerge(
        "sticky top-0 z-20 container flex h-16 w-full shrink-0 flex-col items-center justify-between gap-10 font-body md:h-20",
        "before:absolute before:top-0 before:left-1/2 before:h-full before:w-screen before:-translate-x-1/2 before:border-b before:border-teal-300/20 before:bg-[#12131A] before:opacity-90 before:content-['']",
      )}
    >
      <nav className="relative flex h-full w-full items-center justify-between">
        <MenuWrapper isOpen={isOpen} onToggleMenu={handleToggleMenu}>
          <ul className="relative flex flex-col gap-x-10 gap-y-6 md:flex-row md:items-center">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;

              return (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={handleToggleMenu}
                    className={twMerge(
                      "text-sm font-medium tracking-widest uppercase transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum-300",
                      isActive
                        ? "border-b border-text-primary pb-0.5 text-text-primary"
                        : "text-text-secondary hover:text-text-primary",
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <section className="relative flex flex-col gap-4 md:flex-row md:items-center">
            <LanguageSwitcher />
          </section>
        </MenuWrapper>
      </nav>
    </header>
  );
};

type MenuWrapperProps = {
  children: ReactNode;
  isOpen: boolean;
  onToggleMenu: VoidFunction;
};

const MenuWrapper = ({ children, isOpen, onToggleMenu }: MenuWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="relative flex items-center md:hidden" ref={wrapperRef}>
        <button
          onClick={onToggleMenu}
          type="button"
          className="z-20 rounded-sm text-text-secondary transition hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum-300"
          title="menu"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-links"
        >
          <Icon name={isOpen ? "Cross" : "HamburgerMenu"} />
        </button>

        <section
          data-is-open={isOpen}
          className={twMerge(
            "invisible absolute top-0 left-0 h-0 overflow-hidden transition-[height,pb,pt,visibility]",
            "data-[is-open=true]:visible data-[is-open=true]:fixed data-[is-open=true]:h-screen data-[is-open=true]:w-screen data-[is-open=true]:px-10 data-[is-open=true]:py-12",
            "before:absolute before:top-0 before:left-0 before:h-screen before:w-screen before:origin-top-left before:scale-0 before:bg-plum-900 before:p-5 before:transition before:content-['']",
            "data-[is-open=true]:before:scale-100",
          )}
        >
          <nav
            data-is-open={isOpen}
            className={twMerge(
              "flex flex-col gap-12",
              "invisible data-[is-open=true]:visible",
            )}
          >
            {children}
          </nav>
        </section>
      </div>

      <nav className="relative hidden w-full items-center justify-between md:flex">
        {children}
      </nav>
    </>
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
    <>
      {isPending && (
        <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-gray-600/40 text-2xl">
          {locale === "pt"
            ? "Loading english version..."
            : "Carregando versão português..."}
        </div>
      )}

      <button
        disabled={isPending}
        type="button"
        aria-label={
          locale === "en"
            ? "Switch language to Portuguese"
            : "Switch language to English"
        }
        onClick={handleLanguageChange}
        className="relative inline-flex h-8 w-fit cursor-pointer items-center gap-1 rounded-sm border border-plum-200 p-1 text-xs font-semibold tracking-widest uppercase"
      >
        <span
          className={twMerge(
            "rounded-xs px-2 py-0.5 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum-300 disabled:cursor-not-allowed",
            locale === "pt"
              ? "bg-plum-100 text-plum-900"
              : "text-text-secondary hover:text-text-primary",
          )}
        >
          PT-BR
        </span>

        <span
          className={twMerge(
            "rounded-xs px-2 py-0.5 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum-300 disabled:cursor-not-allowed",
            locale === "en"
              ? "bg-plum-100 text-plum-900"
              : "text-text-secondary hover:text-text-primary",
          )}
        >
          EN
        </span>
      </button>
    </>
  );
};
