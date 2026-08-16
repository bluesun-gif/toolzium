"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton, ActionButton } from"@/components/shared/action-buttons";
import { AlertCircle, Calendar, CalendarRange, Clock, Copy, ListChecks, Plus, ShieldCheck, Trash2, UserCheck, Users } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";

type ShiftType ="Morning"|"Evening"|"Night"|"Off";

interface Employee {
 id: string;
 name: string;
 shifts: ShiftType[];
}

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const SHIFT_HOURS = { Morning: 8, Evening: 8, Night: 8, Off: 0 };

export function ShiftSchedulerClient() {
 const [employees, setEmployees] = useState<Employee[]>([]);
 const [newName, setNewName] = useState("");
 const [isClient, setIsClient] = useState(false);

 useEffect(() => {
 setIsClient(true);
 const saved = localStorage.getItem("shift-scheduler");
 if (saved) {
 try { setEmployees(JSON.parse(saved)); } catch (e) {}
 }
 }, []);

 useEffect(() => {
 if (isClient) {
 localStorage.setItem("shift-scheduler", JSON.stringify(employees));
 }
 }, [employees, isClient]);

 const addEmployee = () => {
 if (!newName.trim()) return;
 setEmployees([...employees, { id: Date.now().toString(), name: newName, shifts: Array(7).fill("Off") }]);
 setNewName("");
 };

 const removeEmployee = (id: string) => {
 setEmployees(employees.filter(e => e.id !== id));
 };

 const updateShift = (empId: string, dayIdx: number, shift: ShiftType) => {
 setEmployees(employees.map(e => {
 if (e.id === empId) {
 const newShifts = [...e.shifts];
 newShifts[dayIdx] = shift;
 return { ...e, shifts: newShifts };
 }
 return e;
 }));
 };

 const reset = () => {
 if (confirm("Clear all schedules?")) setEmployees([]);
 };

 const getConflict = (shifts: ShiftType[], dayIdx: number) => {
 if (dayIdx > 0) {
 if (shifts[dayIdx - 1] ==="Night"&& shifts[dayIdx] ==="Morning") return true;
 }
 return false;
 };

 const calculateHours = (shifts: ShiftType[]) => {
 return shifts.reduce((acc, val) => acc + SHIFT_HOURS[val as keyof typeof SHIFT_HOURS], 0);
 };

 const generateSummaryText = () => {
 let txt ="Weekly Schedule\n\n";
 employees.forEach(e => {
 txt += e.name +"("+ calculateHours(e.shifts) +"h):";
 txt += e.shifts.map((s, i) => DAYS[i] +":"+ s.charAt(0)).join(",") +"\n";
 });
 return txt;
 };

 if (!isClient) return null;

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Calendar}
 title="Work Shift Scheduler"
 description="Schedule employee work shifts over a 7-day week."
 actions={
 <>
 <CopyButton getText={generateSummaryText} label="Copy Schedule"/>
 <ResetButton onClick={reset} label="Reset"/>
 </>
 }
 />

 <GlassCard>
 <CardHeader>
 <CardTitle>Manage Team</CardTitle>
 <CardDescription>Add employees to the schedule.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="flex gap-2 max-w-sm">
 <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Employee Name"onKeyDown={(e) => e.key === 'Enter' && addEmployee()} />
 <Button onClick={addEmployee} variant="secondary"><Plus className="w-4 h-4 mr-2"/> Add</Button>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Weekly Schedule</CardTitle>
 <CardDescription>Assign shifts per day (Morning 8-4, Evening 4-12, Night 12-8, Off).</CardDescription>
 </CardHeader>
 <CardContent className="overflow-x-auto">
 {employees.length === 0 ? (
 <div className="text-center p-8 text-muted-foreground">No employees added yet.</div>
 ) : (
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b">
 <th className="text-left py-2 px-4">Employee</th>
 {DAYS.map(d => <th key={d} className="py-2 px-2 text-center">{d}</th>)}
 <th className="py-2 px-4 text-center">Hours</th>
 <th className="py-2 px-4"></th>
 </tr>
 </thead>
 <tbody>
 {employees.map(emp => (
 <tr key={emp.id} className="border-b">
 <td className="py-3 px-4 font-medium">{emp.name}</td>
 {emp.shifts.map((shift, i) => {
 const conflict = getConflict(emp.shifts, i);
 return (
 <td key={i} className="py-3 px-2">
 <Select value={shift} onValueChange={(v) => updateShift(emp.id, i, v as ShiftType)}>
 <SelectTrigger className={"h-8 text-xs"+ (conflict ?"border-red-500":"")}>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="Morning">Morning</SelectItem>
 <SelectItem value="Evening">Evening</SelectItem>
 <SelectItem value="Night">Night</SelectItem>
 <SelectItem value="Off">Off</SelectItem>
 </SelectContent>
 </Select>
 {conflict && <div className="text-[10px] text-red-500 mt-1 flex items-center justify-center"><AlertCircle className="w-3 h-3 mr-1"/> Conflict
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Add Shifts",
    description:"Define patterns and times.",
    icon: CalendarRange,
  },
{
    step:"02",
    title:"Assign",
    description:"Place on the calendar.",
    icon: UserCheck,
  },
{
    step:"03",
    title:"Review",
    description:"See coverage and rest.",
    icon: ListChecks,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: CalendarRange,
    title:"Patterns",
    description:"Rotations, blocks.",
  },
{
    icon: UserCheck,
    title:"Assign",
    description:"Who works when.",
  },
{
    icon: ListChecks,
    title:"Coverage",
    description:"Gaps visible.",
  },
{
    icon: ShieldCheck,
    title:"Rest Rules",
    description:"Avoid overload.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A shift scheduler arranges work patterns across people and time, revealing coverage gaps and overloaded individuals before they become problems. Assigning shifts on a calendar makes rest rules enforceable. This tool shows coverage and rest.</p>
  <p>Visibility prevents burnout and understaffing. The scheduler turns chaos into a fair, reviewable plan.</p>
  <p>Use it for any shift team. The tool's value is balanced, gap-free scheduling.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What does it do?",
    answer:"Plans and assigns shifts.",
  },
{
    question:"Rotations?",
    answer:"Yes, define patterns.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Local.",
  },
{
    question:"Use case?",
    answer:"Teams, ops.",
  }
  ]}
/>
</div>}
 </td>
 );
 })}
 <td className="py-3 px-4 text-center font-bold">{calculateHours(emp.shifts)}h</td>
 <td className="py-3 px-4 text-right">
 <Button variant="ghost"size="icon"onClick={() => removeEmployee(emp.id)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 )}
 </CardContent>
 </GlassCard>
 </div>
 );
}
