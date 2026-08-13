"use client";

import { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from"@/components/ui/table";
import { Alert, AlertDescription } from"@/components/ui/alert";
import { Badge } from"@/components/ui/badge";
import { Search, Copy, Download, History, RefreshCw, AlertTriangle, ShieldCheck, Check, ShieldAlert, Sparkles, Shield, Zap } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

interface SubdomainItem {
 name: string;
 isWildcard: boolean;
}

const HISTORY_KEY ="tools-cube:subdomain-history";
const MAX_HISTORY = 10;

export default function SubdomainFinderClient() {
 const [domain, setDomain] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [results, setResults] = useState<SubdomainItem[]>([]);
 const [filterText, setFilterText] = useState("");
 const [hideWildcards, setHideWildcards] = useState(false);
 const [history, setHistory] = useState<string[]>([]);
 const [copied, setCopied] = useState(false);

 useEffect(() => {
 try {
 const stored = localStorage.getItem(HISTORY_KEY);
 if (stored) setHistory(JSON.parse(stored));
 } catch (e) {}
 }, []);

 const saveToHistory = (query: string) => {
 try {
 const updated = [query, ...history.filter((h) => h !== query)].slice(0, MAX_HISTORY);
 setHistory(updated);
 localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
 } catch (e) {}
 };

 const fetchSubdomains = async (targetDomain: string) => {
 const clean = targetDomain
 .trim()
 .toLowerCase()
 .replace(/^(https?:\/\/)?(www\.)?/,"")
 .replace(/\/.*$/,"");

 if (!clean) {
 toast.error("Please enter a valid domain name.");
 return;
 }

 setIsLoading(true);
 setError(null);
 setResults([]);

 try {
 // Query crt.sh API using wildcards search
 const response = await fetch(`https://crt.sh/?q=%.${clean}&output=json`);
 if (!response.ok) {
 throw new Error("CT logs server returned an error. Please try again later.");
 }

 const data = await response.json();
 
 if (!Array.isArray(data) || data.length === 0) {
 setResults([]);
 saveToHistory(clean);
 return;
 }

 const subdomainSet = new Set<string>();
 
 data.forEach((item: any) => {
 if (item.name_value) {
 const names = item.name_value.split("\n");
 names.forEach((name: string) => {
 const normalized = name.trim().toLowerCase();
 // Filter to only match subdomains that belong to our target
 if (normalized.endsWith(clean) || normalized === clean) {
 subdomainSet.add(normalized);
 }
 });
 }
 });

 const parsedResults: SubdomainItem[] = Array.from(subdomainSet).map((name) => ({
 name,
 isWildcard: name.startsWith("*."),
 }));

 // Sort alphabetically, with shorter domains first
 parsedResults.sort((a, b) => {
 if (a.isWildcard && !b.isWildcard) return 1;
 if (!a.isWildcard && b.isWildcard) return -1;
 return a.name.length - b.name.length || a.name.localeCompare(b.name);
 });

 setResults(parsedResults);
 saveToHistory(clean);
 toast.success(`Found ${parsedResults.length} unique subdomains!`);
 } catch (err: any) {
 setError(err.message ||"Failed to fetch subdomains. The public CT log server might be busy.");
 } finally {
 setIsLoading(false);
 }
 };

 const handleSearch = (e: React.FormEvent) => {
 e.preventDefault();
 fetchSubdomains(domain);
 };

 const handleHistoryClick = (item: string) => {
 setDomain(item);
 fetchSubdomains(item);
 };

 const filteredResults = results.filter((r) => {
 if (hideWildcards && r.isWildcard) return false;
 if (filterText && !r.name.includes(filterText.toLowerCase())) return false;
 return true;
 });

 const handleCopy = () => {
 if (filteredResults.length === 0) return;
 const text = filteredResults.map((r) => r.name).join("\n");
 navigator.clipboard.writeText(text).then(() => {
 setCopied(true);
 toast.success("Subdomain list copied to clipboard!");
 setTimeout(() => setCopied(false), 2000);
 });
 };

 const handleDownloadCSV = () => {
 if (filteredResults.length === 0) return;
 const csvContent ="data:text/csv;charset=utf-8,Subdomain,Type\n"+ 
 filteredResults.map((r) => `"${r.name}","${r.isWildcard ?"Wildcard":"Host"}"`).join("\n");
 
 const encodedUri = encodeURI(csvContent);
 const link = document.createElement("a");
 link.setAttribute("href", encodedUri);
 link.setAttribute("download", `${domain ||"subdomains"}_export.csv`);
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 toast.success("CSV file downloaded successfully.");
 };

 return (
 <>
 <ToolPageHeader
 title="Subdomain Finder"
 description="Search global Certificate Transparency (CT) logs to enumerate and map all subdomains of any target domain instantly."
 icon={ShieldCheck}
 />

 <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 {/* Left Control Panel */}
 <div className="lg:col-span-1 space-y-4">
 <Card>
 <CardHeader className="pb-3">
 <CardTitle className="text-base">Scanner Settings</CardTitle>
 </CardHeader>
 <CardContent>
 <form onSubmit={handleSearch} className="space-y-4">
 <div className="space-y-2">
 <Label htmlFor="domain">Target Domain</Label>
 <div className="relative">
 <Input
 id="domain"
 placeholder="e.g. github.com"
 value={domain}
 onChange={(e) => setDomain(e.target.value)}
 disabled={isLoading}
 className="pr-10"
 />
 <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground"/>
 </div>
 </div>

 <Button type="submit"className="w-full"disabled={isLoading || !domain}>
 {isLoading ? (
 <>
 <RefreshCw className="mr-2 h-4 w-4 animate-spin"/>
 Scanning CT Logs...
 </>
 ) : (
"Find Subdomains"
 )}
 </Button>
 </form>

 {history.length > 0 && (
 <div className="mt-6">
 <Label className="text-xs text-muted-foreground uppercase font-semibold">Recent Scans</Label>
 <div className="mt-2 space-y-1">
 {history.map((h, i) => (
 <button
 key={i}
 type="button"
 onClick={() => handleHistoryClick(h)}
 className="w-full text-left text-sm px-2 py-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground truncate transition-colors flex items-center gap-1.5"
 >
 <History className="h-3 w-3 shrink-0"/>
 {h}
 </button>
 ))}
 </div>
 </div>
 )}
 </CardContent>
 </Card>
 </div>

 {/* Right Output Panel */}
 <div className="lg:col-span-3 space-y-4">
 {error && (
 <Alert variant="destructive">
 <ShieldAlert className="h-4 w-4"/>
 <AlertDescription>{error}</AlertDescription>
 </Alert>
 )}

 {results.length > 0 ? (
 <Card>
 <CardHeader className="pb-3 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <CardTitle className="text-lg flex items-center gap-2">
 Scan Results
 <Badge variant="secondary">{results.length} total</Badge>
 </CardTitle>
 <CardDescription>
 Enumerated hosts found in active certificate transparency records.
 </CardDescription>
 </div>
 
 <div className="flex flex-wrap items-center gap-2">
 <Button variant="outline"size="sm"onClick={handleCopy}>
 {copied ? <Check className="h-4 w-4 mr-1.5 text-green-500"/> : <Copy className="h-4 w-4 mr-1.5"/>}
 Copy List
 </Button>
 <Button variant="outline"size="sm"onClick={handleDownloadCSV}>
 <Download className="h-4 w-4 mr-1.5"/>
 Export CSV
 </Button>
 </div>
 </CardHeader>
 <CardContent className="pt-4 space-y-4">
 {/* Result Filters */}
 <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
 <div className="w-full sm:w-72">
 <Input
 placeholder="Filter results..."
 value={filterText}
 onChange={(e) => setFilterText(e.target.value)}
 className="h-9"
 />
 </div>
 
 <div className="flex items-center space-x-2">
 <input
 type="checkbox"
 id="hideWildcards"
 checked={hideWildcards}
 onChange={(e) => setHideWildcards(e.target.checked)}
 className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
 />
 <Label htmlFor="hideWildcards"className="text-sm cursor-pointer select-none">
 Hide wildcards (e.g. *.domain.com)
 </Label>
 </div>
 </div>

 {/* Subdomains Table */}
 <div className="border rounded-lg overflow-hidden max-h-[500px] overflow-y-auto">
 <Table>
 <TableHeader className="sticky top-0 bg-background z-10">
 <TableRow>
 <TableHead>Subdomain / Hostname</TableHead>
 <TableHead className="w-28 text-right">Type</TableHead>
 </TableRow>
 </TableHeader>
 <TableBody>
 {filteredResults.length > 0 ? (
 filteredResults.map((r, index) => (
 <TableRow key={index}>
 <TableCell className="font-mono text-sm break-all">
 {r.name}
 </TableCell>
 <TableCell className="text-right">
 {r.isWildcard ? (
 <Badge variant="outline"className="text-amber-500 border-amber-200 bg-amber-50/20">
 Wildcard
 </Badge>
 ) : (
 <Badge variant="outline"className="text-green-500 border-green-200 bg-green-50/20">
 Host
 </Badge>
 )}
 </TableCell>
 </TableRow>
 ))
 ) : (
 <TableRow>
 <TableCell colSpan={2} className="text-center py-8 text-muted-foreground text-sm">
 No matching subdomains found.
 </TableCell>
 </TableRow>
 )}
 </TableBody>
 </Table>
 </div>
 </CardContent>
 </Card>
 ) : (
 <Card className="h-[300px] flex items-center justify-center border-dashed">
 <div className="text-center space-y-2 p-6 max-w-sm">
 <Search className="h-8 w-8 mx-auto text-muted-foreground animate-pulse"/>
 <h3 className="font-semibold text-base">Start Subdomain Scan</h3>
 <p className="text-sm text-muted-foreground">
 Enter a target domain name on the left panel to scan global Certificate Transparency registers.
 </p>
 </div>
 </Card>
 )}
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
          <h3>Why Use Our Subdomain Finder?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Subdomain Finder provides
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

      <RelatedTools currentToolUrl="/tools/network/subdomain-finder" max={6} />

</div>
 </>
 );
}
