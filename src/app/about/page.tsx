import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "DOYOUNGCOM — Agility in Architecture. 건축은 무겁지만, 생각은 가벼워야 합니다.",
};

export default function AboutPage() {
  return (
    <div className="py-24">
      {/* Header */}
      <div className="mb-20">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
          About
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Agility in Architecture
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          건축은 무겁지만, 생각은 가벼워야 합니다.
        </p>
      </div>

      <div className="grid gap-20 lg:grid-cols-[2fr_1fr]">
        {/* Bio */}
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            우리는 수천 년간 돌과 콘크리트를 쌓아왔습니다.
            하지만 2026년의 건축은 더 이상 중력과의 싸움만이 아닙니다.
            변화하는 기술, 급변하는 라이프스타일,
            그리고 AI라는 새로운 파도와의 싸움입니다.
          </p>
          <p className="text-foreground font-medium">
            DOYOUNGCOM은 선언합니다.
          </p>
          <p>
            지금 건축가에게 필요한 &lsquo;젊음&rsquo;은 생물학적 나이가 아닙니다.
            그것은 관성(Inertia)을 거부하는 태도입니다.
          </p>
          <p>
            저는 AI를 통해 더 많은 대안을 탐색하고,
            인간만이 할 수 있는 &lsquo;결정&rsquo;에 집중합니다.
            딱딱한 콘크리트 속에 유연한 소프트웨어를 심는 것,
            그것이 제가 지향하는 공간입니다.
          </p>
          <p>
            복잡함을 단순함으로 번역하는 커뮤니케이션.
            그것이 DOYOUNGCOM의 핵심 경쟁력입니다.
          </p>
        </div>

        {/* Contact Sidebar */}
        <div className="space-y-8 border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Email
            </p>
            <a
              href="mailto:doyoung@doyoungcom.com"
              className="mt-1 block text-sm underline underline-offset-4 hover:text-muted-foreground"
            >
              doyoung@doyoungcom.com
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Instagram
            </p>
            <a
              href="https://instagram.com/doyoung_arch"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm underline underline-offset-4 hover:text-muted-foreground"
            >
              @doyoung_arch
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Location
            </p>
            <p className="mt-1 text-sm">Based in Korea</p>
            <p className="text-xs text-muted-foreground">Works Everywhere.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
