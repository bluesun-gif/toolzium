"use client";

import React, { useState } from "react";
import {
  Share2,
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
  Send,
  Linkedin,
  Twitter,
  Globe
} from "lucide-react";
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
import { cn } from "@/lib/utils";

interface ToolShareButtonProps {
  toolTitle: string;
  toolUrl?: string;
  className?: string;
}

export function ToolShareButton({ toolTitle, toolUrl, className }: ToolShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const currentPath = typeof window !== "undefined" ? (toolUrl || window.location.pathname) : (toolUrl || "");
  const origin = typeof window !== "undefined" ? window.location.origin : "https://toolzium.com";
  const fullUrl = `${origin}${currentPath}`;
  const shareText = `Check out this free ${toolTitle} on Toolzium — Instant, private, no signup required:`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const shareToSocial = (platform: string) => {
    let target = "";
    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedText = encodeURIComponent(`${toolTitle} — 100% Free Online Tool:`);

    switch (platform) {
      case "reddit":
        target = `https://reddit.com/submit?url=${encodedUrl}&title=${encodeURIComponent(`Free ${toolTitle} [No Signup / Instant]`)}`;
        break;
      case "twitter":
        target = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case "whatsapp":
        target = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${fullUrl}`)}`;
        break;
      case "telegram":
        target = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      case "linkedin":
        target = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }

    if (target && typeof window !== "undefined") {
      window.open(target, "_blank", "noopener,noreferrer,width=600,height=500");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          aria-label={`Share ${toolTitle}`}
          className={cn(
            "transition-all duration-200 gap-1.5 h-8.5 px-3 rounded-xl border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/50 cursor-pointer",
            className
          )}
        >
          <Share2 className="w-4 h-4" />
          <span className="text-xs font-semibold hidden sm:inline">Share</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <Share2 className="h-5 w-5 text-primary" />
            Share {toolTitle}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Spread this free tool to your communities, friends, or social channels.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-3">
          {/* Quick Copy Link Box */}
          <div className="flex items-center gap-2">
            <Input
              value={fullUrl}
              readOnly
              className="h-10 rounded-xl font-mono text-xs bg-muted/50 select-all flex-1"
            />
            <Button
              size="sm"
              onClick={copyToClipboard}
              className="h-10 px-3.5 rounded-xl text-xs font-bold gap-1.5 shrink-0 bg-primary text-primary-foreground cursor-pointer"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </Button>
          </div>

          {/* Social Channels Link Spreading Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
            <button
              onClick={() => shareToSocial("reddit")}
              className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/50 flex flex-col items-center justify-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 transition-all cursor-pointer hover:scale-102"
            >
              <Globe className="h-5 w-5" />
              <span>Reddit</span>
            </button>

            <button
              onClick={() => shareToSocial("twitter")}
              className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 hover:border-sky-500/50 flex flex-col items-center justify-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 transition-all cursor-pointer hover:scale-102"
            >
              <Twitter className="h-5 w-5" />
              <span>X (Twitter)</span>
            </button>

            <button
              onClick={() => shareToSocial("whatsapp")}
              className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/50 flex flex-col items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 transition-all cursor-pointer hover:scale-102"
            >
              <MessageCircle className="h-5 w-5" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => shareToSocial("telegram")}
              className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/50 flex flex-col items-center justify-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 transition-all cursor-pointer hover:scale-102"
            >
              <Send className="h-5 w-5" />
              <span>Telegram</span>
            </button>

            <button
              onClick={() => shareToSocial("linkedin")}
              className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/50 flex flex-col items-center justify-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 transition-all cursor-pointer hover:scale-102"
            >
              <Linkedin className="h-5 w-5" />
              <span>LinkedIn</span>
            </button>

            <button
              onClick={copyToClipboard}
              className="p-3 rounded-2xl bg-muted/40 border border-border/60 hover:border-primary/40 flex flex-col items-center justify-center gap-1.5 text-xs font-bold text-foreground transition-all cursor-pointer hover:scale-102"
            >
              <Copy className="h-5 w-5 text-primary" />
              <span>Direct Link</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
