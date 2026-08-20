"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolBackground } from "@/components/shared/tool-background";
import { ShareResultButton } from "@/components/shared/share-result-modal";
import { EmbedButton } from "@/components/shared/embed-modal";
import { cn } from "@/lib/utils";
import {
  Sparkles, Copy, Check, Search, Type, Wand2, RefreshCw, Flame,
  Crown, Swords, Zap, Heart, Filter
} from "lucide-react";
import toast from "react-hot-toast";
import { ALL_FANCY_STYLES, FancyCategory, FancyStyle } from "@/lib/utils/text/fancy-text-styles";

const CATEGORIES: { id: "all" | FancyCategory; label: string; icon: any }[] = [
  { id: "all", label: `All Styles (${ALL_FANCY_STYLES.length})`, icon: Sparkles },
  { id: "popular", label: "🔥 Popular", icon: Flame },
  { id: "fonts", label: "🔤 Typography & Modifiers", icon: Type },
  { id: "aesthetic", label: "🌸 Soft Aesthetic & Bios", icon: Heart },
  { id: "gaming", label: "⚔️ Gaming & Clan Tags", icon: Swords },
  { id: "glitch", label: "🌀 Glitch & Zalgo", icon: Zap },
  { id: "decorative", label: "✨ Decorative Frames", icon: Crown },
];

const PRESET_PHRASES = [
  "Hello World",
  "Stay Creative",
  "Gamer Pro 2026",
  "aesthetic vibes",
  "Digital Creator",
  "VIP Champion",
];

export default function FancyTextClient() {
  const [input, setInput] = useState("Hello World");
  const [activeCategory, setActiveCategory] = useState<"all" | FancyCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter styles by category and search term
  const filteredStyles = useMemo(() => {
    return ALL_FANCY_STYLES.filter((style) => {
      const matchesCategory = activeCategory === "all" || style.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        style.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCopy = (id: string, text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => {
      setCopiedId((curr) => (curr === id ? null : curr));
    }, 2000);
  };

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Page Header */}
        <ToolPageHeader
          title="100+ Fancy Text Generator & Font Styler"
          description="Convert normal text into 100+ stylish Unicode fonts, aesthetic cursive, bold serif, gaming clan tags, zalgo glitch, and decorative social media frames."
          icon={Sparkles}
          badgeText="✨ 105+ Unicode Styles • 100% Free & Fast"
        />

        {/* Input & Controls Glass Card */}
        <GlassCard className="p-5 sm:p-6 space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <Label className="text-sm font-bold text-foreground flex items-center gap-2">
              <Type className="w-4 h-4 text-primary" /> Enter Your Text
            </Label>
            
            {/* Quick Sample Presets */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground font-semibold">Try sample:</span>
              {PRESET_PHRASES.map((phrase, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setInput(phrase)}
                  className="text-[11px] bg-muted/50 hover:bg-primary/10 hover:text-primary text-muted-foreground px-2 py-0.5 rounded-md border border-border/60 transition-all cursor-pointer"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>

          {/* Main Large Text Input */}
          <div className="relative">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your text to generate 100+ styles instantly..."
              className="h-14 text-base sm:text-lg px-4 font-semibold rounded-2xl border-border bg-background/80 focus:ring-2 focus:ring-primary/40 shadow-inner"
            />
            {input && (
              <button
                type="button"
                onClick={() => setInput("")}
                className="absolute right-3.5 top-3.5 text-xs text-muted-foreground hover:text-foreground bg-muted/60 hover:bg-muted p-1.5 rounded-lg transition-all"
              >
                Clear
              </button>
            )}
          </div>

          {/* Search & Category Tabs */}
          <div className="space-y-3 pt-2 border-t border-border/60">
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted/40 hover:bg-muted/80 text-muted-foreground hover:text-foreground border border-border/40"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Filter */}
              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Filter 100+ styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 pl-9 text-xs rounded-xl bg-background border-border"
                />
              </div>
            </div>

          </div>

        </GlassCard>

        {/* Results Counter & Actions Bar */}
        <div className="flex items-center justify-between px-1">
          <div className="text-xs font-bold text-muted-foreground">
            Showing <span className="text-foreground">{filteredStyles.length}</span> styles for &ldquo;{input || "Empty"}&rdquo;
          </div>
          <div className="flex items-center gap-2">
            <ShareResultButton
              toolTitle="100+ Fancy Text Generator"
              resultTitle="Generated 100+ Fancy Unicode Text Styles"
              resultSummary={`Stylized "${input}" into 100+ aesthetic fonts, gaming tags, and decorated frames.`}
              resultMetrics={[
                { label: "Total Styles", value: ALL_FANCY_STYLES.length },
                { label: "Active View", value: `${filteredStyles.length} styles` },
              ]}
            />
            <EmbedButton toolPath="/tools/text/fancy-text" toolTitle="100+ Fancy Text Generator" />
          </div>
        </div>

        {/* 100+ Styles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredStyles.map((style) => {
            const transformed = input ? style.transform(input) : style.name;
            const isCopied = copiedId === style.id;

            return (
              <div
                key={style.id}
                className="group relative rounded-2xl border border-border/70 bg-card/60 hover:bg-card/95 hover:border-primary/40 backdrop-blur-md p-4 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between gap-3"
              >
                {/* Header */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                    {style.name}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider opacity-60 bg-muted px-1.5 py-0.5 rounded">
                    {style.category}
                  </span>
                </div>

                {/* Styled Text Output Display */}
                <div className="py-2 px-3 rounded-xl bg-muted/30 border border-border/40 min-h-[56px] flex items-center text-foreground text-sm sm:text-base font-normal break-all select-all">
                  {transformed}
                </div>

                {/* Copy Action Button */}
                <Button
                  type="button"
                  variant={isCopied ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCopy(style.id, transformed)}
                  className={cn(
                    "w-full h-9 rounded-xl font-bold text-xs gap-1.5 transition-all cursor-pointer",
                    isCopied
                      ? "bg-emerald-600 hover:bg-emerald-600 text-white border-emerald-600"
                      : "hover:bg-primary/10 hover:text-primary hover:border-primary/40"
                  )}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Style</span>
                    </>
                  )}
                </Button>
              </div>
            );
          })}
        </div>

        {filteredStyles.length === 0 && (
          <div className="p-12 text-center bg-muted/20 border border-border rounded-2xl space-y-3">
            <Sparkles className="w-8 h-8 text-muted-foreground mx-auto" />
            <p className="text-sm font-semibold text-foreground">No styles matched your search &ldquo;{searchQuery}&rdquo;</p>
            <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
              Reset Filters
            </Button>
          </div>
        )}

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Enter Your Text", description: "Type any word, gamer name, social bio, or message in the input box." },
            { step: "2", title: "Instant 100+ Conversions", description: "Our engine maps characters into full UTF-8 Unicode fonts, diacritic modifiers, and aesthetic frames in real-time." },
            { step: "3", title: "1-Click Copy & Paste", description: "Click Copy on any card to paste directly into Instagram, TikTok, Discord, X (Twitter), Facebook, or WhatsApp." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "105+ Unique Font Styles", description: "From clean mathematical bold sans to aesthetic cursive, medieval gothic, and gaming clan tags." },
            { title: "100% Social Media Compatible", description: "All styles use standard universal Unicode symbols supported on iOS, Android, macOS, and Windows." },
            { title: "Instant Search & Filtering", description: "Quickly filter by category (Gaming, Aesthetic, Glitch, Decorative) or search by style name." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "Where can I use these fancy text fonts?", answer: "You can copy and paste them everywhere Unicode is supported, including Instagram bios, TikTok captions, Discord nicknames, Twitter/X tweets, WhatsApp status, and YouTube comments." },
            { question: "Why do some fonts look different on different devices?", answer: "Unicode symbols are rendered by your device's native system fonts (Apple San Francisco, Google Roboto, Windows Segoe UI). While the characters are universally identical, minor visual styling varies slightly per operating system." },
            { question: "Are these characters safe for gaming usernames?", answer: "Yes! Most online games (Steam, Roblox, PUBG, Free Fire, Valorant) support Unicode characters and symbols for clan tags and gamertags." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/text/fancy-text" />

      </div>
    </div>
  );
}
