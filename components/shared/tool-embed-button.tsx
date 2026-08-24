"use client";

import React, { useState } from "react";
import { Code, Copy, Check, ExternalLink, Sparkles } from "lucide-react";
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
  const [height, setHeight] = useState("650");

  const path = typeof window !== "undefined" ? (toolUrl || window.location.pathname) : (toolUrl || "");
  const embedPath = path.replace(/^\/tools\//, "/embed/tools/");
  const origin = typeof window !== "undefined" ? window.location.origin : "https://toolzium.com";
  const embedUrl = `${origin}${embedPath}`;
  const toolPageUrl = `${origin}${path}`;

  const iframeSnippet = `<div style="max-width: 100%; margin: 16px auto; font-family: system-ui, sans-serif;">
  <iframe src="${embedUrl}" width="100%" height="${height}" frameborder="0" style="border-radius: 20px; border: 1px solid rgba(0,0,0,0.12); box-shadow: 0 10px 30px rgba(0,0,0,0.06); display: block;" title="${toolTitle} — Toolzium"></iframe>
  <div style="text-align: right; padding: 6px 8px; font-size: 12px; color: #64748b;">
    Free <a href="${toolPageUrl}" target="_blank" rel="noopener" style="color: #6366f1; font-weight: 600; text-decoration: none;">${toolTitle}</a> by <a href="https://toolzium.com" target="_blank" rel="noopener" style="color: #6366f1; font-weight: 700; text-decoration: none;">Toolzium</a>
  </div>
</div>`;

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(iframeSnippet);
      setCopied(true);
      toast.success("Embed HTML code copied to clipboard!");
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
          className="h-8.5 px-3 rounded-xl border-border/80 bg-background/50 hover:bg-background/80 text-muted-foreground hover:text-foreground text-xs font-semibold gap-1.5 cursor-pointer shadow-xs transition"
        >
          <Code className="h-4 w-4 text-primary shrink-0" />
          <span className="hidden sm:inline">Embed</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <Code className="h-5 w-5 text-primary" />
            Embed {toolTitle} on Your Website
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Copy and paste this free, responsive widget into your blog, documentation, or WordPress site.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Height Config */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-foreground">Widget Height:</span>
            <div className="flex items-center gap-2">
              {["550", "650", "800"].map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHeight(h)}
                  className={`px-3 py-1 rounded-xl border text-xs font-mono font-bold transition cursor-pointer ${
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
          <div className="relative rounded-2xl border border-border/80 bg-muted/40 p-3.5">
            <pre className="text-[11px] font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap break-all select-all max-h-36">
              {iframeSnippet}
            </pre>
            <Button
              size="sm"
              onClick={copyEmbedCode}
              className="mt-3 w-full h-10 rounded-xl text-xs font-bold gap-1.5 bg-primary text-primary-foreground cursor-pointer"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? "Embed Code Copied!" : "Copy Embed HTML Code"}</span>
            </Button>
          </div>

          {/* Preview Note */}
          <div className="rounded-2xl border border-border/60 bg-primary/5 p-3 text-[11px] text-muted-foreground leading-relaxed flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary shrink-0" />
            <span>
              Fully responsive, auto-scales on mobile and desktop, zero performance impact on host sites.
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
