"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flame, Sparkles, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

const FF_DECORATIONS = [
  { prefix: "⚡", suffix: "⚡" },
  { prefix: "꧁༺", suffix: "༻꧂" },
  { prefix: "亗 ", suffix: " 亗" },
  { prefix: "⚔️ ", suffix: " ⚔️" },
  { prefix: "『BOSS』", suffix: "" },
  { prefix: "×͜× ", suffix: "" },
  { prefix: "🔥 ", suffix: " 🔥" },
  { prefix: "┊", suffix: "┊" },
  { prefix: "V·I·P ", suffix: "" },
];

export default function FreeFireNameClient() {
  const [name, setName] = useState("ProSniper");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateNames = () => {
    const base = name.trim() || "FreeFirePlayer";
    return FF_DECORATIONS.map((dec) => `${dec.prefix}${base}${dec.suffix}`);
  };

  const variants = generateNames();

  const copyName = (txt: string, idx: number) => {
    navigator.clipboard.writeText(txt);
    setCopiedIndex(idx);
    toast.success(`Copied Free Fire Nickname: "${txt}"!`);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Flame}
        title="Free Fire (FF) Nickname & Boss Squad Tag Studio"
        description="Generate cool Free Fire nicknames, Boss style symbols, V.I.P tags, and invisible space characters for Garena Free Fire."
      />

      <GlassCard className="p-6 space-y-4">
        <label className="text-sm font-bold text-foreground block">
          Enter Your Free Fire Name or Squad Tag:
        </label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Boss, Killer, Venom"
          className="h-12 text-base font-bold"
        />
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-orange-500" /> Free Fire Name Variants ({variants.length})
          </h2>
          <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-600 border-orange-500/30">
            ✓ Ready for Garena FF
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {variants.map((v, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border bg-muted/20 hover:bg-primary/5 hover:border-primary/40 transition flex items-center justify-between gap-2"
            >
              <span className="font-bold text-sm text-foreground truncate">{v}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyName(v, i)}
                className="h-8 px-3 text-xs gap-1.5 shrink-0 hover:text-primary"
              >
                {copiedIndex === i ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                Copy
              </Button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
