import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNotionPostBySlug, getNotionPosts } from "@/lib/notion";
import { NotionRenderer } from "@/lib/notion-renderer";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNotionPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNotionPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="py-24">
      <Link
        href="/blog"
        className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; All Posts
      </Link>

      <div className="mt-12">
        <time className="text-xs uppercase tracking-wider text-muted-foreground">
          {post.date}
        </time>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
        )}
      </div>

      <div className="mx-auto mt-16 max-w-3xl border-t border-border pt-12">
        <NotionRenderer blocks={post.blocks} />
      </div>
    </div>
  );
}
