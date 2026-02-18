import Image from "next/image";

// Renders Notion blocks to React components

function richTextToJsx(richTexts: any[]) {
  if (!richTexts) return null;
  return richTexts.map((text: any, i: number) => {
    let content: React.ReactNode = text.plain_text;
    if (text.annotations.bold)
      content = <strong key={i}>{content}</strong>;
    if (text.annotations.italic)
      content = <em key={i}>{content}</em>;
    if (text.annotations.strikethrough)
      content = <s key={i}>{content}</s>;
    if (text.annotations.code)
      content = (
        <code
          key={i}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
        >
          {content}
        </code>
      );
    if (text.href)
      content = (
        <a
          key={i}
          href={text.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-muted-foreground"
        >
          {content}
        </a>
      );
    return <span key={i}>{content}</span>;
  });
}

function NotionBlock({ block }: { block: any }) {
  const { type } = block;

  switch (type) {
    case "paragraph":
      return (
        <p className="mb-4 leading-relaxed text-muted-foreground">
          {richTextToJsx(block.paragraph.rich_text)}
        </p>
      );

    case "heading_1":
      return (
        <h1 className="mb-4 mt-8 text-3xl font-bold tracking-tight">
          {richTextToJsx(block.heading_1.rich_text)}
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="mb-3 mt-6 text-2xl font-semibold tracking-tight">
          {richTextToJsx(block.heading_2.rich_text)}
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="mb-2 mt-4 text-xl font-semibold">
          {richTextToJsx(block.heading_3.rich_text)}
        </h3>
      );

    case "bulleted_list_item":
      return (
        <li className="mb-1 ml-6 list-disc text-muted-foreground">
          {richTextToJsx(block.bulleted_list_item.rich_text)}
        </li>
      );

    case "numbered_list_item":
      return (
        <li className="mb-1 ml-6 list-decimal text-muted-foreground">
          {richTextToJsx(block.numbered_list_item.rich_text)}
        </li>
      );

    case "quote":
      return (
        <blockquote className="mb-4 border-l-2 border-border pl-4 italic text-muted-foreground">
          {richTextToJsx(block.quote.rich_text)}
        </blockquote>
      );

    case "code":
      return (
        <pre className="mb-4 overflow-x-auto rounded-lg bg-muted p-4">
          <code className="font-mono text-sm">
            {block.code.rich_text.map((t: any) => t.plain_text).join("")}
          </code>
        </pre>
      );

    case "divider":
      return <hr className="my-8 border-border" />;

    case "image": {
      const src =
        block.image.type === "file"
          ? block.image.file.url
          : block.image.external.url;
      const caption = block.image.caption
        ?.map((t: any) => t.plain_text)
        .join("");
      return (
        <figure className="my-6">
          <div className="relative aspect-video overflow-hidden bg-muted">
            <Image
              src={src}
              alt={caption || ""}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          {caption && (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "callout":
      return (
        <div className="mb-4 flex gap-3 rounded-lg bg-muted p-4">
          <span>{block.callout.icon?.emoji ?? ""}</span>
          <div className="text-sm text-muted-foreground">
            {richTextToJsx(block.callout.rich_text)}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export function NotionRenderer({ blocks }: { blocks: any[] }) {
  return (
    <div className="notion-content">
      {blocks.map((block: any) => (
        <NotionBlock key={block.id} block={block} />
      ))}
    </div>
  );
}
