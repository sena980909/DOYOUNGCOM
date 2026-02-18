"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import type { Project } from "@/lib/projects";
import type { Profile, SkillCategory, HistoryItem } from "@/lib/profile";
import type { BlogPost } from "@/lib/blog";

const BlogNovelEditor = dynamic(
  () => import("@/components/editor/blog-novel-editor").then((m) => m.BlogNovelEditor),
  { ssr: false, loading: () => <div className="flex min-h-[400px] items-center justify-center border border-border rounded-lg text-sm text-muted-foreground">Loading editor...</div> }
);

type EditingProject = Project & { _new?: boolean };
type EditingPost = BlogPost & { _new?: boolean };
type Tab = "projects" | "profile" | "blog";

export default function EditPage() {
  const { key } = useParams<{ key: string }>();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>("projects");

  // Verify key
  useEffect(() => {
    fetch(`/api/admin/verify?key=${encodeURIComponent(key)}`)
      .then((r) => r.json())
      .then((d) => {
        setAuthorized(d.valid);
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [key]);

  if (checking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Verifying...</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Access denied.</p>
      </div>
    );
  }

  return (
    <div className="py-16">
      {/* Tab Navigation */}
      <div className="mb-8 flex gap-1 border-b border-border">
        <TabButton active={tab === "projects"} onClick={() => setTab("projects")}>
          Projects
        </TabButton>
        <TabButton active={tab === "profile"} onClick={() => setTab("profile")}>
          Profile
        </TabButton>
        <TabButton active={tab === "blog"} onClick={() => setTab("blog")}>
          Blog
        </TabButton>
      </div>

      {tab === "projects" ? (
        <ProjectsEditor adminKey={key} />
      ) : tab === "profile" ? (
        <ProfileEditor adminKey={key} />
      ) : (
        <BlogEditor adminKey={key} />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Tab Button
   ═══════════════════════════════════════════ */

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-sm font-medium transition-colors ${
        active
          ? "border-b-2 border-foreground text-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════
   PROJECTS EDITOR (기존 코드 그대로)
   ═══════════════════════════════════════════ */

function ProjectsEditor({ adminKey }: { adminKey: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<EditingProject | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects);
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(projects),
      });
      if (res.ok) {
        setMessage("Saved!");
        setTimeout(() => setMessage(""), 2000);
      } else {
        setMessage("Save failed");
      }
    } catch {
      setMessage("Save failed");
    }
    setSaving(false);
  }

  function addProject() {
    const num = String(projects.length + 1).padStart(2, "0");
    setEditing({
      slug: "",
      number: num,
      category: "",
      title: "",
      subtitle: "",
      location: "",
      problem: "",
      concept: "",
      conceptDetails: [],
      whatIDid: [],
      tools: [],
      image: "",
      _new: true,
    });
  }

  function saveEdit() {
    if (!editing) return;
    const { _new, ...project } = editing;
    if (_new) {
      setProjects([...projects, project]);
    } else {
      setProjects(projects.map((p) => (p.slug === project.slug ? project : p)));
    }
    setEditing(null);
  }

  function deleteProject(slug: string) {
    if (confirm("Delete this project?")) {
      setProjects(projects.filter((p) => p.slug !== slug));
    }
  }

  function moveProject(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;
    const arr = [...projects];
    [arr[index], arr[target]] = [arr[target], arr[index]];
    setProjects(arr);
  }

  // ─── Editing Form ────────────────────────────
  if (editing) {
    return (
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => setEditing(null)}
          className="mb-8 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
        >
          &larr; Back
        </button>
        <h2 className="mb-8 text-2xl font-bold">
          {editing._new ? "New Project" : `Edit: ${editing.title}`}
        </h2>

        <div className="space-y-4">
          <Field label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
          <Field label="Slug (URL path)" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} />
          <Field label="Subtitle" value={editing.subtitle} onChange={(v) => setEditing({ ...editing, subtitle: v })} />
          <Field label="Number (01, 02...)" value={editing.number} onChange={(v) => setEditing({ ...editing, number: v })} />
          <Field label="Category" value={editing.category} onChange={(v) => setEditing({ ...editing, category: v })} />
          <Field label="Location" value={editing.location} onChange={(v) => setEditing({ ...editing, location: v })} />
          <Field label="Image URL" value={editing.image} onChange={(v) => setEditing({ ...editing, image: v })} />
          <FieldArea label="Problem" value={editing.problem} onChange={(v) => setEditing({ ...editing, problem: v })} />
          <Field label="Concept (one line)" value={editing.concept} onChange={(v) => setEditing({ ...editing, concept: v })} />
          <FieldArea
            label="Concept Details (one per line)"
            value={editing.conceptDetails.join("\n")}
            onChange={(v) => setEditing({ ...editing, conceptDetails: v.split("\n").filter(Boolean) })}
          />
          <FieldArea
            label="What I Did (one per line)"
            value={editing.whatIDid.join("\n")}
            onChange={(v) => setEditing({ ...editing, whatIDid: v.split("\n").filter(Boolean) })}
          />
          <Field
            label="Tools (comma separated)"
            value={editing.tools.join(", ")}
            onChange={(v) => setEditing({ ...editing, tools: v.split(",").map((s) => s.trim()).filter(Boolean) })}
          />
        </div>

        <button
          onClick={saveEdit}
          className="mt-8 border border-foreground px-8 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
        >
          {editing._new ? "Add Project" : "Update Project"}
        </button>
      </div>
    );
  }

  // ─── Project List ────────────────────────────
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Projects</h2>
          <p className="mt-1 text-sm text-muted-foreground">{projects.length} projects</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addProject}
            className="border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
          >
            + Add
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="border border-foreground px-6 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save All"}
          </button>
        </div>
      </div>

      {message && <p className="mb-4 text-sm font-medium text-foreground">{message}</p>}

      <div className="divide-y divide-border border-y border-border">
        {projects.map((project, i) => (
          <div key={project.slug || i} className="flex items-center gap-4 py-4">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => moveProject(i, -1)}
                disabled={i === 0}
                className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-20"
              >
                ▲
              </button>
              <button
                onClick={() => moveProject(i, 1)}
                disabled={i === projects.length - 1}
                className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-20"
              >
                ▼
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">
                {project.number} — {project.category}
              </p>
              <p className="font-medium">{project.title}</p>
              <p className="text-sm text-muted-foreground">{project.subtitle}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditing({ ...project })}
                className="px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProject(project.slug)}
                className="px-3 py-1 text-xs text-red-500 hover:text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Remember to click &quot;Save All&quot; after making changes.
      </p>
    </>
  );
}

/* ═══════════════════════════════════════════
   PROFILE EDITOR
   ═══════════════════════════════════════════ */

function ProfileEditor({ adminKey }: { adminKey: string }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then(setProfile);
  }, []);

  if (!profile) {
    return <p className="text-sm text-muted-foreground">Loading profile...</p>;
  }

  function update(patch: Partial<Profile>) {
    setProfile((p) => (p ? { ...p, ...patch } : p));
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        setMessage("Saved!");
        setTimeout(() => setMessage(""), 2000);
      } else {
        setMessage("Save failed");
      }
    } catch {
      setMessage("Save failed");
    }
    setSaving(false);
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/profile/upload", {
        method: "POST",
        headers: { "x-admin-key": adminKey },
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        update({ photo: data.url });
        setMessage("Photo uploaded! Remember to Save.");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch {
      setMessage("Upload failed");
    }
    setUploading(false);
  }

  function updateHistory(index: number, patch: Partial<HistoryItem>) {
    const history = [...profile!.history];
    history[index] = { ...history[index], ...patch };
    update({ history });
  }

  function addHistory() {
    update({ history: [...profile!.history, { label: "", description: "" }] });
  }

  function removeHistory(index: number) {
    update({ history: profile!.history.filter((_, i) => i !== index) });
  }

  function updateSkillCategory(catIndex: number, patch: Partial<SkillCategory>) {
    const skills = [...profile!.skills];
    skills[catIndex] = { ...skills[catIndex], ...patch };
    update({ skills });
  }

  function updateSkillItem(catIndex: number, itemIndex: number, name: string, level: number) {
    const skills = [...profile!.skills];
    const items = [...skills[catIndex].items];
    items[itemIndex] = { name, level };
    skills[catIndex] = { ...skills[catIndex], items };
    update({ skills });
  }

  function addSkillItem(catIndex: number) {
    const skills = [...profile!.skills];
    skills[catIndex] = {
      ...skills[catIndex],
      items: [...skills[catIndex].items, { name: "", level: 3 }],
    };
    update({ skills });
  }

  function removeSkillItem(catIndex: number, itemIndex: number) {
    const skills = [...profile!.skills];
    skills[catIndex] = {
      ...skills[catIndex],
      items: skills[catIndex].items.filter((_, i) => i !== itemIndex),
    };
    update({ skills });
  }

  function addSkillCategory() {
    update({ skills: [...profile!.skills, { category: "", items: [{ name: "", level: 3 }] }] });
  }

  function removeSkillCategory(catIndex: number) {
    update({ skills: profile!.skills.filter((_, i) => i !== catIndex) });
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Edit Profile</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="border border-foreground px-6 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {message && <p className="mb-4 text-sm font-medium text-foreground">{message}</p>}

      <div className="mx-auto max-w-2xl space-y-10">
        {/* Photo */}
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Profile Photo
          </label>
          <div className="flex items-center gap-4">
            {profile.photo && (
              <img
                src={profile.photo}
                alt="Profile"
                className="h-24 w-24 object-cover"
              />
            )}
            <div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="border border-border px-4 py-2 text-sm transition-colors hover:bg-muted disabled:opacity-50"
              >
                {uploading ? "Uploading..." : profile.photo ? "Change Photo" : "Upload Photo"}
              </button>
              {profile.photo && (
                <button
                  onClick={() => update({ photo: "" })}
                  className="ml-2 px-3 py-2 text-xs text-red-500 hover:text-red-400"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.15em]">Basic Info</h3>
          <div className="space-y-4">
            <Field label="Name" value={profile.name} onChange={(v) => update({ name: v })} />
            <Field label="Name (English)" value={profile.nameEn} onChange={(v) => update({ nameEn: v })} />
            <Field label="Tagline" value={profile.tagline} onChange={(v) => update({ tagline: v })} />
            <Field label="Birth" value={profile.birth} onChange={(v) => update({ birth: v })} />
            <Field label="Education" value={profile.education} onChange={(v) => update({ education: v })} />
            <Field label="Contact (Email)" value={profile.contact} onChange={(v) => update({ contact: v })} />
            <Field label="Instagram" value={profile.instagram} onChange={(v) => update({ instagram: v })} />
            <Field label="Instagram URL" value={profile.instagramUrl} onChange={(v) => update({ instagramUrl: v })} />
          </div>
        </div>

        {/* About Me */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.15em]">About Me</h3>
          <div className="space-y-4">
            <FieldArea label="About Me (줄바꿈으로 문단 구분)" value={profile.aboutMe} onChange={(v) => update({ aboutMe: v })} />
            <Field label="DO — Description" value={profile.doDescription} onChange={(v) => update({ doDescription: v })} />
            <Field label="YOUNG — Description" value={profile.youngDescription} onChange={(v) => update({ youngDescription: v })} />
            <Field label="COM — Description" value={profile.comDescription} onChange={(v) => update({ comDescription: v })} />
          </div>
        </div>

        {/* History */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em]">Education &amp; History</h3>
            <button onClick={addHistory} className="text-xs text-muted-foreground hover:text-foreground">
              + Add
            </button>
          </div>
          <div className="space-y-3">
            {profile.history.map((item, i) => (
              <div key={i} className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={item.label}
                    onChange={(e) => updateHistory(i, { label: e.target.value })}
                    className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={item.description}
                    onChange={(e) => updateHistory(i, { description: e.target.value })}
                    className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
                  />
                </div>
                <button
                  onClick={() => removeHistory(i)}
                  className="self-start px-2 py-2 text-xs text-red-500 hover:text-red-400"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em]">Skills &amp; Tools</h3>
            <button onClick={addSkillCategory} className="text-xs text-muted-foreground hover:text-foreground">
              + Add Category
            </button>
          </div>
          <div className="space-y-8">
            {profile.skills.map((cat, ci) => (
              <div key={ci} className="border border-border p-4">
                <div className="mb-4 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Category name"
                    value={cat.category}
                    onChange={(e) => updateSkillCategory(ci, { category: e.target.value })}
                    className="flex-1 border border-border bg-background px-3 py-2 text-sm font-medium outline-none focus:border-foreground"
                  />
                  <button
                    onClick={() => removeSkillCategory(ci)}
                    className="px-2 py-2 text-xs text-red-500 hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-2">
                  {cat.items.map((item, ii) => (
                    <div key={ii} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Tool name"
                        value={item.name}
                        onChange={(e) => updateSkillItem(ci, ii, e.target.value, item.level)}
                        className="flex-1 border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
                      />
                      <select
                        value={item.level}
                        onChange={(e) => updateSkillItem(ci, ii, item.name, Number(e.target.value))}
                        className="border border-border bg-background px-2 py-2 text-sm outline-none focus:border-foreground"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                      <button
                        onClick={() => removeSkillItem(ci, ii)}
                        className="px-2 py-2 text-xs text-red-500 hover:text-red-400"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => addSkillItem(ci)}
                  className="mt-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  + Add Skill
                </button>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Remember to click &quot;Save&quot; after making changes.
        </p>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   BLOG EDITOR
   ═══════════════════════════════════════════ */

function BlogEditor({ adminKey }: { adminKey: string }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<EditingPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [rawHtml, setRawHtml] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/blog", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(posts),
      });
      if (res.ok) {
        setMessage("Saved!");
        setTimeout(() => setMessage(""), 2000);
      } else {
        setMessage("Save failed");
      }
    } catch {
      setMessage("Save failed");
    }
    setSaving(false);
  }

  function addPost() {
    const today = new Date().toISOString().slice(0, 10);
    setEditing({
      slug: "",
      title: "",
      category: "",
      excerpt: "",
      date: today,
      image: "",
      tags: [],
      content: "",
      _new: true,
    });
  }

  function saveEdit() {
    if (!editing) return;
    const { _new, ...post } = editing;
    if (_new) {
      setPosts([post, ...posts]);
    } else {
      setPosts(posts.map((p) => (p.slug === post.slug ? post : p)));
    }
    setEditing(null);
  }

  function deletePost(slug: string) {
    if (confirm("Delete this post?")) {
      setPosts(posts.filter((p) => p.slug !== slug));
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/blog/upload", {
        method: "POST",
        headers: { "x-admin-key": adminKey },
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setEditing({ ...editing, image: data.url });
        setMessage("Image uploaded!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch {
      setMessage("Upload failed");
    }
    setUploading(false);
  }

  // ─── Editing Form ────────────────────────────
  if (editing) {
    return (
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => setEditing(null)}
          className="mb-8 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
        >
          &larr; Back
        </button>
        <h2 className="mb-8 text-2xl font-bold">
          {editing._new ? "New Post" : `Edit: ${editing.title}`}
        </h2>

        <div className="space-y-4">
          <Field label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
          <Field label="Slug (URL path)" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} />
          <Field label="Category" value={editing.category} onChange={(v) => setEditing({ ...editing, category: v })} />
          <Field label="Date (YYYY-MM-DD)" value={editing.date} onChange={(v) => setEditing({ ...editing, date: v })} />
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Thumbnail Image
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={editing.image}
                onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                placeholder="Image URL or upload →"
                className="flex-1 border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
              />
              <label className={`flex cursor-pointer items-center border border-border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                {uploading ? "Uploading..." : "Upload"}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            {editing.image && (
              <div className="mt-2 aspect-[16/9] max-w-xs overflow-hidden rounded border border-border bg-muted">
                <img src={editing.image} alt="Preview" className="h-full w-full object-cover" />
              </div>
            )}
          </div>
          <FieldArea label="Excerpt (요약)" value={editing.excerpt} onChange={(v) => setEditing({ ...editing, excerpt: v })} />
          <Field
            label="Tags (comma separated)"
            value={editing.tags.join(", ")}
            onChange={(v) => setEditing({ ...editing, tags: v.split(",").map((s) => s.trim()).filter(Boolean) })}
          />
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Content
              </label>
              <button
                type="button"
                onClick={() => setRawHtml(!rawHtml)}
                className="text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                {rawHtml ? "Visual Editor" : "HTML Source"}
              </button>
            </div>
            {rawHtml ? (
              <textarea
                value={editing.content}
                onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                rows={16}
                className="w-full border border-border bg-background px-3 py-2 text-sm font-mono outline-none focus:border-foreground resize-y"
              />
            ) : (
              <BlogNovelEditor
                key={editing.slug}
                initialHtml={editing.content}
                onHtmlChange={(html) => setEditing({ ...editing, content: html })}
              />
            )}
          </div>
        </div>

        <button
          onClick={saveEdit}
          className="mt-8 border border-foreground px-8 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
        >
          {editing._new ? "Add Post" : "Update Post"}
        </button>
      </div>
    );
  }

  // ─── Post List ────────────────────────────
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Blog</h2>
          <p className="mt-1 text-sm text-muted-foreground">{posts.length} posts</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addPost}
            className="border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
          >
            + Add
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="border border-foreground px-6 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save All"}
          </button>
        </div>
      </div>

      {message && <p className="mb-4 text-sm font-medium text-foreground">{message}</p>}

      <div className="divide-y divide-border border-y border-border">
        {posts.map((post, i) => (
          <div key={post.slug || i} className="flex items-center gap-4 py-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">
                {post.date} — {post.category}
              </p>
              <p className="font-medium">{post.title}</p>
              <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditing({ ...post })}
                className="px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(post.slug)}
                className="px-3 py-1 text-xs text-red-500 hover:text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Remember to click &quot;Save All&quot; after making changes.
      </p>
    </>
  );
}

/* ═══════════════════════════════════════════
   Form Components
   ═══════════════════════════════════════════ */

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}

function FieldArea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}
