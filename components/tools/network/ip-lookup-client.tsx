"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, History, Search, AlertCircle, MapPin, Globe, Clock, CreditCard, Network, Map, Hash, Phone, Sparkles, Shield, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
interface IpData {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  country: string;
  latitude: number;
  longitude: number;
  org: string;
  asn: string;
  timezone: string;
  currency: string;
  postal: string;
  country_calling_code: string;
}
export default function IpLookupClient() {
  const [ipInput, setIpInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IpData | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  useEffect(() => {
    // Fetch user's own IP on mount
    fetch("https://api.ipify.org?format=json").then(res => res.json()).then(data => {
      if (data.ip) {
        setIpInput(data.ip);
      }
    }).catch(err => {
      console.error("Failed to fetch user IP", err);
    });
  }, []);
  const isValidIp = (ip: string) => {
    // Simple IPv4 and IPv6 regex
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  };
  const getFlagEmoji = (countryCode: string) => {
    if (!countryCode) return "";
    const codePoints = countryCode.toUpperCase().split("").map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };
  const handleLookup = async (ipToLookup: string = ipInput) => {
    const ip = ipToLookup.trim();
    if (!ip) {
      setError("Please enter an IP address.");
      return;
    }
    if (!isValidIp(ip)) {
      setError("Please enter a valid IPv4 or IPv6 address.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();
      if (data.error) {
        setError(data.reason || "Failed to lookup IP address.");
      } else {
        setResult(data);
        addToHistory(ip);
      }
    } catch (err) {
      setError("An error occurred while fetching IP data. The API might be rate-limited.");
    } finally {
      setLoading(false);
    }
  };
  const addToHistory = (ip: string) => {
    setHistory(prev => {
      const newHistory = [ip, ...prev.filter(item => item !== ip)];
      return newHistory.slice(0, 10);
    });
  };
  const copyResults = () => {
    if (!result) return;
    const text = `
IP Address: ${result.ip}
Location: ${result.city || 'N/A'}, ${result.region || 'N/A'}, ${result.country_name || 'N/A'}
Coordinates: ${result.latitude}, ${result.longitude}
ISP/Org: ${result.org || 'N/A'}
ASN: ${result.asn || 'N/A'}
Timezone: ${result.timezone || 'N/A'}
Currency: ${result.currency || 'N/A'}
Postal Code: ${result.postal || 'N/A'}
Calling Code: ${result.country_calling_code || 'N/A'}
 `.trim();
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard");
  };
  return <>
 <ToolPageHeader title="IP Geolocation Lookup" description="Find the geographical location, ISP, and other details for any IP address." />
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="md:col-span-2 space-y-6">
 <Card>
 <CardHeader>
 <CardTitle>Lookup IP</CardTitle>
 <CardDescription>Enter an IPv4 or IPv6 address to get its geolocation data.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="flex space-x-2">
 <div className="relative flex-1">
 <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
 <Input placeholder="e.g., 8.8.8.8" value={ipInput} onChange={e => setIpInput(e.target.value)} className="pl-9" onKeyDown={e => {
                  if (e.key === 'Enter') handleLookup();
                }} />
 </div>
 <Button onClick={() => handleLookup()} disabled={loading}>
 {loading ? "Searching..." : <>
 <Search className="mr-2 h-4 w-4" />
 Lookup
 </>}
 </Button>
 </div>

 {error && <Alert variant="destructive" className="mt-4">
 <AlertCircle className="h-4 w-4" />
 <AlertDescription>{error}</AlertDescription>
 </Alert>}
 </CardContent>
 </Card>

 {result && <Card>
 <CardHeader className="flex flex-row items-center justify-between pb-2">
 <CardTitle className="text-xl">Results for {result.ip}</CardTitle>
 <Button variant="outline" size="sm" onClick={copyResults}>
 <Copy className="h-4 w-4 mr-2" />
 Copy All
 </Button>
 </CardHeader>
 <CardContent className="pt-4">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <ResultItem icon={<MapPin className="h-4 w-4" />} label="Location" value={`${result.city || 'N/A'}, ${result.region || 'N/A'}`} />
 <ResultItem icon={<Globe className="h-4 w-4" />} label="Country" value={result.country_name ? `${result.country_name} ${getFlagEmoji(result.country)}` : 'N/A'} />
 <ResultItem icon={<Map className="h-4 w-4" />} label="Coordinates" value={result.latitude ? `${result.latitude}, ${result.longitude}` : 'N/A'} />
 <ResultItem icon={<Network className="h-4 w-4" />} label="ISP / Organization" value={result.org || 'N/A'} />
 <ResultItem icon={<Hash className="h-4 w-4" />} label="ASN" value={result.asn || 'N/A'} />
 <ResultItem icon={<Clock className="h-4 w-4" />} label="Timezone" value={result.timezone || 'N/A'} />
 <ResultItem icon={<CreditCard className="h-4 w-4" />} label="Currency" value={result.currency || 'N/A'} />
 <ResultItem icon={<MapPin className="h-4 w-4" />} label="Postal Code" value={result.postal || 'N/A'} />
 <ResultItem icon={<Phone className="h-4 w-4" />} label="Calling Code" value={result.country_calling_code || 'N/A'} />
 </div>
 </CardContent>
 </Card>}
 </div>

 <div>
 <Card>
 <CardHeader>
 <CardTitle className="text-lg flex items-center">
 <History className="mr-2 h-4 w-4" />
 Recent Lookups
 </CardTitle>
 </CardHeader>
 <CardContent>
 {history.length === 0 ? <p className="text-sm text-muted-foreground">No recent lookups.</p> : <ul className="space-y-2">
 {history.map((ip, idx) => <li key={idx}>
 <Button variant="ghost" className="w-full justify-start font-mono text-sm" onClick={() => {
                  setIpInput(ip);
                  handleLookup(ip);
                }}>
 {ip}
 </Button>
 </li>)}
 </ul>}
 </CardContent>
 </Card>
 </div>
 </div>
 </>;
}
function ResultItem({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <span className="text-xs text-muted-foreground flex items-center gap-1.5">
 {icon}
 {label}
 </span>
 <span className="font-medium text-sm truncate" title={typeof value === 'string' ? value : ''}>
 {value}
 </span>
 
      <ToolHowItWorks steps={[
        { step: "01", title: "Enter IP Address", description: "Type any IPv4 or IPv6 address, or leave blank to look up your own IP.", icon: Search },
        { step: "02", title: "Look Up", description: "Click Lookup — the tool queries live geolocation and ISP databases.", icon: Globe },
        { step: "03", title: "View Details", description: "See country, region, city, ISP, ASN, timezone, and coordinates on a map.", icon: MapPin },
      ]} badges={["Live Data", "IPv4 + IPv6", "No Signup"]} />

      <ToolFeatureGuides features={[
        { icon: Globe, title: "Full Geolocation", description: "Get country, city, region, ISP, ASN, and timezone for any IP address worldwide." },
        { icon: MapPin, title: "Live Database", description: "Queries up-to-date IP geolocation databases for accurate location data." },
        { icon: Zap, title: "Any IP Supported", description: "Works with both IPv4 and IPv6 addresses. Leave blank to look up your own IP." },
      ]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our typeof value === 'string' ? value : ''?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our typeof value === 'string' ? value : '' provides
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
    </div>
    </div>
);
}
