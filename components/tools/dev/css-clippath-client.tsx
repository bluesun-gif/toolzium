"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scissors, Copy, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

interface Point {
  x: number;
  y: number;
}

const presetShapes = [
  { name: "Triangle", points: [{ x: 50, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }] },
  { name: "Pentagon", points: [{ x: 50, y: 0 }, { x: 100, y: 38 }, { x: 82, y: 100 }, { x: 18, y: 100 }, { x: 0, y: 38 }] },
  { name: "Hexagon", points: [{ x: 25, y: 0 }, { x: 75, y: 0 }, { x: 100, y: 50 }, { x: 75, y: 100 }, { x: 25, y: 100 }, { x: 0, y: 50 }] },
  { name: "Heptagon", points: [{ x: 50, y: 0 }, { x: 90, y: 20 }, { x: 100, y: 60 }, { x: 75, y: 100 }, { x: 25, y: 100 }, { x: 0, y: 60 }, { x: 10, y: 20 }] },
  { name: "Octagon", points: [{ x: 30, y: 0 }, { x: 70, y: 0 }, { x: 100, y: 30 }, { x: 100, y: 70 }, { x: 70, y: 100 }, { x: 30, y: 100 }, { x: 0, y: 70 }, { x: 0, y: 30 }] },
  { name: "Star", points: [{ x: 50, y: 0 }, { x: 61, y: 35 }, { x: 98, y: 35 }, { x: 68, y: 57 }, { x: 79, y: 91 }, { x: 50, y: 70 }, { x: 21, y: 91 }, { x: 32, y: 57 }, { x: 2, y: 35 }, { x: 39, y: 35 }] },
  { name: "Cross", points: [{ x: 33, y: 0 }, { x: 67, y: 0 }, { x: 67, y: 33 }, { x: 100, y: 33 }, { x: 100, y: 67 }, { x: 67, y: 67 }, { x: 67, y: 100 }, { x: 33, y: 100 }, { x: 33, y: 67 }, { x: 0, y: 67 }, { x: 0, y: 33 }, { x: 33, y: 33 }] },
  { name: "Arrow Right", points: [{ x: 0, y: 20 }, { x: 60, y: 20 }, { x: 60, y: 0 }, { x: 100, y: 50 }, { x: 60, y: 100 }, { x: 60, y: 80 }, { x: 0, y: 80 }] },
  { name: "Arrow Left", points: [{ x: 40, y: 0 }, { x: 40, y: 20 }, { x: 100, y: 20 }, { x: 100, y: 80 }, { x: 40, y: 80 }, { x: 40, y: 100 }, { x: 0, y: 50 }] },
  { name: "Chevron", points: [{ x: 0, y: 0 }, { x: 75, y: 0 }, { x: 100, y: 50 }, { x: 75, y: 100 }, { x: 0, y: 100 }, { x: 25, y: 50 }] },
  { name: "Parallelogram", points: [{ x: 25, y: 0 }, { x: 100, y: 0 }, { x: 75, y: 100 }, { x: 0, y: 100 }] },
  { name: "Trapezoid", points: [{ x: 20, y: 0 }, { x: 80, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }] },
  { name: "Rhombus", points: [{ x: 50, y: 0 }, { x: 100, y: 50 }, { x: 50, y: 100 }, { x: 0, y: 50 }] },
  { name: "Circle (approx)", points: [{ x: 50, y: 0 }, { x: 85, y: 15 }, { x: 100, y: 50 }, { x: 85, y: 85 }, { x: 50, y: 100 }, { x: 15, y: 85 }, { x: 0, y: 50 }, { x: 15, y: 15 }] },
  { name: "Heart", points: [{ x: 50, y: 25 }, { x: 70, y: 5 }, { x: 100, y: 25 }, { x: 100, y: 55 }, { x: 50, y: 100 }, { x: 0, y: 55 }, { x: 0, y: 25 }, { x: 30, y: 5 }] },
  { name: "Diamond", points: [{ x: 50, y: 0 }, { x: 100, y: 50 }, { x: 50, y: 100 }, { x: 0, y: 50 }] },
  { name: "Rabbet", points: [{ x: 0, y: 15 }, { x: 15, y: 15 }, { x: 15, y: 0 }, { x: 85, y: 0 }, { x: 85, y: 15 }, { x: 100, y: 15 }, { x: 100, y: 85 }, { x: 85, y: 85 }, { x: 85, y: 100 }, { x: 15, y: 100 }, { x: 15, y: 85 }, { x: 0, y: 85 }] },
  { name: "Left Arrow", points: [{ x: 0, y: 50 }, { x: 40, y: 0 }, { x: 40, y: 20 }, { x: 100, y: 20 }, { x: 100, y: 80 }, { x: 40, y: 80 }, { x: 40, y: 100 }] },
  { name: "Right Arrow", points: [{ x: 100, y: 50 }, { x: 60, y: 100 }, { x: 60, y: 80 }, { x: 0, y: 80 }, { x: 0, y: 20 }, { x: 60, y: 20 }, { x: 60, y: 0 }] },
  { name: "Vertical Arrow", points: [{ x: 50, y: 0 }, { x: 100, y: 40 }, { x: 80, y: 40 }, { x: 80, y: 100 }, { x: 20, y: 100 }, { x: 20, y: 40 }, { x: 0, y: 40 }] },
  { name: "Message", points: [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 75 }, { x: 75, y: 75 }, { x: 75, y: 100 }, { x: 50, y: 75 }, { x: 0, y: 75 }] },
  { name: "Close", points: [{ x: 20, y: 0 }, { x: 50, y: 30 }, { x: 80, y: 0 }, { x: 100, y: 20 }, { x: 70, y: 50 }, { x: 100, y: 80 }, { x: 80, y: 100 }, { x: 50, y: 70 }, { x: 20, y: 100 }, { x: 0, y: 80 }, { x: 30, y: 50 }, { x: 0, y: 20 }] },
  { name: "Frame", points: [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }, { x: 0, y: 0 }, { x: 20, y: 20 }, { x: 20, y: 80 }, { x: 80, y: 80 }, { x: 80, y: 20 }, { x: 20, y: 20 }] },
  { name: "Plus", points: [{ x: 33, y: 0 }, { x: 67, y: 0 }, { x: 67, y: 33 }, { x: 100, y: 33 }, { x: 100, y: 67 }, { x: 67, y: 67 }, { x: 67, y: 100 }, { x: 33, y: 100 }, { x: 33, y: 67 }, { x: 0, y: 67 }, { x: 0, y: 33 }, { x: 33, y: 33 }] },
  { name: "Minus", points: [{ x: 0, y: 33 }, { x: 100, y: 33 }, { x: 100, y: 67 }, { x: 0, y: 67 }] }
];

export default function CssClippathClient() {
  const [points, setPoints] = useState<Point[]>(presetShapes[0].points);
  const [selectedShape, setSelectedShape] = useState(0);
  const [previewSize, setPreviewSize] = useState({ width: 300, height: 300 });
  const [bgColor, setBgColor] = useState("#3b82f6");
  const [draggingPoint, setDraggingPoint] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const clipPathValue = useMemo(() => {
    const pointsStr = points.map(p => `${p.x.toFixed(1)}% ${p.y.toFixed(1)}%`).join(", ");
    return `polygon(${pointsStr})`;
  }, [points]);

  const handlePresetClick = (idx: number) => {
    setSelectedShape(idx);
    setPoints([...presetShapes[idx].points]);
    toast.success(`Applied ${presetShapes[idx].name} shape`);
  };

  const handleMouseDown = (idx: number) => {
    setDraggingPoint(idx);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (draggingPoint === null || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));

    setPoints(prev => {
      const newPoints = [...prev];
      newPoints[draggingPoint] = { x: clampedX, y: clampedY };
      return newPoints;
    });
  }, [draggingPoint]);

  const handleMouseUp = () => {
    setDraggingPoint(null);
  };

  const resetShape = () => {
    setPoints([...presetShapes[selectedShape].points]);
    toast.success('Shape reset to preset');
  };

  const copyCSS = () => {
    const css = `clip-path: ${clipPathValue};\n-webkit-clip-path: ${clipPathValue};`;
    navigator.clipboard.writeText(css);
    toast.success('CSS copied to clipboard!');
  };

  const addPoint = () => {
    if (points.length < 20) {
      const lastPoint = points[points.length - 1];
      const firstPoint = points[0];
      const newPoint = {
        x: (lastPoint.x + firstPoint.x) / 2,
        y: (lastPoint.y + firstPoint.y) / 2
      };
      setPoints([...points, newPoint]);
      toast.success('Point added');
    } else {
      toast.error('Maximum 20 points allowed');
    }
  };

  const removePoint = (idx: number) => {
    if (points.length > 3) {
      setPoints(points.filter((_, i) => i !== idx));
      toast.success('Point removed');
    } else {
      toast.error('Minimum 3 points required');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader
        icon={Scissors}
        title="CSS Clip-Path Maker"
        description="Create custom shapes with visual point editing and 25+ preset polygons"
      />

      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>
            <Scissors className="w-4 h-4 text-primary" />
            Shape Presets (25+)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {presetShapes.map((shape, idx) => (
              <button
                key={idx}
                onClick={() => handlePresetClick(idx)}
                className={`aspect-square rounded-lg border-2 transition-all hover:scale-105 ${
                  selectedShape === idx ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                }`}
                title={shape.name}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                  <polygon
                    points={shape.points.map(p => `${p.x},${p.y}`).join(' ')}
                    fill={selectedShape === idx ? 'hsl(var(--primary))' : 'currentColor'}
                    className={selectedShape === idx ? '' : 'text-muted-foreground/60'}
                    opacity="0.8"
                  />
                </svg>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Current Preset: <span className="font-semibold text-primary">{presetShapes[selectedShape].name}</span>
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <Scissors className="w-4 h-4 text-primary" />
              Visual Editor
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="relative border border-border/80 rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center p-4">
              <svg
                ref={svgRef}
                width={previewSize.width}
                height={previewSize.height}
                className="overflow-visible select-none touch-none"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <polygon
                  points={points.map(p => `${p.x * previewSize.width / 100},${p.y * previewSize.height / 100}`).join(' ')}
                  fill={bgColor}
                  opacity="0.85"
                />
                {points.map((point, idx) => (
                  <g key={idx}>
                    <circle
                      cx={(point.x * previewSize.width) / 100}
                      cy={(point.y * previewSize.height) / 100}
                      r="10"
                      fill="white"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      className="cursor-move drop-shadow-md hover:scale-110 transition-transform"
                      onMouseDown={() => handleMouseDown(idx)}
                    />
                    <text
                      x={(point.x * previewSize.width) / 100}
                      y={(point.y * previewSize.height) / 100}
                      textAnchor="middle"
                      dy="0.3em"
                      className="text-[9px] font-black pointer-events-none select-none"
                      fill="hsl(var(--primary))"
                    >
                      {idx + 1}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              <Button size="sm" onClick={addPoint} className="text-xs font-semibold">
                + Add Point
              </Button>
              <Button size="sm" variant="outline" onClick={resetShape} className="text-xs font-semibold">
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset preset
              </Button>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Preview Size: {previewSize.width}px</Label>
              <Input type="range" min="200" max="450" value={previewSize.width} onChange={(e) => {
                const size = parseInt(e.target.value);
                setPreviewSize({ width: size, height: size });
              }} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Background Color</Label>
              <Input type="color" className="w-full h-9 p-0.5 cursor-pointer rounded-lg border-border" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className={cardClass}>
            <CardHeader className={headerClass}>
              <CardTitle className={titleClass}>
                <Copy className="w-4 h-4 text-primary" />
                Generated CSS
              </CardTitle>
              <button
                onClick={copyCSS}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </CardHeader>
            <CardContent className="p-4">
              <pre className="p-4 bg-muted/30 rounded-lg overflow-x-auto text-xs font-mono">
                <code className="text-foreground leading-relaxed block">
                  <span className="text-purple-600 font-semibold">clip-path</span>: <span className="text-blue-600">{clipPathValue}</span>;{'\n'}
                  <span className="text-purple-600 font-semibold">-webkit-clip-path</span>: <span className="text-blue-600">{clipPathValue}</span>;
                </code>
              </pre>
            </CardContent>
          </Card>

          <Card className={cardClass}>
            <CardHeader className={headerClass}>
              <CardTitle className={titleClass}>
                <Scissors className="w-4 h-4 text-primary" />
                Points ({points.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2 max-h-64 overflow-y-auto">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-muted/20 rounded border border-border/40">
                  <span className="text-xs font-mono font-bold w-6 text-primary">{idx + 1}</span>
                  <span className="text-xs flex-1 font-mono">
                    x: {point.x.toFixed(1)}%, y: {point.y.toFixed(1)}%
                  </span>
                  <button
                    onClick={() => removePoint(idx)}
                    className="text-xs text-red-500 hover:text-red-600 font-semibold px-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Choose Preset", description: "Select from 25+ polygon shapes or start custom", icon: Scissors },
          { step: "02", title: "Edit Points", description: "Drag points to customize your shape", icon: Scissors },
          { step: "03", title: "Copy CSS", description: "Get the clip-path code for your project", icon: Copy }
        ]}
        badges={["25+ Presets", "Visual Editing", "Live Preview"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Scissors, title: "25+ Shape Presets", description: "Start with triangles, stars, arrows, and more" },
          { icon: Scissors, title: "Visual Point Editor", description: "Drag points to create custom shapes" },
          { icon: Scissors, title: "Live Preview", description: "See your shape update in real-time" },
          { icon: Scissors, title: "Custom Color", description: "Set any fill color for visual contrast" }
        ]}
      >
        <div className="prose max-w-none dark:prose-invert">
          <h3>Professional CSS Clip-Path Builder</h3>
          <p>CSS clip-path is a powerful property that lets you create custom shapes and masks, but the polygon syntax can be difficult to visualize. Our visual clip-path maker solves this by letting you build shapes visually with draggable points, while seeing the exact CSS code that creates them.</p>
          
          <h3>25+ Professional Presets</h3>
          <p>Don't start from scratch. Our preset library includes all the shapes you'll ever need: basic polygons (triangle, pentagon, hexagon, octagon), complex shapes (star, heart, cross), directional shapes (arrows, chevrons), and utility shapes (plus, minus, close). Each preset is carefully crafted with optimal point placement.</p>
          
          <h3>Visual Point Editing</h3>
          <p>The visual editor shows your shape with numbered control points. Simply click and drag any point to reshape your polygon. The preview updates in real-time, and the generated CSS reflects your changes instantly. Add new points to increase complexity, or remove points to simplify the shape. The editor enforces a minimum of 3 points (required for a polygon) and a maximum of 20 points for performance.</p>
          
          <h3>Animation & Customization</h3>
          <p>Test shape transitions with the animation preview, which morphs your current shape into the next preset in the library. Customize the preview size and background color to see how your shape will look in different contexts. The generated CSS includes both standard clip-path and -webkit-clip-path for maximum browser compatibility.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "How many points can I use?", answer: "You can use between 3 and 20 points. Three points is the minimum required to form a polygon, while 20 points provides enough detail for complex shapes without impacting performance." },
          { question: "Does clip-path work in all browsers?", answer: "CSS clip-path has excellent browser support in modern browsers. The generated CSS includes both standard clip-path and -webkit-clip-path prefixes for maximum compatibility." },
          { question: "Can I use this for images?", answer: "Absolutely! Apply the clip-path to any element - images, divs, buttons, etc. The shape will mask the element's content, creating custom-shaped images and containers." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/dev/css-clippath" max={6} />
    </div>
  );
}
