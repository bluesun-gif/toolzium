"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { DollarSign, ShoppingBag, Globe, Copy } from "lucide-react";
import toast from "react-hot-toast";

type Item = { id: number; name: string; localCost: number; };

export function CurrencyPriceMatrixClient() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [destCurrency, setDestCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState("0.92");
  
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemCost, setNewItemCost] = useState("");
  
  const [tipPercent, setTipPercent] = useState("10");

  useEffect(() => {
    const saved = localStorage.getItem("toolzium-travel-matrix");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setBaseCurrency(data.baseCurrency || "USD");
        setDestCurrency(data.destCurrency || "EUR");
        setExchangeRate(data.exchangeRate || "0.92");
        setItems(data.items || []);
        setTipPercent(data.tipPercent || "10");
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const saveToLocal = (newState: any) => {
    localStorage.setItem("toolzium-travel-matrix", JSON.stringify(newState));
  };

  const handleReset = () => {
    setBaseCurrency("USD");
    setDestCurrency("EUR");
    setExchangeRate("0.92");
    setItems([]);
    setTipPercent("10");
    saveToLocal({ baseCurrency: "USD", destCurrency: "EUR", exchangeRate: "0.92", items: [], tipPercent: "10" });
    toast.success("Form reset");
  };

  const addItem = () => {
    if (!newItemName || !newItemCost) return;
    const item = { id: Date.now(), name: newItemName, localCost: parseFloat(newItemCost) };
    const newItems = [...items, item];
    setItems(newItems);
    saveToLocal({ baseCurrency, destCurrency, exchangeRate, items: newItems, tipPercent });
    setNewItemName("");
    setNewItemCost("");
  };

  const removeItem = (id: number) => {
    const newItems = items.filter(i => i.id !== id);
    setItems(newItems);
    saveToLocal({ baseCurrency, destCurrency, exchangeRate, items: newItems, tipPercent });
  };

  const rate = parseFloat(exchangeRate) || 1;
  const totalDest = items.reduce((sum, item) => sum + item.localCost, 0);
  const totalBase = totalDest / rate;
  
  const tipAmountDest = totalDest * (parseFloat(tipPercent) / 100 || 0);
  const tipAmountBase = tipAmountDest / rate;

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={DollarSign}
        title="Currency Price Matrix"
        description="Multi-item travel cost converter and comparison sheet."
        actions={
          <>
            <ResetButton onClick={handleReset} label="Reset" />
          </>
        }
      />
      
      <GlassCard>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={"grid gap-4 md:grid-cols-4"}>
            <div className="space-y-2">
              <Label>Base Currency</Label>
              <Input value={baseCurrency} onChange={(e) => { setBaseCurrency(e.target.value); saveToLocal({ baseCurrency: e.target.value, destCurrency, exchangeRate, items, tipPercent }); }} placeholder="e.g. USD" />
            </div>
            <div className="space-y-2">
              <Label>Destination Currency</Label>
              <Input value={destCurrency} onChange={(e) => { setDestCurrency(e.target.value); saveToLocal({ baseCurrency, destCurrency: e.target.value, exchangeRate, items, tipPercent }); }} placeholder="e.g. EUR" />
            </div>
            <div className="space-y-2">
              <Label>Exchange Rate (1 Base = X Dest)</Label>
              <Input type="number" step="0.01" value={exchangeRate} onChange={(e) => { setExchangeRate(e.target.value); saveToLocal({ baseCurrency, destCurrency, exchangeRate: e.target.value, items, tipPercent }); }} />
            </div>
            <div className="space-y-2">
              <Label>Tip Calculator (%)</Label>
              <Input type="number" value={tipPercent} onChange={(e) => { setTipPercent(e.target.value); saveToLocal({ baseCurrency, destCurrency, exchangeRate, items, tipPercent: e.target.value }); }} />
            </div>
          </div>
        </CardContent>
      </GlassCard>

      <div className={"grid gap-6 md:grid-cols-2"}>
        <GlassCard>
          <CardHeader>
            <CardTitle>Add Expenses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 space-y-2">
                <Label>Item Name</Label>
                <Input value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder="e.g. Dinner" />
              </div>
              <div className="w-32 space-y-2">
                <Label>Cost ({destCurrency})</Label>
                <Input type="number" value={newItemCost} onChange={(e) => setNewItemCost(e.target.value)} placeholder="0.00" />
              </div>
            </div>
            <Button onClick={addItem} className="w-full">Add Expense</Button>
          </CardContent>
        </GlassCard>
        
        <GlassCard>
          <CardHeader>
            <CardTitle>Expense Matrix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.length === 0 ? (
              <p className="text-muted-foreground text-sm">No items added yet.</p>
            ) : (
              <div className="space-y-2">
                <div className={"grid grid-cols-4 gap-2 font-semibold text-sm border-b pb-2"}>
                  <div className="col-span-2">Item</div>
                  <div>{destCurrency}</div>
                  <div>{baseCurrency}</div>
                </div>
                {items.map(item => (
                  <div key={item.id} className={"grid grid-cols-4 gap-2 text-sm items-center py-1 group"}>
                    <div className="col-span-2 flex items-center gap-2">
                      <Button variant="ghost" size="icon" className={"h-6 w-6 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"} onClick={() => removeItem(item.id)}>×</Button>
                      {item.name}
                    </div>
                    <div>{item.localCost.toFixed(2)}</div>
                    <div>{(item.localCost / rate).toFixed(2)}</div>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className={"grid grid-cols-4 gap-2 font-semibold text-sm pt-2"}>
                  <div className="col-span-2">Subtotal</div>
                  <div>{totalDest.toFixed(2)}</div>
                  <div>{totalBase.toFixed(2)}</div>
                </div>
                <div className={"grid grid-cols-4 gap-2 text-sm text-muted-foreground pt-1"}>
                  <div className="col-span-2">Tip ({tipPercent}%)</div>
                  <div>{tipAmountDest.toFixed(2)}</div>
                  <div>{tipAmountBase.toFixed(2)}</div>
                </div>
                <div className={"grid grid-cols-4 gap-2 font-bold text-sm pt-2 border-t mt-2"}>
                  <div className="col-span-2 text-primary">Total</div>
                  <div className="text-primary">{(totalDest + tipAmountDest).toFixed(2)}</div>
                  <div className="text-primary">{(totalBase + tipAmountBase).toFixed(2)}</div>
                </div>
              </div>
            )}
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
