"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Smartphone,
  Monitor,
  Layers,
} from "lucide-react";
import toast from "react-hot-toast";

export interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolPath: string; // e.g. "/tools/url/qr"
  toolTitle: string;
}

export function EmbedModal({
  isOpen,
  onClose,
  toolPath,
  toolTitle,
}: EmbedModalProps) {
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedJsx, setCopiedJsx] = useState(false);
  const [sizePreset, setSizePreset] = useState<"responsive" | "standard" | "compact">("responsive");
  const [themeMode, setThemeMode] = useState<"auto" | "dark" | "light">("auto");

  const siteOrigin =
    typeof window !== "undefined" ? window.location.origin : "https://toolzium.com";

  // Clean path to get embed url: e.g. /tools/url/qr -> /embed/url/qr
  const cleanPath = toolPath.replace(/^\/tools\//, "");
  const embedUrl = `${siteOrigin}/embed/${cleanPath}${
    themeMode !== "auto" ? `?theme=${themeMode}` : ""
  }`;

  const height =
    sizePreset === "compact" ? "420" : sizePreset === "standard" ? "520" : "580";
  const width = sizePreset === "compact" ? "400" : sizePreset === "standard" ? "650" : "100%";

  const iframeHtml = `<iframe
  src="${embedUrl}"
  width="${width}"
  height="${height}"
  frameborder="0"
  scrolling="no"
  style="border: 1px solid rgba(124, 58, 237, 0.2); border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.12); max-width: 100%; overflow: hidden;"
  title="${toolTitle} — Free Toolzium Widget"
></iframe>
<p style="font-size: 11px; color: #888; text-align: center; margin-top: 6px;">
  Free tool powered by <a href="${siteOrigin}${toolPath}" target="_blank" rel="noopener noreferrer" style="color: #7c3aed; font-weight: 600; text-decoration: none;">Toolzium</a>
</p>`;

  const jsxCode = `<div className="w-full max-w-2xl mx-auto my-6">
  <iframe
    src="${embedUrl}"
    width="100%"
    height="${height}"
    frameBorder="0"
    className="w-full rounded-2xl border border-primary/20 shadow-xl overflow-hidden"
    title="${toolTitle} — Toolzium Widget"
  />
  <p className="text-[11px] text-center text-muted-foreground mt-2">
    Free tool by <a href="${siteOrigin}${toolPath}" target="_blank" rel="noreferrer" className="text-primary font-semibold hover:underline">Toolzium</a>
  </p>
</div>`;

  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(iframeHtml);
      setCopiedHtml(true);
      toast.success("Embed HTML code copied!");
      setTimeout(() => setCopiedHtml(false), 2000);
    } catch {
      toast.error("Copy failed");
    }
  };

  const handleCopyJsx = async () => {
    try {
      await navigator.clipboard.writeText(jsxCode);
      setCopiedJsx(true);
      toast.success("React JSX code copied!");
      setTimeout(() => setCopiedJsx(false), 2000);
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl max-w-[95vw] max-h-[90vh] overflow-y-auto p-5 sm:p-6 bg-card border-border rounded-2xl shadow-2xl space-y-4">
        <DialogHeader className="space-y-1 text-left">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
              <Code2 className="h-4 w-4" />
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">
              Embed {toolTitle} on Your Website
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Embed this free, responsive tool widget directly into your blog, documentation, or SaaS application.
          </DialogDescription>
        </DialogHeader>

        {/* Customization Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Size Presets */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Monitor className="h-3.5 w-3.5" /> Widget Size
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-muted/40 p-1 rounded-xl border border-border">
              <button
                type="button"
                onClick={() => setSizePreset("responsive")}
                className={`py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
                  sizePreset === "responsive"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                100% Full
              </button>
              <button
                type="button"
                onClick={() => setSizePreset("standard")}
                className={`py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
                  sizePreset === "standard"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Medium
              </button>
              <button
                type="button"
                onClick={() => setSizePreset("compact")}
                className={`py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
                  sizePreset === "compact"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Compact
              </button>
            </div>
          </div>

          {/* Theme Mode */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" /> Color Theme
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-muted/40 p-1 rounded-xl border border-border">
              <button
                type="button"
                onClick={() => setThemeMode("auto")}
                className={`py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
                  themeMode === "auto"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Auto
              </button>
              <button
                type="button"
                onClick={() => setThemeMode("dark")}
                className={`py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
                  themeMode === "dark"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Dark
              </button>
              <button
                type="button"
                onClick={() => setThemeMode("light")}
                className={`py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
                  themeMode === "light"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Light
              </button>
            </div>
          </div>
        </div>

        {/* Live Widget Preview Box */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>Interactive Widget Preview</span>
            <a
              href={embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1 text-[11px]"
            >
              Open fullscreen <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="rounded-xl border border-border/80 bg-background/50 overflow-hidden shadow-inner p-1 max-h-[220px]">
            <iframe
              src={embedUrl}
              title={`${toolTitle} Preview`}
              className="w-full h-[210px] rounded-lg border-0 bg-transparent"
              scrolling="no"
            />
          </div>
        </div>

        {/* HTML Embed Code Snippet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">
              HTML / iframe Embed Code:
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyHtml}
              className="h-7 text-[11px] gap-1 rounded-lg"
            >
              {copiedHtml ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              {copiedHtml ? "Copied HTML!" : "Copy Code"}
            </Button>
          </div>
          <pre className="p-3 bg-muted/60 border border-border/70 rounded-xl text-[11px] font-mono text-muted-foreground overflow-x-auto whitespace-pre leading-relaxed select-all">
            {iframeHtml}
          </pre>
        </div>

        {/* Action Footer */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border/60">
          <Button
            onClick={handleCopyHtml}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs gap-2 h-10 shadow-md shadow-primary/20"
          >
            <Copy className="h-4 w-4" />
            <span>Copy HTML Embed Code</span>
          </Button>

          <Button
            variant="outline"
            onClick={handleCopyJsx}
            className="rounded-xl text-xs gap-1.5 h-10 border-border"
          >
            <Code2 className="h-4 w-4" />
            <span>Copy React JSX</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function EmbedButton({
  toolPath,
  toolTitle,
  variant = "outline",
  size = "sm",
  className = "",
}: {
  toolPath: string;
  toolTitle: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={() => setOpen(true)}
        className={`rounded-xl text-xs gap-1.5 font-semibold ${className}`}
      >
        <Code2 className="h-3.5 w-3.5" />
        <span>Embed ‹/›</span>
      </Button>

      {open && (
        <EmbedModal
          isOpen={open}
          onClose={() => setOpen(false)}
          toolPath={toolPath}
          toolTitle={toolTitle}
        />
      )}
    </>
  );
}
