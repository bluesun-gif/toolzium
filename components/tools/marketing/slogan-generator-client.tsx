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
import { Megaphone, Sparkles, RefreshCw, Lightbulb } from "lucide-react";

const cardClass =
  "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";

export default function SloganGeneratorClient() {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [values, setValues] = useState("");
  const [loading, setLoading] = useState(false);
  const [slogans, setSlogans] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!brandName.trim()) {
      toast.error("Enter your brand name.");
      return;
    }

    setLoading(true);

    try {
      const prompt = `You are a brand strategist and copywriter.
Generate 10 slogans for:
Brand name: ${brandName}
Industry: ${industry || "Not provided"}
Brand values/personality: ${values || "Not provided"}

Use different styles such as rhyming, minimalist, action-driven, emotional, and descriptive.
Return exactly 10 slogans, one per line, with no numbering and no extra text.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.success && data.raw) {
        const lines = String(data.raw)
          .replace(/```[a-z]*\n?/gi, "")
          .split("\n")
          .map((line: string) => line.replace(/^[-*\d.)\s]+/, "").trim())
          .filter(Boolean);

        if (lines.length >= 10) {
          setSlogans(lines.slice(0, 10));
          toast.success("Slogans generated.");
        } else {
          throw new Error("Invalid AI output.");
        }
      } else {
        throw new Error("API error");
      }
    } catch {
      setSlogans([
        `${brandName}: Built for what matters.`,
        `${brandName}: Simple. Strong. Ready.`,
        `Move forward with ${brandName}.`,
        `${brandName} makes it easier.`,
        `Where quality meets ${industry || "innovation"}: ${brandName}.`,
        `${brandName}: The smarter way ahead.`,
        `Feel the difference with ${brandName}.`,
        `${brandName}: Designed to deliver.`,
        `Your next step starts with ${brandName}.`,
        `${brandName}: Small details, big impact.`,
      ]);
      toast.error("AI offline. Loaded template fallback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader
        icon={Megaphone}
        title="Slogan Generator"
        description="Generate 10 brand slogans in different styles with one click."
      />

      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>
            <Lightbulb className="w-4 h-4 text-primary" /> Brand Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Brand Name</label>
              <Input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Nova Labs"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Industry</label>
              <Input
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. software, coffee, fitness"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Values / Personality</label>
              <Input
                value={values}
                onChange={(e) => setValues(e.target.value)}
                placeholder="e.g. bold, premium, friendly"
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
                <Sparkles className="w-4 h-4" /> Generate Slogans
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {slogans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slogans.map((slogan, index) => (
            <Card key={`${slogan.slice(0, 12)}-${index}`} className={cardClass}>
              <CardHeader className={headerClass}>
                <CardTitle className={titleClass}>
                  <Megaphone className="w-4 h-4 text-primary" /> Slogan {index + 1}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 space-y-3">
                <p className="text-sm font-medium leading-relaxed">{slogan}</p>
                <CopyButton getText={() => slogan} label="Copy" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Describe the Brand",
            description: "Enter brand name, industry, and personality.",
            icon: Lightbulb,
          },
          {
            step: "02",
            title: "Generate Slogans",
            description: "Get ten slogan options across multiple styles.",
            icon: Sparkles,
          },
          {
            step: "03",
            title: "Pick Your Favorite",
            description: "Copy the strongest slogan and use it in your branding.",
            icon: Megaphone,
          },
        ]}
        badges={["AI-Powered", "10 Options", "No Signup"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Megaphone,
            title: "Brand-Ready Copy",
            description: "Creates short, memorable slogan ideas for brands and products.",
          },
          {
            icon: Sparkles,
            title: "Style Variety",
            description: "Covers rhyming, minimalist, action, emotional, and descriptive angles.",
          },
          {
            icon: Lightbulb,
            title: "Fast Ideation",
            description: "Helps you explore many directions quickly.",
          },
          {
            icon: Megaphone,
            title: "Marketing Friendly",
            description: "Useful for websites, ads, packaging, and pitch decks.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            A slogan is one of the most compact expressions of a brand. It can communicate tone, promise, and
            personality in just a few words. Great slogans are easy to remember, easy to say, and aligned with the
            brand's positioning.
          </p>
          <p>
            Different businesses need different slogan styles. A minimalist brand may prefer a short and elegant line,
            while a consumer product may benefit from rhythm, emotion, or action. Generating multiple options helps you
            compare directions before committing to one.
          </p>
          <p>
            Use the generated slogans as creative fuel. Refine the best ideas until they sound natural, distinctive,
            and true to your brand. If possible, test your favorite options with real users or customers before final
            launch.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "How long should a slogan be?",
            answer: "Usually short is best. Most strong slogans are under 8 words.",
          },
          {
            question: "Can I trademark a generated slogan?",
            answer:
              "You may be able to, but you should check trademark availability and consult a legal professional.",
          },
          {
            question: "Can this generate product taglines too?",
            answer: "Yes. Enter the product name and positioning details to generate tagline ideas.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/marketing/slogan-generator" max={6} />
    </div>
  );
}
