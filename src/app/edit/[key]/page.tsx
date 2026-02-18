"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Project } from "@/lib/projects";

type EditingProject = Project & { _new?: boolean };

export default function EditPage() {
  const { key } = useParams<{ key: string }>();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<EditingProject | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

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

  // Load projects
  useEffect(() => {
    if (!authorized) return;
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects);
  }, [authorized]);

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": key,
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

  // ─── Editing Form ────────────────────────────
  if (editing) {
    return (
      <div className="mx-auto max-w-2xl py-16">
        <button
          onClick={() => setEditing(null)}
          className="mb-8 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
        >
          &larr; Back
        </button>
        <h1 className="mb-8 text-2xl font-bold">
          {editing._new ? "New Project" : `Edit: ${editing.title}`}
        </h1>

        <div className="space-y-4">
          <Field
            label="Title"
            value={editing.title}
            onChange={(v) => setEditing({ ...editing, title: v })}
          />
          <Field
            label="Slug (URL path)"
            value={editing.slug}
            onChange={(v) => setEditing({ ...editing, slug: v })}
          />
          <Field
            label="Subtitle"
            value={editing.subtitle}
            onChange={(v) => setEditing({ ...editing, subtitle: v })}
          />
          <Field
            label="Number (01, 02...)"
            value={editing.number}
            onChange={(v) => setEditing({ ...editing, number: v })}
          />
          <Field
            label="Category"
            value={editing.category}
            onChange={(v) => setEditing({ ...editing, category: v })}
          />
          <Field
            label="Location"
            value={editing.location}
            onChange={(v) => setEditing({ ...editing, location: v })}
          />
          <Field
            label="Image URL"
            value={editing.image}
            onChange={(v) => setEditing({ ...editing, image: v })}
          />
          <FieldArea
            label="Problem"
            value={editing.problem}
            onChange={(v) => setEditing({ ...editing, problem: v })}
          />
          <Field
            label="Concept (one line)"
            value={editing.concept}
            onChange={(v) => setEditing({ ...editing, concept: v })}
          />
          <FieldArea
            label="Concept Details (one per line)"
            value={editing.conceptDetails.join("\n")}
            onChange={(v) =>
              setEditing({
                ...editing,
                conceptDetails: v.split("\n").filter(Boolean),
              })
            }
          />
          <FieldArea
            label="What I Did (one per line)"
            value={editing.whatIDid.join("\n")}
            onChange={(v) =>
              setEditing({
                ...editing,
                whatIDid: v.split("\n").filter(Boolean),
              })
            }
          />
          <Field
            label="Tools (comma separated)"
            value={editing.tools.join(", ")}
            onChange={(v) =>
              setEditing({
                ...editing,
                tools: v
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
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
    <div className="py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {projects.length} projects
          </p>
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

      {message && (
        <p className="mb-4 text-sm font-medium text-foreground">{message}</p>
      )}

      <div className="divide-y divide-border border-y border-border">
        {projects.map((project, i) => (
          <div
            key={project.slug || i}
            className="flex items-center gap-4 py-4"
          >
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
              <p className="text-sm text-muted-foreground">
                {project.subtitle}
              </p>
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
    </div>
  );
}

// ─── Form Components ───────────────────────────

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
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}
