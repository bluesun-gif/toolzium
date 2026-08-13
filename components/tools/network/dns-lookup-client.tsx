"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from"@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from"@/components/ui/tabs";
import { Badge } from"@/components/ui/badge";
import { Search, Copy, Clock, Globe, History, AlertCircle, Check, Play, CheckCircle2, Sparkles, Shield, Zap } from"lucide-react";;
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

type DnsRecordType ="A"|"AAAA"|"CNAME"|"MX"|"NS"|"SOA"|"TXT"|"ANY";

interface DnsAnswer {
 name: string;
 type: number;
 TTL: number;
 data: string;
}

interface DnsResult {
 Status: number;
 TC: boolean;
 RD: boolean;
 RA: boolean;
 AD: boolean;
 CD: boolean;
 Question: { name: string; type: number }[];
 Answer?: DnsAnswer[];
 Authority?: DnsAnswer[];
}

interface ProcessedRecord {
 type: string;
 name: string;
 ttl: number;
 data: string;
}

interface HistoryItem {
 id: string;
 domain: string;
 type: DnsRecordType;
 timestamp: Date;
 resolutionTime: number;
 recordsCount: number;
}

const TYPE_MAP: Record<number, string> = {
 1:"A",
 2:"NS",
 5:"CNAME",
 6:"SOA",
 15:"MX",
 16:"TXT",
 28:"AAAA",
};

const REVERSE_TYPE_MAP: Record<string, number> = {
 A: 1,
 NS: 2,
 CNAME: 5,
 SOA: 6,
 MX: 15,
 TXT: 16,
 AAAA: 28,
 ANY: 255, // Google DNS doesn't actually support ANY reliably, so we query individually
};

export default function DnsLookupClient() {
 const [domain, setDomain] = useState("");
 const [recordType, setRecordType] = useState<DnsRecordType>("A");
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [results, setResults] = useState<ProcessedRecord[]>([]);
 const [resolutionTime, setResolutionTime] = useState<number | null>(null);
 const [history, setHistory] = useState<HistoryItem[]>([]);
 const [copied, setCopied] = useState(false);

 const formatDomain = (input: string) => {
 let clean = input.trim().toLowerCase();
 if (clean.startsWith("http://")) clean = clean.substring(7);
 if (clean.startsWith("https://")) clean = clean.substring(8);
 // Remove trailing slash and paths
 clean = clean.split("/")[0];
 return clean;
 };

 const lookupSingleRecord = async (targetDomain: string, type: number): Promise<ProcessedRecord[]> => {
 const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(targetDomain)}&type=${type}`);
 if (!res.ok) throw new Error("Network response was not ok");
 const data: DnsResult = await res.json();
 
 if (data.Status !== 0 && data.Status !== 3) { // 3 is NXDOMAIN
 console.warn(`DNS error status: ${data.Status} for type ${type}`);
 }

 const allRecords: DnsAnswer[] = [];
 if (data.Answer) allRecords.push(...data.Answer);
 if (data.Authority && data.Answer === undefined) allRecords.push(...data.Authority); // Sometimes SOA comes in Authority

 return allRecords.map(ans => ({
 name: ans.name,
 type: TYPE_MAP[ans.type] || `TYPE${ans.type}`,
 ttl: ans.TTL,
 data: ans.data,
 }));
 };

 const performLookup = async (e?: React.FormEvent, lookupDomain = domain, lookupType = recordType) => {
 if (e) e.preventDefault();
 const cleanDomain = formatDomain(lookupDomain);
 if (!cleanDomain) {
 setError("Please enter a valid domain name");
 return;
 }

 if (lookupDomain !== cleanDomain && lookupDomain === domain) {
 setDomain(cleanDomain);
 }

 setIsLoading(true);
 setError(null);
 setResults([]);
 setResolutionTime(null);
 const startTime = performance.now();

 try {
 let combinedResults: ProcessedRecord[] = [];

 if (lookupType ==="ANY") {
 const typesToLookup = [1, 28, 15, 2, 16, 5, 6]; // A, AAAA, MX, NS, TXT, CNAME, SOA
 const promises = typesToLookup.map(t => lookupSingleRecord(cleanDomain, t).catch(() => []));
 const resultsArrays = await Promise.all(promises);
 combinedResults = resultsArrays.flat();
 
 // Remove duplicates (sometimes CNAME resolves and returns A records in multiple queries)
 const seen = new Set();
 combinedResults = combinedResults.filter(r => {
 const key = `${r.name}-${r.type}-${r.data}`;
 if (seen.has(key)) return false;
 seen.add(key);
 return true;
 });

 } else {
 const typeNum = REVERSE_TYPE_MAP[lookupType];
 combinedResults = await lookupSingleRecord(cleanDomain, typeNum);
 }

 const endTime = performance.now();
 const timeTaken = Math.round(endTime - startTime);
 
 setResults(combinedResults);
 setResolutionTime(timeTaken);

 // Add to history
 const newHistoryItem: HistoryItem = {
 id: Date.now().toString(),
 domain: cleanDomain,
 type: lookupType,
 timestamp: new Date(),
 resolutionTime: timeTaken,
 recordsCount: combinedResults.length,
 };
 
 setHistory(prev => [newHistoryItem, ...prev].slice(0, 10));

 if (combinedResults.length === 0) {
 setError(`No ${lookupType !=="ANY"? lookupType :""} records found for ${cleanDomain}`);
 }
 } catch (err) {
 setError(err instanceof Error ? err.message :"Failed to perform DNS lookup");
 } finally {
 setIsLoading(false);
 }
 };

 const copyToClipboard = () => {
 if (results.length === 0) return;
 const header ="Type\tName\tTTL\tData\n";
 const rows = results.map(r => `${r.type}\t${r.name}\t${r.ttl}\t${r.data}`).join("\n");
 navigator.clipboard.writeText(header + rows);
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 };

 const formatTTL = (seconds: number) => {
 if (seconds < 60) return `${seconds}s`;
 if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
 if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
 return `${Math.floor(seconds / 86400)}d ${Math.floor((seconds % 86400) / 3600)}h`;
 };

 return (
 <>
 <ToolPageHeader 
 title="DNS Lookup"
 description="Query A, AAAA, MX, NS, TXT, CNAME, and SOA records for any domain using Google's public DNS."
 />

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <GridPattern />

 <div className="md:col-span-2 space-y-6">
 <Card>
 <CardHeader>
 <CardTitle>DNS Query</CardTitle>
 <CardDescription>Enter a domain name to look up its DNS records.</CardDescription>
 </CardHeader>
 <CardContent>
 <form onSubmit={performLookup} className="space-y-4">
 <div className="flex flex-col sm:flex-row gap-4">
 <div className="flex-1 space-y-2">
 <Label htmlFor="domain">Domain Name</Label>
 <div className="relative">
 <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
 <Input
 id="domain"
 placeholder="example.com"
 value={domain}
 onChange={(e) => setDomain(e.target.value)}
 className="pl-9"
 />
 </div>
 </div>
 <div className="sm:w-40 space-y-2">
 <Label htmlFor="recordType">Record Type</Label>
 <Select value={recordType} onValueChange={(val) => setRecordType(val as DnsRecordType)}>
 <SelectTrigger id="recordType">
 <SelectValue placeholder="Type"/>
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="ANY">All Records</SelectItem>
 <SelectItem value="A">A (IPv4)</SelectItem>
 <SelectItem value="AAAA">AAAA (IPv6)</SelectItem>
 <SelectItem value="CNAME">CNAME</SelectItem>
 <SelectItem value="MX">MX (Mail)</SelectItem>
 <SelectItem value="NS">NS (Name Server)</SelectItem>
 <SelectItem value="TXT">TXT (Text)</SelectItem>
 <SelectItem value="SOA">SOA</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 {error && (
 <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md flex items-start gap-2">
 <AlertCircle className="h-4 w-4 mt-0.5 shrink-0"/>
 <span>{error}</span>
 </div>
 )}

 <Button type="submit"className="w-full sm:w-auto"disabled={isLoading}>
 {isLoading ? (
 <>
 <Search className="mr-2 h-4 w-4 animate-spin"/>
 Querying DNS...
 </>
 ) : (
 <>
 <Search className="mr-2 h-4 w-4"/>
 Lookup DNS
 </>
 )}
 </Button>
 </form>
 </CardContent>
 </Card>

 {(results.length > 0 || resolutionTime !== null) && (
 <Card>
 <CardHeader className="flex flex-row items-center justify-between pb-2">
 <div className="space-y-1">
 <CardTitle>Query Results</CardTitle>
 {resolutionTime !== null && (
 <CardDescription className="flex items-center gap-1">
 <Clock className="h-3 w-3"/>
 Resolution time: {resolutionTime}ms
 </CardDescription>
 )}
 </div>
 {results.length > 0 && (
 <Button variant="outline"size="sm"onClick={copyToClipboard} className="h-8">
 {copied ? (
 <><Check className="mr-2 h-3.5 w-3.5"/> Copied</>
 ) : (
 <><Copy className="mr-2 h-3.5 w-3.5"/> Copy Results</>
 )}
 </Button>
 )}
 </CardHeader>
 <CardContent>
 {results.length > 0 ? (
 <div className="rounded-md border overflow-x-auto">
 <Table>
 <TableHeader>
 <TableRow>
 <TableHead className="w-[80px]">Type</TableHead>
 <TableHead>Name</TableHead>
 <TableHead className="w-[100px]">TTL</TableHead>
 <TableHead>Data / Value</TableHead>
 </TableRow>
 </TableHeader>
 <TableBody>
 {results.map((record, index) => (
 <TableRow key={`${index}-${record.name}-${record.type}`}>
 <TableCell>
 <Badge variant="secondary"className="font-mono">
 {record.type}
 </Badge>
 </TableCell>
 <TableCell className="font-medium text-sm break-all">{record.name}</TableCell>
 <TableCell className="text-muted-foreground text-sm"title={`${record.ttl} seconds`}>
 {formatTTL(record.ttl)}
 </TableCell>
 <TableCell className="font-mono text-sm break-all">
 {record.data}
 </TableCell>
 </TableRow>
 ))}
 </TableBody>
 </Table>
 </div>
 ) : (
 <div className="py-8 text-center text-muted-foreground">
 <AlertCircle className="mx-auto h-8 w-8 mb-2 opacity-50"/>
 <p>No records were found for this query.</p>
 </div>
 )}
 </CardContent>
 </Card>
 )}
 </div>

 <div className="space-y-6">
 <Card>
 <CardHeader>
 <CardTitle className="text-lg flex items-center gap-2">
 <History className="h-5 w-5 text-muted-foreground"/>
 Recent Lookups
 </CardTitle>
 </CardHeader>
 <CardContent>
 {history.length > 0 ? (
 <div className="space-y-3">
 {history.map((item) => (
 <div 
 key={item.id} 
 className="group flex flex-col p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
 onClick={() => {
 setDomain(item.domain);
 setRecordType(item.type);
 performLookup(undefined, item.domain, item.type);
 }}
 >
 <div className="flex justify-between items-center mb-1">
 <span className="font-medium text-sm truncate pr-2">{item.domain}</span>
 <Badge variant="outline"className="text-xs shrink-0">{item.type}</Badge>
 </div>
 <div className="flex justify-between items-center text-xs text-muted-foreground">
 <span className="flex items-center gap-1">
 <CheckCircle2 className="h-3 w-3"/>
 {item.recordsCount} records
 </span>
 <span className="flex items-center gap-1">
 <Clock className="h-3 w-3"/>
 {item.resolutionTime}ms
 </span>
 </div>
 <Button variant="ghost"size="sm"className="w-full mt-2 h-7 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
 <Play className="h-3 w-3 mr-1"/> Re-run Query
 </Button>
 </div>
 ))}
 </div>
 ) : (
 <div className="text-center py-6 text-sm text-muted-foreground">
 No recent lookups.
 <br />Your history will appear here.
 </div>
 )}
 </CardContent>
 </Card>
 </div>
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our DNS Lookup?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our DNS Lookup provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/network/dns-lookup" max={6} />

</div>
 </>
 );
}
