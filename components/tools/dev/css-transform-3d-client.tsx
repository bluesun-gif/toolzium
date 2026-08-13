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
import { Copy, RotateCcw, Box, Eye, Sliders } from"lucide-react";
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

export function CssTransform3dClient() {
 const [perspective, setPerspective] = useState(1000);
 const [rotX, setRotX] = useState(0);
 const [rotY, setRotY] = useState(0);
 const [rotZ, setRotZ] = useState(0);
 const [transZ, setTransZ] = useState(0);
 const [scaleZ, setScaleZ] = useState(1);
 const [preserve3d, setPreserve3d] = useState(true);
 const [backface, setBackface] = useState("visible");

 const cssOutput = useMemo(() => {
 const parent = `.parent-container {\n perspective: ${perspective}px;\n perspective-origin: 50% 50%;\n}`;
 const child = `.child-element {\n transform-style: ${preserve3d ?"preserve-3d":"flat"};\n backface-visibility: ${backface};\n transform: rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) translateZ(${transZ}px) scaleZ(${scaleZ});\n transition: transform 0.4s ease;\n}`;
 return `${parent}\n\n${child}`;
 }, [perspective, rotX, rotY, rotZ, transZ, scaleZ, preserve3d, backface]);

 const reset = () => {
 setPerspective(1000); setRotX(0); setRotY(0); setRotZ(0); setTransZ(0); setScaleZ(1);
 toast.success("Reset to default");
 };

 const applyPreset = (preset: string) => {
 reset();
 if (preset ==="flip") setRotY(180);
 if (preset ==="tilt") { setRotX(20); setRotY(-20); }
 if (preset ==="door") { setRotY(-75); setPreserve3d(true); }
 toast.success(`Applied ${preset} preset`);
 };

 const howItWorksSteps = [
 { step:"01", title:"Define Parent Perspective", description:"Set the perspective distance on the parent container to establish the 3D space and depth perception.", icon: Eye },
 { step:"02", title:"Apply 3D Transforms", description:"Rotate the element along the X, Y, and Z axes, and push it forward or backward using translateZ.", icon: Box },
 { step:"03", title:"Configure Rendering", description:"Toggle transform-style preserve-3d for nested elements and manage backface visibility for flipping cards.", icon: Sliders },
 ];

 const features = [
 { icon: Eye, title:"Perspective Control", description:"Adjust the viewer's distance from the Z=0 plane, controlling the intensity of the 3D foreshortening effect."},
 { icon: Box, title:"Tri-Axis Rotation", description:"Freely rotate elements around the X, Y, and Z axes to build complex 3D structures like cubes and carousels."},
 { icon: Sliders, title:"Z-Axis Translation", description:"Move elements closer to or further from the viewer using translateZ, creating true depth layering."},
 { icon: RotateCcw, title:"Backface Management", description:"Hide the rear side of elements when rotated past 90 degrees, essential for double-sided card flip animations."},
 ];

 const faqs = [
 { question:"Why does my 3D transform look flat?", answer:"You likely need to set 'transform-style: preserve-3d' on the parent element, otherwise child elements are flattened into a single 2D plane before rendering."},
 { question:"What does perspective do?", answer:"Perspective defines how far the Z=0 plane is from the user. A lower value creates an exaggerated, extreme 3D effect, while a higher value results in a subtle, orthographic-like projection."},
 { question:"Can I nest 3D transformed elements?", answer:"Yes, but every intermediate parent container between the perspective origin and the final 3D element must also have 'transform-style: preserve-3d' applied to maintain the 3D rendering context."},
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
 icon={Box}
 title="CSS Transform 3D Generator"
 description="Build immersive CSS 3D environments with perspective, tri-axis rotation, and translateZ controls, featuring a live depth preview."
 />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Eye className="w-4 h-4"/> Perspective & Context</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <div className="space-y-2">
 <Label className="text-xs flex justify-between"><span>Perspective</span><span>{perspective}px</span></Label>
 <Input type="range"min="100"max="2000"step="50"value={perspective} onChange={(e) => setPerspective(parseInt(e.target.value))} />
 </div>
 <div className="flex items-center justify-between pt-2 border-t border-border/40">
 <Label className="text-xs">transform-style</Label>
 <select className="rounded border border-border/70 bg-background p-1 text-xs"value={preserve3d ?"preserve-3d":"flat"} onChange={(e) => setPreserve3d(e.target.value ==="preserve-3d")}>
 <option value="preserve-3d">preserve-3d</option>
 <option value="flat">flat</option>
 </select>
 </div>
 <div className="flex items-center justify-between">
 <Label className="text-xs">backface-visibility</Label>
 <select className="rounded border border-border/70 bg-background p-1 text-xs"value={backface} onChange={(e) => setBackface(e.target.value)}>
 <option value="visible">visible</option>
 <option value="hidden">hidden</option>
 </select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard className={`${cardClass} flex flex-col`}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Box className="w-4 h-4"/> 3D Preview</CardTitle>
 </CardHeader>
 <CardContent className="p-8 flex-1 flex items-center justify-center relative bg-background overflow-hidden"style={{ perspective: `${perspective}px` }}>
 <div 
 className="w-32 h-32 bg-primary/80 rounded-xl shadow-2xl border border-white/20 flex items-center justify-center text-white font-bold transition-transform duration-500"
 style={{ 
 transformStyle: preserve3d ?"preserve-3d":"flat",
 backfaceVisibility: backface as any,
 transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) translateZ(${transZ}px) scaleZ(${scaleZ})`
 }}
 >
 3D
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Sliders className="w-4 h-4"/> 3D Transforms</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
 <div className="space-y-2">
 <Label className="text-xs flex justify-between"><span>Rotate X</span><span>{rotX}°</span></Label>
 <Input type="range"min="-180"max="180"value={rotX} onChange={(e) => setRotX(parseInt(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label className="text-xs flex justify-between"><span>Rotate Y</span><span>{rotY}°</span></Label>
 <Input type="range"min="-180"max="180"value={rotY} onChange={(e) => setRotY(parseInt(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label className="text-xs flex justify-between"><span>Rotate Z</span><span>{rotZ}°</span></Label>
 <Input type="range"min="-180"max="180"value={rotZ} onChange={(e) => setRotZ(parseInt(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label className="text-xs flex justify-between"><span>Translate Z</span><span>{transZ}px</span></Label>
 <Input type="range"min="-200"max="200"value={transZ} onChange={(e) => setTransZ(parseInt(e.target.value))} />
 </div>
 <div className="flex gap-2 pt-4 border-t border-border/40">
 <Button variant="outline"size="sm"className="flex-1 text-xs"onClick={reset}><RotateCcw className="w-3 h-3 mr-1"/> Reset</Button>
 <Button variant="secondary"size="sm"className="text-xs"onClick={() => applyPreset("flip")}>Flip</Button>
 <Button variant="secondary"size="sm"className="text-xs"onClick={() => applyPreset("tilt")}>Tilt</Button>
 <Button variant="secondary"size="sm"className="text-xs"onClick={() => applyPreset("door")}>Door</Button>
 </div>
 <div className="pt-4 border-t border-border/40">
 <div className="flex items-center justify-between mb-2">
 <CardTitle className={titleClass}><Copy className="w-4 h-4"/> CSS Output</CardTitle>
 <Button variant="ghost"size="sm"onClick={() => handleCopy(cssOutput)} className="h-7 px-2 text-xs">
 <Copy className="w-3 h-3 mr-1"/> Copy
 </Button>
 </div>
 <pre className="w-full rounded-lg border border-border/70 bg-background p-3 text-[10px] text-cyan-400 overflow-x-auto h-48 leading-relaxed font-mono">
 {cssOutput}
 </pre>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <ToolHowItWorks steps={howItWorksSteps} badges={["100% Free","Hardware Accelerated","Cross-Browser"]} />
 
 <ToolFeatureGuides features={features}>
 <div className="prose prose-invert max-w-none mt-8">
 <h3>Building 3D Interfaces with CSS</h3>
 <p>CSS 3D transforms unlock the ability to manipulate elements in a three-dimensional coordinate system, adding depth and spatial awareness to web interfaces. By utilizing properties like <code>perspective</code>, <code>rotateX</code>, <code>rotateY</code>, and <code>translateZ</code>, developers can construct interactive 3D carousels, flipping product cards, and parallax scrolling effects without relying on heavy WebGL libraries or canvas elements. Our CSS Transform 3D Generator provides a comprehensive control panel to experiment with these spatial properties safely and efficiently.</p>
 <p>The cornerstone of CSS 3D is the <code>perspective</code> property, which must be applied to the parent container. This defines the distance between the Z=0 plane and the user's eye, effectively controlling the strength of the 3D foreshortening. A lower perspective value creates a dramatic, fisheye-like distortion, while a higher value yields a flatter, more orthographic projection. Coupled with <code>transform-style: preserve-3d</code>, child elements can maintain their individual positions in 3D space rather than being flattened into a single 2D plane.</p>
 <p>Managing the <code>backface-visibility</code> property is crucial when building elements that rotate past 90 degrees, such as flashcards or coins. Setting it to <code>hidden</code> ensures that the mirrored reverse side of the element is not rendered, allowing you to seamlessly stack a front and back face to create true double-sided 3D objects. Mastering these CSS properties allows you to build highly engaging, tactile user interfaces that feel native and responsive.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={faqs} />
 <RelatedTools currentToolUrl="/tools/dev/css-transform-3d"/>
 </div>
 );
}

export default CssTransform3dClient;
