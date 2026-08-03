"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Palette, Image as ImageIcon, EyeOff } from "lucide-react";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { cn } from "@/lib/utils";

// Filter matrices for different color blindness types
const colorBlindnessFilters = {
  protanopia: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="p"><feColorMatrix type="matrix" values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0"/></filter></svg>#p')`,
  deuteranopia: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="d"><feColorMatrix type="matrix" values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0"/></filter></svg>#d')`,
  tritanopia: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="t"><feColorMatrix type="matrix" values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0"/></filter></svg>#t')`,
  achromatopsia: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="a"><feColorMatrix type="matrix" values="0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0"/></filter></svg>#a')`,
};

type Mode = "color" | "image";

export function ColorBlindnessClient() {
  const [mode, setMode] = useState<Mode>("color");
  const [hexColor, setHexColor] = useState<string>("#3b82f6");
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setHexColor("#3b82f6");
    setImageSrc(null);
  };

  return (
    <div className="space-y-6">
      <ToolPageHeader 
        icon={Eye} 
        title="Color Blindness Simulator" 
        description="Simulate how images and colors appear to people with different types of color blindness." 
        actions={
          <ResetButton onClick={handleReset} label="Reset" />
        }
      />

      <GlassCard>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Input Mode</CardTitle>
              <CardDescription>Choose to simulate colors or an uploaded image</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={mode === "color" ? "default" : "outline"} 
                onClick={() => setMode("color")}
                size="sm"
              >
                <Palette className="w-4 h-4 mr-2" />
                Color
              </Button>
              <Button 
                variant={mode === "image" ? "default" : "outline"} 
                onClick={() => setMode("image")}
                size="sm"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Image
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {mode === "color" ? (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Hex Color</Label>
                <div className="flex space-x-2">
                  <Input 
                    type="color" 
                    value={hexColor} 
                    onChange={(e) => setHexColor(e.target.value)} 
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input 
                    type="text" 
                    value={hexColor} 
                    onChange={(e) => setHexColor(e.target.value)}
                    className="flex-1"
                    placeholder="#3b82f6"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Upload Image</Label>
                <Input type="file" accept="image/*" onChange={handleImageUpload} />
              </div>
            </div>
          )}
        </CardContent>
      </GlassCard>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SimulationCard 
          title="Original" 
          description="Normal vision"
          mode={mode}
          color={hexColor}
          imageSrc={imageSrc}
          filter="none"
        />
        <SimulationCard 
          title="Protanopia" 
          description="No red (red-green)"
          mode={mode}
          color={hexColor}
          imageSrc={imageSrc}
          filter={colorBlindnessFilters.protanopia}
        />
        <SimulationCard 
          title="Deuteranopia" 
          description="No green (red-green)"
          mode={mode}
          color={hexColor}
          imageSrc={imageSrc}
          filter={colorBlindnessFilters.deuteranopia}
        />
        <SimulationCard 
          title="Tritanopia" 
          description="No blue (blue-yellow)"
          mode={mode}
          color={hexColor}
          imageSrc={imageSrc}
          filter={colorBlindnessFilters.tritanopia}
        />
        <SimulationCard 
          title="Achromatopsia" 
          description="Complete color blindness"
          mode={mode}
          color={hexColor}
          imageSrc={imageSrc}
          filter={colorBlindnessFilters.achromatopsia}
        />
      </div>

      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center">
            <EyeOff className="w-5 h-5 mr-2" />
            Accessibility Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Don't rely solely on color to convey information (e.g., using only red text for errors).</li>
            <li>Ensure high contrast between text and background colors.</li>
            <li>Use patterns or textures in charts and graphs in addition to color.</li>
            <li>Add text labels to color-coded elements.</li>
          </ul>
        </CardContent>
      </GlassCard>
    </div>
  );
}

function SimulationCard({ 
  title, 
  description, 
  mode, 
  color, 
  imageSrc, 
  filter 
}: { 
  title: string, 
  description: string, 
  mode: Mode, 
  color: string, 
  imageSrc: string | null, 
  filter: string 
}) {
  return (
    <GlassCard>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {mode === "color" ? (
          <div 
            className="w-full h-32 rounded-md shadow-inner" 
            style={{ backgroundColor: color, filter }}
          />
        ) : (
          <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center overflow-hidden border">
            {imageSrc ? (
              <img 
                src={imageSrc} 
                alt={`${title} simulation`} 
                className="w-full h-full object-cover"
                style={{ filter }}
              />
            ) : (
              <span className="text-muted-foreground text-sm">Upload an image</span>
            )}
          </div>
        )}
      </CardContent>
    </GlassCard>
  );
}
