import type { Metadata } from "next";
import type React from "react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free IP Lookup [Instant] — Geolocation, ISP, VPN & Proxy Detection",
  description:
    "✅ 100% Free • Anonymous • No signup • Map any IP to city, ISP, ASN & threat level. Detect VPN, Tor, and datacenter IPs instantly from 4B+ records.",
  path: "/lookup/ip",
  keywords: [
    "ip lookup",
    "ip geolocation",
    "what is my ip",
    "vpn detector",
    "ip threat intelligence",
    "asn lookup",
    "isp checker",
  ],
});

export default function ToolSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
