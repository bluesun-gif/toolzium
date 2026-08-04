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
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Layers, Sliders, Copy, RefreshCw, Plus, Trash2 } from "lucide-react";

type ShadowLayer = {
  id: string;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
};

export function CssShadowClient() {
  const [mode, setMode] = useState<"box" | "text">("box");
  const [shadows, setShadows] = useState<ShadowLayer[]>([
    { id: "1", offsetX: 10, offsetY: 10, blur: 15, spread: -3, color: "#000000", opacity: 0.1, inset: false }
  ]);

  const addShadow = () => {
    setShadows([...shadows, { id: Math.random().toString(), offsetX: 0, offsetY: 0, blur: 10, spread: 0, color: "#000000", opacity: 0.2, inset: false }]);
  };

  const removeShadow = (id: string) => {
    if (shadows.length > 1) {
      setShadows(shadows.filter(s => s.id !== id));
    }
  };

  const updateShadow = (id: string, field: keyof ShadowLayer, value: any) => {
    setShadows(shadows.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const hexToRgba = (hex: string, opacity: number) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "rgba(0, 0, 0, " + opacity + ")";
    return "rgba(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ", " + opacity + ")";
  };

  const generateShadowCss = () => {
    return shadows.map(s => {
      const colorStr = hexToRgba(s.color, s.opacity);
      if (mode === "box") {
        return (s.inset ? "inset " : "") + s.offsetX + "px " + s.offsetY + "px " + s.blur + "px " + s.spread + "px " + colorStr;
      } else {
        return s.offsetX + "px " + s.offsetY + "px " + s.blur + "px " + colorStr;
      }
    }).join(", ");
  };

  const cssString = (mode === "box" ? "box-shadow: " : "text-shadow: ") + generateShadowCss() + ";";

  const handleReset = () => {
    setShadows([{ id: "1", offsetX: 10, offsetY: 10, blur: 15, spread: -3, color: "#000000", opacity: 0.1, inset: false }]);
  };

  return (
    <div className={"space-y-6"}>
      <ToolPageHeader
        icon={Layers}
        title={"CSS Shadow Generator"}
        description={"Visual generator for box-shadow and text-shadow with multiple layers."}
        actions={
          <div className={"flex space-x-2"}>
            <ResetButton onClick={handleReset} label={"Reset"} />
            <CopyButton getText={() => cssString} label={"Copy CSS"} />
          </div>
        }
      />

      <div className={"grid gap-6 md:grid-cols-2"}>
        <GlassCard>
          <CardHeader>
            <CardTitle className={"flex items-center space-x-2"}>
              <Sliders className={"w-5 h-5"} />
              <span>{"Controls"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className={"space-y-6"}>
            <div className={"flex items-center space-x-4"}>
              <Label>{"Mode:"}</Label>
              <div className={"flex items-center space-x-2"}>
                <Button variant={mode === "box" ? "default" : "outline"} onClick={() => setMode("box")} size="sm">{"Box Shadow"}</Button>
                <Button variant={mode === "text" ? "default" : "outline"} onClick={() => setMode("text")} size="sm">{"Text Shadow"}</Button>
              </div>
            </div>

            {shadows.map((shadow, index) => (
              <div key={shadow.id} className={"p-4 border rounded-md space-y-4"}>
                <div className={"flex justify-between items-center"}>
                  <h4 className={"font-medium"}>{"Layer " + (index + 1)}</h4>
                  {shadows.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeShadow(shadow.id)}>
                      <Trash2 className={"w-4 h-4 text-red-500"} />
                    </Button>
                  )}
                </div>

                <div className={"grid grid-cols-2 gap-4"}>
                  <div className={"space-y-2"}>
                    <Label>{"Offset X (" + shadow.offsetX + "px)"}</Label>
                    <Input type="range" min="-100" max="100" value={shadow.offsetX} onChange={(e) => updateShadow(shadow.id, "offsetX", parseInt(e.target.value))} />
                  </div>
                  <div className={"space-y-2"}>
                    <Label>{"Offset Y (" + shadow.offsetY + "px)"}</Label>
                    <Input type="range" min="-100" max="100" value={shadow.offsetY} onChange={(e) => updateShadow(shadow.id, "offsetY", parseInt(e.target.value))} />
                  </div>
                  <div className={"space-y-2"}>
                    <Label>{"Blur (" + shadow.blur + "px)"}</Label>
                    <Input type="range" min="0" max="100" value={shadow.blur} onChange={(e) => updateShadow(shadow.id, "blur", parseInt(e.target.value))} />
                  </div>
                  {mode === "box" && (
                    <div className={"space-y-2"}>
                      <Label>{"Spread (" + shadow.spread + "px)"}</Label>
                      <Input type="range" min="-100" max="100" value={shadow.spread} onChange={(e) => updateShadow(shadow.id, "spread", parseInt(e.target.value))} />
                    </div>
                  )}
                </div>

                <div className={"grid grid-cols-2 gap-4 items-center"}>
                  <div className={"space-y-2"}>
                    <Label>{"Color"}</Label>
                    <div className={"flex space-x-2"}>
                      <Input type="color" value={shadow.color} onChange={(e) => updateShadow(shadow.id, "color", e.target.value)} className={"w-12 p-1 h-9"} />
                      <Input type="text" value={shadow.color} onChange={(e) => updateShadow(shadow.id, "color", e.target.value)} className={"flex-1"} />
                    </div>
                  </div>
                  <div className={"space-y-2"}>
                    <Label>{"Opacity (" + shadow.opacity + ")"}</Label>
                    <Input type="range" min="0" max="1" step="0.01" value={shadow.opacity} onChange={(e) => updateShadow(shadow.id, "opacity", parseFloat(e.target.value))} />
                  </div>
                </div>

                {mode === "box" && (
                  <div className={"flex items-center space-x-2 pt-2"}>
                    <Switch checked={shadow.inset} onCheckedChange={(c) => updateShadow(shadow.id, "inset", c)} />
                    <Label>{"Inset"}</Label>
                  </div>
                )}
              </div>
            ))}

            <Button variant="outline" className={"w-full"} onClick={addShadow}>
              <Plus className={"w-4 h-4 mr-2"} />
              {"Add Shadow Layer"}
            </Button>
          </CardContent>
        </GlassCard>

        <div className={"space-y-6"}>
          <GlassCard>
            <CardHeader>
              <CardTitle>{"Preview"}</CardTitle>
            </CardHeader>
            <CardContent className={"flex items-center justify-center min-h-[300px] bg-slate-50 dark:bg-slate-900 rounded-md overflow-hidden relative"}>
              {mode === "box" ? (
                <div style={{ boxShadow: generateShadowCss() }} className={"w-48 h-48 bg-white dark:bg-slate-800 rounded-xl"} />
              ) : (
                <h1 style={{ textShadow: generateShadowCss() }} className={"text-5xl font-bold text-slate-800 dark:text-white"}>
                  {"Shadow"}
                </h1>
              )}
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>{"CSS Code"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={"p-4 bg-slate-900 text-green-400 rounded-md overflow-x-auto font-mono text-sm"}>
                {cssString}
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
