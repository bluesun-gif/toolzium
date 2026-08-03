"use client";
import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, Search, History, Trash2, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MacDetails {
  mac: string;
  oui: string;
  vendor: string;
  isMulticast: boolean;
  isLocal: boolean;
}

export default function MacLookupClient() {
  const [macInput, setMacInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MacDetails | null>(null);
  const [history, setHistory] = useState<MacDetails[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("macLookupHistory");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const saveHistory = (newHistory: MacDetails[]) => {
    setHistory(newHistory);
    localStorage.setItem("macLookupHistory", JSON.stringify(newHistory));
  };

  const formatInput = (val: string) => {
    // Keep only hex chars
    let cleaned = val.replace(/[^a-fA-F0-9]/g, "").toUpperCase();
    if (cleaned.length > 12) cleaned = cleaned.slice(0, 12);
    
    // Add colons
    const formatted = cleaned.match(/.{1,2}/g)?.join(":") || cleaned;
    return formatted;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // auto format
    setMacInput(formatInput(e.target.value));
    setError(null);
  };

  const isValidMac = (mac: string) => {
    const regex = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/i;
    return regex.test(mac);
  };

  const cleanMac = (mac: string) => {
    const cleaned = mac.replace(/[^a-fA-F0-9]/g, "").toUpperCase();
    return cleaned.match(/.{1,2}/g)?.join(":") || "";
  };

  const lookupMac = async (macToLookup: string) => {
    const formattedMac = cleanMac(macToLookup);
    if (!isValidMac(formattedMac)) {
      setError("Please enter a valid MAC address.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // First octet logic
      const firstOctetHex = formattedMac.split(":")[0];
      const firstOctetDec = parseInt(firstOctetHex, 16);
      
      const isMulticast = (firstOctetDec & 0b00000001) === 1;
      const isLocal = (firstOctetDec & 0b00000010) === 2;
      
      const oui = formattedMac.split(":").slice(0, 3).join(":");

      let vendor = "Unknown / Not Found";
      try {
        const response = await fetch(`https://api.macvendors.com/${formattedMac}`);
        if (response.ok) {
          vendor = await response.text();
        } else if (response.status === 404) {
           vendor = "Not Found";
        }
      } catch (err) {
        console.error("API error", err);
        // Fallback or leave as unknown if API blocked
      }

      const newResult: MacDetails = {
        mac: formattedMac,
        oui,
        vendor,
        isMulticast,
        isLocal,
      };

      setResult(newResult);
      
      // Update history
      const newHistory = [newResult, ...history.filter(h => h.mac !== formattedMac)].slice(0, 20);
      saveHistory(newHistory);

    } catch (err) {
      setError("An error occurred during lookup.");
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = () => {
    lookupMac(macInput);
  };

  const generateRandomMac = () => {
    const hexChars = "0123456789ABCDEF";
    let mac = "";
    for (let i = 0; i < 12; i++) {
      mac += hexChars[Math.floor(Math.random() * 16)];
    }
    const formatted = mac.match(/.{1,2}/g)?.join(":") || mac;
    setMacInput(formatted);
    setError(null);
  };

  const copyResult = () => {
    if (!result) return;
    const text = `MAC: ${result.mac}\nOUI: ${result.oui}\nVendor: ${result.vendor}\nType: ${result.isMulticast ? "Multicast" : "Unicast"}, ${result.isLocal ? "Locally Administered" : "Universally Administered"}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("macLookupHistory");
  };

  return (
    <>
      <ToolPageHeader title="MAC Address Lookup" description="Find the manufacturer and details of any MAC address." />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>MAC Lookup</CardTitle>
              <CardDescription>Enter a MAC address to check its vendor and type.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Label htmlFor="mac" className="sr-only">MAC Address</Label>
                  <Input 
                    id="mac" 
                    placeholder="e.g. 00:1A:2B:3C:4D:5E" 
                    value={macInput}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleLookup} disabled={loading || !macInput}>
                    {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                    Lookup
                  </Button>
                  <Button variant="outline" onClick={generateRandomMac} title="Random MAC">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {error && (
                <div className="text-sm text-destructive font-medium bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}

              {result && (
                <div className="mt-6 border rounded-lg p-4 bg-muted/30 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      Results for {result.mac}
                    </h3>
                    <Button variant="ghost" size="sm" onClick={copyResult}>
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Manufacturer / Vendor</p>
                      <p className="font-medium text-lg">{result.vendor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">OUI (Organizationally Unique Identifier)</p>
                      <p className="font-medium">{result.oui}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Transmission Type</p>
                      <Badge variant={result.isMulticast ? "secondary" : "default"}>
                        {result.isMulticast ? "Multicast" : "Unicast"}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Administration Type</p>
                      <Badge variant={result.isLocal ? "secondary" : "default"}>
                        {result.isLocal ? "Locally Administered (LAA)" : "Universally Administered (UAA)"}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <Card className="h-full max-h-[500px] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-base flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Recent Lookups
                </CardTitle>
              </div>
              {history.length > 0 && (
                <Button variant="ghost" size="icon" onClick={clearHistory} title="Clear history">
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              {history.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground text-sm">
                  No recent lookups.
                </div>
              ) : (
                <ScrollArea className="h-full w-full">
                  <div className="p-4 space-y-3">
                    {history.map((h, i) => (
                      <div 
                        key={i} 
                        className="group flex flex-col p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => {
                          setMacInput(h.mac);
                          setResult(h);
                          setError(null);
                        }}
                      >
                        <div className="font-mono text-sm font-medium">{h.mac}</div>
                        <div className="text-xs text-muted-foreground truncate" title={h.vendor}>
                          {h.vendor}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
