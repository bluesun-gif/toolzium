"use client";

import React, { useState, useRef } from "react";
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
  Share2,
  Twitter,
  Linkedin,
  MessageCircle,
  Send,
  Copy,
  Check,
  Download,
  Sparkles,
  Link2,
} from "lucide-react";
import toast from "react-hot-toast";

export interface ShareResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolTitle: string;
  resultTitle: string;
  resultSummary?: string;
  resultMetrics?: { label: string; value: string | number }[];
  shareUrl?: string;
  badgeText?: string;
}

export function ShareResultModal({
  isOpen,
  onClose,
  toolTitle,
  resultTitle,
  resultSummary,
  resultMetrics = [],
  shareUrl,
  badgeText = "Toolzium Verified",
}: ShareResultModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentUrl =
    typeof window !== "undefined"
      ? shareUrl || `${window.location.origin}${window.location.pathname}?utm_source=viral_share&utm_medium=social`
      : "https://toolzium.com";

  const shareText = `${toolTitle} Result: ${resultTitle}\n${
    resultSummary ? `${resultSummary}\n` : ""
  }${resultMetrics.map((m) => `• ${m.label}: ${m.value}`).join("\n")}\n\nGenerated with @Toolzium (570+ Free Online Tools): ${currentUrl}`;

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedText = encodeURIComponent(
    `⚡ ${toolTitle} Result:\n"${resultTitle}"\n\nTry it free on @Toolzium:`
  );

  const socialLinks = [
    {
      name: "Twitter / X",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: "hover:text-[#1DA1F2] hover:border-[#1DA1F2]/40",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `*${toolTitle} Result:* ${resultTitle}\n${currentUrl}`
      )}`,
      color: "hover:text-[#25D366] hover:border-[#25D366]/40",
    },
    {
      name: "Telegram",
      icon: Send,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(
        `${toolTitle} Result: ${resultTitle}`
      )}`,
      color: "hover:text-[#0088cc] hover:border-[#0088cc]/40",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40",
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopiedLink(true);
      toast.success("Viral share link copied!");
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      toast.error("Copy failed");
    }
  };

  const handleCopyFormattedText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedText(true);
      toast.success("Formatted result copied to clipboard!");
      setTimeout(() => setCopiedText(false), 2000);
    } catch {
      toast.error("Copy failed");
    }
  };

  const handleDownloadCard = () => {
    setIsGeneratingImage(true);
    try {
      // Create high-res canvas (1200x630 social card standard)
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Dark futuristic gradient background
      const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
      bgGrad.addColorStop(0, "#0b0f19");
      bgGrad.addColorStop(0.5, "#111827");
      bgGrad.addColorStop(1, "#070a12");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 630);

      // Outer accent border
      ctx.strokeStyle = "rgba(124, 58, 237, 0.4)";
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 30, 1140, 570);

      // Top branding pill
      ctx.fillStyle = "rgba(124, 58, 237, 0.15)";
      ctx.beginPath();
      ctx.roundRect(60, 60, 240, 44, 22);
      ctx.fill();
      ctx.strokeStyle = "rgba(124, 58, 237, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#a78bfa";
      ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText("✨ " + badgeText, 80, 88);

      // Tool Title
      ctx.fillStyle = "#94a3b8";
      ctx.font = "600 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(toolTitle.toUpperCase(), 60, 150);

      // Result Title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 44px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      const words = resultTitle.split(" ");
      let line = "";
      let y = 210;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 1080 && n > 0) {
          ctx.fillText(line, 60, y);
          line = words[n] + " ";
          y += 54;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 60, y);

      // Summary text
      if (resultSummary) {
        y += 40;
        ctx.fillStyle = "#cbd5e1";
        ctx.font = "400 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        ctx.fillText(resultSummary.slice(0, 120), 60, y);
      }

      // Metrics pill row
      if (resultMetrics.length > 0) {
        y += 60;
        let x = 60;
        resultMetrics.slice(0, 4).forEach((metric) => {
          const pillWidth = 240;
          ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
          ctx.beginPath();
          ctx.roundRect(x, y, pillWidth, 90, 16);
          ctx.fill();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
          ctx.stroke();

          ctx.fillStyle = "#94a3b8";
          ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
          ctx.fillText(metric.label, x + 20, y + 32);

          ctx.fillStyle = "#38bdf8";
          ctx.font = "bold 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
          ctx.fillText(String(metric.value).slice(0, 14), x + 20, y + 70);

          x += pillWidth + 20;
        });
      }

      // Footer branding
      ctx.fillStyle = "#64748b";
      ctx.font = "500 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText("Generated on Toolzium.com • 570+ Free Web Tools", 60, 565);

      ctx.fillStyle = "#a78bfa";
      ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText("toolzium.com", 1020, 565);

      // Download trigger
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `toolzium-${toolTitle.toLowerCase().replace(/\s+/g, "-")}-result.png`;
      a.click();
      toast.success("Visual share card downloaded!");
    } catch (e) {
      console.error(e);
      toast.error("Could not generate image card");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-w-[94vw] p-5 sm:p-6 bg-card border-border rounded-2xl shadow-2xl space-y-4">
        <DialogHeader className="space-y-1.5 text-left">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
              <Share2 className="h-4 w-4" />
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">
              Share Your Result
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Share this {toolTitle} output with your team, friends, or social audience.
          </DialogDescription>
        </DialogHeader>

        {/* Visual Result Preview Card */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-xl border border-primary/25 bg-gradient-to-br from-card to-muted/40 p-4 space-y-3 shadow-inner"
        >
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary" className="text-[10px] font-semibold bg-primary/15 text-primary border-primary/20">
              <Sparkles className="h-3 w-3 mr-1" />
              {badgeText}
            </Badge>
            <span className="text-[11px] font-mono text-muted-foreground font-semibold">
              toolzium.com
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              {toolTitle}
            </div>
            <div className="text-sm sm:text-base font-bold text-foreground line-clamp-2 leading-snug">
              {resultTitle}
            </div>
            {resultSummary && (
              <p className="text-xs text-muted-foreground line-clamp-2 pt-0.5">
                {resultSummary}
              </p>
            )}
          </div>

          {resultMetrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              {resultMetrics.slice(0, 4).map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-lg bg-background/60 border border-border/60 px-2.5 py-1.5 text-left"
                >
                  <div className="text-[10px] text-muted-foreground">{m.label}</div>
                  <div className="text-xs font-bold text-primary truncate">{m.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 1-Click Social Sharing Grid */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground">
            Share to Social Channels:
          </div>
          <div className="grid grid-cols-4 gap-2">
            {socialLinks.map((s) => (
              <Button
                key={s.name}
                variant="outline"
                className={`h-11 flex flex-col items-center justify-center gap-1 rounded-xl text-[11px] border-border/80 transition-colors ${s.color}`}
                asChild
              >
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  <s.icon className="h-4 w-4 shrink-0" />
                  <span className="text-[10px]">{s.name.split(" ")[0]}</span>
                </a>
              </Button>
            ))}
          </div>
        </div>

        {/* Action Buttons: Copy Link, Copy Text, Download Image Card */}
        <div className="space-y-2 pt-1 border-t border-border/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="rounded-xl text-xs gap-1.5 h-9"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Link2 className="h-3.5 w-3.5" />}
              {copiedLink ? "Link Copied!" : "Copy Share Link"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyFormattedText}
              className="rounded-xl text-xs gap-1.5 h-9"
            >
              {copiedText ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedText ? "Text Copied!" : "Copy Formatted Text"}
            </Button>
          </div>

          <Button
            onClick={handleDownloadCard}
            disabled={isGeneratingImage}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs gap-2 h-10 shadow-md shadow-primary/20"
          >
            <Download className="h-4 w-4" />
            <span>Download High-Res Graphic Card (PNG)</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ShareResultButton({
  toolTitle,
  resultTitle,
  resultSummary,
  resultMetrics,
  shareUrl,
  badgeText,
  variant = "default",
  size = "sm",
  className = "",
}: {
  toolTitle: string;
  resultTitle: string;
  resultSummary?: string;
  resultMetrics?: { label: string; value: string | number }[];
  shareUrl?: string;
  badgeText?: string;
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
        <Share2 className="h-3.5 w-3.5" />
        <span>Share Result</span>
      </Button>

      {open && (
        <ShareResultModal
          isOpen={open}
          onClose={() => setOpen(false)}
          toolTitle={toolTitle}
          resultTitle={resultTitle}
          resultSummary={resultSummary}
          resultMetrics={resultMetrics}
          shareUrl={shareUrl}
          badgeText={badgeText}
        />
      )}
    </>
  );
}
