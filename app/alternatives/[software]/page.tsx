import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSoftwareAlternative,
  getAllSoftwareSlugs,
} from "@/lib/data/adapters/alternatives-adapter";
import { ProgrammaticSeoWrapper } from "@/components/seo/programmatic-seo-wrapper";
import { VoteButtons } from "@/components/shared/vote-buttons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Search,
  Sparkles,
  Star,
  XCircle,
} from "lucide-react";
import { siteURL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ software: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSoftwareSlugs();
  return slugs.map((software) => ({ software }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { software } = await params;
  const item = getSoftwareAlternative(software);
  if (!item) return {};

  const title = `Best Free & Open-Source Alternatives to ${item.name} (2026 Guide)`;
  const description = `Looking for free alternatives to ${item.name}? Compare top open-source tools like ${item.alternatives.map((a) => a.name).join(", ")}. Stop paying ${item.originalPrice} with full pros, cons, and ratings.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteURL}/alternatives/${item.slug}`,
      siteName: "Toolzium",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${siteURL}/alternatives/${item.slug}`,
    },
  };
}

export default async function AlternativeProgrammaticPage({ params }: PageProps) {
  const { software } = await params;
  const item = getSoftwareAlternative(software);

  if (!item) {
    notFound();
  }

  const faqs = [
    {
      question: `What is the best free alternative to ${item.name}?`,
      answer: `According to community benchmarks, ${item.alternatives[0]?.name} is the #1 recommended replacement. It is ${item.alternatives[0]?.license.toLowerCase()} and offers ${item.alternatives[0]?.tagline.toLowerCase()}.`,
    },
    {
      question: `How much money do I save by switching away from ${item.name}?`,
      answer: `Switching to open-source or free alternatives saves you approximately ${item.originalPrice} every year in recurring subscription charges.`,
    },
    {
      question: `Are these ${item.name} replacements compatible with existing files?`,
      answer: `Yes. Tools like ${item.alternatives.map((a) => a.name).join(" and ")} offer strong export and import compatibility for industry-standard formats.`,
    },
    {
      question: `Can I use these free alternatives for commercial client projects?`,
      answer: `Yes. Open-source licenses (MIT, GPL, Apache) and the featured freemium platforms permit commercial use without additional licensing fees.`,
    },
  ];

  const guideSections = [
    {
      heading: `Why Replace ${item.name}? (Cost vs Value Breakdown)`,
      body: `${item.name} currently charges ${item.originalPrice}. Over a 3-year period, this accumulates into substantial overhead for independent creators, students, and small businesses. Modern free and open-source equivalents now match or exceed proprietary feature sets with zero ongoing costs.`,
    },
    {
      heading: "Feature Parity & Workflow Migration Guide",
      body: `Migrating your workflow to ${item.alternatives[0]?.name} requires minimal adjustment. Most alternatives support standard hotkeys, standard file imports, and cross-platform installation across Windows, macOS, and Linux.`,
    },
    {
      heading: "Security & Privacy Advantages of Local Tools",
      body: "Proprietary cloud SaaS platforms may analyze user projects for AI model training or retain telemetry logs. Open-source desktop applications keep your intellectual property 100% on your local storage drive.",
    },
    {
      heading: "Community Evaluation & Voting Methodology",
      body: "Our rankings are continuously calibrated by thousands of verified community votes, stability reviews, active GitHub commit velocity, and licensing audits.",
    },
  ];

  return (
    <ProgrammaticSeoWrapper
      title={`Best Free Alternatives to ${item.name}`}
      subtitle={`Comprehensive comparison of the highest-rated free and open-source software replacements for ${item.name}. Stop paying ${item.originalPrice}.`}
      categoryName="Software Alternatives"
      categoryUrl="/alternatives"
      canonicalPath={`/alternatives/${item.slug}`}
      faqs={faqs}
      guideSections={guideSections}
      countryCode="US"
      vpnContext="general"
      relatedSearches={[
        { label: "All Software Alternatives", url: "/alternatives" },
        { label: "Photoshop Alternatives", url: "/alternatives/photoshop" },
        { label: "Notion Alternatives", url: "/alternatives/notion" },
        { label: "Canva Alternatives", url: "/alternatives/canva" },
      ]}
    >
      <div className="space-y-6">
        {/* Header Summary */}
        <Card className="rounded-3xl border-2 border-primary/30 bg-card/90 backdrop-blur-md shadow-2xl overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/60 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-3xl">{item.icon}</span>
                  <CardTitle className="text-2xl sm:text-3xl font-black text-foreground">
                    Alternatives to {item.name}
                  </CardTitle>
                  <Badge variant="outline" className="font-semibold text-xs rounded-full">
                    {item.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Original Commercial Pricing: <strong className="text-rose-500 font-bold">{item.originalPrice}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Button asChild variant="outline" size="sm" className="rounded-xl text-xs font-semibold">
                  <Link href="/alternatives">
                    <Search className="mr-1.5 h-3.5 w-3.5" />
                    Browse All Software
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6">
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {item.description} Below are the top-rated free, open-source, and self-hostable alternatives ranked by the Toolzium community.
            </p>

            {/* Alternatives Ranked Cards */}
            <div className="space-y-6">
              {item.alternatives.map((alt, idx) => (
                <Card
                  key={alt.id}
                  className={`rounded-3xl border transition-all overflow-hidden ${
                    alt.isEditorChoice
                      ? "border-primary/50 bg-primary/5 shadow-xl ring-1 ring-primary/20"
                      : "border-border/70 bg-card"
                  }`}
                >
                  <CardContent className="p-6 sm:p-8 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black text-foreground">
                            {alt.name}
                          </h3>
                          {alt.isEditorChoice && (
                            <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs font-bold rounded-full">
                              <Sparkles className="mr-1 h-3 w-3" />
                              #1 Editor&apos;s Pick
                            </Badge>
                          )}
                          <Badge variant="secondary" className="text-xs font-bold rounded-full">
                            {alt.license}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-foreground/90">
                          {alt.tagline}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <VoteButtons
                          itemId={`alt:${item.slug}:${alt.id}`}
                          initialScore={alt.initialScore}
                        />
                        <Button asChild size="sm" className="rounded-xl font-bold gap-1 text-xs">
                          <a href={alt.url} target="_blank" rel="noopener noreferrer">
                            <span>Visit Official Site</span>
                            <ExternalLink className="h-3.5 w-3.5 ml-1" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {alt.description}
                    </p>

                    {/* Platforms */}
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="text-muted-foreground font-semibold text-[11px]">Platforms:</span>
                      {alt.platforms.map((p, i) => (
                        <Badge key={i} variant="outline" className="text-[10px] rounded-lg">
                          {p}
                        </Badge>
                      ))}
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border/50 text-xs">
                      <div className="space-y-1.5">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Pros</span>
                        </span>
                        <ul className="space-y-1 text-muted-foreground">
                          {alt.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-500 font-bold">•</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1.5">
                        <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                          <XCircle className="h-4 w-4" />
                          <span>Cons</span>
                        </span>
                        <ul className="space-y-1 text-muted-foreground">
                          {alt.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-rose-500 font-bold">•</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProgrammaticSeoWrapper>
  );
}
