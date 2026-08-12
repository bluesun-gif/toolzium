"use client";

import React, { useState, useEffect, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ResetButton } from"@/components/shared/action-buttons";
import { Clock, CalendarDays, Calculator, Banknote } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";

type DayEntry = {
 day: string;
 start: string;
 end: string;
 breakMins: string;
};

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const defaultEntries: DayEntry[] = DAYS.map((day) => ({
 day,
 start:"",
 end:"",
 breakMins:"",
}));

export function TimesheetClient() {
 const [entries, setEntries] = useState<DayEntry[]>(defaultEntries);
 const [hourlyRate, setHourlyRate] = useState<string>("");

 useEffect(() => {
 const saved = localStorage.getItem("toolzium_timesheet");
 if (saved) {
 try {
 const parsed = JSON.parse(saved);
 if (parsed.entries) setEntries(parsed.entries);
 if (parsed.hourlyRate) setHourlyRate(parsed.hourlyRate);
 } catch (e) {}
 }
 }, []);

 useEffect(() => {
 localStorage.setItem("toolzium_timesheet", JSON.stringify({ entries, hourlyRate }));
 }, [entries, hourlyRate]);

 const updateEntry = (index: number, field: keyof DayEntry, value: string) => {
 const newEntries = [...entries];
 newEntries[index] = { ...newEntries[index], [field]: value };
 setEntries(newEntries);
 };

 const clearAll = () => {
 if (confirm("Are you sure you want to reset the timesheet?")) {
 setEntries(defaultEntries);
 setHourlyRate("");
 toast.success("Timesheet reset");
 }
 };

 const calcDailyHours = (entry: DayEntry) => {
 if (!entry.start || !entry.end) return 0;

 const [startH, startM] = entry.start.split(":").map(Number);
 const [endH, endM] = entry.end.split(":").map(Number);

 let startTotal = startH * 60 + startM;
 let endTotal = endH * 60 + endM;

 if (endTotal < startTotal) {
 endTotal += 24 * 60;
 }

 let diff = endTotal - startTotal;
 
 if (entry.breakMins) {
 diff -= Number(entry.breakMins);
 }

 return Math.max(0, diff / 60);
 };

 const totals = useMemo(() => {
 let totalHours = 0;
 const dailyHours = entries.map(calcDailyHours);
 totalHours = dailyHours.reduce((sum, h) => sum + h, 0);

 const regularHours = Math.min(40, totalHours);
 const overtimeHours = Math.max(0, totalHours - 40);

 const rate = Number(hourlyRate) || 0;
 const regularPay = regularHours * rate;
 const overtimePay = overtimeHours * rate * 1.5;
 const totalPay = regularPay + overtimePay;

 return { totalHours, regularHours, overtimeHours, totalPay, dailyHours };
 }, [entries, hourlyRate]);

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Clock}
 title="Timesheet Calculator"
 description="Calculate weekly work hours, track overtime, and estimate gross pay."
 actions={<ResetButton onClick={clearAll} label="Reset Timesheet"/>}
 />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <CalendarDays className="w-5 h-5 text-primary"/>
 Weekly Timesheet
 </CardTitle>
 <CardDescription>Enter your start and end times for each day.</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="overflow-x-auto">
 <table className="w-full min-w-[600px] text-sm text-left">
 <thead className="text-xs text-muted-foreground uppercase bg-muted/50 rounded-t-lg">
 <tr>
 <th className="px-4 py-3 rounded-tl-lg">Day</th>
 <th className="px-4 py-3">Start Time</th>
 <th className="px-4 py-3">End Time</th>
 <th className="px-4 py-3">Break (mins)</th>
 <th className="px-4 py-3 text-right rounded-tr-lg">Total Hours</th>
 </tr>
 </thead>
 <tbody>
 {entries.map((entry, idx) => (
 <tr key={entry.day} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
 <td className="px-4 py-3 font-medium">{entry.day}</td>
 <td className="px-4 py-3">
 <Input
 type="time"
 className="w-[130px] h-9"
 value={entry.start}
 onChange={(e) => updateEntry(idx,"start", e.target.value)}
 />
 </td>
 <td className="px-4 py-3">
 <Input
 type="time"
 className="w-[130px] h-9"
 value={entry.end}
 onChange={(e) => updateEntry(idx,"end", e.target.value)}
 />
 </td>
 <td className="px-4 py-3">
 <Input
 type="number"
 min="0"
 placeholder="0"
 className="w-[100px] h-9"
 value={entry.breakMins}
 onChange={(e) => updateEntry(idx,"breakMins", e.target.value)}
 />
 </td>
 <td className="px-4 py-3 text-right font-medium">
 {totals.dailyHours[idx] > 0 ? totals.dailyHours[idx].toFixed(2) +"h":"-"}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Calculator className="w-5 h-5 text-primary"/>
 Summary
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-4">
 <div className="flex justify-between items-center py-2 border-b">
 <span className="text-muted-foreground">Regular Hours</span>
 <span className="font-medium">{totals.regularHours.toFixed(2)}h</span>
 </div>
 <div className="flex justify-between items-center py-2 border-b">
 <span className="text-muted-foreground">Overtime Hours</span>
 <span className="font-medium text-amber-500">{totals.overtimeHours.toFixed(2)}h</span>
 </div>
 <div className="flex justify-between items-center py-2 bg-primary/10 rounded-lg px-3">
 <span className="font-bold">Total Hours</span>
 <span className="font-bold text-primary text-lg">{totals.totalHours.toFixed(2)}h</span>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Banknote className="w-5 h-5 text-primary"/>
 Pay Estimate
 </CardTitle>
 <CardDescription>Optional: Calculate gross pay</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <Label>Hourly Rate ($)</Label>
 <div className="relative">
 <span className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground">$</span>
 <Input
 type="number"
 min="0"
 placeholder="0.00"
 className="pl-9"
 value={hourlyRate}
 onChange={(e) => setHourlyRate(e.target.value)}
 />
 </div>
 </div>

 {Number(hourlyRate) > 0 && (
 <div className="space-y-2 pt-4 border-t">
 <div className="flex justify-between items-center text-sm">
 <span className="text-muted-foreground">Regular Pay</span>
 <span>${(totals.regularHours * Number(hourlyRate)).toFixed(2)}</span>
 </div>
 <div className="flex justify-between items-center text-sm">
 <span className="text-muted-foreground">Overtime Pay (1.5x)</span>
 <span>${(totals.overtimeHours * Number(hourlyRate) * 1.5).toFixed(2)}</span>
 </div>
 <div className="flex justify-between items-center pt-2 mt-2 border-t font-bold">
 <span>Estimated Gross</span>
 <span className="text-lg text-green-500">${totals.totalPay.toFixed(2)}</span>
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 </div>
 );
}
