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
  Zap,
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
    "Active Noise Cancellation (ANC), 40-hour battery life, plush memory foam earcups, Bluetooth 5.3, dual mic."
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
          category.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          "best-" + cleanTitle.toLowerCase().split(" ")[0],
        ],
      };

      setResult(generated);
      setIsProcessing(false);
      toast.success("E-Commerce Description Generated!");
    }, 500);
  };

  const copyToClipboard = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    toast.success(`Copied ${sectionName}!`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
      <ToolPageHeader
        title="AI E-Commerce Product Description Studio"
        description="Generate high-converting, SEO-optimized product titles, benefit hooks, Amazon/Shopify bullet points, and meta tags in seconds."
      />

      {/* SINGLE VIEWPORT PRODUCT STUDIO WORKSPACE */}
      <div className="grid gap-6 lg:grid-cols-12 min-h-[500px]">
        {/* Left Column: Product Inputs & Presets (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-muted/20 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 tracking-tight">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                  Product Details
                </CardTitle>
                <Badge variant="outline" className="text-xs font-normal text-amber-500 border-amber-500/30 gap-1">
                  <Zap className="h-3 w-3" /> SEO Copy Studio
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-3">
              {/* Presets */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground">
                  Try 1-Click Product Presets:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
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
                      className="px-2.5 py-1 rounded-lg border text-xs font-medium bg-background hover:bg-muted transition text-muted-foreground hover:text-foreground"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Product Title:</label>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Wireless Headphones Pro"
                  className="text-xs bg-muted/20 h-9 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Key Features & Benefits:</label>
                <Textarea
                  value={keyFeatures}
                  onChange={(e) => setKeyFeatures(e.target.value)}
                  placeholder="List key features..."
                  className="text-xs min-h-[90px] bg-muted/20 resize-none p-3 rounded-xl"
                />
              </div>

              {/* Tone & Marketplace Pills */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-muted-foreground">Tone:</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-background border rounded-lg p-1.5 text-xs"
                  >
                    <option value="Luxury & Premium">Luxury & Premium</option>
                    <option value="Persuasive & Energetic">Persuasive</option>
                    <option value="Clean & Trustworthy">Clean & Trustworthy</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-muted-foreground">Platform:</label>
                  <select
                    value={marketplace}
                    onChange={(e) => setMarketplace(e.target.value)}
                    className="w-full bg-background border rounded-lg p-1.5 text-xs"
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
                className="w-full gap-2 shadow-md rounded-xl font-semibold"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating Copy...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate SEO Description
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Generated SEO Copy Card (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-muted/20 pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-primary tracking-tight">
                  <CheckCircle2 className="h-4 w-4" />
                  Generated {marketplace} Copy
                </CardTitle>

                {result && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(result.descriptionBody, "Full Copy")}
                    className="h-8 gap-1.5 text-xs rounded-lg"
                  >
                    {copiedSection === "Full Copy" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedSection === "Full Copy" ? "Copied" : "Copy All"}
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-3 overflow-y-auto max-h-[380px]">
              {isProcessing ? (
                <div className="flex-1 rounded-xl border flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/20 space-y-3 min-h-[300px]">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm font-semibold text-foreground">Crafting SEO Title, Hooks & Amazon Bullets...</p>
                </div>
              ) : result ? (
                <div className="space-y-3 text-xs">
                  {/* Title */}
                  <div className="p-3 rounded-xl border bg-muted/20 space-y-1">
                    <span className="font-semibold text-primary flex items-center gap-1">
                      <Tag className="h-3 w-3" /> Optimized Product Title:
                    </span>
                    <p className="font-medium text-foreground">{result.seoTitle}</p>
                  </div>

                  {/* Bullet Points */}
                  <div className="p-3 rounded-xl border bg-muted/20 space-y-1.5">
                    <span className="font-semibold text-foreground">Amazon / Shopify Key Bullets:</span>
                    <ul className="space-y-1 list-disc pl-4 text-muted-foreground">
                      {result.bulletPoints.map((bp, i) => (
                        <li key={i}>{bp}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Meta Tags */}
                  <div className="p-3 rounded-xl border bg-emerald-500/10 border-emerald-500/20 space-y-1">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Meta Description (Search Snippet):</span>
                    <p className="text-muted-foreground">{result.metaDescription}</p>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
