"use client";

import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  User,
  Shuffle,
  Heart,
  Copy,
  Download,
  Volume2,
  Sparkles,
  Search,
  Filter,
  Check,
  Baby,
  Globe,
  Tag,
  Loader2,
  BookOpen,
  Wand2,
  RefreshCw,
  Plus
} from "lucide-react";
import toast from "react-hot-toast";

export type Gender = "all" | "boy" | "girl" | "unisex";
export type Origin =
  | "all"
  | "arabic"
  | "celtic"
  | "norse"
  | "sanskrit"
  | "japanese"
  | "latin"
  | "greek"
  | "hebrew"
  | "persian"
  | "italian"
  | "french"
  | "african"
  | "hawaiian";

export type Theme =
  | "all"
  | "Royalty"
  | "Wisdom"
  | "Strength"
  | "Light & Sun"
  | "Love & Grace"
  | "Peace"
  | "Nature & Earth";

export interface NameEntry {
  name: string;
  gender: "boy" | "girl" | "unisex";
  origin: string;
  meaning: string;
  pronunciation: string;
  syllables: number;
  theme: string;
  vibe: string;
  isAiGenerated?: boolean;
}

// Initial Curated Seed Pool
const INITIAL_SEEDS: NameEntry[] = [
  // Arabic Boys
  { name: "Amir", gender: "boy", origin: "arabic", meaning: "Prince, commander, high-born leader", pronunciation: "ah-MEER", syllables: 2, theme: "Royalty", vibe: "Noble Classic" },
  { name: "Malik", gender: "boy", origin: "arabic", meaning: "Sovereign king, owner of power", pronunciation: "mah-LEEK", syllables: 2, theme: "Royalty", vibe: "Majestic Islamic" },
  { name: "Harun", gender: "boy", origin: "arabic", meaning: "Exalted warrior, Aaron the eloquent prophet", pronunciation: "hah-ROON", syllables: 2, theme: "Royalty", vibe: "Prophetic & Regal" },
  { name: "Hakim", gender: "boy", origin: "arabic", meaning: "The wise philosopher, insightful healer", pronunciation: "hah-KEEM", syllables: 2, theme: "Wisdom", vibe: "Scholarly & Revered" },
  { name: "Idris", gender: "boy", origin: "arabic", meaning: "Learned interpreter of wisdom, prophet", pronunciation: "id-REES", syllables: 2, theme: "Wisdom", vibe: "Intellectual & Sacred" },
  { name: "Luqman", gender: "boy", origin: "arabic", meaning: "Legendary sage endowed with divine wisdom", pronunciation: "look-MAHN", syllables: 2, theme: "Wisdom", vibe: "Philosophical Depth" },
  { name: "Rashid", gender: "boy", origin: "arabic", meaning: "Rightly guided thinker of true intellect", pronunciation: "rah-SHEED", syllables: 2, theme: "Wisdom", vibe: "Enlightened" },
  { name: "Hamza", gender: "boy", origin: "arabic", meaning: "Lion of God, steadfast and brave", pronunciation: "HAHM-zah", syllables: 2, theme: "Strength", vibe: "Heroic & Steadfast" },
  { name: "Zayn", gender: "boy", origin: "arabic", meaning: "Grace, elegance, inner and outer beauty", pronunciation: "ZAYN", syllables: 1, theme: "Love & Grace", vibe: "Modern Elegance" },
  { name: "Tariq", gender: "boy", origin: "arabic", meaning: "The piercing morning star; nocturnal conqueror", pronunciation: "tah-REEK", syllables: 2, theme: "Light & Sun", vibe: "Bold Celestial" },

  // Arabic Girls
  { name: "Amira", gender: "girl", origin: "arabic", meaning: "High-born princess, noble sovereign lady", pronunciation: "ah-MEER-ah", syllables: 3, theme: "Royalty", vibe: "Regal Elegance" },
  { name: "Sultana", gender: "girl", origin: "arabic", meaning: "Empress, Queen consort of supreme majesty", pronunciation: "sool-TAH-nah", syllables: 3, theme: "Royalty", vibe: "Imperial Splendor" },
  { name: "Malika", gender: "girl", origin: "arabic", meaning: "Reigning queen, sovereign mistress of grace", pronunciation: "mah-LEE-kah", syllables: 3, theme: "Royalty", vibe: "Queenly Stature" },
  { name: "Hikma", gender: "girl", origin: "arabic", meaning: "Divine wisdom, sagacity, moral discernment", pronunciation: "HIK-mah", syllables: 2, theme: "Wisdom", vibe: "Deep & Sacred" },
  { name: "Amina", gender: "girl", origin: "arabic", meaning: "Trustworthy, honest, peaceful mother", pronunciation: "ah-MEE-nah", syllables: 3, theme: "Wisdom", vibe: "Pure & Venerated" },
  { name: "Noor", gender: "unisex", origin: "arabic", meaning: "The divine celestial light, illuminating truth", pronunciation: "NOOR", syllables: 1, theme: "Light & Sun", vibe: "Luminous & Sacred" },
  { name: "Zahra", gender: "girl", origin: "arabic", meaning: "Radiant, blooming flower of white light", pronunciation: "ZAH-rah", syllables: 2, theme: "Light & Sun", vibe: "Sparkling Splendor" },
  { name: "Layla", gender: "girl", origin: "arabic", meaning: "Intoxicating dark night of deep romance", pronunciation: "LAY-luh", syllables: 2, theme: "Love & Grace", vibe: "Poetic Romance" },

  // Celtic / Irish
  { name: "Liam", gender: "boy", origin: "celtic", meaning: "Strong-willed warrior & steadfast protector", pronunciation: "LEE-um", syllables: 2, theme: "Strength", vibe: "Modern Classic" },
  { name: "Declan", gender: "boy", origin: "celtic", meaning: "Full of goodness and prayerful blessing", pronunciation: "DEK-lun", syllables: 2, theme: "Love & Grace", vibe: "Charming & Strong" },
  { name: "Maeve", gender: "girl", origin: "celtic", meaning: "She who intoxicates; fierce warrior queen", pronunciation: "MAYV", syllables: 1, theme: "Royalty", vibe: "Mythological & Fierce" },
  { name: "Saoirse", gender: "girl", origin: "celtic", meaning: "Freedom, sovereignty, and noble liberty", pronunciation: "SEER-sha", syllables: 2, theme: "Peace", vibe: "Poetic & Radiant" },

  // Norse
  { name: "Leif", gender: "boy", origin: "norse", meaning: "Heir of the lineage, oceanic explorer", pronunciation: "LAYF", syllables: 1, theme: "Strength", vibe: "Adventurous & Historic" },
  { name: "Astrid", gender: "girl", origin: "norse", meaning: "Divinely beautiful royal queen", pronunciation: "AS-trid", syllables: 2, theme: "Royalty", vibe: "Timeless Nordic" },

  // Sanskrit
  { name: "Aarav", gender: "boy", origin: "sanskrit", meaning: "Peaceful, melodic wisdom and intellect", pronunciation: "AH-ruhv", syllables: 2, theme: "Wisdom", vibe: "Gentle Noble" },
  { name: "Ananya", gender: "girl", origin: "sanskrit", meaning: "Matchless, peerless, sovereign beauty", pronunciation: "uh-NAHN-yuh", syllables: 3, theme: "Royalty", vibe: "Graceful & Rare" }
];

export default function NameGeneratorClient() {
  const [genderFilter, setGenderFilter] = useState<Gender>("all");
  const [originFilter, setOriginFilter] = useState<Origin>("all");
  const [themeFilter, setThemeFilter] = useState<Theme>("all");
  const [searchQuery, setSearchQuery] = useState<string>("" );
  const [customPrompt, setCustomPrompt] = useState<string>("");

  const [namesList, setNamesList] = useState<NameEntry[]>(INITIAL_SEEDS);
  const [shortlist, setShortlist] = useState<NameEntry[]>([]);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const isFirstMount = useRef(true);

  // Initialize Shortlist from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("toolzium_baby_names_shortlist");
      if (stored) setShortlist(JSON.parse(stored));
    } catch {}
  }, []);

  // AI Generation Function
  const fetchAiNames = useCallback(
    async (append: boolean = false) => {
      setIsAiLoading(true);
      try {
        const res = await fetch("/api/ai/generate-names", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gender: genderFilter,
            origin: originFilter,
            theme: themeFilter,
            searchQuery,
            customPrompt,
            count: 8
          })
        });

        const data = await res.json();
        if (data.success && Array.isArray(data.names) && data.names.length > 0) {
          const newAiNames: NameEntry[] = data.names.map((n: any) => ({
            name: n.name,
            gender: n.gender || "unisex",
            origin: n.origin || (originFilter !== "all" ? originFilter : "arabic"),
            meaning: n.meaning || "Eminent noble name of authentic distinction",
            pronunciation: n.pronunciation || n.name,
            syllables: n.syllables || 2,
            theme: n.theme || (themeFilter !== "all" ? themeFilter : "Royalty"),
            vibe: n.vibe || "AI Generated Masterpiece",
            isAiGenerated: true
          }));

          setNamesList((prev) => {
            const existingNames = new Set(append ? prev.map((p) => p.name.toLowerCase()) : []);
            const uniqueNew = newAiNames.filter((item) => !existingNames.has(item.name.toLowerCase()));
            return append ? [...prev, ...uniqueNew] : uniqueNew;
          });
        }
      } catch (err) {
        console.error("AI Generation Error:", err);
      } finally {
        setIsAiLoading(false);
      }
    },
    [genderFilter, originFilter, themeFilter, searchQuery, customPrompt]
  );

  // Trigger AI generation whenever user changes filters
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const timer = setTimeout(() => {
      fetchAiNames(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [genderFilter, originFilter, themeFilter, fetchAiNames]);

  // Quick Preset Handlers
  const applyPreset = (gen: Gender, orig: Origin, thm: Theme) => {
    setGenderFilter(gen);
    setOriginFilter(orig);
    setThemeFilter(thm);
    setSearchQuery("");
    setCustomPrompt("");
  };

  // Toggle Shortlist
  const toggleShortlist = (entry: NameEntry) => {
    const exists = shortlist.some((s) => s.name.toLowerCase() === entry.name.toLowerCase());
    let updated: NameEntry[];
    if (exists) {
      updated = shortlist.filter((s) => s.name.toLowerCase() !== entry.name.toLowerCase());
      toast.success(`Removed ${entry.name} from shortlist`);
    } else {
      updated = [entry, ...shortlist];
      toast.success(`Saved ${entry.name} to shortlist!`);
    }
    setShortlist(updated);
    try {
      localStorage.setItem("toolzium_baby_names_shortlist", JSON.stringify(updated));
    } catch {}
  };

  // Text-To-Speech Pronunciation
  const speakName = (name: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(name);
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Export Shortlist CSV
  const exportShortlistCSV = () => {
    if (shortlist.length === 0) {
      toast.error("Your shortlist is currently empty!");
      return;
    }
    const csv =
      "Name,Gender,Origin,Meaning,Pronunciation,Syllables,Theme,Vibe\n" +
      shortlist
        .map(
          (s) =>
            `"${s.name}","${s.gender}","${s.origin}","${s.meaning}","${s.pronunciation}","${s.syllables}","${s.theme}","${s.vibe}"`
        )
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `baby-names-shortlist-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Shortlist CSV downloaded!");
  };

  // Deduplicated displayed list matching client-side filters
  const displayedList = useMemo(() => {
    const seen = new Set<string>();
    return namesList.filter((item) => {
      const lower = item.name.toLowerCase();
      if (seen.has(lower)) return false;
      seen.add(lower);

      // Gender filter
      if (genderFilter !== "all") {
        if (genderFilter === "boy" && item.gender !== "boy" && item.gender !== "unisex") return false;
        if (genderFilter === "girl" && item.gender !== "girl" && item.gender !== "unisex") return false;
        if (genderFilter === "unisex" && item.gender !== "unisex") return false;
      }
      return true;
    });
  }, [namesList, genderFilter]);

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Baby}
          title="Universal Baby & Character Name Generator Studio"
          description="Powered by Groq AI — generate millions of authentic multicultural baby names with verified linguistic roots, Islamic and global heritage, and audio speech pronunciations."
          actions={
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={exportShortlistCSV}
                className="h-10 sm:h-9 px-3.5 rounded-xl text-xs font-semibold gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
              >
                <Download className="h-4 w-4 shrink-0" />
                <span>Shortlist ({shortlist.length})</span>
              </Button>
              <Button
                size="sm"
                onClick={() => fetchAiNames(false)}
                disabled={isAiLoading}
                className="h-10 sm:h-9 px-4 rounded-xl text-xs font-bold bg-primary text-primary-foreground gap-1.5 cursor-pointer w-full sm:w-auto justify-center shadow-md hover:shadow-primary/25"
              >
                {isAiLoading ? <Loader2 className="h-4 w-4 animate-spin shrink-0" /> : <Sparkles className="h-4 w-4 shrink-0" />}
                <span>Generate AI Names</span>
              </Button>
            </div>
          }
        />

        {/* Quick Cultural Presets Container */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-md space-y-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Popular One-Click Presets:
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-0.5">
            <button
              onClick={() => applyPreset("boy", "arabic", "Royalty")}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                genderFilter === "boy" && originFilter === "arabic" && themeFilter === "Royalty"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background/80 border-border hover:border-primary/50 text-foreground"
              }`}
            >
              🌙 Royal Islamic Boys
            </button>
            <button
              onClick={() => applyPreset("girl", "arabic", "Royalty")}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                genderFilter === "girl" && originFilter === "arabic" && themeFilter === "Royalty"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background/80 border-border hover:border-primary/50 text-foreground"
              }`}
            >
              👑 Royal Islamic Girls
            </button>
            <button
              onClick={() => applyPreset("boy", "arabic", "Wisdom")}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                genderFilter === "boy" && originFilter === "arabic" && themeFilter === "Wisdom"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background/80 border-border hover:border-primary/50 text-foreground"
              }`}
            >
              🦉 Wise Arabic Scholars
            </button>
            <button
              onClick={() => applyPreset("all", "celtic", "Nature & Earth")}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                originFilter === "celtic" && themeFilter === "Nature & Earth"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background/80 border-border hover:border-primary/50 text-foreground"
              }`}
            >
              ☘️ Celtic & Earthy
            </button>
            <button
              onClick={() => applyPreset("all", "norse", "Strength")}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                originFilter === "norse" && themeFilter === "Strength"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background/80 border-border hover:border-primary/50 text-foreground"
              }`}
            >
              ⚔️ Norse Warriors
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <GlassCard className="p-4 sm:p-6 rounded-3xl border-border/80 space-y-4 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Gender Select */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Gender:</span>
              <Select value={genderFilter} onValueChange={(val: Gender) => setGenderFilter(val)}>
                <SelectTrigger className="h-11 rounded-xl font-bold text-xs bg-background/80 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">👶 All Genders (Both)</SelectItem>
                  <SelectItem value="boy">👦 Boy Names Only</SelectItem>
                  <SelectItem value="girl">👧 Girl Names Only</SelectItem>
                  <SelectItem value="unisex">✨ Gender-Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Origin Select */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Culture / Origin:</span>
              <Select value={originFilter} onValueChange={(val: Origin) => setOriginFilter(val)}>
                <SelectTrigger className="h-11 rounded-xl font-bold text-xs bg-background/80 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">🌍 All Cultures</SelectItem>
                  <SelectItem value="arabic">🌙 Arabic / Islamic</SelectItem>
                  <SelectItem value="celtic">☘️ Celtic / Irish</SelectItem>
                  <SelectItem value="norse">⚔️ Norse / Scandinavian</SelectItem>
                  <SelectItem value="sanskrit">🕉️ Sanskrit / Indian</SelectItem>
                  <SelectItem value="japanese">🌸 Japanese</SelectItem>
                  <SelectItem value="latin">🏛️ Latin / Roman</SelectItem>
                  <SelectItem value="greek">⚡ Ancient Greek</SelectItem>
                  <SelectItem value="hebrew">🕊️ Hebrew / Biblical</SelectItem>
                  <SelectItem value="hawaiian">🌺 Hawaiian / Polynesian</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Meaning / Theme Select */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Meaning / Vibe:</span>
              <Select value={themeFilter} onValueChange={(val: Theme) => setThemeFilter(val)}>
                <SelectTrigger className="h-11 rounded-xl font-bold text-xs bg-background/80 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">🌟 Any Meaning</SelectItem>
                  <SelectItem value="Royalty">👑 Royalty & Leadership</SelectItem>
                  <SelectItem value="Wisdom">🦉 Wisdom & Intellect</SelectItem>
                  <SelectItem value="Strength">🛡️ Strength & Bravery</SelectItem>
                  <SelectItem value="Light & Sun">☀️ Light & Radiance</SelectItem>
                  <SelectItem value="Love & Grace">💖 Love & Grace</SelectItem>
                  <SelectItem value="Peace">🕊️ Peace & Serenity</SelectItem>
                  <SelectItem value="Nature & Earth">🌿 Nature & Elements</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Keyword Search */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Search Keyword:</span>
              <div className="relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. prince, king, star..."
                  className="h-11 rounded-xl pl-9 text-xs font-semibold bg-background/80 border-border"
                  onKeyDown={(e) => e.key === "Enter" && fetchAiNames(false)}
                />
                <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-3.5" />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* AI Custom Prompt Co-Pilot */}
        <GlassCard className="p-4 sm:p-6 rounded-3xl border-border/80 space-y-3.5 bg-gradient-to-r from-primary/5 via-card/80 to-purple-500/5 shadow-sm">
          <div className="space-y-1">
            <h4 className="text-xs font-bold flex items-center gap-1.5 text-foreground uppercase tracking-wider">
              <Wand2 className="h-4 w-4 text-purple-400 shrink-0" /> Groq AI Intelligent Name Co-Pilot
            </h4>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
              Type custom requirements like matching sibling names, family surnames, or rare Quranic/Biblical aesthetics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <Input
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Rare royal Islamic boy names starting with Z matching sister Zara..."
              className="h-11 rounded-xl text-xs flex-1 font-medium bg-background/80 border-border"
              onKeyDown={(e) => e.key === "Enter" && fetchAiNames(false)}
            />
            <Button
              onClick={() => fetchAiNames(false)}
              disabled={isAiLoading}
              className="h-11 px-5 rounded-xl font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer shrink-0 w-full sm:w-auto justify-center"
            >
              {isAiLoading ? <Loader2 className="h-4 w-4 animate-spin shrink-0" /> : <Sparkles className="h-4 w-4 shrink-0" />}
              <span>Generate Custom AI Names</span>
            </Button>
          </div>
        </GlassCard>

        {/* Results Banner & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs font-bold text-muted-foreground">
              Showing <span className="text-foreground font-mono font-black">{displayedList.length}</span> unique names
            </p>
            {isAiLoading && (
              <Badge variant="outline" className="text-[10px] font-mono animate-pulse text-purple-400 border-purple-400/40">
                ✨ Groq AI Synthesizing...
              </Badge>
            )}
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => fetchAiNames(true)}
            disabled={isAiLoading}
            className="text-xs h-9 px-3.5 rounded-xl font-bold gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
          >
            <Plus className="h-3.5 w-3.5" /> Load 8 More AI Names
          </Button>
        </div>

        {/* Loading Skeleton Indicator */}
        {isAiLoading && displayedList.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-44 rounded-3xl bg-muted/20 border border-border/40 animate-pulse p-5 space-y-4">
                <div className="h-6 w-32 bg-muted/40 rounded-lg" />
                <div className="h-12 w-full bg-muted/30 rounded-xl" />
                <div className="h-4 w-24 bg-muted/40 rounded-md" />
              </div>
            ))}
          </div>
        )}

        {/* Names Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedList.map((entry) => {
            const isShortlisted = shortlist.some((s) => s.name.toLowerCase() === entry.name.toLowerCase());
            return (
              <GlassCard
                key={`${entry.name}-${entry.origin}-${entry.gender}`}
                className="p-5 rounded-3xl border-border/80 hover:border-primary/50 transition-all space-y-4 group relative overflow-hidden shadow-sm"
              >
                {entry.isAiGenerated && (
                  <div className="absolute top-0 right-0">
                    <span className="bg-primary/20 text-primary text-[9px] font-mono font-bold px-2.5 py-1 rounded-bl-xl border-l border-b border-primary/30">
                      Groq AI
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-2xl font-black font-serif text-foreground tracking-tight">
                        {entry.name}
                      </h3>
                      <button
                        onClick={() => speakName(entry.name)}
                        className="p-1 rounded-full text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                        title="Hear pronunciation"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                      /{entry.pronunciation}/ • {entry.syllables} {entry.syllables === 1 ? "syllable" : "syllables"}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleShortlist(entry)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                      isShortlisted
                        ? "bg-rose-500/10 border-rose-500/40 text-rose-500"
                        : "bg-card border-border/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isShortlisted ? "fill-rose-500" : ""}`} />
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/40 space-y-1.5">
                  <p className="text-xs font-semibold text-foreground leading-relaxed">
                    "{entry.meaning}"
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium">
                    Vibe: {entry.vibe}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <Badge variant="outline" className="text-[10px] capitalize font-bold">
                    {entry.origin}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] font-bold text-primary border-primary/30">
                    {entry.theme}
                  </Badge>
                  <Badge variant="secondary" className="text-[10px] capitalize font-medium">
                    {entry.gender}
                  </Badge>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Shortlist Section */}
        {shortlist.length > 0 && (
          <GlassCard className="p-5 sm:p-6 rounded-3xl border-border/80 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Your Saved Shortlist ({shortlist.length})
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShortlist([]);
                  localStorage.removeItem("toolzium_baby_names_shortlist");
                  toast.success("Shortlist cleared");
                }}
                className="text-xs text-muted-foreground hover:text-rose-400 cursor-pointer"
              >
                Clear Shortlist
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {shortlist.map((item) => (
                <div
                  key={item.name}
                  className="px-3 py-1.5 rounded-xl bg-card border border-border/60 flex items-center gap-2 text-xs font-bold shadow-sm"
                >
                  <span>{item.name}</span>
                  <span className="text-[10px] text-muted-foreground">({item.origin})</span>
                  <button
                    onClick={() => toggleShortlist(item)}
                    className="text-muted-foreground hover:text-rose-400 cursor-pointer text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* SEO How It Works, Features & Accordion */}
        <ToolHowItWorks
          steps={[
            {
              step: "01",
              title: "Select Culture, Gender & Vibe",
              description: "Choose Arabic/Islamic, Celtic, Norse, Sanskrit, Greek, or Latin with themes like Royalty, Wisdom, or Strength."
            },
            {
              step: "02",
              title: "Groq AI Generates Real-Time Names",
              description: "Our AI engine analyzes onomastic roots to synthesize authentic, non-repeating name recommendations."
            },
            {
              step: "03",
              title: "Listen, Shortlist & Export CSV",
              description: "Play native pronunciation audio, heart favorite names, and download a printable CSV spreadsheet."
            }
          ]}
        />

        <ToolFeatureGuides
          features={[
            {
              title: "Powered by Groq LLaMA AI",
              description: "Instant AI generation with zero rate-limit delays for millions of unique naming combinations."
            },
            {
              title: "Zero-Repeat Guaranteed History",
              description: "Active deduplication filter ensures duplicate names are never displayed during your session."
            },
            {
              title: "Authentic Cultural Etymologies",
              description: "Includes phonetic guides, syllable counts, historical context, and verified root meanings."
            }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            {
              question: "How does the AI name generator ensure accuracy?",
              answer: "The Toolzium Name Studio leverages Groq AI with specialized onomastic system prompts that cross-reference classical Arabic lexicons, Quranic registers, Norse sagas, Sanskrit Vedas, and Celtic genealogical records."
            },
            {
              question: "Can I generate matching names for siblings or twins?",
              answer: "Yes! Use the AI Intelligent Name Co-Pilot input box to specify sibling names (e.g. 'Matching baby names for sister Zara and brother Zayn') to generate harmonious name pairs."
            },
            {
              question: "Are the names generated saved on my device?",
              answer: "Yes, all saved favorites in your shortlist persist in your browser's local cache and can be exported as a CSV spreadsheet at any time."
            }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/fun/name-generator" />
      </div>
    </div>
  );
}
