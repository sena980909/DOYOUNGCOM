import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ──────────────────────────────────────────────
          HERO — Full viewport, centered manifesto
      ────────────────────────────────────────────── */}
      <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Design Philosophy &amp; Manifesto
        </p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl">
          DOYOUNGCOM
        </h1>
        <p className="mt-4 text-lg font-medium tracking-wide sm:text-2xl">
          : Agility in Architecture
        </p>
        <div className="mx-auto mt-10 max-w-2xl border-t border-border pt-10">
          <p className="text-xl font-semibold italic sm:text-2xl">
            &ldquo;Architecture is Heavy,
            <br />
            But Thinking Must Be Light.&rdquo;
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            건축은 무겁지만, 생각은 가벼워야 합니다.
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          INTRO — 시대 선언
      ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-2xl py-24">
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
            <br />
            그것은{" "}
            <span className="text-foreground font-semibold">
              관성(Inertia)을 거부하는 태도
            </span>
            입니다.
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          WHY DOYOUNGCOM — 3가지 정의
      ────────────────────────────────────────────── */}
      <section className="border-t border-border py-24">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Why DOYOUNGCOM?
        </h2>
        <p className="mb-20 text-center text-sm text-muted-foreground">
          : 젊게 행동한다는 것의 3가지 정의
        </p>

        <div className="grid gap-16 lg:gap-24">
          {/* 1. DO */}
          <div className="grid items-start gap-8 lg:grid-cols-[120px_1fr]">
            <div>
              <span className="text-6xl font-bold tracking-tighter lg:text-7xl">
                DO
              </span>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                실행하다
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold">
                두려움 없는 도구의 확장
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  선배들이 로트링 펜을 놓았듯, 저는 렌더링을 넘어섭니다.
                  Generative AI와 데이터 기반의 설계(Data-Driven Design)를
                  두려워하지 않습니다.
                </p>
                <p>
                  기술은 건축의 적이 아니라, 상상력을 현실로 당겨오는 가장 빠른
                  가속 페달입니다.
                </p>
                <p className="text-foreground font-medium">
                  저는 AI를 통해 더 많은 대안을 탐색하고, 인간만이 할 수 있는
                  &lsquo;결정&rsquo;에 집중합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border" />

          {/* 2. YOUNG */}
          <div className="grid items-start gap-8 lg:grid-cols-[120px_1fr]">
            <div>
              <span className="text-6xl font-bold tracking-tighter lg:text-7xl">
                YOUNG
              </span>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                유연하다
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold">고정관념의 해체</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  &ldquo;원래 그렇게 했다&rdquo;는 말은 제 사전에 없습니다.
                  주거와 상업의 경계가 무너지고, 오프라인과 메타버스가 섞이는
                  시대.
                </p>
                <p>
                  과거의 법규와 조닝(Zoning)에 갇히지 않고, 사용자의 진짜 욕망을
                  읽어내는 유연함을 가집니다.
                </p>
                <p className="text-foreground font-medium">
                  딱딱한 콘크리트 속에 유연한 소프트웨어를 심는 것, 그것이 제가
                  지향하는 공간입니다.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border" />

          {/* 3. COM */}
          <div className="grid items-start gap-8 lg:grid-cols-[120px_1fr]">
            <div>
              <span className="text-6xl font-bold tracking-tighter lg:text-7xl">
                COM
              </span>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                연결하다
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold">
                소통의 새로운 프로토콜
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  건축가는 혼자 짓지 않습니다. 복잡한 시공 현장과 클라이언트의
                  추상적인 언어를 연결하는 &lsquo;통역사&rsquo;가 되어야 합니다.
                </p>
                <p>
                  도면 한 장의 권위보다, 명확한 시각화와 논리적인 설득을 믿습니다.
                </p>
                <p className="text-foreground font-medium">
                  복잡함을 단순함으로 번역하는 커뮤니케이션, DOYOUNGCOM의 핵심
                  경쟁력입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          PROJECTS CTA
      ────────────────────────────────────────────── */}
      <section className="border-t border-border py-24 text-center">
        <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Projects
        </h2>
        <p className="mt-6 text-2xl font-semibold italic sm:text-3xl">
          &ldquo;Don&rsquo;t just watch. Interact.&rdquo;
        </p>
        <div className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
          <p>
            저의 포트폴리오는 정지된 이미지가 아닙니다.
            <br />
            변화하는 시대에 어떻게 건축이 반응(React)하는지에 대한 기록입니다.
          </p>
        </div>
        <Link
          href="/projects"
          className="mt-10 inline-block border border-foreground px-10 py-3 text-sm font-medium tracking-wide transition-colors hover:bg-foreground hover:text-background"
        >
          View Projects &rarr;
        </Link>
      </section>

      {/* ──────────────────────────────────────────────
          CONTACT
      ────────────────────────────────────────────── */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Contact
          </h2>
          <p className="mt-6 text-2xl font-semibold sm:text-3xl">
            Let&rsquo;s build the Next Standard.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            새로운 기준을 세울 준비가 되셨습니까?
          </p>
          <div className="mt-12 space-y-3 text-sm">
            <p>
              <span className="text-muted-foreground">Email</span>
              <br />
              <a
                href="mailto:doyoung@doyoungcom.com"
                className="underline underline-offset-4 hover:text-muted-foreground"
              >
                doyoung@doyoungcom.com
              </a>
            </p>
            <p>
              <span className="text-muted-foreground">Instagram</span>
              <br />
              <a
                href="https://instagram.com/doyoung_arch"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-muted-foreground"
              >
                @doyoung_arch
              </a>
            </p>
            <p className="pt-4 text-xs text-muted-foreground">
              Based in Korea, Works Everywhere.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
