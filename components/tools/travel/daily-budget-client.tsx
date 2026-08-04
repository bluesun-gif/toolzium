"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Wallet, Calendar, DollarSign, Download, Plus, Trash } from "lucide-react";
import toast from "react-hot-toast";

type Expense = {
  id: string;
  day: number;
  category: string;
  amount: number;
  desc: string;
};

const CATEGORIES = ["Accommodation", "Food & Drinks", "Activities & Tours", "Transportation", "Shopping", "Emergency/Misc"];

export function DailyBudgetClient() {
  const [totalBudget, setTotalBudget] = useState(1000);
  const [tripDays, setTripDays] = useState(7);
  const [currency, setCurrency] = useState("$");
  
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  const [newExpDay, setNewExpDay] = useState(1);
  const [newExpCat, setNewExpCat] = useState(CATEGORIES[0]);
  const [newExpAmount, setNewExpAmount] = useState("");
  const [newExpDesc, setNewExpDesc] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("travel_budget_data");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setTotalBudget(data.totalBudget);
        setTripDays(data.tripDays);
        setCurrency(data.currency);
        setAllocations(data.allocations || {});
        setExpenses(data.expenses || []);
      } catch (e) {}
    } else {
      // Default alloc
      const defAlloc: Record<string, number> = {};
      CATEGORIES.forEach(c => defAlloc[c] = Math.floor(1000 / CATEGORIES.length));
      setAllocations(defAlloc);
    }
  }, []);

  const saveData = () => {
    localStorage.setItem("travel_budget_data", JSON.stringify({
      totalBudget, tripDays, currency, allocations, expenses
    }));
    toast.success("Budget saved");
  };

  const addExpense = () => {
    const amt = parseFloat(newExpAmount);
    if (!amt || amt <= 0) {
      toast.error("Valid amount required");
      return;
    }
    const exp: Expense = {
      id: Math.random().toString(36).substring(7),
      day: newExpDay,
      category: newExpCat,
      amount: amt,
      desc: newExpDesc || "Expense"
    };
    setExpenses([exp, ...expenses]);
    setNewExpAmount("");
    setNewExpDesc("");
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const updateAlloc = (cat: string, val: number) => {
    setAllocations({ ...allocations, [cat]: val });
  };

  const allocTotal = Object.values(allocations).reduce((a,b)=>a+b, 0);
  const spentTotal = expenses.reduce((a,b)=>a+b.amount, 0);
  const dailyLimit = totalBudget / (tripDays || 1);
  
  const getCatSpent = (cat: string) => expenses.filter(e => e.category === cat).reduce((a,b) => a+b.amount, 0);

  const resetAll = () => {
    if(confirm("Are you sure? This will delete all logged expenses.")) {
      setExpenses([]);
      localStorage.removeItem("travel_budget_data");
      toast.success("Reset complete");
    }
  };

  const handleExport = () => {
    let csv = "Day,Category,Amount,Description\n";
    expenses.forEach(e => {
      csv += e.day + "," + e.category + "," + e.amount + "," + e.desc.replace(/,/g, '') + "\n";
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'travel-expenses.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Wallet}
        title="Daily Travel Budget Planner"
        description="Plan and track daily vacation spending."
        actions={
          <React.Fragment>
            <ActionButton onClick={saveData} icon={DollarSign} label="Save" />
            <ActionButton onClick={handleExport} icon={Download} label="Export CSV" />
            <ResetButton onClick={resetAll} label="Reset" />
          </React.Fragment>
        }
      />

      <div className="grid md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-1">
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Total Budget</Label>
              <div className="flex gap-2">
                <Input value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-16 text-center" />
                <Input type="number" value={totalBudget} onChange={(e) => setTotalBudget(Number(e.target.value))} className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Trip Length (Days)</Label>
              <Input type="number" value={tripDays} onChange={(e) => setTripDays(Number(e.target.value))} min={1} />
            </div>
            
            <div className="pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span>Daily Allowance:</span>
                <span className="font-bold">{currency}{dailyLimit.toFixed(2)} / day</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Spent:</span>
                <span className={"font-bold " + (spentTotal > totalBudget ? "text-red-500" : "text-green-500")}>
                  {currency}{spentTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Remaining:</span>
                <span className={"font-bold " + ((totalBudget - spentTotal) < 0 ? "text-red-500" : "text-primary")}>
                  {currency}{(totalBudget - spentTotal).toFixed(2)}
                </span>
              </div>
              
              <div className="h-3 w-full bg-muted rounded-full overflow-hidden mt-2">
                <div 
                  className={"h-full " + (spentTotal > totalBudget ? "bg-red-500" : "bg-primary")}
                  style={{ width: Math.min(100, (spentTotal / totalBudget) * 100) + "%" }}
                />
              </div>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard className="md:col-span-2">
          <CardHeader>
            <CardTitle>Budget Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {CATEGORIES.map(cat => {
                const alloc = allocations[cat] || 0;
                const spent = getCatSpent(cat);
                const progress = alloc > 0 ? Math.min(100, (spent/alloc)*100) : 0;
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <Label className="w-32 truncate">{cat}</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-20 text-right">Spent {currency}{spent.toFixed(0)}</span>
                        <Input 
                          type="number" 
                          value={alloc} 
                          onChange={(e) => updateAlloc(cat, Number(e.target.value))}
                          className="w-24 h-7 text-right text-sm"
                        />
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={"h-full " + (spent > alloc ? "bg-red-500" : "bg-blue-500")}
                        style={{ width: progress + "%" }}
                      />
                    </div>
                  </div>
                )
              })}
              <div className="pt-2 flex justify-between text-sm font-medium border-t mt-2">
                <span>Total Allocated:</span>
                <span className={allocTotal > totalBudget ? "text-red-500" : ""}>{currency}{allocTotal.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>

      <GlassCard>
        <CardHeader>
          <CardTitle>Log Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-1">
              <Label>Day</Label>
              <Input type="number" min={1} max={tripDays} value={newExpDay} onChange={(e) => setNewExpDay(Number(e.target.value))} className="w-20" />
            </div>
            <div className="space-y-1 flex-1 min-w-[150px]">
              <Label>Category</Label>
              <select 
                value={newExpCat} 
                onChange={(e) => setNewExpCat(e.target.value)}
                className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1 flex-1 min-w-[150px]">
              <Label>Description</Label>
              <Input value={newExpDesc} onChange={(e) => setNewExpDesc(e.target.value)} placeholder="Dinner, taxi..." />
            </div>
            <div className="space-y-1">
              <Label>Amount ({currency})</Label>
              <Input type="number" value={newExpAmount} onChange={(e) => setNewExpAmount(e.target.value)} className="w-24" />
            </div>
            <Button onClick={addExpense}><Plus className="w-4 h-4 mr-2" /> Add</Button>
          </div>
          
          <div className="mt-8 space-y-4">
            <h4 className="font-medium">Recent Expenses</h4>
            {expenses.length === 0 ? (
              <p className="text-sm text-muted-foreground">No expenses logged yet.</p>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {expenses.map((exp) => (
                  <div key={exp.id} className="flex justify-between items-center p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted px-3 py-1 rounded-md text-sm font-semibold">
                        Day {exp.day}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{exp.desc}</p>
                        <p className="text-xs text-muted-foreground">{exp.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">{currency}{exp.amount.toFixed(2)}</span>
                      <Button variant="ghost" size="icon" onClick={() => removeExpense(exp.id)} className="text-destructive h-8 w-8">
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
