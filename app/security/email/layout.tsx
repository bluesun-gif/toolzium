import type { Metadata } from "next";
import type React from "react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "SPF, DKIM & DMARC Checker [Free] — Full Email DNS Audit",
  description:
    "✅ Instant DNS scan • No signup • Pass/Fail grading • Check SPF, DKIM, DMARC, MX & PTR records and fix spoofing vulnerabilities in minutes.",
  path: "/security/email",
  keywords: [
    "spf record checker",
    "dkim lookup",
    "dmarc record checker",
    "email dns scan",
    "mx toolbox alternative",
    "email spoofing test",
  ],
});

export default function ToolSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
