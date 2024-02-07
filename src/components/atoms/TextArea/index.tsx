import { ComponentPropsWithoutRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={twMerge(
        "flex min-h-[20px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-sm placeholder:text-black/25 md:min-h-[60px]",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-plum-400 ",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
