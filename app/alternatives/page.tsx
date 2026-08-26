"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgrammaticSeoWrapper } from "@/components/seo/programmatic-seo-wrapper";
import { ALTERNATIVES_DATABASE } from "@/lib/data/adapters/alternatives-adapter";
import {
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Layers,
  Search,
  Sparkles,
  Star,
} from "lucide-react";

export default function AlternativesDirectoryHub() {
  const [search, setSearch] = useState("");

  const filtered = ALTERNATIVES_DATABASE.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.alternatives.some((a) => a.name.toLowerCase().includes(search.toLowerCase()))
  );

  const faqs = [
    {
      question: "Are the software alternatives listed on Toolzium really 100% free?",
      answer: "Yes. Every category features proven, community-verified free and open-source software (FOSS) or generous freemium tools that eliminate costly recurring SaaS subscriptions without compromising workflow capabilities.",
    },
    {
      question: "Can Photopea and GIMP replace Adobe Photoshop for professional design?",
      answer: "For over 95% of graphic design, photo retouching, and asset export tasks, Photopea (which opens and saves native PSDs in-browser) and GIMP provide full layer masks, adjustment curves, and filter pipelines without Adobe Creative Cloud subscriptions.",
    },
    {
      question: "Why choose open-source software over proprietary cloud subscriptions?",
      answer: "Open-source software ensures data sovereignty (your files remain on your local hardware in standard formats like SVG, Markdown, and SQLite), zero tracking, and freedom from unexpected price hikes or paywalled feature tiers.",
    },
    {
      question: "How can the community vote on the best software alternatives?",
      answer: "Every alternative entry includes interactive community upvote/downvote widgets. Community votes update the rankings and star ratings in real-time.",
    },
  ];

  const guideSections = [
    {
      heading: "The Economic Case for Open-Source & Self-Hosted Software",
      body: "Modern SaaS subscriptions can easily cost individual creators over $1,500/year (Photoshop $275/yr, Office $99/yr, Notion $120/yr, Premiere $275/yr). Switching to open-source equivalents like Photopea, LibreOffice, Obsidian, and DaVinci Resolve delivers identical professional results for $0.",
    },
    {
      heading: "Data Ownership & The Anti-Lock-In Movement",
      body: "Cloud-locked proprietary platforms can delete accounts or change licensing terms overnight. Tools that store data locally in standard formats (e.g. Obsidian using plain Markdown, Penpot using standard SVG) guarantee that your intellectual property remains accessible forever.",
    },
    {
      heading: "Evaluating Commercial Alternatives: Performance vs Features",
      body: "When assessing replacements, review system requirements, keyboard shortcut parity, plugin ecosystems, and cross-platform support (Windows, macOS, Linux).",
    },
    {
      heading: "Contributing Back to Open-Source Projects",
      body: "While open-source tools cost $0 to download, you can support their maintainers through GitHub Sponsors, bug reporting, documentation translation, and community advocacy.",
    },
  ];

  return (
    <ProgrammaticSeoWrapper
      title="Free & Open-Source Alternatives to Paid Software"
      subtitle="Discover powerful 100% free and open-source replacements for expensive commercial subscriptions like Photoshop, Canva, Notion, Office, and Premiere."
      categoryName="Software Alternatives"
      categoryUrl="/alternatives"
      canonicalPath="/alternatives"
      faqs={faqs}
      guideSections={guideSections}
      countryCode="US"
      vpnContext="general"
      relatedSearches={[
        { label: "Photoshop Alternatives", url: "/alternatives/photoshop" },
        { label: "Canva Alternatives", url: "/alternatives/canva" },
        { label: "Notion Alternatives", url: "/alternatives/notion" },
        { label: "Microsoft Office Alternatives", url: "/alternatives/microsoft-office" },
        { label: "Premiere Pro Alternatives", url: "/alternatives/premiere-pro" },
        { label: "Illustrator Alternatives", url: "/alternatives/illustrator" },
      ]}
    >
      <div className="space-y-6">
        <Card className="rounded-3xl border-2 border-primary/20 bg-gradient-to-b from-card to-background shadow-xl overflow-hidden">
          <CardContent className="p-6 sm:p-10 space-y-6">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-bold">
                <DollarSign className="mr-1.5 h-3.5 w-3.5" />
                Save $1,500+/Year on Subscriptions
              </Badge>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Free Software Alternatives Directory
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Find the highest-rated free and open-source replacements for expensive commercial apps.
              </p>
            </div>

            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by software (e.g. Photoshop, Notion, Canva)..."
                  className="w-full rounded-2xl border-2 border-primary/25 bg-card pl-10 pr-4 py-2.5 text-sm sm:text-base focus-visible:ring-primary/20 shadow-md"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Directory Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Card
              key={item.slug}
              className="group rounded-3xl border border-border/70 bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <CardHeader className="p-6 pb-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{item.icon}</span>
                  <Badge variant="outline" className="text-[10px] font-semibold">
                    {item.category}
                  </Badge>
                </div>

                <div>
                  <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    Alternatives to {item.name}
                  </CardTitle>
                  <span className="text-xs font-semibold text-rose-500 block mt-0.5">
                    Original Price: {item.originalPrice}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </CardHeader>

              <CardContent className="p-6 pt-0 space-y-4">
                <div className="space-y-2 pt-3 border-t border-border/50">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">
                    Top Replacements:
                  </span>
                  <div className="space-y-1.5">
                    {item.alternatives.slice(0, 2).map((alt) => (
                      <div
                        key={alt.id}
                        className="flex items-center justify-between p-2 rounded-xl bg-muted/40 text-xs"
                      >
                        <div className="flex items-center gap-1.5 font-bold text-foreground">
                          {alt.isEditorChoice && <Sparkles className="h-3 w-3 text-amber-500" />}
                          <span>{alt.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-[9px]">
                          {alt.license}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Button asChild className="w-full rounded-xl font-bold gap-2 text-xs h-10">
                  <Link href={`/alternatives/${item.slug}`}>
                    <span>Compare All {item.alternatives.length} Alternatives</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProgrammaticSeoWrapper>
  );
}
