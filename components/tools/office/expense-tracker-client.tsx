"use client";

import React, { useState, useMemo } from "react";
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
import { DollarSign, Plus, Trash2, PieChart, Receipt, Sparkles, Shield, Download } from "lucide-react";
import toast from "react-hot-toast";

interface ExpenseItem {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
}

const CATEGORIES = ["Housing & Utilities", "Food & Groceries", "Transportation", "Software & Tools", "Health & Wellness", "Entertainment", "Other"];

export function ExpenseTrackerClient() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: "1", description: "Cloud Hosting & Domains", category: "Software & Tools", amount: 149, date: "2026-08-01" },
    { id: "2", description: "Team Lunch & Groceries", category: "Food & Groceries", amount: 85, date: "2026-08-03" },
    { id: "3", description: "Co-working Space Desk", category: "Housing & Utilities", amount: 350, date: "2026-08-05" }
  ]);
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState(CATEGORIES[0]);
  const [amt, setAmt] = useState("");

  const addExpense = () => {
    const num = parseFloat(amt);
    if (!desc.trim() || isNaN(num) || num <= 0) {
      toast.error("Please enter a valid description and positive amount.");
      return;
    }
    setExpenses([
      { id: Date.now().toString(), description: desc.trim(), category: cat, amount: num, date: new Date().toISOString().split("T")[0] },
      ...expenses
    ]);
    setDesc("");
    setAmt("");
    toast.success("Added expense entry!");
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalSpent = useMemo(() => expenses.reduce((acc, e) => acc + e.amount, 0), [expenses]);

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Receipt}
          title="Expense Tracker & Budget Logger"
          description="Log personal and business expenses, categorize cash outflows, and visualize monthly spending breakdowns."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Add Expense */}
          <div className="md:col-span-5">
            <GlassCard>
              <CardHeader>
                <CardTitle>Log Expense</CardTitle>
                <CardDescription>Enter transaction details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Description</Label>
                  <Input placeholder="e.g. AWS Invoice" value={desc} onChange={e => setDesc(e.target.value)} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={cat} onValueChange={setCat}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Amount ($)</Label>
                  <Input type="number" step="0.01" placeholder="0.00" value={amt} onChange={e => setAmt(e.target.value)} />
                </div>
                <Button onClick={addExpense} className="w-full">
                  <Plus className="w-4 h-4 mr-2" /> Add Expense
                </Button>
              </CardContent>
            </GlassCard>
          </div>

          {/* Expenses List */}
          <div className="md:col-span-7 space-y-4">
            <GlassCard className="p-4 bg-primary/10 border-primary/30 flex justify-between items-center">
              <div>
                <div className="text-xs text-muted-foreground uppercase font-semibold">Total Outflow</div>
                <div className="text-3xl font-bold text-primary mt-1">${totalSpent.toFixed(2)}</div>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                {expenses.length} Recorded Entries
              </div>
            </GlassCard>

            <GlassCard>
              <CardHeader>
                <CardTitle className="text-base">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-80 overflow-y-auto">
                {expenses.length === 0 ? (
                  <p className="text-center text-xs text-muted-foreground py-6">No expenses logged yet.</p>
                ) : (
                  expenses.map(e => (
                    <div key={e.id} className="p-3 rounded-lg border bg-background/50 flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-sm">{e.description}</div>
                        <div className="text-xs text-muted-foreground">{e.category} • {e.date}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sm text-foreground">${e.amount.toFixed(2)}</span>
                        <Button variant="ghost" size="icon" onClick={() => removeExpense(e.id)} className="h-7 w-7 text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </GlassCard>
          </div>
        </div>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Enter Expense", description: "Input the cost and vendor/item description.", icon: Receipt },
            { step: "02", title: "Select Category", description: "Tag expenses under software, food, utilities, or custom buckets.", icon: PieChart },
            { step: "03", title: "Track Cash Flow", description: "Review cumulative budget totals in real time.", icon: Sparkles }
          ]}
          badges={["100% Free Forever", "Private Local Storage", "Zero Latency"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Receipt, title: "Category Tagging", description: "Automatically group costs into standard personal and business ledger buckets." },
            { icon: DollarSign, title: "Instant Running Totals", description: "Calculates net spending balances with zero loading delay." },
            { icon: Shield, title: "100% Private", description: "All financial transaction records remain private on your personal device." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Managing Operating Costs and Personal Cash Flow</h3>
            <p>
              Consistently logging expenditures prevents budget creep and highlights high-friction spending categories before month-end.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "Is my expense data stored in the cloud?", answer: "No. All expense entries are stored in your browser's local memory for maximum privacy." },
            { question: "Can I use this tool for small business bookkeeping?", answer: "Yes, you can track SaaS subscriptions, office supplies, and team operating costs." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/office/expense-tracker" max={6} />
      </div>
    </div>
  );
}

export default ExpenseTrackerClient;
