"use client";

import React, { useState, useEffect, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Receipt, DollarSign, PieChart, Trash2, Plus } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";

type Expense = {
 id: string;
 amount: number;
 description: string;
 category: string;
 date: string;
};

const CATEGORIES = ["Food","Transport","Entertainment","Bills","Shopping","Other"];

export function ExpenseTrackerClient() {
 const [expenses, setExpenses] = useState<Expense[]>([]);
 const [amount, setAmount] = useState("");
 const [description, setDescription] = useState("");
 const [category, setCategory] = useState("Food");
 const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);

 useEffect(() => {
 const saved = localStorage.getItem("toolzium_expenses");
 if (saved) {
 try {
 setExpenses(JSON.parse(saved));
 } catch (e) {}
 }
 }, []);

 useEffect(() => {
 localStorage.setItem("toolzium_expenses", JSON.stringify(expenses));
 }, [expenses]);

 const addExpense = () => {
 if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
 toast.error("Please enter a valid amount");
 return;
 }
 if (!description.trim()) {
 toast.error("Please enter a description");
 return;
 }
 if (!date) {
 toast.error("Please select a date");
 return;
 }

 const newExpense: Expense = {
 id: crypto.randomUUID(),
 amount: Number(amount),
 description: description.trim(),
 category,
 date,
 };

 setExpenses((prev) => [...prev, newExpense]);
 setAmount("");
 setDescription("");
 toast.success("Expense added");
 };

 const deleteExpense = (id: string) => {
 setExpenses((prev) => prev.filter((e) => e.id !== id));
 toast.success("Expense deleted");
 };

 const clearAll = () => {
 if (confirm("Are you sure you want to clear all expenses?")) {
 setExpenses([]);
 toast.success("All expenses cleared");
 }
 };

 const total = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);

 const categoryTotals = useMemo(() => {
 const totals: Record<string, number> = {};
 CATEGORIES.forEach((c) => (totals[c] = 0));
 expenses.forEach((e) => {
 if (totals[e.category] !== undefined) {
 totals[e.category] += e.amount;
 } else {
 totals["Other"] = (totals["Other"] || 0) + e.amount;
 }
 });
 return totals;
 }, [expenses]);

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Receipt}
 title="Expense Tracker"
 description="Track your daily expenses, categorize spending, and view monthly summaries."
 actions={<ResetButton onClick={clearAll} label="Clear Data"/>}
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Plus className="w-5 h-5 text-primary"/>
 Add Expense
 </CardTitle>
 <CardDescription>Enter details of your new expense.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Amount ($)</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
 <Input
 type="number"
 placeholder="0.00"
 className="pl-9"
 value={amount}
 onChange={(e) => setAmount(e.target.value)}
 />
 </div>
 </div>
 
 <div className="space-y-2">
 <Label>Description</Label>
 <Input
 placeholder="e.g. Lunch at Cafe"
 value={description}
 onChange={(e) => setDescription(e.target.value)}
 />
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Category</Label>
 <Select value={category} onValueChange={setCategory}>
 <SelectTrigger>
 <SelectValue placeholder="Select category"/>
 </SelectTrigger>
 <SelectContent>
 {CATEGORIES.map((cat) => (
 <SelectItem key={cat} value={cat}>
 {cat}
 </SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Date</Label>
 <Input
 type="date"
 value={date}
 onChange={(e) => setDate(e.target.value)}
 />
 </div>
 </div>

 <Button onClick={addExpense} className="w-full mt-2">
 Add Expense
 </Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <PieChart className="w-5 h-5 text-primary"/>
 Summary
 </CardTitle>
 <CardDescription>Overview of your spending by category.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="text-center p-4 bg-muted/50 rounded-lg">
 <div className="text-sm text-muted-foreground mb-1">Total Spending</div>
 <div className="text-4xl font-bold text-primary">${total.toFixed(2)}</div>
 </div>
 
 <div className="space-y-3">
 <h4 className="font-medium text-sm">Category Breakdown</h4>
 {CATEGORIES.map((cat) => {
 const catTotal = categoryTotals[cat] || 0;
 const percentage = total > 0 ? (catTotal / total) * 100 : 0;
 
 return (
 <div key={cat} className="space-y-1">
 <div className="flex justify-between text-sm">
 <span>{cat}</span>
 <span className="font-medium">${catTotal.toFixed(2)}</span>
 </div>
 <div className="h-2 bg-muted rounded-full overflow-hidden">
 <div 
 className="h-full bg-primary/80 transition-all"
 style={{ width: `${percentage}%` }}
 />
 </div>
 </div>
 );
 })}
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle>Recent Expenses</CardTitle>
 <CardDescription>Your complete expense history.</CardDescription>
 </CardHeader>
 <CardContent>
 {expenses.length === 0 ? (
 <div className="text-center p-8 text-muted-foreground border border-dashed rounded-lg">
 No expenses recorded yet.
 </div>
 ) : (
 <div className="space-y-4">
 {[...expenses]
 .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
 .map((exp) => (
 <div key={exp.id} className="flex items-center justify-between p-3 border rounded-lg bg-card/50 hover:bg-muted/50 transition-colors">
 <div className="flex flex-col">
 <span className="font-medium">{exp.description}</span>
 <span className="text-xs text-muted-foreground flex gap-2">
 <span>{exp.date}</span>
 <span>•</span>
 <span>{exp.category}</span>
 </span>
 </div>
 <div className="flex items-center gap-4">
 <span className="font-bold">${exp.amount.toFixed(2)}</span>
 <Button variant="ghost"size="icon"onClick={() => deleteExpense(exp.id)} className="text-destructive h-8 w-8 hover:bg-destructive/10 hover:text-destructive">
 <Trash2 className="w-4 h-4"/>
 </Button>
 </div>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 );
}
