"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Textarea } from"@/components/ui/textarea";
import { Badge } from"@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from"@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from"@/components/ui/table";
import { Clock, Server, Shield, CheckCircle2, XCircle, AlertCircle, Play, Copy, Check, Sparkles, Zap } from"lucide-react";
import { formatDistanceStrict } from"date-fns";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

const SAMPLE_HEADERS = `Return-Path: <bounce@example.com>
Delivered-To: recipient@example.com
Received: by 2002:a05:123:456:0:0:0:0 with SMTP id abcdef.123;
 Wed, 01 May 2024 10:15:30 -0700 (PDT)
Authentication-Results: mx.google.com;
 dkim=pass header.i=@example.com header.s=s1 header.b=xyz;
 spf=pass (google.com: domain of bounce@example.com designates 192.0.2.1 as permitted sender) smtp.mailfrom=bounce@example.com;
 dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=example.com
Received: from mail.example.com (mail.example.com. [192.0.2.1])
 by mx.google.com with ESMTPS id xyz.123
 for <recipient@example.com>
 (version=TLS1_3 cipher=TLS_AES_256_GCM_SHA384 bits=256/256);
 Wed, 01 May 2024 10:15:28 -0700 (PDT)
Received: from internal.example.com (localhost [127.0.0.1])
 by mail.example.com (Postfix) with ESMTP id 123456
 for <recipient@example.com>; Wed, 1 May 2024 10:15:26 -0700 (PDT)
Date: Wed, 01 May 2024 17:15:25 +0000
From: Sender <sender@example.com>
To: Recipient <recipient@example.com>
Message-ID: <123456@example.com>
Subject: Example Test Message
MIME-Version: 1.0
Content-Type: text/plain; charset=utf-8`;

interface ParsedHeader {
 key: string;
 value: string;
}

interface HopInfo {
 id: number;
 hopNumber: number;
 raw: string;
 from: string;
 by: string;
 with: string;
 time: Date | null;
 timeString: string;
 delay: string;
 ip: string;
}

interface AnalysisResult {
 headers: ParsedHeader[];
 basicInfo: Record<string, string>;
 hops: HopInfo[];
 security: {
 spf: string;
 dkim: string;
 dmarc: string;
 };
}

export default function EmailHeadersClient() {
 const [input, setInput] = useState("");
 const [result, setResult] = useState<AnalysisResult | null>(null);
 const [copied, setCopied] = useState(false);

 const analyzeHeaders = () => {
 if (!input.trim()) return;

 // 1. Unfold headers
 const lines = input.split(/\r?\n/);
 const headers: ParsedHeader[] = [];
 let currentKey ="";
 let currentValue ="";

 for (const line of lines) {
 if (line.match(/^\s+/)) {
 currentValue +=""+ line.trim();
 } else {
 if (currentKey) {
 headers.push({ key: currentKey.toLowerCase(), value: currentValue });
 }
 const colonIndex = line.indexOf(":");
 if (colonIndex !== -1) {
 currentKey = line.substring(0, colonIndex).trim();
 currentValue = line.substring(colonIndex + 1).trim();
 } else {
 currentKey ="";
 currentValue ="";
 }
 }
 }
 if (currentKey) {
 headers.push({ key: currentKey.toLowerCase(), value: currentValue });
 }

 // 2. Extract Basic Info
 const basicInfo: Record<string, string> = {
 Subject: headers.find((h) => h.key ==="subject")?.value ||"N/A",
 From: headers.find((h) => h.key ==="from")?.value ||"N/A",
 To: headers.find((h) => h.key ==="to")?.value ||"N/A",
 Date: headers.find((h) => h.key ==="date")?.value ||"N/A",
"Message-ID": headers.find((h) => h.key ==="message-id")?.value ||"N/A",
"Return-Path": headers.find((h) => h.key ==="return-path")?.value ||"N/A",
"Content-Type": headers.find((h) => h.key ==="content-type")?.value ||"N/A",
"X-Mailer": headers.find((h) => h.key ==="x-mailer")?.value || headers.find((h) => h.key ==="user-agent")?.value ||"N/A",
"Spam Status": headers.find((h) => h.key ==="x-spam-status")?.value ||"N/A",
 };

 // 3. Security (Authentication-Results & Received-SPF)
 let spf ="None", dkim ="None", dmarc ="None";
 const authResults = headers.find((h) => h.key ==="authentication-results")?.value.toLowerCase() ||"";
 const receivedSpf = headers.find((h) => h.key ==="received-spf")?.value.toLowerCase() ||"";
 
 if (authResults.includes("spf=pass") || receivedSpf.includes("pass")) spf ="Pass";
 else if (authResults.includes("spf=fail") || receivedSpf.includes("fail")) spf ="Fail";
 else if (authResults.includes("spf=neutral") || receivedSpf.includes("neutral")) spf ="Neutral";
 else if (authResults.includes("spf=softfail") || receivedSpf.includes("softfail")) spf ="SoftFail";
 
 if (authResults.includes("dkim=pass")) dkim ="Pass";
 else if (authResults.includes("dkim=fail")) dkim ="Fail";

 if (authResults.includes("dmarc=pass")) dmarc ="Pass";
 else if (authResults.includes("dmarc=fail")) dmarc ="Fail";

 // 4. Trace Hops
 const receivedHeaders = headers.filter((h) => h.key ==="received").reverse();
 const hops: HopInfo[] = [];

 let prevTime: Date | null = null;

 receivedHeaders.forEach((header, index) => {
 const val = header.value;
 const ipMatch = val.match(/\[([0-9a-fA-F:\.]+)\]/);
 const timeMatch = val.split(";").pop()?.trim();
 
 let from ="Unknown";
 let by ="Unknown";
 let withProto ="Unknown";
 
 const fromMatch = val.match(/from\s+([^\s]+)/i);
 if (fromMatch) from = fromMatch[1];
 
 const byMatch = val.match(/by\s+([^\s]+)/i);
 if (byMatch) by = byMatch[1];
 
 const withMatch = val.match(/with\s+([^\s]+)/i);
 if (withMatch) withProto = withMatch[1];

 let currentTime: Date | null = null;
 let delay ="0s";

 if (timeMatch) {
 currentTime = new Date(timeMatch);
 if (currentTime.toString() !=="Invalid Date") {
 if (prevTime) {
 try {
 delay = formatDistanceStrict(prevTime, currentTime, { addSuffix: false });
 } catch (e) {
 delay ="Unknown";
 }
 }
 prevTime = currentTime;
 } else {
 currentTime = null;
 }
 }

 hops.push({
 id: index,
 hopNumber: index + 1,
 raw: val,
 from,
 by,
 with: withProto,
 time: currentTime,
 timeString: timeMatch ||"Unknown",
 delay,
 ip: ipMatch ? ipMatch[1] :"Unknown",
 });
 });

 setResult({
 headers,
 basicInfo,
 hops,
 security: { spf, dkim, dmarc },
 });
 };

 const getSecurityBadgeVariant = (status: string) => {
 switch (status.toLowerCase()) {
 case"pass": return"default";
 case"fail":
 case"softfail": return"destructive";
 default: return"secondary";
 }
 };
 
 const getSecurityIcon = (status: string) => {
 switch (status.toLowerCase()) {
 case"pass": return <CheckCircle2 className="w-4 h-4 mr-1 text-green-500"/>;
 case"fail":
 case"softfail": return <XCircle className="w-4 h-4 mr-1"/>;
 default: return <AlertCircle className="w-4 h-4 mr-1"/>;
 }
 };

 const copyResults = async () => {
 if (!result) return;
 const text = Object.entries(result.basicInfo)
 .map(([k, v]) => `${k}: ${v}`)
 .join("\n");
 await navigator.clipboard.writeText(text);
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 };

 return (
 <>
 <ToolPageHeader title="Email Header Analyzer"description="Paste raw email headers to trace path and analyze authentication."/>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <ToolBackground />

 <Card className="md:col-span-2">
 <CardHeader>
 <CardTitle>Raw Email Headers</CardTitle>
 <CardDescription>Paste the full email headers (including Received, Authentication-Results, etc.)</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <Textarea
 className="font-mono h-64 text-sm"
 placeholder="Paste email headers here..."
 value={input}
 onChange={(e) => setInput(e.target.value)}
 />
 <div className="flex flex-wrap gap-2">
 <Button onClick={analyzeHeaders}>
 <Play className="w-4 h-4 mr-2"/>
 Analyze Headers
 </Button>
 <Button variant="outline"onClick={() => setInput(SAMPLE_HEADERS)}>
 Load Sample Headers
 </Button>
 {result && (
 <Button variant="secondary"onClick={copyResults}>
 {copied ? <Check className="w-4 h-4 mr-2"/> : <Copy className="w-4 h-4 mr-2"/>}
 {copied ?"Copied":"Copy Basic Info"}
 </Button>
 )}
 </div>
 </CardContent>
 </Card>
 </div>

 {result && (
 <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <Card>
 <CardHeader className="pb-2">
 <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
 <Shield className="w-4 h-4 mr-2"/> SPF
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="flex items-center text-xl font-bold">
 {getSecurityIcon(result.security.spf)}
 {result.security.spf}
 </div>
 </CardContent>
 </Card>
 <Card>
 <CardHeader className="pb-2">
 <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
 <Shield className="w-4 h-4 mr-2"/> DKIM
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="flex items-center text-xl font-bold">
 {getSecurityIcon(result.security.dkim)}
 {result.security.dkim}
 </div>
 </CardContent>
 </Card>
 <Card>
 <CardHeader className="pb-2">
 <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
 <Shield className="w-4 h-4 mr-2"/> DMARC
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="flex items-center text-xl font-bold">
 {getSecurityIcon(result.security.dmarc)}
 {result.security.dmarc}
 </div>
 </CardContent>
 </Card>
 </div>

 <Card>
 <CardHeader>
 <CardTitle>Analysis Results</CardTitle>
 </CardHeader>
 <CardContent>
 <Tabs defaultValue="basic">
 <TabsList className="grid w-full grid-cols-3">
 <TabsTrigger value="basic">Basic Info</TabsTrigger>
 <TabsTrigger value="hops">Routing (Hops)</TabsTrigger>
 <TabsTrigger value="raw">All Parsed Headers</TabsTrigger>
 </TabsList>
 
 <TabsContent value="basic"className="pt-4">
 <Table>
 <TableBody>
 {Object.entries(result.basicInfo).map(([k, v]) => (
 <TableRow key={k}>
 <TableCell className="font-medium w-1/3">{k}</TableCell>
 <TableCell className="break-all">{v}</TableCell>
 </TableRow>
 ))}
 </TableBody>
 </Table>
 </TabsContent>
 
 <TabsContent value="hops"className="pt-4">
 <div className="space-y-4">
 {result.hops.length === 0 ? (
 <p className="text-muted-foreground">No routing hops found.</p>
 ) : (
 result.hops.map((hop) => (
 <Card key={hop.id} className="overflow-hidden border-l-4 border-l-primary">
 <CardHeader className="p-4 bg-muted/50 border-b">
 <div className="flex justify-between items-center">
 <span className="font-bold">Hop {hop.hopNumber}</span>
 <Badge variant="outline"className="flex items-center">
 <Clock className="w-3 h-3 mr-1"/> Delay: {hop.delay}
 </Badge>
 </div>
 </CardHeader>
 <CardContent className="p-4 text-sm space-y-2">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
 <div>
 <span className="font-semibold text-muted-foreground">From:</span> {hop.from}
 </div>
 <div>
 <span className="font-semibold text-muted-foreground">By:</span> {hop.by}
 </div>
 <div>
 <span className="font-semibold text-muted-foreground">IP:</span> {hop.ip}
 </div>
 <div>
 <span className="font-semibold text-muted-foreground">With:</span> {hop.with}
 </div>
 <div className="sm:col-span-2">
 <span className="font-semibold text-muted-foreground">Time:</span> {hop.timeString}
 </div>
 </div>
 </CardContent>
 </Card>
 ))
 )}
 </div>
 </TabsContent>
 
 <TabsContent value="raw"className="pt-4">
 <Table>
 <TableHeader>
 <TableRow>
 <TableHead className="w-[200px]">Header Name</TableHead>
 <TableHead>Value</TableHead>
 </TableRow>
 </TableHeader>
 <TableBody>
 {result.headers.map((h, i) => (
 <TableRow key={i}>
 <TableCell className="font-mono text-xs font-semibold break-words align-top">{h.key}</TableCell>
 <TableCell className="font-mono text-xs break-all whitespace-pre-wrap">{h.value}</TableCell>
 </TableRow>
 ))}
 </TableBody>
 </Table>
 </TabsContent>
 </Tabs>
 </CardContent>
 </Card>
 
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
          <h3>Why Use Our Email Header Analyzer?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Email Header Analyzer provides
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

      <RelatedTools currentToolUrl="/tools/network/email-headers" max={6} />

</div>
 )}
 </>
 );
}
