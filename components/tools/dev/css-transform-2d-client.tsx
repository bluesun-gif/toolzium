"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Copy, RotateCcw, Move, RotateCw, Maximize, Sliders } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success("Copied to clipboard!");
};

export function CssTransform2dClient() {
 const [tx, setTx] = useState(0);
 const [ty, setTy] = useState(0);
 const [rotate, setRotate] = useState(0);
 const [sx, setSx] = useState(1);
 const [sy, setSy] = useState(1);
 const [skewX, setSkewX] = useState(0);
 const [skewY, setSkewY] = useState(0);
 const [originX, setOriginX] = useState(50);
 const [originY, setOriginY] = useState(50);
 const [transDuration, setTransDuration] = useState(0.3);

 const cssOutput = useMemo(() => {
 const transform = `transform: translate(${tx}px, ${ty}px) rotate(${rotate}deg) scale(${sx}, ${sy}) skew(${skewX}deg, ${skewY}deg);`;
 const origin = `transform-origin: ${originX}% ${originY}%;`;
 const transition = `transition: all ${transDuration}s ease;`;
 return `.${"transform-2d-element"} {\n ${transform}\n ${origin}\n ${transition}\n}`;
 }, [tx, ty, rotate, sx, sy, skewX, skewY, originX, originY, transDuration]);

 const reset = () => {
 setTx(0); setTy(0); setRotate(0); setSx(1); setSy(1); setSkewX(0); setSkewY(0); setOriginX(50); setOriginY(50);
 toast.success("Reset to default");
 };

 const applyPreset = (preset: string) => {
 reset();
 if (preset ==="tilt") setRotate(-15);
 if (preset ==="zoom") { setSx(1.5); setSy(1.5); }
 if (preset ==="skew") setSkewX(20);
 toast.success(`Applied ${preset} preset`);
 };

 const howItWorksSteps = [
 { step:"01", title:"Adjust Transform Functions", description:"Use the sliders to apply translate, rotate, scale, and skew transformations on the X and Y axes.", icon: Move },
 { step:"02", title:"Set Transform Origin", description:"Define the pivot point for rotations and scaling using the visual 9-point grid or custom percentage inputs.", icon: RotateCw },
 { step:"03", title:"Copy Production CSS", description:"Review the generated CSS including transition properties, and copy it directly into your stylesheet.", icon: Copy },
 ];

 const features = [
 { icon: Move, title:"Multi-Axis Translation", description:"Shift elements precisely along the X and Y axes using pixel-based translation controls."},
 { icon: RotateCw, title:"Dynamic Rotation & Skew", description:"Rotate elements up to 360 degrees and apply shear distortions to create unique parallelogram shapes."},
 { icon: Maximize, title:"Independent Scaling", description:"Scale width and height independently to stretch or compress elements without altering their aspect ratio."},
 { icon: Sliders, title:"Smooth Transitions", description:"Automatically includes CSS transition properties to ensure transforms animate smoothly on hover or state changes."},
 ];

 const faqs = [
 { question:"Does transform affect the document flow?", answer:"No, CSS transforms are purely visual. They do not alter the element's actual layout box, meaning surrounding elements will not shift to accommodate the transformed state."},
 { question:"What is transform-origin?", answer:"Transform-origin sets the anchor point for transformations. For example, rotating an element with an origin of '0% 0%' will spin it around its top-left corner rather than its center."},
 { question:"Are 2D transforms hardware accelerated?", answer:"Yes, modern browsers offload translate, scale, and rotate operations to the GPU compositor, ensuring buttery smooth 60fps animations without triggering expensive layout recalculations."},
 ];

 return (
 <div className="max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Move}
 title="CSS Transform 2D Generator"
 description="Visually build CSS 2D transforms with translate, rotate, scale, and skew controls, complete with origin mapping and live preview."
 />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Sliders className="w-4 h-4"/> Controls</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
 <div className="space-y-2">
 <Label className="text-xs flex justify-between"><span>Translate X</span><span>{tx}px</span></Label>
 <Input type="range"min="-200"max="200"value={tx} onChange={(e) => setTx(parseInt(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label className="text-xs flex justify-between"><span>Translate Y</span><span>{ty}px</span></Label>
 <Input type="range"min="-200"max="200"value={ty} onChange={(e) => setTy(parseInt(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label className="text-xs flex justify-between"><span>Rotate</span><span>{rotate}°</span></Label>
 <Input type="range"min="-360"max="360"value={rotate} onChange={(e) => setRotate(parseInt(e.target.value))} />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label className="text-xs flex justify-between"><span>Scale X</span><span>{sx}</span></Label>
 <Input type="range"min="0"max="3"step="0.1"value={sx} onChange={(e) => setSx(parseFloat(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label className="text-xs flex justify-between"><span>Scale Y</span><span>{sy}</span></Label>
 <Input type="range"min="0"max="3"step="0.1"value={sy} onChange={(e) => setSy(parseFloat(e.target.value))} />
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label className="text-xs flex justify-between"><span>Skew X</span><span>{skewX}°</span></Label>
 <Input type="range"min="-45"max="45"value={skewX} onChange={(e) => setSkewX(parseInt(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label className="text-xs flex justify-between"><span>Skew Y</span><span>{skewY}°</span></Label>
 <Input type="range"min="-45"max="45"value={skewY} onChange={(e) => setSkewY(parseInt(e.target.value))} />
 </div>
 </div>
 <div className="pt-4 border-t border-border/40 space-y-2">
 <Label className="text-xs font-bold">Transform Origin ({originX}% {originY}%)</Label>
 <div className="grid grid-cols-3 gap-1 w-24 h-24 mx-auto bg-muted/30 p-1 rounded-lg">
 {[0, 50, 100].map((y) => [0, 50, 100].map((x) => (
 <button 
 key={`${x}-${y}`} 
 className={`rounded-full border ${originX === x && originY === y ? 'bg-primary border-primary' : 'bg-background border-border'}`}
 onClick={() => { setOriginX(x); setOriginY(y); }}
 />
 )))}
 </div>
 </div>
 <div className="flex gap-2 pt-4">
 <Button variant="outline"size="sm"className="flex-1 text-xs"onClick={reset}><RotateCcw className="w-3 h-3 mr-1"/> Reset</Button>
 <Button variant="secondary"size="sm"className="text-xs"onClick={() => applyPreset("tilt")}>Tilt</Button>
 <Button variant="secondary"size="sm"className="text-xs"onClick={() => applyPreset("zoom")}>Zoom</Button>
 <Button variant="secondary"size="sm"className="text-xs"onClick={() => applyPreset("skew")}>Skew</Button>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className={`${cardClass} flex flex-col`}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Move className="w-4 h-4"/> Live Preview</CardTitle>
 </CardHeader>
 <CardContent className="p-8 flex-1 flex items-center justify-center relative bg-[linear-gradient(45deg,_#f0f0f0_25%,_transparent_25%),_linear-gradient(-45deg,_#f0f0f0_25%,_transparent_25%),_linear-gradient(45deg,_transparent_75%,_#f0f0f0_75%),_linear-gradient(-45deg,_transparent_75%,_#f0f0f0_75%)] bg-[length:20px_20px] bg-[position:0_0,_0_10px,_10px_-10px,_-10px_0px] dark:bg-[linear-gradient(45deg,_#333_25%,_transparent_25%),_linear-gradient(-45deg,_#333_25%,_transparent_25%),_linear-gradient(45deg,_transparent_75%,_#333_75%),_linear-gradient(-45deg,_transparent_75%,_#333_75%)] bg-[length:20px_20px] bg-[position:0_0,_0_10px,_10px_-10px,_-10px_0px]">
 <div className="absolute w-32 h-32 border-2 border-dashed border-primary/30 rounded-xl"/>
 <div 
 className="w-32 h-32 bg-primary rounded-xl shadow-2xl transition-all ease-out flex items-center justify-center text-white font-bold"
 style={{ 
 transform: `translate(${tx}px, ${ty}px) rotate(${rotate}deg) scale(${sx}, ${sy}) skew(${skewX}deg, ${skewY}deg)`,
 transformOrigin: `${originX}% ${originY}%`,
 transitionDuration: `${transDuration}s`
 }}
 >
 BOX
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex items-center justify-between w-full">
 <CardTitle className={titleClass}><Copy className="w-4 h-4"/> CSS Output</CardTitle>
 <Button variant="ghost"size="sm"onClick={() => handleCopy(cssOutput)} className="h-7 px-2 text-xs">
 <Copy className="w-3 h-3 mr-1"/> Copy
 </Button>
 </div>
 </CardHeader>
 <CardContent className="p-4">
 <pre className="w-full rounded-lg border border-border/70 bg-background p-4 text-xs text-cyan-400 overflow-x-auto h-[500px] leading-relaxed font-mono">
 {cssOutput}
 </pre>
 </CardContent>
 </GlassCard>
 </div>

 <ToolHowItWorks steps={howItWorksSteps} badges={["100% Free","GPU Accelerated","No Framework Lock-in"]} />
 
 <ToolFeatureGuides features={features}>
 <div className="prose prose-invert max-w-none mt-8">
 <h3>The Power of CSS 2D Transforms</h3>
 <p>CSS 2D transforms allow developers to manipulate the visual presentation of elements in a two-dimensional space without disrupting the underlying document flow. By combining functions like <code>translate()</code>, <code>rotate()</code>, <code>scale()</code>, and <code>skew()</code>, you can create complex visual effects, interactive hover states, and dynamic UI components purely through CSS. Our CSS Transform 2D Generator provides an interactive playground to experiment with these functions in real-time, eliminating the need to constantly refresh your browser to see the results of code changes.</p>
 <p>One of the most powerful features of 2D transforms is the <code>transform-origin</code> property. By default, transformations are applied relative to the center of the element (50% 50%). However, by shifting the origin point to a corner or an edge, you can drastically change the behavior of rotations and scales. Our visual 9-point grid makes it trivial to set these anchor points, allowing you to create effects like swinging doors, flipping cards, or elements that pivot from a specific corner. Furthermore, because transforms are composited on the GPU, they are incredibly performant, making them the ideal choice for smooth, 60fps animations on mobile and desktop devices alike.</p>
 <p>When paired with CSS transitions, 2D transforms become a robust animation engine. Simply define the initial and final transform states, add a transition property, and the browser will automatically interpolate the values over time. Whether you are building a subtle image zoom effect on hover or a complex off-canvas navigation menu, mastering 2D transforms is an essential skill for any modern frontend developer.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={faqs} />
 <RelatedTools currentToolUrl="/tools/dev/css-transform-2d"/>
 </div>
 );
}

export default CssTransform2dClient;
