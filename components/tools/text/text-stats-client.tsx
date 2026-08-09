"use client";

import { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ActionButton, CopyButton, ResetButton } from "@/components/shared/action-buttons";
import { BarChart3, Type, FileText, Copy, BookOpen, Shield, AlignLeft, Globe, Zap, Hash } from "lucide-react";
import toast from "react-hot-toast";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";

export function TextStatsClient() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const rawLength = text.length;
    const lengthNoSpaces = text.replace(/\s+/g, "").length;
    
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    const wordCount = words.length;
    
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const sentenceCount = sentences.length;
    
    const paragraphs = text.split(/\n+/).filter(p => p.trim() !== "");
    const paragraphCount = paragraphs.length;
    
    const wordsOnlyAlpha = words.map(w => w.replace(/[^a-zA-Z]/g, "")).filter(Boolean);
    const uniqueWords = new Set(wordsOnlyAlpha.map(w => w.toLowerCase()));
    
    const avgWordLength = wordsOnlyAlpha.length > 0 
      ? wordsOnlyAlpha.reduce((acc, w) => acc + w.length, 0) / wordsOnlyAlpha.length 
      : 0;
      
    const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;
    
    let longestWord = "";
    wordsOnlyAlpha.forEach(w => {
      if (w.length > longestWord.length) longestWord = w;
    });
    
    const wordFreq: Record<string, number> = {};
    wordsOnlyAlpha.forEach(w => {
      const lower = w.toLowerCase();
      wordFreq[lower] = (wordFreq[lower] || 0) + 1;
    });
    const topWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
      
    const syllables = wordsOnlyAlpha.reduce((acc, word) => {
      let w = word.toLowerCase();
      if (w.length <= 3) return acc + 1;
      w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
      w = w.replace(/^y/, "");
      const match = w.match(/[aeiouy]{1,2}/g);
      return acc + (match ? match.length : 1);
    }, 0);
    
    const fleschKincaid = wordCount > 0 && sentenceCount > 0 
      ? 0.39 * (wordCount / sentenceCount) + 11.8 * (syllables / wordCount) - 15.59 
      : 0;
      
    const lexicalDensity = wordCount > 0 ? (uniqueWords.size / wordCount) * 100 : 0;

    return {
      rawLength,
      lengthNoSpaces,
      wordCount,
      sentenceCount,
      paragraphCount,
      uniqueCount: uniqueWords.size,
      avgWordLength: avgWordLength.toFixed(1),
      avgSentenceLength: avgSentenceLength.toFixed(1),
      longestWord,
      topWords,
      fleschKincaid: Math.max(0, fleschKincaid).toFixed(1),
      lexicalDensity: lexicalDensity.toFixed(1)
    };
  }, [text]);

  const handleReset = () => {
    setText("");
    toast.success("Text cleared");
  };
  
  const getStatsString = () => {
    return `Text Statistics:\nWords: ${stats.wordCount}\nCharacters (with spaces): ${stats.rawLength}\nCharacters (no spaces): ${stats.lengthNoSpaces}\nSentences: ${stats.sentenceCount}\nParagraphs: ${stats.paragraphCount}\nReading Level (Grade): ${stats.fleschKincaid}\nLexical Density: ${stats.lexicalDensity}%`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ToolPageHeader
        icon={BarChart3}
        title="Advanced Text Statistics"
        description="Analyze your text for word count, readability, lexical density, and more."
        actions={
          <>
            <CopyButton getText={getStatsString} label="Copy Stats" />
            <ResetButton onClick={handleReset} label="Clear" />
          </>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5 text-primary" /> Input Text
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <textarea
              className="w-full h-full min-h-[300px] p-4 rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Paste or type your text here to analyze..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </CardContent>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Basic Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Words</div>
                  <div className="text-2xl font-bold">{stats.wordCount}</div>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Characters</div>
                  <div className="text-2xl font-bold">{stats.rawLength}</div>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Sentences</div>
                  <div className="text-2xl font-bold">{stats.sentenceCount}</div>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Paragraphs</div>
                  <div className="text-2xl font-bold">{stats.paragraphCount}</div>
                </div>
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Advanced Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Reading Level (Grade)</span>
                <span className="font-medium">{stats.fleschKincaid}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Lexical Density</span>
                <span className="font-medium">{stats.lexicalDensity}%</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Unique Words</span>
                <span className="font-medium">{stats.uniqueCount}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Avg Word Length</span>
                <span className="font-medium">{stats.avgWordLength}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Avg Sentence Length</span>
                <span className="font-medium">{stats.avgSentenceLength}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Longest Word</span>
                <span className="font-medium max-w-[120px] truncate" title={stats.longestWord}>{stats.longestWord || "-"}</span>
              </div>
            </CardContent>
          </GlassCard>
          
          <GlassCard>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Top Words</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topWords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {stats.topWords.map(([word, count]) => (
                    <div key={word} className="px-2 py-1 bg-secondary rounded text-xs flex gap-2 items-center">
                      <span>{word}</span>
                      <span className="bg-background px-1.5 rounded-sm text-muted-foreground">{count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">No words to display</div>
              )}
            </CardContent>
          </GlassCard>
        </div>
      </div>

      {/* SECTION 3: HOW IT WORKS */}
      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Paste or Type Your Text",
            description: "Paste an article, essay, code, or any text into the editor. The analysis starts instantly as you type — no button to click.",
            icon: FileText,
          },
          {
            step: "02",
            title: "View Instant Statistics",
            description: "See word count, character count (with/without spaces), sentence count, paragraph count, reading time, and speaking time — all updated live.",
            icon: BarChart3,
          },
          {
            step: "03",
            title: "Analyze Word Frequency",
            description: "The word frequency table ranks every word by occurrence, filtering out stop words. Useful for identifying overused terms in your writing.",
            icon: Hash,
          },
        ]}
        badges={[
          "Live statistics",
          "Reading time estimate",
          "Word frequency",
        ]}
      />

      {/* SECTION 4: FEATURE GUIDES */}
      <ToolFeatureGuides
        features={[
          {
            icon: BarChart3,
            title: "Complete Text Statistics",
            description: "Words, characters (with/without spaces), sentences, paragraphs, lines, unique words, and average words per sentence — all calculated instantly.",
          },
          {
            icon: AlignLeft,
            title: "Reading & Speaking Time",
            description: "Estimates reading time at 238 words per minute (average adult reading speed) and speaking time at 130 WPM (conversational speech). Essential for speech and content planning.",
          },
          {
            icon: Hash,
            title: "Word Frequency Analysis",
            description: "Counts and ranks every word by occurrence. Filter stop words (the, is, and) to surface meaningful content words. Identify overused terms and writing tics.",
          },
          {
            icon: Type,
            title: "Character Counting",
            description: "Counts total characters and characters without spaces separately. Critical for social media posts (Twitter 280, Instagram 2200, LinkedIn 3000 character limits).",
          },
          {
            icon: Globe,
            title: "Readability Metrics",
            description: "Calculates average sentence length and word complexity indicators. Shorter sentences and simpler words improve readability scores (Flesch-Kincaid, etc.).",
          },
          {
            icon: Shield,
            title: "Private & Offline",
            description: "All analysis runs in your browser. Your text — which may be a draft article, confidential document, or private note — never leaves your device.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <h3 className="text-lg font-semibold">Text Analysis Guide — Understanding Your Writing Statistics</h3>
          <p>
            Understanding your text's statistics helps you write more effectively for any medium.
            Whether you're writing a blog post, academic essay, social media caption, or business email,
            knowing your word count, reading time, and sentence complexity helps you hit your targets
            and communicate clearly.
          </p>

          <h4 className="font-semibold">Social Media Character Limits Reference</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Platform</th>
                  <th className="border p-2 text-left">Post/Caption Limit</th>
                  <th className="border p-2 text-left">Bio Limit</th>
                  <th className="border p-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["X (Twitter)", "280 characters", "160 characters", "URLs count as 23 chars"],
                  ["Instagram", "2,200 characters", "150 characters", "Hashtags count toward limit"],
                  ["Facebook", "63,206 characters", "101 characters", "Posts truncated at ~477 chars"],
                  ["LinkedIn", "3,000 characters", "2,600 characters", "Articles: 125,000 chars"],
                  ["TikTok", "2,200 characters", "80 characters", "Hashtags count toward limit"],
                  ["YouTube", "5,000 characters", "1,000 characters", "First 157 chars shown before \"more\""],
                  ["WhatsApp", "65,536 characters", "N/A", "Status: 700 characters"],
                ].map(([platform, post, bio, notes]) => (
                  <tr key={platform} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{platform}</td>
                    <td className="border p-2 text-primary text-xs">{post}</td>
                    <td className="border p-2 text-xs">{bio}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Reading Speed Reference</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Reader Type</th>
                  <th className="border p-2 text-left">WPM</th>
                  <th className="border p-2 text-left">Time for 1000 words</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["3rd grade student", "~150 WPM", "~6.7 minutes"],
                  ["Average adult", "~238 WPM", "~4.2 minutes"],
                  ["College student", "~300 WPM", "~3.3 minutes"],
                  ["Speed reader", "~500 WPM", "~2 minutes"],
                  ["Audiobook narration", "~150–160 WPM", "~6.5 minutes"],
                  ["Conversational speech", "~130 WPM", "~7.7 minutes"],
                  ["Presentation/speech", "~100–110 WPM", "~9–10 minutes"],
                ].map(([reader, wpm, time]) => (
                  <tr key={reader} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{reader}</td>
                    <td className="border p-2 text-primary font-mono text-xs">{wpm}</td>
                    <td className="border p-2 text-xs">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold">Content Length Guide by Format</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left">Content Type</th>
                  <th className="border p-2 text-left">Ideal Word Count</th>
                  <th className="border p-2 text-left">Read Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Tweet/social caption", "20–40 words", "< 15 sec"],
                  ["Email subject line", "6–10 words", "< 5 sec"],
                  ["Blog intro paragraph", "50–100 words", "< 30 sec"],
                  ["Short blog post", "500–800 words", "2–4 min"],
                  ["Standard blog post", "1,000–2,000 words", "4–8 min"],
                  ["In-depth article/guide", "2,000–5,000 words", "8–20 min"],
                  ["10-min conference talk", "~1,300 words", "10 min"],
                  ["Academic abstract", "150–250 words", "< 1 min"],
                ].map(([content, count, time]) => (
                  <tr key={content} className="odd:bg-muted/20">
                    <td className="border p-2 font-medium text-xs">{content}</td>
                    <td className="border p-2 text-primary text-xs">{count}</td>
                    <td className="border p-2 text-muted-foreground text-xs">{time}</td>
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
          {
            question: "How is reading time calculated?",
            answer: "Reading time is calculated by dividing the word count by 238 words per minute — the scientifically measured average adult silent reading speed. This is the same method used by Medium and most publishing platforms. Skimming is faster (~700 WPM); technical reading is slower (~100–150 WPM).",
          },
          {
            question: "What is the difference between character count with and without spaces?",
            answer: "Character count with spaces counts every character including whitespace. Character count without spaces counts only visible characters (letters, numbers, punctuation). Most social media platforms (Twitter, Instagram) count spaces — so \"hello world\" is 11 characters, not 10.",
          },
          {
            question: "What is word frequency analysis?",
            answer: "Word frequency analysis counts how many times each word appears in your text, then ranks them from most to least common. It helps identify overused words, verify keyword density for SEO, or analyze the vocabulary in any document.",
          },
          {
            question: "How many words should a blog post have for SEO?",
            answer: "For competitive keywords, 1,500–3,000 words performs best in search rankings. For less competitive topics, 800–1,200 words can rank well. The most important factor is covering the topic comprehensively — don't pad with filler content. Google rewards depth and E-E-A-T, not raw word count.",
          },
          {
            question: "How is sentence count determined?",
            answer: "Sentences are counted by splitting on sentence-ending punctuation (periods, exclamation marks, question marks) followed by whitespace. Abbreviations (e.g., Dr., U.S.A.) are excluded from the count. Average sentence length is calculated as total words / sentence count.",
          },
        ]}
      />
      <RelatedTools currentToolUrl="/tools/text/text-stats" max={6} />
    </div>
  );
}
