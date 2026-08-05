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
  QrCode,
  FileText,
  Code2,
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
    <div className="space-y-8">
      {/* Top Banner & Profile Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-2xl border bg-card/60 backdrop-blur shadow-xs">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-sm">
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">
                {user.name || "Welcome!"}
              </h1>
              <Badge variant="secondary" className="gap-1 font-medium text-xs">
                <Sparkles className="h-3 w-3 text-amber-500" />
                Free Plan
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard/settings/profile">
              <Settings className="h-4 w-4" />
              Account Settings
            </Link>
          </Button>
          <Button asChild className="gap-2">
            <Link href="/tools/url/shortener">
              <Plus className="h-4 w-4" />
              Create Short Link
            </Link>
          </Button>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Short Links</CardTitle>
            <Link2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{links.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Shortened URLs active in system
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recorded Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Link redirects & QR code scans
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Status</CardTitle>
            <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">
              Connected
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Neon PostgreSQL</div>
            <p className="text-xs text-muted-foreground mt-1">
              Cloud Database Active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Tools Access Grid */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Popular Productivity Tools</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <Link
            href="/tools/url/shortener"
            className="flex items-center gap-3 p-4 rounded-xl border bg-card/40 hover:bg-accent/50 transition group"
          >
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
              <Link2 className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">URL Shortener</div>
              <div className="text-xs text-muted-foreground">Short links & Analytics</div>
            </div>
          </Link>

          <Link
            href="/tools/url/qr"
            className="flex items-center gap-3 p-4 rounded-xl border bg-card/40 hover:bg-accent/50 transition group"
          >
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-500 group-hover:scale-105 transition-transform">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">QR Generator</div>
              <div className="text-xs text-muted-foreground">Custom QR codes</div>
            </div>
          </Link>

          <Link
            href="/tools/util/pdf-merge"
            className="flex items-center gap-3 p-4 rounded-xl border bg-card/40 hover:bg-accent/50 transition group"
          >
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:scale-105 transition-transform">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">PDF Tools</div>
              <div className="text-xs text-muted-foreground">Merge, split & convert</div>
            </div>
          </Link>

          <Link
            href="/tools/dev/json-formatter"
            className="flex items-center gap-3 p-4 rounded-xl border bg-card/40 hover:bg-accent/50 transition group"
          >
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500 group-hover:scale-105 transition-transform">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">Developer Tools</div>
              <div className="text-xs text-muted-foreground">JSON, Base64 & Regex</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Short Links & Analytics Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Wrench className="h-5 w-5 text-primary" />
                Short Links & Analytics
              </CardTitle>
              <CardDescription>
                View and manage your active short links
              </CardDescription>
            </div>
            <Button asChild size="sm" variant="outline">
              <Link href="/tools/url/shortener">
                <Plus className="mr-1.5 h-4 w-4" />
                New Short Link
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {links.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground space-y-3">
              <Link2 className="h-10 w-10 mx-auto text-muted-foreground/50" />
              <p className="text-sm">You haven&apos;t created any short links yet.</p>
              <Button asChild size="sm">
                <Link href="/tools/url/shortener">Shorten your first link</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
