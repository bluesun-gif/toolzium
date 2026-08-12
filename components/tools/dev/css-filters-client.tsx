"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import { Copy, RotateCcw, Sparkles, SlidersHorizontal, Eye, EyeOff } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const presets = [
 { name:"None", values: { blur: 0, brightness: 100, contrast: 100, grayscale: 0, hueRotate: 0, invert: 0, opacity: 100, saturate: 100, sepia: 0, dropShadow: false } },
 { name:"Vintage", values: { blur: 0, brightness: 110, contrast: 85, grayscale: 20, hueRotate: 0, invert: 0, opacity: 100, saturate: 140, sepia: 40, dropShadow: false } },
 { name:"B&W", values: { blur: 0, brightness: 100, contrast: 120, grayscale: 100, hueRotate: 0, invert: 0, opacity: 100, saturate: 100, sepia: 0, dropShadow: false } },
 { name:"Cyberpunk", values: { blur: 0, brightness: 110, contrast: 150, grayscale: 0, hueRotate: 280, invert: 0, opacity: 100, saturate: 250, sepia: 0, dropShadow: true } },
];

export function CssFiltersClient() {
 const [blur, setBlur] = useState(0);
 const [brightness, setBrightness] = useState(100);
 const [contrast, setContrast] = useState(100);
 const [grayscale, setGrayscale] = useState(0);
 const [hueRotate, setHueRotate] = useState(0);
 const [invert, setInvert] = useState(0);
 const [opacity, setOpacity] = useState(100);
 const [saturate, setSaturate] = useState(100);
 const [sepia, setSepia] = useState(0);
 
 const [dropShadow, setDropShadow] = useState(false);
 const [dsX, setDsX] = useState(5);
 const [dsY, setDsY] = useState(5);
 const [dsBlur, setDsBlur] = useState(10);
 const [dsColor, setDsColor] = useState("#000000");
 
 const [showOriginal, setShowOriginal] = useState(false);

 const filterString = useMemo(() => {
 const filters: string[] = [];
 if (blur > 0) filters.push(`blur(${blur}px)`);
 if (brightness !== 100) filters.push(`brightness(${brightness}%)`);
 if (contrast !== 100) filters.push(`contrast(${contrast}%)`);
 if (grayscale > 0) filters.push(`grayscale(${grayscale}%)`);
 if (hueRotate > 0) filters.push(`hue-rotate(${hueRotate}deg)`);
 if (invert > 0) filters.push(`invert(${invert}%)`);
 if (opacity < 100) filters.push(`opacity(${opacity}%)`);
 if (saturate !== 100) filters.push(`saturate(${saturate}%)`);
 if (sepia > 0) filters.push(`sepia(${sepia}%)`);
 if (dropShadow) filters.push(`drop-shadow(${dsX}px ${dsY}px ${dsBlur}px ${dsColor})`);
 return filters.length > 0 ? filters.join("") :"none";
 }, [blur, brightness, contrast, grayscale, hueRotate, invert, opacity, saturate, sepia, dropShadow, dsX, dsY, dsBlur, dsColor]);

 const cssCode = `filter: ${filterString};\n-webkit-filter: ${filterString};`;

 const applyPreset = (preset: any) => {
 setBlur(preset.values.blur); setBrightness(preset.values.brightness);
 setContrast(preset.values.contrast); setGrayscale(preset.values.grayscale);
 setHueRotate(preset.values.hueRotate); setInvert(preset.values.invert);
 setOpacity(preset.values.opacity); setSaturate(preset.values.saturate);
 setSepia(preset.values.sepia); setDropShadow(preset.values.dropShadow);
 };

 const handleReset = () => applyPreset(presets[0]);

 const SliderControl = ({ label, value, onChange, min, max, unit }: any) => (
 <div className="space-y-1.5">
 <div className="flex justify-between items-center">
 <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
 <span className="text-xs font-mono font-semibold text-primary">{value}{unit}</span>
 </div>
 <input type="range"min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))}
 className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"/>
 </div>
 );

 return (
 <div className="max-w-6xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8">
 <ToolPageHeader
 icon={Sparkles}
 title="CSS Filters Playground"
 description="Experiment with CSS filter functions in real-time. Apply blur, contrast, sepia, and more to any element."
 />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <Card className={`${cardClass} lg:col-span-1`}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><SlidersHorizontal className="w-4 h-4"/> Filter Controls</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
 <SliderControl label="Blur"value={blur} onChange={setBlur} min={0} max={20} unit="px"/>
 <SliderControl label="Brightness"value={brightness} onChange={setBrightness} min={0} max={200} unit="%"/>
 <SliderControl label="Contrast"value={contrast} onChange={setContrast} min={0} max={200} unit="%"/>
 <SliderControl label="Grayscale"value={grayscale} onChange={setGrayscale} min={0} max={100} unit="%"/>
 <SliderControl label="Hue Rotate"value={hueRotate} onChange={setHueRotate} min={0} max={360} unit="deg"/>
 <SliderControl label="Invert"value={invert} onChange={setInvert} min={0} max={100} unit="%"/>
 <SliderControl label="Opacity"value={opacity} onChange={setOpacity} min={0} max={100} unit="%"/>
 <SliderControl label="Saturate"value={saturate} onChange={setSaturate} min={0} max={300} unit="%"/>
 <SliderControl label="Sepia"value={sepia} onChange={setSepia} min={0} max={100} unit="%"/>
 
 <div className="pt-4 border-t border-border/40 space-y-3">
 <div className="flex items-center justify-between">
 <Label className="text-xs font-medium">Drop Shadow</Label>
 <button onClick={() => setDropShadow(!dropShadow)} 
 className={`w-10 h-5 rounded-full transition-colors ${dropShadow ?"bg-primary":"bg-muted"}`}>
 <div className={`w-4 h-4 bg-background rounded-full shadow transform transition-transform ${dropShadow ?"translate-x-5":"translate-x-0.5"}`} />
 </button>
 </div>
 {dropShadow && (
 <div className="space-y-3 pl-2 border-l-2 border-primary/30">
 <SliderControl label="X Offset"value={dsX} onChange={setDsX} min={-50} max={50} unit="px"/>
 <SliderControl label="Y Offset"value={dsY} onChange={setDsY} min={-50} max={50} unit="px"/>
 <SliderControl label="Shadow Blur"value={dsBlur} onChange={setDsBlur} min={0} max={50} unit="px"/>
 <div className="flex items-center gap-2">
 <Label className="text-xs flex-1">Color</Label>
 <input type="color"value={dsColor} onChange={(e) => setDsColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"/>
 </div>
 </div>
 )}
 </div>

 <Button variant="outline"className="w-full mt-4"onClick={handleReset}>
 <RotateCcw className="w-4 h-4 mr-2"/> Reset All
 </Button>
 </CardContent>
 </Card>

 <div className="lg:col-span-2 space-y-6">
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <div className="flex items-center justify-between w-full">
 <CardTitle className={titleClass}>Live Preview</CardTitle>
 <Button variant="ghost"size="sm"onClick={() => setShowOriginal(!showOriginal)}>
 {showOriginal ? <EyeOff className="w-4 h-4 mr-2"/> : <Eye className="w-4 h-4 mr-2"/>}
 {showOriginal ?"Show Filtered":"Show Original"}
 </Button>
 </div>
 </CardHeader>
 <CardContent className="p-8 flex items-center justify-center min-h-[300px] bg-muted/30">
 <div className="w-48 h-48 rounded-2xl relative"
 style={{ 
 background:"linear-gradient(135deg, #f43f5e 0%, #8b5cf6 50%, #3b82f6 100%)",
 filter: showOriginal ?"none": filterString,
 WebkitFilter: showOriginal ?"none": filterString
 }}>
 <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl drop-shadow-lg">
 Preview
 </div>
 </div>
 </CardContent>
 </Card>

 <div className="flex flex-wrap gap-2">
 {presets.map((p) => (
 <Button key={p.name} variant="outline"size="sm"onClick={() => applyPreset(p)}>
 {p.name}
 </Button>
 ))}
 </div>

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <div className="flex items-center justify-between w-full">
 <CardTitle className={titleClass}>Generated CSS</CardTitle>
 <button
 onClick={() => { navigator.clipboard.writeText(cssCode); toast.success("Copied!"); }}
 className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
 >
 <Copy className="w-3.5 h-3.5"/> Copy
 </button>
 </div>
 </CardHeader>
 <CardContent className="p-4">
 <pre className="w-full bg-background text-cyan-400 p-4 rounded-lg text-xs font-mono overflow-x-auto">{cssCode}</pre>
 </CardContent>
 </Card>
 </div>
 </div>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Adjust Sliders", description:"Tweak the 9 core filter functions to alter brightness, color, and blur.", icon: SlidersHorizontal },
 { step:"02", title:"Add Drop Shadow", description:"Enable the drop-shadow toggle to add depth that conforms to element shapes.", icon: Sparkles },
 { step:"03", title:"Copy & Paste", description:"Grab the generated CSS and apply it to your images, videos, or DOM elements.", icon: Copy }
 ]}
 badges={["100% Free","Client-Side Privacy","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: SlidersHorizontal, title:"9 Core Filters", description:"Full control over blur, brightness, contrast, grayscale, hue, invert, opacity, saturate, and sepia."},
 { icon: Sparkles, title:"Advanced Drop Shadow", description:"Add dynamic drop shadows that follow the alpha channel of transparent PNGs and SVGs."},
 { icon: Eye, title:"Before & After", description:"Toggle between the original and filtered state to compare your edits instantly."},
 { icon: Sparkles, title:"One-Click Presets", description:"Apply popular filter combinations like Vintage, Cyberpunk, and Black & White."}
 ]}
 >
 <div className="prose dark:prose-invert max-w-none">
 <h3>The Power of CSS Filters in Modern Web Development</h3>
 <p>CSS filters provide a powerful, hardware-accelerated way to apply visual effects directly to DOM elements, images, and videos without the need for external image editing software. Originally popularized by Instagram and modern photo-editing apps, CSS filters allow developers to dynamically alter the rendering of an element in real-time. The <code>filter</code> property accepts a chain of functions, including blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate, and sepia. Each function manipulates the pixel data mathematically, enabling everything from subtle vintage color grading to extreme cyberpunk neon transformations.</p>
 <p>One of the most significant advantages of CSS filters is their performance. Because they are handled by the browser's compositor and often offloaded to the GPU, applying complex filter chains is incredibly smooth, even during animations and transitions. This makes them ideal for hover states, loading skeletons, and interactive media galleries. However, chaining multiple filters requires an understanding of their order of operations. For instance, applying a grayscale filter before a sepia filter yields a completely different result than applying sepia first.</p>
 <p>Beyond basic color manipulation, the <code>drop-shadow</code> function offers a superior alternative to the traditional <code>box-shadow</code>. Unlike <code>box-shadow</code>, which only traces the bounding box of an element, <code>drop-shadow</code> conforms to the exact alpha channel of the element, including transparent PNGs and complex SVG shapes. This ensures that your glowing effects and depth cues perfectly match the silhouette of your graphics. By generating the precise CSS syntax, you can easily integrate these professional-grade visual effects into your design system, ensuring cross-browser compatibility with the necessary webkit prefixes.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"What is the difference between box-shadow and drop-shadow?", answer:"box-shadow applies a shadow to the rectangular bounding box of an element. drop-shadow applies a shadow to the exact shape (alpha channel) of the element, making it perfect for transparent PNGs and SVGs."},
 { question:"Do CSS filters affect performance?", answer:"CSS filters are generally hardware-accelerated and very performant. However, applying heavy blur filters to very large, scrolling elements can cause repaints and lag on low-end mobile devices."},
 { question:"Can I animate CSS filters?", answer:"Yes! You can transition filter values using CSS transitions or keyframe animations to create smooth hover effects, loading states, and dynamic visual shifts."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/dev/css-filters"max={6} />
 </div>
 );
}

export default CssFiltersClient;
