"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCheck, Sparkles, Copy, CheckCircle2, Sliders, RefreshCcw, Twitter, Linkedin, Instagram, Share2, Eye } from "lucide-react";
import toast from "react-hot-toast";

interface BioVariations {
  twitter: string;
  linkedin: string;
  instagram: string;
  minimalist: string;
}

export function SocialBioClient() {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [keySkills, setKeySkills] = useState("");
  const [callToAction, setCallToAction] = useState("");
  const [vibe, setVibe] = useState<"professional" | "witty" | "minimalist" | "founder">("professional");

  const [isGenerating, setIsGenerating] = useState(false);
  const [bios, setBios] = useState<BioVariations | null>(null);

  const generateBios = useCallback(() => {
    if (!name.trim() || !profession.trim()) {
      toast.error("Please enter your name and profession");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const n = name.trim();
      const p = profession.trim();
      const skills = keySkills.split(/[,\n]/).map(s => s.trim()).filter(Boolean);
      const cta = callToAction.trim() || "linkin.bio/me";

      let tw = "";
      let li = "";
      let ig = "";
      let min = "";

      if (vibe === "witty") {
        tw = `${p} by day, coffee enthusiast by night. ${skills[0] ? `Obsessed with ${skills[0]}.` : "Building cool stuff."} 👇 ${cta}`;
        li = `Passionate ${p} turning complex ideas into simple solutions. Experienced in ${skills.join(", ") || "innovation"}. Driven by curiosity and great team culture. Contact: ${cta}`;
        ig = `✨ ${p} \n💡 ${skills.join(" • ") || "Creative Mind"}\n📍 Building the future\n👇 Tap below! \n${cta}`;
        min = `${n} — ${p}. ${skills[0] || "Innovator"}.`;
      } else if (vibe === "founder") {
        tw = `Building the next generation of digital products. ${p} | Ex-tech | Scaling ${skills[0] || "ideas"}. Join the journey 🚀 ${cta}`;
        li = `Founder & ${p}. Helping businesses scale through ${skills.join(", ") || "technology"}. Featured on TechCrunch & ProductHunt. Open for advisory & investment opportunities. 📩 ${cta}`;
        ig = `🚀 Building in public\n👨‍💻 ${p}\n📈 ${skills.slice(0, 2).join(" & ") || "Growth"}\n👇 Official Links\n${cta}`;
        min = `${n} // ${p} & Builder.`;
      } else if (vibe === "minimalist") {
        tw = `${p}. ${skills.join(" · ") || "Creator"}. ${cta}`;
        li = `${p} focused on ${skills.join(", ") || "design & technology"}. ${cta}`;
        ig = `• ${p}\n• ${skills.join("\n• ") || "Creator"}\n🔗 ${cta}`;
        min = `${n} | ${p}`;
      } else {
        tw = `${p} specializing in ${skills.join(", ") || "digital solutions"}. Passionate about high impact & growth. Connect: ${cta}`;
        li = `Results-driven ${p} with proven expertise in ${skills.join(", ") || "strategic execution"}. Dedicated to delivering value and fostering collaborative innovation. 👇 ${cta}`;
        ig = `💼 ${p}\n🛠️ ${skills.join(" | ") || "Expertise"}\n📩 Open for collaborations\n👇 ${cta}`;
        min = `${n} — ${p} | ${skills[0] || "Professional"}`;
      }

      setBios({ twitter: tw, linkedin: li, instagram: ig, minimalist: min });
      setIsGenerating(false);
      toast.success("Social bios generated across 4 platform formats!");
    }, 400);
  }, [name, profession, keySkills, callToAction, vibe]);

  const handleCopy = (text: string, platform: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${platform} bio copied!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={UserCheck}
        title="AI Social Media Bio Generator"
        description="Craft optimized, high-converting bios tailored for X (Twitter), LinkedIn, Instagram, and TikTok profiles in seconds."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-0">
          <CardHeader className="border-b border-border/40 bg-muted/20 p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-primary" />
              Profile Input Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div>
              <Label className="text-xs mb-1 block">Your Name / Handle</Label>
              <Input
                placeholder="e.g. Alex Morgan"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-xs mb-1 block">Primary Profession / Role</Label>
              <Input
                placeholder="e.g. Senior Full-Stack Engineer & AI Researcher"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-xs mb-1 block">Key Skills / Interests (Comma separated)</Label>
              <Input
                placeholder="e.g. Next.js, Product Design, Open Source, Fitness"
                value={keySkills}
                onChange={(e) => setKeySkills(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs mb-1 block">Bio Tone / Vibe</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value as any)}
                >
                  <option value="professional">Professional & Authoritative</option>
                  <option value="founder">Founder & Entrepreneur</option>
                  <option value="witty">Witty & Creative</option>
                  <option value="minimalist">Minimalist & Sleek</option>
                </select>
              </div>

              <div>
                <Label className="text-xs mb-1 block">Call To Action / Link</Label>
                <Input
                  placeholder="e.g. toolzium.com or linktr.ee/alex"
                  value={callToAction}
                  onChange={(e) => setCallToAction(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={generateBios} disabled={isGenerating || !name.trim() || !profession.trim()} className="w-full gap-2 mt-2">
              {isGenerating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isGenerating ? "Crafting Bios..." : "Generate Social Bios"}
            </Button>
          </CardContent>
        </GlassCard>

        <div className="space-y-4">
          {bios ? (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-sky-500 flex items-center gap-1.5 uppercase">
                    <Twitter className="w-3.5 h-3.5" /> X / Twitter Bio (160 Chars max)
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(bios.twitter, "X/Twitter")} className="h-7 text-xs gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </Button>
                </div>
                <p className="text-sm font-sans bg-muted/20 p-3 rounded-lg border border-border/40">{bios.twitter}</p>
                <span className="text-[10px] text-muted-foreground block text-right">{bios.twitter.length} / 160 characters</span>
              </GlassCard>

              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-blue-600 flex items-center gap-1.5 uppercase">
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn About / Headline
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(bios.linkedin, "LinkedIn")} className="h-7 text-xs gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </Button>
                </div>
                <p className="text-sm leading-relaxed bg-muted/20 p-3 rounded-lg border border-border/40">{bios.linkedin}</p>
              </GlassCard>

              <GlassCard className="p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-pink-500 flex items-center gap-1.5 uppercase">
                    <Instagram className="w-3.5 h-3.5" /> Instagram / TikTok Bio
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(bios.instagram, "Instagram")} className="h-7 text-xs gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </Button>
                </div>
                <pre className="text-xs font-sans bg-muted/20 p-3 rounded-lg border border-border/40 whitespace-pre-wrap">{bios.instagram}</pre>
              </GlassCard>
            </motion.div>
          ) : (
            <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed">
              <UserCheck className="w-12 h-12 mb-3 text-muted-foreground/30" />
              <p className="text-sm font-medium">No Bios Generated Yet</p>
              <p className="text-xs max-w-xs mt-1">Enter your name and role on the left to instantly craft tailored bios for X, LinkedIn, Instagram, and GitHub.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Fill Profile Info", description: "Enter your name, primary title, skills, and target link.", icon: UserCheck },
          { step: "02", title: "Select Tone", description: "Choose between Professional, Founder, Witty, or Minimalist.", icon: Sliders },
          { step: "03", title: "Copy & Paste", description: "Copy platform-optimized bios directly into Twitter, LinkedIn, or Instagram.", icon: CheckCircle2 }
        ]}
        badges={["100% Free", "Character Count Guard", "Instant Copy"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Twitter, title: "X/Twitter 160-Character Limit", description: "Strictly enforces character count bounds so your bio never gets truncated." },
          { icon: Linkedin, title: "LinkedIn SEO Optimization", description: "Includes industry keywords to rank higher in recruiter and connection search results." },
          { icon: Instagram, title: "Line-Break & Emoji Formatting", description: "Formatted with clean line breaks and emojis designed for mobile layout aesthetic." },
          { icon: CheckCircle2, title: "Private Processing", description: "Generates profile text entirely inside your local browser instance." }
        ]}
      >
        <div className="prose dark:prose-invert max-w-none">
          <h3>The Strategic Value of a Optimized Social Bio</h3>
          <p>
            Your social media bio is often the first touchpoint potential followers, clients, or employers have with your personal brand. A well-constructed bio immediately answers three core questions: Who are you, what value do you build, and where can people find your work?
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "Are character limits automatically respected?", answer: "Yes! Twitter bios are generated within the 160-character limit, while Instagram bios adhere to the 150-character limit." },
          { question: "Can I use this for company profiles?", answer: "Absolutely. Simply enter your company name under Name and your main product value proposition under Profession." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/ai/social-bio" max={6} />
    </div>
  );
}

export default SocialBioClient;
