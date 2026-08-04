"use client";

import { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Globe, Calculator, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";

type Destination = {
  id: string;
  name: string;
  currency: string;
  exchangeRate: number;
  days: number;
  dailyBudgetLocal: number;
};

// Dummy exchange rates to USD for illustration
const rates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.53,
  CAD: 1.36,
  JPY: 150.2,
};

export function TravelBudgetPlannerClient() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [flightsTotal, setFlightsTotal] = useState<number>(0);
  
  useEffect(() => {
    const saved = localStorage.getItem("travel-budget");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (parsed.baseCurrency) setBaseCurrency(parsed.baseCurrency);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (parsed.destinations) setDestinations(parsed.destinations);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (parsed.flightsTotal) setFlightsTotal(parsed.flightsTotal);
      } catch {
        // ignore
      }
    }
  }, []);

  const saveToLocal = () => {
    localStorage.setItem("travel-budget", JSON.stringify({ baseCurrency, destinations, flightsTotal }));
    toast.success("Budget saved locally");
  };

  const addDestination = () => {
    if (destinations.length >= 4) {
      toast.error("Maximum 4 destinations allowed.");
      return;
    }
    setDestinations([...destinations, {
      id: Math.random().toString(36).substring(7),
      name: "New Destination",
      currency: "EUR",
      exchangeRate: 1, // Will be computed based on baseCurrency
      days: 3,
      dailyBudgetLocal: 100
    }]);
  };

  const updateDest = (id: string, field: keyof Destination, val: string | number) => {
    setDestinations(destinations.map(d => d.id === id ? { ...d, [field]: val } : d));
  };

  const removeDest = (id: string) => {
    setDestinations(destinations.filter(d => d.id !== id));
  };

  let totalTripCostBase = flightsTotal;
  let totalDays = 0;

  const calculatedDestinations = destinations.map(d => {
    const totalLocal = d.days * d.dailyBudgetLocal;
    const converted = totalLocal * (rates[baseCurrency] / rates[d.currency]);
    
    return { ...d, totalLocal, converted };
  });

  calculatedDestinations.forEach(d => {
    totalTripCostBase += d.converted;
    totalDays += d.days;
  });

  const dailyAvg = totalDays > 0 ? (totalTripCostBase - flightsTotal) / totalDays : 0;

  const formatCurrency = (amount: number, cur: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: cur }).format(amount);
  };

  return (
    <div className={"space-y-6"}>
      <ToolPageHeader
        icon={Globe}
        title="Multi-Currency Travel Budget Planner"
        description="Plan your multi-country trip budget and see the total cost in your home currency."
        actions={
          <>
            <ActionButton onClick={saveToLocal} icon={Calculator} label="Save Budget" />
            <ResetButton onClick={() => { setDestinations([]); setFlightsTotal(0); }} label="Clear All" />
          </>
        }
      />
      
      <div className={"grid md:grid-cols-3 gap-6"}>
        <div className={"md:col-span-2 space-y-6"}>
          <GlassCard>
            <CardHeader>
              <CardTitle>Base Settings & Flights</CardTitle>
            </CardHeader>
            <CardContent className={"grid grid-cols-2 gap-4"}>
              <div className={"space-y-2"}>
                <Label>Home Currency</Label>
                <Select value={baseCurrency} onValueChange={setBaseCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className={"space-y-2"}>
                <Label>Total Flight Costs ({baseCurrency})</Label>
                <Input type="number" value={flightsTotal || ""} onChange={e => setFlightsTotal(Number(e.target.value))} min="0" />
              </div>
            </CardContent>
          </GlassCard>

          <div className={"space-y-4"}>
            <div className={"flex items-center justify-between"}>
              <h3 className={"text-lg font-semibold"}>Destinations</h3>
              <Button onClick={addDestination} variant="outline" size="sm" className={"gap-2"}><Plus className={"h-4 w-4"} /> Add Country</Button>
            </div>
            
            {destinations.length === 0 && (
              <div className={"p-8 text-center text-muted-foreground border rounded-lg border-dashed"}>
                No destinations added yet. Click &quot;Add Country&quot; to begin.
              </div>
            )}

            {destinations.map((dest) => (
              <GlassCard key={dest.id}>
                <CardContent className={"p-4 grid md:grid-cols-5 gap-4 items-end"}>
                  <div className={"space-y-2"}>
                    <Label>Country/City</Label>
                    <Input value={dest.name} onChange={e => updateDest(dest.id, "name", e.target.value)} />
                  </div>
                  <div className={"space-y-2"}>
                    <Label>Currency</Label>
                    <Select value={dest.currency} onValueChange={v => updateDest(dest.id, "currency", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="AUD">AUD</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className={"space-y-2"}>
                    <Label>Days</Label>
                    <Input type="number" value={dest.days} onChange={e => updateDest(dest.id, "days", Number(e.target.value))} min="1" />
                  </div>
                  <div className={"space-y-2"}>
                    <Label>Daily ({dest.currency})</Label>
                    <Input type="number" value={dest.dailyBudgetLocal} onChange={e => updateDest(dest.id, "dailyBudgetLocal", Number(e.target.value))} min="0" />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeDest(dest.id)} className={"text-destructive"}>
                    <Trash2 className={"h-5 w-5"} />
                  </Button>
                </CardContent>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className={"space-y-6"}>
          <GlassCard className={"bg-primary/5"}>
            <CardHeader>
              <CardTitle>Budget Summary</CardTitle>
            </CardHeader>
            <CardContent className={"space-y-4"}>
              <div className={"flex justify-between items-center pb-2 border-b"}>
                <span className={"text-muted-foreground"}>Flights</span>
                <span className={"font-semibold"}>{formatCurrency(flightsTotal, baseCurrency)}</span>
              </div>
              
              {calculatedDestinations.map(d => (
                <div key={d.id} className={"flex justify-between items-center text-sm"}>
                  <span className={"truncate pr-2"}>{d.name} ({d.days}d)</span>
                  <span>{formatCurrency(d.converted, baseCurrency)}</span>
                </div>
              ))}
              
              <div className={"pt-4 border-t"}>
                <div className={"flex justify-between items-center mb-1"}>
                  <span className={"font-bold"}>Total Trip Cost</span>
                  <span className={"text-xl font-bold text-primary"}>{formatCurrency(totalTripCostBase, baseCurrency)}</span>
                </div>
                <div className={"flex justify-between items-center text-xs text-muted-foreground"}>
                  <span>Total Duration</span>
                  <span>{totalDays} Days</span>
                </div>
                <div className={"flex justify-between items-center text-xs text-muted-foreground"}>
                  <span>Daily Avg (Excl. Flights)</span>
                  <span>{formatCurrency(dailyAvg, baseCurrency)} / day</span>
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
