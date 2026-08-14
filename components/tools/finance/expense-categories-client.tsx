"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { PieChart, DollarSign, AlertTriangle, Plus, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
type Expense = {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
};
const CATEGORIES = ["Housing", "Food", "Transport", "Entertainment", "Shopping", "Bills", "Health", "Education", "Other"];
export function ExpenseCategoriesClient() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Record<string, number>>({});
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  useEffect(() => {
    const savedExp = localStorage.getItem("expense-tracker-expenses");
    const savedBudgets = localStorage.getItem("expense-tracker-budgets");
    if (savedExp) setExpenses(JSON.parse(savedExp));
    if (savedBudgets) setBudgets(JSON.parse(savedBudgets));
  }, []);
  useEffect(() => {
    localStorage.setItem("expense-tracker-expenses", JSON.stringify(expenses));
    localStorage.setItem("expense-tracker-budgets", JSON.stringify(budgets));
  }, [expenses, budgets]);
  const addExpense = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (!description.trim()) {
      toast.error("Enter a description");
      return;
    }
    const newExpense = {
      id: Date.now().toString(),
      amount: Number(amount),
      description,
      category,
      date: new Date().toISOString()
    };
    setExpenses([...expenses, newExpense]);
    setAmount("");
    setDescription("");
    toast.success("Expense added!");
  };
  const updateBudget = (cat: string, val: string) => {
    const num = Number(val);
    if (!isNaN(num) && num >= 0) {
      setBudgets({
        ...budgets,
        [cat]: num
      });
    }
  };
  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };
  const resetAll = () => {
    if (confirm("Clear all data?")) {
      setExpenses([]);
      setBudgets({});
      toast.success("Data cleared");
    }
  };
  const expensesByCategory = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0);
    return acc;
  }, {} as Record<string, number>);
  const totalSpent = Object.values(expensesByCategory).reduce((a, b) => a + b, 0);
  const totalBudget = Object.values(budgets).reduce((a, b) => a + b, 0);
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={PieChart} title="Expense Categorizer" description="Categorize and analyze expenses by category. Track spending against budget limits." actions={<ResetButton onClick={resetAll} label="Clear All Data" />} />
 
 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Add Expense</CardTitle>
 <CardDescription>Log a new transaction</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Amount ($)</Label>
 <Input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Description</Label>
 <Input placeholder="Groceries, Rent, etc." value={description} onChange={e => setDescription(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Category</Label>
 <Select value={category} onValueChange={setCategory}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <Button className="w-full" onClick={addExpense}><Plus className="w-4 h-4 mr-2" /> Add Expense</Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Overview</CardTitle>
 <CardDescription>Total Spent vs Budget</CardDescription>
 </CardHeader>
 <CardContent>
 <div className="text-center p-6 bg-muted rounded-lg">
 <div className="text-sm text-muted-foreground mb-1">Total Spent</div>
 <div className="text-4xl font-bold">${totalSpent.toFixed(2)}</div>
 <div className="text-sm mt-2 text-muted-foreground">Total Budget: ${totalBudget.toFixed(2)}</div>
 </div>
 
 <div className="mt-6 space-y-4">
 <h4 className="font-semibold text-sm">Recent Expenses</h4>
 {expenses.slice(-5).reverse().map(e => <div key={e.id} className="flex justify-between items-center text-sm border-b pb-2">
 <div>
 <div className="font-medium">{e.description}</div>
 <div className="text-xs text-muted-foreground">{e.category}</div>
 </div>
 <div className="flex items-center gap-4">
 <span className="font-semibold">${e.amount.toFixed(2)}</span>
 <Button variant="ghost" size="sm" onClick={() => deleteExpense(e.id)}>X</Button>
 </div>
 </div>)}
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle>Budget Limits</CardTitle>
 <CardDescription>Set budget limits per category and track progress</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 {CATEGORIES.map(cat => {
            const spent = expensesByCategory[cat] || 0;
            const budget = budgets[cat] || 0;
            const percentage = budget > 0 ? Math.min(100, spent / budget * 100) : 0;
            const isOver = budget > 0 && spent > budget;
            return <div key={cat} className="space-y-2">
 <div className="flex justify-between items-center">
 <span className="font-medium">{cat}</span>
 <div className="flex items-center gap-2">
 <Input type="number" className="w-24 h-8 text-right" placeholder="Budget" value={budgets[cat] || ""} onChange={e => updateBudget(cat, e.target.value)} />
 </div>
 </div>
 <div className="flex items-center gap-4 text-sm">
 <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
 <div className={cn("h-full", isOver ? 'bg-red-500' : 'bg-primary')} style={{
                    width: `${percentage}%`
                  }} />
 </div>
 <div className="w-32 text-right">
 ${spent.toFixed(2)} / ${budget.toFixed(2)}
 </div>
 </div>
 {isOver && <div className="text-xs text-red-500 flex items-center gap-1">
 <AlertTriangle className="w-3 h-3" /> Over budget by ${(spent - budget).toFixed(2)}
 </div>}
 </div>;
          })}
 </CardContent>
 </GlassCard>
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Your Numbers",
        description: "Enter amounts per category in the fields above — everything calculates live as you type.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Review the Result",
        description: "Instantly see your spend by category with percentages, with breakdowns and visual cues.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy or Export",
        description: "Copy any figure or export the full breakdown to use in a plan, invoice, or report.",
        icon: Copy
      }]} badges={["100% Free", "Private & Local", "No Signup"]} />

            <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Category roll-ups",
        description: "Category roll-ups"
      }, {
        icon: Shield,
        title: "Private & On-Device",
        description: "Every calculation runs in your browser. Your financial inputs never leave your device or touch a server."
      }, {
        icon: Zap,
        title: "No Signup, Ever",
        description: "Open the tool and get an answer in seconds — no account, no paywall, no usage cap."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use the Expense Categorizer?</h3>
          <p>
            Categorize spending to see where the money actually goes — the first step to a real budget.
          </p>
          <p>
            Like all Toolzium calculators, it is free, private, and built to give you a paid-product experience without the subscription.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/finance/expense-categories" max={6} />

    </div></div>;
}