"use client";

import React, { useState, useRef, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Label } from"@/components/ui/label";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { Crop, Image as ImageIcon, Download, RefreshCw, Upload } from"lucide-react";
import { toast } from"react-hot-toast";

const PRESETS = [
 { label:"1:1 Square (Instagram/Avatar)", value: 1 },
 { label:"16:9 Landscape (YouTube/Header)", value: 16/9 },
 { label:"9:16 Portrait (TikTok/Reels)", value: 9/16 },
 { label:"4:5 Portrait (Instagram)", value: 4/5 },
 { label:"3:2 Photo", value: 3/2 },
 { label:"21:9 Ultrawide", value: 21/9 },
 { label:"Custom / Free", value: 0 }
];

export function AspectCropperClient() {
 const [imageSrc, setImageSrc] = useState<string | null>(null);
 const [ratio, setRatio] = useState<number>(1);
 const [cropBox, setCropBox] = useState({ x: 10, y: 10, width: 200, height: 200 });
 const [isDragging, setIsDragging] = useState(false);
 
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const imgRef = useRef<HTMLImageElement | null>(null);
 const containerRef = useRef<HTMLDivElement>(null);

 const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (file) {
 const reader = new FileReader();
 reader.onload = (event) => {
 setImageSrc(event.target?.result as string);
 toast.success("Image uploaded!");
 setCropBox({ x: 10, y: 10, width: 200, height: 200 });
 };
 reader.readAsDataURL(file);
 }
 };

 useEffect(() => {
 if (imageSrc) {
 const img = new window.Image();
 img.onload = () => {
 imgRef.current = img;
 drawCanvas();
 };
 img.src = imageSrc;
 }
 }, [imageSrc, cropBox]);

 const drawCanvas = () => {
 const canvas = canvasRef.current;
 const img = imgRef.current;
 if (!canvas || !img) return;
 const ctx = canvas.getContext("2d");
 if (!ctx) return;

 // Simple display scaling for demonstration
 const maxWidth = containerRef.current?.clientWidth || 500;
 const scale = Math.min(maxWidth / img.width, 1);
 
 canvas.width = img.width * scale;
 canvas.height = img.height * scale;

 ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

 // Draw dark overlay
 ctx.fillStyle ="rgba(0, 0, 0, 0.5)";
 ctx.fillRect(0, 0, canvas.width, canvas.height);

 // Clear crop area
 ctx.clearRect(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
 
 // Draw cropped part directly from image
 ctx.drawImage(
 img, 
 cropBox.x / scale, cropBox.y / scale, cropBox.width / scale, cropBox.height / scale,
 cropBox.x, cropBox.y, cropBox.width, cropBox.height
 );

 // Draw crop border
 ctx.strokeStyle ="#fff";
 ctx.lineWidth = 2;
 ctx.strokeRect(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
 };

 const handleCropDownload = () => {
 if (!imgRef.current) return;
 const img = imgRef.current;
 
 const scaleX = img.width / (canvasRef.current?.width || 1);
 const scaleY = img.height / (canvasRef.current?.height || 1);

 const outCanvas = document.createElement("canvas");
 outCanvas.width = cropBox.width * scaleX;
 outCanvas.height = cropBox.height * scaleY;
 
 const ctx = outCanvas.getContext("2d");
 if (!ctx) return;
 
 ctx.drawImage(
 img,
 cropBox.x * scaleX, cropBox.y * scaleY, outCanvas.width, outCanvas.height,
 0, 0, outCanvas.width, outCanvas.height
 );

 const dataUrl = outCanvas.toDataURL("image/png");
 const link = document.createElement("a");
 link.href = dataUrl;
 link.download ="cropped-image.png";
 link.click();
 };
 
 // Basic interaction for updating crop box based on aspect ratio
 useEffect(() => {
 if (ratio !== 0) {
 setCropBox(prev => ({
 ...prev,
 height: prev.width / ratio
 }));
 }
 }, [ratio]);

 return (
 <div className="space-y-6">
 <ToolPageHeader
 title="Image Aspect Ratio Cropper"
 description="Crop images to exact aspect ratios for social media and web."
 icon={Crop}
 actions={
 <ActionButton onClick={handleCropDownload} icon={Download} label="Download Crop"/>
 }
 />

 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
 <div className="md:col-span-1 space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle>Controls</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Upload Image</Label>
 <Label htmlFor="img-upload"className="flex items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
 <div className="text-center">
 <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground"/>
 <span className="text-sm font-medium">Click to upload</span>
 </div>
 <input id="img-upload"type="file"accept="image/*"className="hidden"onChange={handleImageUpload} />
 </Label>
 </div>
 
 <div className="space-y-2">
 <Label>Aspect Ratio Preset</Label>
 <Select value={ratio.toString()} onValueChange={val => setRatio(parseFloat(val))}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 {PRESETS.map(p => (
 <SelectItem key={p.value} value={p.value.toString()}>{p.label}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 
 {imageSrc && (
 <div className="pt-4 border-t">
 <Button variant="outline"className="w-full mb-2"onClick={() => {setImageSrc(null); setCropBox({ x: 10, y: 10, width: 200, height: 200 })}}>
 <RefreshCw className="w-4 h-4 mr-2"/> Clear Image
 </Button>
 </div>
 )}
 </CardContent>
 </GlassCard>
 </div>
 
 <div className="md:col-span-3">
 <GlassCard>
 <CardHeader>
 <CardTitle>Cropper Canvas</CardTitle>
 <CardDescription>Adjust the box to crop. (Simplified interaction for demo)</CardDescription>
 </CardHeader>
 <CardContent>
 <div ref={containerRef} className="bg-muted min-h-[400px] rounded-md flex items-center justify-center overflow-hidden border">
 {imageSrc ? (
 <canvas 
 ref={canvasRef} 
 className="max-w-full block"
 onClick={(e) => {
 // Very basic click to center crop box
 const rect = canvasRef.current?.getBoundingClientRect();
 if (rect) {
 const x = e.clientX - rect.left - (cropBox.width/2);
 const y = e.clientY - rect.top - (cropBox.height/2);
 setCropBox({...cropBox, x: Math.max(0, x), y: Math.max(0, y)});
 }
 }}
 />
 ) : (
 <div className="text-center text-muted-foreground flex flex-col items-center">
 <ImageIcon className="w-12 h-12 mb-4 opacity-20"/>
 <p>Upload an image to start cropping.</p>
 </div>
 )}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 </div>
 );
}
