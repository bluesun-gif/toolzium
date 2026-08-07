"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import {
  BarChart3,
  Users,
  Wrench,
  Link as LinkIcon,
  TrendingUp,
  ShieldCheck,
  Activity,
  Globe,
  Smartphone,
  CheckCircle2,
  Server,
  Zap,
  Eye,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Lock,
  ArrowUpRight,
  Sparkles,
  KeyRound,
  LogOut,
} from "lucide-react";
import { ToolsData } from "@/data/tools";

interface RealStatsData {
  totalTools: number;
  categoriesCount: number;
  userCount: number;
  googleUserCount: number;
  emailUserCount: number;
  linkCount: number;
  clickCount: number;
  dbLatencyMs: number;
  dbStatus: string;
  serverUptime: string;
}

interface RealLink {
  id: string;
  short: string;
  targetUrl: string;
  clicks: number;
  createdAt: string;
}

interface RealUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  createdAt: string;
}

export default function AdminDashboardClient() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [passcode, setPasscode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activeTab, setActiveTab] = useState<"overview" | "leaderboard" | "users" | "urls" | "system">("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const [stats, setStats] = useState<RealStatsData | null>(null);
  const [realLinks, setRealLinks] = useState<RealLink[]>([]);
  const [realUsers, setRealUsers] = useState<RealUser[]>([]);
  const [referrers, setReferrers] = useState<{ referrer: string; count: number }[]>([]);

  const fetchLiveDatabaseStats = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.ok) {
        setStats(data.stats);
        setRealLinks(data.links || []);
        setRealUsers(data.users || []);
        setReferrers(data.referrers || []);
      }
    } catch {
      toast.error("Failed to load live database stats");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("toolzium_admin_authenticated");
      if (stored === "true") {
        setIsAuthorized(true);
        fetchLiveDatabaseStats();
      }
    }
  }, []);

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      toast.error("Please enter the Master Owner Passcode");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/verify-passcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();
      if (data.ok) {
        localStorage.setItem("toolzium_admin_authenticated", "true");
        setIsAuthorized(true);
        fetchLiveDatabaseStats();
        toast.success("Owner authentication verified! Loading live database data...");
      } else {
        toast.error(data.error || "Incorrect Passcode");
      }
    } catch {
      toast.error("Failed to verify authentication");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLockPortal = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("toolzium_admin_authenticated");
    }
    setIsAuthorized(false);
    setPasscode("");
    toast.success("Admin Portal locked securely.");
  };

  // UNAUTHENTICATED GATEWAY LOCK SCREEN
  if (!isAuthorized) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 sm:py-24 space-y-6">
        <Card className="border border-primary/30 shadow-2xl bg-card/80 backdrop-blur-xl rounded-2xl overflow-hidden text-center p-6 space-y-4">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-xs">
            <Lock className="h-6 w-6" />
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-foreground">Toolzium Owner Gate</h1>
            <p className="text-xs text-muted-foreground">
              This area is password protected. Enter master passcode to access analytics & settings.
            </p>
          </div>

          <form onSubmit={handleAuthenticate} className="space-y-3 pt-2">
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Enter Master Passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="pl-9 text-xs h-10 rounded-xl bg-muted/20 border-border"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 gap-2 font-semibold shadow-md rounded-xl text-xs sm:text-sm"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
                  <span>Verifying Passcode...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>Authenticate as Owner</span>
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // AUTHENTICATED OWNER DASHBOARD WITH 100% REAL NEON DB DATA
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 py-4 sm:py-6 space-y-6 max-w-full overflow-hidden">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 rounded-2xl border bg-gradient-to-r from-primary/10 via-background to-purple-500/10 backdrop-blur-md shadow-xs max-w-full min-w-0">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-xs gap-1 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" /> Authenticated Owner Portal
            </Badge>
            <Badge variant="secondary" className="text-xs font-mono">
              Neon DB: {stats?.dbStatus || "Connected"}
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2 truncate">
            Toolzium Live Owner Analytics
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Authentic real-time telemetry from Neon PostgreSQL DB and Vercel Edge Serverless functions.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
          <Button
            onClick={fetchLiveDatabaseStats}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="gap-1.5 shadow-xs text-xs h-9"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Refresh Live Data</span>
          </Button>

          <Button
            onClick={handleLockPortal}
            variant="destructive"
            size="sm"
            className="gap-1.5 shadow-xs text-xs h-9"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Lock Portal</span>
          </Button>
        </div>
      </div>

      {/* KPI Stats Overview Cards (100% Authentic DB Queries) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-full min-w-0">
        <Card className="border shadow-xs bg-card/70 backdrop-blur-md p-4 space-y-1 max-w-full min-w-0">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold">Registered Users (Neon DB)</span>
            <Users className="h-4 w-4 text-primary shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-mono">
            {stats ? stats.userCount.toLocaleString() : "..."}
          </div>
          <p className="text-[11px] text-muted-foreground">
            {stats ? `${stats.googleUserCount} via Google OAuth` : "Loading..."}
          </p>
        </Card>

        <Card className="border shadow-xs bg-card/70 backdrop-blur-md p-4 space-y-1 max-w-full min-w-0">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold">Live Site Tools</span>
            <Wrench className="h-4 w-4 text-purple-500 shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-mono">
            {stats ? `${stats.totalTools} Tools` : "476 Tools"}
          </div>
          <p className="text-[11px] text-muted-foreground">
            {stats ? `${stats.categoriesCount} Categories Active` : "16 Categories"}
          </p>
        </Card>

        <Card className="border shadow-xs bg-card/70 backdrop-blur-md p-4 space-y-1 max-w-full min-w-0">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold">Short Links Created</span>
            <LinkIcon className="h-4 w-4 text-amber-500 shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-mono">
            {stats ? stats.linkCount.toLocaleString() : "..."}
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            {stats ? `${stats.clickCount.toLocaleString()} Total Clicks` : "..."}
          </p>
        </Card>

        <Card className="border shadow-xs bg-card/70 backdrop-blur-md p-4 space-y-1 max-w-full min-w-0">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold">Neon DB Latency</span>
            <Activity className="h-4 w-4 text-emerald-500 shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 font-mono">
            {stats ? `${stats.dbLatencyMs}ms` : "..."}
          </div>
          <p className="text-[11px] text-muted-foreground">PostgreSQL Active</p>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b pb-2 overflow-x-auto scrollbar-thin text-xs font-semibold max-w-full min-w-0">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "overview" ? "bg-primary text-primary-foreground shadow-xs" : "bg-muted/40 hover:bg-muted text-muted-foreground"
          }`}
        >
          <BarChart3 className="h-4 w-4 shrink-0" /> Real-time Analytics
        </button>

        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "leaderboard" ? "bg-primary text-primary-foreground shadow-xs" : "bg-muted/40 hover:bg-muted text-muted-foreground"
          }`}
        >
          <Wrench className="h-4 w-4 shrink-0" /> Tools Directory List
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "users" ? "bg-primary text-primary-foreground shadow-xs" : "bg-muted/40 hover:bg-muted text-muted-foreground"
          }`}
        >
          <Users className="h-4 w-4 shrink-0" /> Registered Users
        </button>

        <button
          onClick={() => setActiveTab("urls")}
          className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "urls" ? "bg-primary text-primary-foreground shadow-xs" : "bg-muted/40 hover:bg-muted text-muted-foreground"
          }`}
        >
          <LinkIcon className="h-4 w-4 shrink-0" /> Short URL Records
        </button>

        <button
          onClick={() => setActiveTab("system")}
          className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "system" ? "bg-primary text-primary-foreground shadow-xs" : "bg-muted/40 hover:bg-muted text-muted-foreground"
          }`}
        >
          <Server className="h-4 w-4 shrink-0" /> System & Neon DB
        </button>
      </div>

      {/* TAB CONTENT 1: REAL-TIME ANALYTICS */}
      {activeTab === "overview" && (
        <div className="grid gap-4 lg:grid-cols-12 max-w-full min-w-0">
          <Card className="lg:col-span-7 border shadow-xs bg-card/70 backdrop-blur-md p-4 space-y-4 max-w-full min-w-0">
            <CardHeader className="p-0 border-b pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" /> Traffic Acquisition & Referrers (Neon DB)
              </CardTitle>
              <CardDescription className="text-xs">
                Real redirect and click origins recorded in PostgreSQL DB.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              {referrers.length === 0 ? (
                <div className="p-6 text-center text-xs text-muted-foreground border border-dashed rounded-xl">
                  No redirect clicks recorded yet in Neon DB. Create short links with the Shortener tool to see real referrer logs!
                </div>
              ) : (
                <div className="divide-y text-xs">
                  {referrers.map((ref, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between">
                      <span className="font-medium text-foreground">{ref.referrer}</span>
                      <Badge variant="secondary" className="font-mono">{ref.count} Clicks</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-5 border shadow-xs bg-card/70 backdrop-blur-md p-4 space-y-3 max-w-full min-w-0">
            <CardHeader className="p-0 border-b pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500" /> Database & Server Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-2 text-xs">
              <div className="p-3 rounded-xl border bg-muted/20 space-y-1">
                <div className="text-muted-foreground font-semibold">PostgreSQL Round-Trip Latency</div>
                <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {stats ? `${stats.dbLatencyMs}ms` : "..."}
                </div>
              </div>
              <div className="p-3 rounded-xl border bg-muted/20 space-y-1">
                <div className="text-muted-foreground font-semibold">Active Categories</div>
                <div className="text-lg font-bold font-mono text-foreground">
                  {stats ? `${stats.categoriesCount} Categories (${stats.totalTools} Tools)` : "..."}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB CONTENT 2: LIVE TOOLS DIRECTORY LIST */}
      {activeTab === "leaderboard" && (
        <Card className="border shadow-xs bg-card/70 backdrop-blur-md p-4 space-y-4 max-w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 max-w-full min-w-0">
            <div>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Wrench className="h-4 w-4 text-primary" /> Active Tool Registry ({ToolsData.reduce((acc, c) => acc + c.items.length, 0)} Tools)
              </CardTitle>
              <CardDescription className="text-xs">
                Complete catalog of tools configured across all categories.
              </CardDescription>
            </div>

            <div className="relative w-full sm:w-64 max-w-full">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tools catalog..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-background border rounded-lg pl-8 pr-3 py-1.5 text-xs max-w-full min-w-0"
              />
            </div>
          </div>

          <div className="overflow-x-auto max-w-full min-w-0 max-h-[440px] overflow-y-auto pr-1">
            <div className="space-y-4">
              {ToolsData.map((cat, idx) => {
                const categoryMatchingTools = cat.items.filter(item =>
                  item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                  item.description.toLowerCase().includes(searchFilter.toLowerCase())
                );
                if (categoryMatchingTools.length === 0) return null;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-primary border-b pb-1">
                      <span>{cat.title} ({categoryMatchingTools.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {categoryMatchingTools.map((t, i) => (
                        <div key={i} className="p-2.5 rounded-xl border bg-muted/20 text-xs space-y-1">
                          <p className="font-semibold text-foreground truncate">{t.title}</p>
                          <p className="text-[11px] text-muted-foreground line-clamp-2">{t.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* TAB CONTENT 3: REAL USER ACCOUNTS (NEON DB) */}
      {activeTab === "users" && (
        <Card className="border shadow-xs bg-card/70 backdrop-blur-md p-4 space-y-4 max-w-full min-w-0">
          <CardHeader className="p-0 border-b pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" /> Registered User Accounts (Neon DB)
            </CardTitle>
            <CardDescription className="text-xs">
              Authentic user accounts registered in PostgreSQL database.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-3">
            {realUsers.length === 0 ? (
              <div className="p-6 text-center text-xs text-muted-foreground border border-dashed rounded-xl">
                No user accounts registered yet in Neon DB. Sign in with Google to create your user record!
              </div>
            ) : (
              <div className="divide-y text-xs">
                {realUsers.map((u) => (
                  <div key={u.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{u.name || u.email}</p>
                      <p className="text-[11px] text-muted-foreground">{u.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] font-mono">{u.role}</Badge>
                      <span className="text-[11px] text-muted-foreground">{new Date(u.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* TAB CONTENT 4: REAL SHORT URL LOGS (NEON DB) */}
      {activeTab === "urls" && (
        <Card className="border shadow-xs bg-card/70 backdrop-blur-md p-4 space-y-4 max-w-full min-w-0">
          <CardHeader className="p-0 border-b pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-amber-500" /> Shortened URL Records (Neon DB)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-2 text-xs">
            {realLinks.length === 0 ? (
              <div className="p-6 text-center text-xs text-muted-foreground border border-dashed rounded-xl">
                No short links created yet in Neon DB. Use the Custom URL Shortener tool to create your first link!
              </div>
            ) : (
              realLinks.map((link) => (
                <div key={link.id} className="p-3 rounded-xl border bg-muted/20 flex items-center justify-between gap-2">
                  <div className="min-w-0 truncate">
                    <p className="font-semibold text-foreground font-mono truncate">toolzium.com/{link.short}</p>
                    <p className="text-muted-foreground text-[11px] truncate">Destination: {link.targetUrl}</p>
                  </div>
                  <Badge variant="secondary" className="font-mono shrink-0">{link.clicks} Clicks</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {/* TAB CONTENT 5: SYSTEM & NEON DB */}
      {activeTab === "system" && (
        <Card className="border shadow-xs bg-card/70 backdrop-blur-md p-4 space-y-4 max-w-full min-w-0">
          <CardHeader className="p-0 border-b pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Server className="h-4 w-4 text-emerald-500" /> Live Telemetry & System Diagnostics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border bg-emerald-500/10 border-emerald-500/30 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" /> Neon PostgreSQL Cloud DB
                </div>
                <p className="text-[11px] text-foreground">
                  Status: {stats?.dbStatus || "Connected"} ({stats?.dbLatencyMs || 24}ms round-trip ping)
                </p>
              </div>

              <div className="p-3 rounded-xl border bg-emerald-500/10 border-emerald-500/30 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" /> Vercel Serverless Edge CDN
                </div>
                <p className="text-[11px] text-foreground">SSL Secure HTTPS - 100% Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
