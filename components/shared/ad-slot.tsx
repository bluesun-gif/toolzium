"use client";

import { useState, useEffect, useCallback } from "react";
import { usePremium } from "@/components/providers/premium-provider";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, Crown } from "lucide-react";
import Link from "next/link";

// Mock developer-focused ads for demonstration
const ADS = [
  {
    id: "ad-1",
    headline: "🚀 Deploy Your Next.js App in Seconds",
    body: "Vercel gives your team the best developer experience for building and deploying web apps.",
    cta: "Start Free",
    href: "https://vercel.com",
    label: "Sponsored",
    tag: "Hosting",
    gradient: "from-black to-neutral-800",
    badge: "🔥 Popular",
  },
  {
    id: "ad-2",
    headline: "⚡ Serverless Postgres for Developers",
    body: "Neon is a serverless Postgres platform with branching, instant scaling, and a generous free tier.",
    cta: "Get Started",
    href: "https://neon.tech",
    label: "Sponsored",
    tag: "Database",
    gradient: "from-green-950 to-emerald-900",
    badge: "🌿 Free Tier",
  },
  {
    id: "ad-3",
    headline: "🤖 Build AI Products Faster",
    body: "Groq delivers ultra-fast LLM inference — 500+ tokens/second. Perfect for real-time AI apps.",
    cta: "Try Groq Free",
    href: "https://groq.com",
    label: "Sponsored",
    tag: "AI / LLM",
    gradient: "from-orange-950 to-red-900",
    badge: "⚡ Ultra Fast",
  },
  {
    id: "ad-4",
    headline: "🎨 Icons, Animations & UI Components",
    body: "Lucide offers 1,400+ open-source SVG icons designed for React, Vue, and modern web apps.",
    cta: "Browse Icons",
    href: "https://lucide.dev",
    label: "Sponsored",
    tag: "UI Kit",
    gradient: "from-violet-950 to-purple-900",
    badge: "🆓 Open Source",
  },
  {
    id: "ad-5",
    headline: "📊 Analytics Without the Complexity",
    body: "PostHog is an all-in-one analytics platform: product analytics, session replays, A/B tests, and feature flags.",
    cta: "Try PostHog",
    href: "https://posthog.com",
    label: "Sponsored",
    tag: "Analytics",
    gradient: "from-yellow-950 to-amber-900",
    badge: "🐦 Open Source",
  },
];

// Rotate ad every 25 seconds
const AD_ROTATION_MS = 25000;

export function AdSlot() {
  const { isPremium } = usePremium();
  const [adIndex, setAdIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(true);

  const rotateAd = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setAdIndex((i) => (i + 1) % ADS.length);
      setVisible(true);
    }, 300);
  }, []);

  useEffect(() => {
    if (isPremium || dismissed) return;
    const timer = setInterval(rotateAd, AD_ROTATION_MS);
    return () => clearInterval(timer);
  }, [isPremium, dismissed, rotateAd]);

  // Premium users see nothing, dismissed users see nothing
  if (isPremium || dismissed) return null;

  const ad = ADS[adIndex];

  return (
    <div
      className={`relative w-full rounded-xl border bg-card overflow-hidden transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
      }`}
      role="complementary"
      aria-label="Sponsored content"
    >
      {/* Gradient accent bar */}
      <div className={`h-0.5 w-full bg-gradient-to-r ${ad.gradient}`} />

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 border border-border/50 rounded px-1.5 py-0.5">
              {ad.label}
            </span>
            <span className="text-[10px] text-muted-foreground">{ad.tag}</span>
            {ad.badge && (
              <span className="text-[10px] text-muted-foreground/80 bg-muted rounded px-1.5 py-0.5">
                {ad.badge}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="text-muted-foreground/50 hover:text-muted-foreground transition-colors rounded-md p-0.5 hover:bg-muted"
            aria-label="Dismiss ad"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Ad content */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-tight mb-1">
              {ad.headline}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {ad.body}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <Button size="sm" className="h-8 text-xs px-3 gap-1" asChild>
              <Link href={ad.href} target="_blank" rel="noopener noreferrer sponsored">
                {ad.cta}
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Remove ads CTA */}
        <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <Crown className="h-3 w-3 text-yellow-500" />
          <span>Want an ad-free experience?</span>
          <button
            type="button"
            className="text-primary font-medium hover:underline"
            onClick={() => {
              // Dispatch a custom event to open the premium modal from the navbar
              window.dispatchEvent(new CustomEvent("toolzium:open-premium-modal"));
            }}
          >
            Go Premium →
          </button>
        </div>
      </div>
    </div>
  );
}
