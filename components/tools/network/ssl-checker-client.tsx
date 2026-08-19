"use client";

import { cn } from "@/lib/utils";
import { ToolBackground } from "@/components/shared/tool-background";
import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Copy, Clock, ShieldCheck, AlertTriangle, ShieldX, History, Trash2, Calendar, Sparkles, Shield, Zap, Check } from "lucide-react";
import toast from "react-hot-toast";
import { checkSslCertificate } from "@/lib/actions/ssl-checker.action";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";

interface CertData {
  issuer_name: string;
  common_name: string;
  name_value: string;
  not_before: string;
  not_after: string;
  serial_number: string;
}
interface HistoryItem {
  domain: string;
  date: string;
}

export default function SslCheckerClient() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CertData | null>(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("ssl-checker-history");
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const saveToHistory = (newDomain: string) => {
    const updated = [{ domain: newDomain, date: new Date().toISOString() }, ...history.filter(h => h.domain !== newDomain)].slice(0, 10);
    setHistory(updated);
    localStorage.setItem("ssl-checker-history", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("ssl-checker-history");
  };

  const checkSsl = async (targetDomain: string) => {
    if (!targetDomain) { toast.error("Please enter a domain name"); return; }
    const cleanDomain = targetDomain.replace(/^https?:\/\//, "").replace(/\/.*$/, "").toLowerCase().trim();
    setDomain(cleanDomain);
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await checkSslCertificate(cleanDomain);
      if (!res.ok) throw new Error(res.error);
      if (!res.cert) throw new Error("No certificate returned from server");
      setResult(res.cert);
      saveToHistory(cleanDomain);
      toast.success("Certificate check complete");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred while checking the SSL certificate.");
      toast.error("Failed to check SSL");
    } finally {
      setLoading(false);
    }
  };

  const getDaysUntilExpiry = (notAfter: string) => {
    if (!notAfter) return 0;
    return Math.floor((new Date(notAfter).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  const getStatusDetails = (notAfter: string) => {
    const days = getDaysUntilExpiry(notAfter);
    if (days < 0) return { label: "Expired", color: "bg-red-500", icon: <ShieldX className="w-5 h-5 text-red-500" /> };
    if (days < 30) return { label: "Expiring Soon", color: "bg-orange-500", icon: <AlertTriangle className="w-5 h-5 text-orange-500" /> };
    if (days <= 60) return { label: "Valid", color: "bg-yellow-500", icon: <AlertTriangle className="w-5 h-5 text-yellow-500" /> };
    return { label: "Valid", color: "bg-green-500", icon: <ShieldCheck className="w-5 h-5 text-green-500" /> };
  };

  const parseIssuer = (issuerStr: string) => {
    const parts = issuerStr.split(",");
    const org = parts.find(p => p.trim().startsWith("O="));
    const cn = parts.find(p => p.trim().startsWith("CN="));
    if (org) return org.split("=")[1].trim();
    if (cn) return cn.split("=")[1].trim();
    return issuerStr;
  };

  const copyResults = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `SSL Certificate Details for ${domain}\nStatus: ${getStatusDetails(result.not_after).label} (${getDaysUntilExpiry(result.not_after)} days)\nCommon Name: ${result.common_name}\nIssuer: ${parseIssuer(result.issuer_name)}\nValid From: ${new Date(result.not_before).toLocaleDateString()}\nValid Until: ${new Date(result.not_after).toLocaleDateString()}\nSerial: ${result.serial_number}\nSANs:\n${result.name_value.split(/\r?\n/).map(n => "- " + n).join("\n")}`
    );
    toast.success("Results copied to clipboard");
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">

        <ToolPageHeader
          title="SSL Certificate Checker"
          description="Verify SSL/TLS certificate details, expiration dates, and transparency logs."
        />

        {/* ── Tool UI: 2-col main + 1-col sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Check Domain</CardTitle>
                <CardDescription>Enter a domain name to check its SSL certificate</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={e => { e.preventDefault(); checkSsl(domain); }} className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      value={domain}
                      onChange={e => setDomain(e.target.value)}
                      placeholder="e.g., toolzium.com"
                      className="pl-9"
                    />
                    <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                  <Button type="submit" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Check SSL
                  </Button>
                </form>
                {error && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800 flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {result && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {getStatusDetails(result.not_after).icon}
                      Certificate Results
                    </CardTitle>
                    <CardDescription>Latest certificate from transparency logs</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={copyResults}>
                    <Copy className="w-4 h-4 mr-2" /> Copy
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap items-center gap-6 p-4 bg-muted/50 rounded-lg border">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wide">Status</p>
                      <Badge className={cn(getStatusDetails(result.not_after).color, "text-white")}>
                        {getStatusDetails(result.not_after).label}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wide">Expires In</p>
                      <p className="font-semibold flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {getDaysUntilExpiry(result.not_after)} days
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-xs uppercase tracking-wide">Common Name (CN)</Label>
                      <p className="font-medium break-all text-sm">{result.common_name}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-xs uppercase tracking-wide">Issuer</Label>
                      <p className="font-medium text-sm">{parseIssuer(result.issuer_name)}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-xs uppercase tracking-wide">Valid From</Label>
                      <p className="font-medium text-sm flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        {new Date(result.not_before).toLocaleDateString(undefined, { dateStyle: "medium" })}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-xs uppercase tracking-wide">Valid Until</Label>
                      <p className="font-medium text-sm flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        {new Date(result.not_after).toLocaleDateString(undefined, { dateStyle: "medium" })}
                      </p>
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <Label className="text-muted-foreground text-xs uppercase tracking-wide">Serial Number</Label>
                      <p className="font-mono text-xs break-all bg-muted p-2.5 rounded-lg">{result.serial_number}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wide">Subject Alternative Names (SANs)</Label>
                    <div className="bg-muted/50 border border-border/60 p-3 rounded-lg max-h-40 overflow-y-auto">
                      <ul className="space-y-1 text-sm font-mono">
                        {result.name_value.split(/\r?\n/).map((name, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-xs">
                            <Check className="w-3 h-3 text-green-500 shrink-0" />
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar: History */}
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <History className="w-4 h-4" /> History
                </CardTitle>
                {history.length > 0 && (
                  <Button variant="ghost" size="icon" onClick={clearHistory} title="Clear history">
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No recent checks</p>
                ) : (
                  <ul className="space-y-2">
                    {history.map((item, i) => (
                      <li key={i}>
                        <button
                          type="button"
                          onClick={() => checkSsl(item.domain)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors flex flex-col gap-0.5"
                        >
                          <span className="font-medium text-sm truncate">{item.domain}</span>
                          <span className="text-xs text-muted-foreground">{new Date(item.date).toLocaleString()}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        {/* ── End tool grid ── */}

        {/* ── Full-width educational sections ── */}
        <ToolHowItWorks
          steps={[
            { step: "01", title: "Enter Domain", description: "Type any domain name (e.g. toolzium.com) — no http:// needed.", icon: Search },
            { step: "02", title: "Check Certificate", description: "Click Check SSL — we query live certificate transparency logs instantly.", icon: ShieldCheck },
            { step: "03", title: "Review Results", description: "View issuer, expiry date, SANs, and validity status. Copy with one click.", icon: Copy },
          ]}
          badges={["100% Free", "Live CT Logs", "No Signup", "Privacy-First"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Zap, title: "Real-Time Data", description: "Queries live SSL/TLS certificate transparency logs — always current, never cached." },
            { icon: Shield, title: "Expiry Monitoring", description: "Shows exact days until expiry with color-coded status — green, amber, or red alerts." },
            { icon: Sparkles, title: "SAN Inspection", description: "Lists every Subject Alternative Name covered by the certificate — wildcards and all domains." },
          ]}
        >
          <div className="prose dark:prose-invert max-w-none">
            <h3>Why Use Our SSL Certificate Checker?</h3>
            <p>
              Verify SSL certificate validity, issuer, and expiry in seconds. Whether you're a developer checking a deployment, a sysadmin monitoring renewals, or a site owner ensuring security — get all the details you need without opening browser dev tools.
            </p>
            <p>
              We query live certificate transparency logs so you always get the current certificate — not a browser-cached version. See exactly when it expires, who issued it, and what domains it covers.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "Is this tool free to use?", answer: "Yes, 100% free with no subscriptions or usage limits." },
            { question: "Is my data secure?", answer: "Only the domain name you enter is sent to certificate transparency log APIs. No personal data is collected or stored." },
            { question: "Do I need to create an account?", answer: "No account or registration required. Open and use immediately." },
            { question: "Why does it show 'No certificate found'?", answer: "Some new domains or internal servers may not appear in public transparency logs yet. Try again in a few minutes after DNS propagation." },
          ]}
        />

        <RelatedTools currentToolUrl="/tools/network/ssl-checker" max={6} />

      </div>
    </div>
  );
}