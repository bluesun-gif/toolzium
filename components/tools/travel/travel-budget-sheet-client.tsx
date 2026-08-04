"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { DollarSign, Globe, Calculator, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type Expense = { id: string; category: string; amountLocal: number; description: string };

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
    setExpenses([...expenses, { id: Date.now().toString(), category: "Food", amountLocal: 0, description: "" }]);
  };

  const updateExpense = (id: string, field: string, value: any) => {
    setExpenses(expenses.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalLocal = expenses.reduce((sum, e) => sum + (Number(e.amountLocal) || 0), 0);
  const totalHome = exchangeRate > 0 ? totalLocal / exchangeRate : 0;

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        icon={Globe} 
        title="Travel Budget Comparison Sheet" 
        description="Multi-currency travel expense comparison and trip budgeting." 
        actions={<ResetButton onClick={handleReset} label="Reset" />}
      />
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Currency Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Home Currency</Label>
                <Input value={homeCurrency} onChange={(e) => setHomeCurrency(e.target.value.toUpperCase())} placeholder="USD" />
              </div>
              <div className="space-y-2">
                <Label>Destination Currency</Label>
                <Input value={destCurrency} onChange={(e) => setDestCurrency(e.target.value.toUpperCase())} placeholder="EUR" />
              </div>
              <div className="space-y-2">
                <Label>Exchange Rate (1 {homeCurrency} = X {destCurrency})</Label>
                <Input type="number" step="0.01" value={exchangeRate} onChange={(e) => setExchangeRate(Number(e.target.value))} />
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
              {expenses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No expenses added yet.</div>
              ) : (
                <div className="space-y-4">
                  {expenses.map((expense) => {
                    const homeCost = exchangeRate > 0 ? ((Number(expense.amountLocal) || 0) / exchangeRate).toFixed(2) : "0.00";
                    return (
                      <div key={expense.id} className="flex gap-2 items-center p-3 border rounded-md">
                        <Select value={expense.category} onValueChange={(val) => updateExpense(expense.id, "category", val)}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <Input 
                          placeholder="Description" 
                          value={expense.description} 
                          onChange={(e) => updateExpense(expense.id, "description", e.target.value)} 
                          className="flex-1"
                        />
                        <div className="relative w-[120px]">
                          <span className="absolute left-2 top-2 text-muted-foreground text-sm">{destCurrency}</span>
                          <Input 
                            type="number" 
                            value={expense.amountLocal || ""} 
                            onChange={(e) => updateExpense(expense.id, "amountLocal", e.target.value)} 
                            className="pl-12"
                          />
                        </div>
                        <div className="w-[100px] text-right text-sm text-muted-foreground">
                          {homeCost} {homeCurrency}
                        </div>
                        <button onClick={() => removeExpense(expense.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-md">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
