"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Globe, ExternalLink, AlertTriangle } from "lucide-react";

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Chile", "China",
  "Colombia", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia", "Ethiopia", "Fiji",
  "Finland", "France", "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Lebanon", "Malaysia",
  "Mexico", "Morocco", "Nepal", "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman",
  "Pakistan", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Saudi Arabia", "Senegal", "Serbia", "Singapore", "Slovakia", "Slovenia",
  "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Taiwan",
  "Tanzania", "Thailand", "Tunisia", "Turkey", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe",
].sort();

// Country → Timatic/IATA code for official lookups
const COUNTRY_CODES: Record<string, string> = {
  "United States": "US", "United Kingdom": "GB", "Canada": "CA", "Australia": "AU",
  "Germany": "DE", "France": "FR", "India": "IN", "China": "CN", "Japan": "JP",
  "Bangladesh": "BD", "Pakistan": "PK", "Indonesia": "ID", "Brazil": "BR",
  "Mexico": "MX", "Nigeria": "NG", "Russia": "RU", "South Africa": "ZA",
  "Egypt": "EG", "Turkey": "TR", "Saudi Arabia": "SA", "UAE": "AE",
  "United Arab Emirates": "AE", "Singapore": "SG", "Thailand": "TH",
  "Malaysia": "MY", "Philippines": "PH", "Vietnam": "VN", "South Korea": "KR",
};

const VISA_RESOURCES = [
  {
    name: "VisaHQ",
    url: (from: string, to: string) =>
      `https://www.visahq.com/citizens-of-${from.toLowerCase().replace(/ /g, "-")}/visa-to-${to.toLowerCase().replace(/ /g, "-")}`,
    description: "Comprehensive visa requirements database",
    icon: "🌐",
  },
  {
    name: "Sherpa° (by IATA)",
    url: (from: string, to: string) =>
      `https://apply.joinsherpa.com/travel-restrictions?lang=en-US`,
    description: "Official IATA-verified travel requirements",
    icon: "✈️",
  },
  {
    name: "Wikipedia Visa Policy",
    url: (_from: string, to: string) =>
      `https://en.wikipedia.org/wiki/Visa_policy_of_${to.replace(/ /g, "_")}`,
    description: "Detailed visa policy breakdown by country",
    icon: "📖",
  },
  {
    name: "Passport Index",
    url: (from: string, _to: string) =>
      `https://www.passportindex.org/passport/${COUNTRY_CODES[from] ?? from.toLowerCase().replace(/ /g, "-")}/`,
    description: "Passport strength and visa-free access ranking",
    icon: "🏅",
  },
];

export function VisaCheckClient() {
  const [passport, setPassport] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const canSearch = passport && destination && passport !== destination;

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Globe}
        title="Visa Requirements Checker"
        description="Find accurate, up-to-date visa requirements from official sources."
      />

      {/* Important disclaimer */}
      <div className="flex gap-3 p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-sm">
        <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <strong>Important:</strong> Visa requirements change frequently. Always verify directly with the official embassy or consulate of your destination country before travel. This tool links to trusted official sources.
        </div>
      </div>

      <GlassCard className="p-6 space-y-5">
        <CardHeader className="p-0">
          <CardTitle>Select Your Travel Details</CardTitle>
          <CardDescription>Choose your passport country and destination to find official visa information.</CardDescription>
        </CardHeader>

        <CardContent className="p-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Your Passport Country</label>
              <Select value={passport} onValueChange={setPassport}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select your passport…" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Destination Country</label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select destination…" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.filter(c => c !== passport).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {passport === destination && passport && (
            <div className="text-sm text-muted-foreground text-center p-3 border rounded-xl">
              You selected the same country for both passport and destination.
            </div>
          )}

          {canSearch && (
            <div className="space-y-3 pt-2">
              <p className="text-sm font-semibold text-foreground">
                Check visa requirements for <span className="text-primary">{passport}</span> passport holders traveling to <span className="text-primary">{destination}</span>:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VISA_RESOURCES.map((res) => (
                  <a
                    key={res.name}
                    href={res.url(passport, destination)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <span className="text-2xl shrink-0">{res.icon}</span>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm flex items-center gap-1">
                        {res.name}
                        <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{res.description}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </GlassCard>
    </div>
  );
}

export default VisaCheckClient;
