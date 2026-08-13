"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Copy, Clock, ShieldCheck, AlertTriangle, ShieldX, History, Trash2, Calendar, Sparkles, Shield, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { checkSslCertificate } from "@/lib/actions/ssl-checker.action";
import { GridPattern } from "@/components/magicui/grid-pattern";
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
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);
  const saveToHistory = (newDomain: string) => {
    const updated = [{
      domain: newDomain,
      date: new Date().toISOString()
    }, ...history.filter(h => h.domain !== newDomain)].slice(0, 10);
    setHistory(updated);
    localStorage.setItem("ssl-checker-history", JSON.stringify(updated));
  };
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("ssl-checker-history");
  };
  const checkSsl = async (targetDomain: string) => {
    if (!targetDomain) {
      toast.error("Please enter a domain name");
      return;
    }

    // Clean domain
    const cleanDomain = targetDomain.replace(/^https?:\/\//, '').replace(/\/.*$/, '').toLowerCase().trim();
    setDomain(cleanDomain);
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await checkSslCertificate(cleanDomain);
      if (!res.ok) {
        throw new Error(res.error);
      }
      if (!res.cert) {
        throw new Error("No certificate returned from server");
      }
      setResult(res.cert);
      saveToHistory(cleanDomain);
      toast.success("Certificate check complete");
    } catch (err: any) {
      setError(err.message || "An error occurred while checking the SSL certificate.");
      toast.error("Failed to check SSL");
    } finally {
      setLoading(false);
    }
  };
  const getDaysUntilExpiry = (notAfter: string) => {
    if (!notAfter) return 0;
    const expiry = new Date(notAfter).getTime();
    const now = new Date().getTime();
    const diff = expiry - now;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };
  const getStatusDetails = (notAfter: string) => {
    const days = getDaysUntilExpiry(notAfter);
    if (days < 0) {
      return {
        label: "Expired",
        color: "bg-red-500",
        icon: <ShieldX className="w-5 h-5 text-red-500" />
      };
    } else if (days < 30) {
      return {
        label: "Expiring Soon",
        color: "bg-red-500",
        icon: <AlertTriangle className="w-5 h-5 text-red-500" />
      };
    } else if (days <= 60) {
      return {
        label: "Valid",
        color: "bg-yellow-500",
        icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />
      };
    }
    return {
      label: "Valid",
      color: "bg-green-500",
      icon: <ShieldCheck className="w-5 h-5 text-green-500" />
    };
  };
  const parseIssuer = (issuerStr: string) => {
    const parts = issuerStr.split(',');
    const org = parts.find(p => p.trim().startsWith('O='));
    const cn = parts.find(p => p.trim().startsWith('CN='));
    if (org) return org.split('=')[1].trim();
    if (cn) return cn.split('=')[1].trim();
    return issuerStr;
  };
  const copyResults = () => {
    if (!result) return;
    const text = `
SSL Certificate Details for ${domain}
-----------------------------------
Status: ${getStatusDetails(result.not_after).label} (${getDaysUntilExpiry(result.not_after)} days remaining)
Common Name: ${result.common_name}
Issuer: ${parseIssuer(result.issuer_name)}
Valid From: ${new Date(result.not_before).toLocaleDateString()}
Valid Until: ${new Date(result.not_after).toLocaleDateString()}
Serial Number: ${result.serial_number}
SANs:
${result.name_value.split(/\r?\n/).map(n => '- ' + n).join('\n')}
 `.trim();
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard");
  };
  return <>
 <ToolPageHeader title="SSL Certificate Checker" description="Verify SSL/TLS certificate details, expiration dates, and transparency logs." />
 
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <GridPattern />

 <div className="lg:col-span-2 space-y-6">
 <Card>
 <CardHeader>
 <CardTitle>Check Domain</CardTitle>
 <CardDescription>Enter a domain name to check its SSL certificate</CardDescription>
 </CardHeader>
 <CardContent>
 <form onSubmit={e => {
              e.preventDefault();
              checkSsl(domain);
            }} className="flex gap-2">
 <div className="flex-1 relative">
 <Input value={domain} onChange={e => setDomain(e.target.value)} placeholder="e.g., toolzium.com" className="pl-9" />
 <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
 </div>
 <Button type="submit" disabled={loading}>
 {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
 Check SSL
 </Button>
 </form>
 
 {error && <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md border border-red-200 flex items-start gap-2">
 <AlertTriangle className="w-5 h-5 shrink-0" />
 <p className="text-sm font-medium">{error}</p>
 </div>}
 </CardContent>
 </Card>

 {result && <Card>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle className="flex items-center gap-2">
 {getStatusDetails(result.not_after).icon}
 Certificate Results
 </CardTitle>
 <CardDescription>Latest certificate from transparency logs</CardDescription>
 </div>
 <Button variant="outline" size="sm" onClick={copyResults}>
 <Copy className="w-4 h-4 mr-2" />
 Copy
 </Button>
 </CardHeader>
 <CardContent className="space-y-6">
 
 <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg border">
 <div className="flex-1">
 <p className="text-sm text-muted-foreground mb-1">Status</p>
 <Badge className={getStatusDetails(result.not_after).color}>
 {getStatusDetails(result.not_after).label}
 </Badge>
 </div>
 <div className="flex-1">
 <p className="text-sm text-muted-foreground mb-1">Expires In</p>
 <p className="font-semibold flex items-center gap-2">
 <Clock className="w-4 h-4" />
 {getDaysUntilExpiry(result.not_after)} days
 </p>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-1">
 <Label className="text-muted-foreground">Common Name (CN)</Label>
 <p className="font-medium break-all">{result.common_name}</p>
 </div>
 <div className="space-y-1">
 <Label className="text-muted-foreground">Issuer</Label>
 <p className="font-medium">{parseIssuer(result.issuer_name)}</p>
 </div>
 <div className="space-y-1">
 <Label className="text-muted-foreground">Valid From</Label>
 <p className="font-medium flex items-center gap-2">
 <Calendar className="w-4 h-4 text-muted-foreground" />
 {new Date(result.not_before).toLocaleDateString(undefined, {
                    dateStyle: 'medium'
                  })}
 </p>
 </div>
 <div className="space-y-1">
 <Label className="text-muted-foreground">Valid Until</Label>
 <p className="font-medium flex items-center gap-2">
 <Calendar className="w-4 h-4 text-muted-foreground" />
 {new Date(result.not_after).toLocaleDateString(undefined, {
                    dateStyle: 'medium'
                  })}
 </p>
 </div>
 <div className="space-y-1 md:col-span-2">
 <Label className="text-muted-foreground">Serial Number</Label>
 <p className="font-mono text-sm break-all bg-muted p-2 rounded">{result.serial_number}</p>
 </div>
 </div>

 <div className="space-y-2">
 <Label className="text-muted-foreground">Subject Alternative Names (SANs)</Label>
 <div className="bg-muted p-3 rounded-md max-h-40 overflow-y-auto">
 <ul className="space-y-1 text-sm font-mono">
 {result.name_value.split(/\r?\n/).map((name, i) => <li key={i}>{name}</li>)}
 </ul>
 </div>
 </div>

 </CardContent>
 </Card>}
 </div>

 <div>
 <Card>
 <CardHeader className="flex flex-row items-center justify-between py-4">
 <CardTitle className="text-lg flex items-center gap-2">
 <History className="w-4 h-4" />
 History
 </CardTitle>
 {history.length > 0 && <Button variant="ghost" size="icon" onClick={clearHistory} title="Clear history">
 <Trash2 className="w-4 h-4 text-muted-foreground" />
 </Button>}
 </CardHeader>
 <CardContent>
 {history.length === 0 ? <p className="text-sm text-muted-foreground text-center py-4">No recent checks</p> : <ul className="space-y-2">
 {history.map((item, i) => <li key={i}>
 <Button onClick={() => checkSsl(item.domain)} className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors flex flex-col gap-1">
 <span className="font-medium text-sm truncate">{item.domain}</span>
 <span className="text-xs text-muted-foreground">
 {new Date(item.date).toLocaleString()}
 </span>
 </Button>
 </li>)}
 </ul>}
 </CardContent>
 </Card>
 </div>
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our SSL Certificate Checker?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our SSL Certificate Checker provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/network/ssl-checker" max={6} />

    </div>
 </>;
}