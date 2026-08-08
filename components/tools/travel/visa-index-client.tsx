"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, ExternalLink, TrendingUp, Award } from "lucide-react";

const PASSPORT_RANKINGS = [
  { rank: 1, country: "Singapore", visaFree: 195, flag: "🇸🇬" },
  { rank: 2, country: "France", visaFree: 193, flag: "🇫🇷" },
  { rank: 2, country: "Germany", visaFree: 193, flag: "🇩🇪" },
  { rank: 2, country: "Italy", visaFree: 193, flag: "🇮🇹" },
  { rank: 2, country: "Japan", visaFree: 193, flag: "🇯🇵" },
  { rank: 2, country: "Spain", visaFree: 193, flag: "🇪🇸" },
  { rank: 7, country: "Austria", visaFree: 192, flag: "🇦🇹" },
  { rank: 7, country: "Finland", visaFree: 192, flag: "🇫🇮" },
  { rank: 7, country: "Ireland", visaFree: 192, flag: "🇮🇪" },
  { rank: 7, country: "Luxembourg", visaFree: 192, flag: "🇱🇺" },
  { rank: 7, country: "Netherlands", visaFree: 192, flag: "🇳🇱" },
  { rank: 7, country: "South Korea", visaFree: 192, flag: "🇰🇷" },
  { rank: 7, country: "Sweden", visaFree: 192, flag: "🇸🇪" },
  { rank: 14, country: "United Kingdom", visaFree: 191, flag: "🇬🇧" },
  { rank: 18, country: "United States", visaFree: 186, flag: "🇺🇸" },
  { rank: 25, country: "Canada", visaFree: 185, flag: "🇨🇦" },
  { rank: 42, country: "Malaysia", visaFree: 178, flag: "🇲🇾" },
  { rank: 52, country: "Brazil", visaFree: 172, flag: "🇧🇷" },
  { rank: 67, country: "China", visaFree: 158, flag: "🇨🇳" },
  { rank: 80, country: "Turkey", visaFree: 111, flag: "🇹🇷" },
  { rank: 88, country: "India", visaFree: 58, flag: "🇮🇳" },
  { rank: 95, country: "Bangladesh", visaFree: 41, flag: "🇧🇩" },
  { rank: 95, country: "Pakistan", visaFree: 33, flag: "🇵🇰" },
  { rank: 99, country: "Nigeria", visaFree: 28, flag: "🇳🇬" },
].sort((a, b) => a.rank - b.rank);

const COUNTRY_NAMES = PASSPORT_RANKINGS.map(p => p.country);

export function VisaIndexClient() {
  const [selectedCountry, setSelectedCountry] = useState("");

  const selectedData = PASSPORT_RANKINGS.find(p => p.country === selectedCountry);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Globe}
        title="Passport Power Index"
        description="See how powerful your passport is — visa-free access rankings based on the Henley Passport Index."
      />

      <GlassCard className="p-6 space-y-5">
        <CardHeader className="p-0">
          <CardTitle>Top Passport Rankings (2024)</CardTitle>
          <CardDescription>
            Data sourced from the{" "}
            <a href="https://www.henleypassportindex.com/" target="_blank" rel="noopener noreferrer"
              className="text-primary underline hover:opacity-80">
              Henley Passport Index
            </a>{" — "}updated quarterly.
          </CardDescription>
        </CardHeader>

        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">Look up your passport:</label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="h-11 max-w-sm">
              <SelectValue placeholder="Select your country…" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_NAMES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {selectedData && (
          <div className="p-5 rounded-xl border-2 border-primary/30 bg-primary/5 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedData.flag}</span>
              <div>
                <div className="text-xl font-bold text-foreground">{selectedData.country}</div>
                <div className="text-sm text-muted-foreground">Rank #{selectedData.rank} globally</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-primary font-bold text-lg pt-1">
              <TrendingUp className="h-5 w-5" />
              {selectedData.visaFree} visa-free / visa-on-arrival destinations
            </div>
            <a
              href={`https://www.passportindex.org/passport/${selectedData.country.toLowerCase().replace(/ /g, "-")}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
            >
              See full destination list <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        {/* Rankings table */}
        <div className="overflow-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-bold text-foreground w-16">Rank</th>
                <th className="px-4 py-3 text-left font-bold text-foreground">Country</th>
                <th className="px-4 py-3 text-right font-bold text-foreground">Visa-Free Access</th>
              </tr>
            </thead>
            <tbody>
              {PASSPORT_RANKINGS.map((p, i) => (
                <tr
                  key={i}
                  className={`border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer ${selectedCountry === p.country ? "bg-primary/5" : ""}`}
                  onClick={() => setSelectedCountry(p.country)}
                >
                  <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">#{p.rank}</td>
                  <td className="px-4 py-2.5">
                    <span className="mr-2">{p.flag}</span>
                    <span className="font-medium">{p.country}</span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <span className="font-bold text-primary">{p.visaFree}</span>
                    <span className="text-muted-foreground text-xs ml-1">countries</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted-foreground">
          ⚠️ Rankings are approximate and based on 2024 Henley Passport Index data. Actual visa-free access may vary. Always verify with official embassy sources before travel.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a href="https://www.henleypassportindex.com/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-medium">
            <Award className="h-4 w-4" /> Henley Passport Index (official)
          </a>
          <a href="https://www.passportindex.org/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-medium">
            <Globe className="h-4 w-4" /> Passport Index.org
          </a>
        </div>
      </GlassCard>
    </div>
  );
}

export default VisaIndexClient;
