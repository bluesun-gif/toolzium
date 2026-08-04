"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Scissors } from "lucide-react";

const SHAPES = {
  triangle: "polygon(50% 0%, 0% 100%, 100% 100%)",
  trapezoid: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
  parallelogram: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
  rhombus: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  pentagon: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
  hexagon: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
  heptagon: "polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)",
  octagon: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  nonagon: "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
  decagon: "polygon(50% 0%, 81% 9%, 100% 35%, 100% 65%, 81% 91%, 50% 100%, 19% 91%, 0% 65%, 0% 35%, 19% 9%)",
  bevel: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
  rabbet: "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)",
  leftArrow: "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)",
  rightArrow: "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",
  leftPoint: "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
  rightPoint: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
  leftChevron: "polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)",
  rightChevron: "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)",
  star: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  cross: "polygon(10% 25%, 35% 25%, 35% 0%, 65% 0%, 65% 25%, 90% 25%, 90% 50%, 65% 50%, 65% 100%, 35% 100%, 35% 50%, 10% 50%)",
  message: "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
  close: "polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)",
  frame: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 20% 20%, 20% 80%, 80% 80%, 80% 20%, 20% 20%)",
  circle: "circle(50% at 50% 50%)",
  ellipse: "ellipse(40% 50% at 50% 50%)",
  inset: "inset(10% 20% 10% 20%)"
};

export function CssClippathClient() {
  const [selectedShape, setSelectedShape] = useState("triangle");
  const [clipPathValue, setClipPathValue] = useState(SHAPES.triangle);

  const handleShapeChange = (shape: string) => {
    setSelectedShape(shape);
    setClipPathValue(SHAPES[shape as keyof typeof SHAPES]);
  };

  const handleReset = () => {
    handleShapeChange("triangle");
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="CSS Clip-Path Maker"
        description="Create custom CSS clip-paths visually."
        icon={Scissors}
        actions={
          <div className="flex gap-2">
            <ResetButton onClick={handleReset} label="Reset" />
          </div>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <CardHeader>
            <CardTitle>Controls</CardTitle>
            <CardDescription>Select a base shape</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Shape Preset</Label>
              <Select value={selectedShape} onValueChange={handleShapeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select shape" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(SHAPES).map((key) => (
                    <SelectItem key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Custom CSS Output</Label>
              <Input value={clipPathValue} onChange={(e) => setClipPathValue(e.target.value)} />
              <div className="flex justify-end mt-2">
                <CopyButton getText={() => "clip-path: " + clipPathValue + ";"} label="Copy CSS" />
              </div>
            </div>
          </CardContent>
        </GlassCard>
        
        <GlassCard>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center min-h-[300px]">
            <div
              className="w-full h-full min-h-[250px] bg-gradient-to-tr from-purple-500 via-pink-500 to-red-500 shadow-xl rounded-md transition-all duration-300"
              style={{ clipPath: clipPathValue }}
            />
          </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
