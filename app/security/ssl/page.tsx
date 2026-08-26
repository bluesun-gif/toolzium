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
  Lock,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Loader2,
  Fingerprint,
  CalendarClock,
  Server,
} from "lucide-react";
import type { SslCertResult } from "@/lib/data/adapters/ssl-adapter";

export default function SslScannerHub() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SslCertResult | null>(null);
  const [error, setError] = useState("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) {
      setError("Please enter a domain (e.g. github.com).");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/security/ssl-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      if (!res.ok) throw new Error("SSL scan failed. Please try again.");
      setResult(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed.");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: "What does an SSL/TLS certificate scanner actually check?",
      answer:
        "It opens a live TLS handshake to the domain on port 443 and reads the real X.509 certificate: issuer (CA), validity window, cipher suite, TLS protocol version, SAN coverage, and expiry. No cached data — 100% live.",
    },
    {
      question: "Why is my certificate about to expire a danger?",
      answer:
        "When an SSL cert expires, browsers show a full-page 'Your connection is not private' warning, killing conversions and tanking SEO trust signals. Certs with <30 days remaining should be renewed immediately (Let's Encrypt issues 90-day certs for automation).",
    },
    {
      question: "What TLS protocol and cipher should my site use?",
      answer:
        "Target TLS 1.2 minimum, TLS 1.3 ideal. Strong ciphers are AES-GCM or CHACHA20-POLY1305. Avoid TLS 1.0/1.1 and RC4/3DES — they are deprecated and fail PCI-DSS and modern browser requirements.",
    },
    {
      question: "Is this SSL checker free and accurate?",
      answer:
        "Yes. Toolzium performs a genuine TLS connection server-side, so results reflect exactly what a visitor's browser sees — including self-signed or mismatched-certificate errors.",
    },
  ];

  const guideSections = [
    {
      heading: "How TLS Certificates Build Trust",
      body:
        "A certificate signed by a trusted Certificate Authority (Sectigo, DigiCert, Let's Encrypt) proves the server owns the domain. Browsers chain-verify the signature; any break shows a security warning.",
    },
    {
      heading: "SAN & Multi-Domain Coverage",
      body:
        "Subject Alternative Names list every hostname covered by one cert. Missing a subdomain in SAN causes 'certificate name mismatch' errors even when the cert is valid.",
    },
    {
      heading: "Automating Renewal at Scale",
      body:
        "Modern stacks use ACME (Certbot / Caddy / Traefik) to auto-renew 90-day Let's Encrypt certs. Monitoring expiry — exactly what this tool does — is the final safety net.",
    },
  ];

  return (
    <ProgrammaticSeoWrapper
      title="Free SSL Certificate Scanner — Expiry, Cipher & TLS Security Check"
      subtitle="Live TLS certificate lookup: issuer, validity, expiry countdown, cipher suite, and SAN coverage. Detect expired or weak SSL in seconds. 100% free."
      categoryName="Cybersecurity"
      categoryUrl="/tools"
      canonicalPath="/security/ssl"
      faqs={faqs}
      guideSections={guideSections}
      countryCode="US"
      vpnContext="breach"
      relatedSearches={[
        { label: "Email Domain Security Scanner", url: "/security/email" },
        { label: "WHOIS & RDAP Domain Intelligence", url: "/lookup/whois" },
        { label: "IP Geolocation & Threat Intel", url: "/lookup/ip" },
        { label: "Password Breach Checker", url: "/security/password" },
      ]}
    >
      <div className="space-y-6">
        <Card className="rounded-3xl border-2 border-primary/20 bg-gradient-to-b from-card to-background shadow-xl overflow-hidden">
          <CardContent className="p-6 sm:p-10 space-y-6">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-bold">
                <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                Live TLS Handshake · Server-Side · No API Key
              </Badge>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                SSL Certificate Scanner & Expiry Monitor
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Connect to any HTTPS site and read its real certificate: issuer, validity dates,
                days-until-expiry, cipher strength, and SAN coverage.
              </p>
            </div>

            <form onSubmit={handleCheck} className="max-w-2xl mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="github.com"
                    className="pl-9 h-12 rounded-xl"
                  />
                </div>
                <Button type="submit" disabled={loading} className="h-12 px-6 rounded-xl">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  {loading ? "Scanning…" : "Scan SSL"}
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
            {!result.valid ? (
              <Card className="rounded-3xl border-2 border-red-500/30 bg-red-500/5">
                <CardContent className="p-6 flex items-center gap-3 text-red-400">
                  <ShieldAlert className="h-6 w-6" />
                  <div>
                    <p className="font-bold">SSL scan failed for {result.domain}</p>
                    <p className="text-sm">{result.error}</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="rounded-3xl border-2 border-primary/10">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Server className="h-5 w-5 text-primary" /> {result.domain}
                  </CardTitle>
                  <Badge
                    className={`rounded-full px-4 py-1.5 text-sm font-bold ${
                      result.isExpired
                        ? "bg-red-500/15 text-red-400 border-red-500/30"
                        : result.expiresSoon
                        ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
                        : "bg-green-500/15 text-green-400 border-green-500/30"
                    }`}
                  >
                    {result.isExpired
                      ? "EXPIRED"
                      : result.expiresSoon
                      ? `${result.daysRemaining}d LEFT`
                      : "VALID"}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <InfoTile icon={Fingerprint} label="Issuer" value={result.issuer || "—"} />
                    <InfoTile icon={Lock} label="Protocol" value={result.protocol || "—"} />
                    <InfoTile icon={Shield} label="Cipher" value={result.cipher || "—"} />
                    <InfoTile icon={CalendarClock} label="Valid From" value={result.validFrom?.split(" ")[0] || "—"} />
                    <InfoTile icon={CalendarClock} label="Expires" value={result.validTo?.split(" ")[0] || "—"} />
                    <InfoTile icon={Server} label="SAN Count" value={String(result.sanCount ?? "—")} />
                  </div>

                  {result.daysRemaining !== undefined && (
                    <div className="p-3 rounded-xl bg-muted/30 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Days until expiry</p>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full ${
                            result.isExpired
                              ? "bg-red-500"
                              : result.expiresSoon
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: `${Math.max(2, Math.min(100, (result.daysRemaining / 398) * 100))}%` }}
                        />
                      </div>
                      <p className="text-sm font-medium mt-1">
                        {result.isExpired
                          ? `Expired ${Math.abs(result.daysRemaining!)} days ago`
                          : `${result.daysRemaining} days remaining`}
                      </p>
                    </div>
                  )}

                  {result.sanSample && result.sanSample.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Subject Alternative Names</p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.sanSample.map((s, i) => (
                          <Badge key={i} variant="outline" className="font-mono text-[10px]">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.fingerprintSha256 && (
                    <div className="p-3 rounded-xl bg-muted/30 border border-border">
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">
                        SHA-256 Fingerprint
                      </p>
                      <p className="text-[10px] font-mono break-all text-foreground">{result.fingerprintSha256}</p>
                    </div>
                  )}

                  {(result.isExpired || result.expiresSoon) && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm">
                      <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                      {result.isExpired
                        ? "This certificate has expired — browsers show a security warning and block the site."
                        : "Renew this certificate within 30 days to avoid a browser security warning."}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <RecommendedVpnCta context="breach" />
          </div>
        )}
      </div>
    </ProgrammaticSeoWrapper>
  );
}

function InfoTile({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-muted/30 border border-border">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground flex items-center gap-1 mb-1">
        <Icon className="h-3 w-3" /> {label}
      </p>
      <p className="text-xs font-semibold text-foreground break-words">{value}</p>
    </div>
  );
}
