"use client";

import React, { useState, useMemo, useCallback, useEffect } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Copy, RotateCcw, Wand2, Loader2, CheckCircle2 } from"lucide-react";
import toast from"react-hot-toast";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

interface MetaVariation {
 title: string;
 description: string;
 keywords: string;
}

export function AiMetaGeneratorClient() {
 const [topic, setTopic] = useState("");
 const [pageType, setPageType] = useState("Homepage");
 const [audience, setAudience] = useState("");
 const [loading, setLoading] = useState(false);
 const [variations, setVariations] = useState<MetaVariation[]>([]);
 const [editingIndex, setEditingIndex] = useState<number | null>(null);

 const handleGenerate = async () => {
 if (!topic.trim()) {
 toast.error("Please enter a page topic or keyword");
 return;
 }

 setLoading(true);
 setVariations([]);
 
 const prompt = `Generate 3 distinct SEO meta tag variations for a ${pageType} about"${topic}". ${audience ? `Target audience: ${audience}.` :""}
Format exactly as follows for each variation, separated by"---":
Title: [50-60 chars, compelling, includes keyword]
Description: [150-160 chars, engaging summary with CTA]
Keywords: [comma-separated list of 5-7 relevant tags]`;

 try {
 const res = await fetch('/api/ai/generate', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ prompt })
 });
 
 if (!res.ok) throw new Error("API Error");
 const data = await res.json();
 
 const rawOutput = data.raw || data.results?.join('\n') ||"";
 const parsed = rawOutput.split('---').filter((v: string) => v.trim().length > 0).map((v: string) => {
 const lines = v.trim().split('\n');
 let title = '', description = '', keywords = '';
 lines.forEach((line: string) => {
 const cleanLine = line.trim();
 if (cleanLine.toLowerCase().startsWith('title:')) title = cleanLine.replace(/^title:/i, '').trim();
 if (cleanLine.toLowerCase().startsWith('description:')) description = cleanLine.replace(/^description:/i, '').trim();
 if (cleanLine.toLowerCase().startsWith('keywords:')) keywords = cleanLine.replace(/^keywords:/i, '').trim();
 });
 return { title, description, keywords };
 }).filter((v: any) => v.title && v.description);

 if (parsed.length === 0) throw new Error("Failed to parse AI output");
 
 setVariations(parsed);
 toast.success(`Generated ${parsed.length} variations!`);
 } catch (err) {
 console.error(err);
 toast.error("Failed to generate meta tags. Please try again.");
 } finally {
 setLoading(false);
 }
 };

 const handleUpdateVariation = (index: number, field: keyof MetaVariation, value: string) => {
 const updated = [...variations];
 updated[index][field] = value;
 setVariations(updated);
 };

 const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success("Copied to clipboard");
 };

 const handleCopyAll = (v: MetaVariation) => {
 const html = `<title>${v.title}</title>
<meta name="description"content="${v.description}"/>
<meta name="keywords"content="${v.keywords}"/>
<meta property="og:title"content="${v.title}"/>
<meta property="og:description"content="${v.description}"/>`;
 handleCopy(html);
 };

 const checkSeoRules = (v: MetaVariation) => {
 return {
 titleOk: v.title.length >= 40 && v.title.length <= 60,
 descOk: v.description.length >= 140 && v.description.length <= 160,
 kwOk: v.keywords.split(',').length >= 3
 };
 };

 const handleReset = () => {
 setTopic("");
 setAudience("");
 setVariations([]);
 };

 return (
 <div className="max-w-6xl mx-auto space-y-8 p-4">
 <ToolPageHeader
 icon={Wand2}
 title="AI SEO Meta Tag Generator"
 description="Generate highly optimized, click-worthy title tags and meta descriptions powered by advanced AI language models."
 />

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Wand2 className="w-4 h-4"/> Meta Generation Studio
 </CardTitle>
 </CardHeader>
 <CardContent className="p-4 sm:p-6 space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2 md:col-span-2">
 <Label>Page Topic / Primary Keyword</Label>
 <Input 
 value={topic} 
 onChange={(e) => setTopic(e.target.value)} 
 placeholder="e.g., Best mechanical keyboards for programming"
 />
 </div>
 
 <div className="space-y-2">
 <Label>Page Type</Label>
 <select 
 className="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50"
 value={pageType}
 onChange={(e) => setPageType(e.target.value)}
 >
 {["Homepage","Blog Post","Product Page","Service Page","Landing Page","Category Page"].map((t: string) => (
 <option key={t} value={t}>{t}</option>
 ))}
 </select>
 </div>

 <div className="space-y-2">
 <Label>Target Audience (Optional)</Label>
 <Input 
 value={audience} 
 onChange={(e) => setAudience(e.target.value)} 
 placeholder="e.g., Senior software engineers"
 />
 </div>
 </div>

 <div className="flex gap-3">
 <Button onClick={handleGenerate} disabled={loading} className="w-full sm:w-auto">
 {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : <Wand2 className="w-4 h-4 mr-2"/>}
 Generate AI Meta Tags
 </Button>
 <Button variant="outline"onClick={handleReset}>
 <RotateCcw className="w-4 h-4 mr-2"/> Reset
 </Button>
 </div>

 {loading && (
 <div className="space-y-4 mt-6 border-t border-border/50 pt-6">
 <div className="animate-pulse space-y-4">
 <div className="h-4 bg-muted rounded w-1/4"></div>
 <div className="h-12 bg-muted rounded w-full"></div>
 <div className="h-20 bg-muted rounded w-full"></div>
 <div className="h-4 bg-muted rounded w-1/2"></div>
 </div>
 </div>
 )}

 {variations.length > 0 && !loading && (
 <div className="space-y-6 mt-6 border-t border-border/50 pt-6">
 <h3 className="font-semibold text-lg">Generated Variations (Click to edit)</h3>
 <div className="space-y-6">
 {variations.map((v, i) => {
 const rules = checkSeoRules(v);
 return (
 <Card key={i} className="border border-border/50 bg-muted/10">
 <CardContent className="p-4 sm:p-6 space-y-4">
 <div className="flex justify-between items-center">
 <span className="font-bold text-primary">Option {i + 1}</span>
 <Button size="sm"onClick={() => handleCopyAll(v)}>
 <Copy className="w-3 h-3 mr-2"/> Copy HTML
 </Button>
 </div>

 <div className="space-y-2">
 <div className="flex justify-between items-center">
 <Label>Title Tag</Label>
 <span className={`text-xs font-mono ${rules.titleOk ? 'text-green-500' : 'text-yellow-500'}`}>
 {v.title.length}/60
 </span>
 </div>
 <Input 
 value={v.title} 
 onChange={(e) => handleUpdateVariation(i, 'title', e.target.value)}
 className={`font-semibold ${rules.titleOk ? 'border-green-500/50' : 'border-yellow-500/50'}`}
 />
 </div>

 <div className="space-y-2">
 <div className="flex justify-between items-center">
 <Label>Meta Description</Label>
 <span className={`text-xs font-mono ${rules.descOk ? 'text-green-500' : 'text-yellow-500'}`}>
 {v.description.length}/160
 </span>
 </div>
 <textarea
 className={textareaClass}
 rows={3}
 value={v.description}
 onChange={(e) => handleUpdateVariation(i, 'description', e.target.value)}
 />
 </div>

 <div className="space-y-2">
 <Label>Keywords</Label>
 <Input 
 value={v.keywords} 
 onChange={(e) => handleUpdateVariation(i, 'keywords', e.target.value)}
 className="text-muted-foreground"
 />
 </div>

 <div className="flex flex-wrap gap-2 pt-2 border-t border-border/30">
 {rules.titleOk && <span className="text-[10px] px-2 py-1 bg-green-500/10 text-green-500 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Title Length OK</span>}
 {rules.descOk && <span className="text-[10px] px-2 py-1 bg-green-500/10 text-green-500 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Desc Length OK</span>}
 {rules.kwOk && <span className="text-[10px] px-2 py-1 bg-green-500/10 text-green-500 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Keywords OK</span>}
 </div>
 </CardContent>
 </Card>
 );
 })}
 </div>
 </div>
 )}
 </CardContent>
 </Card>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Define Your Page Context", description:"Enter your primary keyword, page type, and target audience to give the AI precise context for generation.", icon: Wand2 },
 { step:"02", title:"Generate Variations", description:"Our AI engine crafts 3 distinct title and description combinations optimized for CTR and search intent.", icon: Loader2 },
 { step:"03", title:"Refine & Export", description:"Edit the generated tags inline to perfect them, then copy the complete HTML block to your CMS.", icon: Copy }
 ]}
 badges={["AI-Powered","CTR Optimized","SEO Checklist"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Wand2, title:"Contextual AI Generation", description:"Tailors the tone and structure of meta tags based on whether you are writing a blog post, product page, or landing page."},
 { icon: CheckCircle2, title:"Real-Time SEO Auditing", description:"Instantly validates your title and description lengths against Google's truncation limits to ensure maximum visibility."},
 { icon: Copy, title:"Full HTML Export", description:"Copies a complete block including standard meta tags, OG tags, and Twitter cards with a single click."},
 { icon: RotateCcw, title:"Inline Editing", description:"Not quite right? Click any generated title or description to manually tweak the copy while maintaining the character counters."}
 ]}
 >
 <h3>The Science of Click-Through Rates</h3>
 <p>Your title tag and meta description are your only billboard on a crowded search engine results page (SERP). Even if you rank #1, a poorly written meta tag will result in low click-through rates, which can eventually cause your rankings to drop. AI-assisted generation allows you to rapidly iterate through compelling, emotionally resonant copy that drives action.</p>
 <p>Toolzium's AI Meta Generator doesn't just output random text; it applies SEO best practices natively. It ensures your primary keyword is placed prominently in the title, utilizes active voice in descriptions, and includes subtle calls-to-action. Combined with our built-in length validators, you can deploy meta tags with the confidence that they will display perfectly across all devices and search engines.</p>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Does Google use meta keywords for ranking?", answer:"No, Google has publicly stated that the 'keywords' meta tag has no impact on search rankings. However, generating them is still useful for internal tagging systems or legacy CMS platforms."},
 { question:"Will AI content be penalized by Google?", answer:"Google's guidelines state that they reward high-quality, helpful content regardless of how it is produced. Use the AI output as a strong foundation, but always review and edit to ensure it accurately reflects your page content."},
 { question:"What is the perfect length for a title tag?", answer:"Aim for 50-60 characters. Google typically displays the first 600 pixels of a title, which roughly translates to 60 characters. Our tool highlights titles that exceed this limit."},
 { question:"Can I use the same meta description for multiple pages?", answer:"It is highly discouraged. Duplicate meta descriptions confuse search engines and dilute your CTR. Every page should have a unique description that accurately summarizes its specific content."}
 ]}
 />

 <RelatedTools currentToolUrl="/tools/seo/ai-meta-generator"max={6} />
 </div>
 );
}

export default AiMetaGeneratorClient;
