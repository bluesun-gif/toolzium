"use client";

import React, { useState, useMemo, useCallback } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import toast from"react-hot-toast";
import { Play, Pause, Copy, RotateCcw, Clock, Zap, Box } from"lucide-react";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

const keyframesCSS = `
 @keyframes slideIn { 0% { transform: translateX(-100px); opacity: 0; } 100% { transform: translateX(100px); opacity: 1; } }
 @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-50px); } }
 @keyframes fade { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
 @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
 @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
`;

export default function CssKeyframesSpeedClient() {
 const [duration, setDuration] = useState(2.0);
 const [delay, setDelay] = useState(0);
 const [direction, setDirection] = useState("normal");
 const [timing, setTiming] = useState("ease");
 const [x1, setX1] = useState(0.25);
 const [y1, setY1] = useState(0.1);
 const [x2, setX2] = useState(0.25);
 const [y2, setY2] = useState(1.0);
 const [iteration, setIteration] = useState("infinite");
 const [fill, setFill] = useState("none");
 const [playState, setPlayState] = useState("running");
 const [preset, setPreset] = useState("bounce");
 const [animKey, setAnimKey] = useState(0);

 const timingFunction = timing ==="cubic-bezier"? `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})` : timing;
 const iterationVal = iteration ==="infinite"?"infinite": parseInt(iteration);
 
 const animationString = `${preset} ${duration}s ${timingFunction} ${delay}s ${iterationVal} ${direction} ${fill} ${playState}`;

 const cssOutput = `.animated-element {
 animation: ${animationString};
}`;

 const restartAnimation = () => {
 setAnimKey(prev => prev + 1);
 };

 const copyCSS = () => {
 navigator.clipboard.writeText(cssOutput);
 toast.success("CSS copied to clipboard!");
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <style>{keyframesCSS}</style>
 
 <ToolPageHeader
 icon={Zap}
 title="CSS Keyframes Speed Controller"
 description="Visual CSS animation speed, timing, and bezier curve tester with real-time preview and code generation."
 />

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Box className="w-4 h-4 text-primary"/> Animation Preview
 </CardTitle>
 </CardHeader>
 <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] bg-muted/10 relative">
 <div 
 key={animKey}
 className="w-24 h-24 bg-primary rounded-xl shadow-2xl"
 style={{ animation: animationString }}
 />
 <Button variant="outline"size="sm"className="absolute top-4 right-4"onClick={restartAnimation}>
 <RotateCcw className="w-4 h-4 mr-2"/> Restart
 </Button>
 </CardContent>
 </Card>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Clock className="w-4 h-4 text-primary"/> Timing & Speed
 </CardTitle>
 </CardHeader>
 <CardContent className="p-5 space-y-5">
 <div className="space-y-2">
 <div className="flex justify-between text-sm font-medium">
 <Label>Duration</Label>
 <span className="text-primary font-mono">{duration.toFixed(1)}s</span>
 </div>
 <input type="range"min="0.1"max="10"step="0.1"value={duration} onChange={e => setDuration(parseFloat(e.target.value))} className="w-full accent-primary"/>
 </div>
 <div className="space-y-2">
 <div className="flex justify-between text-sm font-medium">
 <Label>Delay</Label>
 <span className="text-primary font-mono">{delay.toFixed(1)}s</span>
 </div>
 <input type="range"min="0"max="5"step="0.1"value={delay} onChange={e => setDelay(parseFloat(e.target.value))} className="w-full accent-primary"/>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Preset Animation</Label>
 <select value={preset} onChange={e => setPreset(e.target.value)} className="w-full p-2 rounded-md border border-border bg-background text-sm outline-none">
 <option value="slideIn">Slide In</option>
 <option value="bounce">Bounce</option>
 <option value="fade">Fade</option>
 <option value="spin">Spin</option>
 <option value="pulse">Pulse</option>
 </select>
 </div>
 <div className="space-y-2">
 <Label>Iteration Count</Label>
 <select value={iteration} onChange={e => setIteration(e.target.value)} className="w-full p-2 rounded-md border border-border bg-background text-sm outline-none">
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="infinite">Infinite</option>
 </select>
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Direction</Label>
 <select value={direction} onChange={e => setDirection(e.target.value)} className="w-full p-2 rounded-md border border-border bg-background text-sm outline-none">
 <option value="normal">Normal</option>
 <option value="reverse">Reverse</option>
 <option value="alternate">Alternate</option>
 <option value="alternate-reverse">Alternate-Reverse</option>
 </select>
 </div>
 <div className="space-y-2">
 <Label>Fill Mode</Label>
 <select value={fill} onChange={e => setFill(e.target.value)} className="w-full p-2 rounded-md border border-border bg-background text-sm outline-none">
 <option value="none">None</option>
 <option value="forwards">Forwards</option>
 <option value="backwards">Backwards</option>
 <option value="both">Both</option>
 </select>
 </div>
 </div>
 <div className="flex gap-2">
 <Button variant={playState ==="running"?"default":"outline"} className="flex-1 text-xs font-semibold"onClick={() => setPlayState("running")}>
 <Play className="w-4 h-4 mr-2"/> Running
 </Button>
 <Button variant={playState ==="paused"?"default":"outline"} className="flex-1 text-xs font-semibold"onClick={() => setPlayState("paused")}>
 <Pause className="w-4 h-4 mr-2"/> Paused
 </Button>
 </div>
 </CardContent>
 </Card>

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Zap className="w-4 h-4 text-primary"/> Timing Function
 </CardTitle>
 </CardHeader>
 <CardContent className="p-5 space-y-5">
 <div className="space-y-2">
 <Label>Easing Function</Label>
 <select value={timing} onChange={e => setTiming(e.target.value)} className="w-full p-2 rounded-md border border-border bg-background text-sm outline-none">
 <option value="linear">Linear</option>
 <option value="ease">Ease</option>
 <option value="ease-in">Ease-In</option>
 <option value="ease-out">Ease-Out</option>
 <option value="ease-in-out">Ease-In-Out</option>
 <option value="cubic-bezier">Custom Cubic-Bezier</option>
 </select>
 </div>
 
 {timing ==="cubic-bezier"&& (
 <div className="space-y-4">
 <div className="flex justify-center">
 <svg viewBox="0 0 100 100"className="w-48 h-48 bg-muted/30 rounded-lg border border-border/50">
 <line x1="0"y1="100"x2="100"y2="0"stroke="currentColor"strokeWidth="1"strokeDasharray="2,2"opacity="0.3"/>
 <path d={`M 0 100 C ${x1 * 100} ${100 - y1 * 100}, ${x2 * 100} ${100 - y2 * 100}, 100 0`} fill="none"stroke="hsl(var(--primary))"strokeWidth="3"/>
 <circle cx={x1 * 100} cy={100 - y1 * 100} r="4"fill="hsl(var(--primary))"/>
 <circle cx={x2 * 100} cy={100 - y2 * 100} r="4"fill="hsl(var(--primary))"/>
 </svg>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-1">
 <Label className="text-xs">X1 ({x1.toFixed(2)})</Label>
 <input type="range"min="0"max="1"step="0.01"value={x1} onChange={e => setX1(parseFloat(e.target.value))} className="w-full accent-primary"/>
 </div>
 <div className="space-y-1">
 <Label className="text-xs">Y1 ({y1.toFixed(2)})</Label>
 <input type="range"min="0"max="1"step="0.01"value={y1} onChange={e => setY1(parseFloat(e.target.value))} className="w-full accent-primary"/>
 </div>
 <div className="space-y-1">
 <Label className="text-xs">X2 ({x2.toFixed(2)})</Label>
 <input type="range"min="0"max="1"step="0.01"value={x2} onChange={e => setX2(parseFloat(e.target.value))} className="w-full accent-primary"/>
 </div>
 <div className="space-y-1">
 <Label className="text-xs">Y2 ({y2.toFixed(2)})</Label>
 <input type="range"min="0"max="1"step="0.01"value={y2} onChange={e => setY2(parseFloat(e.target.value))} className="w-full accent-primary"/>
 </div>
 </div>
 </div>
 )}
 </CardContent>
 </Card>
 </div>

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Copy className="w-4 h-4 text-primary"/> Generated CSS
 </CardTitle>
 <Button size="sm"className="h-8 text-xs px-3"onClick={copyCSS}>
 <Copy className="w-3.5 h-3.5 mr-1.5"/> Copy Code
 </Button>
 </CardHeader>
 <CardContent className="p-5">
 <pre className="p-4 bg-muted/30 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed text-foreground">{cssOutput}</pre>
 </CardContent>
 </Card>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Select Animation", description:"Choose from preset keyframes like Bounce, Spin, or Fade to test.", icon: Box },
 { step:"02", title:"Adjust Timing", description:"Use sliders to tweak duration, delay, and custom cubic-bezier curves.", icon: Clock },
 { step:"03", title:"Export CSS", description:"Copy the generated, production-ready CSS animation code instantly.", icon: Copy }
 ]}
 badges={["100% Client-Side","Real-Time Preview","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Zap, title:"Real-Time Visual Feedback", description:"See every slider adjustment instantly on the live preview canvas without page reloads."},
 { icon: Zap, title:"Custom Bezier Editor", description:"Visually design complex easing curves with an interactive SVG graph and precise coordinate inputs."},
 { icon: Clock, title:"Comprehensive Timing Controls", description:"Master every CSS animation property including fill-mode, direction, and iteration counts."},
 { icon: Copy, title:"One-Click Export", description:"Generate clean, standards-compliant CSS code ready to paste directly into your stylesheets."}
 ]}
 >
 <h3 className="text-xl font-bold mb-4">Mastering CSS Animation Timing Functions</h3>
 <p className="text-muted-foreground mb-4">
 CSS animations are a cornerstone of modern web design, providing the micro-interactions and visual feedback that make user interfaces feel alive and responsive. However, achieving the perfect"feel"for an animation often requires tedious trial and error, constantly switching between code editors and browser windows. The CSS Keyframes Speed Controller eliminates this friction by providing a centralized, visual playground for every aspect of the CSS <code className="text-primary">animation</code> shorthand property.
 </p>
 <p className="text-muted-foreground mb-4">
 At the heart of fluid animation is the timing function, or easing curve. While basic presets like <code className="text-primary">ease-in</code> and <code className="text-primary">ease-out</code> cover basic needs, professional UI design often demands custom <code className="text-primary">cubic-bezier</code> curves to create signature brand movements or mimic real-world physics. Our integrated bezier editor allows you to manipulate the four control points of the curve visually, translating abstract mathematical coordinates into immediate visual results.
 </p>
 <p className="text-muted-foreground">
 Beyond simple speed adjustments, this tool exposes the full power of the CSS animation specification. You can experiment with <code className="text-primary">animation-direction</code> to create seamless looping effects, utilize <code className="text-primary">animation-fill-mode</code> to control element states before and after execution, and manage <code className="text-primary">animation-delay</code> for choreographed sequences. By generating clean, vendor-agnostic CSS code, this tool bridges the gap between creative design intent and robust frontend implementation.
 </p>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Does this tool support custom @keyframes?", answer:"Currently, the tool provides 5 robust preset keyframes (Slide, Bounce, Fade, Spin, Pulse) to test timing functions. You can apply the generated timing properties to your own custom @keyframes in your CSS."},
 { question:"What is the difference between fill-mode forwards and both?", answer:"'Forwards' retains the final keyframe state after the animation ends. 'Both' applies the rules of both 'forwards' and 'backwards', meaning it will apply the first keyframe styles during the delay period and retain the last keyframe styles after completion."},
 { question:"Are the generated CSS properties cross-browser compatible?", answer:"Yes, the standard 'animation' shorthand property is fully supported in all modern browsers. Vendor prefixes like -webkit- are rarely needed for standard keyframes in modern web development."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/dev/css-keyframes-speed"max={6} />
 </div>
 );
}
