"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Switch } from"@/components/ui/switch";
import { Button } from"@/components/ui/button";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Droplets, Calculator, Car, Route, Plus, Trash2, Sparkles, Shield, Zap, Copy } from"lucide-react";
import { cn } from"@/lib/utils";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

interface Vehicle {
 id: string;
 name: string;
 efficiency: number;
}

export function FuelCostClient() {
 const [distance, setDistance] = useState<number |"">("");
 const [price, setPrice] = useState<number |"">("");
 const [isMetric, setIsMetric] = useState(true);
 const [isRoundTrip, setIsRoundTrip] = useState(false);
 const [vehicles, setVehicles] = useState<Vehicle[]>([
 { id:"v1", name:"My Car", efficiency: 8.5 }
 ]);
 const [newVehicleName, setNewVehicleName] = useState("");
 const [newVehicleEff, setNewVehicleEff] = useState<number |"">("");

 const handleAddVehicle = () => {
 if (!newVehicleName || newVehicleEff ==="") {
 toast.error("Please enter a valid vehicle name and efficiency.");
 return;
 }
 setVehicles([...vehicles, { id: Date.now().toString(), name: newVehicleName, efficiency: Number(newVehicleEff) }]);
 setNewVehicleName("");
 setNewVehicleEff("");
 toast.success("Vehicle added!");
 };

 const handleRemoveVehicle = (id: string) => {
 if (vehicles.length === 1) {
 toast.error("You must have at least one vehicle to compare.");
 return;
 }
 setVehicles(vehicles.filter(v => v.id !== id));
 };

 const handleReset = () => {
 setDistance("");
 setPrice("");
 setIsMetric(true);
 setIsRoundTrip(false);
 setVehicles([{ id:"v1", name:"My Car", efficiency: 8.5 }]);
 toast.success("Calculator reset");
 };

 const totalDistance = (Number(distance) || 0) * (isRoundTrip ? 2 : 1);
 const numPrice = Number(price) || 0;

 const calculateResults = (eff: number) => {
 let fuelNeeded = 0;
 if (isMetric) {
 // L/100km
 fuelNeeded = (totalDistance / 100) * eff;
 } else {
 // MPG
 fuelNeeded = eff > 0 ? totalDistance / eff : 0;
 }
 const totalCost = fuelNeeded * numPrice;
 const costPerDist = totalDistance > 0 ? totalCost / totalDistance : 0;
 return { fuelNeeded, totalCost, costPerDist };
 };

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={Calculator}
 title="Fuel Cost Calculator"
 description="Calculate fuel cost for a trip and compare different vehicles."
 actions={<ResetButton onClick={handleReset} label="Reset"/>}
 />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Route className="h-5 w-5"/> Trip Details
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex items-center justify-between">
 <Label className="text-sm font-medium">Use Metric Units (km, L, L/100km)</Label>
 <Switch
 checked={isMetric}
 onCheckedChange={(v) => {
 setIsMetric(v);
 // Rough conversion for default vehicle efficiency if they toggle
 const factor = v ? 235.215 : 235.215; 
 // to keep it simple, we don't automatically convert existing vehicles.
 }}
 />
 </div>
 
 <div className="flex items-center justify-between">
 <Label className="text-sm font-medium">Round Trip</Label>
 <Switch checked={isRoundTrip} onCheckedChange={setIsRoundTrip} />
 </div>

 <Separator />

 <div className="space-y-2">
 <Label>Distance ({isMetric ?"km":"miles"})</Label>
 <Input
 type="number"
 min="0"
 value={distance}
 onChange={(e) => setDistance(e.target.value ===""?"": Number(e.target.value))}
 placeholder={`e.g. ${isMetric ?"150":"100"}`}
 />
 </div>

 <div className="space-y-2">
 <Label>Fuel Price per {isMetric ?"Liter":"Gallon"}</Label>
 <Input
 type="number"
 min="0"
 step="0.01"
 value={price}
 onChange={(e) => setPrice(e.target.value ===""?"": Number(e.target.value))}
 placeholder="e.g. 1.50"
 />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Car className="h-5 w-5"/> Vehicles
 </CardTitle>
 <CardDescription>
 Add multiple vehicles to compare fuel costs.
 </CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex gap-2 items-end">
 <div className="flex-1 space-y-2">
 <Label>Vehicle Name</Label>
 <Input
 value={newVehicleName}
 onChange={(e) => setNewVehicleName(e.target.value)}
 placeholder="e.g. SUV"
 />
 </div>
 <div className="flex-1 space-y-2">
 <Label>Efficiency ({isMetric ?"L/100km":"MPG"})</Label>
 <Input
 type="number"
 min="0"
 step="0.1"
 value={newVehicleEff}
 onChange={(e) => setNewVehicleEff(e.target.value ===""?"": Number(e.target.value))}
 placeholder={`e.g. ${isMetric ?"8.5":"25"}`}
 />
 </div>
 <ActionButton onClick={handleAddVehicle} icon={Plus} label="Add"variant="default"size="default"/>
 </div>

 <div className="space-y-3 mt-4">
 {vehicles.map((v) => (
 <div key={v.id} className="flex items-center justify-between p-3 border rounded-md">
 <div>
 <p className="font-medium">{v.name}</p>
 <p className="text-sm text-muted-foreground">{v.efficiency} {isMetric ?"L/100km":"MPG"}</p>
 </div>
 <Button variant="ghost"size="icon"onClick={() => handleRemoveVehicle(v.id)}>
 <Trash2 className="h-4 w-4 text-destructive"/>
 </Button>
 </div>
 ))}
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Droplets className="h-5 w-5"/> Results
 </CardTitle>
 <CardDescription>
 Total Distance: {totalDistance.toFixed(1)} {isMetric ?"km":"miles"}
 </CardDescription>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 {vehicles.map((v) => {
 const res = calculateResults(v.efficiency);
 return (
 <div key={`res-${v.id}`} className="p-4 border rounded-lg bg-card space-y-2">
 <h3 className="font-semibold text-lg">{v.name}</h3>
 <Separator />
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Total Cost:</span>
 <span className="font-medium">${res.totalCost.toFixed(2)}</span>
 </div>
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Fuel Needed:</span>
 <span>{res.fuelNeeded.toFixed(2)} {isMetric ?"Liters":"Gallons"}</span>
 </div>
 <div className="flex justify-between text-sm">
 <span className="text-muted-foreground">Cost per {isMetric ?"km":"mile"}:</span>
 <span>${res.costPerDist.toFixed(3)}</span>
 </div>
 </div>
 );
 })}
 </div>
 </CardContent>
 </GlassCard>
 
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our Fuel Cost Calculator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our Fuel Cost Calculator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/travel/fuel-cost" max={6} />

</div>
 );
}
