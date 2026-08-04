"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Move, LayoutTemplate } from "lucide-react";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";

export function CssTransform2dClient() {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  const [originX, setOriginX] = useState(50);
  const [originY, setOriginY] = useState(50);
  const [smoothTransition, setSmoothTransition] = useState(true);

  const cssTransform = "translate(" + translateX + "px, " + translateY + "px) scale(" + scaleX + ", " + scaleY + ") rotate(" + rotate + "deg) skew(" + skewX + "deg, " + skewY + "deg)";
  const cssOrigin = originX + "% " + originY + "%";

  const getCssSnippet = () => {
    return "transform: " + cssTransform + ";\ntransform-origin: " + cssOrigin + ";\n" + (smoothTransition ? "transition: transform 0.3s ease-in-out;\n" : "");
  };

  const handleReset = () => {
    setTranslateX(0);
    setTranslateY(0);
    setScaleX(1);
    setScaleY(1);
    setRotate(0);
    setSkewX(0);
    setSkewY(0);
    setOriginX(50);
    setOriginY(50);
  };

  const applyPreset = (preset: string) => {
    handleReset();
    if (preset === "Hover Card") {
      setTranslateY(-10);
      setScaleX(1.05);
      setScaleY(1.05);
    } else if (preset === "Flip 180") {
      setRotate(180);
    } else if (preset === "Tilt Left") {
      setRotate(-10);
      setScaleX(0.9);
      setScaleY(0.9);
    } else if (preset === "Tilt Right") {
      setRotate(10);
      setScaleX(0.9);
      setScaleY(0.9);
    } else if (preset === "Bounce Scale") {
      setScaleX(1.2);
      setScaleY(1.2);
    }
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        icon={Move}
        title="CSS 2D Transform Matrix & Style Generator"
        description="Visually generate CSS 2D transforms and transform-origin properties with interactive live preview."
        actions={
          <div className="flex gap-2">
            <ResetButton onClick={handleReset} label="Reset" />
            <CopyButton getText={getCssSnippet} label="Copy CSS" />
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Controls</CardTitle>
            <CardDescription>Adjust sliders to generate transforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm font-medium">
                  <label>Translate X (px)</label>
                  <span>{translateX}</span>
                </div>
                <input type="range" min="-200" max="200" value={translateX} onChange={(e) => setTranslateX(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm font-medium">
                  <label>Translate Y (px)</label>
                  <span>{translateY}</span>
                </div>
                <input type="range" min="-200" max="200" value={translateY} onChange={(e) => setTranslateY(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm font-medium">
                  <label>Scale X</label>
                  <span>{scaleX}</span>
                </div>
                <input type="range" min="-2" max="3" step="0.1" value={scaleX} onChange={(e) => setScaleX(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm font-medium">
                  <label>Scale Y</label>
                  <span>{scaleY}</span>
                </div>
                <input type="range" min="-2" max="3" step="0.1" value={scaleY} onChange={(e) => setScaleY(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm font-medium">
                  <label>Rotate (deg)</label>
                  <span>{rotate}</span>
                </div>
                <input type="range" min="-360" max="360" value={rotate} onChange={(e) => setRotate(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm font-medium">
                  <label>Skew X (deg)</label>
                  <span>{skewX}</span>
                </div>
                <input type="range" min="-90" max="90" value={skewX} onChange={(e) => setSkewX(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm font-medium">
                  <label>Skew Y (deg)</label>
                  <span>{skewY}</span>
                </div>
                <input type="range" min="-90" max="90" value={skewY} onChange={(e) => setSkewY(Number(e.target.value))} className="w-full" />
              </div>
              <Separator />
              <div>
                <div className="flex justify-between mb-1 text-sm font-medium">
                  <label>Transform Origin X (%)</label>
                  <span>{originX}%</span>
                </div>
                <input type="range" min="0" max="100" value={originX} onChange={(e) => setOriginX(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm font-medium">
                  <label>Transform Origin Y (%)</label>
                  <span>{originY}%</span>
                </div>
                <input type="range" min="0" max="100" value={originY} onChange={(e) => setOriginY(Number(e.target.value))} className="w-full" />
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <Label>Smooth Transition</Label>
              <Switch checked={smoothTransition} onCheckedChange={setSmoothTransition} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <Button variant="outline" size="sm" onClick={() => applyPreset("Hover Card")}>Hover Card</Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset("Flip 180")}>Flip 180</Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset("Tilt Left")}>Tilt Left</Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset("Tilt Right")}>Tilt Right</Button>
              <Button variant="outline" size="sm" onClick={() => applyPreset("Bounce Scale")}>Bounce Scale</Button>
            </div>
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center min-h-[300px] border border-dashed rounded-lg bg-slate-50 dark:bg-slate-900/50 overflow-hidden relative">
                <div 
                  className="w-32 h-32 bg-primary flex items-center justify-center text-primary-foreground font-bold rounded-xl shadow-lg border border-primary-foreground/20"
                  style={{
                    transform: cssTransform,
                    transformOrigin: cssOrigin,
                    transition: smoothTransition ? "transform 0.3s ease-in-out" : "none"
                  }}
                >
                  <LayoutTemplate className="w-12 h-12" />
                </div>
              </div>
            </CardContent>
          </GlassCard>
          <GlassCard>
            <CardHeader>
              <CardTitle>CSS Output</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                {getCssSnippet()}
              </pre>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
