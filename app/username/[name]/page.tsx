import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { scanUsername } from "@/lib/data/adapters/username-adapter";
import { ProgrammaticSeoWrapper } from "@/components/seo/programmatic-seo-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  AtSign,
  ExternalLink,
  Search,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";
import { siteURL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const decoded = decodeURIComponent(name).replace(/^@/, "");
  const data = await scanUsername(decoded);

  const title = `Username @${data.username} — Social Media Profiles & Handle Availability`;
  const description = `Is @${data.username} taken on GitHub, Twitter, Instagram, Reddit, TikTok, or Twitch? Free username OSINT scan found ${data.foundCount} claimed profiles and ${data.availableCount} available platforms.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteURL}/username/${encodeURIComponent(data.username)}`,
      siteName: "Toolzium",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${siteURL}/username/${encodeURIComponent(data.username)}`,
    },
  };
}

export default async function UsernameProgrammaticPage({ params }: PageProps) {
  const { name } = await params;
  const decoded = decodeURIComponent(name).replace(/^@/, "");
  const data = await scanUsername(decoded);

  const faqs = [
    {
      question: `Is the username @${data.username} available on major platforms?`,
      answer: `Out of ${data.totalPlatforms} scanned networks, @${data.username} is registered on ${data.foundCount} platforms and appears available on ${data.availableCount} networks.`,
    },
    {
      question: `How can I reserve @${data.username} across all social media accounts?`,
      answer: `Click any available platform in the matrix below to navigate directly to that network's signup portal and claim your brand handle before someone else takes it.`,
    },
    {
      question: `Can multiple people own the username @${data.username} on different platforms?`,
      answer: `Yes. Each network (GitHub, X, Reddit, TikTok) operates an independent user namespace. An identity on one network does not automatically confer ownership on another.`,
    },
    {
      question: `How do I protect my digital footprint associated with @${data.username}?`,
      answer: `If you wish to maintain privacy, avoid reusing the same username across personal blogs, developer code repositories, and anonymous forum discussions.`,
    },
  ];

  const guideSections = [
    {
      heading: `Digital Footprint & Handle Presence for @${data.username}`,
      body: `Cross-network handle scans reveal public profile distribution for @${data.username}. In the digital identity landscape, consistent handles strengthen search discoverability and personal branding while increasing susceptibility to cross-platform correlation.`,
    },
    {
      heading: "Namespace Reservation & Brand Protection",
      body: "Startups and influencers typically reserve handles early across primary platforms (GitHub, Twitter/X, Instagram, TikTok, LinkedIn, YouTube) to prevent handle squatting and trademark impersonation.",
    },
    {
      heading: "OSINT Profiling & Privacy Hygiene",
      body: "Security analysts correlate public activity logs, commit timestamps, and profile bios across matching handles to verify authentic creators and detect imposter accounts.",
    },
    {
      heading: "Action Plan for Securing Handles",
      body: "1. Register handles on tier-1 platforms immediately.\n2. Enable two-factor authentication (2FA) with an authenticator app on every profile.\n3. Link verified domain records (rel=me) to confirm legitimate ownership.",
    },
  ];

  return (
    <ProgrammaticSeoWrapper
      title={`Username OSINT Scan: @${data.username}`}
      subtitle={`Comprehensive social media handle availability, developer profile detection, and public footprint matrix for @${data.username}.`}
      categoryName="Username OSINT"
      categoryUrl="/lookup/username"
      canonicalPath={`/username/${encodeURIComponent(data.username)}`}
      faqs={faqs}
      guideSections={guideSections}
      countryCode="US"
      vpnContext="general"
      relatedSearches={[
        { label: "Scan another username", url: "/lookup/username" },
        { label: "Check Email Breach", url: "/security/breach" },
        { label: "IP Geolocation Lookup", url: "/lookup/ip" },
        { label: "Reverse Phone Lookup", url: "/lookup/phone" },
      ]}
    >
      <div className="space-y-6">
        <Card className="rounded-3xl border-2 border-primary/30 bg-card/90 backdrop-blur-md shadow-2xl overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/60 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <CardTitle className="text-2xl sm:text-3xl font-black text-foreground">
                    @{data.username}
                  </CardTitle>
                  <Badge variant="outline" className="font-semibold text-xs rounded-full">
                    {data.foundCount} Claimed • {data.availableCount} Available
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Scanned across {data.totalPlatforms} major social & developer ecosystems.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Button asChild variant="outline" size="sm" className="rounded-xl text-xs font-semibold">
                  <Link href="/lookup/username">
                    <Search className="mr-1.5 h-3.5 w-3.5" />
                    Scan Another Username
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.platforms.map((p) => (
                <div
                  key={p.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    p.status === "FOUND"
                      ? "bg-muted/30 border-border/70"
                      : "bg-emerald-500/5 border-emerald-500/20"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">{p.icon}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-foreground truncate">{p.name}</span>
                        <span className="text-[9px] text-muted-foreground uppercase">{p.category}</span>
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground truncate block">
                        @{data.username}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {p.status === "FOUND" ? (
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-bold">
                        CLAIMED
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px] font-bold">
                        AVAILABLE
                      </Badge>
                    )}

                    <a
                      href={p.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                      title={`Open ${p.name}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProgrammaticSeoWrapper>
  );
}
