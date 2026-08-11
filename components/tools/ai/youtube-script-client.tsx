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
import { Video, Wand2, Copy, Check, RefreshCw, Film, Award } from "lucide-react";
import toast from "react-hot-toast";

interface ScriptResult { titles: string[]; hook: string; outline: string; body: string; }

export default function YoutubeScriptClient() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Educational & Engaging");
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<ScriptResult | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    toast.success(`Copied ${label}!`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleGenerate = async () => {
    if (!topic) return toast.error("Enter a video topic.");
    setLoading(true);
    try {
      const prompt = `Generate a YouTube video script about "${topic}". Tone: ${tone}. 
      Return EXACTLY in this format, separated by |||:
      TITLE 1 | TITLE 2 | TITLE 3 ||| 
      15 SECOND HOOK ||| 
      OUTLINE (Timestamped) ||| 
      FULL SCRIPT BODY`;
      
      const res = await fetch("/api/ai/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt }) });
      const data = await res.json();
      
      if (data.success && data.raw) {
        const parts = data.raw.split("|||").map((p: string) => p.trim());
        if (parts.length >= 4) {
          setScript({
            titles: parts[0].split("|").map((t: string) => t.trim()).filter(Boolean),
            hook: parts[1],
            outline: parts[2],
            body: parts[3]
          });
          toast.success("Script Generated!");
        } else { throw new Error("Parse error"); }
      } else { throw new Error("API error"); }
    } catch (e) {
      // Fallback template
      setScript({
        titles: [`The Secret to ${topic}`, `${topic}: Step-by-Step`, `Master ${topic} Today`],
        hook: `Have you ever wondered how the top 1% master ${topic}? Today, I'm showing you the exact blueprint...`,
        outline: "0:00 Intro\n1:30 The Core Problem\n4:00 The Solution\n8:00 Summary",
        body: `[Intro]\nWelcome back to the channel. Today we dive deep into ${topic}...\n\n[Body]\nStep 1 is understanding the fundamentals...`
      });
      toast.error("AI offline. Loaded template fallback.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader
        title="AI YouTube Video Script & Hook Generator"
        description="Generate viral titles, high-retention hooks, and full teleprompter-ready scripts in seconds."
      />
      
      <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
          <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2">
            <Video className="w-4 h-4 text-red-500" /> Video Topic & Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Topic / Idea</label>
              <Input value={topic} onChange={e => setTopic(e.target.value)} className="bg-muted/20 rounded-xl" placeholder="e.g., Building a SaaS in 30 days" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Tone</label>
              <select value={tone} onChange={e => setTone(e.target.value)} className="w-full p-2 rounded-lg border bg-background text-xs">
                <option>Educational & Engaging</option>
                <option>High-Energy & Hype</option>
                <option>Serious & Documentary</option>
                <option>Comedic & Casual</option>
              </select>
            </div>
          </div>
          <Button onClick={handleGenerate} disabled={loading} className="w-full gap-2 shadow-md rounded-xl font-semibold h-10 justify-center text-xs sm:text-sm">
            {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</> : <><Wand2 className="w-4 h-4" /> Generate Viral Script</>}
          </Button>
        </CardContent>
      </Card>

      {script && (
        <div className="space-y-6">
          <Card className="border border-primary/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-red-500">
                <Award className="w-4 h-4" /> High-CTR Video Titles
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {script.titles.map((t, i) => (
                  <div key={i} className="p-3 bg-primary/10 border border-primary/20 rounded-xl flex justify-between items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold">🔥 {t}</span>
                    <button onClick={() => handleCopy(t, `Title ${i+1}`)}>
                      {copiedSection === `Title ${i+1}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="border border-amber-500/30 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl p-4 sm:p-6 space-y-3">
                <h3 className="font-bold text-sm flex items-center gap-2 text-amber-600 dark:text-amber-400">⏱️ 15-Second Hook</h3>
                <p className="text-xs text-foreground/90 leading-relaxed italic">&quot;{script.hook}&quot;</p>
             </Card>
             <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl p-4 sm:p-6 space-y-3">
                <h3 className="font-bold text-sm">📑 Outline</h3>
                <pre className="text-xs font-mono whitespace-pre-wrap text-muted-foreground">{script.outline}</pre>
             </Card>
          </div>

          <Card className="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-muted/20 p-3 sm:p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <Film className="w-4 h-4" /> Full Script Body
                </CardTitle>
                <Button size="sm" variant="outline" onClick={() => handleCopy(script.body, "Script")} className="h-8 gap-1.5 text-xs rounded-lg">
                  {copiedSection === "Script" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedSection === "Script" ? "Copied" : "Copy All"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <pre className="text-xs whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto p-4 bg-slate-950 text-slate-100 rounded-xl">{script.body}</pre>
            </CardContent>
          </Card>
        </div>
      )}

      <ToolHowItWorks steps={[
        { step: "01", title: "Define Topic", description: "Enter your core idea and select the emotional tone of your video.", icon: Video },
        { step: "02", title: "AI Generation", description: "Our LLM engine structures a high-retention narrative arc tailored to YouTube algorithms.", icon: Wand2 },
        { step: "03", title: "Record & Upload", description: "Copy the teleprompter-ready script and start recording your masterpiece.", icon: Copy }
      ]} badges={["100% Free", "No Watermarks", "Instant"]} />
      
      <ToolFeatureGuides features={[
        { icon: Video, title: "High-CTR Titles", description: "Generates curiosity-gap titles designed to maximize Click-Through Rate." },
        { icon: Wand2, title: "Retention Hooks", description: "Crafts the critical first 15 seconds to prevent viewers from clicking away." },
        { icon: Copy, title: "Teleprompter Ready", description: "Formatted with natural pauses and conversational pacing for easy reading." }
      ]}>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">The Anatomy of a Viral Script</h3>
          <p>YouTube success is not just about the topic — it is about the structure. The Hook, The Meat, and The Payoff. Our AI is trained on thousands of high-performing educational and entertainment formats to ensure your audience stays engaged past the 30-second mark.</p>
        </div>
      </ToolFeatureGuides>
      
      <ToolFaqAccordion faqs={[
        { question: "Can I use this for faceless channels?", answer: "Absolutely. The script includes visual cues and B-roll suggestions that work perfectly for AI voiceover and stock footage channels." },
        { question: "Does it generate timestamps?", answer: "Yes, the outline section provides a timestamped chapter breakdown which you can paste directly into your YouTube description." }
      ]} />
      <RelatedTools currentToolUrl="/tools/ai/youtube-script" max={6} />
    </div>
  );
}
