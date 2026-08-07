"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Share2, Layers, Users, MapPin, Search, ExternalLink } from "lucide-react";

export default function GA4DemographicsTech() {
  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      {/* Overview Cards Row (Matching Screenshot 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-full">
        <Card className="border shadow-xs p-4 bg-card/80 backdrop-blur-md">
          <div className="text-xs font-semibold text-muted-foreground uppercase">New Users</div>
          <div className="text-3xl font-extrabold text-foreground font-mono mt-1">64</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 100% vs prior period</div>
        </Card>

        <Card className="border shadow-xs p-4 bg-card/80 backdrop-blur-md">
          <div className="text-xs font-semibold text-muted-foreground uppercase">Returning Users</div>
          <div className="text-3xl font-extrabold text-foreground font-mono mt-1">4</div>
          <div className="text-[11px] text-muted-foreground mt-1">4 sessions recorded</div>
        </Card>

        <Card className="border shadow-xs p-4 bg-card/80 backdrop-blur-md">
          <div className="text-xs font-semibold text-muted-foreground uppercase">Qualified Leads</div>
          <div className="text-3xl font-extrabold text-foreground font-mono mt-1">0</div>
          <div className="text-[11px] text-muted-foreground mt-1">Key events configured</div>
        </Card>

        <Card className="border shadow-xs p-4 bg-card/80 backdrop-blur-md">
          <div className="text-xs font-semibold text-muted-foreground uppercase">Avg Engagement Time</div>
          <div className="text-3xl font-extrabold text-foreground font-mono mt-1">2m 05s</div>
          <div className="text-[11px] text-purple-600 font-semibold mt-1">High engagement rate</div>
        </Card>
      </div>

      {/* Main Grid: Cities, Source/Medium, Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-full">
        {/* Active Users by City Table (Matching GA4 Screenshot 2) */}
        <Card className="border shadow-md bg-card/90 backdrop-blur-md p-4 space-y-3">
          <CardHeader className="p-0 border-b pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" /> Active users by City
              </CardTitle>
            </div>
            <Badge variant="outline" className="text-[10px]">City GA4</Badge>
          </CardHeader>
          <CardContent className="p-0 space-y-2 text-xs">
            <div className="flex justify-between font-semibold text-muted-foreground border-b pb-1">
              <span>CITY</span>
              <span>ACTIVE USERS</span>
            </div>

            <div className="space-y-2 pt-1 font-mono">
              <div className="flex justify-between items-center p-2 rounded-lg border bg-muted/20">
                <span className="font-semibold text-foreground flex items-center gap-1.5">🇺🇸 Boardman</span>
                <span className="font-bold text-primary">9</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg border bg-muted/20">
                <span className="font-semibold text-foreground flex items-center gap-1.5">🇺🇸 Ashburn</span>
                <span className="font-bold text-primary">8</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg border bg-emerald-500/10 border-emerald-500/30">
                <span className="font-semibold text-emerald-600 flex items-center gap-1.5">🇧🇩 Dhaka</span>
                <span className="font-bold text-emerald-600">7</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg border bg-muted/20">
                <span className="font-semibold text-foreground flex items-center gap-1.5">🇳🇱 Amsterdam</span>
                <span className="font-bold text-primary">6</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg border bg-muted/20">
                <span className="font-semibold text-foreground flex items-center gap-1.5">🇺🇸 Chicago</span>
                <span className="font-bold text-primary">4</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg border bg-muted/20">
                <span className="font-semibold text-foreground flex items-center gap-1.5">🇩🇪 Frankfurt am Main</span>
                <span className="font-bold text-primary">4</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg border bg-muted/20">
                <span className="font-semibold text-foreground flex items-center gap-1.5">🇺🇸 Council Bluffs</span>
                <span className="font-bold text-primary">3</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sessions by Session Manual Source/Medium (Matching GA4 Screenshot 2) */}
        <Card className="border shadow-md bg-card/90 backdrop-blur-md p-4 space-y-3">
          <CardHeader className="p-0 border-b pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <ExternalLink className="h-3.5 w-3.5 text-primary" /> Sessions by Source / Medium
              </CardTitle>
            </div>
            <Badge variant="outline" className="text-[10px]">Traffic GA4</Badge>
          </CardHeader>
          <CardContent className="p-0 space-y-2 text-xs">
            <div className="flex justify-between font-semibold text-muted-foreground border-b pb-1">
              <span>SESSION MANUAL SOURCE</span>
              <span>SESSIONS</span>
            </div>

            <div className="space-y-2 pt-1 font-mono">
              <div className="p-2.5 rounded-lg border bg-muted/20 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-primary font-bold">accounts.google.com</span>
                  <span className="font-bold text-foreground">10</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[80%]" />
                </div>
              </div>

              <div className="p-2.5 rounded-lg border bg-muted/20 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-primary font-bold">google</span>
                  <span className="font-bold text-foreground">9</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[72%]" />
                </div>
              </div>

              <div className="p-2.5 rounded-lg border bg-muted/20 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-primary font-bold">linkedin.com</span>
                  <span className="font-bold text-foreground">1</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 w-[10%]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Users by First User Primary Channel Grouping (Matching GA4 Screenshot 2) */}
        <Card className="border shadow-md bg-card/90 backdrop-blur-md p-4 space-y-3">
          <CardHeader className="p-0 border-b pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-primary" /> New Users by Channel
              </CardTitle>
            </div>
            <Badge variant="outline" className="text-[10px]">Channels GA4</Badge>
          </CardHeader>
          <CardContent className="p-0 space-y-2 text-xs">
            <div className="flex justify-between font-semibold text-muted-foreground border-b pb-1">
              <span>FIRST USER PRIMARY CHANNEL</span>
              <span>NEW USERS</span>
            </div>

            <div className="space-y-2 pt-1 font-mono">
              <div className="p-2.5 rounded-lg border bg-muted/20 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Direct</span>
                  <span className="font-bold text-primary">61</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-[95%]" />
                </div>
              </div>

              <div className="p-2.5 rounded-lg border bg-muted/20 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Organic Search</span>
                  <span className="font-bold text-primary">2</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[15%]" />
                </div>
              </div>

              <div className="p-2.5 rounded-lg border bg-muted/20 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Organic Social</span>
                  <span className="font-bold text-primary">1</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-fuchsia-500 w-[8%]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
