import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="py-24">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
        Projects
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Selected Work
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted-foreground">
        주거, 문화, 상업, 오피스, 도시설계, 공모전까지 — 다양한 스케일의 건축
        작업을 기록합니다.
      </p>

      <div className="mt-20 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group relative aspect-[4/3] overflow-hidden bg-muted"
          >
            {/* Background image */}
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Overlay content */}
            <div className="relative flex h-full flex-col justify-end p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
                {project.number} — {project.category}
              </p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-white">
                {project.title}
              </h2>
              <p className="mt-1 text-sm text-white/80">
                {project.subtitle}
              </p>
            </div>

            {/* Hover arrow indicator */}
            <div className="absolute right-5 top-5 translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
              <span className="text-sm text-white">&rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
