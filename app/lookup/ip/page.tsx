"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgrammaticSeoWrapper } from "@/components/seo/programmatic-seo-wrapper";
import {
  AlertTriangle,
  ArrowRight,
  Copy,
  Globe,
  Loader2,
  MapPin,
  Network,
  Radio,
  Search,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { IpLookupResult } from "@/lib/data/adapters/ip-adapter";

const SAMPLE_IPS = [
  { label: "Google Public DNS", ip: "8.8.8.8" },
  { label: "Cloudflare DNS", ip: "1.1.1.1" },
  { label: "Quad9 Secure", ip: "9.9.9.9" },
  { label: "OpenDNS", ip: "208.67.222.222" },
];

export default function IpLookupHub() {
  const router = useRouter();
  const [ipInput, setIpInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IpLookupResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Auto-detect visitor IP on initial load
  useEffect(() => {
    handleLookup(undefined, "");
  }, []);

  const handleLookup = async (e?: React.FormEvent, overrideIp?: string) => {
    if (e) e.preventDefault();
    const query = typeof overrideIp === "string" ? overrideIp : ipInput.trim();

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/lookup/ip?ip=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("IP lookup failed. Please check the IP address.");
      const data = await res.json();
      setResult(data);
      if (!ipInput && data.ip) setIpInput(data.ip);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed.");
    } finally {
      setLoading(false);
    }
  };

  const copyIp = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What information does the IP Geolocation Lookup tool provide?",
      answer: "Our engine discovers your public IP address, Autonomous System Number (ASN), Internet Service Provider (ISP), organization name, geographic country, state/region, city, approximate GPS coordinates, and security classifications (Proxy, VPN, Tor exit node, or Datacenter hosting).",
    },
    {
      question: "Is IP Geolocation 100% exact to a street address?",
      answer: "No. IP geolocation identifies the routing equipment and gateway of your Internet Service Provider, which is accurate to the city or metro region level. It does not disclose private personal street addresses.",
    },
    {
      question: "What does it mean if an IP is flagged as a Proxy or VPN?",
      answer: "Proxy, VPN, and Tor flags signify that the IP belongs to a commercial privacy tunnel, anonymizing relay, or datacenter server rather than a residential home connection.",
    },
    {
      question: "How can I hide or change my public IP address?",
      answer: "You can mask your public IP address by using a reputable Virtual Private Network (VPN) like NordVPN or Surfshark, which encrypts your connection and assigns you a temporary IP in your choice of 100+ countries.",
    },
  ];

  const guideSections = [
    {
      heading: "How IP Addresses & Network Geolocation Function",
      body: "Every device connected to the public internet is assigned an Internet Protocol (IP) address. Regional Internet Registries (RIRs like ARIN, RIPE, and APNIC) allocate IP blocks to Autonomous Systems (ASNs) managed by telecom providers and hosting organizations.",
    },
    {
      heading: "ASN & BGP Routing Explained",
      body: "An Autonomous System Number (ASN) represents a collection of connected IP routing prefixes under the control of a single administrative entity. BGP (Border Gateway Protocol) routes traffic between thousands of ASNs across the global internet backbone.",
    },
    {
      heading: "Detecting Proxies, VPNs, and Datacenter Traffic",
      body: "Security systems, fraud prevention platforms, and streaming services inspect IP blocks against known datacenter subnets (AWS, Google Cloud, DigitalOcean, Linode) to prevent credential stuffing and bypass geo-restrictions.",
    },
    {
      heading: "IPv4 vs IPv6 Infrastructure",
      body: "IPv4 uses 32-bit addresses (~4.3 billion unique IPs), while IPv6 uses 128-bit hexadecimal addressing to provide a virtually limitless address pool for modern 5G mobile networks and IoT devices.",
    },
  ];

  return (
    <ProgrammaticSeoWrapper
      title="Free IP Geolocation, ISP & Threat Intelligence Lookup"
      subtitle="Discover the geographic location, ASN, ISP, connection speed, and VPN/Proxy security flags for any IPv4 or IPv6 address. 100% free."
      categoryName="Network & Security"
      categoryUrl="/tools"
      canonicalPath="/lookup/ip"
      faqs={faqs}
      guideSections={guideSections}
      countryCode={result?.countryCode || "US"}
      vpnContext="ip"
      relatedSearches={[
        { label: "Check Google DNS 8.8.8.8", url: "/ip/8.8.8.8" },
        { label: "Check Cloudflare 1.1.1.1", url: "/ip/1.1.1.1" },
        { label: "WHOIS Domain Checker", url: "/lookup/whois" },
        { label: "Reverse Phone Lookup", url: "/lookup/phone" },
      ]}
    >
      <div className="space-y-6">
        {/* Search Header */}
        <Card className="rounded-3xl border-2 border-primary/20 bg-gradient-to-b from-card to-background shadow-xl overflow-hidden">
          <CardContent className="p-6 sm:p-10 space-y-6">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-bold">
                <Radio className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
                Live IP & Network Intelligence
              </Badge>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                IP Geolocation & ASN Lookup
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Lookup any IPv4/IPv6 address or domain to uncover location, ISP network, ASN, and VPN/Proxy detection.
              </p>
            </div>

            <form onSubmit={handleLookup} className="max-w-2xl mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-2 rounded-2xl border-2 border-primary/30 bg-card p-2 shadow-lg focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 transition-all">
                <div className="relative flex-1 w-full">
                  <Network className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    value={ipInput}
                    onChange={(e) => setIpInput(e.target.value)}
                    placeholder="Enter IP address (e.g. 8.8.8.8 or 2607:f8b0:4005:805::200e)..."
                    className="w-full border-0 bg-transparent pl-10 text-sm sm:text-base text-foreground focus-visible:ring-0 shadow-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto rounded-xl px-6 font-bold gap-2 h-11 shrink-0"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  Lookup IP
                </Button>
              </div>

              {/* Sample Queries */}
              <div className="flex items-center gap-1.5 flex-wrap justify-center text-xs text-muted-foreground pt-1">
                <span>Quick inspect:</span>
                {SAMPLE_IPS.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setIpInput(sample.ip);
                      handleLookup(undefined, sample.ip);
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
                      {result.ip}
                    </CardTitle>
                    <Badge variant="outline" className="font-semibold text-xs rounded-full">
                      {result.type}
                    </Badge>
                    {result.isVpn || result.isProxy ? (
                      <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs font-bold rounded-full">
                        VPN / PROXY DETECTED
                      </Badge>
                    ) : (
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs font-bold rounded-full">
                        RESIDENTIAL / CLEAN IP
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>{result.city}, {result.region}, {result.country} ({result.countryCode})</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Button variant="outline" size="sm" onClick={copyIp} className="rounded-xl text-xs">
                    <Copy className="mr-1.5 h-3.5 w-3.5" />
                    {copied ? "Copied" : "Copy IP"}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => router.push(`/ip/${encodeURIComponent(result.ip)}`)}
                    className="rounded-xl text-xs font-bold gap-1"
                  >
                    <span>Permanent IP Report</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">ISP Provider</span>
                  <p className="text-sm font-bold text-foreground mt-1 truncate">{result.isp}</p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">{result.org}</span>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Autonomous System</span>
                  <p className="text-sm font-bold text-foreground mt-1 font-mono">{result.asn}</p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">BGP Routing ID</span>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Timezone</span>
                  <p className="text-sm font-bold text-foreground mt-1 truncate">{result.timezone}</p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">UTC {result.utcOffset}</span>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Coordinates</span>
                  <p className="text-sm font-bold text-foreground mt-1 font-mono">
                    {result.latitude.toFixed(2)}, {result.longitude.toFixed(2)}
                  </p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">Lat / Long Approximate</span>
                </div>
              </div>

              {/* Security & Flags */}
              <div className="space-y-2 pt-2 border-t border-border/50">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Threat & Security Flags
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-medium">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                    <span>VPN Tunnel:</span>
                    <Badge variant={result.isVpn ? "destructive" : "secondary"}>
                      {result.isVpn ? "YES" : "NO"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                    <span>Proxy Server:</span>
                    <Badge variant={result.isProxy ? "destructive" : "secondary"}>
                      {result.isProxy ? "YES" : "NO"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                    <span>Tor Node:</span>
                    <Badge variant={result.isTor ? "destructive" : "secondary"}>
                      {result.isTor ? "YES" : "NO"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                    <span>Datacenter Hosting:</span>
                    <Badge variant={result.isHosting ? "outline" : "secondary"}>
                      {result.isHosting ? "DATACENTER" : "RESIDENTIAL"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ProgrammaticSeoWrapper>
  );
}
