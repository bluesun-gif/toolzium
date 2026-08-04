"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Maximize2 } from "lucide-react";
import { toast } from "react-hot-toast";

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export function AspectRatioClient() {
  const [width, setWidth] = useState<string>("1920");
  const [height, setHeight] = useState<string>("1080");
  const [ratio, setRatio] = useState<string>("16:9");
  
  const [scaleWidth, setScaleWidth] = useState<string>("");
  const [scaleHeight, setScaleHeight] = useState<string>("");

  useEffect(() => {
    const w = parseInt(width);
    const h = parseInt(height);
    if (w && h) {
      const divisor = gcd(w, h);
      setRatio(`${w / divisor}:${h / divisor}`);
    } else {
      setRatio("");
    }
  }, [width, height]);

  const handleScaleWidthChange = (val: string) => {
    setScaleWidth(val);
    const w = parseInt(width);
    const h = parseInt(height);
    const sW = parseInt(val);
    if (w && h && sW) {
      setScaleHeight(Math.round((sW * h) / w).toString());
    } else {
      setScaleHeight("");
    }
  };

  const handleScaleHeightChange = (val: string) => {
    setScaleHeight(val);
    const w = parseInt(width);
    const h = parseInt(height);
    const sH = parseInt(val);
    if (w && h && sH) {
      setScaleWidth(Math.round((sH * w) / h).toString());
    } else {
      setScaleWidth("");
    }
  };

  const setPreset = (w: string, h: string) => {
    setWidth(w);
    setHeight(h);
    setScaleWidth("");
    setScaleHeight("");
  };

  const handleReset = () => {
    setWidth("1920");
    setHeight("1080");
    setScaleWidth("");
    setScaleHeight("");
    toast.success("Reset calculator");
  };

  const getResultsText = () => {
    return `Resolution: ${width}x${height}\nAspect Ratio: ${ratio}${scaleWidth && scaleHeight ? `\nScaled: ${scaleWidth}x${scaleHeight}` : ''}`;
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Maximize2}
        title="Aspect Ratio Calculator"
        description="Calculate aspect ratios for any resolution and scale dimensions."
        actions={
          <>
            <CopyButton getText={getResultsText} label="Copy Results" />
            <ResetButton onClick={handleReset} label="Reset" />
          </>
        }
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Base Resolution</CardTitle>
            <CardDescription>Enter width and height to calculate aspect ratio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Width (W)</Label>
                <Input type="number" value={width} onChange={e => setWidth(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Height (H)</Label>
                <Input type="number" value={height} onChange={e => setHeight(e.target.value)} />
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
              <span className="font-medium">Aspect Ratio:</span>
              <span className="text-xl font-bold text-primary">{ratio || "-"}</span>
            </div>

            <Separator />
            
            <div className="space-y-3">
              <Label>Common Presets</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setPreset("1920", "1080")}>16:9 (HD)</Button>
                <Button variant="outline" size="sm" onClick={() => setPreset("1024", "768")}>4:3</Button>
                <Button variant="outline" size="sm" onClick={() => setPreset("2560", "1080")}>21:9</Button>
                <Button variant="outline" size="sm" onClick={() => setPreset("1080", "1080")}>1:1</Button>
                <Button variant="outline" size="sm" onClick={() => setPreset("1080", "1920")}>9:16 (Vertical)</Button>
              </div>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle>Scale Dimensions</CardTitle>
            <CardDescription>Find new dimensions maintaining the {ratio || "-"} ratio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Target Width</Label>
                <Input type="number" value={scaleWidth} onChange={e => handleScaleWidthChange(e.target.value)} placeholder="e.g. 1280" />
              </div>
              <div className="space-y-2">
                <Label>Target Height</Label>
                <Input type="number" value={scaleHeight} onChange={e => handleScaleHeightChange(e.target.value)} placeholder="e.g. 720" />
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <div className="relative border-2 border-primary/20 rounded-md bg-muted/20" style={{ width: '200px', height: `${width && height && parseInt(width) > 0 ? (parseInt(height)/parseInt(width))*200 : 200}px`, maxHeight: '300px', maxWidth: '100%' }}>
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 text-sm font-medium">
                  Preview ({ratio})
                </div>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
