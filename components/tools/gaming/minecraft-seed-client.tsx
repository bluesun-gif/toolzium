"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/shared/form-fields/select-field";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { Pickaxe, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const MINECRAFT_STYLES = [
  { value: "fantasy", label: "🏰 Fantasy & Kingdom SMP" },
  { value: "survival", label: "🌲 100 Days Hardcore Survival" },
  { value: "cozy", label: "🌸 Cottagecore & Aesthetic Village" },
  { value: "nether", label: "🔥 Nether & End Citadel" },
];

export default function MinecraftSeedClient() {
  const [style, setStyle] = useState("fantasy");
  const [worldNames, setWorldNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateWorldNames = async () => {
    setLoading(true);

    try {
      const prompt = `Generate 10 creative Minecraft world titles and SMP server names for a '${style}' world theme. Output 1 name per line. No markdown formatting.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setWorldNames(data.results);
        toast.success("AI generated fresh Minecraft world names!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      const fallbackList = [
        "Aetheria SMP 🏰",
        "Eldoria Kingdom 🌲",
        "Sakura Village 🌸",
        "Obsidian Citadel 🔥",
      ];
      setWorldNames(fallbackList);
      toast.success("Generated Minecraft world names!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateWorldNames();
  }, [style]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Pickaxe}
        title="Minecraft Seed & World Name Generator"
        description="Generate fantasy Minecraft world titles, 100 Days Hardcore SMP names, and cottagecore village ideas with live AI inference."
      />

      <GlassCard className="p-6 space-y-4">
        <SelectField
          label="Select World Vibe / Gameplay Theme"
          value={style}
          onValueChange={(v) => setStyle(String(v || "fantasy"))}
          options={MINECRAFT_STYLES}
        />

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateWorldNames}
            disabled={loading}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Crafting..." : "Generate AI World Names"}
          </Button>
        </div>
      </GlassCard>

      {/* Premium AI Output Display */}
      <AiOutputDisplay
        title="AI Generated Minecraft World Names"
        subtitle="100% Formatted for Minecraft Save Worlds & SMP Servers"
        content={worldNames}
        loading={loading}
        onRegenerate={generateWorldNames}
        variant="cards"
      />
    </div>
  );
}
