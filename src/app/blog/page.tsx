import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getStoredPosts } from "@/lib/storage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = await getStoredPosts();

  return (
    <div className="py-12 sm:py-24">
      <div className="mb-10 sm:mb-16">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Arch-Log
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Blog</h1>
        <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">
          건축과 기술, 그리고 생각의 기록.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          No posts yet.
        </p>
      ) : (
        <div className="grid gap-5 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden border border-border transition-colors hover:border-foreground"
            >
              {post.image && (
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-muted-foreground/50">
                    |
                  </span>
                  <time className="text-[11px] text-muted-foreground">
                    {post.date}
                  </time>
                </div>
                <h2 className="text-base font-bold leading-snug tracking-tight group-hover:underline sm:text-lg">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-muted-foreground/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
