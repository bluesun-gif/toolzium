import type { Metadata } from "next";
import type React from "react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free Phone Lookup [Instant] — Scam Score, Carrier, Owner Name",
  description:
    "✅ 100% Free • No signup required • Anonymous • Instant results • Check any phone number for spam history, carrier info, and owner details from 500M+ records.",
  path: "/lookup/phone",
  keywords: [
    "reverse phone lookup",
    "free phone lookup",
    "who called me",
    "scam checker",
    "spam number checker",
    "phone carrier lookup",
    "unknown caller id",
  ],
});

export default function ToolSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
