"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Circle, Sliders, Copy, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export function CssRadiusClient() {
  const [tlH, setTlH] = useState(50);
  const [trH, setTrH] = useState(50);
  const [brH, setBrH] = useState(50);
  const [blH, setBlH] = useState(50);
  const [tlV, setTlV] = useState(50);
  const [trV, setTrV] = useState(50);
  const [brV, setBrV] = useState(50);
  const [blV, setBlV] = useState(50);

  const [animated, setAnimated] = useState(false);

  const borderRadiusValue = tlH + "% " + trH + "% " + brH + "% " + blH + "% / " + tlV + "% " + trV + "% " + brV + "% " + blV + "%";

  const handleReset = () => {
    setTlH(50);
    setTrH(50);
    setBrH(50);
    setBlH(50);
    setTlV(50);
    setTrV(50);
    setBrV(50);
    setBlV(50);
    setAnimated(false);
    toast.success("Reset to defaults");
  };

  const applyPreset = (presetName: string) => {
    if (presetName === "Organic Blob") {
      setTlH(30); setTrH(70); setBrH(70); setBlH(30);
      setTlV(30); setTrV(30); setBrV(70); setBlV(70);
    } else if (presetName === "Pill") {
      setTlH(50); setTrH(50); setBrH(50); setBlH(50);
      setTlV(50); setTrV(50); setBrV(50); setBlV(50);
    } else if (presetName === "Card") {
      setTlH(5); setTrH(5); setBrH(5); setBlH(5);
      setTlV(5); setTrV(5); setBrV(5); setBlV(5);
    } else if (presetName === "Drop") {
      setTlH(50); setTrH(50); setBrH(5); setBlH(50);
      setTlV(50); setTrV(50); setBrV(5); setBlV(50);
    } else if (presetName === "Leaf") {
      setTlH(50); setTrH(5); setBrH(50); setBlH(5);
      setTlV(50); setTrV(5); setBrV(50); setBlV(5);
    } else if (presetName === "Badge") {
      setTlH(20); setTrH(80); setBrH(20); setBlH(80);
      setTlV(20); setTrV(80); setBrV(20); setBlV(80);
    }
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="CSS Border-Radius Custom Shape Generator"
        description="Generate 8-point fancy blob and custom CSS border-radius shapes."
        icon={Circle}
        actions={<ResetButton onClick={handleReset} label="Reset" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Controls</CardTitle>
            <CardDescription>Adjust the horizontal and vertical radii.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Top Left</Label>
                <div className="text-xs text-muted-foreground">{tlH}% / {tlV}%</div>
              </div>
              <div className="flex space-x-4">
                <Slider value={[tlH]} max={100} step={1} onValueChange={(val) => setTlH(val[0])} />
                <Slider value={[tlV]} max={100} step={1} onValueChange={(val) => setTlV(val[0])} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Top Right</Label>
                <div className="text-xs text-muted-foreground">{trH}% / {trV}%</div>
              </div>
              <div className="flex space-x-4">
                <Slider value={[trH]} max={100} step={1} onValueChange={(val) => setTrH(val[0])} />
                <Slider value={[trV]} max={100} step={1} onValueChange={(val) => setTrV(val[0])} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Bottom Right</Label>
                <div className="text-xs text-muted-foreground">{brH}% / {brV}%</div>
              </div>
              <div className="flex space-x-4">
                <Slider value={[brH]} max={100} step={1} onValueChange={(val) => setBrH(val[0])} />
                <Slider value={[brV]} max={100} step={1} onValueChange={(val) => setBrV(val[0])} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Bottom Left</Label>
                <div className="text-xs text-muted-foreground">{blH}% / {blV}%</div>
              </div>
              <div className="flex space-x-4">
                <Slider value={[blH]} max={100} step={1} onValueChange={(val) => setBlH(val[0])} />
                <Slider value={[blV]} max={100} step={1} onValueChange={(val) => setBlV(val[0])} />
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <Label htmlFor="animated-switch">Smooth Animation Preview</Label>
              <Switch id="animated-switch" checked={animated} onCheckedChange={setAnimated} />
            </div>

            <Separator />
            
            <div>
              <Label className="mb-2 block">Presets</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => applyPreset("Organic Blob")}>Organic Blob</Button>
                <Button variant="outline" size="sm" onClick={() => applyPreset("Drop")}>Drop</Button>
                <Button variant="outline" size="sm" onClick={() => applyPreset("Leaf")}>Leaf</Button>
                <Button variant="outline" size="sm" onClick={() => applyPreset("Badge")}>Badge</Button>
                <Button variant="outline" size="sm" onClick={() => applyPreset("Card")}>Card</Button>
              </div>
            </div>
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
              <div 
                className={"w-48 h-48 bg-primary/20 border-4 border-primary " + (animated ? "transition-all duration-500 ease-in-out" : "")}
                style={{ borderRadius: borderRadiusValue }}
              >
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>CSS Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative p-4 bg-muted rounded-md text-sm font-mono break-all">
                border-radius: {borderRadiusValue};
                <div className="absolute top-2 right-2">
                  <CopyButton getText={() => "border-radius: " + borderRadiusValue + ";"} label="Copy" />
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
