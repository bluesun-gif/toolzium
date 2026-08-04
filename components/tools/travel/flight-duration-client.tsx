"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plane, Clock, Globe, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const timezones = [
  { label: "UTC (London, Lisbon)", value: 0 },
  { label: "UTC+1 (Paris, Berlin, Rome)", value: 1 },
  { label: "UTC+2 (Athens, Cairo)", value: 2 },
  { label: "UTC+3 (Moscow, Istanbul)", value: 3 },
  { label: "UTC+4 (Dubai)", value: 4 },
  { label: "UTC+5:30 (New Delhi)", value: 5.5 },
  { label: "UTC+7 (Bangkok, Jakarta)", value: 7 },
  { label: "UTC+8 (Singapore, Beijing)", value: 8 },
  { label: "UTC+9 (Tokyo, Seoul)", value: 9 },
  { label: "UTC+10 (Sydney)", value: 10 },
  { label: "UTC+12 (Auckland)", value: 12 },
  { label: "UTC-5 (New York, Toronto)", value: -5 },
  { label: "UTC-6 (Chicago, Mexico City)", value: -6 },
  { label: "UTC-7 (Denver)", value: -7 },
  { label: "UTC-8 (Los Angeles, Vancouver)", value: -8 },
  { label: "UTC-9 (Anchorage)", value: -9 },
  { label: "UTC-10 (Honolulu)", value: -10 }
];

export function FlightDurationClient() {
  const [depDate, setDepDate] = useState("");
  const [depTime, setDepTime] = useState("");
  const [depTz, setDepTz] = useState("0");
  
  const [arrDate, setArrDate] = useState("");
  const [arrTime, setArrTime] = useState("");
  const [arrTz, setArrTz] = useState("0");

  const reset = () => {
    setDepDate(""); setDepTime(""); setDepTz("0");
    setArrDate(""); setArrTime(""); setArrTz("0");
    toast.success("Reset successfully");
  };

  const calculate = () => {
    if (!depDate || !depTime || !arrDate || !arrTime) return null;
    try {
      // Calculate times in UTC
      const depDateObj = new Date(depDate + "T" + depTime);
      const arrDateObj = new Date(arrDate + "T" + arrTime);
      
      const depOffsetMs = parseFloat(depTz) * 60 * 60 * 1000;
      const arrOffsetMs = parseFloat(arrTz) * 60 * 60 * 1000;

      const depUtc = depDateObj.getTime() - depOffsetMs;
      const arrUtc = arrDateObj.getTime() - arrOffsetMs;

      const diffMs = arrUtc - depUtc;
      if (diffMs < 0) return null; // Invalid

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const tzDiff = parseFloat(arrTz) - parseFloat(depTz);

      return { hours, minutes, tzDiff };
    } catch {
      return null;
    }
  };

  const res = calculate();
  
  const generateSummary = () => {
    if (!res) return "No valid calculation yet.";
    return "Flight Duration: " + res.hours + "h " + res.minutes + "m\nTime Zone Diff: " + (res.tzDiff > 0 ? "+" : "") + res.tzDiff + " hours.";
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Plane}
        title="Flight Duration Calculator"
        description="Calculate actual flight duration accounting for time zone shifts."
        actions={
          <>
            <CopyButton getText={generateSummary} label="Copy Summary" />
            <ResetButton onClick={reset} label="Reset" />
          </>
        }
      />

      <div className={"grid gap-6 md:grid-cols-2"}>
        <GlassCard>
          <CardHeader>
            <CardTitle>Departure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>Date</Label>
              <Input type="date" value={depDate} onChange={(e) => setDepDate(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Time (Local)</Label>
              <Input type="time" value={depTime} onChange={(e) => setDepTime(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Time Zone</Label>
              <Select value={depTz} onValueChange={setDepTz}>
                <SelectTrigger><SelectValue placeholder="Select Time Zone" /></SelectTrigger>
                <SelectContent>
                  {timezones.map(tz => (
                    <SelectItem key={tz.value} value={tz.value.toString()}>{tz.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Arrival</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>Date</Label>
              <Input type="date" value={arrDate} onChange={(e) => setArrDate(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Time (Local)</Label>
              <Input type="time" value={arrTime} onChange={(e) => setArrTime(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Time Zone</Label>
              <Select value={arrTz} onValueChange={setArrTz}>
                <SelectTrigger><SelectValue placeholder="Select Time Zone" /></SelectTrigger>
                <SelectContent>
                  {timezones.map(tz => (
                    <SelectItem key={tz.value} value={tz.value.toString()}>{tz.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </GlassCard>

        <div className="md:col-span-2">
          <GlassCard>
            <CardHeader>
              <CardTitle>Flight Details</CardTitle>
            </CardHeader>
            <CardContent>
              {res ? (
                <div className="space-y-4 text-center">
                  <div className="text-4xl font-bold flex justify-center items-center gap-2">
                    <Clock className="h-8 w-8 text-blue-500" />
                    {res.hours}h {res.minutes}m
                  </div>
                  <p className="text-muted-foreground">Actual Flight Duration</p>
                  <Separator />
                  <div className="flex justify-around items-center pt-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Time Zone Diff</p>
                      <p className="text-lg font-semibold">{res.tzDiff > 0 ? "+" : ""}{res.tzDiff} hrs</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Jet Lag Rating</p>
                      <p className="text-lg font-semibold text-orange-500">
                        {Math.abs(res.tzDiff) > 6 ? "Severe" : Math.abs(res.tzDiff) > 3 ? "Moderate" : "Mild"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Enter complete departure and arrival details to see duration.
                </div>
              )}
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
