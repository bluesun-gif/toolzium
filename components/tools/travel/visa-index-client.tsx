"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetButton } from "@/components/shared/action-buttons";
import { Globe, Search, Filter } from "lucide-react";

// Mock data for demonstration purposes
const countries = ["US", "UK", "Canada", "India", "Germany", "Japan", "Australia", "France", "Brazil"];
const visaData: Record<string, Record<string, { status: string, duration: string, requirements: string[] }>> = {
  "US": {
    "UK": { status: "Visa Free", duration: "6 months", requirements: ["Valid passport for duration of stay"] },
    "Canada": { status: "Visa Free", duration: "180 days", requirements: ["Valid passport", "Proof of funds"] },
    "India": { status: "eVisa Required", duration: "30-180 days", requirements: ["Passport valid for 6 months", "Return ticket"] },
    "Japan": { status: "Visa Free", duration: "90 days", requirements: ["Passport valid for duration of stay"] },
    "Brazil": { status: "eVisa Required", duration: "90 days", requirements: ["Valid passport", "Return ticket"] }
  },
  "India": {
    "US": { status: "Visa Required", duration: "Varies", requirements: ["B1/B2 Visa", "Interview required", "Proof of ties to home country"] },
    "UK": { status: "Visa Required", duration: "Varies", requirements: ["Standard Visitor Visa", "Proof of funds"] },
    "Japan": { status: "eVisa Required", duration: "90 days", requirements: ["Valid passport", "Proof of funds"] },
    "Brazil": { status: "Visa Required", duration: "Varies", requirements: ["Valid passport", "Return ticket", "Hotel booking"] }
  },
  "Germany": {
    "US": { status: "ESTA / Visa Free", duration: "90 days", requirements: ["ESTA approval", "Biometric passport"] },
    "UK": { status: "Visa Free", duration: "6 months", requirements: ["Valid passport"] },
    "Japan": { status: "Visa Free", duration: "90 days", requirements: ["Valid passport"] },
    "India": { status: "eVisa Required", duration: "30 days", requirements: ["Passport valid for 6 months"] }
  }
};

export function VisaIndexClient() {
  const [passport, setPassport] = useState("US");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const resetFilters = () => {
    setPassport("US");
    setDestinationFilter("");
    setStatusFilter("All");
  };

  const getResults = () => {
    const data = visaData[passport] || {};
    return Object.keys(data).filter(dest => {
      if (destinationFilter && !dest.toLowerCase().includes(destinationFilter.toLowerCase())) return false;
      if (statusFilter !== "All" && !data[dest].status.includes(statusFilter)) return false;
      return true;
    }).map(dest => ({
      destination: dest,
      ...data[dest]
    }));
  };

  const results = getResults();

  const getStatusColor = (status: string) => {
    if (status.includes("Visa Free")) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (status.includes("eVisa")) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    if (status.includes("Visa on Arrival")) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Globe}
        title="Travel Visa Requirements Index"
        description="Check visa requirements and travel restrictions based on your passport."
        actions={
          <>
            <ResetButton onClick={resetFilters} label="Reset" />
          </>
        }
      />

      <GlassCard>
        <CardHeader>
          <CardTitle>Check Requirements</CardTitle>
          <CardDescription>Select your passport country to see where you can travel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={"grid gap-4 md:grid-cols-3"}>
            <div className="space-y-2">
              <Label>My Passport</Label>
              <Select value={passport} onValueChange={setPassport}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Filter Destination</Label>
              <div className={"relative"}>
                <Search className={"absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"} />
                <Input className={"pl-8"} value={destinationFilter} onChange={e => setDestinationFilter(e.target.value)} placeholder="Search country..." />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status Filter</Label>
              <div className={"relative"}>
                <Filter className={"absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"} />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className={"pl-8"}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Visa Free">Visa Free</SelectItem>
                    <SelectItem value="eVisa">eVisa Required</SelectItem>
                    <SelectItem value="Visa Required">Visa Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </GlassCard>

      <div className="space-y-4">
        <h3 className={"text-lg font-semibold"}>Results for {passport} Passport</h3>
        
        {results.length > 0 ? (
          <div className={"grid gap-4 md:grid-cols-2"}>
            {results.map(res => (
              <GlassCard key={res.destination}>
                <CardContent className={"pt-6"}>
                  <div className={"flex justify-between items-start mb-4"}>
                    <h4 className={"text-xl font-bold"}>{res.destination}</h4>
                    <span className={"px-2 py-1 text-xs font-semibold rounded-full " + getStatusColor(res.status)}>
                      {res.status}
                    </span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong>Max Stay:</strong> {res.duration}
                    </div>
                    <div>
                      <strong>Key Requirements:</strong>
                      <ul className={"list-disc list-inside text-muted-foreground mt-1"}>
                        {res.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className={"p-8 text-center text-muted-foreground border rounded-lg bg-card"}>
            No destinations found matching your filters. Try adjusting your search criteria.
          </div>
        )}
        <div className={"text-xs text-muted-foreground text-center mt-8"}>
          Disclaimer: This is a simulated tool. Always verify visa requirements with official government sources before travel.
        </div>
      </div>
    </div>
  );
}
