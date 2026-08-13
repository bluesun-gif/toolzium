"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Type, Copy, RotateCcw, AlignLeft, AlignCenter, AlignRight, AlignJustify, Sparkles, Palette } from "lucide-react";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";
const FONTS = ["Inter", "Roboto", "Outfit", "Playfair Display", "Poppins", "Montserrat", "Open Sans", "Lora", "Merriweather", "Oswald", "Raleway", "Nunito", "Source Code Pro", "Fira Code", "JetBrains Mono", "IBM Plex Sans", "DM Sans", "Space Grotesk", "Urbanist", "Plus Jakarta Sans"];
const PRESETS = [{
  name: "Modern Heading",
  family: "Space Grotesk",
  size: 48,
  weight: 700,
  lh: 1.2,
  ls: -1,
  transform: "none" as const
}, {
  name: "Body Copy",
  family: "Inter",
  size: 16,
  weight: 400,
  lh: 1.6,
  ls: 0,
  transform: "none" as const
}, {
  name: "Code Block",
  family: "JetBrains Mono",
  size: 14,
  weight: 400,
  lh: 1.5,
  ls: 0,
  transform: "none" as const
}, {
  name: "Editorial",
  family: "Playfair Display",
  size: 32,
  weight: 600,
  lh: 1.3,
  ls: 0.5,
  transform: "none" as const
}, {
  name: "Display",
  family: "Outfit",
  size: 72,
  weight: 800,
  lh: 1.1,
  ls: -2,
  transform: "uppercase" as const
}, {
  name: "Handwritten",
  family: "Outfit",
  size: 24,
  weight: 400,
  lh: 1.4,
  ls: 1,
  transform: "none" as const
}];
export function CssTypographyClient() {
  const [fontFamily, setFontFamily] = useState("Inter");
  const [fontSize, setFontSize] = useState(16);
  const [sizeUnit, setSizeUnit] = useState<"px" | "rem" | "em">("px");
  const [fontWeight, setFontWeight] = useState(400);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [wordSpacing, setWordSpacing] = useState(0);
  const [textTransform, setTextTransform] = useState<"none" | "uppercase" | "lowercase" | "capitalize">("none");
  const [textDecoration, setTextDecoration] = useState<"none" | "underline" | "overline" | "line-through">("none");
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right" | "justify">("left");
  const [fontStyle, setFontStyle] = useState<"normal" | "italic" | "oblique">("normal");
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(0);
  const [shadowBlur, setShadowBlur] = useState(0);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#0f172a");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [sampleText, setSampleText] = useState("The quick brown fox jumps over the lazy dog. Typography is the art and technique of arranging type.");
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  const applyPreset = (preset: typeof PRESETS[0]) => {
    setFontFamily(preset.family);
    setFontSize(preset.size);
    setFontWeight(preset.weight);
    setLineHeight(preset.lh);
    setLetterSpacing(preset.ls);
    setTextTransform(preset.transform);
    toast.success(`Applied ${preset.name} preset`);
  };
  const resetStyles = () => {
    setFontFamily("Inter");
    setFontSize(16);
    setSizeUnit("px");
    setFontWeight(400);
    setLineHeight(1.5);
    setLetterSpacing(0);
    setWordSpacing(0);
    setTextTransform("none");
    setTextDecoration("none");
    setTextAlign("left");
    setFontStyle("normal");
    setShadowX(0);
    setShadowY(0);
    setShadowBlur(0);
    setShadowColor("#000000");
    setTextColor("#0f172a");
    setBgColor("#ffffff");
    toast.success("Styles reset to default");
  };
  const previewStyle = useMemo(() => {
    let sizeVal: any = fontSize;
    if (sizeUnit === "rem" || sizeUnit === "em") sizeVal = fontSize / 16;
    return {
      fontFamily: `'${fontFamily}', sans-serif`,
      fontSize: `${sizeVal}${sizeUnit}`,
      fontWeight: fontWeight,
      lineHeight: lineHeight,
      letterSpacing: `${letterSpacing}px`,
      wordSpacing: `${wordSpacing}px`,
      textTransform: textTransform,
      textDecoration: textDecoration,
      textAlign: textAlign,
      fontStyle: fontStyle,
      textShadow: shadowBlur > 0 || shadowX !== 0 || shadowY !== 0 ? `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}` : "none",
      color: textColor,
      backgroundColor: bgColor
    };
  }, [fontFamily, fontSize, sizeUnit, fontWeight, lineHeight, letterSpacing, wordSpacing, textTransform, textDecoration, textAlign, fontStyle, shadowX, shadowY, shadowBlur, shadowColor, textColor, bgColor]);
  const cssOutput = useMemo(() => {
    let sizeVal: any = fontSize;
    if (sizeUnit === "rem" || sizeUnit === "em") sizeVal = fontSize / 16;
    let css = `.typography-class {\n`;
    css += ` font-family: '${fontFamily}', sans-serif;\n`;
    css += ` font-size: ${sizeVal}${sizeUnit};\n`;
    css += ` font-weight: ${fontWeight};\n`;
    css += ` line-height: ${lineHeight};\n`;
    if (letterSpacing !== 0) css += ` letter-spacing: ${letterSpacing}px;\n`;
    if (wordSpacing !== 0) css += ` word-spacing: ${wordSpacing}px;\n`;
    if (textTransform !== "none") css += ` text-transform: ${textTransform};\n`;
    if (textDecoration !== "none") css += ` text-decoration: ${textDecoration};\n`;
    if (textAlign !== "left") css += ` text-align: ${textAlign};\n`;
    if (fontStyle !== "normal") css += ` font-style: ${fontStyle};\n`;
    if (shadowBlur > 0 || shadowX !== 0 || shadowY !== 0) css += ` text-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor};\n`;
    css += ` color: ${textColor};\n`;
    css += ` background-color: ${bgColor};\n`;
    css += `}`;
    return css;
  }, [fontFamily, fontSize, sizeUnit, fontWeight, lineHeight, letterSpacing, wordSpacing, textTransform, textDecoration, textAlign, fontStyle, shadowX, shadowY, shadowBlur, shadowColor, textColor, bgColor]);
  return <div className="relative max-w-6xl mx-auto space-y-8 px-4 py-8"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Type} title="CSS Typography Playground" description="Interactive CSS typography editor with complete control over font properties, shadows, and spacing. Generate perfect CSS for your web fonts." />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-1 space-y-4">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Sparkles className="w-4 h-4" /> Presets</CardTitle>
 </CardHeader>
 <CardContent className="p-4 grid grid-cols-2 gap-2">
 {PRESETS.map(p => <Button key={p.name} variant="outline" size="sm" onClick={() => applyPreset(p)}>{p.name}</Button>)}
 <Button variant="destructive" size="sm" className="col-span-2" onClick={resetStyles}><RotateCcw className="w-4 h-4 mr-2" /> Reset</Button>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Type className="w-4 h-4" /> Font & Size</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <div>
 <Label>Font Family</Label>
 <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm mt-1">
 {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
 </select>
 </div>
 <div className="flex gap-2">
 <div className="flex-1">
 <Label>Size ({fontSize})</Label>
 <Input type="number" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="mt-1" />
 </div>
 <div className="w-24">
 <Label>Unit</Label>
 <select value={sizeUnit} onChange={e => setSizeUnit(e.target.value as any)} className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm mt-1">
 <option value="px">px</option>
 <option value="rem">rem</option>
 <option value="em">em</option>
 </select>
 </div>
 </div>
 <div>
 <Label>Weight ({fontWeight})</Label>
 <input type="range" min="100" max="900" step="100" value={fontWeight} onChange={e => setFontWeight(Number(e.target.value))} className="w-full mt-1" />
 </div>
 <div>
 <Label>Style</Label>
 <select value={fontStyle} onChange={e => setFontStyle(e.target.value as any)} className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm mt-1">
 <option value="normal">Normal</option>
 <option value="italic">Italic</option>
 <option value="oblique">Oblique</option>
 </select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Spacing & Alignment</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <div>
 <Label>Line Height ({lineHeight})</Label>
 <input type="range" min="0.8" max="3.0" step="0.1" value={lineHeight} onChange={e => setLineHeight(Number(e.target.value))} className="w-full mt-1" />
 </div>
 <div>
 <Label>Letter Spacing ({letterSpacing}px)</Label>
 <input type="range" min="-5" max="20" step="0.5" value={letterSpacing} onChange={e => setLetterSpacing(Number(e.target.value))} className="w-full mt-1" />
 </div>
 <div>
 <Label>Word Spacing ({wordSpacing}px)</Label>
 <input type="range" min="-5" max="20" step="0.5" value={wordSpacing} onChange={e => setWordSpacing(Number(e.target.value))} className="w-full mt-1" />
 </div>
 <div>
 <Label>Alignment</Label>
 <div className="flex gap-2 mt-1">
 <Button variant={textAlign === 'left' ? 'default' : 'outline'} size="sm" onClick={() => setTextAlign('left')}><AlignLeft className="w-4 h-4" /></Button>
 <Button variant={textAlign === 'center' ? 'default' : 'outline'} size="sm" onClick={() => setTextAlign('center')}><AlignCenter className="w-4 h-4" /></Button>
 <Button variant={textAlign === 'right' ? 'default' : 'outline'} size="sm" onClick={() => setTextAlign('right')}><AlignRight className="w-4 h-4" /></Button>
 <Button variant={textAlign === 'justify' ? 'default' : 'outline'} size="sm" onClick={() => setTextAlign('justify')}><AlignJustify className="w-4 h-4" /></Button>
 </div>
 </div>
 <div>
 <Label>Transform</Label>
 <select value={textTransform} onChange={e => setTextTransform(e.target.value as any)} className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm mt-1">
 <option value="none">None</option>
 <option value="uppercase">Uppercase</option>
 <option value="lowercase">Lowercase</option>
 <option value="capitalize">Capitalize</option>
 </select>
 </div>
 <div>
 <Label>Decoration</Label>
 <select value={textDecoration} onChange={e => setTextDecoration(e.target.value as any)} className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm mt-1">
 <option value="none">None</option>
 <option value="underline">Underline</option>
 <option value="overline">Overline</option>
 <option value="line-through">Line-through</option>
 </select>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Palette className="w-4 h-4" /> Colors & Effects</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div>
 <Label>Text Color</Label>
 <Input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-full h-10 mt-1" />
 </div>
 <div>
 <Label>BG Color</Label>
 <Input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-10 mt-1" />
 </div>
 </div>
 <div>
 <Label>Text Shadow</Label>
 <div className="grid grid-cols-3 gap-2 mt-1">
 <Input type="number" placeholder="X" value={shadowX} onChange={e => setShadowX(Number(e.target.value))} />
 <Input type="number" placeholder="Y" value={shadowY} onChange={e => setShadowY(Number(e.target.value))} />
 <Input type="number" placeholder="Blur" value={shadowBlur} onChange={e => setShadowBlur(Number(e.target.value))} />
 </div>
 <Input type="color" value={shadowColor} onChange={e => setShadowColor(e.target.value)} className="w-full h-10 mt-2" />
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="lg:col-span-2 space-y-6">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Live Preview (Click to edit)</CardTitle>
 </CardHeader>
 <CardContent className="p-0">
 <div contentEditable suppressContentEditableWarning onBlur={e => setSampleText(e.currentTarget.innerText)} style={previewStyle} className="min-h-[300px] p-8 focus:outline-none transition-all">
 {sampleText}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Generated CSS</CardTitle>
 <Button variant="outline" size="sm" onClick={() => handleCopy(cssOutput)}><Copy className="w-4 h-4" /></Button>
 </CardHeader>
 <CardContent className="p-4">
 <textarea readOnly value={cssOutput} className={textareaClass} rows={14} />
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Font Pairing Suggestions</CardTitle>
 </CardHeader>
 <CardContent className="p-4 text-sm text-muted-foreground">
 <p>Based on <strong>{fontFamily}</strong>, try pairing it with:</p>
 <ul className="list-disc pl-5 mt-2 space-y-1">
 <li><strong>Headings:</strong> {fontFamily === "Inter" ? "Playfair Display" : "Inter"} / <strong>Body:</strong> {fontFamily}</li>
 <li><strong>Code:</strong> JetBrains Mono / <strong>UI:</strong> {fontFamily}</li>
 </ul>
 </CardContent>
 </GlassCard>
 </div>
 </div>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Select Base Font",
        description: "Choose from 20+ premium Google Fonts and set your base size and weight.",
        icon: Type
      }, {
        step: "02",
        title: "Fine-Tune Spacing",
        description: "Adjust line height, letter spacing, and word spacing for optimal readability.",
        icon: AlignJustify
      }, {
        step: "03",
        title: "Export CSS",
        description: "Copy the generated CSS code and paste it directly into your stylesheet.",
        icon: Copy
      }]} badges={["100% Free", "Client-Side Privacy", "No Signup"]} />

 <ToolFeatureGuides features={[{
        icon: Type,
        title: "20+ Google Fonts",
        description: "Access a curated list of the most popular and professional web fonts."
      }, {
        icon: Palette,
        title: "Advanced Effects",
        description: "Add precise text shadows with X/Y offsets, blur, and custom colors."
      }, {
        icon: AlignJustify,
        title: "Micro-Typography",
        description: "Control letter and word spacing to achieve perfect optical balance."
      }, {
        icon: Sparkles,
        title: "Smart Presets",
        description: "One-click presets for Modern Headings, Body Copy, Code Blocks, and more."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none mt-6">
 <h3>The Importance of CSS Typography in Modern Web Design</h3>
 <p>Typography is the foundation of web design. It dictates not only how your content looks but how it feels, how readable it is, and how users perceive your brand. Mastering CSS typography goes far beyond simply picking a font family; it involves a deep understanding of hierarchy, optical alignment, and cognitive load. When implemented correctly, typography guides the user's eye effortlessly through the page, establishing a clear visual hierarchy that highlights the most important information first.</p>
 <p>Modern CSS provides unprecedented control over text rendering. Properties like <code>letter-spacing</code> (tracking) and <code>word-spacing</code> allow designers to correct optical illusions that occur at large or small font sizes. For instance, uppercase text almost always requires increased letter spacing to remain legible, while large display headings often benefit from tightened tracking to create a cohesive visual mass. Furthermore, the <code>line-height</code> property is critical for readability; body copy typically requires a line-height of 1.5 to 1.7 to prevent lines from bleeding into one another, whereas large headings can utilize a tighter line-height of 1.1 to 1.2 to maintain impact.</p>
 <h3>Performance and Accessibility Considerations</h3>
 <p>When working with web fonts, performance is a key concern. Utilizing the <code>font-display: swap;</code> property in your CSS ensures that text remains visible during font loading, preventing the dreaded Flash of Invisible Text (FOIT). Additionally, accessibility must be at the forefront of typographic decisions. Ensuring sufficient color contrast between text and background (meeting WCAG AA or AAA standards) and avoiding reliance on color alone to convey meaning are non-negotiable requirements for inclusive design. This interactive playground allows you to test these parameters in real-time, ensuring your typography is both beautiful and accessible.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "What is the difference between rem and em units?",
        answer: "rem (root em) is relative to the root HTML element's font size (usually 16px), making it consistent across the entire document. em is relative to the font size of its closest parent element, which can lead to compounding sizes in nested elements."
      }, {
        question: "How do I improve text readability on screens?",
        answer: "Increase line-height to at least 1.5 for body text, ensure high contrast between text and background, limit line length to 60-75 characters, and use appropriate letter spacing."
      }, {
        question: "Can I use custom fonts not listed here?",
        answer: "Yes, you can manually type any valid CSS font-family string into the generated CSS output, provided the font is loaded via @font-face or a CDN in your project."
      }]} />

 <RelatedTools currentToolUrl="/tools/dev/css-typography" max={6} />
 </div></div>;
}
export default CssTypographyClient;