"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, Download, Share2, Filter, Layers } from "lucide-react";

interface LandingPageRow {
  id: number;
  path: string;
  sessions: number;
  sessionsShare: string;
  activeUsers: number;
  activeUsersShare: string;
  newUsers: number;
  newUsersShare: string;
  avgEngagementTime: string;
  keyEvents: number;
  totalRevenue: string;
  checked?: boolean;
}

const LANDING_PAGES_DATA: LandingPageRow[] = [
  { id: 1, path: "/", sessions: 94, sessionsShare: "80.34%", activeUsers: 57, activeUsersShare: "89.06%", newUsers: 56, newUsersShare: "87.5%", avgEngagementTime: "1m 53s", keyEvents: 0, totalRevenue: "$0.00", checked: true },
  { id: 2, path: "/tools", sessions: 9, sessionsShare: "7.69%", activeUsers: 6, activeUsersShare: "9.38%", newUsers: 5, newUsersShare: "7.81%", avgEngagementTime: "5m 44s", keyEvents: 0, totalRevenue: "$0.00", checked: true },
  { id: 3, path: "(not set)", sessions: 2, sessionsShare: "1.71%", activeUsers: 2, activeUsersShare: "3.13%", newUsers: 0, newUsersShare: "0%", avgEngagementTime: "1m 22s", keyEvents: 0, totalRevenue: "$0.00", checked: false },
  { id: 4, path: "/tools/ai/pdf-chat", sessions: 2, sessionsShare: "1.71%", activeUsers: 2, activeUsersShare: "3.13%", newUsers: 0, newUsersShare: "0%", avgEngagementTime: "2s", keyEvents: 0, totalRevenue: "$0.00", checked: true },
  { id: 5, path: "/tools/ai/product-description", sessions: 2, sessionsShare: "1.71%", activeUsers: 2, activeUsersShare: "3.13%", newUsers: 0, newUsersShare: "0%", avgEngagementTime: "7s", keyEvents: 0, totalRevenue: "$0.00", checked: true },
  { id: 6, path: "/sign-up", sessions: 1, sessionsShare: "0.85%", activeUsers: 1, activeUsersShare: "1.56%", newUsers: 0, newUsersShare: "0%", avgEngagementTime: "3s", keyEvents: 0, totalRevenue: "$0.00", checked: true },
  { id: 7, path: "/sponsor", sessions: 1, sessionsShare: "0.85%", activeUsers: 1, activeUsersShare: "1.56%", newUsers: 1, newUsersShare: "1.56%", avgEngagementTime: "0s", keyEvents: 0, totalRevenue: "$0.00", checked: false },
  { id: 8, path: "/tools/calc/gpa", sessions: 1, sessionsShare: "0.85%", activeUsers: 1, activeUsersShare: "1.56%", newUsers: 0, newUsersShare: "0%", avgEngagementTime: "0s", keyEvents: 0, totalRevenue: "$0.00", checked: false },
  { id: 9, path: "/tools/image/bg-remove", sessions: 1, sessionsShare: "0.85%", activeUsers: 1, activeUsersShare: "1.56%", newUsers: 0, newUsersShare: "0%", avgEngagementTime: "1m 39s", keyEvents: 0, totalRevenue: "$0.00", checked: false },
  { id: 10, path: "/tools/productivity/eisenhower-kanban", sessions: 1, sessionsShare: "0.85%", activeUsers: 1, activeUsersShare: "1.56%", newUsers: 0, newUsersShare: "0%", avgEngagementTime: "1m 14s", keyEvents: 0, totalRevenue: "$0.00", checked: false },
];

export default function GA4LandingPages() {
  const [rows, setRows] = useState<LandingPageRow[]>(LANDING_PAGES_DATA);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleRow = (id: number) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, checked: !r.checked } : r))
    );
  };

  const filteredRows = rows.filter((r) =>
    r.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="border shadow-lg bg-card/90 backdrop-blur-md p-4 sm:p-6 space-y-5 max-w-full overflow-hidden">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              Landing page: Landing page
            </h2>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-xs">
              ✓ Verified GA4 Telemetry
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Sessions by landing page over time (Jul 10 - Aug 6)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs gap-1 font-mono">
            <Filter className="h-3 w-3" /> Add filter +
          </Badge>
        </div>
      </div>

      {/* Sessions Line Chart Visualization */}
      <div className="bg-muted/20 border rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span>Sessions by Landing page over time</span>
          <span className="text-muted-foreground font-mono">Day | Jul 11 - Aug 6</span>
        </div>

        {/* SVG Curve Chart */}
        <div className="h-36 w-full relative pt-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="20" x2="500" y2="20" stroke="currentColor" opacity="0.1" strokeDasharray="3 3" />
            <line x1="0" y1="50" x2="500" y2="50" stroke="currentColor" opacity="0.1" strokeDasharray="3 3" />
            <line x1="0" y1="80" x2="500" y2="80" stroke="currentColor" opacity="0.1" strokeDasharray="3 3" />

            {/* Path Total Curve (Blue) */}
            <path
              d="M 0 95 Q 100 95 200 95 T 350 90 T 420 15 T 460 30 T 500 45"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
            />
            {/* Area gradient under Total curve */}
            <path
              d="M 0 95 Q 100 95 200 95 T 350 90 T 420 15 T 460 30 T 500 45 L 500 100 L 0 100 Z"
              fill="url(#blueGradient)"
              opacity="0.15"
            />
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Path / (Green) */}
            <path
              d="M 0 97 Q 100 97 200 97 T 350 94 T 420 85 T 460 84 T 500 85"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
          </svg>

          {/* Date Axis Labels */}
          <div className="flex justify-between text-[10px] text-muted-foreground pt-1 font-mono">
            <span>Jul 11</span>
            <span>Jul 15</span>
            <span>Jul 19</span>
            <span>Jul 23</span>
            <span>Jul 27</span>
            <span>Jul 31</span>
            <span>Aug 03</span>
            <span>Aug 06</span>
          </div>
        </div>
      </div>

      {/* GA4 Landing Page Detailed Data Table (Matching Screenshot 1) */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search landing page..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 text-xs h-9 bg-muted/20"
            />
          </div>

          <div className="flex items-center gap-3 text-muted-foreground font-medium">
            <span>Rows per page: <strong>10</strong></span>
            <span>1-10 of 13</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border max-w-full">
          <table className="w-full text-left text-xs divide-y">
            <thead>
              <tr className="bg-muted/40 font-semibold text-muted-foreground">
                <th className="p-3 w-10 text-center">✓</th>
                <th className="p-3">Landing page</th>
                <th className="p-3 text-right">↓ Sessions</th>
                <th className="p-3 text-right">Active users</th>
                <th className="p-3 text-right">New users</th>
                <th className="p-3 text-right">Avg engagement time</th>
                <th className="p-3 text-right">Key events</th>
                <th className="p-3 text-right">Total revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {/* Summary Total Row */}
              <tr className="bg-muted/20 font-bold">
                <td className="p-3 text-center">
                  <Checkbox checked={true} disabled />
                </td>
                <td className="p-3 text-foreground">Total</td>
                <td className="p-3 text-right font-mono">
                  117 <span className="text-[10px] font-normal text-muted-foreground block">100% of total</span>
                </td>
                <td className="p-3 text-right font-mono">
                  64 <span className="text-[10px] font-normal text-muted-foreground block">100% of total</span>
                </td>
                <td className="p-3 text-right font-mono">
                  64 <span className="text-[10px] font-normal text-muted-foreground block">100% of total</span>
                </td>
                <td className="p-3 text-right font-mono">
                  2m 05s <span className="text-[10px] font-normal text-muted-foreground block">Avg 0%</span>
                </td>
                <td className="p-3 text-right font-mono">0.00</td>
                <td className="p-3 text-right font-mono">$0.00</td>
              </tr>

              {/* Data Rows */}
              {filteredRows.map((row) => (
                <tr key={row.id} className="hover:bg-muted/30 transition">
                  <td className="p-3 text-center">
                    <Checkbox
                      checked={row.checked}
                      onCheckedChange={() => toggleRow(row.id)}
                    />
                  </td>
                  <td className="p-3 font-mono font-medium text-primary">
                    {row.id} &nbsp; {row.path}
                  </td>
                  <td className="p-3 text-right font-mono font-semibold">
                    {row.sessions} <span className="text-[10px] font-normal text-muted-foreground">({row.sessionsShare})</span>
                  </td>
                  <td className="p-3 text-right font-mono">
                    {row.activeUsers} <span className="text-[10px] font-normal text-muted-foreground">({row.activeUsersShare})</span>
                  </td>
                  <td className="p-3 text-right font-mono">
                    {row.newUsers} <span className="text-[10px] font-normal text-muted-foreground">({row.newUsersShare})</span>
                  </td>
                  <td className="p-3 text-right font-mono">{row.avgEngagementTime}</td>
                  <td className="p-3 text-right font-mono text-muted-foreground">0.00 (-)</td>
                  <td className="p-3 text-right font-mono text-muted-foreground">$0.00 (-)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
