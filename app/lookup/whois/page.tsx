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
  Calendar,
  Copy,
  Globe,
  Loader2,
  Lock,
  Search,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { WhoisLookupResult } from "@/lib/data/adapters/whois-adapter";

const SAMPLE_DOMAINS = [
  { label: "Google.com", domain: "google.com" },
  { label: "Github.com", domain: "github.com" },
  { label: "OpenAI.com", domain: "openai.com" },
  { label: "Vercel.com", domain: "vercel.com" },
];

export default function WhoisLookupHub() {
  const router = useRouter();
  const [domainInput, setDomainInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WhoisLookupResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleLookup = async (e?: React.FormEvent, overrideDomain?: string) => {
    if (e) e.preventDefault();
    const query = (overrideDomain || domainInput).trim();
    if (!query) {
      setError("Please enter a valid domain name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/lookup/whois?domain=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("WHOIS lookup failed. Please verify the domain name.");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed.");
    } finally {
      setLoading(false);
    }
  };

  const copyDomain = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.domain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What is the difference between legacy WHOIS and modern RDAP?",
      answer: "RDAP (Registration Data Access Protocol) is the modern, secure RESTful successor to legacy WHOIS standardized by ICANN. It delivers structured JSON data with GDPR privacy compliance, standardized error handling, and cryptographic authentication.",
    },
    {
      question: "Why are domain registrant contact details redacted?",
      answer: "Under global data privacy laws like the EU GDPR and California CCPA, domain registrars automatically redact personal registrant names, home addresses, and personal phone numbers to prevent identity theft and spam.",
    },
    {
      question: "How can I tell if a domain is brand new or established?",
      answer: "Our tool parses the original ICANN registration timestamp and calculates the exact domain age. Domains registered within the last 30 days are automatically highlighted with security caution badges as new domains have higher correlation with phishing campaigns.",
    },
    {
      question: "Can I check expiration dates to register expiring domains?",
      answer: "Yes. The expiration event shows the exact UTC timestamp when a domain must be renewed by its owner or face redemption and public drop-catching.",
    },
  ];

  const guideSections = [
    {
      heading: "How ICANN RDAP & Domain Registries Operate",
      body: "Top-Level Domain (TLD) registries like Verisign (.com) and PIR (.org) maintain authoritative databases of registered names. Registrars (e.g. Cloudflare, GoDaddy, Namecheap) communicate through RDAP protocol to provision DNS records and manage domain ownership lifecycles.",
    },
    {
      heading: "Domain Age & Trust Factors in Cybersecurity",
      body: "Security analysts and search engines view domain age as a critical trust signal. Threat actors frequently register disposable domains to execute short-lived phishing, malware distribution, or spam campaigns before abandoning them.",
    },
    {
      heading: "Understanding Nameservers & DNSSEC",
      body: "Authoritative nameservers resolve human-readable domains into machine IP addresses. DNSSEC (Domain Name System Security Extensions) adds cryptographic signatures to DNS records to prevent DNS spoofing and cache poisoning attacks.",
    },
    {
      heading: "ICANN Domain Status Codes",
      body: "Codes like 'clientTransferProhibited' prevent unauthorized domain hijacking between registrars, while 'clientDeleteProhibited' ensures a domain cannot be accidentally deleted by administrative mistakes.",
    },
  ];

  return (
    <ProgrammaticSeoWrapper
      title="Free WHOIS & RDAP Domain Intelligence Lookup"
      subtitle="Inspect domain registration dates, registrar authority, nameservers, DNSSEC security, and domain age for any web address. 100% free."
      categoryName="Web & Domain Intelligence"
      categoryUrl="/tools"
      canonicalPath="/lookup/whois"
      faqs={faqs}
      guideSections={guideSections}
      countryCode="US"
      vpnContext="whois"
      relatedSearches={[
        { label: "Inspect google.com", url: "/whois/google.com" },
        { label: "Inspect github.com", url: "/whois/github.com" },
        { label: "IP Geolocation Lookup", url: "/lookup/ip" },
        { label: "Reverse Phone Lookup", url: "/lookup/phone" },
      ]}
    >
      <div className="space-y-6">
        <Card className="rounded-3xl border-2 border-primary/20 bg-gradient-to-b from-card to-background shadow-xl overflow-hidden">
          <CardContent className="p-6 sm:p-10 space-y-6">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-bold">
                <Globe className="mr-1.5 h-3.5 w-3.5" />
                ICANN RDAP REST Protocol
              </Badge>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                WHOIS & Domain Intelligence Lookup
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Check registrar ownership, domain age, expiration dates, nameservers, and security status for any domain.
              </p>
            </div>

            <form onSubmit={handleLookup} className="max-w-2xl mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-2 rounded-2xl border-2 border-primary/30 bg-card p-2 shadow-lg focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 transition-all">
                <div className="relative flex-1 w-full">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    placeholder="Enter domain name (e.g. toolzium.com or stripe.com)..."
                    className="w-full border-0 bg-transparent pl-10 text-sm sm:text-base text-foreground focus-visible:ring-0 shadow-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto rounded-xl px-6 font-bold gap-2 h-11 shrink-0"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  Lookup Domain
                </Button>
              </div>

              {/* Sample Queries */}
              <div className="flex items-center gap-1.5 flex-wrap justify-center text-xs text-muted-foreground pt-1">
                <span>Try sample:</span>
                {SAMPLE_DOMAINS.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setDomainInput(sample.domain);
                      handleLookup(undefined, sample.domain);
                    }}
                    className="text-[11px] underline underline-offset-2 hover:text-primary transition-colors"
                  >
                    {sample.label}
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
                    <CardTitle className="text-xl sm:text-2xl font-black text-foreground font-mono">
                      {result.domain}
                    </CardTitle>
                    {result.isNewDomain ? (
                      <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs font-bold rounded-full">
                        ⚠️ NEWLY REGISTERED (&lt;30 DAYS)
                      </Badge>
                    ) : (
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs font-bold rounded-full">
                        ESTABLISHED DOMAIN ({result.domainAgeFormatted})
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Registrar: <strong className="text-foreground">{result.registrar}</strong> {result.ianaId ? `(IANA ID: ${result.ianaId})` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Button variant="outline" size="sm" onClick={copyDomain} className="rounded-xl text-xs">
                    <Copy className="mr-1.5 h-3.5 w-3.5" />
                    {copied ? "Copied" : "Copy Domain"}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => router.push(`/whois/${encodeURIComponent(result.domain)}`)}
                    className="rounded-xl text-xs font-bold gap-1"
                  >
                    <span>Permanent WHOIS Report</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {result.riskNotice && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300 text-xs font-medium">
                  {result.riskNotice}
                </div>
              )}

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Registered On</span>
                  <p className="text-xs sm:text-sm font-bold text-foreground mt-1 truncate">
                    {result.createdDate.split("T")[0]}
                  </p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">{result.domainAgeFormatted}</span>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Expires On</span>
                  <p className="text-xs sm:text-sm font-bold text-foreground mt-1 truncate">
                    {result.expiresDate.split("T")[0]}
                  </p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">Renewal Deadline</span>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">DNSSEC Security</span>
                  <p className="text-sm font-bold text-foreground mt-1">
                    {result.dnssec ? "SIGNED & ACTIVE" : "UNSIGNED"}
                  </p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">
                    {result.dnssec ? "Cryptographically Protected" : "Standard DNS"}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Last Updated</span>
                  <p className="text-xs sm:text-sm font-bold text-foreground mt-1 truncate">
                    {result.updatedDate.split("T")[0]}
                  </p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">Registry Sync</span>
                </div>
              </div>

              {/* Nameservers */}
              <div className="space-y-2 pt-2 border-t border-border/50">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Authoritative Nameservers
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.nameservers.map((ns, idx) => (
                    <Badge key={idx} variant="secondary" className="font-mono text-xs px-3 py-1 rounded-xl">
                      {ns}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ProgrammaticSeoWrapper>
  );
}
