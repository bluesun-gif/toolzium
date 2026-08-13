"use client";

import React, { useState, useEffect } from "react";
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
import { CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Car, RefreshCw, Sparkles, Shield, BookOpen, Layers, Zap } from"lucide-react";
import toast from "react-hot-toast";

const CREW_TYPES = [
  { value: "mafia", label: "🕴️ Italian & Russian Mafia Syndicate" },
  { value: "street", label: "🔥 Street Racing & Underground Tuners" },
  { value: "cartel", label: "🌴 Sinaloa & Narco Cartel" },
  { value: "cop", label: "👮 LSPD & FIB Tactical Operations" },
  { value: "biker", label: "🏍️ Outlaw Motorcycle Club (MC)" },
];

export default function GtaNameClient() {
  const [crewType, setCrewType] = useState("mafia");
  const [cityPrefix, setCityPrefix] = useState("Los Santos");
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateGtaNames = async () => {
    setLoading(true);

    try {
      const prompt = `Generate 10 badass GTA V / GTA RP crew names and custom 8-character vanity license plate texts for a '${crewType}' organization based in '${cityPrefix}'. Format each output as: 'Crew Name [VANITY_PLATE]'. Output 1 per line. No markdown formatting.`;

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("AI API failed");

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setNames(data.results);
        toast.success("AI generated fresh GTA crew names & plates!");
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      console.warn("AI generation fallback:", err);
      setNames([
        "Vercetti Crime Syndicate [OUTLAW8]",
        "Los Santos Speed Syndicate [FASTAF99]",
        "Vinewood Narco Cartel [NARCO88]",
        "FIB Special Operations [LAWMAN01]",
        "Pacific Coast Outlaw MC [BADBOYS]",
        "Del Perro Drift Cartel [DRIFTKNG]",
      ]);
      toast.success("Generated GTA crew names.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateGtaNames();
  }, [crewType]);

  const handleReset = () => {
    setCrewType("mafia");
    setCityPrefix("Los Santos");
    generateGtaNames();
  };

  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
      <GridPattern />

      <ToolPageHeader
        icon={Car}
        title="GTA V License Plate & Crew Name Studio"
        description="Generate badass GTA Online crew names, NoPixel RP gang tags, and 8-character custom vanity license plates with live AI."
        actions={<ResetButton onClick={handleReset} label="Reset" />}
      />

      {/* INPUT CONTROL */}
      <GlassCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Car className="h-5 w-5 text-primary" />
            Crew Archetype & Territory
          </CardTitle>
          <CardDescription>Select crew category and enter territory or custom lore keywords.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Crew Archetype</Label>
              <Select value={crewType} onValueChange={(v) => setCrewType(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select archetype" />
                </SelectTrigger>
                <SelectContent>
                  {CREW_TYPES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Territory / City Name</Label>
              <Input
                id="city"
                value={cityPrefix}
                onChange={(e) => setCityPrefix(e.target.value)}
                placeholder="e.g. Los Santos, Liberty City, Vice City"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={generateGtaNames}
              disabled={loading}
              className="gap-2 font-bold h-11 px-6 shadow-md"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "AI Crafting..." : "Generate AI Crew & Plates"}
            </Button>
          </div>
        </CardContent>
      </GlassCard>

      {/* RESULTS GRID */}
      {names.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            GTA Crew Names & License Plates
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {names.map((item, idx) => (
              <GlassCard key={idx} className="p-4 flex items-center justify-between hover:border-primary/40 transition-all">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono font-bold text-muted-foreground w-6">#{idx + 1}</span>
                  <span className="font-bold text-sm text-foreground truncate">{item}</span>
                </div>
                <CopyButton getText={() => item} label="Copy" />
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Select Crew Archetype",
            description: "Choose Mafia Syndicate, Street Racers, Narco Cartel, FIB Ops, or Biker MC.",
            icon: Car,
          },
          {
            step: "02",
            title: "Generate Name & Plate",
            description: "AI generates crew names together with legal 8-character GTA Online vanity license plates.",
            icon: Sparkles,
          },
          {
            step: "03",
            title: "Apply in Rockstar Social Club",
            description: "Copy crew name into Rockstar Social Club and custom plate into iFruit / Los Santos Customs.",
            icon: Shield,
          },
        ]}
        badges={["8-Char Vanity Plates", "NoPixel RP Compatible", "100% Free"]}
      />

      {/* FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: Car,
            title: "GTA License Plate Limit",
            description: "Generates custom vanity plates restricted to 8 alphanumeric characters allowed by Los Santos Customs.",
          },
          {
            icon: Sparkles,
            title: "Social Club & NoPixel Ready",
            description: "Formatted for Rockstar Games Social Club crew creation and FiveM / NoPixel roleplay servers.",
          },
          {
            icon: Shield,
            title: "100% Free & Fast",
            description: "Generates unlimited crew names without linking Rockstar Social Club accounts.",
          },
        ]}
      />

      {/* FAQ ACCORDION */}
      <ToolFaqAccordion
        faqs={[
          {
            question: "How long can a custom GTA license plate be?",
            answer: "GTA Online custom vanity plates allow up to 8 characters (letters and numbers only, no spaces or special symbols).",
          },
          {
            question: "Can I use these crew names for FiveM / NoPixel RP?",
            answer: "Yes! All generated gang tags and mafia titles are formatted for FiveM roleplay server gang registration.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/gaming/gta-name-generator" max={6} />
    </div>
  );
}
