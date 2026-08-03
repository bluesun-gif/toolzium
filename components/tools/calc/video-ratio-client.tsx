"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResetButton } from "@/components/shared/action-buttons";
import { Monitor, Calculator, Maximize2, ArrowLeftRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const PRESETS = [
  { name: "Custom", width: 1920, height: 1080 },
  { name: "4K UHD (16:9)", width: 3840, height: 2160 },
  { name: "1080p HD (16:9)", width: 1920, height: 1080 },
  { name: "720p HD (16:9)", width: 1280, height: 720 },
  { name: "480p SD (16:9)", width: 854, height: 480 },
  { name: "Instagram Story (9:16)", width: 1080, height: 1920 },
  { name: "TikTok (9:16)", width: 1080, height: 1920 },
  { name: "YouTube Shorts (9:16)", width: 1080, height: 1920 },
  { name: "Ultrawide (21:9)", width: 2560, height: 1080 },
];

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function VideoRatioClient() {
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [preset, setPreset] = useState<string>("1080p HD (16:9)");

  const [scaleWidth, setScaleWidth] = useState<number>(1920);
  const [scaleHeight, setScaleHeight] = useState<number>(1080);

  const handlePresetChange = (val: string) => {
    setPreset(val);
    const selected = PRESETS.find((p) => p.name === val);
    if (selected && val !== "Custom") {
      setWidth(selected.width);
      setHeight(selected.height);
      setScaleWidth(selected.width);
      setScaleHeight(selected.height);
    }
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    setPreset("Custom");
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    setPreset("Custom");
  };

  const handleScaleWidthChange = (val: number) => {
    setScaleWidth(val);
    if (width && height) {
      setScaleHeight(Math.round((val * height) / width));
    }
  };

  const handleScaleHeightChange = (val: number) => {
    setScaleHeight(val);
    if (width && height) {
      setScaleWidth(Math.round((val * width) / height));
    }
  };

  const handleReset = () => {
    setPreset("1080p HD (16:9)");
    setWidth(1920);
    setHeight(1080);
    setScaleWidth(1920);
    setScaleHeight(1080);
  };

  const divisor = width && height ? gcd(width, height) : 1;
  const ratioX = width ? width / divisor : 0;
  const ratioY = height ? height / divisor : 0;
  const ratioStr = ratioX && ratioY ? `${ratioX}:${ratioY}` : "0:0";
  const pixels = width * height;
  const megapixels = (pixels / 1000000).toFixed(2);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="Aspect Ratio Calculator for Video"
        description="Calculate video aspect ratios, resolutions, and properly scale dimensions."
        icon={Monitor}
        actions={<ResetButton onClick={handleReset} />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" /> Base Resolution
            </CardTitle>
            <CardDescription>
              Enter dimensions or choose a preset
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Presets</Label>
              <Select value={preset} onValueChange={handlePresetChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a preset" />
                </SelectTrigger>
                <SelectContent>
                  {PRESETS.map((p) => (
                    <SelectItem key={p.name} value={p.name}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Width (px)</Label>
                <Input
                  type="number"
                  value={width || ""}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Height (px)</Label>
                <Input
                  type="number"
                  value={height || ""}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                />
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Aspect Ratio</p>
                <p className="text-2xl font-bold">{ratioStr}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Pixels</p>
                <p className="text-xl font-semibold">
                  {pixels.toLocaleString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Megapixels</p>
                <p className="text-xl font-semibold">{megapixels} MP</p>
              </div>
            </div>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Maximize2 className="h-5 w-5" /> Scale Calculator
            </CardTitle>
            <CardDescription>
              Scale while maintaining the {ratioStr} aspect ratio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>New Width (px)</Label>
              <Input
                type="number"
                value={scaleWidth || ""}
                onChange={(e) => handleScaleWidthChange(Number(e.target.value))}
              />
            </div>
            <div className="flex justify-center">
              <ArrowLeftRight className="h-6 w-6 text-muted-foreground transform rotate-90" />
            </div>
            <div className="space-y-2">
              <Label>New Height (px)</Label>
              <Input
                type="number"
                value={scaleHeight || ""}
                onChange={(e) =>
                  handleScaleHeightChange(Number(e.target.value))
                }
              />
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
