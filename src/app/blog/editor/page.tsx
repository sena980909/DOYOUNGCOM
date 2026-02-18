"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NovelEditor } from "@/components/editor/novel-editor";
import type { JSONContent } from "novel";

function EditorContent() {
  const searchParams = useSearchParams();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [content, setContent] = useState<JSONContent | undefined>(undefined);

  // ?key= 파라미터로 관리자 검증
  useEffect(() => {
    const key = searchParams.get("key");
    if (!key) {
      setChecking(false);
      return;
    }

    fetch(`/api/admin/verify?key=${encodeURIComponent(key)}`)
      .then((res) => res.json())
      .then((data) => {
        setAuthorized(data.valid);
        setChecking(false);
      })
      .catch(() => {
        setChecking(false);
      });
  }, [searchParams]);

  if (checking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Verifying access...</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-2xl font-bold">Access Denied</h1>
        <p className="text-sm text-muted-foreground">
          Editor access requires a valid admin key.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Use <code className="rounded bg-muted px-1.5 py-0.5">?key=YOUR_SECRET</code> to access.
        </p>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Editor</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Type <code className="rounded bg-muted px-1.5 py-0.5 text-xs">/</code> for commands
            &middot; Drag images to upload
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (content) {
                console.log("Saving content:", content);
                alert("Content logged to console (save API not yet connected)");
              }
            }}
            className="border border-foreground px-6 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
          >
            Save
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-border p-6">
        <NovelEditor
          initialContent={content}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
