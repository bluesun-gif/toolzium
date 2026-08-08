"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Upload, Download, Pen, Type, Image as ImageIcon, Trash2, RotateCcw } from "lucide-react";
import { PDFDocument, rgb } from "pdf-lib";
import toast from "react-hot-toast";

type SignMode = "type" | "draw" | "image";
type PlacedSig = { x: number; y: number; width: number; height: number; dataUrl: string };

export default function PdfSignFillClient() {
  // PDF state
  const [file, setFile] = useState<File | null>(null);
  const [pdfPageCanvas, setPdfPageCanvas] = useState<string | null>(null); // rendered page as dataUrl
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
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Placement state
  const [placedSig, setPlacedSig] = useState<PlacedSig | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);

  const [processing, setProcessing] = useState(false);

  // ─── Render PDF page to canvas ──────────────────────────────────────────────
  const renderPage = useCallback(async (pdfFile: File, pageNum: number) => {
    try {
      const pdfjsLib = (await import("pdfjs-dist")).default ?? (await import("pdfjs-dist"));
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.worker.min.mjs`;

      const buffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      setPdfPageCount(pdf.numPages);

      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;
      await page.render({ canvasContext: ctx, canvas, viewport } as any).promise;

      setPdfPageWidth(viewport.width);
      setPdfPageHeight(viewport.height);
      setPdfPageCanvas(canvas.toDataURL("image/png"));

      // Compute scale factors (rendered canvas → actual PDF pts)
      const rawViewport = page.getViewport({ scale: 1 });
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
    toast.success(`"${f.name}" loaded.`);
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
    return { x: clientX - rect.left, y: clientY - rect.top };
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
    reader.onload = (ev) => setSigDataUrl(ev.target!.result as string);
    reader.readAsDataURL(f);
  };

  // ─── Placement (drag and drop) ────────────────────────────────────────────────
  const placeSignature = () => {
    if (!sigDataUrl) {
      toast.error("Please create your signature first.");
      return;
    }
    if (!pdfPageCanvas) {
      toast.error("Please upload and load a PDF first.");
      return;
    }
    // Place in bottom-left area initially
    setPlacedSig({ x: 40, y: pdfPageHeight - 100, width: 200, height: 50, dataUrl: sigDataUrl });
    toast.success("Signature placed! Drag it to position.");
  };

  const onPreviewMouseDown = (e: React.MouseEvent) => {
    if (!placedSig || !previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    if (
      mx >= placedSig.x && mx <= placedSig.x + placedSig.width &&
      my >= placedSig.y && my <= placedSig.y + placedSig.height
    ) {
      setIsDragging(true);
      setDragOffset({ x: mx - placedSig.x, y: my - placedSig.y });
    }
  };

  const onPreviewMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !placedSig || !previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const nx = Math.max(0, Math.min(e.clientX - rect.left - dragOffset.x, pdfPageWidth - placedSig.width));
    const ny = Math.max(0, Math.min(e.clientY - rect.top - dragOffset.y, pdfPageHeight - placedSig.height));
    setPlacedSig({ ...placedSig, x: nx, y: ny });
  };

  const onPreviewMouseUp = () => setIsDragging(false);

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
      const { height: pageHeightPts } = page.getSize();

      // Convert canvas coords to PDF pts
      const xPts = placedSig.x * pdfScaleX;
      const wPts = placedSig.width * pdfScaleX;
      const hPts = placedSig.height * pdfScaleY;
      // PDF y=0 is bottom-left; canvas y=0 is top-left
      const yPts = pageHeightPts - (placedSig.y * pdfScaleY) - hPts;

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
        opacity: 1,
      });

      const outBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(outBytes)], { type: "application/pdf" });
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

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4">
      <ToolPageHeader
        icon={Pen}
        title="PDF Sign & Fill Studio"
        description="Add a real signature to any PDF. Type, draw, or upload your signature — then drag it anywhere on the page."
      />

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
            {pdfPageCount > 0 && (
              <div className="text-xs text-primary font-bold">{pdfPageCount} page{pdfPageCount > 1 ? "s" : ""} loaded</div>
            )}
          </label>
        </div>
        {pdfPageCount > 1 && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-muted-foreground">Sign page:</span>
            {Array.from({ length: pdfPageCount }, (_, i) => i + 1).slice(0, 10).map(p => (
              <Button
                key={p}
                size="sm"
                variant={pdfCurrentPage === p ? "default" : "outline"}
                className="h-8 w-8 p-0 text-xs"
                onClick={() => goToPage(p)}
              >
                {p}
              </Button>
            ))}
            {pdfPageCount > 10 && <span className="text-xs text-muted-foreground">…</span>}
          </div>
        )}
      </GlassCard>

      {/* Step 2: Create Signature */}
      <GlassCard className="p-6 space-y-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">Step 2 — Create Your Signature</h2>
        <div className="flex gap-2">
          {([["type", Type, "Type"], ["draw", Pen, "Draw"], ["image", ImageIcon, "Upload Image"]] as const).map(([mode, Icon, label]) => (
            <Button
              key={mode}
              size="sm"
              variant={signMode === mode ? "default" : "outline"}
              className="gap-1.5"
              onClick={() => { setSignMode(mode); setSigDataUrl(null); }}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Button>
          ))}
        </div>

        {signMode === "type" && (
          <div className="space-y-3">
            <Input
              value={typedName}
              onChange={e => setTypedName(e.target.value)}
              placeholder="Your full name"
              className="h-11 font-medium"
            />
            {sigDataUrl && (
              <div className="border rounded-xl p-3 bg-white/5">
                <img src={sigDataUrl} alt="Signature preview" className="h-12" />
              </div>
            )}
          </div>
        )}

        {signMode === "draw" && (
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Draw your signature below:</div>
            <div className="border-2 border-border rounded-xl overflow-hidden bg-white">
              <canvas
                ref={drawCanvasRef}
                width={480}
                height={120}
                className="touch-none cursor-crosshair w-full"
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
              />
            </div>
            <Button size="sm" variant="outline" onClick={clearDraw} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" /> Clear
            </Button>
          </div>
        )}

        {signMode === "image" && (
          <div className="space-y-3">
            <input type="file" accept="image/*" onChange={handleSigImageUpload} className="hidden" id="sig-img-upload" />
            <label htmlFor="sig-img-upload">
              <Button size="sm" variant="outline" className="gap-1.5 cursor-pointer" asChild>
                <span><Upload className="h-3.5 w-3.5" /> Upload Signature Image (PNG/JPG)</span>
              </Button>
            </label>
            {sigDataUrl && (
              <div className="border rounded-xl p-3 bg-white/5">
                <img src={sigDataUrl} alt="Signature" className="max-h-16" />
              </div>
            )}
          </div>
        )}
      </GlassCard>

      {/* Step 3: Place & Download */}
      {pdfPageCanvas && (
        <GlassCard className="p-6 space-y-4">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">Step 3 — Place Signature on Page</h2>

          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={placeSignature}
              disabled={!sigDataUrl}
              variant="outline"
              className="gap-2 font-semibold"
            >
              <Pen className="h-4 w-4" /> Place Signature
            </Button>
            {placedSig && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPlacedSig(null)}
                className="gap-1.5 text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </Button>
            )}
          </div>

          {/* PDF Page Preview with draggable signature */}
          <div
            ref={previewRef}
            className="relative border-2 border-border rounded-xl overflow-auto bg-gray-100 cursor-default select-none"
            style={{ maxHeight: "70vh" }}
            onMouseDown={onPreviewMouseDown}
            onMouseMove={onPreviewMouseMove}
            onMouseUp={onPreviewMouseUp}
            onMouseLeave={onPreviewMouseUp}
          >
            <img
              src={pdfPageCanvas}
              alt={`PDF page ${pdfCurrentPage}`}
              className="block"
              style={{ width: pdfPageWidth, height: pdfPageHeight, userSelect: "none" }}
              draggable={false}
            />
            {placedSig && (
              <img
                src={placedSig.dataUrl}
                alt="Signature"
                className="absolute border-2 border-primary/60 rounded cursor-move"
                style={{
                  left: placedSig.x,
                  top: placedSig.y,
                  width: placedSig.width,
                  height: placedSig.height,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
                draggable={false}
              />
            )}
            {placedSig && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-bold shadow">
                Drag to reposition
              </div>
            )}
          </div>

          {placedSig && (
            <div className="flex justify-end pt-2">
              <Button
                onClick={downloadSignedPdf}
                disabled={processing}
                className="gap-2 font-bold h-11 px-6 shadow-md"
              >
                <Download className="h-4 w-4" />
                {processing ? "Embedding Signature…" : "Download Signed PDF"}
              </Button>
            </div>
          )}
        </GlassCard>
      )}
    </div>
  );
}
