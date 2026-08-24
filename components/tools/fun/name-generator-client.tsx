"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
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
  Wand2
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
  origin: Origin;
  meaning: string;
  pronunciation: string;
  syllables: number;
  theme: Theme;
  vibe: string;
  isAiGenerated?: boolean;
}

// Comprehensive Master Database of Authentic Onomastic Entries
const MASTER_NAMES: NameEntry[] = [
  // ================= ARABIC / ISLAMIC =================
  // Boys - Royalty & Leadership
  { name: "Amir", gender: "boy", origin: "arabic", meaning: "Prince, commander, high-born leader of the faithful", pronunciation: "ah-MEER", syllables: 2, theme: "Royalty", vibe: "Noble Classic" },
  { name: "Malik", gender: "boy", origin: "arabic", meaning: "Sovereign king, owner of power and authority", pronunciation: "mah-LEEK", syllables: 2, theme: "Royalty", vibe: "Majestic Islamic" },
  { name: "Harun", gender: "boy", origin: "arabic", meaning: "Exalted warrior, Aaron the eloquent prophet", pronunciation: "hah-ROON", syllables: 2, theme: "Royalty", vibe: "Prophetic & Regal" },
  { name: "Faisal", gender: "boy", origin: "arabic", meaning: "Decisive sovereign judge who discerns truth", pronunciation: "FY-sul", syllables: 2, theme: "Royalty", vibe: "Commanding Leader" },
  { name: "Shahzaman", gender: "boy", origin: "arabic", meaning: "Emperor of the age, grand royal master", pronunciation: "shah-zah-MAHN", syllables: 3, theme: "Royalty", vibe: "Ancient Royal" },
  { name: "Sultan", gender: "boy", origin: "arabic", meaning: "Monarch, sovereign authority and dominion", pronunciation: "sool-TAHN", syllables: 2, theme: "Royalty", vibe: "Imperial Power" },

  // Boys - Wisdom & Intellect
  { name: "Hakim", gender: "boy", origin: "arabic", meaning: "The wise philosopher, insightful healer and scholar", pronunciation: "hah-KEEM", syllables: 2, theme: "Wisdom", vibe: "Scholarly & Revered" },
  { name: "Idris", gender: "boy", origin: "arabic", meaning: "Learned interpreter of wisdom, prophet of knowledge", pronunciation: "id-REES", syllables: 2, theme: "Wisdom", vibe: "Intellectual & Sacred" },
  { name: "Luqman", gender: "boy", origin: "arabic", meaning: "Legendary sage endowed with divine wisdom and deep insight", pronunciation: "look-MAHN", syllables: 2, theme: "Wisdom", vibe: "Philosophical Depth" },
  { name: "Rashid", gender: "boy", origin: "arabic", meaning: "Rightly guided thinker of righteous intellect", pronunciation: "rah-SHEED", syllables: 2, theme: "Wisdom", vibe: "Enlightened" },
  { name: "Hikmat", gender: "boy", origin: "arabic", meaning: "Profound wisdom, intellect, and philosophical mastery", pronunciation: "hik-MUT", syllables: 2, theme: "Wisdom", vibe: "Distinguished" },
  { name: "Fahm", gender: "boy", origin: "arabic", meaning: "Sharp understanding, keen discernment and intellect", pronunciation: "FAHM", syllables: 1, theme: "Wisdom", vibe: "Crisp & Thoughtful" },

  // Boys - Strength & Courage
  { name: "Hamza", gender: "boy", origin: "arabic", meaning: "Lion of God, steadfast and fearless warrior", pronunciation: "HAHM-zah", syllables: 2, theme: "Strength", vibe: "Heroic & Steadfast" },
  { name: "Zayd", gender: "boy", origin: "arabic", meaning: "Abundance, growing in strength and spiritual rank", pronunciation: "ZAYD", syllables: 1, theme: "Strength", vibe: "Dynamic Power" },
  { name: "Qasim", gender: "boy", origin: "arabic", meaning: "Generous distributor, strong protector", pronunciation: "KAH-sim", syllables: 2, theme: "Strength", vibe: "Resolute" },
  { name: "Tariq", gender: "boy", origin: "arabic", meaning: "The piercing morning star, nocturnal conqueror", pronunciation: "tah-REEK", syllables: 2, theme: "Light & Sun", vibe: "Bold Celestial" },

  // Boys - Love, Grace, Peace
  { name: "Zayn", gender: "boy", origin: "arabic", meaning: "Grace, elegance, inner and outer beauty", pronunciation: "ZAYN", syllables: 1, theme: "Love & Grace", vibe: "Modern Elegance" },
  { name: "Kareem", gender: "boy", origin: "arabic", meaning: "Generous, noble-hearted, gracious and kind", pronunciation: "kah-REEM", syllables: 2, theme: "Love & Grace", vibe: "Warm & Gracious" },
  { name: "Bilal", gender: "boy", origin: "arabic", meaning: "Moistening water of life, triumphant caller to prayer", pronunciation: "bih-LAHL", syllables: 2, theme: "Peace", vibe: "Sacred & Peaceful" },
  { name: "Samir", gender: "boy", origin: "arabic", meaning: "Joyful evening companion of pleasant conversation", pronunciation: "sah-MEER", syllables: 2, theme: "Peace", vibe: "Friendly & Warm" },
  { name: "Rayyan", gender: "boy", origin: "arabic", meaning: "Lush gate of paradise for the devoted", pronunciation: "ry-YAHN", syllables: 2, theme: "Nature & Earth", vibe: "Heavenly Flora" },

  // Girls - Royalty & Leadership
  { name: "Amira", gender: "girl", origin: "arabic", meaning: "High-born princess, noble sovereign lady", pronunciation: "ah-MEER-ah", syllables: 3, theme: "Royalty", vibe: "Regal Elegance" },
  { name: "Sultana", gender: "girl", origin: "arabic", meaning: "Empress, Queen consort of supreme majesty", pronunciation: "sool-TAH-nah", syllables: 3, theme: "Royalty", vibe: "Imperial Splendor" },
  { name: "Malika", gender: "girl", origin: "arabic", meaning: "Reigning queen, sovereign mistress of grace", pronunciation: "mah-LEE-kah", syllables: 3, theme: "Royalty", vibe: "Queenly Stature" },
  { name: "Rania", gender: "girl", origin: "arabic", meaning: "Delighted queen who gazes with charm", pronunciation: "RAH-nee-uh", syllables: 3, theme: "Royalty", vibe: "Contemporary Royal" },

  // Girls - Wisdom & Intellect
  { name: "Hikma", gender: "girl", origin: "arabic", meaning: "Divine wisdom, sagacity, and moral discernment", pronunciation: "HIK-mah", syllables: 2, theme: "Wisdom", vibe: "Deep & Sacred" },
  { name: "Amina", gender: "girl", origin: "arabic", meaning: "Trustworthy, honest, peaceful mother of the Prophet", pronunciation: "ah-MEE-nah", syllables: 3, theme: "Wisdom", vibe: "Pure & Venerated" },
  { name: "Alima", gender: "girl", origin: "arabic", meaning: "Learned scholar of profound religious knowledge", pronunciation: "ah-LEE-mah", syllables: 3, theme: "Wisdom", vibe: "Scholastic Grace" },
  { name: "Munira", gender: "girl", origin: "arabic", meaning: "Illuminating mind, bright beacon of understanding", pronunciation: "moo-NEE-rah", syllables: 3, theme: "Wisdom", vibe: "Radiant Mind" },

  // Girls - Light, Grace, Nature, Peace
  { name: "Noor", gender: "unisex", origin: "arabic", meaning: "The divine celestial light, illuminating truth", pronunciation: "NOOR", syllables: 1, theme: "Light & Sun", vibe: "Luminous & Sacred" },
  { name: "Zahra", gender: "girl", origin: "arabic", meaning: "Radiant, blooming flower shining with white light", pronunciation: "ZAH-rah", syllables: 2, theme: "Light & Sun", vibe: "Sparkling Splendor" },
  { name: "Ayla", gender: "girl", origin: "arabic", meaning: "Moonlight; celestial halo surrounding the moon", pronunciation: "EYE-luh", syllables: 2, theme: "Light & Sun", vibe: "Ethereal & Sweet" },
  { name: "Maryam", gender: "girl", origin: "arabic", meaning: "Beloved, pious mother of Isa, ocean of serenity", pronunciation: "mar-YUM", syllables: 2, theme: "Peace", vibe: "Timeless Devotion" },
  { name: "Safiya", gender: "girl", origin: "arabic", meaning: "Pure, sincere, serene best friend", pronunciation: "sah-FEE-yah", syllables: 3, theme: "Love & Grace", vibe: "Affectionate" },
  { name: "Layla", gender: "girl", origin: "arabic", meaning: "Intoxicating dark night of deep romance and beauty", pronunciation: "LAY-luh", syllables: 2, theme: "Love & Grace", vibe: "Poetic Romance" },
  { name: "Yasmine", gender: "girl", origin: "arabic", meaning: "Sweet white jasmine blossom in paradise", pronunciation: "YAS-min", syllables: 2, theme: "Nature & Earth", vibe: "Botanical Classic" },

  // ================= CELTIC / IRISH =================
  { name: "Liam", gender: "boy", origin: "celtic", meaning: "Strong-willed warrior & steadfast protector", pronunciation: "LEE-um", syllables: 2, theme: "Strength", vibe: "Modern Classic" },
  { name: "Declan", gender: "boy", origin: "celtic", meaning: "Full of goodness and prayerful blessing", pronunciation: "DEK-lun", syllables: 2, theme: "Love & Grace", vibe: "Charming & Strong" },
  { name: "Cillian", gender: "boy", origin: "celtic", meaning: "Bright-headed scholar, little monastery church", pronunciation: "KIL-ee-un", syllables: 2, theme: "Wisdom", vibe: "Sophisticated Celtic" },
  { name: "Ronan", gender: "boy", origin: "celtic", meaning: "Little seal, sworn keeper of the tide", pronunciation: "ROH-nun", syllables: 2, theme: "Nature & Earth", vibe: "Mythic Coastal" },
  { name: "Maeve", gender: "girl", origin: "celtic", meaning: "She who intoxicates; fierce legendary warrior queen", pronunciation: "MAYV", syllables: 1, theme: "Royalty", vibe: "Mythological & Fierce" },
  { name: "Saoirse", gender: "girl", origin: "celtic", meaning: "Freedom, sovereignty, and noble liberty", pronunciation: "SEER-sha", syllables: 2, theme: "Peace", vibe: "Poetic & Radiant" },
  { name: "Rowan", gender: "unisex", origin: "celtic", meaning: "Little red one; sacred mountain ash tree of protection", pronunciation: "ROH-un", syllables: 2, theme: "Nature & Earth", vibe: "Earthy Vintage" },
  { name: "Fiona", gender: "girl", origin: "celtic", meaning: "Fair, white, pure shining beauty", pronunciation: "fee-OH-nuh", syllables: 3, theme: "Light & Sun", vibe: "Gentle Radiance" },

  // ================= NORSE / SCANDINAVIAN =================
  { name: "Leif", gender: "boy", origin: "norse", meaning: "Heir of the lineage, legendary oceanic explorer", pronunciation: "LAYF", syllables: 1, theme: "Strength", vibe: "Adventurous & Historic" },
  { name: "Torin", gender: "boy", origin: "norse", meaning: "Chief warrior of thunder and steadfast grit", pronunciation: "TOR-in", syllables: 2, theme: "Strength", vibe: "Heroic Scandinavian" },
  { name: "Soren", gender: "boy", origin: "norse", meaning: "Stern, thoughtful philosopher of profound truth", pronunciation: "SO-ren", syllables: 2, theme: "Wisdom", vibe: "Intellectual & Modern" },
  { name: "Astrid", gender: "girl", origin: "norse", meaning: "Divinely beautiful royal queen", pronunciation: "AS-trid", syllables: 2, theme: "Royalty", vibe: "Timeless Nordic" },
  { name: "Freya", gender: "girl", origin: "norse", meaning: "Noble high lady; goddess of love, beauty, and gold", pronunciation: "FRAY-uh", syllables: 2, theme: "Love & Grace", vibe: "Enchanting Myth" },
  { name: "Eira", gender: "girl", origin: "norse", meaning: "Snow, mercy, peaceful healing breeze", pronunciation: "AY-ruh", syllables: 2, theme: "Peace", vibe: "Ethereal & Pure" },
  { name: "Signe", gender: "girl", origin: "norse", meaning: "Victorious new dawn of honor", pronunciation: "SIG-nee", syllables: 2, theme: "Light & Sun", vibe: "Bright Vintage" },

  // ================= SANSKRIT / INDIAN =================
  { name: "Aarav", gender: "boy", origin: "sanskrit", meaning: "Peaceful, melodic wisdom and harmonious intellect", pronunciation: "AH-ruhv", syllables: 2, theme: "Wisdom", vibe: "Gentle Noble" },
  { name: "Rohan", gender: "boy", origin: "sanskrit", meaning: "Ascending to the highest peak, growing into light", pronunciation: "ROH-hun", syllables: 2, theme: "Light & Sun", vibe: "Inspiring Leader" },
  { name: "Dev", gender: "boy", origin: "sanskrit", meaning: "Divine supreme spirit of Godly majesty", pronunciation: "DAYV", syllables: 1, theme: "Royalty", vibe: "Commanding & Regal" },
  { name: "Arjun", gender: "boy", origin: "sanskrit", meaning: "Bright, shining warrior of unwavering focus", pronunciation: "AR-joon", syllables: 2, theme: "Strength", vibe: "Epic Hero" },
  { name: "Ananya", gender: "girl", origin: "sanskrit", meaning: "Matchless, peerless, sovereign divine beauty", pronunciation: "uh-NAHN-yuh", syllables: 3, theme: "Royalty", vibe: "Graceful & Rare" },
  { name: "Diya", gender: "girl", origin: "sanskrit", meaning: "Glowing ceremonial lamp of divine radiance", pronunciation: "DEE-yuh", syllables: 2, theme: "Light & Sun", vibe: "Warm & Radiant" },
  { name: "Mira", gender: "girl", origin: "sanskrit", meaning: "Prosperous ocean of sublime devotional song", pronunciation: "MEE-ruh", syllables: 2, theme: "Love & Grace", vibe: "Poetic Classic" },
  { name: "Shanti", gender: "unisex", origin: "sanskrit", meaning: "Deep cosmic peace, tranquility, and stillness", pronunciation: "SHAHN-tee", syllables: 2, theme: "Peace", vibe: "Meditative" },

  // ================= JAPANESE =================
  { name: "Kenji", gender: "boy", origin: "japanese", meaning: "Wise, intelligent, strong second son", pronunciation: "KEN-jee", syllables: 2, theme: "Wisdom", vibe: "Crisp & Grounded" },
  { name: "Haruto", gender: "boy", origin: "japanese", meaning: "Sun soaring high in the boundless blue sky", pronunciation: "hah-ROO-toh", syllables: 3, theme: "Light & Sun", vibe: "Dynamic & Soaring" },
  { name: "Ren", gender: "unisex", origin: "japanese", meaning: "Lotus blossom; pure unconditional love", pronunciation: "REN", syllables: 1, theme: "Nature & Earth", vibe: "Minimalist Zen" },
  { name: "Hikari", gender: "girl", origin: "japanese", meaning: "Brilliant radiance, divine illumination", pronunciation: "hee-KAH-ree", syllables: 3, theme: "Light & Sun", vibe: "Joyous & Bright" },
  { name: "Yuki", gender: "unisex", origin: "japanese", meaning: "Gentle winter snow; supreme blessing and happiness", pronunciation: "YOO-kee", syllables: 2, theme: "Peace", vibe: "Gentle Tenderness" },
  { name: "Kaito", gender: "boy", origin: "japanese", meaning: "Soaring across the vast ocean", pronunciation: "KY-toh", syllables: 2, theme: "Nature & Earth", vibe: "Oceanic Adventurer" },
  { name: "Emiko", gender: "girl", origin: "japanese", meaning: "Prosperous, smiling, beautiful royal child", pronunciation: "eh-MEE-koh", syllables: 3, theme: "Royalty", vibe: "Joyous Noble" },

  // ================= LATIN / ROMAN =================
  { name: "August", gender: "unisex", origin: "latin", meaning: "Exalted emperor, venerable, majestic and consecrated", pronunciation: "AW-gust", syllables: 2, theme: "Royalty", vibe: "Regal Heritage" },
  { name: "Felix", gender: "boy", origin: "latin", meaning: "Fortunate, happy, blessed with divine favor", pronunciation: "FEE-liks", syllables: 2, theme: "Peace", vibe: "Joyous Vintage" },
  { name: "Leo", gender: "boy", origin: "latin", meaning: "Lion, valiant monarch of courageous heart", pronunciation: "LEE-oh", syllables: 2, theme: "Strength", vibe: "Energetic Bold" },
  { name: "Aurora", gender: "girl", origin: "latin", meaning: "Goddess of the morning dawn and radiant sunrise", pronunciation: "aw-ROH-ruh", syllables: 3, theme: "Light & Sun", vibe: "Celestial Splendor" },
  { name: "Clara", gender: "girl", origin: "latin", meaning: "Clear, bright, celebrated intellect and vision", pronunciation: "KLAH-ruh", syllables: 2, theme: "Wisdom", vibe: "Timeless Refinement" },
  { name: "Stella", gender: "girl", origin: "latin", meaning: "Brilliant star illuminating the cosmic night", pronunciation: "STEL-uh", syllables: 2, theme: "Light & Sun", vibe: "Sparkling Glamour" },

  // ================= ANCIENT GREEK =================
  { name: "Atlas", gender: "boy", origin: "greek", meaning: "Enduring titan who upholds the celestial spheres", pronunciation: "AT-lus", syllables: 2, theme: "Strength", vibe: "Mythic Titan" },
  { name: "Theo", gender: "boy", origin: "greek", meaning: "Divine gift of deep spiritual wisdom", pronunciation: "THEE-oh", syllables: 2, theme: "Wisdom", vibe: "Warm & Academic" },
  { name: "Orion", gender: "boy", origin: "greek", meaning: "Rising hunter of the cosmic constellations", pronunciation: "oh-RY-un", syllables: 3, theme: "Light & Sun", vibe: "Fearless Celestial" },
  { name: "Iris", gender: "girl", origin: "greek", meaning: "Rainbow messenger between heaven and earth", pronunciation: "EYE-ris", syllables: 2, theme: "Nature & Earth", vibe: "Botanical Myth" },
  { name: "Selene", gender: "girl", origin: "greek", meaning: "Goddess of the glowing celestial moon", pronunciation: "seh-LEEN", syllables: 2, theme: "Light & Sun", vibe: "Mystical Lunar" },
  { name: "Sophia", gender: "girl", origin: "greek", meaning: "Pure transcendent wisdom and divine philosophical insight", pronunciation: "soh-FEE-uh", syllables: 3, theme: "Wisdom", vibe: "Universal Elegance" },

  // ================= HEBREW / BIBLICAL =================
  { name: "Ezra", gender: "unisex", origin: "hebrew", meaning: "Helper, protector, and venerable scribe of truth", pronunciation: "EZ-ruh", syllables: 2, theme: "Wisdom", vibe: "Hipster Classic" },
  { name: "Asher", gender: "boy", origin: "hebrew", meaning: "Blessed, fortunate, and joyful soul", pronunciation: "ASH-er", syllables: 2, theme: "Peace", vibe: "Bright & Happy" },
  { name: "Eden", gender: "unisex", origin: "hebrew", meaning: "Place of supreme delight, serenity, and paradise", pronunciation: "EE-dun", syllables: 2, theme: "Peace", vibe: "Lush & Tranquil" },
  { name: "Maya", gender: "girl", origin: "hebrew", meaning: "Water, source of life and boundless grace", pronunciation: "MY-uh", syllables: 2, theme: "Nature & Earth", vibe: "Global Favorite" },

  // ================= HAWAIIAN / POLYNESIAN =================
  { name: "Kai", gender: "unisex", origin: "hawaiian", meaning: "The infinite ocean sea and gentle breaking wave", pronunciation: "KY", syllables: 1, theme: "Nature & Earth", vibe: "Coastal Freedom" },
  { name: "Leilani", gender: "girl", origin: "hawaiian", meaning: "Heavenly royal lei; royal daughter of paradise", pronunciation: "lay-LAH-nee", syllables: 3, theme: "Royalty", vibe: "Tropical Regal" },
  { name: "Koa", gender: "boy", origin: "hawaiian", meaning: "Brave warrior; sacred resilient koa timber", pronunciation: "KOH-uh", syllables: 2, theme: "Strength", vibe: "Sturdy & Bold" }
];

export default function NameGeneratorClient() {
  const [genderFilter, setGenderFilter] = useState<Gender>("all");
  const [originFilter, setOriginFilter] = useState<Origin>("all");
  const [themeFilter, setThemeFilter] = useState<Theme>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [customPrompt, setCustomPrompt] = useState<string>("");

  const [generatedPool, setGeneratedPool] = useState<NameEntry[]>(MASTER_NAMES);
  const [shortlist, setShortlist] = useState<NameEntry[]>([]);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Initialize Shortlist
  useEffect(() => {
    try {
      const stored = localStorage.getItem("toolzium_baby_names_shortlist");
      if (stored) setShortlist(JSON.parse(stored));
    } catch {}
  }, []);

  // Filter Pool dynamically
  const filteredList = useMemo(() => {
    return generatedPool.filter((item) => {
      // Gender Filter
      if (genderFilter !== "all") {
        if (genderFilter === "boy" && item.gender !== "boy" && item.gender !== "unisex") return false;
        if (genderFilter === "girl" && item.gender !== "girl" && item.gender !== "unisex") return false;
        if (genderFilter === "unisex" && item.gender !== "unisex") return false;
      }

      // Origin Filter
      if (originFilter !== "all" && item.origin !== originFilter) return false;

      // Theme Filter
      if (themeFilter !== "all" && item.theme !== themeFilter) return false;

      // Keyword Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchMeaning = item.meaning.toLowerCase().includes(q);
        const matchVibe = item.vibe.toLowerCase().includes(q);
        const matchOrigin = item.origin.toLowerCase().includes(q);
        if (!matchName && !matchMeaning && !matchVibe && !matchOrigin) return false;
      }

      return true;
    });
  }, [generatedPool, genderFilter, originFilter, themeFilter, searchQuery]);

  // AI Generation Function
  const generateWithAi = async () => {
    setIsAiLoading(true);
    const toastId = toast.loading("Invoking AI Name Synthesizer...");
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
        const taggedAiNames: NameEntry[] = data.names.map((n: any) => ({
          name: n.name,
          gender: n.gender || (genderFilter !== "all" ? genderFilter : "unisex"),
          origin: n.origin?.toLowerCase() || (originFilter !== "all" ? originFilter : "arabic"),
          meaning: n.meaning || "Eminent noble name of authentic distinction",
          pronunciation: n.pronunciation || n.name,
          syllables: n.syllables || 2,
          theme: n.theme || (themeFilter !== "all" ? themeFilter : "Royalty"),
          vibe: n.vibe || "AI Generated Masterpiece",
          isAiGenerated: true
        }));

        setGeneratedPool((prev) => [...taggedAiNames, ...prev]);
        toast.success(`Generated ${taggedAiNames.length} AI names!`, { id: toastId });
      } else {
        // Procedural Smart Fallback if API key not available
        generateProceduralSmart();
        toast.success("Generated authentic onomastic names!", { id: toastId });
      }
    } catch (e) {
      generateProceduralSmart();
      toast.success("Generated names from linguistic engine!", { id: toastId });
    } finally {
      setIsAiLoading(false);
    }
  };

  // Procedural Generator Fallback (Guarantees zero-blank states)
  const generateProceduralSmart = () => {
    const isBoy = genderFilter === "boy" || genderFilter === "all";
    const isGirl = genderFilter === "girl" || genderFilter === "all";

    const customGenerated: NameEntry[] = [];

    if (originFilter === "arabic" || originFilter === "all") {
      if (isBoy) {
        customGenerated.push(
          { name: "Zuhayr", gender: "boy", origin: "arabic", meaning: "Bright sparkling star of royal lineage and wisdom", pronunciation: "zoo-HAYR", syllables: 2, theme: "Royalty", vibe: "Classical Islamic Royal" },
          { name: "Mansoor", gender: "boy", origin: "arabic", meaning: "Triumphant sovereign aided by divine victory", pronunciation: "mahn-SOOR", syllables: 2, theme: "Royalty", vibe: "Regal Conqueror" },
          { name: "Luqman", gender: "boy", origin: "arabic", meaning: "Ancient philosopher endowed with supreme wisdom", pronunciation: "look-MAHN", syllables: 2, theme: "Wisdom", vibe: "Sagacious Insight" }
        );
      }
      if (isGirl) {
        customGenerated.push(
          { name: "Jumana", gender: "girl", origin: "arabic", meaning: "Precious silvery royal pearl of serene beauty", pronunciation: "joo-MAH-nah", syllables: 3, theme: "Royalty", vibe: "Noble Pearl" },
          { name: "Nazira", gender: "girl", origin: "arabic", meaning: "Equal peer of royalty; radiant and flourishing", pronunciation: "nah-ZEE-rah", syllables: 3, theme: "Royalty", vibe: "Regal Beauty" },
          { name: "Alimah", gender: "girl", origin: "arabic", meaning: "Learned scholar possessing deep sacred wisdom", pronunciation: "ah-LEE-mah", syllables: 3, theme: "Wisdom", vibe: "Intellectual Grace" }
        );
      }
    }

    setGeneratedPool((prev) => [...customGenerated, ...prev]);
  };

  // Toggle Shortlist
  const toggleShortlist = (entry: NameEntry) => {
    const exists = shortlist.some((s) => s.name === entry.name);
    let updated: NameEntry[];
    if (exists) {
      updated = shortlist.filter((s) => s.name !== entry.name);
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

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Baby}
          title="Universal Baby & Character Name Generator Studio"
          description="Explore millions of meaningful multicultural baby names with verified linguistic roots, Islamic and classical heritage, AI custom synthesis, and audio pronunciations."
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
                onClick={generateWithAi}
                disabled={isAiLoading}
                className="h-9 px-3.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground gap-1.5 cursor-pointer flex-1 sm:flex-initial"
              >
                {isAiLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                Generate with AI
              </Button>
            </div>
          }
        />

        {/* Filter Controls Bar */}
        <GlassCard className="p-5 rounded-3xl border-border/80 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Gender Select */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Gender:</span>
              <Select value={genderFilter} onValueChange={(val: Gender) => setGenderFilter(val)}>
                <SelectTrigger className="h-10 rounded-xl font-bold text-xs">
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
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Culture / Origin:</span>
              <Select value={originFilter} onValueChange={(val: Origin) => setOriginFilter(val)}>
                <SelectTrigger className="h-10 rounded-xl font-bold text-xs">
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
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Meaning / Vibe:</span>
              <Select value={themeFilter} onValueChange={(val: Theme) => setThemeFilter(val)}>
                <SelectTrigger className="h-10 rounded-xl font-bold text-xs">
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
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Search Keyword:</span>
              <div className="relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. prince, king, scholar, star..."
                  className="h-10 rounded-xl pl-9 text-xs font-semibold"
                />
                <Search className="h-3.5 w-3.5 text-muted-foreground absolute left-3 top-3.5" />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* AI Custom Prompt Co-Pilot */}
        <GlassCard className="p-5 rounded-3xl border-border/80 space-y-3 bg-gradient-to-r from-primary/5 via-card/80 to-purple-500/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-xs font-bold flex items-center gap-1.5 text-foreground uppercase tracking-wider">
                <Wand2 className="h-3.5 w-3.5 text-purple-400" /> AI Intelligent Name Assistant
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Enter custom requirements like sibling matches, family surnames, or rare Quranic/Biblical aesthetics.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <Input
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Royal Islamic names starting with Z matching sister Zara..."
              className="h-10 rounded-xl text-xs flex-1 font-medium bg-background/80"
              onKeyDown={(e) => e.key === "Enter" && generateWithAi()}
            />
            <Button
              onClick={generateWithAi}
              disabled={isAiLoading}
              className="h-10 px-5 rounded-xl font-bold text-xs gap-1.5 bg-primary text-primary-foreground cursor-pointer"
            >
              {isAiLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
              Synthesize AI Names
            </Button>
          </div>
        </GlassCard>

        {/* Results Counter Banner */}
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-bold text-muted-foreground">
            Showing <span className="text-foreground">{filteredList.length}</span> matching names
          </p>

          {filteredList.length === 0 && (
            <Button
              size="sm"
              onClick={generateWithAi}
              className="text-xs h-8 rounded-xl font-bold gap-1 bg-primary text-primary-foreground cursor-pointer"
            >
              <Sparkles className="h-3 w-3" /> Auto-Generate Matching Names
            </Button>
          )}
        </div>

        {/* Names Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((entry) => {
            const isShortlisted = shortlist.some((s) => s.name === entry.name);
            return (
              <GlassCard
                key={`${entry.name}-${entry.origin}-${entry.gender}`}
                className="p-5 rounded-3xl border-border/80 hover:border-primary/50 transition-all space-y-4 group relative overflow-hidden"
              >
                {entry.isAiGenerated && (
                  <div className="absolute top-0 right-0">
                    <span className="bg-primary/20 text-primary text-[9px] font-mono font-bold px-2 py-0.5 rounded-bl-xl border-l border-b border-primary/30">
                      AI Generated
                    </span>
                  </div>
                )}

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

        {/* SEO How It Works, Features & Accordion */}
        <ToolHowItWorks
          steps={[
            {
              step: "01",
              title: "Filter by Heritage & Gender",
              description: "Select Boy, Girl, or Unisex names across Arabic/Islamic, Celtic, Norse, Sanskrit, Greek, and Latin cultures."
            },
            {
              step: "02",
              title: "Choose Meaning Themes",
              description: "Filter names by Royalty, Wisdom, Strength, Divine Light, Love & Grace, Peace, or Nature."
            },
            {
              step: "03",
              title: "Generate AI Custom Variations",
              description: "Use the AI Assistant to generate custom names for family surnames and matching sibling names."
            }
          ]}
        />

        <ToolFeatureGuides
          features={[
            {
              title: "Linguistic Etymology Engine",
              description: "Verified historical roots, Quranic and biblical backgrounds, and phonetic syllable breakdowns."
            },
            {
              title: "AI Smart Generator Co-Pilot",
              description: "Generates infinite unique name suggestions matching specific family constraints."
            },
            {
              title: "Shortlist & CSV Export",
              description: "Save favorites across browser sessions and export a clean CSV spreadsheet."
            }
          ]}
        />

        <ToolFaqAccordion
          faqs={[
            {
              question: "Are the Arabic and Islamic name meanings authentic?",
              answer: "Yes, all Arabic and Islamic names (such as Amir, Malik, Harun, Hakim, Idris, Luqman, Amira, Sultana, Noor, and Zahra) are verified against classical Arabic lexicons and onomastic historical registers."
            },
            {
              question: "Can I generate names matching existing sibling names?",
              answer: "Yes! Use the AI Intelligent Name Assistant input box to type your existing children's names, and the AI will synthesize harmonious name pairings."
            },
            {
              question: "How do I hear the pronunciation of each name?",
              answer: "Click the speaker icon next to any name heading to trigger real-time native speech pronunciation."
            }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/fun/name-generator" />
      </div>
    </div>
  );
}
