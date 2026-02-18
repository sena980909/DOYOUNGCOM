<div align="center">

# DOYOUNGCOM

**Agility in Architecture**

*건축은 무겁지만, 생각은 가벼워야 합니다.*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel)](https://doyoungcom.vercel.app)

---

**Engineer's Logic, Designer's Sense.**

</div>

## Features

| | Feature | Description |
|---|---|---|
| **Projects** | Architecture Portfolio | 주거, 문화, 상업, 오피스, 도시설계, 공모전 |
| **Profile** | Resume / CV | 프로필 사진, 스킬, 학력, 이력 |
| **Blog** | Blog | Coming soon |
| **Editor** | Secret URL Editor | `/edit/SECRET` — 로그인 없이 콘텐츠 편집 |
| **ISR** | Incremental Static Regen | 콘텐츠 변경 60초 내 반영 |
| **Responsive** | Mobile-first | 모바일 최적화 디자인 |

## Pages

```
/                    메인 — 매니페스토 & 철학
/projects            프로젝트 목록
/projects/[slug]     프로젝트 상세
/about               프로필 & 스킬
/blog                블로그
/edit/[key]          관리자 에디터
```

## Getting Started

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.example .env.local

# 3. 개발 서버 실행
npm run dev
```

## Environment Variables

```env
ADMIN_SECRET=your-secret-key           # 관리자 에디터 접근 키
BLOB_READ_WRITE_TOKEN=your-blob-token  # Vercel Blob 저장소 토큰
NEXT_PUBLIC_SITE_URL=https://...       # (선택) 커스텀 도메인
```

## Tech Stack

```
Framework     Next.js 14 (App Router)
Styling       Tailwind CSS
Storage       Vercel Blob
Deploy        Vercel
```

## Content Editing

`/edit/YOUR_ADMIN_SECRET` 경로에서:

- 프로젝트 추가, 수정, 정렬, 삭제
- 프로필 정보, 스킬, 학력 편집
- 프로필 사진 업로드

---

<div align="center">
<sub>Built with Next.js & Tailwind CSS. Deployed on Vercel.</sub>
</div>
