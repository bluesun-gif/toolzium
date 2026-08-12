"use client";

import React, { useMemo, useState } from"react";
import ToolPageHeader from"@/components/shared/tool-page-header";
import ToolHowItWorks from"@/components/shared/tool-how-it-works";
import ToolFeatureGuides from"@/components/shared/tool-feature-guides";
import ToolFaqAccordion from"@/components/shared/tool-faq-accordion";
import { RelatedTools } from"@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Input } from"@/components/ui/input";
import { CopyButton } from"@/components/shared/action-buttons";
import { Code2, Search, Globe, Hash } from"lucide-react";

const cardClass =
"border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass ="border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass ="text-xs sm:text-sm font-semibold flex items-center gap-2";
const fieldClass =
"w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";

function escapeHtml(value: string): string {
 return value
 .replace(/&/g,"&amp;")
 .replace(/</g,"&lt;")
 .replace(/>/g,"&gt;")
 .replace(/"/g,"&quot;");
}

export default function MetaGeneratorClient() {
 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 const [keywords, setKeywords] = useState("");
 const [author, setAuthor] = useState("");
 const [canonicalUrl, setCanonicalUrl] = useState("");
 const [ogImage, setOgImage] = useState("");

 const metaHtml = useMemo(() => {
 const lines: string[] = ['<meta charset="UTF-8"/>'];

 if (title.trim()) {
 lines.push(`<title>${escapeHtml(title.trim())}</title>`);
 }

 if (description.trim()) {
 lines.push(`<meta name="description"content="${escapeHtml(description.trim())}"/>`);
 }

 if (keywords.trim()) {
 lines.push(`<meta name="keywords"content="${escapeHtml(keywords.trim())}"/>`);
 }

 if (author.trim()) {
 lines.push(`<meta name="author"content="${escapeHtml(author.trim())}"/>`);
 }

 if (canonicalUrl.trim()) {
 lines.push(`<link rel="canonical"href="${escapeHtml(canonicalUrl.trim())}"/>`);
 }

 if (title.trim()) {
 lines.push(`<meta property="og:title"content="${escapeHtml(title.trim())}"/>`);
 }

 if (description.trim()) {
 lines.push(`<meta property="og:description"content="${escapeHtml(description.trim())}"/>`);
 }

 if (canonicalUrl.trim()) {
 lines.push(`<meta property="og:url"content="${escapeHtml(canonicalUrl.trim())}"/>`);
 }

 if (ogImage.trim()) {
 lines.push(`<meta property="og:image"content="${escapeHtml(ogImage.trim())}"/>`);
 }

 lines.push(`<meta property="og:type"content="website"/>`);

 return lines.join("\n");
 }, [title, description, keywords, author, canonicalUrl, ogImage]);

 const titleCountClass = title.length > 60 ?"text-red-500":"text-muted-foreground";
 const descriptionCountClass =
 description.length > 160 ?"text-red-500":"text-muted-foreground";

 return (
 <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
 <ToolPageHeader
 icon={Code2}
 title="Meta Tag Generator"
 description="Generate SEO meta tags with live Google SERP preview, character counters, and copy-ready HTML."
 />

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Hash className="w-4 h-4 text-primary"/> Page Details
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <div className="space-y-2">
 <div className="flex items-center justify-between">
 <label className="text-xs font-medium text-muted-foreground">Page Title</label>
 <span className={`text-xs ${titleCountClass}`}>{title.length}/60</span>
 </div>
 <Input
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 placeholder="e.g. Best Free Online SEO Tools"
 />
 </div>

 <div className="space-y-2">
 <div className="flex items-center justify-between">
 <label className="text-xs font-medium text-muted-foreground">Meta Description</label>
 <span className={`text-xs ${descriptionCountClass}`}>{description.length}/160</span>
 </div>
 <textarea
 value={description}
 onChange={(e) => setDescription(e.target.value)}
 rows={4}
 className={fieldClass}
 placeholder="Write a concise, compelling description for search engines..."
 />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Keywords</label>
 <Input
 value={keywords}
 onChange={(e) => setKeywords(e.target.value)}
 placeholder="seo tools, meta tags"
 />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Author</label>
 <Input
 value={author}
 onChange={(e) => setAuthor(e.target.value)}
 placeholder="Toolzium Team"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Canonical URL</label>
 <Input
 value={canonicalUrl}
 onChange={(e) => setCanonicalUrl(e.target.value)}
 placeholder="https://example.com/page"
 />
 </div>
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">OG Image URL</label>
 <Input
 value={ogImage}
 onChange={(e) => setOgImage(e.target.value)}
 placeholder="https://example.com/og.png"
 />
 </div>
 </div>
 </CardContent>
 </Card>

 <div className="space-y-4">
 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Search className="w-4 h-4 text-primary"/> Google SERP Preview
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4">
 <div className="rounded-xl border border-border/60 bg-background/70 p-4">
 <p className="text-lg text-primary leading-snug line-clamp-2">
 {title ||"Your Page Title Appears Here"}
 </p>
 <p className="mt-1 text-sm text-green-700 dark:text-green-500 truncate">
 {canonicalUrl ||"https://example.com/page"}
 </p>
 <p className="mt-1 text-sm text-muted-foreground line-clamp-3">
 {description ||
"Your meta description appears here. Keep it clear, relevant, and under 160 characters for best display in search results."}
 </p>
 </div>
 </CardContent>
 </Card>

 <Card className={cardClass}>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}>
 <Globe className="w-4 h-4 text-primary"/> Generated HTML
 </CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <pre className="rounded-lg border border-border/60 bg-background/70 p-3 text-xs font-mono whitespace-pre-wrap break-words max-h-80 overflow-auto">
 {metaHtml}
 </pre>
 <CopyButton getText={() => metaHtml} label="Copy Meta Tags"/>
 </CardContent>
 </Card>
 </div>
 </div>

 <ToolHowItWorks
 steps={[
 {
 step:"01",
 title:"Enter Page Metadata",
 description:"Add title, description, keywords, canonical URL, and Open Graph image.",
 icon: Hash,
 },
 {
 step:"02",
 title:"Preview Search Result",
 description:"See how your page may appear in Google search results in real time.",
 icon: Search,
 },
 {
 step:"03",
 title:"Copy HTML Tags",
 description:"Copy the generated meta tags and paste them into your page head.",
 icon: Code2,
 },
 ]}
 badges={["100% Free","Client-Side","No Signup"]}
 />

 <ToolFeatureGuides
 features={[
 {
 icon: Code2,
 title:"SEO-Ready Output",
 description:"Generates clean meta tags for search engines and social platforms.",
 },
 {
 icon: Search,
 title:"Live SERP Preview",
 description:"Shows how your title, URL, and description may look in Google.",
 },
 {
 icon: Hash,
 title:"Character Warnings",
 description:"Tracks title and description length to reduce truncation risk.",
 },
 {
 icon: Globe,
 title:"Open Graph Basics",
 description:"Includes essential OG tags for sharing and link previews.",
 },
 ]}
 >
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>
 Meta tags remain one of the most important on-page SEO fundamentals. The title tag and meta description
 often shape the first impression your page makes in search results, influencing both relevance and
 click-through rate. A well-crafted title and description can improve visibility, while a poorly written one
 may cause your page to be skipped even when it ranks well.
 </p>
 <p>
 This generator helps you create the core metadata needed for a well-structured page. It supports title,
 description, keywords, author, canonical URL, and essential Open Graph tags. The live preview gives you a
 practical way to evaluate how your snippet may appear to users before publishing.
 </p>
 <p>
 For best results, keep titles close to 60 characters and descriptions close to 160 characters. Use clear
 language, include the primary keyword naturally, and make sure the metadata accurately reflects the content
 of the page. Avoid keyword stuffing and misleading titles, since these can hurt both rankings and user
 trust.
 </p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion
 faqs={[
 {
 question:"Do meta keywords still matter for Google SEO?",
 answer:
"Google does not use the meta keywords tag as a ranking signal, but some platforms and internal search systems may still parse it. The title and description are far more important.",
 },
 {
 question:"What is a canonical URL?",
 answer:
"A canonical URL tells search engines which version of a page should be treated as the preferred one when duplicate or similar URLs exist.",
 },
 {
 question:"Should I include Open Graph tags?",
 answer:
"Yes. Open Graph tags improve how your page appears when shared on social platforms and messaging apps.",
 },
 {
 question:"Can I use this for any website?",
 answer:
"Yes. The generated tags are standard HTML and can be used in static sites, Next.js apps, WordPress, and other CMS platforms.",
 },
 ]}
 />

 <RelatedTools currentToolUrl="/tools/seo/meta-generator"max={6} />
 </div>
 );
}
