import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section — David Chipperfield inspired full-viewport centered */}
      <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl">
          DOYOUNGCOM
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Architecture, Design & Visual Storytelling
        </p>
        <div className="mt-10 flex gap-6">
          <Link
            href="/projects"
            className="border border-foreground px-8 py-3 text-sm font-medium tracking-wide transition-colors hover:bg-foreground hover:text-background"
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </div>
      </section>

      {/* Featured Grid — Chipperfield-style image grid */}
      <section className="pb-24">
        <h2 className="mb-12 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Selected Work
        </h2>
        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Link
              key={i}
              href={`/projects/${i}`}
              className="group relative aspect-[4/3] overflow-hidden bg-muted"
            >
              {/* Placeholder — replace with actual project images */}
              <div className="flex h-full items-center justify-center text-muted-foreground transition-colors group-hover:text-foreground">
                <span className="text-sm tracking-wide">Project {i}</span>
              </div>
              <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/5" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
