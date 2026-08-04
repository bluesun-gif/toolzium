"use client";

import { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Network, Calculator, Hash, Table as TableIcon } from "lucide-react";

export function SubnetCalculatorClient() {
  const [ip, setIp] = useState("192.168.1.1");
  const [cidr, setCidr] = useState("24");

  const results = useMemo(() => {
    try {
      const ipParts = ip.split(".").map(Number);
      if (ipParts.length !== 4 || ipParts.some((p) => isNaN(p) || p < 0 || p > 255)) {
        return null;
      }
      
      const cidrNum = parseInt(cidr, 10);
      const maskStr = "1".repeat(cidrNum) + "0".repeat(32 - cidrNum);
      const maskParts = [
        parseInt(maskStr.slice(0, 8), 2),
        parseInt(maskStr.slice(8, 16), 2),
        parseInt(maskStr.slice(16, 24), 2),
        parseInt(maskStr.slice(24, 32), 2),
      ];

      const netParts = ipParts.map((p, i) => p & maskParts[i]);
      const wildParts = maskParts.map((p) => 255 - p);
      const bcastParts = netParts.map((p, i) => p | wildParts[i]);
      
      const firstHost = [...netParts];
      firstHost[3] += 1;
      const lastHost = [...bcastParts];
      lastHost[3] -= 1;
      
      const numHosts = cidrNum >= 31 ? 0 : Math.pow(2, 32 - cidrNum) - 2;

      let ipClass = "A";
      if (ipParts[0] >= 128 && ipParts[0] <= 191) ipClass = "B";
      else if (ipParts[0] >= 192 && ipParts[0] <= 223) ipClass = "C";
      else if (ipParts[0] >= 224 && ipParts[0] <= 239) ipClass = "D";
      else if (ipParts[0] >= 240) ipClass = "E";

      return {
        network: netParts.join("."),
        broadcast: bcastParts.join("."),
        mask: maskParts.join("."),
        wildcard: wildParts.join("."),
        firstHost: numHosts > 0 ? firstHost.join(".") : "N/A",
        lastHost: numHosts > 0 ? lastHost.join(".") : "N/A",
        numHosts,
        ipClass,
        maskBinary: maskParts.map(p => p.toString(2).padStart(8, "0")).join(".")
      };
    } catch {
      return null;
    }
  }, [ip, cidr]);

  const cidrOptions = Array.from({ length: 23 }, (_, i) => 8 + i);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Network}
        title="Subnet Calculator"
        description="Calculate subnet details from an IP address and CIDR notation."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" /> Input
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ip">IP Address</Label>
              <Input
                id="ip"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="192.168.1.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cidr">CIDR (/)</Label>
              <Select value={cidr} onValueChange={setCidr}>
                <SelectTrigger id="cidr">
                  <SelectValue placeholder="Select CIDR" />
                </SelectTrigger>
                <SelectContent>
                  {cidrOptions.map((c) => (
                    <SelectItem key={c} value={c.toString()}>
                      /{c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TableIcon className="w-5 h-5" /> Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Network Address</p>
                  <p className="font-medium">{results.network}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Broadcast Address</p>
                  <p className="font-medium">{results.broadcast}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Subnet Mask</p>
                  <p className="font-medium">{results.mask}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wildcard Mask</p>
                  <p className="font-medium">{results.wildcard}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Usable Host Range</p>
                  <p className="font-medium">{results.firstHost} - {results.lastHost}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Usable Hosts</p>
                  <p className="font-medium">{results.numHosts.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">IP Class</p>
                  <p className="font-medium">{results.ipClass}</p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Invalid IP address.</p>
            )}
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <h3 className="text-sm text-muted-foreground flex items-center gap-1">
                <Hash className="w-4 h-4" /> Binary Mask Representation
              </h3>
              <div className="font-mono text-sm break-all p-2 bg-muted rounded-md">
                {results ? results.maskBinary : "N/A"}
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
