import { NextRequest, NextResponse } from "next/server";
import { isAdminKey } from "@/lib/admin";
import { getStoredProjects, saveProjects } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await getStoredProjects();
  return NextResponse.json(projects);
}

export async function PUT(request: NextRequest) {
  const key = request.headers.get("x-admin-key");
  if (!isAdminKey(key)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await request.json();
  await saveProjects(projects);
  return NextResponse.json({ ok: true });
}
