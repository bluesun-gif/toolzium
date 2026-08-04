"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Laptop, Code, Copy, Search } from "lucide-react";
import { toast } from "react-hot-toast";

const PRESETS = [
  { label: "Chrome Windows", value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
  { label: "Safari iOS", value: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" },
  { label: "Firefox Android", value: "Mozilla/5.0 (Android 13; Mobile; rv:109.0) Gecko/119.0 Firefox/119.0" },
  { label: "Googlebot", value: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.109 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" }
];

export function UaParserClient() {
  const [uaString, setUaString] = useState("");
  const [parsed, setParsed] = useState<any>(null);

  const detectCurrent = () => {
    setUaString(navigator.userAgent);
    parse(navigator.userAgent);
  };

  const parse = (ua: string) => {
    if (!ua) {
      setParsed(null);
      return;
    }
    
    let browser = "Unknown", os = "Unknown", device = "Desktop", engine = "Unknown";
    
    if (ua.includes("Chrome") && !ua.includes("Edge") && !ua.includes("OPR")) browser = "Chrome";
    else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Edge")) browser = "Edge";
    else if (ua.includes("Googlebot")) browser = "Googlebot";
    
    if (ua.includes("Windows")) os = "Windows";
    else if (ua.includes("Mac OS X")) os = "macOS";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("iPhone")) os = "iOS";
    else if (ua.includes("iPad")) os = "iPadOS";

    if (ua.includes("Mobile") || ua.includes("Android") || ua.includes("iPhone")) {
      device = "Mobile";
      if (ua.includes("iPad") || (ua.includes("Android") && !ua.includes("Mobile"))) {
        device = "Tablet";
      }
    }
    if (ua.includes("bot") || ua.includes("spider") || ua.includes("crawl")) device = "Bot/Crawler";

    if (ua.includes("AppleWebKit")) engine = "WebKit";
    if (ua.includes("Gecko/") && ua.includes("Firefox")) engine = "Gecko";
    if (ua.includes("Chrome/") && ua.includes("AppleWebKit")) engine = "Blink";

    setParsed({ browser, os, device, engine });
  };

  const handleParse = () => {
    parse(uaString);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader icon={Laptop} title="User Agent Parser & Inspector" description="Parse User-Agent strings. Detect browser name & version, OS name & version, device type, rendering engine." actions={
        <React.Fragment>
          <ResetButton onClick={() => { setUaString(""); setParsed(null); }} label="Clear" />
          <ActionButton onClick={detectCurrent} icon={Search} label="Detect Current" />
        </React.Fragment>
      } />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassCard>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Enter a User-Agent string to parse.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Presets</Label>
              <Select onValueChange={(val) => { setUaString(val); parse(val); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a preset" />
                </SelectTrigger>
                <SelectContent>
                  {PRESETS.map(p => <SelectItem key={p.label} value={p.value}>{p.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>User-Agent String</Label>
              <Input value={uaString} onChange={e => setUaString(e.target.value)} placeholder="Mozilla/5.0..." />
            </div>
            <Button onClick={handleParse}>Parse</Button>
          </CardContent>
        </GlassCard>
        
        <GlassCard>
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>Parsed information from the UA string.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {parsed ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Browser</Label>
                    <div className="font-medium">{parsed.browser}</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Operating System</Label>
                    <div className="font-medium">{parsed.os}</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Device Type</Label>
                    <div className="font-medium">{parsed.device}</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Engine</Label>
                    <div className="font-medium">{parsed.engine}</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>JSON Output</Label>
                  <div className="relative">
                    <pre className="p-4 rounded-md bg-muted text-sm overflow-auto">
                      {JSON.stringify(parsed, null, 2)}
                    </pre>
                    <div className="absolute top-2 right-2">
                      <CopyButton getText={() => JSON.stringify(parsed, null, 2)} label="Copy" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Enter a User-Agent string or use &quot;Detect Current&quot;
              </div>
            )}
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
