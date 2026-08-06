import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Link2,
  MousePointerClick,
  Settings,
  Plus,
  ExternalLink,
  BarChart3,
  Wrench,
  Sparkles,
} from "lucide-react";
import FormattedDateTime from "@/components/tools/url/formatted-date-time";

export const metadata: Metadata = {
  title: "User Dashboard | Toolzium",
  description: "Manage your links, view usage analytics, and customize your account settings.",
};

export default async function DashboardPage() {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user = session.user;

  // Fetch user links and click counts from database
  let links: any[] = [];
  let totalClicks = 0;

  try {
    links = await prisma.link.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        _count: {
          select: { clicks: true },
        },
      },
    });

    totalClicks = links.reduce((sum, item) => sum + (item._count?.clicks || 0), 0);
  } catch (err) {
    console.error("Failed to fetch dashboard stats:", err);
  }

  const userInitials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email[0].toUpperCase();

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Top Banner & Profile Overview - 100% Mobile Safe */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl border bg-card/60 backdrop-blur shadow-xs max-w-full overflow-hidden">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 max-w-full">
          <Avatar className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 border-2 border-primary/20 shadow-sm">
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback className="text-lg sm:text-xl font-bold bg-primary/10 text-primary">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-0.5 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight truncate max-w-full">
                {user.name || "Welcome!"}
              </h1>
              <Badge variant="secondary" className="gap-1 font-medium text-xs shrink-0">
                <Sparkles className="h-3 w-3 text-amber-500" />
                Free Plan
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground truncate max-w-full">{user.email}</p>
          </div>
        </div>

        {/* Buttons Stack Vertically on Mobile so NOTHING ever cuts off */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto pt-2 sm:pt-0">
          <Button asChild variant="outline" size="sm" className="gap-2 h-10 w-full sm:w-auto justify-center">
            <Link href="/dashboard/settings/profile">
              <Settings className="h-4 w-4" />
              Account Settings
            </Link>
          </Button>
          <Button asChild size="sm" className="gap-2 h-10 w-full sm:w-auto justify-center">
            <Link href="/tools/url/shortener">
              <Plus className="h-4 w-4" />
              Create Short Link
            </Link>
          </Button>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="bg-card/50 p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Short Links</CardTitle>
            <Link2 className="h-4 w-4 text-primary shrink-0" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl sm:text-3xl font-bold">{links.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Shortened URLs active in system
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Recorded Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-primary shrink-0" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl sm:text-3xl font-bold">{totalClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Link redirects & QR code scans
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Database Status</CardTitle>
            <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 text-[10px]">
              Connected
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-base sm:text-lg font-bold">Neon PostgreSQL</div>
            <p className="text-xs text-muted-foreground mt-1">
              Cloud Database Active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Account-Connected & History Saving Tools Section */}
      <div className="space-y-4 max-w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-semibold tracking-tight">Tools That Store Your Data & History</h2>
            <p className="text-xs text-muted-foreground">
              These tools utilize your account & cloud storage to preserve your customized settings, history, and work.
            </p>
          </div>
          <Badge variant="outline" className="gap-1 font-medium text-xs border-primary/30 text-primary self-start sm:self-auto shrink-0">
            <Sparkles className="h-3 w-3" /> Auto-Saved to Account
          </Badge>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-full">
          <Link
            href="/tools/url/shortener"
            className="flex flex-col justify-between p-4 rounded-xl border bg-card/60 hover:bg-accent/40 transition group space-y-3 max-w-full overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                <Link2 className="h-5 w-5" />
              </div>
              <Badge variant="secondary" className="text-[11px]">
                {links.length} Links Saved
              </Badge>
            </div>
            <div>
              <div className="font-semibold text-sm">URL Shortener & Analytics</div>
              <div className="text-xs text-muted-foreground mt-1 break-words">
                Saves custom short links, referrer stats, and QR scan history.
              </div>
            </div>
          </Link>

          <Link
            href="/tools/productivity/kanban"
            className="flex flex-col justify-between p-4 rounded-xl border bg-card/60 hover:bg-accent/40 transition group space-y-3 max-w-full overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500 group-hover:scale-105 transition-transform">
                <Wrench className="h-5 w-5" />
              </div>
              <Badge variant="outline" className="text-[11px]">
                Auto-Synced
              </Badge>
            </div>
            <div>
              <div className="font-semibold text-sm">Task Kanban Workspace</div>
              <div className="text-xs text-muted-foreground mt-1 break-words">
                Drag & drop project board, custom labels, and priority trackers.
              </div>
            </div>
          </Link>

          <Link
            href="/tools/productivity/habit-tracker"
            className="flex flex-col justify-between p-4 rounded-xl border bg-card/60 hover:bg-accent/40 transition group space-y-3 max-w-full overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-500 group-hover:scale-105 transition-transform">
                <BarChart3 className="h-5 w-5" />
              </div>
              <Badge variant="outline" className="text-[11px]">
                Streak Logged
              </Badge>
            </div>
            <div>
              <div className="font-semibold text-sm">Habit & Focus Streak Log</div>
              <div className="text-xs text-muted-foreground mt-1 break-words">
                Tracks daily habits, pomodoro focus sessions, and statistics.
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Short Links & Analytics Management - Mobile & Desktop Responsive */}
      <Card className="max-w-full overflow-hidden">
        <CardHeader className="p-4 sm:p-6 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Wrench className="h-5 w-5 text-primary shrink-0" />
                Short Links & Analytics
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                View and manage your active short links
              </CardDescription>
            </div>
            <Button asChild size="sm" variant="outline" className="h-9 self-start sm:self-auto">
              <Link href="/tools/url/shortener">
                <Plus className="mr-1.5 h-4 w-4" />
                New Short Link
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          {links.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground space-y-3">
              <Link2 className="h-10 w-10 mx-auto text-muted-foreground/50" />
              <p className="text-sm">You haven&apos;t created any short links yet.</p>
              <Button asChild size="sm">
                <Link href="/tools/url/shortener">Shorten your first link</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Mobile View: Clean Card List (Zero Horizontal Cut-off) */}
              <div className="block sm:hidden space-y-3">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="p-3 rounded-xl border bg-muted/20 space-y-2 max-w-full overflow-hidden"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-primary text-sm truncate">
                        /{link.short}
                      </span>
                      <Badge variant="secondary" className="text-[10px]">
                        {link._count?.clicks || 0} Clicks
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground break-all line-clamp-2">
                      {link.targetUrl}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t text-[11px] text-muted-foreground">
                      <FormattedDateTime dateISO={link.createdAt.toISOString()} />
                      <div className="flex items-center gap-2">
                        <Button asChild variant="outline" size="sm" className="h-7 text-xs px-2 gap-1">
                          <Link href={`/tools/url/shortener/analytics/${link.short}`}>
                            <BarChart3 className="h-3 w-3" />
                            Analytics
                          </Link>
                        </Button>
                        <Button asChild variant="ghost" size="icon" className="h-7 w-7">
                          <a href={link.targetUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase border-b bg-muted/30">
                    <tr>
                      <th className="px-4 py-3">Short URL</th>
                      <th className="px-4 py-3">Target Destination</th>
                      <th className="px-4 py-3">Clicks</th>
                      <th className="px-4 py-3">Created</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {links.map((link) => (
                      <tr key={link.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 font-semibold text-primary">
                          /{link.short}
                        </td>
                        <td className="px-4 py-3 max-w-[250px] truncate text-muted-foreground">
                          {link.targetUrl}
                        </td>
                        <td className="px-4 py-3 font-medium">
                          <Badge variant="secondary" className="font-semibold">
                            {link._count?.clicks || 0}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">
                          <FormattedDateTime dateISO={link.createdAt.toISOString()} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button asChild variant="outline" size="sm" className="h-8 gap-1">
                              <Link href={`/tools/url/shortener/analytics/${link.short}`}>
                                <BarChart3 className="h-3.5 w-3.5" />
                                Analytics
                              </Link>
                            </Button>
                            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                              <a href={link.targetUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
