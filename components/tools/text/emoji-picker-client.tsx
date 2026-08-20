"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { ShareResultButton } from "@/components/shared/share-result-modal";
import { EmbedButton } from "@/components/shared/embed-modal";
import { cn } from "@/lib/utils";
import {
  Smile, Search, Copy, Check, Trash2, Sparkles, Heart,
  Star, Type, Info, Zap, Layers, RefreshCw, X, ChevronRight
} from "lucide-react";
import toast from "react-hot-toast";
import {
  COMPREHENSIVE_EMOJI_DB,
  EMOJI_CATEGORIES,
  EmojiItem,
} from "@/lib/utils/text/emoji-database";

export default function EmojiPickerClient() {
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [recent, setRecent] = useState<EmojiItem[]>([]);
  const [basket, setBasket] = useState<string>("");
  const [hoveredEmoji, setHoveredEmoji] = useState<EmojiItem | null>(null);
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);
  const [basketCopied, setBasketCopied] = useState<boolean>(false);

  // Load recently used emojis from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("toolzium_recent_emojis");
      if (stored) {
        setRecent(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const saveRecent = useCallback((item: EmojiItem) => {
    setRecent((prev) => {
      const filtered = prev.filter((r) => r.emoji !== item.emoji);
      const updated = [item, ...filtered].slice(0, 24);
      try {
        localStorage.setItem("toolzium_recent_emojis", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  }, []);

  const handleCopySingle = (item: EmojiItem) => {
    navigator.clipboard.writeText(item.emoji);
    setCopiedEmoji(item.emoji);
    toast.success(`Copied ${item.emoji} (${item.name}) to clipboard!`);
    saveRecent(item);
    setTimeout(() => setCopiedEmoji(null), 1500);
  };

  const handleAddToBasket = (item: EmojiItem) => {
    setBasket((prev) => prev + item.emoji);
    saveRecent(item);
  };

  const handleCopyBasket = () => {
    if (!basket) return;
    navigator.clipboard.writeText(basket);
    setBasketCopied(true);
    toast.success("Emoji string copied to clipboard!");
    setTimeout(() => setBasketCopied(false), 2000);
  };

  // Filter emojis based on category and search query
  const filteredEmojis = useMemo(() => {
    const q = search.trim().toLowerCase();
    return COMPREHENSIVE_EMOJI_DB.filter((item) => {
      const matchCat =
        selectedCategory === "All" || item.category === selectedCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q) ||
        item.emoji.includes(q) ||
        item.codePoint.toLowerCase().includes(q)
      );
    });
  }, [search, selectedCategory]);

  // Group filtered results by category for clean section headers
  const groupedEmojis = useMemo(() => {
    if (selectedCategory !== "All" || search.trim()) {
      return { [search.trim() ? "Search Results" : selectedCategory]: filteredEmojis };
    }
    const map: Record<string, EmojiItem[]> = {};
    for (const item of COMPREHENSIVE_EMOJI_DB) {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    }
    return map;
  }, [filteredEmojis, selectedCategory, search]);

  return (
    <div className="min-h-screen relative pb-20">
      <ToolBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        
        {/* Page Header */}
        <ToolPageHeader
          title="Unicode Emoji Keyboard & Symbol Search"
          description="Explore and copy 1,200+ Unicode emojis across all 9 official categories with instant search, code point inspector, and custom emoji string composer."
          icon={Smile}
          badgeText="✨ 1,200+ Complete Unicode 15.0 Emojis"
        />

        {/* Top Controls: Search Bar & Multi-Emoji Composer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Search & Category Filter (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <GlassCard className="p-4 sm:p-5 space-y-4">
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search 1,200+ emojis (e.g. fire, rocket, smile, heart, flag, car)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-11 text-sm bg-background border-border text-foreground font-medium rounded-xl"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Pills Bar */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {EMOJI_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSearch("");
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-xl font-bold whitespace-nowrap flex-shrink-0 transition-all cursor-pointer border text-xs",
                      selectedCategory === cat && !search
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-muted/40 text-muted-foreground border-border/60 hover:bg-background hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </GlassCard>
          </div>

          {/* Emoji String Composer Basket (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <GlassCard className="p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" /> Emoji Composer
                </Label>
                {basket && (
                  <button
                    type="button"
                    onClick={() => setBasket("")}
                    className="text-[10px] text-muted-foreground hover:text-destructive flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>

              {/* Composer Box */}
              <div className="min-h-[50px] p-2.5 bg-background/80 border border-border rounded-xl flex items-center justify-between gap-2 overflow-x-auto">
                <div className="text-2xl tracking-wide select-all font-sans">
                  {basket || <span className="text-xs text-muted-foreground font-sans">Click &ldquo;+&rdquo; or click emoji to build sentence...</span>}
                </div>
              </div>

              {/* Composer Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={handleCopyBasket}
                  disabled={!basket}
                  className="flex-1 rounded-xl text-xs font-bold gap-1.5 h-9 bg-primary text-primary-foreground shadow-sm"
                >
                  {basketCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{basketCopied ? "Copied All!" : "Copy String"}</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setBasket((prev) => prev + " ")}
                  disabled={!basket}
                  className="rounded-xl text-xs font-semibold h-9 px-3"
                  title="Insert space"
                >
                  Space
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setBasket((prev) => prev.slice(0, -2))}
                  disabled={!basket}
                  className="rounded-xl text-xs font-semibold h-9 px-3"
                  title="Backspace"
                >
                  ⌫
                </Button>
              </div>
            </GlassCard>
          </div>

        </div>

        {/* Recently Used Bar */}
        {recent.length > 0 && !search.trim() && selectedCategory === "All" && (
          <GlassCard className="p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Recently Used
              </h3>
              <span className="text-[11px] font-mono text-muted-foreground">{recent.length} emojis</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {recent.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleCopySingle(item)}
                  onMouseEnter={() => setHoveredEmoji(item)}
                  className="h-11 w-11 text-2xl flex items-center justify-center bg-background/80 hover:bg-primary/20 hover:scale-110 rounded-xl border border-border/60 shadow-sm transition-all cursor-pointer"
                  title={`${item.name} - Click to copy`}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Main Emoji Grid Grouped by Category */}
        <div className="space-y-6">
          {Object.entries(groupedEmojis).map(([category, emojis]) => {
            if (emojis.length === 0) return null;
            return (
              <GlassCard key={category} className="p-5 sm:p-6 space-y-4">
                
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <span className="text-primary font-mono">•</span>
                    <span>{category}</span>
                  </h3>
                  <span className="text-xs font-mono font-semibold text-muted-foreground bg-muted/60 px-2.5 py-0.5 rounded-lg">
                    {emojis.length} emojis
                  </span>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-14 gap-2">
                  {emojis.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCopySingle(item)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        handleAddToBasket(item);
                      }}
                      onMouseEnter={() => setHoveredEmoji(item)}
                      className={cn(
                        "h-12 w-12 text-2xl sm:text-3xl flex items-center justify-center rounded-xl border border-border/60 transition-all cursor-pointer relative group",
                        copiedEmoji === item.emoji
                          ? "bg-emerald-500/20 border-emerald-500 scale-110 shadow-md"
                          : "bg-background/70 hover:bg-primary/15 hover:border-primary/50 hover:scale-110"
                      )}
                      title={`${item.name} | Click to copy | Right-click to compose`}
                    >
                      {item.emoji}
                      {copiedEmoji === item.emoji && (
                        <span className="absolute -top-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>

              </GlassCard>
            );
          })}

          {filteredEmojis.length === 0 && (
            <GlassCard className="p-12 text-center space-y-3">
              <Smile className="w-12 h-12 text-muted-foreground/50 mx-auto" />
              <div className="text-base font-bold text-foreground">No emojis found</div>
              <p className="text-xs text-muted-foreground">
                No matching emojis found for &ldquo;{search}&rdquo;. Try another keyword or browse categories.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="rounded-xl text-xs font-semibold"
              >
                Reset Search
              </Button>
            </GlassCard>
          )}
        </div>

        {/* Hover Inspector Card */}
        {hoveredEmoji && (
          <div className="fixed bottom-6 right-6 z-50 p-3 bg-card/90 backdrop-blur-md border border-border/80 shadow-2xl rounded-2xl max-w-xs flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
            <span className="text-4xl">{hoveredEmoji.emoji}</span>
            <div className="space-y-0.5 text-xs font-mono">
              <div className="font-bold text-foreground font-sans capitalize text-xs">
                {hoveredEmoji.name}
              </div>
              <div className="text-[10px] text-primary font-bold">
                {hoveredEmoji.codePoint}
              </div>
              <div className="text-[10px] text-muted-foreground">
                Category: {hoveredEmoji.category}
              </div>
            </div>
          </div>
        )}

        {/* Share & Embed Bar */}
        <GlassCard className="p-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground font-medium">
            1,200+ Unicode 15.0 Emojis • 100% Free & Client-Side
          </span>
          <div className="flex items-center gap-2">
            <ShareResultButton
              toolTitle="Unicode Emoji Keyboard"
              resultTitle="Emoji Collection"
              resultSummary="Browse and copy over 1,200+ Unicode emojis with Toolzium."
              resultMetrics={[
                { label: "Total Emojis", value: COMPREHENSIVE_EMOJI_DB.length },
                { label: "Categories", value: EMOJI_CATEGORIES.length - 1 },
              ]}
            />
            <EmbedButton toolPath="/tools/text/emoji-picker" toolTitle="Unicode Emoji Keyboard" />
          </div>
        </GlassCard>

        {/* How It Works & Guides */}
        <ToolHowItWorks
          steps={[
            { step: "1", title: "Search or Browse", description: "Filter 1,200+ emojis across 9 categories or type keywords in the live search bar." },
            { step: "2", title: "1-Click Copy or Compose", description: "Click any emoji to copy instantly, or right-click to build multi-emoji strings in the composer." },
            { step: "3", title: "Paste Anywhere", description: "Paste directly into Slack, Discord, Twitter, Instagram, code files, or documents." }
          ]}
        />

        <ToolFeatureGuides
          features={[
            { title: "Complete Unicode 15.0 Set", description: "Access over 1,200+ symbols including Smileys, Gestures, Animals, Food, Travel, Activities, Objects, Symbols, and Country Flags." },
            { title: "Code Point Inspector", description: "Hover over any emoji to inspect its official Unicode name and hexadecimal code point." },
            { title: "Recent History & Privacy", description: "Your favorite emojis are preserved locally in your browser with zero tracking or telemetry." }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            { question: "How many emojis are in this picker?", answer: "This picker contains over 1,200+ official Unicode emojis covering all 9 major categories, including the latest additions." },
            { question: "Can I copy multiple emojis together?", answer: "Yes! Use the Emoji Composer at the top to click and chain multiple emojis into a sentence, then click 'Copy String'." },
            { question: "Why do some emojis look slightly different on my device?", answer: "Emoji characters are defined by Unicode standards, but each OS vendor (Apple, Google, Microsoft, Samsung) renders them using their own artwork." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/text/emoji-picker" />

      </div>
    </div>
  );
}
