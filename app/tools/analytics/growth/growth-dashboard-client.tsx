"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowUpRight,
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  Copy,
  Flame,
  Globe,
  LineChart,
  Lock,
  MousePointerClick,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import type { GrowthReportSummary } from "@/lib/storage/expansion-db";
import { useSession } from "@/lib/auth-client";

export default function GrowthDashboardClient() {
  const { data: session, isPending } = useSession();
  const [data, setData] = useState<GrowthReportSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    // Only fetch if session is confirmed AND email matches admin
    const userEmail = session?.user?.email;
    if (isPending) return; // still loading session
    if (!userEmail || (adminEmail && userEmail !== adminEmail)) {
      setLoading(false);
      return; // server already gated, but client double-checks
    }

    fetch("/api/analytics/daily-briefing")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setData(res.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session, isPending, adminEmail]);

  const copyBriefing = () => {
    if (!data) return;
    const text = `📊 Toolzium Growth Update:
• Today's Visitors: ${data.today.uniqueVisitors} (${data.growthRate.visitors >= 0 ? "+" : ""}${data.growthRate.visitors}%)
• Tool Runs: ${data.today.toolRuns} (${data.growthRate.runs >= 0 ? "+" : ""}${data.growthRate.runs}%)
• #1 Ranked Tool: ${data.topTool.name} (${data.topTool.runs} runs, ${data.topTool.percentage}% share)
• Daily High Target: ${data.dailyHigh.visitors} visitors peak!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading || !data) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4 space-y-6 animate-pulse">
        <div className="h-10 w-72 bg-muted rounded-xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-muted/60 rounded-3xl" />
          ))}
        </div>
        <div className="h-96 bg-muted/40 rounded-3xl" />
      </div>
    );
  }

  const maxHistoryVal = Math.max(...data.history.map((h) => Math.max(h.uniqueVisitors, h.toolRuns, 0)), 5);

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-0.5 text-xs font-semibold">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Live Telemetry & Daily Growth
            </Badge>
            <Badge variant="outline" className="text-xs font-mono text-muted-foreground rounded-lg">
              Today: {data.today.date}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Toolzium Growth & Traffic Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Daily impressions, tool execution rankings, day-over-day momentum, and progression graphs.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={copyBriefing}
            variant="outline"
            size="sm"
            className="rounded-xl font-medium text-xs gap-1.5 h-9 border-primary/20 hover:bg-primary/5"
          >
            {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "Copied to Clipboard!" : "Export Daily Briefing"}</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Visitors */}
        <Card className="rounded-2xl border border-primary/20 bg-gradient-to-br from-card to-background shadow-md">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Unique Visitors</span>
              <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-foreground">{data.today.uniqueVisitors}</span>
              <Badge
                className={`text-xs font-medium rounded-md ${
                  data.growthRate.visitors >= 0
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-rose-500/10 text-rose-600"
                }`}
              >
                {data.growthRate.visitors >= 0 ? "+" : ""}
                {data.growthRate.visitors}% vs yday
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/40">
              <span>Daily High:</span>
              <span className="font-semibold text-foreground">{data.dailyHigh.visitors}</span>
            </div>
          </CardContent>
        </Card>

        {/* Tool Runs */}
        <Card className="rounded-2xl border border-primary/20 bg-gradient-to-br from-card to-background shadow-md">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Tool Executions</span>
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Zap className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-foreground">{data.today.toolRuns}</span>
              <Badge
                className={`text-xs font-medium rounded-md ${
                  data.growthRate.runs >= 0
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-rose-500/10 text-rose-600"
                }`}
              >
                {data.growthRate.runs >= 0 ? "+" : ""}
                {data.growthRate.runs}% vs yday
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/40">
              <span>All-time Peak:</span>
              <span className="font-semibold text-foreground">{data.dailyHigh.toolRuns} runs</span>
            </div>
          </CardContent>
        </Card>

        {/* Clicks */}
        <Card className="rounded-2xl border border-primary/20 bg-gradient-to-br from-card to-background shadow-md">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Clicks & Actions</span>
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <MousePointerClick className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-foreground">{data.today.clicks}</span>
              <Badge
                className={`text-xs font-medium rounded-md ${
                  data.growthRate.clicks >= 0
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-rose-500/10 text-rose-600"
                }`}
              >
                {data.growthRate.clicks >= 0 ? "+" : ""}
                {data.growthRate.clicks}% vs yday
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/40">
              <span>CTR Multiplier:</span>
              <span className="font-semibold text-foreground">
                {data.today.uniqueVisitors > 0
                  ? (data.today.clicks / data.today.uniqueVisitors).toFixed(1)
                  : "1.0"}
                x
              </span>
            </div>
          </CardContent>
        </Card>

        {/* #1 Winner Tool */}
        <Card className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-background shadow-md">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">#1 Ranked Tool</span>
              <div className="h-8 w-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center">
                <Award className="h-4 w-4" />
              </div>
            </div>
            <div>
              <p className="text-lg font-black text-foreground truncate capitalize">
                {data.topTool.name.replace(/-/g, " ")}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                <span className="font-semibold text-primary">{data.topTool.runs} runs</span>
                <span>•</span>
                <span>{data.topTool.percentage}% traffic share</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/40">
              <span>Rank Status:</span>
              <span className="font-semibold text-emerald-500">🏆 Top Pull Driver</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visual Growth Progression Chart */}
      <Card className="rounded-2xl border border-primary/20 bg-card shadow-lg overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border/60 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="space-y-1">
              <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-2 text-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                14-Day Growth Progression Ladder
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Tracking daily increases toward 10 → 20 → 50 → 100+ visitors per day.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-sm bg-primary" />
                <span className="text-muted-foreground">Unique Visitors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-sm bg-emerald-500" />
                <span className="text-muted-foreground">Tool Runs</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Custom SVG Bar & Trend Chart with Dynamic Scaling */}
          <div className="h-44 sm:h-52 w-full flex items-end justify-between gap-1 sm:gap-2 pt-2 border-b border-border/40 pb-2">
            {data.history.map((day, idx) => {
              const visitorHeight = day.uniqueVisitors > 0 ? Math.max(14, (day.uniqueVisitors / maxHistoryVal) * 100) : 4;
              const runsHeight = day.toolRuns > 0 ? Math.max(14, (day.toolRuns / maxHistoryVal) * 100) : 4;
              const label = day.date.slice(5); // MM-DD

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-14 bg-popover text-popover-foreground border border-border shadow-md rounded-lg px-2.5 py-1 text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <p className="font-semibold">{day.date}</p>
                    <p className="text-primary">{day.uniqueVisitors} visitors</p>
                    <p className="text-emerald-500">{day.toolRuns} tool runs</p>
                  </div>

                  {/* Bars container */}
                  <div className="w-full flex items-end justify-center gap-0.5 sm:gap-1 h-36">
                    {/* Visitor Bar */}
                    <div
                      style={{ height: `${visitorHeight}%` }}
                      className="w-full max-w-[12px] bg-primary rounded-t-sm hover:bg-primary/80 transition-all duration-300"
                    />
                    {/* Tool Runs Bar */}
                    <div
                      style={{ height: `${runsHeight}%` }}
                      className="w-full max-w-[12px] bg-emerald-500 rounded-t-sm hover:bg-emerald-400 transition-all duration-300"
                    />
                  </div>

                  {/* Date Label */}
                  <span className="text-xs text-muted-foreground font-mono truncate">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tool Performance Leaderboard */}
      <Card className="rounded-2xl border border-primary/20 bg-card shadow-lg overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border/60 pb-4">
          <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-2 text-foreground">
            <BarChart3 className="h-5 w-5 text-primary" />
            Tool Performance Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {data.topToolsRanking.map((tool) => (
              <div
                key={tool.name}
                className="p-4 rounded-xl bg-muted/40 border border-border/60 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      tool.rank === 1
                        ? "bg-amber-500/20 text-amber-500 border border-amber-500/30"
                        : tool.rank === 2
                        ? "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                        : tool.rank === 3
                        ? "bg-amber-700/20 text-amber-700 border border-amber-700/30"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    #{tool.rank}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground capitalize">
                      {tool.name.replace(/-/g, " ")}
                    </p>
                    <span className="text-xs text-muted-foreground">High-RPM Pull Tool</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-bold text-foreground">{tool.runs}</span>
                  <span className="text-xs text-muted-foreground block">total runs</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
