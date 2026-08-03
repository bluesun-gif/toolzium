"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Upload, Download, Trash2, FileImage } from "lucide-react";

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
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substring(7),
        file,
        originalSize: file.size,
        compressedSize: null,
        compressedUrl: null,
        status: "pending" as const,
        name: file.name,
      }));
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  const compressImage = async (image: CompressedImage, q: number): Promise<CompressedImage> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(image.file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve({ ...image, status: "error" });
            return;
          }
          ctx.drawImage(img, 0, 0);
          
          let format = "image/jpeg";
          if (image.file.type === "image/webp") format = "image/webp";
          else if (image.file.type === "image/png") format = "image/png";

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve({
                  ...image,
                  compressedSize: blob.size,
                  compressedUrl: URL.createObjectURL(blob),
                  status: "done",
                });
              } else {
                resolve({ ...image, status: "error" });
              }
            },
            format,
            q / 100
          );
        };
        img.onerror = () => resolve({ ...image, status: "error" });
      };
      reader.onerror = () => resolve({ ...image, status: "error" });
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
        updatedImages[i] = { ...updatedImages[i], status: "compressing" };
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
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <ToolPageHeader
        title="Image Compressor"
        description="Compress and reduce image file size without losing quality."
      />
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <Card className="dark:bg-zinc-900/30">
          <CardHeader>
            <CardTitle>Settings & Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-8 text-center cursor-pointer hover:border-zinc-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto h-12 w-12 text-zinc-400 mb-4" />
              <p className="text-zinc-600 dark:text-zinc-400">
                Click or drag & drop images here
              </p>
              <Input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>

            <div className="space-y-4">
              <Label>Compression Quality: {quality}%</Label>
              <Slider
                value={[quality]}
                onValueChange={(val) => setQuality(val[0])}
                max={100}
                min={1}
                step={1}
              />
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
            {images.length === 0 ? (
              <div className="text-center text-zinc-500 py-8">No images uploaded yet.</div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {images.map((img) => (
                  <div key={img.id} className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border dark:border-zinc-700 flex items-center justify-between">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="p-2 bg-zinc-200 dark:bg-zinc-700 rounded-md">
                        <FileImage className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-medium text-sm truncate">{img.name}</p>
                        <p className="text-xs text-zinc-500">
                          {formatSize(img.originalSize)}
                          {img.compressedSize && (
                            <>
                              {" "}→{" "}
                              <span className="text-green-600 dark:text-green-400 font-semibold">
                                {formatSize(img.compressedSize)}
                              </span>
                              {" "}(
                              {Math.round(
                                ((img.originalSize - img.compressedSize) / img.originalSize) * 100
                              )}
                              % saved)
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {img.status === "compressing" && <span className="text-xs text-blue-500">Processing...</span>}
                      {img.status === "done" && img.compressedUrl && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownload(img.compressedUrl!, img.name)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => handleRemove(img.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
