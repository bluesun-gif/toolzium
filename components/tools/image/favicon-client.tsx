"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import { useState, useEffect, useRef, ChangeEvent } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { ResetButton } from"@/components/shared/action-buttons";
import { Download, Globe, Image, Image as ImageIcon, Palette, Type, Upload } from"lucide-react";
import toast from"react-hot-toast";

const SIZES = [16, 32, 48, 180, 192, 512];
export function FaviconGeneratorClient() {
  const [text, setText] = useState("T");
  const [bgColor, setBgColor] = useState("#4f46e5");
  const [textColor, setTextColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(60);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawFavicon = (size: number, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);
    if (imageFile) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, size, size);
      };
      img.src = imageFile;
    } else {
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, size * 0.2);
      ctx.fill();
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `bold ${size * fontSize / 100}px sans-serif`;
      ctx.fillText(text, size / 2, size / 2 + size * 0.05);
    }
  };
  useEffect(() => {
    if (canvasRef.current) {
      drawFavicon(512, canvasRef.current);
    }
  }, [text, bgColor, textColor, fontSize, imageFile]);
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        if (ev.target?.result) {
          setImageFile(ev.target.result as string);
          toast.success("Image uploaded");
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDownload = (size: number) => {
    const tempCanvas = document.createElement("canvas");
    drawFavicon(size, tempCanvas);
    setTimeout(() => {
      const link = document.createElement("a");
      link.download = `favicon-${size}x${size}.png`;
      link.href = tempCanvas.toDataURL("image/png");
      link.click();
      toast.success(`Downloaded ${size}x${size}`);
    }, 100); // small delay to allow image loading if it's an uploaded image
  };
  const handleReset = () => {
    setText("T");
    setBgColor("#4f46e5");
    setTextColor("#ffffff");
    setFontSize(60);
    setImageFile(null);
    toast.success("Reset generator");
  };
  return <div className="relative space-y-6"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Favicon Generator" description="Generate favicons from text, emoji, or images in multiple standard sizes." icon={ImageIcon} actions={<ResetButton onClick={handleReset} label="Reset" />} />
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Design</CardTitle>
 <CardDescription>Customize your favicon</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-4">
 <Label>Upload Image (Overrides Text)</Label>
 <Input type="file" accept="image/*" onChange={handleImageUpload} />
 </div>
 
 <Separator />
 
 <div className="space-y-4">
 <div className="space-y-2">
 <Label className="flex items-center gap-2"><Type className="w-4 h-4" /> Text / Emoji</Label>
 <Input value={text} onChange={e => {
                  setText(e.target.value.substring(0, 3));
                  setImageFile(null);
                }} maxLength={3} />
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label className="flex items-center gap-2"><Palette className="w-4 h-4" /> Background Color</Label>
 <div className="flex gap-2">
 <Input type="color" value={bgColor} onChange={e => {
                      setBgColor(e.target.value);
                      setImageFile(null);
                    }} className="w-12 p-1 h-10" />
 <Input type="text" value={bgColor} onChange={e => {
                      setBgColor(e.target.value);
                      setImageFile(null);
                    }} className="flex-1 uppercase" />
 </div>
 </div>
 <div className="space-y-2">
 <Label className="flex items-center gap-2"><Palette className="w-4 h-4" /> Text Color</Label>
 <div className="flex gap-2">
 <Input type="color" value={textColor} onChange={e => {
                      setTextColor(e.target.value);
                      setImageFile(null);
                    }} className="w-12 p-1 h-10" />
 <Input type="text" value={textColor} onChange={e => {
                      setTextColor(e.target.value);
                      setImageFile(null);
                    }} className="flex-1 uppercase" />
 </div>
 </div>
 </div>
 
 <div className="space-y-2">
 <Label>Font Size (%)</Label>
 <div className="flex gap-4 items-center">
 <input type="range" min="10" max="100" value={fontSize} onChange={e => {
                    setFontSize(Number(e.target.value));
                    setImageFile(null);
                  }} className="w-full" />
 <span className="w-12 text-sm">{fontSize}%</span>
 </div>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader>
 <CardTitle>Preview & Download</CardTitle>
 <CardDescription>Download individual sizes for your project</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="flex justify-center p-6 bg-muted/30 rounded-lg">
 <canvas ref={canvasRef} className="max-w-full w-[200px] h-[200px] shadow-sm rounded-lg" />
 </div>
 
 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
 {SIZES.map(size => <Button key={size} variant="outline" className="flex flex-col h-auto py-3 gap-1" onClick={() => handleDownload(size)}>
 <Download className="w-4 h-4" />
 <span className="text-xs">{size}x{size}</span>
 </Button>)}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Upload",
    description:"Load a source image.",
    icon: Upload,
  },
{
    step:"02",
    title:"Generate",
    description:"Create sized favicons.",
    icon: Image,
  },
{
    step:"03",
    title:"Download",
    description:"Get the icon set.",
    icon: Download,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: Upload,
    title:"Source",
    description:"Any image.",
  },
{
    icon: Image,
    title:"Multi-size",
    description:"All required dimensions.",
  },
{
    icon: Download,
    title:"Export",
    description:"Icon package.",
  },
{
    icon: Globe,
    title:"Web Ready",
    description:"For sites and apps.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>A favicon generator turns one image into the full set of icon sizes browsers and devices expect — from the tiny tab icon to apple-touch icons. Supplying a single image and getting every dimension saves tedious manual resizing. This tool produces the package.</p>
  <p>Correct sizes matter for crisp display across platforms; a missing or wrong-size icon looks broken in bookmarks and home screens. The generator handles the matrix automatically.</p>
  <p>Use it when launching or rebranding a site. The tool's value is a complete, correctly sized favicon set from one source image.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What sizes?",
    answer:"16, 32, 48, 180, and more.",
  },
{
    question:"Use case?",
    answer:"Browser tab and app icons.",
  },
{
    question:"Format?",
    answer:"ICO and PNG.",
  },
{
    question:"Free?",
    answer:"Yes.",
  },
{
    question:"Private?",
    answer:"Local processing.",
  }
  ]}
/>
</div>
 );
}
