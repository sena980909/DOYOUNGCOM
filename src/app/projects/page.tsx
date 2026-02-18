import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="py-24">
      <h1 className="mb-4 text-4xl font-bold tracking-tight">Projects</h1>
      <p className="mb-16 text-muted-foreground">
        A curated collection of architectural and design work.
      </p>

      <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden bg-muted"
          >
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground transition-colors group-hover:text-foreground">
              Project {i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
