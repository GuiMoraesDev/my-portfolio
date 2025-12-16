import { twMerge } from "tailwind-merge";

export const TestimonialsSkeleton = () => {
  return (
    <div
      className={twMerge(
        "flex w-full flex-1 flex-col items-center justify-start gap-6",
        "col-span-1 row-span-1 flex-1",
      )}
    >
      <div
        className={twMerge(
          "bg-plum-500/90 flex w-full flex-1 flex-col items-center justify-start gap-6 rounded-md p-4 backdrop-blur-sm",
        )}
      >
        <div className="flex w-full items-start justify-start gap-2">
          <span className="aspect-square h-12.5 w-12.5 animate-pulse rounded-full bg-white/80 object-contain select-none" />

          <section className="flex w-full flex-col items-start justify-start gap-1">
            <span className="h-6 w-36 animate-pulse rounded-md bg-white/80" />

            <span className="h-4 w-full max-w-[max(40%,220px)] animate-pulse rounded-md bg-white/80" />
          </section>
        </div>

        <p className="inline-flex h-max w-full flex-col items-start justify-start gap-1">
          <span className="h-4 w-full animate-pulse rounded-md bg-white/80" />
          <span className="h-4 w-full animate-pulse rounded-md bg-white/80" />
          <span className="h-4 w-full animate-pulse rounded-md bg-white/80" />
          <span className="h-4 w-full animate-pulse rounded-md bg-white/80" />
        </p>
      </div>
    </div>
  );
};
