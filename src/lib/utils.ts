import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS 클래스 병합 유틸리티
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 현재 배포된 도메인의 Base URL을 반환합니다.
 * 도메인이 변경되어도 코드 수정이 필요 없도록 환경변수 기반으로 동작합니다.
 *
 * 우선순위:
 * 1. NEXT_PUBLIC_SITE_URL (사용자가 직접 설정한 도메인)
 * 2. VERCEL_PROJECT_PRODUCTION_URL (Vercel 자동 설정 - 프로덕션)
 * 3. VERCEL_URL (Vercel 자동 설정 - 프리뷰/개발)
 * 4. localhost:3000 (로컬 개발)
 */
export function getBaseUrl(): string {
  // 1) 사용자가 명시적으로 설정한 URL (가장 높은 우선순위)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }

  // 2) Vercel 프로덕션 URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  // 3) Vercel 프리뷰/개발 URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 4) 로컬 개발 환경
  return "http://localhost:3000";
}

/**
 * 상대 경로를 절대 URL로 변환합니다.
 * 예: absoluteUrl("/blog/hello") → "https://yourdomain.com/blog/hello"
 */
export function absoluteUrl(path: string): string {
  const base = getBaseUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
