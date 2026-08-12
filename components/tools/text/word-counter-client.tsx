"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { FileText, Clock, BarChart3, List } from"lucide-react";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";

export default function WordCounterClient() {
 const [text, setText] = useState("");

 const stats = useMemo(() => {
 const words = text.trim() ? text.trim().split(/\s+/).length : 0;
 const chars = text.length;
 const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
 const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;
 
 const readingTime = words > 0 ? Math.ceil(words / 200) : 0;
 const speakingTime = words > 0 ? Math.ceil(words / 130) : 0;

 const wordMatches = text.toLowerCase().match(/\b\w+\b/g) || [];
 const freq: Record<string, number> = {};
 wordMatches.forEach((w) => {
 freq[w] = (freq[w] || 0) + 1;
 });
 const top10 = Object.entries(freq)
 .sort((a, b) => b[1] - a[1])
 .slice(0, 10);

 return { words, chars, sentences, paragraphs, readingTime, speakingTime, top10 };
 }, [text]);

 const statItems = [
 { label:"Words", value: stats.words, icon: FileText },
 { label:"Characters", value: stats.chars, icon: BarChart3 },
 { label:"Sentences", value: stats.sentences, icon: List },
 { label:"Paragraphs", value: stats.paragraphs, icon: FileText },
 { label:"Reading Time", value: `${stats.readingTime} min`, icon: Clock },
 { label:"Speaking Time", value: `${stats.speakingTime} min`, icon: Clock },
 ];

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader icon={FileText} title="Word Counter"description="Count words, characters, and estimate reading and speaking time. Includes keyword density analysis."/>
 
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><FileText className="w-4 h-4 text-primary"/> Document Input</CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4">
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 rows={10}
 className={textareaClass}
 placeholder="Paste your essay, article, or speech transcript here..."
 />
 </CardContent>
 </Card>

 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
 {statItems.map((item) => (
 <Card key={item.label} className={cardClass}>
 <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
 <item.icon className="w-5 h-5 text-primary mb-1"/>
 <div className="text-xl font-bold">{item.value}</div>
 <div className="text-xs text-muted-foreground">{item.label}</div>
 </CardContent>
 </Card>
 ))}
 </div>

 {stats.top10.length > 0 && (
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><List className="w-4 h-4 text-primary"/> Top 10 Most Frequent Words</CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4">
 <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
 {stats.top10.map(([word, count], idx) => (
 <div key={word} className="flex items-center justify-between p-2 rounded-lg bg-muted/40 border border-border/50">
 <span className="font-medium text-sm truncate">{idx + 1}. {word}</span>
 <span className="text-xs font-bold text-primary">{count}</span>
 </div>
 ))}
 </div>
 </CardContent>
 </Card>
 )}

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Paste Content", description:"Drop your article, essay, or speech transcript into the text area.", icon: FileText },
 { step:"02", title:"View Analytics", description:"Instantly see word counts, reading times, and structural metrics.", icon: BarChart3 },
 { step:"03", title:"Analyze Density", description:"Review the top keywords to ensure your content is focused and optimized.", icon: List },
 ]}
 badges={["100% Free","Client-Side","Instant"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: FileText, title:"Comprehensive Metrics", description:"Tracks words, characters, sentences, and paragraphs simultaneously."},
 { icon: Clock, title:"Time Estimations", description:"Calculates reading time (200 wpm) and speaking time (130 wpm) for presentations."},
 { icon: List, title:"Keyword Density", description:"Identifies the top 10 most used words to help avoid repetition and improve SEO."},
 { icon: BarChart3, title:"Live Updates", description:"Metrics recalculate dynamically with every keystroke for immediate feedback."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Understanding the exact length and density of your text is vital for writers, students, and marketers. Academic assignments often have strict word limits, while digital marketers need to ensure blog posts are long enough to rank well on search engines without becoming overly verbose. This tool provides the precise metrics needed to hit those targets.</p>
 <p>Beyond simple counting, the reading and speaking time estimators are invaluable for content creators. If you are writing a script for a YouTube video or preparing a keynote speech, knowing that your text will take exactly 5 minutes to read aloud at a normal pace helps you structure your presentation to fit within allocated time slots.</p>
 <p>The keyword density analysis reveals which words you are overusing. Search engines penalize"keyword stuffing,"and readers disengage when texts feel repetitive. By checking your top 10 most frequent words, you can identify opportunities to use synonyms, enrich your vocabulary, and ensure your core message is landing effectively without being overwhelming.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"How is reading time calculated?", answer:"Reading time is estimated based on the average adult reading speed of 200 words per minute (wpm). Speaking time uses a slower average of 130 wpm."},
 { question:"Are stop words included in the top 10 list?", answer:"Yes, this tool counts all words including common stop words like 'the', 'and', and 'is'. This gives a raw frequency map of your text."},
 { question:"Does it count hyphenated words as one or two?", answer:"Hyphenated words are generally counted as a single word by our regex matching algorithm, which aligns with most standard word processors."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/text/word-counter"max={6} />
 </div>
 );
}
