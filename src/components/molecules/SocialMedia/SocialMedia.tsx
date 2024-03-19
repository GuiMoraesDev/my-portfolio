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
  const t = useTranslations("presentation");

  const handleDownloadCv = () => {
    window.open("/GM-Resume.pdf");
  };

  return (
    <div
      className={twMerge(
        "flex flex-wrap items-center justify-evenly gap-x-10 gap-y-4 md:flex-nowrap md:justify-start",
        className,
      )}
      {...props}
    >
      <Link
        href="https://github.com/GuiMoraesDev"
        className="order-2 flex cursor-pointer flex-col items-center justify-center gap-2 md:order-1"
      >
        <Icon icon="Github" size="md" />
        <span className="text-sm tracking-wider text-white">GitHub</span>
      </Link>

      <Link
        href="https://www.linkedin.com/in/guimoraesdev"
        className="order-2 flex cursor-pointer flex-col items-center justify-center gap-2 md:order-1"
      >
        <Icon icon="LinkedIn" size="md" />
        <span className="text-sm tracking-wider text-white">LinkedIn</span>
      </Link>

      <button
        onClick={handleDownloadCv}
        className="group order-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-plum-500/90 p-4 shadow-sm transition hover:shadow-plum-100/80 md:w-auto"
      >
        <DownloadIcon className="h-6 w-6 group-hover:animate-bounce" />
        <span className="text-sm tracking-wider text-white">
          {t("download-resume")}
        </span>
      </button>
    </div>
  );
};
