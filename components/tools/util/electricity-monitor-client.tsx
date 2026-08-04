"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import { Zap, PieChart, Plus, TrendingDown, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

type Appliance = {
  id: string;
  name: string;
  wattage: number;
  hours: number;
};

const PRESETS = [
  { name: "AC", wattage: 1500 },
  { name: "TV", wattage: 100 },
  { name: "Fridge", wattage: 150 },
  { name: "Washer", wattage: 500 },
  { name: "Lights", wattage: 60 },
  { name: "Computer", wattage: 300 },
  { name: "Microwave", wattage: 1000 },
];

export function ElectricityMonitorClient() {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [rate, setRate] = useState<number>(0.15); // cost per kWh
  const [newName, setNewName] = useState("");
  const [newWattage, setNewWattage] = useState("");
  const [newHours, setNewHours] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("electricityMonitor");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.appliances) setAppliances(parsed.appliances);
        if (parsed.rate) setRate(parsed.rate);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("electricityMonitor", JSON.stringify({ appliances, rate }));
  }, [appliances, rate]);

  const addAppliance = () => {
    if (!newName || !newWattage || !newHours) {
      toast.error("Please fill all fields");
      return;
    }
    const w = parseFloat(newWattage);
    const h = parseFloat(newHours);
    if (isNaN(w) || isNaN(h) || w < 0 || h < 0 || h > 24) {
      toast.error("Invalid wattage or hours");
      return;
    }
    
    setAppliances([...appliances, {
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      wattage: w,
      hours: h
    }]);
    setNewName("");
    setNewWattage("");
    setNewHours("");
  };

  const removeAppliance = (id: string) => {
    setAppliances(appliances.filter(a => a.id !== id));
  };

  const reset = () => {
    setAppliances([]);
    setRate(0.15);
  };

  const dailyKwh = appliances.reduce((acc, curr) => acc + (curr.wattage * curr.hours) / 1000, 0);
  const monthlyKwh = dailyKwh * 30;
  const monthlyCost = monthlyKwh * rate;

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Zap}
        title="Electricity Usage Monitor"
        description="Track and monitor your home appliances' electricity usage and estimate costs."
        actions={<ResetButton onClick={reset} />}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Appliances</CardTitle>
            <CardDescription>Add appliances to calculate usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. AC" />
              </div>
              <div className="space-y-1">
                <Label>Wattage (W)</Label>
                <Input type="number" value={newWattage} onChange={e => setNewWattage(e.target.value)} placeholder="e.g. 1500" />
              </div>
              <div className="space-y-1">
                <Label>Hours/Day</Label>
                <Input type="number" value={newHours} onChange={e => setNewHours(e.target.value)} placeholder="e.g. 8" />
              </div>
            </div>
            
            <div className="flex gap-2 overflow-x-auto py-2">
              {PRESETS.map((p) => (
                <Button key={p.name} variant="outline" size="sm" onClick={() => {
                  setNewName(p.name);
                  setNewWattage(p.wattage.toString());
                }}>
                  {p.name} ({p.wattage}W)
                </Button>
              ))}
            </div>

            <Button onClick={addAppliance} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Add Appliance
            </Button>

            <Separator />

            <div className="space-y-2">
              {appliances.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No appliances added yet</p>
              ) : (
                appliances.map(a => (
                  <div key={a.id} className="flex justify-between items-center bg-muted/50 p-2 rounded-lg">
                    <div>
                      <div className="font-medium">{a.name}</div>
                      <div className="text-xs text-muted-foreground">{a.wattage}W × {a.hours}h/day = {((a.wattage * a.hours) / 1000).toFixed(2)} kWh/day</div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeAppliance(a.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Usage Summary</CardTitle>
              <CardDescription>Estimated consumption and cost</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Electricity Rate ($/kWh)</Label>
                <Input 
                  type="number" 
                  value={rate} 
                  onChange={e => setRate(parseFloat(e.target.value) || 0)} 
                  step="0.01" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 p-4 rounded-xl text-center">
                  <div className="text-sm text-muted-foreground mb-1">Daily Usage</div>
                  <div className="text-2xl font-bold text-primary">{dailyKwh.toFixed(2)} <span className="text-sm font-normal">kWh</span></div>
                </div>
                <div className="bg-primary/10 p-4 rounded-xl text-center">
                  <div className="text-sm text-muted-foreground mb-1">Monthly Usage</div>
                  <div className="text-2xl font-bold text-primary">{monthlyKwh.toFixed(2)} <span className="text-sm font-normal">kWh</span></div>
                </div>
              </div>

              <div className="bg-green-500/10 p-6 rounded-xl text-center border border-green-500/20">
                <div className="text-sm text-muted-foreground mb-2">Estimated Monthly Cost</div>
                <div className="text-4xl font-bold text-green-600">${monthlyCost.toFixed(2)}</div>
              </div>
            </CardContent>
          </GlassCard>

          {appliances.length > 0 && (
            <GlassCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-blue-500" />
                  Tips to Reduce
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li>Unplug appliances that are not in use to avoid phantom loads.</li>
                  <li>Replace older appliances with energy-efficient models.</li>
                  <li>Use natural light during the day instead of artificial lighting.</li>
                  {appliances.some(a => a.name.toLowerCase().includes("ac")) && (
                    <li>Set your AC thermostat a few degrees higher to save on cooling costs.</li>
                  )}
                </ul>
              </CardContent>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
