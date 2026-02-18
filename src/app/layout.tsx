import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site-config";
import { getBaseUrl } from "@/lib/utils";
import "./globals.css";

export function generateMetadata(): Metadata {
  const baseUrl = getBaseUrl();

  return {
    title: {
      default: siteConfig.name,
      template: `%s — ${siteConfig.name}`,
    },
    description: siteConfig.description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: baseUrl,
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Header />
        <main className="mx-auto min-h-[calc(100vh-8rem)] max-w-6xl px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
