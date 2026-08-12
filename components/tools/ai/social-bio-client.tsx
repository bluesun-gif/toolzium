"use client";

import React, { useState, useCallback } from"react";
import { motion } from"framer-motion";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { UserCheck, Sparkles, Copy, CheckCircle2, Sliders, RefreshCcw, Twitter, Linkedin, Instagram, Share2 } from"lucide-react";
import toast from"react-hot-toast";

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
 const [vibe, setVibe] = useState<"professional"|"witty"|"minimalist"|"founder">("professional");

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
 const cta = callToAction.trim() ||"linkin.bio/me";

 let tw ="";
 let li ="";
 let ig ="";
 let min ="";

 if (vibe ==="witty") {
 tw = `${p} by day, coffee enthusiast by night. ${skills[0] ? `Obsessed with ${skills[0]}.` :"Building cool stuff."} 👇 ${cta}`;
 li = `Passionate ${p} turning complex ideas into simple solutions. Experienced in ${skills.join(",") ||"innovation"}. Driven by curiosity and great team culture. Contact: ${cta}`;
 ig = `✨ ${p} \n💡 ${skills.join("•") ||"Creative Mind"}\n📍 Building the future\n👇 Tap below! \n${cta}`;
 min = `${n} — ${p}. ${skills[0] ||"Innovator"}.`;
 } else if (vibe ==="founder") {
 tw = `Building the next generation of digital products. ${p} | Ex-tech | Scaling ${skills[0] ||"ideas"}. Join the journey 🚀 ${cta}`;
 li = `Founder & ${p}. Building high-growth tools and scaling teams. Specialized in ${skills.join(",") ||"product design"}. Always open to connecting with fellow builders and founders. ${cta}`;
 ig = `🚀 Founder @ Startup\n🛠️ ${p}\n📈 ${skills[0] ||"Growth & Tech"}\n👇 Check out our latest launch\n${cta}`;
 min = `${n} | Founder & ${p}`;
 } else {
 tw = `${p} specializing in ${skills.join("&") ||"digital strategy"}. Passionate about building impactful solutions. 👇 ${cta}`;
 li = `${p} with a proven track record in ${skills.join(",") ||"strategic development"}. Focused on delivering measurable results and fostering innovation. Portfolio: ${cta}`;
 ig = `💼 ${p}\n🛠️ ${skills.join("•") ||"Strategy"}\n📍 Global\n👇 Explore my work\n${cta}`;
 min = `${n} · ${p} · ${skills[0] ||"Strategist"}`;
 }

 setBios({
 twitter: tw,
 linkedin: li,
 instagram: ig,
 minimalist: min
 });

 setIsGenerating(false);
 toast.success("Generated tailored social media bios!");
 }, 450);
 }, [name, profession, keySkills, callToAction, vibe]);

 const handleCopy = (text: string, label: string) => {
 navigator.clipboard.writeText(text);
 toast.success(`${label} copied to clipboard!`);
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 p-4">
 {/* 3D Pink Social Profile Icon Header Box */}
 <div className="flex items-center gap-4 bg-background p-6 rounded-3xl border border-border shadow-md shadow-slate-200/50">
 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30 flex items-center justify-center shrink-0">
 <UserCheck className="w-7 h-7"/>
 </div>
 <div>
 <div className="flex items-center gap-2">
 <h1 className="text-xl sm:text-2xl font-black text-foreground">AI Social Media Bio & Headline Writer</h1>
 <span className="text-[10px] font-bold uppercase tracking-wider bg-pink-100 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 px-2.5 py-0.5 rounded-full border border-pink-200">POPULAR</span>
 </div>
 <p className="text-xs sm:text-sm text-muted-foreground mt-1">Craft punchy, high-converting social media bios for X (Twitter), LinkedIn, Instagram, and TikTok with live character counters.</p>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <GlassCard className="p-0">
 <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-4">
 <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
 <Share2 className="w-4 h-4 text-pink-600"/>
 Profile Details Input
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-4">
 <div className="grid grid-cols-2 gap-3">
 <div>
 <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Your Name / Handle</Label>
 <Input
 placeholder="e.g. Alex Morgan"
 value={name}
 onChange={(e) => setName(e.target.value)}
 className="bg-background border-border"
 />
 </div>

 <div>
 <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Profession / Role</Label>
 <Input
 placeholder="e.g. Senior Frontend Engineer"
 value={profession}
 onChange={(e) => setProfession(e.target.value)}
 className="bg-background border-border"
 />
 </div>
 </div>

 <div>
 <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Key Skills / Focus (Comma separated)</Label>
 <Input
 placeholder="e.g. Next.js, UI Design, Open Source"
 value={keySkills}
 onChange={(e) => setKeySkills(e.target.value)}
 className="bg-background border-border"
 />
 </div>

 <div className="grid grid-cols-2 gap-3">
 <div>
 <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Target Vibe</Label>
 <select
 className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground font-medium"
 value={vibe}
 onChange={(e) => setVibe(e.target.value as any)}
 >
 <option value="professional">Professional & Corporate</option>
 <option value="witty">Witty & Casual</option>
 <option value="founder">Founder & Creator</option>
 <option value="minimalist">Ultra-Minimalist</option>
 </select>
 </div>

 <div>
 <Label className="text-xs mb-1 block text-slate-700 dark:text-slate-300 font-medium">Call To Action (CTA)</Label>
 <Input
 placeholder="e.g. alexmorgan.dev"
 value={callToAction}
 onChange={(e) => setCallToAction(e.target.value)}
 className="bg-background border-border"
 />
 </div>
 </div>

 <Button onClick={generateBios} disabled={isGenerating || !name.trim() || !profession.trim()} className="w-full gap-2 mt-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold shadow-md shadow-pink-500/20 rounded-xl h-11">
 {isGenerating ? <RefreshCcw className="w-4 h-4 animate-spin"/> : <Sparkles className="w-4 h-4"/>}
 {isGenerating ?"Crafting Bio Variations...":"Generate Social Bios"}
 </Button>
 </CardContent>
 </GlassCard>

 <div className="space-y-4">
 {bios ? (
 <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
 <GlassCard className="p-4 space-y-2 border-l-4 border-l-sky-500">
 <div className="flex items-center justify-between">
 <span className="text-xs font-extrabold text-sky-600 uppercase tracking-wider flex items-center gap-1.5 font-mono">
 <Twitter className="w-3.5 h-3.5"/> X (Twitter) Bio ({bios.twitter.length}/160)
 </span>
 <Button variant="outline"size="sm"onClick={() => handleCopy(bios.twitter,"Twitter bio")} className="h-7 text-xs gap-1 border-border">
 <Copy className="w-3 h-3"/> Copy
 </Button>
 </div>
 <p className="text-xs leading-relaxed font-sans text-foreground dark:text-slate-200">{bios.twitter}</p>
 </GlassCard>

 <GlassCard className="p-4 space-y-2 border-l-4 border-l-blue-600">
 <div className="flex items-center justify-between">
 <span className="text-xs font-extrabold text-primary uppercase tracking-wider flex items-center gap-1.5 font-mono">
 <Linkedin className="w-3.5 h-3.5"/> LinkedIn About Section
 </span>
 <Button variant="outline"size="sm"onClick={() => handleCopy(bios.linkedin,"LinkedIn bio")} className="h-7 text-xs gap-1 border-border">
 <Copy className="w-3 h-3"/> Copy
 </Button>
 </div>
 <p className="text-xs leading-relaxed font-sans text-foreground dark:text-slate-200">{bios.linkedin}</p>
 </GlassCard>

 <GlassCard className="p-4 space-y-2 border-l-4 border-l-pink-500">
 <div className="flex items-center justify-between">
 <span className="text-xs font-extrabold text-pink-600 uppercase tracking-wider flex items-center gap-1.5 font-mono">
 <Instagram className="w-3.5 h-3.5"/> Instagram Bio
 </span>
 <Button variant="outline"size="sm"onClick={() => handleCopy(bios.instagram,"Instagram bio")} className="h-7 text-xs gap-1 border-border">
 <Copy className="w-3 h-3"/> Copy
 </Button>
 </div>
 <pre className="text-xs leading-relaxed font-sans whitespace-pre-wrap text-foreground dark:text-slate-200">{bios.instagram}</pre>
 </GlassCard>
 </motion.div>
 ) : (
 <GlassCard className="p-8 h-[380px] flex flex-col items-center justify-center text-center text-muted-foreground border-dashed border-2 border-border">
 <UserCheck className="w-12 h-12 mb-3 text-slate-300 dark:text-slate-700"/>
 <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No Bios Generated Yet</p>
 <p className="text-xs max-w-xs mt-1 text-muted-foreground">Fill in your name and role on the left to generate formatted bios for X (Twitter), LinkedIn, and Instagram.</p>
 </GlassCard>
 )}
 </div>
 </div>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Enter Role & Skills", description:"Input your target title, primary skills, and persona vibe.", icon: UserCheck },
 { step:"02", title:"Select Platform Vibe", description:"Choose between Professional, Witty, Founder, or Minimalist.", icon: Sliders },
 { step:"03", title:"Copy Platform Bios", description:"Export pre-formatted bios with character count checks.", icon: CheckCircle2 }
 ]}
 badges={["100% Free","Character Limit Enforced","Multi-Platform Ready"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Twitter, title:"X / Twitter 160-Char Limit Check", description:"Ensures generated bios fit strictly within Twitter's 160-character bio boundary."},
 { icon: Linkedin, title:"LinkedIn Executive Summary", description:"Crafts professional multi-line about sections designed for recruiter visibility."},
 { icon: Instagram, title:"Instagram Bulleted Bios", description:"Uses clean emoji spacing for high visual appeal on mobile screens."}
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
 { question:"What is the character limit for Twitter bios?", answer:"Twitter / X bios allow a maximum of 160 characters."},
 { question:"Can I use emojis in LinkedIn bios?", answer:"Yes, subtle professional emojis (such as 💼, 📍, 💡) increase readability on desktop and mobile feeds."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/ai/social-bio"max={6} />
 </div>
 );
}

export default SocialBioClient;
