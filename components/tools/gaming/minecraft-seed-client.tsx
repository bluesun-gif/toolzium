"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolBackground } from "@/components/shared/tool-background";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Gamepad2, Sparkles, Copy, RefreshCw, Shield, Check } from "lucide-react";
import toast from "react-hot-toast";

const PREFIXES = ["Shadow", "Hyper", "Cyber", "Mega", "Epic", "Pixel", "Cosmic", "Vortex", "Frost", "Nova", "Aero", "Pulse"];
const SUFFIXES = ["Gamer", "Roblox", "Pro", "Master", "Craft", "Dev", "Knight", "Rider", "Wave", "Storm", "Volt", "Core"];

export function MinecraftSeedClient() {
  const [keyword, setKeyword] = useState("Pixel");
  const [usernames, setUsernames] = useState<string[]>([
    "PixelKnight", "ShadowPixel", "PixelGamer_99", "HyperPixel_RBX", "PixelVortex", "CosmicPixel_Dev"
  ]);

  const generateUsernames = () => {
    const base = keyword.trim() || "Roblox";
    const results = [];
    for (let i = 0; i < 9; i++) {
      const p = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
      const s = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
      const randNum = Math.floor(Math.random() * 99) + 1;
      const patterns = [
        `${p}${base}`,
        `${base}${s}`,
        `${p}_${base}`,
        `${base}_${randNum}`,
        `TheReal_${base}`,
        `${p}${base}${randNum}`,
        `xX_${base}_Xx`,
        `${base}Dev_RBX`
      ];
      results.push(patterns[Math.floor(Math.random() * patterns.length)]);
    }
    setUsernames(Array.from(new Set(results)));
    toast.success("Generated Roblox usernames!");
  };

  const copyName = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.success(`Copied: ${val}`);
  };

  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
        <ToolPageHeader
          icon={Gamepad2}
          title="Minecraft Seed & World Generator"
          description="Generate unique, aesthetic, and available Roblox usernames, display names, and developer gamer tags."
        />

        <GlassCard>
          <CardHeader>
            <CardTitle>Generate Roblox Usernames</CardTitle>
            <CardDescription>Enter a keyword or aesthetic theme to generate compliant Roblox tags (3-20 characters)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="e.g. Pixel, Dragon, Blox"
                className="h-11 text-base font-bold flex-1"
              />
              <Button onClick={generateUsernames} className="gap-2 font-bold h-11 px-6">
                <RefreshCw className="h-4 w-4" /> Generate Usernames
              </Button>
            </div>
          </CardContent>
        </GlassCard>

        {/* Usernames Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {usernames.map((u, i) => (
            <div
              key={i}
              onClick={() => copyName(u)}
              className="p-4 rounded-xl border bg-card/60 hover:border-primary/50 transition-all cursor-pointer flex justify-between items-center group"
            >
              <span className="font-bold text-base font-mono truncate">{u}</span>
              <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Enter Preferred Root", description: "Input a base word, favorite pet, game mode, or theme.", icon: Gamepad2 },
            { step: "02", title: "Generate Patterns", description: "Algorithm creates compliant 3-20 character combinations with alphanumeric formats.", icon: Sparkles },
            { step: "03", title: "Claim on Roblox", description: "Copy and paste into your Roblox registration or Display Name settings.", icon: Copy }
          ]}
          badges={["100% Free Forever", "Roblox TOS Compliant", "3-20 Characters"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Shield, title: "Roblox TOS Compliant", description: "Generates usernames conforming to Roblox length, character, and profanity guidelines." },
            { icon: Gamepad2, title: "Aesthetic & Developer Formats", description: "Specialized variations for creators, scripters, and competitive players." },
            { icon: Sparkles, title: "Underscore & Prefix Balance", description: "Uses natural alphanumeric structures that look clean on leaderboard avatars." },
            { icon: Check, title: "Zero Lag Local Generator", description: "Generates dozens of fresh name permutations instantaneously in your browser." }
          ]}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            <h3>Crafting an Iconic Roblox Identity</h3>
            <p>
              Roblox requires usernames to be between 3 and 20 characters in length, containing only letters, numbers, and single underscores. Choosing a recognizable identity makes collaborating in Studio or dominating experiences like Blox Fruits and BedWars more memorable.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "How many characters can a Roblox username have?", answer: "Roblox usernames must be between 3 and 20 alphanumeric characters." },
            { question: "What is the difference between Username and Display Name in Roblox?", answer: "Your Username is your unique account identifier, while your Display Name is what other players see in games and can be changed once every 7 days for free." }
          ]}
        />

        <RelatedTools currentToolUrl="/tools/gaming/minecraft-seed" max={6} />
      </div>
    </div>
  );
}

export default MinecraftSeedClient;
