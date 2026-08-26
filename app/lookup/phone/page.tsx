"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgrammaticSeoWrapper } from "@/components/seo/programmatic-seo-wrapper";
import { ReportButton } from "@/components/shared/report-button";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Copy,
  Globe,
  Loader2,
  Phone,
  PhoneCall,
  PhoneForwarded,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { PhoneLookupResult } from "@/lib/data/adapters/phone-adapter";

const POPULAR_PHONE_SAMPLES = [
  { label: "IRS Impersonation Scam", number: "+1 (800) 829-1040" },
  { label: "Apple Support (Verified)", number: "+1 (800) 275-2273" },
  { label: "Amazon Customer Service", number: "+1 (888) 280-4331" },
  { label: "Medicare Robocall Alert", number: "+1 (800) 633-4227" },
];

export default function PhoneLookupHub() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("US");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PhoneLookupResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleLookup = async (e?: React.FormEvent, overrideNum?: string) => {
    if (e) e.preventDefault();
    const query = (overrideNum || phoneNumber).trim();
    if (!query) {
      setError("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/lookup/phone?number=${encodeURIComponent(query)}&country=${country}`);
      if (!res.ok) {
        throw new Error("Lookup failed. Please check the number and try again.");
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed.");
    } finally {
      setLoading(false);
    }
  };

  const copyNumber = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.e164);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "How does the Free Reverse Phone Lookup identify scam numbers?",
      answer: "Our engine cross-references live telecommunications routing records, carrier line allocations (Mobile vs VoIP vs Landline), spam report databases, and community submissions. Numbers with high volumes of robocall complaints or suspicious virtual VoIP origins receive higher risk scores.",
    },
    {
      question: "Can I find out who called me from an unknown number?",
      answer: "Yes. By analyzing the area code, carrier network, and line type, Toolzium identifies the registered telecommunications operator, geographic origin, and spam risk level to help you decide whether it is safe to answer.",
    },
    {
      question: "Why do scammers frequently use VoIP numbers?",
      answer: "VoIP (Voice over IP) numbers allow operators to generate virtual phone numbers anywhere in the world and spoof caller IDs. Our scam checker detects VoIP gateways (e.g. Bandwidth, Twilio) and flags them with elevated caution scores.",
    },
    {
      question: "Is this reverse phone lookup 100% free with no credit card?",
      answer: "Yes. Unlike commercial lookup sites that demand expensive recurring subscriptions after a search, Toolzium is completely free and privacy-friendly. We do not store or sell your search history.",
    },
  ];

  const guideSections = [
    {
      heading: "Understanding Phone Scam Scores & Telephony Signals",
      body: "Modern scam operations rely heavily on automated dialers (robocalls) and dynamic Caller ID spoofing. Our risk assessment combines carrier metadata (whether a number is a physical mobile SIM, landline, or disposable virtual VoIP) with aggregated FTC complaints and user reports to calculate a 0–100 risk score.",
    },
    {
      heading: "How to Protect Yourself from Phone Scams & Identity Theft",
      body: "Never disclose one-time passwords (2FA), banking PINs, or Social Security numbers over unexpected inbound calls. Legitimate institutions like the IRS and major banks never demand immediate payment via gift cards or wire transfers.",
    },
    {
      heading: "VoIP vs Mobile vs Landline Numbers",
      body: "Physical mobile and landline numbers require identity verification with carriers like Verizon and AT&T. VoIP virtual numbers can be provisioned in seconds via software APIs, making them the primary conduit for international robocall centers.",
    },
    {
      heading: "Reporting Spam Calls to Consumer Protection Agencies",
      body: "In the United States, consumers can register on the National Do Not Call Registry (donotcall.gov) and file official complaints with the Federal Communications Commission (FCC) and FTC to help regulatory bodies shut down illegal telephony gateways.",
    },
  ];

  return (
    <ProgrammaticSeoWrapper
      title="Free Reverse Phone Lookup & Scam Call Checker"
      subtitle="Identify who called you, detect robocalls, inspect carrier and line type, and check live community scam reports. 100% free with zero signup."
      categoryName="Security & Lookup"
      categoryUrl="/tools"
      canonicalPath="/lookup/phone"
      faqs={faqs}
      guideSections={guideSections}
      countryCode="US"
      vpnContext="phone"
      relatedSearches={[
        { label: "Who called me from +1 (800) 275-2273?", url: "/phone/%2B18002752273" },
        { label: "Check IRS Scam +1 (800) 829-1040", url: "/phone/%2B18008291040" },
        { label: "Amazon Customer Care Number", url: "/phone/%2B18882804331" },
        { label: "IP Geolocation Lookup", url: "/lookup/ip" },
        { label: "WHOIS Domain Checker", url: "/lookup/whois" },
      ]}
    >
      <div className="space-y-6">
        {/* Hero Card */}
        <Card className="rounded-3xl border-2 border-primary/20 bg-gradient-to-b from-card to-background shadow-xl overflow-hidden">
          <CardContent className="p-6 sm:p-10 space-y-6">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-bold">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                US + International Coverage
              </Badge>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Reverse Phone Lookup & Scam Checker
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Enter any phone number to uncover carrier, line type, spam probability, and whether it is safe to answer.
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleLookup} className="max-w-2xl mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-2 rounded-2xl border-2 border-primary/30 bg-card p-2 shadow-lg focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 transition-all">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/60 rounded-xl border border-border/60 shrink-0">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="bg-transparent text-xs font-bold text-foreground focus:outline-none cursor-pointer"
                    aria-label="Select Country"
                  >
                    <option value="US">🇺🇸 US (+1)</option>
                    <option value="CA">🇨🇦 CA (+1)</option>
                    <option value="GB">🇬🇧 UK (+44)</option>
                    <option value="AU">🇦🇺 AU (+61)</option>
                    <option value="DE">🇩🇪 DE (+49)</option>
                  </select>
                </div>

                <div className="relative flex-1 w-full">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number (e.g. 800-275-2273 or +18005550199)..."
                    className="w-full border-0 bg-transparent pl-9 text-sm sm:text-base text-foreground focus-visible:ring-0 shadow-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto rounded-xl px-6 font-bold gap-2 h-11 shrink-0"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PhoneCall className="h-4 w-4" />}
                  Check Number
                </Button>
              </div>

              {/* Sample Queries */}
              <div className="flex items-center gap-1.5 flex-wrap justify-center text-xs text-muted-foreground pt-1">
                <span>Try sample:</span>
                {POPULAR_PHONE_SAMPLES.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPhoneNumber(sample.number);
                      handleLookup(undefined, sample.number);
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
                    <CardTitle className="text-xl sm:text-2xl font-black text-foreground">
                      {result.formattedNumber}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        result.safeToAnswer
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                      }`}
                    >
                      {result.safeToAnswer ? "SAFE TO ANSWER" : "POTENTIAL SCAM"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Canonical E.164: <code className="font-mono">{result.e164}</code> • Country: {result.countryName}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Button variant="outline" size="sm" onClick={copyNumber} className="rounded-xl text-xs">
                    <Copy className="mr-1.5 h-3.5 w-3.5" />
                    {copied ? "Copied" : "Copy E.164"}
                  </Button>
                  <ReportButton
                    entity={result.e164}
                    type="phone"
                    buttonText="Report this Number"
                    variant="destructive"
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => router.push(`/phone/${encodeURIComponent(result.e164)}`)}
                    className="rounded-xl text-xs font-bold gap-1"
                  >
                    <span>Permanent Report Page</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Spam Risk Score</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className={`text-2xl font-black ${result.riskScore >= 70 ? "text-rose-500" : result.riskScore >= 40 ? "text-amber-500" : "text-emerald-500"}`}>
                      {result.riskScore}
                    </span>
                    <span className="text-xs text-muted-foreground">/ 100</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">{result.spamLevel}</span>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Carrier Operator</span>
                  <p className="text-sm font-bold text-foreground mt-1 truncate">{result.carrier}</p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">Telephony Network</span>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Line Type</span>
                  <p className="text-sm font-bold text-foreground mt-1">{result.lineType}</p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">
                    {result.lineType === "VoIP / Virtual" ? "⚠️ Virtual / High Spoofing Risk" : "Physical Allocation"}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Community Reports</span>
                  <p className="text-sm font-bold text-foreground mt-1">{result.totalReports} reports</p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">Aggregated Complaints</span>
                </div>
              </div>

              {/* Breakdown Categories */}
              {result.complaintCategories.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border/50">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Complaint Categories Breakdown
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {result.complaintCategories.map((cat, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-muted/30 border border-border/50 text-xs">
                        <span className="text-muted-foreground font-medium">{cat.name}</span>
                        <Badge variant="secondary" className="font-mono text-[10px]">
                          {cat.count} reports
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </ProgrammaticSeoWrapper>
  );
}
