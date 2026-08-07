"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Eye, FileText, ArrowUpRight, TrendingUp, Sparkles } from "lucide-react";

export default function GA4HomeOverview() {
  return (
    <div className="space-y-5 max-w-full overflow-hidden">
      {/* GA4 Welcome & Highlight Banner (Matching Screenshot 4) */}
      <div className="rounded-2xl border bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 p-4 sm:p-5 border-blue-500/30 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
          <Sparkles className="h-4 w-4" /> Welcome back! Here are the top highlights from this property since your last visit.
        </div>
        <p className="text-xs text-muted-foreground">
          You&apos;ve unlocked real-time GA4 telemetry insights for <strong>Toolzium (dg-meal)</strong>.
        </p>
      </div>

      {/* Main Stats Line Chart & Active Users Ticker (Matching Screenshot 4) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-full">
        {/* Active Users Trend Line Chart */}
        <Card className="md:col-span-8 border shadow-md p-4 sm:p-5 space-y-4 bg-card/90 backdrop-blur-md">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="text-primary font-bold border-b-2 border-primary pb-1">Active users: 64</span>
              <span className="text-muted-foreground">Event count: 717</span>
              <span className="text-muted-foreground">Key events: 0</span>
              <span className="text-muted-foreground">New users: 64</span>
            </div>
            <Badge variant="outline" className="text-[10px]">Last 7 days</Badge>
          </div>

          <div className="h-40 w-full relative pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
              <line x1="0" y1="20" x2="500" y2="20" stroke="currentColor" opacity="0.1" strokeDasharray="3 3" />
              <line x1="0" y1="60" x2="500" y2="60" stroke="currentColor" opacity="0.1" strokeDasharray="3 3" />

              {/* Curve line for Active Users */}
              <path
                d="M 0 95 L 60 95 L 120 95 L 180 95 L 250 40 L 320 60 L 400 65 L 500 65"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
              />
              <circle cx="250" cy="40" r="4" fill="#3b82f6" />
              <circle cx="320" cy="60" r="4" fill="#3b82f6" />
            </svg>
            <div className="flex justify-between text-[10px] text-muted-foreground pt-1 font-mono">
              <span>Jul 31</span>
              <span>Aug 01</span>
              <span>Aug 02</span>
              <span>Aug 03</span>
              <span>Aug 04</span>
              <span>Aug 06</span>
            </div>
          </div>
        </Card>

        {/* Realtime 30-min box */}
        <Card className="md:col-span-4 border shadow-md p-4 sm:p-5 flex flex-col justify-between bg-card/90 backdrop-blur-md">
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-muted-foreground uppercase">
              ACTIVE USERS IN LAST 30 MINUTES
            </div>
            <div className="text-4xl font-extrabold text-foreground font-mono">1</div>
          </div>

          <div className="p-3 rounded-xl border bg-muted/20 space-y-2 text-xs">
            <div className="flex justify-between font-semibold">
              <span>COUNTRY</span>
              <span>ACTIVE USERS</span>
            </div>
            <div className="flex justify-between font-mono text-emerald-600 font-bold">
              <span>🇧🇩 Bangladesh</span>
              <span>1</span>
            </div>
          </div>

          <div className="pt-2 text-right">
            <span className="text-xs font-semibold text-primary hover:underline cursor-pointer flex items-center justify-end gap-1">
              View realtime →
            </span>
          </div>
        </Card>
      </div>

      {/* Suggested & Country Breakdown Grid (Matching Screenshot 4) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-full">
        {/* Active Users by Country ID Table */}
        <Card className="border shadow-md bg-card/90 backdrop-blur-md p-4 space-y-3">
          <CardHeader className="p-0 border-b pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-primary" /> Active users by Country
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between p-2 rounded-lg border bg-muted/20">
              <span className="font-semibold">🇺🇸 United States</span>
              <span className="font-bold text-primary">33</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg border bg-emerald-500/10 border-emerald-500/30">
              <span className="font-semibold text-emerald-600">🇧🇩 Bangladesh</span>
              <span className="font-bold text-emerald-600">8</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg border bg-muted/20">
              <span className="font-semibold">🇩🇪 Germany</span>
              <span className="font-bold text-primary">6</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg border bg-muted/20">
              <span className="font-semibold">🇳🇱 Netherlands</span>
              <span className="font-bold text-primary">6</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg border bg-muted/20">
              <span className="font-semibold">🇬🇧 United Kingdom</span>
              <span className="font-bold text-primary">3</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg border bg-muted/20">
              <span className="font-semibold">🇨🇳 China</span>
              <span className="font-bold text-primary">2</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg border bg-muted/20">
              <span className="font-semibold">🇨🇦 Canada</span>
              <span className="font-bold text-primary">1</span>
            </div>
          </CardContent>
        </Card>

        {/* Views by Page Title and Screen Class */}
        <Card className="border shadow-md bg-card/90 backdrop-blur-md p-4 space-y-3">
          <CardHeader className="p-0 border-b pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Eye className="h-3.5 w-3.5 text-primary" /> Views by Page Title
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-1.5 text-xs font-mono">
            <div className="p-2 rounded-lg border bg-muted/20 flex justify-between items-center">
              <span className="truncate pr-2 font-semibold">450+ Free Online Tools</span>
              <span className="font-bold text-primary">55</span>
            </div>
            <div className="p-2 rounded-lg border bg-muted/20 flex justify-between items-center">
              <span className="truncate pr-2 font-semibold">Tools - Toolzium</span>
              <span className="font-bold text-primary">34</span>
            </div>
            <div className="p-2 rounded-lg border bg-muted/20 flex justify-between items-center">
              <span className="truncate pr-2 font-semibold">459+ Free Online Tools</span>
              <span className="font-bold text-primary">31</span>
            </div>
            <div className="p-2 rounded-lg border bg-muted/20 flex justify-between items-center">
              <span className="truncate pr-2 font-semibold">Background Remover</span>
              <span className="font-bold text-primary">23</span>
            </div>
            <div className="p-2 rounded-lg border bg-muted/20 flex justify-between items-center">
              <span className="truncate pr-2 font-semibold">464+ Free Online Tools</span>
              <span className="font-bold text-primary">22</span>
            </div>
            <div className="p-2 rounded-lg border bg-muted/20 flex justify-between items-center">
              <span className="truncate pr-2 font-semibold">336+ Free Online Tools</span>
              <span className="font-bold text-primary">17</span>
            </div>
          </CardContent>
        </Card>

        {/* Sessions by Primary Channel */}
        <Card className="border shadow-md bg-card/90 backdrop-blur-md p-4 space-y-3">
          <CardHeader className="p-0 border-b pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-primary" /> Sessions by Channel
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-1.5 text-xs font-mono">
            <div className="p-2 rounded-lg border bg-muted/20 flex justify-between">
              <span className="font-semibold">Direct</span>
              <span className="font-bold text-primary">97</span>
            </div>
            <div className="p-2 rounded-lg border bg-muted/20 flex justify-between">
              <span className="font-semibold">Referral</span>
              <span className="font-bold text-primary">10</span>
            </div>
            <div className="p-2 rounded-lg border bg-muted/20 flex justify-between">
              <span className="font-semibold">Organic Search</span>
              <span className="font-bold text-primary">9</span>
            </div>
            <div className="p-2 rounded-lg border bg-muted/20 flex justify-between">
              <span className="font-semibold">Organic Social</span>
              <span className="font-bold text-primary">1</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
