import type { Metadata } from "next";
import type React from "react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Username Search [Free] — Find Any Handle Across 30+ Networks",
  description:
    "✅ 100% Free • Anonymous OSINT scan • No signup • Check a username against Instagram, TikTok, GitHub, X & 30+ platforms in seconds. Find every account.",
  path: "/lookup/username",
  keywords: [
    "username search",
    "find username",
    "social media scanner",
    "osint username",
    "username availability",
    "check username",
    "people search",
  ],
});

export default function ToolSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
