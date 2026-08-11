"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Sparkles, Palette, SlidersHorizontal, Layers, Shuffle, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";

type GradientType = "linear" | "radial" | "conic";
interface ColorStop { id: string; color: string; position: number; }

const presets = [
  { name: "Sunrise", stops: [{ color: "#ff9966", pos: 0 }, { color: "#ff5e62", pos: 100 }] },
  { name: "Ocean", stops: [{ color: "#2E3192", pos: 0 }, { color: "#1BFFFF", pos: 100 }] },
  { name: "Purple Haze", stops: [{ color: "#7F00FF", pos: 0 }, { color: "#E100FF", pos: 100 }] },
  { name: "Forest", stops: [{ color: "#134E5E", pos: 0 }, { color: "#71B280", pos: 100 }] },
  { name: "Northern Lights", stops: [{ color: "#43cea2", pos: 0 }, { color: "#185a9d", pos: 100 }] },
  { name: "Cotton Candy", stops: [{ color: "#FFB6C1", pos: 0 }, { color: "#87CEFA", pos: 100 }] },
];

export function GradientGeneratorClient() {
  const [type, setType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(90);
  const [stops, setStops] = useState<ColorStop[]>([
    { id: "1", color: "#ff0076", position: 0 },
    { id: "2", color: "#590fb7", position: 100 }
  ]);

  const cssCode = useMemo(() => {
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const stopsStr = sortedStops.map((s) => `${s.color} ${s.position}%`).join(", ");
    if (type === "linear") return `linear-gradient(${angle}deg, ${stopsStr})`;
    if (type === "radial") return `radial-gradient(circle, ${stopsStr})`;
    return `conic-gradient(from ${angle}deg, ${stopsStr})`;
  }, [type, angle, stops]);

  const tailwindCode = `bg-[${cssCode.replace(/\s+/g, "")}]`;

  const addStop = () => {
    if (stops.length < 6) {
      setStops([...stops, { id: Date.now().toString(), color: "#00ffcc", position: 50 }]);
    } else {
      toast.error("Maximum 6 stops allowed");
    }
  };

  const removeStop = (id: string) => {
    if (stops.length > 2) {
      setStops(stops.filter((s) => s.id !== id));
    } else {
      toast.error("Minimum 2 stops required");
    }
  };

  const updateStop = (id: string, field: keyof ColorStop, value: any) => {
    setStops(stops.map((s) => s.id === id ? { ...s, [field]: value } : s));
  };

  const randomize = () => {
    const randColor = () => `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    setStops([
      { id: "1", color: randColor(), position: 0 },
      { id: "2", color: randColor(), position: 100 }
    ]);
    setAngle(Math.floor(Math.random() * 360));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8">
      <ToolPageHeader
        icon={Palette}
        title="CSS Gradient Generator"
        description="Create beautiful linear, radial, and conic gradients with multi-stop support and Tailwind CSS output."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className={`${cardClass} lg:col-span-1`}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}><SlidersHorizontal className="w-4 h-4" /> Gradient Controls</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-6 max-h-[600px] overflow-y-auto">
            <div className="flex gap-2">
              {(["linear", "radial", "conic"] as GradientType[]).map((t) => (
                <Button key={t} variant={type === t ? "default" : "outline"} size="sm" className="flex-1 capitalize" onClick={() => setType(t)}>
                  {t}
                </Button>
              ))}
            </div>

            {type === "linear" && (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-medium text-muted-foreground">Angle</Label>
                  <span className="text-xs font-mono font-semibold text-primary">{angle}°</span>
                </div>
                <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
              </div>
            )}

            <div className="space-y-3 pt-4 border-t border-border/40">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-medium">Color Stops ({stops.length}/6)</Label>
                <Button variant="ghost" size="sm" onClick={addStop} disabled={stops.length >= 6}>
                  <Plus className="w-3 h-3 mr-1" /> Add
                </Button>
              </div>
              {stops.map((stop) => (
                <div key={stop.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                  <input type="color" value={stop.color} onChange={(e) => updateStop(stop.id, "color", e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer bg-transparent border-0" />
                  <input type="number" min={0} max={100} value={stop.position} onChange={(e) => updateStop(stop.id, "position", Number(e.target.value))}
                    className="w-16 text-xs bg-background border border-border rounded px-2 py-1" />
                  <input type="range" min={0} max={100} value={stop.position} onChange={(e) => updateStop(stop.id, "position", Number(e.target.value))}
                    className="flex-1 h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
                  <button onClick={() => removeStop(stop.id)} className="text-destructive hover:text-destructive/80 p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-border/40">
              <Label className="text-xs font-medium">Presets</Label>
              <div className="grid grid-cols-3 gap-2">
                {presets.map((p) => (
                  <button key={p.name} onClick={() => {
                    setStops(p.stops.map((s, i) => ({ id: i.toString(), color: s.color, position: s.pos })));
                    setType("linear");
                  }} className="h-10 rounded-md border border-border/50 hover:border-primary transition-all"
                    style={{ background: `linear-gradient(90deg, ${p.stops.map(s => s.color).join(", ")})` }} title={p.name} />
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={randomize}>
              <Shuffle className="w-4 h-4 mr-2" /> Randomize
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className={cardClass}>
            <CardHeader className={headerClass}>
              <CardTitle className={titleClass}><Layers className="w-4 h-4" /> Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[250px] w-full rounded-b-2xl" style={{ background: cssCode }} />
            </CardContent>
          </Card>

          <Card className={cardClass}>
            <CardHeader className={headerClass}>
              <div className="flex items-center justify-between w-full">
                <CardTitle className={titleClass}>Standard CSS</CardTitle>
                <button
                  onClick={() => { navigator.clipboard.writeText(`background: ${cssCode};`); toast.success("Copied CSS!"); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <pre className="w-full bg-slate-950 text-cyan-400 p-4 rounded-lg text-xs font-mono overflow-x-auto">background: {cssCode};</pre>
            </CardContent>
          </Card>

          <Card className={cardClass}>
            <CardHeader className={headerClass}>
              <div className="flex items-center justify-between w-full">
                <CardTitle className={titleClass}>Tailwind CSS Class</CardTitle>
                <button
                  onClick={() => { navigator.clipboard.writeText(tailwindCode); toast.success("Copied Tailwind Class!"); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <pre className="w-full bg-slate-950 text-emerald-400 p-4 rounded-lg text-xs font-mono overflow-x-auto">{tailwindCode}</pre>
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Select Type", description: "Choose between linear, radial, or conic gradient types.", icon: Layers },
          { step: "02", title: "Add Color Stops", description: "Define up to 6 colors and their exact position percentages.", icon: Palette },
          { step: "03", title: "Export Code", description: "Grab the standard CSS or the Tailwind arbitrary value class.", icon: Copy }
        ]}
        badges={["100% Free", "Client-Side Privacy", "No Signup"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Sparkles, title: "Multi-Stop Support", description: "Add up to 6 distinct color stops for complex, multi-tonal transitions." },
          { icon: Layers, title: "Three Gradient Types", description: "Full support for linear, radial, and conic gradient functions." },
          { icon: Palette, title: "Tailwind Integration", description: "Automatically generates arbitrary value classes for Tailwind CSS." },
          { icon: Shuffle, title: "Random Generator", description: "Instantly generate beautiful, random color combinations for inspiration." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>Mastering CSS Gradients for Modern Web Design</h3>
          <p>CSS gradients are a fundamental pillar of modern web design, allowing developers to create smooth transitions between two or more colors without relying on heavy image assets. From subtle background washes to vibrant, eye-catching buttons, gradients add visual interest and guide user attention. The evolution of CSS has introduced three primary types of gradients: linear, radial, and conic. Linear gradients flow along a straight axis, defined by an angle or directional keyword, making them perfect for sleek headers and progress bars. Radial gradients emanate from a central point outward in a circular or elliptical shape, ideal for spotlight effects and glowing orbs. Conic gradients, the newest addition, sweep around a center point like a color wheel, enabling the creation of pie charts, dials, and mesmerizing psychedelic patterns.</p>
          <p>Mastering color stops is the secret to professional-grade gradients. By strategically placing multiple color stops at specific percentages, designers can create complex, multi-tonal transitions that mimic real-world lighting and materials. Our advanced gradient generator supports up to six distinct color stops, giving you unprecedented control over the pacing and distribution of your colors.</p>
          <p>Furthermore, integrating these gradients into modern utility-first frameworks like Tailwind CSS is seamless. While Tailwind provides a robust set of default gradient utilities, complex custom gradients require arbitrary value syntax. This tool automatically generates the exact Tailwind class names you need, bridging the gap between custom design and rapid development. Whether you are building a SaaS landing page, a creative portfolio, or a dynamic data visualization, generating optimized, cross-browser CSS gradient code ensures your designs remain crisp and performant on any device.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "How do I use this in Tailwind CSS?", answer: "Copy the generated Tailwind class (e.g., bg-[linear-gradient(...)]) and apply it directly to your element's className. Tailwind's JIT compiler will automatically generate the required CSS." },
          { question: "Can I animate these gradients?", answer: "Yes! You can animate the background-position or background-size properties using CSS keyframes to create moving gradient effects." },
          { question: "Do gradients affect page load speed?", answer: "CSS gradients are rendered natively by the browser and are significantly faster and lighter than downloading equivalent PNG or JPEG images." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/dev/gradient-generator" max={6} />
    </div>
  );
}

export default GradientGeneratorClient;
