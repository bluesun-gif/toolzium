"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { DollarSign, Globe, Calculator, Plus, Trash2, Sparkles, Shield, Zap, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
type Expense = {
  id: string;
  category: string;
  amountLocal: number;
  description: string;
};
const CATEGORIES = ["Flight", "Accommodation", "Food", "Transportation", "Shopping", "Emergency", "Other"];
export function TravelBudgetSheetClient() {
  const [homeCurrency, setHomeCurrency] = useState("USD");
  const [destCurrency, setDestCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(0.85);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem("travel-budget-expenses");
    if (saved) {
      try {
        setExpenses(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("travel-budget-expenses", JSON.stringify(expenses));
  }, [expenses]);
  const handleReset = () => {
    setExpenses([]);
    setHomeCurrency("USD");
    setDestCurrency("EUR");
    setExchangeRate(0.85);
    localStorage.removeItem("travel-budget-expenses");
    toast.success("Budget reset");
  };
  const addExpense = () => {
    setExpenses([...expenses, {
      id: Date.now().toString(),
      category: "Food",
      amountLocal: 0,
      description: ""
    }]);
  };
  const updateExpense = (id: string, field: string, value: any) => {
    setExpenses(expenses.map(e => e.id === id ? {
      ...e,
      [field]: value
    } : e));
  };
  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };
  const totalLocal = expenses.reduce((sum, e) => sum + (Number(e.amountLocal) || 0), 0);
  const totalHome = exchangeRate > 0 ? totalLocal / exchangeRate : 0;
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Globe} title="Travel Budget Comparison Sheet" description="Multi-currency travel expense comparison and trip budgeting." actions={<ResetButton onClick={handleReset} label="Reset" />} />
 
 <div className="grid md:grid-cols-3 gap-6">
 <div className="md:col-span-1 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Currency Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Home Currency</Label>
 <Input value={homeCurrency} onChange={e => setHomeCurrency(e.target.value.toUpperCase())} placeholder="USD" />
 </div>
 <div className="space-y-2">
 <Label>Destination Currency</Label>
 <Input value={destCurrency} onChange={e => setDestCurrency(e.target.value.toUpperCase())} placeholder="EUR" />
 </div>
 <div className="space-y-2">
 <Label>Exchange Rate (1 {homeCurrency} = X {destCurrency})</Label>
 <Input type="number" step="0.01" value={exchangeRate} onChange={e => setExchangeRate(Number(e.target.value))} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Summary</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex justify-between items-center">
 <span className="font-semibold">Total ({destCurrency}):</span>
 <span className="text-xl">{totalLocal.toFixed(2)}</span>
 </div>
 <div className="flex justify-between items-center text-muted-foreground">
 <span className="font-semibold">Total ({homeCurrency}):</span>
 <span className="text-xl">{totalHome.toFixed(2)}</span>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="md:col-span-2">
 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle>Expenses</CardTitle>
 <CardDescription>Itemize your budget</CardDescription>
 </div>
 <ActionButton onClick={addExpense} icon={Plus} label="Add" variant="outline" size="default" />
 </CardHeader>
 <CardContent className="space-y-4">
 {expenses.length === 0 ? <div className="text-center py-8 text-muted-foreground">No expenses added yet.</div> : <div className="space-y-4">
 {expenses.map(expense => {
                  const homeCost = exchangeRate > 0 ? ((Number(expense.amountLocal) || 0) / exchangeRate).toFixed(2) : "0.00";
                  return <div key={expense.id} className="flex gap-2 items-center p-3 border rounded-md">
 <Select value={expense.category} onValueChange={val => updateExpense(expense.id, "category", val)}>
 <SelectTrigger className="w-[140px]">
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 <Input placeholder="Description" value={expense.description} onChange={e => updateExpense(expense.id, "description", e.target.value)} className="flex-1" />
 <div className="relative w-[120px]">
 <span className="absolute left-2 top-2 text-muted-foreground text-sm">{destCurrency}</span>
 <Input type="number" value={expense.amountLocal || ""} onChange={e => updateExpense(expense.id, "amountLocal", e.target.value)} className="pl-12" />
 </div>
 <div className="w-[100px] text-right text-sm text-muted-foreground">
 {homeCost} {homeCurrency}
 </div>
 <Button onClick={() => removeExpense(expense.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-md">
 <Trash2 className="w-4 h-4" />
 </Button>
 </div>;
                })}
 </div>}
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
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
          <h3>Why Use Our Travel Budget Comparison Sheet?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Travel Budget Comparison Sheet provides
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

      <RelatedTools currentToolUrl="/tools/travel/travel-budget-sheet" max={6} />

  </div></div>;
}