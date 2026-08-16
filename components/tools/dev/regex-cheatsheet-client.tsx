"use client";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import { GlassCard } from"@/components/ui/glass-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from"@/components/ui/card";
import { Separator } from"@/components/ui/separator";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { CopyButton, ResetButton } from"@/components/shared/action-buttons";
import { BookOpen, Code, Copy, Lightbulb, PlayCircle, Search } from"lucide-react";
import { toast } from"react-hot-toast";

const REGEX_DATA = [
 { category:"Character Classes", entries: [
 { pattern:"\\d", desc:"Any digit", example:"123"},
 { pattern:"\\w", desc:"Any word character (alphanumeric & underscore)", example:"a_B1"},
 { pattern:"\\s", desc:"Any whitespace character", example:""},
 { pattern:"\\D", desc:"Any non-digit", example:"a"},
 { pattern:"\\W", desc:"Any non-word character", example:"!"},
 { pattern:"\\S", desc:"Any non-whitespace character", example:"a"},
 { pattern:".", desc:"Any character except newline", example:"x"},
 ]},
 { category:"Anchors", entries: [
 { pattern:"^", desc:"Start of string", example:"^abc"},
 { pattern:"$", desc:"End of string", example:"xyz$"},
 { pattern:"\\b", desc:"Word boundary", example:"\\bword\\b"},
 { pattern:"\\B", desc:"Non-word boundary", example:"word\\B"},
 ]},
 { category:"Quantifiers", entries: [
 { pattern:"*", desc:"0 or more", example:"a*"},
 { pattern:"+", desc:"1 or more", example:"a+"},
 { pattern:"?", desc:"0 or 1", example:"a?"},
 { pattern:"{n}", desc:"Exactly n", example:"a{3}"},
 { pattern:"{n,}", desc:"n or more", example:"a{3,}"},
 { pattern:"{n,m}", desc:"Between n and m", example:"a{3,5}"},
 ]},
 { category:"Groups & Lookahead", entries: [
 { pattern:"(abc)", desc:"Capture group", example:"(abc)"},
 { pattern:"(?:abc)", desc:"Non-capturing group", example:"(?:abc)"},
 { pattern:"(?=abc)", desc:"Positive lookahead", example:"a(?=b)"},
 { pattern:"(?!abc)", desc:"Negative lookahead", example:"a(?!b)"},
 ]},
 { category:"Common Patterns", entries: [
 { pattern:"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", desc:"Email Address", example:"test@example.com"},
 { pattern:"^\\+?[1-9]\\d{1,14}$", desc:"E.164 Phone Number", example:"+1234567890"},
 { pattern:"^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$", desc:"URL", example:"https://example.com"},
 { pattern:"^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$", desc:"IPv4 Address", example:"192.168.1.1"},
 ]}
];

export function RegexCheatsheetClient() {
 const [search, setSearch] = useState("");
 const [testRegex, setTestRegex] = useState("");
 const [testFlags, setTestFlags] = useState("g");
 const [testString, setTestString] = useState("");

 const filteredData = useMemo(() => {
 if (!search) return REGEX_DATA;
 const lowerSearch = search.toLowerCase();
 return REGEX_DATA.map(cat => ({
 ...cat,
 entries: cat.entries.filter(e => 
 e.pattern.toLowerCase().includes(lowerSearch) || 
 e.desc.toLowerCase().includes(lowerSearch)
 )
 })).filter(cat => cat.entries.length > 0);
 }, [search]);

 const matchResult = useMemo(() => {
 if (!testRegex || !testString) return null;
 try {
 const regex = new RegExp(testRegex, testFlags);
 const matches = Array.from(testString.matchAll(regex));
 return { matches, error: null };
 } catch (e: any) {
 return { matches: [], error: e.message };
 }
 }, [testRegex, testFlags, testString]);

 const renderHighlightedString = () => {
 if (!testRegex || !testString || matchResult?.error) return testString;
 try {
 const regex = new RegExp(testRegex, testFlags);
 if (!regex.global) {
 const match = testString.match(regex);
 if (match && match.index !== undefined) {
 return (
 <>
 {testString.substring(0, match.index)}
 <mark className="bg-yellow-200 text-black px-1 rounded">{match[0]}</mark>
 {testString.substring(match.index + match[0].length)}
 </>
 );
 }
 return testString;
 }

 let lastIndex = 0;
 const elements: React.ReactNode[] = [];
 const matches = matchResult?.matches || [];

 matches.forEach((match, i) => {
 if (match.index !== undefined) {
 if (match.index > lastIndex) {
 elements.push(<span key={`text-${i}`}>{testString.substring(lastIndex, match.index)}</span>);
 }
 elements.push(
 <mark key={`mark-${i}`} className="bg-yellow-200 text-black px-1 rounded">
 {match[0]}
 </mark>
 );
 lastIndex = match.index + match[0].length;
 }
 });
 
 if (lastIndex < testString.length) {
 elements.push(<span key="text-last">{testString.substring(lastIndex)}</span>);
 }
 
 return elements;
 } catch (e) {
 return testString;
 }
 };

 return (
 <div className="space-y-6">
 <ToolPageHeader
 icon={BookOpen}
 title="Regex Cheat Sheet"
 description="Quick reference and interactive tester for regular expressions."
 actions={
 <ResetButton onClick={() => { setSearch(""); setTestRegex(""); setTestString(""); }} label="Reset"/>
 }
 />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Code className="w-5 h-5"/>
 Regex Tester
 </CardTitle>
 <CardDescription>Test your regex against custom text.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Pattern</Label>
 <div className="flex gap-2">
 <div className="relative flex-1">
 <span className="absolute left-3 top-2.5 text-muted-foreground font-mono">/</span>
 <Input 
 value={testRegex} 
 onChange={(e) => setTestRegex(e.target.value)} 
 className="pl-7 font-mono"
 placeholder="pattern"
 />
 </div>
 <div className="relative w-24">
 <span className="absolute left-3 top-2.5 text-muted-foreground font-mono">/</span>
 <Input 
 value={testFlags} 
 onChange={(e) => setTestFlags(e.target.value)} 
 className="pl-7 font-mono"
 placeholder="flags"
 />
 </div>
 </div>
 {matchResult?.error && (
 <p className="text-sm text-destructive">{matchResult.error}</p>
 )}
 </div>
 <div className="space-y-2">
 <Label>Test String</Label>
 <Input 
 value={testString} 
 onChange={(e) => setTestString(e.target.value)} 
 placeholder="Enter text to test..."
 />
 </div>
 <div className="space-y-2">
 <Label>Matches</Label>
 <div className="min-h-[100px] p-3 rounded-md bg-muted/50 border border-border break-all whitespace-pre-wrap font-mono text-sm">
 {testString ? renderHighlightedString() : <span className="text-muted-foreground italic">Results will appear here...</span>}
 </div>
 </div>
 </CardContent>
 </GlassCard>
 </div>

 <div className="space-y-6">
 <GlassCard>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <BookOpen className="w-5 h-5"/>
 Cheat Sheet
 </CardTitle>
 <CardDescription>Search and reference common regex patterns.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="relative">
 <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground"/>
 <Input
 placeholder="Search patterns or descriptions..."
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 className="pl-9"
 />
 </div>

 <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
 {filteredData.map((category, idx) => (
 <div key={idx} className="space-y-2">
 <h3 className="font-semibold text-sm text-muted-foreground sticky top-0 bg-background/95 backdrop-blur py-1 z-10">{category.category}</h3>
 <div className="grid gap-2">
 {category.entries.map((entry, i) => (
 <div key={i} className="flex items-center justify-between p-2 rounded bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-border transition-colors group cursor-pointer"onClick={() => setTestRegex(entry.pattern)}>
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2">
 <code className="text-primary font-mono font-bold bg-primary/10 px-1.5 py-0.5 rounded text-sm">{entry.pattern}</code>
 <span className="text-sm text-muted-foreground truncate">{entry.desc}</span>
 </div>
 <div className="text-xs text-muted-foreground mt-1">e.g. <span className="font-mono text-foreground/80">{entry.example}</span></div>
 </div>
 <div className="opacity-0 group-hover:opacity-100 transition-opacity">
 <CopyButton getText={() => entry.pattern} label=""/>
 </div>
 </div>
 ))}
 </div>
 </div>
 ))}
 {filteredData.length === 0 && (
 <div className="text-center py-8 text-muted-foreground">No matches found for"{search}"</div>
 )}
 </div>
 </CardContent>
 </GlassCard>
 </div>
 </div>
 
<ToolHowItWorks
  steps={[
{
    step:"01",
    title:"Browse Patterns",
    description:"Scan common tokens and ready-made patterns.",
    icon: BookOpen,
  },
{
    step:"02",
    title:"Copy a Pattern",
    description:"Grab a snippet that matches your need.",
    icon: Copy,
  },
{
    step:"03",
    title:"Test It",
    description:"Paste into your editor or a tester to validate.",
    icon: PlayCircle,
  }
  ]}
  badges={["Free Forever","No Signup","Instant Results"]}
/>

<ToolFeatureGuides
  features={[
{
    icon: BookOpen,
    title:"Token Reference",
    description:"Anchors, character classes, quantifiers, and groups.",
  },
{
    icon: Copy,
    title:"Copy Snippets",
    description:"One-click copy of common expressions.",
  },
{
    icon: Search,
    title:"Searchable List",
    description:"Jump to the pattern you need quickly.",
  },
{
    icon: Lightbulb,
    title:"Use Cases",
    description:"Email, phone, URL, and date patterns included.",
  }
  ]}
>
  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
  <p>Regular expressions look intimidating until you learn they are built from a small set of composable pieces. A cheatsheet turns that alphabet into reusable patterns you can copy and adapt, saving hours of trial and error. The core building blocks are anchors, character classes, quantifiers, and groups.</p>
  <p>Anchors position the match. The caret anchors to the start of a line and the dollar sign to the end, so ^abc matches only when abc begins the string. Character classes narrow what a position may hold: [a-z0-9] matches any lowercase letter or digit. The dot is a wildcard for any character except newline, while backslash escapes give you digits with d, words with w, and whitespace with s.</p>
  <p>Quantifiers control repetition. An asterisk means zero or more, a plus means one or more, and a question mark makes something optional. Curly braces &#123;2,5&#125; set an exact range. Combine them with groups, written in parentheses, to repeat or capture a whole sub-pattern. Capturing groups let you extract parts of a match, while non-capturing groups (?:...) keep the structure without storing it.</p>
  <p>Flavors differ between engines. JavaScript, Python, and PCRE each support slightly different features such as lookbehind or named groups, so always test against the engine your code uses. A cheatsheet that lists the common tokens with examples shortens the learning curve dramatically.</p>
  <p>Use the reference to grab a vetted pattern for email, phone, or URL validation, then test it on real samples. Start simple, add constraints only as needed, and prefer readability over clever one-liners. With a solid reference beside you, regex becomes a precise tool rather than a mystery.</p>
  </div>
</ToolFeatureGuides>

<ToolFaqAccordion
  faqs={[
{
    question:"What is a regular expression?",
    answer:"A regular expression is a sequence of characters that defines a search pattern. It is used to match, extract, or replace text.",
  },
{
    question:"What does the dot symbol match?",
    answer:"A dot matches any single character except newline. Add the dotall flag to include newlines.",
  },
{
    question:"What is a character class?",
    answer:"Square brackets like [a-z] match any one character from the set, making patterns concise and readable.",
  },
{
    question:"What do quantifiers do?",
    answer:"Quantifiers such as *, +, and {n,m} control how many times the preceding element may repeat.",
  },
{
    question:"Are regex flavors identical everywhere?",
    answer:"No. JavaScript, Python, and PCRE differ in features like lookbehind and named groups, so test against your target engine.",
  }
  ]}
/>
</div>
 );
}
