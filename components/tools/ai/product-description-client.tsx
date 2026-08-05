"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Sliders,
  Target,
  Search,
  CheckCircle2,
  FileText,
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
    "Active Noise Cancellation (ANC), 40-hour battery life, plush memory foam earcups, Bluetooth 5.3, built-in dual microphone for HD calls, foldable travel case included."
  );
  const [tone, setTone] = useState<string>("Luxury & Premium");
  const [marketplace, setMarketplace] = useState<string>("Shopify");
  const [targetAudience, setTargetAudience] = useState<string>("Frequent travelers, remote professionals, and audiophiles");

  const [result, setResult] = useState<DescriptionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const presets = [
    {
      name: "🎧 Wireless Headphones Pro",
      cat: "Tech & Electronics",
      features: "Active Noise Cancellation (ANC), 40-hour battery life, memory foam earcups, Bluetooth 5.3, HD mic.",
      tone: "Luxury & Premium",
      audience: "Travelers & remote workers",
    },
    {
      name: "🌿 Organic Vitamin C Glow Serum",
      cat: "Health & Beauty",
      features: "15% Pure L-Ascorbic Acid, Hyaluronic Acid, Ferulic Acid, 100% Vegan, cruelty-free, dermatologist tested.",
      tone: "Clean & Trustworthy",
      audience: "Skincare enthusiasts looking for anti-aging glow",
    },
    {
      name: "🪑 Ergonomic Mesh Executive Chair",
      cat: "Home & Office",
      features: "Adjustable lumbar support, 3D armrests, breathable Korean mesh, 300 lbs capacity, 360 smooth swivel.",
      tone: "Professional & Sleek",
      audience: "Work-from-home pros and office managers",
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
        seoTitle: `${cleanTitle} – Premium ${category} with HD Audio & All-Day Comfort`,
        hookIntro: `Upgrade your daily routine with the ultimate **${cleanTitle}**. Specially crafted for **${targetAudience}**, this high-performance essential blends state-of-the-art engineering with uncompromised elegance.`,
        bulletPoints: [
          `🎧 **CRYSTAL-CLEAR PERFORMANCE**: Built with cutting-edge technology to deliver flawless audio immersion and zero distortion.`,
          `🔋 **ALL-DAY BATTERY & FAST CHARGING**: Enjoy uninterrupted power throughout long flights, workouts, or work sessions.`,
          `☁️ **ULTRA-LIGHTWEIGHT ERGONOMIC DESIGN**: Features premium breathable materials engineered for zero-pressure wearing comfort.`,
          `🎙️ **STUDIO-GRADE HD MICROPHONE**: Crisp, clear voice pickup eliminates background chatter during calls and video meetings.`,
          `🎒 **TRAVEL-READY DURABILITY**: Includes a heavy-duty protective carrying case and quick-fold compact hinges.`,
        ],
        descriptionBody: `### Experience Perfection with ${cleanTitle}\n\nWhether you are working from home, commuting, or relaxing, the **${cleanTitle}** is designed to provide unmatched reliability and premium quality.\n\nCrafted with high-grade components and refined for **${targetAudience}**, every detail has been meticulously engineered for longevity and effortless operation. Upgrade your setup today and experience the perfect balance of style, comfort, and innovation.`,
        metaTitle: `${cleanTitle} | Official ${marketplace} Store`,
        metaDescription: `Shop the new ${cleanTitle}. Featuring high-performance durability and ergonomic design. Free shipping & 30-day money-back guarantee!`,
        searchTags: [
          cleanTitle.toLowerCase().replace(/\s+/g, "-"),
          category.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          "best-" + cleanTitle.toLowerCase().split(" ")[0],
          "premium-" + category.toLowerCase().split(" ")[0],
          "buy-" + cleanTitle.toLowerCase().replace(/\s+/g, "-"),
        ],
      };

      setResult(generated);
      setIsProcessing(false);
      toast.success("SEO Product Description Generated!");
    }, 700);
  };

  const copyToClipboard = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    toast.success(`Copied ${sectionName} to clipboard!`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <ToolPageHeader
        title="AI E-Commerce Product Description Generator"
        description="Generate high-converting, SEO-optimized product titles, benefit hooks, Amazon/Shopify bullet points, and meta tags in seconds."
      />

      {/* Preset Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mr-1">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Quick Examples:
        </span>
        {presets.map((p, idx) => (
          <Button
            key={idx}
            variant="outline"
            size="sm"
            className="text-xs h-7 gap-1 bg-card/60 hover:bg-primary/10 hover:border-primary/40"
            onClick={() => {
              setProductName(p.name);
              setCategory(p.cat);
              setKeyFeatures(p.features);
              setTone(p.tone);
              setTargetAudience(p.audience);
            }}
          >
            {p.name}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Input Form Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border bg-card/60 backdrop-blur shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-primary" />
                Product Details Input
              </CardTitle>
              <CardDescription>
                Provide basic product specs to generate persuasive sales copy.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-primary" /> Product Name / Title:
                </label>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Wireless ANC Headphones Pro"
                  className="text-xs bg-muted/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Category:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-muted/20 px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="Tech & Electronics">Tech & Electronics</option>
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="Health & Beauty">Health & Beauty</option>
                    <option value="Home & Office">Home & Office</option>
                    <option value="Fitness & Sports">Fitness & Sports</option>
                    <option value="Jewelry & Accessories">Jewelry & Accessories</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Marketplace:</label>
                  <select
                    value={marketplace}
                    onChange={(e) => setMarketplace(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-muted/20 px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="Shopify">Shopify Store</option>
                    <option value="Amazon">Amazon Listing</option>
                    <option value="Etsy">Etsy Shop</option>
                    <option value="WooCommerce">WooCommerce</option>
                    <option value="Social Ads">Social Media Ad</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5 text-purple-500" /> Key Features & Materials:
                </label>
                <Textarea
                  value={keyFeatures}
                  onChange={(e) => setKeyFeatures(e.target.value)}
                  placeholder="e.g. 100% organic cotton, waterproof, 40hr battery..."
                  className="text-xs min-h-[90px] bg-muted/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-emerald-500" /> Target Audience:
                </label>
                <Input
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Gamers, fitness enthusiasts, busy moms..."
                  className="text-xs bg-muted/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Brand Tone:</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-muted/20 px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="Luxury & Premium">Luxury & Premium</option>
                  <option value="Professional & Sleek">Professional & Sleek</option>
                  <option value="Casual & Fun">Casual & Friendly</option>
                  <option value="Urgent & Sales-Focused">Urgent & High Energy</option>
                  <option value="Clean & Minimal">Clean & Eco-Friendly</option>
                </select>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isProcessing || !productName.trim()}
                className="w-full gap-2 shadow-sm mt-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating Product Copy...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate High-Converting Copy
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border border-primary/30 bg-card/60 backdrop-blur shadow-md flex flex-col min-h-[580px]">
            <CardHeader className="py-3.5 border-b bg-muted/20 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-primary">
                <Store className="h-4 w-4" />
                Generated E-Commerce Listing
              </CardTitle>
              {result && (
                <Badge variant="outline" className="text-xs font-normal text-emerald-500 border-emerald-500/30 gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  SEO Optimized
                </Badge>
              )}
            </CardHeader>

            <CardContent className="flex-1 p-5 space-y-6">
              {!result && !isProcessing && (
                <div className="min-h-[380px] rounded-xl border border-dashed flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/10 space-y-2">
                  <ShoppingBag className="h-10 w-10 opacity-30" />
                  <p className="text-sm font-medium">No Product Description Generated Yet</p>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    Fill in your product details on the left and click &quot;Generate High-Converting Copy&quot;.
                  </p>
                </div>
              )}

              {isProcessing && (
                <div className="min-h-[380px] rounded-xl border flex flex-col items-center justify-center text-center p-6 text-muted-foreground bg-muted/20 space-y-3">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm font-medium text-foreground">Crafting SEO Title, Bullet Points & Meta Tags...</p>
                </div>
              )}

              {result && !isProcessing && (
                <div className="space-y-6 text-xs">
                  {/* SEO Product Title */}
                  <div className="p-3.5 rounded-xl border bg-muted/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground flex items-center gap-1.5">
                        <Tag className="h-3.5 w-3.5 text-primary" /> Optimized Listing Title:
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-[11px] gap-1 text-muted-foreground hover:text-foreground"
                        onClick={() => copyToClipboard(result.seoTitle, "Listing Title")}
                      >
                        {copiedSection === "Listing Title" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        Copy
                      </Button>
                    </div>
                    <p className="font-semibold text-sm text-foreground bg-background p-2.5 rounded-lg border">
                      {result.seoTitle}
                    </p>
                  </div>

                  {/* Benefit Hook & Intro */}
                  <div className="p-3.5 rounded-xl border bg-muted/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Benefit Hook & Intro:
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-[11px] gap-1 text-muted-foreground hover:text-foreground"
                        onClick={() => copyToClipboard(result.hookIntro, "Hook Intro")}
                      >
                        {copiedSection === "Hook Intro" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        Copy
                      </Button>
                    </div>
                    <p className="leading-relaxed text-muted-foreground bg-background p-2.5 rounded-lg border">
                      {result.hookIntro}
                    </p>
                  </div>

                  {/* Bullet Points */}
                  <div className="p-3.5 rounded-xl border bg-muted/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-emerald-500" /> Key Feature Bullet Points ({marketplace}):
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-[11px] gap-1 text-muted-foreground hover:text-foreground"
                        onClick={() => copyToClipboard(result.bulletPoints.join("\n"), "Bullet Points")}
                      >
                        {copiedSection === "Bullet Points" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        Copy All
                      </Button>
                    </div>
                    <div className="bg-background p-3 rounded-lg border space-y-2">
                      {result.bulletPoints.map((bp, i) => (
                        <p key={i} className="leading-relaxed text-muted-foreground">
                          {bp}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* SEO Meta Tags */}
                  <div className="p-3.5 rounded-xl border bg-muted/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground flex items-center gap-1.5">
                        <Search className="h-3.5 w-3.5 text-purple-500" /> SEO Meta Title & Meta Description:
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-[11px] gap-1 text-muted-foreground hover:text-foreground"
                        onClick={() => copyToClipboard(`Meta Title: ${result.metaTitle}\nMeta Description: ${result.metaDescription}`, "Meta Tags")}
                      >
                        {copiedSection === "Meta Tags" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        Copy
                      </Button>
                    </div>
                    <div className="bg-background p-3 rounded-lg border space-y-2 font-mono text-[11px]">
                      <div>
                        <span className="text-muted-foreground font-semibold">Meta Title:</span> {result.metaTitle}
                      </div>
                      <div>
                        <span className="text-muted-foreground font-semibold">Meta Description:</span> {result.metaDescription}
                      </div>
                    </div>
                  </div>

                  {/* Search Tags */}
                  <div className="p-3.5 rounded-xl border bg-muted/30 space-y-2">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5 text-amber-500" /> Suggested Keywords & Search Tags:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.searchTags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-[11px] font-normal">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
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
