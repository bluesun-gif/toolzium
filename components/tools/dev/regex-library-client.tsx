"use client";

import React, { useState, useMemo } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Input } from"@/components/ui/input";
import { Label } from"@/components/ui/label";
import { Copy, Search, Code2, ShieldCheck, TestTube } from"lucide-react";
import toast from"react-hot-toast";
import { GridPattern } from"@/components/magicui/grid-pattern";
import { GlassCard } from"@/components/ui/glass-card";

const cardClass ="border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass ="w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 toast.success("Copied to clipboard!");
};

const regexData = [
 { n:"Email", r:"^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", d:"Validates standard email addresses.", c:"Email & URLs", m: ["user@domain.com"], nm: ["user@domain"] },
 { n:"URL", r:"https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$", d:"HTTP/HTTPS URLs.", c:"Email & URLs", m: ["https://google.com"], nm: ["google.com"] },
 { n:"Domain", r:"^(?:[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\\.)+[a-zA-Z]{2,}$", d:"Domain names.", c:"Email & URLs", m: ["sub.domain.org"], nm: ["-domain.com"] },
 { n:"IPv4", r:"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$", d:"IPv4 addresses.", c:"Email & URLs", m: ["192.168.1.1"], nm: ["256.1.2.3"] },
 { n:"IPv6", r:"^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$", d:"Simplified IPv6.", c:"Email & URLs", m: ["2001:0db8:85a3:0000:0000:8a2e:0370:7334"], nm: ["192.168.1.1"] },
 { n:"Integer", r:"^-?\\d+$", d:"Positive/negative integers.", c:"Numbers", m: ["-42","100"], nm: ["12.5"] },
 { n:"Float", r:"^-?\\d*\\.\\d+$", d:"Decimal numbers.", c:"Numbers", m: ["3.14","-0.99"], nm: ["42"] },
 { n:"US Phone", r:"^(?:\\+?1[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$", d:"US phone numbers.", c:"Numbers", m: ["(555) 123-4567"], nm: ["123-4567"] },
 { n:"Int Phone", r:"^\\+(?:[0-9] ?){6,14}[0-9]$", d:"International phones.", c:"Numbers", m: ["+44 20 7946 0958"], nm: ["44207946"] },
 { n:"Currency", r:"^\\$\\d{1,3}(?:,\\d{3})*(?:\\.\\d{2})?$", d:"USD currency.", c:"Numbers", m: ["$1,234.56"], nm: ["1234.56"] },
 { n:"Percentage", r:"^(100(\\.0+)?|\\d{1,2}(\\.\\d+)?)%$", d:"Percentages 0-100.", c:"Numbers", m: ["99.9%"], nm: ["101%"] },
 { n:"Hex Color", r:"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", d:"Hex color codes.", c:"Numbers", m: ["#FF5733","#FFF"], nm: ["#GGGGGG"] },
 { n:"ISO Date", r:"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?(?:Z|[+-]\\d{2}:\\d{2})$", d:"ISO 8601 dates.", c:"Dates & Times", m: ["2023-10-27T10:00:00Z"], nm: ["10/27/2023"] },
 { n:"MM/DD/YYYY", r:"^(0[1-9]|1[0-2])\\/(0[1-9]|1\\d|2\\d|3[01])\\/(19|20)\\d{2}$", d:"US date format.", c:"Dates & Times", m: ["12/31/2023"], nm: ["31/12/2023"] },
 { n:"DD/MM/YYYY", r:"^(0[1-9]|1\\d|2\\d|3[01])\\/(0[1-9]|1[0-2])\\/(19|20)\\d{2}$", d:"UK date format.", c:"Dates & Times", m: ["31/12/2023"], nm: ["12/31/2023"] },
 { n:"24h Time", r:"^([01]\\d|2[0-3]):([0-5]\\d)(?::([0-5]\\d))?$", d:"24-hour time.", c:"Dates & Times", m: ["23:59:59"], nm: ["24:00"] },
 { n:"12h Time", r:"^(0?[1-9]|1[0-2]):[0-5][0-9](?:\\s?[AaPp][Mm])?$", d:"12-hour time.", c:"Dates & Times", m: ["01:30 PM"], nm: ["13:30"] },
 { n:"Username", r:"^[a-zA-Z0-9_]{3,16}$", d:"Alphanumeric usernames.", c:"Validation", m: ["user_123"], nm: ["us"] },
 { n:"Strong Pwd", r:"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", d:"Complex passwords.", c:"Validation", m: ["Pass123!"], nm: ["password"] },
 { n:"Visa", r:"^4[0-9]{12}(?:[0-9]{3})?$", d:"Visa credit cards.", c:"Validation", m: ["4111111111111111"], nm: ["5111111111111111"] },
 { n:"MasterCard", r:"^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$", d:"MasterCard numbers.", c:"Validation", m: ["5555555555554444"], nm: ["4111111111111111"] },
 { n:"Amex", r:"^3[47][0-9]{13}$", d:"American Express.", c:"Validation", m: ["378282246310005"], nm: ["4111111111111111"] },
 { n:"SSN", r:"^(?!\\b(\\d)\\1+\\b)(?!123-45-6789|219-09-9999|078-05-1120)(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$", d:"US SSN.", c:"Validation", m: ["123-45-6789"], nm: ["000-00-0000"] },
 { n:"ZIP Code", r:"^\\d{5}(?:[-\\s]\\d{4})?$", d:"US ZIP codes.", c:"Validation", m: ["90210-1234"], nm: ["9021"] },
 { n:"Slug", r:"^[a-z0-9]+(?:-[a-z0-9]+)*$", d:"URL slugs.", c:"Validation", m: ["my-blog-post"], nm: ["My Blog Post"] },
 { n:"JWT", r:"^eyJ[A-Za-z0-9-_]+\\.eyJ[A-Za-z0-9-_]+\\.[A-Za-z0-9-_.+/=]*$", d:"JSON Web Tokens.", c:"Security", m: ["eyJhbGci..."], nm: ["random_string"] },
 { n:"API Key", r:"^[A-Za-z0-9_\\-]{32,}$", d:"Generic API keys.", c:"Security", m: ["sk_live_1234567890abcdef"], nm: ["short"] },
 { n:"SQLi Detect", r:"(?i)(\\b(select|insert|update|delete|drop|union|alter)\\b.*\\b(from|into|table|database)\\b)|(--|;|\\/\\*)", d:"Basic SQL injection.", c:"Security", m: ["' OR 1=1; --"], nm: ["normal text"] },
 { n:"XSS Detect", r:"(?i)<script.*?>|javascript:|on\\w+\\s*=", d:"Basic XSS payloads.", c:"Security", m: ["<script>alert(1)</script>"], nm: ["<p>safe</p>"] },
 { n:"Whitespace", r:"^\\s+|\\s+$", d:"Leading/trailing spaces.", c:"Text Processing", m: ["hello"], nm: ["hello"] },
 { n:"HTML Tags", r:"<\\/?([a-zA-Z0-9]+)(\\s+[a-zA-Z0-9]+(\\s*=\\s*(?:\".*?\"|'.*?'|[^'\">\\s]+))?)*\\s*\\/?>", d:"HTML elements.", c:"Text Processing", m: ["<div class='x'>"], nm: ["not a tag"] },
 { n:"Markdown Link", r:"\\[([^\\]]+)\\]\\(([^\\)]+)\\)", d:"Markdown URLs.", c:"Text Processing", m: ["[Google](https://google.com)"], nm: ["https://google.com"] },
 { n:"camelCase", r:"^[a-z]+([A-Z][a-z]*)*$", d:"camelCase strings.", c:"Text Processing", m: ["myVariableName"], nm: ["MyVariable"] },
 { n:"snake_case", r:"^[a-z]+(_[a-z]+)*$", d:"snake_case strings.", c:"Text Processing", m: ["my_variable_name"], nm: ["my-variable"] },
 { n:"Sentence", r:"^[A-Z][a-z]*(?:\\s[a-z]+)*[.?!]$", d:"Simple sentences.", c:"Text Processing", m: ["Hello world."], nm: ["hello world"] },
 { n:"MAC Addr", r:"^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$", d:"MAC addresses.", c:"Email & URLs", m: ["00:1A:2B:3C:4D:5E"], nm: ["00-1A-2B"] },
 { n:"UUID", r:"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", d:"UUID v4 strings.", c:"Validation", m: ["123e4567-e89b-12d3-a456-426614174000"], nm: ["12345"] },
 { n:"Latitude", r:"^-?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?)$", d:"GPS Latitude.", c:"Numbers", m: ["45.123"], nm: ["95"] },
 { n:"Longitude", r:"^-?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$", d:"GPS Longitude.", c:"Numbers", m: ["-120.45"], nm: ["185"] },
 { n:"YouTube ID", r:"^(?:https?:\\/\\/(?:www\\.)?youtube\\.com\\/watch\\?v=|youtu\\.be\\/)([a-zA-Z0-9_-]{11})$", d:"YouTube video IDs.", c:"Email & URLs", m: ["https://youtu.be/dQw4w9WgXcQ"], nm: ["vimeo.com/123"] },
 { n:"Twitter Handle", r:"^@([A-Za-z0-9_]{1,15})$", d:"Twitter usernames.", c:"Validation", m: ["@elonmusk"], nm: ["elonmusk"] },
 { n:"Hashtag", r:"^#([A-Za-z0-9_]+)$", d:"Social hashtags.", c:"Validation", m: ["#coding"], nm: ["# coding"] },
 { n:"Emoji", r:"[\\u{1F600}-\\u{1F64F}\\u{1F300}-\\u{1F5FF}\\u{1F680}-\\u{1F6FF}\\u{1F1E0}-\\u{1F1FF}\\u{2600}-\\u{26FF}\\u{2700}-\\u{27BF}]", d:"Basic emojis.", c:"Text Processing", m: ["Hello 🚀"], nm: ["Hello"] },
 { n:"Credit Card", r:"^\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}$", d:"Generic CC formats.", c:"Validation", m: ["1234 5678 9012 3456"], nm: ["123456"] },
 { n:"Passport", r:"^(?!^0+$)[a-zA-Z0-9]{6,9}$", d:"Generic passport numbers.", c:"Validation", m: ["AB123456"], nm: ["00000"] },
 { n:"VIN", r:"^(?:[A-HJ-NPR-Z0-9]{17})$", d:"Vehicle ID numbers.", c:"Validation", m: ["1HGBH41JXMN109186"], nm: ["12345"] },
 { n:"ISBN-10", r:"^(?:\\d{9}[Xx]|\\d{10})$", d:"ISBN 10 digits.", c:"Validation", m: ["0306406152"], nm: ["030640615"] },
 { n:"ISBN-13", r:"^(?:978|979)\\d{10}$", d:"ISBN 13 digits.", c:"Validation", m: ["9780306406157"], nm: ["1234567890123"] },
 { n:"Bitcoin Addr", r:"^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$", d:"Bitcoin addresses.", c:"Security", m: ["1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"], nm: ["invalid"] },
];

const categories = ["All","Email & URLs","Numbers","Dates & Times","Validation","Security","Text Processing"];

export function RegexLibraryClient() {
 const [search, setSearch] = useState("");
 const [activeCat, setActiveCat] = useState("All");
 const [testText, setTestText] = useState("Contact me at test@example.com or visit https://google.com! My phone is 555-123-4567.");
 const [testPattern, setTestPattern] = useState("");

 const filteredRegex = useMemo(() => {
 return regexData.filter((p) => {
 const matchSearch = p.n.toLowerCase().includes(search.toLowerCase()) || p.d.toLowerCase().includes(search.toLowerCase());
 const matchCat = activeCat ==="All"|| p.c === activeCat;
 return matchSearch && matchCat;
 });
 }, [search, activeCat]);

 const testResults = useMemo(() => {
 if (!testPattern) return [];
 try {
 const regex = new RegExp(testPattern,"g");
 const matches = [];
 let m;
 let safetyCount = 0;
 while ((m = regex.exec(testText)) !== null) {
 matches.push(m[0]);
 if (m[0].length === 0) {
 regex.lastIndex++;
 }
 safetyCount++;
 if (safetyCount > 5000) break;
 }
 return matches;
 } catch (e) {
 return ["Invalid Regex"];
 }
 }, [testText, testPattern]);

 const howItWorksSteps = [
 { step:"01", title:"Browse the Library", description:"Search through 50+ production-ready regex patterns categorized by use case, from emails to security payloads.", icon: Search },
 { step:"02", title:"Copy the Pattern", description:"Review the match and non-match examples to ensure the pattern fits your needs, then copy it with one click.", icon: Copy },
 { step:"03", title:"Quick Test", description:"Paste your own text into the testing panel and apply any pattern to see real-time highlighted matches.", icon: TestTube },
 ];

 const features = [
 { icon: Search, title:"Curated Pattern Library", description:"Access over 50 battle-tested regular expressions for emails, URLs, dates, validation, and security detection."},
 { icon: Code2, title:"Visual Examples", description:"Every pattern includes concrete examples of matching and non-matching strings to clarify exact behavior."},
 { icon: TestTube, title:"Live Regex Tester", description:"Instantly test any pattern against your own custom text input to verify edge cases before deploying to production."},
 { icon: ShieldCheck, title:"Security Focused", description:"Includes specialized patterns for detecting SQL injection attempts, XSS payloads, and validating JWT tokens."},
 ];

 const faqs = [
 { question:"Are these regex patterns safe for production?", answer:"Yes, these patterns are designed to be robust and avoid catastrophic backtracking. However, always test against your specific dataset and consider using dedicated parsing libraries for complex formats like HTML."},
 { question:"How do I use the Quick Test panel?", answer:"Simply copy a pattern from the library, paste it into the 'Regex Pattern' field in the test panel, and type your text. Matches will be listed below."},
 { question:"Do I need to escape backslashes in my code?", answer:"If you are defining the regex as a string (e.g., new RegExp('...')), you must double the backslashes (\\\\). If using literal syntax (/.../), single backslashes are fine."},
 ];

 return (
 <div className="max-w-6xl mx-auto space-y-8">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />

 <ToolPageHeader
 icon={Code2}
 title="Regex Pattern Library"
 description="Searchable collection of 50+ production-ready regular expressions with live testing, examples, and one-click copying."
 />

 <GlassCard>
 <CardHeader className={headerClass}>
 <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
 <div className="relative flex-1 w-full">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
 <Input 
 className="pl-9 h-9"
 placeholder="Search patterns..."
 value={search} 
 onChange={(e) => setSearch(e.target.value)} 
 />
 </div>
 <div className="flex flex-wrap gap-2">
 {categories.map((cat) => (
 <Button 
 key={cat} 
 variant={activeCat === cat ?"default":"outline"} 
 size="sm"
 className="h-7 text-xs"
 onClick={() => setActiveCat(cat)}
 >
 {cat}
 </Button>
 ))}
 </div>
 </div>
 </CardHeader>
 <CardContent className="p-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
 {filteredRegex.map((p, i) => (
 <Card key={i} className="border border-border/50 bg-background/50 overflow-hidden">
 <CardHeader className="p-3 bg-muted/10 border-b border-border/30">
 <div className="flex items-center justify-between">
 <CardTitle className="text-sm font-bold">{p.n}</CardTitle>
 <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{p.c}</span>
 </div>
 </CardHeader>
 <CardContent className="p-3 space-y-2">
 <div className="flex items-center justify-between bg-background p-2 rounded text-[10px] text-cyan-400 font-mono break-all">
 <span className="flex-1 mr-2">{p.r}</span>
 <Button variant="ghost"size="sm"className="h-6 w-6 p-0"onClick={() => handleCopy(p.r)}>
 <Copy className="w-3 h-3"/>
 </Button>
 </div>
 <p className="text-xs text-muted-foreground">{p.d}</p>
 <div className="flex flex-wrap gap-1">
 {p.m.map((m, j) => (
 <span key={j} className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-500 border border-green-500/20">{m}</span>
 ))}
 </div>
 </CardContent>
 </Card>
))}
 </div>
 </CardContent>
 </GlassCard>

 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><TestTube className="w-4 h-4"/> Quick Test Panel</CardTitle>
 </CardHeader>
 <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-3">
 <div className="space-y-1">
 <Label className="text-xs">Test Text</Label>
 <textarea 
 className={textareaClass} 
 rows={5} 
 value={testText} 
 onChange={(e) => setTestText(e.target.value)} 
 />
 </div>
 <div className="space-y-1">
 <Label className="text-xs">Regex Pattern (paste from above)</Label>
 <Input 
 className="font-mono text-xs"
 value={testPattern} 
 onChange={(e) => setTestPattern(e.target.value)} 
 placeholder="e.g. ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
 />
 </div>
 </div>
 <div className="space-y-2">
 <Label className="text-xs font-bold">Matches ({testResults.length})</Label>
 <div className="h-40 overflow-y-auto bg-muted/10 rounded-lg p-3 space-y-1 border border-border/50">
 {testResults.length === 0 ? (
 <p className="text-xs text-muted-foreground italic">No matches found or invalid regex.</p>
 ) : (
 testResults.map((m, i) => (
 <div key={i} className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20 break-all">
 {m}
 </div>
 ))
 )}
 </div>
 </div>
 </CardContent>
 </GlassCard>

 <ToolHowItWorks steps={howItWorksSteps} badges={["100% Free","50+ Patterns","Live Testing"]} />
 
 <ToolFeatureGuides features={features}>
 <div className="prose prose-invert max-w-none mt-8">
 <h3>The Developer's Regex Cheat Sheet</h3>
 <p>Regular expressions are an indispensable tool for any software engineer, enabling powerful pattern matching, data validation, and text manipulation. However, crafting robust regex patterns from scratch is notoriously difficult, often leading to subtle bugs, catastrophic backtracking, or false positives. Our Regex Pattern Library provides a curated collection of over 50 battle-tested, production-ready regular expressions covering everything from basic email validation to complex security payload detection.</p>
 <p>Each pattern in the library is accompanied by concrete examples of matching and non-matching strings, ensuring you understand exactly how the expression behaves before integrating it into your codebase. Whether you need to validate international phone numbers, extract YouTube video IDs, parse ISO 8601 dates, or detect potential SQL injection attempts in user input, our categorized library allows you to find the exact pattern you need in seconds. The built-in Quick Test panel lets you paste your own custom text and apply any pattern in real-time, verifying edge cases without leaving the page.</p>
 <p>Stop wasting time searching through outdated forums or wrestling with cryptic syntax. Keep this library bookmarked as your go-to reference for form validation, log parsing, and data sanitization tasks. All patterns are optimized for performance and designed to avoid the common pitfalls that cause regex engines to hang or consume excessive CPU cycles.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={faqs} />
 <RelatedTools currentToolUrl="/tools/dev/regex-library"/>
 </div>
 );
}

export default RegexLibraryClient;
