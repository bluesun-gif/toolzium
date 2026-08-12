"use client";

import React, { useState, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ResetButton, ActionButton } from"@/components/shared/action-buttons";
import { cn } from"@/lib/utils";
import { DollarSign, Globe, Calculator, Copy } from"lucide-react";
import toast from"react-hot-toast";

type Destination = {
 name: string;
 rate: number; // exchange rate from home currency
};

export function TripBudgetMatrixClient() {
 const [homeBudget, setHomeBudget] = useState<number>(1000);
 const [destinations, setDestinations] = useState<Destination[]>([
 { name:"EUR", rate: 0.92 },
 { name:"GBP", rate: 0.79 }
 ]);

 useEffect(() => {
 const saved = localStorage.getItem("tripBudgetMatrix");
 if (saved) {
 try {
 const parsed = JSON.parse(saved);
 if (parsed.homeBudget) setHomeBudget(parsed.homeBudget);
 if (parsed.destinations) setDestinations(parsed.destinations);
 } catch (e) {}
 }
 }, []);

 const saveToStorage = () => {
 localStorage.setItem("tripBudgetMatrix", JSON.stringify({ homeBudget, destinations }));
 toast.success("Saved to local storage");
 };

 const handleReset = () => {
 setHomeBudget(1000);
 setDestinations([{ name:"EUR", rate: 0.92 }, { name:"GBP", rate: 0.79 }]);
 localStorage.removeItem("tripBudgetMatrix");
 };

 const addDestination = () => {
 if (destinations.length >= 4) {
 toast.error("Maximum 4 destinations allowed");
 return;
 }
 setDestinations([...destinations, { name:"New", rate: 1.0 }]);
 };

 const updateDestination = (index: number, field: keyof Destination, value: string) => {
 const newDest = [...destinations];
 if (field ==="rate") {
 newDest[index][field] = parseFloat(value) || 0;
 } else {
 newDest[index][field] = value as never;
 }
 setDestinations(newDest);
 };

 const removeDestination = (index: number) => {
 setDestinations(destinations.filter((_, i) => i !== index));
 };

 const tripLengths = [7, 14, 21, 30];

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={Globe}
 title="Trip Budget Matrix"
 description="Comprehensive multi-destination travel budget converter matrix."
 actions={<ResetButton onClick={handleReset} label="Reset"/>}
 />

 <GlassCard>
 <CardHeader>
 <CardTitle>Budget Details</CardTitle>
 <CardDescription>Enter total budget and destination exchange rates</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2 max-w-sm">
 <Label>Total Budget (Home Currency)</Label>
 <Input type="number"value={homeBudget} onChange={(e) => setHomeBudget(parseFloat(e.target.value) || 0)} />
 </div>

 <div className="space-y-4 mt-6">
 <div className="flex justify-between items-center">
 <Label className="text-lg">Destinations (Max 4)</Label>
 <Button onClick={addDestination} variant="outline"size="sm"disabled={destinations.length >= 4}>
 Add Destination
 </Button>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 {destinations.map((dest, i) => (
 <div key={i} className="p-4 border rounded-md space-y-3 relative bg-muted/30">
 <Button variant="ghost"size="sm"className="absolute top-2 right-2 h-6 w-6 p-0"onClick={() => removeDestination(i)}>X</Button>
 <div className="space-y-1">
 <Label className="text-xs">Currency Name</Label>
 <Input value={dest.name} onChange={(e) => updateDestination(i,"name", e.target.value)} />
 </div>
 <div className="space-y-1">
 <Label className="text-xs">Exchange Rate (per 1 Home)</Label>
 <Input type="number"step="0.01"value={dest.rate} onChange={(e) => updateDestination(i,"rate", e.target.value)} />
 </div>
 </div>
 ))}
 </div>
 </div>
 <div className="pt-4">
 <Button onClick={saveToStorage}><Calculator className="w-4 h-4 mr-2"/> Save Configuration</Button>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Spending Matrix</CardTitle>
 <CardDescription>Daily breakdown by trip duration</CardDescription>
 </CardHeader>
 <CardContent className="overflow-x-auto">
 {destinations.length > 0 ? (
 <div className="min-w-[600px]">
 <table className="w-full text-sm text-left border-collapse">
 <thead className="bg-muted">
 <tr>
 <th className="p-3 border">Trip Length</th>
 {destinations.map((d, i) => (
 <th key={i} className="p-3 border">{d.name} Breakdown</th>
 ))}
 </tr>
 </thead>
 <tbody>
 {tripLengths.map((days) => (
 <tr key={days} className="border-b">
 <td className="p-3 border font-semibold">{days} Days<br/><span className="text-xs text-muted-foreground">({(homeBudget/days).toFixed(2)} Home/day)</span></td>
 {destinations.map((d, i) => {
 const dailyDest = (homeBudget * d.rate) / days;
 return (
 <td key={i} className="p-3 border">
 <div className="font-bold text-primary">{dailyDest.toFixed(2)} / day</div>
 <div className="text-xs text-muted-foreground mt-1">
 Accomm (40%): {(dailyDest * 0.4).toFixed(2)}<br/>
 Food (30%): {(dailyDest * 0.3).toFixed(2)}<br/>
 Activities (30%): {(dailyDest * 0.3).toFixed(2)}
 </div>
 </td>
 )
 })}
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 ) : (
 <div className="text-center p-8 text-muted-foreground">Add a destination to see the matrix.</div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 );
}
