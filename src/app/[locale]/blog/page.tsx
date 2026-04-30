import { type Metadata } from "next";
import Link from "next/link";

import { groupPostsByYearMonth } from "@/services/blog";

export const metadata: Metadata = {
  title: "Writing | Guilherme Moraes",
  description:
    "Practical pieces on architecture, tradeoffs, and problems I've run into in real codebases.",
};

export default function BlogPage() {
  const grouped = groupPostsByYearMonth();
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="relative container flex flex-col items-center bg-bg-canvas font-body text-text-primary">
      <div className="flex w-full max-w-480 flex-col gap-16 py-20 max-[2000px]:px-[10vw]">
        <header className="flex flex-col gap-4">
          <Link
            href="/"
            className="w-fit text-sm font-medium tracking-widest text-text-muted uppercase transition hover:text-text-primary"
          >
            ← Home
          </Link>
          <h1 className="font-title text-headline font-bold tracking-tight">
            Writing
          </h1>
          <p className="text-base leading-relaxed text-text-muted">
            Practical pieces on architecture, tradeoffs, and problems I&apos;ve
            run into in real codebases.
          </p>
        </header>

        <div className="flex flex-col gap-16">
          {years.map((year) => {
            const months = Object.keys(grouped[year]);
            return (
              <section key={year}>
                <h2 className="mb-8 font-title text-xl font-bold tracking-tight text-text-muted">
                  {year}
                </h2>

                <div className="flex flex-col gap-10">
                  {months.map((month) => (
                    <div key={month}>
                      <h3 className="mb-4 text-xs font-semibold tracking-widest text-text-muted uppercase">
                        {month}
                      </h3>

                      <ul className="flex flex-col">
                        {grouped[year][month].map((post) => (
                          <li key={post.slug}>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="group flex flex-col gap-1 border-b border-border-subtle py-5 transition-colors hover:border-border-strong md:flex-row md:items-baseline md:justify-between md:gap-8"
                            >
                              <span className="text-base font-medium text-text-primary transition group-hover:text-accent-400">
                                {post.title}
                              </span>
                              <span className="shrink-0 text-xs text-text-muted">
                                {post.readingTime} min read
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
