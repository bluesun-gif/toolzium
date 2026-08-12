"use client";

import { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { ActionButton, CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { BarChart3, BarChart2, Type, FileText, Copy, BookOpen, Clock, Shield, AlignLeft, Globe, Zap, Hash } from"lucide-react";
import toast from"react-hot-toast";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";

export function TextStatsClient() {
 const [text, setText] = useState("");

 const stats = useMemo(() => {
 const rawLength = text.length;
 const lengthNoSpaces = text.replace(/\s+/g,"").length;
 
 const words = text.trim() ? text.trim().split(/\s+/) : [];
 const wordCount = words.length;
 
 const sentences = text.split(/[.!?]+/).filter(Boolean);
 const sentenceCount = sentences.length;
 
 const paragraphs = text.split(/\n+/).filter(p => p.trim() !=="");
 const paragraphCount = paragraphs.length;
 
 const wordsOnlyAlpha = words.map(w => w.replace(/[^a-zA-Z]/g,"")).filter(Boolean);
 const uniqueWords = new Set(wordsOnlyAlpha.map(w => w.toLowerCase()));
 
 const avgWordLength = wordsOnlyAlpha.length > 0 
 ? wordsOnlyAlpha.reduce((acc, w) => acc + w.length, 0) / wordsOnlyAlpha.length 
 : 0;
 
 const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;
 
 let longestWord ="";
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
 w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,"");
 w = w.replace(/^y/,"");
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
 <CopyButton getText={getStatsString} label="Copy Stats"/>
 <ResetButton onClick={handleReset} label="Clear"/>
 </>
 }
 />

 <div className="grid lg:grid-cols-3 gap-6">
 <GlassCard className="lg:col-span-2 flex flex-col">
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Type className="w-5 h-5 text-primary"/> Input Text
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
 <span className="font-medium max-w-[120px] truncate"title={stats.longestWord}>{stats.longestWord ||"-"}</span>
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
 { step:"01", title:"Paste Your Text", description:"Paste or type any text — an article, essay, email, social post, or document. All statistics update instantly with no button press required.", icon: Type },
 { step:"02", title:"Review Detailed Statistics", description:"Analyze characters, words, sentences, paragraphs, unique words, average word length, syllable count, Flesch reading ease score, and keyword frequency.", icon: BarChart2 },
 { step:"03", title:"Optimize Your Writing", description:"Use reading level, keyword density, and sentence length insights to improve clarity, SEO performance, and audience targeting of your content.", icon: BookOpen },
 ]}
 badges={["Flesch reading ease","Keyword density","Reading time"]}
 />
 <ToolFeatureGuides
 features={[
 { icon: BarChart2, title:"30+ Text Statistics", description:"Characters (with/without spaces), words, unique words, sentences, paragraphs, lines, syllables, average word length, average sentence length, and more — all computed in real time."},
 { icon: BookOpen, title:"Flesch Reading Ease Score", description:"Measures text readability on a 0-100 scale. 90-100 is very easy (5th grade), 60-70 is standard (8th-9th grade), below 30 is very difficult (university level). Ideal for matching content to your audience."},
 { icon: Clock, title:"Reading and Speaking Time", description:"Estimates reading time at 238 WPM (average adult silent reading speed per Brysbaert 2019) and speaking time at 130 WPM (presentation pace). Useful for blog posts, speeches, and podcast scripts."},
 { icon: Hash, title:"Keyword Frequency Analysis", description:"Shows the top 10 most frequent words with counts and density percentage. Identifies keyword stuffing above 3% density and overused filler words that weaken content quality."},
 { icon: AlignLeft, title:"Sentence Length Analysis", description:"Counts average words per sentence and flags very long sentences (over 30 words) that may reduce readability. Ideal sentence length for web content is 15-20 words."},
 { icon: Shield, title:"Private and Client-Side", description:"All analysis runs locally in your browser using JavaScript string operations. No text is ever sent to a server. Safe for confidential documents and proprietary content."},
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <h3 className="text-lg font-semibold">Text Analysis Reference Guide</h3>
 <p>Text statistics help writers, editors, content marketers, and developers quantify the quality and characteristics of written content. Metrics like reading ease, sentence length, and keyword density are used by SEO tools, grammar checkers, and content platforms to score and rank content quality.</p>
 <h3 className="text-lg font-semibold">Flesch Reading Ease Score Reference</h3>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Score</th>
 <th className="border p-2 text-left">Difficulty</th>
 <th className="border p-2 text-left">Grade Level</th>
 <th className="border p-2 text-left">Example</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["90-100","Very Easy","5th grade","Comic books, basic instructions"],
 ["80-90","Easy","6th grade","Pulp fiction, consumer guides"],
 ["70-80","Fairly Easy","7th grade","Popular novels"],
 ["60-70","Standard","8th-9th grade","Newspapers, magazines"],
 ["50-60","Fairly Difficult","10th-12th grade","Academic magazines"],
 ["30-50","Difficult","College level","Academic writing"],
 ["0-30","Very Difficult","Professional","Legal, scientific documents"],
 ].map(([score, diff, grade, ex]) => (
 <tr key={score} className="odd:bg-muted/20">
 <td className="border p-2 font-mono text-primary font-bold text-xs">{score}</td>
 <td className="border p-2 font-medium text-xs">{diff}</td>
 <td className="border p-2 text-xs">{grade}</td>
 <td className="border p-2 text-muted-foreground text-xs">{ex}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 <h3 className="text-lg font-semibold">Optimal Text Metrics by Content Type</h3>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-muted/50">
 <th className="border p-2 text-left">Content Type</th>
 <th className="border p-2 text-left">Target Flesch Score</th>
 <th className="border p-2 text-left">Avg Sentence Length</th>
 <th className="border p-2 text-left">Word Count</th>
 </tr>
 </thead>
 <tbody>
 {[
 ["Blog post (general)","60-70","15-20 words","800-1,500"],
 ["SEO article (long-form)","60-70","15-20 words","1,500-3,000"],
 ["Email newsletter","65-75","12-18 words","200-500"],
 ["Social media post","70-80","8-12 words","50-280"],
 ["Academic paper","30-50","20-30 words","3,000-8,000"],
 ["Legal document","10-30","25-40 words","Varies"],
 ["Product description","65-75","10-15 words","50-300"],
 ].map(([type, flesch, sent, wc]) => (
 <tr key={type} className="odd:bg-muted/20">
 <td className="border p-2 font-medium text-xs">{type}</td>
 <td className="border p-2 font-mono text-primary text-xs">{flesch}</td>
 <td className="border p-2 text-xs">{sent}</td>
 <td className="border p-2 text-muted-foreground text-xs">{wc}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 <h3 className="text-lg font-semibold">Pro Tips for Improving Text Quality</h3>
 <ul className="list-disc pl-5 space-y-1 text-sm">
 <li><strong>Sentence length variety</strong>: Mix short sentences (under 10 words) with medium ones (15-20 words). Monotone sentence length creates a robotic reading rhythm.</li>
 <li><strong>Keyword density</strong>: Keep primary keyword density between 1-3%. Above 3% risks being flagged as keyword stuffing by search engines and feels unnatural to readers.</li>
 <li><strong>Passive voice</strong>: High passive voice usage increases sentence complexity and lowers Flesch scores. Aim for under 10% passive voice in blog content.</li>
 <li><strong>Syllable count</strong>: Longer words (3+ syllables) lower Flesch scores significantly. Replace polysyllabic words with simpler alternatives when possible without losing precision.</li>
 <li><strong>Paragraph length</strong>: Web content reads best with 2-4 sentence paragraphs. Academic content uses longer paragraphs. Match paragraph length to your platform and audience.</li>
 </ul>
 </div>
 </ToolFeatureGuides>
 <ToolFaqAccordion
 faqs={[
 { question:"What is the Flesch Reading Ease score?", answer:"The Flesch Reading Ease score is a readability formula developed by Rudolf Flesch in 1948 and later revised by J. Peter Kincaid for the US Navy. It scores text on a 0-100 scale based on average sentence length and average syllables per word. Higher scores indicate easier reading. A score of 60-70 is considered standard for general audience content. The formula is: 206.835 minus 1.015 times average sentence length minus 84.6 times average syllables per word."},
 { question:"How is word count calculated? Does it count hyphenated words as one or two?", answer:"Word count splits text on whitespace (spaces, tabs, newlines). Hyphenated words like well-known are counted as one word. Contractions like do not are counted as one word. Numbers like 1,000 are counted as one word. Punctuation attached to words (comma, period, quotation marks) is stripped before counting. This matches the word counting behavior of Microsoft Word and Google Docs."},
 { question:"How is reading time estimated?", answer:"Reading time is estimated using 238 words per minute, the average adult silent reading speed from the 2019 meta-analysis by Brysbaert et al. published in Reading Research Quarterly, which analyzed 190 studies with 18,573 participants. This is more accurate than the commonly cited 200-250 WPM range. Speaking time uses 130 WPM for deliberate presentation speech."},
 { question:"What is keyword density and what is the ideal percentage?", answer:"Keyword density is the percentage of times a specific word appears relative to the total word count. A density of 1-3% for a primary keyword is generally considered optimal for SEO. Below 1% may mean the topic is not well covered. Above 3% risks being identified as keyword stuffing by search engine algorithms, which can negatively impact rankings. Use the keyword frequency list to monitor your primary and secondary keyword density."},
 { question:"What counts as a unique word?", answer:"Unique words are distinct word forms after converting to lowercase and removing punctuation. Hello, hello, and HELLO are counted as the same unique word. Inflected forms like run, runs, and running are counted as different unique words unless stemming is applied. The ratio of unique words to total words (type-token ratio) indicates vocabulary richness. A higher ratio suggests more varied and sophisticated vocabulary."},
 ]}
 />
 <RelatedTools currentToolUrl="/tools/text/text-stats"max={6} />
 </div>
 );
}
