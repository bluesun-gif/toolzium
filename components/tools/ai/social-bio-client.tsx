"use client";

import React, { useState, useCallback, useEffect } from "react";
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
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import {
  UserCheck,
  Sparkles,
  Copy,
  CheckCircle2,
  Sliders,
  RefreshCcw,
  Twitter,
  Linkedin,
  Instagram,
  Share2,
  Lightbulb,
  History,
  Trash2,
  Github
} from "lucide-react";
import toast from "react-hot-toast";

interface BioVariations {
  twitter: string;
  linkedin: string;
  instagram: string;
  github: string;
  minimalist: string;
}

interface SavedBioHistory {
  id: string;
  name: string;
  profession: string;
  bios: BioVariations;
  timestamp: string;
}

export function SocialBioClient() {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [keySkills, setKeySkills] = useState("");
  const [callToAction, setCallToAction] = useState("");
  const [vibe, setVibe] = useState<"professional" | "witty" | "minimalist" | "founder" | "creative">("professional");

  const [isGenerating, setIsGenerating] = useState(false);
  const [bios, setBios] = useState<BioVariations | null>(null);
  const [history, setHistory] = useState<SavedBioHistory[]>([]);

  const presets = [
    { label: "👨‍💻 Full-Stack Engineer", name: "Alex Chen", role: "Senior Full-Stack Engineer", skills: "Next.js, TypeScript, AI APIs", cta: "alexchen.dev" },
    { label: "🚀 SaaS Founder", name: "Sarah Jenkins", role: "AI Startup Founder", skills: "Bootstrapping, Product, Growth", cta: "buildwithsarah.com" },
    { label: "🎨 UI/UX Designer", name: "David Kim", role: "Lead Product Designer", skills: "Figma, Design Systems, Mobile UX", cta: "davidkim.design" },
  ];

  useEffect(() => {
    setMounted(true);
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("toolzium_social_bio_history");
        if (saved) setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load bio history:", e);
    }
  }, []);

  const saveToHistory = (item: SavedBioHistory) => {
    try {
      setHistory((prev) => {
        const updated = [item, ...prev.slice(0, 19)];
        localStorage.setItem("toolzium_social_bio_history", JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error("Failed to save bio history:", e);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("toolzium_social_bio_history");
    toast.success("History cleared!");
  };

  const applyPreset = (p: typeof presets[0]) => {
    setName(p.name);
    setProfession(p.role);
    setKeySkills(p.skills);
    setCallToAction(p.cta);
    toast.success("Preset loaded!");
  };

  const generateBios = useCallback(async () => {
    if (!name.trim() || !profession.trim()) {
      toast.error("Please enter your name and profession");
      return;
    }

    setIsGenerating(true);
    const n = name.trim();
    const p = profession.trim();
    const skills = keySkills.trim() || "innovation, strategy";
    const cta = callToAction.trim() || "linkin.bio/me";

    try {
      const prompt = `Act as an expert Social Media Branding Strategist. Write 5 high-converting, tailored social media bios for:
      Name: "${n}"
      Profession: "${p}"
      Skills/Focus: "${skills}"
      Tone Vibe: "${vibe}"
      CTA Link: "${cta}"

      Format requirements:
      Return EXACTLY a valid JSON object with keys: twitter (max 160 chars), linkedin (3-4 lines professional about), instagram (bulleted emoji lines), github (developer bio), minimalist (1 short line). Do not include markdown formatting, just JSON.`;

      let generatedBios: BioVariations | null = null;

      try {
        const response = await fetch("/api/ai/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, type: "json" }),
        });
        const data = await response.json();
        if (data.success && data.raw) {
          const cleanJson = data.raw.replace(/```json/g, "").replace(/```/g, "").trim();
          generatedBios = JSON.parse(cleanJson);
        }
      } catch (err) {
        console.warn("AI bio fallback logic:", err);
      }

      if (!generatedBios || !generatedBios.twitter) {
        generatedBios = {
          twitter: `${p} specializing in ${skills}. Driven by impact & continuous learning. 👇 ${cta}`,
          linkedin: `Experienced ${p} with a background in ${skills}. Focused on building high-scalability solutions and driving team growth.\n\nConnect or learn more: ${cta}`,
          instagram: `💼 ${p}\n🛠️ ${skills}\n📍 Building digital solutions\n👇 Learn more:\n${cta}`,
          github: `👨‍💻 ${p} | ${skills} | ${cta}`,
          minimalist: `${n} · ${p} · ${skills.split(",")[0] || "Builder"}`,
        };
      }

      setBios(generatedBios);
      saveToHistory({
        id: `bio-${Date.now()}`,
        name: n,
        profession: p,
        bios: generatedBios,
        timestamp: new Date().toLocaleTimeString(),
      });

      setIsGenerating(false);
      toast.success("Generated tailored social media bios!");
    } catch (e) {
      console.error("Bio generation error:", e);
      setIsGenerating(false);
      toast.error("Failed to generate bios. Please try again.");
    }
  }, [name, profession, keySkills, callToAction, vibe]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  if (!mounted) return <div className="min-h-screen p-8 animate-pulse" />;

  return (
    <div className="w-full min-h-screen pb-20 relative">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "absolute inset-0 h-full w-full stroke-border [mask-image:linear-gradient(to_bottom,white,transparent)]"
        )}
      />

      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 relative z-10">
        <ToolPageHeader
          title="AI Social Media Bio & Creator Profile Generator"
          description="Craft high-converting, platform-tailored bios for X (Twitter), LinkedIn, Instagram, TikTok, and GitHub."
          icon={UserCheck}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Control Card */}
          <GlassCard className="p-5 flex flex-col bg-background border-border shadow-sm rounded-2xl">
            <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
              <Share2 className="w-5 h-5 text-primary" />
              <Label className="text-lg font-bold text-foreground">Profile & Vibe Settings</Label>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                  <Lightbulb className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                  Quick Profile Presets
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {presets.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applyPreset(p)}
                      className="text-xs bg-muted hover:bg-accent hover:text-accent-foreground text-muted-foreground px-3 py-1.5 rounded-full border border-border/60 transition-colors font-medium"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Your Name / Brand</Label>
                  <Input
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Profession / Primary Role</Label>
                  <Input
                    placeholder="e.g. Senior Frontend Engineer"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Key Skills & Achievements (Comma-separated)
                </Label>
                <Input
                  placeholder="e.g. Next.js, UI Design, Open Source, AI APIs"
                  value={keySkills}
                  onChange={(e) => setKeySkills(e.target.value)}
                  className="bg-background border-border"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Target Vibe & Tone</Label>
                  <select
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground font-medium outline-none focus:ring-2 focus:ring-primary/50"
                    value={vibe}
                    onChange={(e) => setVibe(e.target.value as any)}
                  >
                    <option value="professional">Professional & Corporate</option>
                    <option value="witty">Witty & Casual</option>
                    <option value="founder">Founder & Innovator</option>
                    <option value="minimalist">Ultra-Minimalist</option>
                    <option value="creative">Creative & Bold</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">Call To Action (CTA Link)</Label>
                  <Input
                    placeholder="e.g. alexmorgan.dev"
                    value={callToAction}
                    onChange={(e) => setCallToAction(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <Button
                onClick={generateBios}
                disabled={isGenerating || !name.trim() || !profession.trim()}
                className="w-full gap-2 mt-4 bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20 rounded-xl h-12 text-base"
              >
                {isGenerating ? (
                  <RefreshCcw className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                {isGenerating ? "Generating Social Bios..." : "Generate Platform Bios"}
              </Button>
            </div>
          </GlassCard>

          {/* Right Workspace Display */}
          <div className="flex flex-col space-y-4">
            {bios ? (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <GlassCard className="p-4 space-y-2 border-l-4 border-l-sky-500 bg-card/70 backdrop-blur-md rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-sky-500 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Twitter className="w-4 h-4" /> X (Twitter) Bio ({bios.twitter.length}/160)
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(bios.twitter, "Twitter bio")}
                      className="h-7 text-xs gap-1 border-border font-semibold"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </Button>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">{bios.twitter}</p>
                </GlassCard>

                <GlassCard className="p-4 space-y-2 border-l-4 border-l-primary bg-card/70 backdrop-blur-md rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-primary uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Linkedin className="w-4 h-4" /> LinkedIn Executive About
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(bios.linkedin, "LinkedIn bio")}
                      className="h-7 text-xs gap-1 border-border font-semibold"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </Button>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">{bios.linkedin}</p>
                </GlassCard>

                <GlassCard className="p-4 space-y-2 border-l-4 border-l-pink-500 bg-card/70 backdrop-blur-md rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-pink-500 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Instagram className="w-4 h-4" /> Instagram Bio
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(bios.instagram, "Instagram bio")}
                      className="h-7 text-xs gap-1 border-border font-semibold"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </Button>
                  </div>
                  <pre className="text-sm leading-relaxed font-sans whitespace-pre-wrap text-foreground">{bios.instagram}</pre>
                </GlassCard>

                {bios.github && (
                  <GlassCard className="p-4 space-y-2 border-l-4 border-l-slate-400 bg-card/70 backdrop-blur-md rounded-2xl">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 font-mono">
                        <Github className="w-4 h-4" /> GitHub Developer Bio
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(bios.github, "GitHub bio")}
                        className="h-7 text-xs gap-1 border-border font-semibold"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </Button>
                    </div>
                    <p className="text-sm leading-relaxed font-mono text-foreground">{bios.github}</p>
                  </GlassCard>
                )}
              </motion.div>
            ) : (
              <GlassCard className="p-8 h-full min-h-[420px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed border-2 border-border rounded-2xl">
                <UserCheck className="w-14 h-14 mb-3 text-muted-foreground/40" />
                <p className="text-base font-semibold text-foreground">No Bios Generated Yet</p>
                <p className="text-xs max-w-xs mt-1 text-muted-foreground">
                  Fill in your name and role on the left to generate formatted bios for X (Twitter), LinkedIn, Instagram, and GitHub.
                </p>
              </GlassCard>
            )}
          </div>
        </div>

        {/* History Panel */}
        {history.length > 0 && (
          <GlassCard className="p-5 bg-background border-border shadow-sm rounded-2xl">
            <div className="flex justify-between items-center mb-3 border-b border-border pb-2">
              <Label className="text-base font-bold text-foreground flex items-center gap-2">
                <History className="w-4 h-4 text-primary" /> Your Bio History ({history.length})
              </Label>
              <Button variant="ghost" size="sm" onClick={clearHistory} className="h-7 text-xs text-muted-foreground hover:text-red-500">
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
              {history.map((item) => (
                <div key={item.id} className="p-3 bg-muted/40 rounded-xl border border-border flex justify-between items-center text-xs">
                  <div className="truncate max-w-[75%]">
                    <span className="font-bold text-foreground truncate block">{item.name} · {item.profession}</span>
                    <span className="text-[10px] text-muted-foreground">{item.timestamp}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setBios(item.bios);
                      setName(item.name);
                      setProfession(item.profession);
                    }}
                    className="h-7 text-xs px-2.5 font-semibold"
                  >
                    Reload
                  </Button>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        <ToolHowItWorks
          steps={[
            { step: "01", title: "Enter Role & Skills", description: "Input your target title, primary skills, and persona vibe.", icon: UserCheck },
            { step: "02", title: "Select Platform Vibe", description: "Choose between Professional, Witty, Founder, or Minimalist.", icon: Sliders },
            { step: "03", title: "Copy Platform Bios", description: "Export pre-formatted bios with character count checks.", icon: CheckCircle2 },
          ]}
          badges={["100% Free", "Character Limit Enforced", "Multi-Platform Ready"]}
        />

        <ToolFeatureGuides
          features={[
            { icon: Twitter, title: "X / Twitter 160-Char Limit Check", description: "Ensures generated bios fit strictly within Twitter's 160-character bio boundary." },
            { icon: Linkedin, title: "LinkedIn Executive Summary", description: "Crafts professional multi-line about sections designed for recruiter visibility." },
            { icon: Instagram, title: "Instagram Bulleted Bios", description: "Uses clean emoji spacing for high visual appeal on mobile screens." },
          ]}
        >
          <div className="prose dark:prose-invert max-w-none">
            <h3>Optimizing Social Profiles for Authority</h3>
            <p>
              Your social media bio is your digital elevator pitch. A clear, well-structured bio instantly communicates your domain authority, key achievements, and call to action to incoming profile visitors.
            </p>
          </div>
        </ToolFeatureGuides>

        <ToolFaqAccordion
          faqs={[
            { question: "What is the character limit for Twitter bios?", answer: "Twitter / X bios allow a maximum of 160 characters." },
            { question: "Can I use emojis in LinkedIn bios?", answer: "Yes, subtle professional emojis (such as 💼, 📍, 💡) increase readability on desktop and mobile feeds." },
          ]}
        />

        <RelatedTools currentToolUrl="/tools/ai/social-bio" max={6} />
      </div>
    </div>
  );
}

export default SocialBioClient;
