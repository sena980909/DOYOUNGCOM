import { put, list } from "@vercel/blob";
import type { Project } from "./projects";
import { projects as defaultProjects } from "./projects";
import type { Profile } from "./profile";
import { defaultProfile } from "./profile";
import type { BlogPost } from "./blog";
import { defaultPosts } from "./blog";

const PROJECTS_PATH = "data/projects.json";
const PROFILE_PATH = "data/profile.json";
const BLOG_PATH = "data/blog.json";

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
    allowOverwrite: true,
  });
}

export async function getStoredProfile(): Promise<Profile> {
  try {
    const { blobs } = await list({ prefix: "data/profile" });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      if (res.ok) return await res.json();
    }
  } catch {
    // Blob not configured or error — fall back
  }
  return defaultProfile;
}

export async function saveProfile(profile: Profile): Promise<void> {
  await put(PROFILE_PATH, JSON.stringify(profile, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function getStoredPosts(): Promise<BlogPost[]> {
  try {
    const { blobs } = await list({ prefix: "data/blog" });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      if (res.ok) return await res.json();
    }
  } catch {
    // Blob not configured or error — fall back
  }
  return defaultPosts;
}

export async function savePosts(posts: BlogPost[]): Promise<void> {
  await put(BLOG_PATH, JSON.stringify(posts, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
