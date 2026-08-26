"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgrammaticSeoWrapper } from "@/components/seo/programmatic-seo-wrapper";
import {
  AlertTriangle,
  CheckCircle2,
  Database,
  Globe,
  Key,
  Loader2,
  Lock,
  Mail,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { checkEmailBreaches, type EmailBreachResult } from "@/lib/data/adapters/breach-adapter";

export default function EmailBreachHub() {
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmailBreachResult | null>(null);
  const [error, setError] = useState("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter an email address or username.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Local check with fallback
      const data = await checkEmailBreaches(email, apiKey);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Breach check failed.");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: "How do I know if my email address has been compromised in a breach?",
      answer: "When a service is hacked, attackers dump user databases containing email addresses, passwords, IP logs, and personal details. Our tool cross-references major breach records to inform you whether your account was exposed.",
    },
    {
      question: "What should I do immediately if my email appears in a breach?",
      answer: "1. Change the password for the compromised account immediately.\n2. If you reused that password anywhere else, change those accounts as well.\n3. Enable Two-Factor Authentication (2FA) with an authenticator app.\n4. Check your financial statements for unauthorized charges.",
    },
    {
      question: "Can I connect my own HaveIBeenPwned API key?",
      answer: "Yes! Toolzium includes an optional custom HIBP API key integration. If you have an HIBP key (~$3.75/mo), click 'Add Custom HIBP Key' to unlock full live real-time API queries. No key is required for free core scanning.",
    },
    {
      question: "Does checking my email on Toolzium compromise my privacy?",
      answer: "No. Toolzium does not sell, store, or log the email addresses you check. Searches are processed in memory and never distributed to third parties.",
    },
  ];

  const guideSections = [
    {
      heading: "The Anatomy of a Modern Corporate Data Breach",
      body: "Data breaches occur when adversaries exploit SQL injections, unpatched server vulnerabilities, or stolen employee credentials to exfiltrate database tables. Compromised dumps are traded on dark web forums and compiled into global aggregation lists.",
    },
    {
      heading: "Data Classes at Risk (Passwords, PII, Geolocation)",
      body: "Breaches expose varying degrees of sensitivity: from basic usernames and email addresses to unsalted SHA-1 password hashes, physical home addresses, phone numbers, and answers to security questions.",
    },
    {
      heading: "Preventing Account Takeover (ATO) Attacks",
      body: "Attackers automate credential stuffing across thousands of websites simultaneously. Using unique 16+ character passwords for every service ensures that a breach at one platform never compromises another.",
    },
    {
      heading: "Why You Should Audit Your Digital Footprint Regularly",
      body: "Security researchers recommend checking your email addresses every quarter to ensure you stay ahead of newly disclosed corporate compromises before threat actors weaponize your credentials.",
    },
  ];

  return (
    <ProgrammaticSeoWrapper
      title="Free Email & Account Data Breach Scanner"
      subtitle="Check if your email address or username was exposed in corporate data breaches. 100% free and privacy-protected."
      categoryName="Cybersecurity"
      categoryUrl="/tools"
      canonicalPath="/security/breach"
      faqs={faqs}
      guideSections={guideSections}
      countryCode="US"
      vpnContext="breach"
      relatedSearches={[
        { label: "Check Password Breach (k-Anonymity)", url: "/security/password" },
        { label: "IP Geolocation Lookup", url: "/lookup/ip" },
        { label: "Username OSINT Scanner", url: "/lookup/username" },
        { label: "Reverse Phone Scam Checker", url: "/lookup/phone" },
      ]}
    >
      <div className="space-y-6">
        <Card className="rounded-3xl border-2 border-primary/20 bg-gradient-to-b from-card to-background shadow-xl overflow-hidden">
          <CardContent className="p-6 sm:p-10 space-y-6">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-bold">
                <Database className="mr-1.5 h-3.5 w-3.5" />
                Community Database & Public Dumps
              </Badge>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Email Data Breach Scanner
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Check whether your email account was exposed in known data leaks. Free, instant, and privacy-safe.
              </p>
            </div>

            <form onSubmit={handleCheck} className="max-w-2xl mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-2 rounded-2xl border-2 border-primary/30 bg-card p-2 shadow-lg focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 transition-all">
                <div className="relative flex-1 w-full">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address (e.g. yourname@gmail.com)..."
                    className="w-full border-0 bg-transparent pl-10 text-sm sm:text-base text-foreground focus-visible:ring-0 shadow-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto rounded-xl px-6 font-bold gap-2 h-11 shrink-0"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  Scan Email
                </Button>
              </div>

              {/* Optional HIBP API Key Toggle */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setShowKeyInput(!showKeyInput)}
                  className="text-[11px] text-muted-foreground hover:text-primary underline transition-colors"
                >
                  {showKeyInput ? "Hide Custom HIBP Key Option" : "⚙️ Have a paid HaveIBeenPwned API key? (Optional)"}
                </button>
              </div>

              {showKeyInput && (
                <div className="max-w-md mx-auto p-3 rounded-2xl bg-muted/40 border border-border/60 space-y-2 text-xs animate-in fade-in-50">
                  <span className="font-semibold text-foreground block">
                    Custom HIBP v3 API Key (Optional ~$3.75/mo):
                  </span>
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Paste HIBP API key..."
                    className="rounded-xl h-9 text-xs font-mono"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    If you don&apos;t have a key, leave this blank. Toolzium will use the free community dataset.
                  </p>
                </div>
              )}
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
                      {result.emailOrUser}
                    </CardTitle>
                    <Badge
                      className={`text-xs font-bold px-3 py-0.5 rounded-full ${
                        result.breached
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                      }`}
                    >
                      {result.breached ? `PWNED IN ${result.breachesCount} BREACHES` : "NO BREACHES FOUND"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Public dump analysis complete.
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {result.breaches.length === 0 ? (
                <div className="p-6 text-center space-y-2">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                  <h4 className="font-bold text-foreground">No Breaches Detected in Public Datasets</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    This email address was not identified in known major public breach databases.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Disclosed Compromises ({result.breaches.length})
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {result.breaches.map((b, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-foreground">{b.name}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">{b.breachDate}</span>
                        </div>
                        <p className="text-muted-foreground text-[11px] leading-relaxed line-clamp-2">
                          {b.description}
                        </p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {b.dataClasses.map((dc, i) => (
                            <span key={i} className="text-[9px] font-semibold bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full">
                              {dc}
                            </span>
                          ))}
                        </div>
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
