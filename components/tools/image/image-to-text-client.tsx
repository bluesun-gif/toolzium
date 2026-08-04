"use client";

import React, { useState, useRef, DragEvent, ChangeEvent, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import TextareaField from "@/components/shared/form-fields/textarea-field";
import { ScanText, Upload, Image as ImageIcon, Loader2 } from "lucide-react";

export default function ImageToTextClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [isTesseractReady, setIsTesseractReady] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const scriptId = "tesseract-script";
    if (document.getElementById(scriptId)) {
      setIsTesseractReady(true);
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    script.async = true;
    script.onload = () => setIsTesseractReady(true);
    document.head.appendChild(script);

    return () => {
      // Clean up optional if we want, but generally fine to leave loaded
    };
  }, []);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const extractText = async (imageUrl: string) => {
    const tesseract = (window as any).Tesseract;
    if (!isTesseractReady || !tesseract) {
      alert("OCR library is not ready yet. Please try again in a moment.");
      return;
    }

    setIsProcessing(true);
    setText("");
    setProgress(0);
    setStatus("Initializing...");

    try {
      const result = await tesseract.recognize(
        imageUrl,
        "eng",
        {
          logger: (m: any) => {
            if (m.status === "recognizing text") {
              setProgress(Math.round(m.progress * 100));
              setStatus("Extracting text...");
            } else {
              setStatus(m.status);
            }
          }
        }
      );
      
      setText(result.data.text);
    } catch (error) {
      console.error("OCR Error:", error);
      alert("Failed to extract text from the image.");
    } finally {
      setIsProcessing(false);
      setStatus("");
      setProgress(0);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const url = event.target.result as string;
        setImageSrc(url);
        extractText(url);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleReset = () => {
    setImageSrc(null);
    setText("");
    setIsProcessing(false);
    setProgress(0);
    setStatus("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <ToolPageHeader
        title="Image to Text (OCR)"
        description="Extract text from images using OCR. Upload PNG, JPG, or WEBP images and convert to editable text. Free online image to text converter."
        icon={ScanText}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Image Input</CardTitle>
              <CardDescription>Upload an image to extract text from.</CardDescription>
            </CardHeader>
            <CardContent>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp, image/bmp"
                className="hidden"
              />
              
              {!imageSrc ? (
                <div
                  className={"border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors " + (isDragging ? "border-primary bg-primary/10" : "border-border hover:bg-muted/50")}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
                >
                  <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-sm font-medium mb-1">Drag and drop your image here</p>
                  <p className="text-xs text-muted-foreground mb-4">or click to browse files</p>
                  <p className="text-xs text-muted-foreground">Supports PNG, JPG, WEBP, BMP</p>
                  {!isTesseractReady && (
                    <p className="text-xs text-amber-500 mt-2">Loading OCR engine...</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden bg-muted/30 relative flex items-center justify-center min-h-[300px]">
                    <img src={imageSrc} alt="Uploaded preview" className="max-w-full max-h-[400px] object-contain" />
                    
                    {isProcessing && (
                      <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                        <p className="text-lg font-semibold mb-2">Extracting Text...</p>
                        <p className="text-sm text-muted-foreground mb-4 capitalize">{status}</p>
                        
                        <div className="w-full max-w-xs h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: progress + "%" }}
                          ></div>
                        </div>
                        <p className="text-xs mt-2 font-medium">{progress}%</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      onClick={triggerFileInput} 
                      className="w-full"
                      disabled={isProcessing}
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Replace Image
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Extracted Text</CardTitle>
              <CardDescription>View and edit the extracted text.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextareaField
                label="Text Content"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={
                  isProcessing 
                    ? "Extracting text..." 
                    : imageSrc 
                      ? "Extracted text will appear here. You can also type or edit..." 
                      : "Upload an image first..."
                }
                rows={16}
                disabled={!imageSrc || isProcessing}
              />
              
              <div className="flex flex-wrap gap-2 justify-end">
                <ResetButton onClick={handleReset} disabled={(!imageSrc && !text) || isProcessing} />
                <CopyButton getText={text} disabled={!text || isProcessing} />
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
