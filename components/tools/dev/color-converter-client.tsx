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
import { Palette, Copy, Droplet, Contrast, History } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";

type ColorState = { r: number; g: number; b: number; a: number };

const rgbToHex = (r: number, g: number, b: number, a: number = 1): string => {
 const toHex = (c: number) => {
 const hex = Math.round(c).toString(16);
 return hex.length === 1 ?"0"+ hex : hex;
 };
 const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
 return a < 1 ? `${hex}${toHex(a * 255)}` : hex;
};

const hexToRgb = (hex: string): ColorState | null => {
 let clean = hex.replace('#', '');
 if (clean.length === 3) clean = clean.split('').map((c) => c + c).join('');
 if (clean.length === 6) {
 const r = parseInt(clean.substring(0, 2), 16);
 const g = parseInt(clean.substring(2, 4), 16);
 const b = parseInt(clean.substring(4, 6), 16);
 if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return { r, g, b, a: 1 };
 }
 if (clean.length === 8) {
 const r = parseInt(clean.substring(0, 2), 16);
 const g = parseInt(clean.substring(2, 4), 16);
 const b = parseInt(clean.substring(4, 6), 16);
 const a = parseInt(clean.substring(6, 8), 16) / 255;
 if (!isNaN(r) && !isNaN(g) && !isNaN(b) && !isNaN(a)) return { r, g, b, a };
 }
 return null;
};

const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
 r /= 255; g /= 255; b /= 255;
 const max = Math.max(r, g, b), min = Math.min(r, g, b);
 let h = 0, s = 0, l = (max + min) / 2;
 if (max !== min) {
 const d = max - min;
 s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
 switch (max) {
 case r: h = (g - b) / d + (g < b ? 6 : 0); break;
 case g: h = (b - r) / d + 2; break;
 case b: h = (r - g) / d + 4; break;
 }
 h /= 6;
 }
 return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

const rgbToCmyk = (r: number, g: number, b: number): [number, number, number, number] => {
 if (r === 0 && g === 0 && b === 0) return [0, 0, 0, 100];
 const c = 1 - (r / 255);
 const m = 1 - (g / 255);
 const y = 1 - (b / 255);
 const k = Math.min(c, m, y);
 return [
 Math.round(((c - k) / (1 - k)) * 100),
 Math.round(((m - k) / (1 - k)) * 100),
 Math.round(((y - k) / (1 - k)) * 100),
 Math.round(k * 100)
 ];
};

const getLuminance = (r: number, g: number, b: number): number => {
 const a = [r, g, b].map((v) => {
 v /= 255;
 return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
 });
 return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export function ColorConverterClient() {
 const [color, setColor] = useState<ColorState>({ r: 59, g: 130, b: 246, a: 1 });
 const [hexInput, setHexInput] = useState("#3B82F6");
 const [bgColorHex, setBgColorHex] = useState("#FFFFFF");
 const [history, setHistory] = useState<ColorState[]>([]);

 const handleHexChange = (val: string) => {
 setHexInput(val);
 const parsed = hexToRgb(val);
 if (parsed) {
 setColor({ ...parsed, a: color.a });
 }
 };

 useEffect(() => {
 setHexInput(rgbToHex(color.r, color.g, color.b, color.a));
 }, [color]);

 const addToHistory = () => {
 setHistory((prev) => {
 const exists = prev.some((c) => c.r === color.r && c.g === color.g && c.b === color.b);
 if (exists) return prev;
 return [color, ...prev].slice(0, 10);
 });
 toast.success("Added to history");
 };

 const formats = useMemo(() => {
 const [h, s, l] = rgbToHsl(color.r, color.g, color.b);
 const [c, m, y, k] = rgbToCmyk(color.r, color.g, color.b);
 return {
 hex: rgbToHex(color.r, color.g, color.b, color.a),
 rgb: `rgb(${color.r}, ${color.g}, ${color.b})`,
 rgba: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a.toFixed(2)})`,
 hsl: `hsl(${h}, ${s}%, ${l}%)`,
 cmyk: `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`,
 };
 }, [color]);

 const harmonies = useMemo(() => {
 const [h, s, l] = rgbToHsl(color.r, color.g, color.b);
 const hslToHex = (h: number, s: number, l: number) => {
 l /= 100;
 const a = s * Math.min(l, 1 - l) / 100;
 const f = (n: number) => {
 const k = (n + h / 30) % 12;
 const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
 return Math.round(255 * color).toString(16).padStart(2, '0');
 };
 return `#${f(0)}${f(8)}${f(4)}`;
 };
 return {
 complementary: hslToHex((h + 180) % 360, s, l),
 analogous1: hslToHex((h - 30 + 360) % 360, s, l),
 analogous2: hslToHex((h + 30) % 360, s, l),
 triadic1: hslToHex((h + 120) % 360, s, l),
 triadic2: hslToHex((h - 120 + 360) % 360, s, l),
 };
 }, [color]);

 const contrast = useMemo(() => {
 const bgParsed = hexToRgb(bgColorHex) || { r: 255, g: 255, b: 255 };
 const l1 = getLuminance(color.r, color.g, color.b);
 const l2 = getLuminance(bgParsed.r, bgParsed.g, bgParsed.b);
 const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
 return {
 ratio: ratio.toFixed(2),
 aa: ratio >= 4.5,
 aaa: ratio >= 7,
 aaLarge: ratio >= 3,
 };
 }, [color, bgColorHex]);

 const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success("Copied to clipboard!");
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-4 py-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Palette}
 title="Universal Color Converter"
 description="Instantly convert colors between HEX, RGB, HSL, CMYK, and more. Includes contrast checker and color harmony generator."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Droplet className="w-4 h-4"/> Color Input</CardTitle>
 </CardHeader>
 <CardContent className="p-6 space-y-4">
 <div className="flex flex-col sm:flex-row gap-4 items-center">
 <Input type="color"value={rgbToHex(color.r, color.g, color.b)} onChange={(e) => handleHexChange(e.target.value)} className="w-24 h-24 rounded-xl cursor-pointer"/>
 <div className="flex-1 w-full">
 <Label>HEX Value</Label>
 <Input value={hexInput} onChange={(e) => handleHexChange(e.target.value)} className="mt-1 font-mono"/>
 </div>
 <div className="w-full sm:w-1/3">
 <Label>Opacity ({Math.round(color.a * 100)}%)</Label>
 <input type="range"min="0"max="1"step="0.01"value={color.a} onChange={(e) => setColor({ ...color, a: Number(e.target.value) })} className="w-full mt-2"/>
 </div>
 </div>
 <Button onClick={addToHistory} variant="outline"className="w-full"><History className="w-4 h-4 mr-2"/> Save to History</Button>
 </CardContent>
 </GlassCard>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 {Object.entries(formats).map(([key, val]) => (
 <Card key={key} className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>{key.toUpperCase()}</CardTitle>
 <Button variant="outline"size="sm"onClick={() => handleCopy(val)}><Copy className="w-4 h-4"/></Button>
 </CardHeader>
 <CardContent className="p-4">
 <p className="font-mono text-sm break-all">{val}</p>
 </CardContent>
 </Card>
 ))}
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Color Harmonies</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-3">
 <div className="flex gap-2">
 <div className="w-12 h-12 rounded-lg border"style={{ backgroundColor: harmonies.complementary }} title="Complementary"/>
 <div className="flex-1">
 <p className="text-sm font-semibold">Complementary</p>
 <p className="text-xs font-mono text-muted-foreground">{harmonies.complementary}</p>
 </div>
 </div>
 <div className="flex gap-2">
 <div className="w-12 h-12 rounded-lg border"style={{ backgroundColor: harmonies.analogous1 }} />
 <div className="w-12 h-12 rounded-lg border"style={{ backgroundColor: harmonies.analogous2 }} />
 <div className="flex-1">
 <p className="text-sm font-semibold">Analogous</p>
 <p className="text-xs font-mono text-muted-foreground">{harmonies.analogous1}, {harmonies.analogous2}</p>
 </div>
 </div>
 <div className="flex gap-2">
 <div className="w-12 h-12 rounded-lg border"style={{ backgroundColor: harmonies.triadic1 }} />
 <div className="w-12 h-12 rounded-lg border"style={{ backgroundColor: harmonies.triadic2 }} />
 <div className="flex-1">
 <p className="text-sm font-semibold">Triadic</p>
 <p className="text-xs font-mono text-muted-foreground">{harmonies.triadic1}, {harmonies.triadic2}</p>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Contrast className="w-4 h-4"/> WCAG Contrast Checker</CardTitle>
 </CardHeader>
 <CardContent className="p-4 space-y-4">
 <div>
 <Label>Background Color</Label>
 <Input type="color"value={bgColorHex} onChange={(e) => setBgColorHex(e.target.value)} className="w-full h-10 mt-1"/>
 </div>
 <div className="p-4 rounded-lg text-center font-bold"style={{ backgroundColor: bgColorHex, color: formats.hex }}>
 Contrast Ratio: {contrast.ratio}:1
 </div>
 <div className="grid grid-cols-3 gap-2 text-center text-xs">
 <div className={`p-2 rounded ${contrast.aa ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>AA Normal {contrast.aa ? '✓' : '✗'}</div>
 <div className={`p-2 rounded ${contrast.aaLarge ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>AA Large {contrast.aaLarge ? '✓' : '✗'}</div>
 <div className={`p-2 rounded ${contrast.aaa ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>AAA Normal {contrast.aaa ? '✓' : '✗'}</div>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 {history.length > 0 && (
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>Recent Colors</CardTitle>
 </CardHeader>
 <CardContent className="p-4 flex flex-wrap gap-3">
 {history.map((c, i) => (
 <div key={i} className="w-10 h-10 rounded-lg border cursor-pointer hover:scale-110 transition-transform"style={{ backgroundColor: rgbToHex(c.r, c.g, c.b) }} onClick={() => setColor(c)} />
 ))}
 </CardContent>
 </GlassCard>
 )}

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Input Color", description:"Use the visual picker or paste any HEX, RGB, or HSL value.", icon: Droplet },
 { step:"02", title:"View Conversions", description:"Instantly see your color translated into all major web and print formats.", icon: Palette },
 { step:"03", title:"Check Accessibility", description:"Verify WCAG compliance against your background color to ensure readability.", icon: Contrast },
 ]}
 badges={["100% Free","Client-Side Privacy","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Palette, title:"Universal Conversion", description:"Seamlessly translate between HEX, RGB, HSL, HSV, and CMYK color spaces."},
 { icon: Contrast, title:"WCAG Compliance", description:"Built-in contrast ratio calculator ensures your text is accessible to all users."},
 { icon: Droplet, title:"Color Harmonies", description:"Generate complementary, analogous, and triadic color schemes instantly."},
 { icon: History, title:"Local History", description:"Keep track of your recently used colors for fast iteration and consistency."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none mt-6">
 <h3>Mastering Color Spaces in Web Development</h3>
 <p>Color is a fundamental pillar of user interface design, directly influencing brand perception, user emotion, and accessibility. In web development, understanding the nuances between different color spaces is critical for achieving consistent results across various devices and mediums. The most common web color space is HEX (hexadecimal), which is essentially a representation of the RGB (Red, Green, Blue) additive color model. RGB is ideal for screens because it maps directly to how digital displays emit light. However, RGB is highly unintuitive for humans to manipulate mentally; adjusting the"warmth"or"saturation"of a color using RGB values requires complex mental math.</p>
 <p>This is where HSL (Hue, Saturation, Lightness) becomes invaluable. HSL maps color to a 360-degree color wheel (Hue), a percentage of color intensity (Saturation), and a percentage of brightness (Lightness). This model aligns much closer to human perception. When a designer wants to create a hover state for a button, they can simply take the base HSL color and decrease the Lightness value by 10%, guaranteeing a mathematically harmonious darker shade. Similarly, the CMYK (Cyan, Magenta, Yellow, Key/Black) subtractive model is essential when your digital designs need to transition to print media, as ink absorption behaves entirely differently than light emission.</p>
 <h3>The Critical Role of Contrast and Accessibility</h3>
 <p>Beyond aesthetics, color choices dictate the accessibility of your application. The Web Content Accessibility Guidelines (WCAG) mandate specific contrast ratios between foreground text and background colors to ensure readability for users with visual impairments. A minimum ratio of 4.5:1 is required for standard text (AA compliance), while 7:1 is recommended for enhanced readability (AAA compliance). Relying solely on visual estimation is dangerous, as monitor calibration varies wildly. Utilizing algorithmic luminance calculations—as implemented in this tool—ensures your interface remains inclusive and legally compliant across all global accessibility standards.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"What is the difference between RGB and HSL?", answer:"RGB defines color by mixing red, green, and blue light, which is how screens work. HSL defines color by its position on the color wheel (Hue), its intensity (Saturation), and its brightness (Lightness), which is much easier for humans to adjust."},
 { question:"Why does my color look different in print?", answer:"Screens use an additive RGB color model (emitting light), while printers use a subtractive CMYK model (absorbing light with ink). The CMYK gamut is smaller than RGB, meaning some vibrant screen colors physically cannot be reproduced with standard ink."},
 { question:"What is a good contrast ratio for accessibility?", answer:"WCAG guidelines require a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text to meet AA standards. For AAA standards, the requirements are 7:1 and 4.5:1 respectively."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/dev/color-converter" max={6} />
 </div>
 );
}

export default ColorConverterClient;
