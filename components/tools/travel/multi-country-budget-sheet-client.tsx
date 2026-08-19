"use client";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Calculator, Copy, DollarSign, Download, Globe, Plus, RefreshCw, Shield, Sparkles, Table, Trash, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
interface Expense {
  id: string;
  category: string;
  amount: number;
  countryId: string;
}
interface Country {
  id: string;
  name: string;
  currency: string;
  rateToHome: number;
}
const CATEGORIES = ["Flights", "Accommodation", "Food", "Transportation", "Activities", "Emergency"];
export function MultiCountryBudgetSheetClient() {
  const [homeCurrency, setHomeCurrency] = useState("USD");
  const [countries, setCountries] = useState<Country[]>([{
    id: "1",
    name: "Country 1",
    currency: "EUR",
    rateToHome: 1.1
  }]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem("travel-budget");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.homeCurrency) setHomeCurrency(data.homeCurrency);
        if (data.countries) setCountries(data.countries);
        if (data.expenses) setExpenses(data.expenses);
      } catch (e) {}
    }
  }, []);
  const saveToLocal = () => {
    localStorage.setItem("travel-budget", JSON.stringify({
      homeCurrency,
      countries,
      expenses
    }));
    toast.success("Budget saved!");
  };
  const resetForm = () => {
    setHomeCurrency("USD");
    setCountries([{
      id: "1",
      name: "Country 1",
      currency: "EUR",
      rateToHome: 1.1
    }]);
    setExpenses([]);
    localStorage.removeItem("travel-budget");
    toast.success("Reset successful");
  };
  const addCountry = () => {
    if (countries.length >= 4) {
      toast.error("Maximum 4 countries allowed");
      return;
    }
    setCountries([...countries, {
      id: Date.now().toString(),
      name: "New Country",
      currency: "GBP",
      rateToHome: 1.25
    }]);
  };
  const updateCountry = (id: string, field: keyof Country, value: any) => {
    setCountries(countries.map(c => c.id === id ? {
      ...c,
      [field]: value
    } : c));
  };
  const removeCountry = (id: string) => {
    if (countries.length <= 1) return;
    setCountries(countries.filter(c => c.id !== id));
    setExpenses(expenses.filter(e => e.countryId !== id));
  };
  const addExpense = (countryId: string) => {
    setExpenses([...expenses, {
      id: Date.now().toString(),
      category: CATEGORIES[0],
      amount: 0,
      countryId
    }]);
  };
  const updateExpense = (id: string, field: keyof Expense, value: any) => {
    setExpenses(expenses.map(e => e.id === id ? {
      ...e,
      [field]: value
    } : e));
  };
  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };
  const getTotalHomeCurrency = () => {
    return expenses.reduce((acc, exp) => {
      const country = countries.find(c => c.id === exp.countryId);
      if (!country) return acc;
      return acc + exp.amount * country.rateToHome;
    }, 0);
  };
  const getExportText = () => {
    let txt = "TRAVEL BUDGET\nHome Currency:" + homeCurrency + "\n";
    txt += "Total:" + getTotalHomeCurrency().toFixed(2) + "" + homeCurrency + "\n\n";
    countries.forEach(c => {
      txt += c.name + "(" + c.currency + ")\n";
      const cExps = expenses.filter(e => e.countryId === c.id);
      cExps.forEach(e => {
        txt += "-" + e.category + ":" + e.amount + "" + c.currency + "\n";
      });
      txt += "\n";
    });
    return txt;
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Globe} title="Multi-Country Budget Sheet" description="Plan your travel expenses across multiple destinations with built-in currency conversion." actions={<div className="flex gap-2">
 <ActionButton onClick={saveToLocal} icon={Calculator} label="Save" />
 <CopyButton getText={getExportText} label="Copy Summary" />
 <ResetButton onClick={resetForm} label="Reset" />
 </div>} />

 <div className="grid lg:grid-cols-3 gap-6">
 <div className="lg:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader className="flex flex-row justify-between items-center">
 <CardTitle>Destinations & Currencies</CardTitle>
 <Button size="sm" variant="outline" onClick={addCountry}>
 <Plus className="w-4 h-4 mr-2" /> Add Country
 </Button>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Home Currency</Label>
 <Input value={homeCurrency} onChange={e => setHomeCurrency(e.target.value)} />
 </div>
 <Separator />
 {countries.map(country => <div key={country.id} className="p-4 border rounded-md relative space-y-4">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="space-y-2 col-span-2">
 <Label>Country Name</Label>
 <Input value={country.name} onChange={e => updateCountry(country.id, "name", e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Currency</Label>
 <Input value={country.currency} onChange={e => updateCountry(country.id, "currency", e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Rate (1 {country.currency} = ? {homeCurrency})</Label>
 <Input type="number" step="0.01" value={country.rateToHome} onChange={e => updateCountry(country.id, "rateToHome", parseFloat(e.target.value) || 0)} />
 </div>
 </div>
 {countries.length > 1 && <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeCountry(country.id)}>
 <Trash className="w-4 h-4" />
 </Button>}
 </div>)}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Expenses</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 {countries.map(country => {
                const countryExpenses = expenses.filter(e => e.countryId === country.id);
                return <div key={country.id} className="space-y-4">
 <div className="flex items-center justify-between">
 <h3 className="font-semibold">{country.name} ({country.currency})</h3>
 <Button size="sm" variant="secondary" onClick={() => addExpense(country.id)}>
 <Plus className="w-4 h-4 mr-2" /> Add Expense
 </Button>
 </div>
 {countryExpenses.map(exp => <div key={exp.id} className="flex gap-2 items-center">
 <Select value={exp.category} onValueChange={v => updateExpense(exp.id, "category", v)}>
 <SelectTrigger className="w-[180px]">
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
 </SelectContent>
 </Select>
 <Input type="number" className="flex-1" value={exp.amount} onChange={e => updateExpense(exp.id, "amount", parseFloat(e.target.value) || 0)} placeholder="Amount" />
 <Button variant="ghost" size="icon" onClick={() => removeExpense(exp.id)}>
 <Trash className="w-4 h-4 text-destructive" />
 </Button>
 </div>)}
 {countryExpenses.length === 0 && <p className="text-sm text-muted-foreground italic">No expenses added yet.</p>}
 <Separator />
 </div>;
              })}
 </CardContent>
 </GlassCard>
 </div>

 <div>
 <GlassCard className="sticky top-6">
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <DollarSign className="w-5 h-5 text-primary" /> Trip Total
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="text-4xl font-bold text-primary mb-4">
 {getTotalHomeCurrency().toFixed(2)} {homeCurrency}
 </div>
 <div className="space-y-4 text-sm">
 {countries.map(country => {
                  const countryExps = expenses.filter(e => e.countryId === country.id);
                  const localTotal = countryExps.reduce((acc, e) => acc + e.amount, 0);
                  const homeTotal = localTotal * country.rateToHome;
                  return <div key={country.id} className="flex justify-between p-2 bg-muted/50 rounded-md">
 <span>{country.name}</span>
 <div className="text-right">
 <div>{localTotal.toFixed(2)} {country.currency}</div>
 <div className="text-muted-foreground text-xs">{homeTotal.toFixed(2)} {homeCurrency}</div>
 </div>
 </div>;
                })}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
      <ToolHowItWorks steps={[
        { step: "01", title: "Add Countries", description: "Enter each country you're visiting on your multi-country trip.", icon: Globe },
        { step: "02", title: "Set Daily Budget", description: "Allocate a daily budget for each country in local currency.", icon: DollarSign },
        { step: "03", title: "View Total", description: "See your total trip cost converted to your home currency with live rates.", icon: Table },
      ]} badges={["Multi-Country", "Live Rates", "Export"]} />

      <ToolFeatureGuides features={[
        { icon: Globe, title: "Multi-Country Support", description: "Budget for unlimited countries in one spreadsheet view." },
        { icon: RefreshCw, title: "Live Conversion", description: "All local currency amounts convert to your home currency using live rates." },
        { icon: Download, title: "Export Sheet", description: "Download your multi-country budget as an Excel-compatible spreadsheet." },
      ]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Multi-Country Budget Sheet?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Multi-Country Budget Sheet provides
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

export default MultiCountryBudgetSheetClient;
