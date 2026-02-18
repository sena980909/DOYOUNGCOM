import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-[60vh] items-center py-24">
      <div className="grid gap-16 lg:grid-cols-2">
        {/* Photo Placeholder */}
        <div className="aspect-[3/4] bg-muted" />

        {/* Bio */}
        <div className="flex flex-col justify-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight">About</h1>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              DOYOUNGCOM is a design studio focused on architecture,
              spatial design, and visual storytelling.
            </p>
            <p>
              We believe in the power of minimal, purposeful design that
              communicates clearly and resonates deeply.
            </p>
          </div>
          <div className="mt-10 space-y-2 text-sm text-muted-foreground">
            <p>contact@doyoungcom.com</p>
            <p>Seoul, South Korea</p>
          </div>
        </div>
      </div>
    </div>
  );
}
