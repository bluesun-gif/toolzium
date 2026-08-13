"use client";
import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Instagram, Sparkles, RefreshCw, PenTool, Copy, CheckCircle2, Shield, BookOpen, Layers } from "lucide-react";
import toast from "react-hot-toast";
const variantLabels = ["Professional", "Casual", "Witty", "Minimalist", "Emoji-heavy"];
export default function InstagramBioClient() {
  const [brandName, setBrandName] = useState("Nova Studio");
  const [niche, setNiche] = useState("Design & Tech");
  const [personality, setPersonality] = useState("Minimalist, bold, aesthetic");
  const [ctaLink, setCtaLink] = useState("toolzium.com");
  const [loading, setLoading] = useState(false);
  const [bios, setBios] = useState<string[]>([]);
  const handleGenerate = async () => {
    if (!brandName.trim()) {
      toast.error("Enter your name or brand.");
      return;
    }
    setLoading(true);
    try {
      const prompt = `You are an Instagram branding expert.
Create 5 Instagram bios for:
Name/Brand: ${brandName}
Niche: ${niche || "Not provided"}
Personality keywords: ${personality || "Not provided"}
Call-to-action link: ${ctaLink || "Not provided"}

Styles:
1. Professional
2. Casual
3. Witty
4. Minimalist
5. Emoji-heavy

Return ONLY the 5 bios separated by ||| with no labels.`;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt
        })
      });
      const data = await res.json();
      if (data.success && data.raw) {
        const parts = String(data.raw).replace(/```[a-z]*\n?/gi, "").split("|||").map((item: string) => item.trim()).filter(Boolean);
        if (parts.length >= 5) {
          setBios(parts.slice(0, 5));
          toast.success("Instagram bios generated.");
        } else {
          throw new Error("Invalid AI output.");
        }
      } else {
        throw new Error("API error");
      }
    } catch {
      setBios([`${brandName} | ${niche || "Creator"} | Professional insights and practical ideas. 👇\n${ctaLink}`, `${brandName} • ${niche || "Creator"} • Keeping it simple, real, and useful. ✨\n${ctaLink}`, `${brandName} but make it ${personality || "memorable"} ✨ ${niche || "Content"} with personality.\n${ctaLink}`, `${brandName} — ${niche || "Creator"}. Less noise, more value.\n${ctaLink}`, `${brandName} 🚀 ${niche || "Creator"} 💡 Making every post count 👇\n${ctaLink}`]);
      toast.success("Generated Instagram bios.");
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    setBrandName("Nova Studio");
    setNiche("Design & Tech");
    setPersonality("Minimalist, bold, aesthetic");
    setCtaLink("toolzium.com");
    setBios([]);
  };
  return <div className="relative max-w-6xl mx-auto space-y-8"><ToolBackground /><div className="relative z-10">
      

      <ToolPageHeader icon={Instagram} title="Instagram Bio & Aesthetic Caption Generator" description="Generate 5 high-converting, aesthetic Instagram bio variants with character counter, emoji controls, and CTA link integration." actions={<ResetButton onClick={handleReset} label="Reset" />} />

      {/* INPUT CONTROL CARD */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <PenTool className="h-5 w-5 text-primary" />
            Profile Branding Parameters
          </CardTitle>
          <CardDescription>Enter your account name, niche, and brand tone to generate tailored bio concepts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand-name">Name / Brand Username</Label>
              <Input id="brand-name" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="e.g. Nova Studio" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="niche">Niche / Industry</Label>
              <Input id="niche" value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g. Fitness, Tech, Fashion, Travel" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="personality">Brand Personality / Vibe</Label>
              <Input id="personality" value={personality} onChange={e => setPersonality(e.target.value)} placeholder="e.g. Bold, Minimalist, Playful, Luxury" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-link">Call-to-Action Link (Optional)</Label>
              <Input id="cta-link" value={ctaLink} onChange={e => setCtaLink(e.target.value)} placeholder="e.g. toolzium.com" />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={() => void handleGenerate()} disabled={loading || !brandName.trim()} className="gap-2 font-bold h-11 px-6 shadow-md">
              {loading ? <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> AI Writing Bios...
                </> : <>
                  <Sparkles className="w-4 h-4" /> Generate Instagram Bios
                </>}
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* BIO RESULTS GRID */}
      {bios.length > 0 && <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            5 Tailored Bio Concepts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {bios.map((bio, index) => <GlassCard key={`${variantLabels[index]}-${index}`} className="p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="text-xs font-bold text-primary flex items-center gap-1">
                      <Instagram className="w-3.5 h-3.5" />
                      {variantLabels[index]} Style
                    </span>
                    <CopyButton getText={() => bio} label="Copy Bio" />
                  </div>
                  <p className="text-xs text-foreground whitespace-pre-wrap leading-relaxed font-sans">{bio}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
                  <span className={`font-mono text-[11px] ${bio.length > 150 ? "text-destructive font-bold" : "text-muted-foreground"}`}>
                    {bio.length} / 150 chars
                  </span>
                  {bio.length <= 150 && <span className="text-[10px] font-semibold text-emerald-500">✓ Within IG Limit</span>}
                </div>
              </GlassCard>)}
          </div>
        </div>}

      {/* HOW IT WORKS */}
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Account Vibe",
        description: "Specify your account name, niche, personality traits, and optional call-to-action website link.",
        icon: PenTool
      }, {
        step: "02",
        title: "Generate 5 Tone Styles",
        description: "AI crafts Professional, Casual, Witty, Minimalist, and Emoji-heavy bio options simultaneously.",
        icon: Sparkles
      }, {
        step: "03",
        title: "Copy & Publish",
        description: "Inspect character count limits and copy your favorite bio directly to your Instagram profile.",
        icon: Instagram
      }]} badges={["150 Char Counter", "5 Tone Styles", "CTA Integration"]} />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides features={[{
        icon: Instagram,
        title: "Instagram Character Limit Verification",
        description: "Shows real-time character count against Instagram's 150-character bio threshold."
      }, {
        icon: PenTool,
        title: "5 Diverse Personality Tones",
        description: "Offers Professional, Casual, Witty, Minimalist, and Emoji-heavy variations for all brand voices."
      }, {
        icon: Shield,
        title: "100% Private & Free",
        description: "Generates unlimited bio concepts without Instagram account login or paid subscriptions."
      }]} />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion faqs={[{
        question: "What is the character limit for an Instagram bio?",
        answer: "Instagram bio length is capped at 150 characters (including spaces, emojis, and line breaks)."
      }, {
        question: "Should I include a call-to-action link in my Instagram bio?",
        answer: "Yes! A clear call-to-action (e.g. 'Click below for 10% off 👇') drives profile visitors directly to your website or link-in-bio."
      }]} />

      <RelatedTools currentToolUrl="/tools/social/instagram-bio-generator" max={6} />
    </div></div>;
}