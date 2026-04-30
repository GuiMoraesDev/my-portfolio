import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { twMerge } from "tailwind-merge";

import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";

import { MenuWrapper } from "./src/components/MenuWrapper";

export const Header = async () => {
  const t = await getTranslations("links");

  const navLinks = [
    { href: "#presentation", label: t("home") },
    { href: "/blog", label: t("blog") },
  ];

  return (
    <header
      className={twMerge(
        "sticky top-0 z-20 flex h-20 w-full max-w-480 shrink-0 flex-col items-center justify-between gap-16 font-body max-[2000px]:px-[10vw]",
        "before:absolute before:bottom-0 before:left-1/2 before:h-full before:w-screen before:-translate-x-1/2 before:bg-plum-900 before:opacity-95 before:content-['']",
      )}
    >
      <nav className="relative flex h-full w-full items-center justify-between">
        <MenuWrapper>
          <ul className="relative flex flex-col gap-8 md:flex-row md:items-center">
            {navLinks.map(({ href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-sm font-medium tracking-widest text-text-secondary uppercase transition hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center">
            <Link
              href="#footer"
              className="w-fit rounded-sm border border-accent-400 px-4 py-1.5 text-sm font-semibold tracking-widest text-accent-400 uppercase transition hover:bg-accent-400 hover:text-plum-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
            >
              {t("get-in-touch")}
            </Link>

            <LanguageSwitcher />
          </div>
        </MenuWrapper>
      </nav>
    </header>
  );
};
