import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <p className="text-xs text-muted-foreground">All rights reserved</p>
      </div>
    </footer>
  );
}
