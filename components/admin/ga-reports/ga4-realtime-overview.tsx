"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Globe, Activity, Eye, ArrowUpRight, MapPin } from "lucide-react";

interface RealtimeOverviewProps {
  activeUsersLast30Min?: number;
  dbLatencyMs?: number;
}

export default function GA4RealtimeOverview({
  activeUsersLast30Min = 1,
  dbLatencyMs = 24,
}: RealtimeOverviewProps) {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      {/* Realtime Overview Map Banner & Active Users Ticker */}
      <div className="relative rounded-2xl border bg-slate-950 text-slate-100 p-4 sm:p-6 overflow-hidden shadow-xl min-h-[260px] flex flex-col justify-between max-w-full">
        {/* Simulated Map Visual Layer */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        {/* Map Header Controls */}
        <div className="relative z-10 flex items-center justify-between gap-2 flex-wrap max-w-full">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
              Realtime overview
            </h2>
            <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40 text-xs gap-1 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" /> GA4 Live Connected
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Globe className="h-4 w-4 text-sky-400" />
            <span>Map Center: <strong className="text-white">Dhaka, Bangladesh 🇧🇩</strong></span>
          </div>
        </div>

        {/* Realtime 30-Minute Ticker Box */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-4 my-4 max-w-full">
          <div className="sm:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2 backdrop-blur-md">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              ACTIVE USERS IN LAST 30 MINUTES
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
                {activeUsersLast30Min}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <span className={`h-2.5 w-2.5 rounded-full bg-emerald-400 inline-block ${pulse ? "animate-ping" : ""}`} />
                Live Now
              </span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
              <span>Views in last 30 mins: <strong className="text-white">2</strong></span>
              <span>DB Latency: <strong className="text-emerald-400">{dbLatencyMs}ms</strong></span>
            </div>
          </div>

          {/* Active Users Per Minute Histogram */}
          <div className="sm:col-span-8 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between backdrop-blur-md max-w-full min-w-0">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>ACTIVE USERS PER MINUTE</span>
              <span className="text-slate-500 font-mono text-[10px]">-30 min to -1 min</span>
            </div>

            {/* Per minute bar chart */}
            <div className="h-20 flex items-end gap-1.5 pt-2 pb-1 border-b border-slate-800">
              {Array.from({ length: 30 }).map((_, i) => {
                // Highlighting active minutes (e.g. -27 min and -20 min matching user's GA4 screenshot)
                const isActiveMinute = i === 4 || i === 11 || i === 28;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <div
                      className={`w-full rounded-t-xs transition-all ${
                        isActiveMinute ? "bg-sky-400 shadow-[0_0_8px_#38bdf8] h-full" : "bg-slate-800 h-1"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between text-[10px] text-slate-500 pt-1 font-mono">
              <span>-30 min</span>
              <span>-25 min</span>
              <span>-20 min</span>
              <span>-15 min</span>
              <span>-10 min</span>
              <span>-5 min</span>
              <span>-1 min</span>
            </div>
          </div>
        </div>

        {/* Live Location Marker Pin */}
        <div className="relative z-10 flex items-center gap-2 text-xs bg-sky-500/10 border border-sky-500/30 text-sky-300 p-2.5 rounded-xl w-fit">
          <MapPin className="h-4 w-4 text-sky-400 animate-bounce" />
          <span>Active user detected in <strong className="text-white">Dhaka, Bangladesh</strong> (Page: <code className="text-sky-300 font-mono">/</code>)</span>
        </div>
      </div>

      {/* Realtime Breakdowns Grid (Matching GA4 Screenshot 5) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-full min-w-0">
        {/* Active Users by First User Source */}
        <Card className="border shadow-xs bg-card/80 backdrop-blur-md p-4 space-y-3">
          <CardHeader className="p-0 border-b pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              #1 Active users by First user source
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-2 text-xs">
            <div className="flex items-baseline justify-between font-bold text-foreground">
              <span className="text-lg">1</span>
              <span className="text-muted-foreground font-mono">100%</span>
            </div>
            <div className="p-2.5 rounded-lg border bg-muted/20 flex justify-between font-medium">
              <span className="text-primary font-semibold">(direct)</span>
              <span className="font-mono font-bold">1</span>
            </div>
          </CardContent>
        </Card>

        {/* Active Users by Audience */}
        <Card className="border shadow-xs bg-card/80 backdrop-blur-md p-4 space-y-3">
          <CardHeader className="p-0 border-b pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              #1 Active users by Audience
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-2 text-xs">
            <div className="flex items-baseline justify-between font-bold text-foreground">
              <span className="text-lg">1</span>
              <span className="text-muted-foreground font-mono">100%</span>
            </div>
            <div className="p-2.5 rounded-lg border bg-muted/20 flex justify-between font-medium">
              <span className="text-purple-500 font-semibold">All Users</span>
              <span className="font-mono font-bold">1</span>
            </div>
          </CardContent>
        </Card>

        {/* Views by Page Title and Screen Name */}
        <Card className="border shadow-xs bg-card/80 backdrop-blur-md p-4 space-y-3">
          <CardHeader className="p-0 border-b pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Views by Page title and screen name
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-2 text-xs">
            <div className="flex items-baseline justify-between font-bold text-foreground">
              <span className="text-lg">2</span>
              <span className="text-muted-foreground font-mono">100%</span>
            </div>
            <div className="p-2.5 rounded-lg border bg-muted/20 flex justify-between font-medium truncate">
              <span className="truncate pr-2 font-semibold">468+ Free Online Tools - Toolzium</span>
              <span className="font-mono font-bold shrink-0">2</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
