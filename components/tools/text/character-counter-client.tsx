"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Hash, FileText, BarChart3, Zap } from"lucide-react";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";

export default function CharacterCounterClient() {
 const [text, setText] = useState("");

 const stats = useMemo(() => {
 const chars = text.length;
 const charsNoSpaces = text.replace(/\s/g,"").length;
 const words = text.trim() ? text.trim().split(/\s+/).length : 0;
 const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
 const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;
 const lines = text ? text.split(/\n/).length : 0;
 const avgWordLength = words > 0 ? Math.round((charsNoSpaces / words) * 10) / 10 : 0;
 
 return { chars, charsNoSpaces, words, sentences, paragraphs, lines, avgWordLength };
 }, [text]);

 const statItems = [
 { label:"Characters", value: stats.chars, icon: Hash },
 { label:"Chars (No Spaces)", value: stats.charsNoSpaces, icon: Hash },
 { label:"Words", value: stats.words, icon: FileText },
 { label:"Sentences", value: stats.sentences, icon: BarChart3 },
 { label:"Paragraphs", value: stats.paragraphs, icon: FileText },
 { label:"Lines", value: stats.lines, icon: BarChart3 },
 { label:"Avg Word Length", value: stats.avgWordLength, icon: Zap },
 ];

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader icon={Hash} title="Character Counter"description="Count characters, words, sentences, paragraphs, and lines in real-time as you type."/>
 
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><FileText className="w-4 h-4 text-primary"/> Text Input</CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4">
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 rows={10}
 className={textareaClass}
 placeholder="Start typing or paste your text here to see live statistics..."
 />
 </CardContent>
 </Card>

 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
 {statItems.map((item) => (
 <Card key={item.label} className={cardClass}>
 <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
 <item.icon className="w-5 h-5 text-primary mb-1"/>
 <div className="text-2xl font-bold">{item.value}</div>
 <div className="text-xs text-muted-foreground">{item.label}</div>
 </CardContent>
 </Card>
 ))}
 </div>

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Input Text", description:"Type directly into the box or paste an existing document to analyze.", icon: FileText },
 { step:"02", title:"Live Analysis", description:"Watch the statistics update instantly with every keystroke or deletion.", icon: BarChart3 },
 { step:"03", title:"Review Metrics", description:"Use the detailed breakdown to ensure your text meets specific length requirements.", icon: Zap },
 ]}
 badges={["100% Free","Client-Side","Instant"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: Hash, title:"Granular Counting", description:"Differentiates between total characters and characters excluding whitespace."},
 { icon: FileText, title:"Structural Metrics", description:"Accurately counts sentences, paragraphs, and line breaks for formatting checks."},
 { icon: BarChart3, title:"Real-Time Updates", description:"No submit button required; statistics recalculate dynamically as you edit."},
 { icon: Zap, title:"Average Word Length", description:"Calculates the mean length of your words to help gauge reading complexity."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Whether you are drafting a tweet, writing an SEO-optimized meta description, or submitting an academic essay, adhering to strict character and word limits is crucial. A reliable character counter ensures you stay within boundaries without having to manually highlight text in a word processor.</p>
 <p>Different platforms enforce different rules. Twitter/X limits posts to 280 characters, Facebook ads perform best under specific character counts, and SEO title tags should ideally remain under 60 characters to avoid truncation in search results. By tracking characters without spaces, you can also estimate the exact byte size of your text for database storage limits or SMS messaging constraints.</p>
 <p>Beyond simple counting, analyzing sentences and paragraphs helps writers maintain a good rhythm and structure. Shorter sentences and paragraphs generally improve readability scores and keep digital readers engaged. This tool provides the comprehensive metrics needed to refine your writing for any medium.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"Do spaces count as characters?", answer:"Yes, the 'Characters' metric includes all spaces and line breaks. We also provide a 'Chars (No Spaces)' metric if you need to exclude whitespace."},
 { question:"How are paragraphs counted?", answer:"Paragraphs are counted based on double line breaks (empty lines between text blocks). Single line breaks are counted as separate lines within the same paragraph."},
 { question:"Is there a limit to how much text I can paste?", answer:"The tool can handle tens of thousands of words effortlessly. Because it runs locally in your browser, the only limit is your device's available memory."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/text/character-counter"max={6} />
 </div>
 );
}
