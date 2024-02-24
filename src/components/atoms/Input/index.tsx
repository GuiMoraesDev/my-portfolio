import { type ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentProps<"input"> & {
  isLoading?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isLoading, className, type, ...props }, ref) => {
    if (isLoading) {
      return (
        <div className="flex h-9 w-full animate-pulse rounded-md border border-gray-300 bg-gray-200" />
      );
    }

    return (
      <input
        type={type}
        className={twMerge(
          "flex h-9 w-full rounded-md border border-gray-300  bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-sm",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-plum-400 ",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
