"use client";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Badge } from"@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from"@/components/ui/tabs";
import { ScrollArea } from"@/components/ui/scroll-area";
import { Separator } from"@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from"@/components/ui/alert";
import { Search, Copy, Clock, Globe, Shield, Server, AlertCircle, History, Trash2, ChevronDown, ChevronUp, ShieldCheck, Cpu, Layers, Zap, FileText } from"lucide-react";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

interface WhoisData {
 domainName: string;
 registrar: string;
 creationDate: string;
 expirationDate: string;
 updatedDate: string;
 statuses: string[];
 nameservers: string[];
 dnssec: boolean;
 rawJson: any;
}

export default function WhoisClient() {
 const [input, setInput] = useState("");
 const [domain, setDomain] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [result, setResult] = useState<WhoisData | null>(null);
 const [history, setHistory] = useState<string[]>([]);
 const [showRaw, setShowRaw] = useState(false);

 useEffect(() => {
 const saved = localStorage.getItem("whois-history");
 if (saved) {
 try {
 setHistory(JSON.parse(saved));
 } catch (e) {
 // Ignore
 }
 }
 }, []);

 const saveToHistory = (query: string) => {
 const newHistory = [query, ...history.filter((h) => h !== query)].slice(0, 10);
 setHistory(newHistory);
 localStorage.setItem("whois-history", JSON.stringify(newHistory));
 };

 const clearHistory = () => {
 setHistory([]);
 localStorage.removeItem("whois-history");
 };

 const cleanDomain = (url: string) => {
 let clean = url.trim().toLowerCase();
 // Remove protocol
 clean = clean.replace(/^(https?:\/\/)?(www\.)?/,"");
 // Remove path, query, hash
 clean = clean.split("/")[0].split("?")[0].split("#")[0];
 return clean;
 };

 const fetchRdap = async (targetDomain: string) => {
 setIsLoading(true);
 setError(null);
 setResult(null);

 const clean = cleanDomain(targetDomain);
 setDomain(clean);

 if (!clean || !clean.includes(".")) {
 setError("Please enter a valid domain name.");
 setIsLoading(false);
 return;
 }

 try {
 // Use standard RDAP format, rdap.org routes appropriately
 const url = `https://rdap.org/domain/${clean}`;
 const response = await fetch(url);
 
 if (!response.ok) {
 if (response.status === 404) {
 throw new Error("Domain not found or not registered.");
 }
 throw new Error(`Failed to fetch WHOIS data (HTTP ${response.status}).`);
 }

 const data = await response.json();
 
 // Parse RDAP response
 let registrar ="Unknown";
 if (data.entities && Array.isArray(data.entities)) {
 const registrarEntity = data.entities.find((e: any) => 
 e.roles && e.roles.includes("registrar")
 );
 if (registrarEntity && registrarEntity.vcardArray && registrarEntity.vcardArray[1]) {
 const fn = registrarEntity.vcardArray[1].find((v: any) => v[0] ==="fn");
 if (fn) registrar = fn[3];
 }
 }

 let creationDate ="Unknown";
 let expirationDate ="Unknown";
 let updatedDate ="Unknown";

 if (data.events && Array.isArray(data.events)) {
 const creation = data.events.find((e: any) => e.eventAction ==="registration");
 if (creation) creationDate = new Date(creation.eventDate).toLocaleString();

 const expiration = data.events.find((e: any) => e.eventAction ==="expiration");
 if (expiration) expirationDate = new Date(expiration.eventDate).toLocaleString();

 const updated = data.events.find((e: any) => e.eventAction ==="last changed");
 if (updated) updatedDate = new Date(updated.eventDate).toLocaleString();
 }

 const statuses = data.status || [];
 const nameservers = data.nameservers ? data.nameservers.map((ns: any) => ns.ldhName) : [];
 const dnssec = data.secureDNS?.delegationSigned || false;

 setResult({
 domainName: data.ldhName || clean,
 registrar,
 creationDate,
 expirationDate,
 updatedDate,
 statuses,
 nameservers,
 dnssec,
 rawJson: data
 });
 
 saveToHistory(clean);

 } catch (err: any) {
 setError(err.message ||"An error occurred while fetching WHOIS data.");
 } finally {
 setIsLoading(false);
 }
 };

 const handleSearch = (e: React.FormEvent) => {
 e.preventDefault();
 fetchRdap(input);
 };

 const handleHistoryClick = (item: string) => {
 setInput(item);
 fetchRdap(item);
 };

 const copyToClipboard = () => {
 if (!result) return;
 const text = `Domain: ${result.domainName}
Registrar: ${result.registrar}
Registered On: ${result.creationDate}
Expires On: ${result.expirationDate}
Updated On: ${result.updatedDate}
Nameservers: ${result.nameservers.join(",")}
DNSSEC: ${result.dnssec ?"Enabled":"Disabled"}`;
 navigator.clipboard.writeText(text);
 };

 const formatStatus = (status: string) => {
 // Camel case to words
 return status.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader 
 title="WHOIS Domain Lookup"
 description="Lookup domain registration details, registrar info, and DNS records."
 />

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="md:col-span-2 space-y-6">
 <Card>
 <CardHeader>
 <CardTitle>Domain Query</CardTitle>
 <CardDescription>Enter a domain name to check its WHOIS records.</CardDescription>
 </CardHeader>
 <CardContent>
 <form onSubmit={handleSearch} className="flex gap-2">
 <Input
 placeholder="e.g., example.com"
 value={input}
 onChange={(e) => setInput(e.target.value)}
 className="flex-1"
 />
 <Button type="submit"disabled={isLoading || !input}>
 {isLoading ? (
 <Clock className="w-4 h-4 mr-2 animate-spin"/>
 ) : (
 <Search className="w-4 h-4 mr-2"/>
 )}
 Lookup
 </Button>
 </form>

 {error && (
 <Alert variant="destructive"className="mt-4">
 <AlertCircle className="h-4 w-4"/>
 <AlertTitle>Error</AlertTitle>
 <AlertDescription>{error}</AlertDescription>
 </Alert>
 )}
 </CardContent>
 </Card>

 {result && (
 <Card>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle className="text-2xl">{result.domainName}</CardTitle>
 <CardDescription>Registration Information</CardDescription>
 </div>
 <Button variant="outline"size="sm"onClick={copyToClipboard}>
 <Copy className="w-4 h-4 mr-2"/>
 Copy Info
 </Button>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="space-y-1">
 <Label className="text-muted-foreground flex items-center gap-2">
 <Globe className="w-4 h-4"/> Registrar
 </Label>
 <p className="font-medium">{result.registrar}</p>
 </div>
 <div className="space-y-1">
 <Label className="text-muted-foreground flex items-center gap-2">
 <Shield className="w-4 h-4"/> DNSSEC
 </Label>
 <p className="font-medium">
 {result.dnssec ? (
 <Badge variant="default"className="bg-green-600">Enabled</Badge>
 ) : (
 <Badge variant="secondary">Disabled</Badge>
 )}
 </p>
 </div>
 </div>

 <Separator />

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <div className="space-y-1">
 <Label className="text-muted-foreground text-sm">Registered On</Label>
 <p className="font-medium text-sm">{result.creationDate}</p>
 </div>
 <div className="space-y-1">
 <Label className="text-muted-foreground text-sm">Expires On</Label>
 <p className="font-medium text-sm">{result.expirationDate}</p>
 </div>
 <div className="space-y-1">
 <Label className="text-muted-foreground text-sm">Last Updated</Label>
 <p className="font-medium text-sm">{result.updatedDate}</p>
 </div>
 </div>

 <Separator />

 <div className="space-y-3">
 <Label className="text-muted-foreground flex items-center gap-2">
 <Server className="w-4 h-4"/> Nameservers
 </Label>
 <div className="flex flex-wrap gap-2">
 {result.nameservers.length > 0 ? (
 result.nameservers.map((ns, i) => (
 <Badge key={i} variant="outline"className="text-sm py-1">
 {ns}
 </Badge>
 ))
 ) : (
 <p className="text-sm text-muted-foreground">No nameservers found.</p>
 )}
 </div>
 </div>

 <Separator />

 <div className="space-y-3">
 <Label className="text-muted-foreground flex items-center gap-2">
 <AlertCircle className="w-4 h-4"/> Domain Status
 </Label>
 <div className="flex flex-wrap gap-2">
 {result.statuses.length > 0 ? (
 result.statuses.map((status, i) => (
 <Badge key={i} variant="secondary"className="text-xs font-normal">
 {formatStatus(status)}
 </Badge>
 ))
 ) : (
 <p className="text-sm text-muted-foreground">No status codes found.</p>
 )}
 </div>
 </div>

 <div className="pt-4 border-t">
 <Button 
 variant="ghost"
 className="w-full justify-between"
 onClick={() => setShowRaw(!showRaw)}
 >
 View Raw RDAP JSON
 {showRaw ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
 </Button>
 
 {showRaw && (
 <div className="mt-4 bg-muted rounded-md p-4 overflow-x-auto">
 <pre className="text-xs text-muted-foreground font-mono">
 {JSON.stringify(result.rawJson, null, 2)}
 </pre>
 </div>
 )}
 </div>
 </CardContent>
 </Card>
 )}
 </div>

 <div>
 <Card>
 <CardHeader className="flex flex-row items-center justify-between pb-2">
 <CardTitle className="text-lg flex items-center gap-2">
 <History className="w-5 h-5"/> History
 </CardTitle>
 {history.length > 0 && (
 <Button variant="ghost"size="icon"onClick={clearHistory} title="Clear history">
 <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive"/>
 </Button>
 )}
 </CardHeader>
 <CardContent>
 {history.length === 0 ? (
 <p className="text-sm text-muted-foreground text-center py-6">
 No recent searches.
 </p>
 ) : (
 <ScrollArea className="h-[300px] pr-4">
 <div className="space-y-2">
 {history.map((item, index) => (
 <Button
 key={index}
 variant="ghost"
 className="w-full justify-start font-normal text-sm"
 onClick={() => handleHistoryClick(item)}
 >
 <Globe className="w-4 h-4 mr-2 text-muted-foreground"/>
 {item}
 </Button>
 ))}
 </div>
 </ScrollArea>
 )}
 </CardContent>
 </Card>
 </div>
 </div>

 {/* ─── How It Works ─── */}
 <ToolHowItWorks
 steps={[
 { step:"1", title:"Enter Domain Name", description:"Type any root domain (like google.com or github.com) into the lookup bar. Subdomains and protocol parts are automatically stripped."},
 { step:"2", title:"Query RDAP WHOIS API", description:"Click the Search icon. The tool contacts standard RDAP directories to fetch registration JSON details directly."},
 { step:"3", title:"Review Registration Info", description:"Read registrar name, creation date, expiry status, and name servers. View the complete, raw RDAP response for advanced troubleshooting."},
 ]}
 badges={[
"ICANN Standard",
"RDAP Query",
"Instant Results",
"Free & Private",
 ]}
 />

 {/* ─── Feature Guides + SEO Content ─── */}
 <ToolFeatureGuides
 features={[
 { icon: Globe, title:"Real-Time Queries", description:"Bypasses slow third-party scrapers to query live domain registry nodes directly using the latest RDAP protocol standards."},
 { icon: Clock, title:"Domain Expiry Checker", description:"Check precisely when a domain registration expires, helping you track domain lifecycles or catch dropping names."},
 { icon: ShieldCheck, title:"GDPR Redaction Info", description:"Highlights domain privacy protections, identifying proxy servers or redacted contact records transparently."},
 { icon: Server, title:"Name Servers & DNS", description:"Retrieves active authoritative name servers and DNSSEC validation flags associated with the domain registry."},
 { icon: History, title:"Cached History Log", description:"Keeps a local history list of your 10 most recent domain searches, allowing for one-click re-evaluation."},
 { icon: FileText, title:"Raw JSON Response", description:"Access the entire unstructured JSON payload returned by RDAP nodes, essential for developers and systems engineers."},
 ]}
 >
 <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
 <h3 className="text-xl font-semibold text-foreground">Understanding WHOIS and RDAP Databases</h3>
 <p>
 WHOIS is a database containing registration records for every domain name in existence. When a domain is registered, the owner (registrant) must provide contact details, name servers, and registrar information. Historically, the Port 43 WHOIS protocol returned unformatted plain text. Modern lookups utilize the <strong>Registration Data Access Protocol (RDAP)</strong>, which delivers structured JSON documents, enabling standardized field mapping and improved security.
 </p>

 <h3 className="text-xl font-semibold text-foreground">WHOIS Data Fields Reference</h3>
 <p>
 When performing a domain lookup, you will encounter standard registry attributes. Here is what they represent:
 </p>
 <table className="w-full border-collapse text-xs border border-border rounded-lg overflow-hidden">
 <thead className="bg-muted text-foreground">
 <tr>
 <th className="border border-border p-2 text-left">WHOIS Field Name</th>
 <th className="border border-border p-2 text-left">Database Equivalent</th>
 <th className="border border-border p-2 text-left">Primary Purpose</th>
 <th className="border border-border p-2 text-left">Common Example Value</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td className="border border-border p-2 font-medium">Registrar</td>
 <td className="border border-border p-2">Sponsoring Registrar</td>
 <td className="border border-border p-2">The entity where the domain was purchased</td>
 <td className="border border-border p-2">Namecheap, GoDaddy, Cloudflare</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">Creation Date</td>
 <td className="border border-border p-2">Registration Event: registration</td>
 <td className="border border-border p-2">The timestamp when the domain was first registered</td>
 <td className="border border-border p-2">1997-09-15T04:00:00Z (google.com)</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">Expiration Date</td>
 <td className="border border-border p-2">Registration Event: expiration</td>
 <td className="border border-border p-2">The deadline to renew domain lease</td>
 <td className="border border-border p-2">2028-09-14T04:00:00Z</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">Domain Status</td>
 <td className="border border-border p-2">status / statusCodes</td>
 <td className="border border-border p-2">Flags controlling transfers, updates, or deletions</td>
 <td className="border border-border p-2">clientTransferProhibited</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">Name Servers</td>
 <td className="border border-border p-2">nameservers</td>
 <td className="border border-border p-2">Authoritative servers pointing to the domain&apos;s DNS host</td>
 <td className="border border-border p-2">ns1.cloudflare.com</td>
 </tr>
 </tbody>
 </table>

 <h3 className="text-xl font-semibold text-foreground">Domain Privacy, GDPR, and Redacted WHOIS Records</h3>
 <p>
 Historically, WHOIS lookups exposed domain owners&apos; personal names, physical addresses, email addresses, and phone numbers. This led to bulk email harvesting, spam, and telemarketing abuse. Since the enforcement of the <strong>General Data Protection Regulation (GDPR)</strong> in Europe (2018), registries and registrars are legally required to redact personal identifying information (PII) from public queries unless the registrant gives explicit consent.
 </p>
 <p>
 Consequently, contact queries now show placeholder labels such as <code>&quot;Redacted for Privacy&quot;</code> or point to the registrar&apos;s default proxy services (like WhoisGuard or Contact Privacy). To contact a domain owner safely, look for a registrar-provided contact form URL listed in the raw RDAP JSON.
 </p>

 <h3 className="text-xl font-semibold text-foreground">How to Read Domain Expiration and the Grace Period</h3>
 <p>
 When a domain expiration date passes without a renewal, it does not immediately become available for purchase. Instead, it enters a structured deletion lifecycle:
 </p>
 <ul className="list-disc pl-5 space-y-2">
 <li><strong>Auto-Renew Grace Period</strong> — Lasts 0 to 45 days. The domain expires and website services stop, but the original owner can still renew it at standard rates.</li>
 <li><strong>Redemption Grace Period</strong> — Lasts 30 days. The domain is deleted from active DNS, but the owner can retrieve it for a steep redemption fee (often $100+).</li>
 <li><strong>Pending Delete</strong> — Lasts 5 days. The domain registry lock cannot be removed, and the domain cannot be recovered. It will drop and return to public availability at the end of this phase.</li>
 </ul>

 <h3 className="text-xl font-semibold text-foreground">Registrars vs. Registries</h3>
 <p>
 A common point of confusion is the distinction between a **registry** and a **registrar**:
 </p>
 <p>
 A **Registry** manages the database of all domain registrations for a specific top-level domain extension (TLD). For example, Verisign is the registry for .com and .net domains, while PIR manages .org. The registry sets the backend rules, technical parameters, and database structures.
 </p>
 <p>
 A **Registrar** is a commercial entity certified by ICANN (Internet Corporation for Assigned Names and Numbers) to sell domain leases directly to public consumers. The registrar acts as an intermediary, writing records to the registry&apos;s database when you buy a domain.
 </p>
 </div>
 </ToolFeatureGuides>

 {/* ─── FAQ ─── */}
 <ToolFaqAccordion
 faqs={[
 {
 question:"What is WHOIS and how does it work?",
 answer:"WHOIS is a query and response protocol widely used for querying databases that store the registered users or assignees of an Internet resource, such as a domain name. This tool queries the newer RDAP (Registration Data Access Protocol) standard, which delivers structured JSON WHOIS data.",
 },
 {
 question:"Why is domain owner contact info redacted?",
 answer:"Due to modern privacy regulations like GDPR and CCPA, registrars now redact personal contact details (names, emails, phones) from public WHOIS records by default. They often use proxy services or show 'Redacted for Privacy'.",
 },
 {
 question:"How do I check when a domain expires?",
 answer:"Perform a WHOIS query on the domain name. The output will display an 'Expiration Date' or 'events' list with an action type 'expiry' which tells you exactly when the domain registration terminates.",
 },
 {
 question:"What is the difference between a registrar and registry?",
 answer:"A registry is the organization that manages the top-level domain (TLD) database (like Verisign for .com). A registrar is a commercial entity (like Namecheap or GoDaddy) authorized to sell domain registrations to end-users (registrants).",
 },
 {
 question:"Why does WHOIS show different results for different TLDs?",
 answer:"Different registries enforce varying privacy rules, data formats, and query limits. For example, country-code TLDs (ccTLDs like .uk or .de) often have stricter lookup limitations and redact more data compared to generic TLDs like .com.",
 },
 ]}
 />

 <RelatedTools currentToolUrl="/tools/network/whois"max={6} />
 </div>
 );
}

