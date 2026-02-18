"use client";

import { useEffect, useRef, useId } from "react";

interface MermaidBlockProps {
  code: string;
}

export function MermaidBlock({ code }: MermaidBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId().replace(/:/g, "-");

  useEffect(() => {
    if (!containerRef.current || !code.trim()) return;

    let cancelled = false;

    import("mermaid").then((mermaid) => {
      if (cancelled) return;

      mermaid.default.initialize({
        startOnLoad: false,
        theme: "neutral",
        fontFamily: "var(--font-sans)",
      });

      mermaid.default
        .render(`mermaid-${uniqueId}`, code)
        .then(({ svg }) => {
          if (!cancelled && containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        })
        .catch(() => {
          if (!cancelled && containerRef.current) {
            containerRef.current.innerHTML =
              '<p class="text-sm text-red-500">Invalid Mermaid syntax</p>';
          }
        });
    });

    return () => {
      cancelled = true;
    };
  }, [code, uniqueId]);

  return <div ref={containerRef} className="mermaid-block" />;
}
