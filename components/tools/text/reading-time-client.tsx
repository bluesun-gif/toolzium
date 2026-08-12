"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Clock, BookOpen, Mic, FileText } from"lucide-react";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";

export default function ReadingTimeClient() {
 const [text, setText] = useState("");

 const stats = useMemo(() => {
 const words = text.trim() ? text.trim().split(/\s+/).length : 0;
 const readingTime = words > 0 ? Math.ceil(words / 200) : 0;
 const speakingTime = words > 0 ? Math.ceil(words / 130) : 0;
 const fastReadingTime = words > 0 ? Math.ceil(words / 300) : 0;
 const pageCount = words > 0 ? Math.ceil(words / 250) : 0;

 return { words, readingTime, speakingTime, fastReadingTime, pageCount };
 }, [text]);

 const statItems = [
 { label:"Total Words", value: stats.words, icon: FileText, color:"text-foreground"},
 { label:"Reading (200 wpm)", value: `${stats.readingTime} min`, icon: BookOpen, color:"text-primary"},
 { label:"Fast Reading (300 wpm)", value: `${stats.fastReadingTime} min`, icon: BookOpen, color:"text-green-500"},
 { label:"Speaking (130 wpm)", value: `${stats.speakingTime} min`, icon: Mic, color:"text-primary"},
 { label:"Estimated Pages", value: `${stats.pageCount} pages`, icon: FileText, color:"text-orange-500"},
 ];

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader icon={Clock} title="Reading Time Estimator"description="Calculate exactly how long it takes to read or speak your text based on average human speeds."/>
 
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
 placeholder="Paste your article, speech, or book chapter here..."
 />
 </CardContent>
 </Card>

 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
 {statItems.map((item) => (
 <Card key={item.label} className={cardClass}>
 <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
 <item.icon className={`w-6 h-6 ${item.color}`} />
 <div className="text-2xl font-bold">{item.value}</div>
 <div className="text-xs text-muted-foreground text-center leading-tight">{item.label}</div>
 </CardContent>
 </Card>
 ))}
 </div>

 {stats.words > 0 && (
 <Card className={cardClass}>
 <CardContent className="p-4 space-y-2">
 <div className="flex justify-between text-xs text-muted-foreground mb-1">
 <span>Page Progress (250 words/page)</span>
 <span>{stats.pageCount} {stats.pageCount === 1 ? 'Page' : 'Pages'}</span>
 </div>
 <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
 <div 
 className="h-full bg-primary transition-all duration-500"
 style={{ width: `${Math.min((stats.words % 250) / 250 * 100, 100)}%` }} 
 />
 </div>
 </CardContent>
 </Card>
 )}

 <ToolHowItWorks
 steps={[
 { step:"01", title:"Paste Text", description:"Input your blog post, essay, or speech transcript into the editor.", icon: FileText },
 { step:"02", title:"Analyze Metrics", description:"The tool instantly counts words and calculates time based on standard speeds.", icon: Clock },
 { step:"03", title:"Plan Delivery", description:"Use the speaking time to prepare presentations or reading time for blog UX.", icon: BookOpen },
 ]}
 badges={["100% Free","Client-Side","Instant"]}
 />

 <ToolFeatureGuides
 features={[
 { icon: BookOpen, title:"Multiple Speeds", description:"Provides estimates for average readers (200 wpm) and fast readers (300 wpm)."},
 { icon: Mic, title:"Speech Timing", description:"Calculates how long the text will take to read aloud for podcasts and videos."},
 { icon: FileText, title:"Page Estimation", description:"Converts word count into standard manuscript pages (250 words per page)."},
 { icon: Clock, title:"Live Updates", description:"Metrics adjust dynamically as you write, helping you hit exact length targets."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>Displaying an estimated reading time at the top of a blog post or article is a proven way to improve user experience. Readers appreciate knowing upfront whether a piece will take two minutes or twenty minutes to consume, allowing them to decide if they have time to read it now or should bookmark it for later. Medium and major publications use this metric heavily to set reader expectations.</p>
 <p>The average adult reads technical or non-fiction text at about 200 to 250 words per minute (wpm). However, skimming or reading light fiction can push that speed to 300 wpm or higher. By providing both standard and fast reading estimates, content creators can cater to different audience behaviors and accurately gauge the depth of their material.</p>
 <p>For public speakers, podcasters, and video creators, the speaking time metric is even more critical. The average conversational speaking rate is around 130 to 150 wpm. If you are writing a script for a 10-minute YouTube video, you need roughly 1,300 to 1,500 words. This tool ensures your script fits perfectly within your allocated time slot, preventing you from rushing through the ending or running out of things to say.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 { question:"What is the average reading speed used?", answer:"We use 200 words per minute (wpm) for standard reading and 300 wpm for fast reading. These are widely accepted averages for adult comprehension of digital text."},
 { question:"How is speaking time calculated?", answer:"Speaking time is based on an average presentation speed of 130 words per minute, which allows for natural pauses, emphasis, and audience comprehension."},
 { question:"What counts as a 'page'?", answer:"The page count estimator uses the traditional publishing standard of 250 words per page, which is common for manuscripts and academic assignments."},
 ]}
 />

 <RelatedTools currentToolUrl="/tools/text/reading-time"max={6} />
 </div>
 );
}
