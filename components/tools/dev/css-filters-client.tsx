"use client";

import { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Sliders, Image as ImageIcon, Copy, RefreshCw } from "lucide-react";

const defaultFilters = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  hueRotate: 0,
  invert: 0,
  opacity: 100,
  saturate: 100,
  sepia: 0,
};

const presets = {
  "Vintage": { ...defaultFilters, sepia: 50, contrast: 120, brightness: 90 },
  "Sepia Glow": { ...defaultFilters, sepia: 80, brightness: 110, saturate: 120 },
  "High Contrast": { ...defaultFilters, contrast: 150, saturate: 150 },
  "Cyberpunk": { ...defaultFilters, hueRotate: 180, saturate: 200, brightness: 110, contrast: 120 },
  "Black & White": { ...defaultFilters, grayscale: 100, contrast: 120 },
  "Soft Blur": { ...defaultFilters, blur: 5, brightness: 110, opacity: 90 },
};

export function CssFiltersClient() {
  const [filters, setFilters] = useState(defaultFilters);
  const [dropShadow, setDropShadow] = useState({ active: false, x: 0, y: 0, blur: 0, color: "#000000" });
  
  const generateCss = () => {
    const parts = [];
    if (filters.blur > 0) parts.push("blur(" + filters.blur + "px)");
    if (filters.brightness !== 100) parts.push("brightness(" + filters.brightness + "%)");
    if (filters.contrast !== 100) parts.push("contrast(" + filters.contrast + "%)");
    if (filters.grayscale > 0) parts.push("grayscale(" + filters.grayscale + "%)");
    if (filters.hueRotate !== 0) parts.push("hue-rotate(" + filters.hueRotate + "deg)");
    if (filters.invert > 0) parts.push("invert(" + filters.invert + "%)");
    if (filters.opacity !== 100) parts.push("opacity(" + filters.opacity + "%)");
    if (filters.saturate !== 100) parts.push("saturate(" + filters.saturate + "%)");
    if (filters.sepia > 0) parts.push("sepia(" + filters.sepia + "%)");
    if (dropShadow.active) parts.push("drop-shadow(" + dropShadow.x + "px " + dropShadow.y + "px " + dropShadow.blur + "px " + dropShadow.color + ")");
    return parts.length > 0 ? "filter: " + parts.join(" ") + ";" : "filter: none;";
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setDropShadow({ active: false, x: 0, y: 0, blur: 0, color: "#000000" });
  };

  const css = generateCss();

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        icon={Sliders} 
        title="CSS Filter Generator" 
        description="Visually generate and preview CSS filter effects for images." 
        actions={
          <>
            <CopyButton getText={() => css} label="Copy CSS" />
            <ResetButton onClick={handleReset} label="Reset" />
          </>
        } 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Filter Settings</CardTitle>
            <CardDescription>Adjust the sliders to apply filters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Presets</Label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(presets).map((preset) => (
                  <Button 
                    key={preset} 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setFilters((presets as any)[preset])}
                  >
                    {preset}
                  </Button>
                ))}
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Blur (px)</Label>
                  <span className="text-xs text-muted-foreground">{filters.blur}px</span>
                </div>
                <input type="range" min="0" max="20" value={filters.blur} onChange={(e) => setFilters({...filters, blur: Number(e.target.value)})} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Brightness (%)</Label>
                  <span className="text-xs text-muted-foreground">{filters.brightness}%</span>
                </div>
                <input type="range" min="0" max="200" value={filters.brightness} onChange={(e) => setFilters({...filters, brightness: Number(e.target.value)})} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Contrast (%)</Label>
                  <span className="text-xs text-muted-foreground">{filters.contrast}%</span>
                </div>
                <input type="range" min="0" max="200" value={filters.contrast} onChange={(e) => setFilters({...filters, contrast: Number(e.target.value)})} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Grayscale (%)</Label>
                  <span className="text-xs text-muted-foreground">{filters.grayscale}%</span>
                </div>
                <input type="range" min="0" max="100" value={filters.grayscale} onChange={(e) => setFilters({...filters, grayscale: Number(e.target.value)})} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Hue Rotate (deg)</Label>
                  <span className="text-xs text-muted-foreground">{filters.hueRotate}deg</span>
                </div>
                <input type="range" min="0" max="360" value={filters.hueRotate} onChange={(e) => setFilters({...filters, hueRotate: Number(e.target.value)})} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Invert (%)</Label>
                  <span className="text-xs text-muted-foreground">{filters.invert}%</span>
                </div>
                <input type="range" min="0" max="100" value={filters.invert} onChange={(e) => setFilters({...filters, invert: Number(e.target.value)})} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Opacity (%)</Label>
                  <span className="text-xs text-muted-foreground">{filters.opacity}%</span>
                </div>
                <input type="range" min="0" max="100" value={filters.opacity} onChange={(e) => setFilters({...filters, opacity: Number(e.target.value)})} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Saturate (%)</Label>
                  <span className="text-xs text-muted-foreground">{filters.saturate}%</span>
                </div>
                <input type="range" min="0" max="200" value={filters.saturate} onChange={(e) => setFilters({...filters, saturate: Number(e.target.value)})} className="w-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Sepia (%)</Label>
                  <span className="text-xs text-muted-foreground">{filters.sepia}%</span>
                </div>
                <input type="range" min="0" max="100" value={filters.sepia} onChange={(e) => setFilters({...filters, sepia: Number(e.target.value)})} className="w-full" />
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Drop Shadow</Label>
                <input type="checkbox" checked={dropShadow.active} onChange={(e) => setDropShadow({...dropShadow, active: e.target.checked})} />
              </div>
              {dropShadow.active && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>X Offset (px)</Label>
                      <span className="text-xs text-muted-foreground">{dropShadow.x}px</span>
                    </div>
                    <input type="range" min="-50" max="50" value={dropShadow.x} onChange={(e) => setDropShadow({...dropShadow, x: Number(e.target.value)})} className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Y Offset (px)</Label>
                      <span className="text-xs text-muted-foreground">{dropShadow.y}px</span>
                    </div>
                    <input type="range" min="-50" max="50" value={dropShadow.y} onChange={(e) => setDropShadow({...dropShadow, y: Number(e.target.value)})} className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Blur (px)</Label>
                      <span className="text-xs text-muted-foreground">{dropShadow.blur}px</span>
                    </div>
                    <input type="range" min="0" max="50" value={dropShadow.blur} onChange={(e) => setDropShadow({...dropShadow, blur: Number(e.target.value)})} className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label>Color</Label>
                    <Input type="color" value={dropShadow.color} onChange={(e) => setDropShadow({...dropShadow, color: e.target.value})} className="h-10" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full aspect-video rounded-lg overflow-hidden border border-border flex items-center justify-center bg-muted">
                <img 
                  src="https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=800&auto=format&fit=crop" 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  style={{ filter: css.replace("filter: ", "").replace(";", "") }} 
                />
              </div>
            </CardContent>
          </GlassCard>
          
          <GlassCard>
            <CardHeader>
              <CardTitle>CSS Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="p-4 rounded-lg bg-muted overflow-x-auto text-sm font-mono">
                  {css}
                </pre>
                <div className="absolute top-2 right-2">
                  <CopyButton getText={() => css} label="" />
                </div>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
