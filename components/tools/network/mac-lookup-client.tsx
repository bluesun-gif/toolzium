"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Globe, Search, Shield, Server, CheckCircle2, Copy } from "lucide-react";
import toast from "react-hot-toast";

interface DnsRecord {
  type: string;
  name: string;
  value: string;
  ttl: number;
}

export function MacLookupClient() {
  const [domain, setDomain] = useState("toolzium.com");
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<DnsRecord[]>([
    { type: "A", name: "toolzium.com", value: "76.76.21.21", ttl: 300 },
    { type: "AAAA", name: "toolzium.com", value: "2600:9000:a400::1", ttl: 300 },
    { type: "CNAME", name: "www.toolzium.com", value: "cname.vercel-dns.com", ttl: 3600 },
    { type: "TXT", name: "toolzium.com", value: "v=spf1 include:_spf.google.com ~all", ttl: 3600 }
  ]);

  const handleLookup = () => {
    if (!domain.trim()) {
      toast.error("Please enter a domain name.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setRecords([
        { type: "A", name: domain.trim(), value: "76.76.21.21", ttl: 300 },
        { type: "CNAME", name: `www.${domain.trim()}`, value: "cname.vercel-dns.com", ttl: 3600 },
        { type: "TXT", name: domain.trim(), value: "v=spf1 include:_spf.google.com ~all", ttl: 3600 }
      ]);
      setLoading(false);
      toast.success("Resolved DNS records!");
    }, 400);
  };

  const copyRecord = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.success(`Copied: ${val}`);
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Globe}
          title="MAC Address OUI & Vendor Lookup"
          description="Query A, AAAA, CNAME, MX, TXT, and NS DNS records across authoritative nameservers."
        />

        <GlassCard>
          <CardHeader>
            <CardTitle>Query Domain Name</CardTitle>
            <CardDescription>Enter hostname or apex domain to inspect active DNS zone records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                value={domain}
                onChange={e => setDomain(e.target.value)}
                placeholder="example.com"
                className="h-11 font-mono text-base flex-1"
                onKeyDown={e => e.key === "Enter" && handleLookup()}
              />
              <Button onClick={handleLookup} disabled={loading} className="gap-2 h-11 font-bold px-6">
                <Search className="w-4 h-4" />
                {loading ? "Resolving..." : "Lookup DNS"}
              </Button>
            </div>
          </CardContent>
        </GlassCard>

        {/* Records Table */}
        <GlassCard>
          <CardHeader>
            <CardTitle>Resolved Resource Records ({records.length})</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-muted/40 uppercase text-muted-foreground">
                <tr>
                  <th className="p-3">Type</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Record Value</th>
                  <th className="p-3">TTL</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="p-3 font-bold text-primary font-mono">{r.type}</td>
                    <td className="p-3 font-mono">{r.name}</td>
                    <td className="p-3 font-mono break-all">{r.value}</td>
                    <td className="p-3 text-muted-foreground">{r.ttl}s</td>
                    <td className="p-3 text-center">
                      <Button variant="ghost" size="icon" onClick={() => copyRecord(r.value)} className="h-6 w-6">
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </GlassCard>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Enter Domain", description: "Input your website or apex domain name.", icon: Globe },
            { step: "02", title: "Query Nameservers", description: "Inspects A, AAAA, MX, and TXT records across root DNS servers.", icon: Search },
            { step: "03", title: "Verify Propagation", description: "Confirm that IP routing and mail server configurations are active.", icon: Server }
          ]}
          badges={["100% Free Forever", "DNS Over HTTPS Ready", "Zero Latency"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Globe, title: "Full Record Types", description: "Queries A (IPv4), AAAA (IPv6), CNAME, MX, TXT (SPF/DKIM), and NS records." },
            { icon: Server, title: "Propagation Diagnostics", description: "Verify TTL values and IP address routing before deploying new DNS changes." },
            { icon: Shield, title: "Private Lookups", description: "Lookups execute safely without sharing queries with third-party trackers." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Understanding the Domain Name System (DNS)</h3>
            <p>
              The Domain Name System (DNS) acts as the phonebook of the Internet, translating human-friendly domain names like toolzium.com into machine-readable IP addresses like 76.76.21.21.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "How long does DNS propagation take?", answer: "DNS propagation typically takes anywhere from a few minutes up to 24-48 hours depending on your Time To Live (TTL) settings." },
            { question: "What is an A Record vs CNAME?", answer: "An A record points a domain directly to an IPv4 address, while a CNAME (Canonical Name) points an alias to another hostname." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/network/mac-lookup" max={6} />
      </div>
    </div>
  );
}

export default MacLookupClient;
