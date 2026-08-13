"use client";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from"@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from"@/components/ui/alert";
import { Badge } from"@/components/ui/badge";
import { ShieldCheck, ShieldAlert, Info, Copy, Check, Loader2, ArrowRight, Sparkles, Shield, Zap } from"lucide-react";
import { checkHttpHeaders } from"@/lib/actions/http-headers.action";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { cn } from"@/lib/utils";

type HeaderData = {
 name: string;
 value: string;
};

const SECURITY_HEADERS = [
"strict-transport-security",
"content-security-policy",
"x-frame-options",
"x-content-type-options",
"x-xss-protection",
"referrer-policy",
"permissions-policy"
];

export default function HttpHeadersClient() {
 const [url, setUrl] = useState("");
 const [headers, setHeaders] = useState<HeaderData[]>([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const [copied, setCopied] = useState(false);
 const [hasSearched, setHasSearched] = useState(false);
 
 const handleCheckHeaders = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!url) return;
 
 let targetUrl = url.trim();
 if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
 targetUrl ="https://"+ targetUrl;
 setUrl(targetUrl);
 }
 
 setLoading(true);
 setError("");
 setHeaders([]);
 setHasSearched(false);
 
 try {
 const res = await checkHttpHeaders(targetUrl);
 
 if (!res.ok) {
 throw new Error(res.error);
 }
 
 const headersArray = Object.entries(res.headers).map(([name, value]) => ({
 name: name.toLowerCase(),
 value: String(value)
 }));
 
 // Sort alphabetically
 headersArray.sort((a, b) => a.name.localeCompare(b.name));
 
 setHeaders(headersArray);
 setHasSearched(true);
 } catch (err: any) {
 console.error(err);
 setError(err.message ||"An error occurred while fetching headers.");
 } finally {
 setLoading(false);
 }
 };

 const copyHeaders = () => {
 if (headers.length === 0) return;
 
 const text = headers.map(h => `${h.name}: ${h.value}`).join("\n");
 navigator.clipboard.writeText(text);
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 };
 
 const getSecurityScore = () => {
 if (headers.length === 0) return 0;
 
 const headerNames = headers.map(h => h.name);
 let presentCount = 0;
 
 SECURITY_HEADERS.forEach(secHeader => {
 if (headerNames.includes(secHeader)) {
 presentCount++;
 }
 });
 
 return Math.round((presentCount / SECURITY_HEADERS.length) * 100);
 };
 
 const securityScore = getSecurityScore();
 
 let scoreColor ="bg-red-500";
 if (securityScore >= 80) scoreColor ="bg-green-500";
 else if (securityScore >= 50) scoreColor ="bg-yellow-500";
 else if (securityScore > 0) scoreColor ="bg-orange-500";

 return (
 <>
 <ToolPageHeader title="HTTP Header Checker"description="Analyze the HTTP response headers of any URL for security and configuration insights."/>
 
 <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
 <div className="md:col-span-1 space-y-6">
 <Card>
 <CardHeader>
 <CardTitle>Check URL</CardTitle>
 <CardDescription>Enter a URL to fetch its response headers</CardDescription>
 </CardHeader>
 <CardContent>
 <form onSubmit={handleCheckHeaders} className="space-y-4">
 <div className="space-y-2">
 <Label htmlFor="url-input">Target URL</Label>
 <div className="flex">
 <Input
 id="url-input"
 type="url"
 placeholder="example.com"
 value={url}
 onChange={(e) => setUrl(e.target.value)}
 required
 className="flex-1"
 />
 </div>
 </div>
 <Button type="submit"className="w-full"disabled={loading}>
 {loading ? (
 <>
 <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
 Checking...
 </>
 ) : (
 <>
 Check Headers
 <ArrowRight className="ml-2 h-4 w-4"/>
 </>
 )}
 </Button>
 </form>
 </CardContent>
 </Card>
 
 {hasSearched && headers.length > 0 && (
 <Card>
 <CardHeader>
 <CardTitle>Security Overview</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <div className="flex justify-between text-sm">
 <span>Security Score</span>
 <span className="font-medium">{securityScore}/100</span>
 </div>
 <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
 <div 
 className={cn("h-full", (scoreColor), "transition-all duration-500")} 
 style={{ width: `${securityScore}%` }} 
 />
 </div>
 </div>
 
 <div className="space-y-3 text-sm">
 <h4 className="font-semibold text-muted-foreground">Security Headers Status</h4>
 {SECURITY_HEADERS.map(secHeader => {
 const isPresent = headers.some(h => h.name === secHeader);
 return (
 <div key={secHeader} className="flex items-center justify-between">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <span className="truncate pr-2"title={secHeader}>{secHeader}</span>
 {isPresent ? (
 <Badge variant="default"className="bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20 border-green-200">Present</Badge>
 ) : (
 <Badge variant="outline"className="text-red-500 border-red-200">Missing</Badge>
 )}
 </div>
 );
 })}
 </div>
 </CardContent>
 </Card>
 )}
 </div>
 
 <div className="md:col-span-2">
 {error && (
 <Alert variant="destructive"className="mb-6">
 <ShieldAlert className="h-4 w-4"/>
 <AlertTitle>Error</AlertTitle>
 <AlertDescription>{error}</AlertDescription>
 </Alert>
 )}
 
 {!hasSearched && !error && !loading && (
 <Card className="h-full border-dashed bg-muted/30">
 <CardContent className="flex flex-col items-center justify-center h-full min-h-[300px] text-muted-foreground">
 <Info className="h-12 w-12 mb-4 opacity-20"/>
 <p>Enter a URL and click"Check Headers"to see the results.</p>
 <p className="text-sm mt-2 opacity-70 text-center max-w-md">
 This tool uses a proxy to fetch headers, which helps bypass browser CORS restrictions.
 </p>
 </CardContent>
 </Card>
 )}
 
 {hasSearched && headers.length > 0 && (
 <Card>
 <CardHeader className="flex flex-row items-center justify-between pb-2">
 <div>
 <CardTitle>Response Headers</CardTitle>
 <CardDescription>Found {headers.length} headers</CardDescription>
 </div>
 <Button variant="outline"size="sm"onClick={copyHeaders}>
 {copied ? <Check className="h-4 w-4 mr-2 text-green-500"/> : <Copy className="h-4 w-4 mr-2"/>}
 {copied ?"Copied":"Copy All"}
 </Button>
 </CardHeader>
 <CardContent>
 <div className="rounded-md border overflow-hidden">
 <Table>
 <TableHeader>
 <TableRow>
 <TableHead className="w-1/3">Header</TableHead>
 <TableHead>Value</TableHead>
 </TableRow>
 </TableHeader>
 <TableBody>
 {headers.map((header, index) => {
 const isSecurityHeader = SECURITY_HEADERS.includes(header.name);
 return (
 <TableRow key={index} className={isSecurityHeader ?"bg-green-50 dark:bg-green-950/20":""}>
 <TableCell className="font-medium align-top">
 <div className="flex items-center gap-2">
 {header.name}
 {isSecurityHeader && (
 <ShieldCheck className="h-3.5 w-3.5 text-green-600 dark:text-green-400 shrink-0"/>
 )}
 </div>
 </TableCell>
 <TableCell className="break-all font-mono text-sm">{header.value}</TableCell>
 </TableRow>
 );
 })}
 </TableBody>
 </Table>
 </div>
 <div className="mt-4 text-xs text-muted-foreground flex items-center">
 <Info className="h-3 w-3 mr-1"/>
 Note: Some headers might be added or modified by the proxy server used to fetch them.
 </div>
 </CardContent>
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
          <h3>Why Use Our secHeader?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our secHeader provides
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

      <RelatedTools currentToolUrl="/tools/network/http-headers" max={6} />

</div>
 </>
 );
}
