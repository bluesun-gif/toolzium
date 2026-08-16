"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Shield, MapPin, Globe, Server, Clock, ShieldCheck, Wifi, Eye } from "lucide-react";
import toast from "react-hot-toast";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GridPattern } from "@/components/magicui/grid-pattern";
interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  org: string;
  timezone: string;
  latitude: number;
  longitude: number;
  version: string;
}
export default function MyIpClient() {
  const [ipv4, setIpv4] = useState<string | null>(null);
  const [ipv6, setIpv6] = useState<string | null>(null);
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchIpData = async () => {
    setLoading(true);
    setError(null);
    setIpv4(null);
    setIpv6(null);
    setIpInfo(null);
    try {
      let currentIpv4 = null;
      let currentIpv6 = null;

      // Fetch IP v4
      try {
        const v4Res = await fetch("https://api.ipify.org?format=json");
        if (v4Res.ok) {
          const v4Data = await v4Res.json();
          currentIpv4 = v4Data.ip;
          setIpv4(currentIpv4);
        }
      } catch (e) {
        console.error("IPv4 fetch failed", e);
      }

      // Fetch IP v6
      try {
        const v6Res = await fetch("https://api64.ipify.org?format=json");
        if (v6Res.ok) {
          const v6Data = await v6Res.json();
          currentIpv6 = v6Data.ip;
          if (currentIpv6 !== currentIpv4) {
            setIpv6(currentIpv6);
          }
        }
      } catch (e) {
        console.error("IPv6 fetch failed", e);
      }

      // Fetch IP details from ipapi.co
      const detailsRes = await fetch(`https://ipapi.co/${currentIpv4 || currentIpv6}/json/`);
      if (detailsRes.ok) {
        const detailsData = await detailsRes.json();
        setIpInfo(detailsData);
      }
    } catch (err: any) {
      setError("Failed to fetch geolocation details. IP address was detected.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchIpData();
  }, []);
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} copied to clipboard.`);
    });
  };
  const steps = [{
    step: "01",
    title: "Query API Handlers",
    description: "Lightweight client-side requests ping secure IP API databases to identify active network interfaces.",
    icon: Globe
  }, {
    step: "02",
    title: "Lookup Geolocation",
    description: "The detected IP is looked up against regional registration databases for country, city, and ISP records.",
    icon: MapPin
  }, {
    step: "03",
    title: "Display Bento Board",
    description: "Visual cards render details dynamically, enabling instant one-click copying and status refreshing.",
    icon: Server
  }];
  const features = [{
    title: "IPv4 & IPv6 Detection",
    description: "Accurately resolves both network standards to display your current routing protocols.",
    icon: Globe
  }, {
    title: "Real-Time Geo Mapping",
    description: "Resolves country, region, city, and coordinates based on active registry records.",
    icon: MapPin
  }, {
    title: "ISP & Provider Audits",
    description: "Identifies your telecommunication service provider or hosting network organization.",
    icon: Server
  }, {
    title: "Local Client Execution",
    description: "IP lookup is handled entirely client-side, meaning your IP is never sent to or saved by our server.",
    icon: ShieldCheck
  }, {
    title: "Timezone Alignment",
    description: "Queries the local geographical timezone corresponding to the IP location for simple reference.",
    icon: Clock
  }, {
    title: "One-Click Clipboard",
    description: "Features fast copy functions to easily copy your IP address or geographic details instantly.",
    icon: Copy
  }];
  const faqs = [{
    question: "What is the difference between IPv4 and IPv6?",
    answer: "IPv4 uses a 32-bit numeric address format (e.g., 192.168.1.1) and supports 4.3 billion unique addresses. IPv6 uses a 128-bit hexadecimal format (e.g., 2001:0db8:85a3::8a2e:0370:7334) providing an almost infinite number of addresses along with native security and auto-configuration enhancements."
  }, {
    question: "How accurate is the geolocation data?",
    answer: "IP geolocation maps public IP registry assignments. It is extremely reliable at the country and region level (95%+ accuracy) and city level (80%+ accuracy), but it cannot pinpoint a street address, phone number, or exact household location due to privacy constraints."
  }, {
    question: "Does Toolzium store my IP address?",
    answer: "No. Toolzium prioritizes user privacy. All IP detection and geolocation queries are executed client-side in your browser. We never log, store, or track your IP address, history, or metadata."
  }, {
    question: "Why does my IP address change periodically?",
    answer: "Most ISPs assign dynamic IP addresses that recycle over time. Your IP address can change whenever your router restarts, after a connection drop, or when the DHCP lease time set by your ISP expires."
  }, {
    question: "What is the difference between public and private IP addresses?",
    answer: "A public IP address is unique worldwide and is used to identify your device or network interface on the open internet. A private IP address (such as 10.x.x.x or 192.168.x.x) is only valid within your local network (LAN) behind a router and is hidden from the public web via NAT."
  }];
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="What is My IP Address" description="Find out your public IPv4 and IPv6 address instantly." />
 
 <div className="grid gap-6 md:grid-cols-2">
 <Card className="md:col-span-2 overflow-hidden border border-muted/50">
 <CardHeader className="text-center bg-muted/20 pb-8">
 <CardTitle className="text-2xl text-muted-foreground font-medium uppercase tracking-widest mt-4">Your Public IP Address</CardTitle>
 </CardHeader>
 <CardContent className="flex flex-col items-center justify-center space-y-8 -mt-6">
 <div className="bg-background rounded-2xl shadow-sm border p-8 md:p-12 w-full max-w-4xl text-center flex flex-col items-center justify-center relative z-10">
 {loading ? <div className="h-24 flex items-center justify-center">
 <RefreshCw className="h-10 w-10 animate-spin text-primary" />
 </div> : error ? <div className="text-destructive text-center p-4 bg-destructive/10 rounded-md">
 {error}
 </div> : <>
 <div className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-primary tracking-tighter break-all text-center leading-none">
 {ipv4 || ipv6 || "Unknown"}
 </div>
 
 <div className="flex flex-wrap justify-center gap-4 mt-10">
 <Button variant="outline" size="lg" onClick={() => copyToClipboard(ipv4 || ipv6 || "", "IP Address")} disabled={!ipv4 && !ipv6} className="h-14 px-8 text-lg cursor-pointer">
 <Copy className="mr-2 h-5 w-5" />
 Copy IP
 </Button>
 <Button variant="default" size="lg" onClick={fetchIpData} className="h-14 px-8 text-lg cursor-pointer">
 <RefreshCw className="mr-2 h-5 w-5" />
 Refresh
 </Button>
 </div>

 {ipv6 && ipv4 && ipv6 !== ipv4 && <div className="mt-8 flex flex-col items-center gap-3 p-6 bg-muted/30 border rounded-xl w-full max-w-2xl">
 <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">IPv6 Address Detected</span>
 <div className="flex items-center gap-4 bg-background px-4 py-2 rounded-lg shadow-sm border w-full justify-between overflow-hidden">
 <span className="text-base sm:text-lg font-mono break-all truncate">{ipv6}</span>
 <Button variant="ghost" size="icon" onClick={() => copyToClipboard(ipv6, "IPv6 Address")} className="flex-shrink-0 cursor-pointer">
 <Copy className="h-4 w-4" />
 </Button>
 </div>
 </div>}
 </>}
 </div>
 </CardContent>
 <CardFooter className="bg-muted/30 flex justify-center text-sm text-muted-foreground py-4 border-t">
 <Shield className="h-4 w-4 mr-2 text-emerald-500" />
 Your IP is detected client-side. We do not store or track your IP address.
 </CardFooter>
 </Card>

 <Card className="border border-muted/50">
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <MapPin className="h-5 w-5 text-primary" />
 Location Information
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 {loading ? <div className="space-y-4 animate-pulse">
 <div className="h-12 bg-muted rounded-lg" />
 <div className="h-12 bg-muted rounded-lg" />
 <div className="h-12 bg-muted rounded-lg" />
 </div> : ipInfo ? <>
 <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
 <span className="text-muted-foreground flex items-center gap-2"><Globe className="h-4 w-4" /> Country</span>
 <span className="font-medium">{ipInfo.country_name || "Unknown"}</span>
 </div>
 <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
 <span className="text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> Region / State</span>
 <span className="font-medium">{ipInfo.region || "Unknown"}</span>
 </div>
 <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
 <span className="text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> City</span>
 <span className="font-medium">{ipInfo.city || "Unknown"}</span>
 </div>
 </> : <div className="text-center text-muted-foreground p-8 border rounded-lg border-dashed">Location information not available.</div>}
 </CardContent>
 </Card>

 <Card className="border border-muted/50">
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Server className="h-5 w-5 text-primary" />
 Network Details
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 {loading ? <div className="space-y-4 animate-pulse">
 <div className="h-12 bg-muted rounded-lg" />
 <div className="h-12 bg-muted rounded-lg" />
 <div className="h-12 bg-muted rounded-lg" />
 </div> : ipInfo ? <>
 <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
 <span className="text-muted-foreground flex items-center gap-2"><Server className="h-4 w-4" /> ISP / Provider</span>
 <span className="font-medium text-right max-w-[200px] sm:max-w-xs truncate" title={ipInfo.org}>{ipInfo.org || "Unknown"}</span>
 </div>
 <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
 <span className="text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4" /> Timezone</span>
 <span className="font-medium">{ipInfo.timezone || "Unknown"}</span>
 </div>
 <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
 <span className="text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> Coordinates</span>
 <span className="font-medium font-mono text-sm bg-muted px-2 py-1 rounded">
 {ipInfo.latitude && ipInfo.longitude ? `${ipInfo.latitude}, ${ipInfo.longitude}` : "Unknown"}
 </span>
 </div>
 </> : <div className="text-center text-muted-foreground p-8 border rounded-lg border-dashed">Network information not available.</div>}
 </CardContent>
 </Card>
 </div>

 {/* SECTION 3: HOW IT WORKS */}
 <ToolHowItWorks steps={steps} />

 {/* SECTION 4: FEATURE HIGHLIGHTS & DEEP SEO GUIDE */}
 <ToolFeatureGuides features={features}>
 <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
 <h3 className="text-xl font-semibold text-foreground">What is an IP Address and How Does It Work?</h3>
 <p>
 An <strong>Internet Protocol (IP) Address</strong> is a unique numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. Think of it as a digital return address for your internet-connected device. When you access a website or stream video content, your device must broadcast its public IP address so the remote servers know where to return the requested packets of data.
 </p>

 <h3 className="text-xl font-semibold text-foreground">The Evolution of Networks: IPv4 vs. IPv6 Standards</h3>
 <p>
 The internet currently relies on two primary addressing standards: <strong>IPv4</strong> and <strong>IPv6</strong>. IPv4 was deployed in 1983 and uses a 32-bit configuration allowing for approximately 4.3 billion unique combinations. Due to the exponential rise of smartphones, smart home appliances, and global internet deployment, these IPv4 combinations have been exhausted. To solve this, network engineers introduced IPv6—a 128-bit standard written in hexadecimal format that supports an almost infinite quantity of addresses.
 </p>

 <h3 className="text-xl font-semibold text-foreground">Comparing Network Address Protocols</h3>
 <p>
 Understanding the core differences between the two protocols helps highlight how modern networking operates:
 </p>
 <table className="w-full border-collapse text-xs border border-border rounded-lg overflow-hidden my-4">
 <thead className="bg-muted text-foreground">
 <tr>
 <th className="border border-border p-2 text-left">Feature / Parameter</th>
 <th className="border border-border p-2 text-left">IPv4 (Internet Protocol v4)</th>
 <th className="border border-border p-2 text-left">IPv6 (Internet Protocol v6)</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td className="border border-border p-2 font-medium">Address Size</td>
 <td className="border border-border p-2">32 bits</td>
 <td className="border border-border p-2">128 bits</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">Format Style</td>
 <td className="border border-border p-2">Dotted decimal (e.g., <code>192.168.1.1</code>)</td>
 <td className="border border-border p-2">Hexadecimal colons (e.g., <code>2001:db8::ff00:42:8329</code>)</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">Total Addresses</td>
 <td className="border border-border p-2">~4.3 Billion (2^32)</td>
 <td className="border border-border p-2">~340 Undecillion (2^128)</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">Configuration</td>
 <td className="border border-border p-2">Manual or DHCP server allocation</td>
 <td className="border border-border p-2">Stateless Address Autoconfiguration (SLAAC)</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">Integrated Security</td>
 <td className="border border-border p-2">Optional addon layer (IPsec)</td>
 <td className="border border-border p-2">Built-in required support (IPsec native)</td>
 </tr>
 </tbody>
 </table>

 <h3 className="text-xl font-semibold text-foreground">Public vs. Private IP Addresses</h3>
 <p>
 An essential concept in home and business networking is the division between public and private IP addresses:
 </p>
 <ul className="list-disc pl-5 space-y-2">
 <li>
 <strong>Public IP Address</strong>: This is the address visible to the external internet. It is assigned to your network gateway or router by your Internet Service Provider (ISP). Any server you visit online sees your public IP.
 </li>
 <li>
 <strong>Private IP Address</strong>: Local addresses (like <code>192.168.1.5</code> or <code>10.0.0.10</code>) are assigned to individual devices inside your home or office network by the router. They are used for local routing and are completely hidden from the open web using a mechanism called <strong>Network Address Translation (NAT)</strong>.
 </li>
 </ul>

 <h3 className="text-xl font-semibold text-foreground">How IP Geolocation Works (and Its Privacy Boundaries)</h3>
 <p>
 When you load this tool, the geolocation lookup checks your public IP against regional Internet Registry databases (such as ARIN, RIPE, or APNIC). These registries link blocks of IP addresses to physical ISPs and geographic centers. While geolocation can pinpoint your city, state, country, and service provider, it <em>cannot</em> access GPS telemetry to reveal your exact home coordinate or street address. This acts as a protective privacy boundary for public connections.
 </p>

 <h3 className="text-xl font-semibold text-foreground">Securing Your Connection: VPNs and Proxies</h3>
 <p>
 If you want to mask your public IP address from advertisers, trackers, or foreign websites, you can redirect your connection through a Virtual Private Network (VPN) or a proxy server. When active, a VPN encrypts your network requests and routes them through a secondary server. Websites you visit will only detect the IP and location of the VPN server, hiding your local ISP data and physical coordinates.
 </p>
 </div>
 </ToolFeatureGuides>

 {/* SECTION 5: FAQ & RELATED TOOLS */}
 <ToolFaqAccordion faqs={faqs} />
 <RelatedTools currentToolUrl="/tools/network/my-ip" max={6} />
 </div></div>;
}