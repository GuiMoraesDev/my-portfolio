import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

import { type FormProps } from "../../@types";

import { useGeneratedPreview } from "./hooks/useGeneratedPreview";

export const EmailRenderPreview = (props: FormProps) => {
  const t = useTranslations("contact");
  const { __html, state } = useGeneratedPreview(props);

  if (!state.support) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-center text-gray-500">{t("preview.unsupported")}</p>
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        "h-full w-full rounded-md border border-gray-50 bg-gray-50 p-4 ring-2 ring-gray-800 transition-colors duration-300",
        state.awaiting ? "bg-plum-600/80" : "bg-gray-50",
      )}
    >
      {state.awaiting ? (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-center text-gray-500">{t("preview.awaiting")}</p>
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html }} />
      )}
    </div>
  );
};
