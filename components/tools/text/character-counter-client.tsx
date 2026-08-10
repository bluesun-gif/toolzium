"use client";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { Copy, Trash2, Hash, BarChart2, Shield, Zap, BookOpen, Type, AlignLeft } from "lucide-react";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";const SOCIAL_LIMITS = [
  { name: "Twitter/X", limit: 280 },
  { name: "Instagram Caption", limit: 2200 },
  { name: "LinkedIn Post", limit: 3000 },
  { name: "TikTok Caption", limit: 2200 },
  { name: "YouTube Title", limit: 100 },
  { name: "YouTube Description", limit: 5000 },
  { name: "Facebook Post", limit: 63206 }
];

export default function CharacterCounterClient() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const charsWithSpaces = text.length;
    const charsWithoutSpaces = text.replace(/\s/g, "").length;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
    
    // Average reading time (200 wpm)
    const readingMinutes = words / 200;
    const readingTime = readingMinutes < 1 ? "< 1 min" : `${Math.ceil(readingMinutes)} min`;
    
    // Average speaking time (130 wpm)
    const speakingMinutes = words / 130;
    const speakingTime = speakingMinutes < 1 ? "< 1 min" : `${Math.ceil(speakingMinutes)} min`;

    // Word frequency
    const wordCounts: Record<string, number> = {};
    const wordsList = text.toLowerCase().match(/\b\w+\b/g) || [];
    wordsList.forEach(w => {
      wordCounts[w] = (wordCounts[w] || 0) + 1;
    });
    const topWords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return {
      charsWithSpaces,
      charsWithoutSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      topWords
    };
  }, [text]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard");
  };

  const handleClear = () => {
    setText("");
    toast.success("Text cleared");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        title="Character Counter"
        description="Count characters, words, sentences, and paragraphs in real-time. Check social media limits."
      />
      
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Input Text</CardTitle>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={handleCopy} disabled={!text}>
                  <Copy className="h-4 w-4 mr-1" /> Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleClear} disabled={!text}>
                  <Trash2 className="h-4 w-4 mr-1" /> Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Type or paste your text here..." 
                className="min-h-[300px] resize-y" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {SOCIAL_LIMITS.map(limit => {
                const isOver = stats.charsWithSpaces > limit.limit;
                const percentage = Math.min((stats.charsWithSpaces / limit.limit) * 100, 100);
                let colorClass = "bg-green-500";
                if (percentage > 90) colorClass = "bg-red-500";
                else if (percentage > 75) colorClass = "bg-yellow-500";

                return (
                  <div key={limit.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{limit.name}</span>
                      <span className={isOver ? "text-red-500 font-medium" : "text-muted-foreground"}>
                        {stats.charsWithSpaces} / {limit.limit}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={"h-full " + (colorClass) + " transition-all duration-300"} 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{stats.charsWithSpaces}</div>
                  <div className="text-xs text-muted-foreground">Chars (with spaces)</div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{stats.charsWithoutSpaces}</div>
                  <div className="text-xs text-muted-foreground">Chars (no spaces)</div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{stats.words}</div>
                  <div className="text-xs text-muted-foreground">Words</div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{stats.sentences}</div>
                  <div className="text-xs text-muted-foreground">Sentences</div>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{stats.paragraphs}</div>
                  <div className="text-xs text-muted-foreground">Paragraphs</div>
                </div>
              </div>
              
              <div className="pt-4 space-y-2 border-t">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Reading Time</span>
                  <span className="text-sm font-medium">{stats.readingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Speaking Time</span>
                  <span className="text-sm font-medium">{stats.speakingTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Words</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topWords.length > 0 ? (
                <div className="space-y-2">
                  {stats.topWords.map(([word, count]) => (
                    <div key={word} className="flex justify-between items-center text-sm">
                      <span className="truncate max-w-[150px]">{word}</span>
                      <span className="bg-secondary px-2 py-0.5 rounded-full text-xs font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No words yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          { step: "01", title: "Type or Paste Text", description: "Type directly or paste any text into the editor. Character, word, sentence, and paragraph counts update instantly as you type with no button press needed.", icon: Type },
          { step: "02", title: "View Detailed Stats", description: "See characters with and without spaces, words, sentences, paragraphs, unique words, average word length, estimated reading time, and speaking time all at a glance.", icon: BarChart2 },
          { step: "03", title: "Check Platform Limits", description: "Compare your text against character limits for Twitter (280), LinkedIn (3000), Instagram captions (2200), SMS (160), YouTube titles (100), and email subject lines (60).", icon: Hash },
        ]}
        badges={["Real-time counting", "Platform limits", "Reading time estimate"]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          { icon: Hash, title: "Comprehensive Text Stats", description: "Counts characters (with and without spaces), words, sentences, paragraphs, lines, unique words, and most frequent words. All statistics update in real time as you type." },
          { icon: BarChart2, title: "Platform Limit Checker", description: "Instantly see how your text compares to character limits for major platforms: Twitter/X (280), LinkedIn posts (3000), Instagram captions (2200), SMS (160), YouTube titles (100), Meta descriptions (155)." },
          { icon: BookOpen, title: "Reading and Speaking Time", description: "Estimates reading time based on the average adult reading speed of 238 words per minute (WPM). Estimates speaking time based on the average speaking speed of 130 WPM for presentations." },
          { icon: Zap, title: "Real-Time Analysis", description: "All statistics are computed instantly using browser-native string operations. No API calls, no delays. The counter handles texts of any length from a single character to full articles." },
          { icon: AlignLeft, title: "Keyword Density", description: "See the most frequently used words and their occurrence count. Helps identify keyword stuffing in SEO content and spot overused filler words in writing." },
          { icon: Shield, title: "Client-Side and Private", description: "All text analysis runs in your browser. Your text is never sent to any server. Safe for confidential documents, proprietary content, and sensitive business text." },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Character Limit Reference by Platform</h3>
          <p>Every major social media and communication platform has different character and word limits. Knowing these limits is essential for content creators, social media managers, copywriters, and developers building content pipelines. Exceeding limits causes truncation, rejection, or poor user experience.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Platform / Field</th>
                  <th className="border p-2 text-left">Limit</th>
                  <th className="border p-2 text-left">Type</th>
                  <th className="border p-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Twitter / X Post", "280", "Characters", "URLs count as 23 chars each"],
                  ["Twitter / X DM", "10,000", "Characters", "Direct messages"],
                  ["Instagram Caption", "2,200", "Characters", "Truncated at 125 in feed"],
                  ["Instagram Bio", "150", "Characters", "Profile bio field"],
                  ["Facebook Post", "63,206", "Characters", "Practical limit much lower"],
                  ["LinkedIn Post", "3,000", "Characters", "Shows See more at 210"],
                  ["LinkedIn Headline", "220", "Characters", "Professional headline"],
                  ["TikTok Caption", "2,200", "Characters", "Same as Instagram"],
                  ["YouTube Title", "100", "Characters", "Truncated at ~70 in search"],
                  ["YouTube Description", "5,000", "Characters", "First 200 shown without expanding"],
                  ["SMS (GSM)", "160", "Characters", "160 per segment, multi-part above"],
                  ["SMS (Unicode)", "70", "Characters", "70 per segment for non-ASCII"],
                  ["Email Subject", "60-78", "Characters", "Most clients truncate above 60"],
                  ["Meta Description", "155-160", "Characters", "Google displays 155-160"],
                  ["Google Ads Headline", "30", "Characters", "Per headline, up to 15 headlines"],
                  ["Google Ads Description", "90", "Characters", "Per description line"],
                ].map(([platform, limit, type, notes]) => (
                  <tr key={platform} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{platform}</td>
                    <td className="border p-2 font-mono text-primary font-bold text-xs">{limit}</td>
                    <td className="border p-2 text-xs">{type}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold">Reading Speed and Time Estimates</h3>
          <p>The tool estimates reading time using the average adult silent reading speed of <strong>238 words per minute</strong> (WPM), derived from a 2019 meta-analysis by Brysbaert. Speaking time uses <strong>130 WPM</strong> for presentations (deliberate speech) and 150 WPM for conversational speech.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Word Count</th>
                  <th className="border p-2 text-left">Reading Time</th>
                  <th className="border p-2 text-left">Speaking Time</th>
                  <th className="border p-2 text-left">Content Type</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["100 words", "25 sec", "46 sec", "Short social post, product description"],
                  ["300 words", "1.3 min", "2.3 min", "News brief, email"],
                  ["500 words", "2.1 min", "3.8 min", "Short blog post"],
                  ["800 words", "3.4 min", "6.2 min", "Standard blog article"],
                  ["1,500 words", "6.3 min", "11.5 min", "Long-form article"],
                  ["2,500 words", "10.5 min", "19 min", "In-depth guide"],
                  ["10,000 words", "42 min", "77 min", "Ebook chapter or whitepaper"],
                ].map(([words, read, speak, type]) => (
                  <tr key={words} className="odd:bg-muted/20">
                    <td className="border p-2 font-mono text-primary text-xs">{words}</td>
                    <td className="border p-2 text-xs">{read}</td>
                    <td className="border p-2 text-xs">{speak}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ToolFeatureGuides>

      {/* SECTION 5: FAQ + RELATED TOOLS */}
      <ToolFaqAccordion
        faqs={[
          { question: "Does the character counter count spaces?", answer: "Yes, the main character count includes spaces. A second stat shows the count without spaces. Both are displayed simultaneously so you can use whichever metric your platform requires. For example, Twitter counts spaces as characters, but some forms only count non-space characters." },
          { question: "How is reading time calculated?", answer: "Reading time is calculated by dividing the word count by the average adult silent reading speed of 238 words per minute, based on a 2019 meta-analysis published in Reading Research Quarterly by Brysbaert et al. This is more accurate than the commonly cited 200-250 WPM figure. The estimate rounds up to the nearest 30 seconds for display." },
          { question: "How does Twitter count characters for URLs?", answer: "Twitter uses a URL shortener (t.co) for all links. Regardless of the original URL length, every link counts as exactly 23 characters in a tweet. This means a tweet with one URL has 280 minus 23 equals 257 characters available for text. Hashtags and mentions count as their actual character length including the # or @ symbol." },
          { question: "What counts as a sentence in the sentence counter?", answer: "The sentence counter splits text on sentence-ending punctuation: period (.), exclamation mark (!), and question mark (?). Abbreviations like Dr., Mr., and U.S. may be counted as sentence breaks in some implementations. For accurate sentence counts in formal writing, manually verify the count against your document." },
          { question: "How is the keyword density feature useful for SEO?", answer: "Keyword density shows which words appear most frequently in your text. SEO best practices suggest keeping primary keyword density between 1 and 3 percent of total words. Above 3 percent may be flagged as keyword stuffing by search engines. Use the frequency list to identify overused words, check if your target keyword appears often enough, and spot filler words like very, really, and just that weaken content quality." },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/text/character-counter" max={6} />
    </div>
  );
}
