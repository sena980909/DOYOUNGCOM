"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong</h2>
      <p className="mb-8 text-sm text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="border border-foreground px-6 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
      >
        Try again
      </button>
    </div>
  );
}
