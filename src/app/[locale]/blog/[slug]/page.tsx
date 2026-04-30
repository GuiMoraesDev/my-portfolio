import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllPosts, getPostBySlug } from "@/services/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Guilherme Moraes`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const formatted = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="relative container flex flex-col items-center bg-bg-canvas font-body text-text-primary">
      <article className="flex w-full max-w-2xl flex-col gap-12 py-20 max-[2000px]:px-[10vw]">
        <header className="flex flex-col gap-6">
          <Link
            href="/blog"
            className="w-fit text-sm font-medium tracking-widest text-text-muted uppercase transition hover:text-text-primary"
          >
            ← Writing
          </Link>

          <div className="flex flex-col gap-3">
            <h1 className="font-title text-headline leading-tight font-bold tracking-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-text-muted">
              <time dateTime={post.date}>{formatted}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </header>

        <div
          className="prose-blog flex flex-col gap-6 text-base leading-relaxed text-text-secondary"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
