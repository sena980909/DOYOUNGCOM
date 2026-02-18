import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminKey } from "@/lib/admin";
import { getStoredPosts, savePosts } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getStoredPosts();
  return NextResponse.json(posts);
}

export async function PUT(request: NextRequest) {
  const key = request.headers.get("x-admin-key");
  if (!isAdminKey(key)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await request.json();
    await savePosts(posts);

    revalidatePath("/blog");
    revalidatePath("/");

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to save posts:", err);
    return NextResponse.json(
      { error: "Failed to save posts" },
      { status: 500 }
    );
  }
}
