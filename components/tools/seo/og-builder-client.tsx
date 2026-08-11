"use client";

import React, { useMemo, useState } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import ToolHowItWorks from "@/components/shared/tool-how-it-works";
import ToolFeatureGuides from "@/components/shared/tool-feature-guides";
import ToolFaqAccordion from "@/components/shared/tool-faq-accordion";
import { RelatedTools } from "@/components/shared/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/shared/action-buttons";
import { Share2, Image as ImageIcon, Link2, Twitter } from "lucide-react";

const cardClass =
  "border border-border/80 shadow-lg bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden";
const headerClass = "border-b border-border/40 bg-muted/20 p-3 sm:p-4";
const titleClass = "text-xs sm:text-sm font-semibold flex items-center gap-2";
const fieldClass =
  "w-full rounded-lg border border-border/70 bg-background/80 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default function OgBuilderClient() {
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [ogType, setOgType] = useState("website");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");

  const generatedCode = useMemo(() => {
    const lines: string[] = [];

    if (ogTitle.trim()) lines.push(`<meta property="og:title" content="${escapeHtml(ogTitle.trim())}" />`);
    if (ogDescription.trim())
      lines.push(`<meta property="og:description" content="${escapeHtml(ogDescription.trim())}" />`);
    if (pageUrl.trim()) lines.push(`<meta property="og:url" content="${escapeHtml(pageUrl.trim())}" />`);
    if (imageUrl.trim()) lines.push(`<meta property="og:image" content="${escapeHtml(imageUrl.trim())}" />`);
    lines.push(`<meta property="og:type" content="${escapeHtml(ogType)}" />`);

    lines.push(`<meta name="twitter:card" content="${escapeHtml(twitterCard)}" />`);
    if (ogTitle.trim()) lines.push(`<meta name="twitter:title" content="${escapeHtml(ogTitle.trim())}" />`);
    if (ogDescription.trim())
      lines.push(`<meta name="twitter:description" content="${escapeHtml(ogDescription.trim())}" />`);
    if (imageUrl.trim()) lines.push(`<meta name="twitter:image" content="${escapeHtml(imageUrl.trim())}" />`);

    return lines.join("\n");
  }, [ogTitle, ogDescription, imageUrl, pageUrl, ogType, twitterCard]);

  const displayDomain = useMemo(() => {
    try {
      return pageUrl ? new URL(pageUrl).hostname : "";
    } catch {
      return "";
    }
  }, [pageUrl]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-2 sm:px-4 py-4 sm:py-6">
      <ToolPageHeader
        icon={Share2}
        title="Open Graph Tag Builder"
        description="Create Open Graph and Twitter Card meta tags with a live social share preview."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className={cardClass}>
          <CardHeader className={headerClass}>
            <CardTitle className={titleClass}>
              <ImageIcon className="w-4 h-4 text-primary" /> Social Metadata
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">OG Title</label>
              <Input
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
                placeholder="e.g. The Best Free Marketing Tools"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">OG Description</label>
              <textarea
                value={ogDescription}
                onChange={(e) => setOgDescription(e.target.value)}
                rows={4}
                className={fieldClass}
                placeholder="Write a short description that looks good when shared..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Image URL</label>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Page URL</label>
                <Input
                  value={pageUrl}
                  onChange={(e) => setPageUrl(e.target.value)}
                  placeholder="https://example.com/article"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">OG Type</label>
                <select
                  value={ogType}
                  onChange={(e) => setOgType(e.target.value)}
                  className={fieldClass}
                >
                  <option value="website">website</option>
                  <option value="article">article</option>
                  <option value="product">product</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Twitter Card</label>
                <select
                  value={twitterCard}
                  onChange={(e) => setTwitterCard(e.target.value)}
                  className={fieldClass}
                >
                  <option value="summary">summary</option>
                  <option value="summary_large_image">summary_large_image</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className={cardClass}>
            <CardHeader className={headerClass}>
              <CardTitle className={titleClass}>
                <Twitter className="w-4 h-4 text-primary" /> Social Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="overflow-hidden rounded-xl border border-border/60 bg-background/70">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Social preview"
                    className="h-44 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-44 items-center justify-center bg-muted/30 text-sm text-muted-foreground">
                    Add an image URL to preview the card
                  </div>
                )}
                <div className="space-y-1 p-4">
                  <p className="text-xs uppercase text-muted-foreground">{displayDomain || "example.com"}</p>
                  <p className="font-semibold leading-snug line-clamp-2">
                    {ogTitle || "Your Open Graph title appears here"}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {ogDescription || "Your Open Graph description appears here when the page is shared."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={cardClass}>
            <CardHeader className={headerClass}>
              <CardTitle className={titleClass}>
                <Link2 className="w-4 h-4 text-primary" /> Generated Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 space-y-3">
              <pre className="rounded-lg border border-border/60 bg-background/70 p-3 text-xs font-mono whitespace-pre-wrap break-words max-h-80 overflow-auto">
                {generatedCode}
              </pre>
              <CopyButton getText={() => generatedCode} label="Copy Tags" />
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolHowItWorks
        steps={[
          {
            step: "01",
            title: "Enter Share Metadata",
            description: "Add the title, description, image, URL, and card settings.",
            icon: ImageIcon,
          },
          {
            step: "02",
            title: "Preview the Card",
            description: "See how your content may look when shared socially.",
            icon: Share2,
          },
          {
            step: "03",
            title: "Copy the Tags",
            description: "Paste the Open Graph and Twitter Card tags into your page head.",
            icon: Link2,
          },
        ]}
        badges={["100% Free", "Client-Side", "No Signup"]}
      />

      <ToolFeatureGuides
        features={[
          {
            icon: Share2,
            title: "Social Sharing Control",
            description: "Helps define how your page appears when shared on social platforms.",
          },
          {
            icon: Twitter,
            title: "Twitter Card Support",
            description: "Generates both Open Graph and Twitter Card metadata.",
          },
          {
            icon: ImageIcon,
            title: "Visual Preview",
            description: "Shows a practical card preview before you publish.",
          },
          {
            icon: Link2,
            title: "Copy-Ready Output",
            description: "Produces clean HTML tags you can paste directly into your site.",
          },
        ]}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
          <p>
            Open Graph tags control how your content is displayed when it is shared on platforms such as Facebook,
            LinkedIn, Discord, and many messaging apps. Without these tags, platforms may pull the wrong title,
            description, or image, making your link look incomplete or untrustworthy.
          </p>
          <p>
            Twitter Card tags serve a similar purpose for X and other short-form platforms. By combining Open Graph and
            Twitter Card metadata, you can create a more consistent and attractive link preview across the web. This is
            especially important for blog posts, product pages, landing pages, and marketing campaigns.
          </p>
          <p>
            For best results, use a high-quality image, keep the title concise, and write a description that clearly
            communicates the value of the page. Large images usually perform better for visual platforms, while clear
            and accurate metadata helps improve click-through rates from shared links.
          </p>
        </div>
      </ToolFeatureGuides>

      <ToolFaqAccordion
        faqs={[
          {
            question: "What image size works best for Open Graph?",
            answer:
              "A common recommendation is 1200x630 pixels, which works well across many social platforms.",
          },
          {
            question: "Do I need both Open Graph and Twitter Card tags?",
            answer:
              "It is recommended. Some platforms prefer Open Graph, while X uses Twitter Card metadata for best results.",
          },
          {
            question: "Will this guarantee how platforms display my link?",
            answer:
              "No. Platforms may cache links or apply their own display rules, but proper tags significantly improve consistency.",
          },
        ]}
      />

      <RelatedTools currentToolUrl="/tools/seo/og-builder" max={6} />
    </div>
  );
}
