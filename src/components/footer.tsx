import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-sm font-bold tracking-tight">{siteConfig.name}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Engineer&apos;s Logic, Designer&apos;s Sense.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Navigation
            </p>
            <div className="space-y-2">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Contact
            </p>
            <div className="space-y-2">
              <a
                href="mailto:doyoungcom@gmail.com"
                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                doyoungcom@gmail.com
              </a>
              <a
                href="https://instagram.com/do__zip"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                @do__zip
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p className="text-xs text-muted-foreground">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
