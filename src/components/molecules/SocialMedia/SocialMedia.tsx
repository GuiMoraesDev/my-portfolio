import { DownloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "@/components/atoms/Icon";
import { GITHUB_URL, LINKEDIN_URL } from "@/constants/socialMedia";

export const SocialMedia = async ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const t = await getTranslations("presentation");

  return (
    <div
      className={twMerge("flex items-center justify-evenly gap-6", className)}
      {...props}
    >
      <Link
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="motion-hover-lift order-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 md:order-1"
      >
        <Icon name="Github" size="md" />
        <span className="text-sm tracking-wider text-white">GitHub</span>
      </Link>

      <Link
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="motion-hover-lift order-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 md:order-1"
      >
        <Icon name="LinkedIn" size="md" />
        <span className="text-sm tracking-wider text-white">LinkedIn</span>
      </Link>

      <Link
        href="/GM-Resume.pdf"
        target="_blank"
        className="motion-hover-lift group order-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-plum-500/90 p-4 shadow-sm transition-colors duration-200 hover:bg-plum-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 md:w-auto"
      >
        <DownloadIcon className="h-6 w-6" />
        <span className="text-sm tracking-wider whitespace-nowrap text-white">
          {t("my-resume")}
        </span>
      </Link>
    </div>
  );
};
