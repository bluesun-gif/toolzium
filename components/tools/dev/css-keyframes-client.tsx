"use client";

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
import { Play, Sliders, Copy, RefreshCw, Sparkles, Shield, Zap } from"lucide-react";
import { cn } from"@/lib/utils";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

const presets: Record<string, string> = {
 Pulse:"0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); }",
 Bounce:"0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-30px); } 60% { transform: translateY(-15px); }",
 Shake:"0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); } 20%, 40%, 60%, 80% { transform: translateX(10px); }",
 Flip:"0% { transform: perspective(400px) rotateY(0); animation-timing-function: ease-out; } 40% { transform: perspective(400px) translateZ(150px) rotateY(170deg); animation-timing-function: ease-out; } 50% { transform: perspective(400px) translateZ(150px) rotateY(190deg); animation-timing-function: ease-in; } 80% { transform: perspective(400px) translateZ(0) rotateY(360deg); animation-timing-function: ease-in; } 100% { transform: perspective(400px) rotateY(360deg); }",
 FadeIn:"0% { opacity: 0; } 100% { opacity: 1; }",
 SlideUp:"0% { transform: translateY(100%); opacity: 0; } 100% { transform: translateY(0); opacity: 1; }",
 RotateSpin:"0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }",
 Heartbeat:"0% { transform: scale(1); } 14% { transform: scale(1.3); } 28% { transform: scale(1); } 42% { transform: scale(1.3); } 70% { transform: scale(1); }",
 Wobble:"0% { transform: translateX(0%); } 15% { transform: translateX(-25%) rotate(-5deg); } 30% { transform: translateX(20%) rotate(3deg); } 45% { transform: translateX(-15%) rotate(-3deg); } 60% { transform: translateX(10%) rotate(2deg); } 75% { transform: translateX(-5%) rotate(-1deg); } 100% { transform: translateX(0%); }"
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

 const cssStyle ="animation: customAnim"+ duration +"s"+ timing +""+ delay +"s"+ iteration +""+ direction +";\n"+
"@keyframes customAnim {\n"+ keyframes.replace(/\} /g,"}\n") +"\n}";

 const previewStyle = isPlaying
 ? {
 animation:"customAnim"+ duration +"s"+ timing +""+ delay +"s"+ iteration +""+ direction
 }
 : {};

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

 return (
      <div className="relative space-y-6">
      <GridPattern />

 <ToolPageHeader
 icon={Sliders}
 title="CSS Keyframe Animation Generator"
 description="Visually generate, test, and customize CSS @keyframes animations."
 actions={
 <>
 <CopyButton getText={getCssText} label="Copy CSS"/>
 <ResetButton onClick={handleReset} label="Reset"/>
 </>
 }
 />
 <style>
 {"@keyframes customAnim {"+ keyframes +"}"}
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
 <SelectValue placeholder="Select preset"/>
 </SelectTrigger>
 <SelectContent>
 {Object.keys(presets).map((p) => (
 <SelectItem key={p} value={p}>{p}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 
 <div className="space-y-2">
 <Label>Duration (seconds)</Label>
 <Input
 type="number"
 min="0.1"
 step="0.1"
 value={duration}
 onChange={(e) => setDuration(e.target.value)}
 />
 </div>
 
 <div className="space-y-2">
 <Label>Timing Function</Label>
 <Select value={timing} onValueChange={setTiming}>
 <SelectTrigger>
 <SelectValue placeholder="Select timing"/>
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
 <Input
 type="number"
 min="0"
 step="0.1"
 value={delay}
 onChange={(e) => setDelay(e.target.value)}
 />
 </div>
 
 <div className="space-y-2">
 <Label>Iteration Count</Label>
 <Select value={iteration} onValueChange={setIteration}>
 <SelectTrigger>
 <SelectValue placeholder="Select count"/>
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
 <SelectValue placeholder="Select direction"/>
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
 <div 
 className="w-24 h-24 bg-primary rounded-md shadow-lg flex items-center justify-center text-primary-foreground font-bold"
 style={previewStyle}
 >
 Preview
 </div>
 </div>
 <div className="mt-4 flex justify-center">
 <ActionButton
 icon={RefreshCw}
 label="Replay"
 onClick={() => {
 setIsPlaying(false);
 setTimeout(() => setIsPlaying(true), 50);
 }}
 />
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
            step: "01",
            title: "Input Your Data",
            description: "Enter your information in the input field above and configure any options.",
            icon: Sparkles,
          },
          {
            step: "02",
            title: "Process & Generate",
            description: "The tool processes your input instantly and displays the results.",
            icon: Zap,
          },
          {
            step: "03",
            title: "Copy & Use",
            description: "Copy the output with one click and use it wherever you need.",
            icon: Copy,
          },
        ]}
        badges={["100% Free", "Instant Results", "Privacy-First"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Sparkles,
            title: "Lightning Fast",
            description: "Get results in milliseconds with our optimized client-side processing engine.",
          },
          {
            icon: Shield,
            title: "Completely Private",
            description: "All processing happens in your browser. Your data never leaves your device.",
          },
          {
            icon: Zap,
            title: "No Signup Required",
            description: "Use this tool instantly without creating an account or providing any personal information.",
          },
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our CSS Keyframe Animation Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our CSS Keyframe Animation Generator provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "Is this tool free to use?",
            answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server.",
          },
          {
            question: "Do I need to create an account?",
            answer: "No account or registration is required. Simply open the tool and start using it immediately.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/dev/css-keyframes" max={6} />

</div>
 );
}
