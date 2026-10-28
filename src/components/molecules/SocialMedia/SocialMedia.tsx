import { getTranslations } from "next-intl/server";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "@/components/atoms/Icon";
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_PATH,
} from "@/constants/socialMedia";

const baseLink =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500";

export const SocialMedia = async ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const t = await getTranslations("presentation");

  return (
    <div
      className={twMerge("flex flex-wrap items-center gap-3", className)}
      {...props}
    >
      <a
        href={RESUME_PATH}
        target="_blank"
        rel="noopener noreferrer"
        className={twMerge(
          baseLink,
          "group bg-text-primary px-4 text-bg-canvas hover:bg-white",
        )}
      >
        <Icon
          name="Download"
          size="sm"
          className="group-hover:animate-download"
        />
        {t("my-resume")}
      </a>

      <a
        href={`mailto:${EMAIL}`}
        className={twMerge(
          baseLink,
          "border border-border-strong px-4 text-text-primary hover:border-text-secondary",
        )}
      >
        {t("email-me")}
      </a>

      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className={twMerge(
          baseLink,
          "w-10 text-text-secondary hover:text-text-primary",
        )}
      >
        <Icon name="Github" size="sm" />
      </a>

      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={twMerge(
          baseLink,
          "w-10 text-text-secondary hover:text-text-primary",
        )}
      >
        <Icon name="LinkedIn" size="sm" />
      </a>
    </div>
  );
};
