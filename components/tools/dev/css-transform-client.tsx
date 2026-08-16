"use client";
<<<<<<< HEAD
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState } from"react";
import { Box, Code2, Copy, Move, RefreshCw, RotateCw, Sliders, SlidersHorizontal } from"lucide-react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";

=======
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import { Box, Sliders, Copy, RefreshCw, Sparkles, Shield, Zap } from "lucide-react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
export function CssTransformClient() {
  const [rotateX, setRotateX] = useState("0");
  const [rotateY, setRotateY] = useState("0");
  const [rotateZ, setRotateZ] = useState("0");
  const [scaleX, setScaleX] = useState("1");
  const [scaleY, setScaleY] = useState("1");
  const [scaleZ, setScaleZ] = useState("1");
  const [skewX, setSkewX] = useState("0");
  const [skewY, setSkewY] = useState("0");
  const [translateX, setTranslateX] = useState("0");
  const [translateY, setTranslateY] = useState("0");
  const [translateZ, setTranslateZ] = useState("0");
  const [perspective, setPerspective] = useState("1000");
  const [transformOrigin, setTransformOrigin] = useState("center");
  const resetAll = () => {
    setRotateX("0");
    setRotateY("0");
    setRotateZ("0");
    setScaleX("1");
    setScaleY("1");
    setScaleZ("1");
    setSkewX("0");
    setSkewY("0");
    setTranslateX("0");
    setTranslateY("0");
    setTranslateZ("0");
    setPerspective("1000");
    setTransformOrigin("center");
  };
  const transformStyle = "perspective(" + perspective + "px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) rotateZ(" + rotateZ + "deg) scaleX(" + scaleX + ") scaleY(" + scaleY + ") scaleZ(" + scaleZ + ") skewX(" + skewX + "deg) skewY(" + skewY + "deg) translateX(" + translateX + "px) translateY(" + translateY + "px) translateZ(" + translateZ + "px)";
  const cssCode = "transform:" + transformStyle + ";\ntransform-origin:" + transformOrigin + ";";
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Box} title="CSS 3D Transform Generator" description="Interactive 3D CSS transform generator with live preview." actions={<ResetButton onClick={resetAll} label="Reset" />} />

 <div className="grid md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Controls</CardTitle>
 <CardDescription>Adjust sliders to see 3D transforms</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-3 gap-4">
 <div className="space-y-2">
 <Label>Rotate X (deg)</Label>
 <Input type="range" min="-360" max="360" value={rotateX} onChange={e => setRotateX(e.target.value)} />
 <div className="text-xs text-center">{rotateX}</div>
 </div>
 <div className="space-y-2">
 <Label>Rotate Y (deg)</Label>
 <Input type="range" min="-360" max="360" value={rotateY} onChange={e => setRotateY(e.target.value)} />
 <div className="text-xs text-center">{rotateY}</div>
 </div>
 <div className="space-y-2">
 <Label>Rotate Z (deg)</Label>
 <Input type="range" min="-360" max="360" value={rotateZ} onChange={e => setRotateZ(e.target.value)} />
 <div className="text-xs text-center">{rotateZ}</div>
 </div>
 </div>

 <div className="grid grid-cols-3 gap-4">
 <div className="space-y-2">
 <Label>Scale X</Label>
 <Input type="range" min="0" max="3" step="0.1" value={scaleX} onChange={e => setScaleX(e.target.value)} />
 <div className="text-xs text-center">{scaleX}</div>
 </div>
 <div className="space-y-2">
 <Label>Scale Y</Label>
 <Input type="range" min="0" max="3" step="0.1" value={scaleY} onChange={e => setScaleY(e.target.value)} />
 <div className="text-xs text-center">{scaleY}</div>
 </div>
 <div className="space-y-2">
 <Label>Scale Z</Label>
 <Input type="range" min="0" max="3" step="0.1" value={scaleZ} onChange={e => setScaleZ(e.target.value)} />
 <div className="text-xs text-center">{scaleZ}</div>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Skew X (deg)</Label>
 <Input type="range" min="-180" max="180" value={skewX} onChange={e => setSkewX(e.target.value)} />
 <div className="text-xs text-center">{skewX}</div>
 </div>
 <div className="space-y-2">
 <Label>Skew Y (deg)</Label>
 <Input type="range" min="-180" max="180" value={skewY} onChange={e => setSkewY(e.target.value)} />
 <div className="text-xs text-center">{skewY}</div>
 </div>
 </div>

 <div className="grid grid-cols-3 gap-4">
 <div className="space-y-2">
 <Label>Translate X (px)</Label>
 <Input type="range" min="-200" max="200" value={translateX} onChange={e => setTranslateX(e.target.value)} />
 <div className="text-xs text-center">{translateX}</div>
 </div>
 <div className="space-y-2">
 <Label>Translate Y (px)</Label>
 <Input type="range" min="-200" max="200" value={translateY} onChange={e => setTranslateY(e.target.value)} />
 <div className="text-xs text-center">{translateY}</div>
 </div>
 <div className="space-y-2">
 <Label>Translate Z (px)</Label>
 <Input type="range" min="-200" max="200" value={translateZ} onChange={e => setTranslateZ(e.target.value)} />
 <div className="text-xs text-center">{translateZ}</div>
 </div>
 </div>
 
 <div className="space-y-2">
 <Label>Perspective (px)</Label>
 <Input type="range" min="100" max="2000" value={perspective} onChange={e => setPerspective(e.target.value)} />
 <div className="text-xs text-center">{perspective}</div>
 </div>
 
 <div className="space-y-2">
 <Label>Transform Origin</Label>
 <Select value={transformOrigin} onValueChange={setTransformOrigin}>
 <SelectTrigger>
 <SelectValue placeholder="Select origin" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="center">Center</SelectItem>
 <SelectItem value="top">Top</SelectItem>
 <SelectItem value="bottom">Bottom</SelectItem>
 <SelectItem value="left">Left</SelectItem>
 <SelectItem value="right">Right</SelectItem>
 <SelectItem value="top left">Top Left</SelectItem>
 <SelectItem value="top right">Top Right</SelectItem>
 <SelectItem value="bottom left">Bottom Left</SelectItem>
 <SelectItem value="bottom right">Bottom Right</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </CardContent>
 </GlassCard>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Live Preview</CardTitle>
 </CardHeader>
 <CardContent className="flex justify-center items-center min-h-[300px] overflow-hidden">
 <div className="w-40 h-40 bg-primary/20 border-2 border-primary rounded-xl flex items-center justify-center shadow-lg transition-transform" style={{
                transform: transformStyle,
                transformOrigin: transformOrigin
              }}>
 <span className="font-bold text-primary">Toolzium</span>
 </div>
 </CardContent>
 </GlassCard>
 
 <GlassCard>
 <CardHeader>
 <CardTitle>CSS Code</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap">
 {cssCode}
 </div>
 <div className="flex justify-end">
 <CopyButton getText={() => cssCode} label="Copy CSS" />
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<<<<<<< HEAD
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Choose Transform",
    description:"Pick translate, rotate, scale, or skew from the panel.",
    icon: Move,
  },
{
    step:"02",
    title:"Adjust Values",
    description:"Set angles, distances, and factors with sliders.",
    icon: SlidersHorizontal,
  },
{
    step:"03",
    title:"Copy CSS",
    description:"Get the transform property or a full utility class.",
    icon: Code2,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Move,
    title:"All Transform Types",
    description:"Translate, rotate, scale, skew, and matrix.",
  },
{
    icon: SlidersHorizontal,
    title:"Live Sliders",
    description:"Tune each value and see the result instantly.",
  },
{
    icon: RotateCw,
    title:"3D Support",
    description:"Add perspective and rotateX/Y/Z.",
  },
{
    icon: Code2,
    title:"Clean Output",
    description:"Copy a single transform declaration.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>The CSS transform property is the workhorse of modern interface motion. Unlike changing top or left, transform does not reflow the page — the browser promotes the element to its own layer and applies the change on the GPU. That makes transforms the right choice for animation and interaction.</p>
  <p>Four core functions cover most needs. translate() moves an element along X and Y. rotate() turns it by an angle. scale() grows or shrinks it. skew() slants it along an axis. You can chain them in one declaration: transform: translateX(20px) rotate(15deg) scale(1.1). They apply left to right, and order matters when combining rotations with translations.</p>
  <p>transform-origin changes the pivot. By default an element rotates around its center, but setting transform-origin: top left makes it swing from that corner. This is essential for realistic hinges, folding panels, and card flips. Pair it with perspective on the parent to enable three-dimensional effects like rotateX and rotateY.</p>
  <p>Because transforms are visual only, they do not affect surrounding elements or scroll position. That is great for performance but means you cannot use transform to push content out of the way — use it for presentation, not layout. For hover lifts, a translateY(-4px) with a shadow change feels responsive and costs almost nothing.</p>
  <p>When animating, prefer transform and opacity together. Avoid animating width, height, or margins, which force layout recalculation each frame. Our generator lets you compose a transform visually and copy the exact declaration. Start with a single function, preview it, then layer more once the base motion feels right.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What does CSS transform do?",
    answer:"The transform property moves, rotates, scales, or skews an element without affecting document layout.",
  },
{
    question:"Is transform better than changing top/left?",
    answer:"Yes for animation. Transform is GPU-accelerated and does not trigger layout, so it is smoother than animating position.",
  },
{
    question:"What is the transform-origin?",
    answer:"It sets the point around which rotations and scaling happen, defaulting to the element's center.",
  },
{
    question:"How do I combine transforms?",
    answer:"List them space-separated in one transform property, e.g. transform: rotate(20deg) scale(1.2).",
  },
{
    question:"What is perspective?",
    answer:"Perspective adds depth so 3D transforms like rotateX look three-dimensional rather than flat.",
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
          <h3>Why Use Our CSS 3D Transform Generator?</h3>
          <p>
            This free online tool is designed to help you get accurate results quickly and securely.
            Whether you're a developer, designer, student, or professional, our CSS 3D Transform Generator provides
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

      <RelatedTools currentToolUrl="/tools/dev/css-transform" max={6} />

    </div></div>;
}
>>>>>>> e5dfa5f080d14c9e27147e3ad8e02f2a1e5817b7
