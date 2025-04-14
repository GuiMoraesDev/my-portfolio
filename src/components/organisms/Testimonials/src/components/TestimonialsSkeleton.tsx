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
          "flex w-full flex-1 flex-col items-center justify-start gap-6 rounded-md bg-plum-500/90 p-4 text-white backdrop-blur-sm",
        )}
      >
        <div className="flex w-full items-start justify-start gap-2">
          <span className="aspect-square h-[50px] w-[50px] animate-pulse select-none rounded-full bg-white/80 object-contain" />

          <section className="flex w-full flex-col items-start justify-start gap-1">
            <span className="h-6 w-36 animate-pulse rounded-md bg-white/80" />

            <span className="h-4 w-full max-w-[max(40%,_220px)] animate-pulse rounded-md bg-white/80" />
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
