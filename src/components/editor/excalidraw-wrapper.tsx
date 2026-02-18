"use client";

import { useEffect, useState } from "react";

/**
 * Excalidraw를 동적으로 로드합니다.
 * SSR에서는 렌더링하지 않고, 클라이언트에서만 로드됩니다.
 */
export function ExcalidrawWrapper() {
  const [ExcalidrawComponent, setExcalidrawComponent] = useState<any>(null);

  useEffect(() => {
    import("@excalidraw/excalidraw").then((mod) => {
      setExcalidrawComponent(() => mod.Excalidraw);
    });
  }, []);

  if (!ExcalidrawComponent) {
    return (
      <div className="excalidraw-wrapper flex items-center justify-center text-sm text-muted-foreground">
        Loading sketch canvas...
      </div>
    );
  }

  return (
    <div className="excalidraw-wrapper">
      <ExcalidrawComponent
        theme="light"
        UIOptions={{
          canvasActions: {
            changeViewBackgroundColor: false,
          },
        }}
      />
    </div>
  );
}
