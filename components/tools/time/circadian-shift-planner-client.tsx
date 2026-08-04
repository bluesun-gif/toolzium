"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Moon, Sun, Clock, Calendar } from "lucide-react";
import toast from "react-hot-toast";

export function CircadianShiftPlannerClient() {
  const [shiftType, setShiftType] = useState("night");
  const [normalSleep, setNormalSleep] = useState("23:00");
  const [shiftDate, setShiftDate] = useState("");

  const handleReset = () => {
    setShiftType("night");
    setNormalSleep("23:00");
    setShiftDate("");
    toast.success("Form reset");
  };

  const getSchedule = () => {
    if (shiftType === "night") {
      return {
        sleep: "8:00 AM - 4:00 PM",
        nap: "9:00 PM - 10:00 PM",
        caffeine: "Stop by 4:00 AM",
        dark: "6:00 AM - 8:00 AM (Wear dark sunglasses)",
        light: "11:00 PM - 3:00 AM (Bright workplace)"
      };
    } else if (shiftType === "evening") {
      return {
        sleep: "12:30 AM - 8:30 AM",
        nap: "Not strictly needed",
        caffeine: "Stop by 7:00 PM",
        dark: "11:30 PM - 12:30 AM",
        light: "9:00 AM - 12:00 PM"
      };
    } else {
      return {
        sleep: "Variable, anchor 4 hours at night if possible",
        nap: "Strategic 20-30 min naps during shift breaks",
        caffeine: "Stop 4-6 hours before intended sleep",
        dark: "2 hours before target sleep",
        light: "Immediately upon waking"
      };
    }
  };

  const schedule = getSchedule();

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Clock}
        title="Circadian Shift Planner"
        description="Calculate optimal sleep schedules and light exposure windows for night shift workers."
        actions={
          <>
            <ResetButton onClick={handleReset} label="Reset" />
          </>
        }
      />
      <div className={"grid gap-6 md:grid-cols-2"}>
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Shift Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Shift Type</Label>
                <Select value={shiftType} onValueChange={setShiftType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="night">Night Shift (11 PM - 7 AM)</SelectItem>
                    <SelectItem value="evening">Evening Shift (3 PM - 11 PM)</SelectItem>
                    <SelectItem value="rotating">Rotating Shift</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Normal Sleep Time</Label>
                <Input type="time" value={normalSleep} onChange={(e) => setNormalSleep(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Shift Start Date</Label>
                <Input type="date" value={shiftDate} onChange={(e) => setShiftDate(e.target.value)} />
              </div>
            </CardContent>
          </GlassCard>
        </div>
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Recommended Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-md"><Moon className="w-5 h-5 text-primary" /></div>
                <div>
                  <div className="font-semibold text-sm">Sleep Window</div>
                  <div className="text-muted-foreground">{schedule.sleep}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/10 p-2 rounded-md"><Clock className="w-5 h-5 text-blue-500" /></div>
                <div>
                  <div className="font-semibold text-sm">Strategic Nap</div>
                  <div className="text-muted-foreground">{schedule.nap}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-orange-500/10 p-2 rounded-md"><Clock className="w-5 h-5 text-orange-500" /></div>
                <div>
                  <div className="font-semibold text-sm">Caffeine Cutoff</div>
                  <div className="text-muted-foreground">{schedule.caffeine}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500/10 p-2 rounded-md"><Moon className="w-5 h-5 text-indigo-500" /></div>
                <div>
                  <div className="font-semibold text-sm">Melatonin / Dark Window</div>
                  <div className="text-muted-foreground">{schedule.dark}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500/10 p-2 rounded-md"><Sun className="w-5 h-5 text-yellow-500" /></div>
                <div>
                  <div className="font-semibold text-sm">Bright Light Window</div>
                  <div className="text-muted-foreground">{schedule.light}</div>
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
