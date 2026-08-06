"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { Sparkles, RefreshCw, Copy, Check, Instagram, Twitter, Linkedin, User, Flame } from "lucide-react";

interface BioVariation {
  platform: string;
  style: string;
  bioText: string;
}

export default function SocialBioClient() {
  const [userRole, setUserRole] = useState<string>("Full Stack Developer & Tech Creator");
  const [niche, setNiche] = useState<string>("Building AI SaaS tools & sharing coding tips");
  const [platform, setPlatform] = useState<string>("Instagram");
  const [vibe, setVibe] = useState<string>("Aesthetic & Clean");

  const [bios, setBios] = useState<BioVariation[]>([
    {
      platform: "Instagram",
      style: "Aesthetic & Clean",
      bioText: "💻 Full Stack Dev & AI Builder\n✨ Turning code into scalable SaaS products\n👇 Free developer tool suite below\nlinktr.ee/devstudio",
    },
    {
      platform: "Twitter / X",
      style: "High Impact & Minimalist",
      bioText: "Building AI software in public 🚀 | 10x Developer & Founder | Tweeting code snippets & product launches ⚡️",
    },
    {
      platform: "LinkedIn",
      style: "Professional & Thought Leader",
      bioText: "Full Stack Engineer & Tech Creator. Specialized in Next.js, AI Agents, and cloud infrastructure. Passionate about empowering 10,000+ developers worldwide.",
    },
  ]);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedBio, setCopiedBio] = useState<string | null>(null);

  const handleGenerateBio = () => {
    if (!userRole.trim()) {
      toast.error("Please describe your role or profession.");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      setBios([
        {
          platform,
          style: "Aesthetic & Clean",
          bioText: `✨ ${userRole.trim()}\n🎯 ${niche.trim()}\n👇 Check out my latest work below\ntoolzium.com`,
        },
        {
          platform,
          style: "High Impact & Concise",
          bioText: `🚀 ${userRole.trim()} | Helping creators master ${niche.trim()} ⚡️ Link below!`,
        },
        {
          platform,
          style: "Professional & Trustworthy",
          bioText: `${userRole.trim()}. Dedicated to ${niche.trim()}. Let's connect and build together.`,
        },
      ]);

      setIsGenerating(false);
      toast.success(`Generated ${platform} bios!`);
    }, 450);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBio(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedBio(null), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      <ToolPageHeader
        title="AI Social Media Bio & Creator Profile Generator Studio"
        description="Generate high-converting, aesthetic bios for Instagram, TikTok, Twitter/X, and LinkedIn with 1-click vibe controls."
      />

      {/* SINGLE VIEWPORT SOCIAL BIO STUDIO WORKSPACE */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 min-h-[500px] max-w-full">
        {/* Left Column: Inputs (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col max-w-full min-w-0">
          <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 tracking-tight">
                <User className="h-4 w-4 text-purple-500 shrink-0" />
                Profile Information
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col justify-between max-w-full min-w-0">
              <div className="space-y-1 max-w-full min-w-0">
                <label className="text-xs font-semibold text-muted-foreground">Your Role / Profession:</label>
                <Textarea
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  placeholder="e.g. Graphic Designer & Content Creator"
                  className="text-xs min-h-[80px] bg-muted/20 resize-none p-3 rounded-xl max-w-full min-w-0"
                />
              </div>

              <div className="space-y-1 max-w-full min-w-0">
                <label className="text-xs font-semibold text-muted-foreground">Niche or Main Message:</label>
                <Textarea
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. Helping small businesses design websites..."
                  className="text-xs min-h-[80px] bg-muted/20 resize-none p-3 rounded-xl max-w-full min-w-0"
                />
              </div>

              {/* Platform & Vibe Selectors - Stacks on Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs max-w-full min-w-0">
                <div className="space-y-1 max-w-full min-w-0">
                  <label className="font-semibold text-muted-foreground">Target Platform:</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full bg-background border rounded-lg p-2 text-xs max-w-full min-w-0"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Twitter / X">Twitter / X</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                </div>

                <div className="space-y-1 max-w-full min-w-0">
                  <label className="font-semibold text-muted-foreground">Bio Vibe:</label>
                  <select
                    value={vibe}
                    onChange={(e) => setVibe(e.target.value)}
                    className="w-full bg-background border rounded-lg p-2 text-xs max-w-full min-w-0"
                  >
                    <option value="Aesthetic & Clean">Aesthetic & Clean</option>
                    <option value="High Impact & Concise">High Impact</option>
                    <option value="Professional & Trustworthy">Professional</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={handleGenerateBio}
                disabled={isGenerating || !userRole.trim()}
                className="w-full gap-2 shadow-md rounded-xl font-semibold h-10 justify-center text-xs sm:text-sm mt-2 max-w-full min-w-0"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
                    <span>Crafting Bios...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 shrink-0" />
                    <span>Generate Bios for {platform}</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Bio Variations (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col max-w-full min-w-0">
          <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl flex-1 flex flex-col justify-between overflow-hidden max-w-full min-w-0">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-primary tracking-tight truncate min-w-0">
                <Flame className="h-4 w-4 shrink-0 text-amber-500" />
                <span>Generated {platform} Bio Variations</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between max-w-full min-w-0 overflow-hidden">
              <div className="space-y-3 max-w-full min-w-0 overflow-y-auto max-h-[440px] pr-1">
                {bios.map((b, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border bg-muted/20 space-y-2 max-w-full min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline" className="text-[10px] text-purple-500 border-purple-500/30 shrink-0">
                        {b.style}
                      </Badge>
                      <button
                        type="button"
                        onClick={() => handleCopy(b.bioText, `Bio #${idx + 1}`)}
                        className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium shrink-0"
                      >
                        {copiedBio === `Bio #${idx + 1}` ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        {copiedBio === `Bio #${idx + 1}` ? "Copied" : "Copy Bio"}
                      </button>
                    </div>

                    <p className="font-mono text-xs text-foreground whitespace-pre-wrap leading-relaxed break-words p-2 rounded-lg bg-background border">
                      {b.bioText}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
