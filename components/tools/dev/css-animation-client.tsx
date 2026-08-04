"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";
import { Sparkles, Play, Code, Copy } from "lucide-react";
import toast from "react-hot-toast";

const defaultState = {
  animType: "fade-in",
  duration: 1000,
  delay: 0,
  iterationCount: "1",
  timingFunction: "ease",
};

export function CssAnimationClient() {
  const [animType, setAnimType] = useState(defaultState.animType);
  const [duration, setDuration] = useState(defaultState.duration);
  const [delay, setDelay] = useState(defaultState.delay);
  const [iterationCount, setIterationCount] = useState(defaultState.iterationCount);
  const [timingFunction, setTimingFunction] = useState(defaultState.timingFunction);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const keyframesMap: Record<string, string> = {
    "fade-in": "@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}",
    "fade-out": "@keyframes fadeOut {\n  from { opacity: 1; }\n  to { opacity: 0; }\n}",
    "slide-up": "@keyframes slideUp {\n  from { transform: translateY(100%); }\n  to { transform: translateY(0); }\n}",
    "slide-down": "@keyframes slideDown {\n  from { transform: translateY(-100%); }\n  to { transform: translateY(0); }\n}",
    "slide-left": "@keyframes slideLeft {\n  from { transform: translateX(100%); }\n  to { transform: translateX(0); }\n}",
    "slide-right": "@keyframes slideRight {\n  from { transform: translateX(-100%); }\n  to { transform: translateX(0); }\n}",
    "bounce": "@keyframes bounce {\n  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }\n  40% { transform: translateY(-30px); }\n  60% { transform: translateY(-15px); }\n}",
    "pulse": "@keyframes pulse {\n  0% { transform: scale(1); }\n  50% { transform: scale(1.1); }\n  100% { transform: scale(1); }\n}",
    "spin": "@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}",
    "shake": "@keyframes shake {\n  0% { transform: translateX(0); }\n  25% { transform: translateX(-10px); }\n  50% { transform: translateX(10px); }\n  75% { transform: translateX(-10px); }\n  100% { transform: translateX(0); }\n}",
  };
  
  const animNameMap: Record<string, string> = {
    "fade-in": "fadeIn",
    "fade-out": "fadeOut",
    "slide-up": "slideUp",
    "slide-down": "slideDown",
    "slide-left": "slideLeft",
    "slide-right": "slideRight",
    "bounce": "bounce",
    "pulse": "pulse",
    "spin": "spin",
    "shake": "shake",
  };

  const cssCode = ".animated-element {\n" +
    "  animation-name: " + animNameMap[animType] + ";\n" +
    "  animation-duration: " + duration + "ms;\n" +
    "  animation-delay: " + delay + "ms;\n" +
    "  animation-iteration-count: " + iterationCount + ";\n" +
    "  animation-timing-function: " + timingFunction + ";\n" +
    "  animation-fill-mode: both;\n" +
    "}\n\n" + keyframesMap[animType];

  const handlePlay = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
    }, 50);
  };

  const handleReset = () => {
    setAnimType(defaultState.animType);
    setDuration(defaultState.duration);
    setDelay(defaultState.delay);
    setIterationCount(defaultState.iterationCount);
    setTimingFunction(defaultState.timingFunction);
    setIsPlaying(false);
    toast.success("Reset to defaults");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="CSS Animation Generator"
        description="Generate CSS keyframe animations visually."
        icon={Sparkles}
        actions={<ResetButton onClick={handleReset} label="Reset" />}
      />

      {/* Need a style tag for the keyframes dynamically */}
      <style>{keyframesMap[animType]}</style>

      <div className={"grid " + "gap-6 " + "md:grid-cols-2"}>
        <GlassCard>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Configure your animation parameters.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Animation Type</Label>
              <Select value={animType} onValueChange={setAnimType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fade-in">Fade In</SelectItem>
                  <SelectItem value="fade-out">Fade Out</SelectItem>
                  <SelectItem value="slide-up">Slide Up</SelectItem>
                  <SelectItem value="slide-down">Slide Down</SelectItem>
                  <SelectItem value="slide-left">Slide Left</SelectItem>
                  <SelectItem value="slide-right">Slide Right</SelectItem>
                  <SelectItem value="bounce">Bounce</SelectItem>
                  <SelectItem value="pulse">Pulse</SelectItem>
                  <SelectItem value="spin">Spin</SelectItem>
                  <SelectItem value="shake">Shake</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Duration (ms)</Label>
              <Input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value) || 0)} min={0} />
            </div>
            
            <div className="space-y-2">
              <Label>Delay (ms)</Label>
              <Input type="number" value={delay} onChange={(e) => setDelay(Number(e.target.value) || 0)} min={0} />
            </div>

            <div className="space-y-2">
              <Label>Iteration Count</Label>
              <Input type="text" value={iterationCount} onChange={(e) => setIterationCount(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Timing Function</Label>
              <Select value={timingFunction} onValueChange={setTimingFunction}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">linear</SelectItem>
                  <SelectItem value="ease">ease</SelectItem>
                  <SelectItem value="ease-in">ease-in</SelectItem>
                  <SelectItem value="ease-out">ease-out</SelectItem>
                  <SelectItem value="ease-in-out">ease-in-out</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={"flex " + "h-48 " + "items-center " + "justify-center " + "rounded-lg " + "border " + "bg-muted/50 " + "overflow-hidden"}>
                <div
                  ref={previewRef}
                  className={"h-16 " + "w-16 " + "rounded-lg " + "bg-primary " + "shadow-lg"}
                  style={{
                    animationName: isPlaying ? animNameMap[animType] : "none",
                    animationDuration: duration + "ms",
                    animationDelay: delay + "ms",
                    animationIterationCount: iterationCount,
                    animationTimingFunction: timingFunction,
                    animationFillMode: "both",
                  }}
                  onAnimationEnd={() => setIsPlaying(false)}
                />
              </div>
              <Button onClick={handlePlay} className="w-full">
                <Play className={"mr-2 " + "h-4 " + "w-4"} />
                Play Animation
              </Button>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader className={"flex " + "flex-row " + "items-center " + "justify-between"}>
              <div className="space-y-1">
                <CardTitle>CSS Output</CardTitle>
              </div>
              <CopyButton getText={() => cssCode} label="Copy CSS" />
            </CardHeader>
            <CardContent>
              <pre className={"p-4 " + "rounded-lg " + "bg-muted " + "text-sm " + "overflow-x-auto"}>
                <code>{cssCode}</code>
              </pre>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
