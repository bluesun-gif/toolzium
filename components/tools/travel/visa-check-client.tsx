"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Check, Send, Info, AlertTriangle } from "lucide-react";

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Chile", "China",
  "Colombia", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Georgia",
  "Germany", "Ghana", "Greece", "Guatemala", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
  "Kuwait", "Lebanon", "Malaysia", "Mexico", "Morocco", "Nepal", "Netherlands", "New Zealand", "Nigeria",
  "Norway", "Oman", "Pakistan", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Saudi Arabia", "Senegal", "Serbia", "Singapore", "Slovakia", "Slovenia",
  "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Taiwan", "Tanzania",
  "Thailand", "Tunisia", "Turkey", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
  "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
].sort();

const VISA_STATUSES = ["Visa Free", "Visa on Arrival", "eVisa", "Visa Required"];
const DURATIONS = ["14 days", "30 days", "90 days", "180 days"];

// Simple hash function to generate consistent mock data based on two strings
const getMockVisaInfo = (passport: string, destination: string) => {
  if (passport === destination) {
    return { status: "Same Country", duration: "Unlimited", color: "text-green-500" };
  }
  
  const hash = (passport + destination).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const statusIndex = hash % VISA_STATUSES.length;
  const status = VISA_STATUSES[statusIndex];
  const duration = DURATIONS[(hash + 1) % DURATIONS.length];
  
  let color = "text-red-500";
  if (status === "Visa Free") color = "text-green-500";
  if (status === "Visa on Arrival" || status === "eVisa") color = "text-yellow-500";
  
  return { status, duration: status === "Visa Required" ? "N/A" : duration, color };
};

export function VisaCheckClient() {
  const [passport, setPassport] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const visaInfo = (passport && destination) ? getMockVisaInfo(passport, destination) : null;

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Globe}
        title="Visa Requirements Checker"
        description="Check visa requirements between countries."
        actions={<></>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Travel Details</CardTitle>
            <CardDescription>Select your passport and destination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Passport Country</label>
              <Select value={passport} onValueChange={setPassport}>
                <SelectTrigger>
                  <SelectValue placeholder="Select passport" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination Country</label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Visa Status</CardTitle>
            <CardDescription>Requirement for this route</CardDescription>
          </CardHeader>
          <CardContent>
            {!visaInfo ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-8">
                <Send className="w-12 h-12 mb-4 opacity-20" />
                <p>Select both countries to view visa requirements.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in">
                <div className="text-center p-6 bg-muted/50 rounded-lg">
                  <h3 className={"text-3xl font-bold mb-2 " + (visaInfo.color)}>
                    {visaInfo.status}
                  </h3>
                  {visaInfo.status !== "Same Country" && visaInfo.status !== "Visa Required" && (
                    <p className="text-muted-foreground flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" /> Max stay: {visaInfo.duration}
                    </p>
                  )}
                </div>
                
                <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 p-4 rounded-lg flex gap-3 text-sm">
                  <Info className="w-5 h-5 shrink-0" />
                  <p>Remember that your passport must generally be valid for at least 6 months beyond your planned date of departure from the destination.</p>
                </div>
              </div>
            )}
          </CardContent>
        </GlassCard>
      </div>

      <GlassCard className="bg-yellow-500/10 border-yellow-500/20">
        <CardContent className="p-4 flex gap-3 text-yellow-700 dark:text-yellow-500 text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <div>
            <strong>Disclaimer:</strong> This tool uses a simplified model for demonstration purposes. Visa requirements change frequently and depend on many factors (transit, purpose of visit, recent travel history). <strong>Always verify requirements with the official embassy or consulate before booking travel.</strong>
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
