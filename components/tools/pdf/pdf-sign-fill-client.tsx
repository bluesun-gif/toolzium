"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useRef, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Upload, Download, Pen, Type, Image as ImageIcon, Trash2, RotateCcw, Hand, FileSignature, ShieldCheck, Zap, DownloadCloud } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import toast from "react-hot-toast";
import { GridPattern } from "@/components/magicui/grid-pattern";
type SignMode = "type" | "draw" | "image";
type PlacedSig = {
  x: number;
  y: number;
  width: number;
  height: number;
  dataUrl: string;
};
export default function PdfSignFillClient() {
  // PDF state
  const [file, setFile] = useState<File | null>(null);
  const [pdfPageCanvas, setPdfPageCanvas] = useState<string | null>(null);
  const [pdfPageCount, setPdfPageCount] = useState(0);
  const [pdfCurrentPage, setPdfCurrentPage] = useState(1);
  const [pdfScaleX, setPdfScaleX] = useState(1);
  const [pdfScaleY, setPdfScaleY] = useState(1);
  const [pdfPageWidth, setPdfPageWidth] = useState(0);
  const [pdfPageHeight, setPdfPageHeight] = useState(0);

  // Signature state
  const [signMode, setSignMode] = useState<SignMode>("type");
  const [typedName, setTypedName] = useState("Your Name");
  const [sigDataUrl, setSigDataUrl] = useState<string | null>(null);

  // Canvas drawing state
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPos = useRef<{
    x: number;
    y: number;
  } | null>(null);

  // Placement state
  const [placedSig, setPlacedSig] = useState<PlacedSig | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({
    x: 0,
    y: 0
  });
  const [hasDragged, setHasDragged] = useState(false); // To distinguish click from drag
  const previewRef = useRef<HTMLDivElement>(null);
  const [processing, setProcessing] = useState(false);

  // ─── Render PDF page to canvas ──────────────────────────────────────────────
  const renderPage = useCallback(async (pdfFile: File, pageNum: number) => {
    try {
      const pdfjsLib = (await import("pdfjs-dist")).default ?? (await import("pdfjs-dist"));
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.worker.min.mjs`;
      const buffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({
        data: buffer
      }).promise;
      setPdfPageCount(pdf.numPages);
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({
        scale: 1.5
      });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;
      await page.render({
        canvasContext: ctx,
        canvas,
        viewport
      } as any).promise;
      setPdfPageWidth(viewport.width);
      setPdfPageHeight(viewport.height);
      setPdfPageCanvas(canvas.toDataURL("image/png"));

      // Compute scale factors (rendered canvas → actual PDF pts)
      const rawViewport = page.getViewport({
        scale: 1
      });
      setPdfScaleX(rawViewport.width / viewport.width);
      setPdfScaleY(rawViewport.height / viewport.height);
    } catch (e) {
      console.error(e);
      toast.error("Failed to render PDF page.");
    }
  }, []);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || f.type !== "application/pdf") {
      toast.error("Please select a valid PDF file.");
      return;
    }
    setFile(f);
    setPlacedSig(null);
    setPdfCurrentPage(1);
    toast.success(`"${f.name}"loaded.`);
    await renderPage(f, 1);
  };
  const goToPage = async (p: number) => {
    if (!file) return;
    const clamped = Math.max(1, Math.min(p, pdfPageCount));
    setPdfCurrentPage(clamped);
    setPlacedSig(null);
    await renderPage(file, clamped);
  };

  // ─── Signature Generation ────────────────────────────────────────────────────
  const generateTypedSig = useCallback(() => {
    const c = document.createElement("canvas");
    c.width = 320;
    c.height = 80;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.font = "italic bold 36px 'Georgia', serif";
    ctx.fillStyle = "#1a3a8f";
    ctx.textBaseline = "middle";
    ctx.fillText(typedName || "Signature", 10, 40);
    setSigDataUrl(c.toDataURL("image/png"));
  }, [typedName]);
  useEffect(() => {
    if (signMode === "type") generateTypedSig();
  }, [signMode, typedName, generateTypedSig]);

  // ─── Draw canvas helpers ─────────────────────────────────────────────────────
  const getCanvasPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };
  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = drawCanvasRef.current!;
    const pos = getCanvasPos(e, canvas);
    setIsDrawing(true);
    lastPos.current = pos;
  };
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !drawCanvasRef.current) return;
    e.preventDefault();
    const canvas = drawCanvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const pos = getCanvasPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.current!.x, lastPos.current!.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#1a3a8f";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.stroke();
    lastPos.current = pos;
  };
  const endDraw = () => {
    setIsDrawing(false);
    lastPos.current = null;
    if (drawCanvasRef.current) {
      setSigDataUrl(drawCanvasRef.current.toDataURL("image/png"));
    }
  };
  const clearDraw = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSigDataUrl(null);
  };
  const handleSigImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || !f.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => setSigDataUrl(ev.target!.result as string);
    reader.readAsDataURL(f);
  };

  // ─── Placement (drag and drop & click) ────────────────────────────────────────────────
  const onPreviewMouseDown = (e: React.MouseEvent) => {
    if (!previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    setHasDragged(false);
    if (placedSig) {
      if (clickX >= placedSig.x && clickX <= placedSig.x + placedSig.width && clickY >= placedSig.y && clickY <= placedSig.y + placedSig.height) {
        setIsDragging(true);
        setDragOffset({
          x: clickX - placedSig.x,
          y: clickY - placedSig.y
        });
        return;
      }
    }
  };
  const onPreviewMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !placedSig || !previewRef.current) return;
    setHasDragged(true);
    const rect = previewRef.current.getBoundingClientRect();
    const nx = Math.max(0, Math.min(e.clientX - rect.left - dragOffset.x, pdfPageWidth - placedSig.width));
    const ny = Math.max(0, Math.min(e.clientY - rect.top - dragOffset.y, pdfPageHeight - placedSig.height));
    setPlacedSig({
      ...placedSig,
      x: nx,
      y: ny
    });
  };
  const onPreviewMouseUp = (e: React.MouseEvent) => {
    if (isDragging) {
      setIsDragging(false);
      return;
    }

    // If not dragging and didn't drag, it was a click!
    if (!hasDragged && sigDataUrl && previewRef.current) {
      const rect = previewRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const sigW = 200;
      const sigH = 50;
      const nx = clickX - sigW / 2;
      const ny = clickY - sigH / 2;
      setPlacedSig({
        x: Math.max(0, Math.min(nx, pdfPageWidth - sigW)),
        y: Math.max(0, Math.min(ny, pdfPageHeight - sigH)),
        width: sigW,
        height: sigH,
        dataUrl: sigDataUrl
      });
    }
  };
  const placeSignature = () => {
    if (!sigDataUrl) {
      toast.error("Please create your signature first.");
      return;
    }
    if (!pdfPageCanvas) {
      toast.error("Please upload and load a PDF first.");
      return;
    }
    // Place in center initially
    setPlacedSig({
      x: pdfPageWidth / 2 - 100,
      y: pdfPageHeight / 2 - 25,
      width: 200,
      height: 50,
      dataUrl: sigDataUrl
    });
    toast.success("Signature placed! Drag it to position.");
  };

  // ─── Download / Embed ─────────────────────────────────────────────────────────
  const downloadSignedPdf = async () => {
    if (!file || !placedSig) {
      toast.error("Upload a PDF and place your signature first.");
      return;
    }
    setProcessing(true);
    try {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();
      const page = pages[pdfCurrentPage - 1];
      const {
        height: pageHeightPts
      } = page.getSize();

      // Convert canvas coords to PDF pts
      const xPts = placedSig.x * pdfScaleX;
      const wPts = placedSig.width * pdfScaleX;
      const hPts = placedSig.height * pdfScaleY;

      // Fix Coordinate Inversion: PDF y=0 is bottom-left; canvas y=0 is top-left
      // yPts corresponds to the bottom edge of the image to be placed in the PDF coordinate system
      const yPts = pageHeightPts - placedSig.y * pdfScaleY - hPts;

      // Embed signature image
      const sigResp = await fetch(placedSig.dataUrl);
      const sigBlob = await sigResp.blob();
      const sigBuf = await sigBlob.arrayBuffer();
      let embeddedImg;
      if (placedSig.dataUrl.startsWith("data:image/png") || placedSig.dataUrl.startsWith("data:image/jpeg") === false) {
        embeddedImg = await pdfDoc.embedPng(sigBuf);
      } else {
        embeddedImg = await pdfDoc.embedJpg(sigBuf);
      }
      page.drawImage(embeddedImg, {
        x: xPts,
        y: yPts,
        width: wPts,
        height: hPts,
        opacity: 1
      });
      const outBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(outBytes)], {
        type: "application/pdf"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `signed_${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Signed PDF downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Error embedding signature.");
    } finally {
      setProcessing(false);
    }
  };
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

 <ToolPageHeader icon={Pen} title="PDF Sign & Fill Studio" description="Add a real signature to any PDF. Type, draw, or upload your signature — then click or drag it anywhere on the page." />

 <div className="space-y-6 max-w-5xl mx-auto px-4">
 {/* Step 1: Upload PDF */}
 <GlassCard className="p-6 space-y-4">
 <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">Step 1 — Upload PDF</h2>
 <div className="border-2 border-dashed border-border/60 hover:border-primary/50 transition-colors rounded-2xl p-6 text-center bg-background/40">
 <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" id="pdf-sign-upload" />
 <label htmlFor="pdf-sign-upload" className="cursor-pointer flex flex-col items-center space-y-2">
 <Upload className="h-9 w-9 text-primary animate-bounce" />
 <div className="text-sm font-semibold">
 {file ? file.name : "Click to upload a PDF"}
 </div>
 {pdfPageCount > 0 && <div className="text-xs text-primary font-bold">{pdfPageCount} page{pdfPageCount > 1 ? "s" : ""} loaded</div>}
 </label>
 </div>
 {pdfPageCount > 1 && <div className="flex items-center gap-3">
 <span className="text-xs font-bold text-muted-foreground">Sign page:</span>
 {Array.from({
              length: pdfPageCount
            }, (_, i) => i + 1).slice(0, 10).map(p => <Button key={p} size="sm" variant={pdfCurrentPage === p ? "default" : "outline"} className="h-8 w-8 p-0 text-xs" onClick={() => goToPage(p)}>
 {p}
 </Button>)}
 {pdfPageCount > 10 && <span className="text-xs text-muted-foreground">…</span>}
 </div>}
 </GlassCard>

 {/* Step 2: Create Signature */}
 <GlassCard className="p-6 space-y-4">
 <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">Step 2 — Create Your Signature</h2>
 <div className="flex gap-2">
 {([["type", Type, "Type"], ["draw", Pen, "Draw"], ["image", ImageIcon, "Upload Image"]] as const).map(([mode, Icon, label]) => <Button key={mode} size="sm" variant={signMode === mode ? "default" : "outline"} className="gap-1.5" onClick={() => {
              setSignMode(mode);
              setSigDataUrl(null);
            }}>
 <Icon className="h-3.5 w-3.5" />
 {label}
 </Button>)}
 </div>

 {signMode === "type" && <div className="space-y-3">
 <Input value={typedName} onChange={e => setTypedName(e.target.value)} placeholder="Your full name" className="h-11 font-medium" />
 {sigDataUrl && <div className="border rounded-xl p-3 bg-background/5">
 <img src={sigDataUrl} alt="Signature preview" className="h-12" />
 </div>}
 </div>}

 {signMode === "draw" && <div className="space-y-2">
 <div className="text-xs text-muted-foreground">Draw your signature below:</div>
 <div className="border-2 border-border rounded-xl overflow-hidden bg-background">
 <canvas ref={drawCanvasRef} width={480} height={120} className="touch-none cursor-crosshair w-full" onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw} onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw} />
 </div>
 <Button size="sm" variant="outline" onClick={clearDraw} className="gap-1.5">
 <RotateCcw className="h-3.5 w-3.5" /> Clear
 </Button>
 </div>}

 {signMode === "image" && <div className="space-y-3">
 <input type="file" accept="image/*" onChange={handleSigImageUpload} className="hidden" id="sig-img-upload" />
 <label htmlFor="sig-img-upload">
 <Button size="sm" variant="outline" className="gap-1.5 cursor-pointer" asChild>
 <span><Upload className="h-3.5 w-3.5" /> Upload Signature Image (PNG/JPG)</span>
 </Button>
 </label>
 {sigDataUrl && <div className="border rounded-xl p-3 bg-background/5">
 <img src={sigDataUrl} alt="Signature" className="max-h-16" />
 </div>}
 </div>}
 </GlassCard>

 {/* Step 3: Place & Download */}
 {pdfPageCanvas && <GlassCard className="p-6 space-y-4">
 <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">Step 3 — Click to Place & Download</h2>

 <div className="flex gap-3 flex-wrap">
 <Button onClick={placeSignature} disabled={!sigDataUrl} variant="outline" className="gap-2 font-semibold">
 <Pen className="h-4 w-4" /> Place in Center
 </Button>
 {placedSig && <Button variant="ghost" size="sm" onClick={() => setPlacedSig(null)} className="gap-1.5 text-destructive">
 <Trash2 className="h-3.5 w-3.5" /> Remove Signature
 </Button>}
 </div>

 {/* PDF Page Preview with clickable wrapper */}
 <div className="overflow-auto border-2 border-border rounded-xl bg-gray-100" style={{
            maxHeight: "70vh"
          }}>
 <div ref={previewRef} className="relative cursor-crosshair select-none mx-auto" style={{
              width: pdfPageWidth,
              height: pdfPageHeight
            }} onMouseDown={onPreviewMouseDown} onMouseMove={onPreviewMouseMove} onMouseUp={onPreviewMouseUp} onMouseLeave={onPreviewMouseUp}>
 <img src={pdfPageCanvas} alt={`PDF page ${pdfCurrentPage}`} className="block w-full h-full" style={{
                userSelect: "none"
              }} draggable={false} />
 {placedSig && <img src={placedSig.dataUrl} alt="Signature" className="absolute border-2 border-primary/60 rounded cursor-move bg-background/30 backdrop-blur-[1px]" style={{
                left: placedSig.x,
                top: placedSig.y,
                width: placedSig.width,
                height: placedSig.height,
                userSelect: "none",
                // Allow pointer events on the signature itself so it can catch mouse down to drag
                pointerEvents: "auto"
              }} draggable={false} />}
 {!placedSig && sigDataUrl && <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-full font-bold shadow animate-pulse pointer-events-none">
 Click anywhere on the document to place your signature
 </div>}
 </div>
 </div>

 {placedSig && <div className="flex justify-end pt-2">
 <Button onClick={downloadSignedPdf} disabled={processing} className="gap-2 font-bold h-11 px-6 shadow-md">
 <Download className="h-4 w-4" />
 {processing ? "Embedding Signature…" : "Download Signed PDF"}
 </Button>
 </div>}
 </GlassCard>}
 </div>

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Upload PDF",
        description: "Select the PDF document you want to sign or fill.",
        icon: Upload
      }, {
        step: "02",
        title: "Create Signature",
        description: "Type, draw, or upload an image of your signature.",
        icon: Pen
      }, {
        step: "03",
        title: "Click & Download",
        description: "Click anywhere on the preview to place the signature, then save.",
        icon: Download
      }]} badges={["100% Free", "Client-Side Privacy", "No Signup"]} />

 <ToolFeatureGuides features={[{
        icon: FileSignature,
        title: "Sign Documents",
        description: "Quickly sign contracts, invoices, and forms from your browser."
      }, {
        icon: Hand,
        title: "Click & Drag",
        description: "Easily position your signature with pixel-perfect accuracy."
      }, {
        icon: ShieldCheck,
        title: "Private & Secure",
        description: "All processing happens locally on your device. We never upload your PDFs."
      }, {
        icon: Type,
        title: "Type or Draw",
        description: "Use our built-in signature generator or draw your own with your mouse."
      }, {
        icon: ImageIcon,
        title: "Image Upload",
        description: "Upload a pre-made transparent PNG or JPG signature."
      }, {
        icon: Zap,
        title: "Lightning Fast",
        description: "No server uploads mean instantaneous document rendering and downloading."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Signing PDF documents shouldn't require clunky desktop software, paid subscriptions, or risky online uploads. The Toolzium PDF Sign & Fill tool enables you to electronically sign any PDF entirely within your browser for free.</p>
 <p>By leveraging advanced HTML5 Canvas APIs and pdf-lib, all document processing occurs natively on your device. This ensures your sensitive documents—whether they are NDAs, tax forms, or personal records—never touch our servers, providing unparalleled privacy and security.</p>
 <p>Simply upload your document, choose whether you want to type, draw, or upload your existing signature, and then click anywhere on the page to stamp it exactly where you need it.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Is my PDF uploaded to a server?",
        answer: "No, all PDF manipulation and rendering happens securely in your web browser. Your files are never sent to or stored on our servers."
      }, {
        question: "How do I ensure the signature is in the right place?",
        answer: "Once you have generated your signature, simply click anywhere on the document preview to place it. You can then click and drag the signature to precisely adjust its position."
      }, {
        question: "Can I sign multiple pages?",
        answer: "Currently, you can add a signature to the page you have selected. If you need to sign multiple pages, you can apply your signature to one page, download the document, and then re-upload it to sign another page."
      }, {
        question: "What formats can I upload for my signature?",
        answer: "If you choose the 'Upload Image' option, you can upload PNG and JPG files. We recommend using a PNG with a transparent background for the best results."
      }, {
        question: "Can I use this on my mobile device?",
        answer: "Yes! The tool works on mobile devices. You can use your touchscreen to draw a signature and place it on your document."
      }, {
        question: "Is this tool completely free?",
        answer: "Yes, our PDF Sign & Fill tool is 100% free with no hidden fees or watermarks added to your downloaded documents."
      }]} />

 <RelatedTools currentToolUrl="/tools/pdf/pdf-sign-fill" max={6} />
 </div></div>;
}