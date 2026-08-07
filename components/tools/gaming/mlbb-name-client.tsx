"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Swords, Sparkles, Copy, Check, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const FANCY_MAPS: Record<string, (char: string) => string> = {
  gothic: (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d56c + (code - 65));
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d586 + (code - 97));
    return c;
  },
  boldSerif: (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d400 + (code - 65));
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d41a + (code - 97));
    return c;
  },
  script: (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d4d0 + (code - 65));
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d4ea + (code - 97));
    return c;
  },
  circles: (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x24b6 + (code - 65));
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x24d0 + (code - 97));
    return c;
  },
};

const SYMBOL_DECORATIONS = [
  { prefix: "꧁༺", suffix: "༻꧂" },
  { prefix: "★彡 ", suffix: " 彡★" },
  { prefix: "⚔️ ", suffix: " ⚔️" },
  { prefix: "👑 ", suffix: " 👑" },
  { prefix: "『", suffix: "』" },
  { prefix: "×͜× ", suffix: "" },
  { prefix: "⚡ ", suffix: " ⚡" },
  { prefix: "꧁༒☬", suffix: "☬༒꧂" },
  { prefix: "亗 ", suffix: " 亗" },
];

export default function MlbbNameClient() {
  const [inputName, setInputName] = useState("ViperKey");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const convertName = (name: string, styleKey: string) => {
    const mapFn = FANCY_MAPS[styleKey] || ((c: string) => c);
    return name.split("").map(mapFn).join("");
  };

  const copyName = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    toast.success(`Copied MLBB name: "${text}"!`);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const generateVariants = () => {
    const name = inputName.trim() || "MobileLegend";
    const styles = ["gothic", "boldSerif", "script", "circles"];
    const results: string[] = [];

    styles.forEach((st) => {
      const formatted = convertName(name, st);
      SYMBOL_DECORATIONS.forEach((dec) => {
        results.push(`${dec.prefix}${formatted}${dec.suffix}`);
      });
    });

    return results;
  };

  const variants = generateVariants();

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Swords}
        title="Mobile Legends (MLBB) Fancy Name & Symbol Generator"
        description="Generate cool Japanese Kanji, Gothic symbols, squad tags, and fancy font nicknames for Mobile Legends Bang Bang."
      />

      <GlassCard className="p-6 space-y-4">
        <label className="text-sm font-bold text-foreground block">
          Enter Your MLBB Nickname or Squad Name:
        </label>
        <Input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="e.g. Slayer, Mythic, Phantom"
          className="h-12 text-base font-bold"
        />
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-500" /> MLBB Fancy Font Variants ({variants.length})
          </h2>
          <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-600 border-purple-500/30">
            ✓ Copy directly into MLBB App
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {variants.slice(0, 24).map((variant, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border bg-muted/20 hover:bg-primary/5 hover:border-primary/40 transition flex items-center justify-between gap-2"
            >
              <span className="font-semibold text-sm text-foreground truncate">{variant}</span>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyName(variant, i)}
                className="h-8 px-3 text-xs gap-1.5 shrink-0 hover:text-primary"
              >
                {copiedIndex === i ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                Copy
              </Button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
