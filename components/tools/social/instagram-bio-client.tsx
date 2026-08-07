"use client";

import React, { useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/shared/form-fields/select-field";
import { Instagram, Sparkles, Copy, Check, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const BIO_CATEGORIES = [
  { value: "aesthetic", label: "✨ Minimalist & Aesthetic" },
  { value: "creator", label: "🚀 Content Creator / Influencer" },
  { value: "business", label: "💼 Business / Brand / Entrepreneur" },
  { value: "attitude", label: "🔥 Cool & Savage Attitude" },
  { value: "quotes", label: "📜 Deep Quotes & Inspo" },
];

const BIO_TEMPLATES: Record<string, string[]> = {
  aesthetic: [
    "✧ Living in soft color palettes ✦\n📍 NYC | ☕ Matcha Addict\n↳ 𝖢𝗋𝖾𝖺𝗍𝗂𝗇𝗀 𝗆𝗒 𝗈𝗐𝗇 𝗌𝗎𝗇𝗌𝗁𝗂𝗇𝖾 ☼\n🔗 [Link in Bio]",
    "˗ˏˋ 𝖢𝖺𝗉𝗍𝗎𝗋𝗂𝗇𝗀 𝗀𝗈𝗅𝖽𝖾𝗇 𝗁𝗈𝗎𝗋𝗌 ˎˊ˗\n✨ 𝖥𝗂𝗅𝗆 & 𝖣𝖾𝗌𝗂𝗀𝗇\n♡ 𝗅𝖾𝗌𝗌 𝗉𝖾𝗋𝖿𝖾𝖼𝗍𝗂𝗈𝗇, 𝗆𝗈𝗋𝖾 𝖺𝗎𝗍𝗁𝖾𝗇𝗍𝗂𝖼𝗂𝗍𝗒\n🕊️ 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝗆𝗒 𝗌𝗉𝖺𝖼𝖾",
    "☁︎ 𝖢𝗅𝗈𝗎𝖽𝗀𝖺𝗓𝗂𝗇𝗀 & 𝖢𝗈𝖿𝖿𝖾𝖾\n🎨 Digital Creator\n“Silence speaks louder than noise.”\n👇 Explore my latest work",
  ],
  creator: [
    "🎥 Building a 1M community\n💡 Tech, Coding & AI Insights\n🎙️ New YouTube video every Tuesday!\n👇 Grab my free guide below",
    "📸 Travel & Lifestyle Creator\n🌏 42 Countries & counting\n✉️ Collabs: hello@brand.com\n👇 Watch my latest Reel",
    "🚀 Scaling SaaS & Digital Products\n🧠 Sharing daily growth hacks\n⚡ 10k+ Readers on Newsletter\n🔗 Join below for free",
  ],
  business: [
    "🏢 Premium Handmade Jewelry\n✨ Sustainably sourced & ethically crafted\n📦 Free worldwide shipping over $50\n🛒 Shop our new summer drop 👇",
    "💻 Web Development Agency\n🔥 We build 7-figure digital experiences\n⭐ 200+ Satisfied global clients\n📲 Book your free strategy call below",
    "🌿 Organic Skincare & Wellness\n💚 100% Vegan & Cruelty-free\n🌟 Loved by 50,000+ happy customers\n👇 Claim 15% OFF your first order",
  ],
  attitude: [
    "👑 Not competing, I'm in my own lane.\n🔥 Making moves in silence.\n⚡ High standards, low tolerance.\n👇 Know your worth.",
    "🚀 Born to stand out, not fit in.\n💼 100% Hustle | 0% Excuses\n✨ Turned my dreams into my vision.\n👇 Watch me win.",
  ],
  quotes: [
    "“Do what you love, love what you do.”\n✨ Chasing sunsets & big dreams.\n🕊️ Peace over drama.\n👇 Read my story",
    "“The best is yet to come.”\n🌱 Growth mindset daily.\n💫 Grateful for every chapter.",
  ],
};

export default function InstagramBioClient() {
  const [category, setCategory] = useState("aesthetic");
  const [nameInput, setNameInput] = useState("Alex Rivera");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const bios = BIO_TEMPLATES[category] || BIO_TEMPLATES.aesthetic;

  const copyBio = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    toast.success("Copied Instagram Bio!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <ToolPageHeader
        icon={Instagram}
        title="Instagram Bio & Aesthetic Caption Generator"
        description="Generate aesthetic, line-break formatted Instagram bios, content creator templates, and brand profile copy."
      />

      <GlassCard className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="Bio Style & Category"
            value={category}
            onValueChange={(v) => setCategory(String(v || "aesthetic"))}
            options={BIO_CATEGORIES}
          />
        </div>
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-pink-500" /> Formatted Instagram Bios
          </h2>
          <Badge variant="outline" className="text-xs bg-pink-500/10 text-pink-600 border-pink-500/30">
            ✓ 1-Click Copy with Line Breaks
          </Badge>
        </div>

        <div className="space-y-4">
          {bios.map((bio, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border bg-muted/20 hover:bg-primary/5 hover:border-primary/30 transition space-y-3"
            >
              <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
                {bio}
              </pre>

              <div className="flex justify-end pt-2 border-t border-border/50">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyBio(bio, i)}
                  className="gap-2 text-xs font-semibold"
                >
                  {copiedIndex === i ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  Copy Bio to Instagram
                </Button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
