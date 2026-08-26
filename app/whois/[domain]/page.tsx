import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { lookupWhois } from "@/lib/data/adapters/whois-adapter";
import { ProgrammaticSeoWrapper } from "@/components/seo/programmatic-seo-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Globe,
  Lock,
  Search,
  Server,
  Shield,
  ShieldAlert,
} from "lucide-react";
import { siteURL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ domain: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { domain } = await params;
  const decoded = decodeURIComponent(domain);
  const data = await lookupWhois(decoded);

  const title = `WHOIS Record for ${data.domain} — Registrar, Creation Date & Domain Age`;
  const description = `Complete WHOIS & RDAP domain intelligence for ${data.domain}. Registrar: ${data.registrar}. Registered: ${data.createdDate.split("T")[0]} (${data.domainAgeFormatted}). Expiration: ${data.expiresDate.split("T")[0]}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteURL}/whois/${encodeURIComponent(data.domain)}`,
      siteName: "Toolzium",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${siteURL}/whois/${encodeURIComponent(data.domain)}`,
    },
  };
}

export default async function WhoisProgrammaticPage({ params }: PageProps) {
  const { domain } = await params;
  const decoded = decodeURIComponent(domain);
  const data = await lookupWhois(decoded);

  const faqs = [
    {
      question: `Who owns and operates ${data.domain}?`,
      answer: `${data.domain} is registered through ${data.registrar} (ICANN accredited). In compliance with global privacy regulations (GDPR/CCPA), personal ownership records are held under privacy proxy protection.`,
    },
    {
      question: `When was ${data.domain} created and when will it expire?`,
      answer: `This domain was registered on ${data.createdDate.split("T")[0]} (${data.domainAgeFormatted} old) and is scheduled for renewal on ${data.expiresDate.split("T")[0]}.`,
    },
    {
      question: `What nameservers route traffic for ${data.domain}?`,
      answer: `Authoritative DNS resolution is handled by: ${data.nameservers.join(", ")}.`,
    },
    {
      question: `Is ${data.domain} a secure website?`,
      answer: `DNSSEC status is ${data.dnssec ? "active with cryptographic signing" : "standard"}. Domain age is ${data.domainAgeFormatted}, indicating an ${data.isNewDomain ? "emerging / newly created" : "established"} web property.`,
    },
  ];

  const guideSections = [
    {
      heading: `Registration Lifecycle & Trust Score for ${data.domain}`,
      body: `${data.domain} has been active for ${data.domainAgeFormatted}. Search engine ranking algorithms and web security firewalls analyze domain age and historical renewal continuity as fundamental trust metrics when evaluating domain credibility.`,
    },
    {
      heading: `Registrar & Autonomous DNS Routing`,
      body: `Managed under registrar ${data.registrar}, the domain relies on ${data.nameservers.length} authoritative nameserver clusters to route HTTP/HTTPS web requests and MX mail exchanger records.`,
    },
    {
      heading: "ICANN Redaction & Modern Privacy Protections",
      body: "Historical WHOIS protocols exposed raw administrator email addresses and physical home addresses to scrapers. Modern RDAP REST APIs enforce redaction, protecting domain holders from unsolicited spam and social engineering attacks.",
    },
    {
      heading: "Domain Renewal & Drop-Catching Procedures",
      body: "If a domain is not renewed before its expiration date, it enters a 30-day grace period followed by a 30-day redemption period before being deleted and made available for public registration.",
    },
  ];

  return (
    <ProgrammaticSeoWrapper
      title={`WHOIS Domain Intelligence: ${data.domain}`}
      subtitle={`Official ICANN RDAP registration records, registrar details (${data.registrar}), domain age (${data.domainAgeFormatted}), and DNS configuration.`}
      categoryName="WHOIS Lookup"
      categoryUrl="/lookup/whois"
      canonicalPath={`/whois/${encodeURIComponent(data.domain)}`}
      faqs={faqs}
      guideSections={guideSections}
      countryCode="US"
      vpnContext="whois"
      relatedSearches={[
        { label: "Search another domain", url: "/lookup/whois" },
        { label: "Check IP Geolocation", url: "/lookup/ip" },
        { label: "Check Password Breach", url: "/security/password" },
        { label: "Reverse Phone Lookup", url: "/lookup/phone" },
      ]}
    >
      <div className="space-y-6">
        <Card className="rounded-3xl border-2 border-primary/30 bg-card/90 backdrop-blur-md shadow-2xl overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/60 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <CardTitle className="text-2xl sm:text-3xl font-black text-foreground font-mono">
                    {data.domain}
                  </CardTitle>
                  {data.isNewDomain ? (
                    <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs font-bold rounded-full">
                      ⚠️ NEWLY REGISTERED
                    </Badge>
                  ) : (
                    <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs font-bold rounded-full">
                      ESTABLISHED ({data.domainAgeFormatted})
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Accredited Registrar: <strong className="text-foreground">{data.registrar}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Button asChild variant="outline" size="sm" className="rounded-xl text-xs font-semibold">
                  <Link href="/lookup/whois">
                    <Search className="mr-1.5 h-3.5 w-3.5" />
                    Lookup Another Domain
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6">
            {data.riskNotice && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300 text-xs font-medium">
                {data.riskNotice}
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Registration Date</span>
                <p className="text-sm sm:text-base font-bold text-foreground mt-1 truncate">
                  {data.createdDate.split("T")[0]}
                </p>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">{data.domainAgeFormatted}</span>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Expiration Date</span>
                <p className="text-sm sm:text-base font-bold text-foreground mt-1 truncate">
                  {data.expiresDate.split("T")[0]}
                </p>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">Renewal Deadline</span>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">DNSSEC Signature</span>
                <p className="text-sm sm:text-base font-bold text-foreground mt-1">
                  {data.dnssec ? "SIGNED & ACTIVE" : "UNSIGNED"}
                </p>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">
                  {data.dnssec ? "Protected against spoofing" : "Standard DNS"}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Registry Sync</span>
                <p className="text-sm sm:text-base font-bold text-foreground mt-1 truncate">
                  {data.updatedDate.split("T")[0]}
                </p>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">Last ICANN Update</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-border/50">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Nameserver Infrastructure
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.nameservers.map((ns, idx) => (
                  <Badge key={idx} variant="secondary" className="font-mono text-xs px-3 py-1 rounded-xl">
                    {ns}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProgrammaticSeoWrapper>
  );
}
