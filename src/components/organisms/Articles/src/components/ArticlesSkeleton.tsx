export const ArticlesSkeleton = () => (
  <div className="flex w-full flex-col items-start justify-start gap-4">
    <div className="flex h-24 w-full flex-col items-start justify-center gap-4 rounded-md bg-plum-500/90 px-5 md:h-14 md:flex-row md:items-center md:justify-between xl:gap-5">
      <div className="flex w-full items-center justify-start gap-2">
        <span className="h-4 w-4 animate-pulse rounded-md bg-white/80" />
        <span className="h-4 w-1/2 animate-pulse rounded-md bg-white/80" />
      </div>

      <div className="flex items-center justify-start gap-9 md:gap-5">
        <span className="h-4 w-4 animate-pulse rounded-md bg-white/80" />
        <span className="h-4 w-4 animate-pulse rounded-md bg-white/80" />
        <span className="h-4 w-4 animate-pulse rounded-md bg-white/80" />
      </div>
    </div>
  </div>
);
