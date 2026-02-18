"use client";

import { useState, useCallback } from "react";
import {
  EditorRoot,
  EditorContent,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  type JSONContent,
} from "novel";
import { ExcalidrawWrapper } from "./excalidraw-wrapper";
import { MermaidBlock } from "./mermaid-block";

interface NovelEditorProps {
  initialContent?: JSONContent;
  onChange?: (content: JSONContent) => void;
}

const slashCommands = [
  {
    title: "Text",
    description: "Plain text block",
    icon: "Aa",
    command: "paragraph",
  },
  {
    title: "Heading 1",
    description: "Large heading",
    icon: "H1",
    command: "heading1",
  },
  {
    title: "Heading 2",
    description: "Medium heading",
    icon: "H2",
    command: "heading2",
  },
  {
    title: "Heading 3",
    description: "Small heading",
    icon: "H3",
    command: "heading3",
  },
  {
    title: "Bullet List",
    description: "Unordered list",
    icon: "•",
    command: "bulletList",
  },
  {
    title: "Numbered List",
    description: "Ordered list",
    icon: "1.",
    command: "orderedList",
  },
  {
    title: "Quote",
    description: "Block quote",
    icon: "\"",
    command: "blockquote",
  },
  {
    title: "Code",
    description: "Code block",
    icon: "<>",
    command: "codeBlock",
  },
  {
    title: "Divider",
    description: "Horizontal rule",
    icon: "—",
    command: "horizontalRule",
  },
  {
    title: "Sketch",
    description: "Excalidraw drawing canvas",
    icon: "✎",
    command: "sketch",
  },
  {
    title: "Mermaid",
    description: "Mermaid diagram",
    icon: "◇",
    command: "mermaid",
  },
];

export function NovelEditor({ initialContent, onChange }: NovelEditorProps) {
  const [showSketch, setShowSketch] = useState(false);
  const [showMermaid, setShowMermaid] = useState(false);
  const [mermaidCode, setMermaidCode] = useState(
    "graph TD\n    A[Start] --> B[Process]\n    B --> C[End]"
  );

  const handleCommandSelect = useCallback(
    (command: string, editor: any) => {
      switch (command) {
        case "heading1":
          editor.chain().focus().toggleHeading({ level: 1 }).run();
          break;
        case "heading2":
          editor.chain().focus().toggleHeading({ level: 2 }).run();
          break;
        case "heading3":
          editor.chain().focus().toggleHeading({ level: 3 }).run();
          break;
        case "bulletList":
          editor.chain().focus().toggleBulletList().run();
          break;
        case "orderedList":
          editor.chain().focus().toggleOrderedList().run();
          break;
        case "blockquote":
          editor.chain().focus().toggleBlockquote().run();
          break;
        case "codeBlock":
          editor.chain().focus().toggleCodeBlock().run();
          break;
        case "horizontalRule":
          editor.chain().focus().setHorizontalRule().run();
          break;
        case "sketch":
          setShowSketch(true);
          break;
        case "mermaid":
          setShowMermaid(true);
          break;
        default:
          editor.chain().focus().setParagraph().run();
      }
    },
    []
  );

  return (
    <div className="novel-editor">
      <EditorRoot>
        <EditorContent
          initialContent={initialContent}
          onUpdate={({ editor }) => {
            onChange?.(editor.getJSON());
          }}
          extensions={[]}
          className="min-h-[500px] border-none outline-none"
          editorProps={{
            attributes: {
              class: "prose prose-neutral dark:prose-invert max-w-none",
            },
            handleDrop: (view, event) => {
              // Image drag & drop handling
              if (event.dataTransfer?.files?.length) {
                const file = event.dataTransfer.files[0];
                if (file.type.startsWith("image/")) {
                  event.preventDefault();
                  // TODO: Upload to Vercel Blob and insert image
                  const reader = new FileReader();
                  reader.onload = () => {
                    const url = reader.result as string;
                    view.dispatch(
                      view.state.tr.replaceSelectionWith(
                        view.state.schema.nodes.image.create({ src: url })
                      )
                    );
                  };
                  reader.readAsDataURL(file);
                  return true;
                }
              }
              return false;
            },
          }}
        >
          <EditorCommand className="z-50 w-72 rounded-lg border border-border bg-background p-2 shadow-lg">
            <EditorCommandEmpty className="px-2 py-1.5 text-sm text-muted-foreground">
              No results
            </EditorCommandEmpty>
            {slashCommands.map((item) => (
              <EditorCommandItem
                key={item.command}
                value={item.title}
                onCommand={({ editor, range }) => {
                  editor.chain().focus().deleteRange(range).run();
                  handleCommandSelect(item.command, editor);
                }}
                className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-border bg-background text-xs font-medium">
                  {item.icon}
                </span>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommand>
        </EditorContent>
      </EditorRoot>

      {/* Excalidraw Modal */}
      {showSketch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-5xl rounded-lg border border-border bg-background p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium">Sketch (Excalidraw)</h3>
              <button
                onClick={() => setShowSketch(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>
            <ExcalidrawWrapper />
          </div>
        </div>
      )}

      {/* Mermaid Modal */}
      {showMermaid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-lg border border-border bg-background p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium">Mermaid Diagram</h3>
              <button
                onClick={() => setShowMermaid(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <textarea
                value={mermaidCode}
                onChange={(e) => setMermaidCode(e.target.value)}
                className="min-h-[300px] rounded border border-border bg-muted p-4 font-mono text-sm outline-none resize-none"
                placeholder="Enter Mermaid code..."
              />
              <MermaidBlock code={mermaidCode} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
