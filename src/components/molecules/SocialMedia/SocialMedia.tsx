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
        className="motion-hover-lift order-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum-300 md:order-1"
      >
        <Icon
          name="Github"
          className="transition-transform duration-300 hover:scale-110"
        />
        <span className="text-sm tracking-wider text-white">GitHub</span>
      </Link>

      <Link
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="motion-hover-lift order-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum-300 md:order-1"
      >
        <Icon
          name="LinkedIn"
          className="transition-transform duration-300 hover:scale-110"
        />
        <span className="text-sm tracking-wider text-white">LinkedIn</span>
      </Link>

      <Link
        href="/GM-Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={twMerge(
          "motion-hover-lift group order-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md p-4 transition-colors duration-200 hover:bg-radial focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum-300 md:w-auto",
          "border-2 border-plum-500/90 from-plum-700/40 to-plum-700 transition-colors duration-300",
        )}
      >
        <Icon name="Download" className="group-hover:animate-download" />
        <span className="text-sm tracking-wider whitespace-nowrap text-white">
          {t("my-resume")}
        </span>
      </Link>
    </div>
  );
};
