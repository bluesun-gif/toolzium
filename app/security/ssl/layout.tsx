import type { Metadata } from "next";
import type React from "react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "SSL Certificate Checker [Free] — Expiry, Chain & Grade Scan",
  description:
    "✅ Instant scan • No signup • See expiry date, issuer, chain validity and protocol support for any domain's TLS/SSL certificate in 1 second.",
  path: "/security/ssl",
  keywords: [
    "ssl certificate checker",
    "ssl expiry checker",
    "tls scanner",
    "certificate chain validator",
    "ssl grade test",
    "domain ssl lookup",
  ],
});

export default function ToolSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
