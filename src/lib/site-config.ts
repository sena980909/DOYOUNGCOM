/**
 * 사이트 전역 설정
 * 브랜드명이나 네비게이션을 변경할 때 이 파일만 수정하면 됩니다.
 */

export const siteConfig = {
  name: "DOYOUNGCOM",
  description: "Agility in Architecture — 건축은 무겁지만, 생각은 가벼워야 합니다.",
  /** 네비게이션 링크 */
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Profile", href: "/about" },
  ],
} as const;
