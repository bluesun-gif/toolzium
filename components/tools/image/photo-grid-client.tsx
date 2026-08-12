"use client";

import React, { useState, useRef, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from"@/components/ui/select";
import { ActionButton, ResetButton } from"@/components/shared/action-buttons";
import { LayoutGrid, Upload, Download, Settings, Trash2 } from"lucide-react";
import { toast } from"react-hot-toast";
import { Button } from"@/components/ui/button";

export function PhotoGridClient() {
 const [images, setImages] = useState<string[]>([]);
 const [cols, setCols] = useState(2);
 const [gap, setGap] = useState(10);
 const [bgColor, setBgColor] = useState("#ffffff");
 const canvasRef = useRef<HTMLCanvasElement>(null);

 const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
 const files = e.target.files;
 if (!files) return;
 Array.from(files).forEach(file => {
 const reader = new FileReader();
 reader.onload = (ev) => {
 if (ev.target?.result) {
 setImages(prev => {
 if (prev.length < 9) return [...prev, ev.target!.result as string];
 return prev;
 });
 }
 };
 reader.readAsDataURL(file);
 });
 };

 const drawGrid = () => {
 const canvas = canvasRef.current;
 if (!canvas || images.length === 0) return;
 const ctx = canvas.getContext("2d");
 if (!ctx) return;

 const rows = Math.ceil(images.length / cols);
 const cellSize = 300; 
 
 canvas.width = cols * cellSize + (cols + 1) * gap;
 canvas.height = rows * cellSize + (rows + 1) * gap;
 
 ctx.fillStyle = bgColor;
 ctx.fillRect(0, 0, canvas.width, canvas.height);

 const loadedImages = images.map(src => {
 return new Promise<HTMLImageElement>((resolve) => {
 const img = new Image();
 img.onload = () => resolve(img);
 img.src = src;
 });
 });

 Promise.all(loadedImages).then(imgs => {
 imgs.forEach((img, i) => {
 const col = i % cols;
 const row = Math.floor(i / cols);
 const x = gap + col * (cellSize + gap);
 const y = gap + row * (cellSize + gap);
 
 ctx.drawImage(img, x, y, cellSize, cellSize);
 });
 });
 };

 useEffect(() => {
 drawGrid();
 }, [images, cols, gap, bgColor]);

 const download = () => {
 if (!canvasRef.current || images.length === 0) {
 toast.error("Nothing to download");
 return;
 }
 const link = document.createElement("a");
 link.download ="photo-grid.png";
 link.href = canvasRef.current.toDataURL("image/png");
 link.click();
 toast.success("Grid downloaded!");
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader icon={LayoutGrid} title="Photo Grid Maker"description="Combine photos into a grid"actions={<ResetButton onClick={() => setImages([])} label="Clear All"/>} />
 
 <div className="grid md:grid-cols-3 gap-6">
 <GlassCard className="md:col-span-1">
 <CardHeader>
 <CardTitle>Settings</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Upload Images (Max 9)</Label>
 <Input type="file"multiple accept="image/*"onChange={handleUpload} />
 </div>
 <div className="space-y-2">
 <Label>Columns</Label>
 <Select value={cols.toString()} onValueChange={v => setCols(parseInt(v))}>
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="1">1 Column</SelectItem>
 <SelectItem value="2">2 Columns</SelectItem>
 <SelectItem value="3">3 Columns</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="space-y-2">
 <Label>Gap (px): {gap}</Label>
 <Input type="range"min="0"max="50"value={gap} onChange={e => setGap(parseInt(e.target.value))} />
 </div>
 <div className="space-y-2">
 <Label>Background Color</Label>
 <Input type="color"value={bgColor} onChange={e => setBgColor(e.target.value)} />
 </div>
 <Button onClick={download} className="w-full"><Download className="w-4 h-4 mr-2"/> Download Image</Button>
 </CardContent>
 </GlassCard>

 <GlassCard className="md:col-span-2 overflow-hidden">
 <CardHeader>
 <CardTitle>Preview</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="overflow-auto bg-secondary/20 rounded flex items-center justify-center p-4 min-h-[400px]">
 {images.length > 0 ? (
 <canvas ref={canvasRef} className="max-w-full h-auto border shadow-sm"/>
 ) : (
 <p className="text-muted-foreground text-center">Upload images to see preview</p>
 )}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 );
}
