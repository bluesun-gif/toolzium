"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw, Share2, AlertTriangle, CheckCircle2, Code2, Eye } from "lucide-react";
import toast from "react-hot-toast";

const cardClass = "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const textareaClass = "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 font-mono";

export function OgPreviewClient() {
  const [ogTitle, setOgTitle] = useState("Toolzium - The Ultimate Developer Toolbox");
  const [ogDescription, setOgDescription] = useState("A massive collection of free, privacy-focused online tools for developers, marketers, and creators. No signup required.");
  const [ogImage, setOgImage] = useState("https://images.unsplash.com/photo-1517134191118-9d595e4c8c29?auto=format&fit=crop&q=80&w=1200");
  const [ogUrl, setOgUrl] = useState("https://toolzium.com");
  const [siteName, setSiteName] = useState("Toolzium");

  const titleWarning = ogTitle.length > 60;
  const descWarning = ogDescription.length > 155;
  
  const seoScore = useMemo(() => {
    let score = 0;
    if (ogTitle && ogTitle.length > 0 && ogTitle.length <= 60) score += 25;
    if (ogDescription && ogDescription.length > 50 && ogDescription.length <= 155) score += 25;
    if (ogImage.startsWith("http")) score += 25;
    if (ogUrl.startsWith("http")) score += 25;
    return score;
  }, [ogTitle, ogDescription, ogImage, ogUrl]);

  const metaTags = useMemo(() => {
    return `<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${ogUrl}" />
<meta property="og:title" content="${ogTitle}" />
<meta property="og:description" content="${ogDescription}" />
<meta property="og:image" content="${ogImage}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${ogUrl}" />
<meta property="twitter:title" content="${ogTitle}" />
<meta property="twitter:description" content="${ogDescription}" />
<meta property="twitter:image" content="${ogImage}" />`;
  }, [ogTitle, ogDescription, ogImage, ogUrl]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleReset = () => {
    setOgTitle("");
    setOgDescription("");
    setOgImage("");
    setOgUrl("");
    setSiteName("");
  };

  const PreviewCard = ({ platform, children }: { platform: string, children: React.ReactNode }) => (
    <Card className="border border-border/50 bg-muted/10 overflow-hidden">
      <CardHeader className="bg-muted/30 p-2 border-b border-border/30">
        <p className="text-xs font-bold text-muted-foreground">{platform}</p>
      </CardHeader>
      <CardContent className="p-0 bg-background">
        {children}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <ToolPageHeader
        icon={Share2}
        title="Open Graph (OG) Meta Preview"
        description="Visualize how your URLs will appear when shared on Facebook, Twitter/X, LinkedIn, Discord, and Slack. Optimize for maximum click-through rates."
      />

      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>
            <Share2 className="w-4 h-4" /> Meta Tag Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>OG Title</Label>
                <span className={`text-xs font-mono ${titleWarning ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {ogTitle.length}/60
                </span>
              </div>
              <Input value={ogTitle} onChange={(e) => setOgTitle(e.target.value)} placeholder="Your page title..." />
              {titleWarning && <p className="text-xs text-red-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Title is too long. Keep under 60 characters.</p>}
            </div>

            <div className="space-y-2">
              <Label>Site Name</Label>
              <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="Your brand name..." />
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between items-center">
                <Label>OG Description</Label>
                <span className={`text-xs font-mono ${descWarning ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {ogDescription.length}/155
                </span>
              </div>
              <textarea
                className={textareaClass}
                rows={3}
                value={ogDescription}
                onChange={(e) => setOgDescription(e.target.value)}
                placeholder="A compelling description..."
              />
              {descWarning && <p className="text-xs text-red-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Description is too long. Keep under 155 characters.</p>}
            </div>

            <div className="space-y-2">
              <Label>OG Image URL (Recommended: 1200x630)</Label>
              <Input value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="https://..." />
            </div>

            <div className="space-y-2">
              <Label>Page URL</Label>
              <Input value={ogUrl} onChange={(e) => setOgUrl(e.target.value)} placeholder="https://..." />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border/50 pt-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold">SEO Score:</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${seoScore === 100 ? 'bg-green-500' : seoScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                    style={{ width: `${seoScore}%` }} 
                  />
                </div>
                <span className="text-sm font-bold">{seoScore}%</span>
                {seoScore === 100 && <CheckCircle2 className="w-4 h-4 text-green-500" />}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" /> Reset
              </Button>
              <Button onClick={() => handleCopy(metaTags)}>
                <Copy className="w-4 h-4 mr-2" /> Copy Meta Tags
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PreviewCard platform="Facebook / LinkedIn">
          <div className="border border-border/50 bg-background cursor-pointer hover:bg-muted/20 transition-colors">
            {ogImage && <img src={ogImage} alt="OG Preview" className="w-full h-48 object-cover border-b border-border/50" />}
            <div className="p-3 space-y-1 bg-muted/10 border-t border-border/30">
              <p className="text-[10px] uppercase text-muted-foreground">{ogUrl.replace('https://', '').split('/')[0]}</p>
              <h3 className="font-bold text-sm text-foreground line-clamp-1">{ogTitle || "Your Page Title"}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{ogDescription || "Your description will appear here..."}</p>
            </div>
          </div>
        </PreviewCard>

        <PreviewCard platform="Twitter / X">
          <div className="border border-border/50 rounded-xl overflow-hidden bg-background cursor-pointer hover:bg-muted/20 transition-colors">
            {ogImage && <img src={ogImage} alt="OG Preview" className="w-full h-48 object-cover" />}
            <div className="p-3 space-y-1 border-t border-border/30">
              <h3 className="font-bold text-sm text-foreground line-clamp-1">{ogTitle || "Your Page Title"}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{ogDescription || "Your description will appear here..."}</p>
              <p className="text-[10px] text-muted-foreground">{ogUrl.replace('https://', '').split('/')[0]}</p>
            </div>
          </div>
        </PreviewCard>

        <PreviewCard platform="Discord">
          <div className="flex bg-background rounded overflow-hidden border border-border/50 max-w-md">
            <div className="w-1 bg-primary flex-shrink-0"></div>
            <div className="p-3 flex flex-col sm:flex-row gap-3">
              {ogImage && <img src={ogImage} alt="OG Preview" className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded flex-shrink-0" />}
              <div className="space-y-1 min-w-0">
                <p className="text-[10px] text-blue-500 hover:underline cursor-pointer">{siteName || "Site Name"}</p>
                <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer line-clamp-1">{ogTitle || "Your Page Title"}</h3>
                <p className="text-xs text-muted-foreground line-clamp-3">{ogDescription || "Your description..."}</p>
              </div>
            </div>
          </div>
        </PreviewCard>

        <PreviewCard platform="Slack">
          <div className="flex bg-background rounded border-l-4 border-primary/50 p-3 gap-3 max-w-md shadow-sm">
            {ogImage && <img src={ogImage} alt="OG Preview" className="w-16 h-16 object-cover rounded flex-shrink-0" />}
            <div className="space-y-1 min-w-0">
              <h3 className="font-bold text-sm text-foreground hover:underline cursor-pointer line-clamp-1">{ogTitle || "Your Page Title"}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{ogDescription || "Your description..."}</p>
              <p className="text-[10px] text-muted-foreground">{ogUrl.replace('https://', '').split('/')[0]}</p>
            </div>
          </div>
        </PreviewCard>
      </div>

      <Card className={cardClass}>
        <CardHeader className={headerClass}>
          <CardTitle className={titleClass}>
            <Code2 className="w-4 h-4" /> Generated HTML Meta Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <pre className="p-4 font-mono text-xs bg-slate-950 text-cyan-400 rounded-xl border overflow-x-auto leading-relaxed">
            {metaTags}
          </pre>
        </CardContent>
      </Card>

      <ToolHowItWorks
        steps={[
          { step: "01", title: "Enter Meta Details", description: "Input your proposed OG Title, Description, Image URL, and Page URL into the configuration panel.", icon: Share2 },
          { step: "02", title: "Review Visual Previews", description: "Instantly see how your link will render across Facebook, Twitter, Discord, and Slack to ensure visual appeal.", icon: Eye },
          { step: "03", title: "Export HTML Tags", description: "Copy the generated <meta> tags and paste them into your website's <head> section.", icon: Copy }
        ]}
        badges={["Real-Time Preview", "SEO Scoring", "Multi-Platform"]}
      />

      <ToolFeatureGuides
        features={[
          { icon: Share2, title: "Cross-Platform Simulation", description: "Accurately mimics the unfurling algorithms of major social networks and messaging apps to prevent broken shares." },
          { icon: AlertTriangle, title: "Character Limit Warnings", description: "Real-time counters alert you when your title exceeds 60 chars or description exceeds 155 chars, preventing truncation." },
          { icon: CheckCircle2, title: "Completeness Scoring", description: "A dynamic SEO score evaluates the presence and optimal length of all critical Open Graph and Twitter Card properties." },
          { icon: Copy, title: "One-Click Export", description: "Generates perfectly formatted HTML meta tags for both Open Graph and Twitter Cards, ready for immediate deployment." }
        ]}
      >
        <h3>Mastering Social Media Previews</h3>
        <p>When a user shares your link on social media, the platform's crawler reads your Open Graph (OG) and Twitter Card meta tags to generate a visual preview. If these tags are missing, poorly formatted, or use improperly sized images, your link will appear as a plain, unclickable text string. This drastically reduces your Click-Through Rate (CTR).</p>
        <p>Our OG Preview tool bridges the gap between coding and visual marketing. By simulating the exact rendering environments of Facebook, X (Twitter), Discord, and Slack, you can iterate on your copy and imagery before publishing. Ensure your 1200x630 featured image is perfectly cropped and your value proposition is fully visible in the limited character counts.</p>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          { question: "What is the ideal image size for OG tags?", answer: "The recommended size is 1200x630 pixels (1.9:1 ratio). This ensures your image looks crisp on high-DPI displays and isn't awkwardly cropped by Facebook or LinkedIn." },
          { question: "Why is my description getting cut off?", answer: "Most platforms truncate descriptions after 155-200 characters. Our tool warns you if you exceed 155 characters to ensure your core message is always visible." },
          { question: "Do I need both OG and Twitter tags?", answer: "While Twitter falls back to OG tags if Twitter-specific tags are missing, it is best practice to include both to guarantee correct rendering across all apps and future-proof your markup." },
          { question: "How long until social platforms update my preview?", answer: "Platforms cache link previews. After updating your meta tags, use the Facebook Sharing Debugger or Twitter Card Validator to force their crawlers to clear the cache and fetch the new data." }
        ]}
      />

      <RelatedTools currentToolUrl="/tools/seo/og-preview" max={6} />
    </div>
  );
}

export { OgPreviewClient as OGPreviewClient };
export default OgPreviewClient;
