"use client";

import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

import { ToolBackground } from"@/components/shared/tool-background";

import React, { useState, useMemo } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/shared/action-buttons";
import { Link, PenTool, Settings, Zap, Copy, Type } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { GlassCard } from "@/components/ui/glass-card";
const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
export default function SlugifyClient() {
  const [text, setText] = useState("");
  const [separator, setSeparator] = useState("-");
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const slug = useMemo(() => {
    if (!text) return "";
    let s = text.toLowerCase().trim();
    s = s.replace(/[^\w\s-]/g, "");
    const sepRegex = /[\s_]+/g;
    s = s.replace(sepRegex, separator);
    const escapeSep = separator.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const collapseRegex = new RegExp(`[${escapeSep}]+`, "g");
    s = s.replace(collapseRegex, separator);
    if (removeNumbers) {
      s = s.replace(/[0-9]/g, "");
      s = s.replace(collapseRegex, separator);
    }
    const trimRegex = new RegExp(`^${escapeSep}+|${escapeSep}+$`, "g");
    s = s.replace(trimRegex, "");
    return s;
  }, [text, separator, removeNumbers]);
  return (
    <div className="relative space-y-6">
      <ToolBackground />
      <div className="relative z-10 space-y-6">
      

 <ToolPageHeader icon={Link} title="Slugify / URL Slug Generator" description="Convert any text into a clean, SEO-friendly URL slug instantly." />
 
 <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><PenTool className="w-4 h-4 text-primary" /> Input Text</CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-4">
 <Input value={text} onChange={e => setText(e.target.value)} placeholder="e.g., Hello World! This is a Blog Post #1" className="text-base" />
 
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
 <div className="space-y-2">
 <label className="text-xs font-medium text-muted-foreground">Separator</label>
 <select value={separator} onChange={e => setSeparator(e.target.value)} className="w-full rounded-lg border border-border/70 bg-background/80 p-2 text-sm outline-none focus:ring-2 focus:ring-primary/50">
 <option value="-">Hyphen ( - )</option>
 <option value="_">Underscore ( _ )</option>
 </select>
 </div>
 <div className="flex items-end pb-1">
 <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
 <input type="checkbox" checked={removeNumbers} onChange={e => setRemoveNumbers(e.target.checked)} className="h-4 w-4 rounded border-border accent-primary" />
 Remove Numbers
 </label>
 </div>
 </div>
 </CardContent>
 </GlassCard>

 {slug && <GlassCard>
 <CardHeader className={headerClass}>
 <CardTitle className={titleClass}><Zap className="w-4 h-4 text-primary" /> Generated Slug</CardTitle>
 </CardHeader>
 <CardContent className="p-3 sm:p-4 space-y-3">
 <div className="p-4 rounded-lg bg-muted/40 border border-border/60 font-mono text-lg text-primary break-all">
 {slug}
 </div>
 <div className="flex justify-end">
 <CopyButton getText={() => slug} label="Copy Slug" />
 </div>
 </CardContent>
 </GlassCard>}

 <ToolHowItWorks steps={[{
        step: "01",
        title: "Enter Title",
        description: "Type or paste the headline, article title, or phrase you want to convert.",
        icon: PenTool
      }, {
        step: "02",
        title: "Configure Rules",
        description: "Choose your preferred separator and decide whether to strip out numbers.",
        icon: Settings
      }, {
        step: "03",
        title: "Copy Clean URL",
        description: "Grab the generated slug and use it in your CMS, routing, or database.",
        icon: Zap
      }]} badges={["100% Free", "Client-Side", "Instant"]} />

 <ToolFeatureGuides features={[{
        icon: Link,
        title: "SEO Optimized",
        description: "Strips punctuation and special characters that break URLs and confuse search engines."
      }, {
        icon: Settings,
        title: "Custom Separators",
        description: "Switch between hyphens (standard for URLs) and underscores (common in filenames)."
      }, {
        icon: Zap,
        title: "Live Preview",
        description: "See the slug update dynamically as you type your title, with zero delay."
      }, {
        icon: PenTool,
        title: "Number Stripping",
        description: "Optionally remove digits if you want purely alphabetical slugs for evergreen content."
      }]}>
 <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
 <p>A URL slug is the user-friendly portion of a web address that appears after the domain name. Instead of using cryptic database IDs like <code>/post?id=8472</code>, modern websites use descriptive slugs like <code>/best-seo-tools-2024</code>. Slugs improve user experience, make links easier to share, and provide search engines with valuable context about the page's content.</p>
 <p>Creating a valid slug requires more than just lowercasing text. You must remove special characters, replace spaces with hyphens, handle accented letters, and collapse multiple separators into one. This tool automates the entire sanitization process, ensuring your slugs are always compliant with web standards and safe to use in routing systems like Next.js, React Router, or WordPress.</p>
 <p>For developers building CMS platforms or blogs, generating slugs automatically from post titles is a standard requirement. Using hyphens instead of underscores is recommended by Google, as hyphens are treated as space separators, while underscores join words together. This tool defaults to hyphens to ensure your content is optimized for search engine indexing right out of the box.</p>
 </div>
 </ToolFeatureGuides>

 <ToolFaqAccordion faqs={[{
        question: "Should I use hyphens or underscores for URLs?",
        answer: "Google officially recommends using hyphens (-) for URL slugs. Hyphens are treated as word separators, whereas underscores (_) are treated as word joiners."
      }, {
        question: "Does this handle accented characters like é or ñ?",
        answer: "The current basic implementation strips non-standard ASCII characters. For full transliteration (e.g., converting 'é' to 'e'), a more advanced slug library is required."
      }, {
        question: "Can I use this for file names?",
        answer: "Yes. By switching the separator to an underscore and keeping numbers, you can generate clean, safe file names for uploaded assets."
      }]} />
    </div>
    </div>
);
}
