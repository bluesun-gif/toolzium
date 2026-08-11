"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/shared/action-buttons";
import toast from "react-hot-toast";
import { Instagram, Sparkles, RefreshCw, PenTool } from "lucide-react";

const cardClass =
  "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";

const variantLabels = ["Professional", "Casual", "Witty", "Minimalist", "Emoji-heavy"];

export default function InstagramBioClient() {
  const [brandName, setBrandName] = useState("");
  const [niche, setNiche] = useState("");
  const [personality, setPersonality] = useState("");
  const [ctaLink, setCtaLink] = useState("");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.success && data.raw) {
        const parts = String(data.raw)
          .replace(/```[a-z]*\n?/gi, "")
          .split("|||")
          .map((item: string) => item.trim())
          .filter(Boolean);

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
      setBios([
        `${brandName} | ${niche || "Creator"} | Professional insights and practical ideas.`,
        `${brandName} • ${niche || "Creator"} • Keeping it simple, real, and useful.`,
        `${brandName} but make it ${personality || "memorable"} ✨ ${niche || "Content"} with personality.`,
        `${brandName} — ${niche || "Creator"}. Less noise, more value.`,
        `${brandName} 🚀 ${niche || "Creator"} 💡 Making every post count 👇`,
      ]);
      toast.error("AI offline. Loaded template fallback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader
        icon={Instagram}
        title="Instagram Bio Generator"
        description="Generate 5 Instagram bio variants with character counts and style diversity."
      />

      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>
            <PenTool className="w-4 h-4 text-primary" /> Profile Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Name / Brand</label>
              <Input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Nova Studio"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Niche</label>
              <Input
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g. fitness, design, travel"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Personality Keywords</label>
              <Input
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                placeholder="e.g. bold, minimal, playful"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Call-to-action Link</label>
              <Input
                value={ctaLink}
                onChange={(e) => setCtaLink(e.target.value)}
                placeholder="e.g. toolzium.com"
              />
            </div>
          </div>

          <Button onClick={() => void handleGenerate()} disabled={loading} className="w-full">
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate Bios
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {bios.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {bios.map((bio, index) => (
            <Card key={`${variantLabels[index]}-${index}`} className={cardClass}>
              <CardHeader className={headerClass}>
                <CardTitle className={titleClass}>
                  <Instagram className="w-4 h-4 text-primary" /> {variantLabels[index]} Bio
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 space-y-3">
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{bio}</p>
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`text-xs ${
                      bio.length > 150 ? "text-red-500" : "text-muted-foreground"
                    }`}
                  >
                    {bio.length}/150
                  </span>
                  <CopyButton getText={() => bio} label="Copy" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Add Brand Details",
            description: "Enter your name, niche, personality, and link.",
            icon: PenTool,
          },
          {
            step: "02",
            title: "Generate Variants",
            description: "Get five bio styles tailored to Instagram.",
            icon: Sparkles,
          },
          {
            step: "03",
            title: "Copy the Best",
            description: "Choose the strongest option and publish it.",
            icon: Instagram,
          },
        ]}
        badges={["AI-Powered", "5 Styles", "No Signup"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Instagram,
            title: "Platform-Focused",
            description: "Creates bios suited to Instagram's short, visual style.",
          },
          {
            icon: PenTool,
            title: "Multiple Tones",
            description: "Offers professional, casual, witty, minimalist, and emoji-heavy options.",
          },
          {
            icon: Sparkles,
            title: "AI Drafting",
            description: "Quickly produces strong first drafts for personal or brand profiles.",
          },
          {
            icon: Instagram,
            title: "Character Awareness",
            description: "Shows counts against Instagram's common bio limit.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            An Instagram bio is one of the fastest ways to communicate who you are, what you do, and why someone should
            follow you. Because space is limited, every word needs to work hard. A strong bio can improve profile
            clarity, brand recall, and click-throughs to your link.
          </p>
          <p>
            Different brands benefit from different tones. A professional tone works well for agencies and consultants,
            while casual and witty styles often perform better for creators and lifestyle brands. Minimalist bios can
            feel premium, and emoji-heavy bios can add energy and visual structure.
          </p>
          <p>
            Use the generated bios as a starting point, then refine them with your unique offer, proof, and voice. Keep
            the most important message first, make the value clear, and use your call-to-action link intentionally.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "What is the Instagram bio limit?",
            answer: "Instagram bios are commonly limited to about 150 characters.",
          },
          {
            question: "Should I use emojis in my bio?",
            answer:
              "They can help with visual hierarchy and tone, but use them in a way that fits your brand.",
          },
          {
            question: "Can this help business accounts?",
            answer: "Yes. Enter the brand name and desired brand voice to generate business-oriented bios.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/social/instagram-bio" max={6} />
    </div>
  );
}
