import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoredPosts } from "@/lib/storage";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getStoredPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.image
      ? { images: [{ url: post.image, alt: post.title }] }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const posts = await getStoredPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="py-12 sm:py-24">
      <Link
        href="/blog"
        className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; All Posts
      </Link>

      <div className="mt-6 sm:mt-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {post.category}
        </p>
        <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground sm:mt-4 sm:gap-4 sm:text-sm">
          <time>{post.date}</time>
          <span>|</span>
          <span>Editor : DOYOUNGCOM</span>
        </div>
      </div>

      {post.image && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg bg-muted sm:mt-12">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1152px) 100vw, 1152px"
            priority
          />
        </div>
      )}

      <div
        className="blog-content mx-auto mt-10 max-w-3xl sm:mt-16"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.tags.length > 0 && (
        <div className="mx-auto mt-10 max-w-3xl border-t border-border pt-6 sm:mt-16 sm:pt-8">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border border-border px-2.5 py-1 text-[11px] tracking-wide sm:px-3 sm:text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto mt-10 max-w-3xl border-t border-border pt-6 text-center sm:mt-16 sm:pt-8">
        <Link
          href="/projects"
          className="inline-block border border-foreground px-6 py-2.5 text-xs font-medium tracking-wide transition-colors hover:bg-foreground hover:text-background sm:px-8 sm:py-3 sm:text-sm"
        >
          View Projects &rarr;
        </Link>
      </div>
    </article>
  );
}
