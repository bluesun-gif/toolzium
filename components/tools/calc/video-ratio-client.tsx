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
import { Film } from"lucide-react";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

const presets = [
 { name:"4K UHD", w: 3840, h: 2160 },
 { name:"1080p FHD", w: 1920, h: 1080 },
 { name:"720p HD", w: 1280, h: 720 },
 { name:"480p SD", w: 854, h: 480 },
];

export default function VideoRatioClient() {
 const [width, setWidth] = useState("1920");
 const [height, setHeight] = useState("1080");
 const [scaleWidth, setScaleWidth] = useState("1280");

 const ratioData = useMemo(() => {
 const w = parseInt(width);
 const h = parseInt(height);
 if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return null;
 const divisor = gcd(w, h);
 const rw = w / divisor;
 const rh = h / divisor;
 
 const sw = parseInt(scaleWidth);
 let scaledH = 0;
 if (!isNaN(sw) && sw > 0) {
 scaledH = Math.round((sw * rh) / rw);
 }

 return { rw, rh, scaledH };
 }, [width, height, scaleWidth]);

 const applyPreset = (w: number, h: number) => {
 setWidth(String(w));
 setHeight(String(h));
 setScaleWidth(String(Math.round(w / 2)));
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader icon={Film} title="Video Aspect Ratio Calculator"description="Calculate aspect ratios, scale resolutions, and preview common video dimensions."/>
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Dimensions</CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-sm font-medium">Width (px)</label>
 <Input type="number"value={width} onChange={e => setWidth(e.target.value)} />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium">Height (px)</label>
 <Input type="number"value={height} onChange={e => setHeight(e.target.value)} />
 </div>
 </div>

 <div className="flex flex-wrap gap-2">
 {presets.map(p => (
 <Button key={p.name} variant="outline"size="sm"onClick={() => applyPreset(p.w, p.h)}>
 {p.name}
 </Button>
 ))}
 </div>

 {ratioData && (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
 <div className="space-y-4">
 <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
 <div className="text-sm text-muted-foreground">Aspect Ratio</div>
 <div className="text-4xl font-bold text-primary">{ratioData.rw}:{ratioData.rh}</div>
 </div>
 
 <div className="space-y-2 p-4 rounded-xl bg-muted/30 border border-border/50">
 <label className="text-sm font-medium">Scale to new Width (px)</label>
 <Input type="number"value={scaleWidth} onChange={e => setScaleWidth(e.target.value)} />
 <div className="text-sm mt-2">
 New Height: <span className="font-bold text-primary">{ratioData.scaledH}px</span>
 </div>
 </div>
 </div>

 <div className="flex items-center justify-center p-4 bg-background rounded-xl border border-border/50 min-h-[200px]">
 <div 
 className="bg-primary/40 border-2 border-primary flex items-center justify-center text-xs font-bold text-white transition-all duration-300"
 style={{ 
 width: `${Math.min(100, (ratioData.rw / Math.max(ratioData.rw, ratioData.rh)) * 100)}%`, 
 height: `${Math.min(100, (ratioData.rh / Math.max(ratioData.rw, ratioData.rh)) * 100)}%`,
 aspectRatio: `${ratioData.rw} / ${ratioData.rh}`,
 maxWidth: '100%',
 maxHeight: '180px'
 }}
 >
 {ratioData.rw}:{ratioData.rh}
 </div>
 </div>
 </div>
 )}
 </CardContent>
 </GlassCard>

 <ToolHowItWorks 
 steps={[
 { step:"01", title:"Enter Resolution", description:"Input the pixel width and height of your video or image.", icon: Film },
 { step:"02", title:"View Ratio", description:"Instantly see the simplified aspect ratio (e.g., 16:9) and a visual preview.", icon: Film },
 { step:"03", title:"Scale Dimensions", description:"Enter a target width to automatically calculate the proportional height.", icon: Film }
 ]} 
 badges={["100% Free","Client-Side","Instant"]} 
 />

 <ToolFeatureGuides features={[
 { icon: Film, title:"GCD Algorithm", description:"Uses the Greatest Common Divisor to mathematically reduce resolutions to their simplest ratio."},
 { icon: Film, title:"Visual Preview", description:"Generates a dynamic rectangle that visually represents the exact shape of your media."},
 { icon: Film, title:"Quick Presets", description:"One-click buttons to load standard broadcast and web resolutions like 4K and 1080p."},
 { icon: Film, title:"Proportional Scaling", description:"Easily resize your project to fit specific player widths without distorting the image."}
 ]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Aspect ratio defines the fundamental shape of your video frame. Whether you are editing a cinematic film in 2.35:1, a YouTube video in 16:9, or a TikTok reel in 9:16, knowing your exact ratio is crucial for proper export settings.</p>
 <p>This calculator takes raw pixel dimensions and reduces them to their simplest fractional form. It also acts as a scaling tool, allowing you to determine the exact height needed if you are forced to constrain your video to a specific width on a webpage.</p>
 <p>The visual preview box updates in real-time, giving you an immediate sense of how 'wide' or 'tall' your final output will appear to viewers.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[
 { question:"What is the standard aspect ratio for YouTube?", answer:"The standard aspect ratio for YouTube desktop and TV viewing is 16:9 (e.g., 1920x1080 or 3840x2160)."},
 { question:"How do I calculate a 9:16 vertical video?", answer:"Simply swap the width and height values. For example, a 1080x1920 resolution will correctly calculate to a 9:16 ratio."},
 { question:"What does 2.35:1 mean?", answer:"This is an anamorphic widescreen cinematic ratio. If you input 2560x1080, the calculator will reduce it to approximately 64:27, which is roughly 2.37:1."}
 ]} />

 <RelatedTools currentToolUrl="/tools/calc/video-ratio" max={6} />
 </div>
 );
}
