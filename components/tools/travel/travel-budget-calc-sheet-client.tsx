"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ResetButton, CopyButton } from "@/components/shared/action-buttons";
import { DollarSign, Globe, Calculator, Copy, Plus, Trash, Sparkles, Shield, Zap, Settings } from "lucide-react";
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
};
export function TravelBudgetCalcSheetClient() {
  const [homeCurrency, setHomeCurrency] = useState("USD");
  const [destCurrency, setDestCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(0.85); // 1 Home = X Dest

  const [expenses, setExpenses] = useState<Expense[]>([{
    id: "1",
    category: "Flight",
    amountLocal: 500
  }, {
    id: "2",
    category: "Accommodation",
    amountLocal: 800
  }]);
  useEffect(() => {
    const saved = localStorage.getItem("travel-budget");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHomeCurrency(parsed.homeCurrency);
        setDestCurrency(parsed.destCurrency);
        setExchangeRate(parsed.exchangeRate);
        setExpenses(parsed.expenses);
      } catch (e) {}
    }
  }, []);
  const saveToStorage = () => {
    localStorage.setItem("travel-budget", JSON.stringify({
      homeCurrency,
      destCurrency,
      exchangeRate,
      expenses
    }));
    toast.success("Saved to local storage");
  };
  const addExpense = () => {
    setExpenses([...expenses, {
      id: Math.random().toString(),
      category: "New Expense",
      amountLocal: 0
    }]);
  };
  const updateExpense = (id: string, field: keyof Expense, value: string | number) => {
    setExpenses(expenses.map(e => e.id === id ? {
      ...e,
      [field]: value
    } : e));
  };
  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };
  const totalLocal = expenses.reduce((sum, e) => sum + Number(e.amountLocal), 0);
  const totalHome = exchangeRate > 0 ? totalLocal / exchangeRate : 0;
  const getCopyText = () => {
    return expenses.map(e => e.category + ":" + e.amountLocal + "" + destCurrency + "(" + (e.amountLocal / exchangeRate).toFixed(2) + "" + homeCurrency + ")").join("\n") + "\nTotal:" + totalLocal + "" + destCurrency + "(" + totalHome.toFixed(2) + "" + homeCurrency + ")";
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Globe} title="Multi-Currency Travel Budget Calculator Sheet" description="Multi-currency travel expense comparison and trip budgeting sheet." actions={<React.Fragment>
 <Button variant="outline" onClick={saveToStorage}>Save</Button>
 <ResetButton onClick={() => setExpenses([])} label="Clear" />
 </React.Fragment>} />
 
 <div className="grid md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle>Currency Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Home Currency</Label>
 <Input value={homeCurrency} onChange={e => setHomeCurrency(e.target.value)} placeholder="USD" />
 </div>
 <div className="space-y-2">
 <Label>Destination Currency</Label>
 <Input value={destCurrency} onChange={e => setDestCurrency(e.target.value)} placeholder="EUR" />
 </div>
 <div className="space-y-2">
 <Label>Exchange Rate (1 {homeCurrency} = X {destCurrency})</Label>
 <Input type="number" value={exchangeRate} onChange={e => setExchangeRate(Number(e.target.value))} step="0.01" />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-2">
 <CardHeader className="flex flex-row justify-between items-center">
 <div>
 <CardTitle>Budget Items</CardTitle>
 </div>
 <div className="flex gap-2">
 <CopyButton getText={getCopyText} label="Copy Summary" />
 </div>
 </CardHeader>
 <CardContent className="space-y-4">
 {expenses.map(expense => <div key={expense.id} className="flex items-center gap-2">
 <Input className="flex-1" value={expense.category} onChange={e => updateExpense(expense.id, "category", e.target.value)} />
 <Input className="w-32" type="number" value={expense.amountLocal} onChange={e => updateExpense(expense.id, "amountLocal", Number(e.target.value))} />
 <span className="text-sm w-12">{destCurrency}</span>
 <span className="text-sm w-24 text-muted-foreground">= {(Number(expense.amountLocal) / exchangeRate).toFixed(2)} {homeCurrency}</span>
 <Button variant="ghost" size="icon" onClick={() => removeExpense(expense.id)}>
 <Trash className="w-4 h-4 text-red-500" />
 </Button>
 </div>)}
 <Button variant="outline" className="w-full mt-2" onClick={addExpense}>
 <Plus className="w-4 h-4 mr-2" /> Add Expense
 </Button>
 
 <div className="pt-4 border-t mt-4 flex justify-between font-bold text-lg">
 <span>Total</span>
 <div className="text-right">
 <div>{totalLocal.toFixed(2)} {destCurrency}</div>
 <div className="text-sm text-muted-foreground">{totalHome.toFixed(2)} {homeCurrency}</div>
 </div>
 </div>
 </CardContent>
 </GlassCard>
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
          <h3>Why Use Our Multi-Currency Travel Budget Calculator Sheet?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Multi-Currency Travel Budget Calculator Sheet provides
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
    </div>
    </div>
);
}

export default TravelBudgetCalcSheetClient;
