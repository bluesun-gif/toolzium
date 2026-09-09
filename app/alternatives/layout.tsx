import type { Metadata } from "next";
import type React from "react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "50+ Free Open-Source Alternatives to Paid Software [2026]",
  description:
    "✅ Updated Sep 2026 • 100% free & FOSS • No subscriptions • Replace Photoshop, Notion, Slack, Figma, Office 365 and more with free open-source tools.",
  path: "/alternatives",
  keywords: [
    "free software alternatives",
    "open source alternatives",
    "photoshop alternative free",
    "notion alternative",
    "figma alternative free",
    "microsoft 365 alternative",
  ],
});

export default function ToolSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
