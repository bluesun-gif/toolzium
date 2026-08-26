"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgrammaticSeoWrapper } from "@/components/seo/programmatic-seo-wrapper";
import { RecommendedVpnCta } from "@/components/monetization/recommended-vpn-cta";
import {
  AlertTriangle,
  CheckCircle2,
  Mail,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Loader2,
  Server,
  FileText,
  KeyRound,
} from "lucide-react";
import type { EmailSecurityResult } from "@/lib/data/adapters/email-security-adapter";

export default function EmailSecurityHub() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmailSecurityResult | null>(null);
  const [error, setError] = useState("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) {
      setError("Please enter a domain (e.g. gmail.com) or email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/security/email-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      if (!res.ok) throw new Error("Email check failed. Please try again.");
      setResult(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Check failed.");
    } finally {
      setLoading(false);
    }
  };

  const gradeColor =
    result?.deliverabilityGrade === "A"
      ? "bg-green-500/15 text-green-400 border-green-500/30"
      : result?.deliverabilityGrade === "B"
      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
      : result?.deliverabilityGrade === "C"
      ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
      : "bg-red-500/15 text-red-400 border-red-500/30";

  const faqs = [
    {
      question: "What is SPF, DKIM, and DMARC and why do they matter?",
      answer:
        "SPF (Sender Policy Framework) lists servers authorized to send mail for your domain. DKIM cryptographically signs messages. DMARC ties them together and tells receivers what to do with failed mail. Together they prevent attackers from spoofing your domain in phishing and CEO-fraud attacks.",
    },
    {
      question: "How do I know if an email domain is disposable or risky?",
      answer:
        "Disposable domains (mailinator, tempmail, yopmail) are temporary and heavily abused for spam and fake signups. Toolzium cross-references a curated abuse dataset and flags them with a grade of 'F' so you never trust them for account verification, payments, or leads.",
    },
    {
      question: "Why is my domain getting emails sent to spam?",
      answer:
        "Missing or misconfigured SPF/DMARC/DKIM is the #1 cause. Without them, Gmail, Outlook, and Apple Mail treat your mail as unauthenticated and route it to spam. Run this scan, apply the listed DNS records, and re-test.",
    },
    {
      question: "Is this domain email security check 100% free?",
      answer:
        "Yes. Toolzium queries live DNS-over-HTTPS records in real time — no API key, no account, no cost. Every MX, SPF, and DMARC result is authentic and current.",
    },
  ];

  const guideSections = [
    {
      heading: "The Anatomy of Email Spoofing & BEC Attacks",
      body:
        "Business Email Compromise (BEC) costs organizations billions annually. Attackers forge the 'From' header using domains with no DMARC enforcement, impersonating executives to divert wire transfers. A single missing DMARC record is an open door.",
    },
    {
      heading: "Reading Your DNS Results",
      body:
        "MX records route inbound mail. SPF authorizes senders. DMARC (at _dmarc.yourdomain) sets the enforcement policy: none (monitor), quarantine, or reject. DKIM keys live at selector._domainkey.yourdomain.",
    },
    {
      heading: "Achieving a Grade-A Deliverability Posture",
      body:
        "Publish valid MX, a scoped SPF (~all for testing, -all for enforcement), DKIM signing via your provider, and a DMARC policy that escalates from p=none to p=reject after 30 days of clean reports.",
    },
  ];

  return (
    <ProgrammaticSeoWrapper
      title="Free Email Domain Security Scanner — SPF, DKIM & DMARC Checker"
      subtitle="Instantly audit any domain's email authentication: MX records, SPF, DMARC, DKIM, and disposable-email risk. 100% free, live DNS, no API key."
      categoryName="Cybersecurity"
      categoryUrl="/tools"
      canonicalPath="/security/email"
      faqs={faqs}
      guideSections={guideSections}
      countryCode="US"
      vpnContext="breach"
      relatedSearches={[
        { label: "Email & Account Breach Scanner", url: "/security/breach" },
        { label: "Password Breach Checker", url: "/security/password" },
        { label: "WHOIS & RDAP Domain Intelligence", url: "/lookup/whois" },
        { label: "SSL Certificate Scanner", url: "/security/ssl" },
      ]}
    >
      <div className="space-y-6">
        <Card className="rounded-3xl border-2 border-primary/20 bg-gradient-to-b from-card to-background shadow-xl overflow-hidden">
          <CardContent className="p-6 sm:p-10 space-y-6">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-bold">
                <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                Live DNS-over-HTTPS · No API Key · 100% Free
              </Badge>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Email Domain Security & Deliverability Scanner
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Check any domain's SPF, DKIM, DMARC, MX records, and disposable-email risk in
                seconds. Protect your brand from spoofing and stop landing in spam.
              </p>
            </div>

            <form onSubmit={handleCheck} className="max-w-2xl mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="gmail.com or user@company.com"
                    className="pl-9 h-12 rounded-xl"
                  />
                </div>
                <Button type="submit" disabled={loading} className="h-12 px-6 rounded-xl">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  {loading ? "Scanning…" : "Scan Domain"}
                </Button>
              </div>
              {error && (
                <p className="text-xs text-red-400 text-center flex items-center justify-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> {error}
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-4">
            <Card className="rounded-3xl border-2 border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Server className="h-5 w-5 text-primary" /> {result.domain}
                </CardTitle>
                <Badge className={`rounded-full px-4 py-1.5 text-sm font-bold ${gradeColor}`}>
                  Grade {result.deliverabilityGrade}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatusTile label="MX Records" ok={result.hasMx} text={result.hasMx ? `${result.mx.length} found` : "Missing"} />
                  <StatusTile label="SPF" ok={result.hasSpf} text={result.hasSpf ? "Configured" : "Missing"} />
                  <StatusTile label="DMARC" ok={result.hasDmarc} text={result.hasDmarc ? "Configured" : "Missing"} />
                  <StatusTile label="DKIM" ok={result.dkimSelectors.length > 0} text={result.dkimSelectors.length > 0 ? `${result.dkimSelectors.length} key(s)` : "Not found"} />
                </div>

                {result.mailProvider && (
                  <p className="text-sm text-muted-foreground">
                    Detected provider: <span className="text-foreground font-medium">{result.mailProvider}</span>
                  </p>
                )}

                {result.mx.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Mail Exchangers (MX)</p>
                    <div className="space-y-1">
                      {result.mx.map((m, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm font-mono">
                          <span className="text-primary">P{m.priority}</span>
                          <span>{m.host}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.spf && (
                  <RecordRow icon={FileText} label="SPF" value={result.spf} />
                )}
                {result.dmarc && (
                  <RecordRow icon={FileText} label="DMARC" value={result.dmarc} />
                )}
                {result.dkimSelectors.length > 0 && (
                  <RecordRow icon={KeyRound} label="DKIM Selectors" value={result.dkimSelectors.join(", ")} />
                )}

                {result.isDisposable && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    <ShieldAlert className="h-4 w-4 mt-0.5 shrink-0" />
                    Disposable / temporary email domain detected — high abuse & spam risk.
                  </div>
                )}

                {result.warnings.length > 0 && (
                  <div className="space-y-2">
                    {result.warnings.map((w, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-amber-400">
                        <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" /> {w}
                      </div>
                    ))}
                  </div>
                )}

                {result.recommendations.length > 0 && (
                  <div className="space-y-2 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="text-xs font-bold text-primary flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Recommended Fixes
                    </p>
                    {result.recommendations.map((r, i) => (
                      <p key={i} className="text-sm text-muted-foreground">{r}</p>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <RecommendedVpnCta context="breach" />
          </div>
        )}
      </div>
    </ProgrammaticSeoWrapper>
  );
}

function StatusTile({ label, ok, text }: { label: string; ok: boolean; text: string }) {
  return (
    <div className={`p-3 rounded-xl border ${ok ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}>
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`text-sm font-bold flex items-center gap-1 ${ok ? "text-green-400" : "text-red-400"}`}>
        {ok ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
        {text}
      </p>
    </div>
  );
}

function RecordRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-muted/30 border border-border">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground flex items-center gap-1 mb-1">
        <Icon className="h-3 w-3" /> {label}
      </p>
      <p className="text-xs font-mono break-all text-foreground">{value}</p>
    </div>
  );
}
