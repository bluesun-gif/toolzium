"use strict";
"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Zap, Calculator, DollarSign, Plus, Trash2 } from "lucide-react";

interface Appliance {
  id: string;
  name: string;
  wattage: number;
  hoursPerDay: number;
  daysPerMonth: number;
}

const PRESETS = [
  { name: "Fridge", wattage: 150, hoursPerDay: 24, daysPerMonth: 30 },
  { name: "AC", wattage: 1500, hoursPerDay: 8, daysPerMonth: 30 },
  { name: "TV", wattage: 100, hoursPerDay: 5, daysPerMonth: 30 },
  { name: "Washer", wattage: 500, hoursPerDay: 1, daysPerMonth: 30 },
  { name: "PC", wattage: 300, hoursPerDay: 8, daysPerMonth: 30 },
];

export function ElectricityCostClient() {
  const [rate, setRate] = useState<number>(0.12);
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [newName, setNewName] = useState("");
  const [newWattage, setNewWattage] = useState<number | "">("");
  const [newHours, setNewHours] = useState<number | "">("");
  const [newDays, setNewDays] = useState<number | "">(30);

  const addAppliance = () => {
    if (!newName || !newWattage || !newHours || !newDays) return;
    setAppliances([...appliances, {
      id: Math.random().toString(36).substring(7),
      name: newName,
      wattage: Number(newWattage),
      hoursPerDay: Number(newHours),
      daysPerMonth: Number(newDays)
    }]);
    setNewName("");
    setNewWattage("");
    setNewHours("");
    setNewDays(30);
  };

  const addPreset = (preset: typeof PRESETS[0]) => {
    setAppliances([...appliances, {
      id: Math.random().toString(36).substring(7),
      ...preset
    }]);
  };

  const removeAppliance = (id: string) => {
    setAppliances(appliances.filter(a => a.id !== id));
  };

  const calculateCost = (a: Appliance) => {
    const kwhPerMonth = (a.wattage * a.hoursPerDay * a.daysPerMonth) / 1000;
    return kwhPerMonth * rate;
  };

  const totalMonthlyCost = appliances.reduce((sum, a) => sum + calculateCost(a), 0);
  const totalYearlyCost = totalMonthlyCost * 12;

  const handleReset = () => {
    setAppliances([]);
    setRate(0.12);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Zap}
        title="Electricity Cost Calculator"
        description="Calculate the electricity cost of your home appliances"
        actions={<ResetButton onClick={handleReset} label="Reset All" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><DollarSign className="w-5 h-5" /> Settings & Presets</CardTitle>
            <CardDescription>Set your electricity rate and quick-add appliances</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Electricity Rate ($ / kWh)</Label>
              <Input type="number" step="0.01" value={rate} onChange={e => setRate(Number(e.target.value))} />
            </div>
            
            <Separator />
            
            <Label>Quick Add Presets</Label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map(p => (
                <Button key={p.name} variant="outline" size="sm" onClick={() => addPreset(p)}>
                  + {p.name}
                </Button>
              ))}
            </div>
            
            <Separator />

            <div className="space-y-3">
              <Label>Add Custom Appliance</Label>
              <Input placeholder="Appliance Name" value={newName} onChange={e => setNewName(e.target.value)} />
              <div className="grid grid-cols-3 gap-2">
                <Input type="number" placeholder="Watts" value={newWattage} onChange={e => setNewWattage(e.target.value === "" ? "" : Number(e.target.value))} />
                <Input type="number" placeholder="Hours/Day" value={newHours} onChange={e => setNewHours(e.target.value === "" ? "" : Number(e.target.value))} />
                <Input type="number" placeholder="Days/Month" value={newDays} onChange={e => setNewDays(e.target.value === "" ? "" : Number(e.target.value))} />
              </div>
              <Button onClick={addAppliance} className="w-full"><Plus className="w-4 h-4 mr-2" /> Add Appliance</Button>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5" /> Summary</CardTitle>
            <CardDescription>Your estimated electricity costs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Monthly Cost</p>
                <p className="text-2xl font-bold">${totalMonthlyCost.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Yearly Cost</p>
                <p className="text-2xl font-bold">${totalYearlyCost.toFixed(2)}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              <Label>Appliance Breakdown</Label>
              {appliances.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No appliances added yet.</p>
              ) : (
                appliances.map(a => (
                  <div key={a.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.wattage}W • {a.hoursPerDay}h/d</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-bold">${calculateCost(a).toFixed(2)}<span className="text-xs font-normal">/mo</span></p>
                      <Button variant="ghost" size="icon" onClick={() => removeAppliance(a.id)} className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
