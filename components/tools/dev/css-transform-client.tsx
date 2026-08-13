"use client";

import React, { useState } from"react";
import { Box, Sliders, Copy, RefreshCw, Sparkles, Shield, Zap } from"lucide-react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { GridPattern } from"@/components/magicui/grid-pattern";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

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

 const transformStyle ="perspective("+ perspective +"px) rotateX("+ rotateX +"deg) rotateY("+ rotateY +"deg) rotateZ("+ rotateZ +"deg) scaleX("+ scaleX +") scaleY("+ scaleY +") scaleZ("+ scaleZ +") skewX("+ skewX +"deg) skewY("+ skewY +"deg) translateX("+ translateX +"px) translateY("+ translateY +"px) translateZ("+ translateZ +"px)";
 
 const cssCode ="transform:"+ transformStyle +";\ntransform-origin:"+ transformOrigin +";";

 return (
 <div className="space-y-6">
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
 title="CSS 3D Transform Generator"
 description="Interactive 3D CSS transform generator with live preview."
 actions={<ResetButton onClick={resetAll} label="Reset"/>}
 />

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
 <Input type="range"min="-360"max="360"value={rotateX} onChange={(e) => setRotateX(e.target.value)} />
 <div className="text-xs text-center">{rotateX}</div>
 </div>
 <div className="space-y-2">
 <Label>Rotate Y (deg)</Label>
 <Input type="range"min="-360"max="360"value={rotateY} onChange={(e) => setRotateY(e.target.value)} />
 <div className="text-xs text-center">{rotateY}</div>
 </div>
 <div className="space-y-2">
 <Label>Rotate Z (deg)</Label>
 <Input type="range"min="-360"max="360"value={rotateZ} onChange={(e) => setRotateZ(e.target.value)} />
 <div className="text-xs text-center">{rotateZ}</div>
 </div>
 </div>

 <div className="grid grid-cols-3 gap-4">
 <div className="space-y-2">
 <Label>Scale X</Label>
 <Input type="range"min="0"max="3"step="0.1"value={scaleX} onChange={(e) => setScaleX(e.target.value)} />
 <div className="text-xs text-center">{scaleX}</div>
 </div>
 <div className="space-y-2">
 <Label>Scale Y</Label>
 <Input type="range"min="0"max="3"step="0.1"value={scaleY} onChange={(e) => setScaleY(e.target.value)} />
 <div className="text-xs text-center">{scaleY}</div>
 </div>
 <div className="space-y-2">
 <Label>Scale Z</Label>
 <Input type="range"min="0"max="3"step="0.1"value={scaleZ} onChange={(e) => setScaleZ(e.target.value)} />
 <div className="text-xs text-center">{scaleZ}</div>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Skew X (deg)</Label>
 <Input type="range"min="-180"max="180"value={skewX} onChange={(e) => setSkewX(e.target.value)} />
 <div className="text-xs text-center">{skewX}</div>
 </div>
 <div className="space-y-2">
 <Label>Skew Y (deg)</Label>
 <Input type="range"min="-180"max="180"value={skewY} onChange={(e) => setSkewY(e.target.value)} />
 <div className="text-xs text-center">{skewY}</div>
 </div>
 </div>

 <div className="grid grid-cols-3 gap-4">
 <div className="space-y-2">
 <Label>Translate X (px)</Label>
 <Input type="range"min="-200"max="200"value={translateX} onChange={(e) => setTranslateX(e.target.value)} />
 <div className="text-xs text-center">{translateX}</div>
 </div>
 <div className="space-y-2">
 <Label>Translate Y (px)</Label>
 <Input type="range"min="-200"max="200"value={translateY} onChange={(e) => setTranslateY(e.target.value)} />
 <div className="text-xs text-center">{translateY}</div>
 </div>
 <div className="space-y-2">
 <Label>Translate Z (px)</Label>
 <Input type="range"min="-200"max="200"value={translateZ} onChange={(e) => setTranslateZ(e.target.value)} />
 <div className="text-xs text-center">{translateZ}</div>
 </div>
 </div>
 
 <div className="space-y-2">
 <Label>Perspective (px)</Label>
 <Input type="range"min="100"max="2000"value={perspective} onChange={(e) => setPerspective(e.target.value)} />
 <div className="text-xs text-center">{perspective}</div>
 </div>
 
 <div className="space-y-2">
 <Label>Transform Origin</Label>
 <Select value={transformOrigin} onValueChange={setTransformOrigin}>
 <SelectTrigger>
 <SelectValue placeholder="Select origin"/>
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
 <div className="w-40 h-40 bg-primary/20 border-2 border-primary rounded-xl flex items-center justify-center shadow-lg transition-transform"style={{ transform: transformStyle, transformOrigin: transformOrigin }}>
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
 <CopyButton getText={() => cssCode} label="Copy CSS"/>
 </div>
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

      <RelatedTools currentToolUrl="/tools/dev/css-transform" max={6} />

</div>
 );
}
