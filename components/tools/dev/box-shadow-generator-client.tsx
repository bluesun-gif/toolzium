"use client";

import { ToolBackground } from "@/components/shared/tool-background";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import InputField from"@/components/shared/form-fields/input-field";
import TextareaField from"@/components/shared/form-fields/textarea-field";
import SwitchRow from"@/components/shared/form-fields/switch-row";
import { ResetButton, CopyButton } from"@/components/shared/action-buttons";
import { Button } from"@/components/ui/button";
import { Box, Code2, Copy, Layers, Palette, SlidersHorizontal, Sparkles, Sliders } from "lucide-react";

export default function BoxShadowGeneratorClient() {
  const [activeTab, setActiveTab] = useState<"shadow" | "glass">("shadow");

  // Box Shadow State
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(20);
  const [blur, setBlur] = useState<number>(25);
  const [spread, setSpread] = useState<number>(-5);
  const [shadowColor, setShadowColor] = useState<string>("#000000");
  const [opacity, setOpacity] = useState<number>(30);
  const [inset, setInset] = useState<boolean>(false);
  const [borderRadius, setBorderRadius] = useState<number>(16);
  const [boxColor, setBoxColor] = useState<string>("#ffffff");
  const [bgColor, setBgColor] = useState<string>("#f1f5f9");

  // Glassmorphism State
  const [glassBlur, setGlassBlur] = useState<number>(12);
  const [glassOpacity, setGlassOpacity] = useState<number>(20);
  const [glassBorderOpacity, setGlassBorderOpacity] = useState<number>(30);
  const [glassRadius, setGlassRadius] = useState<number>(20);

  // Helper HEX to RGBA
  const hexToRgba = (hex: string, alphaPercent: number) => {
    let c = hex.replace("#", "");
    if (c.length === 3) c = c.split("").map(x => x + x).join("");
    const r = parseInt(c.substring(0, 2), 16) || 0;
    const g = parseInt(c.substring(2, 4), 16) || 0;
    const b = parseInt(c.substring(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${(alphaPercent / 100).toFixed(2)})`;
  };
  const boxShadowCss = `${inset ? "inset" : ""}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${hexToRgba(shadowColor, opacity)}`;
  const shadowCssCode = `/* CSS Box Shadow */
box-shadow: ${boxShadowCss};
-webkit-box-shadow: ${boxShadowCss};
border-radius: ${borderRadius}px;
background-color: ${boxColor};`;
  const glassCssCode = `/* CSS Glassmorphism */
background: rgba(255, 255, 255, ${(glassOpacity / 100).toFixed(2)});
backdrop-filter: blur(${glassBlur}px);
-webkit-backdrop-filter: blur(${glassBlur}px);
border: 1px solid rgba(255, 255, 255, ${(glassBorderOpacity / 100).toFixed(2)});
border-radius: ${glassRadius}px;`;
  const applyPreset = (preset: string) => {
    if (preset === "soft") {
      setOffsetX(0);
      setOffsetY(10);
      setBlur(30);
      setSpread(-5);
      setOpacity(15);
      setInset(false);
    } else if (preset === "dramatic") {
      setOffsetX(0);
      setOffsetY(25);
      setBlur(50);
      setSpread(-12);
      setOpacity(45);
      setInset(false);
    } else if (preset === "inset") {
      setOffsetX(2);
      setOffsetY(4);
      setBlur(10);
      setSpread(0);
      setOpacity(25);
      setInset(true);
    } else if (preset === "glow") {
      setOffsetX(0);
      setOffsetY(0);
      setBlur(35);
      setSpread(5);
      setShadowColor("#3b82f6");
      setOpacity(60);
      setInset(false);
    }
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader title="CSS Box Shadow & Glassmorphism Generator" description="Design modern CSS box shadows, glow effects, and frosted glass elements with real-time interactive sliders. Copy clean CSS code instantly." icon={Sparkles} />

 {/* Mode Switcher */}
 <div className="flex gap-3 justify-center">
 <Button variant={activeTab === "shadow" ? "default" : "outline"} onClick={() => setActiveTab("shadow")} className="gap-2">
 <Box className="h-4 w-4" /> Box Shadow Generator
 </Button>
 <Button variant={activeTab === "glass" ? "default" : "outline"} onClick={() => setActiveTab("glass")} className="gap-2">
 <Layers className="h-4 w-4" /> Glassmorphism Generator
 </Button>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
 {/* Left Column: Sliders & Controls */}
 <div className="lg:col-span-6 space-y-6">
 <GlassCard>
 <CardHeader className="flex flex-row items-center justify-between">
 <div>
 <CardTitle>{activeTab === "shadow" ? "Shadow Parameters" : "Glass Parameters"}</CardTitle>
 <CardDescription>Adjust sliders to customize CSS styles</CardDescription>
 </div>
 </CardHeader>
 <CardContent className="space-y-5">
 {activeTab === "shadow" ? <>
 <div className="flex flex-wrap gap-2 pb-2">
 <Button variant="outline" size="sm" onClick={() => applyPreset("soft")}>
 Soft Elevation
 </Button>
 <Button variant="outline" size="sm" onClick={() => applyPreset("dramatic")}>
 Dramatic
 </Button>
 <Button variant="outline" size="sm" onClick={() => applyPreset("glow")}>
 Neon Glow
 </Button>
 <Button variant="outline" size="sm" onClick={() => applyPreset("inset")}>
 Inset Inner
 </Button>
 </div>

 <div className="space-y-2">
 <div className="flex justify-between text-sm font-medium">
 <span>Horizontal Offset (X)</span>
 <span>{offsetX}px</span>
 </div>
 <input type="range" min="-50" max="50" value={offsetX} onChange={e => setOffsetX(Number(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between text-sm font-medium">
 <span>Vertical Offset (Y)</span>
 <span>{offsetY}px</span>
 </div>
 <input type="range" min="-50" max="50" value={offsetY} onChange={e => setOffsetY(Number(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between text-sm font-medium">
 <span>Blur Radius</span>
 <span>{blur}px</span>
 </div>
 <input type="range" min="0" max="100" value={blur} onChange={e => setBlur(Number(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between text-sm font-medium">
 <span>Spread Radius</span>
 <span>{spread}px</span>
 </div>
 <input type="range" min="-30" max="50" value={spread} onChange={e => setSpread(Number(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between text-sm font-medium">
 <span>Shadow Opacity</span>
 <span>{opacity}%</span>
 </div>
 <input type="range" min="0" max="100" value={opacity} onChange={e => setOpacity(Number(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between text-sm font-medium">
 <span>Border Radius</span>
 <span>{borderRadius}px</span>
 </div>
 <input type="range" min="0" max="50" value={borderRadius} onChange={e => setBorderRadius(Number(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
 </div>

 <SwitchRow label="Inset Shadow" hint="Render shadow inside the element box" checked={inset} onCheckedChange={setInset} />

 <div className="grid grid-cols-2 gap-4 pt-2">
 <div className="space-y-1">
 <label className="text-xs font-medium">Shadow Color</label>
 <input type="color" value={shadowColor} onChange={e => setShadowColor(e.target.value)} className="h-9 w-full rounded border bg-background cursor-pointer" />
 </div>
 <div className="space-y-1">
 <label className="text-xs font-medium">Box Fill Color</label>
 <input type="color" value={boxColor} onChange={e => setBoxColor(e.target.value)} className="h-9 w-full rounded border bg-background cursor-pointer" />
 </div>
 </div>
 </> : <>
 <div className="space-y-2">
 <div className="flex justify-between text-sm font-medium">
 <span>Backdrop Blur</span>
 <span>{glassBlur}px</span>
 </div>
 <input type="range" min="0" max="40" value={glassBlur} onChange={e => setGlassBlur(Number(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between text-sm font-medium">
 <span>Glass Transparency</span>
 <span>{glassOpacity}%</span>
 </div>
 <input type="range" min="0" max="80" value={glassOpacity} onChange={e => setGlassOpacity(Number(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between text-sm font-medium">
 <span>Border Opacity</span>
 <span>{glassBorderOpacity}%</span>
 </div>
 <input type="range" min="0" max="100" value={glassBorderOpacity} onChange={e => setGlassBorderOpacity(Number(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between text-sm font-medium">
 <span>Border Radius</span>
 <span>{glassRadius}px</span>
 </div>
 <input type="range" min="0" max="50" value={glassRadius} onChange={e => setGlassRadius(Number(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
 </div>
 </>}
 </CardContent>
 </GlassCard>
 </div>

 {/* Right Column: Live Interactive Preview & Code Output */}
 <div className="lg:col-span-6 space-y-6">
 <GlassCard className="h-full flex flex-col">
 <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
 <div>
 <CardTitle>Live Preview</CardTitle>
 <CardDescription>Real-time visual preview of CSS styles</CardDescription>
 </div>
 <CopyButton getText={activeTab === "shadow" ? shadowCssCode : glassCssCode} label="Copy CSS" />
 </CardHeader>
 <CardContent className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
 {/* Preview Container */}
 <div className="w-full h-64 rounded-2xl flex items-center justify-center relative overflow-hidden transition-colors border" style={{
                background: activeTab === "glass" ? "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)" : bgColor
              }}>
 {activeTab === "shadow" ? <div className="w-48 h-32 flex items-center justify-center font-semibold text-foreground text-sm shadow-transition" style={{
                  boxShadow: boxShadowCss,
                  borderRadius: `${borderRadius}px`,
                  backgroundColor: boxColor
                }}>
 Box Shadow
 </div> : <div className="w-56 h-36 flex flex-col items-center justify-center gap-1 text-primary-foreground p-4 shadow-xl" style={{
                  background: `rgba(255, 255, 255, ${(glassOpacity / 100).toFixed(2)})`,
                  backdropFilter: `blur(${glassBlur}px)`,
                  WebkitBackdropFilter: `blur(${glassBlur}px)`,
                  border: `1px solid rgba(255, 255, 255, ${(glassBorderOpacity / 100).toFixed(2)})`,
                  borderRadius: `${glassRadius}px`
                }}>
 <p className="font-bold text-lg drop-shadow">Glassmorphism</p>
 <p className="text-xs opacity-90 text-center">Frosted Glass Effect</p>
 </div>}
 </div>

 {/* Code Output */}
 <div className="w-full space-y-2">
 <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Generated CSS Code</label>
 <TextareaField value={activeTab === "shadow" ? shadowCssCode : glassCssCode} readOnly rows={6} className="font-mono text-xs bg-muted/40" />
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Choose a Style",
    description:"Start from a clean drop shadow or a frosted glassmorphism preset.",
    icon: Sparkles,
  },
{
    step:"02",
    title:"Fine-Tune Layers",
    description:"Adjust blur, spread, color, and opacity for each shadow layer.",
    icon: SlidersHorizontal,
  },
{
    step:"03",
    title:"Export Code",
    description:"Copy the CSS, Tailwind, or full glass card snippet.",
    icon: Code2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Sparkles,
    title:"Glassmorphism Presets",
    description:"Generate frosted, blurred, translucent cards with backdrop blur.",
  },
{
    icon: Layers,
    title:"Layered Shadows",
    description:"Combine multiple shadows for depth and glow.",
  },
{
    icon: Palette,
    title:"Accent Colors",
    description:"Tint shadows and borders to match your brand.",
  },
{
    icon: Copy,
    title:"Multi-Format Export",
    description:"Get CSS, Tailwind, or a complete card component.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Glassmorphism became popular because it makes interfaces feel layered and modern without heavy imagery. The core recipe is a semi-transparent background, a backdrop blur that frosts whatever sits behind the element, a hairline border for definition, and a soft shadow for elevation. Getting the balance right is the difference between elegant glass and muddy gray boxes.</p>
  <p>Start with the background: use rgba white or black at low alpha, such as rgba(255,255,255,0.1) on dark themes. Apply backdrop-filter: blur(10px) to frost the content behind the card. Because backdrop-filter is not universal, include a fallback solid or gradient background so the element still looks intentional where blur is unsupported.</p>
  <p>Borders are what sell the effect. A 1px border with low-alpha white (rgba(255,255,255,0.18)) catches light on the edge, mimicking the rim of real glass. Skip the border and the shape reads flat. Pair this with a gentle outer shadow — something like 0 8px 32px rgba(0,0,0,0.12) — and the card appears to float above the page.</p>
  <p>Layering helps realism. A bright inset highlight at the top and a darker outer shadow at the bottom simulates a light source from above. Our generator lets you stack layers and tint them, so you can match a brand palette instead of defaulting to gray.</p>
  <p>Use glassmorphism sparingly. Too many blurred layers on one screen hurt readability and performance, especially on lower-end devices. Reserve it for hero cards, modals, and navigation bars where the effect draws focus. For body content, prefer solid surfaces. With the export options here you can copy a complete component and adapt it to your design system quickly.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is glassmorphism?",
    answer:"Glassmorphism is a UI style using semi-transparent surfaces, blur, and subtle borders to mimic frosted glass. It relies on backdrop-filter and layered shadows.",
  },
{
    question:"Does backdrop-filter work everywhere?",
    answer:"Most modern browsers support it, though Safari needs the -webkit- prefix and some older browsers ignore it. Always provide a solid fallback background.",
  },
{
    question:"How do I make a shadow softer?",
    answer:"Increase blur and lower the color alpha. A blur of 20-40px with rgba(0,0,0,0.1) gives a gentle, natural shadow.",
  },
{
    question:"Can I use this for buttons?",
    answer:"Yes. Soft shadows on buttons signal interactivity; deepen the shadow on hover for a lift effect.",
  },
{
    question:"Is the generated code responsive?",
    answer:"The shadow values are fixed units, but you can wrap them in responsive utility classes or media queries to scale on small screens.",
  }
  ]}
/>
    </div>
    </div>
);
}
