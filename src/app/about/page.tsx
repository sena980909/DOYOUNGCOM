import type { Metadata } from "next";
import Image from "next/image";
import { getStoredProfile } from "@/lib/storage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Profile",
  description: "DOYOUNGCOM — Engineer's Logic, Designer's Sense.",
};

export default async function ProfilePage() {
  const profile = await getStoredProfile();

  return (
    <div className="py-24">
      {/* Header with photo */}
      <div className="mb-20 flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <div className="flex-1">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Profile
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {profile.nameEn}
          </h1>
          <p className="mt-4 text-lg italic text-muted-foreground">
            &ldquo;{profile.tagline}&rdquo;
          </p>
        </div>
        {profile.photo && (
          <div className="relative h-32 w-32 shrink-0 overflow-hidden sm:h-48 sm:w-48">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Basic Info */}
      <section className="mb-20 grid grid-cols-1 gap-6 border-y border-border py-8 sm:grid-cols-2 lg:grid-cols-4">
        <InfoItem label="Name" value={profile.name} />
        <InfoItem label="Birth" value={profile.birth} />
        <InfoItem label="Education" value={profile.education} />
        <InfoItem label="Contact" value={profile.contact} href={`mailto:${profile.contact}`} />
      </section>

      {/* About Me */}
      <section className="mb-20">
        <SectionTitle>About Me</SectionTitle>
        <div className="mb-10 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground">
          {profile.aboutMe.split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PhilosophyCard
            keyword="DO"
            description={profile.doDescription}
          />
          <PhilosophyCard
            keyword="YOUNG"
            description={profile.youngDescription}
          />
          <PhilosophyCard
            keyword="COM"
            description={profile.comDescription}
          />
        </div>
      </section>

      {/* Education & History */}
      <section className="mb-20">
        <SectionTitle>Education &amp; History</SectionTitle>
        <div className="space-y-4">
          {profile.history.map((item, i) => (
            <div key={i} className="flex items-baseline gap-4">
              <span className="text-xs font-medium text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-medium">{item.label}</p>
                {item.description && (
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Tools */}
      <section className="mb-20">
        <SectionTitle>Skills &amp; Tools</SectionTitle>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills.map((cat) => (
            <div key={cat.category}>
              <h3 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {cat.category}
              </h3>
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <span className="w-24 text-sm">{item.name}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div
                          key={j}
                          className={`h-2 w-6 ${
                            j < item.level
                              ? "bg-foreground"
                              : "bg-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Footer */}
      <section className="border-t border-border pt-12">
        <div className="flex flex-wrap gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Email
            </p>
            <a
              href={`mailto:${profile.contact}`}
              className="mt-1 block text-sm underline underline-offset-4 hover:text-muted-foreground"
            >
              {profile.contact}
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Instagram
            </p>
            <a
              href={profile.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm underline underline-offset-4 hover:text-muted-foreground"
            >
              {profile.instagram}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Helper Components ── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
      {children}
    </h2>
  );
}

function InfoItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="mt-1 block text-sm font-medium underline underline-offset-4 hover:text-muted-foreground"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 text-sm font-medium">{value}</p>
      )}
    </div>
  );
}

function PhilosophyCard({
  keyword,
  description,
}: {
  keyword: string;
  description: string;
}) {
  return (
    <div className="border border-border p-6">
      <p className="mb-2 text-2xl font-bold tracking-tight">{keyword}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
