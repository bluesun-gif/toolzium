"use client";

import React, { useState, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import InputField from "@/components/shared/form-fields/input-field";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { Pipette, Palette, Eye, Sun, History, Hash, MonitorSmartphone, SlidersHorizontal, Copy } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import toast from "react-hot-toast";

// CSS Colors List (a representative subset)
const cssColors = [
  { name: "AliceBlue", hex: "#F0F8FF" }, { name: "AntiqueWhite", hex: "#FAEBD7" }, { name: "Aqua", hex: "#00FFFF" },
  { name: "Aquamarine", hex: "#7FFFD4" }, { name: "Azure", hex: "#F0FFFF" }, { name: "Beige", hex: "#F5F5DC" },
  { name: "Bisque", hex: "#FFE4C4" }, { name: "Black", hex: "#000000" }, { name: "BlanchedAlmond", hex: "#FFEBCD" },
  { name: "Blue", hex: "#0000FF" }, { name: "BlueViolet", hex: "#8A2BE2" }, { name: "Brown", hex: "#A52A2A" },
  { name: "BurlyWood", hex: "#DEB887" }, { name: "CadetBlue", hex: "#5F9EA0" }, { name: "Chartreuse", hex: "#7FFF00" },
  { name: "Chocolate", hex: "#D2691E" }, { name: "Coral", hex: "#FF7F50" }, { name: "CornflowerBlue", hex: "#6495ED" },
  { name: "Crimson", hex: "#DC143C" }, { name: "Cyan", hex: "#00FFFF" }, { name: "DarkBlue", hex: "#00008B" },
  { name: "DarkCyan", hex: "#008B8B" }, { name: "DarkGoldenRod", hex: "#B8860B" }, { name: "DarkGray", hex: "#A9A9A9" },
  { name: "DarkGreen", hex: "#006400" }, { name: "DarkKhaki", hex: "#BDB76B" }, { name: "DarkMagenta", hex: "#8B008B" },
  { name: "DarkOliveGreen", hex: "#556B2F" }, { name: "DarkOrange", hex: "#FF8C00" }, { name: "DarkOrchid", hex: "#9932CC" },
  { name: "DarkRed", hex: "#8B0000" }, { name: "DarkSalmon", hex: "#E9967A" }, { name: "DarkSeaGreen", hex: "#8FBC8F" },
  { name: "DarkSlateBlue", hex: "#483D8B" }, { name: "DarkSlateGray", hex: "#2F4F4F" }, { name: "DarkTurquoise", hex: "#00CED1" },
  { name: "DarkViolet", hex: "#9400D3" }, { name: "DeepPink", hex: "#FF1493" }, { name: "DeepSkyBlue", hex: "#00BFFF" },
  { name: "DimGray", hex: "#696969" }, { name: "DodgerBlue", hex: "#1E90FF" }, { name: "FireBrick", hex: "#B22222" },
  { name: "FloralWhite", hex: "#FFFAF0" }, { name: "ForestGreen", hex: "#228B22" }, { name: "Fuchsia", hex: "#FF00FF" },
  { name: "Gainsboro", hex: "#DCDCDC" }, { name: "GhostWhite", hex: "#F8F8FF" }, { name: "Gold", hex: "#FFD700" },
  { name: "GoldenRod", hex: "#DAA520" }, { name: "Gray", hex: "#808080" }, { name: "Green", hex: "#008000" },
  { name: "GreenYellow", hex: "#ADFF2F" }, { name: "HoneyDew", hex: "#F0FFF0" }, { name: "HotPink", hex: "#FF69B4" },
  { name: "IndianRed", hex: "#CD5C5C" }, { name: "Indigo", hex: "#4B0082" }, { name: "Ivory", hex: "#FFFFF0" },
  { name: "Khaki", hex: "#F0E68C" }, { name: "Lavender", hex: "#E6E6FA" }, { name: "LavenderBlush", hex: "#FFF0F5" },
  { name: "LawnGreen", hex: "#7CFC00" }, { name: "LemonChiffon", hex: "#FFFACD" }, { name: "LightBlue", hex: "#ADD8E6" },
  { name: "LightCoral", hex: "#F08080" }, { name: "LightCyan", hex: "#E0FFFF" }, { name: "LightGoldenRodYellow", hex: "#FAFAD2" },
  { name: "LightGray", hex: "#D3D3D3" }, { name: "LightGreen", hex: "#90EE90" }, { name: "LightPink", hex: "#FFB6C1" },
  { name: "LightSalmon", hex: "#FFA07A" }, { name: "LightSeaGreen", hex: "#20B2AA" }, { name: "LightSkyBlue", hex: "#87CEFA" },
  { name: "LightSlateGray", hex: "#778899" }, { name: "LightSteelBlue", hex: "#B0C4DE" }, { name: "LightYellow", hex: "#FFFFE0" },
  { name: "Lime", hex: "#00FF00" }, { name: "LimeGreen", hex: "#32CD32" }, { name: "Linen", hex: "#FAF0E6" },
  { name: "Magenta", hex: "#FF00FF" }, { name: "Maroon", hex: "#800000" }, { name: "MediumAquaMarine", hex: "#66CDAA" },
  { name: "MediumBlue", hex: "#0000CD" }, { name: "MediumOrchid", hex: "#BA55D3" }, { name: "MediumPurple", hex: "#9370DB" },
  { name: "MediumSeaGreen", hex: "#3CB371" }, { name: "MediumSlateBlue", hex: "#7B68EE" }, { name: "MediumSpringGreen", hex: "#00FA9A" },
  { name: "MediumTurquoise", hex: "#48D1CC" }, { name: "MediumVioletRed", hex: "#C71585" }, { name: "MidnightBlue", hex: "#191970" },
  { name: "MintCream", hex: "#F5FFFA" }, { name: "MistyRose", hex: "#FFE4E1" }, { name: "Moccasin", hex: "#FFE4B5" },
  { name: "NavajoWhite", hex: "#FFDEAD" }, { name: "Navy", hex: "#000080" }, { name: "OldLace", hex: "#FDF5E6" },
  { name: "Olive", hex: "#808000" }, { name: "OliveDrab", hex: "#6B8E23" }, { name: "Orange", hex: "#FFA500" },
  { name: "OrangeRed", hex: "#FF4500" }, { name: "Orchid", hex: "#DA70D6" }, { name: "PaleGoldenRod", hex: "#EEE8AA" },
  { name: "PaleGreen", hex: "#98FB98" }, { name: "PaleTurquoise", hex: "#AFEEEE" }, { name: "PaleVioletRed", hex: "#DB7093" },
  { name: "PapayaWhip", hex: "#FFEFD5" }, { name: "PeachPuff", hex: "#FFDAB9" }, { name: "Peru", hex: "#CD853F" },
  { name: "Pink", hex: "#FFC0CB" }, { name: "Plum", hex: "#DDA0DD" }, { name: "PowderBlue", hex: "#B0E0E6" },
  { name: "Purple", hex: "#800080" }, { name: "RebeccaPurple", hex: "#663399" }, { name: "Red", hex: "#FF0000" },
  { name: "RosyBrown", hex: "#BC8F8F" }, { name: "RoyalBlue", hex: "#4169E1" }, { name: "SaddleBrown", hex: "#8B4513" },
  { name: "Salmon", hex: "#FA8072" }, { name: "SandyBrown", hex: "#F4A460" }, { name: "SeaGreen", hex: "#2E8B57" },
  { name: "SeaShell", hex: "#FFF5EE" }, { name: "Sienna", hex: "#A0522D" }, { name: "Silver", hex: "#C0C0C0" },
  { name: "SkyBlue", hex: "#87CEEB" }, { name: "SlateBlue", hex: "#6A5ACD" }, { name: "SlateGray", hex: "#708090" },
  { name: "Snow", hex: "#FFFAFA" }, { name: "SpringGreen", hex: "#00FF7F" }, { name: "SteelBlue", hex: "#4682B4" },
  { name: "Tan", hex: "#D2B48C" }, { name: "Teal", hex: "#008080" }, { name: "Thistle", hex: "#D8BFD8" },
  { name: "Tomato", hex: "#FF6347" }, { name: "Turquoise", hex: "#40E0D0" }, { name: "Violet", hex: "#EE82EE" },
  { name: "Wheat", hex: "#F5DEB3" }, { name: "White", hex: "#FFFFFF" }, { name: "WhiteSmoke", hex: "#F5F5F5" },
  { name: "Yellow", hex: "#FFFF00" }, { name: "YellowGreen", hex: "#9ACD32" }
];

// Pure JS Color Helpers
const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((c) => c + c).join("");
  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) return { r: 0, g: 0, b: 0 };
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("").toUpperCase();
};

const rgbToHsl = (r: number, g: number, b: number) => {
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
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const hslToRgb = (h: number, s: number, l: number) => {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

const hexToHsv = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  
  if (max !== min) {
    switch (max) {
      case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
      case gNorm: h = (bNorm - rNorm) / d + 2; break;
      case bNorm: h = (rNorm - gNorm) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
};

const getComplementaryHex = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const hsl = rgbToHsl(r, g, b);
  hsl.h = (hsl.h + 180) % 360;
  const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
};

const getColorName = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  let minDistance = Infinity;
  let closestName = "Unknown";
  
  for (const c of cssColors) {
    const { r: cr, g: cg, b: cb } = hexToRgb(c.hex);
    const distance = Math.sqrt(Math.pow(r - cr, 2) + Math.pow(g - cg, 2) + Math.pow(b - cb, 2));
    if (distance < minDistance) {
      minDistance = distance;
      closestName = c.name;
    }
  }
  return closestName;
};

export default function ColorPickerClient() {
  const [hex, setHex] = useState("#3B82F6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 90, l: 60 });
  const [hsv, setHsv] = useState({ h: 217, s: 76, v: 96 });
  
  const [history, setHistory] = useState<string[]>([]);
  
  const svAreaRef = useRef<HTMLDivElement>(null);
  const hueBarRef = useRef<HTMLDivElement>(null);
  const [isDraggingSv, setIsDraggingSv] = useState(false);
  const [isDraggingHue, setIsDraggingHue] = useState(false);

  const updateColorFromHex = (newHex: string, pushHistory = false) => {
    if (/^#[0-9A-Fa-f]{6}$/i.test(newHex)) {
      const validHex = newHex.toUpperCase();
      setHex(validHex);
      const newRgb = hexToRgb(validHex);
      setRgb(newRgb);
      setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
      setHsv(hexToHsv(validHex));
      if (pushHistory) {
        setHistory(prev => [validHex, ...prev.filter(c => c !== validHex)].slice(0, 12));
      }
    } else {
      setHex(newHex);
    }
  };

  const updateColorFromRgb = (r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    const newHex = rgbToHex(r, g, b);
    setHex(newHex);
    setHsl(rgbToHsl(r, g, b));
    setHsv(hexToHsv(newHex));
  };
  
  const updateColorFromHsl = (h: number, s: number, l: number) => {
    setHsl({ h, s, l });
    const newRgb = hslToRgb(h, s, l);
    setRgb(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHex(newHex);
    setHsv(hexToHsv(newHex));
  };

  const handleReset = () => {
    updateColorFromHex("#3B82F6", false);
    setHistory([]);
    toast.success("Color Picker reset!");
  };

  const handleNativePicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateColorFromHex(e.target.value, false);
  };

  const handleNativePickerBlur = () => {
    if (/^#[0-9A-Fa-f]{6}$/i.test(hex)) {
      updateColorFromHex(hex, true);
    }
  };

  const handleSvPointerMove = (e: React.PointerEvent<HTMLDivElement> | PointerEvent) => {
    if (!isDraggingSv || !svAreaRef.current) return;
    const rect = svAreaRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    const s = Math.round((x / rect.width) * 100);
    const v = Math.round((1 - y / rect.height) * 100);
    
    const c = (v / 100) * (s / 100);
    const x_val = c * (1 - Math.abs(((hsv.h / 60) % 2) - 1));
    const m = (v / 100) - c;
    let r1 = 0, g1 = 0, b1 = 0;
    if (hsv.h >= 0 && hsv.h < 60) { r1 = c; g1 = x_val; b1 = 0; }
    else if (hsv.h >= 60 && hsv.h < 120) { r1 = x_val; g1 = c; b1 = 0; }
    else if (hsv.h >= 120 && hsv.h < 180) { r1 = 0; g1 = c; b1 = x_val; }
    else if (hsv.h >= 180 && hsv.h < 240) { r1 = 0; g1 = x_val; b1 = c; }
    else if (hsv.h >= 240 && hsv.h < 300) { r1 = x_val; g1 = 0; b1 = c; }
    else if (hsv.h >= 300 && hsv.h <= 360) { r1 = c; g1 = 0; b1 = x_val; }
    
    updateColorFromRgb(Math.round((r1 + m) * 255), Math.round((g1 + m) * 255), Math.round((b1 + m) * 255));
  };

  const handleHuePointerMove = (e: React.PointerEvent<HTMLDivElement> | PointerEvent) => {
    if (!isDraggingHue || !hueBarRef.current) return;
    const rect = hueBarRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const h = Math.round((x / rect.width) * 360);
    
    const s = hsv.s / 100;
    const v = hsv.v / 100;
    const c = v * s;
    const x_val = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    let r1 = 0, g1 = 0, b1 = 0;
    if (h >= 0 && h < 60) { r1 = c; g1 = x_val; b1 = 0; }
    else if (h >= 60 && h < 120) { r1 = x_val; g1 = c; b1 = 0; }
    else if (h >= 120 && h < 180) { r1 = 0; g1 = c; b1 = x_val; }
    else if (h >= 180 && h < 240) { r1 = 0; g1 = x_val; b1 = c; }
    else if (h >= 240 && h < 300) { r1 = x_val; g1 = 0; b1 = c; }
    else if (h >= 300 && h <= 360) { r1 = c; g1 = 0; b1 = x_val; }
    
    updateColorFromRgb(Math.round((r1 + m) * 255), Math.round((g1 + m) * 255), Math.round((b1 + m) * 255));
  };

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDraggingSv || isDraggingHue) {
        setIsDraggingSv(false);
        setIsDraggingHue(false);
        if (/^#[0-9A-Fa-f]{6}$/i.test(hex)) {
          const validHex = hex.toUpperCase();
          setHistory(prev => [validHex, ...prev.filter(c => c !== validHex)].slice(0, 12));
        }
      }
    };
    const handleMouseMove = (e: PointerEvent) => {
      if (isDraggingSv) handleSvPointerMove(e);
      if (isDraggingHue) handleHuePointerMove(e);
    };

    if (isDraggingSv || isDraggingHue) {
      window.addEventListener("pointermove", handleMouseMove);
      window.addEventListener("pointerup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("pointerup", handleMouseUp);
    };
  }, [isDraggingSv, isDraggingHue, hex, hsv]);

  const isValidHex = /^#[0-9A-Fa-f]{6}$/i.test(hex);
  const activeHex = isValidHex ? hex.toUpperCase() : "#000000";
  const compHex = getComplementaryHex(activeHex);
  const colorName = getColorName(activeHex);

  const rgbString = "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
  const hslString = "hsl(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%)";
  const hsvString = "hsv(" + hsv.h + ", " + hsv.s + "%, " + hsv.v + "%)";

  const steps = [
    { step: "1", title: "Pick a Color", description: "Use the visual picker, hue slider, or native color input to find your perfect color." },
    { step: "2", title: "Adjust Values", description: "Fine-tune the exact HEX, RGB, or HSL values using the input fields.", icon: SlidersHorizontal },
    { step: "3", title: "Copy & Use", description: "Click the copy button next to your preferred color format to use it in your project.", icon: Copy }
  ];

  const features = [
    { title: "Multiple Formats", description: "Get instant conversions between HEX, RGB, HSL, and HSV color formats.", icon: Hash },
    { title: "Visual Color Picker", description: "Intuitive hue and saturation/value adjustment areas for precise picking.", icon: Palette },
    { title: "Complementary Colors", description: "Automatically generate the perfect complementary color for your selection.", icon: Eye },
    { title: "Color Name Detection", description: "Automatically identifies the closest standard CSS color name.", icon: Sun },
    { title: "Recent History", description: "Keeps track of your last 12 selected colors so you never lose a shade.", icon: History },
    { title: "Fully Local", description: "All conversions run completely in your browser. No data is sent to a server.", icon: MonitorSmartphone }
  ];

  const faqs = [
    { question: "What is the difference between HEX and HSL?", answer: "HEX is a hexadecimal representation of Red, Green, and Blue values, commonly used in web development. HSL represents Hue, Saturation, and Lightness, making it much easier for designers to adjust color intensity or brightness intuitively." },
    { question: "What are complementary colors?", answer: "Complementary colors are pairs of colors that, when combined or placed next to each other, create the highest contrast. They sit opposite each other on the color wheel (e.g., blue and orange)." },
    { question: "What color formats does this tool support?", answer: "The tool supports HEX, RGB, HSL, and HSV color formats, offering real-time conversions between them." },
    { question: "What is a safe contrast ratio for web accessibility?", answer: "According to WCAG 2.1 guidelines, standard text requires a minimum contrast ratio of 4.5:1 (Level AA) against its background, while large text requires a 3:1 ratio. Enhanced contrast (Level AAA) requires a 7:1 ratio." },
    { question: "Is this color picker private?", answer: "Yes. All color generation, picking, and conversions are calculated locally in your browser. No data is sent to a server." }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <ToolPageHeader
        title="Color Picker"
        description="Pick any color and get HEX, RGB, HSL codes instantly. Free online color picker with color name detection, complementary colors, and recent color history."
        icon={Pipette}
      />

      <GlassCard className="mt-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-4">
                {/* SV Area */}
                <div 
                  ref={svAreaRef}
                  className="w-full h-64 rounded-xl relative cursor-crosshair touch-none border border-border"
                  style={{ backgroundColor: "hsl(" + hsv.h + ", 100%, 50%)" }}
                  onPointerDown={(e) => { setIsDraggingSv(true); handleSvPointerMove(e); e.currentTarget.setPointerCapture(e.pointerId); }}
                >
                  <div className="absolute inset-0 rounded-xl" style={{ background: "linear-gradient(to right, #fff 0%, rgba(255,255,255,0) 100%)" }} />
                  <div className="absolute inset-0 rounded-xl" style={{ background: "linear-gradient(to bottom, transparent 0%, #000 100%)" }} />
                  <div 
                    className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full border-2 border-white shadow-[0_0_2px_rgba(0,0,0,0.5)] pointer-events-none"
                    style={{ left: hsv.s + "%", top: (100 - hsv.v) + "%", backgroundColor: activeHex }}
                  />
                </div>
                
                {/* Hue Bar */}
                <div 
                  ref={hueBarRef}
                  className="w-full h-6 rounded-full relative cursor-pointer touch-none"
                  style={{ background: "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)" }}
                  onPointerDown={(e) => { setIsDraggingHue(true); handleHuePointerMove(e); e.currentTarget.setPointerCapture(e.pointerId); }}
                >
                  <div 
                    className="absolute w-6 h-6 -ml-3 rounded-full border-2 border-white bg-white shadow-sm pointer-events-none"
                    style={{ left: (hsv.h / 360 * 100) + "%" }}
                  />
                </div>
              </div>

              {/* Info Blocks */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border shrink-0 shadow-sm">
                    <input 
                      type="color" 
                      value={activeHex} 
                      onChange={handleNativePicker}
                      onBlur={handleNativePickerBlur}
                      className="absolute -inset-4 w-24 h-24 cursor-pointer"
                      title="Native color picker"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Selected Color</h3>
                    <p className="text-sm text-muted-foreground mt-1">{colorName}</p>
                  </div>
                </div>

                <div className="flex-1 flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                  <div 
                    className="w-12 h-12 rounded-lg border border-border shrink-0 shadow-sm cursor-pointer hover:scale-105 transition-transform" 
                    style={{ backgroundColor: compHex }}
                    onClick={() => updateColorFromHex(compHex, true)}
                    title="Click to apply"
                  />
                  <div>
                    <h3 className="text-sm font-medium">Complementary</h3>
                    <p className="text-sm text-muted-foreground mt-1">{compHex}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-end">
                <ResetButton onClick={handleReset} />
              </div>

              <div className="space-y-4">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <InputField 
                      label="HEX" 
                      value={hex} 
                      onChange={(e) => updateColorFromHex(e.target.value)}
                      onBlur={() => updateColorFromHex(hex, true)}
                    />
                  </div>
                  <CopyButton getText={activeHex} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">RGB</label>
                  <div className="flex items-center gap-2">
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      <InputField 
                        type="number" 
                        min={0} max={255} 
                        value={rgb.r.toString()} 
                        onChange={(e) => updateColorFromRgb(Number(e.target.value) || 0, rgb.g, rgb.b)}
                      />
                      <InputField 
                        type="number" 
                        min={0} max={255} 
                        value={rgb.g.toString()} 
                        onChange={(e) => updateColorFromRgb(rgb.r, Number(e.target.value) || 0, rgb.b)}
                      />
                      <InputField 
                        type="number" 
                        min={0} max={255} 
                        value={rgb.b.toString()} 
                        onChange={(e) => updateColorFromRgb(rgb.r, rgb.g, Number(e.target.value) || 0)}
                      />
                    </div>
                    <CopyButton getText={rgbString} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">HSL</label>
                  <div className="flex items-center gap-2">
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      <InputField 
                        type="number" 
                        min={0} max={360} 
                        value={hsl.h.toString()} 
                        onChange={(e) => updateColorFromHsl(Number(e.target.value) || 0, hsl.s, hsl.l)}
                      />
                      <InputField 
                        type="number" 
                        min={0} max={100} 
                        value={hsl.s.toString()} 
                        onChange={(e) => updateColorFromHsl(hsl.h, Number(e.target.value) || 0, hsl.l)}
                      />
                      <InputField 
                        type="number" 
                        min={0} max={100} 
                        value={hsl.l.toString()} 
                        onChange={(e) => updateColorFromHsl(hsl.h, hsl.s, Number(e.target.value) || 0)}
                      />
                    </div>
                    <CopyButton getText={hslString} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">HSV</label>
                  <div className="flex items-center gap-2">
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      <InputField 
                        type="number" 
                        value={hsv.h.toString()} 
                        readOnly
                      />
                      <InputField 
                        type="number" 
                        value={hsv.s.toString()} 
                        readOnly
                      />
                      <InputField 
                        type="number" 
                        value={hsv.v.toString()} 
                        readOnly
                      />
                    </div>
                    <CopyButton getText={hsvString} />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-3">Recent Colors</h3>
                {history.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No recent colors yet.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {history.map((h, i) => (
                      <div 
                        key={h + "-" + i} 
                        className="w-8 h-8 rounded-md border border-border shadow-sm cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: h }}
                        onClick={() => updateColorFromHex(h, false)}
                        title={h}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </GlassCard>

      <ToolHowItWorks 
        title="How to Use the Color Picker" 
        steps={steps} 
      />

      <ToolFeatureGuides 
        title="Color Theory & Best Practices" 
        features={features}
      >
        <div className="space-y-8 mt-8 text-foreground/80">
          <section>
            <h3 className="text-xl font-semibold text-foreground mb-4">Understanding Color Formats</h3>
            <p className="mb-4">
              When designing interfaces or writing CSS, you&apos;ll encounter multiple ways to define a single color. Knowing which format to choose can speed up your workflow and improve your code&apos;s readability.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 px-4 font-semibold">Format</th>
                    <th className="py-2 px-4 font-semibold">Syntax Example</th>
                    <th className="py-2 px-4 font-semibold">Best Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-4"><strong>HEX</strong></td>
                    <td className="py-2 px-4"><code>#3B82F6</code></td>
                    <td className="py-2 px-4">Standard web development, copy-pasting, brand guidelines.</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-4"><strong>RGB</strong></td>
                    <td className="py-2 px-4"><code>rgb(59, 130, 246)</code></td>
                    <td className="py-2 px-4">Adding opacity (via RGBA), direct hardware/screen manipulation.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4"><strong>HSL</strong></td>
                    <td className="py-2 px-4"><code>hsl(217, 90%, 60%)</code></td>
                    <td className="py-2 px-4">Intuitive design adjustments, generating palettes programmatically.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              While developers often prefer <strong>HEX</strong> for its brevity, <strong>HSL</strong> (Hue, Saturation, Lightness) is vastly superior for design work. If you have a base color and want to make it 20% darker on hover, HSL lets you simply decrease the Lightness value, whereas adjusting HEX requires a complex calculation.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-4">Color Accessibility (WCAG 2.1)</h3>
            <p className="mb-4">
              Accessibility should never be an afterthought. The Web Content Accessibility Guidelines (WCAG) define specific contrast ratios to ensure text remains readable for users with visual impairments.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Level AA:</strong> Standard text requires a contrast ratio of at least <strong>4.5:1</strong>. Large text (18pt or 14pt bold) requires <strong>3:1</strong>.</li>
              <li><strong>Level AAA:</strong> The strictest standard, requiring a <strong>7:1</strong> ratio for normal text and <strong>4.5:1</strong> for large text.</li>
            </ul>
            <p>
              When selecting background and foreground colors in our picker, keep these ratios in mind to ensure your application is inclusive to everyone.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-4">Modern CSS Color Functions</h3>
            <p className="mb-4">
              CSS color specifications have evolved significantly. Modern browsers now support advanced functions that make color manipulation easier than ever:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><code>color-mix()</code>: Mix two colors together in any color space (e.g., <code>color-mix(in srgb, #3B82F6 80%, white)</code>).</li>
              <li><code>oklch()</code>: A perceptual color space that ensures uniform lightness across different hues, solving the issue where &quot;yellow&quot; appears much brighter than &quot;blue&quot; even if they have the same HSL lightness.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-4">Color Psychology in Web Design</h3>
            <p className="mb-4">
              Colors carry inherent emotional weight. Selecting the right primary and semantic colors is crucial for UX:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Blue:</strong> Trust, security, and professionalism. Widely used in banking and enterprise software.</li>
              <li><strong>Red:</strong> Urgency, passion, or danger. Reserved for destructive actions (like deleting an account) or critical errors.</li>
              <li><strong>Green:</strong> Success, growth, and positivity. Ideal for confirmation messages or environmental themes.</li>
              <li><strong>Yellow/Orange:</strong> Energy, warning, and attention. Perfect for cautionary alerts or prominent call-to-action buttons.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-4">Design Token Best Practices</h3>
            <p>
              When implementing colors in a codebase, avoid naming variables after the color itself (e.g., <code>--color-blue-500</code>). Instead, use semantic design tokens like <code>--color-primary</code> or <code>--bg-surface-active</code>. This abstraction makes it infinitely easier to implement dark mode or rebrand an application without rewriting hundreds of CSS rules.
            </p>
          </section>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion faqs={faqs} />
      
      <RelatedTools currentToolUrl="/tools/dev/color-picker" max={6} />
    </div>
  );
}
