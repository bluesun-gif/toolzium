"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Sparkles, Smartphone, Check } from "lucide-react";
import toast from "react-hot-toast";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check if already running in standalone PWA mode
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    ) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      toast.success("Toolzium App installed successfully!");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  if (!isMounted || isInstalled) return null;

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Check if iOS
      const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
      if (isIos) {
        toast("To install on iOS: tap the Share button and select 'Add to Home Screen' 📲", {
          duration: 5000,
          icon: "📱",
        });
      } else {
        toast("To install: Open browser menu (⋮) and click 'Install Toolzium' or 'Add to Home Screen'", {
          duration: 5000,
          icon: "⚡",
        });
      }
      return;
    }

    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      setIsInstalled(true);
      toast.success("Installing Toolzium...");
    }
    setDeferredPrompt(null);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleInstallClick}
      className="hidden md:inline-flex items-center gap-1.5 h-9 px-3 rounded-xl border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold transition-all shadow-sm active:scale-95"
      title="Install Toolzium Desktop & Mobile Offline App"
    >
      <Download className="w-3.5 h-3.5" />
      <span>Install App</span>
    </Button>
  );
}
