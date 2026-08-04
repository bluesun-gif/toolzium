"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ResetButton, CopyButton } from "@/components/shared/action-buttons";
import { DollarSign, Globe, Calculator, Copy, Plus, Trash } from "lucide-react";
import toast from "react-hot-toast";

type Expense = {
  id: string;
  category: string;
  amountLocal: number;
};

export function TravelBudgetCalcSheetClient() {
  const [homeCurrency, setHomeCurrency] = useState("USD");
  const [destCurrency, setDestCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(0.85); // 1 Home = X Dest
  
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", category: "Flight", amountLocal: 500 },
    { id: "2", category: "Accommodation", amountLocal: 800 },
  ]);

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
    localStorage.setItem("travel-budget", JSON.stringify({ homeCurrency, destCurrency, exchangeRate, expenses }));
    toast.success("Saved to local storage");
  };

  const addExpense = () => {
    setExpenses([...expenses, { id: Math.random().toString(), category: "New Expense", amountLocal: 0 }]);
  };

  const updateExpense = (id: string, field: keyof Expense, value: string | number) => {
    setExpenses(expenses.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalLocal = expenses.reduce((sum, e) => sum + Number(e.amountLocal), 0);
  const totalHome = exchangeRate > 0 ? totalLocal / exchangeRate : 0;

  const getCopyText = () => {
    return expenses.map(e => e.category + ": " + e.amountLocal + " " + destCurrency + " (" + (e.amountLocal / exchangeRate).toFixed(2) + " " + homeCurrency + ")").join("\n") +
      "\nTotal: " + totalLocal + " " + destCurrency + " (" + totalHome.toFixed(2) + " " + homeCurrency + ")";
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Globe}
        title="Multi-Currency Travel Budget Calculator Sheet"
        description="Multi-currency travel expense comparison and trip budgeting sheet."
        actions={
          <React.Fragment>
            <Button variant="outline" onClick={saveToStorage}>Save</Button>
            <ResetButton onClick={() => setExpenses([])} label="Clear" />
          </React.Fragment>
        }
      />
      
      <div className="grid md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-1">
          <CardHeader>
            <CardTitle>Currency Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Home Currency</Label>
              <Input value={homeCurrency} onChange={(e) => setHomeCurrency(e.target.value)} placeholder="USD" />
            </div>
            <div className="space-y-2">
              <Label>Destination Currency</Label>
              <Input value={destCurrency} onChange={(e) => setDestCurrency(e.target.value)} placeholder="EUR" />
            </div>
            <div className="space-y-2">
              <Label>Exchange Rate (1 {homeCurrency} = X {destCurrency})</Label>
              <Input type="number" value={exchangeRate} onChange={(e) => setExchangeRate(Number(e.target.value))} step="0.01" />
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
            {expenses.map((expense) => (
              <div key={expense.id} className="flex items-center gap-2">
                <Input className="flex-1" value={expense.category} onChange={(e) => updateExpense(expense.id, "category", e.target.value)} />
                <Input className="w-32" type="number" value={expense.amountLocal} onChange={(e) => updateExpense(expense.id, "amountLocal", Number(e.target.value))} />
                <span className="text-sm w-12">{destCurrency}</span>
                <span className="text-sm w-24 text-muted-foreground">= {(Number(expense.amountLocal) / exchangeRate).toFixed(2)} {homeCurrency}</span>
                <Button variant="ghost" size="icon" onClick={() => removeExpense(expense.id)}>
                  <Trash className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
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
    </div>
  );
}
