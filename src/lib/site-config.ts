/**
 * 사이트 전역 설정
 * 브랜드명이나 네비게이션을 변경할 때 이 파일만 수정하면 됩니다.
 */

export const siteConfig = {
  name: "DOYOUNGCOM",
  description: "Architecture & Design Portfolio",
  /** 네비게이션 링크 */
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],
} as const;
