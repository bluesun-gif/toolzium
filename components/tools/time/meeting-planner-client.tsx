"use client";

import React, { useState, useEffect } from "react";
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
import { Users, Clock, Globe, Plus, Trash2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Participant {
  id: string;
  name: string;
  timezone: string;
}

const COMMON_TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Asia/Dubai",
  "Australia/Sydney",
  "Pacific/Auckland"
];

export function MeetingPlannerClient() {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", name: "You (Host)", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York" },
    { id: "2", name: "London Office", timezone: "Europe/London" },
    { id: "3", name: "Tokyo Team", timezone: "Asia/Tokyo" }
  ]);
  const [newName, setNewName] = useState("");
  const [newTz, setNewTz] = useState("America/New_York");
  const [baseDate] = useState(new Date());

  const addParticipant = () => {
    if (!newName.trim()) {
      toast.error("Please enter participant name.");
      return;
    }
    setParticipants([
      ...participants,
      { id: Date.now().toString(), name: newName.trim(), timezone: newTz }
    ]);
    setNewName("");
    toast.success("Added participant!");
  };

  const removeParticipant = (id: string) => {
    if (participants.length <= 1) {
      toast.error("Must have at least one participant.");
      return;
    }
    setParticipants(participants.filter(p => p.id !== id));
  };

  const getHourInTz = (utcHour: number, tz: string) => {
    const d = new Date(baseDate);
    d.setUTCHours(utcHour, 0, 0, 0);
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "numeric",
      hour12: true
    });
    const hour24Formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "numeric",
      hour12: false
    });
    const hourNum = parseInt(hour24Formatter.format(d), 10);
    const isWorkingHours = hourNum >= 9 && hourNum < 18;
    return {
      hour: formatter.format(d),
      isWorkingHours
    };
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Users}
          title="World Meeting Planner"
          description="Find the perfect overlapping meeting time across multiple global time zones with green working-hour highlights."
        />

        {/* Add Participant */}
        <GlassCard>
          <CardHeader>
            <CardTitle>Add Team Member or Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Name / Location</Label>
                <Input
                  placeholder="e.g. Sarah (Design Lead)"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                />
              </div>
              <div>
                <Label>Time Zone</Label>
                <Select value={newTz} onValueChange={setNewTz}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {COMMON_TIMEZONES.map(tz => (
                      <SelectItem key={tz} value={tz}>{tz.replace("_", " ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={addParticipant} className="w-full">
                  <Plus className="w-4 h-4 mr-2" /> Add Participant
                </Button>
              </div>
            </div>
          </CardContent>
        </GlassCard>

        {/* Timeline Matrix */}
        <GlassCard>
          <CardHeader>
            <CardTitle>Global 24-Hour Overlap Grid</CardTitle>
            <CardDescription>
              Green slots indicate normal business hours (9:00 AM – 6:00 PM) for each participant.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="min-w-[900px]">
              <table className="w-full border-collapse text-xs text-center">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-2 text-left border-b w-44">Participant</th>
                    {hours.map(h => (
                      <th key={h} className="p-1 border-b border-l font-mono text-[10px]">
                        {h}:00 UTC
                      </th>
                    ))}
                    <th className="p-2 border-b w-12">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map(p => (
                    <tr key={p.id} className="hover:bg-muted/20">
                      <td className="p-2 text-left font-semibold border-b">
                        <div className="truncate max-w-[160px]">{p.name}</div>
                        <div className="text-[10px] text-muted-foreground font-normal">{p.timezone}</div>
                      </td>
                      {hours.map(h => {
                        const { hour, isWorkingHours } = getHourInTz(h, p.timezone);
                        return (
                          <td key={h} className="p-1 border-b border-l">
                            <div
                              className={cn(
                                "h-8 rounded flex items-center justify-center font-medium",
                                isWorkingHours
                                  ? "bg-green-500/20 text-green-700 dark:text-green-400 font-bold"
                                  : "bg-muted/30 text-muted-foreground/50"
                              )}
                            >
                              {hour}
                            </div>
                          </td>
                        );
                      })}
                      <td className="p-2 border-b text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeParticipant(p.id)}
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </GlassCard>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Add Locations", description: "Enter all participants along with their respective local time zones.", icon: Users },
            { step: "02", title: "Identify Overlaps", description: "Scan the 24-hour grid for columns where all rows show green working hours.", icon: Globe },
            { step: "03", title: "Schedule Event", description: "Select the optimal UTC hour that accommodates everyone fairly.", icon: Calendar }
          ]}
          badges={["100% Free Forever", "Automatic DST Handling", "Zero Latency Browser Engine"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Globe, title: "Worldwide Time Zones", description: "Supports standard IANA time zones with automatic daylight saving calculations." },
            { icon: Users, title: "Multi-Person Matrix", description: "Add as many team members or regional offices as needed to compare schedules." },
            { icon: Clock, title: "Working Hour Highlights", description: "Automatically colors business hours (9 AM – 6 PM) green for rapid scanning." },
            { icon: Calendar, title: "UTC Normalized Axis", description: "Universal 24-hour UTC reference line ensures precise coordinate matching." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Coordinating Distributed Teams Across Global Boundaries</h3>
            <p>
              In modern distributed organizations, coordinating real-time meetings across San Francisco, London, Tokyo, and Sydney is a daily operational challenge. Converting time differences manually often leads to missed calls, scheduling conflicts, or requiring participants to join during inconvenient sleeping hours.
            </p>
            <p>
              The Toolzium World Meeting Planner normalizes time zones onto a synchronous 24-hour UTC timeline. By visually illuminating the working hours of each participant, organizers can immediately locate fair overlapping windows or balance rotational meeting slots across sprints.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "How does the tool handle Daylight Saving Time (DST)?", answer: "The tool uses the browser's native Intl.DateTimeFormat API with official IANA time zone rules, automatically adjusting for seasonal daylight saving shifts." },
            { question: "Is there a limit on how many participants I can add?", answer: "No limit. You can add as many team members and international hubs as your project requires." },
            { question: "Is my meeting data private?", answer: "Yes! All time calculations execute entirely inside your local web browser. No participant names or locations are sent to external servers." }
          ]}
        />
    </div>
    </div>
  );
}

export default MeetingPlannerClient;
