import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPromptBySlug,
  getAllPromptSlugs,
} from "@/lib/data/adapters/prompts-adapter";
import { ProgrammaticSeoWrapper } from "@/components/seo/programmatic-seo-wrapper";
import { siteURL } from "@/lib/constants";
import PromptDetailClient from "./prompt-detail-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPromptSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) return {};

  const title = `${prompt.title} — AI System Prompt Template`;
  const description = `${prompt.description} Free, battle-tested prompt template optimized for ${prompt.modelTarget}. Customize variables and copy with 1 click.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteURL}/prompts/${prompt.slug}`,
      siteName: "Toolzium",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${siteURL}/prompts/${prompt.slug}`,
    },
  };
}

export default async function PromptProgrammaticPage({ params }: PageProps) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    notFound();
  }

  const faqs = [
    {
      question: `How do I use this ${prompt.title} prompt?`,
      answer: `Fill in the custom variable fields in the interactive box above, click "Copy Custom Prompt", and paste directly into ${prompt.modelTarget}.`,
    },
    {
      question: `Which AI models support this prompt template?`,
      answer: `This template is specifically engineered for ${prompt.modelTarget}, but is also compatible with OpenAI GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro.`,
    },
    {
      question: `Can I modify the prompt instructions for my specific team?`,
      answer: `Yes. All prompt templates are released under open access and can be adapted, chained into agent workflows, or embedded in private API pipelines.`,
    },
    {
      question: `How does community voting affect prompt visibility?`,
      answer: `Community upvotes elevate prompt rankings across the Toolzium library, helping the highest quality prompt engineering architectures reach more creators.`,
    },
  ];

  const guideSections = [
    {
      heading: `Architecture & Theoretical Basis of this Prompt`,
      body: `This template leverages structural role calibration and negative constraint enforcement. By explicitly scoping the output parameters for ${prompt.modelTarget}, it reduces token waste and focuses model inference on high-value synthesis.`,
    },
    {
      heading: "Optimizing Temperature & Inference Hyperparameters",
      body: "For technical coding and code review prompts, set model temperature to 0.1–0.2 for maximum determinism. For creative ideation and artistic prompts, set temperature to 0.7–0.9.",
    },
    {
      heading: "Chaining Outputs into Production Pipelines",
      body: "The structured markdown formatting makes it trivial to parse key sections (bugs, recommendations, replacement code) programmatically using standard regex or structured JSON schemas.",
    },
    {
      heading: "Ethical & Defensive Prompt Practices",
      body: "Always verify mission-critical code outputs with automated testing suites (unit tests, integration tests) before deploying LLM-generated recommendations into production environments.",
    },
  ];

  return (
    <ProgrammaticSeoWrapper
      title={prompt.title}
      subtitle={prompt.description}
      categoryName="AI Prompts"
      categoryUrl="/prompts"
      canonicalPath={`/prompts/${prompt.slug}`}
      faqs={faqs}
      guideSections={guideSections}
      countryCode="US"
      vpnContext="general"
      relatedSearches={[
        { label: "All AI Prompts", url: "/prompts" },
        { label: "Code Reviewer Prompt", url: "/prompts/senior-architect-code-review" },
        { label: "SEO Pillar Architect", url: "/prompts/seo-pillar-cluster-architect" },
        { label: "Free Software Alternatives", url: "/alternatives" },
      ]}
    >
      <PromptDetailClient prompt={prompt} />
    </ProgrammaticSeoWrapper>
  );
}
