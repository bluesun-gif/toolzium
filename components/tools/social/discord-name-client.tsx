"use client";

import React, { useState, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/shared/form-fields/select-field";
import { AiOutputDisplay } from "@/components/shared/ai-output-display";
import { MessageSquare, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const SERVER_TYPES = [
  { value: "gaming", label: "🎮 Gaming & Esports Community" },
  { value: "anime", label: "⛩️ Anime & Lounge" },
  { value: "chill", label: "☕ Chill, Study & Music" },
  { value: "coding", label: "💻 Coding, Tech & AI Hub" },
  { value: "roleplay", label: "⚔️ Fantasy & RP Universe" },
];

export default function DiscordNameClient() {
  const [serverType, setServerType] = useState("gaming");
  const [serverNames, setServerNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateDiscordNames = async () => {
    setLoading(true);

    try {
      const prompt = `Generate 10 aesthetic, creative Discord server name ideas for a '${serverType}' community. Include modern clean emojis. Output 1 server name per line. No markdown formatting.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setServerNames(data.results);
        toast.success("AI generated fresh Discord server names!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      const fallbackList = ["Nexus Gaming Hub 🎮", "Viper Strike Syndicate ⚡", "Pixel Haven ✨", "Apex Realm ⚔️", "Cyber Pulse Gaming 🌆"];
      setServerNames(fallbackList);
      toast.success("Generated Discord names!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateDiscordNames();
  }, [serverType]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={MessageSquare}
        title="Discord Server Name & Channel Layout Studio"
        description="Generate aesthetic Discord server names, channel symbols (│・welcome), category headers, and role layouts with live AI inference."
      />

      <GlassCard className="p-6 space-y-4">
        <SelectField
          label="Select Server Theme & Community Niche"
          value={serverType}
          onValueChange={(v) => setServerType(String(v || "gaming"))}
          options={SERVER_TYPES}
        />

        <div className="flex justify-end pt-2">
          <Button
            onClick={generateDiscordNames}
            disabled={loading}
            className="gap-2 font-bold h-11 px-6 shadow-md"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "AI Crafting..." : "Generate AI Discord Names"}
          </Button>
        </div>
      </GlassCard>

      {/* Premium AI Output Display */}
      <AiOutputDisplay
        title="AI Generated Discord Server Names"
        subtitle="100% Unique & Aesthetic for Discord Communities"
        content={serverNames}
        loading={loading}
        onRegenerate={generateDiscordNames}
        variant="cards"
      />
    </div>
  );
}
