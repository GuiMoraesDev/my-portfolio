"use client";

import { useTranslations } from "next-intl";
import { useContext } from "react";

import { TestimonialsContext } from "../provider/TestimonialsProvider";

export const ShowMoreButton = () => {
  const t = useTranslations("references");

  const { showMore, handleToggleShowMore } = useContext(TestimonialsContext);

  return (
    <button
      onClick={handleToggleShowMore}
      className="motion-hover-lift rounded border border-[color:var(--color-border-strong)] bg-transparent px-3 py-2 text-center text-[var(--text-caption)] leading-tight font-medium text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-accent-400)] hover:text-[color:var(--color-text-primary)]"
    >
      {showMore ? t("show-less") : t("show-more")}
    </button>
  );
};

ShowMoreButton.displayName = "ShowMoreButton";
