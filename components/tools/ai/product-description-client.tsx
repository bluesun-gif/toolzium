"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import {
  ShoppingBag,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Tag,
  Store,
  CheckCircle2,
} from "lucide-react";

interface DescriptionResult {
  seoTitle: string;
  hookIntro: string;
  bulletPoints: string[];
  descriptionBody: string;
  metaTitle: string;
  metaDescription: string;
  searchTags: string[];
}

export default function ProductDescriptionClient() {
  const [productName, setProductName] = useState<string>("Wireless Noise-Canceling Headphones Pro");
  const [category, setCategory] = useState<string>("Tech & Electronics");
  const [keyFeatures, setKeyFeatures] = useState<string>(
    "Active Noise Cancellation (ANC), 40-hour battery life, memory foam earcups, Bluetooth 5.3."
  );
  const [tone, setTone] = useState<string>("Luxury & Premium");
  const [marketplace, setMarketplace] = useState<string>("Shopify");

  const [result, setResult] = useState<DescriptionResult | null>({
    seoTitle: "Wireless Noise-Canceling Headphones Pro – HD Audio & ANC",
    hookIntro: "Upgrade your daily routine with the ultimate Wireless Noise-Canceling Headphones Pro. Engineered with Bluetooth 5.3 and 40-hour battery life.",
    bulletPoints: [
      "🎧 **CRYSTAL-CLEAR ANC AUDIO**: Active Noise Cancellation blocks external noise effortlessly.",
      "🔋 **40-HOUR BATTERY LIFE**: Enjoy multi-day power with rapid Type-C fast charging.",
      "☁️ **PLUSH MEMORY FOAM**: Lightweight ergonomic fit designed for zero pressure during long sessions.",
    ],
    descriptionBody: "Experience premium sound performance with ultra-low latency, crystal clear mic calls, and foldable travel design.",
    metaTitle: "Wireless Noise-Canceling Headphones Pro | Official Store",
    metaDescription: "Buy the new Wireless Noise-Canceling Headphones Pro. Free shipping & 30-day money-back guarantee!",
    searchTags: ["headphones", "anc-audio", "wireless-headphones", "bluetooth-5.3"],
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const presets = [
    {
      name: "🎧 Wireless Headphones",
      cat: "Tech & Electronics",
      features: "Active Noise Cancellation (ANC), 40-hour battery life, memory foam earcups, Bluetooth 5.3.",
      tone: "Luxury & Premium",
    },
    {
      name: "🌿 Vitamin C Glow Serum",
      cat: "Health & Beauty",
      features: "15% Pure L-Ascorbic Acid, Hyaluronic Acid, 100% Vegan, cruelty-free.",
      tone: "Clean & Trustworthy",
    },
    {
      name: "🪑 Ergonomic Mesh Chair",
      cat: "Home & Office",
      features: "Adjustable lumbar support, 3D armrests, breathable Korean mesh, 300 lbs capacity.",
      tone: "Professional & Sleek",
    },
  ];

  const handleGenerate = () => {
    if (!productName.trim()) {
      toast.error("Please enter a product name.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const cleanTitle = productName.trim();
      const generated: DescriptionResult = {
        seoTitle: `${cleanTitle} – Premium ${category} with High Performance`,
        hookIntro: `Transform your experience with the all-new **${cleanTitle}**. Crafted for optimal reliability and luxury aesthetic.`,
        bulletPoints: [
          `🌟 **PREMIUM QUALITY**: Built with high-grade components for long-lasting durability.`,
          `⚡ **HIGH PERFORMANCE**: Engineered to deliver fast, reliable results every day.`,
          `☁️ **ERGONOMIC COMFORT**: Lightweight and sleek design fits effortlessly into your lifestyle.`,
        ],
        descriptionBody: `Upgrade your setup with **${cleanTitle}**. Designed specifically for ${category} enthusiasts who demand uncompromised performance.`,
        metaTitle: `${cleanTitle} | Official ${marketplace} Store`,
        metaDescription: `Shop the official ${cleanTitle}. High performance, fast shipping, and satisfaction guaranteed!`,
        searchTags: [
          cleanTitle.toLowerCase().replace(/\s+/g, "-"),
          category.toLowerCase().replace(/\s+/g, "-"),
          "high-quality",
          "best-seller",
        ],
      };

      setResult(generated);
      setIsProcessing(false);
      toast.success("Generated high-converting e-commerce description!");
    }, 500);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      <ToolPageHeader
        title="AI Product Description & E-Commerce Copy Studio"
        description="Generate high-converting, SEO-optimized product descriptions for Shopify, Amazon, and Etsy with 1-click tone controls and bullet point hooks."
      />

      {/* SINGLE VIEWPORT E-COMMERCE COPY STUDIO WORKSPACE */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 min-h-[500px] max-w-full">
        {/* Left Column: Product Inputs (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col max-w-full min-w-0">
          <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 tracking-tight">
                <ShoppingBag className="h-4 w-4 text-primary shrink-0" />
                Product Details
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col justify-between max-w-full min-w-0">
              {/* Presets - Wraps on Mobile cleanly */}
              <div className="space-y-1 max-w-full min-w-0">
                <span className="text-[11px] font-semibold text-muted-foreground">
                  Try 1-Click Samples:
                </span>
                <div className="flex flex-wrap gap-1.5 max-w-full min-w-0">
                  {presets.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setProductName(p.name);
                        setCategory(p.cat);
                        setKeyFeatures(p.features);
                        setTone(p.tone);
                      }}
                      className="px-2.5 py-1 rounded-lg border text-xs font-medium bg-background hover:bg-muted transition text-muted-foreground hover:text-foreground text-left max-w-full break-words"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 max-w-full min-w-0">
                <label className="text-xs font-semibold text-muted-foreground">Product Title:</label>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Wireless Headphones Pro"
                  className="text-xs bg-muted/20 h-9 rounded-xl max-w-full min-w-0"
                />
              </div>

              <div className="space-y-1 max-w-full min-w-0">
                <label className="text-xs font-semibold text-muted-foreground">Key Features & Benefits:</label>
                <Textarea
                  value={keyFeatures}
                  onChange={(e) => setKeyFeatures(e.target.value)}
                  placeholder="List key features..."
                  className="text-xs min-h-[80px] bg-muted/20 resize-none p-3 rounded-xl max-w-full min-w-0"
                />
              </div>

              {/* Tone & Marketplace Pills - Stack on Mobile for 100% Fit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs max-w-full min-w-0">
                <div className="space-y-1 max-w-full min-w-0">
                  <label className="font-semibold text-muted-foreground">Tone:</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-background border rounded-lg p-2 text-xs max-w-full min-w-0"
                  >
                    <option value="Luxury & Premium">Luxury & Premium</option>
                    <option value="Persuasive & Energetic">Persuasive</option>
                    <option value="Clean & Trustworthy">Clean & Trustworthy</option>
                  </select>
                </div>

                <div className="space-y-1 max-w-full min-w-0">
                  <label className="font-semibold text-muted-foreground">Platform:</label>
                  <select
                    value={marketplace}
                    onChange={(e) => setMarketplace(e.target.value)}
                    className="w-full bg-background border rounded-lg p-2 text-xs max-w-full min-w-0"
                  >
                    <option value="Shopify">Shopify</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Etsy">Etsy</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isProcessing || !productName.trim()}
                className="w-full gap-2 shadow-md rounded-xl font-semibold h-10 justify-center text-xs sm:text-sm mt-2 max-w-full min-w-0"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
                    <span>Generating Copy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 shrink-0" />
                    <span>Generate SEO Description</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Generated SEO Copy Card (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col max-w-full min-w-0">
          <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2 max-w-full min-w-0">
                <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-primary tracking-tight truncate min-w-0">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span className="truncate">Generated {marketplace} Copy</span>
                </CardTitle>

                {result && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleCopyText(
                        `${result.seoTitle}\n\n${result.hookIntro}\n\n${result.bulletPoints.join("\n")}\n\n${result.descriptionBody}`,
                        "Full Product Copy"
                      )
                    }
                    className="h-8 gap-1.5 text-xs rounded-lg shrink-0"
                  >
                    {copiedSection === "Full Product Copy" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copiedSection === "Full Product Copy" ? "Copied" : "Copy All"}
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between max-w-full min-w-0 overflow-hidden">
              {!result && !isProcessing && (
                <div className="flex-1 rounded-xl border border-dashed flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/10 space-y-3 min-h-[260px] max-w-full">
                  <Store className="h-8 w-8 opacity-40 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Click &quot;Generate SEO Description&quot;</p>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    Get instant bullet points, search tags, and high-converting product descriptions.
                  </p>
                </div>
              )}

              {result && (
                <div className="space-y-3 max-w-full min-w-0 overflow-y-auto max-h-[420px] pr-1">
                  {/* SEO Title */}
                  <div className="p-3 rounded-xl border bg-muted/20 space-y-1 max-w-full min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      SEO Optimized Title ({marketplace}):
                    </span>
                    <p className="font-semibold text-xs sm:text-sm text-foreground break-words">{result.seoTitle}</p>
                  </div>

                  {/* Hook Intro */}
                  <div className="p-3 rounded-xl border bg-muted/20 space-y-1 max-w-full min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Hook Paragraph:
                    </span>
                    <p className="text-xs text-foreground/90 leading-relaxed break-words">{result.hookIntro}</p>
                  </div>

                  {/* Key Feature Bullets */}
                  <div className="p-3 rounded-xl border bg-muted/20 space-y-1.5 max-w-full min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      High-Converting Bullet Points:
                    </span>
                    <div className="space-y-1 text-xs">
                      {result.bulletPoints.map((bullet, idx) => (
                        <p key={idx} className="leading-relaxed text-foreground/90 break-words">{bullet}</p>
                      ))}
                    </div>
                  </div>

                  {/* Search Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1 max-w-full min-w-0">
                    <Tag className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    {result.searchTags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5 max-w-full truncate">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
