"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Shield, MapPin, Globe, Server, Clock } from "lucide-react";
import toast from "react-hot-toast";

interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  org: string;
  timezone: string;
  latitude: number;
  longitude: number;
  version: string;
}

export default function MyIpClient() {
  const [ipv4, setIpv4] = useState<string | null>(null);
  const [ipv6, setIpv6] = useState<string | null>(null);
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIpData = async () => {
    setLoading(true);
    setError(null);
    setIpv4(null);
    setIpv6(null);
    setIpInfo(null);
    try {
      let currentIpv4 = null;
      let currentIpv6 = null;

      // Fetch IP v4
      try {
        const v4Res = await fetch("https://api.ipify.org?format=json");
        if (v4Res.ok) {
          const v4Data = await v4Res.json();
          currentIpv4 = v4Data.ip;
          setIpv4(currentIpv4);
        }
      } catch (e) {
        console.error("IPv4 fetch failed", e);
      }

      // Fetch IP v6
      try {
        const v6Res = await fetch("https://api64.ipify.org?format=json");
        if (v6Res.ok) {
          const v6Data = await v6Res.json();
          currentIpv6 = v6Data.ip;
          if (currentIpv6 !== currentIpv4) {
            setIpv6(currentIpv6);
          }
        }
      } catch (e) {
        console.error("IPv6 fetch failed", e);
      }

      // Fetch IP details from ipapi.co
      const detailsRes = await fetch(`https://ipapi.co/${currentIpv4 || currentIpv6}/json/`);
      if (detailsRes.ok) {
        const detailsData = await detailsRes.json();
        setIpInfo(detailsData);
      }
    } catch (err: any) {
      setError("Failed to fetch geolocation details. IP address was detected.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIpData();
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} copied to clipboard.`);
    });
  };

  return (
    <>
      <ToolPageHeader title="What is My IP Address" description="Find out your public IPv4 and IPv6 address instantly." />
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-2 overflow-hidden">
          <CardHeader className="text-center bg-muted/20 pb-8">
            <CardTitle className="text-2xl text-muted-foreground font-medium uppercase tracking-widest mt-4">Your Public IP Address</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-8 -mt-6">
            <div className="bg-background rounded-2xl shadow-sm border p-8 md:p-12 w-full max-w-4xl text-center flex flex-col items-center justify-center relative z-10">
              {loading ? (
                <div className="h-24 flex items-center justify-center">
                  <RefreshCw className="h-10 w-10 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-destructive text-center p-4 bg-destructive/10 rounded-md">
                  {error}
                </div>
              ) : (
                <>
                  <div className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-primary tracking-tighter break-all text-center leading-none">
                    {ipv4 || ipv6 || "Unknown"}
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4 mt-10">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={() => copyToClipboard(ipv4 || ipv6 || "", "IP Address")}
                      disabled={!ipv4 && !ipv6}
                      className="h-14 px-8 text-lg"
                    >
                      <Copy className="mr-2 h-5 w-5" />
                      Copy IP
                    </Button>
                    <Button 
                      variant="default" 
                      size="lg" 
                      onClick={fetchIpData}
                      className="h-14 px-8 text-lg"
                    >
                      <RefreshCw className="mr-2 h-5 w-5" />
                      Refresh
                    </Button>
                  </div>

                  {ipv6 && ipv4 && ipv6 !== ipv4 && (
                    <div className="mt-8 flex flex-col items-center gap-3 p-6 bg-muted/30 border rounded-xl w-full max-w-2xl">
                      <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">IPv6 Address Detected</span>
                      <div className="flex items-center gap-4 bg-background px-4 py-2 rounded-lg shadow-sm border w-full justify-between overflow-hidden">
                        <span className="text-base sm:text-lg font-mono break-all truncate">{ipv6}</span>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(ipv6, "IPv6 Address")} className="flex-shrink-0">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 flex justify-center text-sm text-muted-foreground py-4 border-t">
            <Shield className="h-4 w-4 mr-2 text-green-500" />
            Your IP is detected client-side. We do not store or track your IP address.
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Location Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-12 bg-muted rounded-lg" />
                <div className="h-12 bg-muted rounded-lg" />
                <div className="h-12 bg-muted rounded-lg" />
              </div>
            ) : ipInfo ? (
              <>
                <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
                  <span className="text-muted-foreground flex items-center gap-2"><Globe className="h-4 w-4"/> Country</span>
                  <span className="font-medium">{ipInfo.country_name || "Unknown"}</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
                  <span className="text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4"/> Region / State</span>
                  <span className="font-medium">{ipInfo.region || "Unknown"}</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
                  <span className="text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4"/> City</span>
                  <span className="font-medium">{ipInfo.city || "Unknown"}</span>
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground p-8 border rounded-lg border-dashed">Location information not available.</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              Network Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-12 bg-muted rounded-lg" />
                <div className="h-12 bg-muted rounded-lg" />
                <div className="h-12 bg-muted rounded-lg" />
              </div>
            ) : ipInfo ? (
              <>
                <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
                  <span className="text-muted-foreground flex items-center gap-2"><Server className="h-4 w-4"/> ISP / Provider</span>
                  <span className="font-medium text-right max-w-[200px] sm:max-w-xs truncate" title={ipInfo.org}>{ipInfo.org || "Unknown"}</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
                  <span className="text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4"/> Timezone</span>
                  <span className="font-medium">{ipInfo.timezone || "Unknown"}</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
                  <span className="text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4"/> Coordinates</span>
                  <span className="font-medium font-mono text-sm bg-muted px-2 py-1 rounded">
                    {ipInfo.latitude && ipInfo.longitude ? `${ipInfo.latitude}, ${ipInfo.longitude}` : "Unknown"}
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground p-8 border rounded-lg border-dashed">Network information not available.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
