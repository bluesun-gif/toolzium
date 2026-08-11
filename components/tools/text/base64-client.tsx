"use client";

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw, ArrowRightLeft, Upload, Image as ImageIcon, Binary } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

export function Base64Client() {
  const [direction, setDirection] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processBase64 = useCallback((text: string, dir: "encode" | "decode", safe: boolean): string => {
    if (!text) return "";
    try {
      if (dir === "encode") {
        const encoded = btoa(unescape(encodeURIComponent(text)));
        return safe ? encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : encoded;
      } else {
        let str = text;
        if (safe) {
          str = str.replace(/-/g, "+").replace(/_/g, "/");
          while (str.length % 4) str += "=";
        }
        return decodeURIComponent(escape(atob(str)));
      }
    } catch (e: any) {
      return `Error: ${e.message}`;
    }
  }, []);

  const output = useMemo(() => processBase64(input, direction, urlSafe), [input, direction, urlSafe]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleClear = () => {
    setInput("");
    toast.success("Cleared!");
  };

  const handleSwap = () => {
    if (output && !output.startsWith("Error")) {
      setInput(output);
      setDirection(direction === "encode" ? "decode" : "encode");
      toast.success("Swapped!");
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setInput(result);
      setDirection("encode");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const inputSize = new Blob([input]).size;
  const outputSize = new Blob([output]).size;
  const overhead = inputSize > 0 ? (((outputSize - inputSize) / inputSize) * 100).toFixed(1) : "0.0";

  const isImage = direction === "decode" && output.startsWith("data:image");

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={Binary}
        title="Base64 Encoder/Decoder"
        description="Encode text to Base64 or decode Base64 strings securely in your browser."
      />

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              Input
              <span className="ml-auto text-xs font-normal text-muted-foreground">{input.length} chars</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="flex gap-2">
              <Button variant={direction === "encode" ? "default" : "outline"} onClick={() => setDirection("encode")} className="flex-1">Encode</Button>
              <Button variant={direction === "decode" ? "default" : "outline"} onClick={() => setDirection("decode")} className="flex-1">Decode</Button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="urlSafe" checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} className="h-4 w-4 rounded border-border" />
                <Label htmlFor="urlSafe" className="text-sm cursor-pointer">URL-safe Base64</Label>
              </div>
              <Button variant="outline" size="sm" onClick={handleSwap} className="ml-auto" disabled={!output || output.startsWith("Error")}>
                <ArrowRightLeft className="h-4 w-4 mr-1" /> Swap
              </Button>
            </div>

            <textarea
              className={textareaClass}
              rows={10}
              placeholder={direction === "encode" ? "Enter text to encode..." : "Enter Base64 string to decode..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border/60 rounded-lg p-6 text-center cursor-pointer hover:bg-muted/30 transition-colors"
            >
              <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag & drop a file here, or click to select</p>
              <p className="text-xs text-muted-foreground mt-1">(File will be encoded to Base64)</p>
              <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} />
            </div>

            <div className="flex gap-2">
              <Button variant="destructive" size="sm" onClick={handleClear} className="flex-1">
                <RotateCcw className="h-4 w-4 mr-1" /> Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              Output
              <span className="ml-auto text-xs font-normal text-muted-foreground">{output.length} chars</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <textarea
              className={textareaClass}
              rows={10}
              readOnly
              value={output}
              placeholder="Result will appear here..."
            />

            {isImage && (
              <div className="border rounded-lg p-2 bg-background/50">
                <p className="text-xs text-muted-foreground mb-2">Image Preview:</p>
                <img src={output} alt="Decoded image" className="max-h-48 mx-auto rounded" />
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-2 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">Input Size</p>
                <p className="font-semibold">{inputSize} B</p>
              </div>
              <div className="p-2 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">Output Size</p>
                <p className="font-semibold">{outputSize} B</p>
              </div>
              <div className="p-2 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">Overhead</p>
                <p className="font-semibold">{overhead}%</p>
              </div>
            </div>

            <Button onClick={() => handleCopy(output)} className="w-full" disabled={!output || output.startsWith("Error")}>
              <Copy className="h-4 w-4 mr-1" /> Copy Output
            </Button>
          </CardContent>
        </Card>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Select Direction", description: "Choose whether you want to encode text to Base64 or decode a Base64 string.", icon: Binary },
          { step: "02", title: "Enter Input", description: "Type your text, paste a Base64 string, or drag-and-drop a file to encode it.", icon: Upload },
          { step: "03", title: "Get Results", description: "View the converted output instantly, copy it to your clipboard, or swap inputs.", icon: Copy }
        ]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Upload, title: "File Encoding", description: "Upload images, PDFs, or any file via drag-and-drop to instantly generate its Base64 Data URI representation." },
          { icon: ArrowRightLeft, title: "URL-Safe Mode", description: "Toggle URL-safe Base64 to replace '+' and '/' with '-' and '_', making the output safe for URLs and filenames." },
          { icon: ImageIcon, title: "Live Image Preview", description: "When decoding Base64 strings that represent images, the tool automatically renders an inline preview of the picture." },
          { icon: Copy, title: "Size & Overhead Stats", description: "Track the exact byte size of your input and output, including the calculated encoding overhead percentage." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h2>The Ultimate Client-Side Base64 Tool</h2>
          <p>Base64 is an encoding scheme used to represent binary data in an ASCII string format by translating it into a radix-64 representation. It is commonly used in web development to embed images, fonts, and other assets directly into CSS, HTML, or JSON files, eliminating the need for separate HTTP requests. Our Base64 Encoder/Decoder provides a secure, lightning-fast, and entirely client-side solution for handling all your Base64 transformation needs.</p>
          <p>Unlike server-based converters, your data never leaves your browser. This is crucial when working with sensitive information, proprietary code snippets, or confidential documents. The tool processes everything locally using the browser's native <code>btoa</code> and <code>atob</code> functions, ensuring maximum privacy and zero network latency. Whether you are a frontend developer embedding SVG icons, a backend engineer debugging API payloads, or a sysadmin working with certificate files, this tool streamlines your workflow.</p>
          <p>Advanced features like URL-safe encoding ensure your Base64 strings are safe to include in query parameters or file paths without causing routing errors. The drag-and-drop file uploader makes it trivial to convert large binaries into Data URIs, and the live image preview saves you from manually creating HTML tags to verify decoded image data. With real-time statistics on byte size and encoding overhead, you can make informed decisions about asset optimization and payload sizes in your applications.</p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Is my data secure when using this Base64 tool?", answer: "Yes. The encoding and decoding processes happen entirely within your web browser using client-side JavaScript. No data is ever sent to external servers, ensuring 100% privacy." },
          { question: "What is URL-safe Base64?", answer: "Standard Base64 uses '+' and '/' characters, which have special meanings in URLs. URL-safe Base64 replaces them with '-' and '_' respectively, preventing parsing issues in web addresses." },
          { question: "Why does Base64 encoding increase file size?", answer: "Base64 encodes every 3 bytes of binary data into 4 ASCII characters. This results in an approximate 33% increase in payload size compared to the original raw binary data." },
          { question: "Can I encode large files?", answer: "While the tool handles large files well, extremely large files (hundreds of megabytes) might cause browser memory constraints. For typical web assets like images and documents, it works flawlessly." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/text/base64" max={6} />
    </div>
  );
}

export default Base64Client;
