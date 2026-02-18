# DOYOUNGCOM

Architecture portfolio site — **Engineer's Logic, Designer's Sense.**

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
- **Responsive**: Mobile-first design with dark/light mode

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
