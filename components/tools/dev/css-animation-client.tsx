"use client";

import React, { useState, useMemo, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Copy, RotateCcw, Play, Pause, Sparkles, Layers, Settings } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success("Copied to clipboard!");
};

type Keyframe = { offset: number; transform: string; opacity: number };

export function CssAnimationClient() {
 const [name, setName] = useState("customBounce");
 const [duration, setDuration] = useState(2);
 const [timing, setTiming] = useState("ease-in-out");
 const [delay, setDelay] = useState(0);
 const [iteration, setIteration] = useState("infinite");
 const [direction, setDirection] = useState("alternate");
 const [fillMode, setFillMode] = useState("both");
 const [isPlaying, setIsPlaying] = useState(true);

 const [keyframes, setKeyframes] = useState<Keyframe[]>([
 { offset: 0, transform:"translateY(0) scale(1)", opacity: 1 },
 { offset: 50, transform:"translateY(-30px) scale(1.1)", opacity: 0.8 },
 { offset: 100, transform:"translateY(0) scale(1)", opacity: 1 },
 ]);

 const presets = [
 { name:"Bounce", kf: [{ offset: 0, transform:"translateY(0)", opacity: 1 }, { offset: 50, transform:"translateY(-40px)", opacity: 1 }, { offset: 100, transform:"translateY(0)", opacity: 1 }] },
 { name:"Fade In", kf: [{ offset: 0, transform:"translateY(20px)", opacity: 0 }, { offset: 100, transform:"translateY(0)", opacity: 1 }] },
 { name:"Pulse", kf: [{ offset: 0, transform:"scale(1)", opacity: 1 }, { offset: 50, transform:"scale(1.05)", opacity: 0.8 }, { offset: 100, transform:"scale(1)", opacity: 1 }] },
 { name:"Shake", kf: [{ offset: 0, transform:"translateX(0)", opacity: 1 }, { offset: 25, transform:"translateX(-10px)", opacity: 1 }, { offset: 75, transform:"translateX(10px)", opacity: 1 }, { offset: 100, transform:"translateX(0)", opacity: 1 }] },
 { name:"Spin", kf: [{ offset: 0, transform:"rotate(0deg)", opacity: 1 }, { offset: 100, transform:"rotate(360deg)", opacity: 1 }] },
 ];

 const cssOutput = useMemo(() => {
 const kfString = keyframes
 .sort((a, b) => a.offset - b.offset)
 .map((k) => ` ${k.offset}% {\n transform: ${k.transform};\n opacity: ${k.opacity};\n }`)
 .join("\n");
 
 return `@keyframes ${name} {\n${kfString}\n}\n\n.animated-element {\n animation: ${name} ${duration}s ${timing} ${delay}s ${iteration} ${direction} ${fillMode};\n}`;
 }, [name, duration, timing, delay, iteration, direction, fillMode, keyframes]);

 const animationStyle = isPlaying ? { animation: `${name} ${duration}s ${timing} ${delay}s ${iteration} ${direction} ${fillMode}` } : { animationPlayState:"paused"};

 useEffect(() => {
 const styleId ="dynamic-keyframes";
 let styleTag = document.getElementById(styleId) as HTMLStyleElement;
 if (!styleTag) {
 styleTag = document.createElement("style");
 styleTag.id = styleId;
 document.head.appendChild(styleTag);
 }
 styleTag.innerHTML = `@keyframes ${name} { ${keyframes.sort((a, b) => a.offset - b.offset).map((k) => `${k.offset}% { transform: ${k.transform}; opacity: ${k.opacity}; }`).join("")} }`;
 }, [name, keyframes]);

 const applyPreset = (preset: any) => {
 setKeyframes(preset.kf);
 setName(preset.name.toLowerCase().replace("",""));
 toast.success(`Applied ${preset.name} preset`);
 };

 const updateKeyframe = (index: number, field: keyof Keyframe, value: any) => {
 const newKf = [...keyframes];
 (newKf[index] as any)[field] = value;
 setKeyframes(newKf);
 };

 const howItWorksSteps = [
 { step:"01", title:"Set Animation Properties", description:"Define the duration, timing function, iteration count, and direction for your CSS animation.", icon: Settings },
 { step:"02", title:"Edit Keyframes", description:"Add or modify keyframe percentages, applying transforms, opacity, and other CSS properties at each step.", icon: Layers },
 { step:"03", title:"Preview & Export", description:"Watch your animation play live in the preview pane, then copy the production-ready CSS code.", icon: Sparkles },
 ];

 const features = [
 { icon: Play, title:"Live Real-Time Preview", description:"Watch your animation play instantly as you adjust keyframes and timing properties without needing to refresh."},
 { icon: Layers, title:"Visual Keyframe Editor", description:"Intuitively manage keyframe percentages and their corresponding CSS transform and opacity values."},
 { icon: Sparkles, title:"One-Click Presets", description:"Jumpstart your workflow with built-in presets like Bounce, Fade In, Pulse, Shake, and Spin."},
 { icon: Settings, title:"Granular Control", description:"Fine-tune every aspect of the animation shorthand, including fill-mode, delay, and iteration direction."},
 ];

 const faqs = [
 { question:"Can I use the generated CSS in any framework?", answer:"Yes, the output is standard CSS @keyframes and animation shorthand, which works natively in React, Vue, Angular, Svelte, and plain HTML."},
 { question:"How do I pause the animation in the preview?", answer:"Use the Play/Pause toggle above the preview box. This sets the animation-play-state to paused without altering the generated CSS."},
 { question:"Can I animate properties other than transform and opacity?", answer:"Currently, the visual editor focuses on transform and opacity for performance reasons, but you can manually edit the generated CSS to include colors, borders, etc."},
 ];



 return (
 <div className="max-w-6xl mx-auto space-y-8">
 <ToolPageHeader
 icon={Sparkles}
 title="CSS Animation Generator"
 description="Build complex CSS @keyframes animations visually with a live preview, timeline editor, and production-ready code export."
 />

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <div className="flex items-center justify-between w-full">
 <CardTitle className={titleClass}><Play className="w-4 h-4"/> Live Preview</CardTitle>
 <Button variant="ghost"size="sm"onClick={() => setIsPlaying(!isPlaying)} className="h-7 px-2 text-xs">
 {isPlaying ? <Pause className="w-3 h-3 mr-1"/> : <Play className="w-3 h-3 mr-1"/>}
 {isPlaying ?"Pause":"Play"}
 </Button>
 </div>
 </CardHeader>
 <CardContent className="p-8 flex items-center justify-center min-h-[200px] bg-muted/10 border-b border-border/40">
 <div 
 className="w-24 h-24 bg-primary rounded-xl shadow-2xl"
 style={animationStyle}
 />
 </CardContent>
 </Card>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Settings className="w-4 h-4"/> Controls & Keyframes</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <div className="grid grid-cols-2 gap-3">
 <div className="space-y-1">
 <Label className="text-xs">Name</Label>
 <Input value={name} onChange={(e) => setName(e.target.value)} />
 </div>
 <div className="space-y-1">
 <Label className="text-xs">Duration ({duration}s)</Label>
 <Input type="range"min="0.1"max="10"step="0.1"value={duration} onChange={(e) => setDuration(parseFloat(e.target.value))} />
 </div>
 <div className="space-y-1">
 <Label className="text-xs">Timing</Label>
 <select className="w-full rounded border border-border/70 bg-background p-1.5 text-xs"value={timing} onChange={(e) => setTiming(e.target.value)}>
 <option>ease</option><option>linear</option><option>ease-in</option><option>ease-out</option><option>ease-in-out</option>
 </select>
 </div>
 <div className="space-y-1">
 <Label className="text-xs">Iteration</Label>
 <select className="w-full rounded border border-border/70 bg-background p-1.5 text-xs"value={iteration} onChange={(e) => setIteration(e.target.value)}>
 <option>1</option><option>2</option><option>3</option><option>infinite</option>
 </select>
 </div>
 </div>

 <div className="space-y-2 pt-4 border-t border-border/40">
 <Label className="text-xs font-bold">Keyframes</Label>
 {keyframes.map((kf, i) => (
 <div key={i} className="flex gap-2 items-center bg-muted/20 p-2 rounded-lg">
 <Input type="number"className="w-16 h-7 text-xs"value={kf.offset} onChange={(e) => updateKeyframe(i,"offset", parseInt(e.target.value))} />
 <Input className="flex-1 h-7 text-xs"value={kf.transform} onChange={(e) => updateKeyframe(i,"transform", e.target.value)} placeholder="transform"/>
 <Input type="number"className="w-16 h-7 text-xs"step="0.1"min="0"max="1"value={kf.opacity} onChange={(e) => updateKeyframe(i,"opacity", parseFloat(e.target.value))} />
 </div>
 ))}
 <Button variant="outline"size="sm"className="w-full text-xs"onClick={() => setKeyframes([...keyframes, { offset: 50, transform:"none", opacity: 1 }])}>
 + Add Keyframe
 </Button>
 </div>

 <div className="space-y-2 pt-4 border-t border-border/40">
 <Label className="text-xs font-bold">Presets</Label>
 <div className="flex flex-wrap gap-2">
 {presets.map((p) => (
 <Button key={p.name} variant="secondary"size="sm"className="text-xs h-7"onClick={() => applyPreset(p)}>
 {p.name}
 </Button>
 ))}
 </div>
 </div>
 </CardContent>
 </Card>

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <div className="flex items-center justify-between w-full">
 <CardTitle className={titleClass}><Sparkles className="w-4 h-4"/> CSS Output</CardTitle>
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
 </Card>
 </div>

 <ToolHowItWorks steps={howItWorksSteps} badges={["100% Free","Real-Time Preview","No Watermarks"]} />
 
 <ToolFeatureGuides features={features}>
 <div className="prose prose-invert max-w-none mt-8">
 <h3>Mastering CSS Keyframe Animations</h3>
 <p>CSS animations bring user interfaces to life, providing visual feedback, guiding user attention, and creating delightful micro-interactions. However, writing raw <code>@keyframes</code> syntax by hand can be tedious, especially when trying to visualize the exact timing and transformation states across multiple percentages. Our CSS Animation Generator eliminates the guesswork by providing a visual timeline editor paired with a real-time live preview pane.</p>
 <p>Whether you are building a subtle hover effect for a call-to-action button or a complex entrance animation for a landing page hero section, this tool gives you granular control over every aspect of the CSS <code>animation</code> shorthand property. Adjust the duration, experiment with different cubic-bezier timing functions, and set iteration counts to infinite for continuous loading spinners or background elements. The visual keyframe editor allows you to define exact states at 0%, 50%, and 100%, applying transforms like translate, rotate, and scale, alongside opacity changes.</p>
 <p>Performance is critical when animating on the web. By focusing on <code>transform</code> and <code>opacity</code>—the only two CSS properties that can be animated cheaply on the compositor thread without triggering layout recalculations or repaints—our generated code ensures your animations run at a buttery-smooth 60 frames per second, even on low-end mobile devices. Stop toggling back and forth between your code editor and the browser; design, preview, and export production-ready CSS animations all in one unified workspace.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={faqs} />
 <RelatedTools currentToolUrl="/tools/dev/css-animation"/>
 </div>
 );
}

export default CssAnimationClient;
