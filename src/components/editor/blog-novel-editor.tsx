"use client";

import { useCallback } from "react";
import {
  EditorRoot,
  EditorContent,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorBubble,
  EditorBubbleItem,
  useEditor,
} from "novel";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Strikethrough,
} from "lucide-react";

interface BlogNovelEditorProps {
  initialHtml: string;
  onHtmlChange: (html: string) => void;
}

const slashCommands = [
  { title: "Text", description: "Plain text block", icon: "Aa", command: "paragraph" },
  { title: "Heading 1", description: "Large heading", icon: "H1", command: "heading1" },
  { title: "Heading 2", description: "Medium heading", icon: "H2", command: "heading2" },
  { title: "Heading 3", description: "Small heading", icon: "H3", command: "heading3" },
  { title: "Bullet List", description: "Unordered list", icon: "•", command: "bulletList" },
  { title: "Numbered List", description: "Ordered list", icon: "1.", command: "orderedList" },
  { title: "Quote", description: "Block quote", icon: '"', command: "blockquote" },
  { title: "Code", description: "Code block", icon: "<>", command: "codeBlock" },
  { title: "Divider", description: "Horizontal rule", icon: "—", command: "horizontalRule" },
];

function BubbleMenu() {
  const { editor } = useEditor();
  if (!editor) return null;

  // Novel bundles default extensions but types don't expose them — cast to any for chained commands
  const e = editor as any;
  const items = [
    {
      icon: <Bold size={14} />,
      isActive: e.isActive("bold"),
      action: () => e.chain().focus().toggleBold().run(),
      label: "Bold",
    },
    {
      icon: <Italic size={14} />,
      isActive: e.isActive("italic"),
      action: () => e.chain().focus().toggleItalic().run(),
      label: "Italic",
    },
    {
      icon: <Strikethrough size={14} />,
      isActive: e.isActive("strike"),
      action: () => e.chain().focus().toggleStrike().run(),
      label: "Strikethrough",
    },
    {
      icon: <Code size={14} />,
      isActive: e.isActive("code"),
      action: () => e.chain().focus().toggleCode().run(),
      label: "Code",
    },
    {
      icon: <Heading1 size={14} />,
      isActive: e.isActive("heading", { level: 1 }),
      action: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
      label: "Heading 1",
    },
    {
      icon: <Heading2 size={14} />,
      isActive: e.isActive("heading", { level: 2 }),
      action: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
      label: "Heading 2",
    },
    {
      icon: <Heading3 size={14} />,
      isActive: e.isActive("heading", { level: 3 }),
      action: () => e.chain().focus().toggleHeading({ level: 3 }).run(),
      label: "Heading 3",
    },
    {
      icon: <Quote size={14} />,
      isActive: e.isActive("blockquote"),
      action: () => e.chain().focus().toggleBlockquote().run(),
      label: "Quote",
    },
  ];

  return (
    <EditorBubble className="flex items-center gap-0.5 rounded-lg border border-border bg-background p-1 shadow-lg">
      {items.map((item) => (
        <EditorBubbleItem key={item.label} onSelect={item.action}>
          <button
            className={`flex h-7 w-7 items-center justify-center rounded text-xs transition-colors ${
              item.isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
            title={item.label}
          >
            {item.icon}
          </button>
        </EditorBubbleItem>
      ))}
    </EditorBubble>
  );
}

export function BlogNovelEditor({ initialHtml, onHtmlChange }: BlogNovelEditorProps) {
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
        default:
          editor.chain().focus().setParagraph().run();
      }
    },
    []
  );

  return (
    <div className="novel-editor rounded-lg border border-border">
      <EditorRoot>
        <EditorContent
          onCreate={({ editor }) => {
            if (initialHtml) {
              editor.commands.setContent(initialHtml);
            }
          }}
          onUpdate={({ editor }) => {
            onHtmlChange(editor.getHTML());
          }}
          extensions={[]}
          className="min-h-[400px] px-6 py-4"
          editorProps={{
            attributes: {
              class: "prose prose-neutral dark:prose-invert max-w-none outline-none min-h-[400px]",
            },
          }}
        >
          <BubbleMenu />

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
                className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-border bg-background text-xs font-medium">
                  {item.icon}
                </span>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommand>
        </EditorContent>
      </EditorRoot>
    </div>
  );
}
