"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Type, Sliders, Copy, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const PRESETS = [
  {
    name: "Default",
    settings: {
      fontSize: 48,
      fontSizeUnit: "px",
      fontWeight: "400",
      lineHeight: 1.5,
      letterSpacing: 0,
      textTransform: "none",
      color: "#ffffff",
      enableShadow: false,
      shadowColor: "#000000",
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowBlur: 4,
      enableStroke: false,
      strokeWidth: 1,
      strokeColor: "#000000",
      enableGradient: false,
      gradientStart: "#ff0000",
      gradientEnd: "#0000ff",
    },
  },
  {
    name: "Neon Glow",
    settings: {
      fontSize: 64,
      fontSizeUnit: "px",
      fontWeight: "700",
      lineHeight: 1.2,
      letterSpacing: 2,
      textTransform: "uppercase",
      color: "#ffffff",
      enableShadow: true,
      shadowColor: "#00ffff",
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 15,
      enableStroke: false,
      strokeWidth: 1,
      strokeColor: "#000000",
      enableGradient: false,
      gradientStart: "#ff0000",
      gradientEnd: "#0000ff",
    },
  },
  {
    name: "Retro 3D",
    settings: {
      fontSize: 72,
      fontSizeUnit: "px",
      fontWeight: "900",
      lineHeight: 1.1,
      letterSpacing: 0,
      textTransform: "uppercase",
      color: "#ffcc00",
      enableShadow: true,
      shadowColor: "#d35400",
      shadowOffsetX: 4,
      shadowOffsetY: 4,
      shadowBlur: 0,
      enableStroke: true,
      strokeWidth: 2,
      strokeColor: "#000000",
      enableGradient: false,
      gradientStart: "#ff0000",
      gradientEnd: "#0000ff",
    },
  },
  {
    name: "Gradient Headline",
    settings: {
      fontSize: 56,
      fontSizeUnit: "px",
      fontWeight: "800",
      lineHeight: 1.2,
      letterSpacing: -1,
      textTransform: "capitalize",
      color: "#ffffff",
      enableShadow: false,
      shadowColor: "#000000",
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
      enableStroke: false,
      strokeWidth: 1,
      strokeColor: "#000000",
      enableGradient: true,
      gradientStart: "#ff416c",
      gradientEnd: "#ff4b2b",
    },
  },
  {
    name: "Outline Stroke",
    settings: {
      fontSize: 80,
      fontSizeUnit: "px",
      fontWeight: "900",
      lineHeight: 1,
      letterSpacing: 4,
      textTransform: "uppercase",
      color: "transparent",
      enableShadow: false,
      shadowColor: "#000000",
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
      enableStroke: true,
      strokeWidth: 2,
      strokeColor: "#3498db",
      enableGradient: false,
      gradientStart: "#000000",
      gradientEnd: "#ffffff",
    },
  },
  {
    name: "Soft Elegant",
    settings: {
      fontSize: 42,
      fontSizeUnit: "px",
      fontWeight: "300",
      lineHeight: 1.6,
      letterSpacing: 3,
      textTransform: "lowercase",
      color: "#2c3e50",
      enableShadow: true,
      shadowColor: "#bdc3c7",
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      shadowBlur: 2,
      enableStroke: false,
      strokeWidth: 1,
      strokeColor: "#000000",
      enableGradient: false,
      gradientStart: "#000000",
      gradientEnd: "#ffffff",
    },
  },
];

export function CssTypographyClient() {
  const [text, setText] = useState("Toolzium Typography");
  const [settings, setSettings] = useState(PRESETS[0].settings);
  const [generatedCss, setGeneratedCss] = useState("");
  const [previewStyle, setPreviewStyle] = useState<React.CSSProperties>({});

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (presetName: string) => {
    const preset = PRESETS.find((p) => p.name === presetName);
    if (preset) {
      setSettings(preset.settings);
      toast.success("Applied preset: " + presetName);
    }
  };

  const generateCSSAndStyle = () => {
    let cssLines = [];
    const styleObj: any = {
      fontSize: settings.fontSize + settings.fontSizeUnit,
      fontWeight: settings.fontWeight,
      lineHeight: settings.lineHeight,
      letterSpacing: settings.letterSpacing + "px",
      textTransform: settings.textTransform,
      color: settings.color,
    };

    cssLines.push("font-size: " + settings.fontSize + settings.fontSizeUnit + ";");
    cssLines.push("font-weight: " + settings.fontWeight + ";");
    cssLines.push("line-height: " + settings.lineHeight + ";");
    if (settings.letterSpacing !== 0) {
      cssLines.push("letter-spacing: " + settings.letterSpacing + "px;");
    }
    if (settings.textTransform !== "none") {
      cssLines.push("text-transform: " + settings.textTransform + ";");
    }

    if (settings.enableShadow) {
      const shadowValue = settings.shadowOffsetX + "px " + settings.shadowOffsetY + "px " + settings.shadowBlur + "px " + settings.shadowColor;
      styleObj.textShadow = shadowValue;
      cssLines.push("text-shadow: " + shadowValue + ";");
    }

    if (settings.enableStroke) {
      const strokeValue = settings.strokeWidth + "px " + settings.strokeColor;
      styleObj.WebkitTextStroke = strokeValue;
      cssLines.push("-webkit-text-stroke: " + strokeValue + ";");
      
      // If color is transparent and no gradient, we need to ensure color is set for stroke to be visible properly
      if (settings.color === "transparent" && !settings.enableGradient) {
        cssLines.push("color: transparent;");
      } else if (!settings.enableGradient) {
         cssLines.push("color: " + settings.color + ";");
      }
    } else if (!settings.enableGradient) {
       cssLines.push("color: " + settings.color + ";");
    }

    if (settings.enableGradient) {
      const gradientVal = "linear-gradient(45deg, " + settings.gradientStart + ", " + settings.gradientEnd + ")";
      styleObj.backgroundImage = gradientVal;
      styleObj.WebkitBackgroundClip = "text";
      styleObj.WebkitTextFillColor = "transparent";
      
      cssLines.push("background: " + gradientVal + ";");
      cssLines.push("-webkit-background-clip: text;");
      cssLines.push("-webkit-text-fill-color: transparent;");
    }

    setPreviewStyle(styleObj);
    setGeneratedCss(".typography-preview {\n  " + cssLines.join("\n  ") + "\n}");
  };

  useEffect(() => {
    generateCSSAndStyle();
  }, [settings]);

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Type}
        title="CSS Typography Generator"
        description="Create beautiful text effects, gradients, and strokes with live preview and CSS code generation."
        actions={
          <div className="flex gap-2">
            <ResetButton onClick={() => setSettings(PRESETS[0].settings)} label="Reset" />
          </div>
        }
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Typography Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Preview Text</Label>
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter preview text"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={settings.fontSize}
                      onChange={(e) => handleSettingChange("fontSize", e.target.value)}
                    />
                    <Select
                      value={settings.fontSizeUnit}
                      onValueChange={(val) => handleSettingChange("fontSizeUnit", val)}
                    >
                      <SelectTrigger className="w-[80px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="px">px</SelectItem>
                        <SelectItem value="rem">rem</SelectItem>
                        <SelectItem value="em">em</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Font Weight</Label>
                  <Select
                    value={settings.fontWeight}
                    onValueChange={(val) => handleSettingChange("fontWeight", val)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100 - Thin</SelectItem>
                      <SelectItem value="300">300 - Light</SelectItem>
                      <SelectItem value="400">400 - Normal</SelectItem>
                      <SelectItem value="600">600 - Semi Bold</SelectItem>
                      <SelectItem value="700">700 - Bold</SelectItem>
                      <SelectItem value="900">900 - Black</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Line Height</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={settings.lineHeight}
                    onChange={(e) => handleSettingChange("lineHeight", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Letter Spacing (px)</Label>
                  <Input
                    type="number"
                    value={settings.letterSpacing}
                    onChange={(e) => handleSettingChange("letterSpacing", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Text Transform</Label>
                  <Select
                    value={settings.textTransform}
                    onValueChange={(val) => handleSettingChange("textTransform", val)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="uppercase">Uppercase</SelectItem>
                      <SelectItem value="lowercase">Lowercase</SelectItem>
                      <SelectItem value="capitalize">Capitalize</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.color === "transparent" ? "#ffffff" : settings.color}
                      onChange={(e) => handleSettingChange("color", e.target.value)}
                      disabled={settings.enableGradient || settings.color === "transparent"}
                      className="w-12 p-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSettingChange("color", settings.color === "transparent" ? "#000000" : "transparent")}
                      className="flex-1"
                    >
                      {settings.color === "transparent" ? "Set Solid" : "Set Transparent"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(preset.name)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Effects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base">Text Shadow</Label>
                  <Switch
                    checked={settings.enableShadow}
                    onCheckedChange={(val) => handleSettingChange("enableShadow", val)}
                  />
                </div>
                {settings.enableShadow && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Offset X</Label>
                      <Input
                        type="number"
                        value={settings.shadowOffsetX}
                        onChange={(e) => handleSettingChange("shadowOffsetX", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Offset Y</Label>
                      <Input
                        type="number"
                        value={settings.shadowOffsetY}
                        onChange={(e) => handleSettingChange("shadowOffsetY", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Blur</Label>
                      <Input
                        type="number"
                        value={settings.shadowBlur}
                        onChange={(e) => handleSettingChange("shadowBlur", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Shadow Color</Label>
                      <Input
                        type="color"
                        value={settings.shadowColor}
                        onChange={(e) => handleSettingChange("shadowColor", e.target.value)}
                        className="w-full p-1 h-10"
                      />
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base">Text Stroke</Label>
                  <Switch
                    checked={settings.enableStroke}
                    onCheckedChange={(val) => handleSettingChange("enableStroke", val)}
                  />
                </div>
                {settings.enableStroke && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Stroke Width (px)</Label>
                      <Input
                        type="number"
                        value={settings.strokeWidth}
                        onChange={(e) => handleSettingChange("strokeWidth", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Stroke Color</Label>
                      <Input
                        type="color"
                        value={settings.strokeColor}
                        onChange={(e) => handleSettingChange("strokeColor", e.target.value)}
                        className="w-full p-1 h-10"
                      />
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base">Text Gradient</Label>
                  <Switch
                    checked={settings.enableGradient}
                    onCheckedChange={(val) => handleSettingChange("enableGradient", val)}
                  />
                </div>
                {settings.enableGradient && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Color</Label>
                      <Input
                        type="color"
                        value={settings.gradientStart}
                        onChange={(e) => handleSettingChange("gradientStart", e.target.value)}
                        className="w-full p-1 h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Color</Label>
                      <Input
                        type="color"
                        value={settings.gradientEnd}
                        onChange={(e) => handleSettingChange("gradientEnd", e.target.value)}
                        className="w-full p-1 h-10"
                      />
                    </div>
                  </div>
                )}
              </div>

            </CardContent>
          </GlassCard>
        </div>
      </div>

      <GlassCard className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="min-h-[200px] flex items-center justify-center p-8 bg-zinc-950 rounded-xl overflow-hidden pattern-boxes border">
            <div style={previewStyle} className="text-center break-words max-w-full">
              {text || "Preview Text"}
            </div>
          </div>
        </CardContent>
      </GlassCard>

      <GlassCard>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>CSS Code</CardTitle>
          <CopyButton getText={() => generatedCss} label="Copy CSS" />
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm text-muted-foreground whitespace-pre-wrap">
            {generatedCss}
          </pre>
        </CardContent>
      </GlassCard>
    </div>
  );
}
