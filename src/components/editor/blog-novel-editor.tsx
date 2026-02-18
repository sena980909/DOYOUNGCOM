"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  Code,
  Strikethrough,
  List,
  ListOrdered,
  Minus,
  Underline as UnderlineIcon,
  Undo,
  Redo,
} from "lucide-react";

interface BlogNovelEditorProps {
  initialHtml: string;
  onHtmlChange: (html: string) => void;
}

export function BlogNovelEditor({ initialHtml, onHtmlChange }: BlogNovelEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
    ],
    content: initialHtml || "<p></p>",
    onUpdate: ({ editor }) => {
      onHtmlChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-neutral dark:prose-invert max-w-none outline-none min-h-[400px] px-6 py-4",
      },
    },
  });

  if (!editor) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-border text-sm text-muted-foreground">
        Loading editor...
      </div>
    );
  }

  const ToolBtn = ({
    active,
    onClick,
    title,
    children,
  }: {
    active?: boolean;
    onClick: () => void;
    title: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex h-8 w-8 items-center justify-center rounded text-xs transition-colors ${
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-lg border border-border">
      {/* Fixed Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border px-2 py-1.5">
        <ToolBtn
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold (Ctrl+B)"
        >
          <Bold size={14} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic (Ctrl+I)"
        >
          <Italic size={14} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon size={14} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strikethrough"
        >
          <Strikethrough size={14} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
          title="Inline Code"
        >
          <Code size={14} />
        </ToolBtn>

        <div className="mx-1 h-5 w-px bg-border" />

        <ToolBtn
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
        >
          <Heading2 size={14} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title="Heading 3"
        >
          <Heading3 size={14} />
        </ToolBtn>

        <div className="mx-1 h-5 w-px bg-border" />

        <ToolBtn
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          <List size={14} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered List"
        >
          <ListOrdered size={14} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Quote"
        >
          <Quote size={14} />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          title="Code Block"
        >
          <span className="text-[10px] font-mono">{"{}"}</span>
        </ToolBtn>
        <ToolBtn
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Divider"
        >
          <Minus size={14} />
        </ToolBtn>

        <div className="mx-1 h-5 w-px bg-border" />

        <ToolBtn
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo (Ctrl+Z)"
        >
          <Undo size={14} />
        </ToolBtn>
        <ToolBtn
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo (Ctrl+Shift+Z)"
        >
          <Redo size={14} />
        </ToolBtn>
      </div>

      {/* Editor Area */}
      <EditorContent editor={editor} className="min-h-[400px]" />
    </div>
  );
}
