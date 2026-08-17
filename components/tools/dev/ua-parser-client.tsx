"use client";

import { Input } from "@/components/ui/input";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Globe, Monitor, Smartphone, Bot, Cpu, Search, Copy, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";
const commonUAs = [{
  name: "Chrome (Windows 11)",
  ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}, {
  name: "Safari (iPhone)",
  ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1"
}, {
  name: "Firefox (Ubuntu)",
  ua: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/119.0"
}, {
  name: "Googlebot",
  ua: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
}, {
  name: "Edge (macOS)",
  ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0"
}];
export default function UaParserClient() {
  const [uaString, setUaString] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUaString(navigator.userAgent);
    }
  }, []);
  const parseUA = useCallback((ua: string) => {
    if (!ua) return null;
    let browser = "Unknown",
      browserVersion = "";
    let os = "Unknown",
      osVersion = "";
    let device = "Desktop";
    let engine = "Unknown";
    let isBot = false;
    if (/bot|crawl|spider|slurp/i.test(ua)) isBot = true;
    if (/Edg\/([\d.]+)/.test(ua)) {
      browser = "Edge";
      browserVersion = ua.match(/Edg\/([\d.]+)/)![1];
    } else if (/Chrome\/([\d.]+)/.test(ua) && !/Edg/.test(ua)) {
      browser = "Chrome";
      browserVersion = ua.match(/Chrome\/([\d.]+)/)![1];
    } else if (/Firefox\/([\d.]+)/.test(ua)) {
      browser = "Firefox";
      browserVersion = ua.match(/Firefox\/([\d.]+)/)![1];
    } else if (/Version\/([\d.]+).*Safari/.test(ua)) {
      browser = "Safari";
      browserVersion = ua.match(/Version\/([\d.]+)/)![1];
    }
    if (/Windows NT (\d+\.\d+)/.test(ua)) {
      os = "Windows";
      const v = ua.match(/Windows NT (\d+\.\d+)/)![1];
      osVersion = v === "10.0" ? "10/11" : v;
    } else if (/Mac OS X ([\d_]+)/.test(ua)) {
      os = "macOS";
      osVersion = ua.match(/Mac OS X ([\d_]+)/)![1].replace(/_/g, ".");
    } else if (/iPhone OS ([\d_]+)/.test(ua)) {
      os = "iOS";
      osVersion = ua.match(/iPhone OS ([\d_]+)/)![1].replace(/_/g, ".");
      device = "Mobile";
    } else if (/Android ([\d.]+)/.test(ua)) {
      os = "Android";
      osVersion = ua.match(/Android ([\d.]+)/)![1];
      device = /Mobile/.test(ua) ? "Mobile" : "Tablet";
    } else if (/Linux/.test(ua)) {
      os = "Linux";
    }
    if (/Gecko\//.test(ua) && !/like Gecko/.test(ua)) engine = "Gecko";else if (/AppleWebKit\//.test(ua)) engine = "WebKit / Blink";else if (/Trident\//.test(ua)) engine = "Trident";
    if (/Tablet|iPad/.test(ua)) device = "Tablet";
    return {
      browser,
      browserVersion,
      os,
      osVersion,
      device,
      engine,
      isBot,
      raw: ua
    };
  }, []);
  const handleParse = () => {
    const result = parseUA(uaString);
    setParsedData(result);
    if (result) toast.success("User-Agent parsed successfully!");
  };
  const useMyUA = () => {
    if (typeof window !== "undefined") {
      setUaString(navigator.userAgent);
      setParsedData(parseUA(navigator.userAgent));
    }
  };
  const copyRaw = () => {
    if (uaString) {
      navigator.clipboard.writeText(uaString);
      toast.success("Copied to clipboard!");
    }
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Search} title="User Agent Parser" description="Analyze and decode any User-Agent string to identify browsers, operating systems, devices, and bots instantly." />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Globe className="w-4 h-4 text-primary" /> User-Agent String Input
 </CardTitle>
 </CardHeader>
 <CardContent className="p-5 space-y-4">
 <textarea value={uaString} onChange={e => setUaString(e.target.value)} className={cn(textareaClass, "min-h-[100px]")} placeholder="Paste a User-Agent string here..." />
 <div className="flex flex-wrap gap-3">
 <Button onClick={handleParse} className="flex-1 sm:flex-none text-xs font-semibold">
 <Search className="w-4 h-4 mr-2" /> Parse String
 </Button>
 <Button variant="outline" onClick={useMyUA} className="flex-1 sm:flex-none text-xs font-semibold">
 <Monitor className="w-4 h-4 mr-2" /> Use My UA
 </Button>
 <Button variant="ghost" onClick={copyRaw} className="flex-1 sm:flex-none text-xs font-semibold">
 <Copy className="w-4 h-4 mr-2" /> Copy
 </Button>
 <select onChange={e => {
              setUaString(e.target.value);
              setParsedData(parseUA(e.target.value));
            }} className="p-2 rounded-md border border-border bg-background text-sm flex-1 sm:flex-none outline-none" defaultValue="">
 <option value="" disabled>Load Common UA...</option>
 {commonUAs.map((item, i) => <option key={i} value={item.ua}>{item.name}</option>)}
 </select>
 </div>
 </CardContent>
 </GlassCard>

 {parsedData && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 <GlassCard>
 <CardContent className="p-5 flex items-center gap-4">
 <Globe className="w-10 h-10 text-primary" />
 <div>
 <p className="text-xs text-muted-foreground uppercase tracking-wider">Browser</p>
 <p className="text-lg font-bold text-foreground">{parsedData.browser} <span className="text-muted-foreground font-normal text-sm">{parsedData.browserVersion}</span></p>
 </div>
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardContent className="p-5 flex items-center gap-4">
 <Monitor className="w-10 h-10 text-primary" />
 <div>
 <p className="text-xs text-muted-foreground uppercase tracking-wider">Operating System</p>
 <p className="text-lg font-bold text-foreground">{parsedData.os} <span className="text-muted-foreground font-normal text-sm">{parsedData.osVersion}</span></p>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardContent className="p-5 flex items-center gap-4">
 <Smartphone className="w-10 h-10 text-primary" />
 <div>
 <p className="text-xs text-muted-foreground uppercase tracking-wider">Device Type</p>
 <p className="text-lg font-bold text-foreground">{parsedData.device}</p>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardContent className="p-5 flex items-center gap-4">
 <Cpu className="w-10 h-10 text-primary" />
 <div>
 <p className="text-xs text-muted-foreground uppercase tracking-wider">Rendering Engine</p>
 <p className="text-lg font-bold text-foreground">{parsedData.engine}</p>
 </div>
 </CardContent>
 </GlassCard>

 <Card className={cn(cardClass, parsedData.isBot ? "border-destructive/50 bg-destructive/5" : "")}>
 <CardContent className="p-5 flex items-center gap-4">
 <Bot className={`w-10 h-10 ${parsedData.isBot ? "text-destructive" : "text-muted-foreground"}`} />
 <div>
 <p className="text-xs text-muted-foreground uppercase tracking-wider">Bot / Crawler</p>
 <p className={`text-lg font-bold ${parsedData.isBot ? "text-destructive" : "text-foreground"}`}>
 {parsedData.isBot ? "Detected" : "Human / Standard"}
 </p>
 </div>
 </CardContent>
 </Card>
 </div>}

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Input UA String",
        description: "Paste any raw User-Agent header string or load a common preset from the dropdown.",
        icon: Globe
      }, {
        step: "02",
        title: "Parse & Analyze",
        description: "Our client-side regex engine instantly dissects the string into structured components.",
        icon: Search
      }, {
        step: "03",
        title: "View Insights",
        description: "Identify the browser, OS, device type, rendering engine, and detect automated bots.",
        icon: Monitor
      }]} badges={["Zero Data Collection", "Instant Parsing", "Bot Detection"]} />

 <ToolFeatureGuides features={[{
        icon: Globe,
        title: "Comprehensive Browser Detection",
        description: "Accurately identifies modern browsers including Chrome, Firefox, Safari, and Edge with precise version numbers."
      }, {
        icon: Monitor,
        title: "OS & Device Profiling",
        description: "Distinguishes between Windows, macOS, Linux, iOS, and Android, while detecting mobile vs. tablet form factors."
      }, {
        icon: Bot,
        title: "Automated Bot Identification",
        description: "Flags known crawlers and bots like Googlebot, Bingbot, and scraper scripts to help analyze traffic sources."
      }, {
        icon: Cpu,
        title: "Engine Recognition",
        description: "Identifies the underlying rendering engine (Blink, WebKit, Gecko, Trident) powering the user's browser."
      }]}>
 <h3 className="text-xl font-bold mb-4">Understanding the User-Agent String</h3>
 <p className="text-muted-foreground mb-4">
 The User-Agent (UA) string is a crucial piece of metadata sent by web clients (browsers, apps, crawlers) to servers with every HTTP request. It acts as a digital fingerprint, identifying the software making the request, its version, the underlying operating system, and the device type. For web developers, parsing this string is essential for delivering optimized experiences, implementing browser-specific polyfills, or blocking malicious automated traffic.
 </p>
 <p className="text-muted-foreground mb-4">
 Despite its importance, the UA string format is notoriously fragmented and inconsistent. It evolved from the early days of the web, resulting in a complex, often contradictory syntax where modern browsers pretend to be older ones for compatibility reasons (e.g., Chrome includes"Safari"and"Mozilla"in its string). Our User Agent Parser cuts through this noise using highly optimized regular expressions to extract the true identity of the client without relying on heavy, external API dependencies.
 </p>
 <p className="text-muted-foreground">
 Privacy is paramount when analyzing client data. Unlike server-side parsers that log and store user data, this tool operates entirely within your browser. The UA string is never transmitted over the network, ensuring complete privacy and compliance with strict data protection regulations. Whether you are debugging a CSS rendering issue, analyzing server logs, or testing responsive design breakpoints, this tool provides instant, reliable insights into the client environment.
 </p>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Is my User-Agent string sent to a server?",
        answer: "No. This tool is 100% client-side. Your User-Agent string is parsed locally in your browser using JavaScript and is never transmitted over the internet, ensuring complete privacy."
      }, {
        question: "Why do browsers include other browser names in their UA string?",
        answer: "This is a historical artifact called 'User-Agent sniffing'. Early websites only served content to specific browsers like Netscape or IE. To get the same content, new browsers started including the older browser names in their strings to pass compatibility checks."
      }, {
        question: "Can this tool detect all types of bots?",
        answer: "It detects common crawlers and bots (like Googlebot, Bingbot, and generic 'spider' keywords) via regex patterns. However, highly sophisticated bots that spoof standard browser UA strings may bypass basic detection."
      }]} />
    </div>
    </div>
);
}
