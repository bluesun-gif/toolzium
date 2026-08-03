"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Upload, Download, Loader2 } from "lucide-react";
import { removeBackground } from "@imgly/background-removal";

export default function BgRemoveClient() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMsg, setProgressMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setOriginalUrl(URL.createObjectURL(file));
      setResultUrl(null);
    }
  };

  const processImage = async () => {
    if (!imageFile) return;

    try {
      setIsProcessing(true);
      setProgressMsg("Loading AI model... This might take a moment the first time.");
      
      const imageBlob = await removeBackground(imageFile, {
        progress: (key, current, total) => {
          setProgressMsg(`Processing: ${Math.round((current / total) * 100)}%`);
        }
      });
      
      setResultUrl(URL.createObjectURL(imageBlob));
      toast.success("Background removed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to process the image. Please try again.");
    } finally {
      setIsProcessing(false);
      setProgressMsg("");
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `nobg-${imageFile?.name || 'image.png'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <ToolPageHeader
        title="AI Background Remover"
        description="Remove image backgrounds instantly and securely in your browser."
      />
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <Card className="dark:bg-zinc-900/30">
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-8 text-center cursor-pointer hover:border-zinc-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto h-12 w-12 text-zinc-400 mb-4" />
              <p className="text-zinc-600 dark:text-zinc-400">
                Click or drag & drop an image here
              </p>
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>

            {originalUrl && (
              <div className="relative rounded-lg overflow-hidden border dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
                <img src={originalUrl} alt="Original" className="w-full object-contain max-h-[300px]" />
              </div>
            )}

            <Button 
              onClick={processImage} 
              className="w-full" 
              disabled={!imageFile || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {progressMsg || "Processing..."}
                </>
              ) : (
                "Remove Background"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="dark:bg-zinc-900/30">
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!resultUrl && !isProcessing && (
              <div className="text-center text-zinc-500 py-16 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border dark:border-zinc-700 border-dashed">
                Processed image will appear here.
              </div>
            )}
            
            {isProcessing && (
              <div className="text-center text-zinc-500 py-16 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border dark:border-zinc-700 flex flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
                <p>{progressMsg || "Applying AI magic..."}</p>
              </div>
            )}

            {resultUrl && (
              <>
                <div className="relative rounded-lg overflow-hidden border dark:border-zinc-700 bg-transparent custom-checkerboard">
                  {/* Checkerboard background for transparency preview */}
                  <style dangerouslySetInnerHTML={{__html: `
                    .custom-checkerboard {
                      background-image: linear-gradient(45deg, #e5e5e5 25%, transparent 25%),
                        linear-gradient(-45deg, #e5e5e5 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #e5e5e5 75%),
                        linear-gradient(-45deg, transparent 75%, #e5e5e5 75%);
                      background-size: 20px 20px;
                      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
                    }
                    .dark .custom-checkerboard {
                      background-image: linear-gradient(45deg, #3f3f46 25%, transparent 25%),
                        linear-gradient(-45deg, #3f3f46 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #3f3f46 75%),
                        linear-gradient(-45deg, transparent 75%, #3f3f46 75%);
                    }
                  `}} />
                  <img src={resultUrl} alt="Result" className="w-full object-contain max-h-[300px]" />
                </div>
                <Button onClick={handleDownload} className="w-full" variant="default">
                  <Download className="mr-2 h-4 w-4" /> Download Transparent PNG
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
