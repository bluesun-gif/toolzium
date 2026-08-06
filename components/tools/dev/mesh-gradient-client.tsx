"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { Palette, Copy, Check, Sparkles, RefreshCw, Zap, SlidersHorizontal } from "lucide-react";

export default function MeshGradientClient() {
  const [color1, setColor1] = useState<string>("#8B5CF6");
  const [color2, setColor2] = useState<string>("#EC4899");
  const [color3, setColor3] = useState<string>("#3B82F6");
  const [color4, setColor4] = useState<string>("#10B981");
  const [angle, setAngle] = useState<number>(135);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const presets = [
    { name: "Neon Sunset", c1: "#F43F5E", c2: "#8B5CF6", c3: "#3B82F6", c4: "#10B981" },
    { name: "Cyberpunk Glow", c1: "#06B6D4", c2: "#3B82F6", c3: "#6366F1", c4: "#EC4899" },
    { name: "Emerald Forest", c1: "#059669", c2: "#10B981", c3: "#3B82F6", c4: "#6EE7B7" },
  ];

  const gradientStyle = {
    background: `radial-gradient(at 0% 0%, ${color1} 0px, transparent 50%), radial-gradient(at 100% 0%, ${color2} 0px, transparent 50%), radial-gradient(at 100% 100%, ${color3} 0px, transparent 50%), radial-gradient(at 0% 100%, ${color4} 0px, transparent 50%), linear-gradient(${angle}deg, ${color1}, ${color2})`,
  };

  const cssCode = `background-color: ${color1};\nbackground-image:\n  radial-gradient(at 0% 0%, ${color1} 0px, transparent 50%),\n  radial-gradient(at 100% 0%, ${color2} 0px, transparent 50%),\n  radial-gradient(at 100% 100%, ${color3} 0px, transparent 50%),\n  radial-gradient(at 0% 100%, ${color4} 0px, transparent 50%);`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      <ToolPageHeader
        title="CSS Mesh & Fluid Gradient Generator Studio"
        description="Design multi-color fluid mesh gradients with real-time canvas preview and 1-click CSS / Tailwind CSS export."
      />

      {/* SINGLE VIEWPORT GRADIENT STUDIO WORKSPACE */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 min-h-[500px] max-w-full">
        {/* Left Column: Color Controls (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col max-w-full min-w-0">
          <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 tracking-tight">
                <Palette className="h-4 w-4 text-primary shrink-0" />
                Color Palette & Angle Controls
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col justify-between max-w-full min-w-0">
              {/* Presets - Wraps on Mobile */}
              <div className="space-y-1 max-w-full min-w-0">
                <span className="text-[11px] font-semibold text-muted-foreground">Preset Palettes:</span>
                <div className="flex flex-wrap gap-1.5 max-w-full min-w-0">
                  {presets.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => {
                        setColor1(p.c1);
                        setColor2(p.c2);
                        setColor3(p.c3);
                        setColor4(p.c4);
                      }}
                      className="px-2.5 py-1 rounded-lg border text-xs font-medium bg-background hover:bg-muted transition text-muted-foreground hover:text-foreground shrink-0"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Color Pickers Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs max-w-full min-w-0">
                <div className="p-2 rounded-xl border bg-muted/20 flex items-center gap-2">
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="h-7 w-7 rounded border cursor-pointer shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] text-muted-foreground">Node 1:</span>
                    <p className="font-mono font-semibold text-foreground truncate">{color1}</p>
                  </div>
                </div>

                <div className="p-2 rounded-xl border bg-muted/20 flex items-center gap-2">
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="h-7 w-7 rounded border cursor-pointer shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] text-muted-foreground">Node 2:</span>
                    <p className="font-mono font-semibold text-foreground truncate">{color2}</p>
                  </div>
                </div>

                <div className="p-2 rounded-xl border bg-muted/20 flex items-center gap-2">
                  <input
                    type="color"
                    value={color3}
                    onChange={(e) => setColor3(e.target.value)}
                    className="h-7 w-7 rounded border cursor-pointer shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] text-muted-foreground">Node 3:</span>
                    <p className="font-mono font-semibold text-foreground truncate">{color3}</p>
                  </div>
                </div>

                <div className="p-2 rounded-xl border bg-muted/20 flex items-center gap-2">
                  <input
                    type="color"
                    value={color4}
                    onChange={(e) => setColor4(e.target.value)}
                    className="h-7 w-7 rounded border cursor-pointer shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] text-muted-foreground">Node 4:</span>
                    <p className="font-mono font-semibold text-foreground truncate">{color4}</p>
                  </div>
                </div>
              </div>

              {/* Angle Slider */}
              <div className="space-y-1 text-xs pt-1">
                <div className="flex justify-between text-muted-foreground font-medium">
                  <span>Gradient Angle:</span>
                  <span>{angle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                />
              </div>

              <Button
                onClick={() => handleCopy(cssCode, "CSS Code")}
                className="w-full gap-2 shadow-md rounded-xl font-semibold h-10 justify-center text-xs sm:text-sm mt-2 max-w-full min-w-0"
              >
                {copiedFormat === "CSS Code" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedFormat === "CSS Code" ? "Copied CSS!" : "Copy CSS Code"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Live Gradient Preview (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col max-w-full min-w-0">
          <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-primary tracking-tight">
                <Sparkles className="h-4 w-4 shrink-0" />
                Live Mesh Gradient Preview
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between max-w-full min-w-0 overflow-hidden space-y-3">
              <div
                className="w-full h-[220px] rounded-xl shadow-md transition-all duration-300 border"
                style={gradientStyle}
              />

              <div className="p-3 rounded-xl border bg-slate-950 font-mono text-xs text-slate-100 max-w-full min-w-0 overflow-x-auto max-h-[140px]">
                <pre className="whitespace-pre-wrap break-all leading-relaxed text-slate-100">{cssCode}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
