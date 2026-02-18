"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body style={{ fontFamily: "sans-serif", padding: "2rem", textAlign: "center" }}>
        <h2 style={{ marginBottom: "1rem" }}>Something went wrong</h2>
        <button
          onClick={reset}
          style={{
            padding: "0.5rem 1.5rem",
            border: "1px solid #000",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
