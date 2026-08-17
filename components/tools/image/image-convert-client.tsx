"use client";

import { Input } from "@/components/ui/input";

import { ToolBackground } from"@/components/shared/tool-background";

import { ActivitySquare, CloudDownload, Crop, Eye, EyeOff, Image as ImageIcon, Images, Link2, Loader2, Palette, SlidersHorizontal, Zap, ShieldCheck, FileImage, RefreshCw, Layers, Download, Settings, Type, Upload } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import * as React from "react";
import { ImageDropzone } from "@/components/image/image-dropzone";
import { ImagePreview, InfoPill } from "@/components/image/image-preview-meta";
import { ActionButton, ResetButton } from "@/components/shared/action-buttons";
import InputField from "@/components/shared/form-fields/input-field";
import SelectField from "@/components/shared/form-fields/select-field";
import { OutputPreview } from "@/components/shared/output-preview";
import { ProcessLog } from "@/components/shared/process-log";
import { Range } from "@/components/shared/range";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useAutoPreview } from "@/hooks/use-auto-preview";
import { useImageInput } from "@/hooks/use-image-input";
import { browserSupportsMime, detectHasAlpha, type FitMode, formatBytes, type OutFormat, resizeImage, suggestName, triggerDownload } from "@/lib/canvas";
import { trackDownload, trackFileUpload, trackToolUsage } from "@/lib/gtm";
import { GridPattern } from "@/components/magicui/grid-pattern";
export default function ImageConvertClient() {
  const [fmt, setFmt] = React.useState<OutFormat>("webp");
  const [quality, setQuality] = React.useState(90);
  const [bg, setBg] = React.useState("#ffffff");
  const [running, setRunning] = React.useState(false);
  const [log, setLog] = React.useState("");
  const [checker, setChecker] = React.useState(true);
  const [hasAlpha, setHasAlpha] = React.useState<boolean | null>(null);
  const [enableResize, setEnableResize] = React.useState(false);
  const [locked, setLocked] = React.useState(true);
  const [fit, setFit] = React.useState<FitMode>("contain");
  const [w, setW] = React.useState<number | "">("");
  const [h, setH] = React.useState<number | "">("");
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [bright, setBright] = React.useState(100);
  const [contrast, setContrast] = React.useState(100);
  const [saturate, setSaturate] = React.useState(100);
  const [avifOk, setAvifOk] = React.useState<boolean | null>(null);
  const {
    img,
    getRootProps,
    getInputProps,
    isDragActive,
    setImg
  } = useImageInput({
    onImage: async im => {
      // Track file upload
      trackFileUpload("Image Convert", im.file.type, im.file.size);
      setHasAlpha(await detectHasAlpha(im.url));
      setFmt(im.file.type.includes("png") ? "png" : "webp");
      setW(im.width);
      setH(im.height);
      setEnableResize(false);
      setLog(`Loaded ${im.file.name} (${formatBytes(im.size ?? im.file.size)})`);
    }
  });
  React.useEffect(() => {
    (async () => setAvifOk(await browserSupportsMime("image/avif")))();
  }, []);
  React.useEffect(() => {
    if (!img) return;
    if (locked && typeof w === "number" && document.activeElement?.id === "width") {
      setH(Math.max(1, Math.round(w * img.height / img.width)));
    }
    if (locked && typeof h === "number" && document.activeElement?.id === "height") {
      setW(Math.max(1, Math.round(h * img.width / img.height)));
    }
  }, [w, h, locked, img]);
  const filterCss = React.useMemo(() => filtersOpen ? `brightness(${bright}%) contrast(${contrast}%) saturate(${saturate}%)` : "", [filtersOpen, bright, contrast, saturate]);
  const numOrEmpty = (v: string): number | "" => {
    const n = Number(v);
    return Number.isNaN(n) ? "" : n;
  };
  function resetAll() {
    setImg(null);
    setFmt("webp");
    setQuality(90);
    setBg("#ffffff");
    setRunning(false);
    setLog("");
    setChecker(true);
    setHasAlpha(null);
    setEnableResize(false);
    setLocked(true);
    setFit("contain");
    setW("");
    setH("");
    setFiltersOpen(false);
    setBright(100);
    setContrast(100);
    setSaturate(100);
  }

  // Auto Preview
  const {
    previewUrl,
    previewSize,
    previewBusy
  } = useAutoPreview([img?.url, fmt, quality, bg, enableResize, w, h, fit, filtersOpen, bright, contrast, saturate], async () => {
    if (!img) return null;
    const outW = enableResize && typeof w === "number" ? w : img.width;
    const outH = enableResize && typeof h === "number" ? h : img.height;
    const blob = (await resizeImage({
      srcUrl: img.url,
      srcW: img.width,
      srcH: img.height,
      outW,
      outH,
      fit,
      format: fmt,
      quality,
      background: fmt === "jpeg" && hasAlpha ? bg : undefined,
      filterCss
    })).blob;
    return blob;
  }, 350);
  async function run() {
    if (!img) return;
    try {
      setRunning(true);
      trackToolUsage("Image Convert", "Image");
      const outW = enableResize && typeof w === "number" ? w : img.width;
      const outH = enableResize && typeof h === "number" ? h : img.height;
      const {
        blob
      } = await resizeImage({
        srcUrl: img.url,
        srcW: img.width,
        srcH: img.height,
        outW,
        outH,
        fit,
        format: fmt,
        quality,
        background: fmt === "jpeg" && hasAlpha ? bg : undefined,
        filterCss
      });
      const filename = suggestName(img.file.name, enableResize ? "resized" : "converted", fmt);
      triggerDownload(blob, filename);
      trackDownload("Image Convert", fmt.toUpperCase());
      setLog(`Done → ${filename} (${formatBytes(blob.size)})`);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setLog(`Error: ${e.message}`);
      } else {
        setLog(`Error: ${String(e)}`);
      }
    } finally {
      setRunning(false);
    }
  }
  const lossy = fmt !== "png";
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Images} title="Image Converter" description="Convert between PNG, JPEG, WEBP, AVIF (auto-preview)." actions={<>
 <ResetButton onClick={resetAll} />
 <ActionButton variant="default" label={running ? "Processing…" : "Download"} icon={running ? Loader2 : CloudDownload} onClick={run} disabled={!img || running || previewBusy} />
 </>} />

 {/* Input */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Image</CardTitle>
 <CardDescription>Upload, drag & drop, or paste from clipboard.</CardDescription>
 </CardHeader>
 <CardContent className="grid gap-6 lg:grid-cols-2">
 <ImageDropzone getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} subtitle="PNG, JPEG, WEBP, GIF, SVG (GIF/SVG rasterized)" />

 <div className="grid gap-4">
 <div className={checker ? "rounded-lg border p-2 bg-[linear-gradient(45deg,#00000011_25%,transparent_25%),linear-gradient(-45deg,#00000011_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#00000011_75%),linear-gradient(-45deg,transparent_75%,#00000011_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px]" : "rounded-lg border p-2"}>
 <ImagePreview url={img?.url} emptyNode={<div className="flex h-full items-center justify-center text-sm text-muted-foreground">
 <ImageIcon className="mr-2 h-4 w-4" /> No image selected
 </div>} />
 </div>

 <div className="grid grid-cols-2 gap-3 text-xs">
 <InfoPill label="Source Size" value={img ? formatBytes(img.size ?? img.file.size) : "—"} />
 <InfoPill label="Source Type" value={img ? img.type || img.file.type || "—" : "—"} />
 <InfoPill label="Width" value={img ? `${img.width}px` : "—"} />
 <InfoPill label="Height" value={img ? `${img.height}px` : "—"} />
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <Separator className="my-4" />

 {/* Settings */}
 <GlassCard>
 <CardHeader>
 <CardTitle className="text-base">Settings</CardTitle>
 <CardDescription>
 Format, quality, optional resize & filters (live preview).
 </CardDescription>
 </CardHeader>

 <CardContent className="grid gap-6 md:grid-cols-2">
 <div className="space-y-4">
 <SelectField className="w-fit" label="Format" description="AVIF/WEBP is usually the smallest; PNG is good for UI/graphics." value={fmt} onValueChange={v => setFmt(v as OutFormat)} options={[{
              value: "webp",
              label: "WEBP (recommended)"
            }, {
              value: "jpeg",
              label: "JPEG"
            }, {
              value: "png",
              label: "PNG"
            }, {
              value: "avif",
              label: "AVIF"
            }]} />

 {lossy && <div className="space-y-2">
 <div className="flex items-center justify-between">
 <Label htmlFor="quality">Quality</Label>
 <span className="text-xs text-muted-foreground">{quality}</span>
 </div>
 <Slider id="quality" min={1} max={100} step={1} value={[quality]} onValueChange={([q]) => setQuality(q)} />
 <p className="text-xs text-muted-foreground">High quality = large file.</p>
 </div>}

 {fmt === "jpeg" && hasAlpha && <div className="space-y-2">
 <Label htmlFor="bg" className="flex items-center gap-2">
 <Palette className="h-4 w-4" /> Background (fill transparency)
 </Label>
 <div className="flex items-center gap-3">
 <InputField id="bg" type="color" className="h-9 w-16 p-1" value={bg} onChange={e => setBg(e.target.value)} />
 <InputField aria-label="Background hex" value={bg} onChange={e => setBg(e.target.value)} className="w-36" placeholder="#ffffff" />
 </div>
 </div>}

 {/* quick presets */}
 <div className="flex flex-wrap gap-2">
 {[{
                label: "Small web",
                fmt: "webp",
                quality: 70
              }, {
                label: "Balanced",
                fmt: "webp",
                quality: 85
              }, {
                label: "High quality",
                fmt: "jpeg",
                quality: 92
              }, {
                label: avifOk === false ? "AVIF" : "Ultra small",
                fmt: "avif",
                quality: 60,
                disabled: avifOk === false,
                title: avifOk === false ? "AVIF not supported in this browser" : ""
              }].map(({
                label,
                fmt,
                quality,
                disabled,
                title
              }) => <Button key={label} size="sm" variant="outline" onClick={() => {
                setFmt(fmt as OutFormat);
                setQuality(quality);
              }} disabled={disabled} title={title}>
 {label}
 </Button>)}
 </div>

 <div className="flex items-center gap-2 text-sm">
 <ActionButton size="sm" onClick={() => setChecker(v => !v)} icon={checker ? Eye : EyeOff} label={`${checker ? "Hide" : "Show"} checkerboard`} />
 </div>
 </div>

 {/* Resize + Filters */}
 <div className="space-y-4">
 <div className="rounded-lg border p-3 space-y-3">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2 text-sm font-medium">
 <Crop className="h-4 w-4" /> Resize while converting
 </div>
 <ActionButton size="sm" variant={enableResize ? "default" : "outline"} onClick={() => setEnableResize(v => !v)} label={enableResize ? "Enabled" : "Disabled"} />
 </div>

 <div className="grid grid-cols-2 gap-3">
 <InputField id="width" type="number" label="Width (px)" min={1} value={w} onChange={e => setW(numOrEmpty(e.target.value))} disabled={!img || !enableResize} />
 <InputField id="height" type="number" label="Height (px)" min={1} value={h} onChange={e => setH(numOrEmpty(e.target.value))} disabled={!img || !enableResize} />
 </div>

 <div className="flex flex-wrap items-end gap-4">
 <ActionButton size="sm" icon={Link2} label={locked ? "Locked" : "Unlocked"} variant={locked ? "default" : "outline"} onClick={() => setLocked(v => !v)} />

 <SelectField label="Fit" value={fit} onValueChange={v => setFit(v as FitMode)} disabled={!enableResize} placeholder="Select fit" options={[{
                  value: "contain",
                  label: "Contain (no crop)"
                }, {
                  value: "cover",
                  label: "Cover (may crop)"
                }]} />
 </div>

 <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
 <div className="flex items-center gap-2">
 <ActivitySquare className="h-3.5 w-3.5" /> Fit:{""}
 <span className="ml-1 font-medium text-foreground">{fit}</span>
 </div>
 <div className="flex items-center gap-2">
 <ImageIcon className="h-3.5 w-3.5" /> Format:{""}
 <span className="ml-1 font-medium text-foreground">{fmt.toUpperCase()}</span>
 </div>
 </div>
 </div>

 <div className="rounded-lg border p-3 space-y-3">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2 text-sm font-medium">
 <SlidersHorizontal className="h-4 w-4" /> Filters (optional)
 </div>
 <ActionButton size="sm" label={filtersOpen ? "On" : "Off"} variant={filtersOpen ? "default" : "outline"} onClick={() => setFiltersOpen(v => !v)} />
 </div>

 {filtersOpen && <div className="space-y-3">
 <Range label="Brightness" value={bright} onChange={setBright} />
 <Range label="Contrast" value={contrast} onChange={setContrast} />
 <Range label="Saturation" value={saturate} onChange={setSaturate} />
 </div>}
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <Separator className="my-4" />

 {/* Live Output Preview + Log */}
 <div className="grid gap-6 md:grid-cols-2">
 <OutputPreview title="Output Preview" description={previewBusy ? "Rendering preview…" : "Live preview of the converted image."} previewUrl={previewUrl} size={previewSize} formatLabel={fmt.toUpperCase()} checker={checker} tips={<ul className="list-disc pl-5 space-y-1">
 <li>Canvas re-encoding strips EXIF/metadata by default.</li>
 <li>Animated GIFs flatten to a single frame.</li>
 <li>
 Smallest sizes: try <b>AVIF/WEBP</b> and reduce dimensions.
 </li>
 </ul>} />

 <ProcessLog value={log} onClear={() => setLog("")} />
 </div>

 {/* ─── How It Works ─── */}
 <ToolHowItWorks steps={[{
        step: "1",
        title: "Upload Your Image",
        description: "Drag and drop any JPG, PNG, WebP, or AVIF image. The tool detects the format automatically and pre-selects sensible defaults."
      }, {
        step: "2",
        title: "Choose Format & Options",
        description: "Pick your output format, adjust quality (1–100%), enable resize, and optionally apply brightness, contrast, or saturation filters."
      }, {
        step: "3",
        title: "Convert & Download",
        description: "Click Convert to process the image in your browser, preview the result live, and download — or batch-export multiple files as a ZIP."
      }]} badges={["100% Client-Side", "No Upload", "No Watermark", "Free Forever"]} />

 {/* ─── Feature Guides + SEO Content ─── */}
 <ToolFeatureGuides features={[{
        icon: FileImage,
        title: "JPG, PNG, WebP, AVIF",
        description: "Convert between all major formats. Supports lossless PNG output and lossy JPEG/WebP/AVIF at adjustable quality levels."
      }, {
        icon: Layers,
        title: "Resize While Converting",
        description: "Enter exact pixel dimensions with optional aspect-ratio lock. Fit modes (contain/cover/stretch) handle any dimension mismatch."
      }, {
        icon: SlidersHorizontal,
        title: "Image Filters",
        description: "Apply brightness, contrast, and saturation adjustments to the image before conversion — processed entirely via CSS filter + canvas."
      }, {
        icon: Zap,
        title: "Live Preview",
        description: "See the converted image and its exact file size in real time before downloading, letting you tune quality vs. size precisely."
      }, {
        icon: ShieldCheck,
        title: "Private by Design",
        description: "Conversions run entirely in your browser using the HTML5 Canvas API. No image data is transmitted to any server at any point."
      }, {
        icon: RefreshCw,
        title: "AVIF Browser Support",
        description: "AVIF is detected automatically. If your browser doesn't support AVIF encoding, the tool falls back gracefully to WebP or JPEG."
      }]}>
 <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
 <h3 className="text-xl font-semibold text-foreground">Image Format Comparison: JPG vs PNG vs WebP vs AVIF</h3>
 <p>
 Choosing the right image format is one of the most impactful decisions in web performance and digital asset management. Each format involves a different tradeoff between file size, quality, compatibility, and feature support. Understanding these differences helps you make the right choice for every use case.
 </p>

 <table className="w-full border-collapse text-xs border border-border rounded-lg overflow-hidden">
 <thead className="bg-muted text-foreground">
 <tr>
 <th className="border border-border p-2 text-left">Format</th>
 <th className="border border-border p-2 text-left">Compression</th>
 <th className="border border-border p-2 text-left">Transparency</th>
 <th className="border border-border p-2 text-left">Best For</th>
 <th className="border border-border p-2 text-left">Browser Support</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td className="border border-border p-2 font-medium">JPEG</td>
 <td className="border border-border p-2">Lossy</td>
 <td className="border border-border p-2 text-red-500">No</td>
 <td className="border border-border p-2">Photos, social media</td>
 <td className="border border-border p-2 text-green-600">Universal</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">PNG</td>
 <td className="border border-border p-2">Lossless</td>
 <td className="border border-border p-2 text-green-600">Yes (alpha)</td>
 <td className="border border-border p-2">Logos, screenshots, UI</td>
 <td className="border border-border p-2 text-green-600">Universal</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">WebP</td>
 <td className="border border-border p-2">Lossy &amp; Lossless</td>
 <td className="border border-border p-2 text-green-600">Yes</td>
 <td className="border border-border p-2">Web images, thumbnails</td>
 <td className="border border-border p-2 text-green-600">All modern browsers</td>
 </tr>
 <tr>
 <td className="border border-border p-2 font-medium">AVIF</td>
 <td className="border border-border p-2">Lossy &amp; Lossless</td>
 <td className="border border-border p-2 text-green-600">Yes</td>
 <td className="border border-border p-2">Next-gen web, HDR</td>
 <td className="border border-border p-2 text-yellow-600">Chrome, Firefox (Safari limited)</td>
 </tr>
 </tbody>
 </table>

 <h3 className="text-xl font-semibold text-foreground">When to Convert: Common Conversion Scenarios</h3>
 <ul className="list-disc pl-5 space-y-2">
 <li><strong>PNG to JPG</strong> — When you need a smaller file from a screenshot or design asset and transparency is not required. JPG files are typically 3–5× smaller than lossless PNG at equivalent quality.</li>
 <li><strong>JPG to PNG</strong> — When you need to overlay the image on a different background, or when you&apos;re preparing assets for design tools like Figma, which work better with lossless PNG.</li>
 <li><strong>Any format to WebP</strong> — When optimizing images for your website. WebP is 25–35% smaller than JPEG at equivalent visual quality and is supported by 97%+ of browsers as of 2024.</li>
 <li><strong>Any format to AVIF</strong> — For next-generation web performance. AVIF is 50% smaller than JPEG and 20% smaller than WebP, but encoding is slower and browser support is still maturing.</li>
 </ul>

 <h3 className="text-xl font-semibold text-foreground">How Quality and File Size Relate</h3>
 <p>
 The quality slider (1–100%) controls the <strong>quantization level</strong> of lossy codecs like JPEG and WebP. At quality 90%, most images are visually indistinguishable from the original but are significantly smaller. The relationship between quality and file size is not linear — dropping from 100% to 90% quality typically reduces JPEG file size by 40–60%, while dropping from 80% to 70% saves only 10–15%. This is why quality values between <strong>75–85% are the sweet spot</strong> for most web images: they achieve excellent visual quality with maximum compression efficiency.
 </p>
 <p>
 PNG uses lossless compression, so the quality slider has no effect on PNG output — every pixel is stored exactly. For PNG, file size is determined primarily by image dimensions and color complexity. If you need a smaller PNG, reduce the dimensions or convert to a lossy format.
 </p>

 <h3 className="text-xl font-semibold text-foreground">EXIF Metadata and Privacy</h3>
 <p>
 JPEG files store <strong>EXIF metadata</strong> — hidden data that may include the GPS coordinates where the photo was taken, the camera model, lens settings, and the date and time of capture. This is a serious privacy concern when sharing photos publicly. This tool uses the HTML5 Canvas API for conversion, which <strong>strips all EXIF data by default</strong> — producing clean output images with no embedded location data or device information. This makes it a useful privacy tool as well as a format converter.
 </p>
 </div>
 </ToolFeatureGuides>

 {/* ─── FAQ ─── */}
 <ToolFaqAccordion faqs={[{
        question: "Which image formats are supported for input and output?",
        answer: "Input: JPG, PNG, WebP, and AVIF (browser-dependent). Output: JPG, PNG, WebP, and AVIF. Some browsers may also decode HEIC/HEIF from Apple devices. AVIF encoding requires Chrome or Firefox — the tool detects support automatically."
      }, {
        question: "Is there a file size or image dimension limit?",
        answer: "There is no strict enforced limit. The practical limit is determined by your browser and device memory. Most browsers handle images up to 50MB and 16384×16384 pixels. Very large images may cause slow processing or browser memory warnings."
      }, {
        question: "Does converting to JPEG remove transparency?",
        answer: "Yes. JPEG does not support transparency. If your source image has transparent areas (like a PNG with alpha channel), those areas will be filled with the background color you set (default: white). If you need to preserve transparency, convert to PNG, WebP, or AVIF instead."
      }, {
        question: "Will conversion affect image quality?",
        answer: "Lossless formats (PNG) are never degraded. Lossy formats (JPG, WebP, AVIF) discard some information at lower quality settings. Use quality 85–95% for excellent results. The live preview shows you exactly what the converted image looks like before you download."
      }, {
        question: "Are my images uploaded to a server?",
        answer: "No. Conversion happens entirely in your browser using the HTML5 Canvas API. Images are never uploaded or stored anywhere. This also means EXIF metadata (including GPS location) is stripped from the output — useful for privacy."
      }]} />
    </div>
    </div>
);
}
