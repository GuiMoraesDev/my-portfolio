import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ErrorMessageProps = ComponentProps<"p"> & {
  hasError: boolean;
};
export const ErrorMessage = ({ hasError, ...props }: ErrorMessageProps) => {
  if (!hasError) return null;

  return (
    <p
      className={twMerge(
        "text-xs text-red-600",
        "flex items-center gap-1",
        props.className,
      )}
      {...props}
    />
  );
};
