"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Search, Copy, Clock, Globe, Shield, Server, AlertCircle, History, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface WhoisData {
  domainName: string;
  registrar: string;
  creationDate: string;
  expirationDate: string;
  updatedDate: string;
  statuses: string[];
  nameservers: string[];
  dnssec: boolean;
  rawJson: any;
}

export default function WhoisClient() {
  const [input, setInput] = useState("");
  const [domain, setDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WhoisData | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [showRaw, setShowRaw] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("whois-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        // Ignore
      }
    }
  }, []);

  const saveToHistory = (query: string) => {
    const newHistory = [query, ...history.filter((h) => h !== query)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("whois-history", JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("whois-history");
  };

  const cleanDomain = (url: string) => {
    let clean = url.trim().toLowerCase();
    // Remove protocol
    clean = clean.replace(/^(https?:\/\/)?(www\.)?/, "");
    // Remove path, query, hash
    clean = clean.split("/")[0].split("?")[0].split("#")[0];
    return clean;
  };

  const fetchRdap = async (targetDomain: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const clean = cleanDomain(targetDomain);
    setDomain(clean);

    if (!clean || !clean.includes(".")) {
      setError("Please enter a valid domain name.");
      setIsLoading(false);
      return;
    }

    try {
      // Use standard RDAP format, rdap.org routes appropriately
      const url = `https://rdap.org/domain/${clean}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Domain not found or not registered.");
        }
        throw new Error(`Failed to fetch WHOIS data (HTTP ${response.status}).`);
      }

      const data = await response.json();
      
      // Parse RDAP response
      let registrar = "Unknown";
      if (data.entities && Array.isArray(data.entities)) {
        const registrarEntity = data.entities.find((e: any) => 
          e.roles && e.roles.includes("registrar")
        );
        if (registrarEntity && registrarEntity.vcardArray && registrarEntity.vcardArray[1]) {
          const fn = registrarEntity.vcardArray[1].find((v: any) => v[0] === "fn");
          if (fn) registrar = fn[3];
        }
      }

      let creationDate = "Unknown";
      let expirationDate = "Unknown";
      let updatedDate = "Unknown";

      if (data.events && Array.isArray(data.events)) {
        const creation = data.events.find((e: any) => e.eventAction === "registration");
        if (creation) creationDate = new Date(creation.eventDate).toLocaleString();

        const expiration = data.events.find((e: any) => e.eventAction === "expiration");
        if (expiration) expirationDate = new Date(expiration.eventDate).toLocaleString();

        const updated = data.events.find((e: any) => e.eventAction === "last changed");
        if (updated) updatedDate = new Date(updated.eventDate).toLocaleString();
      }

      const statuses = data.status || [];
      const nameservers = data.nameservers ? data.nameservers.map((ns: any) => ns.ldhName) : [];
      const dnssec = data.secureDNS?.delegationSigned || false;

      setResult({
        domainName: data.ldhName || clean,
        registrar,
        creationDate,
        expirationDate,
        updatedDate,
        statuses,
        nameservers,
        dnssec,
        rawJson: data
      });
      
      saveToHistory(clean);

    } catch (err: any) {
      setError(err.message || "An error occurred while fetching WHOIS data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRdap(input);
  };

  const handleHistoryClick = (item: string) => {
    setInput(item);
    fetchRdap(item);
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `Domain: ${result.domainName}
Registrar: ${result.registrar}
Registered On: ${result.creationDate}
Expires On: ${result.expirationDate}
Updated On: ${result.updatedDate}
Nameservers: ${result.nameservers.join(", ")}
DNSSEC: ${result.dnssec ? "Enabled" : "Disabled"}`;
    navigator.clipboard.writeText(text);
  };

  const formatStatus = (status: string) => {
    // Camel case to words
    return status.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        title="WHOIS Domain Lookup" 
        description="Lookup domain registration details, registrar info, and DNS records."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Domain Query</CardTitle>
              <CardDescription>Enter a domain name to check its WHOIS records.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  placeholder="e.g., example.com"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !input}>
                  {isLoading ? (
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  Lookup
                </Button>
              </form>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{result.domainName}</CardTitle>
                  <CardDescription>Registration Information</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Info
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Globe className="w-4 h-4" /> Registrar
                    </Label>
                    <p className="font-medium">{result.registrar}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Shield className="w-4 h-4" /> DNSSEC
                    </Label>
                    <p className="font-medium">
                      {result.dnssec ? (
                        <Badge variant="default" className="bg-green-600">Enabled</Badge>
                      ) : (
                        <Badge variant="secondary">Disabled</Badge>
                      )}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-sm">Registered On</Label>
                    <p className="font-medium text-sm">{result.creationDate}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-sm">Expires On</Label>
                    <p className="font-medium text-sm">{result.expirationDate}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-sm">Last Updated</Label>
                    <p className="font-medium text-sm">{result.updatedDate}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <Server className="w-4 h-4" /> Nameservers
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {result.nameservers.length > 0 ? (
                      result.nameservers.map((ns, i) => (
                        <Badge key={i} variant="outline" className="text-sm py-1">
                          {ns}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No nameservers found.</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Domain Status
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {result.statuses.length > 0 ? (
                      result.statuses.map((status, i) => (
                        <Badge key={i} variant="secondary" className="text-xs font-normal">
                          {formatStatus(status)}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No status codes found.</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between" 
                    onClick={() => setShowRaw(!showRaw)}
                  >
                    View Raw RDAP JSON
                    {showRaw ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                  
                  {showRaw && (
                    <div className="mt-4 bg-muted rounded-md p-4 overflow-x-auto">
                      <pre className="text-xs text-muted-foreground font-mono">
                        {JSON.stringify(result.rawJson, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="w-5 h-5" /> History
              </CardTitle>
              {history.length > 0 && (
                <Button variant="ghost" size="icon" onClick={clearHistory} title="Clear history">
                  <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No recent searches.
                </p>
              ) : (
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-2">
                    {history.map((item, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start font-normal text-sm"
                        onClick={() => handleHistoryClick(item)}
                      >
                        <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                        {item}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
