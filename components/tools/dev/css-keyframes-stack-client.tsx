"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import React, { useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { Code2, Layers, Play, Plus, SlidersHorizontal, Timer, Trash2 } from"lucide-react";
=======
import { ToolBackground } from"@/components/shared/tool-background";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Layers, Play, Plus, Trash2, Sparkles, Shield, Zap, Copy } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { cn } from "@/lib/utils";
type AnimationLayer = {
  id: string;
  name: string;
  duration: string;
  timingFunction: string;
  delay: string;
  iterationCount: string;
  direction: string;
};
const DEFAULT_LAYER: AnimationLayer = {
  id: "1",
  name: "spin",
  duration: "2",
  timingFunction: "linear",
  delay: "0",
  iterationCount: "infinite",
  direction: "normal"
};
const ANIMATION_NAMES = ["spin", "pulse", "bounce", "float", "shake", "fade-in", "slide-in"];
export function CssKeyframesStackClient() {
  const [layers, setLayers] = useState<AnimationLayer[]>([{
    ...DEFAULT_LAYER
  }]);
  const [previewKey, setPreviewKey] = useState(0);
  const updateLayer = (id: string, field: keyof AnimationLayer, value: string) => {
    setLayers(layers.map(l => l.id === id ? {
      ...l,
      [field]: value
    } : l));
  };
  const addLayer = () => {
    setLayers([...layers, {
      ...DEFAULT_LAYER,
      id: Date.now().toString(),
      name: "pulse"
    }]);
  };
  const removeLayer = (id: string) => {
    if (layers.length > 1) {
      setLayers(layers.filter(l => l.id !== id));
    }
  };
  const resetLayers = () => {
    setLayers([{
      ...DEFAULT_LAYER,
      id: Date.now().toString()
    }]);
  };
  const animationString = layers.map(l => l.name + "" + l.duration + "s" + l.timingFunction + "" + l.delay + "s" + l.iterationCount + "" + l.direction).join(",");
  const cssCode = "animation:" + animationString + ";";
  const triggerAnimation = () => {
    setPreviewKey(previewKey + 1);
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Layers} title="CSS Keyframe Multi-Animation Stacker" description="Visual CSS multi-animation builder. Chain multiple @keyframes on a single element." actions={<>
 <ActionButton onClick={triggerAnimation} icon={Play} label="Preview" />
 <ResetButton onClick={resetLayers} label="Reset" />
 </>} />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Animation Layers</CardTitle>
 <CardDescription>Stack multiple animations together.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 {layers.map((layer, index) => <div key={layer.id} className="p-4 border rounded-md space-y-4 relative bg-card/50">
 <div className="flex justify-between items-center">
 <h4 className="font-medium text-sm">Layer {index + 1}</h4>
 {layers.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeLayer(layer.id)}>
 <Trash2 className="w-4 h-4 text-destructive" />
 </Button>}
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Animation Name</Label>
 <Select value={layer.name} onValueChange={val => updateLayer(layer.id, "name", val)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 {ANIMATION_NAMES.map(name => <SelectItem key={name} value={name}>{name}</SelectItem>)}
 </SelectContent>
 </Select>
 </div>
 
 <div className="space-y-2">
 <Label>Timing Function</Label>
 <Select value={layer.timingFunction} onValueChange={val => updateLayer(layer.id, "timingFunction", val)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="linear">linear</SelectItem>
 <SelectItem value="ease">ease</SelectItem>
 <SelectItem value="ease-in">ease-in</SelectItem>
 <SelectItem value="ease-out">ease-out</SelectItem>
 <SelectItem value="ease-in-out">ease-in-out</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Duration (s)</Label>
 <Input type="number" min="0.1" step="0.1" value={layer.duration} onChange={e => updateLayer(layer.id, "duration", e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Delay (s)</Label>
 <Input type="number" min="0" step="0.1" value={layer.delay} onChange={e => updateLayer(layer.id, "delay", e.target.value)} />
 </div>

 <div className="space-y-2">
 <Label>Iteration Count</Label>
 <Select value={layer.iterationCount} onValueChange={val => updateLayer(layer.id, "iterationCount", val)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="infinite">infinite</SelectItem>
 <SelectItem value="1">1</SelectItem>
 <SelectItem value="2">2</SelectItem>
 <SelectItem value="3">3</SelectItem>
 </SelectContent>
 </Select>
 </div>

 <div className="space-y-2">
 <Label>Direction</Label>
 <Select value={layer.direction} onValueChange={val => updateLayer(layer.id, "direction", val)}>
 <SelectTrigger><SelectValue /></SelectTrigger>
 <SelectContent>
 <SelectItem value="normal">normal</SelectItem>
 <SelectItem value="reverse">reverse</SelectItem>
 <SelectItem value="alternate">alternate</SelectItem>
 <SelectItem value="alternate-reverse">alternate-reverse</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>
 </div>)}

 <Button onClick={addLayer} variant="outline" className="w-full">
 <Plus className="w-4 h-4 mr-2" />
 Add Animation Layer
 </Button>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Live Preview</CardTitle>
 <CardDescription>See your stacked animations in action.</CardDescription>
 </CardHeader>
 <CardContent className="flex flex-col items-center justify-center min-h-[300px] bg-black/5 rounded-md relative overflow-hidden">
 <style dangerouslySetInnerHTML={{
                __html: "\n" + "@keyframes spin { 100% { transform: rotate(360deg); } }\n" + "@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }\n" + "@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-25%); } }\n" + "@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }\n" + "@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }\n" + "@keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }\n" + "@keyframes slide-in { 0% { transform: translateX(-100%); } 100% { transform: translateX(0); } }\n" + ".preview-element {" + cssCode + "}\n"
              }} />
 <div key={previewKey} className={cn("w-24 h-24 bg-primary rounded-xl shadow-lg flex items-center justify-center text-primary-foreground font-bold", "preview-element")}>
 CSS
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Generated CSS</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="p-4 bg-muted rounded-md overflow-x-auto text-sm font-mono">
 {cssCode}
 </div>
 <CopyButton getText={() => cssCode} label="Copy CSS" />
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Layer Animations",
    description:"Stack multiple keyframe effects on one element.",
    icon: Layers,
  },
{
    step:"02",
    title:"Sequence Timing",
    description:"Offset start delays so effects play in order.",
    icon: Timer,
  },
{
    step:"03",
    title:"Export",
    description:"Copy the combined animation shorthand.",
    icon: Code2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Layers,
    title:"Multi-Effect Stacking",
    description:"Combine transforms, fades, and colors in one element.",
  },
{
    icon: Timer,
    title:"Delay Sequencing",
    description:"Stagger animations with calculated delays.",
  },
{
    icon: SlidersHorizontal,
    title:"Per-Effect Tuning",
    description:"Control duration and easing per layer.",
  },
{
    icon: Code2,
    title:"Compact Output",
    description:"Get a single animation shorthand string.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Sometimes a single keyframe is not enough. You may want an element to fade in, then gently float, then shift color — three distinct motions on one target. CSS supports this by listing multiple animations in the animation property, separated by commas, each referencing its own @keyframes.</p>
  <p>The key to clean stacking is understanding the shorthand. For each animation you can specify name, duration, timing function, delay, iteration count, direction, fill mode, and play state. When several share a value you can shorten the list, but explicit values prevent confusion. For example: animation: fadeIn 0.6s ease, float 3s ease-in-out 0.6s infinite.</p>
  <p>Sequencing uses delay. If fadeIn lasts 0.6s and you want float to begin after it, give float a delay of 0.6s. Chaining several effects this way creates orchestrated entrances without JavaScript. Just remember that total perceived time equals the longest chain, so keep sequences tight.</p>
  <p>Property conflicts are the common pitfall. If both animations set transform, they fight; the later one in the list typically overrides. To avoid this, split responsibilities: one animation handles opacity, another handles translate, a third handles rotate. Non-overlapping properties compose cleanly and look intentional.</p>
  <p>Performance stays healthy when you stick to transform and opacity. Stacking five layout-changing animations on a hero element can drop frames on mobile. Test on real devices and trim to what serves the design. Use this composer to layer effects, tune each one, and export a single copy-ready animation string that you can drop straight into your stylesheet.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"Can one element have multiple animations?",
    answer:"Yes. List them comma-separated in the animation property, each with its own name, duration, and timing.",
  },
{
    question:"How do I sequence stacked animations?",
    answer:"Give later animations a delay equal to the sum of earlier durations so they play one after another.",
  },
{
    question:"Do stacked animations conflict?",
    answer:"If two animate the same property, the last listed usually wins. Combine complementary properties to avoid clashes.",
  },
{
    question:"What is the animation shorthand order?",
    answer:"It is name duration timing-function delay iteration-count direction fill-mode play-state, but any omitted value uses its default.",
  },
{
    question:"Is stacking animations slow?",
    answer:"A few transform and opacity animations are fine. Avoid stacking many layout-triggering animations on one element.",
  }
  ]}
/>
</div>
 );
}
=======
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
          <h3>Why Use Our CSS Keyframe Multi-Animation Stacker?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our CSS Keyframe Multi-Animation Stacker provides
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

      <RelatedTools currentToolUrl="/tools/dev/css-keyframes-stack" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
