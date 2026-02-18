import { NextRequest, NextResponse } from "next/server";
import { isAdminKey } from "@/lib/admin";
import { getStoredProfile, saveProfile } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  const profile = await getStoredProfile();
  return NextResponse.json(profile);
}

export async function PUT(request: NextRequest) {
  const key = request.headers.get("x-admin-key");
  if (!isAdminKey(key)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await request.json();
  await saveProfile(profile);
  return NextResponse.json({ ok: true });
}
