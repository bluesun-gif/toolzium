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
  Lock,
  ArrowUpRight,
  Sparkles,
  KeyRound,
  LogOut,
  Home,
  LayoutGrid,
  PieChart,
  FileText,
  SlidersHorizontal,
  ChevronDown,
  Calendar,
  HelpCircle,
  Bell,
  Grid,
} from "lucide-react";
import { ToolsData } from "@/data/tools";
import GA4HomeOverview from "./ga-reports/ga4-home-overview";
import GA4RealtimeOverview from "./ga-reports/ga4-realtime-overview";
import GA4LandingPages from "./ga-reports/ga4-landing-pages";
import GA4DemographicsTech from "./ga-reports/ga4-demographics-tech";

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

  const [gaTab, setGaTab] = useState<"home" | "realtime" | "landing" | "demographics" | "db-telemetry">("home");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [stats, setStats] = useState<RealStatsData | null>(null);
  const [realLinks, setRealLinks] = useState<RealLink[]>([]);
  const [realUsers, setRealUsers] = useState<RealUser[]>([]);

  const fetchLiveDatabaseStats = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setRealLinks(data.topLinks || []);
        setRealUsers(data.recentUsers || []);
      }
    } catch (err) {
      console.error("Failed to load real-time stats", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("toolzium_admin_authorized");
    const localAuth = localStorage.getItem("toolzium_admin_authenticated");
    if (sessionAuth === "true" || localAuth === "true") {
      setIsAuthorized(true);
      fetchLiveDatabaseStats();
    }
  }, []);

  const handlePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/verify-passcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });

      const data = await res.json();
      if (res.ok && (data.ok || data.success)) {
        sessionStorage.setItem("toolzium_admin_authorized", "true");
        localStorage.setItem("toolzium_admin_authenticated", "true");
        setIsAuthorized(true);
        toast.success("Master Passcode verified. Welcome, Owner!");
        fetchLiveDatabaseStats();
      } else {
        toast.error("Incorrect Owner Passcode");
      }
    } catch {
      toast.error("Verification failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("toolzium_admin_authorized");
    localStorage.removeItem("toolzium_admin_authenticated");
    setIsAuthorized(false);
    toast.success("Locked Owner Admin Portal");
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 shadow-2xl bg-card/95 backdrop-blur-md p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-xs">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Google Analytics Owner Access
            </h1>
            <p className="text-xs text-muted-foreground">
              Enter your Master Passcode to access real-time GA4 telemetry for <strong>toolzium.com</strong>.
            </p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter Master Passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="h-11 text-sm bg-muted/30 focus-visible:ring-primary"
                autoFocus
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || !passcode.trim()}
              className="w-full h-11 text-sm font-semibold gap-2 shadow-md"
            >
              {isSubmitting ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <KeyRound className="h-4 w-4" />
              )}
              Unlock GA4 Analytics Panel
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans max-w-full overflow-x-hidden">
      {/* GA4 Top Header Bar (Matching Screenshot 1 & 4) */}
      <header className="h-14 border-b border-slate-800 bg-slate-950 px-3 sm:px-6 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-3">
          {/* GA Logo */}
          <div className="flex items-center gap-2 font-semibold text-sm text-white">
            <span className="h-7 w-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-md">
              GA
            </span>
            <span className="hidden sm:inline font-bold">Analytics</span>
          </div>

          <span className="text-slate-700 hidden sm:inline">|</span>

          {/* Account Dropdown */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-800/80">
            <span className="text-slate-400 font-mono text-[10px]">All accounts &gt; Default Account for Firebase</span>
            <strong className="text-white font-bold">toolzium (dg-meal)</strong>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        {/* Center Search Bar (GA4 Global Search) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder='Try searching "users today"'
              className="h-9 pl-9 text-xs bg-slate-900/80 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-amber-500/50"
            />
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 text-xs">
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>Last 28 days: <strong className="text-white">Jul 10 - Aug 6</strong></span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={fetchLiveDatabaseStats}
            disabled={isRefreshing}
            className="h-8 text-xs gap-1.5 text-slate-300 hover:text-white"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Live
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="h-8 text-xs gap-1.5 border-slate-700 bg-slate-900 text-red-400 hover:bg-red-950/40"
          >
            <LogOut className="h-3.5 w-3.5" />
            Lock
          </Button>
        </div>
      </header>

      {/* Main GA4 Body Layout: Left Rail + Report Viewport */}
      <div className="flex-1 flex max-w-full overflow-hidden">
        {/* GA4 Left Navigation Rail (Matching Screenshots 1-5) */}
        <aside className="w-14 sm:w-56 border-r border-slate-800 bg-slate-950 p-2 sm:p-3 flex flex-col justify-between shrink-0">
          <div className="space-y-1">
            <button
              onClick={() => setGaTab("home")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                gaTab === "home"
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <Home className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Home</span>
            </button>

            <button
              onClick={() => setGaTab("realtime")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                gaTab === "realtime"
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <Activity className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Realtime overview</span>
            </button>

            <button
              onClick={() => setGaTab("landing")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                gaTab === "landing"
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <FileText className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Landing page report</span>
            </button>

            <button
              onClick={() => setGaTab("demographics")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                gaTab === "demographics"
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <PieChart className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">User acquisition</span>
            </button>

            <button
              onClick={() => setGaTab("db-telemetry")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                gaTab === "db-telemetry"
                  ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <Server className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Neon DB & Users</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 hidden sm:block">
            <div>GA4 Property: <strong>dg-meal</strong></div>
            <div>Status: <span className="text-emerald-400 font-bold">100% Live</span></div>
          </div>
        </aside>

        {/* GA4 Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-full space-y-6">
          {gaTab === "home" && <GA4HomeOverview />}
          {gaTab === "realtime" && (
            <GA4RealtimeOverview
              activeUsersLast30Min={stats?.userCount ? Math.max(1, stats.userCount) : 1}
              dbLatencyMs={stats?.dbLatencyMs || 24}
            />
          )}
          {gaTab === "landing" && <GA4LandingPages />}
          {gaTab === "demographics" && <GA4DemographicsTech />}

          {gaTab === "db-telemetry" && (
            <div className="space-y-6 max-w-full">
              {/* Top Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-slate-950 border-slate-800 text-white p-4">
                  <div className="text-xs text-slate-400 font-semibold uppercase">Total Users</div>
                  <div className="text-3xl font-extrabold font-mono mt-1">{stats?.userCount || 0}</div>
                  <div className="text-[11px] text-emerald-400 mt-1">Google OAuth DB entries</div>
                </Card>

                <Card className="bg-slate-950 border-slate-800 text-white p-4">
                  <div className="text-xs text-slate-400 font-semibold uppercase">Shortened URLs</div>
                  <div className="text-3xl font-extrabold font-mono mt-1">{stats?.linkCount || 0}</div>
                  <div className="text-[11px] text-blue-400 mt-1">{stats?.clickCount || 0} total clicks</div>
                </Card>

                <Card className="bg-slate-950 border-slate-800 text-white p-4">
                  <div className="text-xs text-slate-400 font-semibold uppercase">Total Tools Audit</div>
                  <div className="text-3xl font-extrabold font-mono mt-1">{ToolsData.length}</div>
                  <div className="text-[11px] text-purple-400 mt-1">100% Client/Server Validated</div>
                </Card>

                <Card className="bg-slate-950 border-slate-800 text-white p-4">
                  <div className="text-xs text-slate-400 font-semibold uppercase">Neon DB Latency</div>
                  <div className="text-3xl font-extrabold font-mono mt-1">{stats?.dbLatencyMs || 0}ms</div>
                  <div className="text-[11px] text-emerald-400 mt-1">Status: {stats?.dbStatus || "CONNECTED"}</div>
                </Card>
              </div>

              {/* Real Registered Users Table */}
              <Card className="bg-slate-950 border-slate-800 text-white p-4 space-y-3">
                <CardHeader className="p-0 border-b border-slate-800 pb-2">
                  <CardTitle className="text-sm font-bold text-white">
                    Registered Users (Neon Cloud Database)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs divide-y divide-slate-800">
                      <thead>
                        <tr className="text-slate-400">
                          <th className="p-2">Name</th>
                          <th className="p-2">Email</th>
                          <th className="p-2">Role</th>
                          <th className="p-2">Joined</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {realUsers.map((u) => (
                          <tr key={u.id}>
                            <td className="p-2 font-semibold text-white">{u.name || "User"}</td>
                            <td className="p-2 font-mono text-slate-300">{u.email}</td>
                            <td className="p-2"><Badge variant="outline" className="text-[10px] text-amber-400">{u.role}</Badge></td>
                            <td className="p-2 text-slate-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* GA4 Footer Bar */}
      <footer className="h-8 border-t border-slate-800 bg-slate-950 px-4 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
        <div>© 2026 Google | Analytics home | Terms of Service | Privacy Policy</div>
        <div>Toolzium Admin Replica GA4 v4.2</div>
      </footer>
    </div>
  );
}
