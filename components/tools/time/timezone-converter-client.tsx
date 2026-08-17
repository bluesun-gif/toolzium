"use client";

import React, { useState, useEffect, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Clock, Globe, Plus, Trash2, ArrowRightLeft, Sparkles, Shield } from "lucide-react";
import toast from "react-hot-toast";

const ZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Dhaka",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland"
];

export function TimezoneConverterClient() {
  const [sourceTz, setSourceTz] = useState("UTC");
  const [targetTzs, setTargetTzs] = useState<string[]>(["America/New_York", "Europe/London", "Asia/Tokyo"]);
  const [dateTimeStr, setDateTimeStr] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  });
  const [newZone, setNewZone] = useState("Asia/Singapore");

  const addZone = () => {
    if (targetTzs.includes(newZone)) {
      toast.error("Time zone already added.");
      return;
    }
    setTargetTzs([...targetTzs, newZone]);
    toast.success("Added target time zone!");
  };

  const removeZone = (z: string) => {
    setTargetTzs(targetTzs.filter(item => item !== z));
  };

  const convertedList = useMemo(() => {
    try {
      const d = new Date(dateTimeStr);
      if (isNaN(d.getTime())) return [];

      return targetTzs.map(tz => {
        const timeFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        });
        const dateFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric"
        });
        return {
          tz,
          time: timeFormatter.format(d),
          date: dateFormatter.format(d)
        };
      });
    } catch (e) {
      return [];
    }
  }, [dateTimeStr, targetTzs]);

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Globe}
          title="Time Zone Converter"
          description="Convert time and dates accurately across multiple worldwide time zones with automatic DST adjustments."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Source Config */}
          <div className="md:col-span-5">
            <GlassCard>
              <CardHeader>
                <CardTitle>Base Time & Zone</CardTitle>
                <CardDescription>Select source date, time, and reference timezone</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Date & Time</Label>
                  <Input
                    type="datetime-local"
                    value={dateTimeStr}
                    onChange={e => setDateTimeStr(e.target.value)}
                    className="font-mono text-base"
                  />
                </div>
                <div>
                  <Label>Source Time Zone</Label>
                  <Select value={sourceTz} onValueChange={setSourceTz}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ZONES.map(z => (
                        <SelectItem key={z} value={z}>{z.replace("_", " ")}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-2">
                  <Label>Add Comparison City</Label>
                  <div className="flex gap-2 mt-1">
                    <Select value={newZone} onValueChange={setNewZone}>
                      <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {ZONES.filter(z => !targetTzs.includes(z)).map(z => (
                          <SelectItem key={z} value={z}>{z.replace("_", " ")}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={addZone}>
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </GlassCard>
          </div>

          {/* Converted Outputs */}
          <div className="md:col-span-7">
            <GlassCard className="h-full">
              <CardHeader>
                <CardTitle>Converted Global Times ({convertedList.length})</CardTitle>
                <CardDescription>Real-time synchronized outputs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {convertedList.map(item => (
                  <div
                    key={item.tz}
                    className="p-4 rounded-xl border bg-background/60 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="font-bold text-base text-foreground">{item.tz.replace("_", " ")}</div>
                      <div className="text-xs text-muted-foreground">{item.date}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xl font-bold font-mono text-primary">{item.time}</div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeZone(item.tz)}
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </GlassCard>
          </div>
        </div>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Select Source Date/Time", description: "Set your origin timestamp and local time zone.", icon: Clock },
            { step: "02", title: "Add Target Cities", description: "Choose any major global cities to compare simultaneously.", icon: Globe },
            { step: "03", title: "View Converted Clocks", description: "Output instantly shows localized date, AM/PM time, and daylight saving offsets.", icon: Sparkles }
          ]}
          badges={["100% Free Forever", "Automatic DST Updates", "Official IANA Database"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Globe, title: "Universal IANA Coverage", description: "Supports all standard international time zones with verified offsets." },
            { icon: Clock, title: "Daylight Saving Accurate", description: "Calculates historic and seasonal DST changes without manual math." },
            { icon: ArrowRightLeft, title: "Multi-Zone Comparison", description: "Compare several hubs side-by-side for seamless remote team scheduling." },
            { icon: Shield, title: "100% Local Engine", description: "Calculations run natively inside your browser with zero latency." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Coordinating Across Worldwide Time Horizons</h3>
            <p>
              Navigating global time offsets is crucial for international businesses, remote squads, and frequent flyers. Due to seasonal Daylight Saving Time adjustments occurring on different dates across hemispheres, manual calculations frequently lead to costly errors.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "How does the converter handle Daylight Saving Time?", answer: "The converter utilizes the browser's built-in Intl.DateTimeFormat API with up-to-date IANA timezone data to automatically calculate DST offsets." },
            { question: "Is there a limit on how many time zones I can add?", answer: "No limit. You can add as many global locations as needed." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/time/timezone-converter" max={6} />
      </div>
    </div>
  );
}

export default TimezoneConverterClient;
