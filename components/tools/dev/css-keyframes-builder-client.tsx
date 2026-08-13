"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Play, Sliders, Copy, RefreshCw, Plus, Trash2, Sparkles, Shield, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
interface KeyframeStep {
  percent: number;
  scale: string;
  rotate: string;
  translateX: string;
  translateY: string;
  opacity: string;
  backgroundColor: string;
  borderRadius: string;
}
export function CssKeyframesBuilderClient() {
  const defaultKeyframes: KeyframeStep[] = [{
    percent: 0,
    scale: "1",
    rotate: "0",
    translateX: "0",
    translateY: "0",
    opacity: "1",
    backgroundColor: "#3b82f6",
    borderRadius: "0"
  }, {
    percent: 50,
    scale: "1.2",
    rotate: "180",
    translateX: "0",
    translateY: "0",
    opacity: "0.8",
    backgroundColor: "#ec4899",
    borderRadius: "50"
  }, {
    percent: 100,
    scale: "1",
    rotate: "360",
    translateX: "0",
    translateY: "0",
    opacity: "1",
    backgroundColor: "#3b82f6",
    borderRadius: "0"
  }];
  const [keyframes, setKeyframes] = useState<KeyframeStep[]>(defaultKeyframes);
  const [duration, setDuration] = useState("2");
  const [timingFunction, setTimingFunction] = useState("ease-in-out");
  const [iterationCount, setIterationCount] = useState("infinite");
  const [delay, setDelay] = useState("0");
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const generateCSS = () => {
    let css = "@keyframes customAnim {\n";
    const sortedKeyframes = [...keyframes].sort((a, b) => a.percent - b.percent);
    sortedKeyframes.forEach(kf => {
      css += "" + kf.percent + "% {\n";
      css += "transform: scale(" + kf.scale + ") rotate(" + kf.rotate + "deg) translate(" + kf.translateX + "px," + kf.translateY + "px);\n";
      css += "opacity:" + kf.opacity + ";\n";
      css += "background-color:" + kf.backgroundColor + ";\n";
      css += "border-radius:" + kf.borderRadius + "%;\n";
      css += "}\n";
    });
    css += "}\n\n";
    css += ".animate-element {\n";
    css += "animation: customAnim" + duration + "s" + timingFunction + "" + delay + "s" + iterationCount + ";\n";
    css += "}";
    return css;
  };
  const handleUpdateKeyframe = (index: number, field: keyof KeyframeStep, value: string | number) => {
    const updated = [...keyframes];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setKeyframes(updated);
  };
  const addKeyframe = () => {
    const sortedKeyframes = [...keyframes].sort((a, b) => a.percent - b.percent);
    const last = sortedKeyframes[sortedKeyframes.length - 1];
    setKeyframes([...keyframes, {
      ...last,
      percent: Math.min(100, last.percent + 10)
    }]);
  };
  const deleteKeyframe = (index: number) => {
    if (keyframes.length > 1) {
      const updated = [...keyframes];
      updated.splice(index, 1);
      setKeyframes(updated);
      setActiveTab(Math.max(0, index - 1));
    }
  };
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Sliders} title="CSS Keyframe Builder" description="Visually build and preview CSS keyframe animations. Export pure CSS code." actions={<>
 <ResetButton onClick={() => {
          setKeyframes(defaultKeyframes);
          setIsPlaying(true);
        }} label="Reset" />
 <CopyButton getText={generateCSS} label="Copy CSS" />
 </>} />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Timeline</CardTitle>
 <CardDescription>Select a keyframe to edit properties</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex flex-wrap gap-2">
 {keyframes.map((kf, i) => <Button key={i} variant={activeTab === i ? "default" : "outline"} onClick={() => setActiveTab(i)} className="flex-1 min-w-[60px]">
 {kf.percent}%
 </Button>)}
 <Button variant="outline" onClick={addKeyframe}><Plus className="h-4 w-4" /></Button>
 </div>

 {keyframes[activeTab] && <div className="space-y-4 pt-4 border-t">
 <div className="flex justify-between items-center mb-2">
 <Label className="font-bold">Keyframe: {keyframes[activeTab].percent}%</Label>
 <Button variant="ghost" size="sm" onClick={() => deleteKeyframe(activeTab)} disabled={keyframes.length <= 1}>
 <Trash2 className="h-4 w-4 text-red-500" />
 </Button>
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Percent (%)</Label>
 <Input type="number" min="0" max="100" value={keyframes[activeTab].percent} onChange={e => handleUpdateKeyframe(activeTab, 'percent', parseInt(e.target.value) || 0)} />
 </div>
 <div className="space-y-2">
 <Label>Scale</Label>
 <Input type="number" step="0.1" value={keyframes[activeTab].scale} onChange={e => handleUpdateKeyframe(activeTab, 'scale', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Rotate (deg)</Label>
 <Input type="number" value={keyframes[activeTab].rotate} onChange={e => handleUpdateKeyframe(activeTab, 'rotate', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Opacity</Label>
 <Input type="number" min="0" max="1" step="0.1" value={keyframes[activeTab].opacity} onChange={e => handleUpdateKeyframe(activeTab, 'opacity', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Translate X (px)</Label>
 <Input type="number" value={keyframes[activeTab].translateX} onChange={e => handleUpdateKeyframe(activeTab, 'translateX', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Translate Y (px)</Label>
 <Input type="number" value={keyframes[activeTab].translateY} onChange={e => handleUpdateKeyframe(activeTab, 'translateY', e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Background Color</Label>
 <div className="flex gap-2">
 <Input type="color" value={keyframes[activeTab].backgroundColor} onChange={e => handleUpdateKeyframe(activeTab, 'backgroundColor', e.target.value)} className="w-12 p-1 h-9" />
 <Input type="text" value={keyframes[activeTab].backgroundColor} onChange={e => handleUpdateKeyframe(activeTab, 'backgroundColor', e.target.value)} className="flex-1" />
 </div>
 </div>
 <div className="space-y-2">
 <Label>Border Radius (%)</Label>
 <Input type="number" min="0" max="50" value={keyframes[activeTab].borderRadius} onChange={e => handleUpdateKeyframe(activeTab, 'borderRadius', e.target.value)} />
 </div>
 </div>
 </div>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Animation Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Duration (s)</Label>
 <Input type="number" step="0.1" min="0.1" value={duration} onChange={e => setDuration(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Delay (s)</Label>
 <Input type="number" step="0.1" min="0" value={delay} onChange={e => setDelay(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Timing Function</Label>
 <Select value={timingFunction} onValueChange={setTimingFunction}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="linear">Linear</SelectItem>
 <SelectItem value="ease">Ease</SelectItem>
 <SelectItem value="ease-in">Ease-In</SelectItem>
 <SelectItem value="ease-out">Ease-Out</SelectItem>
 <SelectItem value="ease-in-out">Ease-In-Out</SelectItem>
 <SelectItem value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">Bounce (cubic-bezier)</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Iteration Count</Label>
 <Select value={iterationCount} onValueChange={setIterationCount}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="infinite">Infinite</SelectItem>
 <SelectItem value="1">1</SelectItem>
 <SelectItem value="2">2</SelectItem>
 <SelectItem value="3">3</SelectItem>
 <SelectItem value="5">5</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Live Preview</CardTitle>
 <div className="flex justify-end mt-[-2rem]">
 <ActionButton onClick={togglePlay} icon={isPlaying ? RefreshCw : Play} label={isPlaying ? "Stop" : "Play"} />
 </div>
 </CardHeader>
 <CardContent className="flex justify-center items-center min-h-[300px] bg-slate-50 rounded-lg overflow-hidden border">
 {isPlaying ? <>
 <style>
 {generateCSS()}
 </style>
 <div className="animate-element w-24 h-24 shadow-lg flex items-center justify-center font-bold text-primary-foreground text-center p-2 break-all">
 Preview
 </div>
 </> : <div className="w-24 h-24 shadow-lg flex items-center justify-center font-bold text-primary-foreground text-center p-2 break-all transition-all duration-300" style={{
                transform: "scale(" + keyframes[0].scale + ") rotate(" + keyframes[0].rotate + "deg) translate(" + keyframes[0].translateX + "px," + keyframes[0].translateY + "px)",
                opacity: keyframes[0].opacity,
                backgroundColor: keyframes[0].backgroundColor,
                borderRadius: keyframes[0].borderRadius + "%"
              }}>
 Preview
 </div>}
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Generated CSS</CardTitle>
 </CardHeader>
 <CardContent>
 <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm font-mono max-h-[300px] overflow-y-auto">
 {generateCSS()}
 </pre>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Your Data",
        description: "Enter your information in the input field above and configure any options.",
        icon: Sparkles
      }, {
        step: "02",
        title: "Process & Generate",
        description: "The tool processes your input instantly and displays the results.",
        icon: Zap
      }, {
        step: "03",
        title: "Copy & Use",
        description: "Copy the output with one click and use it wherever you need.",
        icon: Copy
      }]} badges={["100% Free", "Instant Results", "Privacy-First"]} />

      <ToolFeatureGuides features={[{
        icon: Sparkles,
        title: "Lightning Fast",
        description: "Get results in milliseconds with our optimized client-side processing engine."
      }, {
        icon: Shield,
        title: "Completely Private",
        description: "All processing happens in your browser. Your data never leaves your device."
      }, {
        icon: Zap,
        title: "No Signup Required",
        description: "Use this tool instantly without creating an account or providing any personal information."
      }]}>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Why Use Our CSS Keyframe Builder?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our CSS Keyframe Builder provides
            the functionality you need without any complexity or cost.
          </p>
          <p>
            Unlike server-based alternatives, everything runs locally in your browser, ensuring maximum
            privacy and zero latency. No data is ever transmitted to external servers, making it safe
            for sensitive information.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={[{
        question: "Is this tool free to use?",
        answer: "Yes, this tool is 100% free with no hidden costs, subscriptions, or usage limits."
      }, {
        question: "Is my data secure?",
        answer: "Absolutely. All processing happens locally in your browser. Your input data never leaves your device or gets sent to any server."
      }, {
        question: "Do I need to create an account?",
        answer: "No account or registration is required. Simply open the tool and start using it immediately."
      }]} />

      <RelatedTools currentToolUrl="/tools/dev/css-keyframes-builder" max={6} />

    </div></div>;
}