"use client";

import { useTranslations } from "next-intl";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const HowIWorkView = () => {
  const t = useTranslations("about-me.how-i-work");

  return (
    <div className="grid w-full grid-cols-1 gap-px bg-border-subtle md:grid-cols-2 lg:grid-cols-5">
      <BentoCell className="bg-bg-elevated/30 lg:col-span-3">
        <BentoCell.Label>{t("think.label")}</BentoCell.Label>
        <BentoCell.Heading>{t("think.heading")}</BentoCell.Heading>
        <BentoCell.Body>{t("think.body")}</BentoCell.Body>
      </BentoCell>

      <BentoCell className="bg-bg-elevated lg:col-span-2">
        <BentoCell.Label>{t("decide.label")}</BentoCell.Label>
        <BentoCell.Heading>{t("decide.heading")}</BentoCell.Heading>
        <BentoCell.Body>{t("decide.body")}</BentoCell.Body>
      </BentoCell>

      <BentoCell className="bg-plum-500/40 lg:col-span-2">
        <BentoCell.Label>{t("ship.label")}</BentoCell.Label>
        <BentoCell.Heading>{t("ship.heading")}</BentoCell.Heading>
        <BentoCell.Body>{t("ship.body")}</BentoCell.Body>
      </BentoCell>

      <BentoCell className="bg-bg-elevated/60 md:col-span-2 lg:col-span-3">
        <BentoCell.Label>{t("collaborate.label")}</BentoCell.Label>
        <BentoCell.Heading>{t("collaborate.heading")}</BentoCell.Heading>
        <BentoCell.Body>{t("collaborate.body")}</BentoCell.Body>
      </BentoCell>
    </div>
  );
};

type BentoCellHeadingProps = ComponentProps<"h3"> & { size?: "lg" | "md" };

const BentoCell = Object.assign(
  ({ className, ...props }: ComponentProps<"div">) => (
    <div
      className={twMerge("flex flex-col gap-3 p-8 md:p-10", className)}
      {...props}
    />
  ),
  {
    Label: ({ className, ...props }: ComponentProps<"p">) => (
      <p
        className={twMerge(
          "text-xs font-medium tracking-widest text-accent-500 uppercase",
          className,
        )}
        {...props}
      />
    ),
    Heading: ({ size = "md", className, ...props }: BentoCellHeadingProps) => (
      <h3
        className={twMerge(
          "font-title font-bold tracking-tight text-text-primary",
          size === "lg" ? "text-headline" : "text-xl",
          className,
        )}
        {...props}
      />
    ),
    Body: ({ className, ...props }: ComponentProps<"p">) => (
      <p
        className={twMerge(
          "text-body-lg leading-relaxed tracking-wide text-text-secondary",
          className,
        )}
        {...props}
      />
    ),
  },
);
