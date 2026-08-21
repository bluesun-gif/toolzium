"use client";

import React, { useState } from "react";
import { Code, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

interface ToolEmbedButtonProps {
  toolTitle: string;
  toolUrl?: string;
}

export function ToolEmbedButton({ toolTitle, toolUrl }: ToolEmbedButtonProps) {
  const [copied, setCopied] = useState(false);
  const [height, setHeight] = useState("600");

  const path = typeof window !== "undefined" ? window.location.pathname : toolUrl || "";
  const embedPath = path.replace(/^\/tools\//, "/embed/tools/");
  const origin = typeof window !== "undefined" ? window.location.origin : "https://toolzium.com";
  const embedUrl = `${origin}${embedPath}`;

  const iframeSnippet = `<iframe src="${embedUrl}" width="100%" height="${height}" frameborder="0" style="border-radius: 16px; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 4px 20px rgba(0,0,0,0.05);" title="${toolTitle} — Toolzium"></iframe>`;

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(iframeSnippet);
      setCopied(true);
      toast.success("Embed HTML code copied to clipboard!", {
        icon: "📋",
        style: {
          borderRadius: "12px",
          background: "#18181b",
          color: "#fff",
          fontSize: "13px",
          fontWeight: "600",
        },
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy embed code");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 sm:h-9 px-2.5 sm:px-3 rounded-xl border-border/80 bg-background/50 hover:bg-background/80 text-muted-foreground hover:text-foreground text-xs font-semibold gap-1.5 cursor-pointer shadow-xs transition active:scale-95"
        >
          <Code className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>Embed</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <Code className="h-5 w-5 text-primary" />
            Embed {toolTitle} on Your Website
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Copy and paste this lightweight, responsive widget code into your blog, documentation, or CMS.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Height Config */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-foreground">Widget Height (px):</span>
            <div className="flex items-center gap-2">
              {["500", "600", "750"].map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHeight(h)}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-medium transition cursor-pointer ${
                    height === h
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground hover:text-foreground border-border/60"
                  }`}
                >
                  {h}px
                </button>
              ))}
            </div>
          </div>

          {/* HTML Code Box */}
          <div className="relative rounded-xl border border-border/80 bg-muted/50 p-3">
            <pre className="text-[11px] font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap break-all select-all max-h-32">
              {iframeSnippet}
            </pre>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-1">
            <Button
              onClick={copyEmbedCode}
              className="flex-1 gap-2 rounded-xl font-bold bg-primary text-primary-foreground hover:opacity-90 shadow-md h-10 cursor-pointer"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied HTML Code!" : "Copy Embed Code"}
            </Button>
            <Button
              variant="outline"
              asChild
              className="rounded-xl h-10 px-3 border-border/80"
            >
              <a href={embedUrl} target="_blank" rel="noopener noreferrer" title="Preview Widget in New Tab">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <p className="text-[11px] text-center text-muted-foreground">
            ⚡ 100% Free • Powered by Toolzium • Client-Side Execution
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
