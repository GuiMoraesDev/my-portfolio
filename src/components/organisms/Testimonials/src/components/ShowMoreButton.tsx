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
      className="text-plum-500 rounded-sm bg-white p-3 text-center text-sm leading-tight font-medium"
    >
      {showMore ? t("show-less") : t("show-more")}
    </button>
  );
};

ShowMoreButton.displayName = "ShowMoreButton";
