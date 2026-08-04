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
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Play, Sliders, Copy, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const PRESETS: Record<string, string> = {
  "ease": "ease",
  "linear": "linear",
  "ease-in": "ease-in",
  "ease-out": "ease-out",
  "ease-in-out": "ease-in-out",
  "bounce-out": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "elastic": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  "overshoot": "cubic-bezier(0.34, 1.56, 0.64, 1)"
};

export function CssKeyframesSpeedClient() {
  const [preset, setPreset] = useState("ease");
  const [customBezier, setCustomBezier] = useState("0.25, 0.1, 0.25, 1.0");
  const [duration, setDuration] = useState("1.5");
  const [iterations, setIterations] = useState("infinite");
  const [fillMode, setFillMode] = useState("none");
  const [animating, setAnimating] = useState(false);
  const [key, setKey] = useState(0);

  const activeTiming = PRESETS[preset] || "cubic-bezier(" + customBezier + ")";
  const cssSnippet = "animation: slideRight " + duration + "s " + activeTiming + " " + iterations + " " + fillMode + ";";

  const handlePlay = () => {
    setAnimating(true);
    setKey(prev => prev + 1);
  };

  const handleReset = () => {
    setPreset("ease");
    setCustomBezier("0.25, 0.1, 0.25, 1.0");
    setDuration("1.5");
    setIterations("infinite");
    setFillMode("none");
    setAnimating(false);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Sliders}
        title="CSS Keyframe Visual Curve & Speed Builder"
        description="Visual CSS keyframe animation timing curve builder."
        actions={<ResetButton onClick={handleReset} label="Reset" />}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Adjust timing and speed parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Easing Preset</Label>
              <Select value={preset} onValueChange={(val) => { setPreset(val); if (val === "custom") setCustomBezier("0,0,1,1"); }}>
                <SelectTrigger><SelectValue placeholder="Select preset" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ease">Ease</SelectItem>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="ease-in">Ease In</SelectItem>
                  <SelectItem value="ease-out">Ease Out</SelectItem>
                  <SelectItem value="ease-in-out">Ease In Out</SelectItem>
                  <SelectItem value="bounce-out">Bounce Out</SelectItem>
                  <SelectItem value="elastic">Elastic</SelectItem>
                  <SelectItem value="overshoot">Overshoot</SelectItem>
                  <SelectItem value="custom">Custom Cubic Bezier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {preset === "custom" && (
              <div className="space-y-2">
                <Label>Cubic Bezier (x1, y1, x2, y2)</Label>
                <Input value={customBezier} onChange={(e) => setCustomBezier(e.target.value)} placeholder="0.25, 0.1, 0.25, 1" />
              </div>
            )}

            <div className="space-y-2">
              <Label>Duration (s)</Label>
              <Input type="number" step="0.1" min="0" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Iterations</Label>
              <Input type="text" value={iterations} onChange={(e) => setIterations(e.target.value)} placeholder="infinite, 1, 2..." />
            </div>

            <div className="space-y-2">
              <Label>Fill Mode</Label>
              <Select value={fillMode} onValueChange={setFillMode}>
                <SelectTrigger><SelectValue placeholder="Select fill mode" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="forwards">Forwards</SelectItem>
                  <SelectItem value="backwards">Backwards</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <ActionButton onClick={handlePlay} icon={Play} label="Play Animation" />
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
            <GlassCard>
            <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>Live animation preview</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative h-32 bg-secondary rounded-md overflow-hidden flex items-center p-4">
                    <style>
                        {"@keyframes slideRight { from { transform: translateX(0); } to { transform: translateX(200px); } }"}
                    </style>
                    <div
                        key={key}
                        className={"w-12 h-12 bg-primary rounded-lg shadow-lg " + (animating ? "" : "opacity-50")}
                        style={{
                          animation: animating ? cssSnippet : "none"
                        }}
                    />
                </div>
            </CardContent>
            </GlassCard>

            <GlassCard>
            <CardHeader>
                <CardTitle>CSS Output</CardTitle>
                <CardDescription>Generated CSS code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-secondary p-4 rounded-md font-mono text-sm break-all">
                {cssSnippet}
                </div>
                <CopyButton getText={() => cssSnippet} label="Copy CSS" />
            </CardContent>
            </GlassCard>
        </div>
      </div>
    </div>
  );
}
