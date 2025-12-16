"use client";

import { DownloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "@/components/atoms/Icon";

export const SocialMediaComponent = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const t = useTranslations("home");

  const handleDownloadCv = () => {
    window.open("/GM-Resume.pdf");
  };

  return (
    <div
      className={twMerge(
        "flex flex-wrap items-center justify-center gap-4 md:flex-nowrap md:justify-start md:gap-8",
        className,
      )}
      {...props}
    >
      <Link
        href="https://github.com/GuiMoraesDev"
        className="flex cursor-pointer flex-col items-center justify-center gap-2 md:order-1"
      >
        <Icon icon="Github" size="md" />
        <span className="text-sm tracking-wider">GitHub</span>
      </Link>

      <Link
        href="https://www.linkedin.com/in/guimoraesdev"
        className="flex cursor-pointer flex-col items-center justify-center gap-2 md:order-1"
      >
        <Icon icon="LinkedIn" size="md" />
        <span className="text-sm tracking-wider">LinkedIn</span>
      </Link>

      <button
        onClick={handleDownloadCv}
        className="group flex cursor-pointer items-center justify-center gap-2 rounded-md bg-background-accent p-4 text-background shadow-xs transition hover:shadow-background-accent/60 md:w-auto md:w-full md:min-w-32"
      >
        <DownloadIcon className="h-6 w-6 group-hover:animate-bounce" />
        <span className="text-sm tracking-wider">{t("my-resume")}</span>
      </button>
    </div>
  );
};
