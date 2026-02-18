import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNotionProjects, getNotionProjectBySlug } from "@/lib/notion";
import {
  projects as fallbackProjects,
  getProject as getFallbackProject,
} from "@/lib/projects";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const notionProject = await getNotionProjectBySlug(slug);
  const project = notionProject ?? getFallbackProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.concept,
    openGraph: project.image
      ? { images: [{ url: project.image, alt: project.title }] }
      : undefined,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const notionProjects = await getNotionProjects();
  const projects =
    notionProjects.length > 0 ? notionProjects : fallbackProjects;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="py-24">
      <Link
        href="/projects"
        className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; All Projects
      </Link>

      <div className="mt-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Project {project.number} — {project.category}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {project.title}
        </h1>
        <p className="mt-2 text-xl text-muted-foreground sm:text-2xl">
          {project.subtitle}
        </p>
      </div>

      <div className="mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Location
          </p>
          <p className="mt-1 text-sm">{project.location}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Category
          </p>
          <p className="mt-1 text-sm">{project.category}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Tools
          </p>
          <p className="mt-1 text-sm">{project.tools.join(", ")}</p>
        </div>
      </div>

      {project.image ? (
        <div className="relative mt-16 aspect-[16/9] overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 1152px) 100vw, 1152px"
            priority
          />
        </div>
      ) : (
        <div className="mt-16 flex aspect-[16/9] items-center justify-center bg-muted">
          <p className="text-sm text-muted-foreground">{project.title}</p>
        </div>
      )}

      <div className="mx-auto mt-20 max-w-3xl">
        {project.problem && (
          <section className="mb-16">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Problem
            </h2>
            <p className="text-lg leading-relaxed">{project.problem}</p>
          </section>
        )}

        <section className="mb-16">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Concept
          </h2>
          <p className="mb-6 text-2xl font-semibold italic sm:text-3xl">
            &ldquo;{project.concept}&rdquo;
          </p>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            {project.conceptDetails.map((detail, i) => (
              <p key={i}>{detail}</p>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            What I Did
          </h2>
          <ul className="space-y-2">
            {project.whatIDid.map((item, i) => (
              <li
                key={i}
                className="flex items-baseline gap-3 text-base text-muted-foreground"
              >
                <span className="text-[10px] text-muted-foreground/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="border border-border px-3 py-1 text-xs tracking-wide"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-20 grid gap-px border-t border-border pt-px sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group flex flex-col gap-1 bg-muted p-8 transition-colors hover:bg-accent"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              &larr; Previous
            </span>
            <span className="text-lg font-bold tracking-tight group-hover:underline">
              {prev.title}
            </span>
            <span className="text-sm text-muted-foreground">
              {prev.subtitle}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col gap-1 bg-muted p-8 text-right transition-colors hover:bg-accent"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Next &rarr;
            </span>
            <span className="text-lg font-bold tracking-tight group-hover:underline">
              {next.title}
            </span>
            <span className="text-sm text-muted-foreground">
              {next.subtitle}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
