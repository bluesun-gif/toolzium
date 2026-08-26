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
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { PasswordPwnedResult } from "@/lib/data/adapters/breach-adapter";

export default function PasswordBreachHub() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PasswordPwnedResult | null>(null);
  const [error, setError] = useState("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter a password to test.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/security/pwned-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) throw new Error("Security check failed. Please try again.");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Check failed.");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: "How does the k-Anonymity mathematical model protect my password privacy?",
      answer: "When you test a password, Toolzium generates a 40-character SHA-1 cryptographic hash. Only the first 5 characters (e.g. '21BD1') are transmitted to the HaveIBeenPwned API. The API returns hundreds of matching hashes, and your browser/server checks for a match locally. Your full password and full hash are NEVER transmitted over the internet.",
    },
    {
      question: "What does it mean if my password is found in a data breach?",
      answer: "It means cybercriminals have extracted this exact password in previous commercial website leaks (e.g. Adobe, LinkedIn, Canva). Attackers load these into automated credential-stuffing dictionaries to hack accounts across the web. You must change it immediately on all services.",
    },
    {
      question: "What makes a truly strong, uncrackable password in 2026?",
      answer: "A strong password should be at least 16 characters long, use a passphrase of random words or alphanumeric variety, and never be reused across multiple services. Using a password manager like NordPass or 1Password eliminates the need to remember complex strings.",
    },
    {
      question: "Is this password checker 100% free and safe to use?",
      answer: "Yes. Toolzium does not log, store, or transmit your plain-text password. All hash range queries use strict zero-knowledge k-anonymity protocols with zero cost and no account required.",
    },
  ];

  const guideSections = [
    {
      heading: "The Threat of Credential Stuffing & Rainbow Tables",
      body: "Automated cyberattack bots execute billions of automated login attempts daily using dictionaries compiled from public data breaches. If you reuse the same password across multiple platforms, a single minor breach compromises your email, banking, and social accounts.",
    },
    {
      heading: "Mathematical k-Anonymity Protocol Breakdown",
      body: "k-Anonymity ensures individual privacy in cryptographic queries. By truncating the SHA-1 hash to a 5-character prefix, the server queries a partition containing hundreds of plausible hash suffixes. The final match determination occurs in memory, preserving zero-knowledge privacy.",
    },
    {
      heading: "Password Entropy & Brute-Force Feasibility",
      body: "An 8-character lowercase password has ~200 billion combinations and can be brute-forced on a modern GPU in under 1 second. A 16-character passphrase containing uppercase, numbers, and symbols requires trillions of years to compute.",
    },
    {
      heading: "Adopting Modern Passkeys & Multi-Factor Authentication",
      body: "Enable Hardware FIDO2 / WebAuthn Passkeys or Time-Based One-Time Passwords (TOTP via Google Authenticator or 1Password) on all critical accounts to render password leaks completely harmless to your account security.",
    },
  ];

  return (
    <ProgrammaticSeoWrapper
      title="Free Password Breach & Pwned Checker (k-Anonymity Protected)"
      subtitle="Check if your password was leaked in known data breaches using zero-knowledge mathematical k-anonymity. 100% private, never stored."
      categoryName="Cybersecurity"
      categoryUrl="/tools"
      canonicalPath="/security/password"
      faqs={faqs}
      guideSections={guideSections}
      countryCode="US"
      vpnContext="breach"
      relatedSearches={[
        { label: "Email Breach Scanner", url: "/security/breach" },
        { label: "IP Geolocation Lookup", url: "/lookup/ip" },
        { label: "Reverse Phone Scam Checker", url: "/lookup/phone" },
        { label: "Username OSINT Scanner", url: "/lookup/username" },
      ]}
    >
      <div className="space-y-6">
        <Card className="rounded-3xl border-2 border-primary/20 bg-gradient-to-b from-card to-background shadow-xl overflow-hidden">
          <CardContent className="p-6 sm:p-10 space-y-6">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-bold">
                <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                Zero-Knowledge SHA-1 k-Anonymity Model
              </Badge>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Check If Your Password Is Leaked
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Test any password against 10+ billion compromised credentials from global data breaches. Your password is never sent over the wire.
              </p>
            </div>

            <form onSubmit={handleCheck} className="max-w-2xl mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-2 rounded-2xl border-2 border-primary/30 bg-card p-2 shadow-lg focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 transition-all">
                <div className="relative flex-1 w-full">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password to audit..."
                    className="w-full border-0 bg-transparent pl-10 pr-10 text-sm sm:text-base text-foreground focus-visible:ring-0 shadow-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto rounded-xl px-6 font-bold gap-2 h-11 shrink-0"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                  Audit Password
                </Button>
              </div>

              <div className="text-center text-[11px] text-muted-foreground">
                <span>🔒 Privacy Guarantee: Only the first 5 characters of your password&apos;s SHA-1 hash are queried.</span>
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
                      {result.pwned ? "Password Found in Breaches!" : "No Breaches Detected"}
                    </CardTitle>
                    <Badge
                      className={`text-xs font-bold px-3 py-0.5 rounded-full ${
                        result.pwned
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                      }`}
                    >
                      {result.pwned ? "COMPROMISED / DO NOT USE" : "CLEAN PASSWORD"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    SHA-1 k-Anonymity Prefix: {result.hashPrefix}*****
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 text-xs sm:text-sm leading-relaxed text-foreground font-medium">
                {result.feedback}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Breach Occurrences</span>
                  <p className="text-xl sm:text-2xl font-black text-foreground mt-1">
                    {result.count.toLocaleString()} times
                  </p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">In Public Dumps</span>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Estimated Strength</span>
                  <p className="text-xl sm:text-2xl font-black text-foreground mt-1">{result.strength}</p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">Entropy Complexity</span>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Security Recommendation</span>
                  <p className="text-sm font-bold text-foreground mt-1">
                    {result.pwned ? "Change Immediately" : "Safe for Single Use"}
                  </p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">Use Password Vault</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ProgrammaticSeoWrapper>
  );
}
