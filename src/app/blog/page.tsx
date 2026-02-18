import type { Metadata } from "next";
import Link from "next/link";
import { getNotionPosts } from "@/lib/notion";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = await getNotionPosts();

  return (
    <div className="py-24">
      <div className="mb-16 flex items-end justify-between">
        <div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground">
            Thoughts on design, architecture, and process.
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          No posts yet.
        </p>
      ) : (
        <div className="divide-y divide-border">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block py-8 transition-colors"
            >
              <time className="text-xs uppercase tracking-wider text-muted-foreground">
                {post.date}
              </time>
              <h2 className="mt-2 text-xl font-semibold tracking-tight group-hover:underline">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
