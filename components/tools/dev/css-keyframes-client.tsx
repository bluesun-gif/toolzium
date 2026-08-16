"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useEffect, useCallback } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Switch } from"@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Code2, Copy, Play, PlayCircle, RefreshCw, Sliders, Timer, Wand2 } from"lucide-react";
import { cn } from"@/lib/utils";

const presets: Record<string, string> = {
  Pulse: "0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); }",
  Bounce: "0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-30px); } 60% { transform: translateY(-15px); }",
  Shake: "0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); } 20%, 40%, 60%, 80% { transform: translateX(10px); }",
  Flip: "0% { transform: perspective(400px) rotateY(0); animation-timing-function: ease-out; } 40% { transform: perspective(400px) translateZ(150px) rotateY(170deg); animation-timing-function: ease-out; } 50% { transform: perspective(400px) translateZ(150px) rotateY(190deg); animation-timing-function: ease-in; } 80% { transform: perspective(400px) translateZ(0) rotateY(360deg); animation-timing-function: ease-in; } 100% { transform: perspective(400px) rotateY(360deg); }",
  FadeIn: "0% { opacity: 0; } 100% { opacity: 1; }",
  SlideUp: "0% { transform: translateY(100%); opacity: 0; } 100% { transform: translateY(0); opacity: 1; }",
  RotateSpin: "0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }",
  Heartbeat: "0% { transform: scale(1); } 14% { transform: scale(1.3); } 28% { transform: scale(1); } 42% { transform: scale(1.3); } 70% { transform: scale(1); }",
  Wobble: "0% { transform: translateX(0%); } 15% { transform: translateX(-25%) rotate(-5deg); } 30% { transform: translateX(20%) rotate(3deg); } 45% { transform: translateX(-15%) rotate(-3deg); } 60% { transform: translateX(10%) rotate(2deg); } 75% { transform: translateX(-5%) rotate(-1deg); } 100% { transform: translateX(0%); }"
};
export function CssKeyframesClient() {
  const [preset, setPreset] = useState("Pulse");
  const [duration, setDuration] = useState("1");
  const [timing, setTiming] = useState("ease");
  const [delay, setDelay] = useState("0");
  const [iteration, setIteration] = useState("infinite");
  const [direction, setDirection] = useState("normal");
  const [keyframes, setKeyframes] = useState(presets["Pulse"]);
  const [isPlaying, setIsPlaying] = useState(true);
  useEffect(() => {
    setKeyframes(presets[preset]);
  }, [preset]);
  const cssStyle = "animation: customAnim" + duration + "s" + timing + "" + delay + "s" + iteration + "" + direction + ";\n" + "@keyframes customAnim {\n" + keyframes.replace(/\} /g, "}\n") + "\n}";
  const previewStyle = isPlaying ? {
    animation: "customAnim" + duration + "s" + timing + "" + delay + "s" + iteration + "" + direction
  } : {};
  const handleReset = () => {
    setPreset("Pulse");
    setDuration("1");
    setTiming("ease");
    setDelay("0");
    setIteration("infinite");
    setDirection("normal");
    setIsPlaying(true);
  };
  const getCssText = () => cssStyle;
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Sliders} title="CSS Keyframe Animation Generator" description="Visually generate, test, and customize CSS @keyframes animations." actions={<>
 <CopyButton getText={getCssText} label="Copy CSS" />
 <ResetButton onClick={handleReset} label="Reset" />
 </>} />
 <style>
 {"@keyframes customAnim {" + keyframes + "}"}
 </style>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Animation Controls</CardTitle>
 <CardDescription>Adjust the animation settings</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Preset</Label>
 <Select value={preset} onValueChange={setPreset}>
 <SelectTrigger>
 <SelectValue placeholder="Select preset" />
 </SelectTrigger>
 <SelectContent>
 {Object.keys(presets).map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 
 <div className="space-y-2">
 <Label>Duration (seconds)</Label>
 <Input type="number" min="0.1" step="0.1" value={duration} onChange={e => setDuration(e.target.value)} />
 </div>
 
 <div className="space-y-2">
 <Label>Timing Function</Label>
 <Select value={timing} onValueChange={setTiming}>
 <SelectTrigger>
 <SelectValue placeholder="Select timing" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="ease">ease</SelectItem>
 <SelectItem value="linear">linear</SelectItem>
 <SelectItem value="ease-in">ease-in</SelectItem>
 <SelectItem value="ease-out">ease-out</SelectItem>
 <SelectItem value="ease-in-out">ease-in-out</SelectItem>
 <SelectItem value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">bouncy</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Delay (seconds)</Label>
 <Input type="number" min="0" step="0.1" value={delay} onChange={e => setDelay(e.target.value)} />
 </div>
 
 <div className="space-y-2">
 <Label>Iteration Count</Label>
 <Select value={iteration} onValueChange={setIteration}>
 <SelectTrigger>
 <SelectValue placeholder="Select count" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="1">1</SelectItem>
 <SelectItem value="2">2</SelectItem>
 <SelectItem value="3">3</SelectItem>
 <SelectItem value="infinite">infinite</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Direction</Label>
 <Select value={direction} onValueChange={setDirection}>
 <SelectTrigger>
 <SelectValue placeholder="Select direction" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="normal">normal</SelectItem>
 <SelectItem value="reverse">reverse</SelectItem>
 <SelectItem value="alternate">alternate</SelectItem>
 <SelectItem value="alternate-reverse">alternate-reverse</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2 pt-2 flex items-center justify-between">
 <Label>Playing</Label>
 <Switch checked={isPlaying} onCheckedChange={setIsPlaying} />
 </div>
 </CardContent>
 </GlassCard>
 
 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Live Preview</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="h-64 flex items-center justify-center bg-secondary/20 rounded-md border overflow-hidden">
 <div className="w-24 h-24 bg-primary rounded-md shadow-lg flex items-center justify-center text-primary-foreground font-bold" style={previewStyle}>
 Preview
 </div>
 </div>
 <div className="mt-4 flex justify-center">
 <ActionButton icon={RefreshCw} label="Replay" onClick={() => {
                  setIsPlaying(false);
                  setTimeout(() => setIsPlaying(true), 50);
                }} />
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Generated CSS</CardTitle>
 </CardHeader>
 <CardContent>
 <pre className="p-4 bg-muted text-muted-foreground rounded-md overflow-x-auto text-sm">
 <code>{cssStyle}</code>
 </pre>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Pick an Effect",
    description:"Choose a preset like fade, slide, bounce, or spin.",
    icon: Wand2,
  },
{
    step:"02",
    title:"Tune Timing",
    description:"Adjust duration, delay, and easing curve.",
    icon: Timer,
  },
{
    step:"03",
    title:"Copy CSS",
    description:"Export the @keyframes and animation rule.",
    icon: Code2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Wand2,
    title:"Animation Presets",
    description:"Start from fade, slide, pulse, and more.",
  },
{
    icon: Timer,
    title:"Timing Controls",
    description:"Set duration, delay, and iteration count.",
  },
{
    icon: PlayCircle,
    title:"Instant Preview",
    description:"See the effect on a sample element.",
  },
{
    icon: Code2,
    title:"Ready CSS",
    description:"Copy the full animation snippet.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>CSS animations bring interfaces to life, but the best motion is purposeful. A fade-in guides attention to new content; a subtle pulse signals a live element; a slide eases a panel into view. All of these are achievable with @keyframes and a single animation declaration, no JavaScript required.</p>
  <p>The workflow starts with choosing what changes. Most effects animate transform, opacity, or both. A fade animates opacity from 0 to 1. A slide combines opacity with a translate() offset. A bounce adds intermediate keyframes that overshoot and settle, creating a playful feel. Define these inside @keyframes with percentage stops.</p>
  <p>Timing shapes perception. Duration under 300ms feels snappy and is good for micro-interactions; 500ms to 1s suits larger transitions. The easing function determines whether motion accelerates, decelerates, or stays constant. cubic-bezier curves let you craft exactly the right feel — for example, a slight overshoot that mimics physical springs.</p>
  <p>Repetition and direction add polish. Looping a loader with infinite iteration keeps it alive, while alternate direction makes a back-and-forth motion like a swinging arrow. Pair the animation with animation-fill-mode: forwards when you want the element to hold its final state after finishing.</p>
  <p>Accessibility is non-negotiable. Some users experience discomfort from motion, so always wrap decorative animations in @media (prefers-reduced-motion: reduce) and disable or simplify them. Use our generator to prototype an effect, preview it live, and copy clean CSS into your project. Thoughtful animation improves UX; careless motion distracts from it.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Do I need JavaScript for CSS animations?",
    answer:"No. @keyframes and the animation property run entirely in CSS, which is efficient and requires no scripting.",
  },
{
    question:"How do I loop an animation?",
    answer:"Set animation-iteration-count to infinite, or a specific number of repeats.",
  },
{
    question:"What easing should I use?",
    answer:"Use ease-in-out for organic motion, linear for constant speed, and cubic-bezier for custom curves.",
  },
{
    question:"How do I make it run on hover?",
    answer:"Apply the animation only on :hover, or toggle a class with JavaScript for more control.",
  },
{
    question:"Are CSS animations accessible?",
    answer:"They can be. Wrap non-essential motion in prefers-reduced-motion so sensitive users are not affected.",
  }
  ]}
/>
</div>
 );
}
