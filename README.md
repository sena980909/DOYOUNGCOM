<div align="center">

# DOYOUNGCOM

**Agility in Architecture**

*건축은 무겁지만, 생각은 가벼워야 합니다.*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel)](https://doyoungcom.vercel.app)

**Engineer's Logic, Designer's Sense.**

[Live Site](https://doyoungcom.vercel.app)

</div>

---

## 1. 프로젝트 소개

**DOYOUNGCOM**은 건축학과 학생의 포트폴리오 겸 개인 브랜드 웹사이트입니다.

단순한 프로젝트 나열이 아닌, **건축 철학(매니페스토)** 을 전면에 내세우고 — `DO`(실행), `YOUNG`(유연), `COM`(소통) — 이 세 가지 키워드로 자신만의 건축관을 선언하는 사이트입니다.

## 2. 기획 의도

### 왜 만들었는가

- 기존 건축 포트폴리오는 PDF나 정적 이미지 위주 → **웹 기반 인터랙티브 포트폴리오**로 차별화
- 건축가도 코드와 AI를 도구로 쓸 수 있다는 것을 **사이트 자체가 증명**
- 콘텐츠(프로젝트, 프로필, 블로그)를 비개발자도 쉽게 편집할 수 있는 **자체 CMS** 내장

### 핵심 설계 원칙

| 원칙 | 설명 |
|---|---|
| **Zero-Auth Admin** | 로그인 UI 없이 시크릿 URL(`/edit/SECRET`)로 관리자 접근 |
| **ISR (60s)** | 편집 후 60초 내 사이트에 자동 반영 (+ 저장 시 즉시 revalidation) |
| **Fallback-first** | Vercel Blob 장애 시에도 하드코딩된 기본 데이터로 사이트가 정상 동작 |
| **Mobile-first** | 모바일 환경을 우선 설계, 데스크톱으로 확장 |

## 3. 제작 과정

> 이 프로젝트는 **Claude Code (AI)**를 활용하여 하루 만에 제작되었습니다.

### 개발 타임라인

```
14:09  Initial commit — Next.js 14 + Tailwind CSS 기본 구조
14:20  매니페스토 페이지 — DO·YOUNG·COM 철학 섹션
14:26  6개 건축 프로젝트 데이터 + 상세 페이지
14:32  DO/YOUNG/COM 텍스트 오버랩 버그 수정
15:03  사이트 아이콘, OG 이미지, 프로젝트 이미지 추가
15:19  Notion CMS 연동 시도
15:31  Notion → Vercel Blob + Secret URL 에디터로 전환
16:02  프로필 페이지 + 사진 업로드 기능
16:06  모바일 반응형 개선 (1차)
16:12  연락처 정보 통합
16:16  모바일 반응형 개선 (2차)
16:21  홈페이지·푸터 연락처를 프로필 데이터로 연결
16:37  저장 시 on-demand revalidation 추가
16:56  에러 바운더리 + API 에러 핸들링 추가
17:03  아이콘 원형 처리
17:30  블로그 기능 완성 — CRUD + 상세 페이지 + 에디터 탭
17:45  블로그 기본 포스트 3개 등록 + Blob 데이터 동기화
17:50  Vercel Blob allowOverwrite 이슈 수정
```

### 기술 선택 이유

| 기술 | 선택 이유 |
|---|---|
| **Next.js 14 App Router** | 서버 컴포넌트 + ISR로 빠른 로딩 & SEO 최적화 |
| **Tailwind CSS** | 디자인 시스템 없이도 일관된 미니멀 UI 구현 가능 |
| **Vercel Blob** | 서버리스 환경에서 DB 없이 JSON 데이터 + 이미지 저장 |
| **Vercel** | Git push만으로 자동 배포, 무료 호비 플랜 |

## 4. 트러블슈팅

### `useSearchParams` 빌드 에러
- **문제**: Next.js 14에서 `useSearchParams`를 Suspense 없이 사용하면 빌드 실패
- **해결**: `Suspense` boundary로 감싸서 해결

### DO/YOUNG/COM 텍스트 오버랩
- **문제**: 좌측 컬럼 120px로 "YOUNG" 텍스트가 `text-7xl`에서 넘침
- **해결**: 좌측 컬럼을 240px로 확대

### Notion CMS → Vercel Blob 전환
- **문제**: Notion API는 응답이 느리고, 블록 렌더링 복잡도가 높음
- **해결**: Notion을 제거하고, Vercel Blob + Secret URL 에디터로 전환 → 더 빠르고 단순한 구조

### 500 에러 (에러 바운더리 부재)
- **문제**: 서버 컴포넌트 에러 시 전체 사이트가 500으로 다운. 특히 Footer가 레이아웃에 있어 모든 페이지에 영향
- **해결**:
  - `error.tsx`, `global-error.tsx` 추가 (에러 복구 UI)
  - API 라우트에 `try/catch` 추가
  - Footer에 이중 에러 방어 (fallback to defaultProfile)

### Vercel Blob `allowOverwrite` 저장 실패
- **문제**: Vercel Blob SDK 업데이트로 기존 파일 덮어쓰기 시 `allowOverwrite: true` 필수. 에디터에서 저장 시 500 에러 발생
- **해결**: `storage.ts`의 모든 `put()` 호출에 `allowOverwrite: true` 추가

### 모바일 반응형 깨짐
- **문제**: 데스크톱 우선으로 만든 레이아웃이 모바일에서 텍스트 오버플로, 카드 패딩 과다
- **해결**: `text-4xl → sm:text-6xl → lg:text-7xl` 단계적 스케일링, 그리드 컬럼 브레이크포인트 재조정

## 5. 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx              # 메인 (매니페스토)
│   ├── layout.tsx            # 공통 레이아웃 (Header + Footer)
│   ├── error.tsx             # 에러 바운더리
│   ├── global-error.tsx      # 글로벌 에러 바운더리
│   ├── about/page.tsx        # 프로필
│   ├── projects/
│   │   ├── page.tsx          # 프로젝트 목록
│   │   └── [slug]/page.tsx   # 프로젝트 상세
│   ├── blog/
│   │   ├── page.tsx          # 블로그 목록 (카드 레이아웃)
│   │   ├── [slug]/page.tsx   # 블로그 상세 (HTML 렌더링)
│   │   └── editor/page.tsx   # 블로그 에디터 (Novel, 레거시)
│   ├── edit/[key]/page.tsx   # 관리자 에디터 (Projects/Profile/Blog 탭)
│   └── api/
│       ├── admin/verify/     # 관리자 키 검증
│       ├── blog/             # 블로그 CRUD
│       ├── profile/          # 프로필 CRUD
│       ├── profile/upload/   # 사진 업로드
│       └── projects/         # 프로젝트 CRUD
├── components/
│   ├── header.tsx            # 네비게이션 (모바일 햄버거 포함)
│   └── footer.tsx            # 푸터 (프로필 데이터 연동)
└── lib/
    ├── admin.ts              # 관리자 키 검증 (timing-safe)
    ├── blog.ts               # BlogPost 타입 + 기본 포스트
    ├── profile.ts            # Profile 타입 + 기본값
    ├── projects.ts           # Project 타입 + 기본값
    ├── storage.ts            # Vercel Blob 읽기/쓰기 (Projects/Profile/Blog)
    ├── site-config.ts        # 사이트 전역 설정
    └── utils.ts              # cn(), getBaseUrl()
```

## 6. 실행 방법

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.local.example .env.local
# ADMIN_SECRET, BLOB_READ_WRITE_TOKEN 입력

# 개발 서버
npm run dev
```

### 환경변수

| Variable | Required | Description |
|---|---|---|
| `ADMIN_SECRET` | Yes | 관리자 에디터 접근 키 |
| `BLOB_READ_WRITE_TOKEN` | No | Vercel Blob 토큰 (없으면 기본 데이터 사용) |
| `NEXT_PUBLIC_SITE_URL` | No | 커스텀 도메인 (SEO용) |

## 7. 관리자 에디터

`/edit/YOUR_ADMIN_SECRET` 경로에서 로그인 없이 콘텐츠를 관리합니다.

**Projects 탭**
- 프로젝트 추가 / 수정 / 삭제 / 순서 변경
- 이미지 URL, 카테고리, 컨셉, 사용 도구 등 편집

**Profile 탭**
- 기본 정보 (이름, 학력, 연락처)
- About Me, DO/YOUNG/COM 설명
- 학력·이력 항목 추가/삭제
- 스킬 카테고리 및 숙련도 편집
- 프로필 사진 업로드

**Blog 탭**
- 블로그 글 추가 / 수정 / 삭제
- 제목, 카테고리, 날짜, 썸네일, 요약, 태그 편집
- HTML 콘텐츠 직접 편집

## 8. 향후 계획

- [x] ~~**블로그 기능 완성**~~ — 목록, 상세 페이지, 에디터 CRUD 구현 완료
- [ ] **커스텀 도메인 연결** — 현재 `doyoungcom.vercel.app` (Vercel 기본값) → `doyoungcom.com` 등 자체 도메인 연결 필요
- [ ] **다크 모드** 지원
- [ ] **프로젝트 이미지 갤러리** — 현재 대표 이미지 1장 → 복수 이미지 슬라이드
- [ ] **블로그 WYSIWYG 에디터** — 현재 HTML 직접 입력 → Novel 에디터 연동으로 개선

> 커스텀 도메인 연결 시 `NEXT_PUBLIC_SITE_URL` 환경변수만 변경하면 SEO, OG 태그 등이 자동으로 반영되도록 설계되어 있습니다.

---

<div align="center">

Built with **Next.js** & **Tailwind CSS** · Deployed on **Vercel**

AI-assisted development with **Claude Code**

</div>
