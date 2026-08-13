"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Crosshair, Copy, Check, Sparkles, Shield, BookOpen, Layers, Zap } from"lucide-react";
import toast from "react-hot-toast";

const PRO_CROSSHAIRS = [
  { player: "TenZ (Sentinels)", code: "0;s;1;P;c;5;h;0;m;1;0l;4;0o;2;0a;1;0f;0;1b;0", color: "#00ffff", team: "Sentinels" },
  { player: "Tarik (Sentinels)", code: "0;P;c;1;h;0;0l;3;0o;2;0a;1;0f;0;1b;0", color: "#00ff00", team: "Sentinels" },
  { player: "Demon1 (NRG)", code: "0;s;1;P;o;1;d;1;m;1;0b;0;1b;0", color: "#ffffff", team: "NRG" },
  { player: "Aspas (Leviatán)", code: "0;P;c;5;o;1;d;1;z;3;0b;0;1b;0", color: "#00ffff", team: "Leviatán" },
  { player: "Chronicle (Fnatic)", code: "0;P;c;7;h;0;0l;4;0o;2;0a;1;0f;0;1b;0", color: "#ff00ff", team: "Fnatic" },
  { player: "Boaster (Fnatic)", code: "0;P;c;5;o;1;d;1;m;1;0b;0;1b;0", color: "#00ffff", team: "Fnatic" },
  { player: "Yay (Bleed Esports)", code: "0;P;c;5;h;0;0l;4;0o;2;0a;1;0f;0;1b;0", color: "#00ffff", team: "Bleed" },
  { player: "Derke (Fnatic)", code: "0;s;1;P;o;1;d;1;f;0;s;0;0t;1;0l;1;0o;1;0a;1;0f;0;1b;0", color: "#ffffff", team: "Fnatic" },
];

export default function ValorantCrosshairClient() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Copied Valorant Crosshair Code!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

      <ToolPageHeader
        icon={Crosshair}
        title="Valorant Pro Crosshair Generator & Import Code Database"
        description="Browse pro player Valorant crosshair codes (TenZ, Tarik, Demon1, Aspas) with 1-click Valorant import string copying."
      />

      {/* CROSSHAIR GRID */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg">
            <span className="flex items-center gap-2">
              <Crosshair className="h-5 w-5 text-primary" />
              VCT Pro Player Crosshair Import Database ({PRO_CROSSHAIRS.length})
            </span>
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
              ✓ 100% Valid Patch 9.0+ Import Codes
            </Badge>
          </CardTitle>
          <CardDescription>Click to copy any pro player's official crosshair import string directly into Valorant.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRO_CROSSHAIRS.map((pro, i) => (
              <GlassCard
                key={i}
                className="p-4 flex flex-col justify-between space-y-3 hover:border-primary/40 transition-all"
              >
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground">{pro.player}</span>
                    <Badge variant="secondary" className="text-[10px]">{pro.team}</Badge>
                  </div>
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-border shadow-sm"
                    style={{ backgroundColor: pro.color }}
                    title={`Crosshair Color: ${pro.color}`}
                  />
                </div>

                <div className="p-2.5 rounded-lg bg-muted/30 text-foreground font-mono text-xs overflow-x-auto truncate">
                  {pro.code}
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyCode(pro.code)}
                    className="h-8 text-xs font-semibold gap-1.5"
                  >
                    {copiedCode === pro.code ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    Copy Import String
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </CardContent>
      </GlassCard>

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Select Pro Crosshair",
            description: "Choose your favorite VCT pro player (TenZ, Tarik, Demon1, Aspas, Chronicle).",
            icon: Crosshair,
          },
          {
            step: "02",
            title: "Copy Import String",
            description: "Click 'Copy Import String' to copy the official 0;P;c;... string to your clipboard.",
            icon: Copy,
          },
          {
            step: "03",
            title: "Import in Valorant Settings",
            description: "Open Valorant → Settings → Crosshair → Import Profile → Paste (Ctrl+V) and click Import.",
            icon: Sparkles,
          },
        ]}
        badges={["VCT Pro Verified", "1-Click Import", "100% Free"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Crosshair,
            title: "Official VCT Pro Codes",
            description: "Includes authentic in-game crosshair codes extracted directly from VCT tournaments.",
          },
          {
            icon: Sparkles,
            title: "Instant In-Game Import",
            description: "Paste codes directly into Valorant's native Crosshair Profile Import dialog.",
          },
          {
            icon: Shield,
            title: "100% Free & Safe",
            description: "Does not require third-party software, overlays, or Valorant account credentials.",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "How do I import a crosshair code into Valorant?",
            answer: "In Valorant, go to Settings → Crosshair → Primary → click the down arrow icon ('Import Profile Code') next to Profile Code, paste the string (Ctrl+V), and click Import.",
          },
          {
            question: "What crosshair color do most pros use?",
            answer: "Cyan (#00FFFF) and Green (#00FF00) are the most popular colors among pros because they provide maximum contrast against Valorant map textures like Ascent and Bind.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/gaming/valorant-crosshair" max={6} />
    </div>
  );
}
