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
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { Box, Layers, RotateCw, Copy, RefreshCw, Play, Square } from "lucide-react";
import toast from "react-hot-toast";

export function CssTransform3dClient() {
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [rotateZ, setRotateZ] = useState<number>(0);
  const [translateZ, setTranslateZ] = useState<number>(0);
  const [perspective, setPerspective] = useState<number>(800);
  const [perspectiveOriginX, setPerspectiveOriginX] = useState<number>(50);
  const [perspectiveOriginY, setPerspectiveOriginY] = useState<number>(50);
  const [preserve3d, setPreserve3d] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);

  const resetAll = () => {
    setRotateX(0);
    setRotateY(0);
    setRotateZ(0);
    setTranslateZ(0);
    setPerspective(800);
    setPerspectiveOriginX(50);
    setPerspectiveOriginY(50);
    setPreserve3d(true);
    setAutoRotate(false);
  };

  const applyPreset = (preset: string) => {
    switch (preset) {
      case "3d-card-tilt":
        setRotateX(15);
        setRotateY(25);
        setRotateZ(0);
        setTranslateZ(50);
        setPerspective(1000);
        break;
      case "flip-horizontal":
        setRotateX(0);
        setRotateY(180);
        setRotateZ(0);
        setTranslateZ(0);
        setPerspective(800);
        break;
      case "flip-vertical":
        setRotateX(180);
        setRotateY(0);
        setRotateZ(0);
        setTranslateZ(0);
        setPerspective(800);
        break;
      case "cube-view":
        setRotateX(-25);
        setRotateY(45);
        setRotateZ(0);
        setTranslateZ(0);
        setPerspective(800);
        break;
      case "floating-3d":
        setRotateX(30);
        setRotateY(-30);
        setRotateZ(10);
        setTranslateZ(100);
        setPerspective(1200);
        break;
    }
  };

  const getCss = () => {
    return ".parent-container {\n  perspective: " + perspective + "px;\n  perspective-origin: " + perspectiveOriginX + "% " + perspectiveOriginY + "%;\n}\n\n.element {\n  transform: rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) rotateZ(" + rotateZ + "deg) translateZ(" + translateZ + "px);\n  transform-style: " + (preserve3d ? "preserve-3d" : "flat") + ";\n}";
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRotate) {
      interval = setInterval(() => {
        setRotateY((prev) => (prev + 1) % 360);
        setRotateX((prev) => (prev + 0.5) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [autoRotate]);

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        icon={Box} 
        title="CSS 3D Transform Generator" 
        description="Interactive visual 3D CSS transform & perspective generator." 
        actions={
          <>
            <CopyButton getText={getCss} label="Copy CSS" />
            <ResetButton onClick={resetAll} label="Reset" />
          </>
        }
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Rotate X (deg)</Label>
                  <span className="text-xs text-muted-foreground">{rotateX}</span>
                </div>
                <Input type="range" min="-360" max="360" value={rotateX} onChange={(e) => setRotateX(Number(e.target.value))} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Rotate Y (deg)</Label>
                  <span className="text-xs text-muted-foreground">{rotateY}</span>
                </div>
                <Input type="range" min="-360" max="360" value={rotateY} onChange={(e) => setRotateY(Number(e.target.value))} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Rotate Z (deg)</Label>
                  <span className="text-xs text-muted-foreground">{rotateZ}</span>
                </div>
                <Input type="range" min="-360" max="360" value={rotateZ} onChange={(e) => setRotateZ(Number(e.target.value))} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Translate Z (px)</Label>
                  <span className="text-xs text-muted-foreground">{translateZ}</span>
                </div>
                <Input type="range" min="-500" max="500" value={translateZ} onChange={(e) => setTranslateZ(Number(e.target.value))} />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Perspective (px)</Label>
                  <span className="text-xs text-muted-foreground">{perspective}</span>
                </div>
                <Input type="range" min="100" max="3000" value={perspective} onChange={(e) => setPerspective(Number(e.target.value))} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Perspective Origin X (%)</Label>
                  <span className="text-xs text-muted-foreground">{perspectiveOriginX}</span>
                </div>
                <Input type="range" min="0" max="100" value={perspectiveOriginX} onChange={(e) => setPerspectiveOriginX(Number(e.target.value))} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Perspective Origin Y (%)</Label>
                  <span className="text-xs text-muted-foreground">{perspectiveOriginY}</span>
                </div>
                <Input type="range" min="0" max="100" value={perspectiveOriginY} onChange={(e) => setPerspectiveOriginY(Number(e.target.value))} />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch id="preserve-3d" checked={preserve3d} onCheckedChange={setPreserve3d} />
                <Label htmlFor="preserve-3d">Preserve 3D (transform-style)</Label>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch id="auto-rotate" checked={autoRotate} onCheckedChange={setAutoRotate} />
                <Label htmlFor="auto-rotate">Auto Rotate Preview</Label>
              </div>
            </CardContent>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Live 3D transform visualizer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 sm:h-80 w-full bg-[#0f172a] text-[#f8fafc]/50 rounded-xl flex items-center justify-center overflow-hidden border"
                   style={{
                     perspective: perspective + "px",
                     perspectiveOrigin: perspectiveOriginX + "% " + perspectiveOriginY + "%"
                   }}>
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 transition-transform"
                     style={{
                       transform: "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) rotateZ(" + rotateZ + "deg) translateZ(" + translateZ + "px)",
                       transformStyle: preserve3d ? "preserve-3d" : "flat",
                       transition: autoRotate ? "none" : "transform 0.3s ease-out"
                     }}>
                  <div className={"absolute inset-0 bg-blue-500/80 border-2 border-blue-300 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg"} style={{ transform: "translateZ(1px)" }}>Front</div>
                  {preserve3d && (
                    <>
                      <div className={"absolute inset-0 bg-red-500/80 border-2 border-red-300 rounded-lg flex items-center justify-center text-white font-bold text-xl"} style={{ transform: "translateZ(-80px)" }}>Back</div>
                      <div className={"absolute inset-0 bg-green-500/80 border-2 border-green-300 rounded-lg flex items-center justify-center text-white font-bold text-xl origin-left"} style={{ transform: "rotateY(-90deg) translateZ(0px)" }}>Left</div>
                      <div className={"absolute inset-0 bg-yellow-500/80 border-2 border-yellow-300 rounded-lg flex items-center justify-center text-white font-bold text-xl origin-right"} style={{ transform: "rotateY(90deg) translateZ(0px)" }}>Right</div>
                      <div className={"absolute inset-0 bg-purple-500/80 border-2 border-purple-300 rounded-lg flex items-center justify-center text-white font-bold text-xl origin-top"} style={{ transform: "rotateX(90deg) translateZ(0px)" }}>Top</div>
                      <div className={"absolute inset-0 bg-pink-500/80 border-2 border-pink-300 rounded-lg flex items-center justify-center text-white font-bold text-xl origin-bottom"} style={{ transform: "rotateX(-90deg) translateZ(0px)" }}>Bottom</div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader>
              <CardTitle>Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => applyPreset("3d-card-tilt")}>3D Card Tilt</Button>
                <Button variant="outline" onClick={() => applyPreset("flip-horizontal")}>Flip Horizontal</Button>
                <Button variant="outline" onClick={() => applyPreset("flip-vertical")}>Flip Vertical</Button>
                <Button variant="outline" onClick={() => applyPreset("cube-view")}>Cube View</Button>
                <Button variant="outline" onClick={() => applyPreset("floating-3d")}>Floating 3D</Button>
              </div>
            </CardContent>
          </GlassCard>
          
          <GlassCard>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                {getCss()}
              </pre>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
