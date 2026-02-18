import { Client } from "@notionhq/client";
import type { Project } from "./projects";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const projectsDbId = process.env.NOTION_PROJECTS_DB ?? "";
const blogDbId = process.env.NOTION_BLOG_DB ?? "";

// ─── helpers ───────────────────────────────────────────

function richTextToString(prop: any): string {
  if (!prop?.rich_text) return "";
  return prop.rich_text.map((t: any) => t.plain_text).join("");
}

function titleToString(prop: any): string {
  if (!prop?.title) return "";
  return prop.title.map((t: any) => t.plain_text).join("");
}

function multiSelectToArray(prop: any): string[] {
  if (!prop?.multi_select) return [];
  return prop.multi_select.map((s: any) => s.name);
}

function selectToString(prop: any): string {
  return prop?.select?.name ?? "";
}

function fileUrl(prop: any): string {
  if (!prop?.files?.length) return "";
  const file = prop.files[0];
  if (file.type === "file") return file.file.url;
  if (file.type === "external") return file.external.url;
  return "";
}

function splitLines(text: string): string[] {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

// ─── Projects ──────────────────────────────────────────

export async function getNotionProjects(): Promise<Project[]> {
  if (!projectsDbId) return [];

  const res = await notion.databases.query({
    database_id: projectsDbId,
    filter: { property: "Published", checkbox: { equals: true } },
    sorts: [{ property: "Order", direction: "ascending" }],
  });

  return res.results.map((page: any) => {
    const p = page.properties;
    return {
      slug: richTextToString(p.Slug) || page.id,
      number: richTextToString(p.Number),
      category: selectToString(p.Category),
      title: titleToString(p.Title),
      subtitle: richTextToString(p.Subtitle),
      location: richTextToString(p.Location),
      problem: richTextToString(p.Problem),
      concept: richTextToString(p.Concept),
      conceptDetails: splitLines(richTextToString(p.ConceptDetails)),
      whatIDid: splitLines(richTextToString(p.WhatIDid)),
      tools: multiSelectToArray(p.Tools),
      image: fileUrl(p.Image),
    };
  });
}

export async function getNotionProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  const projects = await getNotionProjects();
  return projects.find((p) => p.slug === slug);
}

// ─── Blog ──────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  pageId: string;
}

export async function getNotionPosts(): Promise<BlogPost[]> {
  if (!blogDbId) return [];

  const res = await notion.databases.query({
    database_id: blogDbId,
    filter: { property: "Published", checkbox: { equals: true } },
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return res.results.map((page: any) => {
    const p = page.properties;
    return {
      slug: richTextToString(p.Slug) || page.id,
      title: titleToString(p.Title),
      excerpt: richTextToString(p.Excerpt),
      date: p.Date?.date?.start ?? "",
      pageId: page.id,
    };
  });
}

export async function getNotionPostBySlug(slug: string) {
  const posts = await getNotionPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  const blocks = await notion.blocks.children.list({
    block_id: post.pageId,
    page_size: 100,
  });

  return { ...post, blocks: blocks.results };
}
