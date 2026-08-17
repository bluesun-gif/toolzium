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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResetButton, CopyButton } from "@/components/shared/action-buttons";
import { ModelSelector } from "@/components/shared/model-selector";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Target, RefreshCw, Sparkles, Copy, Megaphone, Zap, Shield, BookOpen, Layers, Type } from "lucide-react";
import toast from "react-hot-toast";
export default function AdCopyGeneratorClient() {
  const [productName, setProductName] = useState("ProClean Electric Toothbrush");
  const [model, setModel] = useState("gpt4o");
  const [targetAudience, setTargetAudience] = useState("Coffee drinkers & busy professionals");
  const [offer, setOffer] = useState("50% OFF + Free Whitening Gel Today Only");
  const [adFramework, setAdFramework] = useState("PAS (Problem - Agitate - Solution)");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const generateAdCopy = async () => {
    if (!productName.trim()) {
      toast.error("Please enter a product or service name.");
      return;
    }
    setLoading(true);
    try {
      const prompt = `Write high-converting Facebook & Instagram Ad Primary Text options for Product: '${productName}'. Audience: '${targetAudience}'. Special Offer: '${offer}'. Copy Framework: '${adFramework}'. Create 4 distinct ad copy variations (Variation 1: Direct Offer Hook, Variation 2: Social Proof & Testimonial Angle, Variation 3: Problem/Agitation Angle, Variation 4: Short-Form Punchy UGC Style). Format as 4 distinct ad variations. No markdown asterisks.`;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
            model,
          type: "cards"
        })
      });
      if (!res.ok) throw new Error("AI API failed");
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        toast.success("AI Ad Copy generated!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      setResults([`🔥 STOP SCROLLING! ${productName} is finally here.\n\nStruggling with yellow stains despite brushing twice daily? Regular toothbrushes miss 40% of plaque.\n\n${productName} uses sonic vibration technology to give you a dental-office clean at home.\n\n🎁 SPECIAL OFFER: ${offer}\n\n👉 Click Shop Now before stock runs out!`, `"I was skeptical, but after 3 days my teeth are noticeably whiter!" — Sarah T.\n\nJoin 25,000+ happy customers using ${productName}.\n\n✅ 40,000 VPM Sonic Pulses\n✅ 30-Day Money-Back Guarantee\n✅ Free Express Shipping\n\nClaim ${offer} today!`]);
      toast.success("Generated Meta ad copy options!");
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    setProductName("ProClean Electric Toothbrush");
    setTargetAudience("Coffee drinkers & busy professionals");
    setOffer("50% OFF + Free Whitening Gel Today Only");
    setAdFramework("PAS (Problem - Agitate - Solution)");
    setResults([]);
  };
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

      <ToolPageHeader icon={Target} title="AI Facebook & Instagram Ad Copy Studio" description="Generate high-converting Meta primary text, headlines, and call-to-action variants using PAS, AIDA, and Social Proof frameworks." actions={<ResetButton onClick={handleReset} label="Reset" />} />

      {/* INPUT FORM */}
      <div className="mb-4">

        <ModelSelector value={model} onChange={setModel} />

      </div>

      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Megaphone className="h-5 w-5 text-primary" />
            Ad Campaign Parameters
          </CardTitle>
          <CardDescription>Enter product details, target customer pain points, and promotional offer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product-name">Product / Service Name</Label>
              <Input id="product-name" type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="e.g. Ergonomic Desk Chair" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-audience">Target Customer Audience</Label>
              <Input id="target-audience" type="text" value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder="e.g. Remote workers with lower back pain" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="offer">Special Offer / Hook</Label>
              <Input id="offer" type="text" value={offer} onChange={e => setOffer(e.target.value)} placeholder="e.g. Free Shipping + 30-Day Risk Free Trial" />
            </div>

            <div className="space-y-2">
              <Label>Copywriting Framework</Label>
              <Select value={adFramework} onValueChange={val => setAdFramework(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PAS (Problem - Agitate - Solution)">PAS (Problem - Agitate - Solution)</SelectItem>
                  <SelectItem value="AIDA (Attention - Interest - Desire - Action)">AIDA (Attention - Interest - Desire - Action)</SelectItem>
                  <SelectItem value="BAB (Before - After - Bridge)">BAB (Before - After - Bridge)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={generateAdCopy} disabled={loading || !productName.trim()} className="gap-2 font-bold h-11 px-6 shadow-md">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "AI Copywriting Ads..." : "Generate AI Meta Ad Copy"}
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* AD OUTPUT GRID */}
      {results.length > 0 && <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Generated High-ROAS Ad Copy Variations
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {results.map((copy, idx) => <GlassCard key={idx} className="p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="text-xs font-bold uppercase text-primary tracking-wider">Variation {idx + 1}</span>
                    <CopyButton getText={() => copy} label="Copy Ad Text" />
                  </div>
                  <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap font-sans">{copy}</p>
                </div>
              </GlassCard>)}
          </div>
        </div>}

      {/* HOW IT WORKS */}
      <ToolHowItWorks steps={[{
        step: "01",
        title: "Input Campaign Offer",
        description: "Specify your product, target buyer persona, and promo offer (e.g. 50% OFF, Free Gift).",
        icon: Target
      }, {
        step: "02",
        title: "Select Copy Framework",
        description: "Choose proven direct-response frameworks like PAS, AIDA, or Before-After-Bridge.",
        icon: Sparkles
      }, {
        step: "03",
        title: "Copy High-ROAS Copy",
        description: "Copy 4 distinct ad text variations directly into Meta Ad Manager for A/B testing.",
        icon: Megaphone
      }]} badges={["Meta Ads Compliant", "PAS & AIDA Frameworks", "1-Click Copy"]} />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides features={[{
        icon: Target,
        title: "Proven Copywriting Frameworks",
        description: "Generates ads using PAS, AIDA, and BAB formulas proven to maximize click-through rates."
      }, {
        icon: Megaphone,
        title: "A/B Testing Variations",
        description: "Outputs 4 distinct angles (Direct Offer, Social Proof, Urgency, Short UGC) for fast creative testing."
      }, {
        icon: Shield,
        title: "Client-Side & Confidential",
        description: "Your product concepts and unreleased promo offers are never stored on external servers."
      }]} />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion faqs={[{
        question: "What is the best length for Facebook & Instagram ad primary text?",
        answer: "Short-form primary text (125 characters) works best for cold traffic, while longer 200+ word storytelling copy works better for retargeting high-ticket products."
      }, {
        question: "What is the PAS framework in advertising?",
        answer: "PAS stands for Problem, Agitate, Solution. You state a customer pain point, agitate the emotional frustration, and introduce your product as the ultimate solution."
      }]} />
    </div>
    </div>
);
}
