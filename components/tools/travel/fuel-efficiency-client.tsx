"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Droplets, ArrowLeftRight, Truck, Leaf } from "lucide-react";

export function FuelEfficiencyClient() {
  const [mpgUS, setMpgUS] = useState<string>("30");

  const convertFromMpgUS = (val: number) => {
    return {
      mpgUS: val,
      mpgUK: val * 1.20095,
      lPer100km: val > 0 ? 235.215 / val : 0,
      kmPerL: val * 0.425144,
    };
  };

  const handleMpgUSChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMpgUS(e.target.value);
  };

  const handleMpgUKChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0;
    setMpgUS((val / 1.20095).toString());
  };

  const handleLPer100kmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0;
    setMpgUS(val > 0 ? (235.215 / val).toString() : "0");
  };

  const handleKmPerLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0;
    setMpgUS((val / 0.425144).toString());
  };

  const val = parseFloat(mpgUS) || 0;
  const values = convertFromMpgUS(val);

  const presets = [
    { label: "City Car", value: 40 },
    { label: "Sedan", value: 30 },
    { label: "SUV", value: 22 },
    { label: "Truck", value: 18 },
    { label: "Hybrid", value: 50 },
  ];

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Droplets}
        title="Fuel Efficiency Converter"
        description="Convert between fuel efficiency units: MPG (US), MPG (UK), L/100km, km/L instantly."
        actions={
          <>
            <ResetButton onClick={() => setMpgUS("30")} label="Reset" />
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Converter</CardTitle>
            <CardDescription>Enter a value in any unit to convert</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>MPG (US)</Label>
              <Input type="number" value={values.mpgUS || ""} onChange={handleMpgUSChange} />
            </div>
            <div className="space-y-2">
              <Label>MPG (UK)</Label>
              <Input type="number" value={values.mpgUK ? values.mpgUK.toFixed(2) : ""} onChange={handleMpgUKChange} />
            </div>
            <div className="space-y-2">
              <Label>L/100km</Label>
              <Input type="number" value={values.lPer100km ? values.lPer100km.toFixed(2) : ""} onChange={handleLPer100kmChange} />
            </div>
            <div className="space-y-2">
              <Label>km/L</Label>
              <Input type="number" value={values.kmPerL ? values.kmPerL.toFixed(2) : ""} onChange={handleKmPerLChange} />
            </div>
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Vehicle Presets</CardTitle>
              <CardDescription>Quick conversions for common vehicles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="outline"
                    onClick={() => setMpgUS(preset.value.toString())}
                  >
                    {preset.label} ({preset.value} MPG)
                  </Button>
                ))}
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              {val < 20 && <p className="text-red-500 font-semibold">Lower efficiency than average. Consider checking tire pressure.</p>}
              {val >= 20 && val < 35 && <p className="text-yellow-500 font-semibold">Average efficiency for a standard car.</p>}
              {val >= 35 && <p className="text-green-500 font-semibold">Great fuel efficiency! You are saving money and reducing emissions.</p>}
              <Separator className="my-4" />
              <div className="space-y-2 text-sm text-muted-foreground">
                <h4 className="font-semibold text-foreground flex items-center gap-2"><Leaf className="w-4 h-4" /> Tips for improving fuel efficiency:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Keep tires properly inflated.</li>
                  <li>Avoid aggressive driving (speeding, rapid acceleration/braking).</li>
                  <li>Remove excess weight from the vehicle.</li>
                  <li>Use cruise control on the highway.</li>
                </ul>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
