import type { Metadata } from "next";
import type React from "react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free WHOIS Lookup [Instant] — Domain Age, Registrar, Expiry, DNSSEC",
  description:
    "✅ 100% Free • No signup • Instant RDAP results • Reveal domain owner, registration date, expiry countdown, nameservers & security status in under 1 second.",
  path: "/lookup/whois",
  keywords: [
    "whois lookup",
    "free whois",
    "domain age checker",
    "rdap lookup",
    "domain registrar",
    "dnssec checker",
    "domain expiry checker",
  ],
});

export default function ToolSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
