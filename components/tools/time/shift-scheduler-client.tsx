"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Calendar, Users, AlertCircle, Plus, Trash2, Shield, BookOpen, Layers, CheckCircle2 } from"lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

type ShiftType = "Morning" | "Evening" | "Night" | "Off";

interface Employee {
  id: string;
  name: string;
  shifts: ShiftType[];
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SHIFT_HOURS = { Morning: 8, Evening: 8, Night: 8, Off: 0 };

const DEFAULT_EMPLOYEES: Employee[] = [
  { id: "e1", name: "Sarah Jenkins", shifts: ["Morning", "Morning", "Morning", "Morning", "Morning", "Off", "Off"] },
  { id: "e2", name: "Michael Chen", shifts: ["Evening", "Evening", "Evening", "Evening", "Evening", "Off", "Off"] },
  { id: "e3", name: "David Rodriguez", shifts: ["Night", "Night", "Night", "Night", "Off", "Off", "Off"] },
];

export function ShiftSchedulerClient() {
  const [employees, setEmployees] = useState<Employee[]>(DEFAULT_EMPLOYEES);
  const [newName, setNewName] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("shift-scheduler");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setEmployees(parsed);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("shift-scheduler", JSON.stringify(employees));
    }
  }, [employees]);

  const addEmployee = () => {
    if (!newName.trim()) {
      toast.error("Please enter employee name.");
      return;
    }
    setEmployees([
      ...employees,
      { id: Date.now().toString(), name: newName.trim(), shifts: Array(7).fill("Off") },
    ]);
    setNewName("");
    toast.success("Added employee to team roster!");
  };

  const removeEmployee = (id: string) => {
    setEmployees(employees.filter((e) => e.id !== id));
    toast.success("Removed employee.");
  };

  const updateShift = (empId: string, dayIdx: number, shift: ShiftType) => {
    setEmployees(
      employees.map((e) => {
        if (e.id === empId) {
          const newShifts = [...e.shifts];
          newShifts[dayIdx] = shift;
          return { ...e, shifts: newShifts };
        }
        return e;
      })
    );
  };

  const reset = () => {
    setEmployees(DEFAULT_EMPLOYEES);
    localStorage.removeItem("shift-scheduler");
    toast.success("Reset schedule roster to defaults!");
  };

  const getConflict = (shifts: ShiftType[], dayIdx: number) => {
    if (dayIdx > 0) {
      if (shifts[dayIdx - 1] === "Night" && shifts[dayIdx] === "Morning") return true;
    }
    return false;
  };

  const calculateHours = (shifts: ShiftType[]) => {
    return shifts.reduce((acc, val) => acc + SHIFT_HOURS[val as keyof typeof SHIFT_HOURS], 0);
  };

  const generateSummaryText = () => {
    let txt = "Weekly Team Shift Schedule\n\n";
    employees.forEach((e) => {
      txt += `${e.name} (${calculateHours(e.shifts)}h): `;
      txt += e.shifts.map((s, i) => `${DAYS[i]}: ${s}`).join(", ") + "\n";
    });
    return txt;
  };
  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern />

      <ToolPageHeader
        icon={Calendar}
        title="Employee Work Shift Scheduler"
        description="Schedule team shifts over a 7-day week, detect rest period conflicts (e.g. Night → Morning turnarounds), and calculate weekly hours."
        actions={
          <div className="flex gap-2">
            <CopyButton getText={generateSummaryText} label="Copy Schedule" />
            <ResetButton onClick={reset} label="Reset Roster" />
          </div>
        }
      />

      {/* ADD EMPLOYEE CARD */}
      <GlassCard>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5 text-primary" /> Add Staff / Team Member
          </CardTitle>
          <CardDescription>Add staff members to your weekly shift rotation table.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Sarah Jenkins..."
              onKeyDown={(e) => e.key === "Enter" && addEmployee()}
              className="h-11 font-medium text-foreground"
            />
            <Button onClick={addEmployee} className="h-11 px-6 font-bold gap-2 shrink-0">
              <Plus className="w-4 h-4" /> Add Member
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* SHIFT SCHEDULE TABLE */}
      <GlassCard>
        <CardHeader className="pb-3 border-b border-border/60">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="w-5 h-5 text-primary" /> Weekly Shift Rotation Matrix
          </CardTitle>
          <CardDescription>Assign shifts per day (Morning 8am-4pm, Evening 4pm-12am, Night 12am-8am, Off).</CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 overflow-x-auto">
          {employees.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground text-xs italic">
              No employees on team roster. Add staff members above!
            </div>
          ) : (
            <div className="min-w-[800px]">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/30 text-muted-foreground uppercase font-bold">
                    <th className="text-left py-3 px-4">Employee</th>
                    {DAYS.map((d) => (
                      <th key={d} className="py-3 px-2 text-center w-28">{d}</th>
                    ))}
                    <th className="py-3 px-4 text-center">Total Hours</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id} className="border-b border-border/40 hover:bg-muted/10 transition-colors">
                      <td className="py-3 px-4 font-bold text-foreground text-sm">{emp.name}</td>
                      {emp.shifts.map((shift, i) => {
                        const conflict = getConflict(emp.shifts, i);
                        return (
                          <td key={i} className="py-3 px-1">
                            <Select value={shift} onValueChange={(v) => updateShift(emp.id, i, v as ShiftType)}>
                              <SelectTrigger
                                className={cn(
                                  "h-8 text-xs font-semibold shadow-xs",
                                  conflict ? "border-destructive bg-destructive/10 text-destructive" : ""
                                )}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Morning">☀️ Morning</SelectItem>
                                <SelectItem value="Evening">🌆 Evening</SelectItem>
                                <SelectItem value="Night">🌙 Night</SelectItem>
                                <SelectItem value="Off">🏖️ Off</SelectItem>
                              </SelectContent>
                            </Select>
                            {conflict && (
                              <div className="text-[9px] font-bold text-destructive mt-1 flex items-center justify-center gap-0.5">
                                <AlertCircle className="w-3 h-3" /> Quick Turn
                              </div>
                            )}
                          </td>
                        );
                      })}
                      <td className="py-3 px-4 text-center font-black text-sm text-primary">
                        {calculateHours(emp.shifts)}h
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeEmployee(emp.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </GlassCard>

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Add Team Roster",
            description: "Input employee names to generate personalized 7-day schedule rows.",
            icon: Users,
          },
          {
            step: "02",
            title: "Assign Daily Shifts",
            description: "Select Morning, Evening, Night, or Off shifts for Monday through Sunday.",
            icon: Calendar,
          },
          {
            step: "03",
            title: "Detect Turnaround Conflicts",
            description: "Automatic alerts flag insufficient rest periods (Night shift followed directly by Morning shift).",
            icon: AlertCircle,
          },
        ]}
        badges={["Turnaround Conflict Alerts", "Automatic Total Hours", "100% Free"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Calendar,
            title: "7-Day Rotation Grid",
            description: "Clear tabular matrix displaying Morning (8h), Evening (8h), Night (8h), and Off status.",
          },
          {
            icon: AlertCircle,
            title: "Turnaround Fatigue Warning",
            description: "Automatically detects illegal or fatiguing shift turnarounds (Night → Morning).",
          },
          {
            icon: Shield,
            title: "Local Roster Storage",
            description: "Saves your team roster and shift schedule securely in your local browser.",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "How does the turnaround conflict warning work?",
            answer: "The scheduler flags red warnings whenever an employee is assigned a Night shift followed immediately by a Morning shift on the next day.",
          },
          {
            question: "Can I copy the schedule for team messaging?",
            answer: "Yes, click 'Copy Schedule' to export a clean text summary of all team members and their assigned daily shifts.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/time/shift-scheduler" max={6} />
    </div>
  );
}
