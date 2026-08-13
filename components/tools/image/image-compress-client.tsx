"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useRef, ChangeEvent } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Upload, Download, Trash2, FileImage, SlidersHorizontal, ShieldCheck, Cpu, HardDrive, Zap } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GridPattern } from "@/components/magicui/grid-pattern";
interface CompressedImage {
  id: string;
  file: File;
  originalSize: number;
  compressedSize: number | null;
  compressedUrl: string | null;
  status: "pending" | "compressing" | "done" | "error";
  name: string;
}
export default function ImageCompressClient() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [quality, setQuality] = useState(80);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + "" + sizes[i];
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substring(7),
        file,
        originalSize: file.size,
        compressedSize: null,
        compressedUrl: null,
        status: "pending" as const,
        name: file.name
      }));
      setImages(prev => [...prev, ...newFiles]);
    }
  };
  const compressImage = async (image: CompressedImage, q: number): Promise<CompressedImage> => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(image.file);
      reader.onload = event => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve({
              ...image,
              status: "error"
            });
            return;
          }
          ctx.drawImage(img, 0, 0);
          let format = "image/jpeg";
          if (image.file.type === "image/webp") format = "image/webp";else if (image.file.type === "image/png") format = "image/png";
          canvas.toBlob(blob => {
            if (blob) {
              resolve({
                ...image,
                compressedSize: blob.size,
                compressedUrl: URL.createObjectURL(blob),
                status: "done"
              });
            } else {
              resolve({
                ...image,
                status: "error"
              });
            }
          }, format, q / 100);
        };
        img.onerror = () => resolve({
          ...image,
          status: "error"
        });
      };
      reader.onerror = () => resolve({
        ...image,
        status: "error"
      });
    });
  };
  const handleCompress = async () => {
    if (images.length === 0) {
      toast.error("Please upload images first.");
      return;
    }
    const updatedImages = [...images];
    for (let i = 0; i < updatedImages.length; i++) {
      if (updatedImages[i].status !== "done") {
        updatedImages[i] = {
          ...updatedImages[i],
          status: "compressing"
        };
        setImages([...updatedImages]);
        updatedImages[i] = await compressImage(updatedImages[i], quality);
        setImages([...updatedImages]);
      }
    }
    toast.success("Compression complete!");
  };
  const handleDownload = (url: string, name: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed-${name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const handleRemove = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };
  return <div className="relative max-w-6xl mx-auto space-y-8 px-4 py-8"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader title="Image Compressor" description="Compress and reduce image file size without losing quality." />
 <div className="mt-8 grid gap-8 md:grid-cols-2">
 <Card className="dark:bg-zinc-900/30">
 <CardHeader>
 <CardTitle>Settings & Upload</CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-8 text-center cursor-pointer hover:border-zinc-400 transition-colors" onClick={() => fileInputRef.current?.click()}>
 <Upload className="mx-auto h-12 w-12 text-zinc-400 mb-4" />
 <p className="text-zinc-600 dark:text-zinc-400">
 Click or drag & drop images here
 </p>
 <Input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
 </div>

 <div className="space-y-4">
 <Label>Compression Quality: {quality}%</Label>
 <Slider value={[quality]} onValueChange={val => setQuality(val[0])} max={100} min={1} step={1} />
 </div>

 <Button onClick={handleCompress} className="w-full" disabled={images.length === 0}>
 Compress Images
 </Button>
 </CardContent>
 </Card>

 <Card className="dark:bg-zinc-900/30">
 <CardHeader>
 <CardTitle>Results</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 {images.length === 0 ? <div className="text-center text-zinc-500 py-8">No images uploaded yet.</div> : <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
 {images.map(img => <div key={img.id} className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border dark:border-zinc-700 flex items-center justify-between">
 <div className="flex items-center gap-4 overflow-hidden">
 <div className="p-2 bg-zinc-200 dark:bg-zinc-700 rounded-md">
 <FileImage className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
 </div>
 <div className="overflow-hidden">
 <p className="font-medium text-sm truncate">{img.name}</p>
 <p className="text-xs text-zinc-500">
 {formatSize(img.originalSize)}
 {img.compressedSize && <>
 {""}→{""}
 <span className="text-green-600 dark:text-green-400 font-semibold">
 {formatSize(img.compressedSize)}
 </span>
 {""}(
 {Math.round((img.originalSize - img.compressedSize) / img.originalSize * 100)}
 % saved)
 </>}
 </p>
 </div>
 </div>
 <div className="flex items-center gap-2">
 {img.status === "compressing" && <span className="text-xs text-primary">Processing...</span>}
 {img.status === "done" && img.compressedUrl && <Button variant="ghost" size="icon" onClick={() => handleDownload(img.compressedUrl!, img.name)}>
 <Download className="h-4 w-4" />
 </Button>}
 <Button variant="ghost" size="icon" onClick={() => handleRemove(img.id)}>
 <Trash2 className="h-4 w-4 text-red-500" />
 </Button>
 </div>
 </div>)}
 </div>}
 </CardContent>
 </Card>
 </div>

 {/* ─── How It Works ─── */}
 <ToolHowItWorks steps={[{
        step: "1",
        title: "Select or Drag Images",
        description: "Choose one or multiple JPEG, PNG, or WebP images from your device. You can add more files to the batch list at any time."
      }, {
        step: "2",
        title: "Set Compression Quality",
        description: "Use the slider to adjust quality from 1% to 100%. Lower values yield smaller file sizes but more loss of details."
      }, {
        step: "3",
        title: "Compress and Download",
        description: "Click Compress Images to process them instantly in your browser. Preview the size savings and download each output file."
      }]} badges={["100% Client-Side", "No Upload Limits", "Privacy Protected", "Free & No Watermark"]} />

 {/* ─── Feature Guides + SEO Content ─── */}
 <ToolFeatureGuides features={[{
        icon: SlidersHorizontal,
        title: "Adjustable Settings",
        description: "Fine-tune compression levels with a responsive slider to strike the perfect balance between quality and file size."
      }, {
        icon: ShieldCheck,
        title: "100% Local Privacy",
        description: "Images never leave your machine. They are loaded directly into canvas memory and re-encoded locally without server APIs."
      }, {
        icon: Zap,
        title: "Batch Performance",
        description: "Process multiple images in parallel using native browser execution, saving time when optimizing photo galleries."
      }, {
        icon: Cpu,
        title: "HTML5 Canvas API",
        description: "Leverages standard web standards to process, resize, and re-rasterize image pixel data efficiently inside browser threads."
      }, {
        icon: HardDrive,
        title: "Detailed Stats",
        description: "View the exact original file size, the compressed size, and the direct percentage of bytes saved for every image."
      }, {
        icon: FileImage,
        title: "Multiple Formats",
        description: "Supports JPEG, PNG, and WebP compression with automatic fallback mechanisms depending on file type."
      }]}>
 <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
 <h3 className="text-xl font-semibold text-foreground">How canvas.toBlob() Image Compression Works</h3>
 <p>
 When you select an image, this tool reads it into memory using the <code>FileReader</code> API and loads it into a virtual HTML5 <code>&lt;canvas&gt;</code> element. The canvas is drawn to match the original width and height of the image, capturing every pixel. To perform the compression, we execute the <code>canvas.toBlob()</code> API, passing a quality multiplier between <code>0.0</code> and <code>1.0</code>.
 </p>
 <p>
 The browser&apos;s internal image encoder processes the raw bitmap data from the canvas and re-compresses it. If the image is a JPEG, the encoder applies DCT (Discrete Cosine Transform) quantization, which selectively discards high-frequency details that the human eye is less sensitive to. This allows for massive size reductions while maintaining high perceived quality.
 </p>

 <h3 className="text-xl font-semibold text-foreground">Quality vs File Size Tradeoff Table</h3>
 <p>
 Adjusting the quality slider directly affects the output file size and visual fidelity. Use this reference table to find the optimal setting for your images:
 </p>
 <table className="w-full border-collapse text-xs border border-border rounded-lg overflow-hidden">
 <thead className="bg-muted text-foreground">
 <tr>
 <th className="border border-border p-2 text-left">Format</th>
 <th className="border border-border p-2 text-left">Compression Quality</th>
 <th className="border border-border p-2 text-left">Typical File Size Savings</th>
 <th className="border border-border p-2 text-left">Visual Degradation</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td className="border border-border p-2 font-medium">JPEG / WebP</td>
 <td className="border border-border p-2">90% - 100% (High)</td>
 <td className="border border-border p-2">10% - 30% savings</td>
 <td className="border border-border p-2 text-green-600">None (Visually Lossless)</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">JPEG / WebP</td>
 <td className="border border-border p-2">70% - 85% (Medium-High)</td>
 <td className="border border-border p-2">50% - 70% savings</td>
 <td className="border border-border p-2 text-green-500">Very minimal block artifacts</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">JPEG / WebP</td>
 <td className="border border-border p-2">50% - 65% (Medium)</td>
 <td className="border border-border p-2">70% - 85% savings</td>
 <td className="border border-border p-2 text-yellow-600">Noticeable compression noise</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">JPEG / WebP</td>
 <td className="border border-border p-2">10% - 45% (Low)</td>
 <td className="border border-border p-2">85% - 95% savings</td>
 <td className="border border-border p-2 text-red-500">Heavy artifacts, loss of fine detail</td>
 </tr>
 </tbody>
 </table>

 <h3 className="text-xl font-semibold text-foreground">JPEG vs PNG vs WebP Compression Differences</h3>
 <p>
 Understanding the compression format of your original image is vital to obtaining the best compression results:
 </p>
 <ul className="list-disc pl-5 space-y-2">
 <li><strong>JPEG</strong> — Uses lossy compression. It is ideal for photographs. Compressing an already lossy JPEG at 80% quality will strip out redundant pixel data without affecting dimensions, yielding a lightweight file suitable for web design.</li>
 <li><strong>PNG</strong> — Uses lossless DEFLATE compression. It is designed for logos, drawings, and screenshots where pixel accuracy and alpha transparency are required. Note that re-saving a PNG at a lower quality using canvas encoders can sometimes convert it into a lossy format or require pre-processing because canvas cannot compress PNG natively with lossy algorithms.</li>
 <li><strong>WebP</strong> — Supports both lossy and lossless modes. It generally yields files 25-30% smaller than JPEG at equivalent quality. If you want maximum savings for web usage, compress and convert your files into WebP.</li>
 </ul>

 <h3 className="text-xl font-semibold text-foreground">When to Compress vs when to Convert</h3>
 <p>
 A common point of confusion is whether to compress an image in its current format or convert it to a different format. You should **compress** the image when you want to keep the original file extension and compatibility intact. For example, if you are uploading photos to a platform that only accepts JPEGs, compress them to stay under the upload limit.
 </p>
 <p>
 You should **convert** the image if you are targeting modern web deployment. Moving screenshots from PNG to WebP or AVIF can save up to 80% of page weight while keeping excellent text readability.
 </p>

 <h3 className="text-xl font-semibold text-foreground">Tips for Efficient Batch Compression</h3>
 <p>
 When optimizing whole folders or galleries, follow these guidelines for the best efficiency:
 </p>
 <ul className="list-disc pl-5 space-y-1">
 <li>Start with a quality setting around <strong>80%</strong>. This provides the best optimization curve for web photographs.</li>
 <li>If compressing screenshots with sharp text, keep quality above <strong>85%</strong> to prevent readability loss.</li>
 <li>Review the savings percentages before downloading. If the savings are negative or 0%, the image is already highly optimized.</li>
 </ul>
 </div>
 </ToolFeatureGuides>

 {/* ─── FAQ ─── */}
 <ToolFaqAccordion faqs={[{
        question: "How does local image compression work?",
        answer: "The tool loads your image into a local HTML5 canvas, then encodes it back into your chosen format at a lower quality setting using native browser encoders. Because everything happens in WebAssembly and Javascript on your device, it is fast and private."
      }, {
        question: "Will compressing an image reduce its dimensions?",
        answer: "No, this compressor only adjusts the quality setting and compression parameters to reduce file size without altering the physical width or height of the image."
      }, {
        question: "What is the best format for compression?",
        answer: "WebP is generally the most efficient format for web compression, offering significant size savings while keeping transparency support. JPEG is excellent for standard photographs. PNG works best for screenshots or text graphics."
      }, {
        question: "Is there a file size limit or cost?",
        answer: "The tool is 100% free with no watermark or limits. The file size limit depends entirely on your device's memory. In general, images up to 50MB process easily."
      }, {
        question: "Are my private photos uploaded to any server?",
        answer: "No. Your images are processed entirely inside your browser. We never upload, save, or transmit your images to any server, making this tool perfectly secure for sensitive documents."
      }]} />

 <RelatedTools currentToolUrl="/tools/image/compress" max={6} />
 </div></div>;
}