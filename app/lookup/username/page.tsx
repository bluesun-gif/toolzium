"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgrammaticSeoWrapper } from "@/components/seo/programmatic-seo-wrapper";
import {
  AlertTriangle,
  ArrowRight,
  AtSign,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Search,
  Sparkles,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";
import type { UsernameScanResult, SocialPlatformCheck } from "@/lib/data/adapters/username-adapter";

const SAMPLE_USERNAMES = ["alex", "tanvir", "sarah", "dev", "crypto"];

export default function UsernameLookupHub() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UsernameScanResult | null>(null);
  const [filter, setFilter] = useState<"ALL" | "FOUND" | "AVAILABLE">("ALL");
  const [error, setError] = useState("");

  const handleScan = async (e?: React.FormEvent, overrideName?: string) => {
    if (e) e.preventDefault();
    const query = (overrideName || username).trim().replace(/^@/, "");
    if (!query) {
      setError("Please enter a username to scan.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/lookup/username?username=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Username scan failed. Please try again.");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPlatforms = (result?.platforms || []).filter((p) => {
    if (filter === "FOUND") return p.status === "FOUND";
    if (filter === "AVAILABLE") return p.status === "AVAILABLE";
    return true;
  });

  const faqs = [
    {
      question: "How does the Username OSINT tool check profile availability across 20+ networks?",
      answer: "Our engine executes parallel HTTP status queries against public profile URL endpoints (e.g. github.com/user, reddit.com/user/name) without requiring private API keys or credentials.",
    },
    {
      question: "Can I use this tool to claim an identical username across all social media platforms?",
      answer: "Yes! Content creators, startups, and developers use this tool during branding to check username availability simultaneously across GitHub, Twitter/X, Reddit, TikTok, Instagram, Twitch, Product Hunt, and YouTube.",
    },
    {
      question: "Is searching for public usernames legal and compliant?",
      answer: "Yes. All lookups inspect publicly accessible web profiles (WhatIsMyName open-source model) and strictly adhere to non-intrusive open-source intelligence (OSINT) standards without scraping private non-public data.",
    },
    {
      question: "Why do some platforms show false positives?",
      answer: "Certain social networks (like Instagram or TikTok) dynamically serve 200 HTTP codes or anti-bot challenge pages even for unregistered handles. Direct verification links are provided for manual confirmation.",
    },
  ];

  const guideSections = [
    {
      heading: "Open-Source Intelligence (OSINT) & Digital Identity Footprinting",
      body: "Username reuse is one of the most prevalent patterns across the internet. Security professionals and investigators use cross-platform username correlation to map public digital footprints and assess impersonation vulnerabilities.",
    },
    {
      heading: "Branding & Social Handle Reservation Strategies",
      body: "When launching a new company or personal brand, securing consistent handles across developer ecosystems (GitHub, GitLab), media channels (YouTube, TikTok), and community boards (Reddit) is vital for brand coherence and SEO search visibility.",
    },
    {
      heading: "Protecting Yourself from Username Correlation & Doxxing",
      body: "If you use the same unique username for both public developer forums and personal social accounts, third parties can easily link your real-world identity to technical discussions. Using distinct aliases helps maintain compartmentalized privacy.",
    },
    {
      heading: "Platform Status Codes (200 vs 404 vs 403)",
      body: "A 200 OK status indicates an active public profile. A 404 Not Found indicates the handle is unclaimed and ready for registration. A 403 Forbidden indicates rate-limiting or region-locked profile settings.",
    },
  ];

  return (
    <ProgrammaticSeoWrapper
      title="Free Username OSINT & Social Profile Availability Scanner"
      subtitle="Search across 20+ social media networks, developer platforms, and gaming communities to find profiles and check handle availability. 100% free."
      categoryName="OSINT & Identity"
      categoryUrl="/tools"
      canonicalPath="/lookup/username"
      faqs={faqs}
      guideSections={guideSections}
      countryCode="US"
      vpnContext="general"
      relatedSearches={[
        { label: "Email Breach Scanner", url: "/security/breach" },
        { label: "Check Password Breach", url: "/security/password" },
        { label: "IP Geolocation Lookup", url: "/lookup/ip" },
        { label: "Reverse Phone Lookup", url: "/lookup/phone" },
      ]}
    >
      <div className="space-y-6">
        <Card className="rounded-3xl border-2 border-primary/20 bg-gradient-to-b from-card to-background shadow-xl overflow-hidden">
          <CardContent className="p-6 sm:p-10 space-y-6">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-bold">
                <Users className="mr-1.5 h-3.5 w-3.5" />
                Cross-Platform Social OSINT
              </Badge>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Username Search & Social Availability
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Scan GitHub, X, Reddit, Instagram, TikTok, Twitch, Medium, and 20+ platforms simultaneously for any username.
              </p>
            </div>

            <form onSubmit={handleScan} className="max-w-2xl mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-2 rounded-2xl border-2 border-primary/30 bg-card p-2 shadow-lg focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 transition-all">
                <div className="relative flex-1 w-full">
                  <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username (e.g. tanvir or alex)..."
                    className="w-full border-0 bg-transparent pl-10 text-sm sm:text-base text-foreground focus-visible:ring-0 shadow-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto rounded-xl px-6 font-bold gap-2 h-11 shrink-0"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  Scan Username
                </Button>
              </div>

              {/* Sample Queries */}
              <div className="flex items-center gap-1.5 flex-wrap justify-center text-xs text-muted-foreground pt-1">
                <span>Try sample handle:</span>
                {SAMPLE_USERNAMES.map((name, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setUsername(name);
                      handleScan(undefined, name);
                    }}
                    className="text-[11px] underline underline-offset-2 hover:text-primary transition-colors font-mono"
                  >
                    @{name}
                  </button>
                ))}
              </div>
            </form>

            {error && (
              <div className="max-w-2xl mx-auto p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Card */}
        {result && (
          <Card className="rounded-3xl border-2 border-primary/30 bg-card/90 backdrop-blur-md shadow-2xl overflow-hidden animate-in fade-in-50 duration-300">
            <CardHeader className="bg-muted/30 border-b border-border/60 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CardTitle className="text-xl sm:text-2xl font-black text-foreground">
                      @{result.username}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs font-semibold rounded-full">
                      {result.foundCount} Taken • {result.availableCount} Available
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Scanned across {result.totalPlatforms} major social & developer networks.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Filter Pills */}
                  <div className="inline-flex bg-muted/60 p-1 rounded-xl border border-border/60 text-xs">
                    <button
                      onClick={() => setFilter("ALL")}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${filter === "ALL" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground"}`}
                    >
                      All ({result.totalPlatforms})
                    </button>
                    <button
                      onClick={() => setFilter("FOUND")}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${filter === "FOUND" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold" : "text-muted-foreground"}`}
                    >
                      Found ({result.foundCount})
                    </button>
                    <button
                      onClick={() => setFilter("AVAILABLE")}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${filter === "AVAILABLE" ? "bg-primary/15 text-primary font-bold" : "text-muted-foreground"}`}
                    >
                      Available ({result.availableCount})
                    </button>
                  </div>

                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => router.push(`/username/${encodeURIComponent(result.username)}`)}
                    className="rounded-xl text-xs font-bold gap-1"
                  >
                    <span>Permanent Report</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPlatforms.map((p) => (
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
                          @{result.username}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {p.status === "FOUND" ? (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-bold">
                          TAKEN
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
                        title={`Open ${p.name} profile`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ProgrammaticSeoWrapper>
  );
}
