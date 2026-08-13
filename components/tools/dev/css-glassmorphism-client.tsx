"use client";
import { cn } from"@/lib/utils";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw, Sparkles, Palette, SlidersHorizontal, Layers, Box } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const glassColors = [{
  name: "White",
  rgba: "255, 255, 255"
}, {
  name: "Black",
  rgba: "0, 0, 0"
}, {
  name: "Purple",
  rgba: "168, 85, 247"
}, {
  name: "Cyan",
  rgba: "34, 211, 238"
}, {
  name: "Emerald",
  rgba: "16, 185, 129"
}, {
  name: "Rose",
  rgba: "244, 63, 94"
}, {
  name: "Royal Blue",
  rgba: "59, 130, 246"
}];
const bgPresets = [{
  name: "Cosmic Mesh",
  value: "radial-gradient(circle at 20% 20%, #1e1b4b 0%, #000 50%), radial-gradient(circle at 80% 80%, #312e81 0%, transparent 50%), #000"
}, {
  name: "Neon Sunset",
  value: "linear-gradient(135deg, #ff0076 0%, #590fb7 50%, #00ffcc 100%)"
}, {
  name: "Aurora Borealis",
  value: "linear-gradient(180deg, #0f172a 0%, #064e3b 40%, #10b981 100%)"
}, {
  name: "Deep Ocean",
  value: "linear-gradient(135deg, #0ea5e9 0%, #1e3a8a 100%)"
}, {
  name: "Cyberpunk",
  value: "linear-gradient(45deg, #ff00ff 0%, #00ffff 50%, #ffff00 100%)"
}];
export function CssGlassmorphismClient() {
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(20);
  const [saturation, setSaturation] = useState(180);
  const [borderWidth, setBorderWidth] = useState(1);
  const [borderOpacity, setBorderOpacity] = useState(30);
  const [shadowBlur, setShadowBlur] = useState(24);
  const [borderRadius, setBorderRadius] = useState(20);
  const [glassColor, setGlassColor] = useState(glassColors[0]);
  const [bgPreset, setBgPreset] = useState(bgPresets[1]);
  const cssCode = useMemo(() => {
    return `.glass-card {
 background: rgba(${glassColor.rgba}, ${opacity / 100});
 border-radius: ${borderRadius}px;
 border: ${borderWidth}px solid rgba(${glassColor.rgba}, ${borderOpacity / 100});
 box-shadow: 0 8px ${shadowBlur}px 0 rgba(0, 0, 0, 0.15);
 backdrop-filter: blur(${blur}px) saturate(${saturation}%);
 -webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
}`;
  }, [blur, opacity, saturation, borderWidth, borderOpacity, shadowBlur, borderRadius, glassColor]);
  const previewCardStyle: React.CSSProperties = {
    background: `rgba(${glassColor.rgba}, ${opacity / 100})`,
    borderRadius: `${borderRadius}px`,
    border: `${borderWidth}px solid rgba(${glassColor.rgba}, ${borderOpacity / 100})`,
    boxShadow: `0 8px ${shadowBlur}px 0 rgba(0, 0, 0, 0.15)`,
    backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    color: "#ffffff",
    textShadow: "0 2px 4px rgba(0,0,0,0.6)"
  };
  const handleReset = () => {
    setBlur(12);
    setOpacity(20);
    setSaturation(180);
    setBorderWidth(1);
    setBorderOpacity(30);
    setShadowBlur(24);
    setBorderRadius(20);
    setGlassColor(glassColors[0]);
    setBgPreset(bgPresets[1]);
    toast.success("Settings reset to defaults");
  };
  const SliderControl = ({
    label,
    value,
    onChange,
    min,
    max,
    unit
  }: any) => <div className="space-y-1.5">
 <div className="flex justify-between items-center">
 <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
 <span className="text-xs font-mono font-semibold text-primary">{value}{unit}</span>
 </div>
 <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
 </div>;
  return <div className="relative max-w-6xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8">
      <GridPattern />

 <ToolPageHeader icon={Sparkles} title="CSS Glassmorphism Generator" description="Create stunning frosted-glass UI effects with real-time preview and production-ready CSS code." />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <Card className={`${cardClass} lg:col-span-1`}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><SlidersHorizontal className="w-4 h-4" /> Controls</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
 <SliderControl label="Blur" value={blur} onChange={setBlur} min={0} max={50} unit="px" />
 <SliderControl label="Opacity" value={opacity} onChange={setOpacity} min={0} max={100} unit="%" />
 <SliderControl label="Saturation" value={saturation} onChange={setSaturation} min={0} max={200} unit="%" />
 <SliderControl label="Border Width" value={borderWidth} onChange={setBorderWidth} min={0} max={10} unit="px" />
 <SliderControl label="Border Opacity" value={borderOpacity} onChange={setBorderOpacity} min={0} max={100} unit="%" />
 <SliderControl label="Shadow Blur" value={shadowBlur} onChange={setShadowBlur} min={0} max={60} unit="px" />
 <SliderControl label="Border Radius" value={borderRadius} onChange={setBorderRadius} min={0} max={40} unit="px" />
 
 <div className="pt-4 border-t border-border/40 space-y-2">
 <Label className="text-xs font-medium text-muted-foreground">Glass Color</Label>
 <div className="flex flex-wrap gap-2">
 {glassColors.map(c => <Button key={c.name} onClick={() => setGlassColor(c)} className={cn(`w-8 h-8 rounded-full border-2 transition-all ${glassColor.name === c.name ? "border-primary scale-110" : "border-transparent"}`)} style={{
                backgroundColor: `rgba(${c.rgba}, 0.8)`
              }} title={c.name} />)}
 </div>
 </div>

 <div className="pt-4 border-t border-border/40 space-y-2">
 <Label className="text-xs font-medium text-muted-foreground">Background Preset</Label>
 <div className="grid grid-cols-2 gap-2">
 {bgPresets.map(bg => <Button key={bg.name} onClick={() => setBgPreset(bg)} className={cn(`text-[10px] font-medium py-1.5 px-2 rounded-md border transition-all ${bgPreset.name === bg.name ? "border-primary bg-primary/10 text-primary" : "border-border/50 hover:bg-muted/50"}`)}>
 {bg.name}
 </Button>)}
 </div>
 </div>
 <Button variant="outline" className="w-full mt-4" onClick={handleReset}>
 <RotateCcw className="w-4 h-4 mr-2" /> Reset
 </Button>
 </CardContent>
 </Card>

 <div className="lg:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Layers className="w-4 h-4" /> Live Preview</CardTitle>
 </CardHeader>
 <CardContent className="p-0">
 <div className="h-[350px] flex items-center justify-center p-8 relative overflow-hidden" style={{
              background: bgPreset.value
            }}>
 <div className="p-8 max-w-sm w-full text-center space-y-4" style={previewCardStyle}>
 <h3 className="text-2xl font-bold">Glassmorphism</h3>
 <p className="text-sm opacity-90">This is a live preview of your frosted glass card floating over a vibrant background.</p>
 <Button className="px-4 py-2 bg-background/20 hover:bg-background/30 rounded-lg text-xs font-bold backdrop-blur-sm border border-white/30 transition-colors">
 Interactive Button
 </Button>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex items-center justify-between w-full">
 <CardTitle className={titleClass}><Box className="w-4 h-4" /> Generated CSS</CardTitle>
 <Button onClick={() => {
                navigator.clipboard.writeText(cssCode);
                toast.success("Copied!");
              }} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
 <Copy className="w-3.5 h-3.5" /> Copy
 </Button>
 </div>
 </CardHeader>
 <CardContent className="p-4">
 <pre className="w-full bg-background text-cyan-400 p-4 rounded-lg text-xs font-mono overflow-x-auto">{cssCode}</pre>
 </CardContent>
 </GlassCard>
 </div>
 </div>

 <ToolHowItWorks steps={[{
      step: "01",
      title: "Customize Effects",
      description: "Adjust blur, opacity, and saturation sliders to craft your perfect frosted glass look.",
      icon: SlidersHorizontal
    }, {
      step: "02",
      title: "Choose Colors",
      description: "Select a glass tint and a vibrant background preset to see how your UI adapts.",
      icon: Palette
    }, {
      step: "03",
      title: "Export Code",
      description: "Copy the generated CSS with vendor prefixes and drop it straight into your project.",
      icon: Copy
    }]} badges={["100% Free", "Client-Side Privacy", "No Signup"]} />

 <ToolFeatureGuides features={[{
      icon: Sparkles,
      title: "Real-Time Rendering",
      description: "See your CSS changes instantly without page reloads or compilation steps."
    }, {
      icon: Layers,
      title: "Vendor Prefixes",
      description: "Automatically includes -webkit-backdrop-filter for Safari compatibility."
    }, {
      icon: Palette,
      title: "Color Tinting",
      description: "Apply subtle RGB tints to create colored glass effects."
    }, {
      icon: Box,
      title: "Border Luminance",
      description: "Fine-tune the inner border glow that gives glass its physical edge."
    }]}>
 <div className="prose dark:prose-invert max-w-none">
 <h3>The Ultimate Guide to CSS Glassmorphism</h3>
 <p>Glassmorphism has taken the web design world by storm, offering a sleek, modern aesthetic that adds depth and hierarchy to user interfaces. Originating from early iterations of Apple's iOS and macOS design languages, this style relies heavily on the CSS <code>backdrop-filter</code> property to create a translucent, frosted-glass effect. By allowing the background to bleed through foreground elements, designers can create immersive, layered experiences that feel both tactile and futuristic.</p>
 <p>The key to mastering glassmorphism lies in balancing blur, transparency, and saturation. Too much blur obscures the background entirely, defeating the purpose of the effect, while too little leaves the text difficult to read against complex patterns. Our enterprise-grade generator provides granular control over every aspect of this effect, from the subtle border luminance that gives the glass its physical edge, to the inner saturation boost that keeps colors vibrant behind the frost.</p>
 <p>When implementing glassmorphism, it is also vital to consider performance implications. The <code>backdrop-filter</code> property can be computationally expensive, particularly on lower-end mobile devices or when applied to large, scrolling containers. To mitigate this, developers should apply the effect to smaller, static UI components rather than full-page wrappers. Additionally, providing a solid fallback background color using the <code>@supports</code> rule ensures that users on older browsers or those with reduced-motion preferences still experience a functional and visually pleasing interface. This generator automatically outputs the necessary vendor prefixes, ensuring your frosted glass effects render flawlessly across Safari, Chrome, Firefox, and Edge.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
      question: "Does glassmorphism work on all browsers?",
      answer: "Most modern browsers support backdrop-filter. Safari requires the -webkit- prefix, which this tool automatically generates. For older browsers, you should provide a solid fallback background color."
    }, {
      question: "Will this slow down my website?",
      answer: "Backdrop-filter can be GPU-intensive. It is best used on smaller UI elements like cards, modals, or navigation bars rather than full-page backgrounds to maintain 60fps performance."
    }, {
      question: "How do I ensure text is readable?",
      answer: "Adjust the opacity and saturation sliders. Increasing saturation and adding a subtle dark or light tint to the glass color helps maintain high contrast ratios for accessibility."
    }]} />

 <RelatedTools currentToolUrl="/tools/dev/css-glassmorphism" max={6} />
 </div>;
}
export default CssGlassmorphismClient;