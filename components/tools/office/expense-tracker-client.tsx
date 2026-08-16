"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

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
import { BarChart3, DollarSign, Download, PieChart, Plus, Receipt, Tags, Trash2 } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Receipt, DollarSign, PieChart, Trash2, Plus, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
type Expense = {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
};
const CATEGORIES = ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Other"];
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
      date
    };
    setExpenses(prev => [...prev, newExpense]);
    setAmount("");
    setDescription("");
    toast.success("Expense added");
  };
  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
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
    CATEGORIES.forEach(c => totals[c] = 0);
    expenses.forEach(e => {
      if (totals[e.category] !== undefined) {
        totals[e.category] += e.amount;
      } else {
        totals["Other"] = (totals["Other"] || 0) + e.amount;
      }
    });
    return totals;
  }, [expenses]);
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Receipt} title="Expense Tracker" description="Track your daily expenses, categorize spending, and view monthly summaries." actions={<ResetButton onClick={clearAll} label="Clear Data" />} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Plus className="w-5 h-5 text-primary" />
 Add Expense
 </CardTitle>
 <CardDescription>Enter details of your new expense.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Amount ($)</Label>
 <div className="relative">
 <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
 <Input type="number" placeholder="0.00" className="pl-9" value={amount} onChange={e => setAmount(e.target.value)} />
 </div>
 </div>
 
 <div className="space-y-2">
 <Label>Description</Label>
 <Input placeholder="e.g. Lunch at Cafe" value={description} onChange={e => setDescription(e.target.value)} />
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Category</Label>
 <Select value={category} onValueChange={setCategory}>
 <SelectTrigger>
 <SelectValue placeholder="Select category" />
 </SelectTrigger>
 <SelectContent>
 {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>
 {cat}
 </SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Date</Label>
 <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
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
 <PieChart className="w-5 h-5 text-primary" />
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
 {CATEGORIES.map(cat => {
                const catTotal = categoryTotals[cat] || 0;
                const percentage = total > 0 ? catTotal / total * 100 : 0;
                return <div key={cat} className="space-y-1">
 <div className="flex justify-between text-sm">
 <span>{cat}</span>
 <span className="font-medium">${catTotal.toFixed(2)}</span>
 </div>
 <div className="h-2 bg-muted rounded-full overflow-hidden">
 <div className="h-full bg-primary/80 transition-all" style={{
                      width: `${percentage}%`
                    }} />
 </div>
<<<<<<< HEAD
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Log Expense",
    description:"Add amount and category.",
    icon: Receipt,
  },
{
    step:"02",
    title:"Categorize",
    description:"Tag business or personal.",
    icon: Tags,
  },
{
    step:"03",
    title:"Review",
    description:"See totals and trends.",
    icon: BarChart3,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Receipt,
    title:"Quick Log",
    description:"Record each cost.",
  },
{
    icon: Tags,
    title:"Categories",
    description:"Organize spending.",
  },
{
    icon: BarChart3,
    title:"Reports",
    description:"Totals over time.",
  },
{
    icon: Download,
    title:"Export",
    description:"For tax or reimbursement.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>An expense tracker turns scattered spending into an organized record, essential for budgets and tax deductions. Logging each cost with a category reveals where money goes and what is deductible. This tool makes entry and review simple.</p>
  <p>Categorization is the insight. Separating business from personal spending streamlines accounting and reimbursement. Reports show totals so you can spot trends and cut waste.</p>
  <p>Use it consistently, not just at tax time. The tool's value is a clean expense history that saves money and stress.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Why track?",
    answer:"Controls spend and aids taxes.",
  },
{
    question:"Business vs personal?",
    answer:"Tag to separate them.",
  },
{
    question:"Export?",
    answer:"Yes, for accounting.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Local.",
  }
  ]}
/>
</div>
 );
 })}
=======
 </div>;
              })}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
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
 {expenses.length === 0 ? <div className="text-center p-8 text-muted-foreground border border-dashed rounded-lg">
 No expenses recorded yet.
 </div> : <div className="space-y-4">
 {[...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(exp => <div key={exp.id} className="flex items-center justify-between p-3 border rounded-lg bg-card/50 hover:bg-muted/50 transition-colors">
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
 <Button variant="ghost" size="icon" onClick={() => deleteExpense(exp.id)} className="text-destructive h-8 w-8 hover:bg-destructive/10 hover:text-destructive">
 <Trash2 className="w-4 h-4" />
 </Button>
 </div>
 </div>)}
 </div>}
 </CardContent>
 </GlassCard>
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Expense Tracker?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Expense Tracker provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
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

      <RelatedTools currentToolUrl="/tools/office/expense-tracker" max={6} />

    </div></div>;
}