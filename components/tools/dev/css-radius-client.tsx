"use client";

import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import toast from"react-hot-toast";
import { Circle, Copy, Link, Unlink, Palette, Maximize } from"lucide-react";
import { cn } from"@/lib/utils";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

export default function CssRadiusClient() {
 const [tlH, setTlH] = useState(10); const [tlV, setTlV] = useState(10);
 const [trH, setTrH] = useState(10); const [trV, setTrV] = useState(10);
 const [brH, setBrH] = useState(10); const [brV, setBrV] = useState(10);
 const [blH, setBlH] = useState(10); const [blV, setBlV] = useState(10);
 
 const [linked, setLinked] = useState(true);
 const [width, setWidth] = useState(300);
 const [height, setHeight] = useState(200);
 const [bgColor, setBgColor] = useState("#3b82f6");

 const setAll = (val: number) => {
 setTlH(val); setTlV(val); setTrH(val); setTrV(val);
 setBrH(val); setBrV(val); setBlH(val); setBlV(val);
 };

 const updateVal = (setter: (v: number) => void, val: number) => {
 setter(val);
 if (linked) setAll(val);
 };

 const applyPreset = (preset: string) => {
 setLinked(false);
 if (preset ==="pill") { setAll(height / 2); setLinked(true); }
 else if (preset ==="circle") { setAll(width / 2); setLinked(true); }
 else if (preset ==="squircle") { setAll(30); setLinked(true); }
 else if (preset ==="blob") {
 setTlH(60); setTlV(30); setTrH(20); setTrV(80);
 setBrH(70); setBrV(40); setBlH(30); setBlV(60);
 }
 else if (preset ==="card") { setAll(16); setLinked(true); }
 else if (preset ==="button") { setAll(8); setLinked(true); }
 };

 const borderRadiusCSS = `${tlH}px ${trH}px ${brH}px ${blH}px / ${tlV}px ${trV}px ${brV}px ${blV}px`;
 const cssOutput = `.shaped-element {\n width: ${width}px;\n height: ${height}px;\n background-color: ${bgColor};\n border-radius: ${borderRadiusCSS};\n}`;

 const copyCSS = () => {
 navigator.clipboard.writeText(cssOutput);
 toast.success("CSS copied!");
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Circle}
 title="CSS Border Radius Generator"
 description="Design complex, elliptical border-radius shapes with visual corner controls and real-time CSS code generation."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Maximize className="w-4 h-4 text-primary"/> Visual Preview
 </CardTitle>
 </CardHeader>
 <CardContent className="p-6 flex flex-col items-center justify-center min-h-[350px] bg-muted/10 relative overflow-hidden">
 <div className="relative"style={{ width: `${width}px`, height: `${height}px` }}>
 <div 
 className="w-full h-full transition-all duration-100 shadow-2xl"
 style={{
 backgroundColor: bgColor,
 borderRadius: borderRadiusCSS,
 }}
 />
 {/* SVG Overlay for visual corner handles */}
 <svg className="absolute inset-0 w-full h-full pointer-events-none"viewBox={`0 0 ${width} ${height}`}>
 <path d={`M 0 ${tlV} Q 0 0 ${tlH} 0`} fill="none"stroke="white"strokeWidth="2"strokeDasharray="4,4"opacity="0.8"/>
 <path d={`M ${width - trH} 0 Q ${width} 0 ${width} ${trV}`} fill="none"stroke="white"strokeWidth="2"strokeDasharray="4,4"opacity="0.8"/>
 <path d={`M ${width} ${height - brV} Q ${width} ${height} ${width - brH} ${height}`} fill="none"stroke="white"strokeWidth="2"strokeDasharray="4,4"opacity="0.8"/>
 <path d={`M ${blH} ${height} Q 0 ${height} 0 ${height - blV}`} fill="none"stroke="white"strokeWidth="2"strokeDasharray="4,4"opacity="0.8"/>
 </svg>
 </div>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <Card className={cn(cardClass, "lg:col-span-2")}>
 <CardHeader className={headerClass}>
 <div className="flex justify-between items-center w-full">
 <CardTitle className={titleClass}>Corner Controls</CardTitle>
 <Button 
 variant={linked ?"default":"outline"} 
 size="sm"
 className="text-xs font-semibold"
 onClick={() => setLinked(!linked)}
 >
 {linked ? <Link className="w-4 h-4 mr-2"/> : <Unlink className="w-4 h-4 mr-2"/>}
 {linked ?"Linked":"Unlinked"}
 </Button>
 </div>
 </CardHeader>
 <CardContent className="p-5 space-y-6">
 <div className="space-y-2">
 <div className="flex justify-between text-sm font-medium">
 <Label>Global Radius (Linked)</Label>
 <span className="text-primary font-mono">{tlH}px</span>
 </div>
 <input type="range"min="0"max={Math.min(width, height) / 2} value={tlH} onChange={e => setAll(parseInt(e.target.value))} className="w-full accent-primary"disabled={!linked} />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-3 p-4 rounded-lg border border-border/50 bg-muted/20">
 <h4 className="text-xs font-bold uppercase text-muted-foreground">Top-Left</h4>
 <div className="space-y-1">
 <Label className="text-xs">H: {tlH}px</Label>
 <input type="range"min="0"max={width / 2} value={tlH} onChange={e => updateVal(setTlH, parseInt(e.target.value))} className="w-full accent-primary"disabled={linked} />
 </div>
 <div className="space-y-1">
 <Label className="text-xs">V: {tlV}px</Label>
 <input type="range"min="0"max={height / 2} value={tlV} onChange={e => updateVal(setTlV, parseInt(e.target.value))} className="w-full accent-primary"disabled={linked} />
 </div>
 </div>
 <div className="space-y-3 p-4 rounded-lg border border-border/50 bg-muted/20">
 <h4 className="text-xs font-bold uppercase text-muted-foreground">Top-Right</h4>
 <div className="space-y-1">
 <Label className="text-xs">H: {trH}px</Label>
 <input type="range"min="0"max={width / 2} value={trH} onChange={e => updateVal(setTrH, parseInt(e.target.value))} className="w-full accent-primary"disabled={linked} />
 </div>
 <div className="space-y-1">
 <Label className="text-xs">V: {trV}px</Label>
 <input type="range"min="0"max={height / 2} value={trV} onChange={e => updateVal(setTrV, parseInt(e.target.value))} className="w-full accent-primary"disabled={linked} />
 </div>
 </div>
 <div className="space-y-3 p-4 rounded-lg border border-border/50 bg-muted/20">
 <h4 className="text-xs font-bold uppercase text-muted-foreground">Bottom-Right</h4>
 <div className="space-y-1">
 <Label className="text-xs">H: {brH}px</Label>
 <input type="range"min="0"max={width / 2} value={brH} onChange={e => updateVal(setBrH, parseInt(e.target.value))} className="w-full accent-primary"disabled={linked} />
 </div>
 <div className="space-y-1">
 <Label className="text-xs">V: {brV}px</Label>
 <input type="range"min="0"max={height / 2} value={brV} onChange={e => updateVal(setBrV, parseInt(e.target.value))} className="w-full accent-primary"disabled={linked} />
 </div>
 </div>
 <div className="space-y-3 p-4 rounded-lg border border-border/50 bg-muted/20">
 <h4 className="text-xs font-bold uppercase text-muted-foreground">Bottom-Left</h4>
 <div className="space-y-1">
 <Label className="text-xs">H: {blH}px</Label>
 <input type="range"min="0"max={width / 2} value={blH} onChange={e => updateVal(setBlH, parseInt(e.target.value))} className="w-full accent-primary"disabled={linked} />
 </div>
 <div className="space-y-1">
 <Label className="text-xs">V: {blV}px</Label>
 <input type="range"min="0"max={height / 2} value={blV} onChange={e => updateVal(setBlV, parseInt(e.target.value))} className="w-full accent-primary"disabled={linked} />
 </div>
 </div>
 </div>
 </CardContent>
 </Card>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Dimensions & Presets</CardTitle>
 </CardHeader>
 <CardContent className="p-5 space-y-5">
 <div className="space-y-2">
 <Label>Width ({width}px)</Label>
 <input type="range"min="100"max="500"value={width} onChange={e => setWidth(parseInt(e.target.value))} className="w-full accent-primary"/>
 </div>
 <div className="space-y-2">
 <Label>Height ({height}px)</Label>
 <input type="range"min="100"max="400"value={height} onChange={e => setHeight(parseInt(e.target.value))} className="w-full accent-primary"/>
 </div>
 <div className="space-y-2">
 <Label className="flex items-center gap-2"><Palette className="w-4 h-4"/> Background Color</Label>
 <div className="flex gap-2">
 <input type="color"value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-12 h-10 rounded border border-border cursor-pointer"/>
 <Input value={bgColor} onChange={e => setBgColor(e.target.value)} className="flex-1 font-mono text-xs h-10"/>
 </div>
 </div>
 
 <div className="space-y-2 pt-4 border-t border-border/50">
 <Label>Quick Presets</Label>
 <div className="grid grid-cols-2 gap-2">
 <Button variant="outline"size="sm"className="text-xs font-semibold"onClick={() => applyPreset("pill")}>Pill</Button>
 <Button variant="outline"size="sm"className="text-xs font-semibold"onClick={() => applyPreset("circle")}>Circle</Button>
 <Button variant="outline"size="sm"className="text-xs font-semibold"onClick={() => applyPreset("squircle")}>Squircle</Button>
 <Button variant="outline"size="sm"className="text-xs font-semibold"onClick={() => applyPreset("blob")}>Blob</Button>
 <Button variant="outline"size="sm"className="text-xs font-semibold"onClick={() => applyPreset("card")}>Card</Button>
 <Button variant="outline"size="sm"className="text-xs font-semibold"onClick={() => applyPreset("button")}>Button</Button>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Generated CSS</CardTitle>
 <Button size="sm"className="h-8 text-xs px-3"onClick={copyCSS}>
 <Copy className="w-3.5 h-3.5 mr-1.5"/> Copy Code
 </Button>
 </CardHeader>
 <CardContent className="p-5">
 <pre className={cn(textareaClass, "min-h-[120px] text-foreground leading-relaxed p-4 bg-muted/30 rounded-lg overflow-x-auto text-xs")}>{cssOutput}</pre>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Set Dimensions", description:"Adjust the width and height of your preview element to define the bounding box.", icon: Maximize },
 { step:"02", title:"Shape Corners", description:"Use linked sliders for uniform curves or unlink to design complex elliptical corners.", icon: Circle },
 { step:"03", title:"Export Code", description:"Copy the shorthand and longhand CSS border-radius properties instantly.", icon: Copy }
 ]}
 badges={["Elliptical Support","Visual Preview","One-Click Copy"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Circle, title:"Elliptical Corner Control", description:"Unlike basic generators, this tool supports independent horizontal and vertical radii for true elliptical curves."},
 { icon: Link, title:"Smart Linking System", description:"Toggle linked mode to adjust all four corners simultaneously, or unlink them to craft asymmetric, organic blob shapes."},
 { icon: Palette, title:"Live Color & Sizing", description:"Dynamically resize the preview canvas and test your border radius against any background color in real-time."},
 { icon: Maximize, title:"Intelligent Presets", description:"Instantly apply common shapes like Pills, Squircles, and Cards, with automatic mathematical adjustments to element dimensions."}
 ]}
 >
 <div className="prose max-w-none dark:prose-invert">
 <h3 className="text-xl font-bold mb-4">Beyond the Circle: Mastering CSS Border Radius</h3>
 <p className="text-muted-foreground mb-4">
 The CSS <code className="text-primary">border-radius</code> property is one of the most widely used styling tools in web development, yet its full potential is often overlooked. Most developers are familiar with the basic shorthand—applying a single pixel value to create uniform, rounded corners or setting it to 50% to create a perfect circle. However, the CSS specification actually supports a much more powerful syntax that allows for independent horizontal and vertical radii, enabling the creation of complex, elliptical shapes that mimic real-world objects.
 </p>
 <p className="text-muted-foreground mb-4">
 By utilizing the slash syntax (e.g., <code className="text-primary">border-radius: 20px / 40px</code>), developers can define an ellipse rather than a simple circular arc for each corner. This is essential for designing modern UI trends like"squircles"(a mathematical midpoint between a square and a circle used heavily in iOS design) or organic"blob"shapes that add personality to landing pages. Our generator visualizes this hidden complexity, breaking down the 8-value longhand syntax into intuitive, independent sliders for every axis of every corner.
 </p>
 <p className="text-muted-foreground">
 Furthermore, the relationship between an element's dimensions and its border radius is critical. A 50% radius only creates a circle if the element is a perfect square; on a rectangle, it creates a pill shape. This tool provides a dynamic bounding box controller, allowing you to see exactly how your radius values behave as the aspect ratio of your component changes. Whether you are building a sleek pill-shaped navigation button, a user avatar container, or an abstract background element, this tool ensures your CSS is mathematically precise and visually perfect across all screen sizes.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"What does the slash (/) mean in the generated CSS?", answer:"The slash separates the horizontal radius values from the vertical radius values. For example, '10px / 20px' means the corners curve 10px inward horizontally, but 20px inward vertically, creating an elliptical rather than circular curve."},
 { question:"Can I use percentages instead of pixels?", answer:"Yes, CSS border-radius accepts percentages. However, percentages are calculated relative to the element's own width and height, which can lead to unpredictable elliptical shapes. This tool uses pixels for precise, predictable control."},
 { question:"Why does my 'Circle' preset look like an oval?", answer:"A perfect circle requires the element to have equal width and height. If your preview box is a rectangle (e.g., 300x200), applying a 50% or large radius will result in an oval or pill shape. Adjust the width and height to be equal for a true circle."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/dev/css-radius" max={6} />
 </div>
 );
}
