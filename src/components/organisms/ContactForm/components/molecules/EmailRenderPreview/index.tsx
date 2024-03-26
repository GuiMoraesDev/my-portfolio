import { twMerge } from "tailwind-merge";

import { type FormProps } from "../../../@types";

import { useGeneratedPreview } from "./hooks/useGeneratedPreview";

export const EmailRenderPreview = (props: FormProps) => {
  const { __html } = useGeneratedPreview(props);

  return (
    <div
      className={twMerge(
        "h-full w-full overflow-y-auto overflow-x-hidden rounded-md bg-gray-50 p-4 transition-colors duration-300",
      )}
    >
      <div dangerouslySetInnerHTML={{ __html }} />
    </div>
  );
};
