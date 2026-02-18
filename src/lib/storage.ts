import { put, list } from "@vercel/blob";
import type { Project } from "./projects";
import { projects as defaultProjects } from "./projects";

const PROJECTS_PATH = "data/projects.json";

export async function getStoredProjects(): Promise<Project[]> {
  try {
    const { blobs } = await list({ prefix: "data/projects" });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      if (res.ok) return await res.json();
    }
  } catch {
    // Blob not configured or error — fall back
  }
  return defaultProjects;
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await put(PROJECTS_PATH, JSON.stringify(projects, null, 2), {
    access: "public",
    addRandomSuffix: false,
  });
}
