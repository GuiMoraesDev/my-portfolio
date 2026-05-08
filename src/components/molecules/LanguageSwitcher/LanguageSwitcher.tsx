"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { twMerge } from "tailwind-merge";

import { usePathname, useRouter } from "@/i18n/navigation";

export const LanguageSwitcher = () => {
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
        aria-label="Switch language to Portuguese"
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
