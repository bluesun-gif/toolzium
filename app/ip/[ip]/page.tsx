import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { lookupIp } from "@/lib/data/adapters/ip-adapter";
import { ProgrammaticSeoWrapper } from "@/components/seo/programmatic-seo-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Globe,
  MapPin,
  Network,
  Radio,
  Search,
  Server,
  Shield,
  ShieldAlert,
} from "lucide-react";
import { siteURL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ ip: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ip } = await params;
  const decoded = decodeURIComponent(ip);
  const data = await lookupIp(decoded);

  const title = `IP Lookup ${data.ip} — Geolocation, ISP (${data.isp}) & ASN Intelligence`;
  const description = `Detailed IP intelligence report for ${data.ip}. Geolocation: ${data.city}, ${data.country}. Network: ${data.isp} (${data.asn}). Security flags: ${data.isVpn ? "VPN/Proxy Active" : "Clean Residential"}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteURL}/ip/${encodeURIComponent(data.ip)}`,
      siteName: "Toolzium",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${siteURL}/ip/${encodeURIComponent(data.ip)}`,
    },
  };
}

export default async function IpProgrammaticPage({ params }: PageProps) {
  const { ip } = await params;
  const decoded = decodeURIComponent(ip);
  const data = await lookupIp(decoded);

  const faqs = [
    {
      question: `Where is IP address ${data.ip} located?`,
      answer: `${data.ip} is geolocated in ${data.city}, ${data.region}, ${data.country} (${data.countryCode}) within the ${data.continent} continent. Approximate coordinates are ${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}.`,
    },
    {
      question: `Who is the Internet Service Provider (ISP) for ${data.ip}?`,
      answer: `This IP address is announced and routed by ${data.isp} (${data.org}) under Autonomous System ${data.asn}.`,
    },
    {
      question: `Is ${data.ip} a VPN or Proxy address?`,
      answer: data.isVpn || data.isProxy
        ? `Yes. Our threat intelligence checks detected VPN, Proxy, or automated tunneling infrastructure on ${data.ip}.`
        : `No. ${data.ip} is identified as a direct connection without known public proxy relays.`,
    },
    {
      question: `How can I hide my own IP address?`,
      answer: `You can conceal your true public IP and protect your browsing history from ISP surveillance by activating a secure VPN such as NordVPN or Surfshark.`,
    },
  ];

  const guideSections = [
    {
      heading: `Autonomous System & BGP Routing for ${data.ip}`,
      body: `${data.ip} belongs to ${data.asn}, operated by ${data.org}. Border Gateway Protocol (BGP) manages the routing tables between this autonomous system and upstream tier-1 internet transit carriers worldwide.`,
    },
    {
      heading: `Geolocation Accuracy & Regional Limits`,
      body: `IP geolocation algorithms map IP ranges to telecom exchange points in ${data.city}, ${data.region}. While accurate for city-level routing and timezone calculations (UTC ${data.utcOffset}), it reflects the network router rather than an exact physical household.`,
    },
    {
      heading: `Security & Threat Profile: Risk Score ${data.riskScore}/100`,
      body: `This IP carries a threat assessment score of ${data.riskScore}/100. Factors evaluated include Tor exit node lists, datacenter hosting classifications (${data.isHosting ? "Datacenter/Cloud" : "Residential"}), and historical web abuse reports.`,
    },
    {
      heading: `Recommended Privacy Safeguards`,
      body: `Websites and trackers log IP addresses to build longitudinal behavioral profiles. Utilizing encrypted DNS (DNS-over-HTTPS) and encrypted VPN protocols prevents third-party data harvesting.`,
    },
  ];

  return (
    <ProgrammaticSeoWrapper
      title={`IP Geolocation Report for ${data.ip}`}
      subtitle={`Detailed network routing analysis, ISP metadata (${data.isp}), autonomous system (${data.asn}), and security status.`}
      categoryName="IP Lookup"
      categoryUrl="/lookup/ip"
      canonicalPath={`/ip/${encodeURIComponent(data.ip)}`}
      faqs={faqs}
      guideSections={guideSections}
      countryCode={data.countryCode}
      vpnContext="ip"
      relatedSearches={[
        { label: "Search another IP address", url: "/lookup/ip" },
        { label: "Check WHOIS Domain Records", url: "/lookup/whois" },
        { label: "Reverse Phone Lookup", url: "/lookup/phone" },
        { label: "Username OSINT Scanner", url: "/lookup/username" },
      ]}
    >
      <div className="space-y-6">
        <Card className="rounded-3xl border-2 border-primary/30 bg-card/90 backdrop-blur-md shadow-2xl overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/60 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <CardTitle className="text-2xl sm:text-3xl font-black text-foreground font-mono">
                    {data.ip}
                  </CardTitle>
                  <Badge variant="outline" className="font-semibold text-xs rounded-full">
                    {data.type}
                  </Badge>
                  {data.isVpn || data.isProxy ? (
                    <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs font-bold rounded-full">
                      VPN / PROXY DETECTED
                    </Badge>
                  ) : (
                    <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs font-bold rounded-full">
                      CLEAN CONNECTION
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span>{data.city}, {data.region}, {data.country} ({data.countryCode})</span>
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Button asChild variant="outline" size="sm" className="rounded-xl text-xs font-semibold">
                  <Link href="/lookup/ip">
                    <Search className="mr-1.5 h-3.5 w-3.5" />
                    Lookup Another IP
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">ISP Organization</span>
                <p className="text-sm sm:text-base font-bold text-foreground mt-1 truncate">{data.isp}</p>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">{data.org}</span>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Autonomous System</span>
                <p className="text-sm sm:text-base font-bold text-foreground mt-1 font-mono">{data.asn}</p>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">Routing Protocol Number</span>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Timezone / Offset</span>
                <p className="text-sm sm:text-base font-bold text-foreground mt-1 truncate">{data.timezone}</p>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">UTC {data.utcOffset}</span>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Geo Coordinates</span>
                <p className="text-sm sm:text-base font-bold text-foreground mt-1 font-mono">
                  {data.latitude.toFixed(3)}, {data.longitude.toFixed(3)}
                </p>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">Approx. Lat/Long</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-border/50">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Threat Classification
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-medium">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                  <span>VPN Tunnel:</span>
                  <Badge variant={data.isVpn ? "destructive" : "secondary"}>
                    {data.isVpn ? "YES" : "NO"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                  <span>Proxy Gateway:</span>
                  <Badge variant={data.isProxy ? "destructive" : "secondary"}>
                    {data.isProxy ? "YES" : "NO"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                  <span>Tor Relay:</span>
                  <Badge variant={data.isTor ? "destructive" : "secondary"}>
                    {data.isTor ? "YES" : "NO"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                  <span>Connection Type:</span>
                  <Badge variant="outline">
                    {data.isHosting ? "DATACENTER / CLOUD" : "RESIDENTIAL"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProgrammaticSeoWrapper>
  );
}
