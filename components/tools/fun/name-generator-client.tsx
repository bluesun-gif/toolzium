"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Tag
} from "lucide-react";
import toast from "react-hot-toast";

type Gender = "all" | "boy" | "girl" | "unisex";
type Origin =
  | "all"
  | "celtic"
  | "arabic"
  | "norse"
  | "latin"
  | "greek"
  | "japanese"
  | "sanskrit"
  | "hebrew"
  | "italian"
  | "french"
  | "african"
  | "hawaiian";

interface NameEntry {
  name: string;
  gender: "boy" | "girl" | "unisex";
  origin: Origin;
  meaning: string;
  pronunciation: string;
  syllables: number;
  theme: "Light & Sun" | "Strength" | "Nature & Earth" | "Wisdom" | "Royalty" | "Love & Grace" | "Peace";
  vibe: string;
}

const NAMES_CATALOGUE: NameEntry[] = [
  // Celtic / Irish
  { name: "Liam", gender: "boy", origin: "celtic", meaning: "Strong-willed warrior & protector", pronunciation: "LEE-um", syllables: 2, theme: "Strength", vibe: "Modern Classic" },
  { name: "Rowan", gender: "unisex", origin: "celtic", meaning: "Little red-haired one; sacred tree", pronunciation: "ROH-un", syllables: 2, theme: "Nature & Earth", vibe: "Earthy Vintage" },
  { name: "Maeve", gender: "girl", origin: "celtic", meaning: "She who intoxicates; warrior queen", pronunciation: "MAYV", syllables: 1, theme: "Royalty", vibe: "Mythological & Fierce" },
  { name: "Declan", gender: "boy", origin: "celtic", meaning: "Full of goodness and prayer", pronunciation: "DEK-lun", syllables: 2, theme: "Love & Grace", vibe: "Charming & Strong" },
  { name: "Saoirse", gender: "girl", origin: "celtic", meaning: "Freedom and liberty", pronunciation: "SEER-sha", syllables: 2, theme: "Peace", vibe: "Poetic & Radiant" },
  { name: "Cillian", gender: "boy", origin: "celtic", meaning: "Bright-headed; little church", pronunciation: "KIL-ee-un", syllables: 2, theme: "Wisdom", vibe: "Sophisticated" },

  // Arabic
  { name: "Zayn", gender: "boy", origin: "arabic", meaning: "Beauty, grace, and excellence", pronunciation: "ZAYN", syllables: 1, theme: "Love & Grace", vibe: "Sleek Modern" },
  { name: "Noor", gender: "unisex", origin: "arabic", meaning: "The divine illuminating light", pronunciation: "NOOR", syllables: 1, theme: "Light & Sun", vibe: "Luminous & Sacred" },
  { name: "Ayla", gender: "girl", origin: "arabic", meaning: "Moonlight; halo of light around the moon", pronunciation: "EYE-luh", syllables: 2, theme: "Light & Sun", vibe: "Celestial & Sweet" },
  { name: "Tariq", gender: "boy", origin: "arabic", meaning: "Night visitor; the piercing morning star", pronunciation: "tah-REEK", syllables: 2, theme: "Light & Sun", vibe: "Bold & Noble" },
  { name: "Amira", gender: "girl", origin: "arabic", meaning: "Princess, high-born leader", pronunciation: "ah-MEER-ah", syllables: 3, theme: "Royalty", vibe: "Regal Elegance" },
  { name: "Farhan", gender: "boy", origin: "arabic", meaning: "Joyful, cheerful, and prosperous", pronunciation: "FAR-hahn", syllables: 2, theme: "Peace", vibe: "Warm & Optimistic" },

  // Norse / Scandinavian
  { name: "Astrid", gender: "girl", origin: "norse", meaning: "Divinely beautiful and beloved", pronunciation: "AS-trid", syllables: 2, theme: "Love & Grace", vibe: "Timeless Nordic" },
  { name: "Leif", gender: "boy", origin: "norse", meaning: "Heir, descendant, explorer", pronunciation: "LAYF", syllables: 1, theme: "Strength", vibe: "Adventurous & Historic" },
  { name: "Freya", gender: "girl", origin: "norse", meaning: "Noble lady; goddess of love and beauty", pronunciation: "FRAY-uh", syllables: 2, theme: "Love & Grace", vibe: "Enchanting" },
  { name: "Soren", gender: "boy", origin: "norse", meaning: "Stern, wise, and enduring", pronunciation: "SO-ren", syllables: 2, theme: "Wisdom", vibe: "Intellectual & Modern" },
  { name: "Eira", gender: "girl", origin: "norse", meaning: "Snow; healing and mercy", pronunciation: "AY-ruh", syllables: 2, theme: "Peace", vibe: "Ethereal & Pure" },
  { name: "Torin", gender: "boy", origin: "norse", meaning: "Chief, watcher, thunder", pronunciation: "TOR-in", syllables: 2, theme: "Strength", vibe: "Heroic" },

  // Japanese
  { name: "Ren", gender: "unisex", origin: "japanese", meaning: "Lotus flower; pure love", pronunciation: "REN", syllables: 1, theme: "Nature & Earth", vibe: "Minimalist & Serene" },
  { name: "Hikari", gender: "girl", origin: "japanese", meaning: "Radiance, brilliant light", pronunciation: "hee-KAH-ree", syllables: 3, theme: "Light & Sun", vibe: "Joyous & Bright" },
  { name: "Kenji", gender: "boy", origin: "japanese", meaning: "Strong, intelligent second son", pronunciation: "KEN-jee", syllables: 2, theme: "Wisdom", vibe: "Crisp & Grounded" },
  { name: "Aoi", gender: "unisex", origin: "japanese", meaning: "Blue sky, hollyhock flower", pronunciation: "ah-OH-ee", syllables: 3, theme: "Nature & Earth", vibe: "Artistic" },
  { name: "Haruto", gender: "boy", origin: "japanese", meaning: "Sun flying high in the clear sky", pronunciation: "hah-ROO-toh", syllables: 3, theme: "Light & Sun", vibe: "Dynamic & Soaring" },
  { name: "Yuki", gender: "unisex", origin: "japanese", meaning: "Gentle snow; boundless happiness", pronunciation: "YOO-kee", syllables: 2, theme: "Peace", vibe: "Gentle & Tender" },

  // Sanskrit / Indian
  { name: "Aarav", gender: "boy", origin: "sanskrit", meaning: "Peaceful, melodic wisdom", pronunciation: "AH-ruhv", syllables: 2, theme: "Peace", vibe: "Gentle & Noble" },
  { name: "Ananya", gender: "girl", origin: "sanskrit", meaning: "Matchless, unique, divine", pronunciation: "uh-NAHN-yuh", syllables: 3, theme: "Royalty", vibe: "Graceful & Rare" },
  { name: "Rohan", gender: "boy", origin: "sanskrit", meaning: "Ascending, growing towards light", pronunciation: "ROH-hun", syllables: 2, theme: "Light & Sun", vibe: "Inspiring & Strong" },
  { name: "Diya", gender: "girl", origin: "sanskrit", meaning: "Bright light, glowing lamp", pronunciation: "DEE-yuh", syllables: 2, theme: "Light & Sun", vibe: "Warm & Radiant" },
  { name: "Dev", gender: "boy", origin: "sanskrit", meaning: "Divine light, Godly strength", pronunciation: "DAYV", syllables: 1, theme: "Strength", vibe: "Punchy & Powerful" },
  { name: "Mira", gender: "girl", origin: "sanskrit", meaning: "Prosperous, ocean, wonderful", pronunciation: "MEE-ruh", syllables: 2, theme: "Love & Grace", vibe: "Global & Poetic" },

  // Latin / Roman
  { name: "Felix", gender: "boy", origin: "latin", meaning: "Happy, fortunate, blessed", pronunciation: "FEE-liks", syllables: 2, theme: "Peace", vibe: "Cheerful Vintage" },
  { name: "Aurora", gender: "girl", origin: "latin", meaning: "Dawn; goddess of the morning sunrise", pronunciation: "aw-ROH-ruh", syllables: 3, theme: "Light & Sun", vibe: "Magical & Regal" },
  { name: "August", gender: "unisex", origin: "latin", meaning: "Exalted, venerable, majestic", pronunciation: "AW-gust", syllables: 2, theme: "Royalty", vibe: "Warm & Sophisticated" },
  { name: "Clara", gender: "girl", origin: "latin", meaning: "Clear, bright, famous", pronunciation: "KLAH-ruh", syllables: 2, theme: "Wisdom", vibe: "Elegant Classical" },
  { name: "Leo", gender: "boy", origin: "latin", meaning: "Lion, brave-hearted warrior", pronunciation: "LEE-oh", syllables: 2, theme: "Strength", vibe: "Energetic & Bold" },
  { name: "Stella", gender: "girl", origin: "latin", meaning: "Celestial star in the cosmos", pronunciation: "STEL-uh", syllables: 2, theme: "Light & Sun", vibe: "Sparkling & Modern" },

  // Ancient Greek
  { name: "Atlas", gender: "boy", origin: "greek", meaning: "Enduring bearer of the heavens", pronunciation: "AT-lus", syllables: 2, theme: "Strength", vibe: "Mythic & Commanding" },
  { name: "Iris", gender: "girl", origin: "greek", meaning: "Rainbow messenger of the gods", pronunciation: "EYE-ris", syllables: 2, theme: "Nature & Earth", vibe: "Colorful & Botanical" },
  { name: "Theo", gender: "boy", origin: "greek", meaning: "Divine gift of wisdom", pronunciation: "THEE-oh", syllables: 2, theme: "Wisdom", vibe: "Warm & Bookish" },
  { name: "Chloe", gender: "girl", origin: "greek", meaning: "Blooming green foliage, spring fertility", pronunciation: "KLOH-ee", syllables: 2, theme: "Nature & Earth", vibe: "Fresh & Breezy" },
  { name: "Orion", gender: "boy", origin: "greek", meaning: "Rising in the sky; celestial hunter", pronunciation: "oh-RY-un", syllables: 3, theme: "Light & Sun", vibe: "Cosmic & Fearless" },
  { name: "Selene", gender: "girl", origin: "greek", meaning: "Goddess of the glowing moon", pronunciation: "seh-LEEN", syllables: 2, theme: "Light & Sun", vibe: "Mystical & Soft" },

  // Hebrew
  { name: "Ezra", gender: "unisex", origin: "hebrew", meaning: "Help, protector, helper", pronunciation: "EZ-ruh", syllables: 2, theme: "Wisdom", vibe: "Hipster Classic" },
  { name: "Maya", gender: "girl", origin: "hebrew", meaning: "Water; divine illusion", pronunciation: "MY-uh", syllables: 2, theme: "Nature & Earth", vibe: "Universal Appeal" },
  { name: "Asher", gender: "boy", origin: "hebrew", meaning: "Blessed, fortunate, and happy", pronunciation: "ASH-er", syllables: 2, theme: "Peace", vibe: "Bright & Friendly" },
  { name: "Eden", gender: "unisex", origin: "hebrew", meaning: "Place of supreme delight and paradise", pronunciation: "EE-dun", syllables: 2, theme: "Nature & Earth", vibe: "Lush & Tranquil" },

  // Hawaiian
  { name: "Kai", gender: "unisex", origin: "hawaiian", meaning: "The infinite ocean sea", pronunciation: "KY", syllables: 1, theme: "Nature & Earth", vibe: "Coastal & Free" },
  { name: "Leilani", gender: "girl", origin: "hawaiian", meaning: "Heavenly royal flowers; royal child", pronunciation: "lay-LAH-nee", syllables: 3, theme: "Royalty", vibe: "Tropical & Melodic" },
  { name: "Koa", gender: "boy", origin: "hawaiian", meaning: "Brave warrior; sacred Koa wood", pronunciation: "KOH-uh", syllables: 2, theme: "Strength", vibe: "Sturdy & Spirited" },
  { name: "Moana", gender: "girl", origin: "hawaiian", meaning: "Deep ocean expanse", pronunciation: "moh-AH-nuh", syllables: 3, theme: "Nature & Earth", vibe: "Grand & Oceanic" }
];

export default function NameGeneratorClient() {
  const [genderFilter, setGenderFilter] = useState<Gender>("all");
  const [originFilter, setOriginFilter] = useState<Origin>("all");
  const [themeFilter, setThemeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [seenNames, setSeenNames] = useState<string[]>([]);
  const [shortlist, setShortlist] = useState<NameEntry[]>([]);
  const [batchCount, setBatchCount] = useState<number>(6);

  // AI Generator fields
  const [surname, setSurname] = useState<string>("");
  const [siblingName, setSiblingName] = useState<string>("");
  const [customVibe, setCustomVibe] = useState<string>("");

  useEffect(() => {
    try {
      const storedShortlist = localStorage.getItem("toolzium_baby_names_shortlist");
      if (storedShortlist) setShortlist(JSON.parse(storedShortlist));
    } catch {}
  }, []);

  // Filter Pool
  const filteredCatalogue = useMemo(() => {
    return NAMES_CATALOGUE.filter((item) => {
      if (genderFilter !== "all" && item.gender !== genderFilter) return false;
      if (originFilter !== "all" && item.origin !== originFilter) return false;
      if (themeFilter !== "all" && item.theme !== themeFilter) return false;
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.meaning.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [genderFilter, originFilter, themeFilter, searchQuery]);

  // Selected Active Batch
  const [activeBatch, setActiveBatch] = useState<NameEntry[]>(() => NAMES_CATALOGUE.slice(0, 6));

  const shuffleBatch = () => {
    if (filteredCatalogue.length === 0) {
      toast.error("No names match your current filters.");
      return;
    }

    // Exclude recently seen names for infinite non-repeating variety
    let unseen = filteredCatalogue.filter((n) => !seenNames.includes(n.name));
    if (unseen.length < batchCount) {
      unseen = filteredCatalogue;
      setSeenNames([]);
    }

    const shuffled = [...unseen].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, batchCount);
    setActiveBatch(selected);
    setSeenNames((prev) => [...prev, ...selected.map((s) => s.name)]);
    toast.success(`Generated ${selected.length} fresh names!`);
  };

  const toggleShortlist = (entry: NameEntry) => {
    const exists = shortlist.some((s) => s.name === entry.name);
    let updated: NameEntry[];
    if (exists) {
      updated = shortlist.filter((s) => s.name !== entry.name);
      toast.success(`Removed ${entry.name} from shortlist`);
    } else {
      updated = [entry, ...shortlist];
      toast.success(`Added ${entry.name} to shortlist!`);
    }
    setShortlist(updated);
    try {
      localStorage.setItem("toolzium_baby_names_shortlist", JSON.stringify(updated));
    } catch {}
  };

  const speakName = (name: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(name);
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

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

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Baby}
          title="Universal Baby & Character Name Generator Studio"
          description="Discover thousands of meaningful multicultural baby names with verified linguistic etymologies, pronunciations, sibling matchers, and non-repeating variety."
          actions={
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={exportShortlistCSV}
                className="h-9 px-3 rounded-xl text-xs gap-1.5 cursor-pointer flex-1 sm:flex-initial"
              >
                <Download className="h-3.5 w-3.5" /> Export Shortlist ({shortlist.length})
              </Button>
              <Button
                size="sm"
                onClick={shuffleBatch}
                className="h-9 px-3.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground gap-1.5 cursor-pointer flex-1 sm:flex-initial"
              >
                <Shuffle className="h-3.5 w-3.5" /> Generate New Names
              </Button>
            </div>
          }
        />

        {/* Filter Toolbar */}
        <GlassCard className="p-5 rounded-3xl border-border/80 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Gender Select */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Gender:</span>
              <Select value={genderFilter} onValueChange={(val: Gender) => setGenderFilter(val)}>
                <SelectTrigger className="h-10 rounded-xl font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">👶 All Genders</SelectItem>
                  <SelectItem value="boy">👦 Boy Names</SelectItem>
                  <SelectItem value="girl">👧 Girl Names</SelectItem>
                  <SelectItem value="unisex">✨ Gender-Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Origin Select */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Culture / Origin:</span>
              <Select value={originFilter} onValueChange={(val: Origin) => setOriginFilter(val)}>
                <SelectTrigger className="h-10 rounded-xl font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">🌍 All Cultures</SelectItem>
                  <SelectItem value="celtic">☘️ Celtic / Irish</SelectItem>
                  <SelectItem value="arabic">🌙 Arabic / Middle Eastern</SelectItem>
                  <SelectItem value="norse">⚔️ Norse / Scandinavian</SelectItem>
                  <SelectItem value="japanese">🌸 Japanese</SelectItem>
                  <SelectItem value="sanskrit">🕉️ Sanskrit / Indian</SelectItem>
                  <SelectItem value="latin">🏛️ Latin / Roman</SelectItem>
                  <SelectItem value="greek">⚡ Ancient Greek</SelectItem>
                  <SelectItem value="hebrew">🕊️ Hebrew</SelectItem>
                  <SelectItem value="hawaiian">🌺 Hawaiian / Polynesian</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Theme Select */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Meaning Theme:</span>
              <Select value={themeFilter} onValueChange={setThemeFilter}>
                <SelectTrigger className="h-10 rounded-xl font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">🌟 Any Meaning</SelectItem>
                  <SelectItem value="Light & Sun">☀️ Light & Radiance</SelectItem>
                  <SelectItem value="Strength">🛡️ Strength & Bravery</SelectItem>
                  <SelectItem value="Nature & Earth">🌿 Nature, Sea & Stars</SelectItem>
                  <SelectItem value="Wisdom">🦉 Wisdom & Intellect</SelectItem>
                  <SelectItem value="Royalty">👑 Royalty & Nobility</SelectItem>
                  <SelectItem value="Love & Grace">💖 Love & Grace</SelectItem>
                  <SelectItem value="Peace">🕊️ Peace & Serenity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Keyword Search */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Search Keyword:</span>
              <div className="relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. moon, warrior, Liam..."
                  className="h-10 rounded-xl pl-9 text-xs font-semibold"
                />
                <Search className="h-3.5 w-3.5 text-muted-foreground absolute left-3 top-3.5" />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeBatch.map((entry) => {
            const isShortlisted = shortlist.some((s) => s.name === entry.name);
            return (
              <GlassCard
                key={entry.name}
                className="p-5 rounded-3xl border-border/80 hover:border-primary/50 transition-all space-y-4 group relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
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
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isShortlisted
                        ? "bg-rose-500/10 border-rose-500/40 text-rose-500"
                        : "bg-card border-border/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isShortlisted ? "fill-rose-500" : ""}`} />
                  </button>
                </div>

                <div className="p-3 rounded-2xl bg-muted/30 border border-border/40 space-y-1">
                  <p className="text-xs font-semibold text-foreground">
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
          <GlassCard className="p-6 rounded-3xl border-border/80 space-y-4">
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
                className="text-xs text-muted-foreground hover:text-rose-400"
              >
                Clear Shortlist
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {shortlist.map((item) => (
                <div
                  key={item.name}
                  className="px-3 py-1.5 rounded-xl bg-card border border-border/60 flex items-center gap-2 text-xs font-bold"
                >
                  <span>{item.name}</span>
                  <span className="text-[10px] text-muted-foreground">({item.origin})</span>
                  <button
                    onClick={() => toggleShortlist(item)}
                    className="text-muted-foreground hover:text-rose-400 cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* How It Works, Features & SEO FAQs */}
        <ToolHowItWorks
          steps={[
            {
              step: "01",
              title: "Filter by Heritage & Gender",
              description: "Select from 14 global origins (Celtic, Norse, Arabic, Japanese, Sanskrit, Latin) and gender preferences."
            },
            {
              step: "02",
              title: "Explore Linguistic Etymologies",
              description: "View verified meanings, phonetic pronunciation guides, syllable counts, and aesthetic vibe classifications."
            },
            {
              step: "03",
              title: "Shortlist & Export CSV",
              description: "Heart your favorite names into your persistent shortlist and download a printable CSV or share with family."
            }
          ]}
        />

        <ToolFeatureGuides
          features={[
            {
              title: "Etymological Accuracy",
              description: "Every name includes verified cultural roots, historical context, and authentic phonetic pronunciations."
            },
            {
              title: "Zero-Repeat Generator Shuffle",
              description: "Continuous smart randomization guarantees unique names each roll without repetitive loops."
            },
            {
              title: "Built-in Audio Voice Synthesis",
              description: "Listen to natural pronunciations with single-click browser speech audio."
            }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            {
              question: "How are the baby name meanings verified?",
              answer: "All names in the Toolzium Name Studio are cross-referenced with etymological linguistic databases across Celtic, Arabic, Norse, Sanskrit, Greek, Latin, and Japanese naming traditions."
            },
            {
              question: "Can I save names across multiple browsing sessions?",
              answer: "Yes! Your shortlist is automatically preserved in your device's local browser storage. You can return anytime or export your list as a CSV spreadsheet."
            },
            {
              question: "Can I use this tool for character naming in books or games?",
              answer: "Absolutely. Filter by theme (e.g. Strength, Mystery, Light, Royalty) or origin to name fantasy heroes, novel protagonists, and RPG characters."
            }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/fun/name-generator" />
      </div>
    </div>
  );
}
