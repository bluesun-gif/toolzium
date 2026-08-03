"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Palette, Copy, Shuffle, Eye, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type ColorStop = { id: string; color: string; position: number };
type GradientType = "linear" | "radial";

const presets = [
  { name: "Sunrise", type: "linear" as GradientType, angle: 45, stops: [{ id: "1", color: "#ff9a9e", position: 0 }, { id: "2", color: "#fecfef", position: 99 }, { id: "3", color: "#fecfef", position: 100 }] },
  { name: "Ocean", type: "linear" as GradientType, angle: 90, stops: [{ id: "1", color: "#2E3192", position: 0 }, { id: "2", color: "#1BFFFF", position: 100 }] },
  { name: "Purple Haze", type: "linear" as GradientType, angle: 135, stops: [{ id: "1", color: "#9D50BB", position: 0 }, { id: "2", color: "#6E48AA", position: 100 }] },
  { name: "Forest", type: "linear" as GradientType, angle: 180, stops: [{ id: "1", color: "#11998e", position: 0 }, { id: "2", color: "#38ef7d", position: 100 }] },
  { name: "Sunset", type: "linear" as GradientType, angle: 45, stops: [{ id: "1", color: "#f12711", position: 0 }, { id: "2", color: "#f5af19", position: 100 }] },
];

export function GradientGeneratorClient() {
  const [type, setType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(90);
  const [stops, setStops] = useState<ColorStop[]>([
    { id: "1", color: "#3b82f6", position: 0 },
    { id: "2", color: "#8b5cf6", position: 100 },
  ]);

  const cssGradient = type === "linear" 
    ? `linear-gradient(${angle}deg, ${stops.map(s => `${s.color} ${s.position}%`).join(", ")})`
    : `radial-gradient(circle, ${stops.map(s => `${s.color} ${s.position}%`).join(", ")})`;

  // Simple Tailwind generator for 2-3 stops (approximate)
  let tailwindClasses = "";
  if (type === "linear") {
    let dir = "bg-gradient-to-r";
    if (angle >= 0 && angle < 45) dir = "bg-gradient-to-t";
    else if (angle >= 45 && angle < 135) dir = "bg-gradient-to-r";
    else if (angle >= 135 && angle < 225) dir = "bg-gradient-to-b";
    else if (angle >= 225 && angle < 315) dir = "bg-gradient-to-l";
    
    tailwindClasses = dir;
    if (stops.length > 0) tailwindClasses += ` from-[${stops[0].color}]`;
    if (stops.length > 2) tailwindClasses += ` via-[${stops[1].color}]`;
    if (stops.length > 1) tailwindClasses += ` to-[${stops[stops.length-1].color}]`;
  } else {
    tailwindClasses = `bg-[${cssGradient}]`; // Fallback for radial
  }

  const handleAddStop = () => {
    if (stops.length >= 5) {
      toast.error("Maximum 5 color stops allowed");
      return;
    }
    const newId = Math.random().toString(36).substr(2, 9);
    setStops([...stops, { id: newId, color: "#ffffff", position: 50 }].sort((a, b) => a.position - b.position));
  };

  const handleRemoveStop = (id: string) => {
    if (stops.length <= 2) {
      toast.error("Minimum 2 color stops required");
      return;
    }
    setStops(stops.filter(s => s.id !== id));
  };

  const updateStop = (id: string, updates: Partial<ColorStop>) => {
    setStops(stops.map(s => s.id === id ? { ...s, ...updates } : s).sort((a, b) => a.position - b.position));
  };

  const loadPreset = (preset: typeof presets[0]) => {
    setType(preset.type);
    setAngle(preset.angle);
    setStops(preset.stops);
  };

  const generateRandom = () => {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setAngle(Math.floor(Math.random() * 360));
    setStops([
      { id: "1", color: randomColor(), position: 0 },
      { id: "2", color: randomColor(), position: 100 }
    ]);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        icon={Palette}
        title="Color Gradient Generator"
        description="Create and customize beautiful CSS gradients for your next project."
        actions={
          <>
            <ActionButton onClick={generateRandom} icon={Shuffle} label="Random" variant="outline" />
            <CopyButton getText={() => `background: ${cssGradient};`} label="Copy CSS" />
          </>
        }
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="w-full h-48 md:h-64 rounded-xl border border-border shadow-inner transition-all duration-300"
                style={{ background: cssGradient }}
              />
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>Generated Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-muted-foreground mb-2 block">CSS</Label>
                <div className="flex items-center gap-2">
                  <Input readOnly value={`background: ${cssGradient};`} className="font-mono text-xs" />
                  <CopyButton getText={() => `background: ${cssGradient};`} label="Copy" />
                </div>
              </div>
              <Separator />
              <div>
                <Label className="text-muted-foreground mb-2 block">Tailwind CSS</Label>
                <div className="flex items-center gap-2">
                  <Input readOnly value={tailwindClasses} className="font-mono text-xs" />
                  <CopyButton getText={() => tailwindClasses} label="Copy" />
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={type} onValueChange={(v: GradientType) => setType(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linear">Linear</SelectItem>
                      <SelectItem value="radial">Radial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {type === "linear" && (
                  <div className="space-y-2">
                    <Label>Angle ({angle}°)</Label>
                    <Input 
                      type="number" 
                      min={0} max={360} 
                      value={angle} 
                      onChange={(e) => setAngle(Number(e.target.value))} 
                    />
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Color Stops</Label>
                  <Button variant="outline" size="sm" onClick={handleAddStop}>
                    <Plus className="w-4 h-4 mr-1" /> Add Stop
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {stops.map((stop) => (
                    <div key={stop.id} className="flex items-center gap-3">
                      <Input 
                        type="color" 
                        value={stop.color} 
                        onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input 
                        type="text" 
                        value={stop.color.toUpperCase()} 
                        onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                        className="font-mono w-28 uppercase"
                      />
                      <div className="flex-1 flex items-center gap-2">
                        <Input 
                          type="range" 
                          min={0} max={100} 
                          value={stop.position} 
                          onChange={(e) => updateStop(stop.id, { position: Number(e.target.value) })}
                          className="w-full"
                        />
                        <span className="text-xs text-muted-foreground w-8">{stop.position}%</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveStop(stop.id)}
                        disabled={stops.length <= 2}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {presets.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => loadPreset(preset)}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors bg-card/50"
                  >
                    <div 
                      className="w-full h-12 rounded-md" 
                      style={{ 
                        background: preset.type === 'linear' 
                          ? `linear-gradient(${preset.angle}deg, ${preset.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
                          : `radial-gradient(circle, ${preset.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
                      }} 
                    />
                    <span className="text-xs font-medium">{preset.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
