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
      className="motion-hover-lift rounded border border-border-strong bg-transparent px-3 py-2 text-center leading-tight font-medium text-sm text-text-secondary hover:border-accent-400 hover:text-text-primary"
    >
      {showMore ? t("show-less") : t("show-more")}
    </button>
  );
};

ShowMoreButton.displayName = "ShowMoreButton";
