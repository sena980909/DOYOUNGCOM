# DOYOUNGCOM

Architecture portfolio site — **Engineer's Logic, Designer's Sense.**

> **Agility in Architecture** — 건축은 무겁지만, 생각은 가벼워야 합니다.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Storage**: Vercel Blob
- **Deploy**: Vercel

## Features

- **Projects**: Architecture portfolio with category, concept, tools
- **Profile**: Resume/CV with photo, skills, education history
- **Blog**: Blog section (coming soon)
- **Secret URL Editor**: Edit projects and profile via `/edit/YOUR_SECRET` — no login required
- **ISR**: Content updates reflect within 60 seconds
- **Responsive**: Mobile-first design

## Pages

| Route | Description |
|---|---|
| `/` | 메인 — 매니페스토 & 철학 |
| `/projects` | 프로젝트 목록 |
| `/projects/[slug]` | 프로젝트 상세 |
| `/about` | 프로필 & 스킬 |
| `/blog` | 블로그 |
| `/edit/[key]` | 프로젝트 & 프로필 에디터 (관리자) |

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in ADMIN_SECRET and BLOB_READ_WRITE_TOKEN
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `ADMIN_SECRET` | Secret key for editor access |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token |
| `NEXT_PUBLIC_SITE_URL` | Site URL for SEO |

## Content Editing

Visit `/edit/YOUR_ADMIN_SECRET` to:
- Add, edit, reorder, delete projects
- Edit profile info, skills, education history
- Upload profile photo
