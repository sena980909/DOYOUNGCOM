import { NextRequest, NextResponse } from "next/server";
import { isAdminKey } from "@/lib/admin";

/**
 * GET /api/admin/verify?key=xxx
 * 클라이언트에서 관리자 키를 검증할 때 사용합니다.
 * ADMIN_SECRET은 서버에서만 접근 가능하므로 API Route가 필요합니다.
 */
export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  const valid = isAdminKey(key);
  return NextResponse.json({ valid });
}
