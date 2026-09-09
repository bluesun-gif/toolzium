import type { Metadata } from "next";
import type React from "react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Password Breach Checker [Anonymous] — 518M Leaked Accounts",
  description:
    "✅ 100% Free • Zero-knowledge k-anonymity • No signup • Check if your password appears in 518M+ real breach records without ever sending it to us.",
  path: "/security/password",
  keywords: [
    "password breach checker",
    "have i been pwned",
    "password leak check",
    "data breach scan",
    "is my password leaked",
    "k-anonymity password",
  ],
});

export default function ToolSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
